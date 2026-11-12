import { textoError, textoOk } from "@/lib/admin/mensajes"

/** Mensaje de resultado de la última acción (?ok=… / ?error=… de la URL). */
export default function Aviso({
  ok,
  error,
  dia,
  espera,
}: {
  ok?: string
  error?: string
  dia?: string
  espera?: string
}) {
  const mensajeError = textoError(error, { dia, espera })
  if (mensajeError) {
    return (
      <p
        role="alert"
        className="rounded-lg border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive"
      >
        {mensajeError}
      </p>
    )
  }
  const mensajeOk = textoOk(ok)
  if (mensajeOk) {
    return (
      <p
        role="status"
        className="rounded-lg border border-brand-emerald/40 bg-brand-emerald/10 px-4 py-3 text-sm text-brand-emerald"
      >
        {mensajeOk}
      </p>
    )
  }
  return null
}
