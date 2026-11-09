"use client"

import { useEffect, useState, useSyncExternalStore } from "react"
import { BotIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { useInView } from "@/lib/use-in-view"

type Mensaje = { from: "user" | "bot"; text: string }

// Conversación de AutoClinic, el producto prioritario: una cita agendada sola.
const GUION: Mensaje[] = [
  { from: "user", text: "Hola, ¿tenéis hueco el jueves por la tarde?" },
  {
    from: "bot",
    text: "¡Hola! Sí: el jueves tengo libre a las 17:00 y a las 18:30. ¿Cuál te viene mejor?",
  },
  { from: "user", text: "A las 17:00, gracias" },
  {
    from: "bot",
    text: "Perfecto, cita confirmada: jueves a las 17:00. El miércoles te escribo para recordártelo.",
  },
]

const SIN_MOVIMIENTO = "(prefers-reduced-motion: reduce)"

function suscribirse(cambio: () => void) {
  const mq = window.matchMedia(SIN_MOVIMIENTO)
  mq.addEventListener("change", cambio)
  return () => mq.removeEventListener("change", cambio)
}
const reducido = () => window.matchMedia(SIN_MOVIMIENTO).matches
const reducidoServidor = () => false

function Burbuja({ mensaje, escribiendo }: { mensaje: Mensaje; escribiendo: boolean }) {
  const esBot = mensaje.from === "bot"
  return (
    <div
      className={cn(
        "max-w-[85%] px-3 py-2 text-[13px] leading-snug text-foreground animate-in fade-in-0 slide-in-from-bottom-1 duration-300",
        esBot
          ? "self-start rounded-2xl rounded-bl-md border border-brand-emerald/20 bg-brand-emerald/15"
          : "self-end rounded-2xl rounded-br-md bg-white/10"
      )}
    >
      {mensaje.text}
      {escribiendo && (
        <span className="ml-0.5 inline-block h-3.5 w-px translate-y-0.5 bg-brand-emerald motion-safe:animate-pulse" />
      )}
    </div>
  )
}

function PuntosEscribiendo() {
  return (
    <div className="flex items-center gap-1 self-start rounded-2xl rounded-bl-md border border-brand-emerald/20 bg-brand-emerald/15 px-3 py-3 animate-in fade-in-0 duration-200">
      <span className="size-1.5 rounded-full bg-brand-emerald/80 motion-safe:animate-bounce [animation-delay:-0.3s]" />
      <span className="size-1.5 rounded-full bg-brand-emerald/80 motion-safe:animate-bounce [animation-delay:-0.15s]" />
      <span className="size-1.5 rounded-full bg-brand-emerald/80 motion-safe:animate-bounce" />
    </div>
  )
}

/**
 * Chat de AutoClinic en bucle: el cliente pregunta, el agente "piensa" y
 * escribe letra a letra con ritmo humano (velocidad variable y pausas en la
 * puntuación). Solo corre mientras está en pantalla; con
 * prefers-reduced-motion se muestra la conversación entera, sin animar.
 */
export function ChatScene({ className }: { className?: string }) {
  const [ref, inView] = useInView<HTMLDivElement>()
  const sinMovimiento = useSyncExternalStore(suscribirse, reducido, reducidoServidor)
  const [estado, setEstado] = useState<{ mensajes: Mensaje[]; pensando: boolean }>({
    mensajes: [],
    pensando: false,
  })

  useEffect(() => {
    if (!inView || sinMovimiento) return

    let cancelado = false
    const esperar = (ms: number) => new Promise<void>((r) => setTimeout(r, ms))
    const azar = (min: number, max: number) => min + Math.random() * (max - min)

    async function reproducir() {
      while (!cancelado) {
        await esperar(500)
        if (cancelado) return
        setEstado({ mensajes: [], pensando: false })

        for (const mensaje of GUION) {
          if (cancelado) return

          if (mensaje.from === "user") {
            await esperar(azar(700, 1100))
            if (cancelado) return
            setEstado((s) => ({ ...s, mensajes: [...s.mensajes, mensaje] }))
            continue
          }

          setEstado((s) => ({ ...s, pensando: true }))
          await esperar(azar(900, 1500))
          if (cancelado) return
          setEstado((s) => ({
            mensajes: [...s.mensajes, { from: "bot", text: "" }],
            pensando: false,
          }))

          let escrito = ""
          for (const letra of mensaje.text) {
            escrito += letra
            const texto = escrito
            setEstado((s) => ({
              ...s,
              mensajes: [...s.mensajes.slice(0, -1), { from: "bot", text: texto }],
            }))

            let pausa = azar(26, 68)
            if (",.:¡?".includes(letra)) pausa += azar(160, 320)
            else if (letra === " " && Math.random() < 0.08) pausa += azar(120, 260)
            await esperar(pausa)
            if (cancelado) return
          }
        }

        await esperar(3200)
      }
    }

    reproducir()
    return () => {
      cancelado = true
    }
  }, [inView, sinMovimiento])

  const visible = sinMovimiento ? { mensajes: GUION, pensando: false } : estado
  const ultimo = visible.mensajes.length - 1
  // El mensaje en curso es el último si el agente aún no ha escrito todo su texto.
  const escribiendoUltimo =
    ultimo >= 0 &&
    visible.mensajes[ultimo].from === "bot" &&
    visible.mensajes[ultimo].text.length < GUION[ultimo].text.length

  return (
    <div
      ref={ref}
      aria-hidden
      data-live={inView}
      className={cn(
        "mv-live mv-card rounded-2xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur-sm",
        className
      )}
    >
      <div className="flex items-center gap-2.5">
        <span className="grid size-9 place-items-center rounded-full bg-brand-emerald/15 text-brand-emerald">
          <BotIcon className="size-5" />
        </span>
        <div className="leading-tight">
          <p className="text-sm font-semibold text-foreground">AutoClinic</p>
          <p className="text-xs text-muted-foreground">
            {visible.pensando || escribiendoUltimo ? "escribiendo…" : "Agente de citas · en línea"}
          </p>
        </div>
      </div>

      <div className="mt-3 flex h-56 flex-col justify-end gap-2 overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_22%)]">
        {visible.mensajes.map((mensaje, i) => (
          <Burbuja
            key={i}
            mensaje={mensaje}
            escribiendo={escribiendoUltimo && i === ultimo}
          />
        ))}
        {visible.pensando && <PuntosEscribiendo />}
      </div>
    </div>
  )
}
