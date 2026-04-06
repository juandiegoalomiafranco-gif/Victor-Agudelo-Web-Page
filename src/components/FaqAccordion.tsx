import { useState } from 'react'

const FAQS = [
  {
    question: '¿Cómo sé si soy candidato para un procedimiento?',
    answer: 'Durante la consulta inicial evaluamos tu estado de salud general, tus expectativas y las características anatómicas de la zona a tratar. A partir de eso determinamos si eres candidato ideal y qué técnica se adapta mejor a ti.',
  },
  {
    question: '¿Cuáles son los riesgos de la cirugía plástica?',
    answer: 'Como toda cirugía, existen riesgos generales como infección, sangrado o reacciones a la anestesia. Trabajamos con protocolos de seguridad estrictos y te informamos en detalle sobre cada riesgo específico antes de tomar cualquier decisión.',
  },
  {
    question: '¿Cuánto tiempo tarda la recuperación?',
    answer: 'Depende del procedimiento. Rinoplastia: 1–2 semanas de reposo inicial. Liposucción: 1–3 semanas. Mamoplastia: 1–2 semanas. Te entregamos un protocolo de recuperación detallado y seguimiento post-operatorio personalizado.',
  },
  {
    question: '¿Atienden pacientes de otras ciudades o del exterior?',
    answer: 'Sí. Atendemos pacientes de toda Colombia y del exterior. Cali es un destino reconocido para turismo médico. Podemos coordinar consulta virtual previa, alojamiento recomendado y seguimiento remoto post-operatorio.',
  },
  {
    question: '¿Cómo es la primera consulta?',
    answer: 'Es una consulta personalizada de 45–60 minutos donde escuchamos tus objetivos, hacemos una evaluación física, explicamos las opciones disponibles y resolvemos todas tus dudas sin ningún compromiso. También disponible de forma virtual.',
  },
]

export function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggle = (i: number) =>
    setOpenIndex(prev => (prev === i ? null : i))

  return (
    <section style={{ background: '#080808', padding: '6rem 1.5rem' }}>
      <div style={{ maxWidth: '46rem', margin: '0 auto' }}>
        {/* Title */}
        <h2
          style={{
            color: '#ffffff',
            fontWeight: 700,
            fontSize: 'clamp(2.4rem, 5vw, 3.75rem)',
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
              {/* Question — right aligned like user message */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                  gap: '0.625rem',
                  marginBottom: openIndex === i ? '0.75rem' : '0',
                }}
              >
                {/* +/– toggle button */}
                <button
                  onClick={() => toggle(i)}
                  aria-label={openIndex === i ? 'Cerrar' : 'Abrir'}
                  style={{
                    width: '30px',
                    height: '30px',
                    borderRadius: '50%',
                    border: '1px solid rgba(255,255,255,0.22)',
                    background: 'transparent',
                    color: '#fff',
                    fontSize: '1.1rem',
                    lineHeight: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    flexShrink: 0,
                    transition: 'all 0.3s ease',
                  }}
                >
                  {openIndex === i ? '−' : '+'}
                </button>

                {/* Bubble */}
                <div
                  onClick={() => toggle(i)}
                  style={{
                    background: openIndex === i ? 'rgba(38,38,42,0.95)' : '#1c1c20',
                    border: `1px solid ${openIndex === i ? 'rgba(125,195,255,0.35)' : 'rgba(255,255,255,0.07)'}`,
                    borderRadius: '18px 18px 4px 18px',
                    padding: '0.875rem 1.375rem',
                    color: '#ffffff',
                    fontSize: '0.9375rem',
                    fontWeight: 500,
                    cursor: 'pointer',
                    maxWidth: '82%',
                    lineHeight: 1.5,
                    transition: 'all 0.3s ease',
                    userSelect: 'none',
                  }}
                >
                  {faq.question}
                </div>
              </div>

              {/* Answer — left aligned like doctor reply */}
              {openIndex === i && (
                <div
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
                      maxWidth: '82%',
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
