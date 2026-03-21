import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Nosotros", href: "#nosotros" },
  { label: "Servicios", href: "#servicios" },
  { label: "Portafolio", href: "#portafolio" },
  { label: "Proceso", href: "#proceso" },
  { label: "Contacto", href: "#contacto" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setScrolled(currentY > 50);
      setHidden(currentY > lastScrollY && currentY > 200);
      setLastScrollY(currentY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <>
      <motion.nav
        initial={{ y: 0 }}
        animate={{ y: hidden ? -100 : 0 }}
        transition={{ duration: 0.3 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-background/95 backdrop-blur-xl border-b border-border"
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto flex items-center justify-between py-5 px-6 lg:px-8">
          <a href="#" className="flex items-center gap-3">
            <div className="w-8 h-8 bg-accent rounded-sm flex items-center justify-center">
              <span className="text-accent-foreground font-heading font-bold text-sm">IG</span>
            </div>
            <span className="text-lg font-heading font-bold text-foreground tracking-tight">
              Imágenes Gráficas
            </span>
          </a>

          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-foreground/60 hover:text-accent transition-colors duration-300"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contacto"
              className="bg-accent text-accent-foreground px-6 py-2.5 rounded-sm text-sm font-bold hover:brightness-110 transition-all duration-300"
            >
              Cotiza ahora
            </a>
          </div>

          <button
            onClick={() => setMobileOpen(true)}
            className="lg:hidden text-foreground"
          >
            <Menu size={28} />
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed inset-0 z-[60] bg-background flex flex-col"
          >
            <div className="flex items-center justify-between p-6">
              <span className="text-lg font-heading font-bold text-foreground">
                Imágenes Gráficas
              </span>
              <button onClick={() => setMobileOpen(false)} className="text-foreground">
                <X size={28} />
              </button>
            </div>
            <div className="flex flex-col items-center justify-center flex-1 gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-3xl font-heading font-bold text-foreground hover:text-accent transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#contacto"
                onClick={() => setMobileOpen(false)}
                className="bg-accent text-accent-foreground px-8 py-3 rounded-sm text-lg font-bold mt-4"
              >
                Cotiza ahora
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
