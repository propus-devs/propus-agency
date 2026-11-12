import { borrarBloqueoAccion, crearBloqueoAccion } from "@/app/admin/actions"
import Aviso from "@/components/admin/Aviso"
import { claseAyuda, claseEtiqueta } from "@/components/admin/campos"
import Pagina from "@/components/admin/Pagina"
import SinBaseDeDatos from "@/components/admin/SinBaseDeDatos"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { exigirAdmin } from "@/lib/admin/sesion"
import { hayBaseDeDatos } from "@/lib/db"
import { formatearFechaCorta, formatearHora } from "@/lib/reservas/huecos"
import { listarBloqueos, type Bloqueo } from "@/lib/reservas/repo"

/** "jue, 24 dic" (un día), "jue, 24 dic – sáb, 26 dic" (varios) o con horas si no son días completos. */
function describir(b: Bloqueo): string {
  const horaDesde = formatearHora(b.desde)
  const horaHasta = formatearHora(b.hasta)
  const diaDesde = formatearFechaCorta(b.desde)

  if (horaDesde === "00:00" && horaHasta === "00:00") {
    // Termina a las 00:00 del día siguiente al último día bloqueado.
    const ultimo = formatearFechaCorta(new Date(b.hasta.getTime() - 60_000))
    return ultimo === diaDesde ? `${diaDesde} · todo el día` : `${diaDesde} – ${ultimo} · días completos`
  }
  const diaHasta = formatearFechaCorta(new Date(b.hasta.getTime() - 60_000))
  return diaDesde === diaHasta
    ? `${diaDesde} · ${horaDesde}–${horaHasta}`
    : `${diaDesde} ${horaDesde} → ${formatearFechaCorta(b.hasta)} ${horaHasta}`
}

export default async function PaginaBloqueos({
  searchParams,
}: {
  searchParams: Promise<{ ok?: string; error?: string }>
}) {
  await exigirAdmin()
  const { ok, error } = await searchParams

  if (!hayBaseDeDatos()) {
    return (
      <Pagina actual="bloqueos" titulo="Días bloqueados">
        <SinBaseDeDatos />
      </Pagina>
    )
  }

  const bloqueos = await listarBloqueos()

  return (
    <Pagina
      actual="bloqueos"
      titulo="Días bloqueados"
      descripcion="Vacaciones, festivos o cualquier hueco en el que no quieras que reserven. Horas de Madrid."
    >
      <Aviso ok={ok} error={error} />

      <form
        action={crearBloqueoAccion}
        className="vidrio space-y-5 rounded-xl border p-5"
        aria-labelledby="titulo-nuevo"
      >
        <h2 id="titulo-nuevo" className="font-heading text-lg font-medium">
          Bloquear un día o un tramo
        </h2>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <label htmlFor="desde_fecha" className={claseEtiqueta}>
              Desde (día)
            </label>
            <Input id="desde_fecha" name="desde_fecha" type="date" required />
          </div>
          <div className="space-y-2">
            <label htmlFor="desde_hora" className={claseEtiqueta}>
              Desde (hora, opcional)
            </label>
            <Input id="desde_hora" name="desde_hora" type="time" />
          </div>
          <div className="space-y-2">
            <label htmlFor="hasta_fecha" className={claseEtiqueta}>
              Hasta (día, opcional)
            </label>
            <Input id="hasta_fecha" name="hasta_fecha" type="date" />
          </div>
          <div className="space-y-2">
            <label htmlFor="hasta_hora" className={claseEtiqueta}>
              Hasta (hora, opcional)
            </label>
            <Input id="hasta_hora" name="hasta_hora" type="time" />
          </div>
        </div>

        <p className={claseAyuda}>
          Sin horas se bloquean los días enteros. Sin «hasta (día)» es solo el día de inicio.
        </p>

        <div className="space-y-2">
          <label htmlFor="motivo" className={claseEtiqueta}>
            Motivo (solo lo ves tú)
          </label>
          <Input id="motivo" name="motivo" type="text" maxLength={120} placeholder="Vacaciones, festivo…" />
        </div>

        <Button type="submit">Añadir bloqueo</Button>
      </form>

      <section aria-labelledby="titulo-lista" className="space-y-3">
        <h2 id="titulo-lista" className="font-heading text-lg font-medium">
          Bloqueos activos y próximos ({bloqueos.length})
        </h2>
        {bloqueos.length === 0 ? (
          <p className="vidrio rounded-xl border p-5 text-sm text-muted-foreground">
            No hay ningún bloqueo.
          </p>
        ) : (
          <ul className="space-y-3">
            {bloqueos.map((b) => (
              <li
                key={b.id}
                className="vidrio flex items-center justify-between gap-3 rounded-xl border p-4"
              >
                <div className="min-w-0">
                  <p className="text-sm font-medium">{describir(b)}</p>
                  {b.motivo ? (
                    <p className="break-words text-sm text-muted-foreground">{b.motivo}</p>
                  ) : null}
                </div>
                <form action={borrarBloqueoAccion}>
                  <input type="hidden" name="id" value={b.id} />
                  <Button type="submit" variant="ghost" size="sm">
                    Quitar
                  </Button>
                </form>
              </li>
            ))}
          </ul>
        )}
      </section>
    </Pagina>
  )
}
