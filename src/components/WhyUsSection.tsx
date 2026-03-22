import { motion } from "framer-motion";
import { Check } from "lucide-react";

const features = [
  "Ejecución milimétrica in-house",
  "Materiales de alta durabilidad",
  "Tiempos de entrega asegurados",
  "Optimización de costos estructurales",
  "Impacto visual B2B garantizado",
  "Atención personalizada ágil"
];

const ExactWhyUs = () => {
  return (
    <section className="py-24 lg:py-40 bg-[#F8F8F8]">
      <div className="container mx-auto px-6 lg:px-8 max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="inline-flex items-center gap-2 mb-6">
              <span className="w-2 h-2 rounded-sm bg-accent" />
              <span className="text-primary text-sm font-semibold uppercase tracking-widest">El Diferencial</span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-primary font-heading leading-none tracking-tight mb-8">
              Fabricación <br/><span className="italic font-light">sin intermediarios.</span>
            </h2>
            <p className="text-primary/70 text-lg font-body font-medium leading-relaxed max-w-md">
              Controlamos el 100% del proceso creativo y de producción en nuestra propia planta, lo que significa que tu marca nunca sufrirá por retrasos de terceros o variaciones de calidad impredecibles.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-x-8 gap-y-12">
            {features.map((feature, i) => (
              <motion.div
                key={feature}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-start gap-4"
              >
                <div className="mt-1 flex-shrink-0 w-8 h-8 rounded-sm bg-white border border-black/[0.05] flex items-center justify-center shadow-sm">
                  <Check size={16} className="text-accent stroke-[3]" />
                </div>
                <p className="text-primary font-heading font-bold text-xl leading-tight tracking-tight">
                  {feature}
                </p>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default ExactWhyUs;
