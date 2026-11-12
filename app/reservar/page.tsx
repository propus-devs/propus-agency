import type { Metadata } from "next"
import Footer from "@/components/layout/Footer"
import Navbar from "@/components/layout/Navbar"
import Reservador from "@/components/reservas/Reservador"
import FondoMalla from "@/components/ui/fondo-malla"
import { hayBaseDeDatos } from "@/lib/db"
import { claveDiaMadrid } from "@/lib/reservas/huecos"
import type { RespuestaMes } from "@/lib/reservas/publico-tipos"
import { cargarInicial, ticketNuevo } from "@/lib/reservas/publico"
import { contact } from "@/lib/site"
import { viewportClaro } from "@/lib/tema-claro"

// Los huecos se leen de la agenda en cada visita: lo que se cambia en el admin se ve al instante.
export const dynamic = "force-dynamic"

export const viewport = viewportClaro

const DESCRIPCION =
  "Elige día y hora y reserva una llamada gratuita de 15 minutos con Propus para hablar de tu software de gestión, tu web con reservas o tu automatización."

export const metadata: Metadata = {
  title: "Reserva una llamada de 15 minutos",
  description: DESCRIPCION,
  alternates: { canonical: "/reservar" },
  openGraph: {
    title: "Reserva una llamada de 15 minutos — Propus",
    description: DESCRIPCION,
    type: "website",
    locale: "es_ES",
  },
}

/** Carga la agenda y el ticket del formulario; si algo falla, la página enseña el contacto en su lugar. */
async function cargar(): Promise<{ inicial: RespuestaMes | null; ticket: string | null; hoy: string }> {
  const ahora = new Date()
  const hoy = claveDiaMadrid(ahora)
  if (!hayBaseDeDatos()) return { inicial: null, ticket: null, hoy }
  try {
    return { inicial: await cargarInicial(ahora), ticket: ticketNuevo(ahora), hoy }
  } catch (error) {
    console.error("[reservar] no se pudo cargar la agenda:", error)
    return { inicial: null, ticket: null, hoy }
  }
}

export default async function ReservarPage() {
  const { inicial, ticket, hoy } = await cargar()

  return (
    <>
      <FondoMalla />
      <Navbar />
      <main className="relative z-10">
        <section className="px-4 pt-28 pb-20 md:pt-36 md:pb-28">
          <div className="mx-auto max-w-5xl">
            <header className="mx-auto mb-10 max-w-2xl text-center md:mb-12">
              <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-card/60 px-3.5 py-1 font-mono text-xs tracking-[0.14em] text-primary uppercase">
                <span aria-hidden className="size-1.5 rounded-full bg-primary" />
                Llamada gratuita · 15 minutos
              </p>
              <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">
                Reserva tu llamada con{" "}
                <span className="bg-linear-to-r from-brand-sky to-brand-emerald bg-clip-text text-transparent">
                  Propus
                </span>
              </h1>
              <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">
                Elige el día y la hora que mejor te vengan. Sin compromiso: nos cuentas tu caso y vemos juntos si podemos ayudarte.
              </p>
            </header>

            <Reservador
              inicial={inicial}
              ticket={ticket}
              hoy={hoy}
              contacto={{
                email: contact.email,
                emailHref: contact.emailHref,
                phoneDisplay: contact.phoneDisplay,
                phoneHref: contact.phoneHref,
              }}
            />
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
