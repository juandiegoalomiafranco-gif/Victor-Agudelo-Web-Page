import React from 'react';
import { motion } from 'framer-motion';
import CounterAnimation from './CounterAnimation';

const stats = [
  { value: 60, suffix: '+', label: 'Cirugías por Mes', detail: 'Estéticas y funcionales' },
  { value: 20, suffix: '+', label: 'Años de Experiencia', detail: 'Práctica privada e institucional' },
  { value: 2, suffix: '', label: 'Membresías Nacionales', detail: 'SCCPFR y ACORL' },
  { value: 100, suffix: '%', label: 'Dedicación Facial', detail: 'Especialista exclusivo facial' },
];

const StatsSection: React.FC = () => {
  return (
    <section
      className="py-24 relative overflow-hidden"
      style={{
        background: 'rgba(26,31,46,0.5)',
        borderTop: '1px solid rgba(201,169,110,0.1)',
        borderBottom: '1px solid rgba(201,169,110,0.1)',
      }}
    >
      {/* Diagonal decoration */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(rgba(201,169,110,0.06) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-0">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.12 }}
              className="flex flex-col items-start py-10 px-8 relative"
              style={{ borderRight: i < 3 ? '1px solid rgba(201,169,110,0.1)' : 'none' }}
            >
              {/* Number */}
              <span
                className="text-6xl md:text-7xl font-black leading-none mb-3"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  color: '#C9A96E',
                }}
              >
                <CounterAnimation value={stat.value} suffix={stat.suffix} />
              </span>

              {/* Label */}
              <span
                className="text-sm font-bold uppercase tracking-wider mb-1"
                style={{ color: '#F8F8F8' }}
              >
                {stat.label}
              </span>

              {/* Detail */}
              <span
                className="text-xs leading-tight"
                style={{ color: 'rgba(248,248,248,0.35)' }}
              >
                {stat.detail}
              </span>

              {/* Top accent line */}
              <div
                className="absolute top-0 left-8"
                style={{ width: '32px', height: '2px', background: '#C9A96E' }}
              />
            </motion.div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          className="mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4"
          style={{ borderTop: '1px dashed rgba(201,169,110,0.15)' }}
        >
          <p
            className="text-[10px] uppercase tracking-[0.35em] font-semibold"
            style={{ color: 'rgba(201,169,110,0.5)' }}
          >
            Consultas anuales nacionales e internacionales
          </p>
          <div className="hidden md:block h-px flex-1 mx-8" style={{ background: 'rgba(201,169,110,0.1)' }} />
          <p
            className="text-[10px] uppercase tracking-[0.35em] font-semibold"
            style={{ color: 'rgba(201,169,110,0.5)' }}
          >
            Cali, Colombia · Práctica Privada desde 2004
          </p>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
