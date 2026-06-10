import { Link } from 'react-router-dom'
import { Calendar } from 'lucide-react'

export const SurgeryTypesSection = () => (
  <section style={{ background: '#FAF7F2', padding: 'clamp(3rem, 8vw, 6rem) clamp(1rem, 3vw, 1.5rem)', borderTop: '1px solid rgba(0,0,0,0.06)' }}>
    <div style={{ maxWidth: '68rem', margin: '0 auto' }}>
      <p style={{ fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#94a3b8', marginBottom: '1rem' }}>
        Procedimientos
      </p>
      <h2 className="section-reveal-header" style={{ color: '#1A1A1A', fontWeight: 700, fontSize: 'clamp(2rem, 4vw, 3rem)', letterSpacing: '-0.03em', lineHeight: 1.05, marginBottom: '0.75rem' }}>
        Más de un procedimiento.<br />Una sola decisión.
      </h2>
      <p style={{ color: '#64748b', fontSize: '1rem', lineHeight: 1.7, maxWidth: '44rem', marginBottom: '3rem' }}>
        Cada cirugía se diseña para una necesidad específica. Conoce los tipos de procedimientos y encuentra el que corresponde a tu caso.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))', gap: '1.5rem' }}>
        <div style={{ background: '#fff', borderRadius: '20px', padding: 'clamp(1.25rem, 4vw, 2rem)', border: '1px solid rgba(0,0,0,0.07)', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#2D4A3E', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ color: '#fff', fontSize: '1rem', fontWeight: 700 }}>◈</span>
          </div>
          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', fontWeight: 600, color: '#1A1A1A', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
            Rinoplastias
          </h3>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
            {['Rinoplastia Estética', 'Rinoplastia Afrolatina', 'Rinoplastia Secundaria'].map(item => (
              <li key={item} style={{ fontSize: '0.875rem', color: '#475569', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#2D4A3E', flexShrink: 0 }} />
                {item}
              </li>
            ))}
          </ul>
          <Link
            to="/rinoplastia"
            style={{ marginTop: 'auto', display: 'inline-flex', alignItems: 'center', gap: '0.375rem', color: '#2D4A3E', fontSize: '0.875rem', fontWeight: 600, textDecoration: 'none' }}
          >
            Ver tipos de rinoplastia →
          </Link>
        </div>

        <div style={{ background: '#fff', borderRadius: '20px', padding: 'clamp(1.25rem, 4vw, 2rem)', border: '1px solid rgba(0,0,0,0.07)', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#1A1A1A', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ color: '#fff', fontSize: '1rem', fontWeight: 700 }}>◆</span>
          </div>
          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', fontWeight: 600, color: '#1A1A1A', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
            Procedimientos Faciales
          </h3>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
            {['Mentoplastia', 'Otoplastia', 'Blefaroplastia', 'Reducción de papada · Mínimamente invasivos'].map(item => (
              <li key={item} style={{ fontSize: '0.875rem', color: '#475569', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#1A1A1A', flexShrink: 0 }} />
                {item}
              </li>
            ))}
          </ul>
          <Link
            to="/procedimientos"
            style={{ marginTop: 'auto', display: 'inline-flex', alignItems: 'center', gap: '0.375rem', color: '#1A1A1A', fontSize: '0.875rem', fontWeight: 600, textDecoration: 'none' }}
          >
            Ver procedimientos faciales →
          </Link>
        </div>
      </div>

      <div style={{ marginTop: 'clamp(2.5rem, 5vw, 3.5rem)', textAlign: 'center' }}>
        <a href="#agendar" style={{
          display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
          background: '#2D4A3E', color: '#fff', borderRadius: '100px',
          padding: '0.85rem 1.75rem', fontSize: '0.875rem', fontWeight: 600,
          textDecoration: 'none', letterSpacing: '0.01em',
        }}>
          <Calendar className="w-4 h-4" /> Pedir evaluación gratuita
        </a>
      </div>
    </div>
  </section>
)
