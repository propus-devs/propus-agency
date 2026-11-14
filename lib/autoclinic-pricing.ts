/**
 * Precios y aritmética de la calculadora de AutoClinic.
 *
 * Funciones puras, sin React: se pueden leer, probar y reutilizar desde
 * cualquier sitio. Aquí no hay ningún supuesto escondido — los dos únicos
 * supuestos de la calculadora (no-shows que evita el agente y horas que se
 * lleva) los introduce quien la usa, nunca este archivo.
 */

/* ── Precio ───────────────────────────────────────────────────────────────
   Decidido el 2026-11-14: «99 € la consulta, 45 € cada profesional más».
   Sustituye al esquema por topes de citas, que calibraba los topes muy por
   debajo del uso real de una clínica. Importes sin IVA.

   Dos cosas que NO se publican, por decisión de planes-auto-clinic/PRICING.md:
   el alta (palanca de negociación) y el prepago anual (última palanca de
   cierre). Por eso ALTA vive aquí pero no aparece en la página. */

/** Cuota mensual de la consulta de un profesional. */
export const CUOTA_BASE = 99
/** Lo que suma cada profesional a partir del segundo. */
export const CUOTA_PROFESIONAL = 45
/**
 * Hasta cuántos profesionales se publica la tarifa. A partir del siguiente va
 * por presupuesto: es donde el margen baja del 60 % y donde más soporte
 * consume la clínica, así que pasa por una llamada y no por una tabla.
 */
export const PROFESIONALES_PUBLICADOS = 4

/**
 * Tope de uso justo: conversaciones del agente por profesional y mes.
 * Una clínica con mucho movimiento se queda sobre las 150-200, así que está
 * puesto a unas tres veces el uso real. Se publica porque es un argumento de
 * venta frente a quien incluye 1.000 respuestas para toda la clínica.
 */
export const TOPE_CONVERSACIONES = 500

/** Alta y puesta en marcha, pago único. No se publica en la web. */
export const ALTA = 300

export const MIN_PROFESIONALES = 1
export const MAX_PROFESIONALES = 20

/** Semanas por mes (52 / 12), para pasar de horas semanales a mensuales. */
export const SEMANAS_POR_MES = 4.33

/** Cuota mensual: la base más cada profesional a partir del segundo. */
export function cuotaMensual(profesionales: number): number {
  const n = Math.min(
    MAX_PROFESIONALES,
    Math.max(MIN_PROFESIONALES, Math.round(profesionales))
  )
  return CUOTA_BASE + CUOTA_PROFESIONAL * (n - 1)
}

/** Conversaciones del agente incluidas al mes con ese número de profesionales. */
export function conversacionesIncluidas(profesionales: number): number {
  const n = Math.min(
    MAX_PROFESIONALES,
    Math.max(MIN_PROFESIONALES, Math.round(profesionales))
  )
  return TOPE_CONVERSACIONES * n
}

/** Los tramos que se publican en la página: de 1 a PROFESIONALES_PUBLICADOS. */
export function tramosPublicados(): { profesionales: number; cuota: number }[] {
  return Array.from({ length: PROFESIONALES_PUBLICADOS }, (_, i) => ({
    profesionales: i + 1,
    cuota: cuotaMensual(i + 1),
  }))
}

/**
 * Cuántos no-shows hay que evitar al mes para que la cuota se pague sola.
 * Es una división, no una estimación: por eso preside el panel de resultados.
 */
export function noShowsParaCubrirCuota(
  cuota: number,
  precioMedio: number
): number | null {
  if (precioMedio <= 0) return null
  return Math.ceil(cuota / precioMedio)
}

/** La misma división sin redondear, para poder enseñar la aritmética. */
export function citasEquivalentes(
  cuota: number,
  precioMedio: number
): number | null {
  if (precioMedio <= 0) return null
  return cuota / precioMedio
}

/**
 * Punto de partida para el campo editable de no-shows evitados: uno de cada
 * tres de los actuales. Es solo una sugerencia, el usuario la reescribe.
 */
export function sugerenciaNoShowsEvitados(noShowsActuales: number): number {
  if (noShowsActuales <= 0) return 1
  return Math.max(1, Math.round(noShowsActuales / 3))
}

/** Lo que vale una hora de consulta, según precio y duración de la cita. */
export function valorHora(
  precioMedio: number,
  duracionCita: number
): number | null {
  if (precioMedio <= 0 || duracionCita <= 0) return null
  return (precioMedio * 60) / duracionCita
}

/**
 * Punto de partida para el campo editable de horas: la mitad de las que
 * dedica hoy, en tramos de media hora. También es solo una sugerencia.
 */
export function sugerenciaHorasAgente(horasSemana: number): number {
  if (horasSemana <= 0) return 0.5
  return Math.max(0.5, Math.round((horasSemana / 2) * 2) / 2)
}

/** Horas al mes a partir de horas a la semana. */
export function horasAlMes(horasSemana: number): number {
  return horasSemana * SEMANAS_POR_MES
}

/** Balance mensual: lo recuperado menos la cuota. Puede salir negativo. */
export function balanceMensual(
  noShowsEvitados: number,
  precioMedio: number,
  cuota: number
): number {
  return noShowsEvitados * precioMedio - cuota
}

/** Meses que tarda el alta en amortizarse. null si el balance no la cubre. */
export function mesesParaAmortizarAlta(balance: number): number | null {
  if (balance <= 0) return null
  return Math.ceil(ALTA / balance)
}

/* ── Formato ──────────────────────────────────────────────────────────────
   Siempre es-ES: coma decimal y el símbolo detrás. Nunca toFixed, que
   escribe el punto anglosajón. */

const fmtEuros = new Intl.NumberFormat("es-ES", {
  style: "currency",
  currency: "EUR",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
})

const fmtDecimal = new Intl.NumberFormat("es-ES", {
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
})

const fmtEntero = new Intl.NumberFormat("es-ES", {
  maximumFractionDigits: 0,
})

function esValido(v: number | null | undefined): v is number {
  return typeof v === "number" && Number.isFinite(v)
}

/** Euros sin decimales. Un valor imposible se muestra como raya, nunca NaN. */
export function euros(v: number | null | undefined): string {
  return esValido(v) ? fmtEuros.format(v) : "—"
}

/** Citas y horas, con un decimal. */
export function decimal(v: number | null | undefined): string {
  return esValido(v) ? fmtDecimal.format(v) : "—"
}

/** Enteros sueltos. */
export function entero(v: number | null | undefined): string {
  return esValido(v) ? fmtEntero.format(v) : "—"
}
