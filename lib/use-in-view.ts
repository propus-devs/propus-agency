"use client"

import { useEffect, useRef, useState } from "react"

/**
 * Dice si un elemento está en pantalla (con un margen). Sirve para que las
 * animaciones decorativas solo consuman CPU mientras se ven.
 */
export function useInView<T extends Element>(rootMargin = "80px") {
  const ref = useRef<T>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [rootMargin])

  return [ref, inView] as const
}
