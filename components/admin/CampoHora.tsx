"use client"

import { Input } from "@/components/ui/input"
import { normalizarHora } from "@/lib/reservas/huecos"
import { cn } from "@/lib/utils"

/**
 * Hora escrita en 24 horas, igual en cualquier navegador (el `<input type="time">`
 * enseña AM/PM según el idioma del sistema). Acepta "9", "930", "9:30" o "9.30" y
 * lo deja como "09:30" al salir del campo. Si no es una hora, se marca en rojo y
 * el servidor la rechaza con un aviso.
 */
export default function CampoHora({
  name,
  value,
  onChange,
  etiqueta,
  placeholder = "09:00",
  className,
}: {
  name: string
  value: string
  onChange: (valor: string) => void
  /** Texto para lectores de pantalla (el campo no tiene etiqueta visible). */
  etiqueta: string
  placeholder?: string
  className?: string
}) {
  const invalido = value.trim() !== "" && normalizarHora(value) === null

  function normalizar() {
    const limpio = normalizarHora(value)
    if (limpio !== null && limpio !== value) onChange(limpio)
  }

  return (
    <Input
      name={name}
      type="text"
      inputMode="numeric"
      autoComplete="off"
      spellCheck={false}
      maxLength={5}
      placeholder={placeholder}
      value={value}
      aria-label={etiqueta}
      aria-invalid={invalido || undefined}
      onChange={(e) => onChange(e.target.value)}
      onBlur={normalizar}
      onKeyDown={(e) => {
        // Intro dentro de un campo de hora: lo ordena en vez de enviar el formulario a medias.
        if (e.key === "Enter") {
          e.preventDefault()
          normalizar()
        }
      }}
      className={cn("w-[5.25rem] text-center font-mono tabular-nums", className)}
    />
  )
}
