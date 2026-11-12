"use client"

import * as React from "react"
import { useFormStatus } from "react-dom"
import { Button } from "@/components/ui/button"

/** Botón de enviar que se desactiva y cambia de texto mientras el formulario se guarda. */
export default function BotonEnviar({
  children,
  pendiente = "Guardando…",
  disabled,
  ...props
}: Omit<React.ComponentProps<typeof Button>, "type"> & { pendiente?: string }) {
  const { pending } = useFormStatus()
  return (
    <Button type="submit" disabled={pending || disabled} {...props}>
      {pending ? pendiente : children}
    </Button>
  )
}
