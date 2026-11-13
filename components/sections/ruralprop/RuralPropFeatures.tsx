import type { ReactNode } from "react"
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
import type { Lang } from "@/lib/i18n/idiomas"

const iconos = [
  CalendarSyncIcon,
  MailCheckIcon,
  CreditCardIcon,
  ClipboardCheckIcon,
  SearchCheckIcon,
  LayoutDashboardIcon,
]

interface Funcion {
  title: string
  description: string
}

interface Textos {
  etiqueta: string
  descripcion: string
  titulo: ReactNode
  // Solo lo que RuralProp hace de verdad (contrastado con las webs de El Acuífero
  // y El Tranquilo). Ojo con dos cosas: el registro de viajeros NO se envía solo
  // a Interior (el propietario sube el fichero al portal), y la sincronización
  // va por iCal, con Channel Manager como opción que ofrecemos.
  funciones: [Funcion, Funcion, Funcion, Funcion, Funcion, Funcion]
  idiomas: string
}

const textos: Record<Lang, Textos> = {
  es: {
    etiqueta: "Lo que incluye",
    descripcion: "Una web tuya, sin depender de un portal para que te encuentren y te reserven.",
    titulo: (
      <>
        Todo lo que necesita tu alojamiento para <em>recibir reservas directas</em>
      </>
    ),
    funciones: [
      {
        title: "Calendario centralizado",
        description:
          "Todas tus reservas en un solo calendario, sincronizado por iCal con Booking, Airbnb y otras plataformas. Si lo necesitas, también ofrecemos integración con Channel Manager.",
      },
      {
        title: "Reservas con avisos automáticos",
        description:
          "Cada petición de reserva te llega por correo en el momento. Tu huésped recibe su confirmación automática, sin que tengas que escribir nada.",
      },
      {
        title: "Pasarela de pago o aprobación manual",
        description:
          "Si quieres cobrar al reservar, la web integra Stripe con tu propia cuenta y la reserva se confirma sola cuando el huésped paga. Si prefieres decidir tú, la reserva se confirma cuando la apruebas.",
      },
      {
        title: "Registro de viajeros para SES Hospedajes",
        description:
          "El huésped rellena sus datos en su enlace personal de check-in. Tú revisas y apruebas cada ficha en tu panel y descargas el fichero oficial ya validado para subirlo al portal de SES Hospedajes.",
      },
      {
        title: "SEO y AEO",
        description:
          "Páginas rápidas, datos estructurados de alojamiento, preguntas frecuentes y un blog con redactor asistido por IA. Pensada también para que los buscadores con IA entiendan y puedan recomendar tu alojamiento.",
      },
      {
        title: "Panel de gestión propio",
        description:
          "Calendario, disponibilidad, precios, estadísticas de reservas y blog, desde un panel hecho para tu alojamiento.",
      },
    ],
    idiomas: "Tu web, en español e inglés.",
  },
  en: {
    etiqueta: "What's included",
    descripcion:
      "A website of your own, without depending on a portal for people to find you and book.",
    titulo: (
      <>
        Everything your accommodation needs to <em>receive direct bookings</em>
      </>
    ),
    funciones: [
      {
        title: "Centralized calendar",
        description:
          "All your bookings in a single calendar, synced via iCal with Booking, Airbnb and other platforms. If you need it, we also offer Channel Manager integration.",
      },
      {
        title: "Bookings with automatic notifications",
        description:
          "Each booking request reaches you by email right away. Your guest receives an automatic confirmation, without you having to write anything.",
      },
      {
        title: "Payment gateway or manual approval",
        description:
          "If you want to charge at booking, the website integrates Stripe with your own account and the booking is confirmed automatically when the guest pays. If you prefer to decide yourself, the booking is confirmed when you approve it.",
      },
      {
        title: "Guest registration for SES Hospedajes",
        description:
          "The guest fills in their details through their personal check-in link. You review and approve each record in your panel and download the validated official file to upload to the SES Hospedajes portal (Spain's official guest registry).",
      },
      {
        title: "SEO and AEO",
        description:
          "Fast pages, structured accommodation data, frequently asked questions and a blog with an AI-assisted writer. Also designed so that AI search engines can understand and recommend your accommodation.",
      },
      {
        title: "Your own management panel",
        description:
          "Calendar, availability, prices, booking statistics and blog, from a panel built for your accommodation.",
      },
    ],
    idiomas: "Your website, in Spanish and English.",
  },
}

export default function RuralPropFeatures({ lang = "es" }: { lang?: Lang }) {
  const t = textos[lang]

  return (
    <section id="funciones" className="scroll-mt-24 px-4 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <RuralPropHeading eyebrow={t.etiqueta} description={t.descripcion}>
          {t.titulo}
        </RuralPropHeading>

        <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {t.funciones.map((item, index) => {
            const Icon = iconos[index]
            return (
              <li
                key={index}
                className="group relative flex flex-col rounded-2xl border border-rural-line bg-rural-card/80 p-6 backdrop-blur-sm transition-[border-color,transform,box-shadow] duration-200 ease-out hover:-translate-y-px hover:border-rural-honey/40 hover:shadow-lg hover:shadow-rural-honey/5 motion-reduce:hover:translate-y-0"
              >
                <span
                  aria-hidden
                  className="absolute top-5 right-6 font-display-serif text-3xl italic text-rural-moss/25 select-none"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="mb-5 flex size-11 items-center justify-center rounded-full border border-rural-honey/30 bg-rural-honey/10 text-rural-honey transition-colors duration-200 group-hover:bg-rural-honey/20">
                  <Icon className="size-5" />
                </span>
                <h3 className="mb-2 font-display-serif text-2xl font-normal leading-tight text-rural-fg">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-rural-muted">{item.description}</p>
              </li>
            )
          })}
        </ul>

        <p className="mt-10 flex items-center justify-center gap-2 text-sm text-rural-muted">
          <LanguagesIcon className="size-4 text-rural-honey" />
          {t.idiomas}
        </p>
      </div>
    </section>
  )
}
