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

const navLinks = [
  { href: "/#proceso", label: "Proceso" },
  { href: "/#resultados", label: "Resultados" },
  { href: "/#faq", label: "FAQ" },
]

// Los 4 servicios. AutoClinic va siempre primero (es la prioridad del
// negocio) y FacturIA queda en segundo plano; el orden de los tres primeros
// sigue el de la lista del hero. Es la misma lista que el pie.
const serviceLinks = [
  { href: "/servicios/autoclinic", label: "AutoClinic" },
  { href: "/servicios/ruralprop", label: "RuralProp" },
  { href: "/servicios/diseno-web-a-medida", label: "Diseño web a medida" },
  { href: "/servicios/facturia", label: "FacturIA" },
]

const infoLinks = [
  { href: "/sobre-nosotros", label: "Sobre nosotros" },
  { href: "/blog", label: "Blog" },
  { href: "/legal/privacidad", label: "Legal" },
]

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-[1.375rem] tracking-tight">
          <Image src="/favicons/noBGpropus1024.png" alt="Propus logo" width={32} height={32} />
          <span className="hidden md:inline font-heading font-semibold bg-linear-to-r from-brand-sky via-brand-teal to-brand-green bg-clip-text text-transparent">PROPUS</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
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
              Servicios
              <ChevronDown className="size-3.5" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {serviceLinks.map((link) => (
                <DropdownMenuItem key={link.href} asChild>
                  <Link href={link.href}>{link.label}</Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground outline-none">
              Info
              <ChevronDown className="size-3.5" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {infoLinks.map((link) => (
                <DropdownMenuItem key={link.href} asChild>
                  <Link href={link.href}>{link.label}</Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <TiltCtaButton
            className="h-9 gap-2 px-5 text-sm bg-brand-emerald hover:bg-brand-teal text-background font-semibold"
            asChild
          >
            <Link href="https://calendar.app.google/CNBch8s1Q8iqoqdE9" target="_blank" rel="noopener noreferrer">
              <CalendarDaysIcon className="size-4" />
              Agendar llamada
            </Link>
          </TiltCtaButton>
        </div>

        {/* Mobile nav */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <MenuIcon />
              <span className="sr-only">Abrir menú</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-72 flex flex-col px-6 py-6">
            <Link href="/" className="flex items-center gap-2 font-bold text-[1.375rem] tracking-tight">
              <Image src="/favicons/noBGpropus1024.png" alt="Propus logo" width={32} height={32} />
              <span className="font-heading font-semibold bg-linear-to-r from-brand-sky via-brand-teal to-brand-green bg-clip-text text-transparent">PROPUS</span>
            </Link>
            <nav className="flex flex-col gap-5 mt-8">
              {navLinks.map((link) => (
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
                Servicios
              </span>
              {serviceLinks.map((link) => (
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
                Más
              </span>
              {infoLinks.map((link) => (
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
                  <Link href="https://calendar.app.google/CNBch8s1Q8iqoqdE9" target="_blank" rel="noopener noreferrer">
                    <CalendarDaysIcon className="size-4" />
                    Agendar llamada
                  </Link>
                </TiltCtaButton>
              </SheetClose>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
