"use client"

import { useState } from "react"
import BotonEnviar from "@/components/admin/BotonEnviar"
import EditorHorario, { horarioConErrores, type Tramo } from "@/components/admin/EditorHorario"
import SeccionAjustes, { type AjustesVista } from "@/components/admin/SeccionAjustes"

/**
 * Ajustes de la agenda y horario semanal en UN solo formulario con un solo
 * «Guardar cambios». Así, guardar no tira lo que se haya tocado en la otra mitad,
 * y el botón se desactiva mientras alguna hora esté mal escrita.
 */
export default function FormularioAgenda({
  ajustes,
  inicial,
  guardar,
  barajar,
}: {
  ajustes: AjustesVista
  /** Siete listas (lunes a domingo) con los tramos guardados. */
  inicial: Tramo[][]
  guardar: (datos: FormData) => Promise<void>
  barajar: (datos: FormData) => Promise<void>
}) {
  const [dias, setDias] = useState<Tramo[][]>(inicial)
  const [duracionMin, setDuracionMin] = useState(ajustes.duracionMin)
  const conErrores = horarioConErrores(dias)

  return (
    <form action={guardar} className="space-y-6">
      <SeccionAjustes ajustes={ajustes} barajar={barajar} onDuracion={setDuracionMin} />
      <EditorHorario dias={dias} onCambio={setDias} duracionMin={duracionMin} />

      <div className="vidrio sticky bottom-4 z-20 flex flex-wrap items-center gap-3 rounded-xl border bg-card/95 p-3 shadow-lg backdrop-blur-md sm:p-4">
        <BotonEnviar disabled={conErrores}>Guardar cambios</BotonEnviar>
        <p className="text-xs text-muted-foreground" role={conErrores ? "alert" : undefined}>
          {conErrores
            ? "Corrige las horas marcadas en rojo para poder guardar."
            : "Se guardan a la vez los ajustes y el horario."}
        </p>
      </div>
    </form>
  )
}
