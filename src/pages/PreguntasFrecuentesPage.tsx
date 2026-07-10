import { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Calendar, ChevronRight, MessageCircle, Minus, Plus } from 'lucide-react'
import { Navbar } from '../components/Navbar'
import { HashLink } from '../components/HashLink'
import { CONTACT } from '../lib/contact'
import { COPY } from '../lib/copy'
import { FAQ_CATEGORIES } from '../lib/faqs'

// Altura aproximada de la píldora flotante (Navbar fixed): header 0.75rem*2 + pastilla ≈ 76px.
const NAVBAR_OFFSET = 76
// Margen superior de scroll de las secciones para que su título despeje el Navbar fijo.
const SECTION_SCROLL_MARGIN = NAVBAR_OFFSET + 24
// Secciones de fondo oscuro de esta página (para la animación de fase del Navbar).
// Referencia estable a nivel de módulo → no re-suscribe el listener de scroll.
const FAQ_DARK_SECTIONS = ['faq-hero', 'faq-cta-final']

// Renderiza los marcadores **negrita** como <strong>.
function renderAnswer(text: string) {
  return text.split('**').map((seg, i) =>
    i % 2 === 1
      ? <strong key={i} style={{ color: '#1A1A1A', fontWeight: 700 }}>{seg}</strong>
      : <Fragment key={i}>{seg}</Fragment>,
  )
}

export function PreguntasFrecuentesPage() {
  const [reduceMotion, setReduceMotion] = useState(false)
  const [openBySection, setOpenBySection] = useState<Record<string, number | null>>({})

  const toggle = (catId: string, i: number) =>
    setOpenBySection(prev => ({ ...prev, [catId]: prev[catId] === i ? null : i }))

  // prefers-reduced-motion
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduceMotion(mq.matches)
    const handler = (e: MediaQueryListEvent) => setReduceMotion(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  return (
    <div style={{ minHeight: '100vh', background: '#fff', fontFamily: 'var(--font-sans, DM Sans, sans-serif)' }}>
      {/* Mismo Navbar del inicio (fixed), con CTA de WhatsApp y fases adaptadas a esta página */}
      <Navbar ctaVariant="whatsapp" darkSectionIds={FAQ_DARK_SECTIONS} />

      {/* Hero — el padding superior despeja la píldora flotante (Navbar fixed) */}
      <section id="faq-hero" style={{
        background: '#1A1A1A',
        position: 'relative',
        overflow: 'hidden',
        padding: 'clamp(6rem, 11vw, 8.5rem) 1.25rem clamp(2.75rem, 6vw, 4.5rem)',
      }}>
        <div aria-hidden="true" style={{
          position: 'absolute', top: '-28%', right: '-12%',
          width: '60%', maxWidth: '720px', aspectRatio: '1',
          background: 'radial-gradient(circle, rgba(201,168,76,0.22) 0%, rgba(201,168,76,0) 65%)',
          pointerEvents: 'none',
        }} />
        <div style={{ maxWidth: '74rem', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          {/* Breadcrumb */}
          <nav aria-label="Migas de pan" style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap',
            justifyContent: 'center',
            fontSize: '0.72rem', fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.55)', marginBottom: '1.5rem',
          }}>
            <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>Inicio</Link>
            <ChevronRight aria-hidden="true" style={{ width: '12px', height: '12px', opacity: 0.6 }} />
            <span style={{ color: '#C9A84C' }}>Preguntas frecuentes</span>
          </nav>

          <p style={{ fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#C9A84C', marginBottom: '1.25rem' }}>
            Resolvemos tus dudas
          </p>
          <h1 style={{
            fontFamily: 'var(--font-serif, Cormorant Garamond, Georgia, serif)',
            fontSize: 'clamp(2.8rem, 7vw, 5.5rem)',
            fontWeight: 500, lineHeight: 1.05, letterSpacing: '-0.01em',
            color: '#fff', maxWidth: 'min(94vw, 1150px)', margin: '0 auto 1.25rem',
          }}>
            <span style={{ display: 'block' }}>Preguntas frecuentes sobre</span>
            <em style={{ display: 'block', fontStyle: 'italic', color: '#C9A84C', fontWeight: 400 }}>rinoplastia y cirugía facial</em>
          </h1>
          <p style={{
            color: 'rgba(255,255,255,0.7)',
            fontSize: 'clamp(0.95rem, 1.5vw, 1.05rem)',
            lineHeight: 1.7, maxWidth: '600px', margin: '0 auto 2rem',
          }}>
            Las preguntas que más nos hacen los pacientes — respondidas en detalle, sin promesas vacías y con la honestidad clínica del Dr. Víctor Agudelo. Si tu duda no está aquí, escríbenos directamente: respondemos personalmente.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', justifyContent: 'center' }}>
            <HashLink
              to="/#agendar"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.55rem',
                background: '#C9A84C', color: '#1A1A1A', borderRadius: '100px',
                padding: '0.9rem 1.75rem', fontSize: '0.9rem', fontWeight: 700,
                letterSpacing: '0.02em', textDecoration: 'none',
              }}
            >
              <Calendar style={{ width: '16px', height: '16px' }} aria-hidden="true" />
              {COPY.ctaPrimary}
            </HashLink>
            <a
              href={CONTACT.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.55rem',
                background: 'transparent', color: '#fff',
                border: '1px solid rgba(255,255,255,0.25)', borderRadius: '100px',
                padding: '0.9rem 1.75rem', fontSize: '0.9rem', fontWeight: 500,
                letterSpacing: '0.01em', textDecoration: 'none',
              }}
            >
              <MessageCircle style={{ width: '16px', height: '16px' }} aria-hidden="true" />
              Escribir por WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Secciones por categoría */}
      <main style={{ background: '#fff' }}>
        {FAQ_CATEGORIES.map((cat, ci) => (
          <Fragment key={cat.id}>
            <section
              id={cat.id}
              aria-labelledby={`${cat.id}-title`}
              style={{
                scrollMarginTop: SECTION_SCROLL_MARGIN,
                background: ci % 2 === 1 ? '#FAF7F2' : '#fff',
                padding: 'clamp(2.5rem, 6vw, 4.5rem) 1.25rem',
                borderTop: ci === 0 ? 'none' : '1px solid rgba(0,0,0,0.06)',
              }}
            >
              <div style={{ maxWidth: '48rem', margin: '0 auto' }}>
                <header style={{ marginBottom: 'clamp(1.5rem, 3vw, 2.25rem)' }}>
                  <p style={{ fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#C9A84C', marginBottom: '0.6rem' }}>
                    {String(ci + 1).padStart(2, '0')}
                  </p>
                  <h2
                    id={`${cat.id}-title`}
                    style={{
                      fontFamily: 'var(--font-serif, Cormorant Garamond, Georgia, serif)',
                      fontSize: 'clamp(1.7rem, 3.4vw, 2.5rem)',
                      fontWeight: 500, lineHeight: 1.15, letterSpacing: '-0.01em',
                      color: '#1A1A1A', marginBottom: '0.5rem',
                    }}
                  >
                    {cat.titulo}
                  </h2>
                  <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: 1.6 }}>
                    {cat.subtitulo}
                  </p>
                </header>

                <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                  {cat.preguntas.map((faq, i) => {
                    const isOpen = openBySection[cat.id] === i
                    const panelId = `${cat.id}-panel-${i}`
                    const btnId = `${cat.id}-btn-${i}`
                    return (
                      <li key={i} style={{ borderBottom: '1px solid rgba(0,0,0,0.1)' }}>
                        <button
                          id={btnId}
                          type="button"
                          onClick={() => toggle(cat.id, i)}
                          aria-expanded={isOpen}
                          aria-controls={panelId}
                          style={{
                            width: '100%', textAlign: 'left',
                            background: 'transparent', border: 'none', cursor: 'pointer',
                            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                            gap: '1rem', padding: '1.15rem 0',
                            fontFamily: 'inherit',
                          }}
                        >
                          <span style={{
                            fontSize: 'clamp(1rem, 1.4vw, 1.1rem)', fontWeight: 700,
                            color: '#1A1A1A', lineHeight: 1.4, letterSpacing: '-0.005em',
                          }}>
                            {faq.q}
                          </span>
                          <span
                            aria-hidden="true"
                            style={{
                              flexShrink: 0,
                              width: '32px', height: '32px', borderRadius: '999px',
                              border: '1px solid rgba(0,0,0,0.14)',
                              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                              color: isOpen ? '#fff' : '#2D4A3E',
                              background: isOpen ? '#2D4A3E' : 'transparent',
                              borderColor: isOpen ? '#2D4A3E' : 'rgba(0,0,0,0.14)',
                              transition: 'background 0.25s ease, color 0.25s ease, border-color 0.25s ease',
                            }}
                          >
                            {isOpen
                              ? <Minus style={{ width: '16px', height: '16px' }} />
                              : <Plus style={{ width: '16px', height: '16px' }} />}
                          </span>
                        </button>
                        <div
                          id={panelId}
                          role="region"
                          aria-labelledby={btnId}
                          style={{
                            display: 'grid',
                            gridTemplateRows: isOpen ? '1fr' : '0fr',
                            transition: reduceMotion ? 'none' : 'grid-template-rows 0.26s ease-out',
                          }}
                        >
                          <div style={{ overflow: 'hidden' }}>
                            <p style={{
                              color: '#475569', fontSize: '0.97rem', lineHeight: 1.75,
                              margin: 0, padding: '0 0 1.25rem',
                              maxWidth: '42rem',
                            }}>
                              {renderAnswer(faq.a)}
                            </p>
                          </div>
                        </div>
                      </li>
                    )
                  })}
                </ul>
              </div>
            </section>

            {/* Banner CTA intermedio — después de "La cirugía" */}
            {cat.id === 'la-cirugia' && (
              <section style={{ background: '#fff', padding: '0 1.25rem clamp(2.5rem, 6vw, 4.5rem)' }}>
                <div style={{
                  maxWidth: '48rem', margin: '0 auto',
                  background: '#FAF7F2', border: '1px solid rgba(201,168,76,0.45)',
                  borderRadius: '20px',
                  padding: 'clamp(1.75rem, 4vw, 2.5rem)',
                  display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between',
                  gap: '1.25rem',
                }}>
                  <div style={{ maxWidth: '32rem' }}>
                    <h3 style={{
                      fontFamily: 'var(--font-serif, Cormorant Garamond, Georgia, serif)',
                      fontSize: 'clamp(1.4rem, 2.4vw, 1.85rem)', fontWeight: 500,
                      color: '#1A1A1A', lineHeight: 1.2, marginBottom: '0.5rem',
                    }}>
                      ¿Tu duda no está en esta lista?
                    </h3>
                    <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: 1.6 }}>
                      Escríbenos por WhatsApp y el equipo del Dr. Agudelo te responde personalmente, sin compromiso.
                    </p>
                  </div>
                  <a
                    href={CONTACT.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: '0.55rem',
                      background: '#2D4A3E', color: '#fff', borderRadius: '100px',
                      padding: '0.85rem 1.6rem', fontSize: '0.9rem', fontWeight: 600,
                      textDecoration: 'none', whiteSpace: 'nowrap',
                    }}
                  >
                    <MessageCircle style={{ width: '16px', height: '16px' }} aria-hidden="true" />
                    Escribir por WhatsApp
                  </a>
                </div>
              </section>
            )}
          </Fragment>
        ))}
      </main>

      {/* CTA final */}
      <section id="faq-cta-final" style={{
        background: '#1A1A1A',
        position: 'relative',
        overflow: 'hidden',
        padding: 'clamp(3rem, 8vw, 5rem) 1.25rem',
        textAlign: 'center',
      }}>
        <div aria-hidden="true" style={{
          position: 'absolute', bottom: '-35%', left: '50%',
          transform: 'translateX(-50%)',
          width: '90%', maxWidth: '900px', aspectRatio: '1',
          background: 'radial-gradient(circle, rgba(201,168,76,0.22) 0%, rgba(201,168,76,0) 60%)',
          pointerEvents: 'none',
        }} />
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '40rem', margin: '0 auto' }}>
          <p style={{ fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C9A84C', marginBottom: '1.1rem' }}>
            Sigue siendo simple
          </p>
          <h2 style={{
            fontFamily: 'var(--font-serif, Cormorant Garamond, Georgia, serif)',
            fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 500,
            color: '#fff', letterSpacing: '-0.01em', lineHeight: 1.1,
            marginBottom: '1rem',
          }}>
            Lo más rápido es <em style={{ fontStyle: 'italic', color: '#C9A84C', fontWeight: 400 }}>preguntarnos directamente</em>
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.95rem', lineHeight: 1.75, maxWidth: '34rem', margin: '0 auto 2rem' }}>
            Envía tus fotos (frente y perfil, sin flash) y recibe una evaluación inicial gratuita en menos de 48 horas. Sin compromiso, con toda la información que necesitas para decidir con tranquilidad.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', justifyContent: 'center' }}>
            <HashLink
              to="/#agendar"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.55rem',
                background: '#C9A84C', color: '#1A1A1A', borderRadius: '100px',
                padding: '0.9rem 1.75rem', fontSize: '0.9rem', fontWeight: 700,
                letterSpacing: '0.02em', textDecoration: 'none',
              }}
            >
              <Calendar style={{ width: '16px', height: '16px' }} aria-hidden="true" />
              {COPY.ctaPrimary}
            </HashLink>
            <a
              href={CONTACT.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.55rem',
                background: 'transparent', color: '#fff',
                border: '1px solid rgba(255,255,255,0.25)', borderRadius: '100px',
                padding: '0.9rem 1.75rem', fontSize: '0.9rem', fontWeight: 500,
                letterSpacing: '0.01em', textDecoration: 'none',
              }}
            >
              <MessageCircle style={{ width: '16px', height: '16px' }} aria-hidden="true" />
              Escribir por WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

export default PreguntasFrecuentesPage
