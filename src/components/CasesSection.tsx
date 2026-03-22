import { motion } from "framer-motion";

const cases = [
  {
    title: "Campaña integral Postobón",
    client: "Postobón",
    sector: "Bebidas",
    description: "Diseño y producción de material POP, señalización y catálogos para la campaña nacional de la marca.",
  },
  {
    title: "Informe anual Coomeva",
    client: "Coomeva",
    sector: "Financiero",
    description: "Diseño editorial completo del informe de gestión anual con más de 200 páginas e infografías.",
  },
  {
    title: "Kit corporativo Bavaria",
    client: "Bavaria",
    sector: "Industria",
    description: "Desarrollo de kits promocionales personalizados para la fuerza comercial a nivel nacional.",
  },
];

const CasesSection = () => {
  return (
    <section id="casos" className="py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <p className="text-accent text-xs font-semibold uppercase tracking-[0.2em] mb-4">
            Casos de éxito
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-foreground leading-tight">
            Proyectos que hablan por sí solos
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cases.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="bg-card rounded-lg overflow-hidden group hover:shadow-lg transition-shadow duration-300 border border-border"
            >
              <div className="h-56 bg-accent/5 flex items-center justify-center">
                <span className="text-6xl font-extrabold text-accent/15 group-hover:text-accent/30 transition-colors">
                  {item.client.charAt(0)}
                </span>
              </div>
              <div className="p-8">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-semibold uppercase tracking-wider text-accent">
                    {item.sector}
                  </span>
                  <span className="text-muted-foreground text-xs">•</span>
                  <span className="text-xs text-muted-foreground">{item.client}</span>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">
                  {item.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CasesSection;
