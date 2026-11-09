"use client"

import Link from "next/link"
import { useState } from "react"
import { ArrowUpRight } from "lucide-react"
import LanyardRail, { type LanyardItem } from "@/components/ui/lanyard-rail"
import { useInView } from "@/lib/use-in-view"
import { cn } from "@/lib/utils"

type Caso = {
  id: string
  /** Texto de la etiqueta del panel de detalle. */
  sector: string
  /** Tarjeta colgante: nombre, rubro y línea en versalitas. */
  nombre: string
  rubro: string
  etiqueta: string
  /** Reverso de la tarjeta: una frase corta (máx. ~75 caracteres) y hasta 3 chips. */
  resumen: string
  tags: string[]
  imagen: string
  url: string
  href: string
  problema: string
  solucion: string
  resultado: string
}

const cases: Caso[] = [
  {
    id: "el-rincon-de-hector",
    sector: "Restaurante · El Rincón de Héctor",
    nombre: "El Rincón de Héctor",
    rubro: "Restaurante",
    etiqueta: "Web a medida",
    resumen: "Imagen de alto standing y visitantes extranjeros que llegan desde Google.",
    tags: ["A medida", "SEO", "Carta"],
    imagen: "/img/landings/erdh-hero2.png",
    url: "elrincondehector.com",
    href: "/proyectos/web-design#el-rincon-de-hector",
    problema:
      "Contaba con una web obsoleta construida en Wix que únicamente mostraba la carta, sin actualizar y con una imagen que no hacía justicia al nivel real del restaurante.",
    solucion:
      "Página web diseñada completamente a medida, con una estética elegante y diferenciadora, carta renovada y arquitectura preparada para escalar a una web app de pedidos.",
    resultado:
      "Los clientes perciben el restaurante como un local de alto standing. Gracias al SEO integrado, los visitantes extranjeros encuentran la web en las primeras posiciones del buscador.",
  },
  {
    id: "casino-el-bonillo",
    sector: "Restaurante · Casino El Bonillo",
    nombre: "Casino El Bonillo",
    rubro: "Bar-restaurante",
    etiqueta: "Web + reservas",
    resumen: "Reservas desde el primer día y un flujo constante de reseñas positivas.",
    tags: ["Reservas", "SEO", "Reseñas"],
    imagen: "/img/landings/hero-casino.png",
    url: "casinoelbonillo.com",
    href: "/proyectos/web-design#casino-el-bonillo",
    problema:
      "El bar-restaurante más céntrico del pueblo no tenía web propia, perdiendo visibilidad y reservas online.",
    solucion:
      "Web profesional con carta cuidada, SEO básico, formulario de reservas y un pop-up que dirige a Google Maps para captar reseñas.",
    resultado:
      "Reservas entrando desde el primer día y un flujo constante de nuevas valoraciones positivas que refuerzan su reputación.",
  },
  {
    id: "lio-el-bonillo",
    sector: "Ocio nocturno · Lío El Bonillo",
    nombre: "Lío El Bonillo",
    rubro: "Ocio nocturno",
    etiqueta: "Web + web app",
    resumen: "Web de fiestas con app de fotos y premios; el tráfico crece cada semana.",
    tags: ["Web app", "Eventos", "Google Maps"],
    imagen: "/img/landings/hero-lio-mobile.png",
    url: "liopub.com",
    href: "/proyectos/web-design#lio-el-bonillo",
    problema:
      "El disco pub referente de la zona no aparecía ni en Google Maps y carecía de canal para promocionar sus fiestas.",
    solucion:
      "Web vistosa para sus eventos + web app donde los asistentes suben fotos cada finde, votan y ganan premios semanales. Creamos también su ficha de Google.",
    resultado:
      "Tráfico creciendo de forma exponencial cada semana y una comunidad activa que llena las fiestas.",
  },
  {
    id: "cabanas-el-acuifero",
    sector: "Turismo rural · Cabañas El Acuífero",
    nombre: "Cabañas El Acuífero",
    rubro: "Turismo rural",
    etiqueta: "Portal reservas",
    resumen: "De la agenda telefónica a su propia pasarela de reservas online.",
    tags: ["Reservas", "Panel admin", "SEO y AEO"],
    imagen: "/img/landings/acuiferohero.png",
    url: "elacuifero.es",
    href: "/proyectos/web-design#cabanas-el-acuifero",
    problema:
      "José gestionaba las reservas de sus seis cabañas en la carretera de Ruidera únicamente por teléfono y boca a boca, sin web ni calendario: dependía de conocidos y anotaba las fechas a mano.",
    solucion:
      "Portal de reservas propio con panel de administración para autogestionar el blog y una app de calendario que le construimos dentro del panel, vinculada a la web para controlar disponibilidad y fechas. Todo con SEO y AEO trabajados.",
    resultado:
      "Pasa de la agenda telefónica a su propia pasarela de reservas abierta a cualquier viajero, y empieza a aparecer como recomendación de alojamiento en Ruidera cuando se pregunta a los asistentes de IA.",
  },
  {
    id: "golosea",
    sector: "Golosinas y snacks · Golosea",
    nombre: "Golosea",
    rubro: "Golosinas y snacks",
    etiqueta: "Landing + IA",
    resumen: "Landing con agente de IA que capta clientes en los días clave.",
    tags: ["Agente IA", "Reservas", "Festivos"],
    imagen: "/img/landings/golosea-hero2.png",
    url: "golosea.com",
    href: "/proyectos/web-design#golosea",
    problema:
      "Arrastraba una web del Kit Digital pobre, mal estructurada, con exceso de texto y reseñas falsas.",
    solucion:
      "La convertimos en una landing potente con agente de IA, formulario de reserva de cucuruchos para cumpleaños, sección de festivos y contador de visitas público.",
    resultado:
      "Capta clientes en los días clave del calendario y luce como la mejor web de golosinas de la comarca.",
  },
]

// Fuera del componente para que la referencia sea estable (el carril recalcula
// su geometría cuando cambia `items`).
const items: LanyardItem[] = cases.map((c, i) => ({
  id: c.id,
  name: c.nombre,
  role: c.rubro,
  team: c.etiqueta,
  tone: ((i % 5) + 1) as LanyardItem["tone"],
  image: c.imagen,
  bio: c.resumen,
  tags: c.tags,
  links: [{ label: "Ver caso", href: c.href }],
}))

export default function CaseStudies() {
  const [active, setActive] = useState<number | null>(null)
  const [flipped, setFlipped] = useState<number | null>(null)
  // Caso cuyo detalle se muestra: el último que se ha tocado/pasado por encima.
  const [shown, setShown] = useState(0)
  // La animación automática arranca la primera vez que la sección se ve y no se
  // reinicia después (en cuanto el visitante interactúa, el carril la detiene).
  const [started, setStarted] = useState(false)
  const [ref, inView] = useInView<HTMLDivElement>("-15% 0px")
  if (inView && !started) setStarted(true)

  function alCambiarActiva(index: number | null) {
    setActive(index)
    if (index !== null) setShown(index)
  }

  function alCambiarGirada(index: number | null) {
    setFlipped(index)
    if (index !== null) setShown(index)
  }

  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      {/* Glow decorativo de fondo */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-40 -z-0 h-[500px] w-[900px] max-w-full -translate-x-1/2 rounded-full opacity-60 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, hsl(168 80% 45% / 0.10), transparent 65%)",
        }}
      />

      {/* El ancla va en la cabecera y no en la sección: así, al venir de
          «Resultados» en el menú, el navegador deja la cabecera justo bajo la
          barra (80 px de scroll-padding global + 12 px) en vez de dejarla
          ~190 px más abajo por culpa del padding de la sección, y el carril
          entra entero en pantalla. */}
      <div
        id="resultados"
        className="relative mx-auto max-w-5xl scroll-mt-3 px-4"
      >
        {/* Cabecera */}
        <div className="mb-2 flex flex-col items-center gap-4 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-teal/30 bg-brand-teal/10 px-4 py-1.5 text-xs font-medium text-brand-teal">
            Resultados
          </span>
          <h2 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">
            Clientes que ya{" "}
            <span className="bg-linear-to-r from-brand-sky to-brand-teal bg-clip-text text-transparent">
              confían en nosotros
            </span>
          </h2>
          <p className="mx-auto max-w-3xl text-balance text-slate-400">
            Empresas que ya trabajan con Propus y han transformado su presencia
            digital en semanas.
          </p>
        </div>
      </div>

      <div ref={ref} className="relative">
        {/* Carril de tarjetas: en escritorio caben todas; en móvil, una al centro y las vecinas a los lados */}
        <LanyardRail
          items={items}
          label="Casos de clientes de Propus"
          caption="Elige una tarjeta para ver el caso completo."
          showName={false}
          autoplay={started}
          interval={3600}
          active={active}
          onActiveChange={alCambiarActiva}
          flipped={flipped}
          onFlippedChange={alCambiarGirada}
        />

        {/* Detalle legible del caso elegido. Todos comparten celda para que la
            altura sea la del más largo y no haya saltos al cambiar de caso. */}
        <div className="relative mx-auto grid max-w-5xl px-4">
          {cases.map((c, i) => (
            <article
              key={c.id}
              aria-hidden={i !== shown}
              inert={i !== shown}
              className={cn(
                "col-start-1 row-start-1 transition-opacity duration-300 motion-reduce:transition-none",
                i === shown ? "opacity-100" : "pointer-events-none opacity-0"
              )}
            >
              <Detalle c={c} />
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function Detalle({ c }: { c: Caso }) {
  return (
    <div
      className={cn(
        "flex h-full flex-col gap-6 rounded-2xl p-6 md:p-8",
        "border border-white/10 bg-gradient-to-b from-slate-900/90 to-slate-950/95",
        "shadow-xl shadow-black/40 ring-1 ring-white/5"
      )}
    >
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
          <span className="inline-flex w-fit items-center rounded-full border border-brand-teal/40 bg-brand-teal/10 px-3 py-1 text-xs font-medium text-brand-teal">
            {c.sector}
          </span>
          <span className="font-mono text-xs text-slate-500">{c.url}</span>
        </div>
        <Link
          href={c.href}
          className="group inline-flex items-center gap-1.5 text-sm font-semibold text-brand-teal"
        >
          Ver caso
          <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-3 md:gap-8">
        <Paso
          label="Problema"
          color="text-red-400"
          barra="border-red-400/40"
          text={c.problema}
        />
        <Paso
          label="Solución"
          color="text-brand-sky"
          barra="border-brand-sky/40"
          text={c.solucion}
        />
        <Paso
          label="Resultado"
          color="text-brand-teal"
          barra="border-brand-teal/60"
          text={c.resultado}
          highlight
        />
      </div>
    </div>
  )
}

function Paso({
  label,
  color,
  barra,
  text,
  highlight,
}: {
  label: string
  color: string
  barra: string
  text: string
  highlight?: boolean
}) {
  return (
    <div className={cn("flex flex-col gap-2 border-t-2 pt-3", barra)}>
      <span
        className={cn("text-xs font-semibold uppercase tracking-wide", color)}
      >
        {label}
      </span>
      <p
        className={cn(
          "text-sm leading-relaxed md:text-[0.9375rem]",
          highlight ? "font-semibold text-white" : "text-slate-300"
        )}
      >
        {text}
      </p>
    </div>
  )
}
