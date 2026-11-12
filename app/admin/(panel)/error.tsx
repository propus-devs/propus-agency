"use client"

import { Button } from "@/components/ui/button"

/** Si falla la base de datos u otra cosa del panel, se avisa sin enseñar el error técnico. */
export default function ErrorPanel({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <main className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center gap-4 px-4 py-16 text-center">
      <h1 className="font-heading text-2xl font-semibold">No se ha podido cargar el panel</h1>
      <p className="text-sm text-muted-foreground">
        Puede ser un corte momentáneo con la base de datos. Si se repite, mira los registros del
        servicio <strong>propus</strong> en Easypanel.
      </p>
      <div>
        <Button onClick={reset}>Reintentar</Button>
      </div>
    </main>
  )
}
