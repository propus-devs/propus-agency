import "server-only"
import { calcularAgenda, parsearFechaHoraMadrid, sumarDias, type Franja, type Hueco } from "./huecos"
import {
  listarBloqueosEntre,
  listarCerrados,
  listarFranjas,
  listarReservasEntre,
  obtenerAjustes,
  type Ajustes,
  type Bloqueo,
  type Reserva,
} from "./repo"

export type Agenda = {
  ajustes: Ajustes
  franjas: Franja[]
  /** Todos los huecos teóricos del rango, con su estado. */
  huecos: Hueco[]
  /** Reservas (también canceladas) que se tocan con el rango. */
  reservas: Reserva[]
  bloqueos: Bloqueo[]
}

/**
 * Carga de la base de datos todo lo que define la agenda entre dos días de
 * Madrid (inclusive) y calcula el estado de cada hueco. Es lo que usa el
 * calendario del admin y lo que usará la web pública: así lo que se ve fuera es
 * siempre lo que hay configurado dentro, sin copias ni cachés por medio.
 */
export async function cargarAgenda(args: {
  ahora: Date
  desde: string
  hasta: string
}): Promise<Agenda> {
  const { ahora, desde, hasta } = args
  const inicio = parsearFechaHoraMadrid(desde, "00:00")
  const despues = sumarDias(hasta, 1)
  const fin = despues ? parsearFechaHoraMadrid(despues, "00:00") : null
  if (!inicio || !fin) throw new Error("Rango de fechas no válido")

  const [ajustes, franjas, reservas, bloqueos, cerrados] = await Promise.all([
    obtenerAjustes(),
    listarFranjas(),
    listarReservasEntre(inicio, fin),
    listarBloqueosEntre(inicio, fin),
    listarCerrados(inicio, fin),
  ])

  const huecos = calcularAgenda({
    ahora,
    desde,
    hasta,
    franjas,
    config: ajustes,
    reservas: reservas.filter((r) => r.estado === "confirmada"),
    bloqueos: bloqueos.map((b) => ({ inicio: b.desde, fin: b.hasta })),
    cerrados,
  })
  return { ajustes, franjas, huecos, reservas, bloqueos }
}
