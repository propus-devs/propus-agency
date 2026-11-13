"use client"

import Image from "next/image"
import { useCallback, useEffect, useState } from "react"
import {
  SunIcon,
  MoonIcon,
  MaximizeIcon,
  XIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronDownIcon,
} from "lucide-react"
import { cn } from "@/lib/utils"
import type { Lang } from "@/lib/i18n/idiomas"

type Tema = "claro" | "oscuro"

interface Pantalla {
  /** Base del fichero en /img/autoclinic; se le añade -claro o -oscuro */
  id: string
  title: string
  description: string
  /** URL real de la pantalla en autoclinic.space, para la barra del navegador */
  url: string
}

/**
 * Las ocho visibles. El orden no es alfabético ni por importancia: está
 * escrito para que la rejilla de dos columnas caiga en estas filas,
 *
 *   Panel de control | Agenda
 *   Citas            | Pacientes
 *   Agente WhatsApp  | Chats
 *   Servicios        | Facturación
 *
 * así que mover una sola entrada descoloca su fila entera. Ocho son cuatro
 * filas exactas, sin tarjeta huérfana al final. Las de configuración quedan
 * tras un desplegable para no convertir la página en una galería de doce
 * capturas.
 */
const DESTACADAS = [
  { id: "panel", url: "autoclinic.space" },
  { id: "agenda", url: "autoclinic.space/appointments" },
  { id: "citas", url: "autoclinic.space/appointments/list" },
  { id: "pacientes", url: "autoclinic.space/patients" },
  { id: "agente", url: "autoclinic.space/clinic/integraciones" },
  { id: "chats", url: "autoclinic.space/chats" },
  { id: "servicios", url: "autoclinic.space/services" },
  { id: "facturacion", url: "autoclinic.space/facturacion" },
] as const

const CONFIGURACION = [
  { id: "profesionales", url: "autoclinic.space/appointments/professionals" },
  { id: "clinica", url: "autoclinic.space/clinic/info" },
  { id: "base-conocimiento", url: "autoclinic.space/knowledge" },
  { id: "mi-cuenta", url: "autoclinic.space/cuenta" },
] as const

type IdPantalla = (typeof DESTACADAS)[number]["id"] | (typeof CONFIGURACION)[number]["id"]

interface Textos {
  etiqueta: string
  titulo: [string, string]
  descripcion: string
  /** Las funciones reciben el nombre ya traducido del modo (claro/oscuro, light/dark) */
  invitacion: (nombre: string) => string
  nombreTema: Record<Tema, string>
  conmutadorAria: (nombre: string) => string
  verConfiguracion: (n: number) => string
  ocultarConfiguracion: string
  ampliarAria: (titulo: string) => string
  ampliar: string
  visorAria: (titulo: string) => string
  anterior: string
  siguiente: string
  cerrar: string
  modo: (nombre: string) => string
  verEstaCaptura: (nombre: string) => string
  pantallas: Record<IdPantalla, { title: string; description: string }>
}

const textos: Record<Lang, Textos> = {
  es: {
    etiqueta: "El agente en acción",
    titulo: ["Tú controlas, ", "el agente ejecuta"],
    descripcion:
      "Detrás del agente hay un programa de gestión completo: agenda, historia clínica y facturación. Estas son sus pantallas reales.",
    invitacion: (nombre) => `Échale un ojo a nuestro modo ${nombre}`,
    nombreTema: { claro: "claro", oscuro: "oscuro" },
    conmutadorAria: (nombre) => `Ver las capturas en modo ${nombre}`,
    verConfiguracion: (n) => `Ver las ${n} pantallas de configuración`,
    ocultarConfiguracion: "Ocultar las pantallas de configuración",
    ampliarAria: (titulo) => `Ampliar la captura de ${titulo}`,
    ampliar: "Ampliar",
    visorAria: (titulo) => `Captura ampliada: ${titulo}`,
    anterior: "Captura anterior",
    siguiente: "Captura siguiente",
    cerrar: "Cerrar la vista ampliada",
    modo: (nombre) => `Modo ${nombre}`,
    verEstaCaptura: (nombre) => `Ver esta captura en modo ${nombre}`,
    pantallas: {
      panel: {
        title: "Panel de control",
        description:
          "Lo que pasa hoy y lo que se ha cobrado este mes: las citas del día con su estado, la actividad de la clínica y el bloque económico, que distingue lo facturado, lo cobrado y el trabajo hecho que aún no se ha facturado.",
      },
      agenda: {
        title: "Agenda",
        description:
          "La semana completa sobre el horario real de cada profesional. Admite jornada partida y ausencias, y las citas que se solapan se reparten en columnas en vez de taparse entre ellas.",
      },
      citas: {
        title: "Citas",
        description:
          "El listado completo, filtrable por fecha y estado. Cada cita guarda su recorrido —quién cambió qué y cuándo— y de dónde vino: del panel, del agente o de la reserva pública.",
      },
      pacientes: {
        title: "Pacientes",
        description:
          "El directorio de la clínica, con búsqueda por nombre, correo o teléfono. Los números se normalizan al dar de alta, así que el mismo teléfono escrito de tres formas no genera tres fichas. Cada alta abre su historia clínica.",
      },
      agente: {
        title: "Agente de WhatsApp",
        description:
          "La configuración del número y, sobre todo, el chat de pruebas: hablas con el agente desde el propio panel, sin gastar mensajes ni molestar a nadie, para comprobar qué contesta antes de ponerlo delante de pacientes.",
      },
      chats: {
        title: "Chats",
        description:
          "Al conectar tu número a la API de WhatsApp, deja de funcionar en la aplicación del móvil. Esta bandeja te lo devuelve, con el color distinguiendo qué contestó el agente y qué contestó una persona del equipo.",
      },
      servicios: {
        title: "Servicios",
        description:
          "El catálogo que el agente consulta para responder precios y calcular cuánto hueco ocupa cada cita. La duración y el precio pueden ser fijos o variables; si la duración varía, la agenda reserva el máximo.",
      },
      facturacion: {
        title: "Facturación",
        description:
          "Del tratamiento a la factura sin teclear dos veces. Los procedimientos quedan pendientes de facturar, se agrupan en un borrador y al emitirlo toma número de la serie y se cierra. Una factura emitida no se corrige: se anula y se emite otra.",
      },
      profesionales: {
        title: "Profesionales",
        description:
          "Quién trabaja, cuándo y en qué: horario semanal por tramos, ausencias y servicios que presta cada uno. Es lo que alimenta el calendario y los huecos que el agente puede ofrecer.",
      },
      clinica: {
        title: "Clínica",
        description:
          "Los datos que el agente da cuando se los piden: dirección, contacto y zona horaria. Aquí se fija también cuánto se guarda el hueco de una cita que el agente ha reservado y el equipo aún no ha validado.",
      },
      "base-conocimiento": {
        title: "Base de conocimiento",
        description:
          "Lo que el agente sabe, escrito por la clínica: horarios, ubicación, precios, políticas y preguntas frecuentes. Se edita desde el panel, sin tocar el bot.",
      },
      "mi-cuenta": {
        title: "Mi cuenta",
        description:
          "Cada miembro del equipo gestiona lo suyo: sus datos de acceso, su ficha profesional y su propio horario y ausencias.",
      },
    },
  },
  en: {
    etiqueta: "The agent in action",
    titulo: ["You're in control, ", "the agent executes"],
    descripcion:
      "Behind the agent there is a complete management program: scheduling, medical records and invoicing. These are its real screens.",
    invitacion: (nombre) => `Take a look at our ${nombre} mode`,
    nombreTema: { claro: "light", oscuro: "dark" },
    conmutadorAria: (nombre) => `View the screenshots in ${nombre} mode`,
    verConfiguracion: (n) => `See the ${n} configuration screens`,
    ocultarConfiguracion: "Hide the configuration screens",
    ampliarAria: (titulo) => `Enlarge the ${titulo} screenshot`,
    ampliar: "Enlarge",
    visorAria: (titulo) => `Enlarged screenshot: ${titulo}`,
    anterior: "Previous screenshot",
    siguiente: "Next screenshot",
    cerrar: "Close the enlarged view",
    modo: (nombre) => `${nombre.charAt(0).toUpperCase()}${nombre.slice(1)} mode`,
    verEstaCaptura: (nombre) => `View this screenshot in ${nombre} mode`,
    pantallas: {
      panel: {
        title: "Control panel",
        description:
          "What is happening today and what has been collected this month: the day's appointments with their status, the clinic's activity and the financial block, which separates what has been invoiced, what has been collected and work done that hasn't been invoiced yet.",
      },
      agenda: {
        title: "Calendar",
        description:
          "The full week over each professional's real schedule. It supports split shifts and absences, and overlapping appointments are laid out in columns instead of covering each other.",
      },
      citas: {
        title: "Appointments",
        description:
          "The full list, filterable by date and status. Each appointment keeps its history —who changed what and when— and where it came from: the panel, the agent or the public booking page.",
      },
      pacientes: {
        title: "Patients",
        description:
          "The clinic's directory, searchable by name, email or phone. Numbers are normalized on sign-up, so the same phone number typed three different ways doesn't create three records. Each new patient opens their medical history.",
      },
      agente: {
        title: "WhatsApp agent",
        description:
          "The number's configuration and, above all, the test chat: you talk to the agent from the panel itself, without spending messages or bothering anyone, to check what it replies before putting it in front of patients.",
      },
      chats: {
        title: "Chats",
        description:
          "When you connect your number to the WhatsApp API, it stops working in the phone app. This inbox gives it back to you, with color distinguishing what the agent answered and what a team member answered.",
      },
      servicios: {
        title: "Services",
        description:
          "The catalog the agent consults to answer prices and work out how much time each appointment takes. Duration and price can be fixed or variable; if the duration varies, the calendar reserves the maximum.",
      },
      facturacion: {
        title: "Invoicing",
        description:
          "From treatment to invoice without typing twice. Procedures are left pending invoicing, grouped into a draft, and when it is issued it takes a number from the series and is closed. An issued invoice isn't corrected: it is voided and another one is issued.",
      },
      profesionales: {
        title: "Professionals",
        description:
          "Who works, when and on what: weekly schedule in shifts, absences and the services each one provides. It feeds the calendar and the slots the agent can offer.",
      },
      clinica: {
        title: "Clinic",
        description:
          "The details the agent gives when asked: address, contact and time zone. This is also where you set how long the slot of an appointment the agent has booked is held while the team has not yet validated it.",
      },
      "base-conocimiento": {
        title: "Knowledge base",
        description:
          "What the agent knows, written by the clinic: opening hours, location, prices, policies and frequently asked questions. It is edited from the panel, without touching the bot.",
      },
      "mi-cuenta": {
        title: "My account",
        description:
          "Each team member manages their own: their login details, their professional profile and their own schedule and absences.",
      },
    },
  },
}

function armarPantallas(lang: Lang) {
  const t = textos[lang]
  const crear = (lista: readonly { id: IdPantalla; url: string }[]): Pantalla[] =>
    lista.map(({ id, url }) => ({ id, url, ...t.pantallas[id] }))
  return { destacadas: crear(DESTACADAS), configuracion: crear(CONFIGURACION) }
}

const pantallasPorIdioma: Record<Lang, ReturnType<typeof armarPantallas>> = {
  es: armarPantallas("es"),
  en: armarPantallas("en"),
}

function rutaCaptura(id: string, tema: Tema) {
  return `/img/autoclinic/${id}-${tema}.png`
}

export default function WhaGallery({ lang = "es" }: { lang?: Lang }) {
  const t = textos[lang]
  const { destacadas, configuracion } = pantallasPorIdioma[lang]
  const todas = [...destacadas, ...configuracion]

  const [tema, setTema] = useState<Tema>("oscuro")
  const [verConfiguracion, setVerConfiguracion] = useState(false)
  const [ampliada, setAmpliada] = useState<number | null>(null)

  const cerrar = useCallback(() => setAmpliada(null), [])
  const total = todas.length
  const mover = useCallback(
    (paso: number) => {
      setAmpliada((actual) => {
        if (actual === null) return null
        return (actual + paso + total) % total
      })
    },
    [total]
  )

  // Teclado del visor y bloqueo del scroll de fondo mientras está abierto.
  useEffect(() => {
    if (ampliada === null) return

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") cerrar()
      if (e.key === "ArrowRight") mover(1)
      if (e.key === "ArrowLeft") mover(-1)
    }

    const overflowPrevio = document.body.style.overflow
    document.body.style.overflow = "hidden"
    window.addEventListener("keydown", onKey)

    return () => {
      document.body.style.overflow = overflowPrevio
      window.removeEventListener("keydown", onKey)
    }
  }, [ampliada, cerrar, mover])

  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mx-auto mb-7 max-w-2xl text-center">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-wha-alt/30 bg-wha-alt/10 px-4 py-1.5 text-xs font-semibold text-wha-alt">
            {t.etiqueta}
          </span>
          <h2 className="text-3xl font-semibold tracking-tight text-wha-fg md:text-4xl">
            {t.titulo[0]}
            <span className="bg-linear-to-r from-wha-alt to-wha-teal bg-clip-text text-transparent">
              {t.titulo[1]}
            </span>
          </h2>
          <p className="mt-4 text-wha-muted">{t.descripcion}</p>
        </div>

        <ConmutadorTema tema={tema} onChange={setTema} t={t} />

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:gap-8">
          {destacadas.map((p, i) => (
            <TarjetaCaptura
              key={p.id}
              pantalla={p}
              tema={tema}
              prioridad={i === 0}
              onAmpliar={() => setAmpliada(i)}
              t={t}
            />
          ))}
        </div>

        {/* Las de configuración, plegadas por defecto */}
        <div className="mt-10">
          <button
            type="button"
            onClick={() => setVerConfiguracion((v) => !v)}
            aria-expanded={verConfiguracion}
            className="mx-auto flex items-center gap-2 rounded-full border border-white/10 bg-wha-card/60 px-5 py-2.5 text-sm font-medium text-wha-fg transition-colors hover:border-wha-teal/40 hover:bg-wha-card"
          >
            {verConfiguracion
              ? t.ocultarConfiguracion
              : t.verConfiguracion(configuracion.length)}
            <ChevronDownIcon
              className={cn(
                "size-4 transition-transform duration-300",
                verConfiguracion && "rotate-180"
              )}
            />
          </button>

          {verConfiguracion && (
            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:gap-8">
              {configuracion.map((p, i) => (
                <TarjetaCaptura
                  key={p.id}
                  pantalla={p}
                  tema={tema}
                  onAmpliar={() => setAmpliada(destacadas.length + i)}
                  t={t}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {ampliada !== null && (
        <Visor
          pantalla={todas[ampliada]}
          tema={tema}
          onCambiarTema={setTema}
          onCerrar={cerrar}
          onAnterior={() => mover(-1)}
          onSiguiente={() => mover(1)}
          t={t}
        />
      )}
    </section>
  )
}

/* ---------------------------------------------------------------- */

function TarjetaCaptura({
  pantalla,
  tema,
  prioridad,
  onAmpliar,
  t,
}: {
  pantalla: Pantalla
  tema: Tema
  prioridad?: boolean
  onAmpliar: () => void
  t: Textos
}) {
  return (
    <figure className="flex flex-col gap-4">
      <button
        type="button"
        onClick={onAmpliar}
        aria-label={t.ampliarAria(pantalla.title)}
        className="group relative block overflow-hidden rounded-2xl border border-white/10 bg-wha-card/80 text-left shadow-2xl shadow-black/40 transition-all duration-300 hover:-translate-y-1 hover:border-wha-teal/40 hover:shadow-wha-teal/10"
      >
        {/* Barra tipo navegador */}
        <div className="flex items-center gap-2 border-b border-white/8 bg-white/5 px-4 py-2.5">
          <span className="size-2.5 rounded-full bg-rose-400/70" />
          <span className="size-2.5 rounded-full bg-amber-400/70" />
          <span className="size-2.5 rounded-full bg-emerald-400/70" />
          <div className="ml-2 flex-1 truncate rounded-md bg-black/20 px-3 py-1 text-center font-mono text-[11px] text-wha-muted">
            {pantalla.url}
          </div>
        </div>

        <div className="relative overflow-hidden">
          <Image
            src={rutaCaptura(pantalla.id, tema)}
            alt={`AutoClinic — ${pantalla.title}`}
            width={1900}
            height={1078}
            sizes="(max-width: 768px) 100vw, 50vw"
            priority={prioridad}
            className="h-auto w-full transition-transform duration-500 group-hover:scale-[1.04]"
          />

          {/* Aviso de ampliar, solo al pasar por encima */}
          <span className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/45 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover:opacity-100">
            <span className="inline-flex items-center gap-2 rounded-full bg-wha-card/90 px-4 py-2 text-sm font-medium text-wha-fg ring-1 ring-white/15">
              <MaximizeIcon className="size-4 text-wha-teal" />
              {t.ampliar}
            </span>
          </span>
        </div>
      </button>

      <figcaption className="px-1">
        <h3 className="text-base font-semibold text-wha-fg">{pantalla.title}</h3>
        <p className="mt-1.5 text-sm leading-relaxed text-wha-muted">
          {pantalla.description}
        </p>
      </figcaption>
    </figure>
  )
}

/* ---------------------------------------------------------------- */

function ConmutadorTema({
  tema,
  onChange,
  t,
}: {
  tema: Tema
  onChange: (t: Tema) => void
  t: Textos
}) {
  const esClaro = tema === "claro"
  const destino: Tema = esClaro ? "oscuro" : "claro"

  return (
    <div className="flex items-center justify-center gap-3">
      {/* Invita siempre al modo que NO se está viendo */}
      <span className="text-xs text-wha-muted">
        {t.invitacion(t.nombreTema[destino])}
      </span>

      <button
        type="button"
        role="switch"
        aria-checked={esClaro}
        aria-label={t.conmutadorAria(t.nombreTema[destino])}
        onClick={() => onChange(destino)}
        className={cn(
          "relative h-7 w-[3.25rem] shrink-0 rounded-full border transition-colors duration-300",
          esClaro
            ? "border-sky-300/40 bg-sky-500/25"
            : "border-white/12 bg-white/5"
        )}
      >
        {/* Iconos del carril, apagados bajo la perilla */}
        <span className="pointer-events-none absolute inset-0 flex items-center justify-between px-1.5">
          <SunIcon
            className={cn(
              "size-3 transition-colors duration-300",
              esClaro ? "text-transparent" : "text-wha-muted"
            )}
          />
          <MoonIcon
            className={cn(
              "size-3 transition-colors duration-300",
              esClaro ? "text-sky-100/70" : "text-transparent"
            )}
          />
        </span>

        {/* Perilla */}
        <span
          className={cn(
            "relative z-10 flex size-6 items-center justify-center rounded-full shadow-sm transition-transform duration-300 ease-out",
            esClaro
              ? "translate-x-0.5 bg-amber-300"
              : "translate-x-[1.625rem] bg-slate-200"
          )}
        >
          {esClaro ? (
            <SunIcon className="size-3.5 text-amber-700" strokeWidth={2.5} />
          ) : (
            <MoonIcon className="size-3.5 text-slate-700" strokeWidth={2.5} />
          )}
        </span>
      </button>
    </div>
  )
}

/* ---------------------------------------------------------------- */

/**
 * El conmutador del visor. A diferencia del interruptor de la cabecera, aquí
 * el espacio manda y la etiqueta ya dice a qué modo se va, así que basta un
 * botón: anuncia el destino, no el estado actual —misma lógica que el
 * «Échale un ojo a nuestro modo…» de arriba.
 *
 * Cambia el `tema` compartido de la galería, no una copia: al cerrar el visor
 * las tarjetas del fondo ya están en el modo que se acaba de elegir.
 */
function BotonTema({
  tema,
  onChange,
  t,
}: {
  tema: Tema
  onChange: (t: Tema) => void
  t: Textos
}) {
  const destino: Tema = tema === "claro" ? "oscuro" : "claro"
  const nombre = t.nombreTema[destino]

  return (
    <button
      type="button"
      onClick={() => onChange(destino)}
      aria-label={t.verEstaCaptura(nombre)}
      className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/70 transition-colors hover:bg-white/15 hover:text-white"
    >
      {destino === "claro" ? (
        <SunIcon className="size-3.5" />
      ) : (
        <MoonIcon className="size-3.5" />
      )}
      {t.modo(nombre)}
    </button>
  )
}

/* ---------------------------------------------------------------- */

function Visor({
  pantalla,
  tema,
  onCambiarTema,
  onCerrar,
  onAnterior,
  onSiguiente,
  t,
}: {
  pantalla: Pantalla
  tema: Tema
  onCambiarTema: (t: Tema) => void
  onCerrar: () => void
  onAnterior: () => void
  onSiguiente: () => void
  t: Textos
}) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={t.visorAria(pantalla.title)}
      onClick={onCerrar}
      className="fixed inset-0 z-100 flex flex-col items-center justify-center gap-4 bg-black/85 p-4 backdrop-blur-sm md:p-8"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-6xl overflow-hidden rounded-xl border border-white/10 shadow-2xl"
      >
        <Image
          src={rutaCaptura(pantalla.id, tema)}
          alt={`AutoClinic — ${pantalla.title}`}
          width={1900}
          height={1078}
          sizes="100vw"
          className="h-auto w-full"
        />
      </div>

      <div
        onClick={(e) => e.stopPropagation()}
        className="flex w-full max-w-6xl items-center justify-between gap-4"
      >
        <button
          type="button"
          onClick={onAnterior}
          aria-label={t.anterior}
          className="inline-flex size-10 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition-colors hover:bg-white/15"
        >
          <ChevronLeftIcon className="size-5" />
        </button>

        <div className="flex min-w-0 flex-1 flex-col items-center gap-2 sm:flex-row sm:justify-center sm:gap-3">
          <p className="max-w-full truncate text-center text-sm font-medium text-white">
            {pantalla.title}
          </p>
          <BotonTema tema={tema} onChange={onCambiarTema} t={t} />
        </div>

        <button
          type="button"
          onClick={onSiguiente}
          aria-label={t.siguiente}
          className="inline-flex size-10 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition-colors hover:bg-white/15"
        >
          <ChevronRightIcon className="size-5" />
        </button>
      </div>

      <button
        type="button"
        onClick={onCerrar}
        aria-label={t.cerrar}
        className="absolute right-4 top-4 inline-flex size-10 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white transition-colors hover:bg-white/25 md:right-8 md:top-8"
      >
        <XIcon className="size-5" />
      </button>
    </div>
  )
}
