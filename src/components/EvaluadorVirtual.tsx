import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const questions = [
  {
    id: 1,
    question: '¿Cuál es su objetivo principal?',
    options: [
      { label: 'Mejorar la estética de mi nariz', value: 'estetica', icon: '✨' },
      { label: 'Resolver un problema funcional (respiración)', value: 'funcional', icon: '💨' },
      { label: 'Ambos — estético y funcional', value: 'ambos', icon: '⭐' },
      { label: 'Otra área facial (mentón, orejas)', value: 'otra', icon: '👤' },
    ],
  },
  {
    id: 2,
    question: '¿Cuánto tiempo lleva considerando esta cirugía?',
    options: [
      { label: 'Hace menos de 3 meses', value: 'reciente', icon: '🌱' },
      { label: 'Entre 3 y 12 meses', value: 'medio', icon: '📅' },
      { label: 'Más de 1 año', value: 'largo', icon: '🏆' },
      { label: 'Tengo urgencia médica', value: 'urgente', icon: '🚨' },
    ],
  },
  {
    id: 3,
    question: '¿Dónde se encuentra actualmente?',
    options: [
      { label: 'Cali (consulta presencial)', value: 'cali', icon: '📍' },
      { label: 'Otra ciudad en Colombia', value: 'colombia', icon: '🇨🇴' },
      { label: 'En el exterior', value: 'exterior', icon: '✈️' },
      { label: 'Prefiero teleconsulta primero', value: 'teleconsulta', icon: '💻' },
    ],
  },
  {
    id: 4,
    question: '¿Tiene alguna condición médica relevante?',
    options: [
      { label: 'No, estoy en buen estado de salud', value: 'sano', icon: '💪' },
      { label: 'Tengo alergias crónicas', value: 'alergias', icon: '🌿' },
      { label: 'Tengo desviación de tabique', value: 'tabique', icon: '👃' },
      { label: 'Prefiero discutirlo en consulta', value: 'privado', icon: '🔒' },
    ],
  },
];

const resultMap: Record<string, { title: string; message: string; cta: string }> = {
  estetica: {
    title: 'Rinoplastia Estética',
    message: 'Su perfil es ideal para una rinoplastia estética. El Dr. Agudelo evaluará su anatomía y le mostrará simulaciones del resultado esperado.',
    cta: 'Agenda tu evaluación para Rinoplastia',
  },
  funcional: {
    title: 'Cirugía ORL Funcional',
    message: 'Parece que tiene un problema funcional que afecta su calidad de vida. El Dr. Agudelo, como especialista ORL, puede resolverlo con técnicas mínimamente invasivas.',
    cta: 'Consulta sobre Cirugía Funcional',
  },
  ambos: {
    title: 'Rinoplastia Integral',
    message: 'Excelente candidato para una rinoplastia que combine la mejora estética con la corrección funcional — un solo procedimiento, un solo proceso de recuperación.',
    cta: 'Agenda tu consulta integral',
  },
  otra: {
    title: 'Cirugía Facial Personalizada',
    message: 'El Dr. Agudelo ofrece Mentoplastia y Otoplastia además de rinoplastia. Agenda una consulta para determinar el procedimiento ideal para su caso.',
    cta: 'Consulta sobre procedimientos faciales',
  },
};

const EvaluadorVirtual: React.FC = () => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [done, setDone] = useState(false);

  const handleAnswer = (value: string) => {
    const newAnswers = [...answers, value];
    setAnswers(newAnswers);
    if (step < questions.length - 1) {
      setTimeout(() => setStep(step + 1), 300);
    } else {
      setTimeout(() => setDone(true), 300);
    }
  };

  const result = resultMap[answers[0]] || resultMap.ambos;
  const progress = ((step) / questions.length) * 100;

  const openWhatsApp = () => {
    const msg = encodeURIComponent(
      `Hola Dr. Agudelo, completé su evaluador virtual.\n` +
      `Mi objetivo: ${answers[0] || 'no especificado'}\n` +
      `Interesado en: ${result.title}\n\n` +
      `¿Podría agendar una consulta?`
    );
    window.open(`https://wa.me/573XXXXXXXXX?text=${msg}`, '_blank');
  };

  const reset = () => { setStep(0); setAnswers([]); setDone(false); };

  return (
    <section
      id="evaluador"
      className="py-32 relative overflow-hidden"
      style={{
        background: 'rgba(26,31,46,0.3)',
        borderTop: '1px solid rgba(201,169,110,0.08)',
      }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(rgba(201,169,110,0.05) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl mx-auto">

          {/* Header */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="flex items-center justify-center gap-4 mb-6"
            >
              <div className="h-px w-12" style={{ background: '#C9A96E' }} />
              <span className="text-[10px] uppercase tracking-[0.4em] font-semibold" style={{ color: '#C9A96E' }}>
                Evaluador Virtual // 4 Preguntas
              </span>
              <div className="h-px w-12" style={{ background: '#C9A96E' }} />
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="leading-none mb-4"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                fontWeight: 800,
                color: '#F8F8F8',
              }}
            >
              ¿Es Candidato para
              <br />
              <span
                className="italic"
                style={{
                  background: 'linear-gradient(135deg, #C9A96E, #E8C97A)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Nuestra Cirugía?
              </span>
            </motion.h2>

            <p className="text-sm" style={{ color: 'rgba(248,248,248,0.5)' }}>
              Responda 4 preguntas rápidas y reciba una recomendación personalizada.
            </p>
          </div>

          {/* Card */}
          <AnimatePresence mode="wait">
            {!done ? (
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="p-10 relative"
                style={{
                  background: 'rgba(26,31,46,0.7)',
                  border: '1px solid rgba(201,169,110,0.2)',
                  backdropFilter: 'blur(10px)',
                }}
              >
                {/* Gold top line */}
                <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: 'linear-gradient(90deg, #C9A96E, transparent)' }} />

                {/* Progress */}
                <div className="mb-8">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-[10px] uppercase tracking-widest font-semibold" style={{ color: 'rgba(201,169,110,0.6)' }}>
                      Pregunta {step + 1} de {questions.length}
                    </span>
                    <span className="text-[10px] uppercase tracking-widest" style={{ color: 'rgba(248,248,248,0.3)' }}>
                      {Math.round(progress)}% completado
                    </span>
                  </div>
                  <div className="w-full h-1 rounded-full" style={{ background: 'rgba(201,169,110,0.15)' }}>
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: '#C9A96E', width: `${progress}%` }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </div>

                <h3
                  className="text-2xl font-bold mb-8"
                  style={{ fontFamily: "'Playfair Display', serif", color: '#F8F8F8' }}
                >
                  {questions[step].question}
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {questions[step].options.map((opt, i) => (
                    <motion.button
                      key={opt.value}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.07 }}
                      onClick={() => handleAnswer(opt.value)}
                      className="flex items-center gap-4 p-5 text-left transition-all duration-300 group"
                      style={{
                        border: '1px solid rgba(201,169,110,0.15)',
                        background: 'rgba(13,17,23,0.5)',
                      }}
                      onMouseEnter={e => {
                        (e.currentTarget as HTMLButtonElement).style.borderColor = '#C9A96E';
                        (e.currentTarget as HTMLButtonElement).style.background = 'rgba(201,169,110,0.08)';
                      }}
                      onMouseLeave={e => {
                        (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(201,169,110,0.15)';
                        (e.currentTarget as HTMLButtonElement).style.background = 'rgba(13,17,23,0.5)';
                      }}
                    >
                      <span className="text-2xl flex-shrink-0">{opt.icon}</span>
                      <span className="text-sm font-semibold leading-tight" style={{ color: 'rgba(248,248,248,0.8)' }}>
                        {opt.label}
                      </span>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="p-10 text-center relative"
                style={{
                  background: 'rgba(26,31,46,0.7)',
                  border: '1px solid rgba(201,169,110,0.3)',
                  backdropFilter: 'blur(10px)',
                }}
              >
                <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: '#C9A96E' }} />

                <div
                  className="w-16 h-16 flex items-center justify-center mx-auto mb-6 text-2xl"
                  style={{ background: 'rgba(201,169,110,0.15)', border: '1px solid rgba(201,169,110,0.4)' }}
                >
                  ✓
                </div>

                <p className="text-[10px] uppercase tracking-[0.4em] mb-3" style={{ color: '#C9A96E' }}>
                  Recomendación Personalizada
                </p>

                <h3
                  className="text-3xl font-bold mb-4"
                  style={{ fontFamily: "'Playfair Display', serif", color: '#F8F8F8' }}
                >
                  {result.title}
                </h3>

                <p className="text-base leading-relaxed mb-8 max-w-xl mx-auto" style={{ color: 'rgba(248,248,248,0.65)' }}>
                  {result.message}
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={openWhatsApp}
                    className="px-8 py-4 text-sm font-bold uppercase tracking-widest flex items-center justify-center gap-3 transition-all duration-300"
                    style={{ background: '#C9A96E', color: '#0D1117' }}
                    onMouseEnter={e => (e.currentTarget as HTMLButtonElement).style.background = '#E8C97A'}
                    onMouseLeave={e => (e.currentTarget as HTMLButtonElement).style.background = '#C9A96E'}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                    </svg>
                    {result.cta}
                  </button>

                  <button
                    onClick={reset}
                    className="px-8 py-4 text-sm font-semibold uppercase tracking-widest transition-all duration-300"
                    style={{ border: '1px solid rgba(201,169,110,0.3)', color: '#C9A96E' }}
                    onMouseEnter={e => (e.currentTarget as HTMLButtonElement).style.borderColor = '#C9A96E'}
                    onMouseLeave={e => (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(201,169,110,0.3)'}
                  >
                    Reiniciar →
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>
    </section>
  );
};

export default EvaluadorVirtual;
