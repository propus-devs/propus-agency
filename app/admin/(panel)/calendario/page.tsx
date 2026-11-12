import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { alternarHuecoAccion } from "@/app/admin/actions"
import Aviso from "@/components/admin/Aviso"
import Pagina from "@/components/admin/Pagina"
import ReservaItem from "@/components/admin/ReservaItem"
import SinBaseDeDatos from "@/components/admin/SinBaseDeDatos"
import { exigirAdmin } from "@/lib/admin/sesion"
import { hayBaseDeDatos } from "@/lib/db"
import { cargarAgenda } from "@/lib/reservas/agenda"
import {
  DIAS_CORTOS,
  mesDe,
  nombreDiaLargo,
  nombreMes,
  parsearMes,
  semanasDelMes,
  sumarMeses,
} from "@/lib/reservas/calendario"
import {
  claveDiaMadrid,
  formatearHora,
  parsearFecha,
  type Estado,
  type Hueco,
} from "@/lib/reservas/huecos"
import { cn } from "@/lib/utils"

type ResumenDia = { reservas: number; libres: number; total: number; bloqueados: number }

/** Cómo se pinta y se explica cada estado de un hueco. */
const ESTADOS: Record<Estado, { etiqueta: string; clase: string }> = {
  libre: {
    etiqueta: "Libre: lo ve el cliente (púlsalo para cerrarlo)",
    clase: "border-primary/50 bg-primary/10 text-foreground hover:bg-primary/20",
  },
  cerrado: {
    etiqueta: "Cerrado a mano: no se ofrece (púlsalo para abrirlo)",
    clase:
      "border-dashed border-foreground/30 bg-muted/60 text-muted-foreground line-through hover:bg-muted",
  },
  oculto: {
    etiqueta: "Oculto por el porcentaje de huecos que se enseñan",
    clase: "border-dashed border-border bg-transparent text-muted-foreground/70",
  },
  reservado: {
    etiqueta: "Reservado",
    clase: "border-transparent bg-primary text-primary-foreground",
  },
  bloqueado: {
    etiqueta: "Bloqueado (día o tramo bloqueado)",
    clase: "border-transparent bg-destructive/10 text-destructive",
  },
  fuera: {
    etiqueta: "Fuera de plazo: ya pasó o no cumple el aviso mínimo / los días por delante",
    clase: "border-transparent bg-transparent text-muted-foreground/45",
  },
}

const ORDEN_LEYENDA: Estado[] = ["libre", "cerrado", "oculto", "reservado", "bloqueado", "fuera"]

function capitalizar(texto: string): string {
  return texto.charAt(0).toUpperCase() + texto.slice(1)
}

function enlace(mes: string, dia?: string): string {
  return `/admin/calendario?mes=${mes}${dia ? `&dia=${dia}` : ""}`
}

function ChipHueco({ hueco }: { hueco: Hueco }) {
  const hora = formatearHora(hueco.inicio)
  const { etiqueta, clase } = ESTADOS[hueco.estado]
  const base =
    "inline-flex h-9 min-w-16 items-center justify-center rounded-lg border px-3 font-mono text-sm tabular-nums transition-colors outline-none focus-visible:ring-3 focus-visible:ring-ring/50"

  // Solo se pueden cerrar y abrir los huecos libres y los cerrados.
  if (hueco.estado === "libre" || hueco.estado === "cerrado") {
    return (
      <form action={alternarHuecoAccion}>
        <input type="hidden" name="inicio" value={hueco.inicio.toISOString()} />
        <button type="submit" title={etiqueta} aria-label={`${hora}. ${etiqueta}`} className={cn(base, clase, "cursor-pointer")}>
          {hora}
        </button>
      </form>
    )
  }
  return (
    <span title={etiqueta} aria-label={`${hora}. ${etiqueta}`} className={cn(base, clase)}>
      {hora}
    </span>
  )
}

export default async function PaginaCalendario({
  searchParams,
}: {
  searchParams: Promise<{ mes?: string; dia?: string; ok?: string; error?: string }>
}) {
  await exigirAdmin()
  const { mes: mesParam, dia: diaParam, ok, error } = await searchParams

  if (!hayBaseDeDatos()) {
    return (
      <Pagina actual="calendario" titulo="Calendario">
        <SinBaseDeDatos />
      </Pagina>
    )
  }

  const ahora = new Date()
  const hoy = claveDiaMadrid(ahora)
  const mes = parsearMes(mesParam) && mesParam ? mesParam : mesDe(hoy)
  const semanas = semanasDelMes(Number(mes.slice(0, 4)), Number(mes.slice(5, 7)))
  const celdas = semanas.flat()
  const desde = celdas[0].fecha
  const hasta = celdas[celdas.length - 1].fecha

  // Día elegido: el de la URL si está en pantalla; si no, hoy (si cae en este mes) o el día 1.
  const diaValido = diaParam && parsearFecha(diaParam) && celdas.some((c) => c.fecha === diaParam)
  const dia = diaValido && diaParam ? diaParam : celdas.some((c) => c.fecha === hoy) ? hoy : `${mes}-01`

  const { ajustes, huecos, reservas } = await cargarAgenda({ ahora, desde, hasta })

  // Resumen de cada día para la cuadrícula.
  const resumen = new Map<string, ResumenDia>()
  const de = (fecha: string): ResumenDia => {
    const actual = resumen.get(fecha) ?? { reservas: 0, libres: 0, total: 0, bloqueados: 0 }
    resumen.set(fecha, actual)
    return actual
  }
  for (const h of huecos) {
    const r = de(claveDiaMadrid(h.inicio))
    r.total += 1
    if (h.estado === "libre") r.libres += 1
    if (h.estado === "bloqueado") r.bloqueados += 1
  }
  const confirmadas = reservas.filter((r) => r.estado === "confirmada")
  for (const r of confirmadas) de(claveDiaMadrid(r.inicio)).reservas += 1

  const huecosDelDia = huecos.filter((h) => claveDiaMadrid(h.inicio) === dia)
  const reservasDelDia = confirmadas.filter((r) => claveDiaMadrid(r.inicio) === dia)
  const canceladasDelDia = reservas.filter((r) => r.estado === "cancelada" && claveDiaMadrid(r.inicio) === dia).length
  const libresDelDia = huecosDelDia.filter((h) => h.estado === "libre").length
  const anterior = sumarMeses(mes, -1) ?? mes
  const siguiente = sumarMeses(mes, 1) ?? mes

  return (
    <Pagina
      actual="calendario"
      titulo="Calendario"
      descripcion="Todos los huecos de la agenda. Pulsa un día para ver sus reservas y cerrar o abrir huecos a mano."
    >
      <Aviso ok={ok} error={error} />

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]">
        {/* Mes */}
        <section aria-labelledby="titulo-mes" className="vidrio space-y-4 rounded-xl border p-4 sm:p-5">
          <div className="flex items-center justify-between gap-2">
            <h2 id="titulo-mes" className="font-heading text-lg font-medium first-letter:uppercase">
              {nombreMes(mes)}
            </h2>
            <nav aria-label="Cambiar de mes" className="flex items-center gap-1">
              <Link
                href={enlace(mesDe(hoy))}
                className="rounded-md px-2.5 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                Hoy
              </Link>
              <Link
                href={enlace(anterior)}
                aria-label="Mes anterior"
                className="inline-flex size-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <ChevronLeft className="size-4" aria-hidden />
              </Link>
              <Link
                href={enlace(siguiente)}
                aria-label="Mes siguiente"
                className="inline-flex size-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <ChevronRight className="size-4" aria-hidden />
              </Link>
            </nav>
          </div>

          <div className="grid grid-cols-7 gap-1.5">
            {DIAS_CORTOS.map((d) => (
              <span key={d} aria-hidden className="pb-0.5 text-center font-mono text-xs text-muted-foreground">
                {d}
              </span>
            ))}
            {celdas.map((celda) => {
              const r = resumen.get(celda.fecha)
              const futuro = celda.fecha >= hoy
              const seleccionado = celda.fecha === dia
              const bloqueadoTodo = r !== undefined && r.total > 0 && r.bloqueados === r.total
              const descripcion = [
                nombreDiaLargo(celda.fecha),
                r && r.reservas > 0 ? `${r.reservas} reserva${r.reservas === 1 ? "" : "s"}` : null,
                r && futuro && r.libres > 0 ? `${r.libres} hueco${r.libres === 1 ? "" : "s"} libre${r.libres === 1 ? "" : "s"}` : null,
                bloqueadoTodo ? "bloqueado" : null,
              ]
                .filter(Boolean)
                .join(", ")
              return (
                <Link
                  key={celda.fecha}
                  href={enlace(mesDe(celda.fecha), celda.fecha)}
                  aria-label={descripcion}
                  aria-current={seleccionado ? "date" : undefined}
                  className={cn(
                    "flex min-h-16 flex-col justify-between rounded-xl border p-1.5 text-left transition-colors outline-none focus-visible:ring-3 focus-visible:ring-ring/50 sm:min-h-24 sm:p-2.5",
                    seleccionado
                      ? "border-primary bg-primary/10 ring-1 ring-primary/40"
                      : "border-border/60 bg-card/40 hover:border-primary/40 hover:bg-card/70",
                    !celda.delMes && "opacity-50",
                    !futuro && "opacity-60"
                  )}
                >
                  <span
                    className={cn(
                      "inline-flex size-6 items-center justify-center rounded-full text-sm tabular-nums",
                      celda.fecha === hoy && "bg-primary font-semibold text-primary-foreground"
                    )}
                  >
                    {celda.dia}
                  </span>
                  <span className="flex flex-wrap items-center gap-1 text-[0.68rem] leading-none">
                    {r && r.reservas > 0 ? (
                      <span className="rounded-full bg-primary px-1.5 py-0.5 font-medium text-primary-foreground">
                        {r.reservas}
                        <span className="hidden sm:inline"> {r.reservas === 1 ? "reserva" : "reservas"}</span>
                      </span>
                    ) : null}
                    {futuro && r && r.libres > 0 ? (
                      <span className="font-mono text-muted-foreground">
                        {r.libres}
                        <span className="hidden sm:inline"> libres</span>
                      </span>
                    ) : futuro && bloqueadoTodo ? (
                      <span className="text-destructive">
                        {/* En pantallas estrechas no cabe la palabra: solo un punto rojo. */}
                        <span aria-hidden className="inline-block size-1.5 rounded-full bg-destructive sm:hidden" />
                        <span className="hidden sm:inline">bloqueado</span>
                      </span>
                    ) : null}
                  </span>
                </Link>
              )
            })}
          </div>
        </section>

        {/* Día */}
        <section aria-labelledby="titulo-dia" className="space-y-4">
          <div className="vidrio space-y-4 rounded-xl border p-4 sm:p-5">
            <div className="space-y-1">
              <h2 id="titulo-dia" className="font-heading text-lg font-medium">
                {capitalizar(nombreDiaLargo(dia))}
              </h2>
              <p className="text-sm text-muted-foreground">
                {reservasDelDia.length} {reservasDelDia.length === 1 ? "reserva" : "reservas"}
                {canceladasDelDia > 0 ? ` (y ${canceladasDelDia} cancelada${canceladasDelDia === 1 ? "" : "s"})` : ""}
                {" · "}
                {libresDelDia} {libresDelDia === 1 ? "hueco libre" : "huecos libres"} para el cliente
                {ajustes.visibilidadPct < 100 ? `, enseñando el ${ajustes.visibilidadPct} %` : ""}
              </p>
            </div>

            {huecosDelDia.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                Este día no tiene huecos: el horario semanal no incluye este día de la semana.{" "}
                <Link href="/admin/horarios" className="underline underline-offset-4 hover:text-foreground">
                  Cambiar el horario
                </Link>
                .
              </p>
            ) : (
              <ul className="flex flex-wrap gap-2" aria-label="Huecos del día">
                {huecosDelDia.map((h) => (
                  <li key={h.inicio.getTime()}>
                    <ChipHueco hueco={h} />
                  </li>
                ))}
              </ul>
            )}

            <ul className="grid gap-x-4 gap-y-1.5 border-t border-border/50 pt-3 text-xs text-muted-foreground sm:grid-cols-2">
              {ORDEN_LEYENDA.map((estado) => (
                <li key={estado} className="flex items-center gap-2">
                  <span
                    aria-hidden
                    className={cn(
                      "inline-block h-4 w-6 shrink-0 rounded border",
                      // Los estados sin borde visible (reservado, bloqueado, fuera) llevan uno en la leyenda para que se vean.
                      ESTADOS[estado].clase.split(" hover:")[0].replace("border-transparent", "border-border")
                    )}
                  />
                  {ESTADOS[estado].etiqueta.split(" (")[0]}
                </li>
              ))}
            </ul>
          </div>

          {reservasDelDia.length > 0 ? (
            <ul className="space-y-3">
              {reservasDelDia.map((r) => (
                <ReservaItem key={r.id} reserva={r} cancelable={r.fin >= ahora} />
              ))}
            </ul>
          ) : null}
        </section>
      </div>
    </Pagina>
  )
}
