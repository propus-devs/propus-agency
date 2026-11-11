/**
 * Fondo claro de la web: una malla luminosa de menta, cielo, arena y aqua sobre
 * un azul niebla. Es también la marca `.tema-claro` que activa el tema claro en
 * globals.css ("Tema claro"): mientras este elemento exista en la página,
 * <html> usa la paleta clara y el aurora oscuro global se oculta.
 *
 * Se monta en la portada y en las páginas de contenido (sobre nosotros, blog,
 * legales y diseño web a medida). Las páginas de servicio con identidad propia
 * (AutoClinic, RuralProp, FacturIA) no lo montan y siguen oscuras.
 *
 * Estático y barato: degradados radiales sin desenfoque que derivan despacio
 * con las animaciones aurora-* (congeladas en móvil y con movimiento reducido).
 */
export default function FondoMalla() {
  return (
    <div
      aria-hidden
      className="tema-claro pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-background"
    >
      <div className="malla-mancha malla-menta animate-aurora-1" />
      <div className="malla-mancha malla-cielo animate-aurora-2" />
      <div className="malla-mancha malla-arena animate-aurora-3" />
      <div className="malla-mancha malla-aqua animate-aurora-2" />
      <div className="malla-grano" />
    </div>
  )
}
