import { useEffect, useRef } from 'react'
import Splide from '@splidejs/splide'
import '@splidejs/splide/dist/css/splide-core.min.css'

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
]

export function ProceduresSlider() {
  const splideRef   = useRef<HTMLDivElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  const splideInst  = useRef<Splide | null>(null)

  useEffect(() => {
    const el = splideRef.current
    if (!el) return

    const splide = new Splide(el, {
      perPage: 3.5,
      perMove: 1,
      focus: 0,
      type: 'slide',
      gap: '16px',
      arrows: false,
      pagination: false,
      speed: 800,
      dragAngleThreshold: 60,
      rewind: false,
      trimSpace: false,
      breakpoints: {
        991: { perPage: 2, gap: '12px' },
        767: { perPage: 1, gap: '8px' },
      },
    })

    const updateState = () => {
      const bar        = progressRef.current
      const controller = splide.Components.Controller
      if (!controller) return

      const end      = controller.getEnd()
      const index    = controller.getIndex()
      const progress = end <= 0 ? 100 : Math.min(Math.max(index / end, 0), 1) * 100
      if (bar) bar.style.width = `${progress}%`

      // Toggle active class on slide-card wrappers
      el.querySelectorAll<HTMLElement>('.slide-card').forEach((card, i) => {
        card.classList.toggle('is-active-card', i === index)
      })
    }

    splide.on('mounted move resize updated', updateState)
    splide.mount()
    updateState()
    splideInst.current = splide

    return () => {
      splide.destroy()
      splideInst.current = null
    }
  }, [])

  return (
    <section
      className="py-20 overflow-hidden"
      style={{ background: 'var(--color-2)' }}
    >
      {/* Section header */}
      <div className="px-6 md:px-12 mb-10 flex items-start justify-between gap-6 flex-wrap">
        <h2
          className="text-3xl md:text-4xl leading-tight max-w-xl"
          style={{ color: 'var(--color-1)', fontWeight: 700 }}
        >
          Procedimientos especializados con los más altos estándares de seguridad y resultados.
        </h2>
        <a
          href="#agendar"
          className="shrink-0 flex items-center gap-2 text-sm transition-colors"
          style={{
            border: '1px solid var(--color-11)',
            borderRadius: '100px',
            padding: '0.625rem 1.25rem',
            fontWeight: 500,
            color: 'var(--color-1)',
            textDecoration: 'none',
          }}
          onMouseEnter={e => {
            const t = e.currentTarget as HTMLAnchorElement
            t.style.background = 'var(--color-1)'
            t.style.color = 'var(--color-4)'
          }}
          onMouseLeave={e => {
            const t = e.currentTarget as HTMLAnchorElement
            t.style.background = 'transparent'
            t.style.color = 'var(--color-1)'
          }}
        >
          Ver todos los procedimientos →
        </a>
      </div>

      {/* Splide carousel */}
      <div ref={splideRef} className="splide px-6 md:px-12">
        <div className="splide__track">
          <ul className="splide__list">
            {PROCEDURES.map((proc, i) => (
              <li key={i} className="splide__slide">
                <div className="slide-card">
                  {/* Image placeholder */}
                  <div
                    className="w-full relative overflow-hidden"
                    style={{ borderRadius: '16px', aspectRatio: '3/4', background: proc.bgColor }}
                  >
                    {/* Title overlay */}
                    <div
                      className="absolute inset-0"
                      style={{
                        background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%)',
                      }}
                    />
                    <div className="absolute bottom-5 left-5 right-5">
                      <span
                        className="text-xl"
                        style={{ color: 'var(--color-4)', fontWeight: 700 }}
                      >
                        {proc.title}
                      </span>
                    </div>
                  </div>

                  {/* Info box — slides up when active */}
                  <div className="module_box">
                    <p
                      className="text-[10px] uppercase tracking-[0.18em] mb-2"
                      style={{ color: 'var(--color-12)', fontWeight: 400 }}
                    >
                      Descripción
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
                      style={{
                        color: 'var(--color-1)',
                        fontWeight: 600,
                        textDecoration: 'underline',
                        textUnderlineOffset: '4px',
                      }}
                    >
                      Agendar consulta →
                    </a>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Progress bar */}
      <div className="mx-6 md:mx-12 mt-5 slider-progress">
        <div ref={progressRef} className="slider-progress-bar" />
      </div>
    </section>
  )
}
