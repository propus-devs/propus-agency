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
    titulo: ["¿Listo para dejar de teclear y ", "empezar a controlar?"],
    descripcion:
      "Solicita una demo y descubre en 15 minutos cómo FacturIA automatiza tus facturas, tus movimientos financieros y tus informes para la gestoría.",
    boton: "Solicita una demo",
    nota: "Sin compromiso. Te enseñamos la plataforma con tus propios documentos.",
  },
  en: {
    titulo: ["Ready to stop typing and ", "start taking control?"],
    descripcion:
      "Request a demo and find out in 15 minutes how FacturIA automates your invoices, your financial transactions and your reports for your accountant.",
    boton: "Request a demo",
    nota: "No strings attached. We show you the platform with your own documents.",
  },
}

export default function FacturiaCTA({ lang = "es" }: { lang?: Lang }) {
  const t = textos[lang]

  return (
    <section id="demo" className="py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4">
        <div className="relative overflow-hidden rounded-3xl border border-facturia/20 bg-facturia-bg px-8 py-16 text-center md:px-16">
          {/* Glows cian */}
          <div className="pointer-events-none absolute inset-0" aria-hidden>
            <div className="absolute left-1/2 top-0 size-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-facturia/20 blur-[120px]" />
            <div className="absolute bottom-0 right-1/4 size-72 rounded-full bg-facturia-dark/20 blur-[100px]" />
          </div>

          <div className="relative">
            <h2 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">
              {t.titulo[0]}
              <span className="bg-linear-to-r from-facturia to-facturia-dark bg-clip-text text-transparent">
                {t.titulo[1]}
              </span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-slate-300">{t.descripcion}</p>

            <div className="mt-10 flex justify-center">
              {/* `flat`: botón dentro de una tarjeta con overlays difuminados,
                  el mismo patrón que ya dio problemas en el CTA final del index. */}
              <TiltCtaButton
                tone="facturia"
                flat
                size="lg"
                className="h-11 gap-2 bg-linear-to-r from-facturia to-facturia-dark px-8 text-base font-semibold text-white hover:opacity-90 [&_svg]:transition-transform hover:[&_svg]:translate-x-1"
                asChild
              >
                <Link href={ruta("reservar", lang)}>
                  {t.boton}
                  <ArrowRightIcon className="size-4" />
                </Link>
              </TiltCtaButton>
            </div>

            <p className="mt-4 text-xs text-facturia-muted">{t.nota}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
