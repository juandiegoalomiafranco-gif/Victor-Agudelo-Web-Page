import { motion } from "framer-motion";
import { MessageSquare, PenTool, Factory, Truck } from "lucide-react";

const steps = [
  {
    icon: MessageSquare,
    number: "01",
    title: "Briefing",
    description: "Entendemos tu marca, objetivos y necesidades para diseñar la solución ideal.",
  },
  {
    icon: PenTool,
    number: "02",
    title: "Diseño",
    description: "Creamos propuestas visuales que comunican tu mensaje con impacto y creatividad.",
  },
  {
    icon: Factory,
    number: "03",
    title: "Producción",
    description: "Fabricamos con tecnología de punta y los más altos estándares de calidad.",
  },
  {
    icon: Truck,
    number: "04",
    title: "Entrega",
    description: "Instalación, logística y seguimiento para asegurar resultados impecables.",
  },
];

const ProcessSection = () => {
  return (
    <section id="proceso" className="py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-accent text-xs font-body font-semibold uppercase tracking-[0.2em] mb-4">
            Cómo trabajamos
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-extrabold text-foreground leading-tight">
            De la idea a la <span className="text-gradient-brand italic">realidad</span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          <div className="hidden lg:block absolute top-16 left-[12.5%] right-[12.5%] h-px bg-border" />

          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="relative text-center"
            >
              <div className="relative z-10 w-16 h-16 mx-auto mb-6 bg-card border border-border rounded-full flex items-center justify-center group hover:border-accent transition-colors duration-300 shadow-sm">
                <step.icon size={24} className="text-accent" />
              </div>
              <span className="text-accent/15 text-5xl font-heading font-extrabold absolute top-0 right-4 lg:right-auto lg:left-1/2 lg:-translate-x-1/2 lg:-top-3 select-none">
                {step.number}
              </span>
              <h3 className="text-xl font-heading font-bold text-foreground mb-2">
                {step.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
