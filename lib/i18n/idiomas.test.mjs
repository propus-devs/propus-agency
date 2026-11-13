// Pruebas de la tabla de rutas entre idiomas. Se ejecutan con `npm test`
// (node --test). Node 22.18+ lee TypeScript sin compilar.
import test from "node:test"
import assert from "node:assert/strict"
import {
  RUTAS,
  alternas,
  claveDeRuta,
  idiomaDeRuta,
  rutaEnOtroIdioma,
} from "./idiomas.ts"

test("idioma de una ruta: solo lo que cuelga de /en es inglés", () => {
  assert.equal(idiomaDeRuta("/"), "es")
  assert.equal(idiomaDeRuta("/servicios/autoclinic"), "es")
  assert.equal(idiomaDeRuta("/en"), "en")
  assert.equal(idiomaDeRuta("/en/services/autoclinic"), "en")
  // Un prefijo parecido no es inglés.
  assert.equal(idiomaDeRuta("/entrevistas"), "es")
})

test("las rutas inglesas cuelgan de /en y las españolas no", () => {
  for (const [clave, r] of Object.entries(RUTAS)) {
    assert.ok(r.en === "/en" || r.en.startsWith("/en/"), `${clave}: la ruta inglesa debe colgar de /en`)
    assert.ok(!r.es.startsWith("/en"), `${clave}: la ruta española no debe colgar de /en`)
  }
})

test("no hay dos páginas con la misma ruta", () => {
  const todas = Object.values(RUTAS).flatMap((r) => [r.es, r.en])
  assert.equal(new Set(todas).size, todas.length)
})

test("selector de idioma: misma página en el otro idioma", () => {
  assert.equal(rutaEnOtroIdioma("/servicios/autoclinic", "en"), "/en/services/autoclinic")
  assert.equal(rutaEnOtroIdioma("/en/services/autoclinic", "es"), "/servicios/autoclinic")
  assert.equal(rutaEnOtroIdioma("/sobre-nosotros", "en"), "/en/about-us")
  assert.equal(rutaEnOtroIdioma("/en/book-a-call", "es"), "/reservar")
  assert.equal(rutaEnOtroIdioma("/", "en"), "/en")
  assert.equal(rutaEnOtroIdioma("/en", "es"), "/")
})

test("selector de idioma: tolera barra final, ancla y query", () => {
  assert.equal(rutaEnOtroIdioma("/servicios/ruralprop/", "en"), "/en/services/ruralprop")
  assert.equal(rutaEnOtroIdioma("/en/about-us#team", "es"), "/sobre-nosotros")
  assert.equal(rutaEnOtroIdioma("/reservar?x=1", "en"), "/en/book-a-call")
})

test("sin pareja (blog, legales): lleva a la portada del otro idioma", () => {
  assert.equal(claveDeRuta("/blog"), null)
  assert.equal(rutaEnOtroIdioma("/blog/algun-post", "en"), "/en")
  assert.equal(rutaEnOtroIdioma("/legal/privacidad", "en"), "/en")
})

test("hreflang: español, inglés y x-default apuntan al español", () => {
  assert.deepEqual(alternas("facturia"), {
    es: "/servicios/facturia",
    en: "/en/services/facturia",
    "x-default": "/servicios/facturia",
  })
})
