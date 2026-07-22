// Logo tipográfico del Dr. Víctor Manuel Agudelo:
//   DR.  VICTOR            MD.
//        [Manuel Agudelo]
// Recreado en texto/CSS (no imagen) para que escale nítido y pueda invertir
// sus colores sobre las fases oscuras del Navbar.

interface BrandLogoProps {
  /** true cuando el logo está sobre fondo oscuro (hero, dark-glass, overlay móvil). */
  onDark: boolean
  /** Tamaño base; todo el lockup escala proporcionalmente con em. */
  fontSize?: string
}

export function BrandLogo({ onDark, fontSize = '0.95rem' }: BrandLogoProps) {
  const main    = onDark ? '#ffffff' : '#1A1A1A'
  const side    = onDark ? 'rgba(255,255,255,0.38)' : 'rgba(26,26,26,0.28)'
  const barText = onDark ? '#1A1A1A' : '#ffffff'

  return (
    <span
      aria-label="Dr. Víctor Manuel Agudelo, MD"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.28em',
        fontSize,
        lineHeight: 1,
        whiteSpace: 'nowrap',
        transition: 'color 0.55s ease',
      }}
    >
      <span style={{ color: side, fontWeight: 300, fontSize: '1.5em', letterSpacing: '0.02em', transition: 'color 0.55s ease' }}>
        DR.
      </span>
      <span style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'stretch' }}>
        <span style={{ color: main, fontWeight: 600, fontSize: '1em', letterSpacing: '0.14em', textAlign: 'center', transition: 'color 0.55s ease' }}>
          VICTOR
        </span>
        <span
          style={{
            background: main,
            color: barText,
            fontWeight: 500,
            fontSize: '0.5em',
            letterSpacing: '0.03em',
            padding: '0.22em 0.35em 0.28em',
            marginTop: '0.18em',
            textAlign: 'center',
            transition: 'background 0.55s ease, color 0.55s ease',
          }}
        >
          Manuel Agudelo
        </span>
      </span>
      <span style={{ color: side, fontWeight: 300, fontSize: '1.5em', letterSpacing: '0.02em', transition: 'color 0.55s ease' }}>
        MD.
      </span>
    </span>
  )
}
