"use client"

import { useState } from "react"
import { Shuffle } from "lucide-react"
import { claseAyuda, claseEtiqueta } from "@/components/admin/campos"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"

const DURACIONES = [5, 10, 15, 20, 30, 45, 60]
const DESCANSOS = [0, 5, 10, 15, 30]

/** Las opciones habituales, más el valor actual si es otro (por si se tocó a mano en la base). */
function opciones(habituales: number[], actual: number): number[] {
  return habituales.includes(actual) ? habituales : [...habituales, actual].sort((a, b) => a - b)
}

export type AjustesVista = {
  duracionMin: number
  margenMin: number
  antelacionHoras: number
  ventanaDias: number
  visibilidadPct: number
  activo: boolean
}

/**
 * Ajustes de la agenda. Va DENTRO del formulario de la agenda (no tiene el suyo):
 * se guarda junto con el horario. `onDuracion` avisa del cambio de duración para
 * que el horario diga de cuántos minutos son los huecos.
 */
export default function SeccionAjustes({
  ajustes,
  barajar,
  onDuracion,
}: {
  ajustes: AjustesVista
  /** Acción del botón «Cambiar cuáles se esconden» (se envía el formulario a esta acción). */
  barajar: (datos: FormData) => Promise<void>
  onDuracion: (minutos: number) => void
}) {
  const [pct, setPct] = useState(ajustes.visibilidadPct)

  return (
    <section
      className="vidrio space-y-6 rounded-xl border p-5 sm:p-6"
      aria-labelledby="titulo-ajustes"
    >
      <h2 id="titulo-ajustes" className="font-heading text-lg font-medium">
        Ajustes de la agenda
      </h2>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="duracion_min" className={claseEtiqueta}>
            Duración de cada llamada
          </label>
          <Select
            name="duracion_min"
            defaultValue={String(ajustes.duracionMin)}
            onValueChange={(valor) => onDuracion(Number(valor))}
          >
            <SelectTrigger id="duracion_min">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {opciones(DURACIONES, ajustes.duracionMin).map((m) => (
                <SelectItem key={m} value={String(m)}>
                  {m} minutos
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label htmlFor="margen_min" className={claseEtiqueta}>
            Descanso entre llamadas
          </label>
          <Select name="margen_min" defaultValue={String(ajustes.margenMin)}>
            <SelectTrigger id="margen_min">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {opciones(DESCANSOS, ajustes.margenMin).map((m) => (
                <SelectItem key={m} value={String(m)}>
                  {m === 0 ? "Sin descanso" : `${m} minutos`}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
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

      <div className="space-y-3 rounded-lg border border-border/60 bg-muted/30 p-4">
        <div className="flex items-baseline justify-between gap-3">
          <label htmlFor="visibilidad_pct" className={claseEtiqueta}>
            Huecos que se enseñan cada día
          </label>
          <output
            htmlFor="visibilidad_pct"
            className="font-mono text-lg font-semibold tabular-nums text-foreground"
          >
            {pct} %
          </output>
        </div>
        <input
          id="visibilidad_pct"
          name="visibilidad_pct"
          type="range"
          min={10}
          max={100}
          step={5}
          value={pct}
          onChange={(e) => setPct(Number(e.target.value))}
          className="h-2 w-full cursor-pointer accent-primary"
        />
        <p className={claseAyuda}>
          Con 100 % se ofrece toda la agenda. Con menos, cada día se esconde una parte de los huecos
          (siempre la misma, no cambia al recargar) y esos huecos no se pueden reservar. Para
          decidir a mano cuáles cierras, usa el calendario.
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <Button
            type="submit"
            formAction={barajar}
            formNoValidate
            variant="outline"
            size="sm"
            disabled={pct >= 100}
          >
            <Shuffle aria-hidden />
            Cambiar cuáles se esconden
          </Button>
          <span className={claseAyuda}>Se aplica al momento; guarda antes los demás cambios.</span>
        </div>
      </div>

      <div className="flex items-start gap-3">
        <Switch id="activo" name="activo" defaultChecked={ajustes.activo} className="mt-0.5" />
        <label htmlFor="activo" className="space-y-0.5 text-sm">
          <span className="block font-medium">Aceptar reservas nuevas</span>
          <span className={`${claseAyuda} block`}>
            Apagado, el calendario no ofrece ningún hueco. Las reservas que ya existen no se tocan.
          </span>
        </label>
      </div>
    </section>
  )
}
