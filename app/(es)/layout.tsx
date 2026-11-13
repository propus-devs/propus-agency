import "../globals.css"
import { RootShell, metadataRaiz, viewportRaiz } from "@/lib/root-shell"

// Layout raíz del español: páginas públicas en la raíz (/, /servicios/…, /blog…).
// El inglés tiene el suyo en app/en/layout.tsx; los dos comparten RootShell.
export const metadata = metadataRaiz("es")
export const viewport = viewportRaiz

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <RootShell lang="es">{children}</RootShell>
}
