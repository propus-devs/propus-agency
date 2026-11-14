import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import { Component as GradientShader } from "@/components/ui/stripe-like-gradient-shader"
import WhaHero from "@/components/sections/autoclinic/WhaHero"
import WhaProblem from "@/components/sections/autoclinic/WhaProblem"
import WhaFeatures from "@/components/sections/autoclinic/WhaFeatures"
import WhaGallery from "@/components/sections/autoclinic/WhaGallery"
import WhaUseCases from "@/components/sections/autoclinic/WhaUseCases"
import WhaBandeja from "@/components/sections/autoclinic/WhaBandeja"
import WhaPricing from "@/components/sections/autoclinic/WhaPricing"
import WhaCTA from "@/components/sections/autoclinic/WhaCTA"
import ServiceSchema from "@/components/seo/ServiceSchema"
import type { Lang } from "@/lib/i18n/idiomas"

const SCHEMA: Record<Lang, { name: string; description: string; serviceType: string }> = {
  es: {
    name: "Software de gestión para clínicas de podología con agente de WhatsApp",
    description:
      "Programa de gestión para clínicas de podología: historia clínica de podología, agenda, facturación y un agente de inteligencia artificial en WhatsApp que agenda, cancela y recuerda citas 24/7, con bandeja de chats dentro del propio programa.",
    serviceType: "Software de gestión para clínicas de podología",
  },
  en: {
    name: "Podiatry clinic management software with a WhatsApp agent",
    description:
      "Management software for podiatry clinics: podiatry clinical records, scheduling, invoicing and an artificial intelligence agent on WhatsApp that books, cancels and reminds appointments 24/7, with a chat inbox inside the software itself.",
    serviceType: "Podiatry clinic management software",
  },
}

/** AutoClinic, compartida por los dos idiomas. */
export default function AutoclinicPage({ lang }: { lang: Lang }) {
  return (
    <div className="relative">
      <ServiceSchema {...SCHEMA[lang]} lang={lang} />
      {/* Fondo animado (stripe shader) para toda la sección AutoClinic */}
      <div className="pointer-events-none fixed inset-0 -z-10" aria-hidden>
        <GradientShader />
        {/* Velo oscuro para mantener legibilidad del texto y las cards */}
        <div className="absolute inset-0 bg-wha-bg/65" />
      </div>

      <Navbar lang={lang} />
      <main className="relative">
        <WhaHero lang={lang} />
        <WhaProblem lang={lang} />
        <WhaFeatures lang={lang} />
        <WhaGallery lang={lang} />
        <WhaUseCases lang={lang} />
        {/* La bandeja y el nicho van antes del precio: justifican la cuota. */}
        <WhaBandeja lang={lang} />
        <WhaPricing lang={lang} />
        {/* WhaRoiCalculator (la calculadora de rentabilidad) sigue fuera de la
            página: ya lee los precios definitivos de lib/autoclinic-pricing.ts,
            pero sus textos son sólo españoles y esta página es bilingüe. Para
            volver a ponerla hay que darle una prop `lang`. */}
        <WhaCTA lang={lang} />
      </main>
      <Footer lang={lang} />
    </div>
  )
}
