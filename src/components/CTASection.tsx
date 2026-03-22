import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const CTASection = () => {
  return (
    <section className="py-24 lg:py-32 bg-primary relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-gold/5 rounded-full translate-y-1/2 -translate-x-1/2" />

      <div className="container mx-auto px-6 lg:px-8 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-extrabold text-white leading-tight mb-4">
            La fábrica de las grandes ideas
          </h2>
          <p className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto mb-10 font-body">
            Cuéntanos tu proyecto y hagamos que tu marca hable
          </p>
          <a
            href="#contacto"
            className="group inline-flex items-center gap-2 bg-gold text-gold-foreground px-10 py-4 rounded-md text-base font-bold hover:brightness-110 transition-all"
          >
            Cotiza ahora
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
