import { useEffect, useRef, useState } from 'react'
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
  {
    title: 'Cirugía Facial',
    description:
      'Ritidectomía, blefaroplastia y más. Procedimientos de rejuvenecimiento adaptados a tu anatomía única para resultados naturales.',
    bgColor: '#1e2a2e',
  },
]

export function ProceduresSlider() {
  const splideRef    = useRef<HTMLDivElement>(null)
  const progressRef  = useRef<HTMLDivElement>(null)
  const splideInst   = useRef<Splide | null>(null)
  const autoplayRef  = useRef<ReturnType<typeof setInterval> | null>(null)
  const [activeIdx, setActiveIdx] = useState(0)

  const startAutoplay = () => {
    stopAutoplay()
    autoplayRef.current = setInterval(() => {
      const s = splideInst.current
      if (!s) return
      const end = s.Components.Controller.getEnd()
      const cur = s.Components.Controller.getIndex()
      s.go(cur >= end ? 0 : cur + 1)
    }, 4000)
  }

  const stopAutoplay = () => {
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current)
      autoplayRef.current = null
    }
  }

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
      rewind: true,
      trimSpace: false,
      breakpoints: {
        991: { perPage: 2, gap: '12px' },
        767: { perPage: 1.2, gap: '8px' },
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

      setActiveIdx(index)

      el.querySelectorAll<HTMLElement>('.slide-card').forEach((card, i) => {
        card.classList.toggle('is-active-card', i === index)
      })
    }

    splide.on('mounted move resize updated', updateState)
    splide.mount()
    updateState()
    splideInst.current = splide
    startAutoplay()

    return () => {
      stopAutoplay()
      splide.destroy()
      splideInst.current = null
    }
  }, [])

  return (
    <section
      id="procedimientos"
      className="py-20 overflow-hidden"
      style={{ background: 'var(--color-2)' }}
    >
      {/* Header with progress indicator */}
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
            <span
              key={activeIdx}
              style={{
                display: 'inline-block',
                animation: 'slideNum 0.35s cubic-bezier(0.22,1,0.36,1) both',
              }}
            >
              {activeIdx + 1}
            </span>
            <span>/</span>
            <span>{PROCEDURES.length} Procedimientos</span>
          </div>
        </div>
        {/* Top progress bar */}
        <div style={{ height: '2px', background: 'rgba(0,0,0,0.08)', borderRadius: '4px', overflow: 'hidden' }}>
          <div
            ref={progressRef}
            style={{
              height: '100%',
              width: '0%',
              background: 'var(--color-1)',
              borderRadius: '4px',
              transition: 'width 600ms ease',
            }}
          />
        </div>
      </div>

      {/* Splide carousel */}
      <div
        ref={splideRef}
        className="splide px-6 md:px-12"
        onMouseEnter={stopAutoplay}
        onMouseLeave={startAutoplay}
      >
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
                      style={{
                        color: 'var(--color-1)',
                        fontWeight: 600,
                        textDecoration: 'none',
                      }}
                    >
                      Explorar Procedimiento →
                    </a>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <style>{`
        @keyframes slideNum {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  )
}
