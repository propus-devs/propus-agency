import type { CSSProperties } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { Live } from "./Live"

// tx: desplazamiento horizontal de la carpeta respecto al centro (ancho de
// carpeta 4rem + hueco 0.75rem = 4.75rem).
const CARPETAS = [
  { i: 0, nombre: "Facturas", tx: "-4.75rem", rot: "-6deg", tipo: "PDF", color: "bg-sky-400" },
  { i: 1, nombre: "Gastos", tx: "0rem", rot: "3deg", tipo: "JPG", color: "bg-emerald-400" },
  { i: 2, nombre: "Informes", tx: "4.75rem", rot: "7deg", tipo: "CSV", color: "bg-violet-400" },
] as const

/**
 * Las carpetas van en dos capas (fondo y frente) con los documentos en
 * medio: así, al caer, el documento queda tapado por la solapa y parece que
 * entra dentro de la carpeta.
 */
function FilaCarpetas({ capa }: { capa: "fondo" | "frente" }) {
  return (
    <div
      className={cn(
        "absolute inset-x-0 bottom-0 flex justify-center gap-3",
        capa === "fondo" ? "z-0" : "z-20"
      )}
    >
      {CARPETAS.map((c) => (
        <div
          key={c.nombre}
          className="relative h-12 w-16 [perspective:200px]"
          style={{ "--i": c.i } as CSSProperties}
        >
          {capa === "fondo" ? (
            <>
              <span className="absolute left-1 top-0 h-2.5 w-7 rounded-t-md border border-b-0 border-brand-teal/40 bg-brand-teal/30" />
              <span className="absolute inset-x-0 bottom-0 h-10 rounded-md border border-brand-teal/40 bg-brand-teal/20" />
            </>
          ) : (
            <>
              <span className="mv-lid absolute inset-x-0 bottom-0 grid h-9 origin-bottom place-items-center rounded-md border border-brand-emerald/50 bg-brand-emerald/30 text-[9px] font-medium text-foreground">
                {c.nombre}
              </span>
              <span className="mv-check absolute -right-1 top-1 grid size-4 place-items-center rounded-full bg-brand-emerald text-[9px] font-bold text-background">
                ✓
              </span>
            </>
          )}
        </div>
      ))}
    </div>
  )
}

/**
 * El logo de Propus gira como una moneda y "escupe" documentos que caen a su
 * carpeta, ya clasificados. Todo con CSS 3D; sin animar (prefers-reduced-motion)
 * quedan las carpetas con su marca de hecho.
 */
export function DocsScene({ className }: { className?: string }) {
  return (
    <Live className={className}>
      <div className="mv-card vidrio rounded-2xl border p-4 backdrop-blur-sm">
        <div className="leading-tight">
          <p className="text-sm font-semibold text-foreground">FacturIA</p>
          <p className="text-xs text-muted-foreground">Gestión documental automática</p>
        </div>

        <div className="relative mx-auto mt-3 h-44 w-60">
          <FilaCarpetas capa="fondo" />

          {CARPETAS.map((c) => (
            <div
              key={c.tipo}
              className="mv-doc absolute left-1/2 top-7 z-10 -ml-[1.125rem] grid h-11 w-9 content-start gap-1 rounded-[4px] bg-slate-100 p-1 shadow-md ring-1 ring-slate-900/10"
              style={
                { "--i": c.i, "--tx": c.tx, "--ty": "6.5rem", "--rot": c.rot } as CSSProperties
              }
            >
              <span className={cn("h-1.5 w-full rounded-sm", c.color)} />
              <span className="h-0.5 w-full rounded bg-slate-300" />
              <span className="h-0.5 w-3/4 rounded bg-slate-300" />
              <span className="text-[7px] font-bold leading-none text-slate-500">{c.tipo}</span>
            </div>
          ))}

          <div className="absolute left-1/2 top-0 z-20 -ml-[1.375rem] [perspective:300px]">
            <div className="mv-coin grid size-11 place-items-center rounded-full border border-brand-emerald/40 bg-brand-emerald/15 shadow-[0_0_24px_-4px] shadow-brand-emerald/60">
              <Image src="/favicons/noBGpropus1024.png" alt="" width={28} height={28} />
            </div>
          </div>

          <FilaCarpetas capa="frente" />
        </div>
      </div>
    </Live>
  )
}
