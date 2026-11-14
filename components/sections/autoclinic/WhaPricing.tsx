import Link from "next/link"
import { CheckIcon, MessageSquareIcon, UserPlusIcon, InfinityIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { TiltCtaButton } from "@/components/ui/tilt-cta-button"
import { cn } from "@/lib/utils"
import {
  CUOTA_BASE,
  CUOTA_PROFESIONAL,
  PROFESIONALES_PUBLICADOS,
  TOPE_CONVERSACIONES,
  tramosPublicados,
} from "@/lib/autoclinic-pricing"
import { ruta, type Lang } from "@/lib/i18n/idiomas"

/* Las cifras salen todas de lib/autoclinic-pricing.ts. Aquí sólo el idioma.
   No se menciona el alta ni el prepago anual: son palancas de negociación y
   no van en la web (planes-auto-clinic/PRICING.md). */

interface Textos {
  etiqueta: string
  titulo: [string, string]
  formula: string
  subtitulo: string
  lanzamiento: string
  profesionales: (n: number) => string
  alMes: string
  sinIva: string
  masDe: string
  presupuesto: string
  presupuestoDetalle: string
  incluyeTitulo: string
  incluye: string[]
  conversacionesTitulo: string
  conversacionesCifra: (n: number) => string
  conversacionesCuerpo: string
  sinPermanencia: string
  cta: string
  ctaSecundario: string
  marco: string
}

const textos: Record<Lang, Textos> = {
  es: {
    etiqueta: "Precio",
    titulo: ["Una cuota, ", "todo dentro"],
    formula: `${CUOTA_BASE} € la consulta, ${CUOTA_PROFESIONAL} € cada podólogo más`,
    subtitulo:
      "Gestión, historia clínica y agente de WhatsApp en la misma cuota. No se parte el producto en módulos: la integración es lo que hace que funcione.",
    lanzamiento: "Precio de lanzamiento",
    profesionales: (n) => (n === 1 ? "1 podólogo" : `${n} podólogos`),
    alMes: "al mes",
    sinIva: "IVA no incluido",
    masDe: `Más de ${PROFESIONALES_PUBLICADOS} podólogos`,
    presupuesto: "Presupuesto",
    presupuestoDetalle:
      "Las clínicas grandes tienen horarios, gabinetes y circuitos propios. El precio lo cerramos en una llamada, sin que la cuota se dispare.",
    incluyeTitulo: "Lo que entra en la cuota, en todos los casos",
    incluye: [
      "Agente de WhatsApp 24 h: agenda, cambia, cancela y responde",
      "Historia clínica completa de podología",
      "Bandeja de chats dentro del programa",
      "Recordatorio automático 24 h antes de cada cita",
      "Agenda por podólogo, con jornada partida y ausencias",
      "Facturación, cobros y panel de ingresos reales",
      "Reserva pública en tu web con los mismos huecos",
      "Mensajes de WhatsApp y consumo de la IA incluidos",
    ],
    conversacionesTitulo: "Conversaciones incluidas",
    conversacionesCifra: (n) => `${n} al mes por podólogo`,
    conversacionesCuerpo:
      "Una clínica con mucho movimiento se queda sobre las 150-200 al mes por podólogo, así que el tope está puesto al triple. No pagas por mensaje ni compras bonos cuando se acaban: los mensajes de WhatsApp y el consumo de la IA van dentro de la cuota.",
    sinPermanencia: "Sin permanencia. Avisas y te vas.",
    cta: "Hablamos 15 minutos",
    ctaSecundario: "Ver la bandeja de chats",
    marco:
      "A 35 € la quiropodia, la consulta de un podólogo son tres citas al mes. Si el agente recupera un no-show a la semana, ya está pagado.",
  },
  en: {
    etiqueta: "Pricing",
    titulo: ["One fee, ", "everything inside"],
    formula: `€${CUOTA_BASE} for the practice, €${CUOTA_PROFESIONAL} per extra podiatrist`,
    subtitulo:
      "Management, clinical records and the WhatsApp agent in the same fee. The product isn't split into modules: the integration is what makes it work.",
    lanzamiento: "Launch price",
    profesionales: (n) => (n === 1 ? "1 podiatrist" : `${n} podiatrists`),
    alMes: "a month",
    sinIva: "VAT not included",
    masDe: `More than ${PROFESIONALES_PUBLICADOS} podiatrists`,
    presupuesto: "On request",
    presupuestoDetalle:
      "Large clinics have their own hours, rooms and workflows. We settle the price on a call, without the fee getting out of hand.",
    incluyeTitulo: "What the fee covers, in every case",
    incluye: [
      "24 h WhatsApp agent: books, changes, cancels and answers",
      "Full podiatry clinical records",
      "A chat inbox inside the software",
      "Automatic reminder 24 h before every appointment",
      "A schedule per podiatrist, with split shifts and absences",
      "Invoicing, payments and a real-income dashboard",
      "Public booking on your website, using the same slots",
      "WhatsApp messages and AI usage included",
    ],
    conversacionesTitulo: "Conversations included",
    conversacionesCifra: (n) => `${n} a month per podiatrist`,
    conversacionesCuerpo:
      "A busy clinic stays around 150-200 a month per podiatrist, so the cap sits at three times that. You don't pay per message or buy top-ups when they run out: WhatsApp messages and AI usage are inside the fee.",
    sinPermanencia: "No lock-in. Tell us and you're out.",
    cta: "Let's talk for 15 minutes",
    ctaSecundario: "See the chat inbox",
    marco:
      "At €35 a chiropody session, a single-podiatrist practice is three appointments a month. If the agent recovers one no-show a week, it has paid for itself.",
  },
}

export default function WhaPricing({ lang = "es" }: { lang?: Lang }) {
  const t = textos[lang]
  const reservar = ruta("reservar", lang)
  const tramos = tramosPublicados()

  return (
    <section id="precios" className="scroll-mt-24 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4">

        {/* Cabecera: la fórmula manda, no una rejilla de planes */}
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-wha/30 bg-wha/10 px-4 py-1.5 text-xs font-semibold text-wha">
            {t.etiqueta}
          </span>
          <h2 className="text-3xl font-semibold tracking-tight text-wha-fg md:text-4xl">
            {t.titulo[0]}
            <span className="bg-linear-to-r from-wha to-wha-teal bg-clip-text text-transparent">
              {t.titulo[1]}
            </span>
          </h2>
          <p className="mt-5 text-lg font-medium text-wha-fg">{t.formula}</p>
          <p className="mt-4 text-wha-muted">{t.subtitulo}</p>
          <span className="mt-5 inline-flex items-center gap-2 rounded-full border border-wha-alt/30 bg-wha-alt/10 px-3 py-1 text-xs font-medium text-wha-alt">
            {t.lanzamiento}
          </span>
        </div>

        {/* La escalera, hasta donde se publica */}
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {tramos.map((tramo) => (
            <div
              key={tramo.profesionales}
              className={cn(
                "flex flex-col items-center gap-1 rounded-2xl border p-6 text-center backdrop-blur-sm",
                tramo.profesionales === 1
                  ? "border-wha/40 bg-linear-to-br from-wha/10 via-wha-card to-wha-teal/10"
                  : "border-white/8 bg-wha-card/60"
              )}
            >
              <span className="text-xs font-medium uppercase tracking-widest text-wha-muted">
                {t.profesionales(tramo.profesionales)}
              </span>
              <p className="mt-3 text-4xl font-semibold tracking-tight text-wha-fg">
                {tramo.cuota} €
              </p>
              <span className="text-xs text-wha-muted">{t.alMes}</span>
            </div>
          ))}

          {/* El tramo que no lleva precio: de aquí en adelante, llamada */}
          <div className="flex flex-col items-center gap-1 rounded-2xl border border-dashed border-wha-teal/40 bg-wha-teal/5 p-6 text-center">
            <span className="text-xs font-medium uppercase tracking-widest text-wha-muted">
              {t.masDe}
            </span>
            <InfinityIcon className="mt-4 size-8 text-wha-teal" />
            <p className="mt-1 text-sm font-semibold text-wha-teal">{t.presupuesto}</p>
          </div>
        </div>

        <p className="mt-4 text-center text-xs text-wha-muted/80">{t.sinIva}</p>

        {/* Conversaciones incluidas: el argumento frente a quien vende bonos */}
        <div className="mt-10 grid gap-5 lg:grid-cols-5">
          <div className="rounded-2xl border border-wha-teal/25 bg-wha-teal/5 p-7 lg:col-span-2">
            <div className="mb-4 flex size-11 items-center justify-center rounded-xl bg-wha-teal/15">
              <MessageSquareIcon className="size-5 text-wha-teal" />
            </div>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-wha-teal">
              {t.conversacionesTitulo}
            </h3>
            <p className="mt-3 text-3xl font-semibold tracking-tight text-wha-fg">
              {t.conversacionesCifra(TOPE_CONVERSACIONES)}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-wha-muted">
              {t.conversacionesCuerpo}
            </p>
          </div>

          <div className="rounded-2xl border border-white/8 bg-wha-card/60 p-7 backdrop-blur-sm lg:col-span-3">
            <h3 className="text-sm font-semibold uppercase tracking-widest text-wha">
              {t.incluyeTitulo}
            </h3>
            <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
              {t.incluye.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-wha-muted">
                  <CheckIcon className="mt-0.5 size-4 shrink-0 text-wha-teal" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Clínicas grandes */}
        <div className="mt-5 flex items-start gap-4 rounded-2xl border border-dashed border-wha/30 bg-wha/5 p-7">
          <div className="mt-0.5 flex size-11 shrink-0 items-center justify-center rounded-xl bg-wha/15">
            <UserPlusIcon className="size-5 text-wha" />
          </div>
          <div>
            <h3 className="font-semibold text-wha-fg">{t.masDe}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-wha-muted">
              {t.presupuestoDetalle}
            </p>
          </div>
        </div>

        {/* Cierre */}
        <div className="mt-14 flex flex-col items-center gap-6 text-center">
          <p className="max-w-2xl text-lg leading-relaxed text-wha-muted">{t.marco}</p>
          <p className="text-sm font-medium text-wha-teal">{t.sinPermanencia}</p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <TiltCtaButton
              tone="wha"
              flat
              size="lg"
              className="h-11 bg-linear-to-r from-wha via-wha-alt to-wha-teal px-7 font-semibold text-white hover:opacity-90"
              asChild
            >
              <Link href={reservar}>{t.cta}</Link>
            </TiltCtaButton>
            <Button
              variant="outline"
              size="lg"
              className="h-11 border-wha-fg/20 px-7 text-wha-fg hover:bg-wha-card"
              asChild
            >
              <Link href="#bandeja">{t.ctaSecundario}</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
