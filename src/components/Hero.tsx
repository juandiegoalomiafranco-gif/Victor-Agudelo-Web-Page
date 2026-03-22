import { motion } from "framer-motion";
import { ArrowRight, Phone } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-primary">
      {/* Animated gradient background */}
      <div className="absolute inset-0 animate-gradient" style={{
        background: "linear-gradient(135deg, hsl(220 60% 13%) 0%, hsl(220 50% 18%) 25%, hsl(211 50% 20%) 50%, hsl(220 55% 15%) 75%, hsl(220 60% 13%) 100%)",
        backgroundSize: "200% 200%",
      }} />

      {/* Grid overlay */}
      <div className="absolute inset-0 opacity-[0.04]" style={{
        backgroundImage: "linear-gradient(hsl(0 0% 100%) 1px, transparent 1px), linear-gradient(90deg, hsl(0 0% 100%) 1px, transparent 1px)",
        backgroundSize: "80px 80px",
      }} />

      {/* Floating geometric shapes */}
      <motion.div
        className="absolute w-72 h-72 border border-accent/10 rounded-full top-20 -left-20"
        animate={{ y: [0, -30, 0], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-40 h-40 border border-gold/10 rotate-45 top-40 right-20"
        animate={{ y: [0, -20, 0], rotate: [45, 50, 45] }}
        transition={{ duration: 7, delay: 2, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-24 h-24 bg-accent/5 rounded-full bottom-40 left-1/4"
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 6, delay: 1, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10 container mx-auto px-6 lg:px-8 text-center max-w-5xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 bg-accent/15 border border-accent/25 rounded-full px-5 py-2 mb-8"
        >
          <div className="w-2 h-2 bg-gold rounded-full animate-pulse-glow" />
          <span className="text-gold text-sm font-semibold">+25 años creando grandes ideas</span>
        </motion.div>

        <div className="overflow-hidden mb-3">
          <motion.h1
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-heading font-extrabold text-white leading-[1.05]"
          >
            Hacemos que tu
          </motion.h1>
        </div>
        <div className="overflow-hidden mb-4">
          <motion.h1
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-heading font-extrabold leading-[1.05]"
          >
            marca <span className="text-gradient-gold italic">hable</span>
          </motion.h1>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto mb-3 font-body"
        >
          Publicidad visual que conecta marcas con personas
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="text-gold font-heading italic font-bold text-xl md:text-2xl mb-10"
        >
          La fábrica de las grandes ideas
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href="#portafolio"
            className="group bg-accent text-accent-foreground px-8 py-4 rounded-md text-base font-bold hover:brightness-110 transition-all inline-flex items-center justify-center gap-2"
          >
            Ver portafolio
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="#contacto"
            className="group border border-white/25 text-white px-8 py-4 rounded-md text-base font-bold hover:border-gold hover:text-gold transition-all inline-flex items-center justify-center gap-2"
          >
            <Phone size={16} />
            Contáctanos
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center pt-2">
          <div className="w-1 h-2 bg-accent rounded-full" />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
