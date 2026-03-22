import { motion } from "framer-motion";
import { ArrowUpRight, Layers, Map, PartyPopper, Palette, Maximize2, Store } from "lucide-react";

const services = [
  { icon: Layers, title: "Material POP", desc: "Displays y lineales de alto impacto." },
  { icon: Map, title: "Señalización", desc: "Sistemas corporativos interiores o exteriores." },
  { icon: PartyPopper, title: "Eventos", desc: "Stands y backings promocionales." },
  { icon: Palette, title: "Branding", desc: "Identidad visual en espacios físicos." },
  { icon: Maximize2, title: "Gran Formato", desc: "Vallas, lonas y fachadas comerciales." },
  { icon: Store, title: "Puntos de Venta", desc: "Arquitectura comercial inmersiva." },
];

const ExactServices = () => {
  return (
    <section id="servicios" className="py-24 lg:py-40 bg-white">
      <div className="container mx-auto px-6 lg:px-8">
        
        {/* Dapper-style asymmetrical header */}
        <div className="flex flex-col lg:flex-row justify-between items-start mb-20 gap-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex-1 max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 mb-6">
              <span className="w-2 h-2 rounded-full bg-gold" />
              <span className="text-primary text-sm font-semibold uppercase tracking-widest">Nuestra Experiencia</span>
            </div>
            
            <h2 className="text-5xl md:text-6xl lg:text-[5rem] font-bold text-primary font-heading leading-[1] tracking-tight">
              Diseño estructural <br/>que <span className="italic font-light tracking-tighter">genera negocio.</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex-1 lg:max-w-sm pt-4 lg:pt-20"
          >
            <p className="text-primary/70 text-base mb-6 font-body font-medium leading-relaxed">
              No solo hacemos publicidad visual; construimos los activos físicos que tu fuerza de ventas necesita para dominar el punto de compra.
            </p>
            <a href="#contacto" className="group inline-flex items-center gap-3 text-primary text-sm font-bold border-b border-primary/20 pb-1 hover:border-primary transition-colors">
              Explorar capacidades
              <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </a>
          </motion.div>
        </div>

        {/* Dapper-style sparse grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="group cursor-pointer"
            >
              <div className="w-16 h-16 bg-[#F8F8F8] rounded-md flex items-center justify-center mb-6 group-hover:bg-gold transition-colors duration-500">
                <service.icon size={28} className="text-primary stroke-[1.5]" />
              </div>
              <h3 className="text-2xl font-bold font-heading text-primary mb-3 tracking-tight group-hover:text-gold transition-colors">
                {service.title}
              </h3>
              <p className="text-primary/70 text-sm font-medium leading-relaxed font-body">
                {service.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExactServices;
