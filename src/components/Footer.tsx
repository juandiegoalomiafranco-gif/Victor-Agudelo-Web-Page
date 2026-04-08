import React from 'react';
import { motion } from 'framer-motion';

const Footer: React.FC = () => {
  const openWhatsApp = () => {
    const msg = encodeURIComponent('Hola Dr. Agudelo, me gustaría agendar una consulta.');
    window.open(`https://wa.me/573XXXXXXXXX?text=${msg}`, '_blank');
  };

  return (
    <footer
      className="relative overflow-hidden"
      style={{
        background: 'rgba(10,13,20,1)',
        borderTop: '1px solid rgba(201,169,110,0.15)',
      }}
    >
      {/* Top CTA strip */}
      <div
        className="py-10 px-6"
        style={{ borderBottom: '1px solid rgba(201,169,110,0.1)' }}
      >
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] font-semibold mb-1" style={{ color: 'rgba(201,169,110,0.6)' }}>
              ¿Listo para su consulta?
            </p>
            <p className="text-xl font-bold" style={{ fontFamily: "'Playfair Display', serif", color: '#F8F8F8' }}>
              El Dr. Agudelo responde en menos de 2 horas.
            </p>
          </div>
          <button
            onClick={openWhatsApp}
            className="px-8 py-4 text-xs font-bold uppercase tracking-widest flex items-center gap-3 flex-shrink-0 transition-all duration-300"
            style={{ background: '#C9A96E', color: '#0D1117' }}
            onMouseEnter={e => (e.currentTarget as HTMLButtonElement).style.background = '#E8C97A'}
            onMouseLeave={e => (e.currentTarget as HTMLButtonElement).style.background = '#C9A96E'}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
            Agendar Consulta
          </button>
        </div>
      </div>

      {/* Main footer */}
      <div className="container mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-16">

          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-8">
              <div
                className="w-12 h-12 flex items-center justify-center text-xl font-black"
                style={{
                  border: '1px solid rgba(201,169,110,0.5)',
                  color: '#C9A96E',
                  fontFamily: "'Playfair Display', serif",
                }}
              >
                VA
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.3em]" style={{ color: '#C9A96E' }}>
                  Dr. Víctor Agudelo
                </p>
                <p className="text-[10px] uppercase tracking-widest opacity-40" style={{ color: '#F8F8F8' }}>
                  Cali · Colombia
                </p>
              </div>
            </div>

            <p className="text-xs leading-relaxed mb-8" style={{ color: 'rgba(248,248,248,0.35)' }}>
              Especialista en Otorrinolaringología y Cirugía Plástica Facial. 20+ años de experiencia.
              60+ cirugías mensuales con resultados naturales.
            </p>

            {/* Social */}
            <div className="flex gap-2">
              {['IG', 'FB', 'YT'].map(s => (
                <a
                  key={s}
                  href="#"
                  className="w-10 h-10 flex items-center justify-center text-[10px] font-bold uppercase tracking-widest transition-all duration-300"
                  style={{ border: '1px solid rgba(201,169,110,0.2)', color: 'rgba(248,248,248,0.4)' }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLAnchorElement).style.borderColor = '#C9A96E';
                    (e.currentTarget as HTMLAnchorElement).style.color = '#C9A96E';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(201,169,110,0.2)';
                    (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(248,248,248,0.4)';
                  }}
                >
                  {s}
                </a>
              ))}
            </div>
          </div>

          {/* Procedimientos */}
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] mb-8" style={{ color: '#C9A96E' }}>
              Procedimientos
            </h4>
            <ul className="flex flex-col gap-3">
              {['Rinoplastia', 'Mentoplastia', 'Otoplastia', 'Cirugía ORL Funcional', 'Septoplastia'].map(item => (
                <li key={item}>
                  <a
                    href="#procedimientos"
                    className="text-xs uppercase tracking-widest transition-all duration-300"
                    style={{ color: 'rgba(248,248,248,0.45)' }}
                    onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color = '#C9A96E'}
                    onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(248,248,248,0.45)'}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Información */}
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] mb-8" style={{ color: '#C9A96E' }}>
              Información
            </h4>
            <ul className="flex flex-col gap-3">
              {[
                { label: 'Sobre el Dr. Agudelo', href: '#nosotros' },
                { label: 'El Proceso', href: '#proceso' },
                { label: 'Testimonios', href: '#galeria' },
                { label: 'Preguntas Frecuentes', href: '#contacto' },
              ].map(item => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="text-xs uppercase tracking-widest transition-all duration-300"
                    style={{ color: 'rgba(248,248,248,0.45)' }}
                    onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color = '#C9A96E'}
                    onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(248,248,248,0.45)'}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Membresías + Contacto */}
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] mb-8" style={{ color: '#C9A96E' }}>
              Membresías
            </h4>
            <div className="space-y-4 mb-8">
              {[
                { abbr: 'SCCPFR', full: 'Sociedad Colombiana de Cirugía Plástica Facial y Rinología' },
                { abbr: 'ACORL', full: 'Asociación Colombiana de Otorrinolaringología' },
              ].map(m => (
                <div key={m.abbr} className="p-3" style={{ border: '1px solid rgba(201,169,110,0.15)', background: 'rgba(201,169,110,0.04)' }}>
                  <p className="text-xs font-bold" style={{ color: '#C9A96E' }}>{m.abbr}</p>
                  <p className="text-[10px] mt-0.5 leading-tight" style={{ color: 'rgba(248,248,248,0.35)' }}>{m.full}</p>
                </div>
              ))}
            </div>

            <div className="space-y-2">
              <p className="text-[10px] uppercase tracking-wider font-semibold" style={{ color: 'rgba(248,248,248,0.3)' }}>
                Miembro desde 2004
              </p>
              <p className="text-[10px]" style={{ color: 'rgba(248,248,248,0.25)' }}>
                doctorvictoragudelo.com
              </p>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div
          className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4"
          style={{ borderTop: '1px solid rgba(201,169,110,0.08)' }}
        >
          <p className="text-[10px] uppercase tracking-[0.3em]" style={{ color: 'rgba(248,248,248,0.15)' }}>
            © 2026 Dr. Víctor Manuel Agudelo · Cali, Colombia
          </p>
          <div className="flex gap-8">
            {['Política de Datos (HABEAS DATA)', 'Aviso Legal'].map(item => (
              <a
                key={item}
                href="#"
                className="text-[10px] uppercase tracking-widest transition-opacity duration-300"
                style={{ color: 'rgba(248,248,248,0.15)' }}
                onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(201,169,110,0.6)'}
                onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(248,248,248,0.15)'}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
