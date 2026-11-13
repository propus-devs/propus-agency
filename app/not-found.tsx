import type { Metadata } from "next"
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
import { rutaReservar } from "@/lib/site"
import { viewportClaro } from "@/lib/tema-claro"

export const viewport = viewportClaro

export const metadata: Metadata = {
  title: "Página no encontrada",
  description: "La página que buscas no existe o ha cambiado de sitio.",
  robots: {
    index: false,
    follow: false,
  },
}

type Destino = {
  href: string
  titulo: string
  descripcion: string
  icono: LucideIcon
}

// Los mismos destinos que el menú y el pie, con AutoClinic primero.
const destinos: Destino[] = [
  {
    href: "/servicios/autoclinic",
    titulo: "AutoClinic",
    descripcion: "Agente de WhatsApp y gestión para clínicas.",
    icono: StethoscopeIcon,
  },
  {
    href: "/servicios/ruralprop",
    titulo: "RuralProp",
    descripcion: "Webs con reservas para turismo rural.",
    icono: TreePineIcon,
  },
  {
    href: "/servicios/diseno-web-a-medida",
    titulo: "Diseño web a medida",
    descripcion: "Páginas pensadas para tu negocio.",
    icono: PanelsTopLeftIcon,
  },
  {
    href: "/servicios/facturia",
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
    href: "/sobre-nosotros",
    titulo: "Sobre nosotros",
    descripcion: "Quiénes somos y cómo trabajamos.",
    icono: UsersIcon,
  },
]

export default function NotFound() {
  return (
    <>
      <FondoMalla />
      <Navbar />
      <main className="relative z-10">
        <section className="px-4 pt-28 pb-16 md:pt-36 md:pb-20">
          <div className="mx-auto max-w-3xl text-center motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-4 motion-safe:duration-700">
            <span className="vidrio inline-flex items-center rounded-full border px-4 py-1.5 text-xs font-semibold text-muted-foreground">
              Error 404
            </span>

            <p
              aria-hidden
              className="mt-6 bg-linear-to-r from-brand-sky via-brand-teal to-brand-green bg-clip-text font-heading text-8xl font-semibold leading-none tracking-tight text-transparent md:text-9xl"
            >
              404
            </p>

            <h1 className="mt-6 text-3xl font-semibold tracking-tight text-balance md:text-5xl">
              Esta página se ha{" "}
              <span className="bg-linear-to-r from-brand-sky to-brand-emerald bg-clip-text text-transparent">
                perdido por el camino
              </span>
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">
              Puede que el enlace esté roto o que la página haya cambiado de sitio. No pasa
              nada: aquí tienes por dónde seguir.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <TiltCtaButton
                className="h-11 gap-2 px-6 text-base bg-brand-emerald hover:bg-brand-teal text-background font-semibold"
                asChild
              >
                <Link href="/">
                  <HomeIcon className="size-4" />
                  Volver al inicio
                </Link>
              </TiltCtaButton>
              <Link
                href={rutaReservar}
                className="vidrio inline-flex h-11 items-center justify-center gap-2 rounded-full border px-6 text-base font-semibold transition-colors hover:bg-card/90"
              >
                <CalendarDaysIcon className="size-4" />
                Agendar llamada
              </Link>
            </div>
          </div>
        </section>

        <section className="px-4 pb-20 md:pb-28">
          <div className="mx-auto max-w-5xl">
            <h2 className="mb-8 text-center text-xl font-semibold tracking-tight md:text-2xl">
              Quizá buscabas{" "}
              <span className="bg-linear-to-r from-brand-teal to-brand-green bg-clip-text text-transparent">
                esto
              </span>
            </h2>
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {destinos.map(({ href, titulo, descripcion, icono: Icono }) => (
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
      <Footer />
    </>
  )
}
