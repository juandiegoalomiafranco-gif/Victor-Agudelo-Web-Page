import React, { useState, useRef, useEffect } from 'react'

interface FaqItem {
  question: string
  answer: string
}

const FAQS: FaqItem[] = [
  {
    question: '¿Cómo sé si soy candidato para un procedimiento?',
    answer:
      'Durante la consulta inicial evaluamos tu estado de salud general, tus expectativas y las características anatómicas de la zona a tratar. A partir de eso determinamos si eres candidato ideal y qué técnica se adapta mejor a ti.',
  },
  {
    question: '¿Cuáles son los riesgos de la cirugía plástica?',
    answer:
      'Como toda cirugía, existen riesgos generales como infección, sangrado o reacciones a la anestesia. Trabajamos con protocolos de seguridad estrictos y te informamos en detalle sobre cada riesgo específico antes de tomar cualquier decisión.',
  },
  {
    question: '¿Cuánto tiempo tarda la recuperación?',
    answer:
      'Depende del procedimiento. Rinoplastia: 1–2 semanas de reposo inicial. Liposucción: 1–3 semanas. Mamoplastia: 1–2 semanas. Te entregamos un protocolo de recuperación detallado y seguimiento post-operatorio personalizado.',
  },
  {
    question: '¿Atienden pacientes de otras ciudades o del exterior?',
    answer:
      'Sí. Atendemos pacientes de toda Colombia y del exterior. Cali es un destino reconocido para turismo médico. Podemos coordinar consulta virtual previa, alojamiento recomendado y seguimiento remoto post-operatorio.',
  },
  {
    question: '¿Cómo es la primera consulta?',
    answer:
      'Es una consulta personalizada de 45–60 minutos donde escuchamos tus objetivos, hacemos una evaluación física, explicamos las opciones disponibles y resolvemos todas tus dudas sin ningún compromiso. También disponible de forma virtual.',
  },
]

function AccordionItem({
  item,
  isOpen,
  onToggle,
}: {
  item: FaqItem
  isOpen: boolean
  onToggle: () => void
  key?: React.Key | null
}) {
  const contentRef = useRef<HTMLDivElement>(null)
  const innerRef   = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const content = contentRef.current
    const inner   = innerRef.current
    if (!content || !inner) return
    content.style.height = isOpen ? `${inner.scrollHeight}px` : '0px'
  }, [isOpen])

  return (
    <div
      className="py-6"
      style={{ borderBottom: '1px solid var(--color-11)' }}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 text-left"
      >
        <span
          className="text-base md:text-lg leading-snug"
          style={{ color: 'var(--color-1)', fontWeight: 700 }}
        >
          {item.question}
        </span>
        <span
          className="shrink-0 text-2xl leading-none select-none"
          style={{
            color: 'var(--color-1)',
            fontWeight: 400,
            transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
            transition: 'transform 0.3s ease',
            display: 'inline-block',
          }}
        >
          +
        </span>
      </button>

      <div
        ref={contentRef}
        className="faq-content"
      >
        <div ref={innerRef} className="pt-4 pb-1">
          <p
            className="leading-relaxed text-sm md:text-base"
            style={{ color: 'var(--color-12)', fontWeight: 400 }}
          >
            {item.answer}
          </p>
        </div>
      </div>
    </div>
  )
}

export function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section
      className="py-24 px-6 md:px-12"
      style={{ background: 'var(--color-4)' }}
    >
      <div
        className="grid md:grid-cols-[1fr_1.5fr] gap-16 mx-auto"
        style={{ maxWidth: '72rem' }}
      >
        {/* Left — sticky */}
        <div>
          <div className="md:sticky md:top-28">
            <h2
              className="text-3xl md:text-4xl leading-tight mb-6"
              style={{ color: 'var(--color-1)', fontWeight: 700 }}
            >
              Preguntas que te ayudan a decidir con confianza
            </h2>
            <p
              className="text-sm mb-6"
              style={{ color: 'var(--color-12)', fontWeight: 400 }}
            >
              ¿Tienes más dudas? Hablemos.
            </p>
            <a
              href="#agendar"
              className="inline-flex items-center gap-2 text-sm transition-colors"
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
              Contáctanos →
            </a>
          </div>
        </div>

        {/* Right — accordion */}
        <div
          style={{ borderTop: '1px solid var(--color-11)' }}
        >
          {FAQS.map((item, i) => (
            <AccordionItem
              key={i}
              item={item}
              isOpen={openIndex === i}
              onToggle={() => { setOpenIndex(prev => (prev === i ? null : i)) }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
