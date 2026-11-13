import type { Metadata } from "next"
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

export const metadata: Metadata = {
  title: "FacturIA — Gestión inteligente de facturas con IA",
  description:
    "FacturIA automatiza el ciclo completo de tus facturas: captura con OCR e IA, revisión y aprobación automática, dashboard de métricas en tiempo real y exportación de informes listos para tu gestoría. Multiempresa y seguro.",
  alternates: {
    canonical: "/servicios/facturia",
  },
  openGraph: {
    title: "FacturIA — Gestión inteligente de facturas con IA",
    description:
      "De la foto de tu factura al informe contable, sin teclear ni una cifra. Captura OCR + IA, aprobación automática y exportaciones profesionales.",
    type: "website",
    locale: "es_ES",
  },
}

export default function FacturiaPage() {
  return (
    <>
      <ServiceSchema
        name="FacturIA — Gestión inteligente de facturas con IA"
        description="Automatización del ciclo completo de facturas: captura con OCR e IA, revisión y aprobación automática, dashboard de métricas en tiempo real y exportación de informes."
        serviceType="Automatización de procesos administrativos con IA"
      />
      <ProceduralGroundBackground />
      <Navbar />
      <main>
        <FacturiaHero />
        <FacturiaProblem />
        <FacturiaFeatures />
        <FacturiaGallery />
        <FacturiaFlow />
        <FacturiaIntegrations />
        <FacturiaTrust />
        <FacturiaUseCases />
        <FacturiaCTA />
      </main>
      <Footer />
    </>
  )
}
