import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const procedures = [
  {
    number: '01',
    code: 'RHINO',
    title: 'Rinoplastia',
    subtitle: 'Cirugía Estética y Funcional de la Nariz',
    description:
      'La rinoplastia es el procedimiento insignia del Dr. Agudelo. Con técnica de precisión, se corrige la forma, tamaño y proyección de la nariz respetando la armonía facial individual. También resuelve problemas funcionales como la desviación del tabique y la obstrucción nasal crónica.',
    highlights: ['Técnica cerrada (sin cicatrices visibles)', 'Estética + Funcional en un solo procedimiento', 'Recuperación 7-14 días', 'Resultados permanentes'],
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=1200',
    tag: 'Especialidad Principal',
  },
  {
    number: '02',
    code: 'MENTO',
    title: 'Mentoplastia',
    subtitle: 'Cirugía Estética del Mentón',
    description:
      'La mentoplastia mejora la forma y proyección del mentón, equilibrando el perfil facial. Se realiza mediante implante de silicona de alta definición o remodelación ósea directa, complementando perfectamente los resultados de una rinoplastia o como procedimiento independiente.',
    highlights: ['Implante de silicona premium', 'Proyección y definición del perfil', 'Procedimiento ambulatorio', 'Cicatriz mínima e invisible'],
    image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?q=80&w=1200',
    tag: 'Cirugía Facial',
  },
  {
    number: '03',
    code: 'OTO',
    title: 'Otoplastia',
    subtitle: 'Corrección Estética de las Orejas',
    description:
      'La otoplastia corrige el tamaño, posición y forma del pabellón auricular. Es un procedimiento ambulatorio con anestesia local o general, disponible para adultos y niños mayores de 5 años. Elimina de forma permanente la prominencia de orejas separadas, mejorando la confianza del paciente.',
    highlights: ['Adultos y niños +5 años', 'Anestesia local o general', 'Resultados simétricos y permanentes', 'Recuperación 5-7 días'],
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=1200',
    tag: 'Cirugía Facial',
  },
  {
    number: '04',
    code: 'ORL',
    title: 'Cirugía ORL Funcional',
    subtitle: 'Otorrinolaringología y Vías Respiratorias',
    description:
      'Como especialista ORL, el Dr. Agudelo trata de forma integral los problemas de obstrucción nasal, alergias crónicas, sinusitis, afecciones de oídos y ronquido. Combina el enfoque estético con la salud funcional para que el paciente respire y viva mejor.',
    highlights: ['Septoplastia y turbinoplastia', 'Cirugía de senos paranasales (CENS)', 'Tratamiento del ronquido', 'Alergias y obstrucción nasal'],
    image: 'https://images.unsplash.com/photo-1551601651-2a8555f1a136?q=80&w=1200',
    tag: 'ORL Funcional',
  },
];

const ServicesSection: React.FC = () => {
  const [activeIdx, setActiveIdx] = useState(0);

  const openWhatsApp = (procedure: string) => {
    const msg = encodeURIComponent(`Hola Dr. Agudelo, estoy interesado en una consulta sobre ${procedure}. ¿Cuál es su disponibilidad?`);
    window.open(`https://wa.me/573XXXXXXXXX?text=${msg}`, '_blank');
  };

  return (
    <section id="procedimientos" className="py-32 relative overflow-hidden" style={{ background: '#0D1117' }}>

      {/* Background decoration */}
      <div
        className="absolute right-0 top-0 w-96 h-96 pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(201,169,110,0.04) 0%, transparent 70%)' }}
      />

      <div className="container mx-auto px-6">

        {/* Header */}
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-6"
          >
            <div className="h-px w-12" style={{ background: '#C9A96E' }} />
            <span className="text-[10px] uppercase tracking-[0.4em] font-semibold" style={{ color: '#C9A96E' }}>
              Procedimientos // Especialidades
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="leading-none mb-6"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(2.5rem, 6vw, 5rem)',
              fontWeight: 800,
              color: '#F8F8F8',
            }}
          >
            Cuatro Especialidades,<br />
            <span
              className="italic"
              style={{
                background: 'linear-gradient(135deg, #C9A96E, #E8C97A)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Un Solo Estándar.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="max-w-xl text-base leading-relaxed"
            style={{ color: 'rgba(248,248,248,0.55)', fontFamily: "'Inter', sans-serif" }}
          >
            Cada procedimiento es planificado de manera individualizada, considerando la anatomía
            única de cada paciente y sus objetivos personales.
          </motion.p>
        </div>

        {/* Procedure List + Detail */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* Left list */}
          <div className="lg:col-span-5 space-y-0">
            {procedures.map((proc, idx) => (
              <motion.button
                key={proc.code}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                onClick={() => setActiveIdx(idx)}
                className="w-full text-left py-7 flex items-center gap-6 group transition-all duration-300 relative"
                style={{
                  borderBottom: '1px solid rgba(201,169,110,0.1)',
                  borderLeft: activeIdx === idx ? '3px solid #C9A96E' : '3px solid transparent',
                  paddingLeft: activeIdx === idx ? '24px' : '0px',
                }}
              >
                <span
                  className="font-mono text-sm transition-colors duration-300"
                  style={{ color: activeIdx === idx ? '#C9A96E' : 'rgba(248,248,248,0.25)' }}
                >
                  [{proc.number}]
                </span>
                <div className="flex-1">
                  <h3
                    className="text-xl font-bold transition-colors duration-300"
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      color: activeIdx === idx ? '#F8F8F8' : 'rgba(248,248,248,0.6)',
                    }}
                  >
                    {proc.title}
                  </h3>
                  <p
                    className="text-xs mt-1 transition-colors duration-300"
                    style={{ color: activeIdx === idx ? 'rgba(201,169,110,0.8)' : 'rgba(248,248,248,0.3)' }}
                  >
                    {proc.subtitle}
                  </p>
                </div>
                <span
                  className="text-2xl transition-all duration-300"
                  style={{
                    color: '#C9A96E',
                    opacity: activeIdx === idx ? 1 : 0,
                    transform: activeIdx === idx ? 'translateX(0)' : 'translateX(-10px)',
                  }}
                >
                  →
                </span>
              </motion.button>
            ))}
          </div>

          {/* Right detail */}
          <div className="lg:col-span-7 relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIdx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden"
                style={{
                  background: 'rgba(26,31,46,0.5)',
                  border: '1px solid rgba(201,169,110,0.15)',
                }}
              >
                {/* Image */}
                <div className="relative overflow-hidden" style={{ height: '260px' }}>
                  <motion.img
                    key={activeIdx + 'img'}
                    initial={{ scale: 1.05 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.8 }}
                    src={procedures[activeIdx].image}
                    alt={procedures[activeIdx].title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, transparent 50%, rgba(26,31,46,1) 100%)' }} />
                  <span
                    className="absolute top-4 left-4 px-3 py-1 text-[10px] uppercase tracking-widest font-semibold"
                    style={{ background: 'rgba(201,169,110,0.9)', color: '#0D1117' }}
                  >
                    {procedures[activeIdx].tag}
                  </span>
                  <span
                    className="absolute bottom-4 right-4 font-mono text-[60px] font-black leading-none select-none"
                    style={{ color: 'rgba(201,169,110,0.08)' }}
                  >
                    {procedures[activeIdx].code}
                  </span>
                </div>

                {/* Content */}
                <div className="p-8 space-y-6">
                  <div>
                    <h3
                      className="text-2xl font-bold mb-2"
                      style={{ fontFamily: "'Playfair Display', serif", color: '#F8F8F8' }}
                    >
                      {procedures[activeIdx].title}
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: 'rgba(248,248,248,0.6)' }}>
                      {procedures[activeIdx].description}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    {procedures[activeIdx].highlights.map(h => (
                      <div key={h} className="flex items-start gap-2">
                        <span style={{ color: '#C9A96E', flexShrink: 0 }}>✓</span>
                        <span className="text-xs leading-tight" style={{ color: 'rgba(248,248,248,0.65)' }}>{h}</span>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => openWhatsApp(procedures[activeIdx].title)}
                    className="w-full py-4 text-xs font-semibold uppercase tracking-widest transition-all duration-300"
                    style={{ background: '#C9A96E', color: '#0D1117' }}
                    onMouseEnter={e => (e.currentTarget as HTMLButtonElement).style.background = '#E8C97A'}
                    onMouseLeave={e => (e.currentTarget as HTMLButtonElement).style.background = '#C9A96E'}
                  >
                    Consultar sobre {procedures[activeIdx].title} →
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
