import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'

import { COPY } from '../../lib/copy'
import { DOCTOR_HERO_URL } from '../../lib/assets'

export const StickyNarrativeSection = () => {
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
