import type { CSSProperties } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import type { Lang } from "@/lib/i18n/idiomas"
import { Live } from "./Live"

const TEXTOS: Record<Lang, { subtitulo: string; carpetas: readonly [string, string, string] }> = {
  es: {
    subtitulo: "Gestión documental automática",
    carpetas: ["Facturas", "Gastos", "Informes"],
  },
  en: {
    subtitulo: "Automated document management",
    carpetas: ["Invoices", "Expenses", "Reports"],
  },
}

// tx: desplazamiento horizontal de la carpeta respecto al centro (ancho de
// carpeta 4rem + hueco 0.75rem = 4.75rem).
const CARPETAS = [
  { i: 0, tx: "-4.75rem", rot: "-6deg", tipo: "PDF", color: "bg-sky-400" },
  { i: 1, tx: "0rem", rot: "3deg", tipo: "JPG", color: "bg-emerald-400" },
  { i: 2, tx: "4.75rem", rot: "7deg", tipo: "CSV", color: "bg-violet-400" },
] as const

/**
 * Las carpetas van en dos capas (fondo y frente) con los documentos en
 * medio: así, al caer, el documento queda tapado por la solapa y parece que
 * entra dentro de la carpeta.
 */
function FilaCarpetas({
  capa,
  nombres,
}: {
  capa: "fondo" | "frente"
  nombres: readonly string[]
}) {
  return (
    <div
      className={cn(
        "absolute inset-x-0 bottom-0 flex justify-center gap-3",
        capa === "fondo" ? "z-0" : "z-20"
      )}
    >
      {CARPETAS.map((c) => (
        <div
          key={c.i}
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
                {nombres[c.i]}
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
 * Documentos que van cayendo, ya clasificados, en su carpeta. Todo con CSS 3D;
 * sin animar (prefers-reduced-motion) quedan las carpetas con su marca de hecho.
 * El logo de FacturIA va junto al nombre, como el de AutoClinic en el chat.
 */
export function DocsScene({ className, lang = "es" }: { className?: string; lang?: Lang }) {
  const t = TEXTOS[lang]

  return (
    <Live className={className}>
      <div className="mv-card vidrio rounded-2xl border p-4 backdrop-blur-sm">
        <div className="flex items-center gap-2.5">
          {/* El logo trae su propio fondo azul noche: llena el círculo. */}
          <span className="size-9 shrink-0 overflow-hidden rounded-full ring-1 ring-brand-emerald/20">
            <Image
              src="/img/facturia/logo-icono.png"
              alt=""
              width={72}
              height={72}
              className="size-full object-cover"
            />
          </span>
          <div className="leading-tight">
            <p className="text-sm font-semibold text-foreground">FacturIA</p>
            <p className="text-xs text-muted-foreground">{t.subtitulo}</p>
          </div>
        </div>

        <div className="relative mx-auto mt-3 h-36 w-60">
          <FilaCarpetas capa="fondo" nombres={t.carpetas} />

          {CARPETAS.map((c) => (
            <div
              key={c.tipo}
              className="mv-doc absolute left-1/2 top-1 z-10 -ml-[1.125rem] grid h-11 w-9 content-start gap-1 rounded-[4px] bg-slate-100 p-1 shadow-md ring-1 ring-slate-900/10"
              style={
                { "--i": c.i, "--tx": c.tx, "--ty": "6rem", "--rot": c.rot } as CSSProperties
              }
            >
              <span className={cn("h-1.5 w-full rounded-sm", c.color)} />
              <span className="h-0.5 w-full rounded bg-slate-300" />
              <span className="h-0.5 w-3/4 rounded bg-slate-300" />
              <span className="text-[7px] font-bold leading-none text-slate-500">{c.tipo}</span>
            </div>
          ))}

          <FilaCarpetas capa="frente" nombres={t.carpetas} />
        </div>
      </div>
    </Live>
  )
}
