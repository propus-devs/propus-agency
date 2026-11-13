import type { Metadata } from "next"
import NotFoundPage from "@/components/pages/NotFoundPage"
import { viewportClaro } from "@/lib/tema-claro"

export const viewport = viewportClaro

export const metadata: Metadata = {
  title: "Página no encontrada",
  description: "La página que buscas no existe o ha cambiado de sitio.",
  robots: {
    index: false,
    follow: false,
  },
}

export default function NotFound() {
  return <NotFoundPage lang="es" />
}
