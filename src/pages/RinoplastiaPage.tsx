import { Link } from 'react-router-dom'
import { Calendar, ArrowLeft, CheckCircle } from 'lucide-react'
import { CONTACT } from '../lib/contact'
import { COPY } from '../lib/copy'

const tiposRinoplastia = [
  {
    tag: 'Procedimiento principal',
    title: 'Rinoplastia Estética',
    duration: '~4 horas',
    desc: 'Modificamos forma, tamaño y proporciones de la nariz para que el resultado armonice con el resto de tu rostro. No usamos moldes — cada diseño parte de tu anatomía específica.',
    bullets: [
      'Técnica Estructural con abordaje abierto',
      'Ultrasonido piezoeléctrico para modificación ósea',
      'Simulación computacional antes de decidir',
      '+200 rinoplastias documentadas con resultado natural',
    ],
    bg: '#F7F5F0',
    accent: '#2D4A3E',
  },
  {
    tag: 'Especializada',
    title: 'Rinoplastia Afrolatina',
    duration: '~4 horas',
    desc: 'Técnica diseñada para narices con características afrolatinas. El objetivo es preservar la identidad étnica del paciente mientras se logra una mayor armonía facial — nunca borrar los rasgos, sino equilibrarlos.',
    bullets: [
      'Respeto por la identidad étnica y cultural',
      'Técnica adaptada a morfología específica',
      'Evaluación detallada de proporciones faciales',
      'Casos reales similares antes de cualquier decisión',
    ],
    bg: '#FFFFFF',
    accent: '#1A1A1A',
  },
  {
    tag: 'Alta Complejidad',
    title: 'Rinoplastia Secundaria',
    duration: '6+ horas',
    desc: 'Para pacientes que tuvieron una cirugía previa y no quedaron conformes con el resultado. Corregimos deformidades, asimetrías y problemas funcionales dejados por otras intervenciones.',
    bullets: [
      'Corrección de deformidades y asimetrías',
      'Restauración de función nasal (respiración)',
      'Mayor complejidad técnica — cirugías de 6+ horas',
      'Honestidad clínica: evaluamos expectativas reales',
    ],
    bg: '#F7F5F0',
    accent: '#2D4A3E',
  },
]

export function RinoplastiaPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#fff', fontFamily: 'var(--font-sans, DM Sans, sans-serif)' }}>
      {/* Navbar simple */}
      <header style={{
        position: 'sticky', top: 0, zIndex: 50,
        background: 'rgba(255,255,255,0.96)', backdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(0,0,0,0.07)',
        padding: '0.75rem 1rem',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        gap: '0.5rem',
      }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none', color: '#475569', fontSize: '0.875rem', fontWeight: 500 }}>
          <ArrowLeft style={{ width: '16px', height: '16px' }} />
          Volver
        </Link>
        <Link to="/" style={{ textDecoration: 'none', fontWeight: 700, fontSize: '1rem', color: '#1A1A1A', letterSpacing: '-0.02em' }}>
          Dr. Agudelo
        </Link>
        <a
          href="/#agendar"
          style={{
            background: '#2D4A3E', color: '#fff', borderRadius: '100px',
            padding: '0.5rem 0.875rem', fontSize: '0.72rem', fontWeight: 600,
            textDecoration: 'none', letterSpacing: '0.02em', whiteSpace: 'nowrap',
          }}
        >
          {COPY.ctaSecondary}
        </a>
      </header>

      {/* Hero */}
      <section style={{ background: '#1A1A1A', padding: 'clamp(3rem, 8vw, 5rem) 1.25rem clamp(2.5rem, 6vw, 4rem)', textAlign: 'center' }}>
        <p style={{ fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#94a3b8', marginBottom: '1.25rem' }}>
          Tipos de rinoplastia
        </p>
        <h1 style={{
          fontFamily: 'var(--font-serif, Cormorant Garamond, Georgia, serif)',
          fontSize: 'clamp(2.5rem, 5vw, 4rem)',
          fontWeight: 600, lineHeight: 1.1, letterSpacing: '-0.025em',
          color: '#fff', marginBottom: '1.25rem', maxWidth: '640px', margin: '0 auto 1.25rem',
        }}>
          Rinoplastia Natural en Cali
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: 'clamp(0.95rem, 1.5vw, 1.05rem)', lineHeight: 1.7, maxWidth: '520px', margin: '0 auto 2.5rem' }}>
          Dos décadas diseñando narices que no se notan operadas.
          Cada resultado se construye para tu rostro — no para un molde.
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

      {/* Tipos */}
      <section style={{ padding: '5rem 1.5rem' }}>
        <div style={{ maxWidth: '60rem', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '4rem' }}>
          {tiposRinoplastia.map((tipo, i) => (
            <div key={i} style={{ background: tipo.bg, borderRadius: '20px', padding: 'clamp(1.25rem, 5vw, 2.5rem)', border: '1px solid rgba(0,0,0,0.06)' }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', alignItems: 'center', marginBottom: '1.25rem' }}>
                <span style={{
                  background: tipo.accent, color: '#fff',
                  borderRadius: '100px', padding: '0.25rem 0.85rem',
                  fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase',
                }}>
                  {tipo.tag}
                </span>
                <span style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: 500 }}>
                  {tipo.duration}
                </span>
              </div>
              <h2 style={{
                fontFamily: 'var(--font-serif, Cormorant Garamond, Georgia, serif)',
                fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', fontWeight: 600,
                color: '#1A1A1A', letterSpacing: '-0.02em', lineHeight: 1.1,
                marginBottom: '1rem',
              }}>
                {tipo.title}
              </h2>
              <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: 1.75, marginBottom: '1.5rem', maxWidth: '48rem' }}>
                {tipo.desc}
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {tipo.bullets.map((b, j) => (
                  <li key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.625rem', fontSize: '0.875rem', color: '#374151' }}>
                    <CheckCircle style={{ width: '16px', height: '16px', color: tipo.accent, flexShrink: 0, marginTop: '2px' }} />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Técnica Ultrasónica */}
      <section style={{ background: '#F7F5F0', padding: 'clamp(3rem, 8vw, 5rem) 1.25rem', borderTop: '1px solid rgba(0,0,0,0.06)' }}>
        <div style={{ maxWidth: '52rem', margin: '0 auto' }}>
          <span style={{
            background: '#E8EDE8', border: '1px solid #C5D3C5',
            borderRadius: '100px', padding: '0.375rem 0.875rem',
            fontSize: '0.75rem', fontWeight: 600, color: '#2D4A3E',
            display: 'inline-block', marginBottom: '1.5rem',
          }}>
            Técnica disponible en Cali desde 2022
          </span>
          <h2 style={{
            fontFamily: 'var(--font-serif, Cormorant Garamond, Georgia, serif)',
            fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 600,
            color: '#1A1A1A', letterSpacing: '-0.03em', lineHeight: 1.05,
            marginBottom: '1rem',
          }}>
            Rinoplastia Ultrasónica (Piezosurgery)
          </h2>
          <p style={{ color: '#2D4A3E', fontSize: '1rem', fontWeight: 500, marginBottom: '1.25rem' }}>
            Más control, menos trauma, recuperación más predecible.
          </p>
          <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: 1.8, marginBottom: '1rem' }}>
            Desde hace más de dos años incorporamos el ultrasonido piezoeléctrico en nuestros procedimientos de rinoplastia. Esta tecnología permite modificar la estructura ósea con una precisión que los instrumentos convencionales no logran: el hueso responde de forma selectiva a la vibración ultrasónica, sin afectar tejidos blandos circundantes.
          </p>
          <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: 1.8 }}>
            El resultado: menos sangrado, edema más controlado, y una recuperación que permite ver resultados más tempranos y predecibles.
          </p>
        </div>
      </section>

      {/* FAQ Rinoplastia */}
      <section style={{ background: '#fff', padding: 'clamp(3rem, 8vw, 5rem) 1.25rem' }}>
        <div style={{ maxWidth: '52rem', margin: '0 auto' }}>
          <p style={{ fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#94a3b8', marginBottom: '1rem' }}>
            Preguntas frecuentes
          </p>
          <h2 style={{
            fontFamily: 'var(--font-serif, Cormorant Garamond, Georgia, serif)',
            fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', fontWeight: 600,
            color: '#1A1A1A', letterSpacing: '-0.025em', lineHeight: 1.1,
            marginBottom: '2.5rem',
          }}>
            Lo que más preguntan antes de decidir
          </h2>
          {[
            { q: '¿La cirugía es dolorosa?', a: 'No es dolorosa — la anestesia general lo evita. En el postoperatorio hay incomodidad por congestión nasal y sensación de presión, pero el dolor como tal es mínimo. La mayoría de pacientes lo describe como manejable sin necesidad de analgésicos fuertes después del segundo día.' },
            { q: '¿Cuántos días de incapacidad necesito?', a: 'Para trabajo de oficina o remoto: 7 a 10 días. Para actividades físicas moderadas: 3 semanas. Para ejercicio de contacto o fuerza: 6 meses.' },
            { q: '¿Cuándo puedo tomar un vuelo?', a: '10 días después de la cirugía. Vuelos cortos dentro del país pueden autorizarse antes, dependiendo de la evolución individual.' },
            { q: '¿Cuándo veré el resultado final?', a: 'El 90% del resultado es visible entre los 3 y 4 meses. El resultado definitivo llega entre los 12 y 18 meses, cuando toda la inflamación residual ha desaparecido.' },
            { q: '¿Me puedo operar si me he aplicado ácido hialurónico en la nariz?', a: 'Sí. Lo ideal es disolverlo con hialuronidasa al menos 3 semanas antes de la cirugía para facilitar la evaluación anatómica y el abordaje quirúrgico.' },
            { q: '¿Cuándo puedo volver al deporte?', a: 'Pilates y caminadora: semana 3. Trote suave: semana 6. Deportes de contacto o actividades de alto impacto: 6 meses.' },
          ].map((item, i) => (
            <details key={i} style={{ borderBottom: '1px solid rgba(0,0,0,0.08)', padding: '1.25rem 0' }}>
              <summary style={{ cursor: 'pointer', fontSize: '1rem', fontWeight: 600, color: '#1A1A1A', listStyle: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                {item.q}
                <span style={{ fontSize: '1.25rem', color: '#94a3b8', flexShrink: 0, marginLeft: '1rem' }}>+</span>
              </summary>
              <p style={{ color: '#475569', fontSize: '0.9rem', lineHeight: 1.75, marginTop: '0.875rem', paddingRight: '1rem' }}>
                {item.a}
              </p>
            </details>
          ))}
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
          marginBottom: '1rem', maxWidth: '480px', margin: '0 auto 1rem',
        }}>
          Sin compromiso. Con toda la información.
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: '2rem' }}>
          Envía tus fotos (frente y perfil, sin flash) y recibimos tu caso.<br />
          La evaluación inicial es gratuita.
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
