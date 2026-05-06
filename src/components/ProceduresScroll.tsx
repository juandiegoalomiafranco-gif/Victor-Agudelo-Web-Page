import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

interface Procedure {
  title: string
  subtitle: string
  description: string
  image: string
  href: string
}

const PROCEDURES: Procedure[] = [
  {
    title: 'Rinoplastia Estética',
    subtitle: 'Cirugía nasal primaria',
    description:
      'Modificamos forma, tamaño y proporciones para que el resultado armonice con tu rostro. Utilizamos técnica estructural con ultrasonido piezoeléctrico para mayor precisión.',
    image: '/photos/dr-agudelo-2.jpg',
    href: '/rinoplastia',
  },
  {
    title: 'Rinoplastia Afrolatina',
    subtitle: 'Técnica especializada',
    description:
      'Técnica diseñada para narices con características afrolatinas, preservando la identidad étnica del paciente y logrando resultados completamente naturales.',
    image: '/photos/dr-agudelo-1.jpg',
    href: '/rinoplastia',
  },
  {
    title: 'Rinoplastia Secundaria',
    subtitle: 'Corrección de cirugías previas',
    description:
      'Para pacientes que tuvieron una cirugía previa y no quedaron satisfechos. Corrección de deformidades, asimetrías o problemas funcionales de alta complejidad.',
    image: 'https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?w=1200&q=80',
    href: '/rinoplastia',
  },
  {
    title: 'Mentoplastia',
    subtitle: 'Estética del mentón',
    description:
      'Modificación del mentón para mejorar el perfil facial. Frecuentemente combinada con rinoplastia para lograr un equilibrio facial total.',
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=1200&q=80',
    href: '/procedimientos',
  },
  {
    title: 'Otoplastia',
    subtitle: 'Modelado de orejas',
    description:
      'Corrección de la forma o posición de las orejas. Procedimiento con alta satisfacción entre pacientes y resultados definitivos.',
    image: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=1200&q=80',
    href: '/procedimientos',
  },
  {
    title: 'Blefaroplastia',
    subtitle: 'Rejuvenecimiento de la mirada',
    description:
      'Cirugía de párpados superiores e inferiores para rejuvenecer la mirada, eliminar bolsas y exceso de piel con un aspecto fresco.',
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=1200&q=80',
    href: '/procedimientos',
  },
  {
    title: 'Reducción de Papada',
    subtitle: 'Tecnología láser',
    description:
      'Contorno facial con tecnología láser de última generación. Sin cirugía invasiva, mínima recuperación y resultados visibles.',
    image: 'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=1200&q=80',
    href: '/procedimientos',
  },
  {
    title: 'No Quirúrgicos',
    subtitle: 'Toxina Botulínica · Ácido Hialurónico',
    description:
      'Tratamientos de rejuvenecimiento sin cirugía para complementar o mantener los resultados de procedimientos más complejos.',
    image: '/photos/dr-agudelo-4.jpg',
    href: '/procedimientos',
  },
]

export function ProceduresScroll() {
  const sectionRef = useRef<HTMLElement>(null)
  const rightColRef = useRef<HTMLDivElement>(null)
  const [activeIdx, setActiveIdx] = useState(0)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)')
    setIsMobile(mq.matches)
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  useEffect(() => {
    if (isMobile) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = cardRefs.current.indexOf(entry.target as HTMLDivElement)
            if (idx !== -1) setActiveIdx(idx)
          }
        })
      },
      {
        root: null,
        rootMargin: '-40% 0px -40% 0px',
        threshold: 0,
      }
    )

    cardRefs.current.forEach((el) => {
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [isMobile])

  /* ─── MOBILE: vertical stack ─── */
  if (isMobile) {
    return (
      <section
        id="procedimientos"
        style={{ background: 'var(--color-2)', padding: '4rem 0 0 0' }}
      >
        <div style={{ padding: '0 1.5rem', marginBottom: '3rem', textAlign: 'left' }}>
          <h2
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2.5rem, 8vw, 3.2rem)',
              fontWeight: 500,
              color: '#1A1A1A',
              letterSpacing: '-0.03em',
              lineHeight: 1.05,
              marginBottom: '1.25rem',
            }}
          >
            Cuidado facial<br />integral
          </h2>
          <p style={{ fontSize: '1rem', color: '#475569', lineHeight: 1.6, marginBottom: '2rem', fontWeight: 500 }}>
            Impulsado por los principios de la cirugía plástica facial avanzada.
          </p>
          <div style={{ display: 'flex', flexWrap: 'nowrap', gap: '0.5rem' }}>
            <a
              href="#procedimientos"
              style={{
                flex: 1,
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'transparent',
                border: '1px solid #1A1A1A',
                color: '#1A1A1A',
                borderRadius: '100px',
                padding: '0.75rem 0.5rem',
                fontSize: '0.68rem',
                fontWeight: 600,
                textDecoration: 'none',
                letterSpacing: '0.04em',
                whiteSpace: 'nowrap',
                textAlign: 'center',
              }}
            >
              VER PROCEDIMIENTOS
            </a>
            <a
              href="#agendar"
              style={{
                flex: 1,
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.3rem',
                background: '#2D4A3E',
                color: '#fff',
                borderRadius: '100px',
                padding: '0.75rem 0.5rem',
                fontSize: '0.68rem',
                fontWeight: 600,
                textDecoration: 'none',
                letterSpacing: '0.04em',
                whiteSpace: 'nowrap',
                textAlign: 'center',
              }}
            >
              EVALUACIÓN GRATUITA
            </a>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
          {PROCEDURES.map((proc, i) => (
            <ProcedureCard key={i} proc={proc} isActive={true} isMobile={true} />
          ))}
        </div>
      </section>
    )
  }

  /* ─── DESKTOP: sticky left + scrolling right ─── */
  return (
    <section
      id="procedimientos"
      ref={sectionRef}
      style={{
        background: 'var(--color-2)',
        position: 'relative',
      }}
    >
      <div
        style={{
          width: '100%',
          display: 'grid',
          gridTemplateColumns: '50% 50%',
          alignItems: 'start',
          position: 'relative',
        }}
      >
        {/* ── LEFT: sticky panel ── */}
        <div
          style={{
            position: 'sticky',
            top: 0,
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center', // Centers block horizontally, pushing it to the right relative to the left bound
            padding: '2rem',
          }}
        >
          <div style={{ width: '100%', maxWidth: '28rem', display: 'flex', flexDirection: 'column' }}>
            <h2
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(3rem, 4vw, 4.2rem)',
                fontWeight: 500,
                color: '#1A1A1A',
                letterSpacing: '-0.03em',
                lineHeight: 1.05,
                margin: '0 0 1.25rem 0',
              }}
            >
              Cuidado facial<br />integral
            </h2>

            <p
              style={{
                fontSize: '1rem',
                color: '#475569',
                fontWeight: 500,
                lineHeight: 1.6,
                margin: '0 0 2.5rem 0',
              }}
            >
              Impulsado por los principios de la cirugía plástica<br/>facial avanzada.
            </p>

            <div style={{ display: 'flex', flexWrap: 'nowrap', gap: '0.75rem', alignItems: 'center' }}>
              <a
                href="#procedimientos"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'transparent',
                  border: '1px solid #1A1A1A',
                  color: '#1A1A1A',
                  borderRadius: '100px',
                  padding: '0.875rem 1.25rem',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  textDecoration: 'none',
                  letterSpacing: '0.06em',
                  whiteSpace: 'nowrap',
                  transition: 'background 0.3s ease, color 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement
                  el.style.background = '#1A1A1A'
                  el.style.color = '#fff'
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement
                  el.style.background = 'transparent'
                  el.style.color = '#1A1A1A'
                }}
              >
                VER PROCEDIMIENTOS
              </a>
              <a
                href="#agendar"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.4rem',
                  background: '#2D4A3E',
                  color: '#fff',
                  borderRadius: '100px',
                  padding: '0.875rem 1.25rem',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  textDecoration: 'none',
                  letterSpacing: '0.06em',
                  whiteSpace: 'nowrap',
                  transition: 'background 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.background = '#1F3329'
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.background = '#2D4A3E'
                }}
              >
                EVALUACIÓN GRATUITA
              </a>
            </div>
          </div>
        </div>

        {/* ── RIGHT: scrolling cards ── */}
        <div
          ref={rightColRef}
          style={{
            display: 'flex',
            flexDirection: 'column',
            padding: '0',
            gap: '0', // No gap between cards, edge to edge
          }}
        >
          {PROCEDURES.map((proc, i) => (
            <div
              key={i}
              ref={(el) => { cardRefs.current[i] = el }}
            >
              <ProcedureCard proc={proc} isActive={i === activeIdx} isMobile={false} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── Procedure Card (Both Desktop and Mobile use same full-bleed style) ── */
function ProcedureCard({ proc, isActive, isMobile }: { proc: Procedure; isActive: boolean; isMobile: boolean }) {
  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '80vh',
        overflow: 'hidden',
        background: '#1A1A1A',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      {/* Background Image */}
      <img
        src={proc.image}
        alt={proc.title}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center',
          opacity: isActive ? 1 : 0.6,
          transform: isActive ? 'scale(1.05)' : 'scale(1)',
          transition: 'transform 0.8s cubic-bezier(0.22,1,0.36,1), opacity 0.5s ease',
          pointerEvents: 'none',
        }}
        loading="lazy"
        onError={(e) => {
          const img = e.target as HTMLImageElement
          img.style.display = 'none'
        }}
      />
      
      {/* Dark overlay for readability */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.65) 100%)',
          pointerEvents: 'none',
        }}
      />

      {/* Content over image */}
      <div 
        style={{ 
          position: 'relative', 
          zIndex: 10, 
          padding: isMobile ? '3rem 1.5rem' : 'clamp(3rem, 6vw, 6rem)',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          justifyContent: isMobile ? 'flex-end' : 'flex-start',
        }}
      >
        <div style={{ marginTop: isMobile ? 'auto' : '0' }}>
          <h3
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2rem, 3.5vw, 3rem)',
              fontWeight: 400,
              color: '#ffffff',
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
              marginBottom: '1rem',
            }}
          >
            {proc.title}
          </h3>
          <p
            style={{
              fontSize: '1rem',
              color: 'rgba(255,255,255,0.85)',
              lineHeight: 1.7,
              marginBottom: '2rem',
              maxWidth: '32rem',
            }}
          >
            {proc.description}
          </p>

          <Link
            to={proc.href}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              color: '#fff',
              fontSize: '0.8rem',
              fontWeight: 600,
              textDecoration: 'none',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}
          >
            VER PROCEDIMIENTO
          </Link>
        </div>
      </div>
    </div>
  )
}
