import type { Metadata } from "next"
import RuralPropPage from "@/components/pages/RuralPropPage"
import { alternas, ruta } from "@/lib/i18n/idiomas"

export const metadata: Metadata = {
  title: "RuralProp: website with direct bookings for rural accommodations",
  description:
    "A website with direct bookings for country houses and cabins: centralized calendar, online payment, SES Hospedajes guest registration and SEO. Setup from €750 + monthly fee.",
  alternates: {
    canonical: ruta("ruralprop", "en"),
    languages: alternas("ruralprop"),
  },
  openGraph: {
    title: "RuralProp: website with direct bookings for rural accommodations — Propus",
    description:
      "Centralized calendar, bookings with online payment, guest registration and SEO for country houses, cabins and holiday apartments.",
    type: "website",
    locale: "en_US",
  },
}

export default function RuralPropEnPage() {
  return <RuralPropPage lang="en" />
}
