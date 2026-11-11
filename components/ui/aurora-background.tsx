/**
 * Fondo "soft dark tech" — glows aurora estáticos en la paleta corporativa.
 * Sin canvas ni interacción con el cursor: calmado, con profundidad y sin saturar.
 */
export default function AuroraBackground() {
  return (
    <div
      aria-hidden
      data-fondo="aurora"
      className="fixed inset-0 -z-10 overflow-hidden bg-background"
    >
      {/* Glows de color, muy difuminados y a baja opacidad */}
      <div className="absolute -top-48 -left-40 h-[38rem] w-[38rem] rounded-full bg-brand-emerald opacity-[0.12] blur-[130px] animate-aurora-1" />
      <div className="absolute -top-40 right-[-12rem] h-[34rem] w-[34rem] rounded-full bg-brand-sky opacity-[0.11] blur-[130px] animate-aurora-2" />
      <div className="absolute bottom-[-16rem] left-1/3 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full bg-brand-green opacity-[0.08] blur-[140px] animate-aurora-3" />
      <div className="absolute top-1/3 left-1/2 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-brand-teal opacity-[0.06] blur-[150px] animate-aurora-2" />

      {/* Rejilla técnica ultra sutil */}
      <div
        className="absolute inset-0 opacity-[0.022]"
        style={{
          backgroundImage:
            "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      {/* Viñeta para asentar los bordes */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 40%, transparent 55%, color-mix(in oklch, var(--background), black 35%) 100%)",
        }}
      />
    </div>
  )
}
