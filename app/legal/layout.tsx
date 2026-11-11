import Link from "next/link"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import FondoMalla from "@/components/ui/fondo-malla"
import { viewportClaro } from "@/lib/tema-claro"

export const viewport = viewportClaro

export default function LegalLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <FondoMalla />
      <Navbar />
      <main className="relative z-10">
        <div className="mx-auto max-w-3xl px-4 py-20 md:py-28">
          <Link
            href="/"
            className="mb-8 inline-block text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            ← Volver al inicio
          </Link>
          {children}
        </div>
      </main>
      <Footer />
    </>
  )
}
