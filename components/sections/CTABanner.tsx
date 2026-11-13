import Link from "next/link"
import { TiltCtaButton } from "@/components/ui/tilt-cta-button"
import { ArrowRightIcon, Mail, Phone } from "lucide-react"
import { EtheralShadow } from "@/components/ui/etheral-shadow"
import { contact } from "@/lib/site"
import { ruta, type Lang } from "@/lib/i18n/idiomas"

interface Textos {
  titulo: [string, string]
  descripcion: string
  boton: string
  nota: string
}

const textos: Record<Lang, Textos> = {
  es: {
    titulo: ["¿Listo para automatizar ", "tu negocio?"],
    descripcion:
      "Agenda una llamada gratuita y descubre en 15 minutos cómo podemos simplificar tus procesos más críticos.",
    boton: "Agendar llamada",
    nota: "Te atenderemos sin compromiso alguno. De emprendedores a emprendedores.",
  },
  en: {
    titulo: ["Ready to automate ", "your business?"],
    descripcion:
      "Book a free call and find out in 15 minutes how we can simplify your most critical processes.",
    boton: "Book a call",
    nota: "No strings attached. From entrepreneurs to entrepreneurs.",
  },
}

export default function CTABanner({ lang = "es" }: { lang?: Lang }) {
  const t = textos[lang]

  return (
    <section id="contacto" className="py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-4">
        {/* Isla oscura: sobre la portada clara, el cierre es la tarjeta de
            contraste (con su neón de marca y su sombra para despegarla). */}
        <div className="isla-oscura relative rounded-3xl bg-[#08171d] overflow-hidden px-8 py-16 md:px-16 text-center border border-white/10 shadow-[0_2rem_4rem_-1.75rem_rgb(15_34_48/0.55)]">
          <EtheralShadow
            color="rgba(0, 180, 130, 0.8)"
            animation={{ scale: 80, speed: 70 }}
            noise={{ opacity: 0.6, scale: 1.2 }}
            sizing="fill"
          />

          <div className="relative">
            <h2 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">
              {t.titulo[0]}
              <span className="bg-linear-to-r from-brand-spring to-brand-teal bg-clip-text text-transparent">
                {t.titulo[1]}
              </span>
            </h2>
            <p className="mt-4 text-neutral-300 max-w-xl mx-auto">{t.descripcion}</p>

            <div className="mt-10 flex justify-center">
              {/* `flat`: sin perspective(). El EtheralShadow de esta tarjeta
                  aplica un filtro SVG animado, y el botón promovido a capa 3D
                  dejaba de pintarse. Conserva el resto del hover. */}
              <TiltCtaButton
                flat
                className="bg-linear-to-r from-brand-emerald to-brand-green hover:from-brand-teal hover:to-brand-spring text-background gap-2 h-11 px-8 font-semibold text-base"
                asChild
              >
                <Link href={ruta("reservar", lang)}>
                  {t.boton}
                  <ArrowRightIcon className="size-4" />
                </Link>
              </TiltCtaButton>
            </div>

            <p className="mt-4 text-xs text-neutral-400">{t.nota}</p>

            <address className="mt-8 flex not-italic flex-col items-center justify-center gap-3 text-sm text-neutral-300 sm:flex-row sm:gap-8">
              <a
                href={contact.phoneHref}
                className="inline-flex items-center gap-2 transition-colors duration-300 hover:text-white"
              >
                <Phone className="size-4 text-brand-spring" />
                {contact.phoneDisplay}
              </a>
              <a
                href={contact.emailHref}
                className="inline-flex items-center gap-2 transition-colors duration-300 hover:text-white"
              >
                <Mail className="size-4 text-brand-spring" />
                {contact.email}
              </a>
            </address>
          </div>
        </div>
      </div>
    </section>
  )
}
