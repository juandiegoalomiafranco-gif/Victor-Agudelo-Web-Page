import {
  Calendar, CheckCircle, GraduationCap, Award, Globe, ExternalLink,
} from 'lucide-react'
import { PageHeader } from '../components/PageHeader'
import { COPY } from '../lib/copy'
import { DOCTOR_PHOTO_URL } from '../lib/assets'

// ── Datos provistos directamente por el Dr. Víctor Manuel Agudelo ──────────────
const stats = [
  { value: '22', label: 'Años de experiencia' },
  { value: '+1.800', label: 'Cirugías realizadas' },
  { value: 'ORL + Facial', label: 'Doble especialidad' },
  { value: 'Nac. e Int.', label: 'Pacientes' },
]

const formacion = [
  {
    year: '1998',
    title: 'Médico y Cirujano',
    place: 'Universidad del Valle — Cali',
  },
  {
    year: '2004',
    title: 'Especialista en Otorrinolaringología',
    place: 'Universidad San Martín',
  },
  {
    year: '2011',
    title: 'Curso Práctico Avanzado de Cirugía Plástica Facial',
    place: 'CLEMI · Soc. Colombiana de Cirugía Plástica Facial y Rinología — Bogotá',
  },
  {
    year: '2017',
    title: '1er Curso Internacional de Terapias Combinadas para Rejuvenecimiento Facial',
    place: 'Soc. Colombiana de Cirugía Plástica Facial y Rinología — Bogotá',
  },
  {
    year: '2023',
    title: '10º Curso Internacional de Cirugía Plástica Facial — Rinoplastia de Preservación',
    place: 'Face and Nose Institute — Bogotá',
  },
  {
    year: '2024',
    title: 'All in One Rhinoplasty — Extreme Revisions Focused Course',
    place: 'Surgicall Academy — Estambul, Turquía',
  },
]

const membresias = [
  'Asociación Colombiana de Otorrinolaringología (ACORL)',
  'Sociedad Colombiana de Cirugía Plástica Facial y Rinología (SCCPFR) — miembro desde 2004',
  'Registro Médico 194892/99',
  'RETHUS CMC2016-11549',
]

const diferenciadores = [
  'Dedico el tiempo necesario a la consulta: saber escuchar lo que el paciente busca y realizar un buen examen físico.',
  'Realizo un plan quirúrgico con simulaciones, con la participación del paciente, del resultado aproximado de la cirugía.',
  'Soy muy claro sobre lo que se puede y no se puede lograr, para no generar falsas expectativas.',
  'Los controles postoperatorios no los delego: me apersono yo, porque es inmensamente gratificante ver esas sonrisas de felicidad.',
]

const perfiles = [
  { label: 'RealSelf', href: 'https://www.realself.com/dr/victor-manuel-agudelo-cali-colombia' },
  { label: 'Soc. Colombiana de Cirugía Plástica Facial', href: 'https://cirugiaplasticafacial.org/directorio-medico/victor-manuel-agudelo-ramos/' },
  { label: 'ACORL — Directorio', href: 'https://acorl.org.co/directorio-otorrino/interno/8-VICTOR-MANUEL-AGUDELO-RAMOS' },
  { label: 'Instagram', href: 'https://www.instagram.com/doctorvictoragudelo/' },
  { label: 'TikTok', href: 'https://www.tiktok.com/@dr.victor.agudelo' },
]

export function SobreElDrPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#fff', fontFamily: 'var(--font-sans, DM Sans, sans-serif)' }}>
      <PageHeader cta={{ href: '/#agendar', label: COPY.ctaSecondary }} />

      {/* Hero */}
      <section style={{ background: '#1A1A1A', padding: 'clamp(3rem, 8vw, 5rem) 1.25rem clamp(2.5rem, 6vw, 4rem)', textAlign: 'center' }}>
        <p style={{ fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#94a3b8', marginBottom: '1.25rem' }}>
          Sobre el especialista
        </p>
        <h1 style={{
          fontFamily: 'var(--font-serif, Cormorant Garamond, Georgia, serif)',
          fontSize: 'clamp(2.5rem, 5vw, 4rem)',
          fontWeight: 600, lineHeight: 1.1, letterSpacing: '-0.025em',
          color: '#fff', maxWidth: '720px', margin: '0 auto 1.25rem',
        }}>
          Dr. Víctor Manuel Agudelo
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: 'clamp(0.95rem, 1.5vw, 1.05rem)', lineHeight: 1.7, maxWidth: '560px', margin: '0 auto 1.75rem' }}>
          Otorrinolaringólogo · Cirujano Plástico Facial · Rinoplastia.
          Más de dos décadas dedicadas a la armonía y la función nasal en Cali.
        </p>
        <p style={{
          fontFamily: 'var(--font-serif, Cormorant Garamond, Georgia, serif)',
          fontSize: 'clamp(1.15rem, 2vw, 1.5rem)', fontStyle: 'italic',
          color: '#C9A84C', fontWeight: 500, letterSpacing: '-0.01em',
        }}>
          «Encontrando tu nueva belleza»
        </p>
      </section>

      {/* Retrato + Bio */}
      <section style={{ padding: 'clamp(3rem, 8vw, 5rem) 1.5rem' }}>
        <div style={{
          maxWidth: '64rem', margin: '0 auto',
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(300px, 100%), 1fr))',
          gap: 'clamp(1.5rem, 4vw, 3rem)', alignItems: 'center',
        }}>
          {/* Espacio para la foto del doctor */}
          <div style={{
            position: 'relative', borderRadius: '20px', overflow: 'hidden',
            border: '1px solid rgba(0,0,0,0.08)', aspectRatio: '4 / 5',
            background: '#F7F5F0',
          }}>
            <img
              src={DOCTOR_PHOTO_URL}
              alt="Dr. Víctor Manuel Agudelo, cirujano especialista en rinoplastia en Cali"
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 20%', display: 'block' }}
              loading="lazy"
              decoding="async"
            />
          </div>

          {/* Texto bio — por qué se dedicó a esto */}
          <div>
            <p style={{ fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#2D4A3E', marginBottom: '1rem' }}>
              Su historia
            </p>
            <h2 style={{
              fontFamily: 'var(--font-serif, Cormorant Garamond, Georgia, serif)',
              fontSize: 'clamp(1.8rem, 3.5vw, 2.4rem)', fontWeight: 600,
              color: '#1A1A1A', letterSpacing: '-0.02em', lineHeight: 1.12,
              marginBottom: '1.25rem',
            }}>
              Del arte a la cirugía de precisión
            </h2>
            <p style={{ color: '#475569', fontSize: '0.97rem', lineHeight: 1.8, marginBottom: '1rem' }}>
              Desde niño disfruté y me destaqué en las actividades artísticas manuales. Mi interés por las ciencias, la biología y el servicio social me llevó a estudiar medicina, pensando en una especialidad quirúrgica donde desarrollar esa habilidad manual.
            </p>
            <p style={{ color: '#475569', fontSize: '0.97rem', lineHeight: 1.8 }}>
              Al avanzar en la carrera, descubrí que me apasionaban las cirugías en áreas pequeñas, que requieren movimientos delicados y precisos: por eso elegí la otorrinolaringología. En el año 2000 solo tres universidades habían incorporado la cirugía plástica facial a su posgrado de ORL. Debía entrar a una de ellas para unir mi pasión artística con la medicina — y lo logré.
            </p>
          </div>
        </div>
      </section>

      {/* Cifras */}
      <section style={{ background: '#1A1A1A', padding: 'clamp(2.5rem, 6vw, 3.5rem) 1.25rem' }}>
        <div style={{
          maxWidth: '60rem', margin: '0 auto',
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(140px, 100%), 1fr))',
          gap: 'clamp(1.5rem, 4vw, 2.5rem)', textAlign: 'center',
        }}>
          {stats.map((s, i) => (
            <div key={i}>
              <p style={{
                fontFamily: 'var(--font-serif, Cormorant Garamond, Georgia, serif)',
                fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', fontWeight: 600,
                color: '#fff', letterSpacing: '-0.02em', lineHeight: 1, marginBottom: '0.5rem',
              }}>
                {s.value}
              </p>
              <p style={{ fontSize: '0.78rem', color: '#94a3b8', fontWeight: 500, letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Filosofía */}
      <section style={{ padding: 'clamp(3rem, 8vw, 5rem) 1.5rem' }}>
        <div style={{ maxWidth: '52rem', margin: '0 auto' }}>
          <p style={{ fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#94a3b8', marginBottom: '1rem' }}>
            Filosofía y enfoque
          </p>
          <h2 style={{
            fontFamily: 'var(--font-serif, Cormorant Garamond, Georgia, serif)',
            fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', fontWeight: 600,
            color: '#1A1A1A', letterSpacing: '-0.025em', lineHeight: 1.1,
            marginBottom: '1.5rem', maxWidth: '36rem',
          }}>
            Belleza natural, respetando lo que te hace único
          </h2>
          <p style={{ color: '#475569', fontSize: '1rem', lineHeight: 1.8, marginBottom: '2rem' }}>
            Toda América, y en especial nuestro país, es multiétnica. Cada cirugía debe planificarse según los rasgos individuales, buscando siempre la armonía facial y un balance entre las diferentes estructuras para lograr naturalidad en los resultados.
          </p>

          {/* Cita destacada */}
          <blockquote style={{
            borderLeft: '3px solid #C9A84C', paddingLeft: '1.5rem', margin: '0 0 2.5rem',
          }}>
            <p style={{
              fontFamily: 'var(--font-serif, Cormorant Garamond, Georgia, serif)',
              fontSize: 'clamp(1.3rem, 2.6vw, 1.85rem)', fontStyle: 'italic',
              color: '#1A1A1A', letterSpacing: '-0.01em', lineHeight: 1.35,
            }}>
              Es buscar y encontrar la belleza detrás de cada rasgo étnico que nos hace únicos.
            </p>
          </blockquote>

          <h3 style={{
            fontSize: '0.95rem', fontWeight: 700, color: '#1A1A1A',
            letterSpacing: '0.02em', marginBottom: '1.25rem',
          }}>
            Qué me diferencia
          </h3>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
            {diferenciadores.map((d, i) => (
              <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', fontSize: '0.95rem', color: '#374151', lineHeight: 1.65 }}>
                <CheckCircle style={{ width: '18px', height: '18px', color: '#2D4A3E', flexShrink: 0, marginTop: '3px' }} />
                {d}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Formación académica (timeline) */}
      <section style={{ background: '#F7F5F0', padding: 'clamp(3rem, 8vw, 5rem) 1.5rem', borderTop: '1px solid rgba(0,0,0,0.06)' }}>
        <div style={{ maxWidth: '52rem', margin: '0 auto' }}>
          <p style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#2D4A3E', marginBottom: '1rem' }}>
            <GraduationCap style={{ width: '16px', height: '16px' }} />
            Formación académica
          </p>
          <h2 style={{
            fontFamily: 'var(--font-serif, Cormorant Garamond, Georgia, serif)',
            fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', fontWeight: 600,
            color: '#1A1A1A', letterSpacing: '-0.025em', lineHeight: 1.1,
            marginBottom: '2.5rem', maxWidth: '36rem',
          }}>
            Una trayectoria de formación continua
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {formacion.map((f, i) => (
              <div key={i} style={{
                display: 'grid', gridTemplateColumns: '4.5rem 1fr', gap: '1.25rem',
                padding: '1.25rem 0',
                borderBottom: i < formacion.length - 1 ? '1px solid rgba(0,0,0,0.08)' : 'none',
              }}>
                <span style={{
                  fontFamily: 'var(--font-serif, Cormorant Garamond, Georgia, serif)',
                  fontSize: '1.25rem', fontWeight: 600, color: '#2D4A3E', letterSpacing: '-0.01em',
                }}>
                  {f.year}
                </span>
                <div>
                  <p style={{ fontSize: '1rem', fontWeight: 600, color: '#1A1A1A', lineHeight: 1.35, marginBottom: '0.25rem' }}>
                    {f.title}
                  </p>
                  <p style={{ fontSize: '0.875rem', color: '#64748b', lineHeight: 1.5 }}>
                    {f.place}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Registros, membresías e idiomas */}
      <section style={{ background: '#fff', padding: 'clamp(3rem, 8vw, 5rem) 1.5rem' }}>
        <div style={{ maxWidth: '52rem', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))', gap: 'clamp(1.5rem, 4vw, 2.5rem)' }}>
          {/* Registros y membresías */}
          <div>
            <p style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#2D4A3E', marginBottom: '1.25rem' }}>
              <Award style={{ width: '16px', height: '16px' }} />
              Registros y membresías
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {membresias.map((m, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.625rem', fontSize: '0.9rem', color: '#374151', lineHeight: 1.55 }}>
                  <CheckCircle style={{ width: '16px', height: '16px', color: '#2D4A3E', flexShrink: 0, marginTop: '3px' }} />
                  {m}
                </li>
              ))}
            </ul>
          </div>

          {/* Práctica e idiomas */}
          <div>
            <p style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#2D4A3E', marginBottom: '1.25rem' }}>
              <Globe style={{ width: '16px', height: '16px' }} />
              Práctica clínica
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <p style={{ fontSize: '0.78rem', color: '#94a3b8', fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: '0.25rem' }}>Sede</p>
                <p style={{ fontSize: '0.92rem', color: '#374151', lineHeight: 1.5 }}>Clínica de Otorrinolaringología y Cirugía Plástica — Cali</p>
              </div>
              <div>
                <p style={{ fontSize: '0.78rem', color: '#94a3b8', fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: '0.25rem' }}>Idiomas</p>
                <p style={{ fontSize: '0.92rem', color: '#374151', lineHeight: 1.5 }}>Español · Inglés</p>
              </div>
              <div>
                <p style={{ fontSize: '0.78rem', color: '#94a3b8', fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: '0.25rem' }}>Pacientes</p>
                <p style={{ fontSize: '0.92rem', color: '#374151', lineHeight: 1.5 }}>Recibo pacientes nacionales e internacionales</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Perfiles verificables */}
      <section style={{ background: '#F7F5F0', padding: 'clamp(3rem, 8vw, 4rem) 1.5rem', borderTop: '1px solid rgba(0,0,0,0.06)' }}>
        <div style={{ maxWidth: '52rem', margin: '0 auto', textAlign: 'center' }}>
          <p style={{ fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#94a3b8', marginBottom: '1rem' }}>
            Perfiles verificables
          </p>
          <h2 style={{
            fontFamily: 'var(--font-serif, Cormorant Garamond, Georgia, serif)',
            fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 600,
            color: '#1A1A1A', letterSpacing: '-0.02em', lineHeight: 1.15,
            marginBottom: '2rem',
          }}>
            Confirma su trayectoria
          </h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', justifyContent: 'center' }}>
            {perfiles.map((p, i) => (
              <a
                key={i}
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                  background: '#fff', border: '1px solid rgba(0,0,0,0.1)',
                  borderRadius: '100px', padding: '0.6rem 1.1rem',
                  fontSize: '0.85rem', fontWeight: 600, color: '#1A1A1A',
                  textDecoration: 'none', transition: 'border-color 0.2s ease, color 0.2s ease',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = '#2D4A3E'; e.currentTarget.style.color = '#2D4A3E' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(0,0,0,0.1)'; e.currentTarget.style.color = '#1A1A1A' }}
              >
                {p.label}
                <ExternalLink style={{ width: '14px', height: '14px' }} />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section style={{ background: '#1A1A1A', padding: 'clamp(3rem, 8vw, 5rem) 1.25rem', textAlign: 'center' }}>
        <p style={{ fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#94a3b8', marginBottom: '1rem' }}>
          Da el primer paso
        </p>
        <h2 style={{
          fontFamily: 'var(--font-serif, Cormorant Garamond, Georgia, serif)',
          fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 600,
          color: '#fff', letterSpacing: '-0.025em', lineHeight: 1.1,
          maxWidth: '480px', margin: '0 auto 1rem',
        }}>
          Conversemos sobre tu caso
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: '2rem' }}>
          La evaluación inicial es gratuita. Te atiende siempre el Dr. Agudelo,<br />
          de la primera consulta al último control.
        </p>
        <a href="/#agendar" style={{
          display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
          background: '#2D4A3E', color: '#fff', borderRadius: '100px',
          padding: '0.85rem 2rem', fontSize: '0.9rem', fontWeight: 600,
          textDecoration: 'none',
        }}>
          <Calendar style={{ width: '16px', height: '16px' }} />
          {COPY.ctaPrimary}
        </a>
      </section>
    </div>
  )
}
