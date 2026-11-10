import type { Metadata } from "next"
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

export const metadata: Metadata = {
  title: "Agente recepcionista WhatsApp | Gestión de citas con IA",
  description:
    "Un agente de IA en WhatsApp que agenda, cancela y envía recordatorios — 24/7, en el idioma de tu paciente. Para clínicas de podología y dentales, veterinarias, estética y más.",
  alternates: {
    canonical: "/servicios/autoclinic",
  },
  openGraph: {
    title: "Agente recepcionista WhatsApp — Propus",
    description:
      "Tu consulta nunca pierde una cita. Agenda, recordatorios y cancelaciones por WhatsApp.",
    type: "website",
    locale: "es_ES",
  },
}

export default function AgenteWhatsappPage() {
  return (
    <div className="relative">
      <ServiceSchema
        name="Agente recepcionista de WhatsApp con IA"
        description="Agente de inteligencia artificial en WhatsApp que agenda, cancela y recuerda citas, 24/7, para clínicas de podología, dentales, de estética y otros negocios de salud."
        serviceType="Automatización de atención al cliente con IA"
      />
      {/* Fondo animado (stripe shader) para toda la sección AutoClinic */}
      <div className="pointer-events-none fixed inset-0 -z-10" aria-hidden>
        <GradientShader />
        {/* Velo oscuro para mantener legibilidad del texto y las cards */}
        <div className="absolute inset-0 bg-wha-bg/65" />
      </div>

      <Navbar />
      <main className="relative">
        <WhaHero />
        <WhaProblem />
        <WhaFeatures />
        <WhaGallery />
        <WhaUseCases />
        {/* WhaRoiCalculator (la calculadora de rentabilidad) está fuera de la
            página hasta que estén fijados los precios finales de los planes. El
            componente y lib/autoclinic-pricing.ts se conservan para volver a
            ponerla. */}
        <WhaCTA />
      </main>
      <Footer />
    </div>
  )
}
