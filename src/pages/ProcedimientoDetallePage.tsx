import type React from 'react'
import { Link, useParams } from 'react-router-dom'
import { Calendar, CheckCircle, ChevronRight, MessageSquare, Phone, Image as ImageIcon, AlertCircle } from 'lucide-react'
import { PageHeader } from '../components/PageHeader'
import { HashLink } from '../components/HashLink'
import { CONTACT } from '../lib/contact'
import { COPY } from '../lib/copy'
import { PROCEDIMIENTOS, getProcedimientoBySlug } from '../lib/procedimientos'
import type { Procedimiento } from '../lib/procedimientos'

// ─── Tokens visuales (replicados de RinoplastiaPage) ────────────────────────
const BG_LIGHT = '#F7F5F0'
const BG_DARK = '#1A1A1A'
const ACCENT = '#2D4A3E'
const ACCENT_SOFT = '#A8C5B4'
const TEXT_BODY = '#475569'
const TEXT_DARK = '#1A1A1A'
const SERIF = "var(--font-serif, 'Cormorant Garamond', Georgia, serif)"

// ────────────────────────────────────────────────────────────────────────────
// 404 elegante: slug inexistente
// ────────────────────────────────────────────────────────────────────────────
function NotFound() {
  return (
    <div style={{ minHeight: '100vh', background: '#fff', display: 'flex', flexDirection: 'column' }}>
      <PageHeader backTo="/rinoplastia" backLabel="Volver a Rinoplastia" cta={{ href: '/#agendar', label: COPY.ctaSecondary }} />

      <main style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '4rem 1.5rem', textAlign: 'center' }}>
        <div style={{ maxWidth: '32rem' }}>
          <p style={eyebrowStyle('#94a3b8')}>Procedimiento no encontrado</p>
          <h1 style={{ fontFamily: SERIF, fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 600, color: TEXT_DARK, letterSpacing: '-0.025em', lineHeight: 1.1, marginBottom: '1rem' }}>
            Esta página no existe
          </h1>
          <p style={{ color: TEXT_BODY, fontSize: '1rem', lineHeight: 1.7, marginBottom: '2rem' }}>
            Es posible que el enlace haya cambiado. Puedes ver todos los tipos de rinoplastia disponibles.
          </p>
          <Link to="/rinoplastia" style={ctaSolid}>
            <ChevronRight style={{ width: 16, height: 16 }} /> Ver tipos de rinoplastia
          </Link>
        </div>
      </main>
    </div>
  )
}

// ────────────────────────────────────────────────────────────────────────────
// Página principal
// ────────────────────────────────────────────────────────────────────────────
export function ProcedimientoDetallePage() {
  const { slug } = useParams<{ slug: string }>()
  const proc = getProcedimientoBySlug(slug)

  if (!proc) return <NotFound />

  const otros = PROCEDIMIENTOS.filter(p => p.slug !== proc.slug)

  return (
    <div style={{ minHeight: '100vh', background: '#fff', fontFamily: 'var(--font-sans, DM Sans, sans-serif)' }}>
      <PageHeader backTo="/rinoplastia" backLabel="Rinoplastia" cta={{ href: '/#agendar', label: COPY.ctaSecondary }} />

      {/* HERO */}
      <Hero proc={proc} />

      {/* ¿Qué es? */}
      <Section bg="#fff">
        <SectionHeader eyebrow="Qué es" titulo={`Sobre la ${proc.nombre.toLowerCase()}`} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '46rem' }}>
          {proc.intro.map((p, i) => (
            <p key={i} style={paragraphStyle}>{p}</p>
          ))}
        </div>
      </Section>

      {/* Candidato ideal */}
      <Section bg={BG_LIGHT}>
        <SectionHeader eyebrow="Candidato ideal" titulo="¿Es para ti este procedimiento?" />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))', gap: '1.5rem' }}>
          <CandidatoCard
            tono="positivo"
            titulo="Para quién sí"
            items={proc.candidatoIdeal.paraQuienSi}
          />
          <CandidatoCard
            tono="negativo"
            titulo="Para quién no"
            items={proc.candidatoIdeal.paraQuienNo}
          />
        </div>
      </Section>

      {/* La técnica */}
      <Section bg="#fff">
        <SectionHeader eyebrow="La técnica" titulo={`Cómo lo hace el Dr. Agudelo`} />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))', gap: '2.5rem', alignItems: 'start' }}>
          <p style={{ ...paragraphStyle, maxWidth: 'none' }}>{proc.tecnica.descripcion}</p>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
            {proc.tecnica.puntosClave.map((b, i) => (
              <li key={i} style={bulletStyle}>
                <CheckCircle style={{ width: 16, height: 16, color: ACCENT, flexShrink: 0, marginTop: 3 }} />
                {b}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* Galería de resultados — ESPACIO LISTO PARA FOTOS DEL DR. AGUDELO */}
      <Galeria proc={proc} />

      {/* Recuperación día a día */}
      <Recuperacion steps={proc.recuperacion} />

      {/* Riesgos y consideraciones */}
      <Section bg="#fff">
        <SectionHeader eyebrow="Honestidad clínica" titulo="Riesgos y consideraciones" />
        <p style={{ ...paragraphStyle, marginBottom: '1.5rem' }}>
          Toda cirugía tiene riesgos. Te los explicamos con claridad antes de que tomes cualquier decisión —
          esa es la base de una buena relación médico-paciente.
        </p>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {proc.riesgos.map((r, i) => (
            <li key={i} style={{ ...bulletStyle, alignItems: 'flex-start' }}>
              <AlertCircle style={{ width: 16, height: 16, color: '#94a3b8', flexShrink: 0, marginTop: 3 }} />
              <span style={{ color: TEXT_BODY }}>{r}</span>
            </li>
          ))}
        </ul>
      </Section>

      {/* FAQ */}
      <Section bg={BG_LIGHT}>
        <SectionHeader eyebrow="Preguntas frecuentes" titulo="Lo que más preguntan" />
        <div style={{ maxWidth: '52rem' }}>
          {proc.faqs.map((item, i) => (
            <details key={i} style={faqDetails}>
              <summary style={faqSummary}>
                {item.q}
                <span style={{ fontSize: '1.25rem', color: '#94a3b8', flexShrink: 0, marginLeft: '1rem' }}>+</span>
              </summary>
              <p style={faqAnswer}>{item.a}</p>
            </details>
          ))}
        </div>
      </Section>

      {/* Otros procedimientos */}
      <Section bg="#fff">
        <SectionHeader eyebrow="También te puede interesar" titulo="Otros procedimientos" />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(240px, 100%), 1fr))', gap: '1rem' }}>
          {otros.map(p => (
            <Link
              key={p.slug}
              to={p.path}
              className="tap-feedback"
              style={otroProcCard}
              onMouseEnter={e => { e.currentTarget.style.borderColor = ACCENT; e.currentTarget.style.transform = 'translateY(-2px)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(0,0,0,0.08)'; e.currentTarget.style.transform = 'translateY(0)' }}
            >
              <span style={{ fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', color: ACCENT }}>
                {p.eyebrow}
              </span>
              <h3 style={{ fontFamily: SERIF, fontSize: '1.4rem', fontWeight: 600, color: TEXT_DARK, letterSpacing: '-0.02em', lineHeight: 1.15, margin: '0.5rem 0 0.75rem' }}>
                {p.nombre}
              </h3>
              <p style={{ color: TEXT_BODY, fontSize: '0.875rem', lineHeight: 1.6, margin: 0 }}>
                {p.tagline}
              </p>
              <span style={{ marginTop: '1.25rem', display: 'inline-flex', alignItems: 'center', gap: '0.375rem', color: ACCENT, fontSize: '0.85rem', fontWeight: 600 }}>
                Conocer más <ChevronRight style={{ width: 14, height: 14 }} />
              </span>
            </Link>
          ))}
        </div>
      </Section>

      {/* CTA final */}
      <CTAFinal />
    </div>
  )
}

// ────────────────────────────────────────────────────────────────────────────
// Sub-componentes
// ────────────────────────────────────────────────────────────────────────────
function Hero({ proc }: { proc: Procedimiento }) {
  return (
    <section style={{ background: BG_DARK, padding: 'clamp(3rem, 8vw, 5rem) 1.25rem clamp(2.5rem, 6vw, 4rem)', textAlign: 'center' }}>
      <p style={eyebrowStyle('#94a3b8')}>{proc.eyebrow}</p>

      <h1 style={{
        fontFamily: SERIF,
        fontSize: 'clamp(2.4rem, 5vw, 4rem)',
        fontWeight: 600, lineHeight: 1.05, letterSpacing: '-0.025em',
        color: '#fff', maxWidth: '720px', margin: '0 auto 1.25rem',
      }}>
        {proc.nombre}
      </h1>

      <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 'clamp(0.95rem, 1.5vw, 1.05rem)', lineHeight: 1.7, maxWidth: '560px', margin: '0 auto 1.75rem' }}>
        {proc.tagline}
      </p>

      {/* Breadcrumb visible */}
      <nav aria-label="breadcrumb" style={{ marginBottom: '1.5rem' }}>
        <ol style={{ display: 'inline-flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.4rem', listStyle: 'none', padding: 0, margin: 0, color: 'rgba(255,255,255,0.55)', fontSize: '0.78rem' }}>
          <li><Link to="/" style={breadcrumbLink}>Inicio</Link></li>
          <li aria-hidden="true">›</li>
          <li><Link to="/rinoplastia" style={breadcrumbLink}>Rinoplastia</Link></li>
          <li aria-hidden="true">›</li>
          <li aria-current="page" style={{ color: '#fff' }}>{proc.nombre}</li>
        </ol>
      </nav>

      {/* Dato rápido + CTA */}
      <div style={{ display: 'inline-flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: '0.75rem' }}>
        <span style={{
          background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.14)',
          color: '#fff', borderRadius: '100px', padding: '0.5rem 0.95rem',
          fontSize: '0.78rem', fontWeight: 500,
        }}>
          Duración aproximada: {proc.duracion}
        </span>
        <HashLink to="/#agendar" style={ctaSolid}>
          <Calendar style={{ width: 16, height: 16 }} /> Agenda tu valoración
        </HashLink>
      </div>
    </section>
  )
}

function Galeria({ proc }: { proc: Procedimiento }) {
  return (
    <section style={{ background: BG_LIGHT, padding: 'clamp(3rem, 8vw, 5rem) 1.25rem', borderTop: '1px solid rgba(0,0,0,0.06)' }}>
      <div style={{ maxWidth: '68rem', margin: '0 auto' }}>
        <p style={eyebrowStyle('#94a3b8')}>Resultados reales</p>
        <h2 style={titleStyle}>Casos del Dr. Agudelo</h2>
        <p style={{ ...paragraphStyle, marginBottom: '2.5rem' }}>
          Estos son espacios listos para mostrar casos reales. El doctor publica fotos
          comparativas siempre con el consentimiento expreso de cada paciente.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(240px, 100%), 1fr))', gap: '1.25rem' }}>
          {proc.galeria.map((caso, i) => {
            // TODO: reemplazar por fotos reales del Dr. Agudelo.
            //       Subir archivos a public/images/procedimientos/<slug>/caso-N.jpg
            const src = `/images/procedimientos/${proc.slug}/caso-${i + 1}.jpg`
            return (
              <figure key={i} style={{ margin: 0 }}>
                <div style={galleryItem}>
                  {/* Placeholder estético — visible siempre que la imagen no cargue */}
                  <div style={galleryPlaceholder}>
                    <ImageIcon style={{ width: 22, height: 22, color: ACCENT, opacity: 0.7 }} />
                    <span style={{ fontSize: '0.72rem', color: '#94a3b8', textAlign: 'center', padding: '0 0.75rem', letterSpacing: '0.02em' }}>
                      Foto del procedimiento<br />— Dr. Agudelo —
                    </span>
                  </div>
                  {/* Imagen real (sobre el placeholder). Si falla la carga, se oculta y queda el placeholder. */}
                  <img
                    src={src}
                    alt={caso.alt}
                    loading="lazy"
                    onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none' }}
                    style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 1 }}
                  />
                </div>
                <figcaption style={{ marginTop: '0.5rem', fontSize: '0.78rem', color: '#94a3b8' }}>
                  Caso {i + 1} {caso.nota ? `· ${caso.nota}` : ''}
                </figcaption>
              </figure>
            )
          })}
        </div>

        <p style={{ marginTop: '2rem', fontSize: '0.78rem', color: '#94a3b8', fontStyle: 'italic', maxWidth: '40rem' }}>
          Imágenes de pacientes reales publicadas con su consentimiento. Los resultados pueden variar según cada caso.
        </p>
      </div>
    </section>
  )
}

function Recuperacion({ steps }: { steps: Procedimiento['recuperacion'] }) {
  return (
    <section style={{ background: BG_DARK, padding: 'clamp(3rem, 8vw, 5rem) 1.25rem' }}>
      <div style={{ maxWidth: '60rem', margin: '0 auto' }}>
        <p style={eyebrowStyle('rgba(255,255,255,0.45)')}>Recuperación día a día</p>
        <h2 style={{ ...titleStyle, color: '#fff', marginBottom: '2.5rem' }}>
          Qué esperar en cada etapa
        </h2>

        <ol style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {steps.map((s, i) => (
            <li
              key={i}
              style={{
                display: 'grid',
                gridTemplateColumns: 'minmax(80px, 130px) 1fr',
                gap: '1.25rem',
                padding: '1.25rem 1.5rem',
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: '14px',
              }}
            >
              <span style={{
                color: ACCENT_SOFT, fontSize: '0.72rem', fontWeight: 700,
                letterSpacing: '0.14em', textTransform: 'uppercase', alignSelf: 'flex-start', paddingTop: '2px',
              }}>
                {s.etapa}
              </span>
              <div>
                <h3 style={{ color: '#fff', fontSize: '1rem', fontWeight: 600, margin: '0 0 0.35rem', letterSpacing: '-0.01em' }}>
                  {s.titulo}
                </h3>
                <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.88rem', lineHeight: 1.65, margin: 0 }}>
                  {s.detalle}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

function CTAFinal() {
  return (
    <section style={{ background: BG_DARK, padding: 'clamp(3rem, 8vw, 5rem) 1.25rem', textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
      <p style={eyebrowStyle('rgba(255,255,255,0.45)')}>Da el primer paso</p>
      <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 600, color: '#fff', letterSpacing: '-0.025em', lineHeight: 1.1, marginBottom: '1rem', maxWidth: '520px', marginLeft: 'auto', marginRight: 'auto' }}>
        Conoce tu caso con el Dr. Agudelo
      </h2>
      <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: '2rem', maxWidth: '40rem', marginLeft: 'auto', marginRight: 'auto' }}>
        Envía tus fotos (frente y perfil, sin flash) y recibimos tu caso.<br />
        La evaluación inicial es gratuita y sin compromiso.
      </p>
      <div style={{ display: 'inline-flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.75rem' }}>
        <HashLink to="/#agendar" style={ctaSolid}>
          <Calendar style={{ width: 16, height: 16 }} /> {COPY.ctaPrimary}
        </HashLink>
        <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer" style={ctaGhost}>
          <MessageSquare style={{ width: 16, height: 16 }} /> {COPY.ctaWhatsapp}
        </a>
        <a href={`tel:${CONTACT.phone}`} style={ctaGhost}>
          <Phone style={{ width: 16, height: 16 }} /> {CONTACT.phoneDisplay}
        </a>
      </div>
    </section>
  )
}

// ─── Componentes utilitarios pequeños ───────────────────────────────────────
function Section({ bg, children }: { bg: string; children: React.ReactNode }) {
  return (
    <section style={{ background: bg, padding: 'clamp(3rem, 8vw, 5rem) 1.25rem' }}>
      <div style={{ maxWidth: '68rem', margin: '0 auto' }}>
        {children}
      </div>
    </section>
  )
}

function SectionHeader({ eyebrow, titulo }: { eyebrow: string; titulo: string }) {
  return (
    <>
      <p style={eyebrowStyle('#94a3b8')}>{eyebrow}</p>
      <h2 style={titleStyle}>{titulo}</h2>
    </>
  )
}

function CandidatoCard({ tono, titulo, items }: { tono: 'positivo' | 'negativo'; titulo: string; items: string[] }) {
  const accent = tono === 'positivo' ? ACCENT : '#94a3b8'
  return (
    <div style={{ background: '#fff', borderRadius: '20px', padding: 'clamp(1.25rem, 4vw, 2rem)', border: '1px solid rgba(0,0,0,0.07)' }}>
      <h3 style={{ fontFamily: SERIF, fontSize: '1.4rem', fontWeight: 600, color: TEXT_DARK, letterSpacing: '-0.02em', margin: '0 0 1rem' }}>
        {titulo}
      </h3>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
        {items.map((b, i) => (
          <li key={i} style={bulletStyle}>
            <span style={{
              width: 14, height: 14, borderRadius: '50%', background: accent,
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              color: '#fff', fontSize: 10, fontWeight: 700, flexShrink: 0, marginTop: 3,
            }}>
              {tono === 'positivo' ? '✓' : '–'}
            </span>
            <span style={{ color: TEXT_BODY }}>{b}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

// ─── Estilos compartidos ────────────────────────────────────────────────────
const eyebrowStyle = (color: string): React.CSSProperties => ({
  fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.2em',
  textTransform: 'uppercase', color, marginBottom: '1rem',
})

const titleStyle: React.CSSProperties = {
  fontFamily: SERIF,
  fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)',
  fontWeight: 600, color: TEXT_DARK,
  letterSpacing: '-0.025em', lineHeight: 1.1,
  marginBottom: '1.5rem', maxWidth: '40rem',
}

const paragraphStyle: React.CSSProperties = {
  color: TEXT_BODY, fontSize: '0.95rem', lineHeight: 1.75, maxWidth: '48rem',
}

const bulletStyle: React.CSSProperties = {
  display: 'flex', alignItems: 'flex-start', gap: '0.625rem',
  fontSize: '0.9rem', color: TEXT_DARK, lineHeight: 1.6,
}

const ctaSolid: React.CSSProperties = {
  display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
  background: ACCENT, color: '#fff', borderRadius: '100px',
  padding: '0.85rem 1.5rem', fontSize: '0.9rem', fontWeight: 600,
  textDecoration: 'none',
}

const ctaGhost: React.CSSProperties = {
  display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
  background: 'transparent', color: '#fff',
  border: '1px solid rgba(255,255,255,0.25)', borderRadius: '100px',
  padding: '0.85rem 1.5rem', fontSize: '0.9rem', fontWeight: 600,
  textDecoration: 'none',
}

const breadcrumbLink: React.CSSProperties = {
  color: 'rgba(255,255,255,0.55)', textDecoration: 'none',
}

const galleryItem: React.CSSProperties = {
  position: 'relative',
  aspectRatio: '4 / 5',
  borderRadius: '16px',
  overflow: 'hidden',
  background: '#EEEAE2',
  border: '1px solid rgba(0,0,0,0.06)',
}

const galleryPlaceholder: React.CSSProperties = {
  position: 'absolute', inset: 0,
  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
  gap: '0.5rem',
  background: 'linear-gradient(135deg, #EEEAE2 0%, #E2DCD0 100%)',
}

const faqDetails: React.CSSProperties = {
  borderBottom: '1px solid rgba(0,0,0,0.08)', padding: '1.25rem 0',
}
const faqSummary: React.CSSProperties = {
  cursor: 'pointer', fontSize: '1rem', fontWeight: 600, color: TEXT_DARK,
  listStyle: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
}
const faqAnswer: React.CSSProperties = {
  color: TEXT_BODY, fontSize: '0.9rem', lineHeight: 1.75, marginTop: '0.875rem', paddingRight: '1rem',
}

const otroProcCard: React.CSSProperties = {
  display: 'flex', flexDirection: 'column',
  background: '#fff', borderRadius: '16px',
  padding: '1.5rem', border: '1px solid rgba(0,0,0,0.08)',
  textDecoration: 'none',
  transition: 'border-color 0.25s ease, transform 0.25s ease',
}
