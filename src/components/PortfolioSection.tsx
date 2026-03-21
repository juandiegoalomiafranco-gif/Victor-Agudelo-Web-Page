import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const categories = ["Todos", "Eventos", "POP", "Señalización", "Branding"];

const projects = [
  { title: "Stand Bavaria Expomarketing", category: "Eventos", gradient: "from-amber-900/80 via-yellow-800/60 to-orange-900/80" },
  { title: "Display Postobón Navidad", category: "POP", gradient: "from-red-900/80 via-rose-800/60 to-pink-900/80" },
  { title: "Señalética Centro Comercial", category: "Señalización", gradient: "from-blue-900/80 via-indigo-800/60 to-violet-900/80" },
  { title: "Branding Flota Colombina", category: "Branding", gradient: "from-emerald-900/80 via-teal-800/60 to-cyan-900/80" },
  { title: "Activación Alpina Feria", category: "Eventos", gradient: "from-purple-900/80 via-fuchsia-800/60 to-pink-900/80" },
  { title: "Habladores Bancolombia", category: "POP", gradient: "from-sky-900/80 via-blue-800/60 to-indigo-900/80" },
  { title: "Valla EPM Medellín", category: "Señalización", gradient: "from-orange-900/80 via-amber-800/60 to-yellow-900/80" },
  { title: "Identidad Visual Nutresa", category: "Branding", gradient: "from-teal-900/80 via-emerald-800/60 to-green-900/80" },
];

const PortfolioSection = () => {
  const [activeFilter, setActiveFilter] = useState("Todos");

  const filtered = activeFilter === "Todos"
    ? projects
    : projects.filter((p) => p.category === activeFilter);

  return (
    <section id="portafolio" className="py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-accent text-xs font-body font-semibold uppercase tracking-[0.2em] mb-4">
            Portafolio
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground leading-tight">
            Proyectos que <span className="text-gradient-gold italic">inspiran</span>
          </h2>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-5 py-2 rounded-sm text-sm font-body font-semibold transition-all duration-300 ${
                activeFilter === cat
                  ? "bg-accent text-accent-foreground"
                  : "bg-secondary text-muted-foreground hover:text-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {filtered.map((project, i) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="group relative aspect-[4/3] rounded-sm overflow-hidden cursor-pointer"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient}`} />
                <div className="absolute inset-0 bg-background/0 group-hover:bg-background/60 transition-all duration-500 flex items-center justify-center">
                  <div className="text-center translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 px-4">
                    <p className="text-accent text-xs font-body font-semibold uppercase tracking-wider mb-1">
                      {project.category}
                    </p>
                    <h3 className="text-foreground font-heading font-bold text-lg">
                      {project.title}
                    </h3>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default PortfolioSection;
