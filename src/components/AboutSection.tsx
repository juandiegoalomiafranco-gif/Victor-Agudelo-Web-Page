import { motion } from "framer-motion";
import aboutTeam from "@/assets/about-team.jpg";

const AboutSection = () => {
  return (
    <section id="nosotros" className="py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-accent text-sm font-semibold uppercase tracking-[0.15em] mb-4">
              Más de 30 años de experiencia
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-foreground leading-tight mb-6">
              Somos el aliado estratégico de tu marca
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              Desde 1993, Imágenes Gráficas BIC S.A.S. ha sido el socio de confianza de las marcas más 
              reconocidas de Colombia y América Latina. Nos especializamos en comunicación gráfica integral: 
              desde el concepto creativo hasta la producción final, garantizando calidad y compromiso en cada proyecto.
            </p>
            <a
              href="#contacto"
              className="inline-block border-2 border-foreground text-foreground px-6 py-3 rounded-sm text-sm font-bold hover:bg-foreground hover:text-background transition-all"
            >
              Conocer más sobre nosotros
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
          >
            <div className="overflow-hidden rounded-sm">
              <img
                src={aboutTeam}
                alt="Equipo de Imágenes Gráficas trabajando"
                className="w-full h-[400px] lg:h-[500px] object-cover"
                loading="lazy"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-accent text-accent-foreground p-6 rounded-sm">
              <span className="text-4xl font-extrabold block">30+</span>
              <span className="text-sm font-semibold">Años de trayectoria</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
