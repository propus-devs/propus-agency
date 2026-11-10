import Link from "next/link"
import { ArrowUpRightIcon } from "lucide-react"
import RuralPropHeading from "@/components/sections/ruralprop/RuralPropHeading"

// El Tranquilo se nombra sin enlace: su web aún no está publicada con dominio.
// Cuando lo esté, añadir `url` y `domain`. Sin datos personales de propietarios.
const clients = [
  {
    name: "Cabañas El Acuífero",
    place: "Lagunas de Ruidera",
    description:
      "Seis cabañas con reserva directa, panel con calendario y blog que gestiona el propio propietario. Las peticiones de reserva le llegan directamente y las gestiona él.",
    url: "https://elacuifero.es",
    domain: "elacuifero.es",
    status: null,
    giro: "md:-rotate-1",
  },
  {
    name: "El Tranquilo",
    place: "Alcalá del Júcar",
    description:
      "Casa cueva con calendario con precio por noche, pago online con Stripe, sincronización con Booking por iCal (con paso a Channel Manager próximamente) y registro de viajeros para SES Hospedajes.",
    url: null,
    domain: null,
    status: "En desarrollo",
    giro: "md:rotate-1",
  },
]

/** Cada cliente va en una "postal" de papel crema, ligeramente girada en pantallas anchas. */
export default function RuralPropClients() {
  return (
    <section className="px-4 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <RuralPropHeading eyebrow="Casos reales">
          Ya funciona en <em>alojamientos reales</em>
        </RuralPropHeading>

        <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-2 md:gap-10">
          {clients.map((client) => (
            <div
              key={client.name}
              className={`relative flex flex-col gap-4 rounded-sm bg-rural-paper p-7 text-rural-ink shadow-[0_18px_40px_-18px_rgba(0,0,0,0.7)] transition-transform duration-300 ease-out md:hover:rotate-0 motion-reduce:transition-none ${client.giro}`}
            >
              {/* Borde de postal: filete interior discontinuo */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-2 rounded-[1px] border border-dashed border-rural-ink/20"
              />

              <div className="relative flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-display-serif text-3xl font-normal leading-tight">
                    {client.name}
                  </h3>
                  <p className="mt-1 text-sm font-medium tracking-wide text-rural-ink/65">
                    {client.place}
                  </p>
                </div>
                {client.status && (
                  <span className="shrink-0 -rotate-6 rounded-sm border-2 border-rural-clay/80 px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-widest text-[#9c4a26]">
                    {client.status}
                  </span>
                )}
              </div>

              <p className="relative text-sm leading-relaxed text-rural-ink/80">
                {client.description}
              </p>

              {client.url && (
                <Link
                  href={client.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative mt-auto inline-flex items-center gap-1.5 text-sm font-semibold text-[#9c4a26] underline-offset-4 transition-colors hover:text-rural-ink hover:underline"
                >
                  {client.domain}
                  <ArrowUpRightIcon className="size-4" />
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
