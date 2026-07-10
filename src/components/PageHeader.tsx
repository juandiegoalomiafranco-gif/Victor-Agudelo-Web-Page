import type React from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

import { HashLink } from './HashLink'

// Header sticky compartido por las subpáginas (antes estaba copiado en cada
// una). Los estilos replican exactamente los originales; el CTA tiene las dos
// variantes que existían: verde (por defecto) y dorada (Testimonios).

const CTA_VARIANTS: Record<'green' | 'gold', React.CSSProperties> = {
  green: {
    background: '#2D4A3E', color: '#fff', borderRadius: '100px',
    padding: '0.5rem 0.875rem', fontSize: '0.72rem', fontWeight: 600,
    textDecoration: 'none', letterSpacing: '0.02em', whiteSpace: 'nowrap',
  },
  gold: {
    background: '#C9A84C', color: '#1A1A1A', borderRadius: '100px',
    padding: '0.5rem 0.95rem', fontSize: '0.72rem', fontWeight: 700,
    textDecoration: 'none', letterSpacing: '0.04em', whiteSpace: 'nowrap',
    textTransform: 'uppercase',
  },
}

interface PageHeaderProps {
  backTo?: string
  backLabel?: string
  /** Fondo del header (Testimonios usa el crema del sitio). */
  background?: string
  /** CTA derecho; omitir para no mostrarlo (ej. página 404). */
  cta?: { href: string; label: string; variant?: 'green' | 'gold' }
}

export function PageHeader({
  backTo = '/',
  backLabel = 'Volver',
  background = 'rgba(255,255,255,0.96)',
  cta,
}: PageHeaderProps) {
  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 50,
      background, backdropFilter: 'blur(16px)',
      borderBottom: '1px solid rgba(0,0,0,0.07)',
      padding: '0.75rem 1rem',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      gap: '0.5rem',
    }}>
      <Link to={backTo} aria-label={backLabel} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none', color: '#475569', fontSize: '0.875rem', fontWeight: 500, minWidth: 0 }}>
        <ArrowLeft style={{ width: 16, height: 16, flexShrink: 0 }} aria-hidden="true" />
        <span className="pageheader-backlabel" style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{backLabel}</span>
      </Link>
      <Link to="/" style={{ textDecoration: 'none', fontWeight: 700, fontSize: '1rem', color: '#1A1A1A', letterSpacing: '-0.02em', flexShrink: 0, whiteSpace: 'nowrap' }}>
        Dr. Agudelo
      </Link>
      {cta
        ? (cta.href.startsWith('/') && cta.href.includes('#')
            ? <HashLink to={cta.href} style={CTA_VARIANTS[cta.variant ?? 'green']}>{cta.label}</HashLink>
            : <a href={cta.href} style={CTA_VARIANTS[cta.variant ?? 'green']}>{cta.label}</a>)
        : <span style={{ width: 16 }} />}
    </header>
  )
}
