/**
 * Límite de peticiones por clave (normalmente la IP) en una ventana fija, en
 * memoria: la web corre en un solo contenedor. La primera petición de una clave
 * abre la ventana; pasado `max`, se rechaza hasta que la ventana termina.
 *
 * Las claves (IP) solo viven en memoria y se descartan solas: no se guarda nada.
 * Módulo puro (sin imports) para poder probarlo con `node --test`.
 */

export type Limitador = {
  /** Cuenta una petición. `permitido` es false si ya se superó el máximo. */
  intentar(clave: string, ahora?: number): { permitido: boolean; esperaSeg: number }
  /** Solo para pruebas. */
  reiniciar(): void
}

type Ventana = { cuenta: number; desde: number }

const MAX_CLAVES = 5000

const g = globalThis as typeof globalThis & { __propusLimitadores?: Map<string, Map<string, Ventana>> }

export function crearLimitador(nombre: string, max: number, ventanaMs: number): Limitador {
  const todos = (g.__propusLimitadores ??= new Map())
  const claves = todos.get(nombre) ?? new Map<string, Ventana>()
  todos.set(nombre, claves)

  return {
    intentar(clave, ahora = Date.now()) {
      const actual = claves.get(clave)
      if (actual && ahora - actual.desde < ventanaMs) {
        actual.cuenta += 1
        if (actual.cuenta > max) {
          return { permitido: false, esperaSeg: Math.ceil((actual.desde + ventanaMs - ahora) / 1000) }
        }
        return { permitido: true, esperaSeg: 0 }
      }
      // Ventana nueva. Antes de crecer, se tira lo caducado para que el mapa no engorde sin fin.
      if (claves.size >= MAX_CLAVES) {
        for (const [k, v] of claves) if (ahora - v.desde >= ventanaMs) claves.delete(k)
        if (claves.size >= MAX_CLAVES) claves.clear()
      }
      claves.set(clave, { cuenta: 1, desde: ahora })
      return { permitido: true, esperaSeg: 0 }
    },
    reiniciar() {
      claves.clear()
    },
  }
}
