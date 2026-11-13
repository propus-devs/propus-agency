import type { Metadata } from "next"
import DisenoWebPage from "@/components/pages/DisenoWebPage"
import { viewportClaro } from "@/lib/tema-claro"
import { alternas, ruta } from "@/lib/i18n/idiomas"

export const viewport = viewportClaro

export const metadata: Metadata = {
  title: "Custom web design and development",
  description:
    "Propus custom web design: modern, fast, conversion-focused interfaces for businesses across Spain. See the sites we've built.",
  alternates: {
    canonical: ruta("disenoWeb", "en"),
    languages: alternas("disenoWeb"),
  },
  openGraph: {
    title: "Custom web design and development — Propus",
    description:
      "Custom websites for businesses across Spain: fast, modern and conversion-focused.",
    type: "website",
    locale: "en_US",
  },
}

export default function CustomWebDesignPage() {
  return <DisenoWebPage lang="en" />
}
