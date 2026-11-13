import type { Metadata } from "next"
import AutoclinicPage from "@/components/pages/AutoclinicPage"
import { alternas, ruta } from "@/lib/i18n/idiomas"

export const metadata: Metadata = {
  title: "WhatsApp receptionist agent | AI appointment management",
  description:
    "An AI agent on WhatsApp that books, cancels and sends reminders — 24/7, in your patient's language. For podiatry and dental clinics, vets, beauty clinics and more.",
  alternates: {
    canonical: ruta("autoclinic", "en"),
    languages: alternas("autoclinic"),
  },
  openGraph: {
    title: "WhatsApp receptionist agent — Propus",
    description:
      "Your practice never loses an appointment. Scheduling, reminders and cancellations over WhatsApp.",
    type: "website",
    locale: "en_US",
  },
}

export default function AutoclinicEnPage() {
  return <AutoclinicPage lang="en" />
}
