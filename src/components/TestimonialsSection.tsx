import React, { useCallback, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { motion } from 'framer-motion';

interface Testimonial {
  quote: string;
  author: string;
  city: string;
  procedure: string;
  initial: string;
}

const testimonials: Testimonial[] = [
  {
    quote: 'Llevaba años insegura con la forma de mi nariz. El Dr. Agudelo me explicó todo con una paciencia enorme, me mostró simulaciones del resultado y lo que más me convenció fue que en ningún momento me presionó a operarme. El resultado es exactamente lo que soñaba — natural, no se nota que me operé.',
    author: 'Valentina R.',
    city: 'Cali, Colombia',
    procedure: 'Rinoplastia Estética',
    initial: 'V',
  },
  {
    quote: 'Vine desde Bogotá específicamente para operarme con el Dr. Agudelo. Su reputación lo precede. La cirugía fue perfecta, la recuperación fue más rápida de lo que esperaba y el seguimiento postoperatorio fue impecable. Vale cada peso invertido.',
    author: 'Andrés M.',
    city: 'Bogotá, Colombia',
    procedure: 'Rinoplastia Funcional',
    initial: 'A',
  },
  {
    quote: 'Tenía desviación del tabique y problemas de respiración crónicos desde niña. El Dr. Agudelo lo resolvió en un solo procedimiento combinando la corrección funcional con una pequeña mejora estética. Ahora respiro perfectamente y mi perfil mejoró notablemente.',
    author: 'Carolina P.',
    city: 'Cali, Colombia',
    procedure: 'Septoplastia + Rinoplastia',
    initial: 'C',
  },
  {
    quote: 'Mi hijo de 7 años tenía las orejas muy pronunciadas y lo afectaba emocionalmente en el colegio. El procedimiento fue rápido, el doctor fue increíblemente cálido con él durante todo el proceso. Hoy mi hijo es otro niño — lleno de confianza.',
    author: 'Marcela G.',
    city: 'Palmira, Colombia',
    procedure: 'Otoplastia Infantil',
    initial: 'M',
  },
];

const TestimonialsSection: React.FC = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollPrev = useCallback(() => {
    if (emblaApi) {
      emblaApi.scrollPrev();
      setActiveIndex(prev => (prev - 1 + testimonials.length) % testimonials.length);
    }
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) {
      emblaApi.scrollNext();
      setActiveIndex(prev => (prev + 1) % testimonials.length);
    }
  }, [emblaApi]);

  return (
    <section
      id="galeria"
      className="py-32 relative overflow-hidden"
      style={{
        background: 'rgba(26,31,46,0.3)',
        borderTop: '1px solid rgba(201,169,110,0.08)',
      }}
    >
      {/* Background decoration */}
      <div
        className="absolute left-0 top-0 w-64 h-64 pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(201,169,110,0.04) 0%, transparent 70%)' }}
      />

      <div className="container mx-auto px-6">

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-4 mb-6"
            >
              <div className="h-px w-12" style={{ background: '#C9A96E' }} />
              <span className="text-[10px] uppercase tracking-[0.4em] font-semibold" style={{ color: '#C9A96E' }}>
                Testimonios // Pacientes Reales
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="leading-none"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
                fontWeight: 800,
                color: '#F8F8F8',
              }}
            >
              Vidas<br />
              <span
                className="italic"
                style={{
                  background: 'linear-gradient(135deg, #C9A96E, #E8C97A)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Transformadas.
              </span>
            </motion.h2>
          </div>

          {/* Nav buttons */}
          <div className="flex gap-2">
            {[scrollPrev, scrollNext].map((fn, i) => (
              <button
                key={i}
                onClick={fn}
                className="w-14 h-14 flex items-center justify-center transition-all duration-300"
                style={{ border: '1px solid rgba(201,169,110,0.3)', color: '#C9A96E' }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLButtonElement).style.background = '#C9A96E';
                  (e.currentTarget as HTMLButtonElement).style.color = '#0D1117';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLButtonElement).style.background = 'transparent';
                  (e.currentTarget as HTMLButtonElement).style.color = '#C9A96E';
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  {i === 0 ? (
                    <><line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" /></>
                  ) : (
                    <><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></>
                  )}
                </svg>
              </button>
            ))}
          </div>
        </div>

        {/* Carousel */}
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {testimonials.map((t, i) => (
              <div key={i} className="flex-[0_0_100%] min-w-0 md:flex-[0_0_80%] pr-6">
                <div
                  className="p-10 md:p-16 relative"
                  style={{
                    background: 'rgba(26,31,46,0.6)',
                    border: '1px solid rgba(201,169,110,0.15)',
                    backdropFilter: 'blur(10px)',
                  }}
                >
                  {/* Gold top line */}
                  <div
                    className="absolute top-0 left-0 right-0 h-px"
                    style={{ background: 'linear-gradient(90deg, #C9A96E, transparent)' }}
                  />

                  {/* Quote mark */}
                  <div
                    className="absolute top-6 right-8 text-[120px] font-black leading-none select-none pointer-events-none"
                    style={{ color: 'rgba(201,169,110,0.06)', fontFamily: "'Playfair Display', serif" }}
                  >
                    "
                  </div>

                  <div className="relative z-10">
                    <blockquote
                      className="text-lg md:text-xl leading-relaxed mb-10 italic"
                      style={{
                        fontFamily: "'Playfair Display', serif",
                        color: 'rgba(248,248,248,0.85)',
                      }}
                    >
                      "{t.quote}"
                    </blockquote>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div
                          className="w-12 h-12 flex items-center justify-center text-xl font-black"
                          style={{
                            background: '#C9A96E',
                            color: '#0D1117',
                            fontFamily: "'Playfair Display', serif",
                          }}
                        >
                          {t.initial}
                        </div>
                        <div>
                          <p className="font-bold text-sm" style={{ color: '#F8F8F8' }}>{t.author}</p>
                          <p className="text-xs mt-0.5" style={{ color: 'rgba(248,248,248,0.4)' }}>{t.city}</p>
                        </div>
                      </div>
                      <span
                        className="hidden md:block px-4 py-2 text-[10px] uppercase tracking-widest font-semibold"
                        style={{ border: '1px solid rgba(201,169,110,0.3)', color: '#C9A96E' }}
                      >
                        {t.procedure}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dots */}
        <div className="flex gap-2 mt-8 justify-center">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => { emblaApi?.scrollTo(i); setActiveIndex(i); }}
              className="transition-all duration-300"
              style={{
                width: i === activeIndex ? '24px' : '8px',
                height: '4px',
                background: i === activeIndex ? '#C9A96E' : 'rgba(201,169,110,0.25)',
                border: 'none',
              }}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default TestimonialsSection;
