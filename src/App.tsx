import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Phone, Mail, MapPin, Instagram, Facebook,
  Menu, X, Star, Calendar, User, MessageSquare,
  ArrowRight, ChevronDown, Plus, Minus, ChevronRight
} from 'lucide-react';

// ─── Types ───────────────────────────────────────────────────────────────────
interface Procedure { id: string; title: string; tag: string; desc: string; img: string; }
interface Differentiator { id: string; label: string; headline: string; body: string; img: string; }
interface Testimonial { id: string; name: string; procedure: string; text: string; initials: string; }
interface FAQ { q: string; a: string; }

// ─── Data ────────────────────────────────────────────────────────────────────
const PROCEDURES: Procedure[] = [
  { id:'rino', title:'Rinoplastia', tag:'Cirugía Estrella', desc:'Redefinimos la armonía de tu rostro con precisión quirúrgica y resultados completamente naturales. La cirugía más icónica del Dr. Agudelo.', img:'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=800&q=80' },
  { id:'septo', title:'Septoplastia', tag:'Función + Estética', desc:'Corregimos la desviación del tabique para que respires con libertad. Funcionalidad y estética en perfecta sintonía.', img:'https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=800&q=80' },
  { id:'mento', title:'Mentoplastia', tag:'Perfil Perfecto', desc:'El mentón ideal que equilibra y proyecta tu perfil. Una intervención mínima con un impacto visual máximo.', img:'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&q=80' },
  { id:'facial', title:'Cirugía Facial', tag:'Rejuvenecimiento', desc:'Ritidectomía, blefaroplastia y más. Procedimientos adaptados a tu anatomía única para un resultado siempre natural.', img:'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80' },
];

const DIFFERENTIATORS: Differentiator[] = [
  { id:'ultra', label:'Técnica Ultrasónica', headline:'Precisión que el bisturí tradicional no puede alcanzar.', body:'El sistema Piezotome® corta únicamente tejido óseo, preservando vasos y tejidos blandos. Menos inflamación, recuperación más rápida, resultados más predecibles. Una tecnología de vanguardia europea en manos expertas.', img:'https://images.unsplash.com/photo-1530026405186-ed1f139313f3?w=900&q=80' },
  { id:'exp', label:'Experiencia Comprobada', headline:'Más de 500 cirugías avalan cada decisión.', body:'20 años de práctica continua, formación especializada en Europa y certificación board internacional. El Dr. Agudelo es uno de los referentes en cirugía nasal en Colombia, con pacientes de toda Latinoamérica.', img:'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=900&q=80' },
  { id:'nat', label:'Resultados Naturales', headline:'Mejorar sin cambiar quién eres.', body:'Nuestra filosofía: cada cirugía respeta la identidad y proporciones únicas del paciente. Nunca resultados "operados". Cada nariz cuenta una historia —la tuya merece ser perfecta, no artificial.', img:'https://images.unsplash.com/photo-1571772996211-2f02c9727629?w=900&q=80' },
  { id:'acomp', label:'Acompañamiento Total', headline:'Contigo desde el primer día hasta el último control.', body:'Desde la consulta inicial hasta el seguimiento post-operatorio a los 12 meses. Siempre disponibles, siempre atentos. Un proceso transparente donde tú siempre sabes qué esperar en cada etapa.', img:'https://images.unsplash.com/photo-1631815589968-fdb09a223b1e?w=900&q=80' },
];

const TESTIMONIALS: Testimonial[] = [
  { id:'1', name:'Carolina M.', procedure:'Rinoplastia', initials:'CM', text:'Llevaba años sin gustarme mi nariz. El Dr. Agudelo no solo mejoró mi apariencia, mejoró mi confianza. El resultado es tan natural que nadie sabe que me operé.' },
  { id:'2', name:'Andrés R.', procedure:'Septoplastia', initials:'AR', text:'Vine por motivos funcionales pero quedé encantado con el resultado estético también. Profesional, cercano y muy dedicado. El mejor médico que he conocido.' },
  { id:'3', name:'Valentina G.', procedure:'Cirugía Facial', initials:'VG', text:'El mejor equipo. Te explican todo el proceso, resuelven cada duda. Me siento 10 años más joven y totalmente yo misma. ¡Gracias infinitas!' },
  { id:'4', name:'Sebastián C.', procedure:'Rinoplastia', initials:'SC', text:'Consulté con varios médicos. Ninguno me transmitió la confianza del Dr. Agudelo. Mi nariz quedó exactamente como la habíamos planeado juntos.' },
];

const FAQS: FAQ[] = [
  { q:'¿Cuánto tiempo dura la recuperación?', a:'Los primeros 7 a 10 días requerirás reposo relativo y podrás retomar actividades de oficina. La inflamación residual desaparece progresivamente entre 3 y 6 meses, y el resultado definitivo se aprecia entre los 6 y 12 meses post-cirugía.' },
  { q:'¿Duele la cirugía de nariz?', a:'La rinoplastia se realiza bajo anestesia general, por lo que no sentirás nada durante el procedimiento. En el postoperatorio pueden existir molestias leves como sensación de presión o congestión, que se manejan fácilmente con analgésicos orales.' },
  { q:'¿A qué edad se recomienda la rinoplastia?', a:'Se recomienda esperar a que el desarrollo facial esté completo: generalmente 18 años en mujeres y 19-20 años en hombres. No existe un límite de edad superior siempre que el paciente goce de buena salud general.' },
  { q:'¿Cuánto cuesta la rinoplastia en Cali?', a:'El costo varía según la complejidad de cada caso, el tipo de anestesia y la clínica elegida. La consulta de valoración es completamente gratuita y en ella recibirás un presupuesto personalizado y detallado.' },
  { q:'¿Los resultados son permanentes?', a:'Sí. Los cambios realizados en el tejido óseo y cartilaginoso son permanentes. Solo un traumatismo severo podría alterar el resultado a largo plazo. Con el tiempo natural el tejido se asienta y el resultado mejora aún más.' },
];

const WORDS_LINE1 = ['La', 'nariz', 'que'];
const WORDS_LINE2 = ['imaginas,', 'hecha', 'realidad.'];

// ─── Navbar ──────────────────────────────────────────────────────────────────
const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);
  const links = [
    { label: 'El Doctor', href: '#doctor' },
    { label: 'Procedimientos', href: '#procedimientos' },
    { label: 'Resultados', href: '#diferenciadores' },
    { label: 'Contacto', href: '#agendar' },
  ];
  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? 'glass-nav py-3' : 'py-6 bg-transparent'}`}>
      <nav className="max-w-7xl mx-auto px-6 flex items-center justify-between" aria-label="Navegación principal">
        <a href="#inicio" className="font-serif text-white font-bold text-xl tracking-tight">
          Dr. Agudelo<span className="text-sky-500">.</span>
        </a>
        <ul className="hidden md:flex items-center gap-8">
          {links.map(l => (
            <li key={l.href}>
              <a href={l.href} className="text-white/70 hover:text-white text-sm font-medium transition-colors duration-200 tracking-wide">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="hidden md:flex items-center gap-4">
          <a href="tel:+5726001234" className="flex items-center gap-2 text-white/60 hover:text-white text-sm transition-colors">
            <Phone className="w-4 h-4" /><span>+57 (2) 600-1234</span>
          </a>
          <a href="#agendar" className="btn-primary text-xs px-5 py-2.5">Agendar Cita</a>
        </div>
        <button onClick={() => setOpen(!open)} className="md:hidden text-white p-2">
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-slate-950/98 border-t border-white/10"
          >
            <div className="px-6 py-6 flex flex-col gap-5">
              {links.map(l => (
                <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="text-white/80 text-base font-medium">{l.label}</a>
              ))}
              <a href="#agendar" onClick={() => setOpen(false)} className="btn-primary text-center mt-2">Agendar Cita</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

// ─── Hero Section ────────────────────────────────────────────────────────────
const HeroSection = () => {
  const ease = [0.22, 1, 0.36, 1] as const;
  return (
    <section id="inicio" className="relative min-h-screen bg-slate-950 flex flex-col justify-end overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=1600&q=80"
          alt="Clínica del Dr. Víctor Agudelo"
          className="w-full h-full object-cover object-center zoom-out-reveal"
          fetchPriority="high"
        />
        <div className="hero-gradient absolute inset-0" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pb-24 pt-48 w-full">
        {/* Tag */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: ease }}
          className="flex items-center gap-3 mb-8"
        >
          <div className="w-8 h-px bg-sky-500" />
          <span className="text-sky-400 text-xs font-semibold tracking-[0.2em] uppercase">Especialista en Cirugía Nasal · Cali, Colombia</span>
        </motion.div>

        {/* H1 word-by-word reveal */}
        <h1 className="font-serif text-5xl sm:text-7xl lg:text-[88px] leading-[1.0] text-white mb-6 max-w-4xl">
          <span className="block">
            {WORDS_LINE1.map((word, i) => (
              <span key={i} className="word-mask">
                <motion.span
                  className="inline-block"
                  initial={{ yPercent: 110 }}
                  animate={{ yPercent: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 + i * 0.07, ease: ease }}
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </span>
          <span className="block mt-1">
            {WORDS_LINE2.map((word, i) => (
              <span key={i} className="word-mask">
                <motion.span
                  className="inline-block"
                  initial={{ yPercent: 110 }}
                  animate={{ yPercent: 0 }}
                  transition={{ duration: 0.8, delay: 0.52 + i * 0.07, ease: ease }}
                >
                  {i === 1 ? <em className="not-italic text-sky-400">{word}</em> : word}
                </motion.span>
              </span>
            ))}
          </span>
        </h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, filter: 'blur(8px)', y: 10 }}
          animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
          transition={{ duration: 1.0, delay: 0.9, ease: ease }}
          className="text-white/60 text-lg max-w-xl leading-relaxed mb-10"
        >
          Más de 20 años de experiencia y tecnología Piezotome® para resultados naturales que transforman vidas.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.1, ease: ease }}
          className="flex flex-wrap gap-4"
        >
          <a href="#agendar" className="btn-primary text-sm">
            <Calendar className="w-4 h-4" />
            Agendar Cita
          </a>
          <a href="#procedimientos" className="btn-outline text-sm">
            Ver Procedimientos
            <ChevronRight className="w-4 h-4" />
          </a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.8 }}
          className="absolute bottom-8 right-8 flex flex-col items-center gap-2 text-white/30"
        >
          <span className="text-[10px] tracking-[0.15em] uppercase rotate-90 origin-center translate-x-2">Scroll</span>
          <div className="w-px h-12 bg-white/20 relative overflow-hidden">
            <motion.div
              className="absolute inset-x-0 top-0 h-1/2 bg-white/60"
              animate={{ y: ['0%', '200%'] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// ─── Stats Bar ───────────────────────────────────────────────────────────────
const useCountUp = (end: number, duration = 1800) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      obs.disconnect();
      const start = performance.now();
      const step = (t: number) => {
        const p = Math.min((t - start) / duration, 1);
        const ease = 1 - Math.pow(1 - p, 3);
        setCount(Math.round(ease * end));
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }, { threshold: 0.5 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [end, duration]);
  return { count, ref };
};

const StatItem = ({ prefix = '', num, suffix = '', label }: { prefix?: string; num: number; suffix?: string; label: string }) => {
  const { count, ref } = useCountUp(num);
  return (
    <div ref={ref} className="flex flex-col items-center gap-1 px-8 py-6 border-r border-white/10 last:border-r-0">
      <span className="font-serif text-4xl font-bold text-white">
        {prefix}{count}{suffix}
      </span>
      <span className="text-white/50 text-xs tracking-widest uppercase">{label}</span>
    </div>
  );
};

const StatsBar = () => (
  <div className="stats-bar-gradient">
    <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
      <StatItem num={500} suffix="+" label="Pacientes Transformados" />
      <StatItem num={20} suffix="+ Años" label="Experiencia Clínica" />
      <StatItem num={2} label="Clínicas Especializadas" />
      <StatItem prefix="Top " num={5} label="Colombia · Cirugía Nasal" />
    </div>
  </div>
);

// ─── Procedures Section ──────────────────────────────────────────────────────
const ProceduresSection = () => {
  const [active, setActive] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollStart = useRef(0);

  const onMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    startX.current = e.pageX - (trackRef.current?.offsetLeft ?? 0);
    scrollStart.current = trackRef.current?.scrollLeft ?? 0;
    trackRef.current!.style.cursor = 'grabbing';
  };
  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !trackRef.current) return;
    e.preventDefault();
    const x = e.pageX - trackRef.current.offsetLeft;
    trackRef.current.scrollLeft = scrollStart.current - (x - startX.current);
  };
  const onMouseUp = () => {
    isDragging.current = false;
    if (trackRef.current) trackRef.current.style.cursor = 'grab';
  };

  return (
    <section id="procedimientos" className="bg-slate-950 py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-14">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-sky-500 text-xs font-semibold tracking-[0.2em] uppercase mb-3">Procedimientos</p>
            <h2 className="font-serif text-4xl md:text-5xl text-white">Nuestra especialidad,<br /><em className="not-italic text-white/50">tu transformación.</em></h2>
          </div>
          <p className="hidden md:block text-white/40 text-sm max-w-xs text-right">Arrastra para explorar todos los procedimientos disponibles.</p>
        </div>
      </div>

      <div
        ref={trackRef}
        className="flex gap-5 px-6 md:px-[calc((100vw-80rem)/2+1.5rem)] overflow-x-auto no-scrollbar cursor-grab select-none pb-4"
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
      >
        {PROCEDURES.map((proc, i) => (
          <div
            key={proc.id}
            onClick={() => setActive(i)}
            className={`relative flex-shrink-0 w-72 md:w-80 rounded-2xl overflow-hidden transition-all duration-500 cursor-pointer card-glow
              ${active === i ? 'ring-1 ring-sky-500/40' : 'opacity-60 hover:opacity-80'}`}
            style={{ height: 440 }}
          >
            <img src={proc.img} alt={proc.title} className="w-full h-full object-cover" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6">
              <span className="inline-block text-sky-400 text-[10px] font-semibold tracking-[0.2em] uppercase mb-2">{proc.tag}</span>
              <h3 className="font-serif text-2xl text-white mb-3">{proc.title}</h3>
              <AnimatePresence>
                {active === i && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.4 }}
                    className="text-white/60 text-sm leading-relaxed"
                  >
                    {proc.desc}
                  </motion.p>
                )}
              </AnimatePresence>
              {active === i && (
                <a href="#agendar" className="inline-flex items-center gap-2 mt-4 text-sky-400 text-xs font-semibold hover:text-sky-300 transition-colors">
                  Consultar <ArrowRight className="w-3 h-3" />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

// ─── Sticky Narrative (GSAP) ─────────────────────────────────────────────────
const BLOCKS = [
  { label: '01', text: 'Cada nariz cuenta una historia. La tuya merece ser perfecta.' },
  { label: '02', text: 'Con técnica ultrasónica Piezotome®, precisión milimétrica sin dolor.' },
  { label: '03', text: '20 años transformando vidas. El tuyo podría ser el próximo.' },
];

const StickyNarrativeSection = () => {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const blockRefs = [useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null)];
  const counterRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let ctx: any;
    Promise.all([
      import('gsap').then((m: any) => m.default ?? m.gsap ?? m),
      import('gsap/ScrollTrigger').then((m: any) => m.ScrollTrigger),
      import('split-type').then((m: any) => m.default ?? m),
    ]).then(([gsap, ScrollTrigger, SplitType]: any[]) => {
      gsap.registerPlugin(ScrollTrigger);
      ctx = gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: outerRef.current,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 1.2,
            pin: innerRef.current,
            anticipatePin: 1,
          },
        });

        BLOCKS.forEach((_, idx) => {
          const el = blockRefs[idx].current?.querySelector('[data-split]');
          if (!el) return;
          const s = new SplitType(el, { types: 'lines' });
          const lines = s.lines ?? [];
          const inAt = idx * 2.2;
          const outAt = inAt + 1.8;
          gsap.set(lines, { opacity: 0, yPercent: 60, rotateX: 15, filter: 'blur(20px)', z: -300 });
          tl.to(lines, { opacity: 1, yPercent: 0, rotateX: 0, filter: 'blur(0px)', z: 0, duration: 1.5, stagger: 0.08, ease: 'power3.out' }, inAt);
          if (idx < BLOCKS.length - 1) {
            tl.to(lines, { opacity: 0, yPercent: -30, duration: 0.8, stagger: 0.05 }, outAt);
          }
          // counter
          tl.to(counterRef.current, { innerText: String(idx + 1), duration: 0.01 }, inAt + 0.5);
        });
      }, outerRef);
    }).catch(() => {});
    return () => ctx?.revert();
  }, []);

  return (
    <div ref={outerRef} className="narrative-section relative" style={{ height: '450vh' }}>
      <div ref={innerRef} className="sticky top-0 h-screen flex items-center justify-center overflow-hidden perspective-deep">
        {/* BG accent */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(2,132,199,0.06),transparent)]" />

        {/* Block indicators */}
        <div className="absolute left-8 top-1/2 -translate-y-1/2 flex flex-col gap-3">
          {BLOCKS.map((b, i) => (
            <div key={i} className="flex flex-col items-center gap-1">
              <div className="w-px h-8 bg-white/10" />
              <span className="text-white/20 text-[10px] font-mono">{b.label}</span>
            </div>
          ))}
        </div>

        {/* Counter */}
        <div className="absolute top-12 right-12 text-white/10 font-mono text-6xl font-bold select-none">
          <span ref={counterRef}>1</span>
          <span className="text-2xl ml-1">/ 3</span>
        </div>

        {/* Text blocks */}
        <div className="relative w-full max-w-5xl mx-auto px-12 transform-style-3d">
          {BLOCKS.map((block, i) => (
            <div key={i} ref={blockRefs[i]} className={`${i === 0 ? 'relative' : 'absolute inset-0 flex items-center px-12'}`}>
              <div>
                <p className="text-sky-500/50 text-xs font-mono tracking-[0.3em] mb-6 uppercase">{block.label} / {BLOCKS.length.toString().padStart(2,'0')}</p>
                <p
                  data-split
                  className="font-serif text-4xl md:text-6xl lg:text-7xl text-white leading-[1.1] max-w-3xl"
                >
                  {block.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ─── Differentiators ─────────────────────────────────────────────────────────
const DifferentiatorsSection = () => {
  const [active, setActive] = useState(0);
  const diff = DIFFERENTIATORS[active];
  return (
    <section id="diferenciadores" className="bg-white py-28">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16">
          <p className="text-sky-600 text-xs font-semibold tracking-[0.2em] uppercase mb-3">¿Por qué el Dr. Agudelo?</p>
          <h2 className="font-serif text-4xl md:text-5xl text-slate-900 max-w-2xl">Cuatro razones que<br />hacen la diferencia.</h2>
        </div>

        <div className="grid md:grid-cols-[1fr,1.4fr] gap-12 items-start">
          {/* Tab list */}
          <div className="flex flex-col gap-2">
            {DIFFERENTIATORS.map((d, i) => (
              <button
                key={d.id}
                onClick={() => setActive(i)}
                className={`group text-left px-6 py-5 rounded-xl border transition-all duration-300 ${
                  active === i
                    ? 'bg-slate-950 border-slate-950 text-white'
                    : 'bg-transparent border-slate-200 text-slate-600 hover:border-slate-400'
                }`}
              >
                <span className={`text-xs font-mono mr-3 ${active === i ? 'text-sky-400' : 'text-slate-400'}`}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="font-medium text-sm">{d.label}</span>
              </button>
            ))}
          </div>

          {/* Content panel */}
          <div className="relative overflow-hidden rounded-2xl bg-slate-950 aspect-[4/3]">
            <AnimatePresence mode="wait">
              <motion.img
                key={diff.id + '-img'}
                src={diff.img}
                alt={diff.label}
                className="absolute inset-0 w-full h-full object-cover"
                initial={{ opacity: 0, scale: 1.04, filter: 'blur(12px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, scale: 0.97, filter: 'blur(8px)' }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              />
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />
            <AnimatePresence mode="wait">
              <motion.div
                key={diff.id + '-text'}
                className="absolute inset-x-0 bottom-0 p-8"
                initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -10, filter: 'blur(6px)' }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <h3 className="font-serif text-xl md:text-2xl text-white mb-3">{diff.headline}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{diff.body}</p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

// ─── Testimonials ─────────────────────────────────────────────────────────────
const TestimonialsSection = () => {
  const [idx, setIdx] = useState(0);
  const t = TESTIMONIALS[idx];
  const [progress, setProgress] = useState(0);
  const DURATION = 5000;
  useEffect(() => {
    setProgress(0);
    const start = performance.now();
    let raf: number;
    const step = (now: number) => {
      const p = Math.min((now - start) / DURATION, 1);
      setProgress(p);
      if (p < 1) { raf = requestAnimationFrame(step); }
      else { setIdx(i => (i + 1) % TESTIMONIALS.length); }
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [idx]);

  return (
    <section className="bg-slate-50 py-28">
      <div className="max-w-5xl mx-auto px-6">
        <div className="mb-16 text-center">
          <p className="text-sky-600 text-xs font-semibold tracking-[0.2em] uppercase mb-3">Testimonios</p>
          <h2 className="font-serif text-4xl md:text-5xl text-slate-900">Lo que dicen nuestros<br />pacientes.</h2>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -10, filter: 'blur(6px)' }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="bg-white rounded-3xl p-10 md:p-14 shadow-sm"
          >
            <div className="flex gap-1 mb-8">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />)}
            </div>
            <blockquote className="font-serif text-2xl md:text-3xl text-slate-800 leading-relaxed mb-8">
              "{t.text}"
            </blockquote>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-sky-600 flex items-center justify-center text-white font-bold text-sm">
                {t.initials}
              </div>
              <div>
                <p className="font-semibold text-slate-900">{t.name}</p>
                <p className="text-slate-500 text-sm">{t.procedure}</p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Progress + Nav */}
        <div className="flex items-center gap-6 mt-8">
          {TESTIMONIALS.map((test, i) => (
            <button key={test.id} onClick={() => setIdx(i)} className="relative flex-1 h-0.5 bg-slate-200 rounded-full overflow-hidden">
              {i === idx && (
                <div
                  className="absolute inset-y-0 left-0 bg-sky-600 rounded-full"
                  style={{ width: `${progress * 100}%` }}
                />
              )}
              {i < idx && <div className="absolute inset-0 bg-sky-600" />}
            </button>
          ))}
          <span className="text-slate-400 text-sm tabular-nums whitespace-nowrap">
            {String(idx + 1).padStart(2,'0')} / {String(TESTIMONIALS.length).padStart(2,'0')}
          </span>
        </div>
      </div>
    </section>
  );
};

// ─── FAQ Section ─────────────────────────────────────────────────────────────
const FAQSection = () => {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="bg-white py-28">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-[1fr,1.8fr] gap-16 items-start">
        <div className="md:sticky md:top-28">
          <p className="text-sky-600 text-xs font-semibold tracking-[0.2em] uppercase mb-4">Preguntas Frecuentes</p>
          <h2 className="font-serif text-4xl text-slate-900 mb-6">Todo lo que necesitas saber antes de decidir.</h2>
          <p className="text-slate-500 text-sm leading-relaxed mb-8">¿Tienes más preguntas? Agenda tu consulta de valoración gratuita y te orientamos personalmente.</p>
          <a href="#agendar" className="inline-flex items-center gap-2 bg-sky-600 text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-sky-500 transition-colors">
            Consulta Gratuita <ArrowRight className="w-4 h-4" />
          </a>
        </div>
        <div className="flex flex-col divide-y divide-slate-100">
          {FAQS.map((faq, i) => (
            <div key={i} className="py-6">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-start justify-between gap-4 text-left group"
              >
                <span className={`font-medium text-base transition-colors ${open === i ? 'text-sky-600' : 'text-slate-900 group-hover:text-sky-600'}`}>
                  {faq.q}
                </span>
                <span className="flex-shrink-0 mt-0.5">
                  {open === i ? <Minus className="w-5 h-5 text-sky-600" /> : <Plus className="w-5 h-5 text-slate-400" />}
                </span>
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="pt-4 text-slate-500 text-sm leading-relaxed">{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ─── Booking Section ─────────────────────────────────────────────────────────
const BookingSection = () => {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ name:'', phone:'', email:'', date:'', procedure:'', message:'' });
  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }));
  const inputCls = 'w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/30 focus:outline-none focus:border-sky-500/60 transition-colors';
  return (
    <section id="agendar" className="bg-slate-950 py-28">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-14">
          <p className="text-sky-500 text-xs font-semibold tracking-[0.2em] uppercase mb-3">Agenda Tu Consulta</p>
          <h2 className="font-serif text-4xl md:text-5xl text-white mb-4">El primer paso hacia<br /><em className="not-italic text-sky-400">tu transformación.</em></h2>
          <p className="text-white/50 text-sm">Consulta de valoración completamente gratuita.</p>
        </div>

        {/* Step indicator */}
        <div className="flex items-center justify-center gap-4 mb-10">
          {[1,2].map(s => (
            <div key={s} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${step >= s ? 'bg-sky-600 text-white' : 'bg-white/10 text-white/40'}`}>{s}</div>
              <span className={`text-xs ${step >= s ? 'text-white/70' : 'text-white/30'}`}>{s === 1 ? 'Datos personales' : 'Detalles de consulta'}</span>
              {s < 2 && <div className={`w-12 h-px ${step >= 2 ? 'bg-sky-600' : 'bg-white/10'}`} />}
            </div>
          ))}
        </div>

        <div className="bg-slate-900/60 rounded-3xl p-8 border border-white/10">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div key="step1" initial={{ opacity:0, x:-20 }} animate={{ opacity:1, x:0 }} exit={{ opacity:0, x:20 }} className="grid gap-5">
                <div>
                  <label className="block text-white/50 text-xs uppercase tracking-wider mb-2">Nombre completo</label>
                  <input type="text" placeholder="Ej. Ana García" value={form.name} onChange={set('name')} className={inputCls} />
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-white/50 text-xs uppercase tracking-wider mb-2">Teléfono / WhatsApp</label>
                    <input type="tel" placeholder="+57 300 000 0000" value={form.phone} onChange={set('phone')} className={inputCls} />
                  </div>
                  <div>
                    <label className="block text-white/50 text-xs uppercase tracking-wider mb-2">Correo electrónico</label>
                    <input type="email" placeholder="ana@correo.com" value={form.email} onChange={set('email')} className={inputCls} />
                  </div>
                </div>
                <button onClick={() => form.name && form.phone && form.email && setStep(2)} className="btn-primary w-full justify-center mt-2">
                  Continuar <ArrowRight className="w-4 h-4" />
                </button>
              </motion.div>
            )}
            {step === 2 && (
              <motion.div key="step2" initial={{ opacity:0, x:20 }} animate={{ opacity:1, x:0 }} exit={{ opacity:0, x:-20 }} className="grid gap-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-white/50 text-xs uppercase tracking-wider mb-2">Fecha preferida</label>
                    <input type="date" value={form.date} onChange={set('date')} className={inputCls} />
                  </div>
                  <div>
                    <label className="block text-white/50 text-xs uppercase tracking-wider mb-2">Procedimiento de interés</label>
                    <select value={form.procedure} onChange={set('procedure')} className={inputCls}>
                      <option value="" className="bg-slate-900">Selecciona uno</option>
                      {PROCEDURES.map(p => <option key={p.id} value={p.id} className="bg-slate-900">{p.title}</option>)}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-white/50 text-xs uppercase tracking-wider mb-2">Mensaje (opcional)</label>
                  <textarea rows={3} placeholder="Cuéntanos brevemente tu caso..." value={form.message} onChange={set('message')} className={`${inputCls} resize-none`} />
                </div>
                <div className="flex gap-3">
                  <button onClick={() => setStep(1)} className="btn-outline flex-1 justify-center">← Volver</button>
                  <button className="btn-primary flex-[2] justify-center">
                    <Calendar className="w-4 h-4" /> Confirmar Consulta
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

// ─── CTA Section ─────────────────────────────────────────────────────────────
const CTASection = () => (
  <section className="relative bg-slate-950 py-40 overflow-hidden">
    <div className="absolute inset-0">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,rgba(2,132,199,0.12),transparent)]" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-sky-500/30 to-transparent" />
    </div>
    <div className="relative max-w-4xl mx-auto px-6 text-center">
      <p className="text-sky-500 text-xs font-semibold tracking-[0.2em] uppercase mb-6">¿Listo para dar el paso?</p>
      <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl text-white mb-8 leading-tight">
        Tu nueva vida<br /><em className="not-italic gradient-text">empieza hoy.</em>
      </h2>
      <p className="text-white/50 text-lg mb-12 max-w-xl mx-auto leading-relaxed">
        Agenda tu consulta de valoración gratuita y descubre el potencial de tu transformación con el especialista que más confía Colombia.
      </p>
      <a href="#agendar" className="btn-primary text-base px-10 py-5">
        <Calendar className="w-5 h-5" />
        Agendar Consulta Gratuita
      </a>
    </div>
  </section>
);

// ─── Map Section ──────────────────────────────────────────────────────────────
const MapSection = () => (
  <section className="bg-slate-950 pb-0">
    <div className="max-w-7xl mx-auto px-6 pb-16">
      <div className="grid md:grid-cols-3 gap-8 border border-white/10 rounded-2xl p-8">
        <div className="flex gap-4">
          <div className="w-10 h-10 rounded-full bg-sky-600/20 flex items-center justify-center flex-shrink-0">
            <MapPin className="w-5 h-5 text-sky-500" />
          </div>
          <div>
            <p className="text-white font-medium mb-1">Clínica Principal</p>
            <p className="text-white/50 text-sm">Cl. 5 #38-05, Cali, Colombia</p>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="w-10 h-10 rounded-full bg-sky-600/20 flex items-center justify-center flex-shrink-0">
            <Phone className="w-5 h-5 text-sky-500" />
          </div>
          <div>
            <p className="text-white font-medium mb-1">Teléfono</p>
            <a href="tel:+5726001234" className="text-white/50 text-sm hover:text-sky-400 transition-colors">+57 (2) 600-1234</a>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="w-10 h-10 rounded-full bg-sky-600/20 flex items-center justify-center flex-shrink-0">
            <Mail className="w-5 h-5 text-sky-500" />
          </div>
          <div>
            <p className="text-white font-medium mb-1">Email</p>
            <a href="mailto:contacto@drvictoragudelo.com" className="text-white/50 text-sm hover:text-sky-400 transition-colors">contacto@drvictoragudelo.com</a>
          </div>
        </div>
      </div>
    </div>
  </section>
);

// ─── Footer ───────────────────────────────────────────────────────────────────
const Footer = () => (
  <footer className="bg-slate-950 border-t border-white/[0.06]">
    <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-3 gap-12">
      <div>
        <a href="#inicio" className="font-serif text-white font-bold text-xl tracking-tight mb-4 block">
          Dr. Agudelo<span className="text-sky-500">.</span>
        </a>
        <p className="text-white/40 text-sm leading-relaxed max-w-xs">
          Especialista en Rinoplastia y Cirugía Facial. Más de 20 años transformando vidas en Cali, Colombia.
        </p>
        <div className="flex gap-4 mt-6">
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white/30 hover:text-sky-400 transition-colors" aria-label="Instagram">
            <Instagram className="w-5 h-5" />
          </a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white/30 hover:text-sky-400 transition-colors" aria-label="Facebook">
            <Facebook className="w-5 h-5" />
          </a>
        </div>
      </div>
      <div>
        <p className="text-white/60 text-xs font-semibold uppercase tracking-widest mb-5">Procedimientos</p>
        <ul className="flex flex-col gap-3">
          {PROCEDURES.map(p => (
            <li key={p.id}>
              <a href="#procedimientos" className="text-white/40 text-sm hover:text-white/70 transition-colors">{p.title}</a>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <p className="text-white/60 text-xs font-semibold uppercase tracking-widest mb-5">Contacto</p>
        <ul className="flex flex-col gap-3 text-white/40 text-sm">
          <li className="flex gap-2"><MapPin className="w-4 h-4 text-sky-600 flex-shrink-0 mt-0.5" /> Cl. 5 #38-05, Cali, Colombia</li>
          <li className="flex gap-2"><Phone className="w-4 h-4 text-sky-600 flex-shrink-0" /> +57 (2) 600-1234</li>
          <li className="flex gap-2"><Mail className="w-4 h-4 text-sky-600 flex-shrink-0" /> contacto@drvictoragudelo.com</li>
        </ul>
      </div>
    </div>
    <div className="border-t border-white/[0.06] py-6">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-3">
        <p className="text-white/25 text-xs">© 2026 Dr. Víctor Manuel Agudelo. Todos los derechos reservados.</p>
        <p className="text-white/20 text-xs">Médico Cirujano · Registro RETHUS verificado</p>
      </div>
    </div>
  </footer>
);

// ─── Floating Buttons ─────────────────────────────────────────────────────────
const WhatsAppButton = () => (
  <a
    href="https://wa.me/573000000000?text=Hola%2C+me+gustar%C3%ADa+agendar+una+consulta+con+el+Dr.+Agudelo."
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Contactar por WhatsApp"
    className="hidden md:flex fixed bottom-8 right-8 z-50 items-center justify-center w-14 h-14 rounded-full bg-[#25D366] shadow-lg hover:scale-110 transition-transform duration-200"
  >
    <MessageSquare className="w-6 h-6 text-white" />
  </a>
);

const StickyMobileCTA = () => (
  <div className="md:hidden fixed bottom-0 inset-x-0 z-50 p-4 bg-slate-950/95 backdrop-blur-xl border-t border-white/10">
    <a href="#agendar" className="btn-primary w-full justify-center text-sm">
      <Calendar className="w-4 h-4" /> Agendar Consulta Gratuita
    </a>
  </div>
);

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  // Lenis smooth scroll + GSAP ScrollTrigger sync
  useEffect(() => {
    let lenis: any;
    Promise.all([
      import('lenis').then((m: any) => m.default ?? m),
      import('gsap/ScrollTrigger').then((m: any) => m.ScrollTrigger),
    ]).then(([Lenis, ScrollTrigger]: any[]) => {
      lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      });
      lenis.on('scroll', ScrollTrigger.update);
      const raf = (time: number) => { lenis.raf(time); requestAnimationFrame(raf); };
      requestAnimationFrame(raf);
    }).catch(() => {});
    return () => { lenis?.destroy(); };
  }, []);

  return (
    <div className="min-h-screen bg-slate-950">
      <Navbar />
      <main>
        <HeroSection />
        <StatsBar />
        <ProceduresSection />
        <StickyNarrativeSection />
        <DifferentiatorsSection />
        <TestimonialsSection />
        <FAQSection />
        <BookingSection />
        <CTASection />
        <MapSection />
      </main>
      <Footer />
      <WhatsAppButton />
      <StickyMobileCTA />
    </div>
  );
}
