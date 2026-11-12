// Genera las dos variables de entorno que protegen el admin:
//   ADMIN_PASSWORD_HASH  hash de la contraseña (la contraseña NO se guarda en ningún sitio)
//   AUTH_SECRET          secreto para firmar la cookie de sesión
//
// Uso:  npm run admin:password
// Pega las dos líneas que imprime en Easypanel (servicio propus → Entorno).
// Si ya tienes AUTH_SECRET en Easypanel y solo cambias la contraseña, deja el
// que hay: cambiarlo cierra todas las sesiones abiertas (cambiar la contraseña
// también lo hace, así que de todos modos tendréis que volver a entrar).
import { randomBytes } from "node:crypto"
import { createInterface } from "node:readline"
import { stdin, stdout } from "node:process"
import { Writable } from "node:stream"
import { hashPassword } from "../lib/admin/password.ts"

const MINIMO = 12

let silenciado = false
const salida = new Writable({
  write(trozo, codificacion, siguiente) {
    if (!silenciado) stdout.write(trozo, codificacion)
    siguiente()
  },
})

const lector = createInterface({ input: stdin, output: salida, terminal: Boolean(stdin.isTTY) })
const lineasPendientes = []
let alFinal = false
if (!stdin.isTTY) {
  // Entrada redirigida (pruebas): se leen las líneas tal cual, sin ocultar nada.
  lector.on("line", (linea) => lineasPendientes.push(linea))
  lector.on("close", () => {
    alFinal = true
  })
}

function preguntar(texto) {
  if (!stdin.isTTY) {
    return new Promise((resolve) => {
      const esperar = () => {
        if (lineasPendientes.length > 0) resolve(lineasPendientes.shift())
        else if (alFinal) resolve("")
        else setTimeout(esperar, 10)
      }
      esperar()
    })
  }
  return new Promise((resolve) => {
    silenciado = false
    lector.question(texto, (respuesta) => {
      silenciado = false
      stdout.write("\n")
      resolve(respuesta)
    })
    silenciado = true // el texto de la pregunta ya salió; lo que se teclee no se enseña
  })
}

const clave = await preguntar("Contraseña nueva (mínimo 12 caracteres): ")
if (clave.length < MINIMO) {
  console.error(`\nDemasiado corta: tiene ${clave.length} y hacen falta al menos ${MINIMO}.`)
  process.exit(1)
}
const repetida = await preguntar("Repítela: ")
if (clave !== repetida) {
  console.error("\nNo coinciden. No se ha generado nada.")
  process.exit(1)
}
lector.close()

const hash = await hashPassword(clave)
console.log("\nPega estas líneas en Easypanel (servicio propus → Entorno) y guarda:\n")
console.log(`ADMIN_PASSWORD_HASH=${hash}`)
console.log(`AUTH_SECRET=${randomBytes(48).toString("base64url")}`)
console.log("\nLa contraseña no queda guardada en ningún sitio: si la pierdes, se genera otra.")
