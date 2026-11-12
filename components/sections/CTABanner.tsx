import Link from "next/link"
import { TiltCtaButton } from "@/components/ui/tilt-cta-button"
import { ArrowRightIcon, Mail, Phone } from "lucide-react"
import { EtheralShadow } from "@/components/ui/etheral-shadow"
import { contact, rutaReservar } from "@/lib/site"

export default function CTABanner() {
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
              ¿Listo para automatizar{" "}
              <span className="bg-linear-to-r from-brand-spring to-brand-teal bg-clip-text text-transparent">
                tu negocio?
              </span>
            </h2>
            <p className="mt-4 text-neutral-300 max-w-xl mx-auto">
              Agenda una llamada gratuita y descubre en 15 minutos cómo la IA puede transformar tus procesos más críticos.
            </p>

            <div className="mt-10 flex justify-center">
              {/* `flat`: sin perspective(). El EtheralShadow de esta tarjeta
                  aplica un filtro SVG animado, y el botón promovido a capa 3D
                  dejaba de pintarse. Conserva el resto del hover. */}
              <TiltCtaButton
                flat
                className="bg-linear-to-r from-brand-emerald to-brand-green hover:from-brand-teal hover:to-brand-spring text-background gap-2 h-11 px-8 font-semibold text-base"
                asChild
              >
                <Link href={rutaReservar}>
                  Agendar llamada
                  <ArrowRightIcon className="size-4" />
                </Link>
              </TiltCtaButton>
            </div>

            <p className="mt-4 text-xs text-neutral-400">
              Te atenderemos sin compromiso alguno. De emprendedores a emprendedores.
            </p>

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
