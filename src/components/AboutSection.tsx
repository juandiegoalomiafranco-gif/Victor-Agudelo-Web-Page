import { motion } from "framer-motion";
import { Award, Users, Lightbulb } from "lucide-react";

const highlights = [
  { icon: Award, label: "Empresa familiar colombiana" },
  { icon: Users, label: "Equipo de +50 profesionales" },
  { icon: Lightbulb, label: "Innovación constante" },
];

const AboutSection = () => {
  return (
    <section id="nosotros" className="py-24 lg:py-32 bg-secondary">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-accent text-xs font-body font-semibold uppercase tracking-[0.2em] mb-4">
              Sobre nosotros
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-extrabold text-foreground leading-tight mb-6">
              La fábrica de las{" "}
              <span className="text-gradient-brand italic">grandes ideas</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              Somos una empresa familiar colombiana con más de 25 años de experiencia en comunicación 
              visual y publicitaria. Nos especializamos en hacer que las marcas hablen a través de 
              material POP, señalización, publicidad en eventos, branding físico y puntos de venta.
            </p>
            <p className="text-muted-foreground text-base leading-relaxed mb-8">
              Nuestra pasión es transformar ideas en experiencias visuales que conectan marcas con personas, 
              con compromiso, calidad y creatividad en cada proyecto.
            </p>

            <div className="flex flex-wrap gap-3 mb-8">
              {highlights.map((h) => (
                <div key={h.label} className="flex items-center gap-2 bg-background rounded-md px-4 py-2.5 border border-border">
                  <h.icon size={16} className="text-accent" />
                  <span className="text-foreground text-sm font-semibold">{h.label}</span>
                </div>
              ))}
            </div>

            <a
              href="#contacto"
              className="inline-block bg-accent text-accent-foreground px-6 py-3 rounded-md text-sm font-bold hover:brightness-110 transition-all duration-300"
            >
              Conocer más
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-lg overflow-hidden bg-gradient-to-br from-primary/5 via-accent/10 to-primary/5 relative border border-border">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <span className="text-8xl font-heading font-extrabold text-accent/10">IG</span>
                </div>
              </div>
              <div className="absolute top-6 right-6 w-20 h-20 border border-accent/20 rounded-full" />
              <div className="absolute bottom-12 left-8 w-12 h-12 bg-gold/10 rounded-md rotate-45" />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-primary text-primary-foreground p-6 rounded-lg shadow-lg">
              <span className="text-4xl font-heading font-extrabold block text-gold">25+</span>
              <span className="text-sm font-body font-semibold">Años de trayectoria</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
