import { guardarAjustesAccion, guardarHorarioAccion } from "@/app/admin/actions"
import Aviso from "@/components/admin/Aviso"
import { claseAyuda, claseEtiqueta, claseSelect } from "@/components/admin/campos"
import Pagina from "@/components/admin/Pagina"
import SinBaseDeDatos from "@/components/admin/SinBaseDeDatos"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { exigirAdmin } from "@/lib/admin/sesion"
import { hayBaseDeDatos } from "@/lib/db"
import { minutosAHora } from "@/lib/reservas/huecos"
import { listarFranjas, obtenerAjustes } from "@/lib/reservas/repo"
import { DIAS_SEMANA, FRANJAS_POR_DIA } from "@/lib/reservas/validacion"

const DURACIONES = [5, 10, 15, 20, 30, 45, 60]
const DESCANSOS = [0, 5, 10, 15, 30]

/** Las opciones habituales, más el valor actual si es otro (por si se tocó a mano en la base). */
function opciones(habituales: number[], actual: number): number[] {
  return habituales.includes(actual) ? habituales : [...habituales, actual].sort((a, b) => a - b)
}

/** `<input type="time">` no admite 24:00: un tramo que acaba a medianoche se enseña como 23:59. */
function valorHora(minutos: number): string {
  return minutosAHora(Math.min(minutos, 1439))
}

export default async function PaginaHorarios({
  searchParams,
}: {
  searchParams: Promise<{ ok?: string; error?: string; dia?: string }>
}) {
  await exigirAdmin()
  const { ok, error, dia: diaConError } = await searchParams

  if (!hayBaseDeDatos()) {
    return (
      <Pagina actual="horarios" titulo="Horario y ajustes">
        <SinBaseDeDatos />
      </Pagina>
    )
  }

  const [ajustes, franjas] = await Promise.all([obtenerAjustes(), listarFranjas()])

  return (
    <Pagina
      actual="horarios"
      titulo="Horario y ajustes"
      descripcion="Cuándo se puede reservar y cómo. Todas las horas son de Madrid."
    >
      <Aviso ok={ok} error={error} dia={diaConError} />

      <form
        action={guardarAjustesAccion}
        className="vidrio space-y-5 rounded-xl border p-5"
        aria-labelledby="titulo-ajustes"
      >
        <h2 id="titulo-ajustes" className="font-heading text-lg font-medium">
          Ajustes de la agenda
        </h2>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <label htmlFor="duracion_min" className={claseEtiqueta}>
              Duración de cada llamada
            </label>
            <select
              id="duracion_min"
              name="duracion_min"
              defaultValue={String(ajustes.duracionMin)}
              className={claseSelect}
            >
              {opciones(DURACIONES, ajustes.duracionMin).map((m) => (
                <option key={m} value={m}>
                  {m} minutos
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label htmlFor="margen_min" className={claseEtiqueta}>
              Descanso entre llamadas
            </label>
            <select
              id="margen_min"
              name="margen_min"
              defaultValue={String(ajustes.margenMin)}
              className={claseSelect}
            >
              {opciones(DESCANSOS, ajustes.margenMin).map((m) => (
                <option key={m} value={m}>
                  {m === 0 ? "Sin descanso" : `${m} minutos`}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label htmlFor="antelacion_horas" className={claseEtiqueta}>
              Aviso mínimo (horas)
            </label>
            <Input
              id="antelacion_horas"
              name="antelacion_horas"
              type="number"
              inputMode="numeric"
              min={0}
              max={720}
              required
              defaultValue={ajustes.antelacionHoras}
            />
            <p className={claseAyuda}>
              No se puede reservar con menos antelación que esta. 12 = hasta 12 horas antes.
            </p>
          </div>

          <div className="space-y-2">
            <label htmlFor="ventana_dias" className={claseEtiqueta}>
              Días por delante
            </label>
            <Input
              id="ventana_dias"
              name="ventana_dias"
              type="number"
              inputMode="numeric"
              min={1}
              max={120}
              required
              defaultValue={ajustes.ventanaDias}
            />
            <p className={claseAyuda}>Hasta cuántos días adelante se puede reservar.</p>
          </div>
        </div>

        <label className="flex items-start gap-3 text-sm">
          <input
            type="checkbox"
            name="activo"
            defaultChecked={ajustes.activo}
            className="mt-0.5 size-4 accent-[var(--brand-emerald)]"
          />
          <span>
            <span className="font-medium">Aceptar reservas nuevas</span>
            <span className={`${claseAyuda} block`}>
              Apagado, el calendario no ofrece ningún hueco. Las reservas que ya existen no se tocan.
            </span>
          </span>
        </label>

        <Button type="submit">Guardar ajustes</Button>
      </form>

      <form
        action={guardarHorarioAccion}
        className="vidrio space-y-5 rounded-xl border p-5"
        aria-labelledby="titulo-horario"
      >
        <div className="space-y-1">
          <h2 id="titulo-horario" className="font-heading text-lg font-medium">
            Horario semanal
          </h2>
          <p className={claseAyuda}>
            Los tramos en los que se aceptan llamadas. Cada tramo se trocea en huecos de{" "}
            {ajustes.duracionMin} minutos. Puedes poner hasta {FRANJAS_POR_DIA} tramos al día (por
            ejemplo, mañana y tarde). Un día sin horas no ofrece huecos.
          </p>
        </div>

        <div className="space-y-3">
          {DIAS_SEMANA.map((nombre, i) => {
            const dia = i + 1
            const deDia = franjas.filter((f) => f.diaSemana === dia)
            return (
              <fieldset
                key={dia}
                className="grid gap-2 border-t border-border/50 pt-3 first:border-t-0 first:pt-0 sm:grid-cols-[7rem_1fr] sm:items-center"
              >
                <legend className="sr-only">{nombre}</legend>
                <span aria-hidden className="text-sm font-medium">
                  {nombre}
                </span>
                <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
                  {Array.from({ length: FRANJAS_POR_DIA }, (_, n) => {
                    const franja = deDia[n]
                    return (
                      <div key={n} className="flex items-center gap-1.5">
                        <Input
                          type="time"
                          name={`d${dia}_${n}_ini`}
                          defaultValue={franja ? valorHora(franja.inicioMin) : ""}
                          aria-label={`${nombre}, tramo ${n + 1}, desde`}
                          className="w-28"
                        />
                        <span aria-hidden className="text-muted-foreground">
                          –
                        </span>
                        <Input
                          type="time"
                          name={`d${dia}_${n}_fin`}
                          defaultValue={franja ? valorHora(franja.finMin) : ""}
                          aria-label={`${nombre}, tramo ${n + 1}, hasta`}
                          className="w-28"
                        />
                      </div>
                    )
                  })}
                </div>
              </fieldset>
            )
          })}
        </div>

        <Button type="submit">Guardar horario</Button>
      </form>
    </Pagina>
  )
}
