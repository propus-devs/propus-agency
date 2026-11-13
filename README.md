# Propus

Web de **Propus** ([propus.es](https://propus.es)): desarrollo web, software a medida y automatización. Incluye las páginas de servicio (AutoClinic, FacturIA, RuralProp y diseño web a medida), el blog, un calendario propio de llamadas de 15 minutos (`/reservar`) y su panel de administración (`/admin`).

Este repositorio es **público**: no se sube ningún secreto ni dato real.

## Stack

- **Next.js 16** (App Router) y **React 19**
- **TailwindCSS 4** con configuración CSS-first (sin `tailwind.config.js`)
- **shadcn 4** y **radix-ui**
- **TypeScript 5**
- **Postgres** (`pg`) para las reservas
- **pnpm** como gestor de paquetes

## Puesta en marcha

Requisitos: Node.js 22 y pnpm (`corepack enable`).

```bash
pnpm install
pnpm dev
```

Abre [http://localhost:3000](http://localhost:3000).

## Comandos

| Comando | Descripción |
|---|---|
| `pnpm dev` | Servidor de desarrollo |
| `pnpm build` | Build de producción |
| `pnpm start` | Servidor de producción |
| `pnpm lint` | Lint con ESLint |
| `pnpm test` | Pruebas unitarias (`node --test`) |
| `pnpm db:dev` | Postgres embebido para desarrollo (puerto 5433) |
| `pnpm admin:password` | Genera `ADMIN_PASSWORD_HASH` y `AUTH_SECRET` |
| `pnpm spline:pull` | Descarga la escena de Spline del hero a `public/spline/` |

Las variables de entorno están documentadas en [.env.example](.env.example).

## Despliegue

Imagen Docker ([Dockerfile](Dockerfile)) desplegada en Easypanel. La web pública es estática; solo `/admin` y `/api` son dinámicas.

## Más información

Las reglas de código, el tema claro y el diseño del calendario están en [AGENTS.md](AGENTS.md).
