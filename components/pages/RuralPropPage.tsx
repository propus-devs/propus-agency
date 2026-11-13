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
import type { Lang } from "@/lib/i18n/idiomas"

const SCHEMA: Record<Lang, { name: string; description: string; serviceType: string }> = {
  es: {
    name: "RuralProp: web con reservas directas para alojamientos rurales",
    description:
      "Web con reservas directas para casas rurales, cabañas y apartamentos turísticos: calendario centralizado sincronizado por iCal, reservas con avisos automáticos, pasarela de pago, registro de viajeros para SES Hospedajes, panel de gestión y SEO.",
    serviceType: "Web de reservas para alojamientos rurales",
  },
  en: {
    name: "RuralProp: website with direct bookings for rural accommodations",
    description:
      "Website with direct bookings for country houses, cabins and holiday apartments: centralized calendar synced via iCal, bookings with automatic notifications, payment gateway, guest registration for SES Hospedajes, management panel and SEO.",
    serviceType: "Booking website for rural accommodations",
  },
}

/** RuralProp, compartida por los dos idiomas. */
export default function RuralPropPage({ lang }: { lang: Lang }) {
  return (
    <div className="relative">
      <ServiceSchema {...SCHEMA[lang]} lang={lang} />
      {/* Fondo propio de RuralProp (paisaje rural), sobre el aurora del layout */}
      <RuralPropBackground />
      <Navbar lang={lang} />
      <main className="relative z-10 text-rural-fg">
        <RuralPropHero lang={lang} />
        <RuralPropFeatures lang={lang} />
        <RuralPropFlow lang={lang} />
        <RuralPropClients lang={lang} />
        <RuralPropPricing lang={lang} />
        <RuralPropFAQ lang={lang} />
        <RuralPropCTA lang={lang} />
      </main>
      <Footer lang={lang} />
    </div>
  )
}
