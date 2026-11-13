import { notFound } from "next/navigation"

// Con varios layouts raíz, Next solo enseña nuestro not-found.tsx para las URLs
// que no existen si hay una ruta que las recoja. Esta recoge todo lo que no
// coincide con una página real (las páginas reales ganan siempre) y lanza el
// 404, que responde con estado 404 y la página personalizada de not-found.tsx.
export default function RutaDesconocida() {
  notFound()
}
