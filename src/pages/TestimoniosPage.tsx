import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Calendar,
  ChevronRight,
  Heart,
  Instagram,
  MessageCircle,
  Play,
  Quote,
  ShieldCheck,
  Sparkles,
  Star,
  X,
} from 'lucide-react'
import { PageHeader } from '../components/PageHeader'
import { CONTACT } from '../lib/contact'
import { COPY } from '../lib/copy'
import { TESTIMONIALS, GOOGLE_RATING, GOOGLE_REVIEW_URL, formatReviewDate } from '../lib/testimonials'
import { GoogleG } from '../components/GoogleG'
import type { Testimonial } from '../types/index'

// ───────────────────────────────────────────────
// Types
// ───────────────────────────────────────────────

interface VideoTestimonial {
  id: string
  name: string
  procedure: string
  city?: string
  poster: string       // URL de imagen poster
  embedUrl: string     // YouTube /embed/{ID} o Instagram /reel/{CODE}/embed
  quote: string        // frase corta del paciente
}

interface WrittenReview {
  id: string
  author: string
  procedure: string
  text: string
  source: 'RealSelf' | 'Google' | 'Instagram' | 'WhatsApp'
  rating?: 1 | 2 | 3 | 4 | 5
  date?: string
}

// ───────────────────────────────────────────────
// Data
// ───────────────────────────────────────────────

// Videos de pacientes reales: agregar aquí cuando exista el material
// (name, procedure, poster, embedUrl, quote). La grilla y el modal se
// reactivan solos cuando el array tenga elementos.
const videoTestimonials: VideoTestimonial[] = []

// Mapea la fuente interna del testimonio a la etiqueta visible de la reseña.
const SOURCE_LABEL: Record<NonNullable<Testimonial['verifiedSource']>, WrittenReview['source']> = {
  google: 'Google',
  realself: 'RealSelf',
  instagram: 'Instagram',
}

// Reseñas escritas reales (misma fuente que el carrusel del home), respetando
// su origen real (Google / RealSelf), calificación y fecha cuando existen.
const writtenReviews: WrittenReview[] = TESTIMONIALS.map(t => ({
  id: t.id,
  author: t.name,
  procedure: t.procedure,
  text: t.text,
  source: SOURCE_LABEL[t.verifiedSource ?? 'realself'],
  rating: t.rating,
  date: formatReviewDate(t.date),
}))

const pillars = [
  {
    icon: Sparkles,
    title: 'Naturalidad sobre todo',
    desc: 'Los resultados no son "de molde". Cada nariz se diseña para el rostro del paciente — buscando armonía con el resto de sus rasgos.',
  },
  {
    icon: Heart,
    title: 'Presencia personal total',
    desc: 'El doctor está presente desde la primera consulta hasta el último control. No delega. Cada paciente recibe el seguimiento directo del cirujano.',
  },
  {
    icon: ShieldCheck,
    title: 'Honestidad clínica',
    desc: 'Nunca promete resultados imposibles. Expectativas reales mostradas con simulación y casos similares antes de cualquier decisión.',
  },
] as const

// ───────────────────────────────────────────────
// Auxiliary components
// ───────────────────────────────────────────────

function FiveStars({ rating = 5 }: { rating?: 1 | 2 | 3 | 4 | 5 }) {
  return (
    <div style={{ display: 'inline-flex', gap: '2px' }} aria-label={`${rating} de 5 estrellas`}>
      {[1, 2, 3, 4, 5].map(n => (
        <Star
          key={n}
          aria-hidden="true"
          style={{
            width: '14px',
            height: '14px',
            color: n <= rating ? '#C9A84C' : 'rgba(0,0,0,0.12)',
            fill: n <= rating ? '#C9A84C' : 'transparent',
          }}
        />
      ))}
    </div>
  )
}

function SourceBadge({ source }: { source: WrittenReview['source'] }) {
  return (
    <span style={{
      background: 'rgba(45,74,62,0.07)',
      color: '#2D4A3E',
      borderRadius: '100px',
      padding: '0.2rem 0.65rem',
      fontSize: '0.7rem',
      fontWeight: 600,
      letterSpacing: '0.04em',
    }}>
      {source}
    </span>
  )
}

function VideoModal({ video, onClose }: { video: VideoTestimonial; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [onClose])

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Video testimonio de ${video.name}`}
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 100,
        background: 'rgba(15,17,16,0.88)', backdropFilter: 'blur(12px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '1rem',
      }}
    >
      <button
        type="button"
        aria-label="Cerrar video"
        onClick={onClose}
        style={{
          position: 'absolute', top: '1rem', right: '1rem',
          width: '40px', height: '40px', borderRadius: '999px',
          background: 'rgba(255,255,255,0.12)', color: '#fff',
          border: 'none', cursor: 'pointer',
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        }}
      >
        <X style={{ width: '20px', height: '20px' }} aria-hidden="true" />
      </button>
      <div
        onClick={e => e.stopPropagation()}
        style={{
          width: '100%', maxWidth: '960px',
          aspectRatio: '16 / 9',
          background: '#000', borderRadius: '12px', overflow: 'hidden',
          boxShadow: '0 30px 80px -20px rgba(0,0,0,0.6)',
        }}
      >
        <iframe
          src={video.embedUrl}
          title={`Testimonio: ${video.name}`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{ width: '100%', height: '100%', border: 0 }}
        />
      </div>
    </div>
  )
}

// ───────────────────────────────────────────────
// Page
// ───────────────────────────────────────────────

export function TestimoniosPage() {
  const [activeVideo, setActiveVideo] = useState<VideoTestimonial | null>(null)
  const [hoveredPillar, setHoveredPillar] = useState<number | null>(null)

  return (
    <div style={{ minHeight: '100vh', background: '#fff', fontFamily: 'var(--font-sans, DM Sans, sans-serif)' }}>
      <PageHeader
        background="rgba(250,247,242,0.94)"
        cta={{ href: '/#agendar', label: 'Pedir cita', variant: 'gold' }}
      />

      {/* Hero */}
      <section style={{
        background: '#1A1A1A',
        position: 'relative',
        overflow: 'hidden',
        padding: 'clamp(3rem, 8vw, 5.5rem) 1.25rem clamp(2.75rem, 6vw, 4.5rem)',
      }}>
        <div aria-hidden="true" style={{
          position: 'absolute', top: '-28%', right: '-12%',
          width: '60%', maxWidth: '720px', aspectRatio: '1',
          background: 'radial-gradient(circle, rgba(201,168,76,0.22) 0%, rgba(201,168,76,0) 65%)',
          pointerEvents: 'none',
        }} />
        <div style={{ maxWidth: '64rem', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          {/* Breadcrumb */}
          <nav aria-label="Migas de pan" style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap',
            justifyContent: 'center',
            fontSize: '0.72rem', fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.55)', marginBottom: '1.5rem',
          }}>
            <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>Inicio</Link>
            <ChevronRight aria-hidden="true" style={{ width: '12px', height: '12px', opacity: 0.6 }} />
            <span>Sobre el doctor</span>
            <ChevronRight aria-hidden="true" style={{ width: '12px', height: '12px', opacity: 0.6 }} />
            <span style={{ color: '#C9A84C' }}>Testimonios</span>
          </nav>

          <p style={{ fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#C9A84C', marginBottom: '1.25rem' }}>
            Historias reales · Resultados reales
          </p>
          <h1 style={{
            fontFamily: 'var(--font-serif, Cormorant Garamond, Georgia, serif)',
            fontSize: 'clamp(2.4rem, 5vw, 4.2rem)',
            fontWeight: 500, lineHeight: 1.05, letterSpacing: '-0.01em',
            color: '#fff', maxWidth: '720px', margin: '0 auto 1.25rem',
          }}>
            Lo que dicen quienes <em style={{ fontStyle: 'italic', color: '#C9A84C', fontWeight: 400 }}>ya pasaron por esto</em>
          </h1>
          <p style={{
            color: 'rgba(255,255,255,0.7)',
            fontSize: 'clamp(0.95rem, 1.5vw, 1.05rem)',
            lineHeight: 1.7, maxWidth: '560px', margin: '0 auto',
          }}>
            Más de 200 casos documentados. Reseñas verificadas de pacientes en Google — de personas que pasaron por la misma decisión que tú estás considerando ahora.
          </p>
        </div>
      </section>

      {/* Intro */}
      <section style={{ background: '#FAF7F2', padding: 'clamp(3rem, 7vw, 5rem) 1.25rem', borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
        <div style={{ maxWidth: '48rem', margin: '0 auto', textAlign: 'center' }}>
          <div
            aria-hidden="true"
            style={{
              width: '64px', height: '64px', borderRadius: '999px',
              background: '#2D4A3E', color: '#fff',
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'var(--font-serif, Cormorant Garamond, Georgia, serif)',
              fontSize: '1.5rem', fontWeight: 600, letterSpacing: '0.02em',
              marginBottom: '1.5rem',
            }}
          >
            VA
          </div>
          <p style={{ fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#525252', marginBottom: '1rem' }}>
            Pacientes del Dr. Víctor Agudelo
          </p>
          <h2 style={{
            fontFamily: 'var(--font-serif, Cormorant Garamond, Georgia, serif)',
            fontSize: 'clamp(1.9rem, 3.6vw, 2.8rem)',
            fontWeight: 500, lineHeight: 1.15, letterSpacing: '-0.01em',
            color: '#1A1A1A', marginBottom: '1.25rem',
          }}>
            Cada testimonio es una decisión que tomó tiempo, <em style={{ fontStyle: 'italic', color: '#2D4A3E', fontWeight: 500 }}>y un resultado que cambió algo.</em>
          </h2>
          <p style={{ color: '#475569', fontSize: '1rem', lineHeight: 1.75, maxWidth: '40rem', margin: '0 auto' }}>
            La mayoría de pacientes consultó con uno o dos cirujanos antes de elegir. Lo que vas a escuchar a continuación no es marketing: son personas reales contando, con sus palabras, cómo fue el proceso — desde la primera consulta hasta el resultado final.
          </p>
        </div>
      </section>

      {/* Video grid — se muestra solo cuando haya videos reales */}
      <section style={{ background: '#fff', padding: 'clamp(3rem, 7vw, 5rem) 1.25rem' }}>
        <div style={{ maxWidth: '78rem', margin: '0 auto' }}>
          {videoTestimonials.length > 0 && (
          <ul style={{
            listStyle: 'none', margin: 0, padding: 0,
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 'clamp(1rem, 1.6vw, 1.5rem)',
          }}>
            {videoTestimonials.map(v => (
              <li key={v.id}>
                <button
                  type="button"
                  onClick={() => setActiveVideo(v)}
                  aria-label={`Reproducir testimonio de ${v.name} — ${v.procedure}`}
                  style={{
                    position: 'relative',
                    display: 'block', width: '100%',
                    aspectRatio: '4 / 5',
                    borderRadius: '20px', overflow: 'hidden',
                    border: 'none', padding: 0, cursor: 'pointer',
                    background: '#0a0a0a',
                    textAlign: 'left',
                  }}
                >
                  <img
                    src={v.poster}
                    alt=""
                    loading="lazy"
                    style={{
                      position: 'absolute', inset: 0,
                      width: '100%', height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.6s cubic-bezier(0.22,1,0.36,1)',
                    }}
                  />
                  {/* Bottom gradient */}
                  <div aria-hidden="true" style={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(180deg, rgba(0,0,0,0) 35%, rgba(0,0,0,0.78) 100%)',
                  }} />
                  {/* Play button */}
                  <span
                    aria-hidden="true"
                    style={{
                      position: 'absolute', top: '50%', left: '50%',
                      transform: 'translate(-50%, -50%)',
                      width: '64px', height: '64px',
                      borderRadius: '999px',
                      background: '#C9A84C', color: '#1A1A1A',
                      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                      boxShadow: '0 14px 40px -10px rgba(0,0,0,0.45)',
                    }}
                  >
                    <Play style={{ width: '22px', height: '22px', marginLeft: '3px' }} fill="currentColor" aria-hidden="true" />
                  </span>
                  {/* Bottom chip + quote */}
                  <div style={{
                    position: 'absolute', left: 0, right: 0, bottom: 0,
                    padding: '1rem 1.1rem 1.15rem',
                    display: 'flex', flexDirection: 'column', gap: '0.55rem',
                    color: '#fff',
                  }}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', alignItems: 'center' }}>
                      <span style={{
                        background: 'rgba(255,255,255,0.16)',
                        backdropFilter: 'blur(8px)',
                        borderRadius: '100px',
                        padding: '0.22rem 0.65rem',
                        fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.04em',
                      }}>
                        {v.procedure}
                      </span>
                      {v.city && (
                        <span style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.7)', fontWeight: 500 }}>
                          · {v.city}
                        </span>
                      )}
                    </div>
                    <p style={{
                      fontFamily: 'var(--font-serif, Cormorant Garamond, Georgia, serif)',
                      fontStyle: 'italic',
                      fontSize: 'clamp(1rem, 1.2vw, 1.15rem)',
                      lineHeight: 1.3, letterSpacing: '-0.005em',
                      margin: 0,
                    }}>
                      "{v.quote}"
                    </p>
                  </div>
                </button>
              </li>
            ))}
          </ul>
          )}

          {/* Instagram link */}
          <div style={{ textAlign: 'center', marginTop: videoTestimonials.length > 0 ? 'clamp(2rem, 4vw, 3rem)' : 0 }}>
            <a
              href={CONTACT.instagram}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.55rem',
                // flexWrap + maxWidth: en 320px el pill envuelve a dos líneas
                // en vez de desbordar; en pantallas normales cabe en una.
                flexWrap: 'wrap', justifyContent: 'center', maxWidth: '100%',
                color: '#1A1A1A', textDecoration: 'none',
                fontSize: '0.875rem', fontWeight: 500,
                padding: '0.7rem 1.25rem',
                borderRadius: '100px',
                border: '1px solid rgba(0,0,0,0.12)',
                transition: 'background 0.25s ease, border-color 0.25s ease',
              }}
            >
              <Instagram style={{ width: '16px', height: '16px' }} aria-hidden="true" />
              Más historias en <strong style={{ fontWeight: 700 }}>@doctorvictoragudelo</strong>
            </a>
          </div>
        </div>
      </section>

      {/* Written reviews */}
      <section style={{ background: '#fff', padding: 'clamp(3rem, 7vw, 5rem) 1.25rem', borderTop: '1px solid rgba(0,0,0,0.06)' }}>
        <div style={{ maxWidth: '52rem', margin: '0 auto' }}>
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: 'clamp(2.5rem, 5vw, 3.5rem)' }}>
            <p style={{ fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#525252', marginBottom: '1rem' }}>
              Reseñas escritas verificadas
            </p>
            <h2 style={{
              fontFamily: 'var(--font-serif, Cormorant Garamond, Georgia, serif)',
              fontSize: 'clamp(1.9rem, 3.6vw, 2.8rem)',
              fontWeight: 500, lineHeight: 1.15, letterSpacing: '-0.01em',
              color: '#1A1A1A', marginBottom: '1rem',
            }}>
              Palabras de pacientes que ya tomaron la decisión.
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.85rem' }}>
              <a
                href={GOOGLE_REVIEW_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Calificación ${GOOGLE_RATING.toFixed(1)} sobre 5 en Google — ver reseñas`}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                  textDecoration: 'none',
                  background: '#fff', border: '1px solid rgba(0,0,0,0.12)',
                  borderRadius: '100px', padding: '0.5rem 1.05rem', color: '#1A1A1A',
                }}
              >
                <Star aria-hidden="true" style={{ width: '16px', height: '16px', color: '#C9A84C', fill: '#C9A84C' }} />
                <span style={{ fontWeight: 700, fontSize: '0.95rem' }}>{GOOGLE_RATING.toFixed(1)}</span>
                <span style={{ fontSize: '0.85rem', color: '#475569', fontWeight: 500 }}>en Google</span>
              </a>
              <span style={{ fontSize: '0.85rem', color: '#475569', fontWeight: 500 }}>
                Reseñas verificadas en Google
              </span>
            </div>
          </div>

          {/* Reviews list */}
          <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
            {writtenReviews.map(r => (
              <li
                key={r.id}
                style={{
                  position: 'relative',
                  padding: 'clamp(1.5rem, 3vw, 2.25rem) 0',
                  borderBottom: '1px solid rgba(0,0,0,0.08)',
                }}
              >
                {/* Decorative quote */}
                <Quote
                  aria-hidden="true"
                  style={{
                    position: 'absolute', top: '1.25rem', right: 0,
                    width: '32px', height: '32px',
                    color: 'rgba(201,168,76,0.18)',
                  }}
                />
                {/* Top meta row */}
                <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.65rem', marginBottom: '1rem' }}>
                  {r.rating && <FiveStars rating={r.rating} />}
                  <SourceBadge source={r.source} />
                  {r.date && (
                    <span style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 500 }}>
                      {r.date}
                    </span>
                  )}
                </div>
                {/* Text */}
                <blockquote style={{
                  margin: 0, padding: 0,
                  fontFamily: 'var(--font-serif, Cormorant Garamond, Georgia, serif)',
                  fontStyle: 'italic',
                  fontSize: 'clamp(1.15rem, 1.6vw, 1.45rem)',
                  fontWeight: 400,
                  lineHeight: 1.5, letterSpacing: '-0.005em',
                  color: '#1A1A1A',
                  marginBottom: '1.1rem',
                  paddingRight: '2rem',
                }}>
                  {r.text}
                </blockquote>
                {/* Author */}
                <footer style={{ fontSize: '0.9rem', display: 'flex', flexWrap: 'wrap', gap: '0.4rem', alignItems: 'baseline' }}>
                  <span style={{ fontWeight: 700, color: '#1A1A1A' }}>{r.author}</span>
                  <span style={{ color: '#2D4A3E', fontWeight: 500 }}>· {r.procedure}</span>
                </footer>
              </li>
            ))}
          </ul>

          {/* Invitación a dejar reseña en Google — crece el rating real */}
          <div style={{
            marginTop: 'clamp(2rem, 4vw, 3rem)',
            padding: 'clamp(1.5rem, 3vw, 2rem)',
            borderRadius: '20px',
            background: '#FAF7F2',
            border: '1px solid rgba(0,0,0,0.06)',
            textAlign: 'center',
          }}>
            <p style={{ fontSize: '1rem', color: '#1A1A1A', fontWeight: 600, marginBottom: '0.4rem' }}>
              ¿Fuiste paciente del Dr. Agudelo?
            </p>
            <p style={{ fontSize: '0.9rem', color: '#475569', lineHeight: 1.6, marginBottom: '1.25rem', maxWidth: '30rem', margin: '0 auto 1.25rem' }}>
              Tu experiencia ayuda a que otras personas tomen su decisión con más confianza. Deja tu reseña en Google.
            </p>
            <a
              href={GOOGLE_REVIEW_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                background: '#fff', color: '#3c4043',
                border: '1px solid rgba(0,0,0,0.15)',
                borderRadius: '100px', padding: '0.75rem 1.5rem',
                fontSize: '0.875rem', fontWeight: 600, textDecoration: 'none',
              }}
            >
              <GoogleG size={16} /> Deja tu reseña en Google
            </a>
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section style={{ background: '#FAF7F2', padding: 'clamp(3rem, 7vw, 5rem) 1.25rem' }}>
        <div style={{ maxWidth: '72rem', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 'clamp(2rem, 4vw, 3rem)' }}>
            <p style={{ fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#525252', marginBottom: '1rem' }}>
              Por qué eligen al Dr. Agudelo
            </p>
            <h2 style={{
              fontFamily: 'var(--font-serif, Cormorant Garamond, Georgia, serif)',
              fontSize: 'clamp(1.9rem, 3.6vw, 2.8rem)',
              fontWeight: 500, lineHeight: 1.15, letterSpacing: '-0.01em',
              color: '#1A1A1A',
              maxWidth: '32rem', margin: '0 auto',
            }}>
              Tres razones que se repiten en cada testimonio.
            </h2>
          </div>
          <ul style={{
            listStyle: 'none', margin: 0, padding: 0,
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: 'clamp(1rem, 1.6vw, 1.5rem)',
          }}>
            {pillars.map((p, i) => {
              const Icon = p.icon
              const isHover = hoveredPillar === i
              return (
                <li
                  key={p.title}
                  className="tap-feedback"
                  onMouseEnter={() => setHoveredPillar(i)}
                  onMouseLeave={() => setHoveredPillar(null)}
                  style={{
                    background: '#fff',
                    borderRadius: '20px',
                    padding: 'clamp(1.5rem, 2.5vw, 2rem)',
                    border: '1px solid rgba(0,0,0,0.06)',
                    transition: 'transform 0.35s cubic-bezier(0.22,1,0.36,1), box-shadow 0.35s ease',
                    transform: isHover ? 'translateY(-4px)' : 'translateY(0)',
                    boxShadow: isHover
                      ? '0 24px 60px -25px rgba(0,0,0,0.18)'
                      : '0 4px 14px -8px rgba(0,0,0,0.08)',
                  }}
                >
                  <span
                    aria-hidden="true"
                    style={{
                      width: '44px', height: '44px', borderRadius: '10px',
                      background: '#2D4A3E', color: '#fff',
                      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                      marginBottom: '1.1rem',
                    }}
                  >
                    <Icon style={{ width: '22px', height: '22px' }} />
                  </span>
                  <h3 style={{
                    fontFamily: 'var(--font-serif, Cormorant Garamond, Georgia, serif)',
                    fontSize: 'clamp(1.3rem, 1.8vw, 1.55rem)',
                    fontWeight: 500, lineHeight: 1.2, letterSpacing: '-0.01em',
                    color: '#1A1A1A', marginBottom: '0.75rem',
                  }}>
                    {p.title}
                  </h3>
                  <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: 1.7 }}>
                    {p.desc}
                  </p>
                </li>
              )
            })}
          </ul>
        </div>
      </section>

      {/* CTA final */}
      <section style={{
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
            Tu turno
          </p>
          <h2 style={{
            fontFamily: 'var(--font-serif, Cormorant Garamond, Georgia, serif)',
            fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 500,
            color: '#fff', letterSpacing: '-0.01em', lineHeight: 1.1,
            marginBottom: '1rem',
          }}>
            ¿Y si el próximo testimonio <em style={{ fontStyle: 'italic', color: '#C9A84C', fontWeight: 400 }}>fuera el tuyo?</em>
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.95rem', lineHeight: 1.75, marginBottom: '2rem', maxWidth: '32rem', margin: '0 auto 2rem' }}>
            Envía tus fotos (frente y perfil, sin flash) y recibe una evaluación inicial gratuita. Sin compromiso, con toda la información.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', justifyContent: 'center' }}>
            <a
              href="/#agendar"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.55rem',
                background: '#C9A84C', color: '#1A1A1A',
                borderRadius: '100px',
                padding: '0.9rem 1.75rem',
                fontSize: '0.9rem', fontWeight: 700,
                letterSpacing: '0.02em',
                textDecoration: 'none',
              }}
            >
              <Calendar style={{ width: '16px', height: '16px' }} aria-hidden="true" />
              {COPY.ctaPrimary}
            </a>
            <a
              href="https://wa.me/573023234594?text=Hola%20Dr.%20Agudelo%2C%20quisiera%20una%20evaluaci%C3%B3n%20inicial."
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.55rem',
                background: 'transparent', color: '#fff',
                border: '1px solid rgba(255,255,255,0.25)',
                borderRadius: '100px',
                padding: '0.9rem 1.75rem',
                fontSize: '0.9rem', fontWeight: 500,
                letterSpacing: '0.01em',
                textDecoration: 'none',
              }}
            >
              <MessageCircle style={{ width: '16px', height: '16px' }} aria-hidden="true" />
              Escribir por WhatsApp
            </a>
          </div>
        </div>
      </section>

      {activeVideo && (
        <VideoModal video={activeVideo} onClose={() => setActiveVideo(null)} />
      )}
    </div>
  )
}

export default TestimoniosPage
