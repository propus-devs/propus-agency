// Pruebas de las piezas de la reserva pública: validación del formulario,
// ticket antispam, límite de peticiones, archivo .ics, IP y origen.
import test from "node:test"
import assert from "node:assert/strict"
import { leerReservaPublica } from "./validacion.ts"
import { TICKET_MIN_SEG, TICKET_VIDA_SEG, crearTicket, validarTicket } from "./ticket.ts"
import { crearLimitador } from "./limite.ts"
import { crearIcs } from "./ics.ts"
import { ipDeCabeceras } from "../http/ip.ts"
import { origenValido } from "../http/origen.ts"
import { firmarSesion } from "../admin/token.ts"

const valido = {
  nombre: "  Ana   García  ",
  email: "  ANA.Garcia@Ejemplo.es ",
  telefono: "+34 600 000 000",
  mensaje: "Quiero automatizar las citas de mi clínica.",
  inicio: "2026-11-16T09:00:00.000Z",
  privacidad: true,
  web: "",
  ticket: "ticket-de-prueba",
}

// ── Formulario ─────────────────────────────────────────────────────────────

test("reserva: datos buenos se normalizan (espacios, mayúsculas del correo)", () => {
  const r = leerReservaPublica(valido)
  assert.equal(r.ok, true)
  assert.equal(r.datos.nombre, "Ana García")
  assert.equal(r.datos.email, "ana.garcia@ejemplo.es")
  assert.equal(r.datos.telefono, "+34 600 000 000")
  assert.equal(r.datos.mensaje, "Quiero automatizar las citas de mi clínica.")
  assert.equal(r.datos.inicio.toISOString(), "2026-11-16T09:00:00.000Z")
})

test("reserva: teléfono y mensaje son opcionales", () => {
  const r = leerReservaPublica({ ...valido, telefono: "", mensaje: "   " })
  assert.equal(r.ok, true)
  assert.equal(r.datos.telefono, null)
  assert.equal(r.datos.mensaje, null)
  assert.equal(leerReservaPublica({ ...valido, telefono: undefined, mensaje: undefined }).ok, true)
})

test("reserva: cada campo malo dice cuál es", () => {
  const caso = (cambio) => leerReservaPublica({ ...valido, ...cambio })
  const campo = (r) => (r.ok ? "ok" : r.campo)
  assert.equal(campo(caso({ nombre: "A" })), "nombre")
  assert.equal(campo(caso({ nombre: "1234" })), "nombre")
  assert.equal(campo(caso({ nombre: "x".repeat(81) })), "nombre")
  assert.equal(campo(caso({ nombre: 42 })), "nombre")
  for (const email of ["", "sin-arroba", "a@b", "a@b.c", "a b@c.es", "a@@c.es", "a..b@c.es", "a@c..es", "<x>@c.es", "a@c.es,b@d.es", "x".repeat(250) + "@c.es"]) {
    assert.equal(campo(caso({ email })), "email", `«${email}»`)
  }
  for (const telefono of ["abc", "12", "+34 (600) 000-000 ext 5555555", "1".repeat(21), "++3460000000"]) {
    assert.equal(campo(caso({ telefono })), "telefono", `«${telefono}»`)
  }
  assert.equal(campo(caso({ mensaje: "x".repeat(501) })), "mensaje")
  for (const inicio of ["", "mañana", "2026-11-16", "2026-11-16T09:00:00Z", 12345, null]) {
    assert.equal(campo(caso({ inicio })), "inicio", String(inicio))
  }
  for (const privacidad of [false, "true", "on", 1, undefined]) {
    assert.equal(campo(caso({ privacidad })), "privacidad", String(privacidad))
  }
  assert.equal(campo(caso({ ticket: "" })), "ticket")
  assert.equal(campo(caso({ ticket: "x".repeat(601) })), "ticket")
})

test("reserva: un cuerpo que no es un objeto se rechaza sin romperse", () => {
  for (const cuerpo of [null, undefined, "texto", 42, [], [valido]]) {
    assert.equal(leerReservaPublica(cuerpo).ok, false)
  }
})

test("reserva: el campo trampa delata a un robot, antes que cualquier otra cosa", () => {
  assert.deepEqual(leerReservaPublica({ ...valido, web: "http://spam.example" }), { ok: false, error: "honeypot" })
  assert.deepEqual(leerReservaPublica({ web: "x" }), { ok: false, error: "honeypot" })
  assert.equal(leerReservaPublica({ ...valido, web: "   " }).ok, true)
})

test("reserva: los caracteres de control se quitan y el mensaje conserva sus saltos de línea", () => {
  const r = leerReservaPublica({ ...valido, nombre: "Ana\u0000\nGarcía", mensaje: "Hola\nsegunda línea\u0007\ttercera" })
  assert.equal(r.ok, true)
  assert.equal(r.datos.nombre, "Ana García")
  assert.equal(r.datos.mensaje, "Hola\nsegunda línea  tercera")
})

test("reserva: nombres con tildes, eñes y apóstrofos valen", () => {
  for (const nombre of ["José Ángel Núñez", "Marie-Claire O'Brien", "李雷", "Zoë"]) {
    assert.equal(leerReservaPublica({ ...valido, nombre }).ok, true, nombre)
  }
})

// ── Ticket ─────────────────────────────────────────────────────────────────

const SECRETO = "s".repeat(48)
const T0 = 1_800_000_000

test("ticket: vale pasados unos segundos y antes de caducar", () => {
  const t = crearTicket(SECRETO, T0)
  assert.equal(validarTicket(t, SECRETO, T0 + TICKET_MIN_SEG), "ok")
  assert.equal(validarTicket(t, SECRETO, T0 + 60), "ok")
  assert.equal(validarTicket(t, SECRETO, T0 + TICKET_VIDA_SEG - 1), "ok")
})

test("ticket: demasiado rápido, caducado, falso o de otro secreto", () => {
  const t = crearTicket(SECRETO, T0)
  assert.equal(validarTicket(t, SECRETO, T0), "demasiado-rapido")
  assert.equal(validarTicket(t, SECRETO, T0 + TICKET_MIN_SEG - 1), "demasiado-rapido")
  assert.equal(validarTicket(t, SECRETO, T0 + TICKET_VIDA_SEG), "caducado")
  assert.equal(validarTicket(t, "o".repeat(48), T0 + 60), "invalido")
  assert.equal(validarTicket("", SECRETO, T0 + 60), "invalido")
  assert.equal(validarTicket("a.b", SECRETO, T0 + 60), "invalido")
  assert.equal(validarTicket(t.slice(0, -3) + "AAA", SECRETO, T0 + 60), "invalido")
})

test("ticket: una sesión del admin no vale como ticket", () => {
  const sesion = firmarSesion({ exp: T0 + 1000, v: "huella-de-la-contrasena" }, SECRETO)
  assert.equal(validarTicket(sesion, SECRETO, T0 + 60), "invalido")
  const falso = firmarSesion({ exp: T0 + 1000, v: "reservar:no-es-un-numero" }, SECRETO)
  assert.equal(validarTicket(falso, SECRETO, T0 + 60), "invalido")
})

// ── Límite ─────────────────────────────────────────────────────────────────

test("límite: deja pasar `max` peticiones por ventana y bloquea el resto, por clave", () => {
  const l = crearLimitador("prueba-1", 3, 60_000)
  l.reiniciar()
  const t0 = 1_000_000
  for (let i = 0; i < 3; i++) assert.equal(l.intentar("1.1.1.1", t0 + i).permitido, true)
  const bloqueo = l.intentar("1.1.1.1", t0 + 1000)
  assert.equal(bloqueo.permitido, false)
  assert.equal(bloqueo.esperaSeg, 59)
  assert.equal(l.intentar("2.2.2.2", t0 + 1000).permitido, true) // otra IP no se ve afectada
  assert.equal(l.intentar("1.1.1.1", t0 + 60_000).permitido, true) // ventana nueva
})

test("límite: cada limitador lleva su propia cuenta", () => {
  const a = crearLimitador("prueba-a", 1, 60_000)
  const b = crearLimitador("prueba-b", 1, 60_000)
  a.reiniciar()
  b.reiniciar()
  assert.equal(a.intentar("x", 1).permitido, true)
  assert.equal(a.intentar("x", 2).permitido, false)
  assert.equal(b.intentar("x", 3).permitido, true)
})

// ── .ics ───────────────────────────────────────────────────────────────────

test("ics: eventos en UTC, con texto escapado y saltos CRLF", () => {
  const ics = crearIcs({
    inicio: new Date("2026-11-16T09:00:00.000Z"),
    fin: new Date("2026-11-16T09:15:00.000Z"),
    resumen: "Llamada con Propus",
    descripcion: "Hablamos de IA, citas; y más.\nSegunda línea",
    uid: "abc@propus.es",
    ahora: new Date("2026-11-12T08:30:00.000Z"),
  })
  assert.ok(ics.startsWith("BEGIN:VCALENDAR\r\n"))
  assert.ok(ics.endsWith("END:VCALENDAR\r\n"))
  assert.ok(ics.includes("DTSTART:20261116T090000Z\r\n"))
  assert.ok(ics.includes("DTEND:20261116T091500Z\r\n"))
  assert.ok(ics.includes("DTSTAMP:20261112T083000Z\r\n"))
  assert.ok(ics.includes("SUMMARY:Llamada con Propus\r\n"))
  assert.ok(ics.includes("DESCRIPTION:Hablamos de IA\\, citas\\; y más.\\nSegunda línea\r\n"))
  assert.ok(!/[^\r]\n/.test(ics), "Todos los saltos de línea deben ser CRLF")
})

test("ics: las líneas largas se pliegan y se pueden volver a unir", () => {
  const descripcion = "palabra ".repeat(40).trim()
  const ics = crearIcs({
    inicio: new Date("2026-11-16T09:00:00.000Z"),
    fin: new Date("2026-11-16T09:15:00.000Z"),
    resumen: "x",
    descripcion,
    uid: "u",
    ahora: new Date("2026-11-12T08:30:00.000Z"),
  })
  for (const linea of ics.split("\r\n")) assert.ok(linea.length <= 75, `línea de ${linea.length}`)
  const desplegado = ics.replace(/\r\n /g, "")
  assert.ok(desplegado.includes(`DESCRIPTION:${descripcion}`))
})

// ── IP y origen ────────────────────────────────────────────────────────────

const cabeceras = (obj) => ({ get: (n) => obj[n.toLowerCase()] ?? null })

test("ip: se usa el último valor de X-Forwarded-For (el del proxy), no el primero", () => {
  assert.equal(ipDeCabeceras(cabeceras({ "x-forwarded-for": "9.9.9.9, 10.0.0.1, 203.0.113.7" })), "203.0.113.7")
  assert.equal(ipDeCabeceras(cabeceras({ "x-forwarded-for": " 203.0.113.7 " })), "203.0.113.7")
  assert.equal(ipDeCabeceras(cabeceras({ "x-real-ip": "198.51.100.2" })), "198.51.100.2")
  assert.equal(ipDeCabeceras(cabeceras({})), "desconocida")
})

test("origen: solo vale el propio sitio", () => {
  const sitio = "https://propus.es"
  assert.equal(origenValido("https://propus.es", "propus.es", sitio), true)
  assert.equal(origenValido("https://propus.es", "interno:3000", sitio), true)
  assert.equal(origenValido("http://127.0.0.1:3055", "127.0.0.1:3055", sitio), true)
  assert.equal(origenValido("https://otra-web.com", "propus.es", sitio), false)
  assert.equal(origenValido("https://propus.es.otra-web.com", "propus.es", sitio), false)
  assert.equal(origenValido(null, "propus.es", sitio), false)
  assert.equal(origenValido("no es una url", "propus.es", sitio), false)
  assert.equal(origenValido("null", "propus.es", sitio), false)
})
