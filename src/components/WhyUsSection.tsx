import { motion } from "framer-motion";
import { Target, Globe, Leaf, Handshake } from "lucide-react";

const reasons = [
  {
    icon: Target,
    title: "Experiencia comprobada",
    description: "25+ años trabajando con marcas líderes en Colombia y toda la región.",
  },
  {
    icon: Globe,
    title: "Cobertura nacional",
    description: "Operación logística en las principales ciudades del país.",
  },
  {
    icon: Leaf,
    title: "Compromiso sostenible",
    description: "Materiales eco-friendly y procesos responsables con el medio ambiente.",
  },
  {
    icon: Handshake,
    title: "Socio estratégico",
    description: "No somos proveedores, somos aliados de tu marca a largo plazo.",
  },
];

const WhyUsSection = () => {
  return (
    <section className="py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-accent text-xs font-body font-semibold uppercase tracking-[0.2em] mb-4">
            ¿Por qué elegirnos?
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground leading-tight">
            ¿Por qué <span className="text-gradient-gold italic">Imágenes Gráficas</span>?
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {reasons.map((reason, i) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center p-8 group"
            >
              <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6 group-hover:bg-accent/20 transition-colors duration-300">
                <reason.icon className="text-accent" size={28} />
              </div>
              <h3 className="text-lg font-heading font-bold text-foreground mb-3">
                {reason.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed font-body">
                {reason.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyUsSection;
