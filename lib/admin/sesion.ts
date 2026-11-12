import "server-only"
import { cookies, headers } from "next/headers"
import { redirect } from "next/navigation"
import { ipDeCabeceras } from "@/lib/http/ip"
import { firmarSesion, huellaPassword, leerSesion } from "./token"

/**
 * Sesión del admin: cookie firmada, solo para /admin, de 7 días.
 * Es una cookie técnica (necesaria para entrar): no requiere banner.
 *
 * Variables de entorno:
 *  - ADMIN_PASSWORD_HASH: hash de la contraseña (`node scripts/hash-password.mjs`).
 *  - AUTH_SECRET: secreto para firmar la cookie (32 caracteres o más).
 * Si falta alguna, el admin queda cerrado: nunca hay contraseña por defecto.
 */

export const COOKIE_SESION = "propus_admin"
const DURACION_SEG = 7 * 24 * 60 * 60

type Credenciales = { hash: string; secreto: string }

function credenciales(): Credenciales | null {
  const hash = process.env.ADMIN_PASSWORD_HASH
  const secreto = process.env.AUTH_SECRET
  if (!hash || !secreto || secreto.length < 32) return null
  return { hash, secreto }
}

export function adminConfigurado(): boolean {
  return credenciales() !== null
}

/** Hash guardado de la contraseña, para comprobarla en el login. */
export function hashConfigurado(): string | null {
  return credenciales()?.hash ?? null
}

export async function abrirSesion(): Promise<void> {
  const c = credenciales()
  if (!c) throw new Error("Admin sin configurar")
  const token = firmarSesion(
    { exp: Math.floor(Date.now() / 1000) + DURACION_SEG, v: huellaPassword(c.hash) },
    c.secreto
  )
  const jar = await cookies()
  jar.set(COOKIE_SESION, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/admin",
    maxAge: DURACION_SEG,
  })
}

export async function cerrarSesion(): Promise<void> {
  const jar = await cookies()
  jar.set(COOKIE_SESION, "", { path: "/admin", maxAge: 0 })
}

export async function haySesion(): Promise<boolean> {
  // La cookie se lee SIEMPRE y la primera. Es lo que le dice a Next que la
  // página depende de la petición. Si se comprobaran antes las variables de
  // entorno, durante `next build` (donde no existen) se saldría sin tocar la
  // petición y Next prerenderizaría el admin como una redirección fija al login.
  const token = (await cookies()).get(COOKIE_SESION)?.value
  const c = credenciales()
  if (!c || !token) return false
  const carga = leerSesion(token, c.secreto, Math.floor(Date.now() / 1000))
  return carga !== null && carga.v === huellaPassword(c.hash)
}

/**
 * Corta la petición si no hay sesión. Va en CADA página y CADA acción del
 * admin: el layout no basta, porque no se vuelve a ejecutar al navegar entre
 * páginas y las acciones se pueden llamar sueltas.
 */
export async function exigirAdmin(): Promise<void> {
  if (!(await haySesion())) redirect("/admin/login")
}

/**
 * IP del visitante, para limitar intentos. Detrás del proxy de Easypanel se usa
 * el ÚLTIMO valor de X-Forwarded-For, que es el que añade nuestro proxy; los
 * anteriores los puede escribir el propio visitante.
 */
export async function ipCliente(): Promise<string> {
  return ipDeCabeceras(await headers())
}
