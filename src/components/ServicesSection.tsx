import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import serviceEditorial from "@/assets/service-editorial.jpg";
import servicePrinting from "@/assets/service-printing.jpg";
import serviceAdvertising from "@/assets/service-advertising.jpg";
import servicePromos from "@/assets/service-promos.jpg";
import serviceSustainable from "@/assets/service-sustainable.jpg";

const services = [
  {
    id: "editorial",
    tab: "Diseño Editorial",
    title: "Diseño gráfico editorial",
    description: "Revistas, libros, catálogos y publicaciones corporativas con diseño de alto nivel. Cada pieza editorial comunica la esencia de tu marca con precisión y creatividad.",
    image: serviceEditorial,
  },
  {
    id: "impresion",
    tab: "Impresión",
    title: "Impresión de alta calidad",
    description: "Offset, digital y gran formato. Tecnología de punta para garantizar colores vibrantes, acabados impecables y tiempos de entrega óptimos.",
    image: servicePrinting,
  },
  {
    id: "publicidad",
    tab: "Publicidad",
    title: "Publicidad y comunicación",
    description: "Campañas BTL, material POP, señalización y comunicación visual integral. Hacemos que tu marca sea visible en todos los puntos de contacto.",
    image: serviceAdvertising,
  },
  {
    id: "promos",
    tab: "Promos + Gifts",
    title: "Promos + Gifts",
    description: "Artículos promocionales en stock y a la medida. Desde bolígrafos hasta kits corporativos completos que posicionan tu marca.",
    image: servicePromos,
  },
  {
    id: "sostenible",
    tab: "Sostenible",
    title: "Soluciones sostenibles",
    description: "Materiales eco-friendly y procesos responsables. Imprimimos con compromiso ambiental sin sacrificar calidad ni impacto visual.",
    image: serviceSustainable,
  },
];

const ServicesSection = () => {
  const [active, setActive] = useState(0);

  return (
    <section id="servicios" className="py-24 lg:py-32 bg-primary">
      <div className="container mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="text-accent text-sm font-semibold uppercase tracking-[0.15em] mb-4">
            Nuestros servicios
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-primary-foreground leading-tight max-w-3xl">
            Todo lo que tu marca necesita para comunicar
          </h2>
        </motion.div>

        <div className="flex flex-wrap gap-2 mb-12">
          {services.map((service, i) => (
            <button
              key={service.id}
              onClick={() => setActive(i)}
              className={`px-5 py-2.5 rounded-sm text-sm font-semibold transition-all ${
                active === i
                  ? "bg-accent text-accent-foreground"
                  : "bg-primary-foreground/10 text-primary-foreground/60 hover:text-primary-foreground"
              }`}
            >
              {service.tab}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="grid lg:grid-cols-2 gap-12 items-center"
          >
            <div className="overflow-hidden rounded-sm">
              <img
                src={services[active].image}
                alt={services[active].title}
                className="w-full h-[300px] lg:h-[400px] object-cover"
              />
            </div>
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-6">
                {services[active].title}
              </h3>
              <p className="text-primary-foreground/70 text-lg leading-relaxed mb-8">
                {services[active].description}
              </p>
              <a
                href="#contacto"
                className="inline-block bg-accent text-accent-foreground px-6 py-3 rounded-sm text-sm font-bold hover:brightness-110 transition-all"
              >
                Ver más
              </a>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default ServicesSection;
