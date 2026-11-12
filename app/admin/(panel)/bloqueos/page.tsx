import { borrarBloqueoAccion, crearBloqueoAccion } from "@/app/admin/actions"
import Aviso from "@/components/admin/Aviso"
import FormularioBloqueo from "@/components/admin/FormularioBloqueo"
import Pagina from "@/components/admin/Pagina"
import SinBaseDeDatos from "@/components/admin/SinBaseDeDatos"
import { Button } from "@/components/ui/button"
import { exigirAdmin } from "@/lib/admin/sesion"
import { hayBaseDeDatos } from "@/lib/db"
import { claveDiaMadrid, formatearFechaCorta, formatearHora, sumarDias } from "@/lib/reservas/huecos"
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

/** Todos los días de Madrid que toca algún bloqueo, para marcarlos en el calendario. */
function diasConBloqueo(bloqueos: Bloqueo[]): string[] {
  const dias = new Set<string>()
  for (const b of bloqueos) {
    const ultimo = claveDiaMadrid(new Date(b.hasta.getTime() - 1))
    let dia = claveDiaMadrid(b.desde)
    for (let vueltas = 0; vueltas < 400 && dia <= ultimo; vueltas++) {
      dias.add(dia)
      const siguiente = sumarDias(dia, 1)
      if (!siguiente) break
      dia = siguiente
    }
  }
  return [...dias]
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

      <FormularioBloqueo
        hoy={claveDiaMadrid(new Date())}
        diasBloqueados={diasConBloqueo(bloqueos)}
        accion={crearBloqueoAccion}
      />

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
