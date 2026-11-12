import { redirect } from "next/navigation"
import { iniciarSesion } from "@/app/admin/actions"
import Aviso from "@/components/admin/Aviso"
import { claseEtiqueta } from "@/components/admin/campos"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { adminConfigurado, haySesion } from "@/lib/admin/sesion"

export default async function PaginaLogin({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; espera?: string }>
}) {
  if (await haySesion()) redirect("/admin")
  const { error, espera } = await searchParams
  const configurado = adminConfigurado()

  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-sm flex-1 flex-col justify-center px-4 py-12">
      <Card className="vidrio border">
        <CardHeader>
          <CardTitle className="font-heading text-xl">Administración</CardTitle>
          <CardDescription>Acceso solo para el equipo de Propus.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Aviso error={configurado ? error : "no-configurado"} espera={espera} />
          {configurado ? (
            <form action={iniciarSesion} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="password" className={claseEtiqueta}>
                  Contraseña
                </label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  maxLength={200}
                  required
                  autoFocus
                />
              </div>
              <Button type="submit" size="lg" className="w-full">
                Entrar
              </Button>
            </form>
          ) : null}
        </CardContent>
      </Card>
    </main>
  )
}
