import { useEffect, useLayoutEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import { Navbar } from './components/Navbar'
import { ProceduresScroll } from './components/ProceduresScroll'
import { FaqAccordion } from './components/FaqAccordion'
import { RouteSeo } from './components/RouteSeo'

import { StickyNarrativeSection } from './components/sections/StickyNarrativeSection'
import { DifferentiatorsSection } from './components/sections/DifferentiatorsSection'
import { TestimonialsSection } from './components/sections/TestimonialsSection'
import { BookingSection } from './components/sections/BookingSection'
import { SurgeryTypesSection } from './components/sections/SurgeryTypesSection'
import { ProcessSection } from './components/sections/ProcessSection'
import { Footer, WhatsAppButton } from './components/sections/Footer'

import { RinoplastiaPage } from './pages/RinoplastiaPage'
import { ProcedimientoDetallePage } from './pages/ProcedimientoDetallePage'
import { ProcedimientosPage } from './pages/ProcedimientosPage'
import { TestimoniosPage } from './pages/TestimoniosPage'
import { PreguntasFrecuentesPage } from './pages/PreguntasFrecuentesPage'
import { PrivacidadPage } from './pages/PrivacidadPage'
import { SobreElDrPage } from './pages/SobreElDrPage'
import { NotFoundPage } from './pages/NotFoundPage'

// ScrollTrigger se registra solo en cliente para no romper el pre-render en Node.
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

// ─── Home Page ────────────────────────────────────────────────────────────────
function HomePage() {
  // Lenis smooth scroll + GSAP ScrollTrigger sync
  useEffect(() => {
    let lenis: any
    let rafId: number | null = null
    import('lenis').then((m: any) => {
      const Lenis = m.default ?? m
      lenis = new Lenis({
        duration: 1.0,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        wheelMultiplier: 1.0,
        touchMultiplier: 2.0,
      })
      lenis.on('scroll', ScrollTrigger.update)
      const raf = (time: number) => { lenis.raf(time); rafId = requestAnimationFrame(raf) }
      rafId = requestAnimationFrame(raf)
    }).catch((err) => { console.error('Lenis no se pudo cargar; scroll suave deshabilitado.', err) })
    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId)
      lenis?.destroy()
    }
  }, [])

  // Global 3D scroll reveals — section headers
  useLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = gsap.context(() => {
      setTimeout(() => {
        document.querySelectorAll('.section-reveal-header').forEach((el) => {
          gsap.fromTo(el,
            { opacity: 0, y: 22, z: 0 },
            {
              opacity: 1, y: 0, z: 0,
              duration: 0.65, ease: 'power2.out',
              clearProps: 'transform',
              scrollTrigger: {
                trigger: el,
                start: 'top 87%',
                toggleActions: 'play none none none',
              },
            }
          )
        })
      }, 150)
    })
    return () => ctx.revert()
  }, [])

  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-1)' }}>
      <Navbar />
      <main>
        <StickyNarrativeSection />
        <div style={{ position: 'relative', zIndex: 2 }}>
          <ProceduresScroll />
          <SurgeryTypesSection />
          <DifferentiatorsSection />
          <TestimonialsSection />
          <ProcessSection />
          <FaqAccordion />
          <BookingSection />
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  )
}

// ─── App (Router) ─────────────────────────────────────────────────────────────
export default function App() {
  return (
    <>
      <RouteSeo />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/rinoplastia" element={<RinoplastiaPage />} />
        <Route path="/rinoplastia/:slug" element={<ProcedimientoDetallePage />} />
        <Route path="/procedimientos" element={<ProcedimientosPage />} />
        <Route path="/testimonios" element={<TestimoniosPage />} />
        <Route path="/preguntas-frecuentes" element={<PreguntasFrecuentesPage />} />
        <Route path="/sobre-el-dr-agudelo" element={<SobreElDrPage />} />
        <Route path="/privacidad" element={<PrivacidadPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  )
}
