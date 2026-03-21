import { motion } from "framer-motion";
import { Layers, Map, PartyPopper, Palette, Maximize2, Store } from "lucide-react";

const services = [
  {
    icon: Layers,
    title: "Material POP",
    description: "Displays, exhibidores, habladores y material de punto de compra que captura la atención y genera ventas.",
  },
  {
    icon: Map,
    title: "Señalización",
    description: "Sistemas de señalética interior y exterior para orientar, informar e impactar con tu marca.",
  },
  {
    icon: PartyPopper,
    title: "Publicidad en Eventos",
    description: "Stands, backings, banners y ambientación que convierte cada evento en una experiencia de marca.",
  },
  {
    icon: Palette,
    title: "Branding Físico",
    description: "Identidad visual aplicada a espacios, vehículos, uniformes y todo punto de contacto con tu audiencia.",
  },
  {
    icon: Maximize2,
    title: "Impresión Gran Formato",
    description: "Vallas, murales, lonas y gigantografías con resolución y color que impresionan a cualquier distancia.",
  },
  {
    icon: Store,
    title: "Puntos de Venta",
    description: "Diseño y producción integral de espacios comerciales que potencian la experiencia de compra.",
  },
];

const ServicesSection = () => {
  return (
    <section id="servicios" className="py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-accent text-xs font-body font-semibold uppercase tracking-[0.2em] mb-4">
            Nuestros servicios
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground leading-tight max-w-3xl mx-auto">
            Todo lo que tu marca necesita para{" "}
            <span className="text-gradient-gold italic">destacar</span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative bg-card border border-border rounded-sm p-8 hover:border-accent/40 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_8px_30px_hsl(48_95%_48%/0.08)]"
            >
              <div className="w-12 h-12 rounded-sm bg-accent/10 flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors duration-300">
                <service.icon size={24} className="text-accent" />
              </div>
              <h3 className="text-xl font-heading font-bold text-foreground mb-3">
                {service.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {service.description}
              </p>
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
