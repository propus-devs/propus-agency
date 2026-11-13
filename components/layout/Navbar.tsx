"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { TiltCtaButton } from "@/components/ui/tilt-cta-button"
import {
  Sheet,
  SheetContent,
  SheetClose,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MenuIcon, ChevronDown, CalendarDaysIcon } from "lucide-react"
import LanguageSwitcher from "@/components/layout/LanguageSwitcher"
import { ruta, type Lang } from "@/lib/i18n/idiomas"

interface NavLink {
  href: string
  label: string
}

interface TextosNavbar {
  /** Anclas de la portada */
  anclas: NavLink[]
  servicios: string
  /** Los 4 servicios. AutoClinic va siempre primero (es la prioridad del
   *  negocio) y FacturIA queda en segundo plano; el orden de los tres primeros
   *  sigue el de la lista del hero. Es la misma lista que el pie. */
  listaServicios: NavLink[]
  info: string
  masMovil: string
  listaInfo: NavLink[]
  agendar: string
  abrirMenu: string
  logoAlt: string
}

// En inglés, el blog y las páginas legales siguen en español: el enlace lo dice.
const textos: Record<Lang, TextosNavbar> = {
  es: {
    anclas: [
      { href: `${ruta("inicio", "es")}#proceso`, label: "Proceso" },
      { href: `${ruta("inicio", "es")}#resultados`, label: "Resultados" },
      { href: `${ruta("inicio", "es")}#faq`, label: "FAQ" },
    ],
    servicios: "Servicios",
    listaServicios: [
      { href: ruta("autoclinic", "es"), label: "AutoClinic" },
      { href: ruta("ruralprop", "es"), label: "RuralProp" },
      { href: ruta("disenoWeb", "es"), label: "Diseño web a medida" },
      { href: ruta("facturia", "es"), label: "FacturIA" },
    ],
    info: "Info",
    masMovil: "Más",
    listaInfo: [
      { href: ruta("sobreNosotros", "es"), label: "Sobre nosotros" },
      { href: "/blog", label: "Blog" },
      { href: "/legal/privacidad", label: "Legal" },
    ],
    agendar: "Agendar llamada",
    abrirMenu: "Abrir menú",
    logoAlt: "Propus logo",
  },
  en: {
    anclas: [
      { href: `${ruta("inicio", "en")}#proceso`, label: "Process" },
      { href: `${ruta("inicio", "en")}#resultados`, label: "Results" },
      { href: `${ruta("inicio", "en")}#faq`, label: "FAQ" },
    ],
    servicios: "Services",
    listaServicios: [
      { href: ruta("autoclinic", "en"), label: "AutoClinic" },
      { href: ruta("ruralprop", "en"), label: "RuralProp" },
      { href: ruta("disenoWeb", "en"), label: "Custom web design" },
      { href: ruta("facturia", "en"), label: "FacturIA" },
    ],
    info: "Info",
    masMovil: "More",
    listaInfo: [
      { href: ruta("sobreNosotros", "en"), label: "About us" },
      { href: "/blog", label: "Blog (in Spanish)" },
      { href: "/legal/privacidad", label: "Legal (in Spanish)" },
    ],
    agendar: "Book a call",
    abrirMenu: "Open menu",
    logoAlt: "Propus logo",
  },
}

export default function Navbar({ lang = "es" }: { lang?: Lang }) {
  const t = textos[lang]
  const inicio = ruta("inicio", lang)
  const reservar = ruta("reservar", lang)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href={inicio} className="flex items-center gap-2 font-bold text-[1.375rem] tracking-tight">
          <Image src="/favicons/noBGpropus1024.png" alt={t.logoAlt} width={32} height={32} />
          <span className="hidden md:inline font-heading font-semibold bg-linear-to-r from-brand-sky via-brand-teal to-brand-green bg-clip-text text-transparent">PROPUS</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {t.anclas.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.label}
            </Link>
          ))}

          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground outline-none">
              {t.servicios}
              <ChevronDown className="size-3.5" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {t.listaServicios.map((link) => (
                <DropdownMenuItem key={link.href} asChild>
                  <Link href={link.href}>{link.label}</Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground outline-none">
              {t.info}
              <ChevronDown className="size-3.5" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {t.listaInfo.map((link) => (
                <DropdownMenuItem key={link.href} asChild>
                  <Link href={link.href}>{link.label}</Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <LanguageSwitcher lang={lang} />
          <TiltCtaButton
            className="h-9 gap-2 px-5 text-sm bg-brand-emerald hover:bg-brand-teal text-background font-semibold"
            asChild
          >
            <Link href={reservar}>
              <CalendarDaysIcon className="size-4" />
              {t.agendar}
            </Link>
          </TiltCtaButton>
        </div>

        {/* Mobile: selector de idioma siempre a la vista y menú */}
        <div className="flex items-center gap-1 md:hidden">
          <LanguageSwitcher lang={lang} />
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <MenuIcon />
                <span className="sr-only">{t.abrirMenu}</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72 flex flex-col px-6 py-6">
              <Link href={inicio} className="flex items-center gap-2 font-bold text-[1.375rem] tracking-tight">
                <Image src="/favicons/noBGpropus1024.png" alt={t.logoAlt} width={32} height={32} />
                <span className="font-heading font-semibold bg-linear-to-r from-brand-sky via-brand-teal to-brand-green bg-clip-text text-transparent">PROPUS</span>
              </Link>
              <nav className="flex flex-col gap-5 mt-8">
                {t.anclas.map((link) => (
                  <SheetClose key={link.href} asChild>
                    <Link
                      href={link.href}
                      className="text-base text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  </SheetClose>
                ))}

                <span className="mt-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground/60">
                  {t.servicios}
                </span>
                {t.listaServicios.map((link) => (
                  <SheetClose key={link.href} asChild>
                    <Link
                      href={link.href}
                      className="text-base text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  </SheetClose>
                ))}

                <span className="mt-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground/60">
                  {t.masMovil}
                </span>
                {t.listaInfo.map((link) => (
                  <SheetClose key={link.href} asChild>
                    <Link
                      href={link.href}
                      className="text-base text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  </SheetClose>
                ))}
              </nav>
              <div className="mt-auto">
                <SheetClose asChild>
                  <TiltCtaButton
                    className="h-11 w-full gap-2 text-base bg-brand-emerald hover:bg-brand-teal text-background font-semibold"
                    asChild
                  >
                    <Link href={reservar}>
                      <CalendarDaysIcon className="size-4" />
                      {t.agendar}
                    </Link>
                  </TiltCtaButton>
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
