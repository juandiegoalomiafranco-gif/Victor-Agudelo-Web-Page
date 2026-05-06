import { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform, type MotionValue } from 'motion/react'

interface Step {
  number: string
  title: string
  description: string
  featured?: boolean
}

interface StepsStaggerProps {
  steps: Step[]
}

const EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94]

function usePrefersReducedMotion() {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function useScrollInView(ref: React.RefObject<HTMLElement | null>, margin = '-15% 0px') {
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); obs.disconnect() } },
      { rootMargin: margin }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return inView
}

function useIsDesktop() {
  const [desktop, setDesktop] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth >= 768 : true
  )
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)')
    const fn = (e: MediaQueryListEvent) => setDesktop(e.matches)
    mq.addEventListener('change', fn)
    return () => mq.removeEventListener('change', fn)
  }, [])
  return desktop
}

// ── Desktop step
function DesktopStep({
  step, index, isOdd, onDotRef, scrollYProgress, threshold,
}: {
  step: Step
  index: number
  isOdd: boolean
  onDotRef: (el: HTMLDivElement | null) => void
  scrollYProgress: MotionValue<number>
  threshold: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useScrollInView(ref as React.RefObject<HTMLElement>)
  const reduced = usePrefersReducedMotion()

  // Activation window: dot lights up just before the line passes through it.
  const fadeStart = Math.max(0, threshold - 0.06)
  const active = useTransform(scrollYProgress, [fadeStart, threshold], [0, 1])
  const dotBg          = useTransform(active, [0, 1], ['#FAF7F2', '#2D4A3E'])
  const dotBorderColor = useTransform(active, [0, 1], ['rgba(45,74,62,0.45)', '#2D4A3E'])
  const dotOpacity     = useTransform(active, [0, 1], [0.55, 1])
  const dotShadow      = useTransform(active, [0, 1], ['0 0 0 0px rgba(45,74,62,0)', '0 0 0 5px rgba(45,74,62,0.18)'])
  const titleColor       = useTransform(active, [0, 1], ['rgba(26,26,26,0.55)', '#1A1A1A'])
  const descColor        = useTransform(active, [0, 1], ['rgba(0,0,0,0.28)', 'rgba(0,0,0,0.48)'])
  const numberColor      = useTransform(active, [0, 1], ['rgba(45,74,62,0.30)', 'rgba(45,74,62,0.55)'])

  const cardStyle: React.CSSProperties = {
    width: '100%',
    textAlign: isOdd ? 'right' : 'left',
    paddingLeft: isOdd ? 0 : 'clamp(1.25rem, 2.5vw, 2rem)',
    paddingRight: isOdd ? 'clamp(1.25rem, 2.5vw, 2rem)' : 0,
  }

  const card = (
    <div style={cardStyle}>
      <motion.p
        aria-hidden="true"
        style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '0.68rem',
          fontWeight: 400,
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
          color: numberColor,
          marginBottom: '0.5rem',
        }}
      >
        {step.number}
      </motion.p>
      <motion.h3
        style={{
          fontFamily: 'var(--font-serif)',
          fontSize: step.featured ? 'clamp(1.6rem, 2.8vw, 2.2rem)' : 'clamp(1.3rem, 2.2vw, 1.8rem)',
          fontWeight: 600,
          color: titleColor,
          letterSpacing: '-0.02em',
          lineHeight: 1.15,
          marginBottom: '0.625rem',
        }}
      >
        {step.title}
      </motion.h3>
      <motion.p
        style={{
          fontFamily: 'var(--font-sans)',
          fontSize: 'clamp(0.8rem, 1vw, 0.9rem)',
          color: descColor,
          lineHeight: 1.75,
        }}
      >
        {step.description}
      </motion.p>
    </div>
  )

  const dot = (
    <div style={{ width: '48px', display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '0.5rem', position: 'relative', zIndex: 2 }}>
      <motion.div
        ref={onDotRef}
        style={{
          width: '12px',
          height: '12px',
          borderRadius: '50%',
          background: dotBg,
          borderWidth: '2px',
          borderStyle: 'solid',
          borderColor: dotBorderColor,
          boxShadow: dotShadow,
          opacity: dotOpacity,
          flexShrink: 0,
          position: 'relative',
          zIndex: 2,
        }}
      />
    </div>
  )

  return (
    <motion.div
      ref={ref}
      style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 400px) 48px minmax(0, 400px)',
        justifyContent: 'center',
        alignItems: 'flex-start',
        width: '100%',
        willChange: 'opacity, transform',
      }}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: reduced ? 0.01 : 0.6, ease: EASE, delay: reduced ? 0 : index * 0.15 }}
    >
      <div style={{ gridColumn: 1, minWidth: 0 }}>
        {isOdd ? card : null}
      </div>
      <div style={{ gridColumn: 2 }}>{dot}</div>
      <div style={{ gridColumn: 3, minWidth: 0 }}>
        {!isOdd ? card : null}
      </div>
    </motion.div>
  )
}

// ── Mobile step
function MobileStep({ step, index }: { step: Step; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useScrollInView(ref as React.RefObject<HTMLElement>, '-10% 0px')
  const reduced = usePrefersReducedMotion()

  return (
    <motion.div
      ref={ref}
      style={{ borderLeft: '2px solid rgba(45,74,62,0.25)', paddingLeft: '1.5rem', willChange: 'opacity, transform' }}
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: reduced ? 0.01 : 0.5, ease: EASE, delay: reduced ? 0 : index * 0.1 }}
    >
      <p aria-hidden="true" style={{ fontFamily: 'var(--font-sans)', fontSize: '0.68rem', fontWeight: 400, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(45,74,62,0.55)', marginBottom: '0.375rem' }}>
        {step.number}
      </p>
      <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.2rem, 4vw, 1.5rem)', fontWeight: 600, color: '#1A1A1A', letterSpacing: '-0.02em', lineHeight: 1.2, marginBottom: '0.5rem' }}>
        {step.title}
      </h3>
      <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.875rem', color: 'rgba(0,0,0,0.5)', lineHeight: 1.7 }}>
        {step.description}
      </p>
    </motion.div>
  )
}

// ── Main export
export function StepsStagger({ steps }: StepsStaggerProps) {
  const containerRef  = useRef<HTMLDivElement>(null)
  const dotRefs       = useRef<Array<HTMLDivElement | null>>([])
  const sectionRef    = useRef<HTMLDivElement>(null)
  const reduced       = usePrefersReducedMotion()
  const isDesktop     = useIsDesktop()

  const [lineSegment, setLineSegment] = useState<{ top: number; height: number } | null>(null)
  const [thresholds, setThresholds]   = useState<number[]>(() =>
    steps.map((_, i) => steps.length > 1 ? i / (steps.length - 1) : 0)
  )

  // Scroll-tied progress: the timeline starts filling when it enters from the
  // bottom, and finishes around when the last step approaches the top.
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 75%', 'end 35%'],
  })
  const fillHeight  = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  useEffect(() => {
    const offsetTopWithin = (el: HTMLElement, ancestor: HTMLElement): number => {
      let top = 0
      let cur: HTMLElement | null = el
      while (cur && cur !== ancestor) {
        top += cur.offsetTop
        cur = cur.offsetParent as HTMLElement | null
      }
      return top
    }

    const recalculate = () => {
      const container = containerRef.current
      const dots = dotRefs.current.filter(Boolean) as HTMLDivElement[]
      if (!container || dots.length < 2) return

      const center = (el: HTMLDivElement) =>
        offsetTopWithin(el, container) + el.offsetHeight / 2

      const firstCenter = center(dots[0])
      const lastCenter  = center(dots[dots.length - 1])
      const total       = lastCenter - firstCenter
      if (total <= 0) return

      setLineSegment({ top: firstCenter, height: total })
      setThresholds(dots.map(d => (center(d) - firstCenter) / total))
    }

    const id = requestAnimationFrame(recalculate)
    const ro = new ResizeObserver(recalculate)
    if (containerRef.current) ro.observe(containerRef.current)
    window.addEventListener('resize', recalculate)
    return () => {
      cancelAnimationFrame(id)
      ro.disconnect()
      window.removeEventListener('resize', recalculate)
    }
  }, [isDesktop])

  return (
    <div ref={sectionRef} style={{ marginTop: '4rem' }}>

      {/* Desktop: alternating layout + continuous scroll-tied line */}
      <div
        ref={containerRef}
        style={{
          display: isDesktop ? 'flex' : 'none',
          flexDirection: 'column',
          gap: 'clamp(3rem, 6vw, 5rem)',
          position: 'relative',
        }}
      >
        {/* Continuous timeline: shadow track + green scroll-tied fill + leading glow */}
        {lineSegment && (
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              left: 'calc(50% - 1px)',
              top: lineSegment.top,
              height: lineSegment.height,
              width: '2px',
              background: 'rgba(45,74,62,0.12)',
              borderRadius: '2px',
              pointerEvents: 'none',
              zIndex: 0,
            }}
          >
            {/* Green progress fill */}
            <motion.div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: reduced ? '100%' : fillHeight,
                background: 'linear-gradient(to bottom, rgba(45,74,62,0.85) 0%, #2D4A3E 10%, #2D4A3E 92%, rgba(45,74,62,0.65) 100%)',
                borderRadius: '2px',
                boxShadow: '0 0 10px rgba(45,74,62,0.28)',
              }}
            />

          </div>
        )}

        {steps.map((step, i) => (
          <DesktopStep
            key={step.number}
            step={step}
            index={i}
            isOdd={i % 2 === 0}
            onDotRef={(el) => { dotRefs.current[i] = el }}
            scrollYProgress={scrollYProgress}
            threshold={thresholds[i] ?? (steps.length > 1 ? i / (steps.length - 1) : 0)}
          />
        ))}
      </div>

      {/* Mobile: columna simple, sin línea */}
      <div style={{ display: isDesktop ? 'none' : 'flex', flexDirection: 'column', gap: '2.5rem' }}>
        {steps.map((step, i) => (
          <MobileStep key={step.number} step={step} index={i} />
        ))}
      </div>
    </div>
  )
}
