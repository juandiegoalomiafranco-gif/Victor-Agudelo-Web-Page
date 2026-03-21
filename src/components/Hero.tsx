import { motion } from "framer-motion";
import heroBg from "@/assets/hero-bg.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      <div className="absolute inset-0 bg-primary/80" />

      <div className="relative z-10 container mx-auto px-6 lg:px-8 text-center lg:text-left max-w-5xl">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-accent text-sm font-semibold uppercase tracking-[0.2em] mb-6"
        >
          Más de 30 años de experiencia
        </motion.p>

        <div className="overflow-hidden">
          <motion.h1
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-primary-foreground leading-[1.1] mb-4"
          >
            Comunicación gráfica
          </motion.h1>
        </div>
        <div className="overflow-hidden">
          <motion.h1
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ delay: 0.7, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-primary-foreground leading-[1.1] mb-8"
          >
            que <span className="text-gradient-gold">mueve marcas</span>
          </motion.h1>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="text-primary-foreground/70 text-lg md:text-xl max-w-2xl mb-10 lg:mx-0 mx-auto"
        >
          Diseño, impresión y publicación de alto impacto para empresas en toda América
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
        >
          <a
            href="#servicios"
            className="bg-accent text-accent-foreground px-8 py-4 rounded-sm text-base font-bold hover:brightness-110 transition-all"
          >
            Conocer servicios
          </a>
          <a
            href="#casos"
            className="border-2 border-primary-foreground/30 text-primary-foreground px-8 py-4 rounded-sm text-base font-bold hover:border-primary-foreground/60 transition-all"
          >
            Ver casos de éxito
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
