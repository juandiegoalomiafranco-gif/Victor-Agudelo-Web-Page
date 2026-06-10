import { Calendar } from 'lucide-react'

import { DOCTOR_PHOTO_URL } from '../../lib/assets'
import { ProfileImagePlaceholder } from '../ProfileImagePlaceholder'

export const AboutDoctorSection = () => (
  <section id="doctor" style={{ background: '#FAF7F2', padding: 'clamp(3.5rem, 8vw, 7rem) clamp(1rem, 3vw, 1.5rem)' }}>
    <div style={{ maxWidth: '64rem', margin: '0 auto' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))', gap: 'clamp(2rem, 5vw, 4rem)', alignItems: 'start' }}>
        {/* Photo */}
        {DOCTOR_PHOTO_URL
          ? <img src={DOCTOR_PHOTO_URL} alt="Dr. Víctor Manuel Agudelo" style={{ borderRadius: '20px', width: '100%', aspectRatio: '3/4', objectFit: 'cover', maxHeight: '500px', objectPosition: 'top center' }} />
          : <ProfileImagePlaceholder />
        }
        {/* Bio */}
        <div>
          <p style={{ fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#94a3b8', marginBottom: '0.75rem' }}>
            Sobre el médico
          </p>
          <h2 className="section-reveal-header" style={{ color: '#1A1A1A', fontWeight: 700, fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', letterSpacing: '-0.03em', lineHeight: 1.05, marginBottom: '0.5rem' }}>
            Dr. Víctor Manuel Agudelo
          </h2>
          <p style={{ color: '#2D4A3E', fontSize: '1rem', fontWeight: 500, marginBottom: '1.75rem' }}>
            Otorrinolaringólogo · Cirujano Plástico Facial · Especialista en Rinoplastia
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem', marginBottom: '2rem' }}>
            <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: 1.75 }}>
              Llevo dos décadas dedicado a un solo objetivo: que cada paciente quede con la nariz que siempre quiso — que se vea natural, que respire bien, y que sea completamente suya.
            </p>
            <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: 1.75 }}>
              Creo en la honestidad clínica. No prometo lo que no puedo cumplir. Antes de cualquier decisión, reviso tu caso en detalle, mostramos simulaciones y comparamos con resultados reales de pacientes con características similares.
            </p>
            <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: 1.75 }}>
              Estoy presente en cada etapa: desde la primera consulta hasta el último control postoperatorio. Nunca delego ese acompañamiento.
            </p>
          </div>
          {/* Credentials */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {[
              'Miembro SCCPFR desde 2004',
              'Miembro ACORL desde 2004',
              '1500+ casos documentados',
              'Reseñas verificadas en RealSelf.com',
            ].map(badge => (
              <span key={badge} style={{ background: '#F0EDE8', border: '1px solid #D4CFC9', borderRadius: '100px', padding: '0.375rem 0.875rem', fontSize: '0.78rem', fontWeight: 500, color: '#2D4A3E' }}>
                {badge}
              </span>
            ))}
          </div>

          {/* Inline CTA + WhatsApp */}
          <div style={{ marginTop: '2.25rem', display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <a href="#agendar" style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              background: '#2D4A3E', color: '#fff', borderRadius: '100px',
              padding: '0.85rem 1.5rem', fontSize: '0.875rem', fontWeight: 600,
              textDecoration: 'none',
            }}>
              <Calendar className="w-4 h-4" /> Conoce tu caso con el Dr. Agudelo
            </a>
            <a href="#agendar" style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              color: '#2D4A3E', fontSize: '0.875rem', fontWeight: 600,
              textDecoration: 'none', padding: '0.85rem 0.5rem',
            }}>
              <Calendar className="w-4 h-4" /> Pedir evaluación gratuita
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
)
