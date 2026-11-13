import {
  KeyboardOffIcon,
  GitBranchIcon,
  GaugeIcon,
  FileSpreadsheetIcon,
  UsersIcon,
} from "lucide-react"
import type { Lang } from "@/lib/i18n/idiomas"

const iconos = [KeyboardOffIcon, GitBranchIcon, GaugeIcon, FileSpreadsheetIcon, UsersIcon]

interface Textos {
  titulo: [string, string]
  subtitulo: string
  problemas: [string, string, string, string, string]
}

const textos: Record<Lang, Textos> = {
  es: {
    titulo: ["Deja de perder horas ", "tecleando facturas"],
    subtitulo:
      "FacturIA automatiza el ciclo completo de tus documentos contables para que recuperes el control de cada euro.",
    problemas: [
      "Eliminar la entrada manual de datos de facturas, propensa a errores.",
      "Tener un flujo de revisión y aprobación claro y auditable.",
      "Conocer en tiempo real ingresos, gastos, beneficio e IVA.",
      "Generar informes y exportaciones (Excel, CSV, PDF) en segundos.",
      "Centralizar la relación con proveedores y clientes.",
    ],
  },
  en: {
    titulo: ["Stop losing hours ", "typing invoices"],
    subtitulo:
      "FacturIA automates the whole cycle of your accounting documents so you regain control of every euro.",
    problemas: [
      "Eliminate manual entry of invoice data, which is error-prone.",
      "Have a clear, auditable review and approval workflow.",
      "Know income, expenses, profit and VAT in real time.",
      "Generate reports and exports (Excel, CSV, PDF) in seconds.",
      "Centralize your relationship with suppliers and customers.",
    ],
  },
}

export default function FacturiaProblem({ lang = "es" }: { lang?: Lang }) {
  const t = textos[lang]

  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
            {t.titulo[0]}
            <span className="bg-linear-to-r from-facturia to-facturia-dark bg-clip-text text-transparent">
              {t.titulo[1]}
            </span>
          </h2>
          <p className="mt-4 text-muted-foreground">{t.subtitulo}</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {t.problemas.map((text, i) => {
            const Icon = iconos[i]
            return (
              <div
                key={i}
                className="flex items-start gap-4 rounded-xl border border-white/8 bg-facturia-card/60 px-5 py-5 backdrop-blur-sm transition-colors hover:border-facturia/40"
              >
                <div className="mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-lg bg-facturia/12">
                  <Icon className="size-5 text-facturia" />
                </div>
                <span className="text-sm leading-snug text-slate-300">{text}</span>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
