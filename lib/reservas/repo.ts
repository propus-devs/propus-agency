import "server-only"
import { consulta, transaccion } from "@/lib/db"
import type { ConfigHuecos, DiaSemana, Franja, Intervalo } from "./huecos"

/** Datos personales de las reservas: días que se conservan tras la llamada. */
export const DIAS_DE_CONSERVACION = 30

export type Ajustes = ConfigHuecos & { activo: boolean }

export type Bloqueo = { id: number; desde: Date; hasta: Date; motivo: string }

export type Reserva = {
  id: string
  inicio: Date
  fin: Date
  nombre: string
  email: string
  telefono: string | null
  mensaje: string | null
  estado: "confirmada" | "cancelada"
  creadaEn: Date
  canceladaEn: Date | null
}

// ── Ajustes ────────────────────────────────────────────────────────────────

export async function obtenerAjustes(): Promise<Ajustes> {
  const filas = await consulta<Ajustes>(
    `select duracion_min as "duracionMin", margen_min as "margenMin",
            antelacion_horas as "antelacionHoras", ventana_dias as "ventanaDias", activo
       from ajustes where id = 1`
  )
  if (!filas[0]) throw new Error("Falta la fila de ajustes (migración 001)")
  return filas[0]
}

export async function guardarAjustes(a: Ajustes): Promise<void> {
  await consulta(
    `update ajustes
        set duracion_min = $1, margen_min = $2, antelacion_horas = $3, ventana_dias = $4, activo = $5
      where id = 1`,
    [a.duracionMin, a.margenMin, a.antelacionHoras, a.ventanaDias, a.activo]
  )
}

// ── Horario semanal ────────────────────────────────────────────────────────

export async function listarFranjas(): Promise<Franja[]> {
  const filas = await consulta<{ diaSemana: number; inicioMin: number; finMin: number }>(
    `select dia_semana as "diaSemana", inicio_min as "inicioMin", fin_min as "finMin"
       from franjas order by dia_semana, inicio_min`
  )
  // La base garantiza (check) que el día va de 1 a 7.
  return filas.map((f) => ({ ...f, diaSemana: f.diaSemana as DiaSemana }))
}

/** Sustituye todo el horario por el nuevo, de una vez. */
export async function guardarFranjas(franjas: Franja[]): Promise<void> {
  await transaccion(async (q) => {
    await q("delete from franjas")
    if (franjas.length === 0) return
    await q(
      `insert into franjas (dia_semana, inicio_min, fin_min)
       select * from unnest($1::int[], $2::int[], $3::int[])`,
      [franjas.map((f) => f.diaSemana), franjas.map((f) => f.inicioMin), franjas.map((f) => f.finMin)]
    )
  })
}

// ── Bloqueos ───────────────────────────────────────────────────────────────

/** Bloqueos que aún no han terminado. */
export async function listarBloqueos(): Promise<Bloqueo[]> {
  return consulta<Bloqueo>(
    `select id, desde, hasta, motivo from bloqueos where hasta > now() order by desde`
  )
}

export async function crearBloqueo(b: { desde: Date; hasta: Date; motivo: string }): Promise<void> {
  await consulta("insert into bloqueos (desde, hasta, motivo) values ($1, $2, $3)", [
    b.desde,
    b.hasta,
    b.motivo,
  ])
}

export async function borrarBloqueo(id: number): Promise<void> {
  await consulta("delete from bloqueos where id = $1", [id])
}

// ── Reservas ───────────────────────────────────────────────────────────────

const COLUMNAS_RESERVA = `id, inicio, fin, nombre, email, telefono, mensaje, estado,
  creada_en as "creadaEn", cancelada_en as "canceladaEn"`

/** Todas las reservas que se conservan (las de los últimos 30 días y las futuras). */
export async function listarReservas(): Promise<Reserva[]> {
  return consulta<Reserva>(`select ${COLUMNAS_RESERVA} from reservas order by inicio`)
}

/** Cancela una reserva confirmada. Devuelve false si no existía o ya estaba cancelada. */
export async function cancelarReserva(id: string): Promise<boolean> {
  const filas = await consulta<{ id: string }>(
    `update reservas set estado = 'cancelada', cancelada_en = now()
      where id = $1 and estado = 'confirmada' returning id`,
    [id]
  )
  return filas.length > 0
}

/** Lo que impide reservar entre dos instantes: reservas confirmadas y bloqueos. */
export async function intervalosOcupados(desde: Date, hasta: Date): Promise<Intervalo[]> {
  return consulta<Intervalo>(
    `select inicio, fin from reservas where estado = 'confirmada' and fin > $1 and inicio < $2
     union all
     select desde as inicio, hasta as fin from bloqueos where hasta > $1 and desde < $2`,
    [desde, hasta]
  )
}

// ── Borrado automático ─────────────────────────────────────────────────────

/**
 * Borra los datos personales que ya no se pueden conservar: reservas a las que
 * han pasado más de 30 días desde la llamada y canceladas con más de 30 días
 * desde la cancelación. También limpia bloqueos antiguos (no tienen datos
 * personales, solo es orden).
 */
export async function purgarCaducadas(): Promise<{ reservas: number; bloqueos: number }> {
  const filas = await consulta<{ reservas: number; bloqueos: number }>(
    `with r as (
       delete from reservas
        where (estado = 'confirmada' and fin < now() - make_interval(days => $1))
           or (estado = 'cancelada' and (cancelada_en < now() - make_interval(days => $1)
                                          or fin < now() - make_interval(days => $1)))
        returning 1
     ), b as (
       delete from bloqueos where hasta < now() - make_interval(days => $1) returning 1
     )
     select (select count(*) from r)::int as reservas, (select count(*) from b)::int as bloqueos`,
    [DIAS_DE_CONSERVACION]
  )
  return filas[0] ?? { reservas: 0, bloqueos: 0 }
}

const g = globalThis as typeof globalThis & { __propusUltimaPurga?: number }

/** Purga como mucho una vez por hora; pensada para colgarla del uso normal del admin. */
export async function purgarSiToca(ahora = Date.now()): Promise<void> {
  if (g.__propusUltimaPurga && ahora - g.__propusUltimaPurga < 3_600_000) return
  g.__propusUltimaPurga = ahora
  try {
    await purgarCaducadas()
  } catch (error) {
    g.__propusUltimaPurga = undefined
    console.error("[reservas] no se pudo purgar:", error)
  }
}
