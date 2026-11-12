import Link from "next/link"
import { LogOut } from "lucide-react"
import { cerrarSesionAccion } from "@/app/admin/actions"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const ENLACES = [
  { id: "reservas", href: "/admin", texto: "Reservas" },
  { id: "calendario", href: "/admin/calendario", texto: "Calendario" },
  { id: "horarios", href: "/admin/horarios", texto: "Horario y ajustes" },
  { id: "bloqueos", href: "/admin/bloqueos", texto: "Días bloqueados" },
] as const

export type SeccionAdmin = (typeof ENLACES)[number]["id"]

/** Marco común de las pantallas del admin: cabecera con navegación y título. */
export default function Pagina({
  actual,
  titulo,
  descripcion,
  children,
}: {
  actual: SeccionAdmin
  titulo: string
  descripcion?: string
  children: React.ReactNode
}) {
  return (
    <>
      <header className="border-b border-border/60 bg-background/60 backdrop-blur">
        <div className="mx-auto flex w-full max-w-5xl flex-wrap items-center gap-x-6 gap-y-2 px-4 py-3">
          <Link href="/admin" className="font-heading text-lg font-semibold tracking-tight">
            Propus <span className="font-normal text-muted-foreground">· Admin</span>
          </Link>
          {/* En móvil la navegación pasa a una fila propia que se desliza de lado. */}
          <nav
            aria-label="Secciones del admin"
            className="order-last flex w-full gap-1 overflow-x-auto sm:order-none sm:w-auto sm:flex-1"
          >
            {ENLACES.map((enlace) => (
              <Link
                key={enlace.id}
                href={enlace.href}
                aria-current={enlace.id === actual ? "page" : undefined}
                className={cn(
                  "shrink-0 rounded-md px-3 py-1.5 text-sm whitespace-nowrap transition-colors",
                  enlace.id === actual
                    ? "bg-muted text-foreground"
                    : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                )}
              >
                {enlace.texto}
              </Link>
            ))}
          </nav>
          <form action={cerrarSesionAccion} className="ml-auto sm:ml-0">
            <Button type="submit" variant="ghost" size="sm">
              <LogOut aria-hidden />
              Cerrar sesión
            </Button>
          </form>
        </div>
      </header>

      <main className="mx-auto w-full max-w-5xl flex-1 space-y-6 px-4 py-8">
        <div className="space-y-1">
          <h1 className="font-heading text-2xl font-semibold tracking-tight md:text-3xl">{titulo}</h1>
          {descripcion ? <p className="text-sm text-muted-foreground">{descripcion}</p> : null}
        </div>
        {children}
      </main>
    </>
  )
}
