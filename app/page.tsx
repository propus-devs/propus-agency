import { IntroLoader } from "@/components/ui/intro-loader"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import Hero from "@/components/sections/Hero"
import Movement from "@/components/sections/Movement"
import Services from "@/components/sections/Services"
import HowItWorks from "@/components/sections/HowItWorks"
import CaseStudies from "@/components/sections/CaseStudies"
import FAQ from "@/components/sections/FAQ"
import CTABanner from "@/components/sections/CTABanner"

export default function Home() {
  return (
    <>
      {/* Fuera de <main> (que crea su propio contexto de apilado): así queda
          por encima del menú y tapa toda la portada hasta que el 3D carga. */}
      <IntroLoader />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        {/* Transition divider */}
        <div className="relative h-px">
          <div className="absolute inset-x-0 -top-8 h-16 bg-gradient-to-b from-transparent via-brand-teal/10 to-transparent" />
          <div className="absolute inset-x-1/4 top-0 h-px bg-gradient-to-r from-transparent via-brand-teal/40 to-transparent" />
        </div>
        <Movement />
        <Services />
        <HowItWorks />
        <CaseStudies />
        <FAQ />
        <CTABanner />
      </main>
      <Footer />
    </>
  )
}
