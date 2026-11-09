import Link from "next/link"
import { TrendingUpIcon, ArrowRightIcon } from "lucide-react"
import { TiltCtaButton } from "@/components/ui/tilt-cta-button"
import { ChatScene } from "@/components/sections/movement/ChatScene"
import { CalendarScene } from "@/components/sections/movement/CalendarScene"
import { DocsScene } from "@/components/sections/movement/DocsScene"

/**
 * El texto va en el centro y las tres escenas animadas lo rodean en
 * escritorio ancho (xl): chat de AutoClinic arriba a la izquierda, reservas a
 * la derecha y documentos abajo a la izquierda. Por debajo de xl se apilan
 * tras el texto. Orden de lectura = prioridad: AutoClinic primero.
 */
export default function Movement() {
  return (
    <section className="py-24 md:py-36">
      <div className="mx-auto grid max-w-[88rem] grid-cols-1 items-center gap-8 px-4 md:grid-cols-2 xl:grid-cols-[minmax(0,1fr)_40rem_minmax(0,1fr)] xl:gap-10">

        {/* Texto */}
        <div className="mx-auto flex w-full max-w-4xl flex-col items-center gap-10 text-center md:col-span-2 xl:col-span-1 xl:col-start-2 xl:row-span-2 xl:row-start-1">

          {/* Pill */}
          <span className="rainbow-border inline-flex items-center gap-2 rounded-full bg-black px-4 py-1.5 text-xs font-semibold text-white">
            <TrendingUpIcon className="size-3.5" />
            El momento es ahora
          </span>

          {/* Título: un solo h2 con dos líneas, no dos h2 seguidos */}
          <h2 className="text-4xl md:text-6xl font-semibold tracking-tight leading-tight">
            <span className="block text-white">No es magia.</span>
            <span className="mt-1 block bg-linear-to-r from-brand-teal to-brand-green bg-clip-text text-transparent">
              Es simplemente trabajar mejor.
            </span>
          </h2>

          {/* Subtítulo. Orden fijo: primero las citas (AutoClinic), después
              facturas (FacturIA) y webs. Sin cifras ni comparaciones con la
              competencia: lo que se afirma es lo que hace el producto. */}
          <p className="text-lg text-slate-400 leading-relaxed max-w-2xl text-balance">
            Citas que se confirman solas. Facturas que se procesan solas. Webs
            que reciben reservas mientras duermes. Tú te quedas con lo que de
            verdad requiere una persona.
          </p>

          {/* CTA */}
          <div className="flex flex-col items-center gap-3">
            <TiltCtaButton
              size="lg"
              className="bg-brand-emerald hover:bg-brand-teal text-background font-semibold px-8 gap-2"
              asChild
            >
              <Link href="/#servicios">
                Descubrir mis opciones
                <ArrowRightIcon className="size-4" />
              </Link>
            </TiltCtaButton>
            <span className="text-xs text-slate-500">Sin compromiso · Consultoría gratuita</span>
          </div>
        </div>

        {/* Escenas en vivo (decorativas) */}
        <ChatScene className="mx-auto w-full max-w-sm xl:col-start-1 xl:row-start-1 xl:max-w-none" />
        <CalendarScene className="mx-auto w-full max-w-sm xl:col-start-3 xl:row-span-2 xl:row-start-1 xl:max-w-none" />
        <DocsScene className="mx-auto w-full max-w-sm md:col-span-2 xl:col-span-1 xl:col-start-1 xl:row-start-2 xl:max-w-none" />
      </div>
    </section>
  )
}
