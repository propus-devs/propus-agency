import type { Viewport } from "next"

/**
 * Color de la barra del navegador en móvil para las páginas con el tema claro
 * (las que montan <FondoMalla />). Coincide con --background del tema claro en
 * globals.css. Uso: `export const viewport = viewportClaro`.
 */
export const viewportClaro: Viewport = { themeColor: "#edf3f5" }
