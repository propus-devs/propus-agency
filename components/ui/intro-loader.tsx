"use client"

import { useEffect, useRef, useState } from "react"
import { introEstado, marcarEscena } from "@/lib/intro-loader"

// La pantalla no baja de MIN_MS para que la barra se vea completarse incluso
// con todo en caché (sin esto parpadearía). MAX_MS es la red de seguridad: si
// el 3D no llega (red caída, error del runtime), se descubre la web igual.
const MIN_MS = 1100
const MAX_MS = 10_000
const SALIDA_MS = 700

type Fase = "cargando" | "saliendo" | "fuera"

// Sin WebGL (algunos navegadores antiguos, rastreadores, modo ahorro) el 3D no
// va a cargar nunca: no tiene sentido hacer esperar.
function hayWebGL() {
  try {
    const canvas = document.createElement("canvas")
    const gl = canvas.getContext("webgl2") ?? canvas.getContext("webgl")
    if (!gl) return false
    gl.getExtension("WEBGL_lose_context")?.loseContext()
    return true
  } catch {
    return false
  }
}

/**
 * Pantalla de carga a pantalla completa, encima del hero (y del menú), hasta
 * que el logo 3D está listo. Se pinta ya en el HTML del servidor, así que
 * tapa el hueco del 3D desde el primer frame.
 *
 * La barra y el contador se actualizan por refs, sin renderizar React en cada
 * frame. Estilos en globals.css (bloque "Pantalla de carga").
 */
export function IntroLoader() {
  // Al volver a la portada por navegación del cliente la escena ya cargó en
  // esta sesión: no se muestra. En una carga normal siempre empieza activa,
  // igual que en el servidor (no hay desajuste de hidratación).
  const [fase, setFase] = useState<Fase>(() =>
    typeof window !== "undefined" && introEstado.escena ? "fuera" : "cargando"
  )
  const raizRef = useRef<HTMLDivElement>(null)
  const estadoRef = useRef<HTMLSpanElement>(null)
  const numeroRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (fase !== "cargando") return

    const raiz = raizRef.current
    const estadoEl = estadoRef.current
    const numeroEl = numeroRef.current
    const html = document.documentElement

    // Mientras dura, la página de debajo no se desplaza. El gutter evita el
    // salto lateral al devolver la barra de scroll.
    html.style.overflow = "hidden"
    html.style.scrollbarGutter = "stable"
    const soltar = () => {
      html.style.removeProperty("overflow")
      html.style.removeProperty("scrollbar-gutter")
    }

    if (!hayWebGL()) marcarEscena()

    const inicio = performance.now()
    let previo = inicio
    let valor = 0
    let ultimoTexto = ""
    let raf = 0
    let cerrado = false

    const pintar = (v: number) => {
      raiz?.style.setProperty("--p", v.toFixed(2))
      if (numeroEl) numeroEl.textContent = String(Math.floor(v)).padStart(3, "0")
    }
    const escribirEstado = (texto: string) => {
      if (estadoEl && texto !== ultimoTexto) {
        estadoEl.textContent = texto
        ultimoTexto = texto
      }
    }

    const cerrar = () => {
      if (cerrado) return
      cerrado = true
      cancelAnimationFrame(raf)
      pintar(100)
      escribirEstado("Listo")
      soltar()
      setFase("saliendo")
    }

    // Avance suavizado hacia un techo que depende del hito alcanzado: nunca
    // promete más de lo que hay (55 % sin motor, 92 % sin escena) y solo
    // llega a 100 cuando la escena existe de verdad.
    const tick = (ahora: number) => {
      const dt = Math.min((ahora - previo) / 1000, 1)
      previo = ahora
      const { motor, escena } = introEstado
      const techo = escena ? 100 : motor ? 92 : 55
      const ritmo = escena ? 5 : motor ? 0.8 : 0.6
      valor += (techo - valor) * (1 - Math.exp(-ritmo * dt))
      pintar(valor)
      escribirEstado(escena ? "Listo" : motor ? "Cargando escena 3D" : "Iniciando")

      if (escena && valor >= 99 && ahora - inicio >= MIN_MS) {
        cerrar()
        return
      }
      raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)
    const limite = window.setTimeout(cerrar, MAX_MS)

    return () => {
      cancelAnimationFrame(raf)
      window.clearTimeout(limite)
      soltar()
    }
  }, [fase])

  useEffect(() => {
    if (fase !== "saliendo") return
    const t = window.setTimeout(() => setFase("fuera"), SALIDA_MS)
    return () => window.clearTimeout(t)
  }, [fase])

  if (fase === "fuera") return null

  return (
    <div ref={raizRef} className="intro-loader" data-fase={fase} role="status">
      <span className="sr-only">Cargando Propus</span>

      <div className="intro-hud" aria-hidden>
        <span className="intro-esquina intro-esquina-tl" />
        <span className="intro-esquina intro-esquina-tr" />
        <span className="intro-esquina intro-esquina-bl" />
        <span className="intro-esquina intro-esquina-br" />

        <div className="intro-centro">
          <p className="intro-marca font-heading">Propus</p>

          <div className="intro-barra-halo">
            <div className="intro-barra">
              <div className="intro-barra-relleno" />
            </div>
          </div>

          <div className="intro-meta">
            <span ref={estadoRef} className="intro-estado">
              Iniciando
            </span>
            <span className="intro-numero">
              <span ref={numeroRef}>000</span>%
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
