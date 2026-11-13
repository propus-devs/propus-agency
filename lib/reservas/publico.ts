import "server-only"
import { esHuecoOcupado } from "@/lib/db"
import { cargarAgenda } from "./agenda"
import { mesDe, parsearMes, sumarMeses } from "./calendario"
import { claveDiaMadrid, formatearHora, sumarDias } from "./huecos"
import type { DiaPublico, RespuestaMes, RespuestaReserva } from "./publico-tipos"
import { contarReservasFuturas, crearReserva, obtenerAjustes } from "./repo"
import { crearTicket, validarTicket } from "./ticket"
import { leerReservaPublica } from "./validacion"

/**
 * Lógica de la web pública de reservas. Lee SIEMPRE la agenda de la base de
 * datos con `cargarAgenda` (la misma función que usa el calendario del admin) y
 * enseña solo los huecos `libre`: sin copias ni cachés, lo que se cambia en el
 * admin se ve fuera al instante.
 */

/** Reservas confirmadas y futuras que puede tener a la vez un mismo correo. */
export const MAX_RESERVAS_POR_CORREO = 2

/** Secreto para firmar el ticket del formulario: el mismo AUTH_SECRET del admin. */
export function secretoDeFormularios(): string | null {
  const secreto = process.env.AUTH_SECRET
  return secreto && secreto.length >= 32 ? secreto : null
}

/** Ticket nuevo para un formulario que se acaba de abrir (null si el servidor no puede firmarlo). */
export function ticketNuevo(ahora = new Date()): string | null {
  const secreto = secretoDeFormularios()
  return secreto ? crearTicket(secreto, Math.floor(ahora.getTime() / 1000)) : null
}

/** Huecos libres de un mes, ya recortado a lo que se puede reservar (de hoy a "días por delante"). */
export async function cargarMes(
  mesPedido: string | undefined,
  ahora = new Date()
): Promise<RespuestaMes> {
  const ajustes = await obtenerAjustes()
  const hoy = claveDiaMadrid(ahora)
  const ultimo = sumarDias(hoy, ajustes.ventanaDias) ?? hoy
  const mesMin = mesDe(hoy)
  const mesMax = mesDe(ultimo)

  // Los meses "AAAA-MM" se ordenan bien como texto.
  let mes = parsearMes(mesPedido) && mesPedido ? mesPedido : mesMin
  if (mes < mesMin) mes = mesMin
  if (mes > mesMax) mes = mesMax

  const base = { duracionMin: ajustes.duracionMin, mes, mesMin, mesMax }
  if (!ajustes.activo) return { ...base, abierta: false, dias: [] }

  const primero = `${mes}-01`
  const siguiente = sumarMeses(mes, 1)
  const ultimoDelMes = (siguiente && sumarDias(`${siguiente}-01`, -1)) || primero
  const desde = primero < hoy ? hoy : primero
  const hasta = ultimoDelMes > ultimo ? ultimo : ultimoDelMes

  const { huecos } = await cargarAgenda({ ahora, desde, hasta })
  // Cada día lleva sus huecos libres y, apagados, los marcados a mano como ocupados (en orden de
  // hora). Un día solo sale si tiene al menos un hueco libre.
  const porDia = new Map<string, DiaPublico & { libres: number }>()
  for (const h of huecos) {
    if (h.estado !== "libre" && h.estado !== "simulado") continue
    const fecha = claveDiaMadrid(h.inicio)
    const dia = porDia.get(fecha) ?? { fecha, huecos: [], libres: 0 }
    const libre = h.estado === "libre"
    dia.huecos.push({
      inicio: h.inicio.toISOString(),
      hora: formatearHora(h.inicio),
      ...(libre ? {} : { ocupado: true as const }),
    })
    if (libre) dia.libres += 1
    porDia.set(fecha, dia)
  }
  const dias: DiaPublico[] = [...porDia.values()]
    .filter((d) => d.libres > 0)
    .map(({ fecha, huecos: lista }) => ({ fecha, huecos: lista }))
  return { ...base, abierta: true, dias }
}

/** Mes con el que abre la página: el primero, desde hoy, que tenga algún hueco libre. */
export async function cargarInicial(ahora = new Date()): Promise<RespuestaMes> {
  const primera = await cargarMes(undefined, ahora)
  let actual = primera
  for (let i = 0; i < 4 && actual.abierta && actual.dias.length === 0 && actual.mes < actual.mesMax; i++) {
    const siguiente = sumarMeses(actual.mes, 1)
    if (!siguiente) break
    actual = await cargarMes(siguiente, ahora)
  }
  return actual.dias.length > 0 ? actual : primera
}

type Resultado = { estado: number; cuerpo: RespuestaReserva }

const error = (
  estado: number,
  codigo: Extract<RespuestaReserva, { ok: false }>["error"],
  mensaje: string,
  campo?: string
): Resultado => ({ estado, cuerpo: { ok: false, error: codigo, mensaje, ...(campo ? { campo } : {}) } })

/**
 * Crea una reserva a partir de lo que manda el formulario público. Cada paso
 * que falla devuelve un código y un mensaje para la persona; ninguno revela
 * datos de otras reservas.
 */
export async function reservar(
  cuerpo: unknown,
  ajustes: { ahora: Date; secreto: string | null }
): Promise<Resultado> {
  const { ahora, secreto } = ajustes
  if (!secreto) {
    return error(503, "no-disponible", "Ahora mismo no podemos aceptar reservas. Escríbenos por correo.")
  }

  const leido = leerReservaPublica(cuerpo)
  if (!leido.ok) {
    // Un robot rellenó el campo trampa: parece que salió bien y no se guarda nada.
    if (leido.error === "honeypot") return { estado: 200, cuerpo: { ok: true, inicio: "", fin: "" } }
    return error(400, "datos", leido.mensaje, leido.campo)
  }
  const d = leido.datos

  const ticket = validarTicket(d.ticket, secreto, Math.floor(ahora.getTime() / 1000))
  if (ticket === "caducado") {
    return error(400, "ticket-caducado", "La página lleva mucho tiempo abierta. Recárgala e inténtalo de nuevo.")
  }
  if (ticket === "demasiado-rapido") {
    return error(400, "ticket", "Vas muy rápido. Espera unos segundos e inténtalo de nuevo.")
  }
  if (ticket !== "ok") {
    return error(400, "ticket", "No hemos podido comprobar el formulario. Recarga la página e inténtalo de nuevo.")
  }

  const config = await obtenerAjustes()
  if (!config.activo) {
    return error(409, "cerrado", "Ahora mismo no se aceptan reservas. Escríbenos por correo y te buscamos hueco.")
  }

  // Solo se puede reservar un hueco que el cliente ve: libre (no cerrado, oculto, bloqueado ni reservado).
  const dia = claveDiaMadrid(d.inicio)
  const { huecos } = await cargarAgenda({ ahora, desde: dia, hasta: dia })
  const hueco = huecos.find((h) => h.inicio.getTime() === d.inicio.getTime())
  if (!hueco || hueco.estado !== "libre") {
    return error(409, "hueco-ocupado", "Ese hueco ya no está disponible. Elige otra hora.", "inicio")
  }

  if ((await contarReservasFuturas(d.email)) >= MAX_RESERVAS_POR_CORREO) {
    return error(
      429,
      "limite-email",
      "Ya tienes reservas pendientes con este correo. Si necesitas cambiarlas, escríbenos.",
      "email"
    )
  }

  try {
    await crearReserva({
      inicio: hueco.inicio,
      fin: hueco.fin,
      nombre: d.nombre,
      email: d.email,
      telefono: d.telefono,
      mensaje: d.mensaje,
    })
  } catch (e) {
    // Dos personas pulsaron a la vez: la restricción de la base deja pasar solo a una.
    if (esHuecoOcupado(e)) {
      return error(409, "hueco-ocupado", "Ese hueco se acaba de ocupar. Elige otra hora.", "inicio")
    }
    throw e
  }

  return { estado: 201, cuerpo: { ok: true, inicio: hueco.inicio.toISOString(), fin: hueco.fin.toISOString() } }
}
