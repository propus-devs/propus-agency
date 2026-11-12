/**
 * Contraseña del admin: hash scrypt (viene de Node, sin dependencias).
 *
 * Formato guardado: scrypt.N.r.p.sal.hash (sal y hash en base64url). Se evita
 * el `$` de los formatos habituales porque algunos paneles lo interpretan como
 * variable al leer las variables de entorno.
 *
 * Lo usan `scripts/hash-password.mjs` (para generarlo) y el login (para
 * comprobarlo), así que no importa nada de Next.
 */
import { randomBytes, scrypt, timingSafeEqual } from "node:crypto"

const N = 2 ** 15
const R = 8
const P = 3
const LONGITUD = 32
// scrypt reserva ~128·N·r bytes (32 MiB con estos parámetros); el tope por defecto de Node es justo ese.
const MAXMEM = 128 * 1024 * 1024

function derivar(
  password: string,
  sal: Buffer,
  n: number,
  r: number,
  p: number,
  longitud: number
): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    scrypt(password, sal, longitud, { N: n, r, p, maxmem: MAXMEM }, (error, clave) => {
      if (error) reject(error)
      else resolve(clave)
    })
  })
}

export async function hashPassword(password: string): Promise<string> {
  const sal = randomBytes(16)
  const hash = await derivar(password, sal, N, R, P, LONGITUD)
  return ["scrypt", N, R, P, sal.toString("base64url"), hash.toString("base64url")].join(".")
}

export async function verificarPassword(password: string, guardado: string): Promise<boolean> {
  const partes = guardado.split(".")
  if (partes.length !== 6 || partes[0] !== "scrypt") return false
  const n = Number(partes[1])
  const r = Number(partes[2])
  const p = Number(partes[3])
  // Parámetros razonables: un valor absurdo en la variable no debe colgar el servidor.
  const potenciaDeDos = Number.isInteger(n) && n >= 2 ** 10 && n <= 2 ** 17 && (n & (n - 1)) === 0
  if (!potenciaDeDos || !Number.isInteger(r) || r < 1 || r > 16) return false
  if (!Number.isInteger(p) || p < 1 || p > 16) return false

  const sal = Buffer.from(partes[4], "base64url")
  const esperado = Buffer.from(partes[5], "base64url")
  if (sal.length === 0 || esperado.length === 0) return false

  const obtenido = await derivar(password, sal, n, r, p, esperado.length)
  return obtenido.length === esperado.length && timingSafeEqual(obtenido, esperado)
}
