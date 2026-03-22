import { motion } from "framer-motion";

const steps = [
  { number: "01", title: "Descubrimiento", desc: "Entendemos profundamente los objetivos de negocio y el ecosistema físico donde vive la marca." },
  { number: "02", title: "Ingeniería Visual", desc: "Diseñamos las estructuras, seleccionamos materiales y validamos la durabilidad y el impacto visual." },
  { number: "03", title: "Producción", desc: "Fabricamos cada elemento con precisión milimétrica en nuestra planta especializada." },
  { number: "04", title: "Despliegue", desc: "Instalamos e implementamos en sitio para asegurar una experiencia de marca impecable." },
];

const ExactProcess = () => {
  return (
    <section id="proceso" className="py-24 lg:py-40 bg-white">
      <div className="container mx-auto px-6 lg:px-8 max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          
          {/* Left Sticky Header */}
          <div className="lg:w-1/3">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="sticky top-40"
            >
              <div className="inline-flex items-center gap-2 mb-6">
                <span className="w-2 h-2 rounded-sm bg-accent" />
                <span className="text-primary text-sm font-semibold uppercase tracking-widest">Metodología</span>
              </div>
              <h2 className="text-5xl lg:text-[4rem] font-bold text-primary font-heading leading-none tracking-tight mb-6">
                Nuestro <br/><span className="italic font-light">proceso.</span>
              </h2>
              <p className="text-primary/70 font-body text-lg font-medium">
                Un sistema comprobado que transforma conceptos abstractos en activos visuales de alto retorno.
              </p>
            </motion.div>
          </div>

          {/* Right Process Steps */}
          <div className="lg:w-2/3 flex flex-col gap-12">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="group relative flex flex-col sm:flex-row gap-6 sm:gap-12 p-8 rounded-xl border border-black/[0.04] bg-[#F8F8F8] hover:bg-white hover:shadow-xl transition-all duration-500"
              >
                <div className="text-6xl md:text-7xl font-heading font-extrabold text-primary/10 group-hover:text-accent/30 transition-colors">
                  {step.number}
                </div>
                <div className="pt-2">
                  <h3 className="text-2xl font-bold font-heading text-primary mb-3">{step.title}</h3>
                  <p className="text-primary/70 font-body text-base leading-relaxed font-medium">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default ExactProcess;
