"use server"

import { redirect } from "next/navigation"
import { anotarAcierto, anotarFallo, comprobarLogin } from "@/lib/admin/limite"
import { verificarPassword } from "@/lib/admin/password"
import {
  abrirSesion,
  adminConfigurado,
  cerrarSesion,
  exigirAdmin,
  hashConfigurado,
  ipCliente,
} from "@/lib/admin/sesion"
import { cargarAgenda } from "@/lib/reservas/agenda"
import { mesDe } from "@/lib/reservas/calendario"
import { claveDiaMadrid } from "@/lib/reservas/huecos"
import {
  alternarCerrado,
  barajarHuecos,
  borrarBloqueo,
  cancelarReserva,
  crearBloqueo,
  guardarAgenda,
} from "@/lib/reservas/repo"
import {
  esUuid,
  leerAjustes,
  leerBloqueo,
  leerEnteroPositivo,
  leerHorario,
  leerInstante,
  type Leer,
} from "@/lib/reservas/validacion"

/**
 * Acciones del admin. Cada una (menos el login) empieza por `exigirAdmin()`:
 * una acción es un endpoint público y hay que comprobar la sesión en ella.
 * Todas terminan en un redirect con ?ok=… o ?error=… (ver lib/admin/mensajes.ts).
 */

function lector(datos: FormData): Leer {
  return (campo) => {
    const valor = datos.get(campo)
    return typeof valor === "string" ? valor.trim() : ""
  }
}

/** Ejecuta algo contra la base de datos; true si salió bien. */
async function intentar(trabajo: () => Promise<void>): Promise<boolean> {
  try {
    await trabajo()
    return true
  } catch (error) {
    console.error("[admin] error en una acción:", error)
    return false
  }
}

// ── Sesión ─────────────────────────────────────────────────────────────────

export async function iniciarSesion(datos: FormData): Promise<void> {
  if (!adminConfigurado()) redirect("/admin/login?error=no-configurado")

  const ip = await ipCliente()
  const limite = comprobarLogin(ip)
  if (!limite.permitido) {
    redirect(`/admin/login?error=bloqueado&espera=${Math.ceil(limite.esperaSeg / 60)}`)
  }

  // El intento se anota ANTES de comprobar la contraseña: así una ráfaga de
  // peticiones simultáneas no se cuela mientras scrypt hace su trabajo.
  anotarFallo(ip)

  const password = datos.get("password")
  const hash = hashConfigurado()
  const correcta =
    typeof password === "string" &&
    password.length > 0 &&
    password.length <= 200 &&
    hash !== null &&
    (await verificarPassword(password, hash))

  if (!correcta) redirect("/admin/login?error=incorrecta")

  anotarAcierto(ip)
  await abrirSesion()
  redirect("/admin")
}

export async function cerrarSesionAccion(): Promise<void> {
  await cerrarSesion()
  redirect("/admin/login")
}

// ── Horario y ajustes ──────────────────────────────────────────────────────

/**
 * Guarda de una vez los ajustes de la agenda y el horario semanal. Si algo no
 * es válido no se guarda NADA (ni los ajustes ni el horario).
 */
export async function guardarAgendaAccion(datos: FormData): Promise<void> {
  await exigirAdmin()
  const leer = lector(datos)
  const ajustes = leerAjustes(leer)
  if (!ajustes.ok) redirect(`/admin/horarios?error=${ajustes.error}`)
  const horario = leerHorario(leer)
  if (!horario.ok) redirect(`/admin/horarios?error=${horario.error}&dia=${horario.dia ?? ""}`)
  const bien = await intentar(() => guardarAgenda(ajustes.ajustes, horario.franjas))
  redirect(bien ? "/admin/horarios?ok=agenda" : "/admin/horarios?error=servidor")
}

/** Cambia cuáles de los huecos se esconden (mismo porcentaje, otro reparto). */
export async function barajarAccion(): Promise<void> {
  await exigirAdmin()
  const bien = await intentar(() => barajarHuecos())
  redirect(bien ? "/admin/horarios?ok=barajado" : "/admin/horarios?error=servidor")
}

// ── Bloqueos ───────────────────────────────────────────────────────────────

export async function crearBloqueoAccion(datos: FormData): Promise<void> {
  await exigirAdmin()
  const r = leerBloqueo(lector(datos))
  if (!r.ok) redirect(`/admin/bloqueos?error=${r.error}`)
  const bien = await intentar(() => crearBloqueo({ desde: r.desde, hasta: r.hasta, motivo: r.motivo }))
  redirect(bien ? "/admin/bloqueos?ok=bloqueo-creado" : "/admin/bloqueos?error=servidor")
}

export async function borrarBloqueoAccion(datos: FormData): Promise<void> {
  await exigirAdmin()
  const id = leerEnteroPositivo(lector(datos)("id"))
  if (id === null) redirect("/admin/bloqueos?error=servidor")
  const bien = await intentar(() => borrarBloqueo(id))
  redirect(bien ? "/admin/bloqueos?ok=bloqueo-borrado" : "/admin/bloqueos?error=servidor")
}

// ── Calendario ─────────────────────────────────────────────────────────────

/** Cierra a mano un hueco libre, o lo vuelve a abrir si estaba cerrado. */
export async function alternarHuecoAccion(datos: FormData): Promise<void> {
  await exigirAdmin()
  const inicio = leerInstante(lector(datos)("inicio"))
  if (!inicio) redirect("/admin/calendario?error=hueco-no-valido")

  const dia = claveDiaMadrid(inicio)
  const volver = `/admin/calendario?mes=${mesDe(dia)}&dia=${dia}`
  let resultado: "hecho" | "no-valido"
  try {
    // Solo se tocan huecos que existen en el horario y no están reservados ni bloqueados.
    const { huecos } = await cargarAgenda({ ahora: new Date(), desde: dia, hasta: dia })
    const hueco = huecos.find((h) => h.inicio.getTime() === inicio.getTime())
    if (hueco && hueco.estado !== "reservado" && hueco.estado !== "bloqueado") {
      await alternarCerrado(inicio)
      resultado = "hecho"
    } else {
      resultado = "no-valido"
    }
  } catch (error) {
    console.error("[admin] no se pudo cambiar el hueco:", error)
    redirect(`${volver}&error=servidor`)
  }
  redirect(resultado === "hecho" ? volver : `${volver}&error=hueco-no-valido`)
}

// ── Reservas ───────────────────────────────────────────────────────────────

export async function cancelarReservaAccion(datos: FormData): Promise<void> {
  await exigirAdmin()
  const id = lector(datos)("id")
  if (!esUuid(id)) redirect("/admin?error=reserva-no-encontrada")
  let cancelada: boolean
  try {
    cancelada = await cancelarReserva(id)
  } catch (error) {
    console.error("[admin] no se pudo cancelar la reserva:", error)
    redirect("/admin?error=servidor")
  }
  redirect(cancelada ? "/admin?ok=reserva-cancelada" : "/admin?error=reserva-no-encontrada")
}
