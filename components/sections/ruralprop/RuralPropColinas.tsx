import { cn } from "@/lib/utils"

type Props = {
  className?: string
  /** Difumina la base hacia el fondo de la página (portada). Sin difuminar: panel cerrado (CTA). */
  difuminar?: boolean
}

// Cipreses y pinos: triángulos finos que asoman por detrás de la colina
// delantera. Bases por debajo de la colina para que no se vea el pie.
const arboles: ReadonlyArray<readonly [number, number]> = [
  [58, 62], [84, 78], [112, 56],
  [338, 66], [362, 80], [388, 54],
  [572, 60], [598, 76], [622, 58],
  [986, 64], [1012, 80], [1038, 56],
  [1214, 62], [1240, 74], [1392, 68],
]
const BASE_ARBOLES = 300

const pino = ([x, alto]: readonly [number, number]) =>
  `M${x - alto * 0.2} ${BASE_ARBOLES}L${x} ${BASE_ARBOLES - alto}L${x + alto * 0.2} ${BASE_ARBOLES}Z`

/**
 * Tres capas de colinas con arboleda. Decorativo. `xMidYMax slice` mantiene las
 * proporciones (no estira los árboles) y recorta por los lados en pantallas
 * estrechas; la altura la pone quien lo use con `className`.
 */
export default function RuralPropColinas({ className, difuminar = false }: Props) {
  return (
    <svg
      aria-hidden
      focusable="false"
      viewBox="0 0 1440 320"
      preserveAspectRatio="xMidYMax slice"
      className={cn("pointer-events-none block w-full", className)}
      style={
        difuminar
          ? {
              maskImage: "linear-gradient(to top, transparent 0%, black 30%)",
              WebkitMaskImage: "linear-gradient(to top, transparent 0%, black 30%)",
            }
          : undefined
      }
    >
      <path
        fill="#24331e"
        opacity="0.55"
        d="M0 190C120 150 240 120 380 140C520 160 600 110 760 100C920 90 1010 150 1150 140C1280 130 1360 90 1440 110V320H0Z"
      />
      <path
        fill="#1a2816"
        opacity="0.85"
        d="M0 235C140 205 260 190 400 210C560 232 650 180 820 175C990 170 1090 225 1240 215C1340 208 1400 190 1440 195V320H0Z"
      />
      <path fill="#121d0f" d={arboles.map(pino).join("")} />
      <path
        fill="#0b120a"
        d="M0 280C160 255 300 262 450 272C620 284 740 248 900 250C1060 252 1180 285 1320 276C1380 272 1420 266 1440 262V320H0Z"
      />
    </svg>
  )
}
