import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, ArrowUpRight } from "lucide-react";

const navLinks = [
  { label: "Servicios", href: "#servicios", hasDropdown: true },
  { label: "Experiencia", href: "#nosotros", hasDropdown: true },
  { label: "Casos", href: "#portafolio", hasDropdown: false },
  { label: "Recursos", href: "#proceso", hasDropdown: true },
  { label: "Equipo", href: "#equipo", hasDropdown: false },
];

const ExactNavbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setScrolled(currentY > 10);
      setHidden(currentY > lastScrollY && currentY > 200);
      setLastScrollY(currentY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <>
      <div className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
        <motion.nav
          initial={{ y: -100 }}
          animate={{ y: hidden ? -100 : 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className={`pointer-events-auto transition-all duration-300 w-full rounded-md md:rounded-[4px] px-3 py-2.5 md:py-1.5 flex items-center justify-between ${
            scrolled
              ? "bg-white/95 backdrop-blur-xl shadow-lg border border-black/[0.03] max-w-5xl"
              : "bg-white shadow-md border border-black/[0.03] max-w-5xl"
          }`}
          style={{
            // Mimicking the extremely specific slight border radius of Dapper's pill
            borderRadius: "6px"
          }}
        >
          {/* Logo (Left) */}
          <a href="#" className="flex items-center gap-2 pl-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-sm group">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-primary group-hover:rotate-12 transition-transform">
              <path d="M12 0C12 0 12 10 24 12C24 12 12 14 12 24C12 24 12 14 0 12C0 12 12 10 12 0Z" fill="currentColor"/>
            </svg>
            <span className="font-heading font-extrabold text-lg text-primary tracking-tight">Imágenes Gráficas</span>
          </a>

          {/* Links (Center) */}
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-[13px] font-bold text-primary hover:text-accent transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm flex items-center gap-1 font-body tracking-tight"
              >
                {link.label}
                {link.hasDropdown && <ChevronDown size={14} className="opacity-70" />}
              </a>
            ))}
          </div>

          {/* CTA Button (Right) */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="#contacto"
              className="group flex items-center gap-3 text-primary text-[13px] font-bold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm pr-1"
            >
              Hablemos
              <span className="bg-green-300 text-primary p-1 rounded-[3px] overflow-hidden transition-all duration-300 group-hover:bg-green-400">
                <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </span>
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileOpen(true)}
            className="lg:hidden text-primary p-1.5 active:scale-95 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-md"
          >
            <Menu size={20} />
          </button>
        </motion.nav>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ type: "tween", duration: 0.2 }}
            className="fixed inset-0 z-[60] bg-[#F8F8F8] flex flex-col pt-24 px-6"
          >
            <button onClick={() => setMobileOpen(false)} className="absolute top-6 right-6 text-primary p-2 active:scale-95 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm bg-black/5">
              <X size={24} />
            </button>
            <div className="flex flex-col flex-1 gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-4xl font-heading font-bold text-primary hover:text-accent transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent tracking-tighter"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#contacto"
                onClick={() => setMobileOpen(false)}
                className="bg-green-300 text-primary px-8 py-5 rounded-md text-lg font-bold mt-8 text-center transition-all duration-300 active:scale-[0.98] font-body flex items-center justify-center gap-2"
              >
                Hablemos <ArrowUpRight size={20} />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ExactNavbar;
