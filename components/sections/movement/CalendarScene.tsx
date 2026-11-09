import type { CSSProperties } from "react"
import {
  BellIcon,
  CalendarDaysIcon,
  CheckIcon,
  ClockIcon,
  MessageCircleIcon,
  UserRoundIcon,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Live } from "./Live"

const DIAS = ["L", "M", "X", "J", "V"] as const
const HORAS = ["9:00", "10:00", "11:00", "12:00"] as const

// Misma plantilla en la rejilla de fondo y en la capa de reservas, para que
// las celdas coincidan. col/row son celdas 1-based del calendario.
const PLANTILLA =
  "grid-cols-[2rem_repeat(5,minmax(0,1fr))] grid-rows-[1.25rem_repeat(4,2.25rem)] gap-1"

const PETICIONES = [
  { i: 0, col: 2, row: 2, ini: "M", tono: "bg-sky-400/30 text-sky-100", cita: "Mar 10:00" },
  { i: 1, col: 4, row: 1, ini: "J", tono: "bg-violet-400/30 text-violet-100", cita: "Jue 9:00" },
  { i: 2, col: 1, row: 3, ini: "A", tono: "bg-amber-400/30 text-amber-100", cita: "Lun 11:00" },
  { i: 3, col: 5, row: 4, ini: "L", tono: "bg-rose-400/30 text-rose-100", cita: "Vie 12:00" },
] as const

/** Cubo que gira con un icono por cara: los avisos y reservas, en 3D con CSS. */
function Cubo() {
  const caras = [
    { Icono: CalendarDaysIcon, giro: "rotateY(0deg)" },
    { Icono: BellIcon, giro: "rotateY(90deg)" },
    { Icono: CheckIcon, giro: "rotateY(180deg)" },
    { Icono: MessageCircleIcon, giro: "rotateY(-90deg)" },
    { Icono: ClockIcon, giro: "rotateX(90deg)" },
    { Icono: UserRoundIcon, giro: "rotateX(-90deg)" },
  ]

  return (
    <div className="[perspective:300px]">
      <div className="mv-cube relative size-8 [transform-style:preserve-3d]">
        {caras.map(({ Icono, giro }) => (
          <span
            key={giro}
            className="absolute inset-0 grid place-items-center border border-brand-emerald/40 bg-brand-emerald/15 text-brand-emerald"
            style={{ transform: `${giro} translateZ(1rem)` }}
          >
            <Icono className="size-4" />
          </span>
        ))}
      </div>
    </div>
  )
}

/**
 * Calendario semanal donde van entrando solicitudes de reserva: aparece la
 * persona (inicial), pasa de "pendiente" a "confirmada" y un aviso lo cuenta
 * debajo. Todo con CSS (ver "Movement: escenas en vivo" en globals.css).
 */
export function CalendarScene({ className }: { className?: string }) {
  return (
    <Live className={className}>
      <div className="mv-card rounded-2xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <Cubo />
          <div className="leading-tight">
            <p className="text-sm font-semibold text-foreground">Reservas online</p>
            <p className="text-xs text-muted-foreground">Se agendan solas</p>
          </div>
        </div>

        <div className="relative mt-4">
          <div className={cn("grid", PLANTILLA)}>
            <span />
            {DIAS.map((dia) => (
              <span key={dia} className="text-center text-[10px] text-muted-foreground">
                {dia}
              </span>
            ))}
            {HORAS.map((hora) => (
              <FilaHora key={hora} hora={hora} />
            ))}
          </div>

          <div className={cn("pointer-events-none absolute inset-0 grid", PLANTILLA)}>
            {PETICIONES.map((p) => (
              <div
                key={p.cita}
                className="mv-chip relative grid place-items-center rounded-md border border-brand-emerald/40 bg-brand-emerald/15"
                style={{ gridColumn: p.col + 1, gridRow: p.row + 1, "--i": p.i } as CSSProperties}
              >
                <span
                  className={cn(
                    "grid size-6 place-items-center rounded-full text-[11px] font-semibold",
                    p.tono
                  )}
                >
                  {p.ini}
                </span>
                <span className="mv-ok absolute -right-1 -top-1 grid size-3.5 place-items-center rounded-full bg-brand-emerald text-background">
                  <CheckIcon className="size-2.5" strokeWidth={3} />
                </span>
                <span className="mv-pending absolute -right-1 -top-1 grid size-3.5 place-items-center rounded-full bg-amber-400 text-background">
                  <ClockIcon className="size-2.5" strokeWidth={3} />
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative mt-3 h-10">
          {PETICIONES.map((p) => (
            <div
              key={p.cita}
              className="mv-toast absolute inset-0 flex items-center gap-2 rounded-lg border border-white/10 bg-black/30 px-2.5 text-xs"
              style={{ "--i": p.i } as CSSProperties}
            >
              <span
                className={cn(
                  "grid size-6 shrink-0 place-items-center rounded-full text-[11px] font-semibold",
                  p.tono
                )}
              >
                {p.ini}
              </span>
              <span className="relative h-4 flex-1 overflow-hidden">
                <span className="mv-pending-t absolute inset-0 truncate text-muted-foreground">
                  Pide cita · {p.cita}
                </span>
                <span className="mv-ok-t absolute inset-0 truncate text-brand-emerald">
                  Confirmada · {p.cita}
                </span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </Live>
  )
}

function FilaHora({ hora }: { hora: string }) {
  return (
    <>
      <span className="self-center text-[10px] text-muted-foreground">{hora}</span>
      {DIAS.map((dia) => (
        <span key={dia} className="rounded-md bg-white/[0.04]" />
      ))}
    </>
  )
}
