/**
 * Lectura y validación de los formularios del admin. Funciones puras: reciben
 * una función `leer(campo)` (que devuelve el texto recortado, o "" si no hay) y
 * devuelven los datos listos o un código de error que la pantalla traduce.
 *
 * Importa con extensión `.ts` para poder probarse con `node --test`.
 */
import {
  horaAMinutos,
  parsearFecha,
  parsearFechaHoraMadrid,
  sumarDias,
  type DiaSemana,
  type Franja,
} from "./huecos.ts"

export type Leer = (campo: string) => string

export const DIAS_SEMANA = [
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado",
  "Domingo",
] as const

/** Tramos que se pueden poner por día (p. ej. mañana y tarde). */
export const FRANJAS_POR_DIA = 3

export type ErrorForm = { ok: false; error: string; dia?: number }

// ── Horario semanal ────────────────────────────────────────────────────────

export function leerHorario(leer: Leer): { ok: true; franjas: Franja[] } | ErrorForm {
  const franjas: Franja[] = []
  for (let dia = 1; dia <= 7; dia++) {
    const deDia: Franja[] = []
    for (let i = 0; i < FRANJAS_POR_DIA; i++) {
      const ini = leer(`d${dia}_${i}_ini`)
      const fin = leer(`d${dia}_${i}_fin`)
      if (!ini && !fin) continue
      if (!ini || !fin) return { ok: false, error: "horario-incompleto", dia }
      const inicioMin = horaAMinutos(ini)
      const finMin = horaAMinutos(fin)
      if (inicioMin === null || finMin === null || inicioMin >= 1440) {
        return { ok: false, error: "horario-invalido", dia }
      }
      if (finMin <= inicioMin) return { ok: false, error: "horario-orden", dia }
      deDia.push({ diaSemana: dia as DiaSemana, inicioMin, finMin })
    }
    deDia.sort((a, b) => a.inicioMin - b.inicioMin)
    for (let i = 1; i < deDia.length; i++) {
      if (deDia[i].inicioMin < deDia[i - 1].finMin) return { ok: false, error: "horario-solape", dia }
    }
    franjas.push(...deDia)
  }
  return { ok: true, franjas }
}

// ── Ajustes ────────────────────────────────────────────────────────────────

function entero(texto: string, min: number, max: number): number | null {
  if (!/^\d{1,4}$/.test(texto)) return null
  const n = Number(texto)
  return n >= min && n <= max ? n : null
}

/** Los límites son los mismos que los `check` de la tabla `ajustes`. */
export function leerAjustes(
  leer: Leer
):
  | {
      ok: true
      ajustes: {
        duracionMin: number
        margenMin: number
        antelacionHoras: number
        ventanaDias: number
        visibilidadPct: number
        activo: boolean
      }
    }
  | ErrorForm {
  const duracionMin = entero(leer("duracion_min"), 5, 240)
  const margenMin = entero(leer("margen_min"), 0, 120)
  const antelacionHoras = entero(leer("antelacion_horas"), 0, 720)
  const ventanaDias = entero(leer("ventana_dias"), 1, 120)
  const visibilidadPct = entero(leer("visibilidad_pct"), 10, 100)
  if (
    duracionMin === null ||
    margenMin === null ||
    antelacionHoras === null ||
    ventanaDias === null ||
    visibilidadPct === null
  ) {
    return { ok: false, error: "ajustes-invalidos" }
  }
  return {
    ok: true,
    ajustes: {
      duracionMin,
      margenMin,
      antelacionHoras,
      ventanaDias,
      visibilidadPct,
      activo: leer("activo") === "on",
    },
  }
}

/** "2026-11-16T09:00:00.000Z" (como lo escribe `toISOString`) → Date. null si no lo es. */
export function leerInstante(texto: string): Date | null {
  if (!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/.test(texto)) return null
  const fecha = new Date(texto)
  return Number.isNaN(fecha.getTime()) ? null : fecha
}

// ── Bloqueos ───────────────────────────────────────────────────────────────

/**
 * Sin horas, bloquea días enteros. `desde_hora` sola bloquea desde esa hora
 * hasta el final del día; `hasta_hora` sola, desde el principio del día hasta
 * esa hora. Si falta `hasta_fecha`, es el mismo día que `desde_fecha`.
 */
export function leerBloqueo(
  leer: Leer
): { ok: true; desde: Date; hasta: Date; motivo: string } | ErrorForm {
  const desdeFecha = leer("desde_fecha")
  if (!parsearFecha(desdeFecha)) return { ok: false, error: "bloqueo-fecha" }
  const hastaFecha = leer("hasta_fecha") || desdeFecha
  if (!parsearFecha(hastaFecha)) return { ok: false, error: "bloqueo-fecha" }

  const desde = parsearFechaHoraMadrid(desdeFecha, leer("desde_hora") || "00:00")
  const horaHasta = leer("hasta_hora")
  const diaSiguiente = sumarDias(hastaFecha, 1)
  const hasta = horaHasta
    ? parsearFechaHoraMadrid(hastaFecha, horaHasta)
    : diaSiguiente
      ? parsearFechaHoraMadrid(diaSiguiente, "00:00")
      : null
  if (!desde || !hasta) return { ok: false, error: "bloqueo-hora" }
  if (hasta.getTime() <= desde.getTime()) return { ok: false, error: "bloqueo-orden" }

  // Sin saltos de línea ni caracteres de control; el motivo es solo una nota interna.
  const motivo = Array.from(leer("motivo"))
    .map((c) => (c.charCodeAt(0) < 32 || c.charCodeAt(0) === 127 ? " " : c))
    .join("")
    .slice(0, 120)
  return { ok: true, desde, hasta, motivo }
}

// ── Identificadores ────────────────────────────────────────────────────────

export function esUuid(texto: string): boolean {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(texto)
}

export function leerEnteroPositivo(texto: string): number | null {
  return /^\d{1,9}$/.test(texto) && Number(texto) > 0 ? Number(texto) : null
}
