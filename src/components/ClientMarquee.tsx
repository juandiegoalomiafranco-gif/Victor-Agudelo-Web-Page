import React from 'react';
import { motion } from 'framer-motion';

const items = [
  '60+ Cirugías Mensuales',
  'Rinoplastia Estética',
  'Mentoplastia',
  'Otoplastia',
  'Cirugía ORL Funcional',
  'Miembro SCCPFR',
  'Miembro ACORL',
  'Cali, Colombia',
  '20+ Años Experiencia',
  'Resultados Naturales',
];

const doubled = [...items, ...items];

const ClientMarquee: React.FC = () => {
  return (
    <div
      className="overflow-hidden relative py-0"
      style={{
        borderTop: '1px solid rgba(201,169,110,0.08)',
        borderBottom: '1px solid rgba(201,169,110,0.08)',
        background: 'rgba(26,31,46,0.3)',
      }}
    >
      <div className="flex overflow-hidden whitespace-nowrap">
        <motion.div
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 30, ease: 'linear', repeat: Infinity }}
          className="flex gap-0 flex-shrink-0"
        >
          {doubled.map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-6 px-10 py-5"
              style={{ borderRight: '1px solid rgba(201,169,110,0.08)' }}
            >
              <span
                className="text-[10px] font-semibold uppercase tracking-[0.3em] whitespace-nowrap"
                style={{ color: 'rgba(248,248,248,0.3)' }}
              >
                {item}
              </span>
              <span style={{ color: 'rgba(201,169,110,0.3)', fontSize: '6px' }}>◆</span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default ClientMarquee;
