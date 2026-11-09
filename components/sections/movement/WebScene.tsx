import type { ReactNode } from "react"
import Image from "next/image"
import { MousePointer2Icon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Live } from "./Live"

/**
 * Cada pieza del hero lleva un recuadro de "plano" (línea discontinua) que se
 * ve al principio del ciclo y se desvanece cuando la pieza ya está construida.
 */
function Pieza({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div className={cn("relative", className)}>
      <span
        aria-hidden
        className="mv-w-wire pointer-events-none absolute -inset-1 rounded-md border border-dashed border-white/30"
      />
      {children}
    </div>
  )
}

/**
 * Mini navegador en el que se "construye" un hero animado: aparece el plano,
 * un cursor va colocando la barra de navegación, el titular, el botón y, al
 * final, el logo en 3D girando. Dura 12 s y se repite. Todo con CSS (ver
 * "Movement: escenas en vivo" en globals.css): sin animar (prefers-reduced-motion)
 * queda el hero ya terminado.
 */
export function WebScene({ className }: { className?: string }) {
  return (
    <Live className={className}>
      <div className="mv-card rounded-2xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur-sm">
        <div className="leading-tight">
          <p className="text-sm font-semibold text-foreground">Diseño web a medida</p>
          <p className="text-xs text-muted-foreground">Sin plantillas, hechas para tu marca</p>
        </div>

        <div className="mt-3 overflow-hidden rounded-lg border border-white/10 bg-black/40">
          {/* Barra del navegador */}
          <div className="flex items-center gap-1.5 border-b border-white/10 px-2.5 py-1.5">
            <span className="size-1.5 rounded-full bg-white/20" />
            <span className="size-1.5 rounded-full bg-white/20" />
            <span className="size-1.5 rounded-full bg-white/20" />
            <span className="ml-2 flex-1 truncate rounded bg-white/[0.06] px-2 py-0.5 text-[9px] text-muted-foreground">
              tunegocio.es
            </span>
          </div>

          <div className="relative h-36">
            <div className="mv-w-stage absolute inset-0 flex flex-col gap-2 p-3">
              {/* Navegación */}
              <Pieza>
                <div className="mv-w-nav flex h-4 items-center gap-2">
                  <Image src="/favicons/noBGpropus1024.png" alt="" width={14} height={14} />
                  <span className="h-1 w-5 rounded-full bg-white/25" />
                  <span className="h-1 w-5 rounded-full bg-white/25" />
                  <span className="h-1 w-5 rounded-full bg-white/25" />
                  <span className="ml-auto h-3.5 w-8 rounded-full border border-brand-emerald/50 bg-brand-emerald/15" />
                </div>
              </Pieza>

              <div className="grid min-h-0 flex-1 grid-cols-[minmax(0,1fr)_4.5rem] items-center gap-2">
                <div className="flex flex-col gap-1.5">
                  <Pieza>
                    <p className="mv-w-h1 text-[13px] font-semibold leading-[1.1] tracking-tight">
                      <span className="block text-white">Tu marca</span>
                      <span className="block bg-linear-to-r from-brand-teal to-brand-green bg-clip-text text-transparent">
                        en movimiento.
                      </span>
                    </p>
                  </Pieza>
                  <Pieza>
                    <div className="mv-w-sub flex origin-left flex-col gap-1">
                      <span className="h-1 w-full rounded-full bg-white/20" />
                      <span className="h-1 w-3/4 rounded-full bg-white/20" />
                    </div>
                  </Pieza>
                  <Pieza className="w-fit">
                    <span className="mv-w-cta inline-flex h-5 items-center rounded-full bg-brand-emerald px-2.5 text-[9px] font-semibold text-background">
                      Empezar
                    </span>
                  </Pieza>
                </div>

                <Pieza className="self-stretch">
                  <div className="mv-w-media relative grid size-full place-items-center">
                    <span className="absolute size-12 rounded-full bg-brand-emerald/30 blur-xl" />
                    <div className="relative [perspective:300px]">
                      <div className="mv-coin grid size-11 place-items-center rounded-full border border-brand-emerald/40 bg-brand-emerald/15 shadow-[0_0_24px_-4px] shadow-brand-emerald/60">
                        <Image src="/favicons/noBGpropus1024.png" alt="" width={28} height={28} />
                      </div>
                    </div>
                  </div>
                </Pieza>
              </div>
            </div>

            <MousePointer2Icon className="mv-w-cursor absolute left-0 top-0 size-4 fill-white text-black" />
          </div>
        </div>
      </div>
    </Live>
  )
}
