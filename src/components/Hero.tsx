import { motion } from "framer-motion";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";

const ExactHero = () => {
  return (
    <section id="hero" className="relative min-h-screen pt-32 pb-20 overflow-hidden bg-[#F8F8F8]">
      {/* Heavy noise overlay to match Dapper's grainy texture */}
      <div 
        className="absolute inset-0 opacity-[0.04] pointer-events-none -z-10 mix-blend-overlay"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
      />

      <div className="container mx-auto px-6 lg:px-8 h-full flex flex-col justify-center">
        
        {/* Top small badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="inline-flex items-center gap-2 mb-8"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="text-gold">
            <path d="M12 0C12 0 12 10 24 12C24 12 12 14 12 24C12 24 12 14 0 12C0 12 12 10 12 0Z" fill="currentColor"/>
          </svg>
          <span className="text-primary text-xs sm:text-sm font-semibold font-body tracking-tight">
            Imágenes Gráficas B2B
          </span>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-0 lg:gap-8 justify-between relative mt-4">
          
          {/* Left Text Column */}
          <div className="max-w-4xl z-10 w-full lg:w-3/5">
            {/* The giant headline with Dapper-style mix of sans-serif and italic serif/sans */}
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="text-6xl sm:text-[5rem] md:text-[6.5rem] lg:text-[7rem] font-bold text-primary font-heading leading-[0.95] tracking-tight"
            >
              Construimos <span className="italic font-light tracking-tighter text-primary">sistemas<br/>visuales publicitarios</span> de alto rendimiento para marcas <span className="font-extrabold text-primary">B2B</span>.
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
              className="mt-20 sm:mt-32 max-w-sm"
            >
              <p className="text-sm md:text-base text-primary/80 font-body mb-8 font-medium leading-relaxed">
                Diseñamos, optimizamos y escalamos estructuras de publicidad visual y material POP que generan reconocimiento y escalan el ROI.
              </p>
              
              <a
                href="#servicios"
                className="group inline-flex items-center gap-3 text-primary text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-md"
              >
                Descubre más
                <span className="bg-gold text-primary p-1.5 rounded-sm overflow-hidden group-hover:-translate-y-1 transition-transform inline-flex">
                  <ArrowDownRight size={16} className="group-hover:translate-x-1 group-hover:translate-y-1 transition-transform" />
                </span>
              </a>
            </motion.div>
          </div>

          {/* Right Image/Graphic Column - Absolute positioning mimicking the leaf in Dapper */}
          <div className="lg:absolute lg:right-0 lg:top-[15%] w-full lg:w-[45%] h-[500px] lg:h-[700px] mt-12 lg:mt-0 right-0 overflow-hidden lg:overflow-visible -z-0">
            <motion.div
              initial={{ opacity: 0, x: 50, scale: 0.95 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
              className="relative w-full h-full"
            >
              {/* Using a monochrome plant or abstract aesthetic similar to Dapper's leaf */}
              <img 
                src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=1200" 
                alt="Hoja visual" 
                className="w-full h-full object-cover object-right-bottom filter grayscale contrast-125 hover:grayscale-0 transition-all duration-[2000ms] lg:mask-image-right"
                style={{ WebkitMaskImage: "linear-gradient(to right, transparent, black 30%)" }}
              />

              {/* Dapper-style specific accent squares */}
              <div className="hidden lg:flex absolute right-4 bottom-32 flex-col gap-1">
                <div className="w-8 h-8 bg-gold/80 ml-8" />
                <div className="w-8 h-8 bg-gold" />
                <div className="w-8 h-8 bg-gold/40" />
              </div>

              {/* Floating Statistic Card overlapping the image */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="absolute left-4 lg:-left-20 bottom-8 sm:bottom-16 bg-white p-5 rounded-lg shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] border border-black/[0.04] w-[260px] flex gap-4"
              >
                <div className="flex-1 flex flex-col justify-between">
                  <p className="text-xs font-semibold leading-tight text-primary font-body tracking-tight">
                    Estrategias visuales que han liderado un incremento del 200% en cotizaciones.
                  </p>
                  
                  {/* Small logo/brand mention */}
                  <div className="mt-4 flex items-center justify-between">
                     <span className="font-heading font-bold text-lg tracking-tighter">ig.</span>
                     <span className="bg-gold text-primary p-1 rounded-sm">
                       <ArrowUpRight size={12} />
                     </span>
                  </div>
                </div>
                {/* Visual miniature chart or photo inside card */}
                <div className="w-[80px] h-full rounded-md overflow-hidden bg-gray-100 flex-shrink-0 relative">
                  <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=200" className="w-full h-full object-cover grayscale" alt="Estadística" />
                </div>
              </motion.div>
            </motion.div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default ExactHero;
