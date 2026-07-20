import { useEffect, useState } from 'react'
import { HERO_PHOTO_URL } from '../../lib/assets'

// Hero replicado 1:1 de rejuv-health.com (estructura + animación sticky pura).
// Copies adaptados a Dr. Víctor Agudelo. Fondo: retrato B/N a pantalla completa
// con overlay oscuro; columnas con color placeholder hasta tener las fotos reales.

const FLOATING_TITLES = [
  'Dr. Víctor Agudelo',
  'Cali, Colombia',
  'Cirugía Plástica Facial y Rinoplastia',
] as const

// Placeholders de color para las 3 columnas (reemplazar por <img>/<video> luego)
const COLUMN_PLACEHOLDERS = [
  { bg: '#2D4A3E', label: 'Retrato' },
  { bg: '#3D5249', label: 'Consulta' },
  { bg: '#243730', label: 'Resultados' },
] as const

export const StickyNarrativeSection = () => {
  const [ready, setReady] = useState(false)

  // Entrada del headline: line1 entra desde -40px, line2 desde +40px (1s ease-in-out),
  // igual que rejuv. Espera a que las fuentes carguen para evitar FOUT.
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setReady(true)
      return
    }
    let cancelled = false
    let timeoutId: ReturnType<typeof setTimeout>
    const start = () => {
      requestAnimationFrame(() =>
        requestAnimationFrame(() => { if (!cancelled) setReady(true) })
      )
    }
    // Red de seguridad: si document.fonts.ready nunca resuelve (navegadores
    // in-app rotos), no dejamos el headline invisible para siempre.
    const fontsReady = document.fonts?.ready ?? Promise.resolve()
    const timeout = new Promise<void>((resolve) => { timeoutId = setTimeout(resolve, 2500) })
    Promise.race([fontsReady, timeout]).then(start)
    return () => { cancelled = true; clearTimeout(timeoutId) }
  }, [])

  return (
    <section
      id="inicio"
      className={`vha-hero${ready ? ' is-ready' : ''}`}
    >
      {/* ── Fondo: retrato B/N a pantalla completa + overlay oscuro ── */}
      <div
        className="vha-hero__bgphoto"
        aria-hidden="true"
        style={{
          backgroundImage:
            `linear-gradient(180deg, rgba(15,15,15,0.55) 0%, rgba(15,15,15,0.38) 42%, rgba(15,15,15,0.68) 100%), url('${HERO_PHOTO_URL}')`,
        }}
      />

      {/* ── Banner: intro copy + headline en 2 líneas ── */}
      <div className="vha-hero__banner">
        <div className="vha-hero__row">
          <div className="vha-hero__inner">
            <p className="vha-hero__intro">
              El Dr. Víctor Agudelo ha redefinido la cirugía facial con un enfoque
              en la <span className="vha-hero__bold">armonía y proporción natural</span> del
              rostro, uniendo precisión quirúrgica y una visión estética
              personalizada para cada paciente.
            </p>
            <div className="vha-hero__content">
              <p>
                <span className="line1">Cirugía diseñada para</span>
                <span className="line2">tu armonía facial</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Títulos flotantes (sticky abajo, por encima de las columnas) ── */}
      <h1 className="vha-hero__titles">
        {FLOATING_TITLES.map((t) => (
          <span key={t} className="vha-hero__title">{t}</span>
        ))}
      </h1>

      {/* ── Columnas que suben escalonadas + bloque blanco que crece ── */}
      <div className="vha-hero__columns">
        <div className="vha-hero__cols">
          {COLUMN_PLACEHOLDERS.map((c) => (
            <div className="vha-hero__col" key={c.label}>
              <div className="vha-hero__media" style={{ background: c.bg }}>
                <span className="vha-hero__media-label">{c.label}</span>
              </div>
            </div>
          ))}
          <div className="vha-hero__bg" />
        </div>
      </div>
    </section>
  )
}
