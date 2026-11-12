// Pruebas de la validación de los formularios del admin.
import test from "node:test"
import assert from "node:assert/strict"
import { esUuid, leerAjustes, leerBloqueo, leerEnteroPositivo, leerHorario } from "./validacion.ts"

const form = (campos) => (campo) => (campos[campo] ?? "").trim()
const iso = (d) => d.toISOString()

test("horario: lee varios tramos por día y los ordena", () => {
  const r = leerHorario(
    form({
      d1_0_ini: "16:00", d1_0_fin: "18:00",
      d1_1_ini: "10:00", d1_1_fin: "13:30",
      d5_0_ini: "09:00", d5_0_fin: "14:00",
    })
  )
  assert.equal(r.ok, true)
  assert.deepEqual(r.franjas, [
    { diaSemana: 1, inicioMin: 600, finMin: 810 },
    { diaSemana: 1, inicioMin: 960, finMin: 1080 },
    { diaSemana: 5, inicioMin: 540, finMin: 840 },
  ])
})

test("horario: vacío es válido (nadie podría reservar, pero no es un error)", () => {
  assert.deepEqual(leerHorario(form({})), { ok: true, franjas: [] })
})

test("horario: detecta tramo a medias, hora rara, fin antes que inicio y solapes", () => {
  assert.deepEqual(leerHorario(form({ d2_0_ini: "10:00" })), { ok: false, error: "horario-incompleto", dia: 2 })
  assert.deepEqual(leerHorario(form({ d3_0_ini: "10:00", d3_0_fin: "25:00" })), { ok: false, error: "horario-invalido", dia: 3 })
  assert.deepEqual(leerHorario(form({ d4_0_ini: "24:00", d4_0_fin: "24:00" })), { ok: false, error: "horario-invalido", dia: 4 })
  assert.deepEqual(leerHorario(form({ d5_0_ini: "14:00", d5_0_fin: "10:00" })), { ok: false, error: "horario-orden", dia: 5 })
  assert.deepEqual(leerHorario(form({ d5_0_ini: "10:00", d5_0_fin: "10:00" })), { ok: false, error: "horario-orden", dia: 5 })
  assert.deepEqual(
    leerHorario(form({ d6_0_ini: "10:00", d6_0_fin: "12:00", d6_1_ini: "11:30", d6_1_fin: "13:00" })),
    { ok: false, error: "horario-solape", dia: 6 }
  )
  // Tramos que se tocan (acaba a las 12:00, empieza a las 12:00) sí valen.
  assert.equal(
    leerHorario(form({ d7_0_ini: "10:00", d7_0_fin: "12:00", d7_1_ini: "12:00", d7_1_fin: "13:00" })).ok,
    true
  )
})

test("horario: se admite terminar a las 24:00", () => {
  const r = leerHorario(form({ d1_0_ini: "20:00", d1_0_fin: "24:00" }))
  assert.equal(r.ok, true)
  assert.equal(r.franjas[0].finMin, 1440)
})

test("ajustes: valores válidos, interruptor y límites", () => {
  const base = { duracion_min: "15", margen_min: "0", antelacion_horas: "12", ventana_dias: "21" }
  assert.deepEqual(leerAjustes(form({ ...base, activo: "on" })), {
    ok: true,
    ajustes: { duracionMin: 15, margenMin: 0, antelacionHoras: 12, ventanaDias: 21, activo: true },
  })
  assert.equal(leerAjustes(form(base)).ajustes.activo, false)
  for (const roto of [
    { duracion_min: "4" },
    { duracion_min: "241" },
    { duracion_min: "quince" },
    { margen_min: "-1" },
    { antelacion_horas: "721" },
    { ventana_dias: "0" },
    { ventana_dias: "" },
    { ventana_dias: "1e2" },
  ]) {
    assert.deepEqual(leerAjustes(form({ ...base, ...roto })), { ok: false, error: "ajustes-invalidos" })
  }
})

test("bloqueo: sin horas bloquea los días completos (hora de Madrid)", () => {
  const r = leerBloqueo(form({ desde_fecha: "2026-12-24", hasta_fecha: "2026-12-26", motivo: "Navidad" }))
  assert.equal(r.ok, true)
  assert.equal(iso(r.desde), "2026-12-23T23:00:00.000Z") // 00:00 del 24 en Madrid
  assert.equal(iso(r.hasta), "2026-12-26T23:00:00.000Z") // 00:00 del 27 en Madrid
  assert.equal(r.motivo, "Navidad")
})

test("bloqueo: sin fecha final es el mismo día; con horas, solo ese tramo", () => {
  const dia = leerBloqueo(form({ desde_fecha: "2026-07-10" }))
  assert.equal(iso(dia.desde), "2026-07-09T22:00:00.000Z")
  assert.equal(iso(dia.hasta), "2026-07-10T22:00:00.000Z")

  const tramo = leerBloqueo(form({ desde_fecha: "2026-07-10", desde_hora: "15:00", hasta_hora: "17:30" }))
  assert.equal(iso(tramo.desde), "2026-07-10T13:00:00.000Z")
  assert.equal(iso(tramo.hasta), "2026-07-10T15:30:00.000Z")

  const desdeHora = leerBloqueo(form({ desde_fecha: "2026-07-10", desde_hora: "15:00" }))
  assert.equal(iso(desdeHora.hasta), "2026-07-10T22:00:00.000Z") // hasta el final del día
})

test("bloqueo: errores de fecha, hora inexistente y orden", () => {
  assert.deepEqual(leerBloqueo(form({})), { ok: false, error: "bloqueo-fecha" })
  assert.deepEqual(leerBloqueo(form({ desde_fecha: "2026-02-30" })), { ok: false, error: "bloqueo-fecha" })
  assert.deepEqual(leerBloqueo(form({ desde_fecha: "2026-07-10", hasta_fecha: "ayer" })), { ok: false, error: "bloqueo-fecha" })
  assert.deepEqual(leerBloqueo(form({ desde_fecha: "2026-07-10", desde_hora: "26:00" })), { ok: false, error: "bloqueo-hora" })
  // 02:30 del 29 de marzo de 2026 no existe en Madrid.
  assert.deepEqual(leerBloqueo(form({ desde_fecha: "2026-03-29", desde_hora: "02:30" })), { ok: false, error: "bloqueo-hora" })
  assert.deepEqual(leerBloqueo(form({ desde_fecha: "2026-07-10", hasta_fecha: "2026-07-09" })), { ok: false, error: "bloqueo-orden" })
  assert.deepEqual(
    leerBloqueo(form({ desde_fecha: "2026-07-10", desde_hora: "17:00", hasta_hora: "15:00" })),
    { ok: false, error: "bloqueo-orden" }
  )
})

test("bloqueo: el motivo se limpia y se recorta", () => {
  const r = leerBloqueo(form({ desde_fecha: "2026-07-10", motivo: "a\nb\tc" + "x".repeat(200) }))
  assert.equal(r.motivo.length, 120)
  assert.ok(!/[\n\t]/.test(r.motivo))
})

test("identificadores: uuid y enteros", () => {
  assert.equal(esUuid("3f2b7a54-6c1e-4d0b-9b1a-0e5f7c9d2a11"), true)
  assert.equal(esUuid("no-es-uuid"), false)
  assert.equal(esUuid("3f2b7a54-6c1e-4d0b-9b1a-0e5f7c9d2a1"), false)
  assert.equal(leerEnteroPositivo("42"), 42)
  assert.equal(leerEnteroPositivo("0"), null)
  assert.equal(leerEnteroPositivo("-3"), null)
  assert.equal(leerEnteroPositivo("4.5"), null)
  assert.equal(leerEnteroPositivo(""), null)
})
