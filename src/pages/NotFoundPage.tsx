import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, ChevronRight } from 'lucide-react'

// 404 genérica para rutas desconocidas (catch-all del Router).
// Marca noindex en cliente; las rutas válidas se prerenderizan aparte.
export function NotFoundPage() {
  useEffect(() => {
    const meta = document.createElement('meta')
    meta.setAttribute('name', 'robots')
    meta.setAttribute('content', 'noindex, follow')
    document.head.appendChild(meta)
    return () => meta.remove()
  }, [])

  return (
    <div style={{ minHeight: '100vh', background: '#fff', display: 'flex', flexDirection: 'column', fontFamily: 'var(--font-sans, DM Sans, sans-serif)' }}>
      <header style={{
        position: 'sticky', top: 0, zIndex: 50,
        background: 'rgba(255,255,255,0.96)', backdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(0,0,0,0.07)',
        padding: '0.75rem 1rem',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        gap: '0.5rem',
      }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none', color: '#475569', fontSize: '0.875rem', fontWeight: 500 }}>
          <ArrowLeft style={{ width: 16, height: 16 }} /> Volver al inicio
        </Link>
        <Link to="/" style={{ textDecoration: 'none', fontWeight: 700, fontSize: '1rem', color: '#1A1A1A', letterSpacing: '-0.02em' }}>
          Dr. Agudelo
        </Link>
        <span style={{ width: 16 }} />
      </header>

      <main style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '4rem 1.5rem', textAlign: 'center' }}>
        <div style={{ maxWidth: '32rem' }}>
          <p style={{ fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#94a3b8', marginBottom: '1rem' }}>
            Error 404
          </p>
          <h1 style={{ fontFamily: 'var(--font-serif, Cormorant Garamond, Georgia, serif)', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 600, color: '#1A1A1A', letterSpacing: '-0.025em', lineHeight: 1.1, marginBottom: '1rem' }}>
            Esta página no existe
          </h1>
          <p style={{ color: '#475569', fontSize: '1rem', lineHeight: 1.7, marginBottom: '2rem' }}>
            Es posible que el enlace haya cambiado o esté mal escrito. Vuelve al inicio para encontrar lo que buscas.
          </p>
          <Link to="/" style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            background: '#2D4A3E', color: '#fff', borderRadius: '100px',
            padding: '0.85rem 1.5rem', fontSize: '0.9rem', fontWeight: 600,
            textDecoration: 'none',
          }}>
            <ChevronRight style={{ width: 16, height: 16 }} /> Ir al inicio
          </Link>
        </div>
      </main>
    </div>
  )
}
