import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import { Component as GradientShader } from "@/components/ui/stripe-like-gradient-shader"
import WhaHero from "@/components/sections/autoclinic/WhaHero"
import WhaProblem from "@/components/sections/autoclinic/WhaProblem"
import WhaFeatures from "@/components/sections/autoclinic/WhaFeatures"
import WhaGallery from "@/components/sections/autoclinic/WhaGallery"
import WhaUseCases from "@/components/sections/autoclinic/WhaUseCases"
import WhaCTA from "@/components/sections/autoclinic/WhaCTA"
import ServiceSchema from "@/components/seo/ServiceSchema"
import type { Lang } from "@/lib/i18n/idiomas"

const SCHEMA: Record<Lang, { name: string; description: string; serviceType: string }> = {
  es: {
    name: "Agente recepcionista de WhatsApp con IA",
    description:
      "Agente de inteligencia artificial en WhatsApp que agenda, cancela y recuerda citas, 24/7, para clínicas de podología, dentales, de estética y otros negocios de salud.",
    serviceType: "Automatización de atención al cliente con IA",
  },
  en: {
    name: "AI WhatsApp receptionist agent",
    description:
      "Artificial intelligence agent on WhatsApp that books, cancels and reminds appointments, 24/7, for podiatry, dental and beauty clinics and other healthcare businesses.",
    serviceType: "AI customer service automation",
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
        {/* WhaRoiCalculator (la calculadora de rentabilidad) está fuera de la
            página hasta que estén fijados los precios finales de los planes. El
            componente y lib/autoclinic-pricing.ts se conservan para volver a
            ponerla. */}
        <WhaCTA lang={lang} />
      </main>
      <Footer lang={lang} />
    </div>
  )
}
