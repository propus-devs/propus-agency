"use client"

import { useEffect, useEffectEvent, useRef, useState } from "react"
import Link from "next/link"
import {
  ArrowLeft,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock,
  Download,
  Loader2,
  ShieldCheck,
  Video,
} from "lucide-react"
import SinHuecos, { type Contacto } from "@/components/reservas/SinHuecos"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DIAS_CORTOS, nombreDiaLargo, nombreMes, semanasDelMes, sumarMeses } from "@/lib/reservas/calendario"
import { horaAMinutos, minutosAHora } from "@/lib/reservas/huecos"
import { crearIcs } from "@/lib/reservas/ics"
import type { HuecoPublico, RespuestaMes, RespuestaReserva } from "@/lib/reservas/publico-tipos"
import { cn } from "@/lib/utils"

type Paso = "hora" | "datos" | "listo"

type Formulario = {
  nombre: string
  email: string
  telefono: string
  mensaje: string
  privacidad: boolean
  /** Campo trampa: las personas no lo ven; los robots lo rellenan. */
  web: string
}

type Confirmada = { inicio: string; fin: string; dia: string; hora: string; horaFin: string }

const FORMULARIO_VACIO: Formulario = {
  nombre: "",
  email: "",
  telefono: "",
  mensaje: "",
  privacidad: false,
  web: "",
}

function capitalizar(texto: string): string {
  return texto.charAt(0).toUpperCase() + texto.slice(1)
}

const claseTextarea =
  "min-h-24 w-full min-w-0 resize-y rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30"

/**
 * Reserva de una llamada: día en un calendario, hora, datos y confirmación. Los
 * huecos llegan de /api/reservas/huecos (siempre al momento, sin caché), así que
 * lo que se cambie en el admin se ve aquí en la siguiente carga o al volver a la
 * pestaña. Todas las horas son de Madrid y vienen ya formateadas del servidor.
 */
export default function Reservador({
  inicial,
  ticket,
  hoy,
  contacto,
}: {
  /** Mes con el que abre la página, o null si no se pudo cargar la agenda. */
  inicial: RespuestaMes | null
  /** Ticket antispam del formulario (null si el servidor no puede firmarlo). */
  ticket: string | null
  /** Día de hoy en Madrid, "AAAA-MM-DD". */
  hoy: string
  contacto: Contacto
}) {
  const [cache, setCache] = useState<Record<string, RespuestaMes>>(inicial ? { [inicial.mes]: inicial } : {})
  const [mes, setMes] = useState(inicial?.mes ?? "")
  const [dia, setDia] = useState<string | null>(inicial?.dias[0]?.fecha ?? null)
  const [hueco, setHueco] = useState<HuecoPublico | null>(null)
  const [paso, setPaso] = useState<Paso>("hora")
  const [cargando, setCargando] = useState(false)
  const [errorCarga, setErrorCarga] = useState<string | null>(null)
  const [aviso, setAviso] = useState<string | null>(null)
  const [form, setForm] = useState<Formulario>(FORMULARIO_VACIO)
  const [enviando, setEnviando] = useState(false)
  const [errorForm, setErrorForm] = useState<{ campo?: string; mensaje: string } | null>(null)
  const [confirmada, setConfirmada] = useState<Confirmada | null>(null)
  const tarjeta = useRef<HTMLDivElement>(null)

  const actual = cache[mes]
  const duracionMin = actual?.duracionMin ?? inicial?.duracionMin ?? 15
  const diaActual = actual?.dias.find((d) => d.fecha === dia) ?? null

  /** Pide un mes a la API. Devuelve null si falla. `silencioso`: sin parpadeo de "cargando". */
  async function traerMes(destino: string, silencioso = false): Promise<RespuestaMes | null> {
    if (!silencioso) setCargando(true)
    setErrorCarga(null)
    try {
      const respuesta = await fetch(`/api/reservas/huecos?mes=${encodeURIComponent(destino)}`, { cache: "no-store" })
      if (!respuesta.ok) throw new Error(String(respuesta.status))
      const datos = (await respuesta.json()) as RespuestaMes
      setCache((c) => ({ ...c, [datos.mes]: datos }))
      return datos
    } catch {
      setErrorCarga("No hemos podido cargar los huecos. Inténtalo de nuevo.")
      return null
    } finally {
      if (!silencioso) setCargando(false)
    }
  }

  async function irAMes(destino: string) {
    const datos = cache[destino] ?? (await traerMes(destino))
    if (datos) {
      setMes(datos.mes)
      setDia(datos.dias[0]?.fecha ?? null)
    }
  }

  // Al volver a la pestaña se vuelve a pedir el mes: si algo cambió en el admin, se nota. Si el
  // hueco que se estaba reservando ya no existe, se avisa y se vuelve a elegir hora.
  const alVolverALaPestana = useEffectEvent(() => {
    if (document.visibilityState !== "visible" || paso === "listo" || !mes) return
    void traerMes(mes, true).then((datos) => {
      if (!datos || !hueco || paso !== "datos") return
      const sigue = datos.dias.some((d) => d.huecos.some((h) => h.inicio === hueco.inicio))
      if (!sigue) {
        setAviso("Ese hueco ya no está disponible. Elige otra hora.")
        setHueco(null)
        setPaso("hora")
      }
    })
  })
  useEffect(() => {
    const escuchar = () => alVolverALaPestana()
    document.addEventListener("visibilitychange", escuchar)
    return () => document.removeEventListener("visibilitychange", escuchar)
  }, [])

  function subirALaTarjeta() {
    tarjeta.current?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  function elegirHueco(h: HuecoPublico) {
    setHueco(h)
    setAviso(null)
    setErrorForm(null)
    setPaso("datos")
    subirALaTarjeta()
  }

  function cambiar<K extends keyof Formulario>(campo: K, valor: Formulario[K]) {
    setForm((f) => ({ ...f, [campo]: valor }))
    if (errorForm?.campo === campo) setErrorForm(null)
  }

  async function enviar(evento: React.FormEvent) {
    evento.preventDefault()
    if (!hueco || !dia || !ticket || enviando) return
    setEnviando(true)
    setErrorForm(null)
    try {
      const respuesta = await fetch("/api/reservas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, inicio: hueco.inicio, ticket }),
      })
      const datos = (await respuesta.json()) as RespuestaReserva
      if (datos.ok) {
        const finMin = (horaAMinutos(hueco.hora) ?? 0) + duracionMin
        setConfirmada({
          inicio: datos.inicio || hueco.inicio,
          fin: datos.fin || hueco.inicio,
          dia,
          hora: hueco.hora,
          horaFin: minutosAHora(finMin % 1440),
        })
        setPaso("listo")
        subirALaTarjeta()
      } else if (datos.error === "hueco-ocupado") {
        setAviso(datos.mensaje)
        setHueco(null)
        setPaso("hora")
        void traerMes(mes, true)
      } else {
        setErrorForm({ campo: datos.campo, mensaje: datos.mensaje })
        if (datos.campo) document.getElementById(`campo-${datos.campo}`)?.focus()
      }
    } catch {
      setErrorForm({ mensaje: "No hemos podido enviar la reserva. Revisa tu conexión e inténtalo de nuevo." })
    } finally {
      setEnviando(false)
    }
  }

  function descargarIcs() {
    if (!confirmada) return
    const ics = crearIcs({
      inicio: new Date(confirmada.inicio),
      fin: new Date(confirmada.fin),
      resumen: "Llamada con Propus",
      descripcion: `Llamada de ${duracionMin} minutos con Propus (propus.es). Si necesitas cambiarla, escríbenos a ${contacto.email}.`,
      uid: `${crypto.randomUUID()}@propus.es`,
      ahora: new Date(),
    })
    const url = URL.createObjectURL(new Blob([ics], { type: "text/calendar;charset=utf-8" }))
    const enlace = document.createElement("a")
    enlace.href = url
    enlace.download = "llamada-propus.ics"
    document.body.appendChild(enlace)
    enlace.click()
    enlace.remove()
    URL.revokeObjectURL(url)
  }

  // ── Sin agenda utilizable ────────────────────────────────────────────────
  if (!inicial || !ticket) {
    return (
      <div className="vidrio overflow-hidden rounded-3xl border shadow-xl">
        <SinHuecos
          titulo="Ahora mismo no podemos enseñarte la agenda"
          texto="Escríbenos o llámanos y buscamos un hueco juntos. Respondemos lo antes posible."
          contacto={contacto}
        />
      </div>
    )
  }
  if (!inicial.abierta || (inicial.dias.length === 0 && Object.keys(cache).length <= 1)) {
    return (
      <div className="vidrio overflow-hidden rounded-3xl border shadow-xl">
        <SinHuecos
          titulo={inicial.abierta ? "No quedan huecos libres por ahora" : "Ahora mismo no aceptamos reservas online"}
          texto="Escríbenos o llámanos y te buscamos un hueco. Respondemos lo antes posible."
          contacto={contacto}
        />
      </div>
    )
  }

  const semanas = actual ? semanasDelMes(Number(mes.slice(0, 4)), Number(mes.slice(5, 7))) : []
  const diasConHuecos = new Set(actual?.dias.map((d) => d.fecha))
  const pasos: { id: Paso; texto: string }[] = [
    { id: "hora", texto: "Día y hora" },
    { id: "datos", texto: "Tus datos" },
    { id: "listo", texto: "Listo" },
  ]
  const indicePaso = pasos.findIndex((p) => p.id === paso)

  return (
    <div ref={tarjeta} className="vidrio scroll-mt-24 overflow-hidden rounded-3xl border shadow-xl">
      <div className="grid lg:grid-cols-[17rem_minmax(0,1fr)]">
        {/* Lateral: qué es esta llamada */}
        <aside className="space-y-6 border-b border-border/60 bg-primary/5 p-6 sm:p-8 lg:border-r lg:border-b-0">
          <div className="space-y-1.5">
            <p className="font-mono text-xs tracking-[0.18em] text-primary uppercase">Propus</p>
            <h2 className="font-heading text-xl font-semibold tracking-tight">Llamada de {duracionMin} minutos</h2>
          </div>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li className="flex items-center gap-3">
              <Clock className="size-4 shrink-0 text-primary" aria-hidden />
              {duracionMin} minutos, sin compromiso
            </li>
            <li className="flex items-center gap-3">
              <Video className="size-4 shrink-0 text-primary" aria-hidden />
              Por videollamada o teléfono
            </li>
            <li className="flex items-center gap-3">
              <ShieldCheck className="size-4 shrink-0 text-primary" aria-hidden />
              Tus datos sólo se usan para esta llamada
            </li>
          </ul>

          {hueco && dia && paso === "datos" ? (
            <div className="rounded-xl border border-primary/30 bg-card/70 p-4 text-sm">
              <p className="text-xs text-muted-foreground">Tu reserva</p>
              <p className="mt-1 font-medium">{capitalizar(nombreDiaLargo(dia))}</p>
              <p className="font-mono text-foreground tabular-nums">
                {hueco.hora} – {minutosAHora(((horaAMinutos(hueco.hora) ?? 0) + duracionMin) % 1440)}
              </p>
            </div>
          ) : null}

          <p className="text-xs leading-relaxed text-muted-foreground">
            Horas de Madrid. ¿Prefieres escribirnos? Estamos en{" "}
            <a href={contacto.emailHref} className="text-foreground underline underline-offset-4">
              {contacto.email}
            </a>
            .
          </p>
        </aside>

        {/* Principal */}
        <section className="min-w-0 p-6 sm:p-8" aria-label="Reserva de la llamada">
          <ol className="mb-6 flex items-center gap-2 text-xs" aria-label="Pasos">
            {pasos.map((p, i) => (
              <li key={p.id} className="flex items-center gap-2" aria-current={i === indicePaso ? "step" : undefined}>
                <span
                  className={cn(
                    "flex size-6 items-center justify-center rounded-full border text-[0.7rem] font-medium transition-colors",
                    i < indicePaso && "border-primary bg-primary text-primary-foreground",
                    i === indicePaso && "border-primary text-primary",
                    i > indicePaso && "border-border text-muted-foreground"
                  )}
                >
                  {i < indicePaso ? <Check className="size-3" aria-hidden /> : i + 1}
                </span>
                <span className={cn(i === indicePaso ? "font-medium text-foreground" : "text-muted-foreground")}>
                  {p.texto}
                </span>
                {i < pasos.length - 1 ? <span aria-hidden className="mx-1 h-px w-6 bg-border" /> : null}
              </li>
            ))}
          </ol>

          {aviso ? (
            <p role="alert" className="mb-5 rounded-lg border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive">
              {aviso}
            </p>
          ) : null}

          {/* Paso 1: día y hora */}
          {paso === "hora" && actual ? (
            <div className="grid gap-8 animate-in fade-in-0 slide-in-from-bottom-2 duration-300 md:grid-cols-[minmax(0,1fr)_13rem] motion-reduce:animate-none">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-heading text-lg font-medium first-letter:uppercase">{nombreMes(mes)}</h3>
                  <div className="flex items-center gap-1">
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      aria-label="Mes anterior"
                      disabled={cargando || mes <= actual.mesMin}
                      onClick={() => {
                        const anterior = sumarMeses(mes, -1)
                        if (anterior) void irAMes(anterior)
                      }}
                    >
                      <ChevronLeft aria-hidden />
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      aria-label="Mes siguiente"
                      disabled={cargando || mes >= actual.mesMax}
                      onClick={() => {
                        const siguiente = sumarMeses(mes, 1)
                        if (siguiente) void irAMes(siguiente)
                      }}
                    >
                      <ChevronRight aria-hidden />
                    </Button>
                  </div>
                </div>

                <div className={cn("grid grid-cols-7 gap-y-1.5 text-center transition-opacity", cargando && "opacity-50")}>
                  {DIAS_CORTOS.map((d) => (
                    <span key={d} aria-hidden className="pb-1 font-mono text-xs text-muted-foreground">
                      {d}
                    </span>
                  ))}
                  {semanas.flat().map((celda) => {
                    if (!celda.delMes) return <span key={celda.fecha} aria-hidden />
                    const hayHuecos = diasConHuecos.has(celda.fecha)
                    const elegido = celda.fecha === dia
                    return (
                      <button
                        key={celda.fecha}
                        type="button"
                        disabled={!hayHuecos}
                        aria-pressed={elegido}
                        aria-label={`${capitalizar(nombreDiaLargo(celda.fecha))}${hayHuecos ? "" : ", sin huecos"}`}
                        onClick={() => setDia(celda.fecha)}
                        className={cn(
                          "relative mx-auto flex size-10 items-center justify-center rounded-xl text-sm tabular-nums transition-all outline-none focus-visible:ring-3 focus-visible:ring-ring/50 sm:size-11",
                          hayHuecos && !elegido && "bg-primary/10 font-semibold text-foreground hover:bg-primary/20",
                          elegido && "bg-primary font-semibold text-primary-foreground shadow-md shadow-primary/30",
                          !hayHuecos && "cursor-not-allowed text-muted-foreground/40",
                          celda.fecha === hoy && !elegido && "ring-1 ring-primary/50"
                        )}
                      >
                        {celda.dia}
                      </button>
                    )
                  })}
                </div>

                {errorCarga ? (
                  <p role="alert" className="text-sm text-destructive">
                    {errorCarga}
                  </p>
                ) : null}
                {actual.dias.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No quedan huecos libres este mes. Prueba con el siguiente.</p>
                ) : (
                  <p className="text-xs text-muted-foreground">Los días resaltados tienen huecos libres.</p>
                )}
              </div>

              <div className="space-y-3">
                <h3 className="font-heading text-lg font-medium">
                  {dia ? <span className="first-letter:uppercase">{nombreDiaLargo(dia).split(",")[0]}</span> : "Horas"}
                  {dia ? <span className="text-muted-foreground"> {Number(dia.slice(8))}</span> : null}
                </h3>
                {diaActual ? (
                  <ul className="grid max-h-[22rem] grid-cols-3 gap-2 overflow-y-auto pr-1 md:grid-cols-1" aria-label="Horas disponibles">
                    {diaActual.huecos.map((h) => (
                      <li key={h.inicio}>
                        <button
                          type="button"
                          onClick={() => elegirHueco(h)}
                          className="h-11 w-full rounded-xl border border-primary/40 bg-card/60 font-mono text-sm font-medium tabular-nums text-foreground transition-all outline-none hover:border-primary hover:bg-primary hover:text-primary-foreground focus-visible:ring-3 focus-visible:ring-ring/50"
                        >
                          {h.hora}
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-muted-foreground">Elige un día resaltado para ver sus horas.</p>
                )}
                <p aria-live="polite" className="sr-only">
                  {diaActual ? `${diaActual.huecos.length} huecos libres el ${nombreDiaLargo(diaActual.fecha)}` : ""}
                </p>
              </div>
            </div>
          ) : null}

          {/* Paso 2: datos */}
          {paso === "datos" && hueco && dia ? (
            <form onSubmit={enviar} className="space-y-5 animate-in fade-in-0 slide-in-from-bottom-2 duration-300 motion-reduce:animate-none">
              <button
                type="button"
                onClick={() => {
                  setPaso("hora")
                  setErrorForm(null)
                }}
                className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                <ArrowLeft className="size-4" aria-hidden />
                Cambiar día u hora
              </button>

              <div>
                <h3 className="font-heading text-xl font-semibold tracking-tight">Cuéntanos quién eres</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Sólo necesitamos tu nombre y un correo. Lo demás es opcional.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <label htmlFor="campo-nombre" className="text-sm font-medium">
                    Nombre <span aria-hidden>*</span>
                  </label>
                  <Input
                    id="campo-nombre"
                    name="nombre"
                    autoComplete="name"
                    required
                    minLength={2}
                    maxLength={80}
                    value={form.nombre}
                    onChange={(e) => cambiar("nombre", e.target.value)}
                    aria-invalid={errorForm?.campo === "nombre" || undefined}
                    aria-describedby={errorForm?.campo === "nombre" ? "error-form" : undefined}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="campo-email" className="text-sm font-medium">
                    Correo electrónico <span aria-hidden>*</span>
                  </label>
                  <Input
                    id="campo-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    maxLength={254}
                    value={form.email}
                    onChange={(e) => cambiar("email", e.target.value)}
                    aria-invalid={errorForm?.campo === "email" || undefined}
                    aria-describedby={errorForm?.campo === "email" ? "error-form" : undefined}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="campo-telefono" className="text-sm font-medium">
                  Teléfono <span className="font-normal text-muted-foreground">(opcional)</span>
                </label>
                <Input
                  id="campo-telefono"
                  name="telefono"
                  type="tel"
                  autoComplete="tel"
                  maxLength={20}
                  value={form.telefono}
                  onChange={(e) => cambiar("telefono", e.target.value)}
                  aria-invalid={errorForm?.campo === "telefono" || undefined}
                  aria-describedby={errorForm?.campo === "telefono" ? "error-form" : undefined}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="campo-mensaje" className="text-sm font-medium">
                  ¿Qué te gustaría contarnos? <span className="font-normal text-muted-foreground">(opcional)</span>
                </label>
                <textarea
                  id="campo-mensaje"
                  name="mensaje"
                  maxLength={500}
                  rows={3}
                  placeholder="Qué quieres automatizar, qué web necesitas…"
                  value={form.mensaje}
                  onChange={(e) => cambiar("mensaje", e.target.value)}
                  aria-invalid={errorForm?.campo === "mensaje" || undefined}
                  aria-describedby={errorForm?.campo === "mensaje" ? "error-form" : undefined}
                  className={claseTextarea}
                />
              </div>

              {/* Campo trampa: fuera de la pantalla y del orden de tabulación. */}
              <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
                <label htmlFor="campo-web">No rellenes este campo</label>
                <input
                  id="campo-web"
                  name="web"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={form.web}
                  onChange={(e) => cambiar("web", e.target.value)}
                />
              </div>

              <div className="space-y-1.5">
                <label className="flex items-start gap-3 text-sm">
                  <input
                    id="campo-privacidad"
                    type="checkbox"
                    required
                    checked={form.privacidad}
                    onChange={(e) => cambiar("privacidad", e.target.checked)}
                    aria-invalid={errorForm?.campo === "privacidad" || undefined}
                    aria-describedby={errorForm?.campo === "privacidad" ? "error-form" : undefined}
                    className="mt-0.5 size-4 shrink-0 accent-primary"
                  />
                  <span className="text-muted-foreground">
                    He leído la{" "}
                    <Link href="/legal/privacidad" target="_blank" className="text-foreground underline underline-offset-4">
                      política de privacidad
                    </Link>{" "}
                    y acepto que Propus use estos datos para gestionar mi llamada. Se borran 30 días después de la llamada.
                  </span>
                </label>
              </div>

              {errorForm ? (
                <p id="error-form" role="alert" className="rounded-lg border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                  {errorForm.mensaje}
                </p>
              ) : null}

              <Button
                type="submit"
                size="lg"
                disabled={enviando}
                className="h-12 w-full bg-brand-emerald text-base font-semibold text-background hover:bg-brand-teal sm:w-auto sm:px-8"
              >
                {enviando ? (
                  <>
                    <Loader2 className="animate-spin" aria-hidden />
                    Reservando…
                  </>
                ) : (
                  "Confirmar reserva"
                )}
              </Button>
            </form>
          ) : null}

          {/* Paso 3: confirmación */}
          {paso === "listo" && confirmada ? (
            <div className="mx-auto flex max-w-md flex-col items-center gap-6 py-6 text-center animate-in fade-in-0 zoom-in-95 duration-500 motion-reduce:animate-none">
              <span className="flex size-16 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/30">
                <Check className="size-8" aria-hidden />
              </span>
              <div className="space-y-2">
                <h3 className="font-heading text-2xl font-semibold tracking-tight">¡Reserva confirmada!</h3>
                <p className="leading-relaxed text-muted-foreground">
                  Hemos guardado tu llamada. Nos pondremos en contacto contigo a la hora acordada con los datos que nos has dejado.
                </p>
              </div>
              <div className="w-full rounded-2xl border border-primary/30 bg-card/70 p-5">
                <p className="font-medium">{capitalizar(nombreDiaLargo(confirmada.dia))}</p>
                <p className="mt-1 font-mono text-lg tabular-nums">
                  {confirmada.hora} – {confirmada.horaFin}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">Hora de Madrid</p>
              </div>
              <div className="flex flex-col items-center gap-3 sm:flex-row">
                <Button type="button" size="lg" variant="outline" onClick={descargarIcs}>
                  <Download aria-hidden />
                  Añadir a mi calendario
                </Button>
                <Button size="lg" className="bg-brand-emerald font-semibold text-background hover:bg-brand-teal" asChild>
                  <Link href="/">Volver al inicio</Link>
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                ¿Necesitas cambiar la hora? Escríbenos a{" "}
                <a href={contacto.emailHref} className="text-foreground underline underline-offset-4">
                  {contacto.email}
                </a>
                .
              </p>
            </div>
          ) : null}

          {cargando && paso === "hora" ? (
            <p className="mt-4 flex items-center gap-2 text-xs text-muted-foreground" role="status">
              <Loader2 className="size-3.5 animate-spin" aria-hidden />
              Cargando huecos…
            </p>
          ) : null}
        </section>
      </div>
    </div>
  )
}
