import Link from "next/link"
import {
  ArrowUpRightIcon,
  CalendarClockIcon,
  FileTextIcon,
  LayoutTemplateIcon,
  TreePineIcon,
} from "lucide-react"
import { ruta, type Lang, type PaginaClave } from "@/lib/i18n/idiomas"

// Cada servicio con su color de marca (el mismo que usa su página). Las clases
// van escritas enteras para que Tailwind las detecte. Lo que no es texto va
// aquí; los textos, por idioma, más abajo.
const servicios = [
  {
    clave: "autoclinic",
    icon: CalendarClockIcon,
    icono: "bg-brand-spring/12 text-brand-spring",
    tarjeta: "hover:border-brand-spring/40 hover:shadow-brand-spring/15",
    enlace: "group-hover:text-brand-spring",
  },
  {
    clave: "ruralprop",
    icon: TreePineIcon,
    // La miel de la página de RuralProp no se lee sobre fondo claro: aquí va
    // su versión profunda (ámbar 700).
    icono: "bg-amber-600/15 text-amber-700",
    tarjeta: "hover:border-amber-600/40 hover:shadow-amber-600/15",
    enlace: "group-hover:text-amber-700",
  },
  {
    clave: "disenoWeb",
    icon: LayoutTemplateIcon,
    icono: "bg-brand-sky/12 text-brand-sky",
    tarjeta: "hover:border-brand-sky/40 hover:shadow-brand-sky/15",
    enlace: "group-hover:text-brand-sky",
  },
  {
    clave: "facturia",
    icon: FileTextIcon,
    icono: "bg-facturia/15 text-facturia-dark",
    tarjeta: "hover:border-facturia-dark/40 hover:shadow-facturia-dark/15",
    enlace: "group-hover:text-facturia-dark",
  },
] as const satisfies readonly { clave: PaginaClave; [k: string]: unknown }[]

type ClaveServicio = (typeof servicios)[number]["clave"]

interface Textos {
  titulo: [string, string]
  subtitulo: string
  ver: string
  items: Record<ClaveServicio, { name: string; tag: string; description: string }>
}

const textos: Record<Lang, Textos> = {
  es: {
    titulo: ["Lo que hacemos ", "por tu negocio"],
    subtitulo: "Cuatro servicios. Entra en el que encaje contigo y mira cómo funciona.",
    ver: "Ver el servicio",
    items: {
      autoclinic: {
        name: "AutoClinic",
        tag: "Para clínicas de podología",
        description:
          "Un agente IA en WhatsApp que atiende a tus pacientes 24/7, gestiona las citas y envía los recordatorios, sin cambiar cómo trabajas hoy.",
      },
      ruralprop: {
        name: "RuralProp",
        tag: "Para turismo rural",
        description:
          "Web con reservas directas para casas rurales y cabañas: calendario centralizado, pago online, registro de viajeros y SEO.",
      },
      disenoWeb: {
        name: "Diseño web a medida",
        tag: "Para cualquier negocio",
        description:
          "Diseñamos y desarrollamos tu web: diseño moderno, optimizada para SEO y preparada para crecer contigo. Sin plantillas genéricas.",
      },
      facturia: {
        name: "FacturIA",
        tag: "Gestión documental",
        description:
          "Sube una imagen o un PDF y obtén tus documentos procesados y clasificados, con extracción de datos y métricas para controlar tu empresa.",
      },
    },
  },
  en: {
    titulo: ["What we do ", "for your business"],
    subtitulo: "Four services. Pick the one that fits you and see how it works.",
    ver: "See the service",
    items: {
      autoclinic: {
        name: "AutoClinic",
        tag: "For podiatry clinics",
        description:
          "An AI agent on WhatsApp that looks after your patients 24/7, manages appointments and sends reminders, without changing how you work today.",
      },
      ruralprop: {
        name: "RuralProp",
        tag: "For rural tourism",
        description:
          "A website with direct bookings for country houses and cabins: centralized calendar, online payment, guest registration and SEO.",
      },
      disenoWeb: {
        name: "Custom web design",
        tag: "For any business",
        description:
          "We design and build your website: modern design, optimized for SEO and ready to grow with you. No generic templates.",
      },
      facturia: {
        name: "FacturIA",
        tag: "Document management",
        description:
          "Upload an image or a PDF and get your documents processed and sorted, with data extraction and metrics to keep your company under control.",
      },
    },
  },
}

/**
 * Sustituye a los tres bloques largos de la portada (WhatsApp, web y
 * documentos): una tarjeta corta por servicio que lleva a su página.
 */
export default function Services({ lang = "es" }: { lang?: Lang }) {
  const t = textos[lang]

  return (
    <section id="servicios" className="py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight md:text-5xl">
            {t.titulo[0]}
            <span className="bg-linear-to-r from-brand-green to-brand-teal bg-clip-text text-transparent">
              {t.titulo[1]}
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">{t.subtitulo}</p>
        </div>

        <ul className="grid gap-6 md:grid-cols-2">
          {servicios.map((servicio) => {
            const item = t.items[servicio.clave]
            return (
              <li key={servicio.clave}>
                <Link
                  href={ruta(servicio.clave, lang)}
                  className={`vidrio group flex h-full flex-col gap-4 rounded-2xl border p-7 backdrop-blur-sm transition-[border-color,transform,box-shadow] duration-200 ease-out hover:-translate-y-px hover:shadow-lg motion-reduce:hover:translate-y-0 ${servicio.tarjeta}`}
                >
                  <div className="flex items-center gap-4">
                    <span
                      className={`flex size-12 shrink-0 items-center justify-center rounded-xl ${servicio.icono}`}
                    >
                      <servicio.icon className="size-6" />
                    </span>
                    <div>
                      <h3 className="text-xl font-semibold leading-tight">{item.name}</h3>
                      <p className="text-sm text-muted-foreground">{item.tag}</p>
                    </div>
                  </div>

                  <p className="leading-relaxed text-muted-foreground">{item.description}</p>

                  <span
                    className={`mt-auto inline-flex items-center gap-1.5 text-sm font-semibold text-foreground transition-colors ${servicio.enlace}`}
                  >
                    {t.ver}
                    <ArrowUpRightIcon className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </span>
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
