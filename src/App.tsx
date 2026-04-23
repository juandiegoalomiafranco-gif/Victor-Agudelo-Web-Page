import React, { useState, useEffect, useLayoutEffect, useRef } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'motion/react'
import {
  Phone, Mail, MapPin, Instagram, Facebook,
  Menu, X, Star, Calendar, MessageSquare,
  ChevronLeft, ChevronRight, VolumeX, Play,
} from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import { ProceduresSlider } from './components/ProceduresSlider'
import { FaqAccordion }    from './components/FaqAccordion'
import { RinoplastiaPage }    from './pages/RinoplastiaPage'
import { ProcedimientosPage } from './pages/ProcedimientosPage'

gsap.registerPlugin(ScrollTrigger)

// ─── Types ───────────────────────────────────────────────────────────────────
interface Procedure { id: string; title: string; tag: string; desc: string; img: string }
interface Differentiator { id: string; label: string; headline: string; body: string; img: string }
interface Testimonial { id: string; name: string; procedure: string; text: string; initials: string }

// ─── Data ────────────────────────────────────────────────────────────────────
const PROCEDURES: Procedure[] = [
  { id: 'rino-estetica',  title: 'Rinoplastia Estética',                             tag: 'Cirugía Estrella',      desc: 'Modificamos forma, tamaño y proporciones para que el resultado armonice con tu rostro. Técnica Estructural con ultrasonido piezoeléctrico.', img: '' },
  { id: 'rino-afro',      title: 'Rinoplastia Afrolatina',                           tag: 'Especializada',         desc: 'Técnica para narices con características afrolatinas, preservando la identidad y logrando resultados naturales.', img: '' },
  { id: 'rino-sec',       title: 'Rinoplastia Secundaria',                           tag: 'Alta Complejidad',      desc: 'Para pacientes que tuvieron una cirugía previa y no quedaron satisfechos. Corrección de deformidades, asimetrías o problemas funcionales.', img: '' },
  { id: 'mento',          title: 'Mentoplastia',                                     tag: 'Perfil Facial',         desc: 'Modificación del mentón para mejorar el perfil facial. Frecuentemente combinada con rinoplastia.', img: '' },
  { id: 'oto',            title: 'Otoplastia',                                       tag: 'Orejas',                desc: 'Corrección de la forma o posición de las orejas. Alta satisfacción y resultados definitivos.', img: '' },
  { id: 'blfaro',         title: 'Blefaroplastia',                                   tag: 'Mirada',                desc: 'Cirugía de párpados para rejuvenecer la mirada y eliminar bolsas con aspecto natural.', img: '' },
  { id: 'papada',         title: 'Reducción de Papada con Láser',                    tag: 'Sin Cirugía',           desc: 'Contorno facial con tecnología láser. Sin cirugía, mínima recuperación.', img: '' },
  { id: 'invasivos',      title: 'Toxina Botulínica · Ácido Hialurónico · Láser CO2', tag: 'Mínimamente Invasivos', desc: 'Tratamientos de rejuvenecimiento sin cirugía para complementar resultados de procedimientos más complejos.', img: '' },
]

const DIFFERENTIATORS: Differentiator[] = [
  { id: 'ultra', label: 'Técnica Ultrasónica Piezotome®', headline: 'Precisión que el bisturí tradicional no puede alcanzar.', body: 'Desde hace más de dos años incorporamos ultrasonido piezoeléctrico en rinoplastia. Modifica la estructura ósea con mayor control: menos trauma, recuperación más rápida, resultados más predecibles.', img: 'https://images.unsplash.com/photo-1530026405186-ed1f139313f3?w=900&q=80' },
  { id: 'exp',   label: '20 Años en Rinoplastia',          headline: 'Más de 200 casos documentados — solo en nariz.',           body: '20 años dedicados a que cada paciente quede con la nariz que siempre quiso. Miembro SCCPFR y ACORL desde 2004. Reseñas verificadas en RealSelf.com.',                img: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=900&q=80' },
  { id: 'nat',   label: 'Naturalidad ante todo',           headline: 'El objetivo es que no se note que estuviste operada.',      body: 'No trabajamos con moldes. Cada nariz se diseña para el rostro de esa persona. Mostramos simulaciones y comparamos con casos reales similares antes de cualquier decisión.',  img: 'https://images.unsplash.com/photo-1571772996211-2f02c9727629?w=900&q=80' },
  { id: 'acomp', label: 'Acompañamiento Personal',         headline: 'El Dr. Agudelo está presente en cada etapa — nunca lo delega.', body: 'Desde la primera consulta hasta el último control postoperatorio. El doctor hace el seguimiento personal. No hay asistentes que reemplacen ese acompañamiento.', img: 'https://images.unsplash.com/photo-1631815589968-fdb09a223b1e?w=900&q=80' },
]

const TESTIMONIALS: Testimonial[] = [
  { id: '1', name: 'Paciente, Cali', procedure: 'Rinoplastia', initials: 'P1', text: 'Consulté con otros dos médicos antes y en ninguno me dedicaron tiempo real. Con el Dr. Agudelo fue completamente diferente — me escuchó, me mostró casos similares y fui a la cirugía con expectativas claras. El resultado es exactamente lo que quería: natural.' },
  { id: '2', name: 'Paciente, Cali', procedure: 'Rinoplastia', initials: 'P2', text: 'Lo que más me sorprendió fue el seguimiento postoperatorio. El doctor me llamaba personalmente para saber cómo estaba. Nunca sentí que me dejaron sola después de la cirugía.' },
  { id: '3', name: 'Paciente, Cali', procedure: 'Rinoplastia', initials: 'P3', text: 'Tenía mucho miedo de quedar con la nariz muy levantada. Desde la primera consulta el doctor fue claro: "El objetivo es que no se note que estuviste operada." Y así quedé.' },
]

// ─── Navbar ──────────────────────────────────────────────────────────────────
const Navbar = () => {
  const [open, setOpen]       = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const links = [
    { label: 'RINOPLASTIA',    href: '/rinoplastia',    isPage: true },
    { label: 'PROCEDIMIENTOS', href: '/procedimientos', isPage: true },
    { label: 'TESTIMONIOS',    href: '#testimonios',    isPage: false },
  ]

  return (
    <>
      <header
        className="fixed inset-x-0 top-0 z-50"
        style={{ padding: '1rem 0' }}
      >
        <div
          className="max-w-5xl mx-auto px-4"
          style={{
            opacity: scrolled ? 1 : 0,
            transform: scrolled ? 'translateY(0)' : 'translateY(-8px)',
            transition: 'opacity 0.4s ease, transform 0.4s ease',
            pointerEvents: scrolled ? 'auto' : 'none',
          }}
        >
          <nav
            style={{
              background: 'rgba(255,255,255,0.95)',
              backdropFilter: 'blur(16px)',
              border: '1px solid rgba(0,0,0,0.08)',
              borderRadius: '100px',
              padding: '0.5rem 0.5rem 0.5rem 1.25rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              boxShadow: '0 2px 20px rgba(0,0,0,0.06)',
            }}
          >
            {/* Logo */}
            <a
              href="#inicio"
              style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
            >
              <div
                style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  background: '#242424',
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                }}
              >
                A
              </div>
              <span style={{ color: '#1e293b', fontWeight: 600, fontSize: '0.95rem', letterSpacing: '-0.01em' }}>
                Dr. Agudelo
              </span>
            </a>

            {/* Desktop links */}
            <ul className="hidden md:flex items-center" style={{ gap: '2rem' }}>
              {links.map(l => (
                <li key={l.href}>
                  {l.isPage ? (
                    <Link
                      to={l.href}
                      style={{
                        textDecoration: 'none',
                        fontSize: '0.8rem',
                        fontWeight: 500,
                        letterSpacing: '0.08em',
                        color: '#475569',
                        transition: 'color 0.2s ease',
                      }}
                      onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = '#0f172a' }}
                      onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = '#475569' }}
                    >
                      {l.label}
                    </Link>
                  ) : (
                    <a
                      href={l.href}
                      style={{
                        textDecoration: 'none',
                        fontSize: '0.8rem',
                        fontWeight: 500,
                        letterSpacing: '0.08em',
                        color: '#475569',
                        transition: 'color 0.2s ease',
                      }}
                      onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = '#0f172a' }}
                      onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = '#475569' }}
                    >
                      {l.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>

            {/* CTA */}
            <a
              href="#agendar"
              className="hidden md:flex items-center gap-2"
              style={{
                textDecoration: 'none',
                background: '#2d5016',
                color: '#fff',
                borderRadius: '100px',
                padding: '0.6rem 1.25rem',
                fontSize: '0.8rem',
                fontWeight: 600,
                letterSpacing: '0.04em',
                transition: 'background 0.2s ease',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = '#1f3a0e' }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = '#2d5016' }}
            >
              <Calendar className="w-3.5 h-3.5" />
              PEDIR CITA
            </a>

            {/* Mobile hamburger */}
            <button
              onClick={() => setOpen(!open)}
              className="md:hidden p-2"
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#242424' }}
              aria-label="Menú"
            >
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </nav>
        </div>

        {/* Transparent navbar for hero */}
        <div
          className="max-w-7xl mx-auto px-6"
          style={{
            position: 'absolute',
            inset: '1rem 0 auto 0',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            opacity: scrolled ? 0 : 1,
            pointerEvents: scrolled ? 'none' : 'auto',
            transition: 'opacity 0.4s ease',
          }}
        >
          <a href="#inicio" style={{ textDecoration: 'none', color: '#fff', fontWeight: 700, fontSize: '1.1rem', letterSpacing: '-0.02em' }}>
            Dr. Agudelo
          </a>
          <ul className="hidden md:flex items-center gap-7">
            {links.map(l => (
              <li key={l.href}>
                {l.isPage ? (
                  <Link to={l.href} style={{ textDecoration: 'none', fontSize: '0.8rem', fontWeight: 500, letterSpacing: '0.08em', color: 'rgba(255,255,255,0.8)', transition: 'color 0.2s ease' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = '#fff' }}
                    onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.8)' }}
                  >{l.label}</Link>
                ) : (
                  <a href={l.href} style={{ textDecoration: 'none', fontSize: '0.8rem', fontWeight: 500, letterSpacing: '0.08em', color: 'rgba(255,255,255,0.8)', transition: 'color 0.2s ease' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = '#fff' }}
                    onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.8)' }}
                  >{l.label}</a>
                )}
              </li>
            ))}
          </ul>
          <a
            href="#agendar"
            className="hidden md:inline-flex items-center gap-2"
            style={{
              textDecoration: 'none',
              background: 'rgba(255,255,255,0.12)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255,255,255,0.2)',
              color: '#fff',
              borderRadius: '100px',
              padding: '0.6rem 1.25rem',
              fontSize: '0.8rem',
              fontWeight: 500,
              letterSpacing: '0.04em',
            }}
          >
            <Calendar className="w-3.5 h-3.5" />
            PEDIR CITA
          </a>
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2"
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#fff' }}
            aria-label="Menú"
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile overlay */}
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
                  { label: 'Testimonios', href: '#testimonios', isPage: false },
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
                <Calendar className="w-4 h-4" /> PEDIR CITA
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

// ─── Sticky Hero con Clip-Path Scroll Shrink ─────────────────────────────────
const StickyNarrativeSection = () => {
  const outerRef       = useRef<HTMLDivElement>(null)
  const frameRef       = useRef<HTMLDivElement>(null)
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

  useEffect(() => {
    let ctx: any

    Promise.all([
      import('gsap').then((m: any) => m.default ?? m.gsap ?? m),
      import('gsap/ScrollTrigger').then((m: any) => m.ScrollTrigger),
    ]).then(([gsap, ScrollTrigger]: any[]) => {
      gsap.registerPlugin(ScrollTrigger)

      ctx = gsap.context(() => {

        // ── Estado inicial explícito ──
        gsap.set(heroOverlayRef.current, { transformOrigin: 'center center', opacity: 1, scale: 1 })

        // ── Salida hero: scale-up + fade ──
        gsap.to(heroOverlayRef.current, {
          opacity: 0,
          scale: 1.09,
          ease: 'none',
          overwrite: 'auto',
          scrollTrigger: {
            trigger: outerRef.current,
            start: 'top top',
            end: '30% top',
            scrub: 0.8,
            onEnterBack: () => {
              gsap.set(heroOverlayRef.current, { opacity: 1, scale: 1 })
            },
          },
        })

        // ── Clip-path shrink ──
        ScrollTrigger.create({
          trigger: outerRef.current,
          start: 'top top',
          end: '80% bottom',
          scrub: 1.2,
          onUpdate: (self: any) => {
            const p = self.progress
            const inset  = p * 44
            const radius = p * 28
            if (frameRef.current) {
              frameRef.current.style.clipPath = `inset(${inset}px round ${radius}px)`
            }
          },
        })

      }, outerRef)
    }).catch(() => {})

    return () => ctx?.revert()
  }, [])

  return (
    <div ref={outerRef} className="narrative-section relative" style={{ height: '200vh' }}>

      {/* Frame con clip-path */}
      <div
        ref={frameRef}
        className="sticky top-0 h-screen w-screen overflow-hidden"
        style={{ clipPath: 'inset(0px round 0px)' }}
      >
        <img
          src="https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=1920&q=85"
          alt="Quirófano Dr. Víctor Agudelo"
          className="absolute inset-0 w-full h-full object-cover object-center"
          style={{ background: '#0a0a0a' }}
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
          style={{ zIndex: 20, padding: '0 1.5rem', transformOrigin: 'center center', willChange: 'transform, opacity' }}
        >
          <p data-hero-anim style={{
            color: 'rgba(201,168,76,0.85)',
            fontSize: '0.7rem',
            fontWeight: 600,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            marginBottom: '1.25rem',
          }}>
            Rinoplastia · Cali · Colombia
          </p>
          <h1
            data-hero-anim
            style={{
              fontSize: 'clamp(2.8rem, 5.5vw, 5.5rem)',
              fontWeight: 600,
              lineHeight: 1.1,
              letterSpacing: '-0.03em',
              maxWidth: '620px',
              color: '#ffffff',
              fontFamily: 'var(--font-serif)',
            }}
          >
            Una nariz que se ve tuya,<br />
            <span style={{ fontWeight: 400, opacity: 0.75 }}>no operada.</span>
          </h1>
          <p data-hero-anim style={{
            color: 'rgba(255,255,255,0.82)',
            fontSize: 'clamp(1rem, 1.75vw, 1.2rem)',
            marginTop: '1.5rem',
            maxWidth: '460px',
            lineHeight: 1.65,
            fontWeight: 400,
          }}>
            Más de 20 años diseñando narices naturales en Cali.<br />
            Cada resultado se construye para tu rostro — no para un molde.
          </p>
          <p data-hero-anim style={{
            color: 'rgba(201,168,76,0.9)',
            fontSize: '0.825rem',
            fontWeight: 400,
            marginTop: '1.75rem',
            letterSpacing: '0.01em',
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
          }}>
            <span style={{ display: 'inline-block', width: '1.5rem', height: '1px', background: 'rgba(201,168,76,0.55)', flexShrink: 0 }} />
            Resultados naturales, contigo en cada momento del proceso.
          </p>
          <div data-hero-anim style={{ display: 'flex', gap: '0.75rem', marginTop: '1.75rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            <a
              href="#agendar"
              style={{
                background: '#C9A84C',
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
              Solicita tu evaluación gratuita
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
      </div>
    </div>
  )
}


// ─── Differentiators ─────────────────────────────────────────────────────────
const DifferentiatorsSection = () => {
  const pillars = [
    {
      stat: '20 años',
      label: 'Solo en cirugía nasal',
      desc: 'Especialización exclusiva en rinoplastia desde 2004. Miembro SCCPFR y ACORL.',
    },
    {
      stat: '200+',
      label: 'Casos documentados',
      desc: 'Antes de decidir, verás casos reales con características similares a las tuyas.',
    },
    {
      stat: 'Piezosurgery',
      label: 'Técnica disponible en Cali desde 2022',
      desc: 'Ultrasonido piezoeléctrico para mayor precisión ósea y recuperación más predecible.',
    },
    {
      stat: 'Presente',
      label: 'De la consulta al último control',
      desc: 'El Dr. Agudelo hace el seguimiento personal en cada etapa — nunca lo delega.',
    },
  ]

  return (
    <section id="diferenciadores" style={{ background: '#fff', padding: '6rem 1.5rem' }}>
      <div style={{ maxWidth: '68rem', margin: '0 auto' }}>
        <div className="diff-title section-reveal-header" style={{ marginBottom: '4rem' }}>
          <p style={{ fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#94a3b8', marginBottom: '1rem' }}>
            Por qué el Dr. Agudelo
          </p>
          <h2 style={{ color: '#1A1A1A', fontWeight: 700, fontSize: 'clamp(2.4rem, 4vw, 3.5rem)', letterSpacing: '-0.03em', lineHeight: 1.05 }}>
            La clave detrás de cada resultado natural.
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '2.5rem' }}>
          {pillars.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -60 : 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              whileHover={{ y: -6, boxShadow: '0 16px 40px rgba(0,0,0,0.09)' }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              style={{ borderTop: '1px solid rgba(0,0,0,0.1)', paddingTop: '1.75rem', borderRadius: '8px', cursor: 'default' }}
            >
              <p style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.8rem, 2.8vw, 2.4rem)', fontWeight: 600, color: '#1A1A1A', lineHeight: 1, marginBottom: '0.5rem', letterSpacing: '-0.02em' }}>
                {p.stat}
              </p>
              <p style={{ fontSize: '0.75rem', fontWeight: 600, color: '#2D4A3E', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                {p.label}
              </p>
              <p style={{ fontSize: '0.875rem', color: '#64748b', lineHeight: 1.65 }}>
                {p.desc}
              </p>
            </motion.div>
          ))}
        </div>
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
    <section id="testimonios" className="py-28" style={{ background: '#f5f5f0' }}>
      <div className="max-w-7xl mx-auto px-6">
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

        {/* Video-style cards slider */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto no-scrollbar pb-4"
          style={{ scrollSnapType: 'x mandatory' }}
        >
          {TESTIMONIALS.map((t, i) => (
            <div
              key={t.id}
              onClick={() => setIdx(i)}
              className="flex-shrink-0 relative"
              style={{
                width: 'clamp(200px, 28vw, 280px)',
                aspectRatio: '9/14',
                borderRadius: '20px',
                overflow: 'hidden',
                cursor: 'pointer',
                scrollSnapAlign: 'center',
                opacity: i === idx ? 1 : 0.45,
                transition: 'opacity 0.4s ease',
                background: '#1e1e24',
              }}
            >
              {/* Mute icon */}
              <div style={{
                position: 'absolute', top: '0.75rem', left: '0.75rem', zIndex: 10,
                background: 'rgba(0,0,0,0.5)', borderRadius: '50%',
                width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <VolumeX className="w-3.5 h-3.5" style={{ color: '#fff' }} />
              </div>

              {/* Center play + initials */}
              <div style={{
                position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center', gap: '0.75rem',
              }}>
                <div style={{
                  width: '56px', height: '56px', borderRadius: '50%',
                  background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(6px)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1.1rem', fontWeight: 700, color: '#fff', letterSpacing: '0.02em',
                }}>
                  {t.initials}
                </div>
                <div style={{
                  width: '40px', height: '40px', borderRadius: '50%',
                  background: 'rgba(255,255,255,0.18)', display: 'flex',
                  alignItems: 'center', justifyContent: 'center',
                }}>
                  <Play className="w-4 h-4" style={{ color: '#fff', marginLeft: '2px' }} />
                </div>
              </div>

              {/* Bottom chip */}
              <div style={{
                position: 'absolute', bottom: '0.75rem', left: '0.75rem', right: '0.75rem', zIndex: 10,
                background: 'rgba(255,255,255,0.95)', borderRadius: '14px',
                padding: '0.5rem 0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem',
              }}>
                <div style={{
                  width: '28px', height: '28px', borderRadius: '50%', background: '#242424',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '0.55rem', fontWeight: 700, color: '#fff', flexShrink: 0,
                }}>
                  {t.initials}
                </div>
                <div style={{ overflow: 'hidden' }}>
                  <p style={{ fontSize: '0.75rem', fontWeight: 600, color: '#242424', lineHeight: 1.2 }}>{t.name}</p>
                  <p style={{ fontSize: '0.625rem', color: '#94a3b8', fontWeight: 400 }}>{t.procedure}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Progress bar */}
        <div className="flex items-center gap-6 mt-6">
          <button onClick={() => setIdx(i => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#242424', display: 'flex' }}>
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
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#242424', display: 'flex' }}>
            <ChevronRight className="w-5 h-5" />
          </button>
          <span className="text-sm tabular-nums whitespace-nowrap" style={{ color: '#94a3b8', fontWeight: 400 }}>
            {String(idx + 1).padStart(2, '0')} / {String(TESTIMONIALS.length).padStart(2, '0')}
          </span>
        </div>
      </div>
    </section>
  )
}

// ─── Booking Section ─────────────────────────────────────────────────────────
const BookingSection = () => {
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }))

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.phone) return
    setStatus('loading')
    try {
      const res = await fetch('https://n8n.srv1559791.hstgr.cloud/webhook/agudelo-lead-capture', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre: form.name,
          correo: form.email,
          telefono: form.phone,
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
    <section id="agendar" className="py-28" style={{ background: 'var(--color-1)' }}>
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-14">
          <p className="text-xs uppercase tracking-[0.2em] mb-3" style={{ color: 'var(--color-9)', fontWeight: 600 }}>
            Contacto
          </p>
          <h2 className="text-4xl md:text-5xl mb-4 section-reveal-header" style={{ color: 'var(--color-4)', fontWeight: 700 }}>
            Da el primer paso —<br />
            <span style={{ fontWeight: 400, color: 'var(--color-5)' }}>sin compromiso.</span>
          </h2>
          <p className="text-sm" style={{ color: 'var(--color-12)', fontWeight: 400 }}>
            Envíanos tus fotos o agenda una consulta virtual.<br />
            El Dr. Agudelo revisa tu caso personalmente.
          </p>
        </div>

        <div className="p-8" style={{ background: 'rgba(255,255,255,0.04)', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.08)' }}>
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
                  background: '#C9A84C', display: 'flex', alignItems: 'center',
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
                    <input type="text" placeholder="Ej. Ana García" value={form.name} onChange={set('name')} style={inputCls} />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider mb-2" style={{ color: 'var(--color-5)', fontWeight: 400 }}>Correo electrónico *</label>
                    <input type="email" placeholder="ana@correo.com" value={form.email} onChange={set('email')} style={inputCls} />
                  </div>
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider mb-2" style={{ color: 'var(--color-5)', fontWeight: 400 }}>Teléfono / WhatsApp *</label>
                  <input type="tel" placeholder="+57 300 000 0000" value={form.phone} onChange={set('phone')} style={inputCls} />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider mb-2" style={{ color: 'var(--color-5)', fontWeight: 400 }}>Mensaje (opcional)</label>
                  <textarea rows={3} placeholder="Cuéntanos brevemente tu caso..." value={form.message} onChange={set('message')} style={{ ...inputCls, resize: 'none' }} />
                </div>
                {status === 'error' && (
                  <p style={{ color: '#f87171', fontSize: '0.8rem', textAlign: 'center' }}>
                    Hubo un problema al enviar. Intenta de nuevo o escríbenos por WhatsApp.
                  </p>
                )}
                <button
                  onClick={handleSubmit}
                  disabled={status === 'loading'}
                  className="flex items-center justify-center gap-2 w-full py-4 mt-2 text-sm transition-all"
                  style={{
                    background: '#C9A84C',
                    color: '#fff',
                    borderRadius: '100px',
                    fontWeight: 600,
                    border: 'none',
                    cursor: status === 'loading' ? 'not-allowed' : 'pointer',
                    opacity: status === 'loading' ? 0.7 : 1,
                  }}
                >
                  {status === 'loading' ? 'Enviando…' : <><Calendar className="w-4 h-4" /> Solicitar evaluación gratuita</>}
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
      <div className="grid md:grid-cols-4 gap-12 mb-16">
        <div>
          <p style={{ color: '#ffffff', fontWeight: 700, fontSize: '1.1rem', letterSpacing: '-0.02em', marginBottom: '1rem' }}>Dr. Agudelo</p>
          <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)', fontWeight: 400, maxWidth: '18rem' }}>
            Especialista en rinoplastia natural en Cali. Más de 20 años de experiencia. Resultados que se ven tuyos, no operados.
          </p>
          <div className="flex gap-4 mt-6">
            <a href="https://instagram.com/doctorvictoragudelo" target="_blank" rel="noopener noreferrer" aria-label="Instagram" style={{ color: 'rgba(255,255,255,0.5)' }}><Instagram className="w-5 h-5" /></a>
            <a href="https://facebook.com/dr.victor.agudelo" target="_blank" rel="noopener noreferrer" aria-label="Facebook" style={{ color: 'rgba(255,255,255,0.5)' }}><Facebook className="w-5 h-5" /></a>
            <a href="https://wa.me/573023234594" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" style={{ color: 'rgba(255,255,255,0.5)' }}><MessageSquare className="w-5 h-5" /></a>
          </div>
        </div>
        <div>
          <p className="text-xs uppercase tracking-widest mb-5" style={{ color: 'rgba(255,255,255,0.35)', fontWeight: 600 }}>Navegación</p>
          <ul className="flex flex-col gap-3">
            {['Inicio', 'Procedimientos', 'La Clínica', 'Testimonios', 'Contacto'].map(l => (
              <li key={l}>
                <a href={`#${l.toLowerCase().replace(/\s/g, '')}`} className="text-sm transition-colors"
                  style={{ color: 'rgba(255,255,255,0.55)', fontWeight: 400, textDecoration: 'none' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = '#ffffff' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.55)' }}
                >{l}</a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-xs uppercase tracking-widest mb-5" style={{ color: 'rgba(255,255,255,0.35)', fontWeight: 600 }}>Ubicación</p>
          <div className="flex gap-3">
            <MapPin className="w-4 h-4 mt-0.5 shrink-0" style={{ color: 'rgba(255,255,255,0.4)' }} />
            <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)', fontWeight: 400 }}>Avenida 4 Norte 14-38, Consultorio 302<br />Cali · Clínica de Otorrinolaringología<br />y Cirugía Plástica</p>
          </div>
        </div>
        <div>
          <p className="text-xs uppercase tracking-widest mb-5" style={{ color: 'rgba(255,255,255,0.35)', fontWeight: 600 }}>Contacto</p>
          <ul className="flex flex-col gap-3">
            <li><a href="https://wa.me/573023234594?text=Hola%2C+me+gustar%C3%ADa+solicitar+una+evaluaci%C3%B3n+gratuita+con+el+Dr.+Agudelo." target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm" style={{ color: 'rgba(255,255,255,0.5)', fontWeight: 400, textDecoration: 'none' }}><MessageSquare className="w-4 h-4 shrink-0" style={{ color: 'rgba(255,255,255,0.4)' }} />302 323 4594</a></li>
            <li><a href="mailto:contacto@drvictoragudelo.com" className="flex items-center gap-2 text-sm" style={{ color: 'rgba(255,255,255,0.5)', fontWeight: 400, textDecoration: 'none' }}><Mail className="w-4 h-4 shrink-0" style={{ color: 'rgba(255,255,255,0.4)' }} />contacto@drvictoragudelo.com</a></li>
            <li><a href="tel:+573023234594" className="flex items-center gap-2 text-sm" style={{ color: 'rgba(255,255,255,0.5)', fontWeight: 400, textDecoration: 'none' }}><Phone className="w-4 h-4 shrink-0" style={{ color: 'rgba(255,255,255,0.4)' }} />302 323 4594</a></li>
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
  <a href="https://wa.me/573023234594?text=Hola%2C+me+gustar%C3%ADa+solicitar+una+evaluaci%C3%B3n+gratuita+con+el+Dr.+Agudelo." target="_blank" rel="noopener noreferrer" aria-label="Contactar por WhatsApp"
    className="hidden md:flex fixed bottom-8 right-8 z-50 items-center justify-center w-14 h-14 transition-transform duration-200 hover:scale-110"
    style={{ borderRadius: '50%', background: '#25D366', boxShadow: '0 4px 20px rgba(0,0,0,0.3)' }}
  ><MessageSquare className="w-6 h-6" style={{ color: '#fff' }} /></a>
)

const StickyMobileCTA = () => (
  <div className="md:hidden fixed bottom-0 inset-x-0 z-50 p-4"
    style={{ background: 'rgba(36,36,36,0.97)', backdropFilter: 'blur(16px)', borderTop: '1px solid rgba(255,255,255,0.06)' }}
  >
    <a href="#agendar" className="flex items-center justify-center gap-2 w-full py-3.5 text-sm"
      style={{ background: '#C9A84C', color: '#fff', borderRadius: '100px', fontWeight: 600, textDecoration: 'none' }}
    ><Calendar className="w-4 h-4" /> Solicita tu evaluación gratuita</a>
  </div>
)

// ─── About Doctor ────────────────────────────────────────────────────────────
const AboutDoctorSection = () => (
  <section id="doctor" style={{ background: '#FAF7F2', padding: '7rem 1.5rem' }}>
    <div style={{ maxWidth: '64rem', margin: '0 auto' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '4rem', alignItems: 'start' }}>
        {/* Photo placeholder */}
        <div style={{ borderRadius: '20px', overflow: 'hidden', aspectRatio: '3/4', background: '#E8E2DA', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '320px' }}>
          <p style={{ color: '#94a3b8', fontSize: '0.85rem', textAlign: 'center', padding: '2rem', lineHeight: 1.6 }}>
            Foto del Dr. Agudelo<br />— pendiente de entrega
          </p>
        </div>
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
              Llevo más de 20 años dedicado a un solo objetivo: que cada paciente quede con la nariz que siempre quiso — que se vea natural, que respire bien, y que sea completamente suya.
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
              '200+ casos documentados',
              'Reseñas verificadas en RealSelf.com',
            ].map(badge => (
              <span key={badge} style={{ background: '#F0EDE8', border: '1px solid #D4CFC9', borderRadius: '100px', padding: '0.375rem 0.875rem', fontSize: '0.78rem', fontWeight: 500, color: '#2D4A3E' }}>
                {badge}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
)

// ─── Surgery Types ────────────────────────────────────────────────────────────
const SurgeryTypesSection = () => (
  <section style={{ background: '#FAF7F2', padding: '6rem 1.5rem', borderTop: '1px solid rgba(0,0,0,0.06)' }}>
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

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
        <div style={{ background: '#fff', borderRadius: '20px', padding: '2rem', border: '1px solid rgba(0,0,0,0.07)', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
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

        <div style={{ background: '#fff', borderRadius: '20px', padding: '2rem', border: '1px solid rgba(0,0,0,0.07)', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
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
    </div>
  </section>
)

// ─── Process Section ─────────────────────────────────────────────────────────
const ProcessSection = () => {
  const steps = [
    { n: '01', title: 'Evaluación gratuita',       desc: 'Envías tus fotos (frente y perfil, sin flash) y recibimos tu caso. Sin costo. Sin compromiso.' },
    { n: '02', title: 'Consulta personalizada',    desc: 'Virtual ($250.000 COP) o presencial ($250.000 COP). Revisamos tu caso, mostramos simulaciones y comparamos con resultados similares. Si decides operarte, la presencial posterior no tiene costo adicional.' },
    { n: '03', title: 'Planificación quirúrgica',  desc: 'Diseñamos el plan específico para tu nariz y tu rostro. Expectativas reales, no promesas imposibles.' },
    { n: '04', title: 'El día de la cirugía',      desc: 'El Dr. Agudelo estará presente en todo momento. La rinoplastia toma aproximadamente 4 horas bajo anestesia general.' },
    { n: '05', title: 'Postoperatorio acompañado', desc: 'A los 15 días: retiro de cintas y puntos. El doctor hace seguimiento personal en cada control — nunca lo delega. El 90% del resultado se ve a los 3-4 meses; el resultado final llega entre 12-18 meses.' },
  ]

  const sectionRef    = useRef<HTMLDivElement>(null)
  const containerRef  = useRef<HTMLDivElement>(null)
  const lineRef       = useRef<HTMLDivElement>(null)
  const stepRefs      = useRef<(HTMLDivElement | null)[]>([])
  const numberRefs    = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const ctx = gsap.context(() => {
      // ── Timeline line grows as user scrolls through the section ──
      if (lineRef.current && containerRef.current) {
        gsap.to(lineRef.current, {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 72%',
            end: 'bottom 55%',
            scrub: 1.4,
          },
        })
      }

      // ── Per-step animations ──
      stepRefs.current.forEach((el, i) => {
        if (!el) return
        const numEl = numberRefs.current[i]

        // Entrance: slide from above + fade
        gsap.fromTo(el,
          { y: -36, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.55, ease: 'power2.out',
            scrollTrigger: { trigger: el, start: 'top 82%', toggleActions: 'play none none none' },
          }
        )

        // Number bounce: scale 0.6 → 1 with overshoot
        if (numEl) {
          gsap.fromTo(numEl,
            { scale: 0.6 },
            {
              scale: 1, duration: 0.5, ease: 'back.out(1.7)',
              scrollTrigger: { trigger: el, start: 'top 82%', toggleActions: 'play none none none' },
            }
          )
        }

        // Active step highlight while in viewport
        ScrollTrigger.create({
          trigger: el,
          start: 'top 62%',
          end: 'bottom 48%',
          onEnter:      () => el.classList.add('step-active'),
          onLeave:      () => el.classList.remove('step-active'),
          onEnterBack:  () => el.classList.add('step-active'),
          onLeaveBack:  () => el.classList.remove('step-active'),
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} style={{ background: '#FAF7F2', padding: '6rem 1.5rem' }}>
      <div style={{ maxWidth: '52rem', margin: '0 auto' }}>
        <p style={{ fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#94a3b8', marginBottom: '1rem' }}>
          El proceso
        </p>
        <h2 className="section-reveal-header" style={{ color: '#1A1A1A', fontWeight: 700, fontSize: 'clamp(2rem, 4vw, 3rem)', letterSpacing: '-0.03em', lineHeight: 1.05, marginBottom: '3.5rem' }}>
          Tu camino, paso a paso
        </h2>

        {/* Steps container with timeline line */}
        <div ref={containerRef} style={{ display: 'flex', flexDirection: 'column', gap: '2rem', position: 'relative' }}>
          {/* Animated vertical line */}
          <div ref={lineRef} className="timeline-line" />

          {steps.map((step, i) => (
            <div
              key={step.n}
              ref={el => { stepRefs.current[i] = el }}
              className="process-step"
              style={{ display: 'grid', gridTemplateColumns: '3rem 1fr', gap: '1.25rem', alignItems: 'start' }}
            >
              <div
                ref={el => { numberRefs.current[i] = el }}
                className="step-number-circle"
                style={{ width: '3rem', height: '3rem', borderRadius: '50%', background: '#2D4A3E', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: '0.8rem', flexShrink: 0 }}
              >
                {step.n}
              </div>
              <div>
                <h3 style={{ color: '#1A1A1A', fontWeight: 600, fontSize: '1.05rem', marginBottom: '0.4rem', fontFamily: 'var(--font-sans)' }}>{step.title}</h3>
                <p style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: 1.7 }}>{step.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid rgba(0,0,0,0.08)' }}>
          <a
            href="#agendar"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: '#C9A84C', color: '#fff', borderRadius: '100px', padding: '0.75rem 1.75rem', fontSize: '0.9rem', fontWeight: 600, textDecoration: 'none' }}
          >
            Solicita tu evaluación gratuita →
          </a>
        </div>
      </div>
    </section>
  )
}


// ─── Home Page ────────────────────────────────────────────────────────────────
function HomePage() {
  // Lenis smooth scroll + GSAP ScrollTrigger sync
  useEffect(() => {
    let lenis: any
    import('lenis').then((m: any) => {
      const Lenis = m.default ?? m
      lenis = new Lenis({
        duration: 1.6,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        wheelMultiplier: 0.85,
        touchMultiplier: 1.8,
      })
      lenis.on('scroll', ScrollTrigger.update)
      const raf = (time: number) => { lenis.raf(time); requestAnimationFrame(raf) }
      requestAnimationFrame(raf)
    }).catch(() => {})
    return () => { lenis?.destroy() }
  }, [])

  // Global 3D scroll reveals — section headers
  useLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = gsap.context(() => {
      setTimeout(() => {
        document.querySelectorAll('.section-reveal-header').forEach((el) => {
          gsap.fromTo(el,
            { rotateY: 5, opacity: 0, y: 18 },
            {
              rotateY: 0, opacity: 1, y: 0,
              duration: 0.65, ease: 'power2.out',
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
      <main style={{ perspective: '1200px' }}>
        <StickyNarrativeSection />
        <div style={{ position: 'relative', zIndex: 2 }}>
          <ProceduresSlider />
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
      <StickyMobileCTA />
    </div>
  )
}

// ─── App (Router) ─────────────────────────────────────────────────────────────
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/rinoplastia" element={<RinoplastiaPage />} />
      <Route path="/procedimientos" element={<ProcedimientosPage />} />
    </Routes>
  )
}
