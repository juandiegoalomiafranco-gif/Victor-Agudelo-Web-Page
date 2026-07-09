import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'motion/react'
import { Menu, X, Calendar, MessageCircle } from 'lucide-react'

import { CONTACT } from '../lib/contact'
import { COPY } from '../lib/copy'
import { getLenis } from '../lib/lenisInstance'

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

// Fuente única de los links de navegación (desktop los muestra en mayúsculas,
// el overlay móvil tal cual). Todos son rutas de página.
const NAV_LINKS = [
  { label: 'Sobre el doctor', href: '/sobre-el-dr-agudelo' },
  { label: 'Rinoplastia', href: '/rinoplastia' },
  { label: 'Procedimientos', href: '/procedimientos' },
  { label: 'Testimonios', href: '/testimonios' },
  { label: 'Preguntas frecuentes', href: '/preguntas-frecuentes' },
] as const

export function Navbar({ ctaVariant = 'evaluacion', darkSectionIds }: NavbarProps) {
  const [open, setOpen]         = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [darkSection, setDarkSection] = useState(true) // true = dark bg underneath

  // Cache de posiciones de las secciones consultadas por el cálculo de fase.
  // Se calcula una vez al montar (y se recalcula en resize/load) para que el
  // listener de scroll no tenga que tocar el DOM en cada evento.
  type SectionCache =
    | { mode: 'ids'; ranges: ({ top: number; bottom: number } | null)[] }
    | { mode: 'default'; difTop: number; agendarTop: number }

  useEffect(() => {
    let cache: SectionCache | null = null
    let ticking = false

    const computeCache = () => {
      if (darkSectionIds) {
        cache = {
          mode: 'ids',
          ranges: darkSectionIds.map(id => {
            const el = document.getElementById(id)
            if (!el) return null
            const top = (el as HTMLElement).offsetTop
            const bottom = top + (el as HTMLElement).offsetHeight
            return { top, bottom }
          }),
        }
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
      cache = { mode: 'default', difTop, agendarTop }
    }

    const update = () => {
      const y = window.scrollY
      setScrolled(y > 60)
      const mid = y + 40 // sample point slightly below header

      if (!cache) computeCache()

      // Detección genérica: oscuro si el punto de muestreo cae dentro de
      // alguna de las secciones marcadas como oscuras para esta página.
      if (darkSectionIds) {
        const c = cache as Extract<SectionCache, { mode: 'ids' }>
        const isDark = darkSectionIds.some((_, i) => {
          const r = c.ranges[i]
          if (!r) return false
          return mid >= r.top && mid < r.bottom
        })
        setDarkSection(isDark)
        return
      }

      const { difTop, agendarTop } = cache as Extract<SectionCache, { mode: 'default' }>

      if (mid < difTop) {
        setDarkSection(true)
      } else if (mid >= agendarTop) {
        setDarkSection(true)
      } else {
        setDarkSection(false)
      }
    }

    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        update()
        ticking = false
      })
    }

    // Contenido que carga tarde (imágenes, etc.) puede desplazar las
    // secciones — recalculamos el cache en resize y en load.
    const onResize = () => { computeCache() }
    const onLoad = () => { computeCache() }

    computeCache()
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize, { passive: true })
    window.addEventListener('load', onLoad)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('load', onLoad)
    }
  }, [darkSectionIds])

  // Scroll-lock del menú móvil (iOS-compatible): fija el body en su posición
  // actual mientras el overlay está abierto y restaura el scroll al cerrar.
  useEffect(() => {
    if (!open) return
    const scrollY = window.scrollY
    const { style } = document.body
    style.position = 'fixed'
    style.top = `-${scrollY}px`
    style.left = '0'
    style.right = '0'
    style.width = '100%'
    return () => {
      style.position = ''
      style.top = ''
      style.left = ''
      style.right = ''
      style.width = ''
      window.scrollTo(0, scrollY)
    }
  }, [open])

  // Escape cierra el menú móvil.
  useEffect(() => {
    if (!open) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open])

  // Mueve el foco al primer link del menú al abrir (accesibilidad).
  const firstMobileLinkRef = useRef<HTMLAnchorElement>(null)
  useEffect(() => {
    if (!open) return
    const raf = requestAnimationFrame(() => {
      firstMobileLinkRef.current?.focus()
    })
    return () => cancelAnimationFrame(raf)
  }, [open])

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
            <Link
              to="/"
              aria-label="Ir al inicio"
              onClick={() => {
                // En el home el logo conserva su comportamiento original: subir al hero.
                if (window.location.pathname === '/') {
                  const lenis = getLenis()
                  if (lenis) lenis.scrollTo(0)
                  else window.scrollTo({ top: 0, behavior: 'smooth' })
                }
              }}
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
            </Link>

            {/* ── Desktop links ── */}
            <ul className="hidden lg:flex items-center nav-links-desktop">
              {NAV_LINKS.map(l => (
                <li key={l.href}>
                  <Link
                    to={l.href}
                    style={{
                      textDecoration: 'none',
                      fontSize: '0.78rem',
                      fontWeight: 500,
                      letterSpacing: '0.09em',
                      color: linkColor,
                      transition: 'color 0.25s ease',
                    }}
                    onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = linkHoverColor }}
                    onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = linkColor }}
                  >
                    {l.label.toUpperCase()}
                  </Link>
                </li>
              ))}
            </ul>

            {/* ── CTA button ── */}
            <a
              href={ctaHref}
              {...ctaExternalProps}
              className="hidden lg:flex items-center gap-2"
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
              className="flex lg:hidden items-center justify-center p-2"
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: hamburgerColor,
                transition: 'color 0.4s ease',
                minWidth: '44px',
                minHeight: '44px',
              }}
              aria-label="Menú"
              aria-expanded={open}
              aria-controls="mobile-menu"
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
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 flex flex-col"
            style={{ background: 'var(--color-1)' }}
          >
            <div className="flex-1 flex flex-col px-8 pt-28 pb-12 overflow-y-auto">
              <nav className="flex flex-col gap-6 mb-auto">
                {NAV_LINKS.map((l, i) => (
                  <Link key={l.href} to={l.href} onClick={() => setOpen(false)}
                    ref={i === 0 ? firstMobileLinkRef : undefined}
                    style={{ color: 'var(--color-4)', fontWeight: 700, fontSize: '1.75rem', letterSpacing: '-0.02em', textDecoration: 'none' }}
                  >{l.label}</Link>
                ))}
                <a href="/#agendar" onClick={() => setOpen(false)}
                  style={{ color: 'var(--color-4)', fontWeight: 700, fontSize: '1.75rem', letterSpacing: '-0.02em', textDecoration: 'none' }}
                >Contacto</a>
              </nav>
              <a
                href={ctaHref}
                {...ctaExternalProps}
                onClick={() => setOpen(false)}
                className="mt-8 flex items-center justify-center gap-2 text-sm"
                style={{ background: '#2D4A3E', color: '#fff', fontWeight: 600, borderRadius: '100px', padding: '1rem', textDecoration: 'none' }}
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
