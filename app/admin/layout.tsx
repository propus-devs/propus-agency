import type { Metadata } from "next"

// El admin no es contenido del sitio: fuera de buscadores y sin caché. Las
// cabeceras X-Robots-Tag de next.config.ts lo refuerzan (y robots.ts lo desaconseja).
export const metadata: Metadata = {
  title: "Administración",
  robots: { index: false, follow: false, nocache: true },
  alternates: { canonical: "/admin" },
}

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <div className="relative z-10 flex flex-1 flex-col">{children}</div>
}
