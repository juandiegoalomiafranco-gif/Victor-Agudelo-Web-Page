import { useState, useEffect, useRef } from 'react'
import { motion } from 'motion/react'

import { StepsStagger } from '../ui/steps-stagger'

const PROCESS_STEPS = [
  { number: '01', title: 'Envío de fotos sin costo',  featured: false, description: 'Envías fotos de frente y perfil. Evaluamos tu caso y te respondemos si eres candidata, sin costo y sin compromiso.' },
  { number: '02', title: 'Consulta personalizada',    featured: false, description: 'Consulta con el Dr. Agudelo por $250.000 COP (virtual o presencial). Revisamos tu caso, hacemos simulación y entregamos cotización. Si decides operarte, las siguientes consultas no tienen costo adicional.' },
  { number: '03', title: 'Planificación quirúrgica',  featured: true,  description: 'Diseñamos el plan específico para tu nariz y tu rostro. Expectativas reales, sin promesas imposibles.' },
  { number: '04', title: 'El día de la cirugía',      featured: false, description: 'El Dr. Agudelo presente en todo momento. La rinoplastia dura aproximadamente 4 horas bajo anestesia general.' },
  { number: '05', title: 'Postoperatorio acompañado', featured: false, description: 'Cinco controles incluidos: 7 días, 15 días, 1 mes, 3 meses y 6 meses. A los 15 días se retiran cintas y puntos. El Dr. Agudelo hace cada seguimiento personalmente, nunca lo delega. El resultado final llega entre los 12 y 18 meses.' },
]

const PROCESS_EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94]

function useScrollInView(ref: React.RefObject<HTMLElement | null>, margin = '-10% 0px') {
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
  }, [ref, margin])
  return inView
}

export const ProcessSection = () => {
  const headerRef    = useRef<HTMLDivElement>(null)
  const headerInView = useScrollInView(headerRef)
  const reduced = typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false
  const dur = reduced ? 0.01 : 0.7

  return (
    <section style={{ position: 'relative', background: '#FAF7F2', overflow: 'hidden', padding: 'clamp(4rem, 10vw, 8rem) clamp(1rem, 3vw, 1.5rem)' }}>

      {/* Background blobs */}
      <div aria-hidden="true" style={{ pointerEvents: 'none', position: 'absolute', inset: 0, zIndex: 0 }}>
        <div style={{ position: 'absolute', top: '-8%', left: '-6%', width: '520px', height: '520px', borderRadius: '50%', background: 'rgba(45,74,62,0.07)', filter: 'blur(100px)' }} />
        <div style={{ position: 'absolute', bottom: '-8%', right: '-6%', width: '600px', height: '600px', borderRadius: '50%', background: 'rgba(45,74,62,0.05)', filter: 'blur(120px)' }} />
      </div>

      <div style={{ position: 'relative', zIndex: 1, maxWidth: '68rem', margin: '0 auto' }}>

        {/* Header */}
        <div ref={headerRef} style={{ textAlign: 'center', marginBottom: '1rem' }}>
          <motion.p
            style={{ fontFamily: 'var(--font-sans)', fontSize: '0.7rem', fontWeight: 400, letterSpacing: '0.35em', textTransform: 'uppercase', color: 'rgba(45,74,62,0.7)', marginBottom: '1rem' }}
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: dur, ease: PROCESS_EASE, delay: reduced ? 0 : 0 }}
          >
            De principio a fin
          </motion.p>

          <motion.h2
            className="section-reveal-header"
            style={{ color: '#1A1A1A', fontWeight: 700, fontSize: 'clamp(2.5rem, 5vw, 4rem)', letterSpacing: '-0.03em', lineHeight: 1.05, marginBottom: '1.25rem' }}
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: dur, ease: PROCESS_EASE, delay: reduced ? 0 : 0.1 }}
          >
            Tu camino, paso a paso
          </motion.h2>

          <motion.p
            style={{ fontFamily: 'var(--font-sans)', color: 'rgba(0,0,0,0.45)', fontSize: 'clamp(0.9rem, 1.3vw, 1rem)', lineHeight: 1.7, maxWidth: '44ch', margin: '0 auto 1.75rem' }}
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: dur, ease: PROCESS_EASE, delay: reduced ? 0 : 0.2 }}
          >
            Un proceso claro, sin sorpresas. Sabes exactamente qué esperar en cada etapa.
          </motion.p>

          <motion.a
            href="#agendar"
            className="process-cta-link"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', border: '1px solid rgba(45,74,62,0.45)', color: '#2D4A3E', borderRadius: '100px', padding: '0.75rem 1.875rem', fontSize: '0.82rem', fontFamily: 'var(--font-sans)', fontWeight: 500, textDecoration: 'none', letterSpacing: '0.1em', textTransform: 'uppercase' }}
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: dur, ease: PROCESS_EASE, delay: reduced ? 0 : 0.3 }}
            whileHover={{ backgroundColor: '#2D4A3E', color: '#fff', borderColor: '#2D4A3E' }}
          >
            ¿Cómo funciona?
          </motion.a>
        </div>

        <StepsStagger steps={PROCESS_STEPS} />
      </div>
    </section>
  )
}
