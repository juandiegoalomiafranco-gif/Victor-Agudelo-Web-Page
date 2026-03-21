import { Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer id="contacto" className="bg-primary pt-20 pb-8">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div>
            <h3 className="text-xl font-extrabold text-primary-foreground mb-4">
              Imágenes Gráficas
            </h3>
            <p className="text-primary-foreground/50 text-sm leading-relaxed">
              Comunicación gráfica integral con más de 30 años de experiencia al servicio de las marcas más reconocidas de América Latina.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-bold text-primary-foreground uppercase tracking-wider mb-4">
              Servicios
            </h4>
            <ul className="space-y-3">
              {["Diseño editorial", "Impresión", "Publicidad y BTL", "Promos + Gifts", "Sostenibilidad"].map((s) => (
                <li key={s}>
                  <a href="#servicios" className="text-primary-foreground/50 text-sm hover:text-accent transition-colors">
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold text-primary-foreground uppercase tracking-wider mb-4">
              Empresa
            </h4>
            <ul className="space-y-3">
              {["Nosotros", "Casos de éxito", "Blog", "Política de privacidad"].map((s) => (
                <li key={s}>
                  <a href="#" className="text-primary-foreground/50 text-sm hover:text-accent transition-colors">
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold text-primary-foreground uppercase tracking-wider mb-4">
              Contacto
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="text-accent shrink-0 mt-0.5" size={16} />
                <span className="text-primary-foreground/50 text-sm">
                  Bogotá, Colombia
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="text-accent shrink-0 mt-0.5" size={16} />
                <span className="text-primary-foreground/50 text-sm">
                  +57 (1) 234 5678
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="text-accent shrink-0 mt-0.5" size={16} />
                <span className="text-primary-foreground/50 text-sm">
                  info@imagenesgraficas.com
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 pt-8 text-center">
          <p className="text-primary-foreground/30 text-sm">
            © {new Date().getFullYear()} Imágenes Gráficas BIC S.A.S. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
