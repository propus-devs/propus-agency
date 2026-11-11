import type { Metadata } from "next"
import Link from "next/link"
import { WifiOffIcon } from "lucide-react"
import FondoMalla from "@/components/ui/fondo-malla"
import { viewportClaro } from "@/lib/tema-claro"

export const viewport = viewportClaro

export const metadata: Metadata = {
  title: "Sin conexión",
  description: "No hay conexión a internet en este momento.",
  robots: {
    index: false,
    follow: false,
  },
}

export default function OfflinePage() {
  return (
    <>
      <FondoMalla />
      <main className="flex min-h-[70vh] flex-col items-center justify-center gap-6 px-4 text-center">
        <span className="vidrio flex size-16 items-center justify-center rounded-2xl border">
          <WifiOffIcon className="size-7 text-muted-foreground" />
        </span>
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">Estás sin conexión</h1>
          <p className="max-w-md text-muted-foreground">
            No hemos podido cargar esta página. Comprueba tu conexión a internet e inténtalo de
            nuevo.
          </p>
        </div>
        <Link
          href="/"
          className="vidrio rounded-full border px-6 py-2.5 text-sm font-semibold transition-colors hover:bg-card/90"
        >
          Reintentar
        </Link>
      </main>
    </>
  )
}
