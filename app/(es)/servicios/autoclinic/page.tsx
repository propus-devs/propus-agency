import type { Metadata } from "next"
import AutoclinicPage from "@/components/pages/AutoclinicPage"
import { alternas, ruta } from "@/lib/i18n/idiomas"

export const metadata: Metadata = {
  title: "Agente recepcionista WhatsApp | Gestión de citas con IA",
  description:
    "Un agente de IA en WhatsApp que agenda, cancela y envía recordatorios — 24/7, en el idioma de tu paciente. Para clínicas de podología y dentales, veterinarias, estética y más.",
  alternates: {
    canonical: ruta("autoclinic", "es"),
    languages: alternas("autoclinic"),
  },
  openGraph: {
    title: "Agente recepcionista WhatsApp — Propus",
    description:
      "Tu consulta nunca pierde una cita. Agenda, recordatorios y cancelaciones por WhatsApp.",
    type: "website",
    locale: "es_ES",
  },
}

export default function AgenteWhatsappPage() {
  return <AutoclinicPage lang="es" />
}
