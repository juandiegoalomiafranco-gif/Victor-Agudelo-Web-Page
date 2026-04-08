import React from 'react';
import { motion } from 'framer-motion';

const CTASection: React.FC = () => {
  const openWhatsApp = () => {
    const msg = encodeURIComponent('Hola Dr. Agudelo, me gustaría agendar una consulta. ¿Cuál es su disponibilidad?');
    window.open(`https://wa.me/573XXXXXXXXX?text=${msg}`, '_blank');
  };

  return (
    <section
      className="relative py-40 overflow-hidden"
      style={{ background: '#0D1117' }}
    >
      {/* Background image with overlay */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(13,17,23,0.88) 0%, rgba(13,17,23,0.75) 50%, rgba(13,17,23,0.92) 100%),
            url('https://images.unsplash.com/photo-1551601651-2a8555f1a136?q=80&w=2000')
          `,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      />

      {/* Rotating lines */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {[0, 60, 120].map((deg, i) => (
          <motion.div
            key={i}
            animate={{ rotate: deg + 360 }}
            transition={{ duration: 40 + i * 10, repeat: Infinity, ease: 'linear' }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{
              width: '140vw',
              height: '1px',
              background: `rgba(201,169,110,${0.03 - i * 0.008})`,
              transformOrigin: 'center',
            }}
          />
        ))}
      </div>

      {/* Gold glow center */}
      <div
        className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center"
      >
        <div
          style={{
            width: '600px',
            height: '600px',
            background: 'radial-gradient(circle, rgba(201,169,110,0.06) 0%, transparent 70%)',
          }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10 text-center">

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex items-center justify-center gap-4 mb-8"
        >
          <div className="h-px w-12" style={{ background: '#C9A96E' }} />
          <span className="text-[10px] uppercase tracking-[0.4em] font-semibold" style={{ color: '#C9A96E' }}>
            Consulta Especializada // Sin Compromisos
          </span>
          <div className="h-px w-12" style={{ background: '#C9A96E' }} />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="leading-none mb-8"
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(2.5rem, 8vw, 7rem)',
            fontWeight: 800,
            color: '#F8F8F8',
          }}
        >
          Su Mejor Versión<br />
          <span
            className="italic"
            style={{
              background: 'linear-gradient(135deg, #C9A96E 0%, #E8C97A 50%, #C9A96E 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              backgroundSize: '200% auto',
            }}
          >
            Comienza Aquí.
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-lg mb-14 max-w-xl mx-auto"
          style={{ color: 'rgba(248,248,248,0.55)' }}
        >
          Reserve su consulta hoy. El Dr. Agudelo y su equipo responden en menos de 2 horas.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <button
            onClick={openWhatsApp}
            className="flex items-center gap-3 px-10 py-5 text-sm font-bold uppercase tracking-widest transition-all duration-300"
            style={{ background: '#C9A96E', color: '#0D1117' }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLButtonElement).style.background = '#E8C97A';
              (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLButtonElement).style.background = '#C9A96E';
              (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)';
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
            Agendar por WhatsApp
          </button>

          <a
            href="#contacto"
            className="px-10 py-5 text-sm font-bold uppercase tracking-widest transition-all duration-300"
            style={{ border: '1px solid rgba(201,169,110,0.4)', color: '#C9A96E' }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLAnchorElement).style.borderColor = '#C9A96E';
              (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(201,169,110,0.08)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(201,169,110,0.4)';
              (e.currentTarget as HTMLAnchorElement).style.background = 'transparent';
            }}
          >
            Enviar Formulario →
          </a>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-10 text-[10px] uppercase tracking-[0.35em]"
          style={{ color: 'rgba(248,248,248,0.2)' }}
        >
          Confidencialidad garantizada · Cali, Colombia · Respuesta en menos de 2 horas
        </motion.p>

      </div>
    </section>
  );
};

export default CTASection;
