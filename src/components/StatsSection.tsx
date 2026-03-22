import { motion } from "framer-motion";

const stats = [
  { value: "25+", label: "Años de experiencia", suffix: "" },
  { value: "500", label: "Proyectos exitosos", suffix: "+" },
  { value: "100", label: "Materiales probados", suffix: "%" },
];

const ExactStats = () => {
  return (
    <section className="py-20 bg-primary border-y border-black/[0.1]">
      <div className="container mx-auto px-6 lg:px-8 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 divide-y md:divide-y-0 md:divide-x divide-white/10">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center text-center pt-8 md:pt-0"
            >
              <div className="flex items-baseline gap-1 mb-2">
                <span className="text-6xl lg:text-8xl font-heading font-bold text-white tracking-tighter">
                  {stat.value}
                </span>
                <span className="text-3xl text-gold font-bold">{stat.suffix}</span>
              </div>
              <p className="text-white/60 font-body text-sm uppercase tracking-widest font-semibold">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExactStats;
