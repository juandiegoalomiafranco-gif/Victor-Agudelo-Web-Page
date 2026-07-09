import { useLayoutEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'

// Pills de procedimientos (abajo, ancho completo). Cada uno enlaza a su página.
const PROCEDURE_PILLS = [
  { label: 'Rinoplastia Estética', href: '/rinoplastia' },
  { label: 'Rinoplastia Afrolatina', href: '/rinoplastia' },
  { label: 'Rinoplastia Secundaria', href: '/rinoplastia' },
  { label: 'Mentoplastia', href: '/procedimientos' },
  { label: 'Otoplastia', href: '/procedimientos' },
  { label: 'Blefaroplastia', href: '/procedimientos' },
] as const

export const SurgeryTypesSection = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)

  // Zoom de la imagen ligado al scroll (marco fijo, solo la imagen escala).
  useLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const section = sectionRef.current
    const img = imgRef.current
    if (!section || !img) return

    const mm = gsap.matchMedia()
    mm.add('(min-width: 992px)', () => {
      const tween = gsap.fromTo(
        img,
        { scale: 1 },
        {
          scale: 1.15,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        }
      )
      return () => {
        tween.scrollTrigger?.kill()
        tween.kill()
      }
    })
    mm.add('(max-width: 991px)', () => {
      gsap.set(img, { clearProps: 'transform' })
    })

    return () => mm.revert()
  }, [])

  return (
    <section
      id="procedimientos-intro"
      ref={sectionRef}
      style={{
        background: 'linear-gradient(180deg, #EFE8DC 0%, #F4EFE6 100%)',
        borderTop: '1px solid rgba(0,0,0,0.06)',
        padding: 'clamp(3.5rem, 8vw, 7rem) clamp(1.25rem, 4vw, 4rem)',
      }}
    >
      <div style={{ maxWidth: '82rem', margin: '0 auto' }}>
        {/* ── Fila superior: texto (44%) + imagen (56%) ── */}
        <div className="proc-intro__row">
          {/* Izquierda: bloque centrado verticalmente a la altura de la imagen */}
          <div className="proc-intro__text">
            <p
              style={{
                fontSize: '0.72rem',
                fontWeight: 600,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: '#94a3b8',
                margin: '0 0 1.5rem 0',
              }}
            >
              Procedimientos
            </p>

            <h2
              className="section-reveal-header"
              style={{
                color: '#1A1A1A',
                fontSize: 'clamp(2.5rem, 4.5vw, 3.75rem)',
                letterSpacing: '-0.02em',
                lineHeight: 1.12,
                margin: '0 0 1.75rem 0',
              }}
            >
              <span className="proc-intro__title-line" style={{ fontFamily: 'var(--font-sans)', fontWeight: 400, display: 'block' }}>
                Cada rostro pide
              </span>
              <span className="proc-intro__title-line" style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, display: 'block' }}>
                una cirugía diferente
              </span>
            </h2>

            <p
              style={{
                color: '#475569',
                fontSize: '1.0625rem',
                lineHeight: 1.75,
                margin: 0,
                maxWidth: '34rem',
              }}
            >
              El rostro es un conjunto en equilibrio: la nariz, el mentón, los
              párpados y el perfil dialogan entre sí, y un resultado natural nace
              de respetar esa armonía. Por eso el Dr. Agudelo no aplica la misma
              técnica a todos —estudia tu anatomía, tu respiración y tus
              proporciones para definir qué procedimiento, o combinación de
              procedimientos, te corresponde. Elegir bien la cirugía es el primer
              paso para lograr un resultado que se vea —y funcione— como debe ser.
            </p>
          </div>

          {/* Derecha: marco rectangular fijo + imagen con zoom (placeholder por ahora) */}
          <div className="proc-intro__frame" aria-hidden="true">
            <img
              ref={imgRef}
              className="proc-intro__img"
              src="/photos/dr-agudelo-placeholder.jpg"
              alt=""
              loading="lazy"
              decoding="async"
              onError={(e) => {
                // Placeholder verde mientras llega la foto real del Dr. Agudelo
                const el = e.currentTarget
                el.style.display = 'none'
                const frame = el.parentElement
                if (frame && !frame.querySelector('.proc-intro__ph')) {
                  const ph = document.createElement('span')
                  ph.className = 'proc-intro__ph'
                  ph.textContent = 'Dr. Víctor Agudelo'
                  frame.appendChild(ph)
                }
              }}
            />
          </div>
        </div>

        {/* ── Pills de procedimientos (ancho completo) ── */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.75rem',
            justifyContent: 'center',
            marginTop: 'clamp(2.5rem, 5vw, 4rem)',
          }}
        >
          {PROCEDURE_PILLS.map((pill) => (
            <Link key={pill.label} to={pill.href} className="proc-intro__pill">
              {pill.label}
            </Link>
          ))}
          <Link to="/procedimientos" className="proc-intro__pill proc-intro__pill--ghost">
            Ver todos los procedimientos
          </Link>
        </div>
      </div>
    </section>
  )
}
