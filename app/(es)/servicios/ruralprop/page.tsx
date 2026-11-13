import type { Metadata } from "next"
import RuralPropPage from "@/components/pages/RuralPropPage"
import { alternas, ruta } from "@/lib/i18n/idiomas"

export const metadata: Metadata = {
  title: "RuralProp: web con reservas directas para alojamientos rurales",
  description:
    "Web con reservas directas para casas rurales y cabañas: calendario centralizado, pago online, registro de viajeros SES Hospedajes y SEO. Alta desde 750 € + cuota mensual.",
  alternates: {
    canonical: ruta("ruralprop", "es"),
    languages: alternas("ruralprop"),
  },
  openGraph: {
    title: "RuralProp: web con reservas directas para alojamientos rurales — Propus",
    description:
      "Calendario centralizado, reservas con pago online, registro de viajeros y SEO para casas rurales, cabañas y apartamentos turísticos.",
    type: "website",
    locale: "es_ES",
  },
}

export default function RuralPropEsPage() {
  return <RuralPropPage lang="es" />
}
