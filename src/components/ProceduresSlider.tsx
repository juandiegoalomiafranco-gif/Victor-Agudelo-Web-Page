import { useRef, useState } from 'react'

interface Procedure {
  title: string
  description: string
  bgColor: string
}

const PROCEDURES: Procedure[] = [
  {
    title: 'Rinoplastia',
    description:
      'Redefinimos la armonía facial mediante técnicas de precisión que mejoran la función y la estética de la nariz, preservando tu identidad natural.',
    bgColor: '#1e1e2e',
  },
  {
    title: 'Liposucción',
    description:
      'Esculpimos el contorno corporal eliminando grasa localizada resistente al ejercicio, con resultados duraderos y recuperación optimizada.',
    bgColor: '#1a2e1e',
  },
  {
    title: 'Mamoplastia de Aumento',
    description:
      'Mejoramos la forma, tamaño y simetría con implantes de alta calidad o grasa propia, adaptados a tu anatomía y deseos personales.',
    bgColor: '#2e1a2a',
  },
  {
    title: 'Cirugía Facial',
    description:
      'Ritidectomía, blefaroplastia y más. Procedimientos de rejuvenecimiento adaptados a tu anatomía única para resultados naturales.',
    bgColor: '#1e2a2e',
  },
]

export function ProceduresSlider() {
  const trackRef = useRef<HTMLDivElement>(null)
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null)

  return (
    <section
      id="procedimientos"
      className="py-20 overflow-hidden"
      style={{ background: 'var(--color-2)' }}
    >
      {/* Header */}
      <div className="px-6 md:px-12 mb-10">
        <div className="flex items-end justify-between gap-6 flex-wrap mb-6">
          <h2
            className="text-3xl md:text-4xl leading-tight max-w-xl"
            style={{ color: 'var(--color-1)', fontWeight: 700 }}
          >
            Procedimientos
          </h2>
          <div
            className="flex items-center gap-2 text-sm tabular-nums"
            style={{ color: 'var(--color-12)', fontWeight: 400 }}
          >
            <span>04 Procedimientos</span>
          </div>
        </div>
      </div>

      {/* Infinite scroll carousel */}
      <div
        style={{ overflow: 'hidden', width: '100%', paddingBottom: '1rem' }}
        onMouseEnter={() => {
          if (trackRef.current) trackRef.current.style.animationPlayState = 'paused'
        }}
        onMouseLeave={() => {
          if (trackRef.current) trackRef.current.style.animationPlayState = 'running'
        }}
      >
        <div
          ref={trackRef}
          style={{
            display: 'flex',
            gap: '16px',
            width: 'max-content',
            paddingLeft: '1.5rem',
            animation: 'proceduresScroll 20s linear infinite',
          }}
        >
          {[...PROCEDURES, ...PROCEDURES].map((proc, i) => {
            const activeKey = i % PROCEDURES.length
            const isActive = hoveredIdx === activeKey
            return (
              <div
                key={i}
                className={`slide-card${isActive ? ' is-active-card' : ''}`}
                style={{ width: 'clamp(240px, 28vw, 320px)', flexShrink: 0 }}
                onMouseEnter={() => setHoveredIdx(activeKey)}
                onMouseLeave={() => setHoveredIdx(null)}
              >
                {/* Image area */}
                <div
                  className="w-full relative overflow-hidden"
                  style={{ borderRadius: '16px', aspectRatio: '3/4', background: proc.bgColor }}
                >
                  <div
                    className="absolute inset-0"
                    style={{
                      background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%)',
                    }}
                  />
                  <div className="absolute bottom-5 left-5 right-5">
                    <span
                      className="text-xl"
                      style={{ color: 'var(--color-4)', fontWeight: 700, fontFamily: 'var(--font-serif)' }}
                    >
                      {proc.title}
                    </span>
                  </div>
                </div>

                {/* Info box */}
                <div className="module_box">
                  <p
                    className="text-[10px] uppercase tracking-[0.18em] mb-2"
                    style={{ color: 'var(--color-12)', fontWeight: 400 }}
                  >
                    Module Overview
                  </p>
                  <p
                    className="text-sm leading-relaxed mb-4"
                    style={{ color: 'var(--color-10)', fontWeight: 400 }}
                  >
                    {proc.description}
                  </p>
                  <a
                    href="#agendar"
                    className="text-sm"
                    style={{ color: 'var(--color-1)', fontWeight: 600, textDecoration: 'none' }}
                  >
                    Explorar Procedimiento →
                  </a>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
