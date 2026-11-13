import type { Metadata } from "next"
import ReservarPage from "@/components/pages/ReservarPage"
import { alternas, ruta } from "@/lib/i18n/idiomas"
import { viewportClaro } from "@/lib/tema-claro"

// Los huecos se leen de la agenda en cada visita: lo que se cambia en el admin se ve al instante.
export const dynamic = "force-dynamic"

export const viewport = viewportClaro

const DESCRIPTION =
  "Pick a day and time and book a free 15-minute call with Propus to talk about your management software, your website with booking or your automation."

export const metadata: Metadata = {
  title: "Book a 15-minute call",
  description: DESCRIPTION,
  alternates: { canonical: ruta("reservar", "en"), languages: alternas("reservar") },
  openGraph: {
    title: "Book a 15-minute call — Propus",
    description: DESCRIPTION,
    type: "website",
    locale: "en_US",
  },
}

export default function BookACallPage() {
  return <ReservarPage lang="en" />
}
