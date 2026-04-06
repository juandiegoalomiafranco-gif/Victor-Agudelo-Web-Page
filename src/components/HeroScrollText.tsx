// src/components/HeroScrollText.tsx

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SplitType from 'split-type'

// Register at module level — critical for bug fix
gsap.registerPlugin(ScrollTrigger)

const TEXT_BLOCKS = [
  'Elegir un cirujano plástico es una de las decisiones más importantes de tu vida.',
  'Miles de pacientes llegaron con las mismas dudas que tú tienes ahora...',
  '¿Y si encontraras al especialista que te guía con honestidad, desde la primera consulta hasta el resultado final?',
]

const PILLS = ['Inseguro', 'Confundido', 'Nervioso', 'Dudoso', 'Perdido', 'Ansioso']

export function HeroScrollText() {
  const sectionRef  = useRef<HTMLDivElement>(null)
  const pinnedRef   = useRef<HTMLDivElement>(null)
  const textRefs    = useRef<(HTMLDivElement | null)[]>([])
  const pillRefs    = useRef<(HTMLDivElement | null)[]>([])
  const loaderRefs  = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const section = sectionRef.current
    const pinned  = pinnedRef.current
    if (!section || !pinned) return

    let splits: (SplitType | null)[] = []
    let master: gsap.core.Timeline

    // Delay to ensure DOM + fonts are ready
    const initTimer = setTimeout(() => {
      splits = textRefs.current.map(el => {
        if (!el) return null
        const split = new SplitType(el, { types: 'lines', tagName: 'div' })
        gsap.set(el, { opacity: 1 })
        return split
      })

      master = gsap.timeline({
        scrollTrigger: {
          trigger: section,       // outer — provides scroll height
          start: 'top top',
          end: '+=4000',
          scrub: true,
          pin: pinned,            // inner — gets pinned
        },
      })

      const BLUR_IN  = 'blur(18px)'
      const BLUR_OUT = 'blur(14px)'

      const add3DEffect = (
        el: HTMLDivElement | null,
        loader: HTMLDivElement | null
      ) => {
        if (!el) return
        const lines = el.querySelectorAll('.line')

        master.to(el, { opacity: 1, y: 0, duration: 0.2, ease: 'none' })
        master.fromTo(
          lines,
          { opacity: 0, yPercent: 50, z: -200, rotateX: 10,  filter: BLUR_IN  },
          { opacity: 1, yPercent: 0,  z: 0,    rotateX: 0,   filter: 'blur(0px)',
            duration: 2, stagger: 0.08, ease: 'power3.out' },
          '<'
        )
        if (loader) {
          master.fromTo(
            loader,
            { width: '0%' },
            { width: '100%', ease: 'none', duration: 2 },
            '<'
          )
        }
        master.to(
          lines,
          { opacity: 0, yPercent: -50, z: -300, rotateX: -12, filter: BLUR_OUT,
            duration: 2, stagger: 0.08, ease: 'power3.in' },
          '>0.5'
        )
        master.to(el, { opacity: 0, y: -20, duration: 0.2, ease: 'none' })
      }

      // Block 1
      add3DEffect(textRefs.current[0], loaderRefs.current[0])

      // Block 2
      add3DEffect(textRefs.current[1], loaderRefs.current[1])

      // Word cloud pills
      const p = pillRefs.current
      master
        .fromTo([p[2], p[3]],
          { opacity: 0, y: 20, filter: BLUR_IN },
          { opacity: 1, y: 0,  filter: 'blur(0px)', duration: 0.4, ease: 'power3.out' })
        .fromTo([p[1], p[4]],
          { opacity: 0, y: 20, filter: BLUR_IN },
          { opacity: 1, y: 0,  filter: 'blur(0px)', duration: 0.4, ease: 'power3.out' },
          '>0.2')
        .fromTo([p[0], p[5]],
          { opacity: 0, y: 20, filter: BLUR_IN },
          { opacity: 1, y: 0,  filter: 'blur(0px)', duration: 0.4, ease: 'power3.out' },
          '>0.2')
        .to([p[0], p[5]], { opacity: 0, y: -20, filter: BLUR_OUT, duration: 0.3, ease: 'power3.in' })
        .to([p[1], p[4]], { opacity: 0, y: -20, filter: BLUR_OUT, duration: 0.3, ease: 'power3.in' }, '>0.15')
        .to([p[2], p[3]], { opacity: 0, y: -20, filter: BLUR_OUT, duration: 0.3, ease: 'power3.in' }, '>0.15')

      // Block 3
      add3DEffect(textRefs.current[2], loaderRefs.current[2])

    }, 100)

    return () => {
      clearTimeout(initTimer)
      if (master) master.kill()
      ScrollTrigger.getAll().forEach(t => t.kill())
      splits.forEach(s => s?.revert())
    }
  }, [])

  return (
    <div ref={sectionRef} style={{ height: '4000px' }}>
      <div
        ref={pinnedRef}
        style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden' }}
        className="flex items-center justify-center bg-[#0a0a0a]"
      >
        {/* Background overlay */}
        <div className="absolute inset-0 bg-black/82 z-0" />

        {/* Left progress loaders */}
        <div className="absolute left-10 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-[10px]">
          {[0, 1, 2].map(i => (
            <div key={i} className="relative" style={{ width: '48px', height: '1.5px', background: 'rgba(255,255,255,0.15)' }}>
              <div
                ref={el => { loaderRefs.current[i] = el }}
                style={{ position: 'absolute', inset: 0, width: '0%', background: 'rgba(255,255,255,0.9)' }}
              />
            </div>
          ))}
        </div>

        {/* Text blocks */}
        {TEXT_BLOCKS.map((text, i) => (
          <div
            key={i}
            ref={el => { textRefs.current[i] = el }}
            className="absolute z-20 w-full max-w-3xl px-16 text-center opacity-0"
            style={{ perspective: '1000px', transform: 'translateY(20px)' }}
          >
            <p
              className="text-white font-light"
              style={{
                fontSize: 'clamp(1.8rem, 4vw, 3.2rem)',
                lineHeight: 1.3,
                letterSpacing: '-0.02em',
                transformStyle: 'preserve-3d',
              }}
            >
              {text}
            </p>
          </div>
        ))}

        {/* Word cloud pills */}
        <div className="absolute z-20 flex flex-wrap gap-3 justify-center max-w-lg px-8">
          {PILLS.map((word, i) => (
            <div
              key={i}
              ref={el => { pillRefs.current[i] = el }}
              className="opacity-0"
              style={{
                border: '1px solid rgba(255,255,255,0.2)',
                background: 'rgba(255,255,255,0.06)',
                padding: '10px 24px',
                borderRadius: '999px',
                fontSize: '0.9rem',
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
