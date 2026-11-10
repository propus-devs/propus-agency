import Link from "next/link"
import { ArrowRightIcon, CalendarCheckIcon, CheckIcon } from "lucide-react"
import { TiltCtaButton } from "@/components/ui/tilt-cta-button"
import RuralPropColinas from "@/components/sections/ruralprop/RuralPropColinas"

const GRANO =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")"

const puntos = ["30 minutos", "Sin compromiso", "Te damos el precio exacto en la llamada"]

/**
 * Cierre en forma de amanecer sobre el campo: cielo que pasa de la noche al
 * ámbar, sol asomando tras las colinas y la llamada en primer plano. Todo
 * estático (CSS/SVG), sin imágenes.
 */
export default function RuralPropCTA() {
  return (
    <section className="px-4 pt-12 pb-20 md:pt-16 md:pb-28">
      <div className="relative isolate mx-auto max-w-5xl overflow-hidden rounded-[2rem] border border-rural-honey/25 shadow-[0_30px_80px_-30px_rgba(230,171,74,0.35)]">
        {/* Cielo: de la noche al ámbar del amanecer */}
        <div
          aria-hidden
          className="absolute inset-0 -z-20"
          style={{
            background:
              "linear-gradient(180deg, #0d150f 0%, #15221a 34%, #3a3a1f 66%, #8a6a2c 88%, #c98f3d 100%)",
          }}
        />
        {/* Halo del sol */}
        <div
          aria-hidden
          className="absolute bottom-[-6rem] left-1/2 -z-10 h-[26rem] w-[44rem] max-w-none -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(255,214,128,0.75),rgba(230,171,74,0.28)_55%,transparent)] blur-2xl"
        />
        {/* Sol */}
        <div
          aria-hidden
          className="absolute bottom-6 left-1/2 -z-10 size-28 -translate-x-1/2 rounded-full bg-[radial-gradient(circle,#fff0c4_0%,#f7cf7d_45%,#e6ab4a_100%)] md:bottom-8 md:size-36"
        />
        {/* Estrellas sueltas, solo arriba */}
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 -z-10 h-1/2 opacity-70"
          style={{
            backgroundImage:
              "radial-gradient(1.5px 1.5px at 12% 24%, #f3eedd 50%, transparent 51%), radial-gradient(1px 1px at 27% 12%, #f3eedd 50%, transparent 51%), radial-gradient(1.5px 1.5px at 41% 30%, #f3eedd 50%, transparent 51%), radial-gradient(1px 1px at 63% 16%, #f3eedd 50%, transparent 51%), radial-gradient(1.5px 1.5px at 78% 28%, #f3eedd 50%, transparent 51%), radial-gradient(1px 1px at 90% 10%, #f3eedd 50%, transparent 51%), radial-gradient(1px 1px at 55% 6%, #f3eedd 50%, transparent 51%)",
          }}
        />
        {/* Colinas, cerradas contra el borde del panel */}
        <RuralPropColinas className="absolute inset-x-0 bottom-0 -z-10 h-40 md:h-56" />
        {/* Grano */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 opacity-[0.09] mix-blend-overlay"
          style={{ backgroundImage: GRANO }}
        />

        <div className="relative px-6 pt-14 pb-52 text-center md:px-14 md:pt-20 md:pb-72">
          <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-rural-honey/30 bg-rural-bg/60 px-4 py-1.5 text-xs font-medium text-rural-honey backdrop-blur-sm">
            <CalendarCheckIcon className="size-3.5" />
            Primera llamada
          </span>

          <h2 className="mx-auto max-w-3xl font-display-serif text-4xl font-normal leading-[1.04] tracking-tight text-rural-fg md:text-6xl">
            Que tu próxima reserva llegue <em className="italic text-rural-honey">directa a ti</em>
          </h2>

          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-rural-fg/80">
            Cuéntanos cuántos alojamientos tienes, en qué plataformas estás y qué quieres que haga
            tu web. Lo vemos juntos.
          </p>

          <div className="mt-9 flex flex-col items-center gap-5">
            <TiltCtaButton
              size="lg"
              tone="rural"
              className="h-12 gap-2 bg-rural-honey px-8 text-base font-semibold text-rural-ink hover:bg-[#f0bb62] [&_svg]:transition-transform hover:[&_svg]:translate-x-1"
              asChild
            >
              <Link href="https://calendar.app.google/CNBch8s1Q8iqoqdE9" target="_blank" rel="noopener noreferrer">
                Agendar llamada
                <ArrowRightIcon className="size-4" />
              </Link>
            </TiltCtaButton>

            <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-rural-fg/75">
              {puntos.map((punto) => (
                <li key={punto} className="flex items-center gap-1.5">
                  <CheckIcon className="size-4 text-rural-honey" />
                  {punto}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
