import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsVisible(currentScrollY < lastScrollY || currentScrollY < 100);
      setIsScrolled(currentScrollY > 50);
      setLastScrollY(currentScrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const navLinks = [
    { name: 'Especialidad', href: '#nosotros' },
    { name: 'Procedimientos', href: '#procedimientos' },
    { name: 'Proceso', href: '#proceso' },
    { name: 'Galería', href: '#galeria' },
    { name: 'Contacto', href: '#contacto' },
  ];

  const openWhatsApp = () => {
    const msg = encodeURIComponent('Hola Dr. Agudelo, me gustaría agendar una consulta.');
    window.open(`https://wa.me/573XXXXXXXXX?text=${msg}`, '_blank');
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: isVisible ? 0 : -80 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 w-full z-50 transition-all duration-500"
        style={{
          background: isScrolled
            ? 'rgba(13,17,23,0.92)'
            : 'transparent',
          backdropFilter: isScrolled ? 'blur(20px)' : 'none',
          borderBottom: isScrolled ? '1px solid rgba(201,169,110,0.12)' : 'none',
          padding: isScrolled ? '16px 0' : '28px 0',
        }}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">

          {/* Logo */}
          <a href="#hero" className="flex items-center gap-3 group">
            <div
              className="w-10 h-10 flex items-center justify-center text-sm font-black transition-all duration-300 group-hover:scale-105"
              style={{
                border: '1px solid rgba(201,169,110,0.6)',
                color: '#C9A96E',
                fontFamily: "'Playfair Display', serif",
                fontSize: '18px',
              }}
            >
              VA
            </div>
            <div className="hidden sm:block">
              <p className="text-[10px] uppercase tracking-[0.35em] font-semibold leading-none" style={{ color: '#C9A96E' }}>
                Dr. Víctor Agudelo
              </p>
              <p className="text-[9px] uppercase tracking-[0.25em] opacity-40 leading-tight mt-0.5" style={{ color: '#F8F8F8' }}>
                Cali · Colombia
              </p>
            </div>
          </a>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-10">
            {navLinks.map(link => (
              <a
                key={link.name}
                href={link.href}
                className="text-[11px] font-semibold uppercase tracking-[0.2em] transition-all duration-300 relative group"
                style={{ color: 'rgba(248,248,248,0.55)' }}
                onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color = '#C9A96E'}
                onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(248,248,248,0.55)'}
              >
                {link.name}
                <span
                  className="absolute -bottom-1 left-0 w-0 h-px transition-all duration-300 group-hover:w-full"
                  style={{ background: '#C9A96E' }}
                />
              </a>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <button
              onClick={openWhatsApp}
              className="px-6 py-3 text-[11px] font-semibold uppercase tracking-widest transition-all duration-300"
              style={{
                background: '#C9A96E',
                color: '#0D1117',
              }}
              onMouseEnter={e => (e.currentTarget as HTMLButtonElement).style.background = '#E8C97A'}
              onMouseLeave={e => (e.currentTarget as HTMLButtonElement).style.background = '#C9A96E'}
            >
              Agendar Consulta ↗
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            <motion.span
              animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 8 : 0 }}
              className="block w-6 h-0.5"
              style={{ background: '#C9A96E' }}
            />
            <motion.span
              animate={{ opacity: menuOpen ? 0 : 1 }}
              className="block w-6 h-0.5"
              style={{ background: '#C9A96E' }}
            />
            <motion.span
              animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -8 : 0 }}
              className="block w-6 h-0.5"
              style={{ background: '#C9A96E' }}
            />
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 left-0 w-full h-screen z-40 flex flex-col justify-center items-center gap-10"
            style={{ background: 'rgba(13,17,23,0.98)' }}
          >
            {navLinks.map((link, i) => (
              <motion.a
                key={link.name}
                href={link.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
                onClick={() => setMenuOpen(false)}
                className="text-2xl font-bold uppercase tracking-widest"
                style={{ fontFamily: "'Playfair Display', serif", color: '#F8F8F8' }}
              >
                {link.name}
              </motion.a>
            ))}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: navLinks.length * 0.07 }}
              onClick={() => { openWhatsApp(); setMenuOpen(false); }}
              className="px-10 py-4 text-sm font-semibold uppercase tracking-widest mt-4"
              style={{ background: '#C9A96E', color: '#0D1117' }}
            >
              Agendar Consulta ↗
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
