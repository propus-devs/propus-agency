"use client"

import type { ReactNode } from "react"
import { cn } from "@/lib/utils"
import { useInView } from "@/lib/use-in-view"

/**
 * Envoltorio de las escenas animadas con CSS: marca `data-live` según estén o
 * no en pantalla y globals.css pausa sus animaciones cuando no lo están.
 * Es decorativo, así que se oculta a los lectores de pantalla.
 */
export function Live({ className, children }: { className?: string; children: ReactNode }) {
  const [ref, inView] = useInView<HTMLDivElement>()

  return (
    <div ref={ref} aria-hidden data-live={inView} className={cn("mv-live", className)}>
      {children}
    </div>
  )
}
