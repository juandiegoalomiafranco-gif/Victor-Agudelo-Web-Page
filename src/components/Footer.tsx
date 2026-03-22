import { ArrowUpRight } from "lucide-react";

const ExactFooter = () => {
  return (
    <footer className="bg-primary text-white pt-24 pb-8 lg:pt-32">
      <div className="container mx-auto px-6 lg:px-8 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-16 mb-24">
          
          <div className="flex flex-col">
            <h3 className="text-4xl sm:text-5xl font-heading font-extrabold leading-tight tracking-tight mb-8">
              Listos para el <br/><span className="text-gold italic font-light">próximo reto.</span>
            </h3>
            
            <a href="mailto:info@imagenesgraficas.com" className="group inline-flex items-center gap-3 text-2xl font-body font-bold text-white hover:text-gold transition-colors">
              info@imagenesgraficas.com
              <ArrowUpRight size={24} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </a>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 lg:justify-items-end">
            <div className="flex flex-col gap-4">
              <span className="text-white/40 text-xs font-bold uppercase tracking-widest mb-2 border-b border-white/10 pb-2">Empresa</span>
              <a href="#hero" className="text-white/80 hover:text-white transition-colors font-semibold font-body text-sm">Inicio</a>
              <a href="#servicios" className="text-white/80 hover:text-white transition-colors font-semibold font-body text-sm">Expertise</a>
              <a href="#proceso" className="text-white/80 hover:text-white transition-colors font-semibold font-body text-sm">Metodología</a>
              <a href="#nosotros" className="text-white/80 hover:text-white transition-colors font-semibold font-body text-sm">Nosotros</a>
            </div>
            <div className="flex flex-col gap-4">
              <span className="text-white/40 text-xs font-bold uppercase tracking-widest mb-2 border-b border-white/10 pb-2">Social</span>
              <a href="#" className="text-white/80 hover:text-white transition-colors font-semibold font-body text-sm">LinkedIn</a>
              <a href="#" className="text-white/80 hover:text-white transition-colors font-semibold font-body text-sm">Instagram</a>
              <a href="#" className="text-white/80 hover:text-white transition-colors font-semibold font-body text-sm">Behance</a>
            </div>
          </div>
          
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-6 pt-8 border-t border-white/10 text-white/40 text-xs font-semibold uppercase tracking-widest">
          <p>© {new Date().getFullYear()} Imágenes Gráficas. Todos los derechos reservados.</p>
          <div className="flex items-center gap-2">
            <span>Powered by</span>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-white/20">
              <path d="M12 0C12 0 12 10 24 12C24 12 12 14 12 24C12 24 12 14 0 12C0 12 12 10 12 0Z" fill="currentColor"/>
            </svg>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default ExactFooter;
