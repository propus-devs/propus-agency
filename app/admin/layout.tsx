import "../globals.css"
import type { Metadata } from "next"
import { RootShell, metadataRaiz, viewportRaiz } from "@/lib/root-shell"

// El admin no es contenido del sitio: fuera de buscadores y sin caché. Las
// cabeceras X-Robots-Tag de next.config.ts lo refuerzan (y robots.ts lo desaconseja).
// Es un layout raíz propio (el admin va solo en español y sin pareja en inglés):
// repite la plantilla de títulos para que sus páginas sigan llamándose
// "Calendario — Propus", y el título propio de esta capa lleva la marca escrita
// porque la plantilla solo se aplica a las páginas hijas.
export const metadata: Metadata = {
  ...metadataRaiz("es"),
  title: { default: "Administración — Propus", template: "%s — Propus" },
  robots: { index: false, follow: false, nocache: true },
  alternates: { canonical: "/admin" },
}
export const viewport = viewportRaiz

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <RootShell lang="es">
      <div className="relative z-10 flex flex-1 flex-col">{children}</div>
    </RootShell>
  )
}
