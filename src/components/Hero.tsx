import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import AuroraBackground from './AuroraBackground';

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const spring = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const y = useTransform(spring, [0, 1], ['0%', '30%']);
  const opacity = useTransform(spring, [0, 0.6], [1, 0]);
  const scale = useTransform(spring, [0, 1], [1, 1.08]);

  const openWhatsApp = () => {
    const msg = encodeURIComponent('Hola Dr. Agudelo, me gustaría agendar una consulta. ¿Cuál es su disponibilidad?');
    window.open(`https://wa.me/573XXXXXXXXX?text=${msg}`, '_blank');
  };

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: '#0D1117' }}
    >
      <AuroraBackground>
        {/* Parallax background image */}
        <motion.div
          className="absolute inset-0 z-0"
          style={{ y, scale }}
        >
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `linear-gradient(to bottom, rgba(13,17,23,0.7) 0%, rgba(13,17,23,0.4) 40%, rgba(13,17,23,0.85) 100%), url('https://images.unsplash.com/photo-1551190822-a9333d879b1f?q=80&w=2070')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
        </motion.div>

        {/* Main content */}
        <motion.div
          className="relative z-20 container mx-auto px-6 pt-32 pb-24 flex flex-col justify-center min-h-screen"
          style={{ opacity }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

            {/* Left column */}
            <div className="lg:col-span-7 flex flex-col gap-8">

              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="flex items-center gap-4"
              >
                <div className="h-px w-12" style={{ background: '#C9A96E' }} />
                <span
                  className="text-[10px] uppercase tracking-[0.4em] font-semibold"
                  style={{ color: '#C9A96E' }}
                >
                  Otorrinolaringología · Cirugía Plástica Facial
                </span>
              </motion.div>

              {/* Main Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="leading-none"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 'clamp(3rem, 8vw, 7rem)',
                  fontWeight: 800,
                  color: '#F8F8F8',
                  letterSpacing: '-0.02em',
                }}
              >
                Precisión
                <br />
                <span
                  className="italic"
                  style={{
                    background: 'linear-gradient(135deg, #C9A96E 0%, #E8C97A 50%, #C9A96E 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  Quirúrgica.
                </span>
                <br />
                Resultados
                <br />
                Naturales.
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
                className="max-w-lg text-lg leading-relaxed"
                style={{ color: 'rgba(248,248,248,0.65)', fontFamily: "'Inter', sans-serif" }}
              >
                Dr. Víctor Manuel Agudelo — especialista en Rinoplastia, Cirugía Plástica Facial y
                ORL. Más de 60 cirugías mensuales con resultados que preservan la identidad natural.
              </motion.p>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.9 }}
                className="flex flex-wrap gap-4 items-center"
              >
                <button
                  onClick={openWhatsApp}
                  className="group flex items-center gap-3 px-8 py-4 text-sm font-semibold uppercase tracking-widest transition-all duration-400"
                  style={{
                    background: '#C9A96E',
                    color: '#0D1117',
                    letterSpacing: '0.15em',
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = '#E8C97A'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = '#C9A96E'; }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                  Agenda tu Consulta
                </button>

                <a
                  href="#procedimientos"
                  className="flex items-center gap-3 px-8 py-4 text-sm font-semibold uppercase tracking-widest transition-all duration-400"
                  style={{
                    border: '1px solid rgba(201,169,110,0.5)',
                    color: '#C9A96E',
                    letterSpacing: '0.15em',
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLAnchorElement).style.borderColor = '#C9A96E';
                    (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(201,169,110,0.08)';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(201,169,110,0.5)';
                    (e.currentTarget as HTMLAnchorElement).style.background = 'transparent';
                  }}
                >
                  Ver Procedimientos ↓
                </a>
              </motion.div>
            </div>

            {/* Right column — floating credential card */}
            <motion.div
              className="lg:col-span-5 hidden lg:block"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <div
                className="p-8 relative"
                style={{
                  background: 'rgba(26,31,46,0.6)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(201,169,110,0.2)',
                }}
              >
                {/* Gold top line */}
                <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: 'linear-gradient(90deg, transparent, #C9A96E, transparent)' }} />

                <div className="space-y-6">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.4em] mb-1" style={{ color: '#C9A96E' }}>
                      Especialista Certificado
                    </p>
                    <h3 className="text-2xl font-bold" style={{ fontFamily: "'Playfair Display', serif", color: '#F8F8F8' }}>
                      Dr. Víctor Manuel<br />Agudelo
                    </h3>
                  </div>

                  <div className="h-px" style={{ background: 'rgba(201,169,110,0.2)' }} />

                  <div className="space-y-3 text-sm" style={{ color: 'rgba(248,248,248,0.7)' }}>
                    <div className="flex items-start gap-3">
                      <span style={{ color: '#C9A96E' }}>—</span>
                      <span>Médico Cirujano — Universidad del Valle, Cali</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <span style={{ color: '#C9A96E' }}>—</span>
                      <span>Especialista ORL — Universidad San Martín, Bogotá</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <span style={{ color: '#C9A96E' }}>—</span>
                      <span>Miembro SCCPFR y ACORL desde 2004</span>
                    </div>
                  </div>

                  <div className="h-px" style={{ background: 'rgba(201,169,110,0.2)' }} />

                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { value: '60+', label: 'Cirugías / Mes' },
                      { value: '20+', label: 'Años Experiencia' },
                    ].map(s => (
                      <div key={s.label}>
                        <p className="text-3xl font-bold" style={{ fontFamily: "'Playfair Display', serif", color: '#C9A96E' }}>
                          {s.value}
                        </p>
                        <p className="text-[10px] uppercase tracking-wider mt-1" style={{ color: 'rgba(248,248,248,0.4)' }}>
                          {s.label}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

          </div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
          >
            <span className="text-[9px] uppercase tracking-[0.4em]" style={{ color: 'rgba(201,169,110,0.6)' }}>
              Scroll
            </span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              className="w-[1px] h-10"
              style={{ background: 'linear-gradient(to bottom, #C9A96E, transparent)' }}
            />
          </motion.div>

        </motion.div>

      </AuroraBackground>
    </section>
  );
};

export default Hero;
