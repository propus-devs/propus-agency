import FondoMalla from "@/components/ui/fondo-malla"
import { exigirAdmin } from "@/lib/admin/sesion"
import { viewportClaro } from "@/lib/tema-claro"

// El panel usa el tema claro de la web (malla luminosa); el login conserva el fondo oscuro.
export const viewport = viewportClaro

/**
 * Primera barrera del panel. No es la única: cada página y cada acción vuelve a
 * comprobar la sesión, porque este layout no se ejecuta de nuevo al navegar
 * entre páginas del admin.
 */
export default async function PanelLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  await exigirAdmin()
  return (
    <>
      <FondoMalla />
      {children}
    </>
  )
}
