"use client"

import dynamic from "next/dynamic"
import { preload } from "react-dom"
import { useCallback, useEffect, useMemo, useRef } from "react"
import type { Application, SPEObject } from "@splinetool/runtime"
import { marcarEscena, marcarMotor } from "@/lib/intro-loader"

// `marcarMotor` avisa a la pantalla de carga de la portada de que el código
// del motor 3D ya está descargado (primer hito de la barra).
const Spline = dynamic(
  () =>
    import("@splinetool/react-spline").then((modulo) => {
      marcarMotor()
      return modulo
    }),
  {
    ssr: false,
    loading: () => null,
  }
)

interface SplineSceneProps {
  scene: string
  className?: string
  /** Nombre EXACTO del objeto en el árbol de Spline (sensible a mayúsculas) */
  objectName?: string
  /** Radianes de giro por píxel arrastrado */
  sensitivity?: number
  /** Tope de inclinación vertical, en radianes */
  maxTilt?: number
  /** Suavizado del seguimiento (0-1): más bajo = más inercia */
  damping?: number
  /**
   * Zona desde la que se puede agarrar y girar el logo: un círculo centrado en
   * el canvas. 1 = el círculo toca los bordes del canvas; 0.85 = el logo y un
   * pelín alrededor. Fuera de la zona no se gira nada y el texto se selecciona
   * con normalidad.
   */
  grabRadius?: number
}

const EPSILON = 0.0005

// Se calcula una sola vez por carga de página, fuera del render para no
// introducir impureza en el memo de abajo.
const DEV_CACHE_BUSTER =
  process.env.NODE_ENV === "development" ? Date.now().toString(36) : ""

function isInteractive(target: EventTarget | null) {
  return (
    target instanceof Element &&
    target.closest("a, button, input, textarea, select, [role='button'], [contenteditable='true']") !== null
  )
}

// Bloques de texto: sobre ellos manda la selección, nunca se agarra el logo.
// Importa en móvil, donde el logo va detrás del texto del hero.
function isTextBlock(target: EventTarget | null) {
  return (
    target instanceof Element &&
    target.closest("h1, h2, h3, h4, h5, h6, p, li, blockquote") !== null
  )
}

export function SplineScene({
  scene,
  className,
  objectName = "Group",
  sensitivity = 0.005,
  maxTilt = Math.PI / 6,
  damping = 0.08,
  grabRadius = 0.85,
}: SplineSceneProps) {
  const objectRef = useRef<SPEObject | null>(null)
  const baseRotation = useRef({ x: 0, y: 0 })
  const target = useRef({ x: 0, y: 0 })
  const current = useRef({ x: 0, y: 0 })
  const frame = useRef<number | null>(null)

  // Las escenas remotas se piden en desarrollo con un parámetro único por carga:
  // al republicar en Spline la URL no cambia y prod.spline.design no manda
  // Cache-Control, así que el navegador puede servir una copia rancia. Las
  // escenas locales las revalida el propio servidor de Next.
  const sceneUrl = useMemo(() => {
    if (!DEV_CACHE_BUSTER || !/^https?:\/\//.test(scene)) return scene
    const url = new URL(scene)
    url.searchParams.set("_dev", DEV_CACHE_BUSTER)
    return url.toString()
  }, [scene])

  // La escena se pide ya, en paralelo a la descarga del motor, en vez de
  // esperar a que el motor arranque y la pida él.
  preload(sceneUrl, { as: "fetch", crossOrigin: "anonymous" })

  const dragging = useRef(false)
  const dragOrigin = useRef({ x: 0, y: 0 })
  const dragRotation = useRef({ x: 0, y: 0 })

  // Pausa del render fuera de pantalla: el canvas WebGL sigue pintando aunque
  // el hero ya no se vea, y en móvil eso compite con el scroll. `stop()` /
  // `play()` son la API del runtime; el aspecto y el movimiento no cambian.
  const appRef = useRef<Application | null>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const visible = useRef(true)

  const syncPlayback = useCallback(() => {
    const app = appRef.current
    if (!app) return
    if (visible.current && app.isStopped) app.play()
    else if (!visible.current && !app.isStopped) app.stop()
  }, [])

  useEffect(() => {
    const el = wrapperRef.current
    if (!el || typeof IntersectionObserver === "undefined") return

    const observer = new IntersectionObserver(([entry]) => {
      visible.current = entry.isIntersecting
      syncPlayback()
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [syncPlayback])

  const onLoad = useCallback(
    (spline: Application) => {
      // React StrictMode monta el efecto interno de react-spline dos veces en
      // dev: la primera Application se destruye antes de resolver su load().
      // Escribir sobre sus objetos no repinta nada, así que la descartamos.
      if ((spline as Application & { disposed?: boolean }).disposed) return

      appRef.current = spline
      // Segundo hito de la pantalla de carga: la escena ya existe.
      marcarEscena()
      // Si la escena termina de cargar con el hero ya fuera de pantalla
      // (recarga a mitad de página), arranca pausada.
      syncPlayback()

      const object = spline.findObjectByName(objectName)
      if (!object) {
        console.warn(
          `[SplineScene] No hay ningún objeto llamado "${objectName}" en la escena.`,
          "Nombres disponibles:",
          spline.getAllObjects().map((o) => o.name)
        )
        return
      }

      objectRef.current = object
      baseRotation.current = { x: object.rotation.x, y: object.rotation.y }
    },
    [objectName, syncPlayback]
  )

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduceMotion) return

    const tick = () => {
      const object = objectRef.current
      if (!object) {
        frame.current = null
        return
      }

      const dx = target.current.x - current.current.x
      const dy = target.current.y - current.current.y

      if (Math.abs(dx) < EPSILON && Math.abs(dy) < EPSILON) {
        // Ya convergió: paramos el bucle para no forzar un repintado por frame
        // (el runtime de Spline usa renderOnDemand).
        frame.current = null
        return
      }

      current.current.x += dx * damping
      current.current.y += dy * damping

      object.rotation.x = baseRotation.current.x + current.current.x
      object.rotation.y = baseRotation.current.y + current.current.y

      frame.current = requestAnimationFrame(tick)
    }

    const requestFrame = () => {
      if (frame.current === null) frame.current = requestAnimationFrame(tick)
    }

    const stopDrag = () => {
      if (!dragging.current) return
      dragging.current = false
      document.body.style.removeProperty("cursor")
      document.body.style.removeProperty("user-select")
    }

    // El canvas no recibe eventos (pointer-events: none, para no tapar enlaces
    // ni texto), así que la zona agarrable se calcula a mano con su rectángulo.
    const inGrabZone = (x: number, y: number) => {
      const el = wrapperRef.current
      if (!el) return false
      const rect = el.getBoundingClientRect()
      const radius = (Math.min(rect.width, rect.height) / 2) * grabRadius
      return (
        Math.hypot(x - (rect.left + rect.width / 2), y - (rect.top + rect.height / 2)) <=
        radius
      )
    }

    const onDown = (e: PointerEvent) => {
      if (e.button !== 0 || isInteractive(e.target) || isTextBlock(e.target)) return
      if (!inGrabZone(e.clientX, e.clientY)) return

      dragging.current = true
      dragOrigin.current = { x: e.clientX, y: e.clientY }
      // Agarramos la rotación visible, no la de destino: así el arrastre
      // continúa desde donde está el objeto y no da un salto.
      dragRotation.current = { ...current.current }
      target.current = { ...current.current }

      document.body.style.cursor = "grabbing"
      document.body.style.userSelect = "none"
    }

    const onMove = (e: PointerEvent) => {
      if (!dragging.current) return

      const dx = e.clientX - dragOrigin.current.x
      const dy = e.clientY - dragOrigin.current.y

      target.current.y = dragRotation.current.y + dx * sensitivity
      target.current.x = Math.max(
        -maxTilt,
        Math.min(maxTilt, dragRotation.current.x + dy * sensitivity)
      )

      requestFrame()
    }

    window.addEventListener("pointerdown", onDown)
    window.addEventListener("pointermove", onMove, { passive: true })
    window.addEventListener("pointerup", stopDrag)
    window.addEventListener("pointercancel", stopDrag)

    return () => {
      window.removeEventListener("pointerdown", onDown)
      window.removeEventListener("pointermove", onMove)
      window.removeEventListener("pointerup", stopDrag)
      window.removeEventListener("pointercancel", stopDrag)
      stopDrag()
      if (frame.current !== null) cancelAnimationFrame(frame.current)
      frame.current = null
    }
  }, [damping, grabRadius, maxTilt, sensitivity])

  // Al cambiar de escena/objeto se invalida la referencia cacheada.
  useEffect(() => {
    return () => {
      objectRef.current = null
      appRef.current = null
      current.current = { x: 0, y: 0 }
      target.current = { x: 0, y: 0 }
    }
  }, [scene, objectName])

  return (
    // El envoltorio existe desde el primer render (Spline se carga con
    // dynamic y aún no tiene nodo), así el observer se engancha de inmediato.
    <div ref={wrapperRef} className={className} style={{ pointerEvents: "none" }}>
      <Spline
        scene={sceneUrl}
        className="h-full w-full"
        onLoad={onLoad}
        style={{ pointerEvents: "none" }}
      />
    </div>
  )
}
