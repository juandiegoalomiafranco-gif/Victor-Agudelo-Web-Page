import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight } from 'lucide-react'

import { TESTIMONIALS } from '../../lib/testimonials'

export const TestimonialsSection = () => {
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
          <button aria-label="Testimonio anterior" onClick={() => setIdx(i => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#242424', display: 'flex', padding: '8px', minWidth: '44px', minHeight: '44px', alignItems: 'center', justifyContent: 'center' }}>
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="flex-1 flex items-center gap-4">
            {TESTIMONIALS.map((_, i) => (
              <button key={i} aria-label={`Ir al testimonio ${i + 1}`} onClick={() => setIdx(i)} className="relative flex-1 overflow-hidden"
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
          <button aria-label="Testimonio siguiente" onClick={() => setIdx(i => (i + 1) % TESTIMONIALS.length)}
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
