import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const credentials = [
  { icon: '🏛', title: 'Universidad del Valle', subtitle: 'Médico Cirujano — Cali, Colombia' },
  { icon: '🎓', title: 'Universidad San Martín', subtitle: 'Especialista en ORL — Bogotá, Colombia' },
  { icon: '🏅', title: 'SCCPFR', subtitle: 'Sociedad Colombiana de Cirugía Plástica Facial — Miembro desde 2004' },
  { icon: '🏅', title: 'ACORL', subtitle: 'Asoc. Colombiana de Otorrinolaringología — Miembro desde 2004' },
];

const AboutSection: React.FC = () => {
  return (
    <section id="nosotros" className="py-32 relative overflow-hidden" style={{ background: '#0D1117' }}>

      {/* Background line decoration */}
      <div
        className="absolute left-0 top-1/2 w-1/3 h-px pointer-events-none"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(201,169,110,0.1))' }}
      />

      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">

          {/* Left — Image + floating badge */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 relative"
          >
            {/* Main image frame */}
            <div
              className="relative overflow-hidden"
              style={{
                border: '1px solid rgba(201,169,110,0.2)',
                aspectRatio: '4/5',
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=800"
                alt="Dr. Víctor Agudelo"
                className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
                style={{ filter: 'grayscale(20%)' }}
              />
              {/* Gold overlay gradient */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{ background: 'linear-gradient(to top, rgba(13,17,23,0.6) 0%, transparent 50%)' }}
              />
              {/* Bottom name tag */}
              <div
                className="absolute bottom-0 left-0 right-0 p-6"
                style={{ background: 'linear-gradient(to top, rgba(13,17,23,0.9), transparent)' }}
              >
                <p className="text-xs uppercase tracking-[0.3em] font-semibold" style={{ color: '#C9A96E' }}>
                  Otorrinolaringólogo · Cirujano Plástico Facial
                </p>
                <p className="text-xl font-bold mt-1" style={{ fontFamily: "'Playfair Display', serif", color: '#F8F8F8' }}>
                  Dr. Víctor Manuel Agudelo
                </p>
              </div>
            </div>

            {/* Floating stat card */}
            <motion.div
              initial={{ opacity: 0, x: 30, y: 30 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="absolute -right-8 -bottom-8 p-6 hidden md:block"
              style={{
                background: '#C9A96E',
                minWidth: '160px',
              }}
            >
              <p className="text-5xl font-black leading-none" style={{ fontFamily: "'Playfair Display', serif", color: '#0D1117' }}>
                60+
              </p>
              <p className="text-[10px] font-bold uppercase tracking-wider mt-2" style={{ color: 'rgba(13,17,23,0.7)' }}>
                Cirugías<br />por Mes
              </p>
            </motion.div>

            {/* Gold border accent */}
            <div
              className="absolute -top-4 -left-4 w-16 h-16 pointer-events-none hidden md:block"
              style={{ border: '2px solid rgba(201,169,110,0.3)', borderRight: 'none', borderBottom: 'none' }}
            />
          </motion.div>

          {/* Right — Bio content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7 flex flex-col gap-8"
          >
            <div className="flex items-center gap-4">
              <div className="h-px w-12" style={{ background: '#C9A96E' }} />
              <span className="text-[10px] uppercase tracking-[0.4em] font-semibold" style={{ color: '#C9A96E' }}>
                Sobre el Médico // Trayectoria
              </span>
            </div>

            <h2
              className="leading-tight"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 'clamp(2rem, 5vw, 4rem)',
                fontWeight: 800,
                color: '#F8F8F8',
              }}
            >
              Formación de Élite.<br />
              <span
                className="italic"
                style={{
                  background: 'linear-gradient(135deg, #C9A96E, #E8C97A)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Resultados Reales.
              </span>
            </h2>

            <div className="space-y-4 text-base leading-relaxed" style={{ color: 'rgba(248,248,248,0.65)' }}>
              <p>
                Víctor Manuel Agudelo es Médico Cirujano de la <strong style={{ color: '#F8F8F8' }}>Universidad del Valle (Cali, Colombia)</strong> y realizó su especialización de Otorrinolaringología en la <strong style={{ color: '#F8F8F8' }}>Universidad San Martín (Bogotá, Colombia)</strong>.
              </p>
              <p>
                Su actividad médica se ha centrado en dos campos de alta demanda: la cirugía plástica y estética facial con énfasis en rinoplastia, y la cirugía funcional de ORL, atendiendo problemas de obstrucción nasal, alergias, senos paranasales y ronquido.
              </p>
              <p>
                Con un promedio de <strong style={{ color: '#C9A96E' }}>60 cirugías mensuales</strong> —tanto estéticas como funcionales— el Dr. Agudelo asiste anualmente a congresos nacionales e internacionales para mantenerse actualizado con los avances más recientes en su especialidad.
              </p>
            </div>

            {/* Credentials grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              {credentials.map((cred, i) => (
                <motion.div
                  key={cred.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="flex items-start gap-4 p-4"
                  style={{ border: '1px solid rgba(201,169,110,0.12)', background: 'rgba(26,31,46,0.4)' }}
                >
                  <span className="text-2xl mt-0.5">{cred.icon}</span>
                  <div>
                    <p className="text-sm font-bold" style={{ color: '#F8F8F8' }}>{cred.title}</p>
                    <p className="text-xs mt-0.5 leading-tight" style={{ color: 'rgba(248,248,248,0.45)' }}>{cred.subtitle}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default AboutSection;
