/**
 * Límite de intentos de login por IP, en memoria (la web corre en un solo
 * contenedor). 5 fallos en 15 minutos bloquean esa IP hasta que se cumplan los
 * 15 minutos desde el primer fallo. Un acierto borra el contador.
 *
 * No hay bloqueo global a propósito: permitiría a cualquiera dejarnos sin
 * acceso al admin a base de intentos fallidos. La contraseña larga y el coste de
 * scrypt son la defensa contra ataques repartidos entre muchas IP.
 *
 * Las IP solo viven en memoria, nunca se guardan: no hay dato personal que
 * conservar ni que declarar.
 */

type Registro = { fallos: number; primero: number }

export const VENTANA_MS = 15 * 60_000
export const MAX_FALLOS = 5
const MAX_IPS = 2000

const g = globalThis as typeof globalThis & { __propusLimiteLogin?: Map<string, Registro> }

function registros(): Map<string, Registro> {
  return (g.__propusLimiteLogin ??= new Map())
}

function vigente(r: Registro, ahora: number): boolean {
  return ahora - r.primero < VENTANA_MS
}

export function comprobarLogin(
  ip: string,
  ahora = Date.now()
): { permitido: boolean; esperaSeg: number } {
  const r = registros().get(ip)
  if (r && vigente(r, ahora) && r.fallos >= MAX_FALLOS) {
    return { permitido: false, esperaSeg: Math.ceil((r.primero + VENTANA_MS - ahora) / 1000) }
  }
  return { permitido: true, esperaSeg: 0 }
}

export function anotarFallo(ip: string, ahora = Date.now()): void {
  const mapa = registros()
  const r = mapa.get(ip)
  if (r && vigente(r, ahora)) {
    r.fallos += 1
    return
  }
  // Ventana nueva. Antes de crecer, se tira lo caducado para que el mapa no engorde sin fin.
  if (mapa.size >= MAX_IPS) {
    for (const [clave, valor] of mapa) if (!vigente(valor, ahora)) mapa.delete(clave)
    if (mapa.size >= MAX_IPS) mapa.clear()
  }
  mapa.set(ip, { fallos: 1, primero: ahora })
}

export function anotarAcierto(ip: string): void {
  registros().delete(ip)
}

/** Solo para pruebas. */
export function reiniciarLimite(): void {
  registros().clear()
}
