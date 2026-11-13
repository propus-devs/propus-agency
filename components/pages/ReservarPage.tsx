import Footer from "@/components/layout/Footer"
import Navbar from "@/components/layout/Navbar"
import Reservador from "@/components/reservas/Reservador"
import FondoMalla from "@/components/ui/fondo-malla"
import { hayBaseDeDatos } from "@/lib/db"
import { claveDiaMadrid } from "@/lib/reservas/huecos"
import type { RespuestaMes } from "@/lib/reservas/publico-tipos"
import { cargarInicial, ticketNuevo } from "@/lib/reservas/publico"
import { contact } from "@/lib/site"
import type { Lang } from "@/lib/i18n/idiomas"

const textos: Record<Lang, { etiqueta: string; titulo: [string, string]; descripcion: string }> = {
  es: {
    etiqueta: "Llamada gratuita · 15 minutos",
    titulo: ["Reserva tu llamada con ", "Propus"],
    descripcion:
      "Elige el día y la hora que mejor te vengan. Sin compromiso: nos cuentas tu caso y vemos juntos si podemos ayudarte.",
  },
  en: {
    etiqueta: "Free call · 15 minutes",
    titulo: ["Book your call with ", "Propus"],
    descripcion:
      "Choose the day and time that suit you best. No strings attached: you tell us about your case and we see together whether we can help.",
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

/** Reserva de una llamada, compartida por los dos idiomas. Los huecos son los mismos: una sola agenda. */
export default async function ReservarPage({ lang }: { lang: Lang }) {
  const t = textos[lang]
  const { inicial, ticket, hoy } = await cargar()

  return (
    <>
      <FondoMalla />
      <Navbar lang={lang} />
      <main className="relative z-10">
        <section className="px-4 pt-28 pb-20 md:pt-36 md:pb-28">
          <div className="mx-auto max-w-5xl">
            <header className="mx-auto mb-10 max-w-2xl text-center md:mb-12">
              <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-card/60 px-3.5 py-1 font-mono text-xs tracking-[0.14em] text-primary uppercase">
                <span aria-hidden className="size-1.5 rounded-full bg-primary" />
                {t.etiqueta}
              </p>
              <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">
                {t.titulo[0]}
                <span className="bg-linear-to-r from-brand-sky to-brand-emerald bg-clip-text text-transparent">
                  {t.titulo[1]}
                </span>
              </h1>
              <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">
                {t.descripcion}
              </p>
            </header>

            <Reservador
              inicial={inicial}
              ticket={ticket}
              hoy={hoy}
              lang={lang}
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
      <Footer lang={lang} />
    </>
  )
}
