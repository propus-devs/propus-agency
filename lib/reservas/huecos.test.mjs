// Pruebas del cálculo de huecos y de la hora de Madrid. Se ejecutan con
// `npm test` (node --test). Node 22.18+ lee TypeScript sin compilar.
import test from "node:test"
import assert from "node:assert/strict"
import {
  calcularHuecos,
  claveDiaMadrid,
  formatearHora,
  horaAMinutos,
  madridAUtc,
  minutosAHora,
  parsearFechaHoraMadrid,
  partesMadrid,
  sumarDias,
} from "./huecos.ts"

const iso = (d) => d.toISOString()
const horasMadrid = (huecos) => huecos.map((h) => formatearHora(h.inicio))

// Jueves 12 de noviembre de 2026, 09:00 en Madrid (08:00 UTC).
const AHORA = new Date("2026-11-12T08:00:00Z")
const JUEVES = 4

test("madridAUtc: invierno es UTC+1 y verano UTC+2", () => {
  assert.equal(iso(madridAUtc(2026, 1, 15, 10, 0)), "2026-01-15T09:00:00.000Z")
  assert.equal(iso(madridAUtc(2026, 7, 15, 10, 0)), "2026-07-15T08:00:00.000Z")
})

test("madridAUtc: la hora que se salta el cambio de primavera no existe", () => {
  assert.equal(madridAUtc(2026, 3, 29, 2, 30), null)
  assert.equal(iso(madridAUtc(2026, 3, 29, 3, 0)), "2026-03-29T01:00:00.000Z")
  assert.equal(iso(madridAUtc(2026, 3, 29, 1, 59)), "2026-03-29T00:59:00.000Z")
})

test("madridAUtc: la hora repetida del cambio de otoño devuelve un instante coherente", () => {
  const f = madridAUtc(2026, 10, 25, 2, 30)
  assert.notEqual(f, null)
  const p = partesMadrid(f)
  assert.deepEqual([p.dia, p.hora, p.minuto], [25, 2, 30])
})

test("parsearFechaHoraMadrid rechaza fechas y horas imposibles", () => {
  assert.equal(parsearFechaHoraMadrid("2026-02-30", "10:00"), null)
  assert.equal(parsearFechaHoraMadrid("2026-11-12", "25:00"), null)
  assert.equal(parsearFechaHoraMadrid("2026-11-12", "24:00"), null)
  assert.equal(parsearFechaHoraMadrid("12/11/2026", "10:00"), null)
  assert.equal(iso(parsearFechaHoraMadrid("2026-11-12", "10:00")), "2026-11-12T09:00:00.000Z")
})

test("horas y minutos: ida y vuelta y límites", () => {
  assert.equal(horaAMinutos("09:30"), 570)
  assert.equal(horaAMinutos("24:00"), 1440)
  assert.equal(horaAMinutos("24:30"), null)
  assert.equal(horaAMinutos("9:30"), null)
  assert.equal(horaAMinutos("10:60"), null)
  assert.equal(minutosAHora(570), "09:30")
})

test("sumarDias y claveDiaMadrid cruzan bien el fin de mes y de día", () => {
  assert.equal(sumarDias("2026-12-31", 1), "2027-01-01")
  assert.equal(sumarDias("2026-02-30", 1), null)
  // 23:30 UTC ya es el día siguiente en Madrid.
  assert.equal(claveDiaMadrid(new Date("2026-11-12T23:30:00Z")), "2026-11-13")
})

const config = { duracionMin: 15, margenMin: 0, antelacionHoras: 0, ventanaDias: 7 }
const jueves10a11 = [{ diaSemana: JUEVES, inicioMin: 600, finMin: 660 }]

test("calcularHuecos trocea la franja en llamadas de 15 min, hoy y el jueves siguiente", () => {
  const h = calcularHuecos({ ahora: AHORA, franjas: jueves10a11, config, ocupados: [] })
  assert.equal(h.length, 8)
  assert.deepEqual(horasMadrid(h).slice(0, 4), ["10:00", "10:15", "10:30", "10:45"])
  assert.equal(iso(h[0].inicio), "2026-11-12T09:00:00.000Z")
  assert.equal(iso(h[0].fin), "2026-11-12T09:15:00.000Z")
  assert.equal(iso(h[4].inicio), "2026-11-19T09:00:00.000Z")
})

test("calcularHuecos respeta la antelación mínima", () => {
  const ahora = new Date("2026-11-12T08:50:00Z") // 09:50 en Madrid
  const sin = calcularHuecos({ ahora, franjas: jueves10a11, config, ocupados: [] })
  assert.equal(horasMadrid(sin)[0], "10:00")
  const con = calcularHuecos({
    ahora,
    franjas: jueves10a11,
    config: { ...config, antelacionHoras: 1 },
    ocupados: [],
  })
  // Con 1 h de aviso hay que empezar a las 10:50 o después: hoy ya no queda nada.
  assert.equal(iso(con[0].inicio), "2026-11-19T09:00:00.000Z")
})

test("calcularHuecos respeta la ventana de días", () => {
  const seis = calcularHuecos({
    ahora: AHORA,
    franjas: jueves10a11,
    config: { ...config, ventanaDias: 6 },
    ocupados: [],
  })
  assert.equal(seis.length, 4) // el jueves siguiente es el día 7: queda fuera
  const cero = calcularHuecos({
    ahora: AHORA,
    franjas: jueves10a11,
    config: { ...config, ventanaDias: 0 },
    ocupados: [],
  })
  assert.equal(cero.length, 4) // solo hoy
})

test("calcularHuecos quita lo que se pisa con reservas o bloqueos", () => {
  const una = calcularHuecos({
    ahora: AHORA,
    franjas: jueves10a11,
    config: { ...config, ventanaDias: 0 },
    ocupados: [
      { inicio: new Date("2026-11-12T09:15:00Z"), fin: new Date("2026-11-12T09:30:00Z") },
    ],
  })
  assert.deepEqual(horasMadrid(una), ["10:00", "10:30", "10:45"])

  // Un bloqueo que empieza a medias de un hueco se lleva los dos que toca.
  const dos = calcularHuecos({
    ahora: AHORA,
    franjas: jueves10a11,
    config: { ...config, ventanaDias: 0 },
    ocupados: [
      { inicio: new Date("2026-11-12T09:20:00Z"), fin: new Date("2026-11-12T09:35:00Z") },
    ],
  })
  assert.deepEqual(horasMadrid(dos), ["10:00", "10:45"])
})

test("calcularHuecos aplica el margen entre llamadas", () => {
  const h = calcularHuecos({
    ahora: AHORA,
    franjas: jueves10a11,
    config: { ...config, margenMin: 5, ventanaDias: 0 },
    ocupados: [],
  })
  // 10:00, 10:20, 10:40 (acaba 10:55). El siguiente, 11:00, ya no cabe.
  assert.deepEqual(horasMadrid(h), ["10:00", "10:20", "10:40"])
})

test("calcularHuecos no repite huecos si dos franjas se solapan", () => {
  const h = calcularHuecos({
    ahora: AHORA,
    franjas: [
      { diaSemana: JUEVES, inicioMin: 600, finMin: 660 },
      { diaSemana: JUEVES, inicioMin: 630, finMin: 690 },
    ],
    config: { ...config, ventanaDias: 0 },
    ocupados: [],
  })
  assert.deepEqual(horasMadrid(h), ["10:00", "10:15", "10:30", "10:45", "11:00", "11:15"])
})

test("calcularHuecos usa el horario de verano el día del cambio de hora", () => {
  // Domingo 29 de marzo de 2026: de madrugada se pasa a horario de verano.
  const h = calcularHuecos({
    ahora: new Date("2026-03-28T00:00:00Z"),
    franjas: [{ diaSemana: 7, inicioMin: 600, finMin: 630 }],
    config: { ...config, ventanaDias: 1 },
    ocupados: [],
  })
  assert.equal(h.length, 2)
  assert.equal(iso(h[0].inicio), "2026-03-29T08:00:00.000Z") // 10:00 CEST
})

test("calcularHuecos: sin franjas o con config rota no devuelve nada", () => {
  assert.deepEqual(calcularHuecos({ ahora: AHORA, franjas: [], config, ocupados: [] }), [])
  assert.deepEqual(
    calcularHuecos({
      ahora: AHORA,
      franjas: jueves10a11,
      config: { ...config, duracionMin: 0 },
      ocupados: [],
    }),
    []
  )
})
