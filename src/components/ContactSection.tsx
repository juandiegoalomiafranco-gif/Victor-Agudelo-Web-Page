import React, { useState } from 'react';
import { motion } from 'framer-motion';

const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    ciudad: '',
    procedimiento: 'Rinoplastia',
    mensaje: '',
  });
  const [sent, setSent] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = encodeURIComponent(
      `Hola Dr. Agudelo, mi nombre es ${formData.nombre} de ${formData.ciudad}.\n` +
      `Estoy interesado/a en una consulta sobre: ${formData.procedimiento}.\n\n` +
      `${formData.mensaje}`
    );
    window.open(`https://wa.me/573XXXXXXXXX?text=${msg}`, '_blank');
    setSent(true);
  };

  return (
    <section
      id="contacto"
      className="py-32 relative overflow-hidden"
      style={{ background: '#0D1117' }}
    >
      {/* Background */}
      <div
        className="absolute right-0 bottom-0 w-80 h-80 pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(201,169,110,0.04) 0%, transparent 70%)' }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(rgba(201,169,110,0.05) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">

          {/* Left info column */}
          <div className="flex flex-col gap-12">
            <div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex items-center gap-4 mb-6"
              >
                <div className="h-px w-12" style={{ background: '#C9A96E' }} />
                <span className="text-[10px] uppercase tracking-[0.4em] font-semibold" style={{ color: '#C9A96E' }}>
                  Contacto // Consultas
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
                  fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
                  fontWeight: 800,
                  color: '#F8F8F8',
                }}
              >
                Iniciemos<br />
                <span
                  className="italic"
                  style={{
                    background: 'linear-gradient(135deg, #C9A96E, #E8C97A)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  su Consulta.
                </span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-base leading-relaxed"
                style={{ color: 'rgba(248,248,248,0.55)' }}
              >
                Complete el formulario y su mensaje llegará directamente al Dr. Agudelo vía WhatsApp.
                Respuesta garantizada en menos de 2 horas en horario laboral.
              </motion.p>
            </div>

            {/* Contact info cards */}
            <div className="space-y-4">
              {[
                {
                  icon: (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                    </svg>
                  ),
                  label: 'WhatsApp Directo',
                  value: '+57 300 XXX XXXX',
                  sub: 'Respuesta en < 2 horas',
                },
                {
                  icon: (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                    </svg>
                  ),
                  label: 'Ubicación',
                  value: 'Cali, Colombia',
                  sub: 'Atención presencial y por teleconsulta',
                },
                {
                  icon: (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                    </svg>
                  ),
                  label: 'Horario de Atención',
                  value: 'Lunes a Viernes',
                  sub: '8:00 AM – 6:00 PM',
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-5 p-5 group transition-all duration-300"
                  style={{ border: '1px solid rgba(201,169,110,0.12)', background: 'rgba(26,31,46,0.4)' }}
                  onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(201,169,110,0.3)'}
                  onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(201,169,110,0.12)'}
                >
                  <div
                    className="w-12 h-12 flex items-center justify-center flex-shrink-0 transition-all duration-300"
                    style={{ border: '1px solid rgba(201,169,110,0.3)', color: '#C9A96E' }}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest font-semibold mb-1" style={{ color: 'rgba(201,169,110,0.7)' }}>
                      {item.label}
                    </p>
                    <p className="font-bold text-sm" style={{ color: '#F8F8F8' }}>{item.value}</p>
                    <p className="text-xs mt-0.5" style={{ color: 'rgba(248,248,248,0.35)' }}>{item.sub}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right — form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative"
          >
            <div
              className="p-10 relative"
              style={{
                background: 'rgba(26,31,46,0.6)',
                border: '1px solid rgba(201,169,110,0.2)',
                backdropFilter: 'blur(10px)',
              }}
            >
              {/* Gold top line */}
              <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: 'linear-gradient(90deg, #C9A96E, transparent)' }} />

              {sent ? (
                <div className="text-center py-16">
                  <div className="text-5xl mb-4">✓</div>
                  <h3
                    className="text-2xl font-bold mb-3"
                    style={{ fontFamily: "'Playfair Display', serif", color: '#C9A96E' }}
                  >
                    Mensaje Enviado
                  </h3>
                  <p className="text-sm" style={{ color: 'rgba(248,248,248,0.55)' }}>
                    Su consulta fue enviada por WhatsApp. El Dr. Agudelo le responderá pronto.
                  </p>
                  <button
                    onClick={() => setSent(false)}
                    className="mt-6 text-xs uppercase tracking-widest"
                    style={{ color: '#C9A96E', textDecoration: 'underline' }}
                  >
                    Enviar otra consulta
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {[
                      { label: 'Nombre Completo *', name: 'nombre', placeholder: 'Ej. María García', type: 'text', required: true },
                      { label: 'Ciudad / País', name: 'ciudad', placeholder: 'Ej. Cali, Colombia', type: 'text', required: false },
                    ].map(field => (
                      <div key={field.name} className="flex flex-col gap-2">
                        <label
                          className="text-[10px] font-semibold uppercase tracking-[0.2em]"
                          style={{ color: 'rgba(201,169,110,0.7)' }}
                        >
                          {field.label}
                        </label>
                        <input
                          type={field.type}
                          name={field.name}
                          required={field.required}
                          value={(formData as any)[field.name]}
                          onChange={handleChange}
                          placeholder={field.placeholder}
                          className="bg-transparent py-4 text-base outline-none transition-all duration-300"
                          style={{
                            borderBottom: '1px solid rgba(201,169,110,0.2)',
                            color: '#F8F8F8',
                          }}
                          onFocus={e => (e.target as HTMLInputElement).style.borderBottomColor = '#C9A96E'}
                          onBlur={e => (e.target as HTMLInputElement).style.borderBottomColor = 'rgba(201,169,110,0.2)'}
                        />
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-col gap-2">
                    <label
                      className="text-[10px] font-semibold uppercase tracking-[0.2em]"
                      style={{ color: 'rgba(201,169,110,0.7)' }}
                    >
                      Procedimiento de Interés
                    </label>
                    <select
                      name="procedimiento"
                      value={formData.procedimiento}
                      onChange={handleChange}
                      className="bg-transparent py-4 text-base outline-none appearance-none cursor-pointer transition-colors duration-300"
                      style={{
                        borderBottom: '1px solid rgba(201,169,110,0.2)',
                        color: '#F8F8F8',
                      }}
                    >
                      <option value="Rinoplastia" style={{ background: '#1A1F2E' }}>Rinoplastia — Cirugía de Nariz</option>
                      <option value="Mentoplastia" style={{ background: '#1A1F2E' }}>Mentoplastia — Cirugía de Mentón</option>
                      <option value="Otoplastia" style={{ background: '#1A1F2E' }}>Otoplastia — Cirugía de Orejas</option>
                      <option value="Cirugía ORL Funcional" style={{ background: '#1A1F2E' }}>Cirugía ORL Funcional</option>
                      <option value="Consulta General" style={{ background: '#1A1F2E' }}>Consulta General</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label
                      className="text-[10px] font-semibold uppercase tracking-[0.2em]"
                      style={{ color: 'rgba(201,169,110,0.7)' }}
                    >
                      Cuéntenos su Caso *
                    </label>
                    <textarea
                      name="mensaje"
                      required
                      rows={4}
                      value={formData.mensaje}
                      onChange={handleChange}
                      placeholder="Describa brevemente su caso, sus objetivos y cualquier pregunta que tenga..."
                      className="bg-transparent py-4 text-base outline-none resize-none transition-colors duration-300"
                      style={{
                        borderBottom: '1px solid rgba(201,169,110,0.2)',
                        color: '#F8F8F8',
                      }}
                      onFocus={e => (e.target as HTMLTextAreaElement).style.borderBottomColor = '#C9A96E'}
                      onBlur={e => (e.target as HTMLTextAreaElement).style.borderBottomColor = 'rgba(201,169,110,0.2)'}
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-5 text-sm font-bold uppercase tracking-widest flex items-center justify-center gap-3 transition-all duration-300"
                    style={{ background: '#C9A96E', color: '#0D1117' }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLButtonElement).style.background = '#E8C97A';
                      (e.currentTarget as HTMLButtonElement).style.letterSpacing = '0.2em';
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLButtonElement).style.background = '#C9A96E';
                      (e.currentTarget as HTMLButtonElement).style.letterSpacing = '0.15em';
                    }}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                    </svg>
                    Enviar por WhatsApp →
                  </button>

                  <p className="text-center text-[9px] uppercase tracking-widest" style={{ color: 'rgba(248,248,248,0.2)' }}>
                    Información confidencial · Ley 1581 HABEAS DATA Colombia
                  </p>
                </form>
              )}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default ContactSection;
