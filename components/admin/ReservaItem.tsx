import { cancelarReservaAccion } from "@/app/admin/actions"
import { Button } from "@/components/ui/button"
import { formatearFecha, formatearHora } from "@/lib/reservas/huecos"
import type { Reserva } from "@/lib/reservas/repo"
import { cn } from "@/lib/utils"

function capitalizar(texto: string): string {
  return texto.charAt(0).toUpperCase() + texto.slice(1)
}

/** Una reserva en la lista del admin. `cancelable`: muestra el botón de cancelar. */
export default function ReservaItem({
  reserva: r,
  cancelable,
}: {
  reserva: Reserva
  cancelable: boolean
}) {
  const cancelada = r.estado === "cancelada"
  // El teléfono puede traer espacios o guiones: el enlace tel: solo lleva dígitos y el +.
  const telefonoHref = r.telefono ? r.telefono.replace(/[^+\d]/g, "") : ""

  return (
    <li className="vidrio flex flex-col gap-3 rounded-xl border p-4 sm:flex-row sm:items-start sm:justify-between">
      <div className={cn("min-w-0 space-y-1", cancelada && "opacity-60")}>
        <p className="font-medium">
          {capitalizar(formatearFecha(r.inicio))} · {formatearHora(r.inicio)}–{formatearHora(r.fin)}
          {cancelada ? (
            <span className="ml-2 rounded-full border border-border px-2 py-0.5 align-middle text-xs font-normal text-muted-foreground">
              Cancelada
            </span>
          ) : null}
        </p>
        <p className="text-sm">{r.nombre}</p>
        <p className="text-sm text-muted-foreground">
          <a href={`mailto:${r.email}`} className="break-all underline-offset-4 hover:underline">
            {r.email}
          </a>
          {r.telefono ? (
            <>
              {" · "}
              <a href={`tel:${telefonoHref}`} className="underline-offset-4 hover:underline">
                {r.telefono}
              </a>
            </>
          ) : null}
        </p>
        {r.mensaje ? (
          <p className="whitespace-pre-line break-words text-sm text-muted-foreground">
            “{r.mensaje}”
          </p>
        ) : null}
      </div>

      {cancelable ? (
        <details className="shrink-0 text-sm sm:text-right">
          <summary className="cursor-pointer list-none text-muted-foreground transition-colors hover:text-foreground">
            Cancelar cita
          </summary>
          <form action={cancelarReservaAccion} className="mt-2 space-y-2 sm:max-w-56">
            <input type="hidden" name="id" value={r.id} />
            <p className="text-xs text-muted-foreground">
              El cliente todavía no recibe aviso por correo: si cancelas, avísale tú.
            </p>
            <Button type="submit" variant="destructive" size="sm">
              Sí, cancelar esta cita
            </Button>
          </form>
        </details>
      ) : null}
    </li>
  )
}
