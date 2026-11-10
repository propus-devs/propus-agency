import type { Metadata } from "next"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import ServiceSchema from "@/components/seo/ServiceSchema"
import RuralPropBackground from "@/components/sections/ruralprop/RuralPropBackground"
import RuralPropHero from "@/components/sections/ruralprop/RuralPropHero"
import RuralPropFeatures from "@/components/sections/ruralprop/RuralPropFeatures"
import RuralPropFlow from "@/components/sections/ruralprop/RuralPropFlow"
import RuralPropClients from "@/components/sections/ruralprop/RuralPropClients"
import RuralPropPricing from "@/components/sections/ruralprop/RuralPropPricing"
import RuralPropFAQ from "@/components/sections/ruralprop/RuralPropFAQ"
import RuralPropCTA from "@/components/sections/ruralprop/RuralPropCTA"

export const metadata: Metadata = {
  title: "RuralProp: web con reservas directas para alojamientos rurales",
  description:
    "Web con reservas directas para casas rurales y cabañas: calendario centralizado, pago online, registro de viajeros SES Hospedajes y SEO. Alta desde 750 € + cuota mensual.",
  alternates: {
    canonical: "/servicios/ruralprop",
  },
  openGraph: {
    title: "RuralProp: web con reservas directas para alojamientos rurales — Propus",
    description:
      "Calendario centralizado, reservas con pago online, registro de viajeros y SEO para casas rurales, cabañas y apartamentos turísticos.",
    type: "website",
    locale: "es_ES",
  },
}

export default function RuralPropPage() {
  return (
    <div className="relative">
      <ServiceSchema
        name="RuralProp: web con reservas directas para alojamientos rurales"
        description="Web con reservas directas para casas rurales, cabañas y apartamentos turísticos: calendario centralizado sincronizado por iCal, reservas con avisos automáticos, pasarela de pago, registro de viajeros para SES Hospedajes, panel de gestión y SEO."
        serviceType="Web de reservas para alojamientos rurales"
      />
      {/* Fondo propio de RuralProp (paisaje rural), sobre el aurora del layout */}
      <RuralPropBackground />
      <Navbar />
      <main className="relative z-10 text-rural-fg">
        <RuralPropHero />
        <RuralPropFeatures />
        <RuralPropFlow />
        <RuralPropClients />
        <RuralPropPricing />
        <RuralPropFAQ />
        <RuralPropCTA />
      </main>
      <Footer />
    </div>
  )
}
