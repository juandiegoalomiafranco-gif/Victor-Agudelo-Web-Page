import React, { useState, useEffect, useLayoutEffect, useRef } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'motion/react'
import {
  Phone, Mail, MapPin, Instagram, Facebook,
  Menu, X, Star, Calendar, MessageSquare,
  ChevronLeft, ChevronRight,
} from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import { ProceduresScroll } from './components/ProceduresScroll'
import { FaqAccordion }    from './components/FaqAccordion'
import { StepsStagger }   from './components/ui/steps-stagger'
import { HeroStats }      from './components/HeroStats'
import { RinoplastiaPage }    from './pages/RinoplastiaPage'
import { ProcedimientosPage } from './pages/ProcedimientosPage'
import { TestimoniosPage }    from './pages/TestimoniosPage'
import { PrivacidadPage }     from './pages/PrivacidadPage'
import { CONTACT } from './lib/contact'
import { COPY }    from './lib/copy'
import { DOCTOR_PHOTO_URL, DOCTOR_HERO_URL } from './lib/assets'
import { ProfileImagePlaceholder } from './components/ProfileImagePlaceholder'
import { RouteSeo } from './components/RouteSeo'
import type { Testimonial } from './types/index'

// ScrollTrigger se registra solo en cliente para no romper el pre-render en Node.
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

// ─── Data ────────────────────────────────────────────────────────────────────
const TESTIMONIALS: Testimonial[] = [
  { id: '1', name: 'Paciente, Cali', procedure: 'Rinoplastia', initials: 'P1', verifiedSource: 'realself', text: 'Consulté con otros dos médicos antes y en ninguno me dedicaron tiempo real. Con el Dr. Agudelo fue completamente diferente — me escuchó, me mostró casos similares y fui a la cirugía con expectativas claras. El resultado es exactamente lo que quería: natural.' },
  { id: '2', name: 'Paciente, Cali', procedure: 'Rinoplastia', initials: 'P2', verifiedSource: 'realself', text: 'Lo que más me sorprendió fue el seguimiento postoperatorio. El doctor me llamaba personalmente para saber cómo estaba. Nunca sentí que me dejaron sola después de la cirugía.' },
  { id: '3', name: 'Paciente, Cali', procedure: 'Rinoplastia', initials: 'P3', verifiedSource: 'realself', text: 'Tenía mucho miedo de quedar con la nariz muy levantada. Desde la primera consulta el doctor fue claro: "El objetivo es que no se note que estuviste operada." Y así quedé.' },
  { id: '4', name: 'Paciente, Cali', procedure: 'Rinoplastia Secundaria', initials: 'P4', verifiedSource: 'realself', text: 'Venía de una cirugía previa que no me dejó satisfecha. Busqué al Dr. Agudelo porque encontré sus casos en RealSelf y eran los más naturales que había visto. Hoy, un año después, no puedo estar más feliz con el resultado.' },
]

// ─── Navbar ──────────────────────────────────────────────────────────────────
const Navbar = () => {
  const [open, setOpen]         = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [darkSection, setDarkSection] = useState(true) // true = dark bg underneath

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 60)

      // Determine if the section underneath is dark or light
      // Dark sections: hero (0–200vh), booking (#1A1A1A bg), footer
      // Light sections: differentiators (#fff), testimonials (#f5f5f0), steps, etc.
      const hero = document.getElementById('inicio') ?? document.querySelector('.narrative-section')
      const heroBottom = hero ? (hero as HTMLElement).offsetTop + (hero as HTMLElement).offsetHeight : window.innerHeight * 2
      const diferenciadores = document.getElementById('diferenciadores')
      const difTop = diferenciadores ? (diferenciadores as HTMLElement).offsetTop : heroBottom
      const agendar = document.getElementById('agendar')
      const agendarTop = agendar ? (agendar as HTMLElement).offsetTop : Infinity

      const mid = y + 40 // sample point slightly below header
      if (mid < difTop) {
        setDarkSection(true)
      } else if (mid >= agendarTop) {
        setDarkSection(true)
      } else {
        setDarkSection(false)
      }
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { label: 'RINOPLASTIA',    href: '/rinoplastia',    isPage: true },
    { label: 'PROCEDIMIENTOS', href: '/procedimientos', isPage: true },
    { label: 'TESTIMONIOS',    href: '/testimonios',    isPage: true },
  ]

  /* ─── derived style tokens ─────────────────────────────────────── */
  // Phase A: hero (not scrolled) — pure transparent, white text
  // Phase B: scrolled + dark section — dark glass pill
  // Phase C: scrolled + light section — white glass pill (reference image style)

  const phase: 'hero' | 'dark-glass' | 'light-glass' =
    !scrolled ? 'hero' : darkSection ? 'dark-glass' : 'light-glass'

  const pillBg =
    phase === 'hero'        ? 'transparent' :
    phase === 'dark-glass'  ? 'rgba(20,20,20,0.55)' :
                              'rgba(255,255,255,0.72)'

  const pillBorder =
    phase === 'hero'        ? 'none' :
    phase === 'dark-glass'  ? '1px solid rgba(255,255,255,0.10)' :
                              '1px solid rgba(0,0,0,0.08)'

  const pillShadow =
    phase === 'hero'        ? 'none' :
    phase === 'dark-glass'  ? '0 4px 28px rgba(0,0,0,0.35)' :
                              '0 2px 24px rgba(0,0,0,0.10)'

  const logoColor =
    (phase === 'hero' || phase === 'dark-glass') ? '#ffffff' : '#0a0a0a'

  const logoBg =
    (phase === 'hero' || phase === 'dark-glass') ? 'rgba(255,255,255,0.18)' : '#242424'

  const linkColor =
    (phase === 'hero' || phase === 'dark-glass') ? 'rgba(255,255,255,0.78)' : '#475569'

  const linkHoverColor =
    (phase === 'hero' || phase === 'dark-glass') ? '#ffffff' : '#0f172a'

  const ctaBg = '#2D4A3E'
  const ctaHoverBg = '#1F3329'
  const ctaBorder = '1px solid transparent'

  const hamburgerColor =
    (phase === 'hero' || phase === 'dark-glass') ? '#ffffff' : '#242424'

  const backdropBlur = phase !== 'hero' ? 'blur(22px) saturate(1.5)' : 'none'

  /* ─── render ───────────────────────────────────────────────────── */
  return (
    <>
      <header
        className="fixed inset-x-0 top-0 z-50"
        style={{
          padding: '0.75rem 0',
          transition: 'padding 0.45s ease',
        }}
      >
        <div
          className="max-w-6xl mx-auto px-4 md:px-6"
          style={{
            transform: scrolled ? 'translateY(0)' : 'translateY(0)',
          }}
        >
          <nav
            style={{
              background: pillBg,
              backdropFilter: backdropBlur,
              WebkitBackdropFilter: backdropBlur,
              border: pillBorder,
              borderRadius: '100px',
              padding: scrolled ? '0.45rem 0.45rem 0.45rem 1.25rem' : '0.5rem 0.5rem 0.5rem 0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              boxShadow: pillShadow,
              transition: [
                'background 0.55s cubic-bezier(0.4,0,0.2,1)',
                'border-color 0.55s cubic-bezier(0.4,0,0.2,1)',
                'box-shadow 0.55s cubic-bezier(0.4,0,0.2,1)',
                'backdrop-filter 0.55s cubic-bezier(0.4,0,0.2,1)',
                'padding 0.45s ease',
              ].join(', '),
            }}
          >
            {/* ── Logo ── */}
            <a
              href="#inicio"
              style={{
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '0.55rem',
                flexShrink: 0,
              }}
            >
              <div
                style={{
                  width: '30px',
                  height: '30px',
                  borderRadius: '50%',
                  background: logoBg,
                  border: phase !== 'light-glass' ? '1px solid rgba(255,255,255,0.22)' : 'none',
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  flexShrink: 0,
                  transition: 'background 0.55s ease, border-color 0.55s ease',
                }}
              >
                A
              </div>
              <span
                style={{
                  color: logoColor,
                  fontWeight: 600,
                  fontSize: '1.15rem',
                  letterSpacing: '-0.01em',
                  transition: 'color 0.55s ease',
                }}
              >
                Dr. Agudelo
              </span>
            </a>

            {/* ── Desktop links ── */}
            <ul className="hidden md:flex items-center" style={{ gap: '2rem' }}>
              {links.map(l => {
                const sharedStyle: React.CSSProperties = {
                  textDecoration: 'none',
                  fontSize: '0.78rem',
                  fontWeight: 500,
                  letterSpacing: '0.09em',
                  color: linkColor,
                  transition: 'color 0.25s ease',
                }
                return (
                  <li key={l.href}>
                    {l.isPage ? (
                      <Link
                        to={l.href}
                        style={sharedStyle}
                        onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = linkHoverColor }}
                        onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = linkColor }}
                      >
                        {l.label}
                      </Link>
                    ) : (
                      <a
                        href={l.href}
                        style={sharedStyle}
                        onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = linkHoverColor }}
                        onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = linkColor }}
                      >
                        {l.label}
                      </a>
                    )}
                  </li>
                )
              })}
            </ul>

            {/* ── CTA button ── */}
            <a
              href="#agendar"
              className="hidden md:flex items-center gap-2"
              style={{
                textDecoration: 'none',
                background: ctaBg,
                border: ctaBorder,
                color: '#fff',
                borderRadius: '100px',
                padding: '0.6rem 1.25rem',
                fontSize: '0.78rem',
                fontWeight: 600,
                letterSpacing: '0.04em',
                transition: 'background 0.3s ease, border-color 0.3s ease',
                whiteSpace: 'nowrap',
                flexShrink: 0,
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = ctaHoverBg }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = ctaBg }}
            >
              <Calendar className="w-3.5 h-3.5" />
              {COPY.ctaSecondary}
            </a>

            {/* ── Mobile hamburger ── */}
            <button
              onClick={() => setOpen(!open)}
              className="md:hidden p-2"
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: hamburgerColor,
                transition: 'color 0.4s ease',
              }}
              aria-label="Menú"
            >
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </nav>
        </div>
      </header>

      {/* ── Mobile overlay ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 flex flex-col"
            style={{ background: 'var(--color-1)' }}
          >
            <div className="flex-1 flex flex-col px-8 pt-28 pb-12 overflow-y-auto">
              <nav className="flex flex-col gap-6 mb-auto">
                {[
                  { label: 'Rinoplastia', href: '/rinoplastia', isPage: true },
                  { label: 'Procedimientos', href: '/procedimientos', isPage: true },
                  { label: 'Testimonios', href: '/testimonios', isPage: true },
                  { label: 'Contacto', href: '#agendar', isPage: false },
                ].map(l => l.isPage ? (
                  <Link key={l.href} to={l.href} onClick={() => setOpen(false)}
                    style={{ color: 'var(--color-4)', fontWeight: 700, fontSize: '1.75rem', letterSpacing: '-0.02em', textDecoration: 'none' }}
                  >{l.label}</Link>
                ) : (
                  <a key={l.href} href={l.href} onClick={() => setOpen(false)}
                    style={{ color: 'var(--color-4)', fontWeight: 700, fontSize: '1.75rem', letterSpacing: '-0.02em', textDecoration: 'none' }}
                  >{l.label}</a>
                ))}
              </nav>
              <a href="#agendar" onClick={() => setOpen(false)}
                className="mt-8 flex items-center justify-center gap-2 text-sm"
                style={{ background: '#2d5016', color: '#fff', fontWeight: 600, borderRadius: '100px', padding: '1rem', textDecoration: 'none' }}
              >
                <Calendar className="w-4 h-4" /> {COPY.ctaSecondary}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
const StickyNarrativeSection = () => {
  const heroOverlayRef = useRef<HTMLDivElement>(null)

  // ── Hero entry: animates headline/subtitle into view on mount ──
  useLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (!heroOverlayRef.current) return
    const children = heroOverlayRef.current.querySelectorAll('[data-hero-anim]')
    if (!children.length) return
    gsap.set(children, { y: 28, opacity: 0 })
    const tl = gsap.timeline({ delay: 0.35 })
    tl.to(children, { y: 0, opacity: 1, duration: 0.72, stagger: 0.11, ease: 'power3.out' })
    return () => { tl.kill() }
  }, [])

  return (
    <section id="inicio" className="relative h-screen mobile-dvh w-full overflow-hidden">
        <img
          src={DOCTOR_HERO_URL}
          alt="Dr. Víctor Manuel Agudelo durante una valoración"
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ background: '#0a0a0a', objectPosition: 'center 35%' }}
          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(to bottom, rgba(4,8,16,0.62) 0%, rgba(4,8,16,0.52) 45%, rgba(4,8,16,0.75) 100%)',
        }} />

        {/* ── Hero: frase única, 100% sólida desde el inicio ── */}
        <div
          ref={heroOverlayRef}
          className="absolute inset-0 flex flex-col items-center justify-center text-center"
          style={{ zIndex: 20, padding: '0 1.25rem', transformOrigin: 'center center', willChange: 'transform, opacity' }}
        >
          <h1
            data-hero-anim
            style={{
              fontSize: 'clamp(2rem, 6vw, 6rem)',
              fontWeight: 600,
              lineHeight: 1.08,
              letterSpacing: '-0.03em',
              maxWidth: '820px',
              color: '#ffffff',
              fontFamily: 'var(--font-serif)',
              textAlign: 'center',
              transform: 'translateZ(0)',
              backfaceVisibility: 'hidden',
            }}
          >
            Una nariz que se ve tuya, no operada.
          </h1>
          <p data-hero-anim style={{
            color: 'rgba(255,255,255,0.72)',
            fontSize: 'clamp(0.875rem, 1.5vw, 1.1rem)',
            marginTop: '1.25rem',
            maxWidth: '480px',
            lineHeight: 1.7,
            fontWeight: 400,
            textAlign: 'center',
            padding: '0 0.5rem',
          }}>
            Más de 20 años en rinoplastia. Diseño personalizado, técnica
            ultrasónica y acompañamiento postoperatorio del propio Dr. Agudelo.
          </p>
          <div data-hero-anim style={{ display: 'flex', gap: '0.75rem', marginTop: '1.75rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            <a
              href="#agendar"
              style={{
                background: '#2D4A3E',
                color: '#fff',
                borderRadius: '100px',
                padding: '0.75rem 1.5rem',
                fontSize: '0.875rem',
                fontWeight: 600,
                textDecoration: 'none',
                letterSpacing: '0.01em',
                whiteSpace: 'nowrap',
              }}
            >
              {COPY.ctaPrimary}
            </a>
            <a
              href="#testimonios"
              style={{
                color: 'rgba(255,255,255,0.85)',
                fontSize: '0.875rem',
                fontWeight: 500,
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                padding: '0.75rem 0.5rem',
                whiteSpace: 'nowrap',
              }}
            >
              Ver casos reales →
            </a>
          </div>
        </div>
    </section>
  )
}


// ─── Differentiators ─────────────────────────────────────────────────────────
const DifferentiatorsSection = () => {
  const sectionRef   = useRef<HTMLElement>(null)
  const photoWrapRef = useRef<HTMLDivElement>(null)

  const pillars = [
    {
      title: '20+ Años dedicado a la nariz',
      desc: 'Especialización exclusiva en cirugía nasal desde 2004. Miembro activo de SCCPFR y ACORL.',
    },
    {
      title: '1.500+ Cirugías realizadas',
      desc: 'Más de 200 rinoplastias documentadas. Antes de decidir, verás casos reales con narices similares a la tuya.',
    },
    {
      title: 'Pionero en rinoplastia ultrasónica',
      desc: 'Ultrasonido piezoeléctrico para mayor precisión ósea y recuperación más predecible. Técnica disponible en Cali desde 2022.',
    },
    {
      title: '5 Controles postoperatorios',
      desc: 'Seguimiento personal a los 7 días, 15 días, 1, 3 y 6 meses. Siempre con el Dr. Agudelo, nunca delegado.',
    },
    {
      title: 'Doble formación: ORL + Cirugía facial',
      desc: 'Otorrinolaringólogo y Cirujano Plástico Facial certificado. Una nariz operada no es solo estética: también es función respiratoria. Su doble especialidad garantiza ambas, no solo cómo se ve.',
    },
    {
      title: 'Atención sin delegaciones',
      desc: 'De la primera consulta al último control, siempre te atiende el Dr. Agudelo. Ningún paciente pasa por residentes o asistentes.',
    },
  ]

  useLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      if (photoWrapRef.current) gsap.set(photoWrapRef.current, { yPercent: 0 })
      return
    }

    const section = sectionRef.current
    const wrap    = photoWrapRef.current
    if (!section || !wrap) return

    const mm = gsap.matchMedia()
    mm.add('(min-width: 992px)', () => {
      gsap.set(wrap, { yPercent: 100 })
      gsap.to(wrap, {
        yPercent: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=120%',
          pin: true,
          scrub: 0.6,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      })
      return () => { gsap.set(wrap, { clearProps: 'transform' }) }
    })
    mm.add('(max-width: 991px)', () => {
      gsap.set(wrap, { clearProps: 'transform' })
    })

    return () => mm.revert()
  }, [])

  return (
    <section id="diferenciadores" ref={sectionRef} className="diff-section">
      <div className="diff-photo-col">
        <div ref={photoWrapRef} className="diff-photo-wrap" aria-hidden="true">
          <img
            src={DOCTOR_PHOTO_URL}
            alt=""
            className="diff-photo"
            loading="lazy"
            decoding="async"
          />
        </div>
        <div className="diff-overlay-text">
          <p className="diff-eyebrow">Por qué el Dr. Agudelo</p>
          <h2 className="diff-title">La clave detrás de cada resultado natural.</h2>
          <a href="#agendar" className="diff-cta">
            <Calendar className="w-4 h-4" /> Solicita tu evaluación gratuita
          </a>
        </div>
      </div>

      <div className="diff-right">
        <ul className="diff-grid">
          {pillars.map((p, i) => (
            <li key={i} className="diff-item">
              <h3 className="diff-card-title">{p.title}</h3>
              <p className="diff-card-desc">{p.desc}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

// ─── Testimonials ─────────────────────────────────────────────────────────────
const TestimonialsSection = () => {
  const [idx, setIdx]         = useState(0)
  const [progress, setProgress] = useState(0)
  const scrollRef = useRef<HTMLDivElement>(null)
  const DURATION = 5000

  useEffect(() => {
    setProgress(0)
    const start = performance.now()
    let raf: number
    const step = (now: number) => {
      const p = Math.min((now - start) / DURATION, 1)
      setProgress(p)
      if (p < 1) { raf = requestAnimationFrame(step) }
      else { setIdx(i => (i + 1) % TESTIMONIALS.length) }
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [idx])

  // Scroll to active card
  useEffect(() => {
    const container = scrollRef.current
    if (!container) return
    const card = container.children[idx] as HTMLElement | undefined
    if (!card) return
    const left = card.offsetLeft - container.offsetWidth / 2 + card.offsetWidth / 2
    container.scrollTo({ left, behavior: 'smooth' })
  }, [idx])

  return (
    <section id="testimonios" className="py-14 md:py-28" style={{ background: '#f5f5f0' }}>
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-xs uppercase tracking-[0.2em] mb-4" style={{ color: '#94a3b8', fontWeight: 400 }}>
            Lo que dicen nuestros pacientes
          </p>
          <h2
            className="testimonials-h2 section-reveal-header mx-auto"
            style={{ color: 'var(--color-1)', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.05 }}
          >
            La confianza que buscas, en palabras de quienes ya pasaron por esto
          </h2>
        </div>

        {/* Text cards */}
        <div
          ref={scrollRef}
          className="flex gap-4 md:gap-5 overflow-x-auto no-scrollbar pb-4"
          style={{ scrollSnapType: 'x mandatory' }}
        >
          {TESTIMONIALS.map((t, i) => (
            <div
              key={t.id}
              onClick={() => setIdx(i)}
              className="flex-shrink-0"
              style={{
                width: 'clamp(280px, 78vw, 340px)',
                borderRadius: '20px',
                padding: '1.75rem',
                cursor: 'pointer',
                scrollSnapAlign: 'center',
                opacity: i === idx ? 1 : 0.45,
                transform: i === idx ? 'scale(1)' : 'scale(0.97)',
                transition: 'opacity 0.4s ease, transform 0.4s ease',
                background: '#ffffff',
                boxShadow: i === idx ? '0 8px 32px rgba(0,0,0,0.1)' : '0 2px 8px rgba(0,0,0,0.05)',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
              }}
            >
              {/* Quote mark */}
              <p style={{ fontFamily: 'var(--font-serif)', fontSize: '3rem', color: '#2D4A3E', lineHeight: 1, marginBottom: '-0.5rem' }}>"</p>

              {/* Text */}
              <p style={{ fontSize: '0.9rem', color: '#374151', lineHeight: 1.75, flex: 1 }}>{t.text}</p>

              {/* Footer */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '1rem', borderTop: '1px solid rgba(0,0,0,0.07)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
                  <div style={{
                    width: '36px', height: '36px', borderRadius: '50%',
                    background: '#2D4A3E', display: 'flex', alignItems: 'center',
                    justifyContent: 'center', fontSize: '0.6rem', fontWeight: 700,
                    color: '#fff', flexShrink: 0,
                  }}>
                    {t.initials}
                  </div>
                  <div>
                    <p style={{ fontSize: '0.8rem', fontWeight: 600, color: '#1A1A1A', lineHeight: 1.2 }}>{t.name}</p>
                    <p style={{ fontSize: '0.7rem', color: '#94a3b8', fontWeight: 400 }}>{t.procedure}</p>
                  </div>
                </div>
                <span style={{
                  fontSize: '0.62rem', fontWeight: 600, color: '#2D4A3E',
                  background: 'rgba(45,74,62,0.08)', borderRadius: '100px',
                  padding: '0.25rem 0.6rem', letterSpacing: '0.03em',
                }}>
                  ✓ {t.verifiedSource === 'google' ? 'Google' : 'RealSelf'}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Progress bar */}
        <div className="flex items-center gap-3 md:gap-6 mt-6">
          <button onClick={() => setIdx(i => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#242424', display: 'flex', padding: '8px', minWidth: '44px', minHeight: '44px', alignItems: 'center', justifyContent: 'center' }}>
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="flex-1 flex items-center gap-4">
            {TESTIMONIALS.map((_, i) => (
              <button key={i} onClick={() => setIdx(i)} className="relative flex-1 overflow-hidden"
                style={{ height: '2px', background: 'rgba(0,0,0,0.08)', border: 'none', cursor: 'pointer', padding: 0 }}>
                {i === idx && (
                  <div className="absolute inset-y-0 left-0" style={{ background: '#242424', width: `${progress * 100}%` }} />
                )}
                {i < idx && (
                  <div className="absolute inset-0" style={{ background: '#242424' }} />
                )}
              </button>
            ))}
          </div>
          <button onClick={() => setIdx(i => (i + 1) % TESTIMONIALS.length)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#242424', display: 'flex', padding: '8px', minWidth: '44px', minHeight: '44px', alignItems: 'center', justifyContent: 'center' }}>
            <ChevronRight className="w-5 h-5" />
          </button>
          <span className="text-sm tabular-nums whitespace-nowrap" style={{ color: '#94a3b8', fontWeight: 400 }}>
            {String(idx + 1).padStart(2, '0')} / {String(TESTIMONIALS.length).padStart(2, '0')}
          </span>
        </div>

        {/* CTA inline */}
        <div style={{ marginTop: 'clamp(2.5rem, 5vw, 4rem)', textAlign: 'center' }}>
          <p style={{ fontSize: '0.9rem', color: '#64748b', marginBottom: '1.25rem' }}>
            ¿Lista para que tu caso sea el siguiente?
          </p>
          <Link to="/testimonios" style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            background: '#1A1A1A', color: '#fff', borderRadius: '100px',
            padding: '0.85rem 1.75rem', fontSize: '0.875rem', fontWeight: 600,
            textDecoration: 'none',
          }}>
            Ver todos los testimonios <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}

// ─── Booking Section ─────────────────────────────────────────────────────────
const BookingSection = () => {
  const [form, setForm] = useState({ name: '', phone: '', email: '', procedimiento: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [touched, setTouched] = useState<Record<string, boolean>>({})

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }))

  const markTouched = (k: string) => () => setTouched(t => ({ ...t, [k]: true }))

  const errors = {
    name: !form.name,
    email: !form.email,
    phone: !form.phone,
  }

  const handleSubmit = async () => {
    setTouched({ name: true, email: true, phone: true })
    if (errors.name || errors.email || errors.phone) return
    setStatus('loading')
    try {
      const res = await fetch('https://n8n.srv1559791.hstgr.cloud/webhook/agudelo-lead-capture', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre: form.name,
          correo: form.email,
          telefono: form.phone,
          procedimiento: form.procedimiento,
          mensaje: form.message,
        }),
      })
      if (!res.ok) throw new Error('server error')
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  const inputCls: React.CSSProperties = {
    width: '100%',
    background: 'rgba(255,255,255,0.06)',
    border: '1px solid rgba(255,255,255,0.12)',
    borderRadius: '12px',
    padding: '0.75rem 1rem',
    color: 'var(--color-4)',
    fontSize: '0.875rem',
    fontFamily: 'var(--font-sans)',
    fontWeight: 400,
    outline: 'none',
  }

  return (
    <section id="agendar" className="py-14 md:py-28" style={{ background: 'var(--color-1)' }}>
      <div className="max-w-3xl mx-auto px-4 md:px-6">
        <div className="text-center mb-14">
          <p className="text-xs uppercase tracking-[0.2em] mb-3" style={{ color: 'var(--color-9)', fontWeight: 600 }}>
            Contacto
          </p>
          <h2 className="text-4xl md:text-5xl mb-4 section-reveal-header" style={{ color: 'var(--color-4)', fontWeight: 700 }}>
            Da el primer paso —<br />
            <span style={{ fontWeight: 400, color: 'var(--color-5)' }}>sin compromiso.</span>
          </h2>
          <p className="text-sm" style={{ color: 'rgba(255,255,255,0.65)', fontWeight: 400 }}>
            Déjanos tus datos para una evaluación inicial.<br />
            El Dr. Agudelo revisa cada caso personalmente.
          </p>
        </div>

        <div className="p-5 md:p-8" style={{ background: 'rgba(255,255,255,0.04)', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.08)' }}>
          <AnimatePresence mode="wait">
            {status === 'success' ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-8"
              >
                <div style={{
                  width: '52px', height: '52px', borderRadius: '50%',
                  background: '#2D4A3E', display: 'flex', alignItems: 'center',
                  justifyContent: 'center', margin: '0 auto 1.25rem',
                }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <p style={{ color: 'var(--color-4)', fontSize: '1.15rem', fontWeight: 600, marginBottom: '0.5rem' }}>
                  ¡Mensaje recibido!
                </p>
                <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.9rem' }}>
                  El Dr. Agudelo revisará tu caso y te contactará pronto.
                </p>
              </motion.div>
            ) : (
              <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid gap-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs uppercase tracking-wider mb-2" style={{ color: 'var(--color-5)', fontWeight: 400 }}>Nombre completo *</label>
                    <input type="text" placeholder="Ej. Ana García" value={form.name} onChange={set('name')} onBlur={markTouched('name')}
                      aria-invalid={touched.name && errors.name}
                      style={{ ...inputCls, borderColor: touched.name && errors.name ? 'rgba(248,113,113,0.6)' : 'rgba(255,255,255,0.12)' }} />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider mb-2" style={{ color: 'var(--color-5)', fontWeight: 400 }}>Correo electrónico *</label>
                    <input type="email" placeholder="ana@correo.com" value={form.email} onChange={set('email')} onBlur={markTouched('email')}
                      aria-invalid={touched.email && errors.email}
                      style={{ ...inputCls, borderColor: touched.email && errors.email ? 'rgba(248,113,113,0.6)' : 'rgba(255,255,255,0.12)' }} />
                  </div>
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider mb-2" style={{ color: 'var(--color-5)', fontWeight: 400 }}>Teléfono / WhatsApp *</label>
                  <input type="tel" placeholder="+57 300 000 0000" value={form.phone} onChange={set('phone')} onBlur={markTouched('phone')}
                    aria-invalid={touched.phone && errors.phone}
                    style={{ ...inputCls, borderColor: touched.phone && errors.phone ? 'rgba(248,113,113,0.6)' : 'rgba(255,255,255,0.12)' }} />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider mb-2" style={{ color: 'var(--color-5)', fontWeight: 400 }}>Procedimiento de interés</label>
                  <select value={form.procedimiento} onChange={set('procedimiento')}
                    style={{ ...inputCls, appearance: 'none', backgroundImage: 'url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'12\' height=\'8\' viewBox=\'0 0 12 8\' fill=\'none\'><path d=\'M1 1L6 6L11 1\' stroke=\'%23ffffff80\' stroke-width=\'1.5\' stroke-linecap=\'round\'/></svg>")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center', paddingRight: '2.5rem' }}>
                    <option value="" style={{ background: '#1A1A1A' }}>Selecciona una opción</option>
                    <option value="Rinoplastia Estética" style={{ background: '#1A1A1A' }}>Rinoplastia Estética</option>
                    <option value="Rinoplastia Afrolatina" style={{ background: '#1A1A1A' }}>Rinoplastia Afrolatina</option>
                    <option value="Rinoplastia Secundaria" style={{ background: '#1A1A1A' }}>Rinoplastia Secundaria</option>
                    <option value="Mentoplastia" style={{ background: '#1A1A1A' }}>Mentoplastia</option>
                    <option value="Otoplastia" style={{ background: '#1A1A1A' }}>Otoplastia</option>
                    <option value="Blefaroplastia" style={{ background: '#1A1A1A' }}>Blefaroplastia</option>
                    <option value="Reducción de Papada" style={{ background: '#1A1A1A' }}>Reducción de Papada</option>
                    <option value="No Quirúrgicos" style={{ background: '#1A1A1A' }}>No Quirúrgicos · Toxina · Ácido</option>
                    <option value="No estoy seguro" style={{ background: '#1A1A1A' }}>Aún no estoy segura</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider mb-2" style={{ color: 'var(--color-5)', fontWeight: 400 }}>Mensaje (opcional)</label>
                  <textarea rows={3} placeholder="Cuéntanos brevemente tu caso..." value={form.message} onChange={set('message')} style={{ ...inputCls, resize: 'none' }} />
                </div>
                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.78rem', lineHeight: 1.55 }}>
                  ¿Quieres enviar fotos? Tras recibir tu solicitud te escribimos por WhatsApp para coordinar el envío seguro de imágenes.
                </p>
                {status === 'error' && (
                  <div style={{ background: 'rgba(248,113,113,0.08)', border: '1px solid rgba(248,113,113,0.25)', borderRadius: '12px', padding: '0.75rem 1rem', textAlign: 'center' }}>
                    <p style={{ color: '#fca5a5', fontSize: '0.82rem', marginBottom: '0.5rem' }}>
                      Hubo un problema al enviar. Intenta de nuevo o escríbenos directamente.
                    </p>
                    <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer"
                      style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: '#25D366', fontSize: '0.82rem', fontWeight: 600, textDecoration: 'none' }}>
                      <MessageSquare className="w-4 h-4" /> Abrir WhatsApp
                    </a>
                  </div>
                )}
                <button
                  onClick={handleSubmit}
                  disabled={status === 'loading'}
                  className="flex items-center justify-center gap-2 w-full py-4 mt-2 text-sm transition-all"
                  style={{
                    background: '#2D4A3E',
                    color: '#fff',
                    borderRadius: '100px',
                    fontWeight: 600,
                    border: 'none',
                    cursor: status === 'loading' ? 'not-allowed' : 'pointer',
                    opacity: status === 'loading' ? 0.7 : 1,
                  }}
                >
                  {status === 'loading' ? 'Enviando…' : <><Calendar className="w-4 h-4" /> {COPY.ctaPrimary}</>}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

// ─── Footer ───────────────────────────────────────────────────────────────────
const Footer = () => (
  <footer style={{ background: 'var(--color-1)' }}>
    <div className="max-w-7xl mx-auto px-6 pt-20 pb-10">
      <div className="grid md:grid-cols-4 gap-8 md:gap-12 mb-12 md:mb-16">
        <div>
          <p style={{ color: '#ffffff', fontWeight: 700, fontSize: '1.1rem', letterSpacing: '-0.02em', marginBottom: '1rem' }}>Dr. Agudelo</p>
          <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)', fontWeight: 400, maxWidth: '18rem' }}>
            Especialista en rinoplastia natural en Cali. Dedicación exclusiva a rinoplastia desde 2004. Resultados que se ven tuyos, no operados.
          </p>
          <div className="flex gap-4 mt-6">
            <a href={CONTACT.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" style={{ color: 'rgba(255,255,255,0.5)' }}><Instagram className="w-5 h-5" /></a>
            <a href={CONTACT.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" style={{ color: 'rgba(255,255,255,0.5)' }}><Facebook className="w-5 h-5" /></a>
            <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" style={{ color: 'rgba(255,255,255,0.5)' }}><MessageSquare className="w-5 h-5" /></a>
          </div>
        </div>
        <div>
          <p className="text-xs uppercase tracking-widest mb-5" style={{ color: 'rgba(255,255,255,0.35)', fontWeight: 600 }}>Navegación</p>
          <ul className="flex flex-col gap-3">
            {[
              { label: 'Inicio',          href: '/',             isRoute: true },
              { label: 'Rinoplastia',     href: '/rinoplastia',  isRoute: true },
              { label: 'Procedimientos',  href: '/procedimientos', isRoute: true },
              { label: 'Sobre el doctor', href: '/#doctor',      isRoute: false },
              { label: 'Testimonios',     href: '/#testimonios', isRoute: false },
              { label: 'Contacto',        href: '/#agendar',     isRoute: false },
            ].map(({ label, href, isRoute }) => (
              <li key={label}>
                {isRoute
                  ? <Link to={href} className="text-sm transition-colors"
                      style={{ color: 'rgba(255,255,255,0.55)', fontWeight: 400, textDecoration: 'none' }}
                    >{label}</Link>
                  : <a href={href} className="text-sm transition-colors"
                      style={{ color: 'rgba(255,255,255,0.55)', fontWeight: 400, textDecoration: 'none' }}
                    >{label}</a>
                }
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-xs uppercase tracking-widest mb-5" style={{ color: 'rgba(255,255,255,0.35)', fontWeight: 600 }}>Ubicación</p>
          <div className="flex gap-3">
            <MapPin className="w-4 h-4 mt-0.5 shrink-0" style={{ color: 'rgba(255,255,255,0.4)' }} />
            <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)', fontWeight: 400, wordBreak: 'break-word' }}>Avenida 4 Norte 14-38, Consultorio 302<br />Cali · Clínica de Otorrinolaringología<br />y Cirugía Plástica</p>
          </div>
        </div>
        <div>
          <p className="text-xs uppercase tracking-widest mb-5" style={{ color: 'rgba(255,255,255,0.35)', fontWeight: 600 }}>Contacto</p>
          <ul className="flex flex-col gap-3">
            <li><a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm" style={{ color: 'rgba(255,255,255,0.5)', fontWeight: 400, textDecoration: 'none' }}><MessageSquare className="w-4 h-4 shrink-0" style={{ color: 'rgba(255,255,255,0.4)' }} />{CONTACT.phoneDisplay}</a></li>
            <li><a href={`mailto:${CONTACT.email}`} className="flex items-center gap-2 text-sm" style={{ color: 'rgba(255,255,255,0.5)', fontWeight: 400, textDecoration: 'none' }}><Mail className="w-4 h-4 shrink-0" style={{ color: 'rgba(255,255,255,0.4)' }} />{CONTACT.email}</a></li>
            <li><a href={`tel:${CONTACT.phone}`} className="flex items-center gap-2 text-sm" style={{ color: 'rgba(255,255,255,0.5)', fontWeight: 400, textDecoration: 'none' }}><Phone className="w-4 h-4 shrink-0" style={{ color: 'rgba(255,255,255,0.4)' }} />{CONTACT.phoneDisplay}</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-brand text-center py-8" style={{ borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)', margin: '0 -1.5rem' }}>
        Dr. Agudelo
      </div>
      <div className="flex flex-col md:flex-row justify-between items-center gap-3 pt-8">
        <div className="flex flex-col gap-1">
          <p className="text-xs" style={{ color: 'rgba(255,255,255,0.3)', fontWeight: 400 }}>© 2026 Dr. Víctor Manuel Agudelo · Todos los derechos reservados</p>
          <p className="text-xs" style={{ color: 'rgba(255,255,255,0.2)', fontWeight: 400 }}>Las cirugías son realizadas por un médico especialista certificado. Los resultados pueden variar según cada paciente.</p>
          <a href="/privacidad" className="text-xs" style={{ color: 'rgba(255,255,255,0.25)', fontWeight: 400, textDecoration: 'none' }}>Política de Privacidad y Habeas Data</a>
        </div>
        <p className="text-xs" style={{ color: 'rgba(255,255,255,0.2)', fontWeight: 400 }}>Diseñado por Vanguard Studio</p>
      </div>
    </div>
  </footer>
)

// ─── Floating Buttons ─────────────────────────────────────────────────────────
const WhatsAppButton = () => (
  <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer" aria-label="Contactar por WhatsApp"
    className="fixed right-4 md:right-8 bottom-6 md:bottom-8 z-50 flex items-center justify-center transition-transform duration-200 hover:scale-110"
    style={{
      borderRadius: '50%',
      background: '#25D366',
      boxShadow: '0 6px 24px rgba(37,211,102,0.45), 0 4px 20px rgba(0,0,0,0.25)',
      width: '56px',
      height: '56px',
    }}
  ><MessageSquare className="w-6 h-6" style={{ color: '#fff' }} /></a>
)

// ─── About Doctor ────────────────────────────────────────────────────────────
const AboutDoctorSection = () => (
  <section id="doctor" style={{ background: '#FAF7F2', padding: 'clamp(3.5rem, 8vw, 7rem) clamp(1rem, 3vw, 1.5rem)' }}>
    <div style={{ maxWidth: '64rem', margin: '0 auto' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))', gap: 'clamp(2rem, 5vw, 4rem)', alignItems: 'start' }}>
        {/* Photo */}
        {DOCTOR_PHOTO_URL
          ? <img src={DOCTOR_PHOTO_URL} alt="Dr. Víctor Manuel Agudelo" style={{ borderRadius: '20px', width: '100%', aspectRatio: '3/4', objectFit: 'cover', maxHeight: '500px', objectPosition: 'top center' }} />
          : <ProfileImagePlaceholder />
        }
        {/* Bio */}
        <div>
          <p style={{ fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#94a3b8', marginBottom: '0.75rem' }}>
            Sobre el médico
          </p>
          <h2 className="section-reveal-header" style={{ color: '#1A1A1A', fontWeight: 700, fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', letterSpacing: '-0.03em', lineHeight: 1.05, marginBottom: '0.5rem' }}>
            Dr. Víctor Manuel Agudelo
          </h2>
          <p style={{ color: '#2D4A3E', fontSize: '1rem', fontWeight: 500, marginBottom: '1.75rem' }}>
            Otorrinolaringólogo · Cirujano Plástico Facial · Especialista en Rinoplastia
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem', marginBottom: '2rem' }}>
            <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: 1.75 }}>
              Llevo dos décadas dedicado a un solo objetivo: que cada paciente quede con la nariz que siempre quiso — que se vea natural, que respire bien, y que sea completamente suya.
            </p>
            <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: 1.75 }}>
              Creo en la honestidad clínica. No prometo lo que no puedo cumplir. Antes de cualquier decisión, reviso tu caso en detalle, mostramos simulaciones y comparamos con resultados reales de pacientes con características similares.
            </p>
            <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: 1.75 }}>
              Estoy presente en cada etapa: desde la primera consulta hasta el último control postoperatorio. Nunca delego ese acompañamiento.
            </p>
          </div>
          {/* Credentials */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {[
              'Miembro SCCPFR desde 2004',
              'Miembro ACORL desde 2004',
              '1500+ casos documentados',
              'Reseñas verificadas en RealSelf.com',
            ].map(badge => (
              <span key={badge} style={{ background: '#F0EDE8', border: '1px solid #D4CFC9', borderRadius: '100px', padding: '0.375rem 0.875rem', fontSize: '0.78rem', fontWeight: 500, color: '#2D4A3E' }}>
                {badge}
              </span>
            ))}
          </div>

          {/* Inline CTA + WhatsApp */}
          <div style={{ marginTop: '2.25rem', display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <a href="#agendar" style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              background: '#2D4A3E', color: '#fff', borderRadius: '100px',
              padding: '0.85rem 1.5rem', fontSize: '0.875rem', fontWeight: 600,
              textDecoration: 'none',
            }}>
              <Calendar className="w-4 h-4" /> Conoce tu caso con el Dr. Agudelo
            </a>
            <a href="#agendar" style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              color: '#2D4A3E', fontSize: '0.875rem', fontWeight: 600,
              textDecoration: 'none', padding: '0.85rem 0.5rem',
            }}>
              <Calendar className="w-4 h-4" /> Pedir evaluación gratuita
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
)

// ─── Surgery Types ────────────────────────────────────────────────────────────
const SurgeryTypesSection = () => (
  <section style={{ background: '#FAF7F2', padding: 'clamp(3rem, 8vw, 6rem) clamp(1rem, 3vw, 1.5rem)', borderTop: '1px solid rgba(0,0,0,0.06)' }}>
    <div style={{ maxWidth: '68rem', margin: '0 auto' }}>
      <p style={{ fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#94a3b8', marginBottom: '1rem' }}>
        Procedimientos
      </p>
      <h2 className="section-reveal-header" style={{ color: '#1A1A1A', fontWeight: 700, fontSize: 'clamp(2rem, 4vw, 3rem)', letterSpacing: '-0.03em', lineHeight: 1.05, marginBottom: '0.75rem' }}>
        Más de un procedimiento.<br />Una sola decisión.
      </h2>
      <p style={{ color: '#64748b', fontSize: '1rem', lineHeight: 1.7, maxWidth: '44rem', marginBottom: '3rem' }}>
        Cada cirugía se diseña para una necesidad específica. Conoce los tipos de procedimientos y encuentra el que corresponde a tu caso.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))', gap: '1.5rem' }}>
        <div style={{ background: '#fff', borderRadius: '20px', padding: 'clamp(1.25rem, 4vw, 2rem)', border: '1px solid rgba(0,0,0,0.07)', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#2D4A3E', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ color: '#fff', fontSize: '1rem', fontWeight: 700 }}>◈</span>
          </div>
          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', fontWeight: 600, color: '#1A1A1A', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
            Rinoplastias
          </h3>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
            {['Rinoplastia Estética', 'Rinoplastia Afrolatina', 'Rinoplastia Secundaria'].map(item => (
              <li key={item} style={{ fontSize: '0.875rem', color: '#475569', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#2D4A3E', flexShrink: 0 }} />
                {item}
              </li>
            ))}
          </ul>
          <Link
            to="/rinoplastia"
            style={{ marginTop: 'auto', display: 'inline-flex', alignItems: 'center', gap: '0.375rem', color: '#2D4A3E', fontSize: '0.875rem', fontWeight: 600, textDecoration: 'none' }}
          >
            Ver tipos de rinoplastia →
          </Link>
        </div>

        <div style={{ background: '#fff', borderRadius: '20px', padding: 'clamp(1.25rem, 4vw, 2rem)', border: '1px solid rgba(0,0,0,0.07)', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#1A1A1A', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ color: '#fff', fontSize: '1rem', fontWeight: 700 }}>◆</span>
          </div>
          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', fontWeight: 600, color: '#1A1A1A', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
            Procedimientos Faciales
          </h3>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
            {['Mentoplastia', 'Otoplastia', 'Blefaroplastia', 'Reducción de papada · Mínimamente invasivos'].map(item => (
              <li key={item} style={{ fontSize: '0.875rem', color: '#475569', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#1A1A1A', flexShrink: 0 }} />
                {item}
              </li>
            ))}
          </ul>
          <Link
            to="/procedimientos"
            style={{ marginTop: 'auto', display: 'inline-flex', alignItems: 'center', gap: '0.375rem', color: '#1A1A1A', fontSize: '0.875rem', fontWeight: 600, textDecoration: 'none' }}
          >
            Ver procedimientos faciales →
          </Link>
        </div>
      </div>

      <div style={{ marginTop: 'clamp(2.5rem, 5vw, 3.5rem)', textAlign: 'center' }}>
        <a href="#agendar" style={{
          display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
          background: '#2D4A3E', color: '#fff', borderRadius: '100px',
          padding: '0.85rem 1.75rem', fontSize: '0.875rem', fontWeight: 600,
          textDecoration: 'none', letterSpacing: '0.01em',
        }}>
          <Calendar className="w-4 h-4" /> Pedir evaluación gratuita
        </a>
      </div>
    </div>
  </section>
)

// ─── Process Section ─────────────────────────────────────────────────────────
const PROCESS_STEPS = [
  { number: '01', title: 'Envío de fotos sin costo',  featured: false, description: 'Envías fotos de frente y perfil. Evaluamos tu caso y te respondemos si eres candidata, sin costo y sin compromiso.' },
  { number: '02', title: 'Consulta personalizada',    featured: false, description: 'Consulta con el Dr. Agudelo por $250.000 COP (virtual o presencial). Revisamos tu caso, hacemos simulación y entregamos cotización. Si decides operarte, las siguientes consultas no tienen costo adicional.' },
  { number: '03', title: 'Planificación quirúrgica',  featured: true,  description: 'Diseñamos el plan específico para tu nariz y tu rostro. Expectativas reales, sin promesas imposibles.' },
  { number: '04', title: 'El día de la cirugía',      featured: false, description: 'El Dr. Agudelo presente en todo momento. La rinoplastia dura aproximadamente 4 horas bajo anestesia general.' },
  { number: '05', title: 'Postoperatorio acompañado', featured: false, description: 'Cinco controles incluidos: 7 días, 15 días, 1 mes, 3 meses y 6 meses. A los 15 días se retiran cintas y puntos. El Dr. Agudelo hace cada seguimiento personalmente, nunca lo delega. El resultado final llega entre los 12 y 18 meses.' },
]

const PROCESS_EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94]

function useScrollInView(ref: React.RefObject<HTMLElement | null>, margin = '-10% 0px') {
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); obs.disconnect() } },
      { rootMargin: margin }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return inView
}

const ProcessSection = () => {
  const headerRef    = useRef<HTMLDivElement>(null)
  const headerInView = useScrollInView(headerRef)
  const reduced = typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false
  const dur = reduced ? 0.01 : 0.7

  return (
    <section style={{ position: 'relative', background: '#FAF7F2', overflow: 'hidden', padding: 'clamp(4rem, 10vw, 8rem) clamp(1rem, 3vw, 1.5rem)' }}>

      {/* Background blobs */}
      <div aria-hidden="true" style={{ pointerEvents: 'none', position: 'absolute', inset: 0, zIndex: 0 }}>
        <div style={{ position: 'absolute', top: '-8%', left: '-6%', width: '520px', height: '520px', borderRadius: '50%', background: 'rgba(45,74,62,0.07)', filter: 'blur(100px)' }} />
        <div style={{ position: 'absolute', bottom: '-8%', right: '-6%', width: '600px', height: '600px', borderRadius: '50%', background: 'rgba(45,74,62,0.05)', filter: 'blur(120px)' }} />
      </div>

      <div style={{ position: 'relative', zIndex: 1, maxWidth: '68rem', margin: '0 auto' }}>

        {/* Header */}
        <div ref={headerRef} style={{ textAlign: 'center', marginBottom: '1rem' }}>
          <motion.p
            style={{ fontFamily: 'var(--font-sans)', fontSize: '0.7rem', fontWeight: 400, letterSpacing: '0.35em', textTransform: 'uppercase', color: 'rgba(45,74,62,0.7)', marginBottom: '1rem' }}
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: dur, ease: PROCESS_EASE, delay: reduced ? 0 : 0 }}
          >
            De principio a fin
          </motion.p>

          <motion.h2
            className="section-reveal-header"
            style={{ color: '#1A1A1A', fontWeight: 700, fontSize: 'clamp(2.5rem, 5vw, 4rem)', letterSpacing: '-0.03em', lineHeight: 1.05, marginBottom: '1.25rem' }}
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: dur, ease: PROCESS_EASE, delay: reduced ? 0 : 0.1 }}
          >
            Tu camino, paso a paso
          </motion.h2>

          <motion.p
            style={{ fontFamily: 'var(--font-sans)', color: 'rgba(0,0,0,0.45)', fontSize: 'clamp(0.9rem, 1.3vw, 1rem)', lineHeight: 1.7, maxWidth: '44ch', margin: '0 auto 1.75rem' }}
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: dur, ease: PROCESS_EASE, delay: reduced ? 0 : 0.2 }}
          >
            Un proceso claro, sin sorpresas. Sabes exactamente qué esperar en cada etapa.
          </motion.p>

          <motion.a
            href="#agendar"
            className="process-cta-link"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', border: '1px solid rgba(45,74,62,0.45)', color: '#2D4A3E', borderRadius: '100px', padding: '0.75rem 1.875rem', fontSize: '0.82rem', fontFamily: 'var(--font-sans)', fontWeight: 500, textDecoration: 'none', letterSpacing: '0.1em', textTransform: 'uppercase' }}
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: dur, ease: PROCESS_EASE, delay: reduced ? 0 : 0.3 }}
            whileHover={{ backgroundColor: '#2D4A3E', color: '#fff', borderColor: '#2D4A3E' }}
          >
            ¿Cómo funciona?
          </motion.a>
        </div>

        <StepsStagger steps={PROCESS_STEPS} />
      </div>
    </section>
  )
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
    }).catch(() => {})
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
          <AboutDoctorSection />
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
        <Route path="/procedimientos" element={<ProcedimientosPage />} />
        <Route path="/testimonios" element={<TestimoniosPage />} />
        <Route path="/privacidad" element={<PrivacidadPage />} />
      </Routes>
    </>
  )
}
