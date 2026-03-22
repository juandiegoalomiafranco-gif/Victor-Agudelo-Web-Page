import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const ExactAbout = () => {
  return (
    <section id="nosotros" className="py-24 lg:py-40 bg-[#F8F8F8]">
      <div className="container mx-auto px-6 lg:px-8">
        
        <div className="grid lg:grid-cols-12 gap-16 lg:gap-8 items-center">
          
          {/* Left Large Text block */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7"
          >
            <div className="inline-flex items-center gap-2 mb-6">
              <span className="w-2 h-2 rounded-sm bg-accent" />
              <span className="text-primary text-sm font-semibold uppercase tracking-widest">Sobre Nosotros</span>
            </div>
            
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.5rem] font-bold text-primary font-heading leading-[1] tracking-tight mb-8">
              Expertise sólida para <br/>
              <span className="italic font-light tracking-tighter">resultados tangibles.</span>
            </h2>
            
            <p className="text-primary/80 text-lg md:text-xl font-body leading-relaxed max-w-2xl mb-12 font-medium">
              Somos un brazo ejecutor de confianza para marcas colombianas. Más de 25 años perfeccionando la ingeniería, el diseño y la producción de material publicitario físico nos permiten asegurar calidad milimétrica en cada entrega.
            </p>

            <a
              href="#portafolio"
              className="group inline-flex items-center gap-4 bg-primary text-white px-8 py-4 rounded-md text-sm font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent hover:bg-primary/90"
            >
              Ver Casos de Éxito
              <span className="bg-gold text-primary p-1 rounded-sm overflow-hidden">
                <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </span>
            </a>
          </motion.div>

          {/* Right visual block matching Dapper's abstract/metric overlays */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative"
          >
            <div className="aspect-[4/5] rounded-xl overflow-hidden relative border border-black/[0.05] shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=1000" 
                alt="Equipo de trabajo" 
                className="w-full h-full object-cover filter grayscale contrast-125 hover:grayscale-0 transition-all duration-[2000ms]"
              />
              <div className="absolute inset-0 bg-primary/10 mix-blend-multiply" />
            </div>

            {/* Dapper-style metric card floating */}
            <motion.div 
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.6, delay: 0.6 }}
               className="absolute -left-6 lg:-left-16 bottom-12 bg-white p-6 rounded-lg shadow-xl border border-black/[0.03] max-w-[240px]"
            >
              <div className="flex flex-col gap-1">
                <span className="text-5xl font-heading font-extrabold text-primary">50+</span>
                <span className="w-8 h-1 bg-gold rounded-full my-2" />
                <span className="text-sm font-semibold font-body text-primary/80 leading-tight">Profesionales estructurando tu publicidad visual.</span>
              </div>
            </motion.div>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
};

export default ExactAbout;
