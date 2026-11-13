import Link from "next/link"
import {
  ArrowRightIcon,
  BookOpenIcon,
  CalendarDaysIcon,
  HomeIcon,
  PanelsTopLeftIcon,
  ReceiptTextIcon,
  StethoscopeIcon,
  TreePineIcon,
  UsersIcon,
  type LucideIcon,
} from "lucide-react"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import FondoMalla from "@/components/ui/fondo-malla"
import { TiltCtaButton } from "@/components/ui/tilt-cta-button"
import { ruta, type Lang } from "@/lib/i18n/idiomas"

type Destino = {
  href: string
  titulo: string
  descripcion: string
  icono: LucideIcon
}

interface Textos {
  etiqueta: string
  /** Titular: lo que va antes del degradado y lo que va con él */
  titular: [string, string]
  descripcion: string
  volver: string
  agendar: string
  sugerencias: [string, string]
  // Los mismos destinos que el menú y el pie, con AutoClinic primero.
  destinos: Destino[]
}

const textos: Record<Lang, Textos> = {
  es: {
    etiqueta: "Error 404",
    titular: ["Esta página se ha ", "perdido por el camino"],
    descripcion:
      "Puede que el enlace esté roto o que la página haya cambiado de sitio. No pasa nada: aquí tienes por dónde seguir.",
    volver: "Volver al inicio",
    agendar: "Agendar llamada",
    sugerencias: ["Quizá buscabas ", "esto"],
    destinos: [
      {
        href: ruta("autoclinic", "es"),
        titulo: "AutoClinic",
        descripcion: "Agente de WhatsApp y gestión para clínicas.",
        icono: StethoscopeIcon,
      },
      {
        href: ruta("ruralprop", "es"),
        titulo: "RuralProp",
        descripcion: "Webs con reservas para turismo rural.",
        icono: TreePineIcon,
      },
      {
        href: ruta("disenoWeb", "es"),
        titulo: "Diseño web a medida",
        descripcion: "Páginas pensadas para tu negocio.",
        icono: PanelsTopLeftIcon,
      },
      {
        href: ruta("facturia", "es"),
        titulo: "FacturIA",
        descripcion: "Facturas y movimientos, sin teclear cifras.",
        icono: ReceiptTextIcon,
      },
      {
        href: "/blog",
        titulo: "Blog",
        descripcion: "Guías y casos prácticos.",
        icono: BookOpenIcon,
      },
      {
        href: ruta("sobreNosotros", "es"),
        titulo: "Sobre nosotros",
        descripcion: "Quiénes somos y cómo trabajamos.",
        icono: UsersIcon,
      },
    ],
  },
  en: {
    etiqueta: "Error 404",
    titular: ["This page got ", "lost along the way"],
    descripcion:
      "The link may be broken, or the page may have moved. No worries: here is where you can go next.",
    volver: "Back to home",
    agendar: "Book a call",
    sugerencias: ["Maybe you were looking for ", "this"],
    destinos: [
      {
        href: ruta("autoclinic", "en"),
        titulo: "AutoClinic",
        descripcion: "WhatsApp agent and management for clinics.",
        icono: StethoscopeIcon,
      },
      {
        href: ruta("ruralprop", "en"),
        titulo: "RuralProp",
        descripcion: "Websites with booking for rural tourism.",
        icono: TreePineIcon,
      },
      {
        href: ruta("disenoWeb", "en"),
        titulo: "Custom web design",
        descripcion: "Websites built around your business.",
        icono: PanelsTopLeftIcon,
      },
      {
        href: ruta("facturia", "en"),
        titulo: "FacturIA",
        descripcion: "Invoices and transactions, no typing numbers.",
        icono: ReceiptTextIcon,
      },
      {
        href: "/blog",
        titulo: "Blog (in Spanish)",
        descripcion: "Guides and practical cases.",
        icono: BookOpenIcon,
      },
      {
        href: ruta("sobreNosotros", "en"),
        titulo: "About us",
        descripcion: "Who we are and how we work.",
        icono: UsersIcon,
      },
    ],
  },
}

export default function NotFoundPage({ lang }: { lang: Lang }) {
  const t = textos[lang]

  return (
    <>
      <FondoMalla />
      <Navbar lang={lang} />
      <main className="relative z-10">
        <section className="px-4 pt-28 pb-16 md:pt-36 md:pb-20">
          <div className="mx-auto max-w-3xl text-center motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-4 motion-safe:duration-700">
            <span className="vidrio inline-flex items-center rounded-full border px-4 py-1.5 text-xs font-semibold text-muted-foreground">
              {t.etiqueta}
            </span>

            <p
              aria-hidden
              className="mt-6 bg-linear-to-r from-brand-sky via-brand-teal to-brand-green bg-clip-text font-heading text-8xl font-semibold leading-none tracking-tight text-transparent md:text-9xl"
            >
              404
            </p>

            <h1 className="mt-6 text-3xl font-semibold tracking-tight text-balance md:text-5xl">
              {t.titular[0]}
              <span className="bg-linear-to-r from-brand-sky to-brand-emerald bg-clip-text text-transparent">
                {t.titular[1]}
              </span>
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">
              {t.descripcion}
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <TiltCtaButton
                className="h-11 gap-2 px-6 text-base bg-brand-emerald hover:bg-brand-teal text-background font-semibold"
                asChild
              >
                <Link href={ruta("inicio", lang)}>
                  <HomeIcon className="size-4" />
                  {t.volver}
                </Link>
              </TiltCtaButton>
              <Link
                href={ruta("reservar", lang)}
                className="vidrio inline-flex h-11 items-center justify-center gap-2 rounded-full border px-6 text-base font-semibold transition-colors hover:bg-card/90"
              >
                <CalendarDaysIcon className="size-4" />
                {t.agendar}
              </Link>
            </div>
          </div>
        </section>

        <section className="px-4 pb-20 md:pb-28">
          <div className="mx-auto max-w-5xl">
            <h2 className="mb-8 text-center text-xl font-semibold tracking-tight md:text-2xl">
              {t.sugerencias[0]}
              <span className="bg-linear-to-r from-brand-teal to-brand-green bg-clip-text text-transparent">
                {t.sugerencias[1]}
              </span>
            </h2>
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {t.destinos.map(({ href, titulo, descripcion, icono: Icono }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="vidrio group flex h-full items-center gap-4 rounded-2xl border p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-teal/60 hover:bg-card/90"
                  >
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-brand-teal/10">
                      <Icono className="size-5 text-brand-teal" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-semibold">{titulo}</span>
                      <span className="mt-0.5 block text-sm text-muted-foreground">
                        {descripcion}
                      </span>
                    </span>
                    <ArrowRightIcon className="size-4 shrink-0 text-muted-foreground transition-transform duration-300 group-hover:translate-x-1 group-hover:text-foreground" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
      <Footer lang={lang} />
    </>
  )
}
