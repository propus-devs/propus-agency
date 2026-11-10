import Link from "next/link"
import { ArrowRightIcon } from "lucide-react"
import { TiltCtaButton } from "@/components/ui/tilt-cta-button"

export default function WhaCTA() {
  return (
    <section id="demo" className="py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4">
        <div className="relative overflow-hidden rounded-3xl border border-wha/20 bg-wha-card px-8 py-16 text-center md:px-16">

          {/* Glows */}
          <div className="pointer-events-none absolute inset-0" aria-hidden>
            <div className="absolute left-1/2 top-0 size-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-wha/15 blur-[120px]" />
            <div className="absolute bottom-0 right-1/4 size-72 rounded-full bg-wha-teal/15 blur-[100px]" />
          </div>

          <div className="relative">
            <h2 className="text-3xl font-semibold tracking-tight text-wha-fg md:text-4xl">
              ¿Listo para no perder una sola cita{" "}
              <span className="bg-linear-to-r from-wha via-wha-alt to-wha-teal bg-clip-text text-transparent">
                mientras duermes?
              </span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-wha-muted">
              Solicita una demo y te mostramos el agente funcionando con tus servicios, tus profesionales y tu agenda real.
            </p>

            <div className="mt-10 flex justify-center">
              {/* `flat` = modo seguro, como el resto de CTA con fondo en degradado. */}
              <TiltCtaButton
                tone="wha"
                flat
                size="lg"
                className="h-11 gap-2 bg-linear-to-r from-wha via-wha-alt to-wha-teal px-8 text-base font-semibold text-white hover:opacity-90 [&_svg]:transition-transform hover:[&_svg]:translate-x-1"
                asChild
              >
                <Link href="https://calendar.app.google/CNBch8s1Q8iqoqdE9" target="_blank" rel="noopener noreferrer">
                  Solicita una demo
                  <ArrowRightIcon className="size-4" />
                </Link>
              </TiltCtaButton>
            </div>

            <p className="mt-4 text-xs text-wha-muted">
              Sin compromiso · 30 minutos · Con tu propia agenda
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
