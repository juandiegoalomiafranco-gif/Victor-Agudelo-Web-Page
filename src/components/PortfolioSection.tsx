import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const categories = ["Todos", "Eventos", "POP", "Señalización", "Branding"];

const projects = [
  { title: "Stand Bavaria Expomarketing", category: "Eventos", img: "https://images.unsplash.com/photo-1540317580384-e5d43616b9aa?q=80&w=800" },
  { title: "Display Postobón Navidad", category: "POP", img: "https://images.unsplash.com/photo-1556740758-90de374c12ad?q=80&w=800" },
  { title: "Señalética Centro Comercial", category: "Señalización", img: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?q=80&w=800" },
  { title: "Branding Flota Colombina", category: "Branding", img: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=800" },
];

const ExactPortfolio = () => {
  const [activeFilter, setActiveFilter] = useState("Todos");

  const filtered = activeFilter === "Todos"
    ? projects
    : projects.filter((p) => p.category === activeFilter);

  return (
    <section id="portafolio" className="py-24 lg:py-40 bg-white">
      <div className="container mx-auto px-6 lg:px-8 max-w-7xl">
        
        {/* Dapper-style Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="inline-flex items-center gap-2 mb-6">
              <span className="w-2 h-2 rounded-sm bg-accent" />
              <span className="text-primary text-sm font-semibold uppercase tracking-widest">Estudios de Caso</span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-primary font-heading leading-none tracking-tight">
              Impacto visual <br/><span className="italic font-light">en acción.</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-wrap gap-2 md:justify-end max-w-sm"
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-4 py-2 rounded-md text-xs font-body font-bold uppercase tracking-wider transition-all duration-300 active:scale-95 border ${
                  activeFilter === cat
                    ? "bg-primary text-white border-primary"
                    : "bg-transparent text-primary/60 border-primary/10 hover:border-primary/30"
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="grid sm:grid-cols-2 gap-8 lg:gap-12"
          >
            {filtered.map((project, i) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="group relative block cursor-pointer"
              >
                <div className="aspect-[4/3] w-full rounded-xl overflow-hidden mb-6 relative bg-[#f0f0f0]">
                  <img 
                    src={project.img} 
                    alt={project.title} 
                    className="w-full h-full object-cover filter grayscale contrast-125 group-hover:grayscale-0 transition-all duration-[1500ms] group-hover:scale-105"
                  />
                  {/* Floating CTA box matching Dapper style */}
                  <div className="absolute top-4 right-4 w-12 h-12 bg-white rounded-md flex items-center justify-center translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 shadow-xl">
                    <ArrowUpRight size={20} className="text-primary" />
                  </div>
                </div>
                
                <p className="text-primary/60 font-body text-xs font-bold uppercase tracking-widest mb-2">
                  {project.category}
                </p>
                <h3 className="text-2xl lg:text-3xl font-heading font-extrabold text-primary tracking-tight group-hover:text-accent transition-colors">
                  {project.title}
                </h3>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
};

export default ExactPortfolio;
