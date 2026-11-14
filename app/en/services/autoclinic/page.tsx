import type { Metadata } from "next"
import AutoclinicPage from "@/components/pages/AutoclinicPage"
import { alternas, ruta } from "@/lib/i18n/idiomas"

export const metadata: Metadata = {
  title: "Podiatry clinic software with a WhatsApp agent | AutoClinic",
  description:
    "Management, podiatry clinical records and an AI agent on WhatsApp that books, cancels and reminds appointments 24/7, with the chat inbox inside the software. From €99 a month. Built for podiatrists only.",
  alternates: {
    canonical: ruta("autoclinic", "en"),
    languages: alternas("autoclinic"),
  },
  openGraph: {
    title: "AutoClinic — Podiatry software with a WhatsApp agent",
    description:
      "Your podiatry practice never loses an appointment. Management, clinical records and WhatsApp in one program.",
    type: "website",
    locale: "en_US",
  },
}

export default function AutoclinicEnPage() {
  return <AutoclinicPage lang="en" />
}
