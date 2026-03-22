import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote } from "lucide-react";

const testimonials = [
  {
    quote: "Imágenes Gráficas ha sido nuestro aliado estratégico durante más de una década. Su capacidad de producción y calidad son excepcionales.",
    name: "Carlos Martínez",
    role: "Director de Marketing",
    company: "Postobón",
  },
  {
    quote: "La atención al detalle y el compromiso con los tiempos de entrega hacen de Imágenes Gráficas un socio confiable para todos nuestros proyectos.",
    name: "María López",
    role: "Gerente de Comunicaciones",
    company: "Coomeva",
  },
  {
    quote: "Su creatividad y capacidad de adaptación nos han permitido elevar la imagen de nuestra marca en toda la región andina.",
    name: "Andrés Gómez",
    role: "Director Comercial",
    company: "Bavaria",
  },
];

const TestimonialsSection = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((c) => (c === testimonials.length - 1 ? 0 : c + 1));
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-24 lg:py-32 bg-secondary">
      <div className="container mx-auto px-6 lg:px-8 max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-accent text-xs font-body font-semibold uppercase tracking-[0.2em] mb-12">
            Lo que dicen nuestros clientes
          </p>

          <Quote className="mx-auto text-accent/20 mb-8" size={48} />

          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <blockquote className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-foreground leading-snug mb-10">
                "{testimonials[current].quote}"
              </blockquote>
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-accent/10 flex items-center justify-center">
                <span className="text-accent font-heading font-bold text-lg">
                  {testimonials[current].name.charAt(0)}
                </span>
              </div>
              <p className="text-accent font-body font-bold text-lg">
                {testimonials[current].name}
              </p>
              <p className="text-muted-foreground text-sm mt-1">
                {testimonials[current].role}, {testimonials[current].company}
              </p>
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-center gap-2 mt-12">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === current ? "bg-accent w-10" : "bg-foreground/10 w-6 hover:bg-foreground/20"
                }`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
