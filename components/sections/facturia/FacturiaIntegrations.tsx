import Image from "next/image"
import { WorkflowIcon, ArrowRightIcon, CheckIcon } from "lucide-react"
import type { Lang } from "@/lib/i18n/idiomas"

interface Textos {
  pastilla: string
  titulo: [string, string]
  descripcion: string
  beneficios: [string, string, string]
  ocrSub: string
  driveSub: string
  sheetsSub: string
}

const textos: Record<Lang, Textos> = {
  es: {
    pastilla: "Integración & automatización",
    titulo: ["Lo complementamos con ", "Google Drive y Sheets"],
    descripcion:
      "Más allá de la plataforma, organizamos tu información en Google Drive y Google Sheets, que se completan solos desde la automatización OCR construida sobre n8n.",
    beneficios: [
      "Cada factura procesada se archiva ordenada en tu Google Drive, por empresa y periodo.",
      "Los datos extraídos se vuelcan automáticamente en Google Sheets, listos para consultar.",
      "La automatización OCR corre sobre n8n: sin copiar, pegar ni mover archivos a mano.",
    ],
    ocrSub: "Automatización",
    driveSub: "Archivado ordenado",
    sheetsSub: "Datos volcados",
  },
  en: {
    pastilla: "Integration & automation",
    titulo: ["We complement it with ", "Google Drive and Sheets"],
    descripcion:
      "Beyond the platform, we organize your information in Google Drive and Google Sheets, which fill themselves from the OCR automation built on n8n.",
    beneficios: [
      "Every processed invoice is filed in order in your Google Drive, by company and period.",
      "Extracted data is loaded automatically into Google Sheets, ready to consult.",
      "The OCR automation runs on n8n: no copying, pasting or moving files by hand.",
    ],
    ocrSub: "Automation",
    driveSub: "Orderly filing",
    sheetsSub: "Data loaded",
  },
}

export default function FacturiaIntegrations({ lang = "es" }: { lang?: Lang }) {
  const t = textos[lang]

  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4">
        <div className="overflow-hidden rounded-3xl border border-white/10 bg-facturia-card/60 backdrop-blur-sm">
          <div className="grid items-center gap-10 p-8 md:grid-cols-2 md:p-12">
            {/* Texto */}
            <div>
              <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-facturia/30 bg-facturia/10 px-4 py-1.5 text-xs font-semibold text-facturia">
                <WorkflowIcon className="size-3.5" />
                {t.pastilla}
              </span>
              <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
                {t.titulo[0]}
                <span className="bg-linear-to-r from-facturia to-facturia-dark bg-clip-text text-transparent">
                  {t.titulo[1]}
                </span>
              </h2>
              <p className="mt-4 text-muted-foreground">{t.descripcion}</p>

              <ul className="mt-6 flex flex-col gap-3">
                {t.beneficios.map((b) => (
                  <li key={b} className="flex items-start gap-3">
                    <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-facturia/15">
                      <CheckIcon className="size-3 text-facturia" />
                    </span>
                    <span className="text-sm leading-snug text-slate-300">{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Diagrama de integración */}
            <div className="flex flex-col items-center gap-4">
              <IntegrationNode icon={<Image src="/img/integrations/n8n.svg" alt="n8n" width={28} height={28} className="size-7" />} label="OCR · n8n" sub={t.ocrSub} />
              <ArrowRightIcon className="size-5 rotate-90 text-facturia/50" />
              <div className="grid w-full grid-cols-2 gap-4">
                <IntegrationNode icon={<Image src="/img/integrations/googledrive.svg" alt="Google Drive" width={24} height={24} className="size-6" />} label="Google Drive" sub={t.driveSub} />
                <IntegrationNode icon={<Image src="/img/integrations/googlesheets.svg" alt="Google Sheets" width={24} height={24} className="size-6" />} label="Google Sheets" sub={t.sheetsSub} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function IntegrationNode({
  icon,
  label,
  sub,
}: {
  icon: React.ReactNode
  label: string
  sub: string
}) {
  return (
    <div className="flex w-full flex-col items-center gap-2 rounded-2xl border border-white/8 bg-facturia-bg px-4 py-5 text-center">
      <div className="flex size-12 items-center justify-center rounded-xl bg-facturia/12">{icon}</div>
      <p className="text-sm font-semibold text-facturia-fg">{label}</p>
      <p className="text-xs text-facturia-muted">{sub}</p>
    </div>
  )
}
