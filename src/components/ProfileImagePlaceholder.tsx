import { Camera } from 'lucide-react'

interface ProfileImagePlaceholderProps {
  style?: React.CSSProperties
  className?: string
}

export function ProfileImagePlaceholder({ style, className }: ProfileImagePlaceholderProps) {
  return (
    <div
      className={className}
      style={{
        borderRadius: '20px',
        overflow: 'hidden',
        aspectRatio: '3/4',
        minHeight: '320px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.75rem',
        background: '#E8E2DA',
        backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.06) 1px, transparent 1px)',
        backgroundSize: '18px 18px',
        ...style,
      }}
    >
      <Camera style={{ width: '28px', height: '28px', color: '#94a3b8' }} />
      <p style={{
        color: '#94a3b8',
        fontSize: '0.78rem',
        fontWeight: 500,
        textAlign: 'center',
        lineHeight: 1.5,
        maxWidth: '160px',
      }}>
        Foto profesional<br />próximamente
      </p>
    </div>
  )
}
