/**
 * Ticket del formulario de reserva (antispam): una cadena firmada que la página
 * recibe al cargar y que hay que devolver al reservar. Dice cuándo se abrió el
 * formulario, así que un robot que dispara el POST nada más cargar (o sin haber
 * cargado la página) no pasa: hace falta que hayan transcurrido unos segundos
 * (lo que tarda una persona en elegir hora y rellenar sus datos) y que no hayan
 * pasado más de dos horas.
 *
 * Usa el mismo firmador que la sesión del admin, con un `v` que empieza por
 * «reservar:» para que un ticket nunca valga como sesión ni al revés.
 *
 * Importa con extensión `.ts` para poder probarse con `node --test`.
 */
import { firmarSesion, leerSesion } from "../admin/token.ts"

export const TICKET_MIN_SEG = 3
export const TICKET_VIDA_SEG = 2 * 60 * 60

const PREFIJO = "reservar:"

export function crearTicket(secreto: string, ahoraSeg: number): string {
  return firmarSesion({ exp: ahoraSeg + TICKET_VIDA_SEG, v: `${PREFIJO}${ahoraSeg}` }, secreto)
}

export type ResultadoTicket = "ok" | "invalido" | "caducado" | "demasiado-rapido"

export function validarTicket(ticket: string, secreto: string, ahoraSeg: number): ResultadoTicket {
  // Se lee con "ahora = 0" para comprobar solo la firma y distinguir después caducado de falso.
  const carga = leerSesion(ticket, secreto, 0)
  if (!carga || !carga.v.startsWith(PREFIJO)) return "invalido"
  const emitido = Number(carga.v.slice(PREFIJO.length))
  if (!Number.isInteger(emitido)) return "invalido"
  if (carga.exp <= ahoraSeg) return "caducado"
  if (ahoraSeg - emitido < TICKET_MIN_SEG) return "demasiado-rapido"
  return "ok"
}
