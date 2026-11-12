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

/**
 * Lo que alguien escribe a mano ("9", "930", "9:30", "9.30", "9h30") → "09:30",
 * siempre en 24 horas. null si no es una hora. Se admite "24:00" (medianoche) solo como fin.
 */
export function normalizarHora(texto: string): string | null {
  const limpio = texto.trim().toLowerCase().replace(/[.,h]/g, ":")
  let horas: number
  let minutos: number
  let m: RegExpExecArray | null
  if ((m = /^(\d{1,2}):?$/.exec(limpio))) {
    horas = Number(m[1])
    minutos = 0
  } else if ((m = /^(\d{1,2}):(\d{2})$/.exec(limpio))) {
    horas = Number(m[1])
    minutos = Number(m[2])
  } else if ((m = /^(\d{1,2})(\d{2})$/.exec(limpio))) {
    horas = Number(m[1])
    minutos = Number(m[2])
  } else {
    return null
  }
  if (minutos > 59 || horas > 24 || (horas === 24 && minutos !== 0)) return null
  return minutosAHora(horas * 60 + minutos)
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
 * Estado de cada hueco teórico de la agenda (por orden de prioridad):
 *  - reservado: se pisa con una reserva confirmada.
 *  - bloqueado: cae en un día o tramo bloqueado.
 *  - cerrado:   cerrado a mano en el calendario del admin.
 *  - fuera:     ya pasó, no cumple el aviso mínimo o está más allá de la ventana de días.
 *  - oculto:    se esconde por el porcentaje de visibilidad (ver `calcularAgenda`).
 *  - libre:     el cliente lo ve y lo puede reservar.
 */
export type Estado = "libre" | "reservado" | "bloqueado" | "cerrado" | "fuera" | "oculto"

export type Hueco = Intervalo & { estado: Estado }

export type ConfigAgenda = ConfigHuecos & {
  /** Porcentaje (1–100) de los huecos de cada día que se enseñan al cliente. */
  visibilidadPct: number
  /** Semilla del reparto: con otra semilla se esconden otros huecos. */
  semilla: number
}

/** Mezcla de 32 bits (estilo murmur) para ordenar los huecos "al azar" de forma repetible. */
function mezclar(semilla: number, valor: number): number {
  let h = (semilla ^ 0x9e3779b9) >>> 0
  h = Math.imul(h ^ valor, 0x85ebca6b) >>> 0
  h ^= h >>> 13
  h = Math.imul(h, 0xc2b2ae35) >>> 0
  h ^= h >>> 16
  return h >>> 0
}

function pisa(inicioMs: number, finMs: number, intervalos: Intervalo[]): boolean {
  return intervalos.some((i) => inicioMs < i.fin.getTime() && i.inicio.getTime() < finMs)
}

/**
 * Todos los huecos teóricos entre dos días de Madrid (inclusive, "AAAA-MM-DD"),
 * cada uno con su estado. Es la única fuente de verdad de la agenda: el
 * calendario del admin enseña todos y la web pública solo los `libre`, así que
 * cualquier cambio del admin se ve igual en los dos sitios.
 *
 * Trocea cada franja semanal en llamadas de `duracionMin`, separadas por
 * `margenMin`. El porcentaje de visibilidad se aplica POR DÍA sobre todos los
 * huecos teóricos de ese día (no solo sobre los libres): se esconde exactamente
 * ese reparto, siempre el mismo para una semilla dada, y no se mueve cuando
 * alguien reserva o se bloquea otra cosa.
 */
export function calcularAgenda(args: {
  ahora: Date
  desde: string
  hasta: string
  franjas: Franja[]
  config: ConfigAgenda
  reservas: Intervalo[]
  bloqueos: Intervalo[]
  /** Inicio (ms) de los huecos cerrados a mano. */
  cerrados: Set<number>
}): Hueco[] {
  const { ahora, desde, hasta, franjas, config, reservas, bloqueos, cerrados } = args
  const { duracionMin, margenMin, antelacionHoras, ventanaDias, visibilidadPct, semilla } = config
  if (duracionMin <= 0 || margenMin < 0 || ventanaDias < 0) return []
  const f1 = parsearFecha(desde)
  const f2 = parsearFecha(hasta)
  if (!f1 || !f2) return []

  const paso = duracionMin + margenMin
  const primeroMs = ahora.getTime() + antelacionHoras * MS_HORA
  const ultimoDia = sumarDias(claveDiaMadrid(ahora), ventanaDias) ?? ""
  const resultado: Hueco[] = []

  const dia0 = Date.UTC(f1.anio, f1.mes - 1, f1.dia)
  const diaN = Date.UTC(f2.anio, f2.mes - 1, f2.dia)
  // Tope de 400 días: protege de rangos absurdos.
  for (let t = dia0, vueltas = 0; t <= diaN && vueltas < 400; t += 86_400_000, vueltas++) {
    // Día civil de Madrid (el calendario sigue su curso aunque cambie la hora).
    const civil = new Date(t)
    const anio = civil.getUTCFullYear()
    const mes = civil.getUTCMonth() + 1
    const dia = civil.getUTCDate()
    const iso = civil.getUTCDay() === 0 ? 7 : civil.getUTCDay()
    const clave = `${anio}-${String(mes).padStart(2, "0")}-${String(dia).padStart(2, "0")}`

    const delDia = new Map<number, Intervalo>()
    for (const franja of franjas) {
      if (franja.diaSemana !== iso) continue
      for (let m = franja.inicioMin; m + duracionMin <= franja.finMin; m += paso) {
        const inicio = madridAUtc(anio, mes, dia, Math.floor(m / 60), m % 60)
        if (!inicio) continue
        delDia.set(inicio.getTime(), { inicio, fin: new Date(inicio.getTime() + duracionMin * MS_MINUTO) })
      }
    }
    const slots = [...delDia.entries()].sort((a, b) => a[0] - b[0])

    // Visibilidad: se enseñan los `k` primeros del día según su "azar" repetible.
    const visibles = new Set<number>()
    if (visibilidadPct >= 100) {
      for (const [ms] of slots) visibles.add(ms)
    } else {
      const k = Math.ceil((slots.length * Math.max(0, visibilidadPct)) / 100)
      const porAzar = [...slots].sort(
        (a, b) =>
          mezclar(semilla, Math.floor(a[0] / MS_MINUTO)) - mezclar(semilla, Math.floor(b[0] / MS_MINUTO))
      )
      for (const [ms] of porAzar.slice(0, k)) visibles.add(ms)
    }

    for (const [ms, intervalo] of slots) {
      const finMs = intervalo.fin.getTime()
      let estado: Estado
      if (pisa(ms, finMs, reservas)) estado = "reservado"
      else if (pisa(ms, finMs, bloqueos)) estado = "bloqueado"
      else if (cerrados.has(ms)) estado = "cerrado"
      else if (ms < primeroMs || clave > ultimoDia) estado = "fuera"
      else if (!visibles.has(ms)) estado = "oculto"
      else estado = "libre"
      resultado.push({ ...intervalo, estado })
    }
  }
  return resultado
}

/**
 * Huecos libres de la agenda desde hoy hasta el final de la ventana, ordenados
 * de más próximo a más lejano. Atajo de `calcularAgenda` que descarta todo lo
 * que no sea `libre` y trata `ocupados` como bloqueos.
 *
 * No mira si las reservas están abiertas: eso lo decide quien llama.
 */
export function calcularHuecos(args: {
  ahora: Date
  franjas: Franja[]
  config: ConfigHuecos & Partial<Pick<ConfigAgenda, "visibilidadPct" | "semilla">>
  ocupados: Intervalo[]
  cerrados?: Set<number>
}): Intervalo[] {
  const { ahora, franjas, config, ocupados, cerrados } = args
  if (config.ventanaDias < 0) return []
  const hoy = claveDiaMadrid(ahora)
  const ultimo = sumarDias(hoy, config.ventanaDias)
  if (!ultimo) return []
  return calcularAgenda({
    ahora,
    desde: hoy,
    hasta: ultimo,
    franjas,
    config: { ...config, visibilidadPct: config.visibilidadPct ?? 100, semilla: config.semilla ?? 1 },
    reservas: [],
    bloqueos: ocupados,
    cerrados: cerrados ?? new Set(),
  })
    .filter((h) => h.estado === "libre")
    .map(({ inicio, fin }) => ({ inicio, fin }))
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
