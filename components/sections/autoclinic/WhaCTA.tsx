import Link from "next/link"
import { ArrowRightIcon } from "lucide-react"
import { TiltCtaButton } from "@/components/ui/tilt-cta-button"
import { ruta, type Lang } from "@/lib/i18n/idiomas"

interface Textos {
  titulo: [string, string]
  descripcion: string
  boton: string
  nota: string
}

const textos: Record<Lang, Textos> = {
  es: {
    titulo: ["¿Listo para no perder una sola cita ", "mientras duermes?"],
    descripcion:
      "Solicita una demo y te mostramos el agente funcionando con tus servicios, tus profesionales y tu agenda real.",
    boton: "Solicita una demo",
    nota: "Sin compromiso · 15 minutos · Con tu propia agenda",
  },
  en: {
    titulo: ["Ready to never lose an appointment ", "while you sleep?"],
    descripcion:
      "Request a demo and we'll show you the agent working with your services, your professionals and your real schedule.",
    boton: "Request a demo",
    nota: "No strings attached · 15 minutes · With your own schedule",
  },
}

export default function WhaCTA({ lang = "es" }: { lang?: Lang }) {
  const t = textos[lang]

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
              {t.titulo[0]}
              <span className="bg-linear-to-r from-wha via-wha-alt to-wha-teal bg-clip-text text-transparent">
                {t.titulo[1]}
              </span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-wha-muted">{t.descripcion}</p>

            <div className="mt-10 flex justify-center">
              {/* `flat` = modo seguro, como el resto de CTA con fondo en degradado. */}
              <TiltCtaButton
                tone="wha"
                flat
                size="lg"
                className="h-11 gap-2 bg-linear-to-r from-wha via-wha-alt to-wha-teal px-8 text-base font-semibold text-white hover:opacity-90 [&_svg]:transition-transform hover:[&_svg]:translate-x-1"
                asChild
              >
                <Link href={ruta("reservar", lang)}>
                  {t.boton}
                  <ArrowRightIcon className="size-4" />
                </Link>
              </TiltCtaButton>
            </div>

            <p className="mt-4 text-xs text-wha-muted">{t.nota}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
