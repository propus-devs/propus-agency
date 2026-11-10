import type { ReactNode } from "react"

type Props = {
  eyebrow: string
  children: ReactNode
  description?: string
}

/**
 * Cabecera común de las secciones de RuralProp: antetítulo con filetes, título
 * en serif (Instrument Serif, ya cargada en el layout) y entradilla. El énfasis
 * dentro del título se marca con <em>.
 */
export default function RuralPropHeading({ eyebrow, children, description }: Props) {
  return (
    <div className="mx-auto mb-14 max-w-2xl text-center">
      <p className="mb-4 flex items-center justify-center gap-3 text-xs font-medium uppercase tracking-[0.28em] text-rural-honey">
        <span aria-hidden className="h-px w-8 bg-rural-honey/50" />
        {eyebrow}
        <span aria-hidden className="h-px w-8 bg-rural-honey/50" />
      </p>
      <h2 className="font-display-serif text-4xl font-normal leading-[1.05] tracking-tight text-rural-fg md:text-5xl [&_em]:italic [&_em]:text-rural-moss">
        {children}
      </h2>
      {description && (
        <p className="mt-5 text-lg leading-relaxed text-rural-muted">{description}</p>
      )}
    </div>
  )
}
