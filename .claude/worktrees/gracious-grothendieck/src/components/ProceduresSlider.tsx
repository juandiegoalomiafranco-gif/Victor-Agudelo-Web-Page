import { useRef, useState } from 'react'

interface Procedure {
  title: string
  description: string
  bgColor: string
}

const PROCEDURES: Procedure[] = [
  {
    title: 'Rinoplastia Estética',
    description:
      'Modificamos forma, tamaño y proporciones para que el resultado armonice con tu rostro. Técnica Estructural con ultrasonido piezoeléctrico para mayor precisión y menor trauma óseo.',
    bgColor: '#1e1e2e',
  },
  {
    title: 'Rinoplastia Afrolatina',
    description:
      'Técnica especializada para narices con características afrolatinas, preservando la identidad del paciente y logrando resultados naturales. Un procedimiento que pocos especialistas en Cali ofrecen.',
    bgColor: '#1a2e1e',
  },
  {
    title: 'Rinoplastia Secundaria',
    description:
      'Para pacientes que tuvieron una cirugía previa y no quedaron satisfechos. Corrección de deformidades, asimetrías o problemas funcionales. Procedimiento de alta complejidad.',
    bgColor: '#2e1a1a',
  },
  {
    title: 'Mentoplastia',
    description:
      'Modificación del mentón para mejorar el perfil facial. Frecuentemente combinada con rinoplastia para lograr un equilibrio facial total.',
    bgColor: '#1e2a2e',
  },
  {
    title: 'Otoplastia',
    description:
      'Corrección de la forma o posición de las orejas. Procedimiento con alta satisfacción y resultados definitivos.',
    bgColor: '#2a1e2e',
  },
  {
    title: 'Blefaroplastia',
    description:
      'Cirugía de párpados superiores e inferiores para rejuvenecer la mirada, eliminar bolsas y exceso de piel con un aspecto natural.',
    bgColor: '#1e2a1e',
  },
  {
    title: 'Reducción de Papada con Láser',
    description:
      'Contorno facial con tecnología láser. Sin cirugía, mínima recuperación.',
    bgColor: '#2e2a1e',
  },
  {
    title: 'Toxina Botulínica · Ácido Hialurónico · Láser CO2',
    description:
      'Tratamientos de rejuvenecimiento sin cirugía para complementar o mantener los resultados de procedimientos más complejos.',
    bgColor: '#1a1e2e',
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
            <span>08 Procedimientos</span>
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
            animation: 'proceduresScroll 34s linear infinite',
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
