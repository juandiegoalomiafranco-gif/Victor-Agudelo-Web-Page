import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";

const FloatingShape = ({ className, delay }: { className: string; delay: number }) => (
  <motion.div
    className={`absolute ${className}`}
    animate={{
      y: [0, -30, 0],
      rotate: [0, 5, -5, 0],
      opacity: [0.15, 0.3, 0.15],
    }}
    transition={{ duration: 8, delay, repeat: Infinity, ease: "easeInOut" }}
  />
);

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      {/* Animated gradient background */}
      <div className="absolute inset-0 animate-gradient" style={{
        background: "linear-gradient(135deg, hsl(0 0% 4%) 0%, hsl(0 0% 8%) 25%, hsl(48 30% 8%) 50%, hsl(0 0% 6%) 75%, hsl(0 0% 4%) 100%)",
        backgroundSize: "200% 200%",
      }} />

      {/* Grid overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: "linear-gradient(hsl(36 33% 93%) 1px, transparent 1px), linear-gradient(90deg, hsl(36 33% 93%) 1px, transparent 1px)",
        backgroundSize: "80px 80px",
      }} />

      {/* Floating geometric shapes */}
      <FloatingShape
        className="w-64 h-64 border border-accent/10 rounded-full top-20 -left-20"
        delay={0}
      />
      <FloatingShape
        className="w-40 h-40 border border-accent/10 rotate-45 top-40 right-20"
        delay={2}
      />
      <FloatingShape
        className="w-20 h-20 bg-accent/5 rounded-full bottom-40 left-1/4"
        delay={4}
      />
      <FloatingShape
        className="w-32 h-32 border border-foreground/5 rounded-full bottom-20 right-1/3"
        delay={1}
      />

      {/* Gold accent line */}
      <motion.div
        className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-transparent via-accent/30 to-transparent"
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 4, repeat: Infinity }}
      />

      <div className="relative z-10 container mx-auto px-6 lg:px-8 text-center max-w-5xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 rounded-full px-5 py-2 mb-8"
        >
          <div className="w-2 h-2 bg-accent rounded-full animate-pulse-glow" />
          <span className="text-accent text-sm font-medium">+25 años creando grandes ideas</span>
        </motion.div>

        <div className="overflow-hidden mb-4">
          <motion.h1
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-heading font-bold text-foreground leading-[1.05]"
          >
            Hacemos que tu
          </motion.h1>
        </div>
        <div className="overflow-hidden mb-4">
          <motion.h1
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-heading font-bold leading-[1.05]"
          >
            marca <span className="text-gradient-gold italic">hable</span>
          </motion.h1>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-foreground/50 text-lg md:text-xl max-w-2xl mx-auto mb-4 font-body"
        >
          Publicidad visual que conecta marcas con personas
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="text-accent font-heading italic text-xl md:text-2xl mb-10"
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
            className="group bg-accent text-accent-foreground px-8 py-4 rounded-sm text-base font-bold hover:brightness-110 transition-all inline-flex items-center justify-center gap-2"
          >
            Ver portafolio
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="#contacto"
            className="group border border-foreground/20 text-foreground px-8 py-4 rounded-sm text-base font-bold hover:border-accent hover:text-accent transition-all inline-flex items-center justify-center gap-2"
          >
            <Play size={16} />
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
        <div className="w-6 h-10 border-2 border-foreground/20 rounded-full flex justify-center pt-2">
          <div className="w-1 h-2 bg-accent rounded-full" />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
