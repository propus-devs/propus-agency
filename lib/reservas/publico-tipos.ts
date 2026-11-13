/**
 * Tipos de lo que viaja entre la web pública de reservas y su API. Solo tipos,
 * sin imports: los usan tanto el servidor como el navegador.
 *
 * Lo que sale hacia fuera es lo mínimo: los huecos que el cliente puede
 * reservar. Nunca cuántas reservas hay, ni quién, ni qué huecos están cerrados
 * u ocultos.
 */

export type HuecoPublico = {
  /** Instante de inicio (ISO, UTC): es lo que se devuelve al reservar. */
  inicio: string
  /** Hora de Madrid ya formateada, "10:30". El navegador no calcula zonas horarias. */
  hora: string
  /**
   * true: hueco marcado a mano como ocupado. Se enseña apagado y no se puede elegir. Para el
   * cliente no se distingue de uno realmente reservado.
   */
  ocupado?: true
}

export type DiaPublico = {
  /** "AAAA-MM-DD" (día de Madrid). */
  fecha: string
  huecos: HuecoPublico[]
}

export type RespuestaMes = {
  /** false si las reservas están en pausa. */
  abierta: boolean
  duracionMin: number
  /** Mes devuelto ("AAAA-MM") y límites entre los que se puede navegar. */
  mes: string
  mesMin: string
  mesMax: string
  /** Solo los días que tienen al menos un hueco libre. */
  dias: DiaPublico[]
}

export type CodigoErrorReserva =
  | "datos"
  | "ticket"
  | "ticket-caducado"
  | "cerrado"
  | "hueco-ocupado"
  | "limite-email"
  | "limite"
  | "origen"
  | "formato"
  | "no-disponible"

export type RespuestaReserva =
  | { ok: true; inicio: string; fin: string }
  | { ok: false; error: CodigoErrorReserva; mensaje: string; campo?: string }
