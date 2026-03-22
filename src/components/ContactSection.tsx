import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const ExactContact = () => {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    service: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Hola, soy ${formData.name}. ${formData.message}`;
    window.open(`https://wa.me/573001234567?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <section id="contacto" className="py-24 lg:py-40 bg-[#F8F8F8] border-t border-black/[0.05]">
      <div className="container mx-auto px-6 lg:px-8 max-w-6xl">
        
        <div className="grid lg:grid-cols-2 gap-20">
          {/* Left Text Segment */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="inline-flex items-center gap-2 mb-6">
              <span className="w-2 h-2 rounded-sm bg-green-500" />
              <span className="text-primary text-sm font-semibold uppercase tracking-widest">Let's talk</span>
            </div>
            
            <h2 className="text-5xl sm:text-6xl md:text-[5.5rem] font-bold text-primary font-heading leading-[0.9] tracking-tight mb-8">
              Convierte tus ideas <br/><span className="italic font-light">en realidad.</span>
            </h2>

            <p className="text-primary/70 text-lg font-body font-medium leading-relaxed max-w-sm mb-12">
              Dinos qué tienes en mente. Respondemos rápido y empezamos a trabajar aún más rápido.
            </p>

            <div className="space-y-6">
              <div className="flex flex-col">
                <span className="text-primary/50 text-xs font-bold uppercase tracking-widest mb-1">Email</span>
                <a href="mailto:info@imagenesgraficas.com" className="text-primary font-bold hover:text-accent transition-colors font-heading text-xl">info@imagenesgraficas.com</a>
              </div>
              <div className="flex flex-col">
                <span className="text-primary/50 text-xs font-bold uppercase tracking-widest mb-1">Teléfono</span>
                <a href="tel:+573001234567" className="text-primary font-bold hover:text-accent transition-colors font-heading text-xl">+57 (1) 234 5678</a>
              </div>
            </div>
          </motion.div>

          {/* Right Form Segment - Dapper style minimalistic inputs */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <form onSubmit={handleSubmit} className="bg-white p-8 md:p-12 rounded-xl shadow-2xl border border-black/[0.03] flex flex-col gap-8">
              
              <div className="flex flex-col gap-2">
                <label className="text-primary/60 text-xs font-bold uppercase tracking-widest">Tu Nombre</label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full border-b border-primary/20 bg-transparent py-3 text-primary text-lg font-body placeholder:text-primary/30 focus:outline-none focus:border-primary transition-colors"
                  placeholder="Juan Pérez"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-primary/60 text-xs font-bold uppercase tracking-widest">Empresa</label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full border-b border-primary/20 bg-transparent py-3 text-primary text-lg font-body placeholder:text-primary/30 focus:outline-none focus:border-primary transition-colors"
                  placeholder="Mi Empresa S.A."
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-primary/60 text-xs font-bold uppercase tracking-widest">Proyecto</label>
                <textarea
                  name="message"
                  required
                  rows={3}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full border-b border-primary/20 bg-transparent py-3 text-primary text-lg font-body placeholder:text-primary/30 focus:outline-none focus:border-primary transition-colors resize-none"
                  placeholder="Necesitamos material POP para..."
                />
              </div>

              <button
                type="submit"
                className="group flex items-center justify-between w-full mt-4 bg-green-300 text-primary px-6 py-5 rounded-md text-base font-bold hover:bg-green-400 transition-all duration-300 active:scale-[0.99] focus-visible:outline-none"
              >
                Solicitar Cotización
                <ArrowUpRight size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ExactContact;
