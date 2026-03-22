import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const stats = [
  { value: 25, suffix: "+", label: "Años de experiencia" },
  { value: 500, suffix: "+", label: "Clientes satisfechos" },
  { value: 10000, suffix: "+", label: "Proyectos realizados" },
  { value: 100, suffix: "%", label: "Compromiso" },
];

const Counter = ({ target, suffix }: { target: number; suffix: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 2000;
    const step = Math.ceil(target / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, target]);

  return (
    <span ref={ref} className="text-5xl md:text-6xl lg:text-7xl font-heading font-extrabold text-accent">
      {count.toLocaleString()}{suffix}
    </span>
  );
};

const StatsSection = () => {
  return (
    <section className="py-24 lg:py-32 bg-primary">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 text-center">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Counter target={stat.value} suffix={stat.suffix} />
              <p className="text-primary-foreground/70 text-sm md:text-base font-body font-medium mt-3">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
