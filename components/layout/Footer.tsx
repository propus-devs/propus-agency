'use client';

import React from 'react';
import type { ComponentProps, ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import Link from 'next/link';
import { Mail, Phone } from 'lucide-react';
import { contact } from '@/lib/site';

interface FooterLink {
  label: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
  external?: boolean;
}

interface FooterSection {
  label: string;
  links: FooterLink[];
}

const footerLinks: FooterSection[] = [
  {
    label: 'Producto',
    links: [
      { href: '/#servicios', label: 'Servicios' },
      { href: '/#proceso', label: 'Proceso' },
      { href: '/#resultados', label: 'Resultados' },
    ],
  },
  {
    label: 'Soluciones',
    links: [
      { href: '/soluciones/clinicas', label: 'Agente + CRM para clínicas' },
      { href: '/servicios/diseno-web-clinicas', label: 'Diseño web para clínicas' },
    ],
  },
  {
    label: 'Empresa',
    links: [
      { href: '/sobre-nosotros', label: 'Sobre nosotros' },
      { href: '/blog', label: 'Blog' },
      { href: '/sobre-nosotros#equipo', label: 'Equipo' },
    ],
  },
  {
    label: 'Legal',
    links: [
      { href: '/legal/privacidad', label: 'Privacidad' },
      { href: '/legal/terminos', label: 'Términos' },
      { href: '/legal/cookies', label: 'Cookies' },
      { href: '/legal/eliminacion-de-datos', label: 'Eliminación de datos' },
    ],
  },
  {
    label: 'Redes sociales',
    links: [
      { href: 'https://www.instagram.com/propus_nation?igsh=MWVibThwY2Y5YWFpbw==', label: 'Instagram', external: true },
      { href: 'https://www.facebook.com/propusnation/?locale=es_ES', label: 'Facebook', external: true },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="relative w-full flex flex-col items-center justify-center border-t border-border bg-black px-6 py-12 lg:py-16">
      <div className="bg-foreground/20 absolute top-0 right-1/2 left-1/2 h-px w-1/3 -translate-x-1/2 -translate-y-1/2 rounded-full blur" />

      <div className="grid w-full max-w-6xl mx-auto gap-8 xl:grid-cols-3 xl:gap-8">
        {/* Brand */}
        <AnimatedContainer className="space-y-4">
          <Link href="/" className="font-bold text-xl tracking-tight w-fit block">
            <span className="font-heading font-semibold bg-linear-to-r from-brand-sky via-brand-teal to-brand-green bg-clip-text text-transparent">PROPUS</span>
          </Link>
          <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
            Automatizamos procesos y desarrollamos aplicaciones con IA para que tu negocio escale más rápido.
          </p>
          <address className="flex not-italic flex-col items-start gap-2 text-sm">
            <a
              href={contact.phoneHref}
              className="text-muted-foreground hover:text-foreground inline-flex items-center gap-2 transition-colors duration-300"
            >
              <Phone className="size-4 text-brand-teal" />
              {contact.phoneDisplay}
            </a>
            <a
              href={contact.emailHref}
              className="text-muted-foreground hover:text-foreground inline-flex items-center gap-2 transition-colors duration-300"
            >
              <Mail className="size-4 text-brand-teal" />
              {contact.email}
            </a>
          </address>

          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} Propus, una marca de Iberium Group LLC. Todos los derechos reservados.
          </p>
          <p className="text-muted-foreground/80 text-xs leading-relaxed">
            Iberium Group LLC · 1209 Mountain Road PL NE STE R, Albuquerque, New Mexico 87110, EE. UU.
          </p>
        </AnimatedContainer>

        {/* Link columns */}
        <div className="mt-10 grid grid-cols-2 gap-8 md:grid-cols-5 xl:col-span-2 xl:mt-0">
          {footerLinks.map((section, index) => (
            <AnimatedContainer key={section.label} delay={0.1 + index * 0.1}>
              <div className="mb-10 md:mb-0">
                <h3 className="text-xs font-semibold uppercase tracking-wider">{section.label}</h3>
                <ul className="text-muted-foreground mt-4 space-y-2 text-sm">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="hover:text-foreground inline-flex items-center transition-all duration-300"
                        {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      >
                        {link.icon && <link.icon className="me-1 size-4" />}
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedContainer>
          ))}
        </div>
      </div>
    </footer>
  );
}

type ViewAnimationProps = {
  delay?: number;
  className?: ComponentProps<typeof motion.div>['className'];
  children: ReactNode;
};

function AnimatedContainer({ className, delay = 0.1, children }: ViewAnimationProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <>{children}</>;
  }

  return (
    <motion.div
      initial={{ filter: 'blur(4px)', translateY: -8, opacity: 0 }}
      whileInView={{ filter: 'blur(0px)', translateY: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.8 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
