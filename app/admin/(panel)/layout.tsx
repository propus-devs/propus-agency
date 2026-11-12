import { exigirAdmin } from "@/lib/admin/sesion"

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
  return <>{children}</>
}
