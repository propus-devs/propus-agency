import Link from "next/link"
import {
  ArrowUpRightIcon,
  CalendarClockIcon,
  FileTextIcon,
  LayoutTemplateIcon,
  TreePineIcon,
} from "lucide-react"

// Cada servicio con su color de marca (el mismo que usa su página). Las clases
// van escritas enteras para que Tailwind las detecte.
const servicios = [
  {
    href: "/servicios/autoclinic",
    icon: CalendarClockIcon,
    name: "AutoClinic",
    tag: "Para clínicas de podología",
    description:
      "Un agente IA en WhatsApp que atiende a tus pacientes 24/7, gestiona las citas y envía los recordatorios, sin cambiar cómo trabajas hoy.",
    icono: "bg-brand-spring/10 text-brand-spring",
    tarjeta: "hover:border-brand-spring/40 hover:shadow-brand-spring/10",
    enlace: "group-hover:text-brand-spring",
  },
  {
    href: "/servicios/ruralprop",
    icon: TreePineIcon,
    name: "RuralProp",
    tag: "Para turismo rural",
    description:
      "Web con reservas directas para casas rurales y cabañas: calendario centralizado, pago online, registro de viajeros y SEO.",
    icono: "bg-rural-honey/10 text-rural-honey",
    tarjeta: "hover:border-rural-honey/40 hover:shadow-rural-honey/10",
    enlace: "group-hover:text-rural-honey",
  },
  {
    href: "/servicios/diseno-web-a-medida",
    icon: LayoutTemplateIcon,
    name: "Diseño web a medida",
    tag: "Para cualquier negocio",
    description:
      "Diseñamos y desarrollamos tu web: diseño moderno, optimizada para SEO y preparada para crecer contigo. Sin plantillas genéricas.",
    icono: "bg-brand-sky/10 text-brand-sky",
    tarjeta: "hover:border-brand-sky/40 hover:shadow-brand-sky/10",
    enlace: "group-hover:text-brand-sky",
  },
  {
    href: "/servicios/facturia",
    icon: FileTextIcon,
    name: "FacturIA",
    tag: "Gestión documental",
    description:
      "Sube una imagen o un PDF y obtén tus documentos procesados y clasificados, con extracción de datos y métricas para controlar tu empresa.",
    icono: "bg-facturia/10 text-facturia",
    tarjeta: "hover:border-facturia/40 hover:shadow-facturia/10",
    enlace: "group-hover:text-facturia",
  },
] as const

/**
 * Sustituye a los tres bloques largos de la portada (WhatsApp, web y
 * documentos): una tarjeta corta por servicio que lleva a su página.
 */
export default function Services() {
  return (
    <section id="servicios" className="py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight md:text-5xl">
            Lo que hacemos{" "}
            <span className="bg-linear-to-r from-brand-green to-brand-teal bg-clip-text text-transparent">
              por tu negocio
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Cuatro servicios. Entra en el que encaje contigo y mira cómo funciona.
          </p>
        </div>

        <ul className="grid gap-6 md:grid-cols-2">
          {servicios.map((servicio) => (
            <li key={servicio.href}>
              <Link
                href={servicio.href}
                className={`group flex h-full flex-col gap-4 rounded-2xl border border-border bg-card/60 p-7 backdrop-blur-sm transition-[border-color,transform,box-shadow] duration-200 ease-out hover:-translate-y-px hover:shadow-lg motion-reduce:hover:translate-y-0 ${servicio.tarjeta}`}
              >
                <div className="flex items-center gap-4">
                  <span
                    className={`flex size-12 shrink-0 items-center justify-center rounded-xl ${servicio.icono}`}
                  >
                    <servicio.icon className="size-6" />
                  </span>
                  <div>
                    <h3 className="text-xl font-semibold leading-tight">{servicio.name}</h3>
                    <p className="text-sm text-muted-foreground">{servicio.tag}</p>
                  </div>
                </div>

                <p className="leading-relaxed text-muted-foreground">{servicio.description}</p>

                <span
                  className={`mt-auto inline-flex items-center gap-1.5 text-sm font-semibold text-foreground transition-colors ${servicio.enlace}`}
                >
                  Ver el servicio
                  <ArrowUpRightIcon className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
