import type { Metadata } from "next"
import FacturiaPage from "@/components/pages/FacturiaPage"
import { alternas, ruta } from "@/lib/i18n/idiomas"

export const metadata: Metadata = {
  title: "FacturIA — Smart invoice management with AI",
  description:
    "FacturIA automates the whole cycle of your invoices: OCR and AI capture, automatic review and approval, a real-time metrics dashboard and export of reports ready for your accountant. Multi-company and secure.",
  alternates: {
    canonical: ruta("facturia", "en"),
    languages: alternas("facturia"),
  },
  openGraph: {
    title: "FacturIA — Smart invoice management with AI",
    description:
      "From a photo of your invoice to the accounting report, without typing a single figure. OCR + AI capture, automatic approval and professional exports.",
    type: "website",
    locale: "en_US",
  },
}

export default function FacturiaEnPage() {
  return <FacturiaPage lang="en" />
}
