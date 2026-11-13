import type { Metadata } from "next"
import ReservarPage from "@/components/pages/ReservarPage"
import { alternas, ruta } from "@/lib/i18n/idiomas"
import { viewportClaro } from "@/lib/tema-claro"

// Los huecos se leen de la agenda en cada visita: lo que se cambia en el admin se ve al instante.
export const dynamic = "force-dynamic"

export const viewport = viewportClaro

const DESCRIPCION =
  "Elige día y hora y reserva una llamada gratuita de 15 minutos con Propus para hablar de tu software de gestión, tu web con reservas o tu automatización."

export const metadata: Metadata = {
  title: "Reserva una llamada de 15 minutos",
  description: DESCRIPCION,
  alternates: { canonical: ruta("reservar", "es"), languages: alternas("reservar") },
  openGraph: {
    title: "Reserva una llamada de 15 minutos — Propus",
    description: DESCRIPCION,
    type: "website",
    locale: "es_ES",
  },
}

export default function ReservarEsPage() {
  return <ReservarPage lang="es" />
}
