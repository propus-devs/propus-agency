"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import BotonEnviar from "@/components/admin/BotonEnviar"
import CampoHora from "@/components/admin/CampoHora"
import { claseAyuda, claseEtiqueta } from "@/components/admin/campos"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import {
  DIAS_CORTOS,
  mesDe,
  nombreDiaCorto,
  nombreMes,
  semanasDelMes,
  sumarMeses,
  parsearMes,
} from "@/lib/reservas/calendario"
import { cn } from "@/lib/utils"

/**
 * Formulario para bloquear días o tramos, con un calendario en vez del selector
 * del navegador: se pulsa un día (o dos, para un rango) y los meses se cambian
 * con las flechas. Manda los mismos campos de siempre (`desde_fecha`,
 * `hasta_fecha`, `desde_hora`, `hasta_hora`, `motivo`).
 */
export default function FormularioBloqueo({
  hoy,
  diasBloqueados,
  accion,
}: {
  /** Día de hoy en Madrid, "AAAA-MM-DD". No se puede bloquear antes. */
  hoy: string
  /** Días que ya tienen algún bloqueo, para marcarlos en el calendario. */
  diasBloqueados: string[]
  accion: (datos: FormData) => Promise<void>
}) {
  const [mes, setMes] = useState(mesDe(hoy))
  const [desde, setDesde] = useState<string | null>(null)
  const [hasta, setHasta] = useState<string | null>(null)
  const [todoElDia, setTodoElDia] = useState(true)
  const [horaDesde, setHoraDesde] = useState("")
  const [horaHasta, setHoraHasta] = useState("")

  const p = parsearMes(mes)
  const semanas = p ? semanasDelMes(p.anio, p.mes) : []
  const bloqueados = new Set(diasBloqueados)

  function elegir(fecha: string) {
    if (desde === null || hasta !== null) {
      setDesde(fecha)
      setHasta(null)
    } else if (fecha < desde) {
      setHasta(desde)
      setDesde(fecha)
    } else if (fecha > desde) {
      setHasta(fecha)
    }
  }

  const ultimo = hasta ?? desde
  const resumen =
    desde === null
      ? "Pulsa un día en el calendario (o dos, para un rango)."
      : hasta === null || hasta === desde
        ? nombreDiaCorto(desde)
        : `${nombreDiaCorto(desde)} → ${nombreDiaCorto(hasta)}`

  return (
    <form
      action={accion}
      className="vidrio space-y-6 rounded-xl border p-5 sm:p-6"
      aria-labelledby="titulo-nuevo"
    >
      <h2 id="titulo-nuevo" className="font-heading text-lg font-medium">
        Bloquear un día o un tramo
      </h2>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)]">
        {/* Calendario */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              aria-label="Mes anterior"
              onClick={() => setMes((m) => sumarMeses(m, -1) ?? m)}
            >
              <ChevronLeft aria-hidden />
            </Button>
            <p className="text-sm font-medium first-letter:uppercase" aria-live="polite">
              {nombreMes(mes)}
            </p>
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              aria-label="Mes siguiente"
              onClick={() => setMes((m) => sumarMeses(m, 1) ?? m)}
            >
              <ChevronRight aria-hidden />
            </Button>
          </div>

          <div role="group" aria-label={nombreMes(mes)} className="grid grid-cols-7 gap-y-1 text-center">
            {DIAS_CORTOS.map((d) => (
              <span key={d} aria-hidden className="pb-1 font-mono text-[0.7rem] text-muted-foreground">
                {d}
              </span>
            ))}
            {semanas.flat().map((celda) => {
              const pasado = celda.fecha < hoy
              const esInicio = celda.fecha === desde
              const esFin = celda.fecha === ultimo && ultimo !== desde
              const dentro =
                desde !== null && ultimo !== null && celda.fecha > desde && celda.fecha < ultimo
              return (
                <button
                  key={celda.fecha}
                  type="button"
                  disabled={pasado}
                  aria-pressed={esInicio || esFin || dentro}
                  aria-label={nombreDiaCorto(celda.fecha)}
                  onClick={() => elegir(celda.fecha)}
                  className={cn(
                    "relative mx-auto flex size-9 items-center justify-center rounded-lg text-sm tabular-nums transition-colors outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
                    !celda.delMes && "text-muted-foreground/50",
                    pasado && "cursor-not-allowed opacity-30",
                    !pasado && "hover:bg-muted",
                    celda.fecha === hoy && "ring-1 ring-primary/60",
                    dentro && "bg-primary/15 hover:bg-primary/20",
                    (esInicio || esFin) && "bg-primary text-primary-foreground hover:bg-primary"
                  )}
                >
                  {celda.dia}
                  {bloqueados.has(celda.fecha) ? (
                    <span
                      aria-hidden
                      className="absolute bottom-1 size-1 rounded-full bg-destructive"
                      title="Ya hay un bloqueo este día"
                    />
                  ) : null}
                </button>
              )
            })}
          </div>
          <p className={claseAyuda}>
            <span aria-hidden className="mr-1.5 inline-block size-1.5 rounded-full bg-destructive align-middle" />
            Los días con punto ya tienen algún bloqueo.
          </p>
        </div>

        {/* Detalles */}
        <div className="space-y-5">
          <div className="space-y-1.5">
            <p className={claseEtiqueta}>Se bloqueará</p>
            <p className="rounded-lg border border-border/60 bg-muted/30 px-3 py-2 text-sm first-letter:uppercase">
              {resumen}
            </p>
            <input type="hidden" name="desde_fecha" value={desde ?? ""} />
            <input type="hidden" name="hasta_fecha" value={hasta ?? ""} />
            {desde !== null ? (
              <button
                type="button"
                className="text-xs text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
                onClick={() => {
                  setDesde(null)
                  setHasta(null)
                }}
              >
                Quitar selección
              </button>
            ) : null}
          </div>

          <div className="flex items-start gap-3">
            <Switch id="todo-el-dia" checked={todoElDia} onCheckedChange={setTodoElDia} className="mt-0.5" />
            <label htmlFor="todo-el-dia" className="space-y-0.5 text-sm">
              <span className="block font-medium">Días completos</span>
              <span className={`${claseAyuda} block`}>
                Apagado, eliges la hora de inicio y de fin (formato 24 h).
              </span>
            </label>
          </div>

          {!todoElDia ? (
            <div className="flex flex-wrap items-center gap-2">
              <CampoHora
                name="desde_hora"
                value={horaDesde}
                onChange={setHoraDesde}
                etiqueta="Hora de inicio del bloqueo"
                placeholder="09:00"
              />
              <span aria-hidden className="text-muted-foreground">
                –
              </span>
              <CampoHora
                name="hasta_hora"
                value={horaHasta}
                onChange={setHoraHasta}
                etiqueta="Hora de fin del bloqueo"
                placeholder="14:00"
              />
              <span className={claseAyuda}>Vacío = desde el principio / hasta el final del día.</span>
            </div>
          ) : null}

          <div className="space-y-2">
            <label htmlFor="motivo" className={claseEtiqueta}>
              Motivo (sólo lo ves tú)
            </label>
            <Input id="motivo" name="motivo" type="text" maxLength={120} placeholder="Vacaciones, festivo…" />
          </div>

          <BotonEnviar disabled={desde === null}>Añadir bloqueo</BotonEnviar>
        </div>
      </div>
    </form>
  )
}
