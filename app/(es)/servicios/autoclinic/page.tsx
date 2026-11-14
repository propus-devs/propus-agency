import type { Metadata } from "next"
import AutoclinicPage from "@/components/pages/AutoclinicPage"
import { alternas, ruta } from "@/lib/i18n/idiomas"

export const metadata: Metadata = {
  title: "Software para clínicas de podología con agente de WhatsApp | AutoClinic",
  description:
    "Gestión, historia clínica de podología y un agente de IA en WhatsApp que agenda, cancela y recuerda citas 24/7, con la bandeja de chats dentro del programa. Desde 99 € al mes. Hecho sólo para podólogos.",
  alternates: {
    canonical: ruta("autoclinic", "es"),
    languages: alternas("autoclinic"),
  },
  openGraph: {
    title: "AutoClinic — Software de podología con agente de WhatsApp",
    description:
      "Tu consulta de podología nunca pierde una cita. Gestión, historia clínica y WhatsApp en el mismo programa.",
    type: "website",
    locale: "es_ES",
  },
}

export default function AgenteWhatsappPage() {
  return <AutoclinicPage lang="es" />
}
