// Pruebas de los correos de reserva. Se ejecutan con `npm test` (node --test).
// Node 22.18+ lee TypeScript sin compilar.
import test from "node:test"
import assert from "node:assert/strict"
import { construirCorreos, enlaceSeguro, esc } from "./correo.ts"

const base = {
  inicio: new Date("2026-11-16T08:30:00Z"), // 09:30 en Madrid
  fin: new Date("2026-11-16T08:45:00Z"),
  nombre: "Ana",
  email: "ana@example.com",
  telefono: "+34 600 000 000",
  mensaje: "Quiero automatizar las citas",
  idioma: "es",
  enlaceVideollamada: "https://meet.google.com/abc-defg-hij",
  contactoEmail: "team@propus.es",
  urlAdmin: "https://propus.es/admin/calendario?mes=2026-11&dia=2026-11-16",
  ahora: new Date("2026-11-13T10:00:00Z"),
  uid: "prueba@propus.es",
}

test("confirmación en español: día, hora de Madrid, enlace y evento adjunto", () => {
  const { cliente } = construirCorreos(base)
  assert.equal(cliente.asunto, "Llamada confirmada · Lunes, 16 de noviembre, 09:30")
  assert.match(cliente.html, /Hola Ana,/)
  assert.match(cliente.html, /09:30 – 09:45 \(hora de Madrid\)/)
  assert.match(cliente.html, /href="https:\/\/meet\.google\.com\/abc-defg-hij"/)
  assert.match(cliente.texto, /meet\.google\.com\/abc-defg-hij/)
  assert.equal(cliente.adjuntos.length, 1)
  assert.match(cliente.adjuntos[0].contenido, /DTSTART:20261116T083000Z/)
  assert.match(cliente.adjuntos[0].contenido, /LOCATION:https:\/\/meet\.google\.com\/abc-defg-hij/)
})

test("confirmación en inglés", () => {
  const { cliente } = construirCorreos({ ...base, idioma: "en" })
  assert.match(cliente.asunto, /^Call confirmed · Monday 16 November, 09:30$/)
  assert.match(cliente.html, /Hi Ana,/)
  assert.match(cliente.html, /Madrid time/)
  assert.equal(cliente.adjuntos[0].nombre, "propus-call.ics")
})

test("sin enlace de videollamada se dice que se contactará, con el teléfono si lo hay", () => {
  const sin = construirCorreos({ ...base, enlaceVideollamada: null }).cliente
  assert.doesNotMatch(sin.html, /meet\.google/)
  assert.match(sin.html, /a la hora acordada, en el \+34 600 000 000/)
  assert.doesNotMatch(sin.adjuntos[0].contenido, /LOCATION/)
  const sinTelefono = construirCorreos({ ...base, enlaceVideollamada: null, telefono: null }).cliente
  assert.match(sinTelefono.html, /con los datos que nos dejaste/)
})

test("solo se enlazan URLs https", () => {
  assert.equal(enlaceSeguro("javascript:alert(1)"), null)
  assert.equal(enlaceSeguro("http://meet.google.com/x"), null)
  assert.equal(enlaceSeguro("no es una url"), null)
  assert.equal(enlaceSeguro(""), null)
  assert.equal(enlaceSeguro("https://meet.google.com/x"), "https://meet.google.com/x")
  const { cliente } = construirCorreos({ ...base, enlaceVideollamada: "javascript:alert(1)" })
  assert.doesNotMatch(cliente.html, /javascript:/)
})

test("lo que escribe el visitante se escapa en el HTML", () => {
  const { cliente, aviso } = construirCorreos({
    ...base,
    nombre: '<img src=x onerror=alert(1)> "Ana"',
    mensaje: "<script>alert(1)</script>",
  })
  for (const html of [cliente.html, aviso.html]) {
    assert.doesNotMatch(html, /<script>/)
    assert.doesNotMatch(html, /<img/)
  }
  assert.match(aviso.html, /&lt;script&gt;/)
  assert.equal(esc(`a&b<c>"d'e`), "a&amp;b&lt;c&gt;&quot;d&#39;e")
})

test("el aviso al equipo va en español, con los datos y el enlace al admin", () => {
  const { aviso } = construirCorreos({ ...base, idioma: "en" })
  assert.match(aviso.asunto, /^Nueva reserva · Ana · Lunes, 16 de noviembre, 09:30$/)
  assert.match(aviso.texto, /Correo: ana@example\.com/)
  assert.match(aviso.texto, /Web en: inglés/)
  assert.match(aviso.html, /href="https:\/\/propus\.es\/admin\/calendario\?mes=2026-11&amp;dia=2026-11-16"/)
  assert.equal(aviso.adjuntos.length, 0)
})
