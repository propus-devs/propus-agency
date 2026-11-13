import Link from "next/link"
import Image from "next/image"
import { ArrowRightIcon, ScanLineIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { TiltCtaButton } from "@/components/ui/tilt-cta-button"
import type { Lang } from "@/lib/i18n/idiomas"

interface Textos {
  pastilla: string
  /** Antes del degradado, el degradado y lo que va tras el salto de línea */
  titulo: [string, string, string]
  descripcion: string
  demo: string
  funcionalidades: string
}

const textos: Record<Lang, Textos> = {
  es: {
    pastilla: "Gestión inteligente de facturas",
    titulo: ["De la foto de tu factura al ", "informe contable,", "sin teclear ni una cifra."],
    descripcion:
      "Plataforma inteligente de gestión de facturas y movimientos financieros para empresas. Captura con OCR e IA, revisión y aprobación automática, y exportación de informes listos para tu gestoría — todo multiempresa y seguro.",
    demo: "Solicita una demo",
    funcionalidades: "Ver funcionalidades",
  },
  en: {
    pastilla: "Smart invoice management",
    titulo: ["From a photo of your invoice to the ", "accounting report,", "without typing a single figure."],
    descripcion:
      "A smart platform for managing invoices and financial transactions for businesses. OCR and AI capture, automatic review and approval, and export of reports ready for your accountant — all multi-company and secure.",
    demo: "Request a demo",
    funcionalidades: "See features",
  },
}

export default function FacturiaHero({ lang = "es" }: { lang?: Lang }) {
  const t = textos[lang]

  return (
    <section className="relative overflow-hidden pt-32 pb-20 md:pt-44 md:pb-28">
      {/* Glows de fondo en cian */}
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
        <div className="absolute left-1/4 top-0 size-128 -translate-x-1/2 rounded-full bg-facturia/10 blur-[140px]" />
        <div className="absolute right-0 top-1/3 size-96 rounded-full bg-facturia-dark/15 blur-[120px]" />
      </div>

      <div className="mx-auto max-w-6xl px-4">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Columna texto */}
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-facturia/30 bg-facturia/10 px-4 py-1.5 text-xs font-semibold text-facturia">
              <ScanLineIcon className="size-3.5" />
              {t.pastilla}
            </span>

            <h1 className="text-4xl font-semibold leading-[1.1] tracking-tight md:text-5xl lg:text-6xl">
              {t.titulo[0]}
              <span className="bg-linear-to-r from-facturia to-facturia-dark bg-clip-text text-transparent">
                {t.titulo[1]}
              </span>
              <br /> {t.titulo[2]}
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
              {t.descripcion}
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              {/* `flat` = modo seguro. Todos los CTA con fondo en degradado van
                  así: son los que se quedaban invisibles. */}
              <TiltCtaButton
                tone="facturia"
                flat
                size="lg"
                className="h-11 gap-2 bg-linear-to-r from-facturia to-facturia-dark px-7 font-semibold text-white hover:opacity-90 [&_svg]:transition-transform hover:[&_svg]:translate-x-1"
                asChild
              >
                <Link href="#demo">
                  {t.demo}
                  <ArrowRightIcon className="size-4" />
                </Link>
              </TiltCtaButton>
              <Button variant="outline" size="lg" className="h-11 px-7" asChild>
                <Link href="#funcionalidades">{t.funcionalidades}</Link>
              </Button>
            </div>
          </div>

          {/* Columna imagen del logo */}
          <div className="flex justify-center lg:justify-end">
            <LogoHero />
          </div>
        </div>
      </div>
    </section>
  )
}

function LogoHero() {
  return (
    <div className="group w-full max-w-48 md:max-w-64 lg:max-w-sm overflow-hidden rounded-3xl border border-white/10 bg-facturia-card shadow-2xl shadow-black/60 transition-shadow duration-500 hover:border-facturia/40 hover:shadow-facturia/50">
      <Image
        src="/img/facturia/logo-grande.png"
        alt="FacturIA"
        width={500}
        height={500}
        priority
        sizes="(max-width: 1024px) 100vw, 36rem"
        className="h-auto w-full transition-transform duration-500 ease-out group-hover:scale-105"
      />
    </div>
  )
}
