import "server-only"
import { consulta, transaccion } from "@/lib/db"
import type { ConfigAgenda, DiaSemana, Franja } from "./huecos"

/** Datos personales de las reservas: días que se conservan tras la llamada. */
export const DIAS_DE_CONSERVACION = 30

export type Ajustes = ConfigAgenda & { activo: boolean }

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
            antelacion_horas as "antelacionHoras", ventana_dias as "ventanaDias",
            visibilidad_pct as "visibilidadPct", visibilidad_semilla as "semilla", activo
       from ajustes where id = 1`
  )
  if (!filas[0]) throw new Error("Falta la fila de ajustes (migración 001)")
  return filas[0]
}

/**
 * Guarda los ajustes y el horario semanal de una vez (todo o nada). La semilla
 * del reparto no se toca aquí: ver `barajarHuecos`.
 */
export async function guardarAgenda(
  a: Omit<Ajustes, "semilla">,
  franjas: Franja[]
): Promise<void> {
  await transaccion(async (q) => {
    await q(
      `update ajustes
          set duracion_min = $1, margen_min = $2, antelacion_horas = $3, ventana_dias = $4,
              visibilidad_pct = $5, activo = $6
        where id = 1`,
      [a.duracionMin, a.margenMin, a.antelacionHoras, a.ventanaDias, a.visibilidadPct, a.activo]
    )
    await q("delete from franjas")
    if (franjas.length === 0) return
    await q(
      `insert into franjas (dia_semana, inicio_min, fin_min)
       select * from unnest($1::int[], $2::int[], $3::int[])`,
      [franjas.map((f) => f.diaSemana), franjas.map((f) => f.inicioMin), franjas.map((f) => f.finMin)]
    )
  })
}

/** Cambia la semilla: se esconden otros huecos (con el mismo porcentaje). */
export async function barajarHuecos(): Promise<void> {
  await consulta(
    `update ajustes
        set visibilidad_semilla = 1 + floor(random() * 2000000000)::int
      where id = 1`
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

/** Reservas (también las canceladas) que se tocan con el rango [desde, hasta). */
export async function listarReservasEntre(desde: Date, hasta: Date): Promise<Reserva[]> {
  return consulta<Reserva>(
    `select ${COLUMNAS_RESERVA} from reservas where fin > $1 and inicio < $2 order by inicio`,
    [desde, hasta]
  )
}

/** Bloqueos que se tocan con el rango [desde, hasta). */
export async function listarBloqueosEntre(desde: Date, hasta: Date): Promise<Bloqueo[]> {
  return consulta<Bloqueo>(
    `select id, desde, hasta, motivo from bloqueos where hasta > $1 and desde < $2 order by desde`,
    [desde, hasta]
  )
}

// ── Huecos cerrados a mano ─────────────────────────────────────────────────

/**
 * Huecos tocados a mano que empiezan en [desde, hasta), como inicio en ms:
 * los `cerrados` (el cliente no los ve) y los `simulados` (los ve apagados, como ocupados).
 */
export async function listarCerrados(
  desde: Date,
  hasta: Date
): Promise<{ cerrados: Set<number>; simulados: Set<number> }> {
  const filas = await consulta<{ inicio: Date; aparente: boolean }>(
    "select inicio, aparente from huecos_cerrados where inicio >= $1 and inicio < $2",
    [desde, hasta]
  )
  return {
    cerrados: new Set(filas.filter((f) => !f.aparente).map((f) => f.inicio.getTime())),
    simulados: new Set(filas.filter((f) => f.aparente).map((f) => f.inicio.getTime())),
  }
}

export type MarcaHueco = "cerrado" | "ocupado"

/**
 * Marca el hueco con `marca`, o lo deja libre si ya tenía esa misma marca. Si tenía la otra,
 * la cambia. Devuelve cómo queda: la marca, o null si queda libre.
 */
export async function alternarHueco(inicio: Date, marca: MarcaHueco): Promise<MarcaHueco | null> {
  const aparente = marca === "ocupado"
  return transaccion(async (q) => {
    const actual = await q<{ aparente: boolean }>("select aparente from huecos_cerrados where inicio = $1", [inicio])
    if (actual.length > 0 && actual[0].aparente === aparente) {
      await q("delete from huecos_cerrados where inicio = $1", [inicio])
      return null
    }
    await q(
      "insert into huecos_cerrados (inicio, aparente) values ($1, $2) on conflict (inicio) do update set aparente = excluded.aparente",
      [inicio, aparente]
    )
    return marca
  })
}

/** Reservas confirmadas que aún no han terminado y que se hicieron con este correo. */
export async function contarReservasFuturas(email: string): Promise<number> {
  const filas = await consulta<{ n: number }>(
    "select count(*)::int as n from reservas where email = $1 and estado = 'confirmada' and fin > now()",
    [email]
  )
  return filas[0]?.n ?? 0
}

/**
 * Guarda una reserva confirmada. Si el hueco ya está ocupado, la restricción de
 * la base lanza un error (ver `esHuecoOcupado` en lib/db).
 */
export async function crearReserva(r: {
  inicio: Date
  fin: Date
  nombre: string
  email: string
  telefono: string | null
  mensaje: string | null
}): Promise<string> {
  const filas = await consulta<{ id: string }>(
    `insert into reservas (inicio, fin, nombre, email, telefono, mensaje)
     values ($1, $2, $3, $4, $5, $6) returning id`,
    [r.inicio, r.fin, r.nombre, r.email, r.telefono, r.mensaje]
  )
  return filas[0].id
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
     ), c as (
       delete from huecos_cerrados where inicio < now() - make_interval(days => $1) returning 1
     )
     select (select count(*) from r)::int as reservas, (select count(*) from b)::int + (select count(*) from c)::int as bloqueos`,
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
