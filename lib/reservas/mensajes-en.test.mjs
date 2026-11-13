// Pruebas de la traducción de los mensajes de la API de reservas. Se ejecutan con
// `npm test` (node --test). Node 22.18+ lee TypeScript sin compilar.
import test from "node:test"
import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import { MENSAJES_EN, traducirMensaje } from "./mensajes-en.ts"

test("en español y con un mensaje desconocido se devuelve el original", () => {
  assert.equal(traducirMensaje("Elige un día y una hora.", "es"), "Elige un día y una hora.")
  assert.equal(traducirMensaje("Un mensaje nuevo sin traducir.", "en"), "Un mensaje nuevo sin traducir.")
})

test("en inglés se traduce por el texto exacto", () => {
  assert.equal(traducirMensaje("Elige un día y una hora.", "en"), "Choose a day and a time.")
})

// Los mensajes viven en tres archivos del servidor. Se extraen con las tres formas
// en que se escriben (error(…), malo(…) y mensaje: "…") y cada uno debe tener
// traducción: si alguien añade un mensaje en español y olvida la inglesa, falla aquí.
const ARCHIVOS = ["./publico.ts", "./validacion.ts", "../../app/api/reservas/route.ts"]
const PATRONES = [
  /error\(\s*\d+,\s*"[^"]+",\s*"([^"]+)"/g,
  /malo\(\s*"[a-z]+",\s*"([^"]+)"/g,
  /mensaje:\s*"([^"]+)"/g,
]

test("todos los mensajes del servidor tienen traducción al inglés", () => {
  const encontrados = new Set()
  for (const archivo of ARCHIVOS) {
    const texto = readFileSync(new URL(archivo, import.meta.url), "utf8")
    for (const patron of PATRONES) {
      for (const m of texto.matchAll(patron)) encontrados.add(m[1])
    }
  }
  assert.ok(encontrados.size >= 15, `se esperaban al menos 15 mensajes y se encontraron ${encontrados.size}`)
  const sinTraducir = [...encontrados].filter((m) => !(m in MENSAJES_EN))
  assert.deepEqual(sinTraducir, [], `mensajes sin traducir: ${sinTraducir.join(" | ")}`)
})

test("no sobran traducciones de mensajes que ya no existen", () => {
  const todo = ARCHIVOS.map((a) => readFileSync(new URL(a, import.meta.url), "utf8")).join("\n")
  const huerfanas = Object.keys(MENSAJES_EN).filter((m) => !todo.includes(m))
  assert.deepEqual(huerfanas, [], `traducciones huérfanas: ${huerfanas.join(" | ")}`)
})
