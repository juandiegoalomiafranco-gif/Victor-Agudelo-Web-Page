import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TextReveal from './TextReveal';

interface Project {
  id: number;
  title: string;
  category: string;
  image: string;
  size: 'large' | 'medium' | 'small';
}

const PortfolioSection: React.FC = () => {
  const [filter, setFilter] = useState('Todos');

  const projects: Project[] = [
    { id: 1, title: "Stand Bavaria Expomarketing", category: "Eventos", image: "https://images.unsplash.com/photo-1558403194-611308249627?auto=format&fit=crop&q=80", size: 'large' },
    { id: 2, title: "Display Postobón Navidad", category: "POP", image: "https://images.unsplash.com/photo-1582213776866-3d706599d14a?auto=format&fit=crop&q=80", size: 'medium' },
    { id: 3, title: "Señalética Centro Comercial", category: "Señalización", image: "https://images.unsplash.com/photo-1579541814924-49fef17c5be5?auto=format&fit=crop&q=80", size: 'medium' },
    { id: 4, title: "Branding Flota Colombina", category: "Branding", image: "https://images.unsplash.com/photo-1549480824-0010041d0879?auto=format&fit=crop&q=80", size: 'small' },
    { id: 5, title: "Kit Alpina Temporada", category: "Gran Formato", image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&q=80", size: 'small' },
  ];

  const categories = ["Todos", "Eventos", "POP", "Señalización", "Branding", "Gran Formato"];

  const filteredProjects = filter === 'Todos' 
    ? projects 
    : projects.filter(p => p.category === filter);

  return (
    <section id="portafolio" className="py-40 bg-background border-t border-foreground/5">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
          <div className="max-w-2xl">
            <h2 className="text-6xl md:text-8xl font-black tracking-tighter leading-none mb-6">
              PROYECTOS <br />
              <span className="text-primary italic">SELECCIONADOS</span>
            </h2>
            <p className="text-[10px] font-black uppercase tracking-[0.4em] opacity-40">
              UNA CRÓNICA DE COMUNICACIÓN FÍSICA Y DISEÑO INDUSTRIAL.
            </p>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-6 py-3 text-[10px] font-black uppercase tracking-widest transition-all duration-300 border ${
                  filter === cat 
                    ? 'bg-foreground text-background border-foreground' 
                    : 'bg-transparent text-foreground/40 border-foreground/10 hover:border-foreground/40 hover:text-foreground'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-1 auto-rows-[400px]">
          <AnimatePresence mode='popLayout'>
            {filteredProjects.map((project, idx) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
                className={`relative group overflow-hidden border border-foreground/5 ${
                    project.size === 'large' ? 'lg:col-span-8 lg:row-span-2' : 
                    project.size === 'medium' ? 'lg:col-span-4 lg:row-span-2' : 
                    'lg:col-span-4 lg:row-span-1'
                }`}
              >
                {/* Image Wrap */}
                <div className="w-full h-full overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-1000">
                  <motion.img 
                    src={project.image} 
                    alt={project.title}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Overlay */}
                <div className="absolute inset-0 bg-white/90 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-between p-10 transform translate-y-4 group-hover:translate-y-0">
                  <div className="flex justify-between items-start">
                    <span className="text-primary text-[10px] font-black uppercase tracking-[0.3em] border-b border-primary pb-1">
                      {project.category}
                    </span>
                    <span className="font-mono text-[10px] opacity-40">REF: IG-0{project.id}</span>
                  </div>
                  
                  <div>
                    <h4 className="text-4xl font-black text-foreground tracking-tighter leading-none mb-6">
                      {project.title}
                    </h4>
                    <div className="w-12 h-12 border-2 border-foreground flex items-center justify-center text-foreground hover:bg-foreground hover:text-white transition-all duration-300">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                          <line x1="7" y1="17" x2="17" y2="7"></line>
                          <polyline points="7 7 17 7 17 17"></polyline>
                      </svg>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="mt-32 text-center">
            <button className="text-[10px] font-black uppercase tracking-[0.5em] opacity-30 hover:opacity-100 transition-all flex items-center gap-8 mx-auto group">
              <span className="w-12 h-px bg-foreground/20 group-hover:w-20 group-hover:bg-primary transition-all duration-500" />
              VER ARCHIVO COMPLETO
              <span className="w-12 h-px bg-foreground/20 group-hover:w-20 group-hover:bg-primary transition-all duration-500" />
            </button>
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
