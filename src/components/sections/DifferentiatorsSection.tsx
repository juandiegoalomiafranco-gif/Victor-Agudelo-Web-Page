import { useLayoutEffect, useRef } from 'react'
import { Calendar } from 'lucide-react'
import gsap from 'gsap'

import { DOCTOR_PHOTO_URL } from '../../lib/assets'

const pillars = [
  {
    title: '20+ Años dedicado a la nariz',
    desc: 'Especialización exclusiva en cirugía nasal desde 2004. Miembro activo de SCCPFR y ACORL.',
  },
  {
    title: '1.500+ Cirugías realizadas',
    desc: 'Más de 200 rinoplastias documentadas. Antes de decidir, verás casos reales con narices similares a la tuya.',
  },
  {
    title: 'Pionero en rinoplastia ultrasónica',
    desc: 'Ultrasonido piezoeléctrico para mayor precisión ósea y recuperación más predecible. Técnica disponible en Cali desde 2022.',
  },
  {
    title: '5 Controles postoperatorios',
    desc: 'Seguimiento personal a los 7 días, 15 días, 1, 3 y 6 meses. Siempre con el Dr. Agudelo, nunca delegado.',
  },
  {
    title: 'Doble formación: ORL + Cirugía facial',
    desc: 'Otorrinolaringólogo y Cirujano Plástico Facial certificado. Una nariz operada no es solo estética: también es función respiratoria. Su doble especialidad garantiza ambas, no solo cómo se ve.',
  },
  {
    title: 'Atención sin delegaciones',
    desc: 'De la primera consulta al último control, siempre te atiende el Dr. Agudelo. Ningún paciente pasa por residentes o asistentes.',
  },
]

export const DifferentiatorsSection = () => {
  const sectionRef   = useRef<HTMLElement>(null)
  const photoWrapRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      if (photoWrapRef.current) gsap.set(photoWrapRef.current, { yPercent: 0 })
      return
    }

    const section = sectionRef.current
    const wrap    = photoWrapRef.current
    if (!section || !wrap) return

    const mm = gsap.matchMedia()
    mm.add('(min-width: 992px)', () => {
      gsap.set(wrap, { yPercent: 100 })
      gsap.to(wrap, {
        yPercent: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=120%',
          pin: true,
          scrub: 0.6,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      })
      return () => { gsap.set(wrap, { clearProps: 'transform' }) }
    })
    mm.add('(max-width: 991px)', () => {
      gsap.set(wrap, { clearProps: 'transform' })
    })

    return () => mm.revert()
  }, [])

  return (
    <section id="diferenciadores" ref={sectionRef} className="diff-section">
      <div className="diff-photo-col">
        <div ref={photoWrapRef} className="diff-photo-wrap" aria-hidden="true">
          <img
            src={DOCTOR_PHOTO_URL}
            alt=""
            className="diff-photo"
            loading="lazy"
            decoding="async"
          />
        </div>
        <div className="diff-overlay-text">
          <p className="diff-eyebrow">Por qué el Dr. Agudelo</p>
          <h2 className="diff-title">La clave detrás de cada resultado natural.</h2>
          <a href="#agendar" className="diff-cta">
            <Calendar className="w-4 h-4" /> Solicita tu evaluación gratuita
          </a>
        </div>
      </div>

      <div className="diff-right">
        <ul className="diff-grid">
          {pillars.map((p, i) => (
            <li key={i} className="diff-item">
              <h3 className="diff-card-title">{p.title}</h3>
              <p className="diff-card-desc">{p.desc}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
