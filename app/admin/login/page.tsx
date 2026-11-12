import { redirect } from "next/navigation"
import { ArrowRight, Lock, ShieldCheck } from "lucide-react"
import { iniciarSesion } from "@/app/admin/actions"
import Aviso from "@/components/admin/Aviso"
import BotonEnviar from "@/components/admin/BotonEnviar"
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
    <main className="relative flex min-h-dvh w-full flex-1 items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        {/* Marco de luz: un degradado fino (menta → cielo) alrededor de la tarjeta de cristal. */}
        <div className="rounded-3xl bg-linear-to-b from-brand-emerald/60 via-white/10 to-brand-sky/50 p-px shadow-[0_0_90px_-25px] shadow-brand-emerald/40">
          <div className="rounded-[calc(1.5rem-1px)] bg-card/85 p-8 backdrop-blur-xl sm:p-12">
            <div className="space-y-9">
              <header className="space-y-6">
                <p className="inline-flex items-center gap-2.5 font-mono text-[0.7rem] tracking-[0.22em] text-brand-emerald uppercase">
                  <span className="relative flex size-2">
                    <span className="absolute inline-flex size-full animate-ping rounded-full bg-brand-emerald/60 motion-reduce:animate-none" />
                    <span className="relative inline-flex size-2 rounded-full bg-brand-emerald" />
                  </span>
                  Acceso restringido
                </p>
                <div className="space-y-3">
                  <h1 className="font-heading text-4xl leading-none font-semibold tracking-tight">
                    Administración
                  </h1>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    Acceso sólo para el equipo de Propus.
                  </p>
                </div>
              </header>

              <Aviso error={configurado ? error : "no-configurado"} espera={espera} />

              {configurado ? (
                <form action={iniciarSesion} className="space-y-6">
                  <div className="space-y-3">
                    <label
                      htmlFor="password"
                      className="block font-mono text-xs tracking-widest text-muted-foreground uppercase"
                    >
                      Contraseña
                    </label>
                    <div className="relative">
                      <Lock
                        aria-hidden
                        className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-muted-foreground"
                      />
                      <Input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        maxLength={200}
                        required
                        autoFocus
                        placeholder="••••••••••••"
                        className="h-13 rounded-xl pr-4 pl-11 text-base"
                      />
                    </div>
                  </div>
                  <BotonEnviar
                    pendiente="Comprobando…"
                    size="lg"
                    className="h-13 w-full gap-2 rounded-xl text-base shadow-[0_0_40px_-10px] shadow-primary/70"
                  >
                    Entrar
                    <ArrowRight aria-hidden />
                  </BotonEnviar>
                </form>
              ) : null}

              <footer className="flex items-center gap-2 border-t border-border/60 pt-6 font-mono text-[0.68rem] text-muted-foreground">
                <ShieldCheck aria-hidden className="size-3.5 shrink-0" />
                <span>Conexión cifrada · la sesión dura 7 días en este navegador</span>
              </footer>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
