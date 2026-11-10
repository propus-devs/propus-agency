import Link from "next/link"
import { ArrowRightIcon, TreePineIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { TiltCtaButton } from "@/components/ui/tilt-cta-button"
import RuralPropColinas from "@/components/sections/ruralprop/RuralPropColinas"

export default function RuralPropHero() {
  return (
    <section className="relative isolate overflow-hidden px-4 pt-28 pb-48 md:pt-40 md:pb-72">
      {/* Sol bajo, detrás de las colinas */}
      <div
        aria-hidden
        className="absolute right-[8%] bottom-20 -z-10 size-52 rounded-full bg-[radial-gradient(circle,#f7cf7d_0%,#e6ab4a_38%,transparent_70%)] opacity-70 md:bottom-28 md:size-80"
      />
      <RuralPropColinas
        difuminar
        className="absolute inset-x-0 bottom-0 -z-10 h-44 md:h-64 lg:h-72"
      />

      <div className="mx-auto max-w-4xl text-center">
        <span className="mb-8 inline-flex items-center gap-2 rounded-full border border-rural-honey/30 bg-rural-honey/10 px-4 py-1.5 text-xs font-medium text-rural-honey">
          <TreePineIcon className="size-3.5" />
          Para casas rurales, cabañas y apartamentos turísticos
        </span>

        <h1 className="font-display-serif text-5xl font-normal leading-[1.02] tracking-tight text-rural-fg md:text-7xl">
          <span className="italic text-rural-honey">RuralProp</span>: la web con reservas directas
          para tu <span className="italic text-rural-moss">alojamiento rural</span>
        </h1>

        <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-rural-muted">
          Calendario centralizado, reservas con pago online, registro de viajeros para SES
          Hospedajes y un SEO preparado también para los buscadores con IA. Todo en una web
          tuya, con un panel para gestionarla.
        </p>

        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <TiltCtaButton
            size="lg"
            tone="rural"
            className="h-11 gap-2 bg-rural-honey px-6 font-semibold text-rural-ink hover:bg-[#f0bb62] [&_svg]:transition-transform hover:[&_svg]:translate-x-1"
            asChild
          >
            <Link href="https://calendar.app.google/CNBch8s1Q8iqoqdE9" target="_blank" rel="noopener noreferrer">
              Agendar llamada
              <ArrowRightIcon className="size-4" />
            </Link>
          </TiltCtaButton>
          <Button
            variant="outline"
            size="lg"
            className="h-11 border-rural-line bg-transparent px-6 text-rural-fg hover:bg-rural-fg/5 hover:text-rural-fg dark:border-rural-line dark:bg-transparent dark:hover:bg-rural-fg/5"
            asChild
          >
            <Link href="#precios">Ver precios</Link>
          </Button>
        </div>

        <p className="mt-8 text-sm text-rural-muted/80">
          Reservas directas <span aria-hidden className="mx-2">·</span> Registro de viajeros{" "}
          <span aria-hidden className="mx-2">·</span> En español e inglés
        </p>
      </div>
    </section>
  )
}
