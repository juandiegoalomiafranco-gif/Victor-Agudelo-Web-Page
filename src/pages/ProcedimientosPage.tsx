import { Link } from 'react-router-dom'
import { Calendar, ArrowLeft, CheckCircle } from 'lucide-react'
import { COPY } from '../lib/copy'

const procedimientos = [
  {
    tag: 'Perfil Facial',
    title: 'Mentoplastia',
    subtitle: 'Cirugía de mentón para equilibrar el perfil',
    desc: 'La mentoplastia modifica la proyección o forma del mentón para mejorar el equilibrio del perfil facial. Es frecuentemente combinada con rinoplastia: cuando nariz y mentón se trabajan juntos, el resultado es una armonía facial más completa y natural.',
    bullets: [
      'Implante mentoniano o reducción ósea según el caso',
      'Excelente combinación con rinoplastia',
      'Resultado definitivo y equilibrado',
      'Cicatriz mínima e imperceptible',
    ],
    accent: '#2D4A3E',
    bg: '#F7F5F0',
  },
  {
    tag: 'Orejas',
    title: 'Otoplastia',
    subtitle: 'Corrección de forma o posición de las orejas',
    desc: 'La otoplastia corrige orejas que sobresalen, son asimétricas o tienen una forma que incomoda al paciente. Es uno de los procedimientos con mayor índice de satisfacción: el cambio es notable pero completamente natural, y los resultados son definitivos.',
    bullets: [
      'Aplicable desde los 6 años de edad',
      'Corrección de orejas prominentes o asimétricas',
      'Cicatrices ocultas detrás de la oreja',
      'Resultado inmediato y definitivo',
    ],
    accent: '#1A1A1A',
    bg: '#fff',
  },
  {
    tag: 'Mirada',
    title: 'Blefaroplastia',
    subtitle: 'Rejuvenecimiento de párpados superiores e inferiores',
    desc: 'La blefaroplastia elimina el exceso de piel y grasa de los párpados para rejuvenecer la mirada. Se puede realizar en párpados superiores, inferiores o ambos. El resultado es una mirada más descansada y joven — sin alterar la expresión natural.',
    bullets: [
      'Párpados superiores e inferiores',
      'Elimina bolsas y exceso de piel',
      'Cicatrices en pliegues naturales — invisibles',
      'Recuperación de 7 a 10 días',
    ],
    accent: '#2D4A3E',
    bg: '#F7F5F0',
  },
  {
    tag: 'Sin Cirugía Mayor',
    title: 'Reducción de Papada con Láser',
    subtitle: 'Contorno facial con tecnología láser',
    desc: 'Tratamiento para eliminar la acumulación de grasa en la zona del cuello y papada mediante tecnología láser. Sin cirugía abierta, con mínima recuperación y resultados visibles desde las primeras semanas.',
    bullets: [
      'Sin incisiones grandes',
      'Mínima recuperación — regreso rápido a actividades',
      'Estimula colágeno y tensión de piel',
      'Resultados progresivos y naturales',
    ],
    accent: '#1A1A1A',
    bg: '#fff',
  },
  {
    tag: 'Mínimamente Invasivos',
    title: 'Toxina Botulínica · Ácido Hialurónico · Láser CO₂',
    subtitle: 'Rejuvenecimiento sin cirugía',
    desc: 'Procedimientos que complementan resultados quirúrgicos o se usan de forma independiente para rejuvenecer y armonizar el rostro sin intervención mayor. Todos se realizan en consulta, con resultados que se van viendo de forma progresiva y natural.',
    bullets: [
      'Toxina botulínica — relajación de expresión y arrugas',
      'Ácido hialurónico — volumen y contorno facial',
      'Láser CO₂ — textura, manchas y rejuvenecimiento cutáneo',
      'Sin tiempo de incapacidad significativo',
    ],
    accent: '#2D4A3E',
    bg: '#F7F5F0',
  },
]

export function ProcedimientosPage() {
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
          Procedimientos faciales
        </p>
        <h1 style={{
          fontFamily: 'var(--font-serif, Cormorant Garamond, Georgia, serif)',
          fontSize: 'clamp(2.5rem, 5vw, 4rem)',
          fontWeight: 600, lineHeight: 1.1, letterSpacing: '-0.025em',
          color: '#fff', marginBottom: '1.25rem', maxWidth: '640px', margin: '0 auto 1.25rem',
        }}>
          Más allá de la nariz
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: 'clamp(0.95rem, 1.5vw, 1.05rem)', lineHeight: 1.7, maxWidth: '520px', margin: '0 auto 2.5rem' }}>
          Cada procedimiento se piensa en función del rostro completo.
          La armonía facial viene de entender cómo cada rasgo se relaciona con los demás.
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

      {/* Procedimientos */}
      <section style={{ padding: '5rem 1.5rem' }}>
        <div style={{ maxWidth: '60rem', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '4rem' }}>
          {procedimientos.map((proc, i) => (
            <div key={i} style={{ background: proc.bg, borderRadius: '20px', padding: 'clamp(1.25rem, 5vw, 2.5rem)', border: '1px solid rgba(0,0,0,0.06)' }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', alignItems: 'center', marginBottom: '1.25rem' }}>
                <span style={{
                  background: proc.accent, color: '#fff',
                  borderRadius: '100px', padding: '0.25rem 0.85rem',
                  fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase',
                }}>
                  {proc.tag}
                </span>
              </div>
              <h2 style={{
                fontFamily: 'var(--font-serif, Cormorant Garamond, Georgia, serif)',
                fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', fontWeight: 600,
                color: '#1A1A1A', letterSpacing: '-0.02em', lineHeight: 1.1,
                marginBottom: '0.4rem',
              }}>
                {proc.title}
              </h2>
              <p style={{ color: proc.accent, fontSize: '0.9rem', fontWeight: 500, marginBottom: '1rem' }}>
                {proc.subtitle}
              </p>
              <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: 1.75, marginBottom: '1.5rem', maxWidth: '48rem' }}>
                {proc.desc}
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {proc.bullets.map((b, j) => (
                  <li key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.625rem', fontSize: '0.875rem', color: '#374151' }}>
                    <CheckCircle style={{ width: '16px', height: '16px', color: proc.accent, flexShrink: 0, marginTop: '2px' }} />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Link a rinoplastia */}
      <section style={{ background: '#F7F5F0', padding: 'clamp(2.5rem, 6vw, 4rem) 1.25rem', textAlign: 'center', borderTop: '1px solid rgba(0,0,0,0.06)' }}>
        <p style={{ color: '#64748b', fontSize: '0.95rem', marginBottom: '1.25rem' }}>
          ¿Buscas información sobre rinoplastia?
        </p>
        <Link
          to="/rinoplastia"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            background: '#1A1A1A', color: '#fff', borderRadius: '100px',
            padding: '0.75rem 1.75rem', fontSize: '0.875rem', fontWeight: 600,
            textDecoration: 'none',
          }}
        >
          Ver tipos de rinoplastia →
        </Link>
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
          Una evaluación gratuita para empezar.
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: '2rem' }}>
          Envía tus fotos y recibimos tu caso sin costo ni compromiso.
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
