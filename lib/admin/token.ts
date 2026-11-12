/**
 * Sesión del admin: un token firmado con HMAC-SHA256, sin estado en servidor.
 *
 * Lleva la caducidad (`exp`, en segundos) y una huella de la contraseña (`v`):
 * al cambiar la contraseña, todas las sesiones abiertas dejan de valer.
 * Cambiar AUTH_SECRET las invalida también.
 *
 * Módulo puro (solo node:crypto) para poder probarlo sin Next.
 */
import { createHash, createHmac, timingSafeEqual } from "node:crypto"

export type CargaSesion = { exp: number; v: string }

export function huellaPassword(hashGuardado: string): string {
  return createHash("sha256").update(hashGuardado).digest("hex").slice(0, 16)
}

function firma(cuerpo: string, secreto: string): string {
  return createHmac("sha256", secreto).update(cuerpo).digest("base64url")
}

export function firmarSesion(carga: CargaSesion, secreto: string): string {
  const cuerpo = Buffer.from(JSON.stringify(carga)).toString("base64url")
  return `${cuerpo}.${firma(cuerpo, secreto)}`
}

/** Devuelve la carga si la firma es válida y no ha caducado; si no, null. */
export function leerSesion(token: string, secreto: string, ahoraSeg: number): CargaSesion | null {
  const partes = token.split(".")
  if (partes.length !== 2) return null
  const [cuerpo, recibida] = partes

  const esperada = Buffer.from(firma(cuerpo, secreto))
  const obtenida = Buffer.from(recibida)
  if (esperada.length !== obtenida.length || !timingSafeEqual(esperada, obtenida)) return null

  try {
    const carga: unknown = JSON.parse(Buffer.from(cuerpo, "base64url").toString("utf8"))
    if (typeof carga !== "object" || carga === null) return null
    const { exp, v } = carga as Record<string, unknown>
    if (typeof exp !== "number" || typeof v !== "string") return null
    if (exp <= ahoraSeg) return null
    return { exp, v }
  } catch {
    return null
  }
}
