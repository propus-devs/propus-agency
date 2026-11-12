// Pruebas del cálculo de huecos y de la hora de Madrid. Se ejecutan con
// `npm test` (node --test). Node 22.18+ lee TypeScript sin compilar.
import test from "node:test"
import assert from "node:assert/strict"
import {
  calcularAgenda,
  calcularHuecos,
  claveDiaMadrid,
  formatearHora,
  horaAMinutos,
  madridAUtc,
  minutosAHora,
  normalizarHora,
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

// ── Agenda con estados ─────────────────────────────────────────────────────
const configAgenda = { ...config, ventanaDias: 7, visibilidadPct: 100, semilla: 1 }
const jueves10a12 = [{ diaSemana: JUEVES, inicioMin: 600, finMin: 720 }] // 8 huecos de 15 min
const HOY = "2026-11-12"
const z = (hhmm) => new Date(`2026-11-12T${hhmm}:00Z`) // hora UTC (Madrid = UTC+1 en noviembre)
const agenda = (extra = {}) =>
  calcularAgenda({
    ahora: AHORA,
    desde: HOY,
    hasta: HOY,
    franjas: jueves10a12,
    config: configAgenda,
    reservas: [],
    bloqueos: [],
    cerrados: new Set(),
    ...extra,
  })
const porHora = (huecos) => Object.fromEntries(huecos.map((h) => [formatearHora(h.inicio), h.estado]))
const contar = (huecos, estado) => huecos.filter((h) => h.estado === estado).length

test("agenda: cada hueco lleva su estado (reservado, bloqueado, cerrado, libre)", () => {
  const h = agenda({
    reservas: [{ inicio: z("09:15"), fin: z("09:30") }],
    bloqueos: [{ inicio: z("09:30"), fin: z("09:45") }],
    cerrados: new Set([z("09:45").getTime()]),
  })
  assert.deepEqual(porHora(h), {
    "10:00": "libre",
    "10:15": "reservado",
    "10:30": "bloqueado",
    "10:45": "cerrado",
    "11:00": "libre",
    "11:15": "libre",
    "11:30": "libre",
    "11:45": "libre",
  })
})

test("agenda: reservado y bloqueado ganan a cerrado", () => {
  const h = agenda({
    reservas: [{ inicio: z("09:00"), fin: z("09:15") }],
    bloqueos: [{ inicio: z("09:15"), fin: z("09:30") }],
    cerrados: new Set([z("09:00").getTime(), z("09:15").getTime()]),
  })
  assert.equal(porHora(h)["10:00"], "reservado")
  assert.equal(porHora(h)["10:15"], "bloqueado")
})

test("agenda: lo que ya pasó, el aviso mínimo y lo que está más allá de la ventana son «fuera»", () => {
  // 10:20 en Madrid: los huecos de las 10:00 y las 10:15 ya empezaron.
  const h = agenda({ ahora: new Date("2026-11-12T09:20:00Z") })
  assert.equal(porHora(h)["10:00"], "fuera")
  assert.equal(porHora(h)["10:15"], "fuera")
  assert.equal(porHora(h)["10:30"], "libre")

  // Son las 09:00 y hacen falta 2 h de aviso: lo anterior a las 11:00 ya no se puede reservar.
  const conAviso = agenda({ config: { ...configAgenda, antelacionHoras: 2 } })
  assert.equal(contar(conAviso, "libre"), 4)
  assert.equal(porHora(conAviso)["10:45"], "fuera")
  assert.equal(porHora(conAviso)["11:00"], "libre")

  // Ventana de 7 días: el jueves 19 entra y el 26 no.
  const dos = calcularAgenda({
    ahora: AHORA, desde: "2026-11-19", hasta: "2026-11-26", franjas: jueves10a12,
    config: configAgenda, reservas: [], bloqueos: [], cerrados: new Set(),
  })
  assert.equal(dos.filter((x) => claveDiaMadrid(x.inicio) === "2026-11-19").every((x) => x.estado === "libre"), true)
  assert.equal(dos.filter((x) => claveDiaMadrid(x.inicio) === "2026-11-26").every((x) => x.estado === "fuera"), true)
})

test("agenda: el porcentaje enseña exactamente esa parte de los huecos de cada día", () => {
  assert.equal(contar(agenda(), "oculto"), 0)
  for (const [pct, libres] of [[100, 8], [75, 6], [50, 4], [25, 2], [10, 1]]) {
    const h = agenda({ config: { ...configAgenda, visibilidadPct: pct } })
    assert.equal(contar(h, "libre"), libres, `${pct} %`)
    assert.equal(contar(h, "oculto"), 8 - libres, `${pct} % ocultos`)
  }
})

test("agenda: lo oculto es repetible y no se mueve cuando alguien reserva", () => {
  const medio = { ...configAgenda, visibilidadPct: 50 }
  const base = agenda({ config: medio })
  assert.deepEqual(porHora(agenda({ config: medio })), porHora(base)) // mismo resultado siempre

  const visible = base.find((h) => h.estado === "libre")
  const oculto = base.find((h) => h.estado === "oculto")
  const reservaVisible = agenda({ config: medio, reservas: [{ inicio: visible.inicio, fin: visible.fin }] })
  const reservaOculta = agenda({ config: medio, reservas: [{ inicio: oculto.inicio, fin: oculto.fin }] })

  // El hueco reservado pasa a «reservado»; ninguno de los demás cambia de sitio.
  const comparar = (a, b, excepto) => {
    for (const x of a) {
      if (x.inicio.getTime() === excepto.getTime()) continue
      assert.equal(b.find((y) => y.inicio.getTime() === x.inicio.getTime()).estado, x.estado)
    }
  }
  assert.equal(porHora(reservaVisible)[formatearHora(visible.inicio)], "reservado")
  comparar(base, reservaVisible, visible.inicio)
  assert.equal(porHora(reservaOculta)[formatearHora(oculto.inicio)], "reservado")
  comparar(base, reservaOculta, oculto.inicio)
})

test("agenda: otra semilla esconde otros huecos", () => {
  const medio = { ...configAgenda, visibilidadPct: 50 }
  const a = porHora(agenda({ config: { ...medio, semilla: 1 } }))
  const distintas = [2, 3, 4, 5, 6].filter((s) => JSON.stringify(porHora(agenda({ config: { ...medio, semilla: s } }))) !== JSON.stringify(a))
  assert.ok(distintas.length >= 4, "Cambiar la semilla debería cambiar el reparto casi siempre")
})

test("calcularHuecos respeta cerrados y visibilidad, y solo devuelve libres", () => {
  const parcial = { duracionMin: 15, margenMin: 0, antelacionHoras: 0, ventanaDias: 0, visibilidadPct: 50, semilla: 1 }
  const sin = calcularHuecos({ ahora: AHORA, franjas: jueves10a12, ocupados: [], config: parcial })
  assert.equal(sin.length, 4) // 8 huecos teóricos, se enseña la mitad

  // Cerrar a mano uno de los que se enseñan lo quita; los demás se quedan donde estaban.
  const cerrado = sin[0].inicio.getTime()
  const con = calcularHuecos({ ahora: AHORA, franjas: jueves10a12, ocupados: [], config: parcial, cerrados: new Set([cerrado]) })
  assert.equal(con.length, 3)
  assert.ok(!con.some((h) => h.inicio.getTime() === cerrado))
})

test("normalizarHora entiende lo que se escribe a mano", () => {
  const casos = {
    "9": "09:00", "09": "09:00", "9:": "09:00", "9:30": "09:30", "09:30": "09:30",
    "930": "09:30", "0930": "09:30", "9.30": "09:30", "9h30": "09:30", "9H": "09:00",
    "14": "14:00", "1430": "14:30", "23:59": "23:59", "00:00": "00:00", "24:00": "24:00", " 18:05 ": "18:05",
  }
  for (const [entrada, esperado] of Object.entries(casos)) assert.equal(normalizarHora(entrada), esperado, entrada)
  for (const mala of ["", "abc", "25", "24:30", "12:60", "9:5", "1:2:3", "930pm", "-9"]) {
    assert.equal(normalizarHora(mala), null, `«${mala}» no es una hora`)
  }
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
