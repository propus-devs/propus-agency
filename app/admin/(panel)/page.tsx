import Link from "next/link"
import { after } from "next/server"
import Aviso from "@/components/admin/Aviso"
import Pagina from "@/components/admin/Pagina"
import ReservaItem from "@/components/admin/ReservaItem"
import SinBaseDeDatos from "@/components/admin/SinBaseDeDatos"
import { exigirAdmin } from "@/lib/admin/sesion"
import { hayBaseDeDatos } from "@/lib/db"
import { cargarAgenda } from "@/lib/reservas/agenda"
import {
  claveDiaMadrid,
  formatearFechaCorta,
  formatearHora,
  sumarDias,
  type Intervalo,
} from "@/lib/reservas/huecos"
import {
  DIAS_DE_CONSERVACION,
  listarReservas,
  obtenerAjustes,
  purgarSiToca,
} from "@/lib/reservas/repo"
import { cn } from "@/lib/utils"

const DIAS_EN_VISTA_PREVIA = 6

async function cargarPanel() {
  const ahora = new Date()
  const hoy = claveDiaMadrid(ahora)
  const { ventanaDias } = await obtenerAjustes()
  const [agenda, reservas] = await Promise.all([
    cargarAgenda({ ahora, desde: hoy, hasta: sumarDias(hoy, ventanaDias) ?? hoy }),
    listarReservas(),
  ])
  // Lo que ve el cliente: solo los huecos libres (ni cerrados, ni ocultos por el %).
  const huecos = agenda.huecos.filter((h) => h.estado === "libre")
  const proximas = reservas.filter((r) => r.estado === "confirmada" && r.fin >= ahora)
  const anteriores = reservas
    .filter((r) => !proximas.includes(r))
    .sort((a, b) => b.inicio.getTime() - a.inicio.getTime())
  return { ajustes: agenda.ajustes, franjas: agenda.franjas, huecos, proximas, anteriores }
}

/** Huecos agrupados por día de Madrid, para la vista previa. */
function agruparPorDia(huecos: Intervalo[]) {
  const dias = new Map<string, { clave: string; fecha: Date; horas: string[] }>()
  for (const h of huecos) {
    const clave = claveDiaMadrid(h.inicio)
    const dia = dias.get(clave) ?? { clave, fecha: h.inicio, horas: [] }
    dia.horas.push(formatearHora(h.inicio))
    dias.set(clave, dia)
  }
  return [...dias.values()]
}

export default async function PaginaReservas({
  searchParams,
}: {
  searchParams: Promise<{ ok?: string; error?: string }>
}) {
  await exigirAdmin()
  const { ok, error } = await searchParams

  if (!hayBaseDeDatos()) {
    return (
      <Pagina actual="reservas" titulo="Reservas">
        <SinBaseDeDatos />
      </Pagina>
    )
  }

  // Borrado de datos caducados, sin hacer esperar a la pantalla.
  after(() => purgarSiToca())

  const { ajustes, franjas, huecos, proximas, anteriores } = await cargarPanel()
  const dias = agruparPorDia(huecos)

  return (
    <Pagina
      actual="reservas"
      titulo="Reservas"
      descripcion="Las llamadas que han reservado los clientes y lo que verán disponible."
    >
      <Aviso ok={ok} error={error} />

      <section
        aria-labelledby="estado"
        className="vidrio flex flex-col gap-3 rounded-xl border p-5 sm:flex-row sm:items-center sm:justify-between"
      >
        <div className="space-y-1">
          <h2 id="estado" className="flex items-center gap-2 font-heading text-lg font-medium">
            Agenda
            <span
              className={cn(
                "rounded-full border px-2.5 py-0.5 text-xs font-normal",
                ajustes.activo
                  ? "border-brand-emerald/40 bg-brand-emerald/10 text-brand-emerald"
                  : "border-border text-muted-foreground"
              )}
            >
              {ajustes.activo ? "Abierta" : "En pausa"}
            </span>
          </h2>
          <p className="text-sm text-muted-foreground">
            {ajustes.activo
              ? "Los clientes pueden reservar los huecos libres que ves más abajo."
              : "Los clientes no ven ningún hueco. Ábrela en «Horario y ajustes» cuando esté todo listo."}
            {franjas.length === 0 ? " Ahora mismo no hay ningún horario definido." : ""}
          </p>
        </div>
        <Link
          href="/admin/horarios"
          className="text-sm text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
        >
          Cambiar horario y ajustes →
        </Link>
      </section>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
        <section aria-labelledby="proximas" className="space-y-3">
          <h2 id="proximas" className="font-heading text-lg font-medium">
            Próximas reservas ({proximas.length})
          </h2>
          {proximas.length === 0 ? (
            <p className="vidrio rounded-xl border p-5 text-sm text-muted-foreground">
              Todavía no hay reservas.
            </p>
          ) : (
            <ul className="space-y-3">
              {proximas.map((r) => (
                <ReservaItem key={r.id} reserva={r} cancelable />
              ))}
            </ul>
          )}
        </section>

        <section aria-labelledby="huecos" className="space-y-3">
          <h2 id="huecos" className="font-heading text-lg font-medium">
            Huecos libres
          </h2>
          <div className="vidrio space-y-4 rounded-xl border p-5">
            {dias.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                No hay ningún hueco libre en los próximos {ajustes.ventanaDias} días.
              </p>
            ) : (
              <>
                <p className="text-sm text-muted-foreground">
                  {huecos.length} {huecos.length === 1 ? "hueco" : "huecos"} en los próximos{" "}
                  {ajustes.ventanaDias} días (hora de Madrid)
                  {ajustes.visibilidadPct < 100 ? `, enseñando el ${ajustes.visibilidadPct} % de cada día` : ""}.
                  Primeros días:
                </p>
                <ul className="space-y-3">
                  {dias.slice(0, DIAS_EN_VISTA_PREVIA).map((dia) => (
                    <li key={dia.clave} className="space-y-1.5">
                      <p className="text-sm font-medium">{formatearFechaCorta(dia.fecha)}</p>
                      <ul className="flex flex-wrap gap-1.5">
                        {dia.horas.map((hora) => (
                          <li
                            key={hora}
                            className="rounded-md border border-border px-2 py-0.5 text-xs tabular-nums text-muted-foreground"
                          >
                            {hora}
                          </li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </section>
      </div>

      <section aria-labelledby="anteriores">
        <details className="group">
          <summary
            id="anteriores"
            className="cursor-pointer list-none font-heading text-lg font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Anteriores y canceladas ({anteriores.length})
          </summary>
          <div className="mt-3 space-y-3">
            <p className="text-sm text-muted-foreground">
              Los datos de cada reserva se borran solos {DIAS_DE_CONSERVACION} días después de la llamada.
            </p>
            {anteriores.length === 0 ? (
              <p className="text-sm text-muted-foreground">No hay nada aquí todavía.</p>
            ) : (
              <ul className="space-y-3">
                {anteriores.map((r) => (
                  <ReservaItem key={r.id} reserva={r} cancelable={false} />
                ))}
              </ul>
            )}
          </div>
        </details>
      </section>
    </Pagina>
  )
}
