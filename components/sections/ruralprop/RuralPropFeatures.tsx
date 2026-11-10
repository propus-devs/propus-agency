import {
  CalendarSyncIcon,
  MailCheckIcon,
  CreditCardIcon,
  ClipboardCheckIcon,
  SearchCheckIcon,
  LayoutDashboardIcon,
  LanguagesIcon,
} from "lucide-react"
import RuralPropHeading from "@/components/sections/ruralprop/RuralPropHeading"

// Solo lo que RuralProp hace de verdad (contrastado con las webs de El Acuífero
// y El Tranquilo). Ojo con dos cosas: el registro de viajeros NO se envía solo
// a Interior (el propietario sube el fichero al portal), y la sincronización
// va por iCal, con Channel Manager como opción que ofrecemos.
const features = [
  {
    icon: CalendarSyncIcon,
    title: "Calendario centralizado",
    description:
      "Todas tus reservas en un solo calendario, sincronizado por iCal con Booking, Airbnb y otras plataformas. Si lo necesitas, también ofrecemos integración con Channel Manager.",
  },
  {
    icon: MailCheckIcon,
    title: "Reservas con avisos automáticos",
    description:
      "Cada petición de reserva te llega por correo en el momento. Tu huésped recibe su confirmación automática, sin que tengas que escribir nada.",
  },
  {
    icon: CreditCardIcon,
    title: "Pasarela de pago o aprobación manual",
    description:
      "Si quieres cobrar al reservar, la web integra Stripe con tu propia cuenta y la reserva se confirma sola cuando el huésped paga. Si prefieres decidir tú, la reserva se confirma cuando la apruebas.",
  },
  {
    icon: ClipboardCheckIcon,
    title: "Registro de viajeros para SES Hospedajes",
    description:
      "El huésped rellena sus datos en su enlace personal de check-in. Tú revisas y apruebas cada ficha en tu panel y descargas el fichero oficial ya validado para subirlo al portal de SES Hospedajes.",
  },
  {
    icon: SearchCheckIcon,
    title: "SEO y AEO",
    description:
      "Páginas rápidas, datos estructurados de alojamiento, preguntas frecuentes y un blog con redactor asistido por IA. Pensada también para que los buscadores con IA entiendan y puedan recomendar tu alojamiento.",
  },
  {
    icon: LayoutDashboardIcon,
    title: "Panel de gestión propio",
    description:
      "Calendario, disponibilidad, precios, estadísticas de reservas y blog, desde un panel hecho para tu alojamiento.",
  },
]

export default function RuralPropFeatures() {
  return (
    <section id="funciones" className="scroll-mt-24 px-4 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <RuralPropHeading
          eyebrow="Lo que incluye"
          description="Una web tuya, sin depender de un portal para que te encuentren y te reserven."
        >
          Todo lo que necesita tu alojamiento para <em>recibir reservas directas</em>
        </RuralPropHeading>

        <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {features.map((item, index) => (
            <li
              key={item.title}
              className="group relative flex flex-col rounded-2xl border border-rural-line bg-rural-card/80 p-6 backdrop-blur-sm transition-[border-color,transform,box-shadow] duration-200 ease-out hover:-translate-y-px hover:border-rural-honey/40 hover:shadow-lg hover:shadow-rural-honey/5 motion-reduce:hover:translate-y-0"
            >
              <span
                aria-hidden
                className="absolute top-5 right-6 font-display-serif text-3xl italic text-rural-moss/25 select-none"
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="mb-5 flex size-11 items-center justify-center rounded-full border border-rural-honey/30 bg-rural-honey/10 text-rural-honey transition-colors duration-200 group-hover:bg-rural-honey/20">
                <item.icon className="size-5" />
              </span>
              <h3 className="mb-2 font-display-serif text-2xl font-normal leading-tight text-rural-fg">
                {item.title}
              </h3>
              <p className="text-sm leading-relaxed text-rural-muted">{item.description}</p>
            </li>
          ))}
        </ul>

        <p className="mt-10 flex items-center justify-center gap-2 text-sm text-rural-muted">
          <LanguagesIcon className="size-4 text-rural-honey" />
          Tu web, en español e inglés.
        </p>
      </div>
    </section>
  )
}
