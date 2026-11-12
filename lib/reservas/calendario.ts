/**
 * Cuadrícula de un mes para los calendarios (admin y, más adelante, la web
 * pública). Módulo puro: trabaja con días civiles "AAAA-MM-DD" y meses
 * "AAAA-MM", sin zonas horarias. La semana empieza en lunes.
 *
 * Importa con extensión `.ts` para poder probarse con `node --test`.
 */
import { parsearFecha } from "./huecos.ts"

export type Celda = {
  /** "AAAA-MM-DD" */
  fecha: string
  /** Día del mes (1–31). */
  dia: number
  /** false para los días de relleno de los meses vecino. */
  delMes: boolean
}

const MS_DIA = 86_400_000

function clave(ms: number): string {
  return new Date(ms).toISOString().slice(0, 10)
}

/** "2026-11" → { anio: 2026, mes: 11 }. null si no es un mes válido (años 2000–2100). */
export function parsearMes(texto: string | undefined): { anio: number; mes: number } | null {
  const m = /^(\d{4})-(\d{2})$/.exec(texto ?? "")
  if (!m) return null
  const anio = Number(m[1])
  const mes = Number(m[2])
  return anio >= 2000 && anio <= 2100 && mes >= 1 && mes <= 12 ? { anio, mes } : null
}

/** Mes ("AAAA-MM") al que pertenece un día ("AAAA-MM-DD"). */
export function mesDe(fecha: string): string {
  return fecha.slice(0, 7)
}

/** Suma (o resta) meses a un mes "AAAA-MM". */
export function sumarMeses(mes: string, n: number): string | null {
  const p = parsearMes(mes)
  if (!p) return null
  const d = new Date(Date.UTC(p.anio, p.mes - 1 + n, 1))
  return d.toISOString().slice(0, 7)
}

/** Semanas del mes (4 a 6 filas de 7 celdas), de lunes a domingo, con los días de relleno. */
export function semanasDelMes(anio: number, mes: number): Celda[][] {
  const primero = Date.UTC(anio, mes - 1, 1)
  const ultimo = Date.UTC(anio, mes, 0)
  const diaSemanaIso = new Date(primero).getUTCDay() === 0 ? 7 : new Date(primero).getUTCDay()
  let cursor = primero - (diaSemanaIso - 1) * MS_DIA

  const semanas: Celda[][] = []
  while (cursor <= ultimo) {
    const semana: Celda[] = []
    for (let i = 0; i < 7; i++) {
      const d = new Date(cursor)
      semana.push({
        fecha: clave(cursor),
        dia: d.getUTCDate(),
        delMes: d.getUTCMonth() === mes - 1,
      })
      cursor += MS_DIA
    }
    semanas.push(semana)
  }
  return semanas
}

const fmtMes = new Intl.DateTimeFormat("es-ES", { month: "long", year: "numeric", timeZone: "UTC" })
const fmtDiaLargo = new Intl.DateTimeFormat("es-ES", {
  weekday: "long",
  day: "numeric",
  month: "long",
  timeZone: "UTC",
})
const fmtDiaCorto = new Intl.DateTimeFormat("es-ES", {
  weekday: "short",
  day: "numeric",
  month: "short",
  timeZone: "UTC",
})

function aDate(fecha: string): Date | null {
  const f = parsearFecha(fecha)
  return f ? new Date(Date.UTC(f.anio, f.mes - 1, f.dia)) : null
}

/** "noviembre de 2026" */
export function nombreMes(mes: string): string {
  const p = parsearMes(mes)
  return p ? fmtMes.format(new Date(Date.UTC(p.anio, p.mes - 1, 1))) : mes
}

/** "lunes, 16 de noviembre" */
export function nombreDiaLargo(fecha: string): string {
  const d = aDate(fecha)
  return d ? fmtDiaLargo.format(d) : fecha
}

/** "lun, 16 nov" */
export function nombreDiaCorto(fecha: string): string {
  const d = aDate(fecha)
  return d ? fmtDiaCorto.format(d) : fecha
}

/** Cabeceras de la cuadrícula, de lunes a domingo. */
export const DIAS_CORTOS = ["L", "M", "X", "J", "V", "S", "D"] as const
