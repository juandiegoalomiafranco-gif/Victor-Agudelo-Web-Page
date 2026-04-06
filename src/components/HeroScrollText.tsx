// src/components/HeroScrollText.tsx
import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const TEXT_BLOCKS = [
  {
    lines: [
      'Elegir un cirujano plástico',
      'es una de las decisiones',
      'más importantes de tu vida.',
    ],
  },
  {
    lines: [
      'Miles de pacientes llegaron',
      'con las mismas dudas',
      'que tú tienes ahora...',
    ],
  },
  {
    lines: [
      '¿Y si encontraras al especialista',
      'que te guía con honestidad,',
      'desde la primera consulta',
      'hasta el resultado final?',
    ],
  },
]

const PILLS = ['Inseguro', 'Confundido', 'Nervioso', 'Dudoso', 'Perdido', 'Ansioso']

export function HeroScrollText() {
  const outerRef   = useRef<HTMLDivElement>(null)
  const innerRef   = useRef<HTMLDivElement>(null)
  const textRefs   = useRef<(HTMLDivElement | null)[]>([])
  const pillRefs   = useRef<(HTMLDivElement | null)[]>([])
  const loaderRefs = useRef<(HTMLDivElement | null)[]>([])

  useLayoutEffect(() => {
    const outer = outerRef.current
    const inner = innerRef.current
    if (!outer || !inner) return

    const ctx = gsap.context(() => {
      const BLUR_IN  = 'blur(18px)'
      const BLUR_OUT = 'blur(14px)'

      const master = gsap.timeline({
        scrollTrigger: {
          trigger: outer,
          start: 'top top',
          end: '+=4000',
          scrub: 1.2,
          pin: inner,
        },
      })

      const addBlock = (el: HTMLDivElement | null, loader: HTMLDivElement | null) => {
        if (!el) return
        const lines = el.querySelectorAll('.narrative-line')

        master.to(el, { opacity: 1, duration: 0.1, ease: 'none' })
        master.fromTo(
          lines,
          { opacity: 0, yPercent: 50, z: -200, rotateX: 10, filter: BLUR_IN },
          { opacity: 1, yPercent: 0,  z: 0,    rotateX: 0,  filter: 'blur(0px)',
            duration: 2, stagger: 0.08, ease: 'power3.out' },
          '<'
        )
        if (loader) {
          master.fromTo(
            loader,
            { scaleX: 0 },
            { scaleX: 1, ease: 'none', duration: 2, transformOrigin: 'left center' },
            '<'
          )
        }
        master.to(
          lines,
          { opacity: 0, yPercent: -50, z: -300, rotateX: -12, filter: BLUR_OUT,
            duration: 2, stagger: 0.08, ease: 'power3.in' },
          '>0.5'
        )
        master.to(el, { opacity: 0, duration: 0.1, ease: 'none' })
      }

      addBlock(textRefs.current[0], loaderRefs.current[0])
      addBlock(textRefs.current[1], loaderRefs.current[1])

      // Word cloud pills
      const p = pillRefs.current
      master
        .fromTo([p[2], p[3]],
          { opacity: 0, y: 20, filter: BLUR_IN },
          { opacity: 1, y: 0,  filter: 'blur(0px)', duration: 0.4, ease: 'power3.out' })
        .fromTo([p[1], p[4]],
          { opacity: 0, y: 20, filter: BLUR_IN },
          { opacity: 1, y: 0,  filter: 'blur(0px)', duration: 0.4, ease: 'power3.out' }, '>0.2')
        .fromTo([p[0], p[5]],
          { opacity: 0, y: 20, filter: BLUR_IN },
          { opacity: 1, y: 0,  filter: 'blur(0px)', duration: 0.4, ease: 'power3.out' }, '>0.2')
        .to([p[0], p[5]], { opacity: 0, y: -20, filter: BLUR_OUT, duration: 0.3, ease: 'power3.in' })
        .to([p[1], p[4]], { opacity: 0, y: -20, filter: BLUR_OUT, duration: 0.3, ease: 'power3.in' }, '>0.15')
        .to([p[2], p[3]], { opacity: 0, y: -20, filter: BLUR_OUT, duration: 0.3, ease: 'power3.in' }, '>0.15')

      addBlock(textRefs.current[2], loaderRefs.current[2])

    }, outerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={outerRef} style={{ height: '400vh', position: 'relative', zIndex: 2 }}>
      <div
        ref={innerRef}
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          overflow: 'hidden',
          background: 'radial-gradient(ellipse at 50% 60%, #0d1a2d 0%, #060606 65%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Progress bars - bottom */}
        <div style={{
          position: 'absolute',
          bottom: '3rem',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: '8px',
          zIndex: 20,
        }}>
          {[0, 1, 2].map(i => (
            <div key={i} style={{ width: '48px', height: '2px', background: 'rgba(255,255,255,0.12)', borderRadius: '4px', overflow: 'hidden' }}>
              <div
                ref={el => { loaderRefs.current[i] = el }}
                style={{ width: '100%', height: '100%', background: 'rgba(255,255,255,0.85)', transformOrigin: 'left center', transform: 'scaleX(0)' }}
              />
            </div>
          ))}
        </div>

        {/* Text blocks */}
        {TEXT_BLOCKS.map((block, i) => (
          <div
            key={i}
            ref={el => { textRefs.current[i] = el }}
            style={{
              position: 'absolute',
              zIndex: 20,
              width: '100%',
              maxWidth: '52rem',
              padding: '0 2rem',
              textAlign: 'center',
              opacity: 0,
              perspective: '1200px',
              transformStyle: 'preserve-3d',
            }}
          >
            {block.lines.map((line, j) => (
              <div
                key={j}
                className="narrative-line"
                style={{
                  display: 'block',
                  textAlign: 'center',
                  transformStyle: 'preserve-3d',
                  backfaceVisibility: 'hidden',
                  willChange: 'transform, opacity, filter',
                  fontSize: 'clamp(1.75rem, 4vw, 3.2rem)',
                  lineHeight: 1.15,
                  fontWeight: 500,
                  color: '#ffffff',
                  letterSpacing: '-0.02em',
                }}
              >
                {line}
              </div>
            ))}
          </div>
        ))}

        {/* Word cloud pills */}
        <div style={{
          position: 'absolute',
          zIndex: 20,
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.75rem',
          justifyContent: 'center',
          maxWidth: '36rem',
          padding: '0 2rem',
        }}>
          {PILLS.map((word, i) => (
            <div
              key={i}
              ref={el => { pillRefs.current[i] = el }}
              style={{
                opacity: 0,
                border: '1px solid rgba(255,255,255,0.2)',
                background: 'rgba(255,255,255,0.06)',
                padding: '10px 24px',
                borderRadius: '999px',
                fontSize: '0.875rem',
                letterSpacing: '0.04em',
                color: 'rgba(255,255,255,0.85)',
              }}
            >
              {word}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
