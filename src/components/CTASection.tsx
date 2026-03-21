import { motion } from "framer-motion";

const CTASection = () => {
  return (
    <section className="py-24 lg:py-32 bg-accent">
      <div className="container mx-auto px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-accent-foreground leading-tight mb-6">
            ¿Listo para hacer visible tu marca?
          </h2>
          <p className="text-accent-foreground/70 text-lg md:text-xl max-w-2xl mx-auto mb-10">
            Cuéntanos tu proyecto y te contactamos en menos de 24 horas
          </p>
          <a
            href="#contacto"
            className="inline-block bg-primary text-primary-foreground px-10 py-4 rounded-sm text-base font-bold hover:opacity-90 transition-all"
          >
            Hablar con un asesor
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
