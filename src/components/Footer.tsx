import { Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-background border-t border-border pt-20 pb-8">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 bg-accent rounded-sm flex items-center justify-center">
                <span className="text-accent-foreground font-heading font-bold text-xs">IG</span>
              </div>
              <h3 className="text-lg font-heading font-bold text-foreground">
                Imágenes Gráficas
              </h3>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed font-body mb-4">
              La fábrica de las grandes ideas. +25 años haciendo que las marcas hablen.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-body font-bold text-foreground uppercase tracking-widest mb-4">
              Servicios
            </h4>
            <ul className="space-y-3">
              {["Material POP", "Señalización", "Publicidad en Eventos", "Branding Físico", "Gran Formato"].map((s) => (
                <li key={s}>
                  <a href="#servicios" className="text-muted-foreground text-sm font-body hover:text-accent transition-colors duration-300">
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-body font-bold text-foreground uppercase tracking-widest mb-4">
              Empresa
            </h4>
            <ul className="space-y-3">
              {["Nosotros", "Portafolio", "Proceso", "Contacto"].map((s) => (
                <li key={s}>
                  <a href="#" className="text-muted-foreground text-sm font-body hover:text-accent transition-colors duration-300">
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-body font-bold text-foreground uppercase tracking-widest mb-4">
              Contacto
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="text-accent shrink-0 mt-0.5" size={16} />
                <span className="text-muted-foreground text-sm font-body">Bogotá, Colombia</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="text-accent shrink-0 mt-0.5" size={16} />
                <span className="text-muted-foreground text-sm font-body">+57 (1) 234 5678</span>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="text-accent shrink-0 mt-0.5" size={16} />
                <span className="text-muted-foreground text-sm font-body">info@imagenesgraficas.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground/50 text-xs font-body">
            © {new Date().getFullYear()} Imágenes Gráficas BIC S.A.S. Todos los derechos reservados.
          </p>
          <p className="text-muted-foreground/30 text-xs font-body italic">
            La fábrica de las grandes ideas™
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
