"use client"

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react"
import Link from "next/link"
import { Collapsible } from "radix-ui"
import {
  ArrowRightIcon,
  CalculatorIcon,
  ChevronDownIcon,
  TriangleAlertIcon,
} from "lucide-react"

import { TiltCtaButton } from "@/components/ui/tilt-cta-button"
import { cn } from "@/lib/utils"
import {
  ALTA,
  MAX_PROFESIONALES,
  MIN_PROFESIONALES,
  balanceMensual,
  citasEquivalentes,
  cuotaMensual,
  decimal,
  entero,
  euros,
  horasAlMes,
  mesesParaAmortizarAlta,
  noShowsParaCubrirCuota,
  sugerenciaHorasAgente,
  sugerenciaNoShowsEvitados,
  valorHora,
} from "@/lib/autoclinic-pricing"

/** Un campo vacío vale 0 en la aritmética, pero se sigue viendo vacío. */
function aNumero(valor: string): number {
  const n = Number.parseFloat(valor.replace(",", "."))
  return Number.isFinite(n) && n > 0 ? n : 0
}

const claseInput =
  "h-11 w-full rounded-lg border border-white/10 bg-wha-bg/60 px-3 text-base text-wha-fg tabular-nums outline-none transition-colors placeholder:text-wha-muted/60 focus-visible:border-wha/50 focus-visible:ring-2 focus-visible:ring-wha/60"

const claseTarjeta =
  "rounded-2xl border border-white/8 bg-wha-card/60 backdrop-blur-sm"

export default function WhaRoiCalculator() {
  const [abierto, setAbierto] = useState(false)
  /**
   * El panel se recorta mientras crece para que la animación de altura no
   * desborde. Una vez quieto deja de recortarse: si no, la franja pegajosa
   * de móvil no puede despegarse de su contenedor.
   */
  const [panelEstable, setPanelEstable] = useState(false)

  const [profesionales, setProfesionales] = useState(1)
  const [precio, setPrecio] = useState("35")
  const [citasMes, setCitasMes] = useState("")
  const [noShowsActuales, setNoShowsActuales] = useState("")
  /** null = todavía con la sugerencia; una cadena = el usuario lo tocó. */
  const [evitadosInput, setEvitadosInput] = useState<string | null>(null)

  const [detalleAbierto, setDetalleAbierto] = useState(false)
  const [duracionCita, setDuracionCita] = useState("30")
  const [horasSemana, setHorasSemana] = useState("")
  const [horasAgenteInput, setHorasAgenteInput] = useState<string | null>(null)

  const temporizador = useRef<ReturnType<typeof setTimeout> | null>(null)

  const cambiarApertura = useCallback((valor: boolean) => {
    setAbierto(valor)
    if (temporizador.current) clearTimeout(temporizador.current)
    if (!valor) {
      setPanelEstable(false)
      return
    }
    temporizador.current = setTimeout(() => setPanelEstable(true), 240)
  }, [])

  // Si alguien llega con #calculadora, se abre sola. Arranca cerrada siempre
  // para que servidor y cliente pinten lo mismo en el primer render, y el
  // cambio se difiere un fotograma para no tocar el estado dentro del efecto.
  useEffect(() => {
    const id = requestAnimationFrame(() => {
      if (window.location.hash === "#calculadora") cambiarApertura(true)
    })
    return () => cancelAnimationFrame(id)
  }, [cambiarApertura])

  useEffect(
    () => () => {
      if (temporizador.current) clearTimeout(temporizador.current)
    },
    []
  )

  const cuota = cuotaMensual(profesionales)
  const precioNum = aNumero(precio)
  const hayPrecio = precioNum > 0

  const noShowsActualesNum = aNumero(noShowsActuales)
  const sugeridosEvitados = sugerenciaNoShowsEvitados(noShowsActualesNum)
  const evitados =
    evitadosInput === null ? sugeridosEvitados : aNumero(evitadosInput)

  const puntoEquilibrio = noShowsParaCubrirCuota(cuota, precioNum)
  const citasEq = citasEquivalentes(cuota, precioNum)
  const recuperado = evitados * precioNum
  const balance = balanceMensual(evitados, precioNum, cuota)
  const meses = mesesParaAmortizarAlta(balance)

  const duracionNum = aNumero(duracionCita)
  const precioHora = valorHora(precioNum, duracionNum)
  const horasSemanaNum = aNumero(horasSemana)
  const hayHoras = horasSemana.trim() !== "" && horasSemanaNum > 0
  const sugeridasHoras = sugerenciaHorasAgente(horasSemanaNum)
  const horasAgente =
    horasAgenteInput === null ? sugeridasHoras : aNumero(horasAgenteInput)
  const horasMes = horasAlMes(horasAgente)
  const valorTiempo = precioHora === null ? null : horasMes * precioHora

  const avisoEvitados = noShowsActualesNum > 0 && evitados > noShowsActualesNum
  const avisoHoras = horasSemanaNum > 0 && horasAgente > horasSemanaNum

  return (
    <section id="calculadora" className="scroll-mt-24 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-wha/30 bg-wha/10 px-4 py-1.5 text-xs font-semibold text-wha">
            <CalculatorIcon className="size-3.5" />
            Echa la cuenta
          </span>
          <h2 className="text-3xl font-semibold tracking-tight text-wha-fg md:text-4xl">
            La cuenta la haces tú,{" "}
            <span className="bg-linear-to-r from-wha to-wha-teal bg-clip-text text-transparent">
              con tus números
            </span>
          </h2>
        </div>

        <Collapsible.Root open={abierto} onOpenChange={cambiarApertura}>
          {/* Disparador: tarjeta ancha, el mismo relieve que las destacadas */}
          <Collapsible.Trigger
            className={cn(
              "group flex w-full items-center gap-4 rounded-2xl border border-wha/40 bg-linear-to-br from-wha/10 via-wha-card to-wha-teal/10 px-5 py-5 text-left backdrop-blur-sm",
              "transition-colors duration-200 hover:border-wha/60",
              "outline-none focus-visible:ring-2 focus-visible:ring-wha focus-visible:ring-offset-2 focus-visible:ring-offset-wha-bg",
              "md:px-7 md:py-6"
            )}
          >
            <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-wha to-wha-teal shadow-md shadow-wha/30">
              <CalculatorIcon className="size-5 text-white" />
            </span>

            <span className="min-w-0 flex-1">
              <span className="block text-base font-semibold text-wha-fg md:text-lg">
                ¿Te sale a cuenta? Hazla con tus números
              </span>
              <span className="mt-0.5 block text-sm text-wha-muted">
                Tus citas, tu precio, tus no-shows. Menos de un minuto.
              </span>
            </span>

            <ChevronDownIcon
              aria-hidden
              className="size-5 shrink-0 text-wha-muted transition-transform duration-300 group-data-[state=open]:rotate-180 motion-reduce:transition-none"
            />
          </Collapsible.Trigger>

          <Collapsible.Content
            className={cn(
              "data-[state=open]:animate-collapsible-down data-[state=closed]:animate-collapsible-up motion-reduce:animate-none",
              panelEstable ? "overflow-visible" : "overflow-hidden"
            )}
          >
            <div className="pt-6">
              <div className="grid gap-6 md:grid-cols-2 lg:gap-8">
                {/* ── Campos ─────────────────────────────────────────── */}
                <div className={cn(claseTarjeta, "p-5 md:p-6")}>
                  <h3 className="text-sm font-semibold text-wha-fg">
                    Tus números
                  </h3>

                  <div className="mt-5 flex flex-col gap-5">
                    {/* Profesionales */}
                    <div className="flex flex-col gap-2">
                      <span className="text-sm font-medium text-wha-fg">
                        Profesionales
                      </span>
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() =>
                            setProfesionales((n) =>
                              Math.max(MIN_PROFESIONALES, n - 1)
                            )
                          }
                          disabled={profesionales <= MIN_PROFESIONALES}
                          aria-label="Quitar un profesional"
                          className="flex size-11 items-center justify-center rounded-lg border border-white/10 bg-wha-bg/60 text-xl text-wha-fg transition-colors hover:border-wha/40 disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-wha"
                        >
                          −
                        </button>
                        <span
                          aria-live="polite"
                          className="min-w-[3ch] text-center text-2xl font-semibold tabular-nums text-wha-fg"
                        >
                          {profesionales}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            setProfesionales((n) =>
                              Math.min(MAX_PROFESIONALES, n + 1)
                            )
                          }
                          disabled={profesionales >= MAX_PROFESIONALES}
                          aria-label="Añadir un profesional"
                          className="flex size-11 items-center justify-center rounded-lg border border-white/10 bg-wha-bg/60 text-xl text-wha-fg transition-colors hover:border-wha/40 disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-wha"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <Campo id="roi-precio" etiqueta="Precio medio por cita (€)">
                      <input
                        id="roi-precio"
                        type="number"
                        inputMode="decimal"
                        min="0"
                        step="1"
                        value={precio}
                        onChange={(e) => setPrecio(e.target.value)}
                        className={claseInput}
                      />
                    </Campo>

                    <Campo
                      id="roi-citas"
                      etiqueta="Citas al mes"
                      ayuda="Opcional. Solo da contexto, no entra en la cuenta."
                    >
                      <input
                        id="roi-citas"
                        type="number"
                        inputMode="numeric"
                        min="0"
                        step="1"
                        placeholder="—"
                        value={citasMes}
                        onChange={(e) => setCitasMes(e.target.value)}
                        className={claseInput}
                      />
                    </Campo>

                    <Campo
                      id="roi-noshows"
                      etiqueta="No-shows al mes ahora mismo"
                      ayuda="Si no lo llevas contado, cuenta los de la semana pasada y multiplica por cuatro."
                    >
                      <input
                        id="roi-noshows"
                        type="number"
                        inputMode="numeric"
                        min="0"
                        step="1"
                        placeholder="—"
                        value={noShowsActuales}
                        onChange={(e) => setNoShowsActuales(e.target.value)}
                        className={claseInput}
                      />
                    </Campo>

                    <Campo
                      id="roi-evitados"
                      etiqueta="No-shows que crees que evitará el agente"
                      ayuda="Es un supuesto tuyo, no una medida del producto — edítalo con lo que te parezca realista. Empezamos sugiriendo uno de cada tres de tus no-shows actuales."
                    >
                      <div className="flex items-center gap-2">
                        <input
                          id="roi-evitados"
                          type="number"
                          inputMode="numeric"
                          min="0"
                          step="1"
                          value={
                            evitadosInput === null
                              ? String(sugeridosEvitados)
                              : evitadosInput
                          }
                          onChange={(e) => setEvitadosInput(e.target.value)}
                          className={claseInput}
                        />
                        {evitadosInput !== null && (
                          <button
                            type="button"
                            onClick={() => setEvitadosInput(null)}
                            className="shrink-0 rounded-md px-2 py-1 text-xs text-wha-teal underline underline-offset-4 transition-colors hover:text-wha-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-wha"
                          >
                            usar sugerencia
                          </button>
                        )}
                      </div>
                      {avisoEvitados && (
                        <Aviso>
                          Eso es más no-shows de los que dices tener al mes.
                        </Aviso>
                      )}
                    </Campo>
                  </div>

                  {/* ── Bloque plegado: el coste de contestar ─────────── */}
                  <Collapsible.Root
                    open={detalleAbierto}
                    onOpenChange={setDetalleAbierto}
                    className="mt-6 border-t border-white/8 pt-5"
                  >
                    <Collapsible.Trigger className="group flex w-full items-center gap-3 rounded-lg text-left outline-none focus-visible:ring-2 focus-visible:ring-wha">
                      <span className="min-w-0 flex-1">
                        <span className="block text-sm font-semibold text-wha-fg">
                          Lo que te cuesta contestar el WhatsApp
                        </span>
                        <span className="mt-0.5 block text-xs text-wha-muted">
                          Opcional, pero suele ser la cuenta que más pesa
                        </span>
                      </span>
                      <ChevronDownIcon
                        aria-hidden
                        className="size-4 shrink-0 text-wha-muted transition-transform duration-300 group-data-[state=open]:rotate-180 motion-reduce:transition-none"
                      />
                    </Collapsible.Trigger>

                    <Collapsible.Content className="overflow-hidden data-[state=open]:animate-collapsible-down data-[state=closed]:animate-collapsible-up motion-reduce:animate-none">
                      <div className="flex flex-col gap-5 pt-5">
                        <Campo
                          id="roi-duracion"
                          etiqueta="Duración de tu cita tipo (minutos)"
                          ayuda={
                            precioHora === null
                              ? undefined
                              : `Con eso, tu hora de consulta vale ${euros(precioHora)}.`
                          }
                        >
                          <input
                            id="roi-duracion"
                            type="number"
                            inputMode="numeric"
                            min="0"
                            step="5"
                            value={duracionCita}
                            onChange={(e) => setDuracionCita(e.target.value)}
                            className={claseInput}
                          />
                        </Campo>

                        <Campo
                          id="roi-horas"
                          etiqueta="Horas a la semana contestando WhatsApp y llamadas"
                        >
                          <input
                            id="roi-horas"
                            type="number"
                            inputMode="decimal"
                            min="0"
                            step="0.5"
                            placeholder="—"
                            value={horasSemana}
                            onChange={(e) => setHorasSemana(e.target.value)}
                            className={claseInput}
                          />
                        </Campo>

                        <Campo
                          id="roi-horas-agente"
                          etiqueta="De esas horas, las que se llevaría el agente"
                          ayuda="Otro supuesto tuyo. Empezamos por la mitad: las preguntas de siempre —horarios, precios, dónde estáis— y el ir y venir para cuadrar una hora. Tú entras cuando el agente te avisa de que algo se le escapa, o cuando quieras."
                        >
                          <div className="flex items-center gap-2">
                            <input
                              id="roi-horas-agente"
                              type="number"
                              inputMode="decimal"
                              min="0"
                              step="0.5"
                              value={
                                horasAgenteInput === null
                                  ? String(sugeridasHoras)
                                  : horasAgenteInput
                              }
                              onChange={(e) =>
                                setHorasAgenteInput(e.target.value)
                              }
                              className={claseInput}
                            />
                            {horasAgenteInput !== null && (
                              <button
                                type="button"
                                onClick={() => setHorasAgenteInput(null)}
                                className="shrink-0 rounded-md px-2 py-1 text-xs text-wha-teal underline underline-offset-4 transition-colors hover:text-wha-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-wha"
                              >
                                usar sugerencia
                              </button>
                            )}
                          </div>
                          {avisoHoras && (
                            <Aviso>
                              Eso es más horas de las que dices dedicarle a la
                              semana.
                            </Aviso>
                          )}
                        </Campo>
                      </div>
                    </Collapsible.Content>
                  </Collapsible.Root>
                </div>

                {/* ── Resultados ─────────────────────────────────────── */}
                <div className="flex flex-col gap-4 md:sticky md:top-24 md:self-start">
                  {/* Punto de equilibrio: una división, no un supuesto */}
                  <div className="rounded-2xl border border-wha/40 bg-linear-to-br from-wha/10 via-wha-card to-wha-teal/10 p-5 backdrop-blur-sm md:p-6">
                    <p className="text-sm text-wha-muted">
                      La cuota se paga sola con
                    </p>
                    <p className="mt-1 flex items-baseline gap-2">
                      <span className="text-5xl font-bold tabular-nums text-wha-fg">
                        {entero(puntoEquilibrio)}
                      </span>
                      <span className="text-sm text-wha-fg">
                        no-shows evitados al mes
                      </span>
                    </p>
                    <p className="mt-3 text-xs leading-relaxed text-wha-muted">
                      {hayPrecio ? (
                        <>
                          A {euros(precioNum)} tu cita, tu cuota de{" "}
                          {euros(cuota)}/mes son {decimal(citasEq)} citas.
                        </>
                      ) : (
                        <>
                          Introduce el precio medio de tu cita para ver la
                          cuenta.
                        </>
                      )}
                    </p>
                  </div>

                  {/* Cuota */}
                  <div className={cn(claseTarjeta, "p-5")}>
                    <p className="text-sm text-wha-muted">Tu cuota AutoClinic</p>
                    <p className="mt-1 flex items-baseline gap-1.5">
                      <span className="text-2xl font-semibold tabular-nums text-wha-fg">
                        {euros(cuota)}
                      </span>
                      <span className="text-sm text-wha-muted">/mes</span>
                    </p>
                    <p className="mt-1.5 text-xs text-wha-muted">
                      IVA no incluido
                    </p>
                  </div>

                  {/* Balance */}
                  <div className={cn(claseTarjeta, "p-5")}>
                    <p className="text-sm text-wha-muted">
                      Con tu supuesto, balance neto al mes
                    </p>
                    <p
                      className={cn(
                        "mt-1 text-2xl font-semibold tabular-nums",
                        balance >= 0 ? "text-emerald-400" : "text-wha-fg"
                      )}
                    >
                      {balance > 0 ? "+" : ""}
                      {euros(balance)}
                    </p>
                    <dl className="mt-3 space-y-1.5 text-xs">
                      <div className="flex items-baseline justify-between gap-3">
                        <dt className="text-wha-muted">
                          {entero(evitados)} no-shows × {euros(precioNum)}
                        </dt>
                        <dd className="shrink-0 tabular-nums text-wha-fg">
                          {euros(recuperado)}
                        </dd>
                      </div>
                      <div className="flex items-baseline justify-between gap-3 border-t border-white/8 pt-1.5">
                        <dt className="text-wha-muted">Cuota AutoClinic</dt>
                        <dd className="shrink-0 tabular-nums text-wha-fg">
                          −{euros(cuota)}
                        </dd>
                      </div>
                    </dl>
                  </div>

                  {/* Tiempo — solo si ha dicho cuántas horas dedica */}
                  {hayHoras && (
                    <div className={cn(claseTarjeta, "p-5")}>
                      <p className="text-sm text-wha-muted">
                        Y el tiempo que te devuelve
                      </p>
                      <p className="mt-1 text-2xl font-semibold tabular-nums text-wha-fg">
                        {euros(valorTiempo)}
                        <span className="ml-1 text-sm font-normal text-wha-muted">
                          /mes
                        </span>
                      </p>
                      <p className="mt-2 text-xs leading-relaxed text-wha-muted">
                        {decimal(horasMes)} horas al mes a {euros(precioHora)} la
                        hora, que es lo que vale la tuya en consulta.
                      </p>
                      <p className="mt-2 text-xs leading-relaxed text-wha-muted/80">
                        No es dinero que entra: son horas que dejas de pasar en
                        el móvil.
                      </p>
                    </div>
                  )}

                  {/* Alta */}
                  <div className={cn(claseTarjeta, "p-5")}>
                    <p className="text-sm text-wha-muted">
                      Alta y puesta en marcha
                    </p>
                    <p className="mt-1 text-2xl font-semibold tabular-nums text-wha-fg">
                      {euros(ALTA)}
                      <span className="ml-1 text-sm font-normal text-wha-muted">
                        pago único
                      </span>
                    </p>
                    <p className="mt-2 text-xs leading-relaxed text-wha-muted">
                      {meses === null ? (
                        <>
                          Con estos números la cuota aún no se cubre sola. Prueba
                          con tus cifras reales.
                        </>
                      ) : (
                        <>
                          Con este balance, el alta se amortiza en{" "}
                          {entero(meses)}{" "}
                          {meses === 1 ? "mes" : "meses"}.
                        </>
                      )}
                    </p>
                  </div>

                  <p className="text-xs leading-relaxed text-wha-muted">
                    La cuenta usa solo los números que has metido. No hay datos
                    de otras clínicas ni porcentajes de mejora prometidos.
                  </p>

                  <p className="text-[11px] leading-relaxed text-wha-muted/70">
                    Precio de lanzamiento. La mensajería de WhatsApp está
                    incluida según las tarifas vigentes de Meta; si Meta cambia
                    sus tarifas, la cuota podría ajustarse avisando con 30 días.
                  </p>

                  <TiltCtaButton
                    tone="wha"
                    flat
                    size="lg"
                    className="h-11 w-full gap-2 bg-linear-to-r from-wha via-wha-alt to-wha-teal px-6 text-base font-semibold text-white hover:opacity-90 [&_svg]:transition-transform hover:[&_svg]:translate-x-1"
                    asChild
                  >
                    <Link
                      href="https://calendar.app.google/CNBch8s1Q8iqoqdE9"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Revisa estos números con nosotros
                      <ArrowRightIcon className="size-4" />
                    </Link>
                  </TiltCtaButton>
                </div>
              </div>

              {/* Resumen pegajoso, solo en móvil y solo dentro del panel */}
              <div className="sticky bottom-0 z-10 -mx-4 mt-6 border-t border-white/10 bg-wha-card/95 px-4 py-3 pb-[env(safe-area-inset-bottom)] backdrop-blur-sm md:hidden">
                <p className="py-1 text-center text-sm text-wha-fg">
                  Se paga sola con{" "}
                  <span className="font-semibold tabular-nums text-wha-teal">
                    {entero(puntoEquilibrio)}
                  </span>{" "}
                  no-shows/mes
                </p>
              </div>
            </div>
          </Collapsible.Content>
        </Collapsible.Root>
      </div>
    </section>
  )
}

/* ── Piezas sueltas ─────────────────────────────────────────────────────── */

function Campo({
  id,
  etiqueta,
  ayuda,
  children,
}: {
  id: string
  etiqueta: string
  ayuda?: ReactNode
  children: ReactNode
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm font-medium text-wha-fg">
        {etiqueta}
      </label>
      {children}
      {ayuda && (
        <p className="text-xs leading-relaxed text-wha-muted">{ayuda}</p>
      )}
    </div>
  )
}

function Aviso({ children }: { children: ReactNode }) {
  return (
    <p className="flex items-start gap-1.5 text-xs leading-relaxed text-amber-300">
      <TriangleAlertIcon aria-hidden className="mt-0.5 size-3.5 shrink-0" />
      {children}
    </p>
  )
}
