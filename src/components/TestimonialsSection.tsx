import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    quote: "Imágenes Gráficas ha sido nuestro aliado estratégico durante más de una década. Su capacidad de producción y calidad de impresión son excepcionales.",
    name: "Carlos Martínez",
    role: "Director de Marketing",
    company: "Postobón",
  },
  {
    quote: "La atención al detalle y el compromiso con los tiempos de entrega hacen de Imágenes Gráficas un socio confiable para todos nuestros proyectos de comunicación.",
    name: "María López",
    role: "Gerente de Comunicaciones",
    company: "Coomeva",
  },
  {
    quote: "Su capacidad de adaptarse a nuestras necesidades y ofrecer soluciones creativas nos ha permitido elevar la imagen de nuestra marca en toda la región.",
    name: "Andrés Gómez",
    role: "Director Comercial",
    company: "Bavaria",
  },
];

const TestimonialsSection = () => {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c === 0 ? testimonials.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === testimonials.length - 1 ? 0 : c + 1));

  return (
    <section className="py-24 lg:py-32 bg-primary">
      <div className="container mx-auto px-6 lg:px-8 max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-accent text-sm font-semibold uppercase tracking-[0.15em] mb-12">
            Lo que dicen nuestros clientes
          </p>

          <Quote className="mx-auto text-accent/30 mb-8" size={48} />

          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <blockquote className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary-foreground leading-snug mb-10">
                "{testimonials[current].quote}"
              </blockquote>
              <p className="text-accent font-bold text-lg">
                {testimonials[current].name}
              </p>
              <p className="text-primary-foreground/50 text-sm mt-1">
                {testimonials[current].role}, {testimonials[current].company}
              </p>
            </motion.div>
          </AnimatePresence>

          <div className="flex items-center justify-center gap-4 mt-12">
            <button
              onClick={prev}
              className="w-12 h-12 rounded-full border border-primary-foreground/20 flex items-center justify-center text-primary-foreground/60 hover:text-primary-foreground hover:border-primary-foreground/50 transition-all"
            >
              <ChevronLeft size={20} />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    i === current ? "bg-accent w-8" : "bg-primary-foreground/20"
                  }`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="w-12 h-12 rounded-full border border-primary-foreground/20 flex items-center justify-center text-primary-foreground/60 hover:text-primary-foreground hover:border-primary-foreground/50 transition-all"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
