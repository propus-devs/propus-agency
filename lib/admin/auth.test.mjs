// Pruebas de la contraseña, la sesión firmada y el límite de intentos.
import test from "node:test"
import assert from "node:assert/strict"
import { hashPassword, verificarPassword } from "./password.ts"
import { firmarSesion, huellaPassword, leerSesion } from "./token.ts"
import {
  MAX_FALLOS,
  VENTANA_MS,
  anotarAcierto,
  anotarFallo,
  comprobarLogin,
  reiniciarLimite,
} from "./limite.ts"

test("password: la correcta entra y cualquier otra no", async () => {
  const guardado = await hashPassword("una-clave-larga-de-prueba")
  assert.match(guardado, /^scrypt\.32768\.8\.3\.[\w-]+\.[\w-]+$/)
  assert.ok(!guardado.includes("$"))
  assert.equal(await verificarPassword("una-clave-larga-de-prueba", guardado), true)
  assert.equal(await verificarPassword("otra-clave", guardado), false)
  assert.equal(await verificarPassword("", guardado), false)
})

test("password: dos hashes de la misma clave son distintos (sal aleatoria)", async () => {
  const a = await hashPassword("misma-clave-larga-1")
  const b = await hashPassword("misma-clave-larga-1")
  assert.notEqual(a, b)
})

test("password: un valor guardado roto o absurdo se rechaza sin colgarse", async () => {
  assert.equal(await verificarPassword("x", ""), false)
  assert.equal(await verificarPassword("x", "texto-cualquiera"), false)
  assert.equal(await verificarPassword("x", "scrypt.1.1.1.aaaa.bbbb"), false)
  assert.equal(await verificarPassword("x", "scrypt.1073741824.8.3.aaaa.bbbb"), false)
  assert.equal(await verificarPassword("x", "bcrypt.32768.8.3.aaaa.bbbb"), false)
})

const SECRETO = "s".repeat(48)
const AHORA = 1_800_000_000

test("sesión: un token firmado se lee de vuelta", () => {
  const token = firmarSesion({ exp: AHORA + 100, v: "abc" }, SECRETO)
  assert.deepEqual(leerSesion(token, SECRETO, AHORA), { exp: AHORA + 100, v: "abc" })
})

test("sesión: caducada, con otro secreto o manipulada no vale", () => {
  const token = firmarSesion({ exp: AHORA + 100, v: "abc" }, SECRETO)
  assert.equal(leerSesion(token, SECRETO, AHORA + 100), null)
  assert.equal(leerSesion(token, "o".repeat(48), AHORA), null)

  const [cuerpo, firma] = token.split(".")
  const otro = Buffer.from(JSON.stringify({ exp: AHORA + 99999, v: "abc" })).toString("base64url")
  assert.equal(leerSesion(`${otro}.${firma}`, SECRETO, AHORA), null)
  assert.equal(leerSesion(`${cuerpo}.${firma.slice(0, -2)}`, SECRETO, AHORA), null)
  assert.equal(leerSesion("", SECRETO, AHORA), null)
  assert.equal(leerSesion("a.b.c", SECRETO, AHORA), null)
})

test("sesión: la huella cambia si cambia la contraseña", () => {
  assert.notEqual(huellaPassword("scrypt.1"), huellaPassword("scrypt.2"))
  assert.equal(huellaPassword("scrypt.1"), huellaPassword("scrypt.1"))
})

test("límite: bloquea a la IP tras 5 fallos y la libera pasados 15 minutos", () => {
  reiniciarLimite()
  const t0 = 1_000_000
  for (let i = 0; i < MAX_FALLOS - 1; i++) {
    assert.equal(comprobarLogin("1.1.1.1", t0).permitido, true)
    anotarFallo("1.1.1.1", t0)
  }
  assert.equal(comprobarLogin("1.1.1.1", t0).permitido, true)
  anotarFallo("1.1.1.1", t0)
  const bloqueo = comprobarLogin("1.1.1.1", t0 + 1000)
  assert.equal(bloqueo.permitido, false)
  assert.equal(bloqueo.esperaSeg, Math.ceil((VENTANA_MS - 1000) / 1000))
  // Otra IP no se ve afectada.
  assert.equal(comprobarLogin("2.2.2.2", t0 + 1000).permitido, true)
  // Pasada la ventana, vuelve a poder intentarlo.
  assert.equal(comprobarLogin("1.1.1.1", t0 + VENTANA_MS).permitido, true)
})

test("límite: un acierto borra los fallos acumulados", () => {
  reiniciarLimite()
  for (let i = 0; i < MAX_FALLOS - 1; i++) anotarFallo("3.3.3.3", 5000)
  anotarAcierto("3.3.3.3")
  for (let i = 0; i < MAX_FALLOS - 1; i++) anotarFallo("3.3.3.3", 5000)
  assert.equal(comprobarLogin("3.3.3.3", 5000).permitido, true)
})
