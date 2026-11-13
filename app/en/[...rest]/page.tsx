import { notFound } from "next/navigation"

// Igual que en español (app/(es)/[...rest]): recoge las URLs de /en que no
// existen para que se vea la página 404 en inglés, con estado 404.
export default function UnknownRoute() {
  notFound()
}
