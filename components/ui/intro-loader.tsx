"use client"

import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { introEstado, marcarEscena } from "@/lib/intro-loader"

// La pantalla no baja de MIN_MS para que el anillo se vea completarse incluso
// con todo en caché (sin esto parpadearía). MAX_MS es la red de seguridad: si
// el 3D no llega (red caída, error del runtime), se descubre la web igual.
const MIN_MS = 1100
const MAX_MS = 10_000
// Igual que la transición de salida de globals.css.
const SALIDA_MS = 650
// El anillo completo se ve un instante antes de que la pantalla se vaya.
const PAUSA_FINAL_MS = 220

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
 * Bloquea el scroll mientras dura la carga SIN tocar el layout: no usa
 * `overflow: hidden` (que quita la barra de scroll y obliga a reservar un hueco
 * `scrollbar-gutter` a la derecha que el overlay no puede cubrir, o a mover
 * todo al devolverla). Intercepta rueda, táctil y teclado, y si algo más
 * desplaza la página (arrastrar la barra, enfocar con Tab), la devuelve a su
 * sitio. Devuelve la función que lo suelta.
 */
function bloquearScroll() {
  const y0 = window.scrollY
  const detener = (e: Event) => e.preventDefault()
  const teclas = (e: KeyboardEvent) => {
    if ([" ", "PageUp", "PageDown", "Home", "End", "ArrowUp", "ArrowDown"].includes(e.key)) {
      e.preventDefault()
    }
  }
  const volver = () => {
    if (window.scrollY !== y0) window.scrollTo({ top: y0, behavior: "instant" })
  }
  window.addEventListener("wheel", detener, { passive: false })
  window.addEventListener("touchmove", detener, { passive: false })
  window.addEventListener("keydown", teclas)
  window.addEventListener("scroll", volver, { passive: true })
  return () => {
    window.removeEventListener("wheel", detener)
    window.removeEventListener("touchmove", detener)
    window.removeEventListener("keydown", teclas)
    window.removeEventListener("scroll", volver)
  }
}

/**
 * Pantalla de carga a pantalla completa, encima del hero (y del menú), hasta
 * que el logo 3D está listo. Se pinta ya en el HTML del servidor, así que
 * tapa el hueco del 3D desde el primer frame.
 *
 * Cómo evita parecer colgada:
 *  - El avance no tiene tramos quietos: el techo al que tiende sube despacio
 *    con el tiempo, así que el anillo siempre se mueve un poco mientras espera.
 *  - Cada frame avanza como mucho 100 ms de tiempo: si el hilo principal se
 *    bloquea (el 3D se descomprime justo entonces), el anillo reanuda donde
 *    estaba en lugar de dar un salto.
 *  - Lo que "respira" (ondas, latido, arco que gira) es CSS de transform y
 *    opacity, que corre en el compositor y sigue aunque JS esté ocupado.
 *
 * El anillo y el texto de estado se actualizan por refs y variables CSS, sin
 * renderizar React en cada frame. Estilos en globals.css (bloque "Pantalla de
 * carga").
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

  useEffect(() => {
    if (fase !== "cargando") return

    const raiz = raizRef.current
    const estadoEl = estadoRef.current

    // Mientras dura, la página de debajo no se desplaza.
    const soltar = bloquearScroll()

    if (!hayWebGL()) marcarEscena()

    const inicio = performance.now()
    let previo = inicio
    // Hasta ahora --p la movía la animación CSS de arranque: se continúa desde
    // donde esté, sin salto, y se le quita el mando.
    let valor = raiz
      ? Math.min(Math.max(parseFloat(getComputedStyle(raiz).getPropertyValue("--p")) || 0, 0), 90)
      : 0
    raiz?.setAttribute("data-js", "")
    raiz?.style.setProperty("--p", valor.toFixed(2))
    let ultimoTexto = ""
    let raf = 0
    let pausa = 0
    let cerrado = false

    const pintar = (v: number) => {
      raiz?.style.setProperty("--p", v.toFixed(2))
    }
    const escribirEstado = (texto: string) => {
      if (estadoEl && texto !== ultimoTexto) {
        estadoEl.textContent = texto
        ultimoTexto = texto
        // En "Listo" los puntos de espera se ocultan.
        raiz?.toggleAttribute("data-listo", texto === "Listo")
      }
    }

    const cerrar = () => {
      if (cerrado) return
      cerrado = true
      cancelAnimationFrame(raf)
      pintar(100)
      escribirEstado("Listo")
      soltar()
      pausa = window.setTimeout(() => setFase("saliendo"), PAUSA_FINAL_MS)
    }

    // Avance suavizado hacia un techo que depende del hito alcanzado y que
    // además sube despacio con el tiempo (nunca promete 100 hasta que la
    // escena existe de verdad): sin motor tiende a ~56-78 %, con motor a
    // ~88-97 %, y con la escena lista a 100.
    const tick = (ahora: number) => {
      // dt nunca negativo (el primer frame puede traer una marca anterior a
      // `inicio`) ni mayor de 100 ms.
      const dt = Math.min(Math.max((ahora - previo) / 1000, 0), 0.1)
      previo = ahora
      const { motor, escena } = introEstado
      const lento = 1 - Math.exp(-Math.max(ahora - inicio, 0) / 7000)
      const techo = escena ? 100 : motor ? 88 + 9 * lento : 56 + 22 * lento
      const ritmo = escena ? 4 : 1.2
      // Tope de velocidad (puntos por segundo): sin saltos al llegar un hito.
      const tope = (escena ? 80 : 30) * dt
      valor += Math.max(Math.min((techo - valor) * (1 - Math.exp(-ritmo * dt)), tope), 0)
      pintar(valor)
      escribirEstado(escena ? "Listo" : motor ? "Cargando el logo 3D" : "Preparando")

      if (escena && valor >= 99 && ahora - inicio >= MIN_MS) {
        // Dos frames de margen para que el primer pintado del 3D no coincida
        // con el inicio del fundido.
        raf = requestAnimationFrame(() => {
          raf = requestAnimationFrame(cerrar)
        })
        return
      }
      raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)
    const limite = window.setTimeout(cerrar, MAX_MS)

    return () => {
      cancelAnimationFrame(raf)
      window.clearTimeout(limite)
      window.clearTimeout(pausa)
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

      <div className="malla-grano" aria-hidden />

      <div className="intro-escena" aria-hidden>
        <div className="intro-nucleo">
          <span className="intro-onda" />
          <span className="intro-onda intro-onda-2" />
          <span className="intro-disco" />

          <svg className="intro-anillo" viewBox="0 0 120 120">
            <defs>
              <linearGradient id="intro-gradiente" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" style={{ stopColor: "var(--brand-sky)" }} />
                <stop offset="0.55" style={{ stopColor: "var(--brand-teal)" }} />
                <stop offset="1" style={{ stopColor: "var(--brand-green)" }} />
              </linearGradient>
            </defs>
            <circle className="intro-pista" cx="60" cy="60" r="54" />
            <circle className="intro-avance" cx="60" cy="60" r="54" />
          </svg>
          <svg className="intro-orbita" viewBox="0 0 120 120">
            <circle className="intro-arco" cx="60" cy="60" r="54" />
          </svg>

          <Image
            className="intro-logo"
            src="/favicons/noBGpropus1024.png"
            alt=""
            width={96}
            height={96}
            priority
          />
        </div>

        <p className="intro-marca">Propus</p>
        <p className="intro-estado">
          <span ref={estadoRef}>Preparando</span>
          <span className="intro-puntos">
            <i />
            <i />
            <i />
          </span>
        </p>
      </div>
    </div>
  )
}
