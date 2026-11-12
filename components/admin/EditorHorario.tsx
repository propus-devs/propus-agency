"use client"

import { useState } from "react"
import { Copy, Plus, X } from "lucide-react"
import CampoHora from "@/components/admin/CampoHora"
import { claseAyuda } from "@/components/admin/campos"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Switch } from "@/components/ui/switch"
import { horaAMinutos, minutosAHora, normalizarHora } from "@/lib/reservas/huecos"
import { DIAS_SEMANA, FRANJAS_POR_DIA } from "@/lib/reservas/validacion"
import { cn } from "@/lib/utils"

export type Tramo = { ini: string; fin: string }

const ABREVIATURAS = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"] as const

function aMinutos(texto: string): number | null {
  const limpio = normalizarHora(texto)
  return limpio === null ? null : horaAMinutos(limpio)
}

/** Tramo que se propone al añadir otro: una hora después de donde acaba el último. */
function tramoNuevo(anteriores: Tramo[]): Tramo {
  const finPrevio = anteriores.length > 0 ? aMinutos(anteriores[anteriores.length - 1].fin) : null
  if (finPrevio === null) return { ini: "09:00", fin: "17:00" }
  const ini = Math.min(finPrevio + 60, 22 * 60)
  return { ini: minutosAHora(ini), fin: minutosAHora(Math.min(ini + 120, 23 * 60 + 59)) }
}

/** Qué le pasa a un tramo, o null si está bien. */
export function errorDeTramo(t: Tramo): string | null {
  if (t.ini.trim() === "" || t.fin.trim() === "") return "Falta una hora"
  const a = aMinutos(t.ini)
  const b = aMinutos(t.fin)
  if (a === null || b === null) return "Hora no válida (ejemplo: 09:30)"
  if (b <= a) return "El fin tiene que ser después del inicio"
  return null
}

/** true si algún tramo de la semana tiene un error. */
export function horarioConErrores(dias: Tramo[][]): boolean {
  return dias.some((tramos) => tramos.some((t) => errorDeTramo(t) !== null))
}

/** «Copiar a…»: lleva los tramos de un día a los días que se marquen. */
function CopiarA({
  origen,
  onCopiar,
}: {
  origen: number
  onCopiar: (destinos: number[]) => void
}) {
  const [abierto, setAbierto] = useState(false)
  const [marcados, setMarcados] = useState<number[]>([])

  function alAbrir(valor: boolean) {
    setAbierto(valor)
    // Lo habitual: copiar un día entre semana al resto de la semana laboral.
    if (valor) setMarcados(origen < 5 ? [0, 1, 2, 3, 4].filter((d) => d !== origen) : [])
  }

  function alternar(d: number) {
    setMarcados((actual) => (actual.includes(d) ? actual.filter((x) => x !== d) : [...actual, d]))
  }

  const otros = ABREVIATURAS.map((_, d) => d).filter((d) => d !== origen)

  return (
    <Popover open={abierto} onOpenChange={alAbrir}>
      <PopoverTrigger asChild>
        <Button type="button" variant="ghost" size="sm">
          <Copy aria-hidden />
          Copiar a…
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-80 space-y-4">
        <div className="space-y-1">
          <p className="text-sm font-medium">Copiar el horario del {DIAS_SEMANA[origen].toLowerCase()}</p>
          <p className={claseAyuda}>Sustituye lo que haya en los días que marques.</p>
        </div>

        <div className="flex flex-wrap gap-1.5" role="group" aria-label="Días de destino">
          {otros.map((d) => {
            const activo = marcados.includes(d)
            return (
              <button
                key={d}
                type="button"
                aria-pressed={activo}
                onClick={() => alternar(d)}
                className={cn(
                  "h-8 rounded-md border px-3 text-sm transition-colors outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
                  activo
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                {ABREVIATURAS[d]}
              </button>
            )
          })}
        </div>

        <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs">
          <button
            type="button"
            className="text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
            onClick={() => setMarcados(otros.filter((d) => d < 5))}
          >
            Lunes a viernes
          </button>
          <button
            type="button"
            className="text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
            onClick={() => setMarcados(otros)}
          >
            Todos
          </button>
          <button
            type="button"
            className="text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
            onClick={() => setMarcados([])}
          >
            Ninguno
          </button>
        </div>

        <Button
          type="button"
          className="w-full"
          disabled={marcados.length === 0}
          onClick={() => {
            onCopiar(marcados)
            setAbierto(false)
          }}
        >
          Copiar a {marcados.length} {marcados.length === 1 ? "día" : "días"}
        </Button>
      </PopoverContent>
    </Popover>
  )
}

/**
 * Horario semanal: un interruptor por día y hasta 3 tramos de horas. Los campos
 * llevan los nombres `d{día}_{n}_ini` / `_fin`, así que el servidor valida y
 * guarda con las mismas reglas de siempre. El estado vive en el formulario que
 * lo contiene (`dias` y `onCambio`), que así sabe si hay algún error.
 */
export default function EditorHorario({
  dias,
  onCambio,
  duracionMin,
}: {
  /** Siete listas (lunes a domingo) con los tramos. */
  dias: Tramo[][]
  onCambio: (siguiente: Tramo[][]) => void
  duracionMin: number
}) {
  function cambiarDia(d: number, cambio: (tramos: Tramo[]) => Tramo[]) {
    onCambio(dias.map((tramos, i) => (i === d ? cambio(tramos) : tramos)))
  }

  function copiar(origen: number, destinos: number[]) {
    onCambio(dias.map((tramos, i) => (destinos.includes(i) ? dias[origen].map((t) => ({ ...t })) : tramos)))
  }

  return (
    <section
      className="vidrio space-y-5 rounded-xl border p-5 sm:p-6"
      aria-labelledby="titulo-horario"
    >
      <div className="space-y-1">
        <h2 id="titulo-horario" className="font-heading text-lg font-medium">
          Horario semanal
        </h2>
        <p className={claseAyuda}>
          Cada tramo se trocea en huecos de {duracionMin} minutos. Activa un día, ajusta sus horas
          y usa «Copiar a…» para repetirlo en otros días. Hasta {FRANJAS_POR_DIA} tramos al día
          (por ejemplo, mañana y tarde). Horas en formato 24 h.
        </p>
      </div>

      <ul className="divide-y divide-border/50">
        {DIAS_SEMANA.map((nombre, d) => {
          const tramos = dias[d]
          return (
            <li
              key={nombre}
              className="grid gap-3 py-4 first:pt-0 last:pb-0 sm:grid-cols-[10rem_minmax(0,1fr)_auto] sm:items-start"
            >
              <div className="flex items-center gap-3 sm:h-9">
                <Switch
                  checked={tramos.length > 0}
                  onCheckedChange={(activo) =>
                    cambiarDia(d, () => (activo ? [tramoNuevo([])] : []))
                  }
                  aria-label={`${nombre}: aceptar llamadas`}
                />
                <span className={cn("text-sm font-medium", tramos.length === 0 && "text-muted-foreground")}>
                  {nombre}
                </span>
              </div>

              <div className="space-y-2">
                {tramos.length === 0 ? (
                  <p className="text-sm text-muted-foreground sm:flex sm:h-9 sm:items-center">
                    Sin llamadas este día
                  </p>
                ) : (
                  tramos.map((tramo, n) => {
                    const error = errorDeTramo(tramo)
                    return (
                      <div key={n} className="space-y-1">
                        <div className="flex items-center gap-2">
                          <CampoHora
                            name={`d${d + 1}_${n}_ini`}
                            value={tramo.ini}
                            etiqueta={`${nombre}, tramo ${n + 1}, desde`}
                            onChange={(valor) =>
                              cambiarDia(d, (ts) => ts.map((t, i) => (i === n ? { ...t, ini: valor } : t)))
                            }
                          />
                          <span aria-hidden className="text-muted-foreground">
                            –
                          </span>
                          <CampoHora
                            name={`d${d + 1}_${n}_fin`}
                            value={tramo.fin}
                            placeholder="17:00"
                            etiqueta={`${nombre}, tramo ${n + 1}, hasta`}
                            onChange={(valor) =>
                              cambiarDia(d, (ts) => ts.map((t, i) => (i === n ? { ...t, fin: valor } : t)))
                            }
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon-sm"
                            aria-label={`Quitar el tramo ${n + 1} del ${nombre.toLowerCase()}`}
                            onClick={() => cambiarDia(d, (ts) => ts.filter((_, i) => i !== n))}
                          >
                            <X aria-hidden />
                          </Button>
                        </div>
                        {error ? <p className="text-xs text-destructive">{error}</p> : null}
                      </div>
                    )
                  })
                )}
              </div>

              <div className="flex flex-wrap items-center gap-1 sm:justify-end">
                {tramos.length > 0 && tramos.length < FRANJAS_POR_DIA ? (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => cambiarDia(d, (ts) => [...ts, tramoNuevo(ts)])}
                  >
                    <Plus aria-hidden />
                    Tramo
                  </Button>
                ) : null}
                {tramos.length > 0 ? (
                  <CopiarA origen={d} onCopiar={(destinos) => copiar(d, destinos)} />
                ) : null}
              </div>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
