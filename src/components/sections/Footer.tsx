import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin, Instagram, Facebook, MessageSquare } from 'lucide-react'

import { CONTACT } from '../../lib/contact'
import { PROCEDIMIENTOS } from '../../lib/procedimientos'

export const Footer = () => (
  <footer style={{ background: 'var(--color-1)' }}>
    <div className="max-w-7xl mx-auto px-6 pt-20 pb-10">
      <div className="grid md:grid-cols-4 gap-8 md:gap-12 mb-12 md:mb-16">
        <div>
          <p style={{ color: '#ffffff', fontWeight: 700, fontSize: '1.1rem', letterSpacing: '-0.02em', marginBottom: '1rem' }}>Dr. Agudelo</p>
          <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)', fontWeight: 400, maxWidth: '18rem' }}>
            Especialista en rinoplastia natural en Cali. Dedicación exclusiva a rinoplastia desde 2004. Resultados que se ven tuyos, no operados.
          </p>
          <div className="flex gap-4 mt-6">
            <a href={CONTACT.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" style={{ color: 'rgba(255,255,255,0.5)' }}><Instagram className="w-5 h-5" /></a>
            <a href={CONTACT.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" style={{ color: 'rgba(255,255,255,0.5)' }}><Facebook className="w-5 h-5" /></a>
            <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" style={{ color: 'rgba(255,255,255,0.5)' }}><MessageSquare className="w-5 h-5" /></a>
          </div>
        </div>
        <div>
          <p className="text-xs uppercase tracking-widest mb-5" style={{ color: 'rgba(255,255,255,0.35)', fontWeight: 600 }}>Navegación</p>
          <ul className="flex flex-col gap-3">
            {[
              { label: 'Inicio',          href: '/',             isRoute: true },
              { label: 'Rinoplastia',     href: '/rinoplastia',  isRoute: true },
              ...PROCEDIMIENTOS.map(p => ({ label: `· ${p.nombre}`, href: p.path, isRoute: true as const })),
              { label: 'Procedimientos',  href: '/procedimientos', isRoute: true },
              { label: 'Preguntas frecuentes', href: '/preguntas-frecuentes', isRoute: true },
              { label: 'Sobre el doctor', href: '/#doctor',      isRoute: false },
              { label: 'Testimonios',     href: '/#testimonios', isRoute: false },
              { label: 'Contacto',        href: '/#agendar',     isRoute: false },
            ].map(({ label, href, isRoute }) => (
              <li key={label}>
                {isRoute
                  ? <Link to={href} className="text-sm transition-colors"
                      style={{ color: 'rgba(255,255,255,0.55)', fontWeight: 400, textDecoration: 'none' }}
                    >{label}</Link>
                  : <a href={href} className="text-sm transition-colors"
                      style={{ color: 'rgba(255,255,255,0.55)', fontWeight: 400, textDecoration: 'none' }}
                    >{label}</a>
                }
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-xs uppercase tracking-widest mb-5" style={{ color: 'rgba(255,255,255,0.35)', fontWeight: 600 }}>Ubicación</p>
          <div className="flex gap-3">
            <MapPin className="w-4 h-4 mt-0.5 shrink-0" style={{ color: 'rgba(255,255,255,0.4)' }} />
            <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)', fontWeight: 400, wordBreak: 'break-word' }}>Avenida 4 Norte 14-38, Consultorio 302<br />Cali · Clínica de Otorrinolaringología<br />y Cirugía Plástica</p>
          </div>
        </div>
        <div>
          <p className="text-xs uppercase tracking-widest mb-5" style={{ color: 'rgba(255,255,255,0.35)', fontWeight: 600 }}>Contacto</p>
          <ul className="flex flex-col gap-3">
            <li><a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm" style={{ color: 'rgba(255,255,255,0.5)', fontWeight: 400, textDecoration: 'none' }}><MessageSquare className="w-4 h-4 shrink-0" style={{ color: 'rgba(255,255,255,0.4)' }} />{CONTACT.phoneDisplay}</a></li>
            <li><a href={`mailto:${CONTACT.email}`} className="flex items-center gap-2 text-sm" style={{ color: 'rgba(255,255,255,0.5)', fontWeight: 400, textDecoration: 'none' }}><Mail className="w-4 h-4 shrink-0" style={{ color: 'rgba(255,255,255,0.4)' }} />{CONTACT.email}</a></li>
            <li><a href={`tel:${CONTACT.phone}`} className="flex items-center gap-2 text-sm" style={{ color: 'rgba(255,255,255,0.5)', fontWeight: 400, textDecoration: 'none' }}><Phone className="w-4 h-4 shrink-0" style={{ color: 'rgba(255,255,255,0.4)' }} />{CONTACT.phoneDisplay}</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-brand text-center py-8" style={{ borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)', margin: '0 -1.5rem' }}>
        Dr. Agudelo
      </div>
      <div className="flex flex-col md:flex-row justify-between items-center gap-3 pt-8">
        <div className="flex flex-col gap-1">
          <p className="text-xs" style={{ color: 'rgba(255,255,255,0.3)', fontWeight: 400 }}>© 2026 Dr. Víctor Manuel Agudelo · Todos los derechos reservados</p>
          <p className="text-xs" style={{ color: 'rgba(255,255,255,0.2)', fontWeight: 400 }}>Las cirugías son realizadas por un médico especialista certificado. Los resultados pueden variar según cada paciente.</p>
          <a href="/privacidad" className="text-xs" style={{ color: 'rgba(255,255,255,0.25)', fontWeight: 400, textDecoration: 'none' }}>Política de Privacidad y Habeas Data</a>
        </div>
        <p className="text-xs" style={{ color: 'rgba(255,255,255,0.2)', fontWeight: 400 }}>Diseñado por Vanguard Studio</p>
      </div>
    </div>
  </footer>
)

export const WhatsAppButton = () => (
  <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer" aria-label="Contactar por WhatsApp"
    className="fixed right-4 md:right-8 bottom-6 md:bottom-8 z-50 flex items-center justify-center transition-transform duration-200 hover:scale-110"
    style={{
      borderRadius: '50%',
      background: '#25D366',
      boxShadow: '0 6px 24px rgba(37,211,102,0.45), 0 4px 20px rgba(0,0,0,0.25)',
      width: '56px',
      height: '56px',
    }}
  ><MessageSquare className="w-6 h-6" style={{ color: '#fff' }} /></a>
)
