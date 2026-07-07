import { useState } from 'react'

const FAQS = [
  {
    question: '¿La cirugía duele?',
    answer: 'No es dolorosa — es incómoda. La principal molestia es la congestión nasal de los primeros días. La mayoría de pacientes se sorprende positivamente con la recuperación.',
  },
  {
    question: '¿Me puedo operar si me he aplicado ácido hialurónico en la nariz?',
    answer: 'Sí. Lo ideal es disolverlo previamente con hialuronidasa antes de la cirugía. Lo evaluamos en consulta.',
  },
  {
    question: '¿Usan ultrasonido en la cirugía?',
    answer: 'Sí. Llevamos más de dos años usando ultrasonido piezoeléctrico (Piezosurgery) para modificar la estructura ósea con mayor precisión y menos trauma.',
  },
  {
    question: '¿Cuánto tiempo de incapacidad laboral necesito?',
    answer: 'Para trabajos de oficina: 7 a 10 días. Para trabajos físicos, más tiempo. Lo evaluamos caso a caso.',
  },
  {
    question: '¿Cuándo puedo tomar un vuelo?',
    answer: '10 días después de la cirugía.',
  },
  {
    question: '¿Cuándo puedo usar gafas?',
    answer: 'Para apoyarlas sobre la nariz: 2 meses después. Antes puedes usarlas sobre la férula de protección.',
  },
  {
    question: '¿Cuándo vuelvo al deporte?',
    answer: 'Pesas al 70%, caminadora, pilates: desde la semana 3. Trotar o saltar: semana 6. Deportes de contacto: 6 meses.',
  },
  {
    question: '¿Cuánto cuesta la consulta?',
    answer: 'La consulta médica con el Dr. Agudelo cuesta $250.000 COP, sea virtual o presencial. La evaluación inicial por fotos es gratuita y sin compromiso. La cotización quirúrgica se entrega solo después de la consulta médica completa.',
  },
  {
    question: '¿Publican precios?',
    answer: 'No publicamos precios fijos porque cada caso es diferente — el costo puede variar significativamente. Solicita tu evaluación gratuita y te damos una cotización personalizada.',
  },
]

export function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggle = (i: number) =>
    setOpenIndex(prev => (prev === i ? null : i))

  return (
    <section style={{ background: '#080808', padding: 'clamp(3rem, 8vw, 6rem) clamp(0.75rem, 3vw, 1.5rem)' }}>
      <div style={{ maxWidth: '46rem', margin: '0 auto' }}>
        {/* Title */}
        <h2
          className="section-reveal-header"
          style={{
            color: '#ffffff',
            fontWeight: 700,
            fontSize: 'clamp(1.75rem, 7vw, 3.75rem)',
            letterSpacing: '-0.03em',
            textAlign: 'center',
            marginBottom: '4rem',
            lineHeight: 1.1,
          }}
        >
          Preguntas frecuentes
        </h2>

        {/* Chat list */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {FAQS.map((faq, i) => (
            <div key={i}>
              {/* Question — right aligned like user message.
                  Un solo <button> accesible por teclado engloba el círculo +/− y la burbuja. */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  marginBottom: openIndex === i ? '0.75rem' : '0',
                }}
              >
                <button
                  type="button"
                  onClick={() => toggle(i)}
                  aria-expanded={openIndex === i}
                  aria-controls={`faq-answer-${i}`}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.625rem',
                    background: 'none',
                    border: 'none',
                    padding: 0,
                    margin: 0,
                    cursor: 'pointer',
                    // 82% para la burbuja (como antes) + círculo 36px + gap
                    maxWidth: 'min(calc(82% + 2.9rem), 100%)',
                    fontFamily: 'inherit',
                    textAlign: 'left',
                  }}
                >
                  {/* +/– indicator (decorativo, el botón es todo el bloque) */}
                  <span
                    aria-hidden="true"
                    style={{
                      width: '36px',
                      height: '36px',
                      minWidth: '36px',
                      minHeight: '36px',
                      borderRadius: '50%',
                      border: '1px solid rgba(255,255,255,0.22)',
                      background: 'transparent',
                      color: '#fff',
                      fontSize: '1.1rem',
                      lineHeight: 1,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      transition: 'all 0.3s ease',
                    }}
                  >
                    {openIndex === i ? '−' : '+'}
                  </span>

                  {/* Bubble */}
                  <span
                    style={{
                      display: 'block',
                      background: openIndex === i ? 'rgba(38,38,42,0.95)' : '#1c1c20',
                      border: `1px solid ${openIndex === i ? 'rgba(125,195,255,0.35)' : 'rgba(255,255,255,0.07)'}`,
                      borderRadius: '18px 18px 4px 18px',
                      padding: '0.875rem 1.375rem',
                      color: '#ffffff',
                      fontSize: '0.9375rem',
                      fontWeight: 500,
                      lineHeight: 1.5,
                      transition: 'all 0.3s ease',
                    }}
                  >
                    {faq.question}
                  </span>
                </button>
              </div>

              {/* Answer — left aligned like doctor reply */}
              {openIndex === i && (
                <div
                  id={`faq-answer-${i}`}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.625rem',
                    paddingLeft: '0.25rem',
                    animation: 'faqIn 0.38s cubic-bezier(0.22,1,0.36,1) both',
                  }}
                >
                  {/* Doctor avatar */}
                  <div
                    style={{
                      width: '34px',
                      height: '34px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #1e3a5f 0%, #0f2440 100%)',
                      border: '1px solid rgba(255,255,255,0.12)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.65rem',
                      fontWeight: 700,
                      color: '#ffffff',
                      flexShrink: 0,
                      letterSpacing: '0.03em',
                    }}
                  >
                    VA
                  </div>

                  {/* Answer bubble */}
                  <div
                    style={{
                      background: 'rgba(255,255,255,0.06)',
                      border: '1px solid rgba(255,255,255,0.06)',
                      borderRadius: '4px 18px 18px 18px',
                      padding: '0.875rem 1.375rem',
                      color: 'rgba(255,255,255,0.78)',
                      fontSize: '0.9rem',
                      lineHeight: 1.72,
                      maxWidth: 'min(82%, calc(100vw - 5rem))',
                    }}
                  >
                    {faq.answer}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes faqIn {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  )
}
