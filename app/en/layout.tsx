import "../globals.css"
import { RootShell, metadataRaiz, viewportRaiz } from "@/lib/root-shell"

// Layout raíz del inglés: todo lo que cuelga de /en. Comparte RootShell con el
// español; solo cambian <html lang> y los metadatos.
export const metadata = metadataRaiz("en")
export const viewport = viewportRaiz

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <RootShell lang="en">{children}</RootShell>
}
