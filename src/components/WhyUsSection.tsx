import { motion } from "framer-motion";
import { Target, Globe, Leaf, Handshake } from "lucide-react";

const reasons = [
  {
    icon: Target,
    title: "Experiencia comprobada",
    description: "30 años trabajando con marcas líderes en Colombia y América Latina.",
  },
  {
    icon: Globe,
    title: "Cobertura en América",
    description: "Presencia en 15+ países de la región con logística integrada.",
  },
  {
    icon: Leaf,
    title: "Compromiso sostenible",
    description: "Soluciones con materiales eco-amigables y procesos responsables.",
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
          <p className="text-accent text-sm font-semibold uppercase tracking-[0.15em] mb-4">
            ¿Por qué elegirnos?
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-foreground leading-tight">
            ¿Por qué Imágenes Gráficas?
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
              className="text-center p-8"
            >
              <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6">
                <reason.icon className="text-accent" size={28} />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-3">
                {reason.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
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
