import Link from "next/link"
import { ArrowRightIcon, ArrowUpRightIcon } from "lucide-react"
import { SplineScene } from "@/components/ui/spline-scene"
import { TiltCtaButton } from "@/components/ui/tilt-cta-button"
import { ruta, type Lang } from "@/lib/i18n/idiomas"

// Producción sirve siempre la copia auto-hospedada: evita la conexión a un
// tercer dominio y permite precargarla en paralelo al runtime. En desarrollo,
// NEXT_PUBLIC_SPLINE_SCENE (.env.local) permite apuntar a la escena publicada
// en Spline para ir viendo los cambios; `pnpm run spline:pull` la congela aquí.
const splineSceneLogo =
  (process.env.NODE_ENV === "development" && process.env.NEXT_PUBLIC_SPLINE_SCENE) ||
  "/spline/logo-v3.splinecode"

interface Textos {
  /** Línea del H1, tras «Propus ·» */
  h1: string
  desliza: string
  titulo: [string, string]
  subtitulo: string
  listaServicios: string
  verFunciona: string
  hablaConNosotros: string
  /** Cada servicio con lo suyo: no mezclar lo de AutoClinic (agenda,
   *  recordatorios) con lo de las webs de turismo rural (reservas, SEO, panel). */
  autoclinic: string
  ruralprop: string
  facturia: string
}

const textos: Record<Lang, Textos> = {
  es: {
    h1: "Desarrollo de software e integraciones inteligentes",
    desliza: "Desliza",
    titulo: ["Tu negocio,", "en orden."],
    subtitulo:
      "Software de gestión interna para podólogos y webs con pasarela de reservas, SEO y panel de administración propio.",
    listaServicios: "Nuestros servicios",
    verFunciona: "Ver cómo funciona",
    hablaConNosotros: "Habla con nosotros",
    autoclinic: "Agenda, recordatorios automáticos y CRM para clínicas de podología",
    ruralprop: "Web con reservas online, SEO y panel de gestión para turismo rural",
    facturia: "Gestión documental automática",
  },
  en: {
    h1: "Software development and smart integrations",
    desliza: "Scroll",
    titulo: ["Your business,", "in order."],
    subtitulo:
      "Internal management software for podiatrists, and websites with a booking system, SEO and their own admin panel.",
    listaServicios: "Our services",
    verFunciona: "See how it works",
    hablaConNosotros: "Talk to us",
    autoclinic: "Scheduling, automatic reminders and CRM for podiatry clinics",
    ruralprop: "Website with online booking, SEO and a management panel for rural tourism",
    facturia: "Automated document management",
  },
}

/**
 * Hero con scroll coreografiado. Al entrar solo están el logo 3D, una línea
 * con el H1 y una invitación a deslizar. Al hacer scroll el escenario se queda
 * fijo: el logo se encoge hacia arriba y la frase entra por partes.
 *
 * Toda la coreografía está en globals.css (bloque "Hero escena") con
 * animaciones ligadas al scroll (animation-timeline). Sin soporte o con
 * prefers-reduced-motion, las mismas piezas se apilan en estático.
 */
export default function Hero({ lang = "es" }: { lang?: Lang }) {
  const t = textos[lang]
  const inicio = ruta("inicio", lang)

  const servicios = [
    { href: ruta("autoclinic", lang), name: "AutoClinic", detail: t.autoclinic },
    // RuralProp es el nombre de las webs con reservas para turismo rural. El
    // diseño web a medida es un servicio aparte (no todo es RuralProp).
    { href: ruta("ruralprop", lang), name: "RuralProp", detail: t.ruralprop },
    { href: ruta("facturia", lang), name: "FacturIA", detail: t.facturia },
  ]

  return (
    <section className="escena">
      <div className="escena-stage">
        <div className="escena-logo">
          <SplineScene scene={splineSceneLogo} className="h-full w-full" />
        </div>

        <div className="escena-intro flex flex-col items-center">
          <h1 className="font-sans text-sm tracking-wide text-muted-foreground md:text-base">
            <span className="font-heading font-medium text-foreground">Propus</span>
            <span aria-hidden className="mx-2 text-muted-foreground/50">·</span>
            {t.h1}
          </h1>

          <div aria-hidden className="escena-cue mt-8 flex-col items-center gap-3">
            <span className="text-[0.65rem] uppercase tracking-[0.35em] text-muted-foreground/70">
              {t.desliza}
            </span>
            <span className="relative h-12 w-px overflow-hidden bg-border">
              <span className="absolute inset-x-0 top-0 h-1/3 bg-brand-emerald motion-safe:animate-cue" />
            </span>
          </div>
        </div>

        <div className="escena-frase flex flex-col items-center text-center">
          {/* Cada pieza entra en su turno (escena-paso-1…5, en globals.css).
              Tamaños y espacios en svh: la frase vive en una pantalla fija y
              tiene que caber entera también en portátiles bajos y móviles. */}
          <h2 className="text-[length:min(7svh,11vw,4.5rem)] font-medium leading-[0.95] tracking-[-0.02em] text-foreground">
            <span className="escena-paso-1 block">{t.titulo[0]}</span>
            <span className="escena-paso-2 block">{t.titulo[1]}</span>
          </h2>

          <p className="escena-paso-3 mt-[max(0.75rem,2.2svh)] max-w-xl text-[0.95rem] leading-relaxed text-muted-foreground text-balance md:text-lg">
            {t.subtitulo}
          </p>

          {/* En móvil solo el nombre: el detalle no cabe en la pantalla fija. */}
          <ul
            aria-label={t.listaServicios}
            className="escena-paso-4 mt-[max(1rem,3svh)] w-full max-w-2xl border-t border-border text-left"
          >
            {servicios.map(({ href, name, detail }) => (
              <li key={href} className="border-b border-border">
                <Link
                  href={href}
                  className="group flex items-center gap-6 py-[max(0.6rem,1.3svh)]"
                >
                  <span className="font-heading font-medium text-foreground transition-colors group-hover:text-brand-emerald sm:w-44 sm:shrink-0">
                    {name}
                  </span>
                  <span className="hidden flex-1 text-sm text-muted-foreground sm:block">{detail}</span>
                  <ArrowUpRightIcon className="ml-auto size-4 shrink-0 text-muted-foreground/60 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand-emerald sm:ml-0" />
                </Link>
              </li>
            ))}
          </ul>

          <div className="escena-paso-5 mt-[max(1rem,3svh)] flex flex-wrap items-center justify-center gap-x-5 gap-y-3">
            <TiltCtaButton
              size="lg"
              className="h-11 gap-2 bg-brand-emerald px-5 font-semibold text-background hover:bg-brand-teal sm:px-6"
              asChild
            >
              <Link href={`${inicio}#proceso`}>
                {t.verFunciona}
                <ArrowRightIcon className="size-4" />
              </Link>
            </TiltCtaButton>
            <Link
              href={`${inicio}#contacto`}
              className="text-sm font-medium text-foreground/80 underline-offset-4 transition-colors hover:text-foreground hover:underline"
            >
              {t.hablaConNosotros}
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
