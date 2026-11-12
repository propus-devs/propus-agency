import { CalendarDays, Mail, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"

export type Contacto = {
  email: string
  emailHref: string
  phoneDisplay: string
  phoneHref: string
}

/**
 * Lo que se ve cuando no se puede reservar (agenda en pausa, sin huecos o fallo
 * al cargarla): nunca un callejón sin salida, siempre una forma de contactar.
 */
export default function SinHuecos({
  titulo,
  texto,
  contacto,
}: {
  titulo: string
  texto: string
  contacto: Contacto
}) {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center gap-5 px-6 py-16 text-center sm:py-20">
      <span className="flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
        <CalendarDays className="size-7" aria-hidden />
      </span>
      <div className="space-y-2">
        <h2 className="font-heading text-2xl font-semibold tracking-tight">{titulo}</h2>
        <p className="leading-relaxed text-muted-foreground">{texto}</p>
      </div>
      <div className="flex flex-col items-center gap-3 sm:flex-row">
        <Button size="lg" className="bg-brand-emerald font-semibold text-background hover:bg-brand-teal" asChild>
          <a href={contacto.emailHref}>
            <Mail aria-hidden />
            {contacto.email}
          </a>
        </Button>
        <Button size="lg" variant="outline" asChild>
          <a href={contacto.phoneHref}>
            <Phone aria-hidden />
            {contacto.phoneDisplay}
          </a>
        </Button>
      </div>
    </div>
  )
}
