import type { Metadata } from "next"
import AboutPage from "@/components/pages/AboutPage"
import { viewportClaro } from "@/lib/tema-claro"
import { alternas, ruta } from "@/lib/i18n/idiomas"

export const viewport = viewportClaro

const DESCRIPTION =
  "We are Propus, two co-founders who develop management software for clinics, websites with booking and automations for businesses across Spain."

export const metadata: Metadata = {
  title: "About us · Management software and websites with booking",
  description: DESCRIPTION,
  keywords: [
    "clinic management software",
    "websites with booking",
    "automation",
    "smart integrations",
    "Propus",
  ],
  alternates: {
    canonical: ruta("sobreNosotros", "en"),
    languages: alternas("sobreNosotros"),
  },
  openGraph: {
    title: "About us · Management software and websites with booking — Propus",
    description: DESCRIPTION,
    type: "website",
    locale: "en_US",
  },
}

export default function AboutUsPage() {
  return <AboutPage lang="en" />
}
