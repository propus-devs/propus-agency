import Link from "next/link"
import { CheckIcon } from "lucide-react"

import { TiltCtaButton } from "@/components/ui/tilt-cta-button"
import { ruta, type Lang } from "@/lib/i18n/idiomas"

/* Precio fijado el 2026-11-14: 19 € al mes con un tope de 100 documentos.
   El tope está porque el coste real depende de los documentos procesados (OCR
   + IA), no del tamaño del negocio. Por encima de ahí se presupuesta en la
   llamada: no publicamos un precio que no sabemos sostener. */
const PRECIO = 19
const DOCUMENTOS = 100

interface Textos {
  etiqueta: string
  titulo: [string, string]
  subtitulo: string
  plan: string
  para: string
  alMes: string
  sinIva: string
  tope: string
  incluye: string[]
  boton: string
  masVolumen: string
  alta: string
}

const textos: Record<Lang, Textos> = {
  es: {
    etiqueta: "Precio",
    titulo: ["Un precio, ", "sin letra pequeña"],
    subtitulo:
      "Pensado para autónomos y negocios pequeños que quieren dejar de teclear facturas. Sin permanencia.",
    plan: "FacturIA",
    para: "Autónomos y negocios pequeños",
    alMes: "al mes",
    sinIva: "IVA no incluido",
    tope: `Hasta ${DOCUMENTOS} documentos al mes`,
    incluye: [
      "Captura de facturas con OCR e IA",
      "Revisión y aprobación automática",
      "Panel de métricas en tiempo real",
      "Informes para tu gestoría",
      "Tus datos aislados y con auditoría completa",
    ],
    boton: "Pruébalo con tus facturas",
    masVolumen:
      "¿Más de 100 documentos al mes? Lo presupuestamos en la llamada, con tu volumen real delante.",
    alta: "La puesta en marcha la cerramos contigo según de dónde haya que traer tus facturas.",
  },
  en: {
    etiqueta: "Pricing",
    titulo: ["One price, ", "no small print"],
    subtitulo:
      "Made for freelancers and small businesses that want to stop typing invoices. No lock-in.",
    plan: "FacturIA",
    para: "Freelancers and small businesses",
    alMes: "a month",
    sinIva: "VAT not included",
    tope: `Up to ${DOCUMENTOS} documents a month`,
    incluye: [
      "Invoice capture with OCR and AI",
      "Automatic review and approval",
      "Real-time metrics dashboard",
      "Reports for your accountant",
      "Your data isolated, with a full audit trail",
    ],
    boton: "Try it with your invoices",
    masVolumen:
      "More than 100 documents a month? We'll quote it on the call, with your real volume in front of us.",
    alta: "We settle the setup with you, depending on where your invoices have to come from.",
  },
}

export default function FacturiaPricing({ lang = "es" }: { lang?: Lang }) {
  const t = textos[lang]

  return (
    <section id="precios" className="scroll-mt-24 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-facturia/30 bg-facturia/10 px-4 py-1.5 text-xs font-semibold text-facturia">
            {t.etiqueta}
          </span>
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
            {t.titulo[0]}
            <span className="bg-linear-to-r from-facturia to-facturia-dark bg-clip-text text-transparent">
              {t.titulo[1]}
            </span>
          </h2>
          <p className="mt-4 text-slate-400">{t.subtitulo}</p>
        </div>

        <div className="mx-auto max-w-xl rounded-2xl border border-facturia/25 bg-facturia-card/70 p-8 backdrop-blur-sm md:p-10">
          <h3 className="text-lg font-semibold text-facturia-fg">{t.plan}</h3>
          <p className="mt-1 text-sm text-slate-400">{t.para}</p>

          <p className="mt-6 flex items-baseline gap-2">
            <span className="text-5xl font-semibold tracking-tight text-facturia-fg">
              {PRECIO} €
            </span>
            <span className="text-sm text-slate-400">{t.alMes}</span>
          </p>
          <p className="mt-1 text-xs text-slate-500">{t.sinIva}</p>

          <p className="mt-6 rounded-xl border border-facturia/20 bg-facturia/5 px-4 py-3 text-sm font-medium text-facturia">
            {t.tope}
          </p>

          <ul className="mt-6 flex flex-col gap-2.5">
            {t.incluye.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm text-slate-400">
                <CheckIcon className="mt-0.5 size-4 shrink-0 text-facturia" />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <div className="mt-8">
            <TiltCtaButton
              tone="facturia"
              className="h-11 w-full bg-linear-to-r from-facturia to-facturia-dark font-semibold text-white hover:opacity-90"
              asChild
            >
              <Link href={ruta("reservar", lang)}>{t.boton}</Link>
            </TiltCtaButton>
          </div>
        </div>

        <p className="mx-auto mt-8 max-w-2xl text-center text-sm text-slate-400">
          {t.masVolumen}
        </p>
        <p className="mx-auto mt-2 max-w-2xl text-center text-xs text-slate-500">{t.alta}</p>
      </div>
    </section>
  )
}
