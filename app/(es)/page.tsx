import type { Metadata } from "next"
import { viewportClaro } from "@/lib/tema-claro"
import { alternas, ruta } from "@/lib/i18n/idiomas"
import HomePage from "@/components/pages/HomePage"

// La portada es clara: el color de la barra del navegador en móvil la sigue.
export const viewport = viewportClaro

// El título y la descripción vienen del layout; aquí solo se añade la pareja en
// inglés (hreflang) y se mantiene el canonical.
export const metadata: Metadata = {
  alternates: { canonical: ruta("inicio", "es"), languages: alternas("inicio") },
}

export default function Home() {
  return <HomePage lang="es" />
}
