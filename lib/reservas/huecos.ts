/**
 * Hora de Madrid y cálculo de huecos reservables.
 *
 * Módulo puro, sin imports: lo usan el admin, la API pública de reservas y las
 * pruebas (`node --test`). Todo lo que se guarda va en UTC; la hora de Madrid
 * solo existe al entrar (formularios) y al salir (pantallas y correos).
 */

export const ZONA_HORARIA = "Europe/Madrid"

/** 1 = lunes … 7 = domingo (ISO). */
export type DiaSemana = 1 | 2 | 3 | 4 | 5 | 6 | 7

/** Tramo semanal en el que se aceptan llamadas. Minutos desde las 00:00 de Madrid. */
export type Franja = { diaSemana: DiaSemana; inicioMin: number; finMin: number }

export type ConfigHuecos = {
  /** Duración de cada llamada. */
  duracionMin: number
  /** Descanso entre el final de una llamada y el inicio de la siguiente. */
  margenMin: number
  /** Cuántas horas de aviso mínimo se exigen para reservar. */
  antelacionHoras: number
  /** Hasta cuántos días por delante (contando hoy como día 0) se puede reservar. */
  ventanaDias: number
}

export type Intervalo = { inicio: Date; fin: Date }

type Partes = {
  anio: number
  mes: number
  dia: number
  hora: number
  minuto: number
  segundo: number
}

const formateadorPartes = new Intl.DateTimeFormat("en-CA", {
  timeZone: ZONA_HORARIA,
  hourCycle: "h23",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
})

/** Año, mes, día y hora que marca el reloj de Madrid en ese instante. */
export function partesMadrid(fecha: Date): Partes {
  const partes: Record<string, number> = {}
  for (const parte of formateadorPartes.formatToParts(fecha)) {
    if (parte.type !== "literal") partes[parte.type] = Number(parte.value)
  }
  return {
    anio: partes.year,
    mes: partes.month,
    dia: partes.day,
    hora: partes.hour,
    minuto: partes.minute,
    segundo: partes.second,
  }
}

/** Diferencia (ms) entre la hora de Madrid y UTC en ese instante: +1 h en invierno, +2 h en verano. */
function desfaseMs(fecha: Date): number {
  const p = partesMadrid(fecha)
  const comoUtc = Date.UTC(p.anio, p.mes - 1, p.dia, p.hora, p.minuto, p.segundo)
  return comoUtc - Math.floor(fecha.getTime() / 1000) * 1000
}

/**
 * Convierte "día y hora en Madrid" en el instante real (UTC).
 * Devuelve null si esa hora no existe (el salto de primavera se come de 02:00
 * a 03:00). Si existe dos veces (el retroceso de otoño) elige una de forma fija.
 */
export function madridAUtc(
  anio: number,
  mes: number,
  dia: number,
  hora: number,
  minuto: number
): Date | null {
  const nominal = Date.UTC(anio, mes - 1, dia, hora, minuto)
  let utc = nominal - desfaseMs(new Date(nominal))
  // El desfase puede ser otro en el instante corregido (si hay cambio de hora de por medio).
  utc = nominal - desfaseMs(new Date(utc))
  const vuelta = partesMadrid(new Date(utc))
  if (
    vuelta.anio !== anio ||
    vuelta.mes !== mes ||
    vuelta.dia !== dia ||
    vuelta.hora !== hora ||
    vuelta.minuto !== minuto
  ) {
    return null
  }
  return new Date(utc)
}

/** "2026-11-12" → día civil (sin zona). Devuelve null si el texto no es una fecha real. */
export function parsearFecha(texto: string): { anio: number; mes: number; dia: number } | null {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(texto)
  if (!m) return null
  const anio = Number(m[1])
  const mes = Number(m[2])
  const dia = Number(m[3])
  const f = new Date(Date.UTC(anio, mes - 1, dia))
  if (f.getUTCFullYear() !== anio || f.getUTCMonth() !== mes - 1 || f.getUTCDate() !== dia) {
    return null
  }
  return { anio, mes, dia }
}

/** "09:30" → 570. Devuelve null si no es una hora válida (se admite 24:00 solo como fin). */
export function horaAMinutos(texto: string): number | null {
  const m = /^(\d{2}):(\d{2})$/.exec(texto)
  if (!m) return null
  const h = Number(m[1])
  const min = Number(m[2])
  if (min > 59) return null
  if (h > 24 || (h === 24 && min !== 0)) return null
  return h * 60 + min
}

/** 570 → "09:30". */
export function minutosAHora(minutos: number): string {
  const h = Math.floor(minutos / 60)
  const m = minutos % 60
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`
}

/** Día y hora de Madrid ("2026-11-12", "09:30") → instante real. null si no existe o no es válida. */
export function parsearFechaHoraMadrid(fecha: string, hora: string): Date | null {
  const f = parsearFecha(fecha)
  const min = horaAMinutos(hora)
  if (!f || min === null || min >= 1440) return null
  return madridAUtc(f.anio, f.mes, f.dia, Math.floor(min / 60), min % 60)
}

/** Día siguiente de una fecha "AAAA-MM-DD". */
export function sumarDias(fecha: string, dias: number): string | null {
  const f = parsearFecha(fecha)
  if (!f) return null
  const d = new Date(Date.UTC(f.anio, f.mes - 1, f.dia + dias))
  return d.toISOString().slice(0, 10)
}

/** Clave "AAAA-MM-DD" del día de Madrid en el que cae un instante. */
export function claveDiaMadrid(fecha: Date): string {
  const p = partesMadrid(fecha)
  return `${p.anio}-${String(p.mes).padStart(2, "0")}-${String(p.dia).padStart(2, "0")}`
}

const MS_MINUTO = 60_000
const MS_HORA = 3_600_000

/**
 * Huecos libres de la agenda, ordenados de más próximo a más lejano.
 *
 * - Trocea cada franja semanal en llamadas de `duracionMin`, separadas por `margenMin`.
 * - Descarta lo que empieza antes de `ahora + antelación` y lo que cae fuera de la ventana.
 * - Descarta cualquier hueco que se pise con algo de `ocupados` (reservas y bloqueos).
 *
 * No mira si las reservas están abiertas: eso lo decide quien llama.
 */
export function calcularHuecos(args: {
  ahora: Date
  franjas: Franja[]
  config: ConfigHuecos
  ocupados: Intervalo[]
}): Intervalo[] {
  const { ahora, franjas, config, ocupados } = args
  const { duracionMin, margenMin, antelacionHoras, ventanaDias } = config
  if (duracionMin <= 0 || margenMin < 0 || ventanaDias < 0) return []

  const paso = duracionMin + margenMin
  const primero = ahora.getTime() + antelacionHoras * MS_HORA
  const hoy = partesMadrid(ahora)
  const resultado = new Map<number, Intervalo>()

  for (let d = 0; d <= ventanaDias; d++) {
    // Día civil de Madrid d días después de hoy (el calendario sigue su curso aunque cambie la hora).
    const civil = new Date(Date.UTC(hoy.anio, hoy.mes - 1, hoy.dia + d))
    const anio = civil.getUTCFullYear()
    const mes = civil.getUTCMonth() + 1
    const dia = civil.getUTCDate()
    const iso = civil.getUTCDay() === 0 ? 7 : civil.getUTCDay()

    for (const franja of franjas) {
      if (franja.diaSemana !== iso) continue
      for (let t = franja.inicioMin; t + duracionMin <= franja.finMin; t += paso) {
        const inicio = madridAUtc(anio, mes, dia, Math.floor(t / 60), t % 60)
        if (!inicio) continue
        const inicioMs = inicio.getTime()
        if (inicioMs < primero) continue
        const finMs = inicioMs + duracionMin * MS_MINUTO
        const ocupado = ocupados.some(
          (o) => inicioMs < o.fin.getTime() && o.inicio.getTime() < finMs
        )
        if (ocupado) continue
        resultado.set(inicioMs, { inicio, fin: new Date(finMs) })
      }
    }
  }

  return [...resultado.values()].sort((a, b) => a.inicio.getTime() - b.inicio.getTime())
}

/** Atajos de formato en hora de Madrid, para pantallas y correos. */
const fmtFecha = new Intl.DateTimeFormat("es-ES", {
  timeZone: ZONA_HORARIA,
  weekday: "long",
  day: "numeric",
  month: "long",
})
const fmtFechaCorta = new Intl.DateTimeFormat("es-ES", {
  timeZone: ZONA_HORARIA,
  weekday: "short",
  day: "numeric",
  month: "short",
})
const fmtHora = new Intl.DateTimeFormat("es-ES", {
  timeZone: ZONA_HORARIA,
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23",
})

/** "jueves, 12 de noviembre" */
export function formatearFecha(fecha: Date): string {
  return fmtFecha.format(fecha)
}

/** "jue, 12 nov" */
export function formatearFechaCorta(fecha: Date): string {
  return fmtFechaCorta.format(fecha)
}

/** "09:30" */
export function formatearHora(fecha: Date): string {
  return fmtHora.format(fecha)
}
