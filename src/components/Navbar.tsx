import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'motion/react'
import { Menu, X, Calendar, MessageCircle } from 'lucide-react'

import { CONTACT } from '../lib/contact'
import { COPY } from '../lib/copy'

export type CtaVariant = 'evaluacion' | 'whatsapp'

interface NavbarProps {
  /** 'evaluacion' (default, comportamiento del inicio) | 'whatsapp' (FAQ) */
  ctaVariant?: CtaVariant
  /**
   * ids de las secciones OSCURAS de la página actual, para la animación de fase.
   * Si se omite → comportamiento del inicio (detección por #inicio/#diferenciadores/#agendar).
   * Pasa una referencia estable (constante a nivel de módulo) para no re-suscribir el scroll.
   */
  darkSectionIds?: string[]
}

const WHATSAPP_CTA_TEXT = 'Pregúntanos por WhatsApp'

export function Navbar({ ctaVariant = 'evaluacion', darkSectionIds }: NavbarProps) {
  const [open, setOpen]         = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [darkSection, setDarkSection] = useState(true) // true = dark bg underneath

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 60)
      const mid = y + 40 // sample point slightly below header

      // Detección genérica: oscuro si el punto de muestreo cae dentro de
      // alguna de las secciones marcadas como oscuras para esta página.
      if (darkSectionIds) {
        const isDark = darkSectionIds.some(id => {
          const el = document.getElementById(id)
          if (!el) return false
          const top = (el as HTMLElement).offsetTop
          const bottom = top + (el as HTMLElement).offsetHeight
          return mid >= top && mid < bottom
        })
        setDarkSection(isDark)
        return
      }

      // Default (inicio) — idéntico al comportamiento original.
      // Dark sections: hero (0–200vh), booking (#1A1A1A bg), footer
      // Light sections: differentiators (#fff), testimonials (#f5f5f0), steps, etc.
      const hero = document.getElementById('inicio') ?? document.querySelector('.narrative-section')
      const heroBottom = hero ? (hero as HTMLElement).offsetTop + (hero as HTMLElement).offsetHeight : window.innerHeight * 2
      const diferenciadores = document.getElementById('diferenciadores')
      const difTop = diferenciadores ? (diferenciadores as HTMLElement).offsetTop : heroBottom
      const agendar = document.getElementById('agendar')
      const agendarTop = agendar ? (agendar as HTMLElement).offsetTop : Infinity

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
  }, [darkSectionIds])

  const links = [
    { label: 'SOBRE EL DOCTOR', href: '/sobre-el-dr-agudelo', isPage: true },
    { label: 'RINOPLASTIA',    href: '/rinoplastia',    isPage: true },
    { label: 'PROCEDIMIENTOS', href: '/procedimientos', isPage: true },
    { label: 'TESTIMONIOS',    href: '/testimonios',    isPage: true },
    { label: 'PREGUNTAS FRECUENTES', href: '/preguntas-frecuentes', isPage: true },
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

  /* ─── CTA derecho — única diferencia entre inicio y FAQ ────────── */
  const isWhatsapp = ctaVariant === 'whatsapp'
  const ctaHref = isWhatsapp ? CONTACT.whatsapp : '#agendar'
  const ctaText = isWhatsapp ? WHATSAPP_CTA_TEXT : COPY.ctaSecondary
  const ctaExternalProps = isWhatsapp
    ? { target: '_blank' as const, rel: 'noopener noreferrer' }
    : {}

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
              href={ctaHref}
              {...ctaExternalProps}
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
              {isWhatsapp ? <MessageCircle className="w-3.5 h-3.5" /> : <Calendar className="w-3.5 h-3.5" />}
              {ctaText}
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
              aria-expanded={open}
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
                  { label: 'Sobre el doctor', href: '/sobre-el-dr-agudelo', isPage: true },
                  { label: 'Rinoplastia', href: '/rinoplastia', isPage: true },
                  { label: 'Procedimientos', href: '/procedimientos', isPage: true },
                  { label: 'Testimonios', href: '/testimonios', isPage: true },
                  { label: 'Preguntas frecuentes', href: '/preguntas-frecuentes', isPage: true },
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
              <a
                href={ctaHref}
                {...ctaExternalProps}
                onClick={() => setOpen(false)}
                className="mt-8 flex items-center justify-center gap-2 text-sm"
                style={{ background: '#2d5016', color: '#fff', fontWeight: 600, borderRadius: '100px', padding: '1rem', textDecoration: 'none' }}
              >
                {isWhatsapp ? <MessageCircle className="w-4 h-4" /> : <Calendar className="w-4 h-4" />} {ctaText}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
