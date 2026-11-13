import type { Metadata } from "next"
import FacturiaPage from "@/components/pages/FacturiaPage"
import { alternas, ruta } from "@/lib/i18n/idiomas"

export const metadata: Metadata = {
  title: "FacturIA — Gestión inteligente de facturas con IA",
  description:
    "FacturIA automatiza el ciclo completo de tus facturas: captura con OCR e IA, revisión y aprobación automática, dashboard de métricas en tiempo real y exportación de informes listos para tu gestoría. Multiempresa y seguro.",
  alternates: {
    canonical: ruta("facturia", "es"),
    languages: alternas("facturia"),
  },
  openGraph: {
    title: "FacturIA — Gestión inteligente de facturas con IA",
    description:
      "De la foto de tu factura al informe contable, sin teclear ni una cifra. Captura OCR + IA, aprobación automática y exportaciones profesionales.",
    type: "website",
    locale: "es_ES",
  },
}

export default function FacturiaEsPage() {
  return <FacturiaPage lang="es" />
}
