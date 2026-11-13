import type { Metadata } from "next"
import { viewportClaro } from "@/lib/tema-claro"
import { alternas, ruta } from "@/lib/i18n/idiomas"
import HomePage from "@/components/pages/HomePage"

// La portada es clara: el color de la barra del navegador en móvil la sigue.
export const viewport = viewportClaro

// El título y la descripción vienen del layout en inglés; aquí solo se declara
// la pareja en español (hreflang) y el canonical propio.
export const metadata: Metadata = {
  alternates: { canonical: ruta("inicio", "en"), languages: alternas("inicio") },
}

export default function Home() {
  return <HomePage lang="en" />
}
