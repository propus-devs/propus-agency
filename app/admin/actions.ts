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
import {
  borrarBloqueo,
  cancelarReserva,
  crearBloqueo,
  guardarAjustes,
  guardarFranjas,
} from "@/lib/reservas/repo"
import {
  esUuid,
  leerAjustes,
  leerBloqueo,
  leerEnteroPositivo,
  leerHorario,
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

export async function guardarAjustesAccion(datos: FormData): Promise<void> {
  await exigirAdmin()
  const r = leerAjustes(lector(datos))
  if (!r.ok) redirect(`/admin/horarios?error=${r.error}`)
  const bien = await intentar(() => guardarAjustes(r.ajustes))
  redirect(bien ? "/admin/horarios?ok=ajustes" : "/admin/horarios?error=servidor")
}

export async function guardarHorarioAccion(datos: FormData): Promise<void> {
  await exigirAdmin()
  const r = leerHorario(lector(datos))
  if (!r.ok) redirect(`/admin/horarios?error=${r.error}&dia=${r.dia ?? ""}`)
  const bien = await intentar(() => guardarFranjas(r.franjas))
  redirect(bien ? "/admin/horarios?ok=horario" : "/admin/horarios?error=servidor")
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
