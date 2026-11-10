// Grano de papel: ruido fractal en SVG, sin imagen que descargar.
const GRANO =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")"

/**
 * Fondo propio de /servicios/ruralprop: verde bosque que se vuelve tierra hacia
 * abajo, luz de atardecer arriba a la derecha, curvas de nivel de mapa y grano
 * de papel. Capa fija bajo todo el contenido (misma técnica que AutoClinic): se
 * pinta encima del fondo aurora del layout porque va después en el DOM.
 * Estático y sin interacción: nada que animar ni que cuidar con reduced-motion.
 */
export default function RuralPropBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-rural-bg"
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, #0d140d 0%, #111a11 38%, #151a0f 72%, #19160f 100%)",
        }}
      />

      {/* Luz de atardecer y verde de prado */}
      <div className="absolute -top-44 -right-32 h-[36rem] w-[36rem] rounded-full bg-rural-honey opacity-[0.12] blur-[150px]" />
      <div className="absolute bottom-[-14rem] -left-40 h-[34rem] w-[34rem] rounded-full bg-rural-moss opacity-[0.10] blur-[150px]" />
      <div className="absolute top-1/2 left-1/2 h-[26rem] w-[26rem] -translate-x-1/2 rounded-full bg-rural-clay opacity-[0.05] blur-[150px]" />

      {/* Curvas de nivel: más marcadas en los bordes, para no pelear con el texto */}
      <div
        className="absolute inset-0 opacity-[0.24]"
        style={{
          backgroundImage: "url(/img/rural/contornos.svg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          maskImage: "radial-gradient(ellipse at 50% 42%, transparent 22%, black 88%)",
          WebkitMaskImage: "radial-gradient(ellipse at 50% 42%, transparent 22%, black 88%)",
        }}
      />

      {/* Grano */}
      <div
        className="absolute inset-0 opacity-[0.08] mix-blend-overlay"
        style={{ backgroundImage: GRANO }}
      />

      {/* Viñeta */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 40%, transparent 50%, rgba(5, 8, 5, 0.55) 100%)",
        }}
      />
    </div>
  )
}
