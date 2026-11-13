import type { Metadata } from "next"
import NotFoundPage from "@/components/pages/NotFoundPage"
import { viewportClaro } from "@/lib/tema-claro"

export const viewport = viewportClaro

export const metadata: Metadata = {
  title: "Page not found",
  description: "The page you are looking for does not exist or has moved.",
  robots: {
    index: false,
    follow: false,
  },
}

export default function NotFound() {
  return <NotFoundPage lang="en" />
}
