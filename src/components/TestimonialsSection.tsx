import { motion } from "framer-motion";

const testimonials = [
  {
    quote: "La rigurosidad con la que manejan cada proyecto no tiene comparación. Desde que confíamos en ellos la producción de nuestros exhibidores, las ventas en retail aumentaron dramáticamente.",
    author: "Director de Trade Marketing",
    company: "Multinacional de Bebidas",
  },
  {
    quote: "Un aliado verdaderamente estratégico. No son solo productores, entienden el ecosistema B2B y diseñan espacios de contacto que verdaderamente hablan por la marca sin necesidad de estar presentes.",
    author: "Gerente de Marca",
    company: "Sector Financiero",
  }
];

const ExactTestimonials = () => {
  return (
    <section className="py-24 lg:py-40 bg-primary text-white overflow-hidden relative">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=2000')] bg-cover opacity-5 mix-blend-overlay pointer-events-none" />
      
      <div className="container mx-auto px-6 lg:px-8 max-w-6xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-20"
        >
          <div className="inline-flex items-center gap-2 mb-6">
            <span className="w-2 h-2 rounded-sm bg-gold" />
            <span className="text-white/70 text-sm font-semibold uppercase tracking-widest">Lo que dicen</span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-[5rem] font-bold text-white font-heading leading-none tracking-tight">
            Nuestros <span className="italic font-light">partners.</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
          {testimonials.map((test, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col"
            >
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" className="text-gold mb-8 opacity-80">
                <path d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20.017 5.239 20.017 7.734L20.017 8H24V18H14.017ZM0 18L0 10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.239 6 7.734L6 8H9.983L9.983 18L0 18Z" fill="currentColor"/>
              </svg>
              
              <p className="text-xl md:text-2xl lg:text-3xl font-heading font-medium leading-[1.4] tracking-tight mb-10 text-white/90">
                "{test.quote}"
              </p>
              
              <div className="mt-auto">
                <h4 className="text-white font-bold font-body">{test.author}</h4>
                <p className="text-gold text-sm font-semibold uppercase tracking-widest mt-1">{test.company}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExactTestimonials;
