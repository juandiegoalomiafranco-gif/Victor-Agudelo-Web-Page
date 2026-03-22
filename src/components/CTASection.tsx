import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const ExactCTA = () => {
  return (
    <section className="py-24 lg:py-40 bg-primary text-white relative overflow-hidden">
      {/* Decorative noise */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none -z-10 mix-blend-overlay"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
      />
      
      <div className="container mx-auto px-6 lg:px-8 max-w-5xl text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center"
        >
          <div className="inline-flex items-center gap-2 mb-8">
            <span className="w-2 h-2 rounded-sm bg-gold" />
            <span className="text-white/70 text-sm font-semibold uppercase tracking-widest">Iniciemos hoy</span>
          </div>

          <h2 className="text-6xl sm:text-[6rem] md:text-[8rem] lg:text-[10rem] font-bold font-heading leading-none tracking-tighter mb-12">
            Let's <span className="italic font-light text-gold">build.</span>
          </h2>
          
          <a
            href="#contacto"
            className="group flex items-center justify-between gap-6 bg-white text-primary px-8 py-5 rounded-full text-xl font-bold hover:bg-gold transition-all duration-500 active:scale-[0.98] focus-visible:outline-none"
          >
            Trabajemos juntos
            <span className="bg-primary/5 p-2 rounded-full overflow-hidden transition-all duration-300">
               <ArrowUpRight size={24} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </span>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default ExactCTA;
