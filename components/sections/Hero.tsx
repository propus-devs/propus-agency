import Link from "next/link"
import { ArrowRightIcon, ArrowUpRightIcon } from "lucide-react"
import { SplineScene } from "@/components/ui/spline-scene"
import { TiltCtaButton } from "@/components/ui/tilt-cta-button"

// Producción sirve siempre la copia auto-hospedada: evita la conexión a un
// tercer dominio y permite precargarla en paralelo al runtime. En desarrollo,
// NEXT_PUBLIC_SPLINE_SCENE (.env.local) permite apuntar a la escena publicada
// en Spline para ir viendo los cambios; `pnpm run spline:pull` la congela aquí.
const splineSceneLogo =
  (process.env.NODE_ENV === "development" && process.env.NEXT_PUBLIC_SPLINE_SCENE) ||
  "/spline/logo-v3.splinecode"

// Cada producto con lo suyo: no mezclar lo de AutoClinic (agenda,
// recordatorios) con lo de las webs de turismo rural (reservas, SEO, panel).
// Las rutas son las actuales; la fase 2 del plan SEO las moverá (redirigir y
// reapuntar).
const productos = [
  {
    href: "/proyectos/agente-whatsapp",
    name: "AutoClinic",
    detail: "Agenda, recordatorios automáticos y CRM para clínicas de podología",
  },
  {
    // Nombre provisional: el servicio está pendiente de bautizar.
    href: "/proyectos/web-design",
    name: "Webs con reservas",
    detail: "Web con reservas online, SEO y panel de gestión para turismo rural",
  },
  {
    href: "/proyectos/facturia",
    name: "FacturIA",
    detail: "Gestión documental automática",
  },
] as const

const subtitulo =
  "Software de gestión interna para podólogos y webs con pasarela de reservas, SEO y panel de administración propio."

/**
 * Hero con scroll coreografiado. Al entrar solo están el logo 3D, una línea
 * con el H1 y una invitación a deslizar. Al hacer scroll el escenario se queda
 * fijo: el logo se encoge hacia arriba y la frase entra por partes.
 *
 * Toda la coreografía está en globals.css (bloque "Hero escena") con
 * animaciones ligadas al scroll (animation-timeline). Sin soporte o con
 * prefers-reduced-motion, las mismas piezas se apilan en estático.
 */
export default function Hero() {
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
            Desarrollo de software e integraciones inteligentes
          </h1>

          <div aria-hidden className="escena-cue mt-8 flex-col items-center gap-3">
            <span className="text-[0.65rem] uppercase tracking-[0.35em] text-muted-foreground/70">
              Desliza
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
            <span className="escena-paso-1 block">Tu negocio,</span>
            <span className="escena-paso-2 block">en orden.</span>
          </h2>

          <p className="escena-paso-3 mt-[max(0.75rem,2.2svh)] max-w-xl text-[0.95rem] leading-relaxed text-muted-foreground text-balance md:text-lg">
            {subtitulo}
          </p>

          {/* En móvil solo el nombre: el detalle no cabe en la pantalla fija. */}
          <ul
            aria-label="Nuestros productos"
            className="escena-paso-4 mt-[max(1rem,3svh)] w-full max-w-2xl border-t border-border text-left"
          >
            {productos.map(({ href, name, detail }) => (
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
              <Link href="/#proceso">
                Ver cómo funciona
                <ArrowRightIcon className="size-4" />
              </Link>
            </TiltCtaButton>
            <Link
              href="/#contacto"
              className="text-sm font-medium text-foreground/80 underline-offset-4 transition-colors hover:text-foreground hover:underline"
            >
              Habla con nosotros
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
