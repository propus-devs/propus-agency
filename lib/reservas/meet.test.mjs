// Pruebas del enlace de Meet por reserva, sin red: una clave RSA de prueba y un
// fetch falso. Se ejecutan con `npm test` (node --test).
import test from "node:test"
import assert from "node:assert/strict"
import { createPublicKey, createVerify, generateKeyPairSync } from "node:crypto"
import { crearMeet, firmarJwt, leerCuentaServicio } from "./meet.ts"

const { privateKey, publicKey } = generateKeyPairSync("rsa", {
  modulusLength: 2048,
  privateKeyEncoding: { type: "pkcs8", format: "pem" },
  publicKeyEncoding: { type: "spki", format: "pem" },
})
const cuenta = { client_email: "propus@proyecto.iam.gserviceaccount.com", private_key: privateKey }
const crudo = JSON.stringify(cuenta)
const reunion = {
  inicio: new Date("2026-11-16T08:30:00Z"),
  fin: new Date("2026-11-16T08:45:00Z"),
  nombre: "Ana",
  descripcion: "Reserva desde propus.es",
}
const entorno = { cuenta: crudo, usuario: "team@propus.es" }
const ahora = new Date("2026-11-13T10:00:00Z")

/** fetch falso: guarda las llamadas y contesta lo que se le diga, en orden. */
function falso(...respuestas) {
  const llamadas = []
  const f = async (url, init) => {
    llamadas.push({ url: String(url), init })
    const r = respuestas.shift() ?? { ok: false, status: 500, json: {} }
    return { ok: r.ok ?? true, status: r.status ?? 200, json: async () => r.json }
  }
  return { f, llamadas }
}

test("la clave de la cuenta de servicio vale en crudo o en base64, y rechaza lo demás", () => {
  assert.equal(leerCuentaServicio(crudo)?.client_email, cuenta.client_email)
  assert.equal(leerCuentaServicio(Buffer.from(crudo).toString("base64"))?.client_email, cuenta.client_email)
  assert.equal(leerCuentaServicio("no es json"), null)
  assert.equal(leerCuentaServicio(JSON.stringify({ client_email: "x" })), null)
  assert.equal(leerCuentaServicio(undefined), null)
})

test("el JWT lleva el usuario al que se suplanta, el alcance y una firma válida", () => {
  const jwt = firmarJwt(cuenta, "team@propus.es", 1_000)
  const [cab, cuerpo, firma] = jwt.split(".")
  const claims = JSON.parse(Buffer.from(cuerpo, "base64url").toString())
  assert.equal(JSON.parse(Buffer.from(cab, "base64url").toString()).alg, "RS256")
  assert.equal(claims.iss, cuenta.client_email)
  assert.equal(claims.sub, "team@propus.es")
  assert.equal(claims.scope, "https://www.googleapis.com/auth/calendar.events")
  assert.equal(claims.exp - claims.iat, 3600)
  const ok = createVerify("RSA-SHA256")
    .update(`${cab}.${cuerpo}`)
    .verify(createPublicKey(publicKey), Buffer.from(firma, "base64url"))
  assert.ok(ok, "la firma debe verificarse con la clave pública")
})

test("crea el evento con Meet y devuelve el enlace", async () => {
  const { f, llamadas } = falso(
    { json: { access_token: "token-1" } },
    { json: { hangoutLink: "https://meet.google.com/abc-defg-hij" } }
  )
  const enlace = await crearMeet(reunion, entorno, f, ahora)
  assert.equal(enlace, "https://meet.google.com/abc-defg-hij")
  assert.equal(llamadas.length, 2)
  assert.match(llamadas[1].url, /calendars\/primary\/events\?conferenceDataVersion=1&sendUpdates=none$/)
  assert.equal(llamadas[1].init.headers.Authorization, "Bearer token-1")
  const evento = JSON.parse(llamadas[1].init.body)
  assert.equal(evento.summary, "Llamada Propus · Ana")
  assert.equal(evento.start.dateTime, "2026-11-16T08:30:00.000Z")
  assert.equal(evento.conferenceData.createRequest.conferenceSolutionKey.type, "hangoutsMeet")
  assert.equal(evento.attendees, undefined, "no se invita a nadie")
})

test("también lee el enlace de conferenceData si no viene hangoutLink", async () => {
  const { f } = falso(
    { json: { access_token: "t" } },
    { json: { conferenceData: { entryPoints: [{ entryPointType: "video", uri: "https://meet.google.com/xyz" }] } } }
  )
  assert.equal(await crearMeet(reunion, entorno, f, ahora), "https://meet.google.com/xyz")
})

test("sin configurar o si Google falla devuelve null (se usa el enlace fijo)", async () => {
  const silencio = console.error
  const silencioAviso = console.warn
  console.error = () => {}
  console.warn = () => {}
  try {
    assert.equal(await crearMeet(reunion, {}, falso().f, ahora), null)
    assert.equal(await crearMeet(reunion, { cuenta: crudo }, falso().f, ahora), null) // falta el usuario
    assert.equal(await crearMeet(reunion, entorno, falso({ ok: false, status: 401, json: {} }).f, ahora), null)
    assert.equal(
      await crearMeet(reunion, entorno, falso({ json: { access_token: "t" } }, { ok: false, status: 403, json: {} }).f, ahora),
      null
    )
    assert.equal(
      await crearMeet(reunion, entorno, falso({ json: { access_token: "t" } }, { json: { hangoutLink: "http://inseguro" } }).f, ahora),
      null
    )
    const roto = async () => { throw new Error("sin red") }
    assert.equal(await crearMeet(reunion, entorno, roto, ahora), null)
  } finally {
    console.error = silencio
    console.warn = silencioAviso
  }
})

test("el registro dice el motivo que da Google y por qué no está configurado", async () => {
  const errores = []
  const avisos = []
  const e0 = console.error
  const w0 = console.warn
  console.error = (m) => errores.push(String(m))
  console.warn = (m) => avisos.push(String(m))
  try {
    await crearMeet(reunion, entorno, falso({ ok: false, status: 401, json: { error: "unauthorized_client", error_description: "Client is unauthorized" } }).f, ahora)
    await crearMeet(
      reunion,
      entorno,
      falso({ json: { access_token: "t" } }, { ok: false, status: 403, json: { error: { message: "API no activada", errors: [{ reason: "accessNotConfigured" }] } } }).f,
      ahora
    )
    await crearMeet(reunion, { usuario: "x@propus.es" }, falso().f, ahora)
    await crearMeet(reunion, { cuenta: "basura", usuario: "x@propus.es" }, falso().f, ahora)
    await crearMeet(reunion, { cuenta: crudo }, falso().f, ahora)
  } finally {
    console.error = e0
    console.warn = w0
  }
  assert.match(errores[0], /HTTP 401 unauthorized_client — Client is unauthorized/)
  assert.match(errores[1], /HTTP 403 accessNotConfigured — API no activada/)
  assert.match(avisos[0], /falta GOOGLE_CUENTA_SERVICIO/)
  assert.match(avisos[1], /no es un JSON válido/)
  assert.match(avisos[2], /falta GOOGLE_CALENDAR_USUARIO/)
})
