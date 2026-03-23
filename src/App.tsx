import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView, useScroll, useTransform, useSpring } from 'motion/react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Instagram, 
  Facebook, 
  ChevronRight, 
  Menu, 
  X, 
  Star, 
  CheckCircle2, 
  Calendar,
  Clock,
  User,
  MessageSquare,
  ArrowRight,
  Award,
  Stethoscope,
  Activity,
  ChevronDown,
  Plus,
  Minus,
  Play,
  Zap,
  Wind,
  ChevronLeft,
  Globe,
  Shield,
  ShieldCheck,
  Sparkles
} from 'lucide-react';

// --- Types ---
interface Testimonial {
  id: string;
  name: string;
  text: string;
  rating: number;
}

// --- Data ---
const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Carolina M.',
    text: 'Excelente profesional. Mi cirugía de nariz fue un éxito, respiro mucho mejor y el resultado estético es muy natural.',
    rating: 5,
  },
  {
    id: '2',
    name: 'Andrés R.',
    text: 'El Dr. Agudelo me dio mucha confianza desde la primera cita. Muy atento y profesional en todo el proceso.',
    rating: 5,
  },
  {
    id: '3',
    name: 'Valentina G.',
    text: 'Increíble cambio. Me siento mucho más segura de mí misma. ¡Gracias Dr. Agudelo!',
    rating: 5,
  }
];

// --- Components ---

const SplitHeading = ({ text, className }: { text: string; className?: string }) => {
  const lines = text.split('\n');
  return (
    <div className={`line-reveal active ${className}`}>
      {lines.map((line, i) => (
        <div key={i} className="overflow-hidden block">
          <motion.span
            initial={{ y: '100%' }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.25, 1, 0.5, 1], delay: i * 0.1 }}
            className="block"
          >
            {line}
          </motion.span>
        </div>
      ))}
    </div>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Inicio', href: '#inicio' },
    { name: 'El Doctor', href: '#doctor' },
    { name: 'Procedimientos', href: '#procedimientos' },
    { name: 'Resultados', href: '#resultados' },
    { name: 'FAQ', href: '#faq' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-700 ${scrolled ? 'translate-y-0' : 'translate-y-0'}`}>
      {/* Top Bar */}
      <div className={`w-full transition-all duration-500 overflow-hidden ${scrolled ? 'h-0 opacity-0' : 'h-12 bg-slate-950 text-white/60'}`}>
        <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between text-[10px] uppercase tracking-[0.2em] font-bold">
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors flex items-center gap-2">
              <Instagram className="w-3 h-3" /> Instagram
            </a>
            <a href="#" className="hover:text-white transition-colors flex items-center gap-2">
              <Facebook className="w-3 h-3" /> Facebook
            </a>
          </div>
          <div className="flex gap-8">
            <span className="flex items-center gap-2"><Phone className="w-3 h-3 text-sky-500" /> +57 311 308 9726</span>
            <span className="flex items-center gap-2"><MapPin className="w-3 h-3 text-sky-500" /> Cali, Colombia</span>
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <div className={`w-full transition-all duration-500 ${scrolled ? 'bg-white py-4 shadow-xl' : 'bg-white py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <a href="#" className="flex flex-col">
            <span className="font-serif text-2xl font-bold tracking-tighter text-slate-950">DR. VICTOR AGUDELO</span>
            <span className="text-[9px] uppercase tracking-[0.4em] text-sky-600 font-bold">Especialista en Rinoplastia</span>
          </a>

          <div className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <a 
                key={link.name}
                href={link.href}
                className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-500 hover:text-sky-600 transition-colors relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-1/2 w-0 h-px bg-sky-600 transition-all group-hover:w-full group-hover:left-0"></span>
              </a>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-6">
            <motion.a 
              href="#agendar" 
              whileHover={{ scale: 1.05, backgroundColor: '#0f172a' }}
              whileTap={{ scale: 0.95 }}
              className="bg-sky-600 text-white px-8 py-4 rounded-full font-bold text-[10px] uppercase tracking-widest transition-all shadow-xl shadow-sky-200/20 btn-premium"
            >
              Agendar Consulta
            </motion.a>
          </div>

          <button className="lg:hidden" onClick={() => setIsOpen(true)}>
            <Menu className="w-8 h-8 text-slate-950" />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="fixed inset-0 w-full h-screen bg-white z-[60] p-10 flex flex-col"
          >
            <div className="flex justify-between items-center mb-20">
              <div className="flex flex-col">
                <span className="font-serif text-2xl font-bold text-slate-950">DR. VICTOR AGUDELO</span>
                <span className="text-[9px] uppercase tracking-[0.4em] text-sky-600 font-bold">Especialista en Rinoplastia</span>
              </div>
              <button onClick={() => setIsOpen(false)}><X className="w-10 h-10 text-slate-950" /></button>
            </div>
            <div className="flex flex-col gap-8">
              {navLinks.map((link) => (
                <a key={link.name} href={link.href} className="text-5xl font-serif font-bold text-slate-950" onClick={() => setIsOpen(false)}>{link.name}</a>
              ))}
              <a href="#agendar" className="text-5xl font-serif font-bold text-sky-600" onClick={() => setIsOpen(false)}>Agendar Consulta</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);

  return (
    <section id="inicio" className="relative h-screen grid lg:grid-cols-2 overflow-hidden bg-[#fcfcf9] pt-20 lg:pt-0">
      {/* Left Content */}
      <div className="flex flex-col justify-center px-10 md:px-24 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex items-center gap-4 mb-8">
            <span className="h-px w-12 bg-sky-600"></span>
            <span className="text-[10px] uppercase tracking-[0.5em] text-sky-600 font-bold">
              Arte · Precisión · Armonía
            </span>
          </div>
          
          <h1 className="text-6xl md:text-8xl lg:text-[110px] font-serif text-slate-950 leading-[0.85] mb-12 tracking-[-0.05em]">
            La nariz que <br />
            <span className="italic font-medium text-sky-600">siempre</span> <br />
            quisiste tener.
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-500 font-light max-w-lg mb-16 leading-relaxed">
            Resultados que transforman vidas con la máxima naturalidad y excelencia quirúrgica en Cali.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-8">
            <motion.a 
              href="#agendar" 
              whileHover={{ scale: 1.08, backgroundColor: '#0f172a', boxShadow: '0 25px 50px -12px rgba(14, 165, 233, 0.4)' }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto bg-sky-600 text-white px-16 py-9 rounded-full font-bold text-xs uppercase tracking-[0.25em] transition-all shadow-2xl shadow-sky-200/40 flex items-center justify-center gap-4"
            >
              Agendar Consulta
              <ArrowRight className="w-5 h-5" />
            </motion.a>
            <motion.a 
              href="#resultados" 
              whileHover={{ scale: 1.08, borderColor: '#0ea5e9', color: '#0ea5e9', boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.1)' }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto border border-slate-300 text-slate-950 px-16 py-9 rounded-full font-bold text-xs uppercase tracking-[0.25em] transition-all flex items-center justify-center"
            >
              Ver Resultados
            </motion.a>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-10 left-10 md:left-24 flex items-center gap-4"
        >
          <div className="w-px h-12 bg-slate-300 relative overflow-hidden">
            <motion.div 
              animate={{ y: [0, 48] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="absolute top-0 left-0 w-full h-1/2 bg-sky-600"
            ></motion.div>
          </div>
          <span className="text-[9px] uppercase tracking-[0.4em] text-slate-400 font-bold">Desliza para explorar</span>
        </motion.div>

        {/* Subtle Decorative Element */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-sky-100/30 rounded-full blur-[120px] -z-10"></div>
      </div>

      {/* Right Image */}
      <div className="relative h-full overflow-hidden hidden lg:block">
        <motion.div style={{ y: y1 }} className="h-[120%] w-full">
          <img 
            src="https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=2070" 
            alt="Dr. Victor Agudelo" 
            className="w-full h-full object-cover object-top grayscale hover:grayscale-0 transition-all duration-1000"
            referrerPolicy="no-referrer"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#fcfcf9] via-transparent to-transparent"></div>
        
        {/* Floating Aesthetic Badge */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-20 left-20 bg-white/10 backdrop-blur-2xl border border-white/20 p-10 rounded-[40px] shadow-2xl"
        >
          <div className="text-white">
            <div className="text-sm uppercase tracking-[0.3em] font-bold opacity-60 mb-2">Filosofía</div>
            <div className="text-3xl font-serif italic leading-tight">"La belleza es el <br /> equilibrio perfecto."</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const StatsSection = () => {
  const stats = [
    { label: 'Años de Experiencia', value: 20, suffix: '+' },
    { label: 'Certificaciones', value: 12, suffix: '' },
    { label: 'Pacientes Felices', value: 100, suffix: '%' },
    { label: 'Países Atendidos', value: 15, suffix: '+' },
  ];

  return (
    <section className="py-40 bg-slate-950 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-20">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              className="relative group"
            >
              <div className="text-7xl md:text-8xl font-serif text-sky-400 mb-6 flex items-baseline tracking-tighter group-hover:scale-105 transition-transform duration-500">
                <Counter value={stat.value} />
                <span className="text-4xl ml-1 opacity-50">{stat.suffix}</span>
              </div>
              <div className="h-px w-12 bg-sky-600 mb-6 group-hover:w-full transition-all duration-700"></div>
              <div className="text-[10px] uppercase tracking-[0.4em] text-slate-400 font-bold leading-relaxed">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Counter = ({ value }: { value: number }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = value;
      const duration = 2000;
      const increment = end / (duration / 16);
      
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);
      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return <span ref={ref}>{count}</span>;
};

const MeetTheDoctor = () => {
  return (
    <section id="doctor" className="py-32 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1559839734-2b71f1536783?auto=format&fit=crop&q=80&w=2070" 
                alt="Dr. Victor Agudelo" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-sky-50 rounded-2xl -z-10"></div>
            <div className="absolute -top-10 -left-10 w-40 h-40 border-2 border-sky-100 rounded-full -z-10"></div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-sky-600 font-bold uppercase tracking-[0.3em] text-[10px] mb-6 block">El Especialista</span>
            <h2 className="text-5xl md:text-6xl font-serif text-slate-900 mb-8 leading-tight">
              Dr. Victor Manuel <br />
              <span className="italic">Agudelo</span>
            </h2>
            <p className="text-xl text-slate-600 font-light leading-relaxed mb-8">
              Con más de dos décadas de trayectoria, el Dr. Agudelo ha perfeccionado el arte de la rinoplastia, enfocándose exclusivamente en resultados que no solo mejoran la estética, sino que armonizan con la esencia única de cada rostro.
            </p>
            <div className="space-y-6 mb-12">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-sky-50 flex items-center justify-center shrink-0">
                  <Award className="w-5 h-5 text-sky-600" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm uppercase tracking-wider mb-1">Especialista Certificado</h4>
                  <p className="text-slate-500 text-sm">Miembro de las sociedades más prestigiosas de cirugía plástica y otorrinolaringología.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-sky-50 flex items-center justify-center shrink-0">
                  <Star className="w-5 h-5 text-sky-600" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm uppercase tracking-wider mb-1">Filosofía Natural</h4>
                  <p className="text-slate-500 text-sm">Enfoque en la preservación de la estructura nasal para resultados duraderos y funcionales.</p>
                </div>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-8 items-center opacity-50 grayscale">
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Logo_de_la_Sociedad_Colombiana_de_Cirug%C3%ADa_Pl%C3%A1stica.png/220px-Logo_de_la_Sociedad_Colombiana_de_Cirug%C3%ADa_Pl%C3%A1stica.png" alt="SCCP" className="h-12 object-contain" referrerPolicy="no-referrer" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_Logos_Search.svg/2560px-Google_Logos_Search.svg.png" alt="Logo" className="h-8 object-contain" referrerPolicy="no-referrer" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};


const StaffCarousel = () => {
  const staff = [
    { name: 'Dra. Elena Martínez', role: 'Anestesióloga', img: 'https://images.unsplash.com/photo-1559839734-2b71f1e3c770?auto=format&fit=crop&q=80&w=400' },
    { name: 'Enf. Carlos Ruiz', role: 'Jefe de Quirófano', img: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400' },
    { name: 'Dra. Sofía Castro', role: 'Especialista en Recuperación', img: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=400' },
    { name: 'Luz Adriana', role: 'Coordinadora de Pacientes', img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400' },
  ];

  return (
    <section className="py-32 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-10">
          <div className="max-w-2xl">
            <span className="text-sky-600 font-bold uppercase tracking-[0.2em] text-[10px] mb-6 block">Nuestro Equipo</span>
            <h2 className="text-5xl font-serif font-bold text-slate-900 mb-8">Expertos Comprometidos con tu Seguridad</h2>
            <p className="text-slate-500 text-lg font-light">Contamos con un equipo multidisciplinario de profesionales altamente calificados para brindarte la mejor atención en cada etapa de tu proceso.</p>
          </div>
          <div className="flex gap-4">
            <button className="w-14 h-14 rounded-full border border-slate-200 flex items-center justify-center hover:bg-sky-600 hover:text-white hover:border-sky-600 transition-all">
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button className="w-14 h-14 rounded-full border border-slate-200 flex items-center justify-center hover:bg-sky-600 hover:text-white hover:border-sky-600 transition-all">
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {staff.map((person, i) => (
            <motion.div 
              key={person.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="aspect-[3/4] rounded-[2.5rem] overflow-hidden mb-6 relative">
                <img 
                  src={person.img} 
                  alt={person.name} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-sky-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
              <h4 className="text-xl font-serif font-bold text-slate-900 mb-1">{person.name}</h4>
              <p className="text-sky-600 text-xs uppercase tracking-widest font-bold">{person.role}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const VideoReviews = () => {
  const reviews = [
    { id: 1, title: 'Mi experiencia con la Rinoplastia', name: 'Mariana G.', img: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=400' },
    { id: 2, title: 'Resultados naturales y funcionales', name: 'Juan P.', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400' },
    { id: 3, title: 'Recuperación rápida y sin dolor', name: 'Camila R.', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400' },
  ];

  return (
    <section className="py-32 bg-slate-900 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-24">
          <span className="text-sky-400 font-bold uppercase tracking-[0.2em] text-[10px] mb-6 block">Testimonios en Video</span>
          <h2 className="text-5xl md:text-6xl font-serif font-bold mb-8">Historias que Inspiran Confianza</h2>
          <p className="text-slate-400 text-lg font-light">Escucha de primera mano las experiencias de nuestros pacientes y cómo su vida cambió después de su procedimiento con el Dr. Agudelo.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((review, i) => (
            <motion.div 
              key={review.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="group cursor-pointer"
            >
              <div className="aspect-video rounded-[2.5rem] overflow-hidden mb-8 relative border border-white/10">
                <img 
                  src={review.img} 
                  alt={review.title} 
                  className="w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-110 transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 group-hover:scale-110 group-hover:bg-sky-600 transition-all">
                    <Play className="w-6 h-6 text-white fill-current" />
                  </div>
                </div>
              </div>
              <h4 className="text-xl font-serif font-bold mb-2 group-hover:text-sky-400 transition-colors">{review.title}</h4>
              <p className="text-slate-400 text-sm italic">— {review.name}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const MensRhinoplasty = () => {
  return (
    <section className="py-32 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-sky-600 font-bold uppercase tracking-[0.3em] text-[10px] mb-6 block">Enfoque Masculino</span>
            <h2 className="text-5xl md:text-6xl font-serif text-slate-900 mb-8 leading-tight">
              Rinoplastia <br />
              <span className="italic">Masculina</span>
            </h2>
            <p className="text-xl text-slate-600 font-light leading-relaxed mb-8">
              La anatomía nasal masculina requiere un enfoque técnico distinto. El Dr. Agudelo se especializa en preservar los rasgos fuertes y masculinos, evitando resultados feminizados y priorizando la armonía con la estructura ósea del hombre.
            </p>
            <div className="grid grid-cols-2 gap-8 mb-12">
              <div>
                <h4 className="font-bold text-slate-900 text-sm uppercase tracking-wider mb-2">Perfil Fuerte</h4>
                <p className="text-slate-500 text-xs">Preservación del dorso recto y ángulos masculinos.</p>
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm uppercase tracking-wider mb-2">Máxima Función</h4>
                <p className="text-slate-500 text-xs">Optimización de la vía aérea para deportistas y vida activa.</p>
              </div>
            </div>
            <a href="#agendar" className="inline-block bg-slate-900 text-white px-10 py-5 rounded-full font-bold text-sm uppercase tracking-widest hover:bg-sky-600 transition-all">
              Consulta para Hombres
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-square rounded-full overflow-hidden shadow-2xl border-[15px] border-slate-50">
              <img 
                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=2070" 
                alt="Rinoplastia Masculina" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-sky-600 rounded-full flex items-center justify-center text-white shadow-xl">
              <div className="text-center">
                <div className="text-2xl font-bold">100%</div>
                <div className="text-[8px] uppercase font-bold tracking-tighter">Masculino</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Process = () => {
  const steps = [
    {
      title: 'Consulta Inicial',
      desc: 'Evaluación detallada de tu estructura facial y objetivos personales.',
      icon: <MessageSquare className="w-6 h-6" />
    },
    {
      title: 'Planificación',
      desc: 'Diseño personalizado utilizando tecnología de vanguardia.',
      icon: <Activity className="w-6 h-6" />
    },
    {
      title: 'Procedimiento',
      desc: 'Cirugía de alta precisión en instalaciones de primer nivel.',
      icon: <Stethoscope className="w-6 h-6" />
    },
    {
      title: 'Recuperación',
      desc: 'Cuidados postoperatorios inmediatos y seguimiento inicial.',
      icon: <CheckCircle2 className="w-6 h-6" />
    },
    {
      title: 'Seguimiento',
      desc: 'Control a largo plazo para asegurar resultados duraderos.',
      icon: <Calendar className="w-6 h-6" />
    }
  ];

  return (
    <section className="py-32 bg-slate-900 text-white overflow-hidden relative">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-sky-600/5 blur-[120px]"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-24">
          <span className="text-sky-400 font-bold uppercase tracking-[0.2em] text-[10px] mb-6 block">Tu Camino al Cambio</span>
          <h2 className="text-5xl md:text-6xl font-serif font-bold mb-8">El Proceso de Transformación</h2>
        </div>

        <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-12">
          {steps.map((step, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.2 }}
              viewport={{ once: true }}
              className="relative"
            >
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-10 left-full w-full h-px bg-gradient-to-r from-sky-600/50 to-transparent z-0"></div>
              )}
              <div className="w-20 h-20 bg-white/5 rounded-3xl flex items-center justify-center mb-10 border border-white/10 relative z-10">
                <div className="text-sky-400">{step.icon}</div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-sky-600 rounded-full flex items-center justify-center text-xs font-bold">
                  0{i + 1}
                </div>
              </div>
              <h3 className="text-2xl font-serif font-bold mb-5">{step.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed font-light">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const StickyFAQSection = () => {
  const faqs = [
    {
      number: '01',
      question: "¿Qué es una rinoplastia?",
      answer: "La rinoplastia es una cirugía plástica facial que busca mejorar la apariencia estética de la nariz y/o su función respiratoria. El Dr. Agudelo se especializa en resultados naturales que armonizan con el rostro del paciente."
    },
    {
      number: '02',
      question: "¿Cuánto tiempo dura la recuperación?",
      answer: "La recuperación inicial suele durar entre 7 y 10 días, tiempo tras el cual se retira la férula. La inflamación mayor desaparece en las primeras semanas, pero el resultado final se aprecia completamente al año de la cirugía."
    },
    {
      number: '03',
      question: "¿La cirugía es dolorosa?",
      answer: "Contrario a lo que se cree, la rinoplastia moderna no suele ser dolorosa. La mayoría de los pacientes reportan una sensación de congestión nasal similar a un resfriado fuerte, pero el dolor agudo es poco común."
    },
    {
      number: '04',
      question: "¿Quedan cicatrices visibles?",
      answer: "En la mayoría de los casos (rinoplastia cerrada), no quedan cicatrices externas. En la rinoplastia abierta, queda una pequeña cicatriz en la columela (la base de la nariz) que se vuelve prácticamente imperceptible con el tiempo."
    },
    {
      number: '05',
      question: "¿A qué edad me puedo operar?",
      answer: "Se recomienda esperar a que el desarrollo facial se haya completado, lo cual suele ocurrir alrededor de los 15-16 años en mujeres y 17-18 años en hombres."
    }
  ];

  return (
    <section id="faq" className="py-40 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-[1fr_2fr] gap-20">
          <div className="relative">
            <div className="lg:sticky lg:top-40">
              <span className="text-sky-600 font-bold uppercase tracking-[0.3em] text-[10px] mb-6 block">Preguntas Frecuentes</span>
              <h2 className="text-5xl md:text-7xl font-serif text-slate-900 mb-8 leading-tight tracking-tighter">
                Dudas <br />
                <span className="italic">Comunes</span>
              </h2>
              <p className="text-slate-500 text-lg font-light leading-relaxed max-w-sm">
                Todo lo que necesitas saber antes de tu consulta. Resolvemos las inquietudes más frecuentes de nuestros pacientes.
              </p>
            </div>
          </div>

          <div className="space-y-12">
            {faqs.map((faq, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: index * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="group"
              >
                <div className="grid grid-cols-[80px_1fr] gap-8 items-start">
                  <span className="text-8xl font-serif font-bold text-slate-100 group-hover:text-sky-100 transition-colors leading-[0.8] tracking-tighter">
                    {faq.number}
                  </span>
                  <div className="pt-2">
                    <h3 className="text-2xl font-serif font-bold text-slate-900 mb-6 group-hover:text-sky-600 transition-colors">
                      {faq.question}
                    </h3>
                    <p className="text-slate-500 text-lg font-light leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
                <div className="h-px w-full bg-slate-100 mt-12 group-hover:bg-sky-100 transition-colors"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const BookingForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    date: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(3); // Show success
  };

  return (
    <section id="agendar" className="py-32 bg-sky-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-24 items-center">
          <div>
            <span className="text-sky-600 font-bold uppercase tracking-[0.2em] text-[10px] mb-6 block">Agenda tu Cita</span>
            <h2 className="text-5xl md:text-6xl font-serif font-bold text-slate-900 mb-8 leading-tight">Comienza tu Transformación Hoy</h2>
            <p className="text-slate-500 text-lg mb-12 leading-relaxed font-light">
              Agenda tu cita de valoración y descubre cómo podemos ayudarte a alcanzar tus objetivos estéticos y funcionales con la seguridad de un experto.
            </p>
            
            <div className="space-y-8">
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-sky-600 shadow-sm">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-1">WhatsApp Directo</p>
                  <p className="font-serif text-2xl font-bold text-slate-900">+57 311 308 9726</p>
                </div>
              </div>
              
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-sky-600 shadow-sm">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-1">Ubicación</p>
                  <p className="font-serif text-2xl font-bold text-slate-900">Av. 4 Norte # 14-38, Cali</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-[4rem] p-10 md:p-16 shadow-2xl border border-sky-50">
            {step === 1 && (
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-8"
              >
                <div className="flex justify-between items-center mb-10">
                  <h3 className="text-3xl font-serif font-bold text-slate-900">Tus Datos</h3>
                  <span className="text-[10px] font-bold text-sky-600 bg-sky-50 px-4 py-2 rounded-full uppercase tracking-widest">Paso 1 de 2</span>
                </div>
                <div className="space-y-6">
                  <div className="relative">
                    <input 
                      type="text" 
                      required
                      className="w-full px-0 py-4 bg-transparent border-b-2 border-slate-100 focus:border-sky-600 transition-all outline-none text-lg font-medium placeholder:text-slate-300"
                      placeholder="Nombre Completo"
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                  <div className="relative">
                    <input 
                      type="email" 
                      required
                      className="w-full px-0 py-4 bg-transparent border-b-2 border-slate-100 focus:border-sky-600 transition-all outline-none text-lg font-medium placeholder:text-slate-300"
                      placeholder="Correo Electrónico"
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                  <div className="relative">
                    <input 
                      type="tel" 
                      required
                      className="w-full px-0 py-4 bg-transparent border-b-2 border-slate-100 focus:border-sky-600 transition-all outline-none text-lg font-medium placeholder:text-slate-300"
                      placeholder="Teléfono / WhatsApp"
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    />
                  </div>
                </div>
                <button 
                  onClick={() => setStep(2)}
                  className="w-full bg-slate-900 text-white py-6 rounded-full font-bold text-sm uppercase tracking-[0.2em] hover:bg-sky-600 transition-all shadow-xl shadow-slate-200 mt-10"
                >
                  Continuar
                </button>
              </motion.div>
            )}

            {step === 2 && (
              <motion.form 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                onSubmit={handleSubmit} 
                className="space-y-8"
              >
                <div className="flex justify-between items-center mb-10">
                  <h3 className="text-3xl font-serif font-bold text-slate-900">Detalles</h3>
                  <span className="text-[10px] font-bold text-sky-600 bg-sky-50 px-4 py-2 rounded-full uppercase tracking-widest">Paso 2 de 2</span>
                </div>
                <div className="space-y-6">
                  <div className="relative">
                    <select 
                      required
                      className="w-full px-0 py-4 bg-transparent border-b-2 border-slate-100 focus:border-sky-600 transition-all outline-none text-lg font-medium appearance-none cursor-pointer"
                      onChange={(e) => setFormData({...formData, service: e.target.value})}
                    >
                      <option value="">Servicio de Interés</option>
                      <option value="rinoplastia">Rinoplastia Estética</option>
                      <option value="funcional">Rinoplastia Funcional</option>
                      <option value="facial">Cirugía Facial</option>
                      <option value="consulta">Consulta Otorrino</option>
                    </select>
                    <ChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
                  </div>
                  <div className="relative">
                    <input 
                      type="date" 
                      required
                      className="w-full px-0 py-4 bg-transparent border-b-2 border-slate-100 focus:border-sky-600 transition-all outline-none text-lg font-medium"
                      onChange={(e) => setFormData({...formData, date: e.target.value})}
                    />
                  </div>
                  <div className="relative">
                    <textarea 
                      placeholder="Mensaje Adicional (Opcional)"
                      className="w-full px-0 py-4 bg-transparent border-b-2 border-slate-100 focus:border-sky-600 transition-all outline-none text-lg font-medium h-24 resize-none placeholder:text-slate-300"
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                    ></textarea>
                  </div>
                </div>
                <div className="flex gap-4 pt-6">
                  <button 
                    type="button"
                    onClick={() => setStep(1)}
                    className="flex-1 bg-slate-50 text-slate-500 py-6 rounded-full font-bold text-sm uppercase tracking-widest hover:bg-slate-100 transition-all"
                  >
                    Atrás
                  </button>
                  <button 
                    type="submit"
                    className="flex-[2] bg-sky-600 text-white py-6 rounded-full font-bold text-sm uppercase tracking-[0.2em] hover:bg-sky-700 transition-all shadow-xl shadow-sky-200"
                  >
                    Confirmar
                  </button>
                </div>
              </motion.form>
            )}

            {step === 3 && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-10"
              >
                <div className="w-24 h-24 bg-sky-50 text-sky-600 rounded-full flex items-center justify-center mx-auto mb-8">
                  <CheckCircle2 className="w-12 h-12" />
                </div>
                <h3 className="text-4xl font-serif font-bold text-slate-900 mb-6">¡Solicitud Recibida!</h3>
                <p className="text-slate-500 mb-10 leading-relaxed font-light">
                  Gracias por tu confianza, <strong>{formData.name}</strong>. Nuestro equipo te contactará en breve para confirmar los detalles.
                </p>
                <button 
                  onClick={() => setStep(1)}
                  className="text-sky-600 font-bold text-sm uppercase tracking-widest hover:underline"
                >
                  Nueva Solicitud
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-slate-950 text-white py-40 overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-[2fr_1fr_1fr] gap-24 mb-32">
          <div>
            <a href="#" className="flex flex-col mb-12">
              <span className="font-serif text-4xl font-bold tracking-tighter mb-2">DR. VICTOR AGUDELO</span>
              <span className="text-[10px] uppercase tracking-[0.4em] text-sky-400 font-bold">Especialista en Rinoplastia · Cali, Colombia</span>
            </a>
            <p className="text-slate-400 text-xl font-light leading-relaxed max-w-md mb-12">
              Dedicados exclusivamente a la rinoplastia, combinando arte y ciencia para lograr resultados que armonizan tu rostro y mejoran tu calidad de vida.
            </p>
            <div className="flex gap-8">
              <a href="#" className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center hover:bg-sky-600 transition-all duration-500 border border-white/10">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="#" className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center hover:bg-sky-600 transition-all duration-500 border border-white/10">
                <Facebook className="w-6 h-6" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-[10px] uppercase tracking-[0.3em] text-white/40 mb-10">Explorar</h4>
            <ul className="space-y-6 text-lg font-light">
              <li><a href="#inicio" className="hover:text-sky-400 transition-colors">Inicio</a></li>
              <li><a href="#doctor" className="hover:text-sky-400 transition-colors">El Especialista</a></li>
              <li><a href="#procedimientos" className="hover:text-sky-400 transition-colors">Procedimientos</a></li>
              <li><a href="#resultados" className="hover:text-sky-400 transition-colors">Resultados Reales</a></li>
              <li><a href="#faq" className="hover:text-sky-400 transition-colors">Preguntas Frecuentes</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-[10px] uppercase tracking-[0.3em] text-white/40 mb-10">Contacto</h4>
            <ul className="space-y-8 text-lg font-light">
              <li className="flex items-start gap-6">
                <MapPin className="w-6 h-6 text-sky-500 shrink-0" />
                <span className="leading-relaxed">Av. 4 Norte # 14-38,<br />Cali, Colombia</span>
              </li>
              <li className="flex items-center gap-6">
                <Phone className="w-6 h-6 text-sky-500 shrink-0" />
                <span>+57 311 308 9726</span>
              </li>
              <li className="flex items-center gap-6">
                <Mail className="w-6 h-6 text-sky-500 shrink-0" />
                <span className="text-sm">contacto@drvictoragudelo.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] uppercase tracking-[0.3em] text-slate-600 font-bold">
          <p>© 2024 Dr. Victor Manuel Agudelo. Excellence in Rhinoplasty.</p>
          <div className="flex gap-12">
            <a href="#" className="hover:text-white transition-colors">Privacidad</a>
            <a href="#" className="hover:text-white transition-colors">Términos</a>
            <a href="#" className="hover:text-white transition-colors">Créditos</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

const BeforeAfterSlider = ({ before, after }: { before: string; after: string }) => {
  const [sliderPos, setSliderPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return;
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const pos = ((x - rect.left) / rect.width) * 100;
    setSliderPos(Math.min(Math.max(pos, 0), 100));
  };

  return (
    <div 
      className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden cursor-ew-resize select-none group shadow-2xl"
      onMouseDown={() => setIsDragging(true)}
      onMouseUp={() => setIsDragging(false)}
      onMouseLeave={() => setIsDragging(false)}
      onMouseMove={handleMove}
      onTouchStart={() => setIsDragging(true)}
      onTouchEnd={() => setIsDragging(false)}
      onTouchMove={handleMove}
    >
      <img src={after} alt="Después" className="absolute inset-0 w-full h-full object-cover" referrerPolicy="no-referrer" />
      <div 
        className="absolute inset-0 w-full h-full overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
      >
        <img src={before} alt="Antes" className="absolute inset-0 w-full h-full object-cover" referrerPolicy="no-referrer" />
      </div>
      
      <div 
        className="absolute inset-y-0 w-1 bg-white shadow-xl flex items-center justify-center"
        style={{ left: `${sliderPos}%` }}
      >
        <div className="w-10 h-10 rounded-full bg-white shadow-2xl flex items-center justify-center -ml-0.5 group-hover:scale-110 transition-transform">
          <div className="flex gap-1">
            <ChevronLeft className="w-3 h-3 text-sky-600" />
            <ChevronRight className="w-3 h-3 text-sky-600" />
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 left-6 bg-slate-950/40 backdrop-blur-md text-white px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest">Antes</div>
      <div className="absolute bottom-6 right-6 bg-sky-600/60 backdrop-blur-md text-white px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest">Después</div>
    </div>
  );
};

const Results = () => {
  const cases = [
    { before: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&q=80&w=800', after: 'https://images.unsplash.com/photo-1579154235602-3c2c2446026b?auto=format&fit=crop&q=80&w=800' },
    { before: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=800', after: 'https://images.unsplash.com/photo-1559839734-2b71f1536783?auto=format&fit=crop&q=80&w=800' },
    { before: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800', after: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&q=80&w=800' },
  ];

  return (
    <section id="resultados" className="py-40 bg-[#efefef] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-[1fr_2fr] gap-20 items-end mb-24">
          <div>
            <span className="text-sky-600 font-bold uppercase tracking-[0.3em] text-[10px] mb-6 block">Casos de Éxito</span>
            <h2 className="text-5xl md:text-7xl font-serif text-slate-900 leading-tight tracking-tighter">
              Resultados <br />
              <span className="italic">Reales</span>
            </h2>
          </div>
          <p className="text-slate-500 text-xl font-light leading-relaxed max-w-xl">
            La armonía facial es el resultado de la precisión y el arte. Desliza para ver las transformaciones de nuestros pacientes.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-12">
          {cases.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
            >
              <BeforeAfterSlider before={item.before} after={item.after} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const UltrasonicTechnology = () => {
  const features = [
    { title: 'Precisión Milimétrica', desc: 'Cortes exactos sin dañar tejidos blandos.', icon: <Zap className="w-6 h-6" /> },
    { title: 'Menos Inflamación', desc: 'Recuperación un 40% más rápida que técnica tradicional.', icon: <Shield className="w-6 h-6" /> },
    { title: 'Sin Moretones', desc: 'Mínimo trauma vascular durante el procedimiento.', icon: <CheckCircle2 className="w-6 h-6" /> },
  ];

  return (
    <section className="py-40 bg-slate-950 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-sky-400 font-bold uppercase tracking-[0.3em] text-[10px] mb-6 block">Tecnología de Vanguardia</span>
            <h2 className="text-5xl md:text-7xl font-serif mb-10 leading-tight tracking-tighter">
              Rinoplastia <br />
              <span className="italic text-sky-400">Ultrasónica</span>
            </h2>
            <p className="text-slate-400 text-xl font-light leading-relaxed mb-12">
              Utilizamos el sistema Piezotome® para esculpir el hueso nasal con ondas ultrasónicas, eliminando la necesidad de martillo y cincel.
            </p>
            <div className="space-y-8">
              {features.map((f, i) => (
                <div key={i} className="flex gap-6 items-start">
                  <div className="w-12 h-12 rounded-2xl bg-sky-600/20 flex items-center justify-center text-sky-400 shrink-0 border border-sky-600/30">
                    {f.icon}
                  </div>
                  <div>
                    <h4 className="text-xl font-serif font-bold mb-2">{f.title}</h4>
                    <p className="text-slate-500 font-light">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <div className="relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="aspect-square rounded-[4rem] overflow-hidden border border-white/10"
            >
              <img 
                src="https://images.unsplash.com/photo-1579154235602-3c2c2446026b?auto=format&fit=crop&q=80&w=1000" 
                alt="Tecnología Ultrasónica" 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                referrerPolicy="no-referrer"
              />
            </motion.div>
            <div className="absolute -bottom-10 -left-10 bg-sky-600 p-10 rounded-[3rem] shadow-2xl">
              <div className="text-4xl font-serif font-bold mb-1">98%</div>
              <div className="text-[10px] uppercase tracking-widest font-bold opacity-80">Precisión Quirúrgica</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const InternationalPatients = () => {
  return (
    <section className="py-40 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="bg-[#9baeba] rounded-[4rem] p-12 md:p-24 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-white/5 skew-x-12 translate-x-1/2"></div>
          
          <div className="relative z-10 grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <span className="text-white/60 font-bold uppercase tracking-[0.3em] text-[10px] mb-6 block">Global Reach</span>
              <h2 className="text-5xl md:text-7xl font-serif mb-10 leading-tight tracking-tighter">
                Pacientes <br />
                <span className="italic">Internacionales</span>
              </h2>
              <p className="text-white/80 text-xl font-light leading-relaxed mb-12">
                Cali es el destino Nº1 para cirugía plástica en Latinoamérica. Ofrecemos un plan integral de "Turismo Médico" que incluye recuperación asistida y transporte.
              </p>
              <div className="flex flex-wrap gap-6">
                <div className="bg-white/10 backdrop-blur-md border border-white/20 px-8 py-4 rounded-2xl">
                  <div className="text-2xl font-serif font-bold">Consulta Virtual</div>
                  <div className="text-[10px] uppercase tracking-widest opacity-60">Vía Zoom / WhatsApp</div>
                </div>
                <div className="bg-white/10 backdrop-blur-md border border-white/20 px-8 py-4 rounded-2xl">
                  <div className="text-2xl font-serif font-bold">Recuperación</div>
                  <div className="text-[10px] uppercase tracking-widest opacity-60">Hoteles en Alianza</div>
                </div>
              </div>
            </div>
            
            <div className="aspect-video rounded-[2rem] overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1577563908411-5077b6dc7624?auto=format&fit=crop&q=80&w=1000" 
                alt="Cali, Colombia" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const SatisfactionIndex = () => {
  const metrics = [
    { label: 'Simetría Nasal', value: 99 },
    { label: 'Función Respiratoria', value: 97 },
    { label: 'Naturalidad del Resultado', value: 100 },
    { label: 'Experiencia Postoperatoria', value: 95 },
  ];

  return (
    <section className="py-40 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-24">
          <span className="text-sky-600 font-bold uppercase tracking-[0.3em] text-[10px] mb-6 block">Métricas de Calidad</span>
          <h2 className="text-5xl md:text-7xl font-serif text-slate-900 mb-8 leading-tight tracking-tighter">
            Índice de <span className="italic">Satisfacción</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-x-24 gap-y-16">
          {metrics.map((m, i) => (
            <div key={i}>
              <div className="flex justify-between items-end mb-4">
                <span className="text-xl font-serif font-bold text-slate-900">{m.label}</span>
                <span className="text-sky-600 font-bold text-2xl">{m.value}%</span>
              </div>
              <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: `${m.value}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  className="h-full bg-sky-600 rounded-full"
                ></motion.div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Testimonials = () => {
  const videoReviews = [
    { id: 1, title: 'Mi experiencia', name: 'Mariana G.', img: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=400' },
    { id: 2, title: 'Resultados naturales', name: 'Juan P.', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400' },
  ];

  const textReviews = [
    { name: 'Camila R.', text: 'El Dr. Agudelo superó todas mis expectativas. Mi nariz se ve increíble y respiro mejor que nunca.', role: 'Paciente de Rinoplastia' },
    { name: 'Andrés M.', text: 'Excelente profesional. La técnica ultrasónica hizo que mi recuperación fuera muy rápida.', role: 'Paciente de Rinoplastia Masculina' },
    { name: 'Sofía L.', text: 'La mejor decisión de mi vida. El trato del equipo es excepcional.', role: 'Paciente Internacional' },
  ];

  return (
    <section id="testimonios" className="py-40 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-[1.5fr_1fr] gap-24">
          <div>
            <span className="text-sky-600 font-bold uppercase tracking-[0.3em] text-[10px] mb-6 block">Testimonios</span>
            <h2 className="text-5xl md:text-7xl font-serif text-slate-900 mb-16 leading-tight tracking-tighter">
              Historias de <br />
              <span className="italic">Transformación</span>
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              {videoReviews.map((review, i) => (
                <motion.div 
                  key={review.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group cursor-pointer"
                >
                  <div className="aspect-[4/5] rounded-[3rem] overflow-hidden mb-8 relative border border-slate-100">
                    <img 
                      src={review.img} 
                      alt={review.title} 
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-xl flex items-center justify-center border border-white/30 group-hover:scale-110 group-hover:bg-sky-600 transition-all duration-500">
                        <Play className="w-8 h-8 text-white fill-current" />
                      </div>
                    </div>
                    <div className="absolute bottom-10 left-10 right-10">
                      <h4 className="text-2xl font-serif font-bold text-white mb-2">{review.title}</h4>
                      <p className="text-white/60 text-sm italic">— {review.name}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="space-y-12 lg:pt-40">
            {textReviews.map((review, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="p-10 rounded-[3rem] bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-2xl transition-all duration-500 group"
              >
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-sky-500 fill-current" />
                  ))}
                </div>
                <p className="text-slate-600 text-lg font-light leading-relaxed mb-8 italic">
                  "{review.text}"
                </p>
                <div>
                  <h4 className="font-serif font-bold text-slate-900 text-xl">{review.name}</h4>
                  <p className="text-sky-600 text-[10px] uppercase tracking-widest font-bold">{review.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const MapSection = () => {
  return (
    <section className="h-[500px] bg-slate-200 relative">
      <iframe 
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2176.001825724032!2d-76.5321486206581!3d3.4577162028013166!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0:0x1a0d86adf7daaa6a!2sClinica%20de%20Otorrinolaringologia!5e0!3m2!1ses-419!2spe!4v1462814862731" 
        className="w-full h-full border-0 grayscale opacity-80"
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
      <div className="absolute top-10 left-10 bg-white p-6 rounded-3xl shadow-2xl max-w-xs hidden md:block">
        <h4 className="font-bold text-lg mb-2">Visítanos en Cali</h4>
        <p className="text-sm text-slate-600 mb-4">Av. 4 Norte # 14-38, Consultorio 302. Clínica de Otorrinolaringología.</p>
        <a href="https://maps.google.com" target="_blank" className="text-sky-600 font-bold text-sm flex items-center gap-2">
          Cómo llegar <ChevronRight className="w-4 h-4" />
        </a>
      </div>
    </section>
  );
};

const StickyMobileCTA = () => {
  return (
    <div className="fixed bottom-6 left-6 right-6 z-50 md:hidden">
      <motion.a 
        href="#agendar"
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center justify-between bg-sky-600 text-white px-8 py-5 rounded-full shadow-2xl shadow-sky-900/40 font-bold text-sm uppercase tracking-widest"
      >
        <span>Agendar Cita</span>
        <Calendar className="w-5 h-5" />
      </motion.a>
    </div>
  );
};

const ProceduresCarousel = () => {
  const procedures = [
    { title: 'Rinoplastia Primaria', description: 'Para pacientes que se someten a su primera cirugía nasal, buscando armonía y funcionalidad.', img: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&q=80&w=800' },
    { title: 'Rinoplastia Secundaria', description: 'Corrección de resultados insatisfactorios de cirugías previas realizadas en otros centros.', img: 'https://images.unsplash.com/photo-1579154235602-3c2c2446026b?auto=format&fit=crop&q=80&w=800' },
    { title: 'Rinoplastia Ultrasónica', description: 'Uso de tecnología piezoeléctrica para un remodelado óseo preciso con menos trauma.', img: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=800' },
    { title: 'Septoplastia', description: 'Corrección del tabique desviado para mejorar significativamente la función respiratoria.', img: 'https://images.unsplash.com/photo-1559839734-2b71f1536783?auto=format&fit=crop&q=80&w=800' },
    { title: 'Mentoplastia', description: 'Procedimiento complementario para equilibrar el perfil facial junto con la rinoplastia.', img: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800' }
  ];

  return (
    <section id="procedimientos" className="py-40 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-[1fr_2fr] gap-24 mb-32">
          <div>
            <span className="text-sky-600 font-bold uppercase tracking-[0.3em] text-[10px] mb-6 block">Especialidades</span>
            <h2 className="text-5xl md:text-7xl font-serif text-slate-900 leading-tight tracking-tighter">
              Soluciones <br />
              <span className="italic">Avanzadas</span>
            </h2>
          </div>
          <div className="flex flex-col justify-end">
            <p className="text-slate-500 text-xl font-light leading-relaxed max-w-xl">
              Cada nariz es única. Diseñamos un plan quirúrgico personalizado para alcanzar tus objetivos estéticos y funcionales con la mayor precisión.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
          {procedures.map((proc, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.8 }}
              className="group"
            >
              <div className="aspect-[3/4] rounded-[3rem] overflow-hidden mb-10 relative shadow-xl">
                <img 
                  src={proc.img} 
                  alt={proc.title} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-10">
                  <span className="bg-white text-slate-950 px-6 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest">Ver Detalles</span>
                </div>
              </div>
              <h3 className="text-3xl font-serif font-bold text-slate-900 mb-4 group-hover:text-sky-600 transition-colors">{proc.title}</h3>
              <p className="text-slate-500 font-light leading-relaxed">{proc.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default function App() {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-sky-100 selection:text-sky-900">
      <Navbar />
      <Hero />
      <StatsSection />
      <MeetTheDoctor />
      <UltrasonicTechnology />
      <ProceduresCarousel />
      <MensRhinoplasty />
      <Process />
      <Results />
      <SatisfactionIndex />
      <InternationalPatients />
      <Testimonials />
      <StickyFAQSection />
      <BookingForm />
      <MapSection />
      <Footer />
      <StickyMobileCTA />
    </div>
  );
}
