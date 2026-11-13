import type { Metadata } from "next"
import AboutPage from "@/components/pages/AboutPage"
import { viewportClaro } from "@/lib/tema-claro"
import { alternas, ruta } from "@/lib/i18n/idiomas"

export const viewport = viewportClaro

const DESCRIPCION =
  "Somos Propus, dos cofundadores que desarrollamos software de gestión para clínicas, webs con reservas y automatizaciones para negocios de toda España."

export const metadata: Metadata = {
  title: "Sobre nosotros · Software de gestión y webs con reservas",
  description: DESCRIPCION,
  keywords: [
    "software de gestión para clínicas",
    "webs con reservas",
    "automatización",
    "integraciones inteligentes",
    "Propus",
  ],
  alternates: {
    canonical: ruta("sobreNosotros", "es"),
    languages: alternas("sobreNosotros"),
  },
  openGraph: {
    title: "Sobre nosotros · Software de gestión y webs con reservas — Propus",
    description: DESCRIPCION,
    type: "website",
    locale: "es_ES",
  },
}

export default function SobreNosotrosPage() {
  return <AboutPage lang="es" />
}
