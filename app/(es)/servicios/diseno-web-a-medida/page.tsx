import type { Metadata } from "next"
import DisenoWebPage from "@/components/pages/DisenoWebPage"
import { viewportClaro } from "@/lib/tema-claro"
import { alternas, ruta } from "@/lib/i18n/idiomas"

export const viewport = viewportClaro

export const metadata: Metadata = {
  title: "Diseño y desarrollo web a medida",
  description:
    "Diseño web a medida de Propus: interfaces modernas, rápidas y orientadas a conversión para negocios de toda España. Mira los sitios que hemos creado.",
  alternates: {
    canonical: ruta("disenoWeb", "es"),
    languages: alternas("disenoWeb"),
  },
  openGraph: {
    title: "Diseño y desarrollo web a medida — Propus",
    description:
      "Webs a medida para negocios de toda España: rápidas, modernas y orientadas a conversión.",
    type: "website",
    locale: "es_ES",
  },
}

export default function WebDesignPage() {
  return <DisenoWebPage lang="es" />
}
