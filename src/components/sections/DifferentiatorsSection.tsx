import { useLayoutEffect, useRef, type CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'

import { BACKGROUND_FOLIAGE_URL, DIFFERENTIATORS_PHOTO_URL } from '../../lib/assets'

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
      const tween = gsap.to(wrap, {
        yPercent: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=140%',
          pin: true,
          pinSpacing: true,
          scrub: 1.1,
          invalidateOnRefresh: true,
        },
      })
      return () => {
        tween.scrollTrigger?.kill()
        tween.kill()
        gsap.set(wrap, { clearProps: 'transform' })
      }
    })
    mm.add('(max-width: 991px)', () => {
      gsap.set(wrap, { clearProps: 'transform' })
    })

    return () => mm.revert()
  }, [])

  return (
    <section
      id="diferenciadores"
      ref={sectionRef}
      className="diff-section"
      style={{ '--diff-bg': `url('${BACKGROUND_FOLIAGE_URL}')` } as CSSProperties}
    >
      <div className="diff-photo-col">
        <div ref={photoWrapRef} className="diff-photo-wrap" aria-hidden="true">
          <img
            src={DIFFERENTIATORS_PHOTO_URL}
            alt=""
            className="diff-photo"
            loading="lazy"
            decoding="async"
          />
        </div>
        <div className="diff-overlay-text">
          <h2 className="diff-title">
            La clave detrás<br />
            de cada resultado<br />
            natural
          </h2>
          <p className="diff-subtitle">
            Redefiniendo la armonía facial a través de la rinoplastia natural
          </p>
          <Link to="/sobre-el-dr-agudelo" className="diff-cta">Conoce al Dr. Agudelo</Link>
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
