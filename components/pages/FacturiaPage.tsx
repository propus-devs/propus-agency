import ProceduralGroundBackground from "@/components/ui/procedural-ground-background"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import FacturiaHero from "@/components/sections/facturia/FacturiaHero"
import FacturiaProblem from "@/components/sections/facturia/FacturiaProblem"
import FacturiaFeatures from "@/components/sections/facturia/FacturiaFeatures"
import FacturiaGallery from "@/components/sections/facturia/FacturiaGallery"
import FacturiaFlow from "@/components/sections/facturia/FacturiaFlow"
import FacturiaTrust from "@/components/sections/facturia/FacturiaTrust"
import FacturiaIntegrations from "@/components/sections/facturia/FacturiaIntegrations"
import FacturiaUseCases from "@/components/sections/facturia/FacturiaUseCases"
import FacturiaCTA from "@/components/sections/facturia/FacturiaCTA"
import ServiceSchema from "@/components/seo/ServiceSchema"
import type { Lang } from "@/lib/i18n/idiomas"

const SCHEMA: Record<Lang, { name: string; description: string; serviceType: string }> = {
  es: {
    name: "FacturIA — Gestión inteligente de facturas con IA",
    description:
      "Automatización del ciclo completo de facturas: captura con OCR e IA, revisión y aprobación automática, dashboard de métricas en tiempo real y exportación de informes.",
    serviceType: "Automatización de procesos administrativos con IA",
  },
  en: {
    name: "FacturIA — Smart invoice management with AI",
    description:
      "Automation of the whole invoice cycle: OCR and AI capture, automatic review and approval, a real-time metrics dashboard and report export.",
    serviceType: "AI-powered administrative process automation",
  },
}

/** FacturIA, compartida por los dos idiomas. */
export default function FacturiaPage({ lang }: { lang: Lang }) {
  return (
    <>
      <ServiceSchema {...SCHEMA[lang]} lang={lang} />
      <ProceduralGroundBackground />
      <Navbar lang={lang} />
      <main>
        <FacturiaHero lang={lang} />
        <FacturiaProblem lang={lang} />
        <FacturiaFeatures lang={lang} />
        <FacturiaGallery lang={lang} />
        <FacturiaFlow lang={lang} />
        <FacturiaIntegrations lang={lang} />
        <FacturiaTrust lang={lang} />
        <FacturiaUseCases lang={lang} />
        <FacturiaCTA lang={lang} />
      </main>
      <Footer lang={lang} />
    </>
  )
}
