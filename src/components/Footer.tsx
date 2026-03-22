import { Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground pt-20 pb-8">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img
                src="https://www.imagenesgraficas.com/wp-content/uploads/2020/06/Imagenes-graficas-1.png"
                alt="Imágenes Gráficas"
                className="h-8 brightness-200"
              />
            </div>
            <p className="text-primary-foreground/60 text-sm leading-relaxed font-body mb-4">
              La fábrica de las grandes ideas. +25 años haciendo que las marcas hablen.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-body font-bold uppercase tracking-widest mb-4 text-primary-foreground/80">
              Servicios
            </h4>
            <ul className="space-y-3">
              {["Material POP", "Señalización", "Publicidad en Eventos", "Branding Físico", "Gran Formato"].map((s) => (
                <li key={s}>
                  <a href="#servicios" className="text-primary-foreground/50 text-sm font-body hover:text-accent transition-colors duration-300">
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-body font-bold uppercase tracking-widest mb-4 text-primary-foreground/80">
              Empresa
            </h4>
            <ul className="space-y-3">
              {["Nosotros", "Portafolio", "Proceso", "Contacto"].map((s) => (
                <li key={s}>
                  <a href="#" className="text-primary-foreground/50 text-sm font-body hover:text-accent transition-colors duration-300">
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-body font-bold uppercase tracking-widest mb-4 text-primary-foreground/80">
              Contacto
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="text-accent shrink-0 mt-0.5" size={16} />
                <span className="text-primary-foreground/50 text-sm font-body">Bogotá, Colombia</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="text-accent shrink-0 mt-0.5" size={16} />
                <span className="text-primary-foreground/50 text-sm font-body">+57 (1) 234 5678</span>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="text-accent shrink-0 mt-0.5" size={16} />
                <span className="text-primary-foreground/50 text-sm font-body">info@imagenesgraficas.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-primary-foreground/40 text-xs font-body">
            © {new Date().getFullYear()} Imágenes Gráficas BIC S.A.S. Todos los derechos reservados.
          </p>
          <p className="text-primary-foreground/25 text-xs font-body italic">
            La fábrica de las grandes ideas™
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
