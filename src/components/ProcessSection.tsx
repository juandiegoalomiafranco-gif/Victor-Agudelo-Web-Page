import React, { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

const steps = [
  {
    number: '01',
    title: 'Primera Consulta',
    description: 'Evaluación diagnóstica personalizada. El Dr. Agudelo analiza su anatomía facial, historia clínica y objetivos estéticos o funcionales. Sin compromisos — solo claridad sobre su caso.',
    icon: '🩺',
    detail: 'Sin costo de consulta inicial para pacientes de Cali',
  },
  {
    number: '02',
    title: 'Plan Quirúrgico',
    description: 'Diseño del resultado esperado con simulación digital. Se definen la técnica, los tiempos de recuperación, el costo total y las fechas disponibles. Transparencia total antes de decidir.',
    icon: '📋',
    detail: 'Simulación digital del resultado final',
  },
  {
    number: '03',
    title: 'Intervención Quirúrgica',
    description: 'Procedimiento realizado con técnicas mínimamente invasivas de última generación. Anestesia local o general según el caso. Tiempos quirúrgicos optimizados para la seguridad del paciente.',
    icon: '⚕️',
    detail: 'Clínica certificada en Cali, Colombia',
  },
  {
    number: '04',
    title: 'Seguimiento y Recuperación',
    description: 'Acompañamiento postoperatorio completo. Controles médicos programados, guía detallada de cuidados en casa y canal directo de comunicación con el Dr. Agudelo durante todo el proceso.',
    icon: '🌟',
    detail: 'WhatsApp directo con el médico tratante',
  },
];

const ProcessSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center'],
  });
  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <section
      id="proceso"
      ref={containerRef}
      className="py-32 relative overflow-hidden"
      style={{ background: '#0D1117' }}
    >
      {/* Background */}
      <div
        className="absolute right-0 bottom-0 w-80 h-80 pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(201,169,110,0.04) 0%, transparent 70%)' }}
      />

      <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20">

        {/* Left — sticky label */}
        <div className="lg:sticky lg:top-40 h-fit flex flex-col gap-8">
          <div className="flex items-center gap-4">
            <div className="h-px w-12" style={{ background: '#C9A96E' }} />
            <span className="text-[10px] uppercase tracking-[0.4em] font-semibold" style={{ color: '#C9A96E' }}>
              Metodología // Proceso
            </span>
          </div>

          <h2
            className="leading-none"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
              fontWeight: 800,
              color: '#F8F8F8',
            }}
          >
            Un Camino<br />
            <span
              className="italic"
              style={{
                background: 'linear-gradient(135deg, #C9A96E, #E8C97A)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Sin Sorpresas.
            </span>
          </h2>

          <p
            className="text-base leading-relaxed max-w-sm"
            style={{ color: 'rgba(248,248,248,0.55)' }}
          >
            Desde la primera consulta hasta el resultado final, cada paso está diseñado para que el
            paciente tenga claridad, seguridad y confianza.
          </p>

          {/* Mini stats */}
          <div className="flex items-center gap-8 mt-4">
            <div>
              <p className="text-4xl font-black" style={{ fontFamily: "'Playfair Display', serif", color: '#C9A96E' }}>
                7-14<span className="text-xl" style={{ color: '#F8F8F8' }}> días</span>
              </p>
              <p className="text-[10px] uppercase tracking-wider mt-1" style={{ color: 'rgba(248,248,248,0.35)' }}>
                Recuperación rinoplastia
              </p>
            </div>
            <div className="w-px h-12" style={{ background: 'rgba(201,169,110,0.2)' }} />
            <div>
              <p className="text-4xl font-black" style={{ fontFamily: "'Playfair Display', serif", color: '#C9A96E' }}>
                100<span className="text-xl" style={{ color: '#F8F8F8' }}>%</span>
              </p>
              <p className="text-[10px] uppercase tracking-wider mt-1" style={{ color: 'rgba(248,248,248,0.35)' }}>
                Seguimiento garantizado
              </p>
            </div>
          </div>
        </div>

        {/* Right — scrollable timeline */}
        <div className="relative pt-8">
          {/* Vertical line track */}
          <div
            className="absolute left-7 top-0 w-px h-full"
            style={{ background: 'rgba(201,169,110,0.1)' }}
          />
          {/* Animated progress line */}
          <motion.div
            style={{ scaleY, originY: 0 }}
            className="absolute left-7 top-0 w-px h-full z-10"
            // background via inline style because framer-motion needs style prop
          >
            <div className="w-full h-full" style={{ background: '#C9A96E' }} />
          </motion.div>

          <div className="flex flex-col gap-24 relative z-20">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="flex gap-10 group"
              >
                {/* Step circle */}
                <div
                  className="flex-shrink-0 w-14 h-14 flex items-center justify-center transition-all duration-500 relative z-30"
                  style={{
                    background: '#0D1117',
                    border: '1px solid rgba(201,169,110,0.3)',
                  }}
                >
                  <span className="text-xl">{step.icon}</span>
                </div>

                {/* Content */}
                <div className="flex flex-col gap-3 pt-1">
                  <div className="flex items-center gap-3">
                    <span
                      className="font-mono text-xs font-semibold"
                      style={{ color: 'rgba(201,169,110,0.5)' }}
                    >
                      {step.number}
                    </span>
                    <div className="h-px w-8" style={{ background: 'rgba(201,169,110,0.3)' }} />
                  </div>

                  <h3
                    className="text-2xl font-bold transition-colors duration-500 group-hover:text-yellow-400"
                    style={{ fontFamily: "'Playfair Display', serif", color: '#F8F8F8' }}
                  >
                    {step.title}
                  </h3>

                  <p className="text-sm leading-relaxed max-w-md" style={{ color: 'rgba(248,248,248,0.55)' }}>
                    {step.description}
                  </p>

                  <div
                    className="flex items-center gap-2 mt-2 px-4 py-2 text-xs"
                    style={{
                      border: '1px solid rgba(201,169,110,0.2)',
                      background: 'rgba(201,169,110,0.05)',
                      color: '#C9A96E',
                    }}
                  >
                    <span>✓</span>
                    <span>{step.detail}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
