import React from 'react';
import { motion } from 'framer-motion';
import TextReveal from './TextReveal';

const WhyUsSection: React.FC = () => {
  const differentiators = [
    {
      title: "Producción 100% in-house",
      description: "Sin terceros, sin retrasos inesperados. Controlamos cada paso del proceso de fabricación.",
      icon: "✓"
    },
    {
      title: "Diseño hasta instalación",
      description: "Un solo interlocutor para todo. Olvídate de coordinaciones imposibles entre múltiples proveedores.",
      icon: "✓"
    },
    {
      title: "Materiales certificados",
      description: "Solo trabajamos con materiales de alta durabilidad. Tu inversión dura años, no solo meses.",
      icon: "✓"
    },
    {
      title: "Tiempos garantizados",
      description: "Más de 25 años sin fallar una fecha crítica. Eso no es suerte, es metodología pura.",
      icon: "✓"
    }
  ];

  return (
    <section className="py-40 bg-background relative overflow-hidden border-t border-foreground/5">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            
            {/* Left Image Column */}
            <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="relative"
            >
                <div className="aspect-[4/5] overflow-hidden border border-foreground/5 shadow-2xl grayscale hover:grayscale-0 transition-all duration-1000 group">
                    <img 
                        src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80" 
                        alt="Producción Industrial" 
                        className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-1000"
                    />
                </div>
                
                {/* Floating Technical Badge */}
                <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -bottom-10 -right-10 bg-foreground text-background p-10 shadow-2xl z-20 skew-x-[-2deg]"
                >
                    <div className="flex flex-col gap-2">
                        <span className="text-5xl font-black text-primary tracking-tighter">50+</span>
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] leading-tight">
                            INGENIEROS Y <br />TÉCNICOS EN PLANTA <br />PROPIA // CALI.
                        </span>
                    </div>
                </motion.div>
            </motion.div>

            {/* Right Content Column */}
            <div>
                <div className="mb-20">
                  <div className="flex items-center gap-4 mb-8">
                    <span className="font-mono text-[10px] opacity-40 uppercase tracking-[0.4em]">CAPACIDADES // FULL STACK PHYSICAL</span>
                    <div className="h-px w-20 bg-primary" />
                  </div>
                  <h2 className="text-6xl md:text-8xl font-black tracking-tighter leading-none mb-10">
                    TODO BAJO <br />
                    <span className="text-primary italic">UN MISMO TECHO.</span>
                  </h2>
                  <p className="text-lg md:text-xl opacity-60 max-w-lg leading-tight font-medium">
                      Centralizamos su comunicación física. Desde el prototipado industrial hasta la instalación en sitio.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
                    {differentiators.map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: i * 0.1 }}
                            className="group"
                        >
                            <span className="font-mono text-[10px] font-black text-primary mb-4 block">
                                0{i + 1} //
                            </span>
                            <h4 className="text-2xl font-black tracking-tighter mb-4 group-hover:text-primary transition-colors">
                                {item.title.toUpperCase()}
                            </h4>
                            <p className="text-sm opacity-50 leading-snug font-medium">
                                {item.description}
                            </p>
                            <div className="mt-6 w-8 h-px bg-foreground/10 group-hover:w-16 group-hover:bg-primary transition-all duration-500" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
      </div>
    </section>
  );
};

export default WhyUsSection;
