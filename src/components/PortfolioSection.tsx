import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const categories = ["Todos", "Eventos", "POP", "Señalización", "Branding"];

const projects = [
  { title: "Stand Bavaria Expomarketing", category: "Eventos", gradient: "from-amber-400/60 via-yellow-300/40 to-orange-400/60" },
  { title: "Display Postobón Navidad", category: "POP", gradient: "from-red-400/60 via-rose-300/40 to-pink-400/60" },
  { title: "Señalética Centro Comercial", category: "Señalización", gradient: "from-blue-400/60 via-indigo-300/40 to-violet-400/60" },
  { title: "Branding Flota Colombina", category: "Branding", gradient: "from-emerald-400/60 via-teal-300/40 to-cyan-400/60" },
  { title: "Activación Alpina Feria", category: "Eventos", gradient: "from-purple-400/60 via-fuchsia-300/40 to-pink-400/60" },
  { title: "Habladores Bancolombia", category: "POP", gradient: "from-sky-400/60 via-blue-300/40 to-indigo-400/60" },
  { title: "Valla EPM Medellín", category: "Señalización", gradient: "from-orange-400/60 via-amber-300/40 to-yellow-400/60" },
  { title: "Identidad Visual Nutresa", category: "Branding", gradient: "from-teal-400/60 via-emerald-300/40 to-green-400/60" },
];

const PortfolioSection = () => {
  const [activeFilter, setActiveFilter] = useState("Todos");

  const filtered = activeFilter === "Todos"
    ? projects
    : projects.filter((p) => p.category === activeFilter);

  return (
    <section id="portafolio" className="py-24 lg:py-32 bg-secondary">
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
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-extrabold text-foreground leading-tight">
            Proyectos que <span className="text-gradient-brand italic">inspiran</span>
          </h2>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-5 py-2 rounded-md text-sm font-body font-semibold transition-all duration-300 ${
                activeFilter === cat
                  ? "bg-accent text-accent-foreground"
                  : "bg-card text-muted-foreground hover:text-foreground border border-border"
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
                className="group relative aspect-[4/3] rounded-lg overflow-hidden cursor-pointer"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient}`} />
                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/70 transition-all duration-500 flex items-center justify-center">
                  <div className="text-center translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 px-4">
                    <p className="text-accent text-xs font-body font-semibold uppercase tracking-wider mb-1">
                      {project.category}
                    </p>
                    <h3 className="text-white font-heading font-bold text-lg">
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
