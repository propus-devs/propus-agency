// Pruebas de la cuadrícula mensual de los calendarios.
import test from "node:test"
import assert from "node:assert/strict"
import {
  mesDe,
  nombreDiaCorto,
  nombreDiaLargo,
  nombreMes,
  parsearMes,
  semanasDelMes,
  sumarMeses,
} from "./calendario.ts"

test("semanasDelMes: noviembre de 2026 empieza en domingo y ocupa seis filas", () => {
  const semanas = semanasDelMes(2026, 11)
  assert.equal(semanas.length, 6)
  assert.ok(semanas.every((s) => s.length === 7))
  // La primera fila arranca el lunes 26 de octubre y el 1 de noviembre cae en domingo.
  assert.deepEqual(semanas[0].map((c) => c.fecha), [
    "2026-10-26", "2026-10-27", "2026-10-28", "2026-10-29", "2026-10-30", "2026-10-31", "2026-11-01",
  ])
  assert.deepEqual(semanas[0].map((c) => c.delMes), [false, false, false, false, false, false, true])
  assert.equal(semanas[5][0].fecha, "2026-11-30")
  assert.equal(semanas[5][6].fecha, "2026-12-06")
})

test("semanasDelMes: febrero de 2027 empieza en lunes y cabe en cuatro filas", () => {
  const semanas = semanasDelMes(2027, 2)
  assert.equal(semanas.length, 4)
  assert.equal(semanas[0][0].fecha, "2027-02-01")
  assert.equal(semanas[3][6].fecha, "2027-02-28")
  assert.ok(semanas.flat().every((c) => c.delMes))
})

test("semanasDelMes: años bisiestos y cambios de año", () => {
  const feb = semanasDelMes(2028, 2).flat().filter((c) => c.delMes)
  assert.equal(feb.length, 29)
  const dic = semanasDelMes(2026, 12).flat()
  assert.equal(dic.at(-1).fecha, "2027-01-03")
  // Cada celda es el día siguiente a la anterior, sin saltos ni repeticiones.
  for (let i = 1; i < dic.length; i++) {
    const antes = Date.parse(dic[i - 1].fecha)
    assert.equal(Date.parse(dic[i].fecha) - antes, 86_400_000)
  }
})

test("meses: parsear, sumar y nombrar", () => {
  assert.deepEqual(parsearMes("2026-11"), { anio: 2026, mes: 11 })
  for (const mala of [undefined, "", "2026-13", "2026-00", "26-11", "2026-1", "1999-12", "2101-01", "2026-11-01"]) {
    assert.equal(parsearMes(mala), null, String(mala))
  }
  assert.equal(sumarMeses("2026-11", 1), "2026-12")
  assert.equal(sumarMeses("2026-12", 1), "2027-01")
  assert.equal(sumarMeses("2026-01", -1), "2025-12")
  assert.equal(sumarMeses("basura", 1), null)
  assert.equal(mesDe("2026-11-16"), "2026-11")
  assert.equal(nombreMes("2026-11"), "noviembre de 2026")
  assert.equal(nombreDiaLargo("2026-11-16"), "lunes, 16 de noviembre")
  assert.match(nombreDiaCorto("2026-11-16"), /^lun,? 16 nov/)
})
