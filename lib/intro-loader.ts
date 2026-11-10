/**
 * Hitos reales de la carga del hero 3D, para la pantalla de carga de la
 * portada (components/ui/intro-loader.tsx).
 *
 * El runtime de Spline no expone progreso por bytes, así que la barra se
 * apoya en dos momentos que sí se pueden observar:
 *   - motor:  el código del motor 3D ya está descargado.
 *   - escena: la escena ha cargado y el primer frame está en marcha.
 *
 * Es un objeto de módulo a propósito: sobrevive a las navegaciones del
 * cliente (volver a la portada no repite la pantalla de carga) y se reinicia
 * solo al recargar la página. Solo se escribe desde el navegador, nunca desde
 * el servidor.
 */
export const introEstado = { motor: false, escena: false }

export function marcarMotor() {
  introEstado.motor = true
}

export function marcarEscena() {
  introEstado.motor = true
  introEstado.escena = true
}
