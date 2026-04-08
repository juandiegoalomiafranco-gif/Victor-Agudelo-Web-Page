import React, { useState, useEffect, useLayoutEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import {
  Phone, Mail, MapPin, Instagram, Facebook,
  Menu, X, Star, Calendar, MessageSquare, ArrowRight,
  ChevronLeft, ChevronRight, VolumeX, Play,
} from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import { HeroScrollText }  from './components/HeroScrollText'
import { ProceduresSlider } from './components/ProceduresSlider'
import { FaqAccordion }    from './components/FaqAccordion'

gsap.registerPlugin(ScrollTrigger)

// ─── Types ───────────────────────────────────────────────────────────────────
interface Procedure { id: string; title: string; tag: string; desc: string; img: string }
interface Differentiator { id: string; label: string; headline: string; body: string; img: string }
interface Testimonial { id: string; name: string; procedure: string; text: string; initials: string }

// ─── Data ────────────────────────────────────────────────────────────────────
const PROCEDURES: Procedure[] = [
  { id: 'rino',   title: 'Rinoplastia',           tag: 'Cirugía Estrella', desc: 'Redefinimos la armonía de tu rostro con precisión quirúrgica y resultados completamente naturales.', img: '' },
  { id: 'lipo',   title: 'Liposucción',            tag: 'Contorno Corporal', desc: 'Esculpimos el contorno corporal eliminando grasa localizada, con resultados duraderos.', img: '' },
  { id: 'mamo',   title: 'Mamoplastia de Aumento', tag: 'Feminidad & Simetría', desc: 'Implantes de alta calidad adaptados a tu anatomía y deseos personales.', img: '' },
  { id: 'facial', title: 'Cirugía Facial',         tag: 'Rejuvenecimiento', desc: 'Ritidectomía, blefaroplastia y más. Procedimientos adaptados a tu anatomía única.', img: '' },
]

const DIFFERENTIATORS: Differentiator[] = [
  { id: 'ultra', label: 'Técnica Ultrasónica Piezotome®', headline: 'Precisión que el bisturí tradicional no puede alcanzar.',        body: 'El sistema Piezotome® corta únicamente tejido óseo, preservando vasos y tejidos blandos. Menos inflamación, recuperación más rápida, resultados más predecibles.',    img: 'https://images.unsplash.com/photo-1530026405186-ed1f139313f3?w=900&q=80' },
  { id: 'exp',   label: 'Experiencia Comprobada', headline: 'Más de 500 cirugías avalan cada decisión.',                        body: '20 años de práctica continua, formación especializada en Europa y certificación board internacional. El Dr. Agudelo es referente en cirugía plástica en Colombia.',       img: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=900&q=80' },
  { id: 'nat',   label: 'Resultados Naturales',   headline: 'Mejorar sin cambiar quién eres.',                                  body: 'Nuestra filosofía: cada cirugía respeta la identidad y proporciones únicas del paciente. Nunca resultados "operados". Cada caso es único — el tuyo merece serlo.', img: 'https://images.unsplash.com/photo-1571772996211-2f02c9727629?w=900&q=80' },
  { id: 'acomp', label: 'Acompañamiento Total',   headline: 'Contigo desde el primer día hasta el último control.',             body: 'Desde la consulta inicial hasta el seguimiento post-operatorio a los 12 meses. Siempre disponibles, siempre atentos. Un proceso transparente en cada etapa.',        img: 'https://images.unsplash.com/photo-1631815589968-fdb09a223b1e?w=900&q=80' },
]

const TESTIMONIALS: Testimonial[] = [
  { id: '1', name: 'Carolina M.', procedure: 'Rinoplastia',   initials: 'CM', text: 'Llevaba años sin gustarme mi nariz. El Dr. Agudelo no solo mejoró mi apariencia, mejoró mi confianza. El resultado es tan natural que nadie sabe que me operé.' },
  { id: '2', name: 'Andrés R.',   procedure: 'Liposucción',   initials: 'AR', text: 'Vine por motivos funcionales pero quedé encantado con el resultado estético también. Profesional, cercano y muy dedicado. El mejor médico que he conocido.' },
  { id: '3', name: 'Valentina G.', procedure: 'Cirugía Facial', initials: 'VG', text: 'El mejor equipo. Te explican todo el proceso, resuelven cada duda. Me siento 10 años más joven y totalmente yo misma. ¡Gracias infinitas!' },
  { id: '4', name: 'Sebastián C.', procedure: 'Rinoplastia',  initials: 'SC', text: 'Consulté con varios médicos. Ninguno me transmitió la confianza del Dr. Agudelo. Mi nariz quedó exactamente como la habíamos planeado juntos.' },
]

// ─── Navbar ──────────────────────────────────────────────────────────────────
const Navbar = () => {
  const [open, setOpen]       = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const links = [
    { label: 'SERVICIOS',    href: '#procedimientos' },
    { label: 'LA CLÍNICA',   href: '#diferenciadores' },
    { label: 'TESTIMONIOS',  href: '#testimonios' },
  ]

  return (
    <>
      <header
        className="fixed inset-x-0 top-0 z-50"
        style={{ padding: '1rem 0' }}
      >
        <div
          className="max-w-5xl mx-auto px-4"
          style={{
            opacity: scrolled ? 1 : 0,
            transform: scrolled ? 'translateY(0)' : 'translateY(-8px)',
            transition: 'opacity 0.4s ease, transform 0.4s ease',
            pointerEvents: scrolled ? 'auto' : 'none',
          }}
        >
          <nav
            style={{
              background: 'rgba(255,255,255,0.95)',
              backdropFilter: 'blur(16px)',
              border: '1px solid rgba(0,0,0,0.08)',
              borderRadius: '100px',
              padding: '0.5rem 0.5rem 0.5rem 1.25rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              boxShadow: '0 2px 20px rgba(0,0,0,0.06)',
            }}
          >
            {/* Logo */}
            <a
              href="#inicio"
              style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
            >
              <div
                style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  background: '#242424',
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                }}
              >
                A
              </div>
              <span style={{ color: '#1e293b', fontWeight: 600, fontSize: '0.95rem', letterSpacing: '-0.01em' }}>
                Dr. Agudelo
              </span>
            </a>

            {/* Desktop links */}
            <ul className="hidden md:flex items-center" style={{ gap: '2rem' }}>
              {links.map(l => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    style={{
                      textDecoration: 'none',
                      fontSize: '0.8rem',
                      fontWeight: 500,
                      letterSpacing: '0.08em',
                      color: '#475569',
                      transition: 'color 0.2s ease',
                    }}
                    onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = '#0f172a' }}
                    onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = '#475569' }}
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <a
              href="#agendar"
              className="hidden md:flex items-center gap-2"
              style={{
                textDecoration: 'none',
                background: '#2d5016',
                color: '#fff',
                borderRadius: '100px',
                padding: '0.6rem 1.25rem',
                fontSize: '0.8rem',
                fontWeight: 600,
                letterSpacing: '0.04em',
                transition: 'background 0.2s ease',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = '#1f3a0e' }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = '#2d5016' }}
            >
              <Calendar className="w-3.5 h-3.5" />
              PEDIR CITA
            </a>

            {/* Mobile hamburger */}
            <button
              onClick={() => setOpen(!open)}
              className="md:hidden p-2"
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#242424' }}
              aria-label="Menú"
            >
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </nav>
        </div>

        {/* Transparent navbar for hero */}
        <div
          className="max-w-7xl mx-auto px-6"
          style={{
            position: 'absolute',
            inset: '1rem 0 auto 0',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            opacity: scrolled ? 0 : 1,
            pointerEvents: scrolled ? 'none' : 'auto',
            transition: 'opacity 0.4s ease',
          }}
        >
          <a href="#inicio" style={{ textDecoration: 'none', color: '#fff', fontWeight: 700, fontSize: '1.1rem', letterSpacing: '-0.02em' }}>
            Dr. Agudelo
          </a>
          <ul className="hidden md:flex items-center gap-7">
            {links.map(l => (
              <li key={l.href}>
                <a href={l.href} style={{ textDecoration: 'none', fontSize: '0.8rem', fontWeight: 500, letterSpacing: '0.08em', color: 'rgba(255,255,255,0.8)', transition: 'color 0.2s ease' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = '#fff' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.8)' }}
                >{l.label}</a>
              </li>
            ))}
          </ul>
          <a
            href="#agendar"
            className="hidden md:inline-flex items-center gap-2"
            style={{
              textDecoration: 'none',
              background: 'rgba(255,255,255,0.12)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255,255,255,0.2)',
              color: '#fff',
              borderRadius: '100px',
              padding: '0.6rem 1.25rem',
              fontSize: '0.8rem',
              fontWeight: 500,
              letterSpacing: '0.04em',
            }}
          >
            <Calendar className="w-3.5 h-3.5" />
            PEDIR CITA
          </a>
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2"
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#fff' }}
            aria-label="Menú"
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 flex flex-col"
            style={{ background: 'var(--color-1)' }}
          >
            <div className="flex-1 flex flex-col px-8 pt-28 pb-12 overflow-y-auto">
              <nav className="flex flex-col gap-6 mb-auto">
                {[
                  { label: 'Servicios', href: '#procedimientos' },
                  { label: 'La Clínica', href: '#diferenciadores' },
                  { label: 'Testimonios', href: '#testimonios' },
                  { label: 'Contacto', href: '#agendar' },
                ].map(l => (
                  <a key={l.href} href={l.href} onClick={() => setOpen(false)}
                    style={{ color: 'var(--color-4)', fontWeight: 700, fontSize: '1.75rem', letterSpacing: '-0.02em', textDecoration: 'none' }}
                  >{l.label}</a>
                ))}
              </nav>
              <a href="#agendar" onClick={() => setOpen(false)}
                className="mt-8 flex items-center justify-center gap-2 text-sm"
                style={{ background: '#2d5016', color: '#fff', fontWeight: 600, borderRadius: '100px', padding: '1rem', textDecoration: 'none' }}
              >
                <Calendar className="w-4 h-4" /> PEDIR CITA
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

// ─── Data de bloques narrativos ──────────────────────────────────────────────
const BLOCKS = [
  {
    label: '01',
    text: 'Cada nariz cuenta una historia.\nLa tuya merece ser perfecta.',
  },
  {
    label: '02',
    text: 'Tecnología Piezotome®.\nPrecisión que el bisturí\nno puede alcanzar.',
  },
  {
    label: '03',
    text: 'Más de 500 cirugías avalan\ncada decisión del Dr. Agudelo.',
  },
];

// ─── Hero + Narrative Section ────────────────────────────────────────────────
const HeroSection = () => {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);
  const blockRefs = [
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
  ];
  const counterRef = useRef<HTMLSpanElement>(null);
  const ease = [0.22, 1, 0.36, 1] as const;

  useEffect(() => {
    let ctx: any;

    Promise.all([
      import('gsap').then((m: any) => m.default ?? m.gsap ?? m),
      import('gsap/ScrollTrigger').then((m: any) => m.ScrollTrigger),
      import('split-type').then((m: any) => m.default ?? m),
    ]).then(([gsap, ScrollTrigger, SplitType]: any[]) => {
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        const frame = frameRef.current;
        const heroText = heroTextRef.current;

        // ── ANIMACIÓN 1: clip-path shrink sincronizada con el inicio del scroll ──
        ScrollTrigger.create({
          trigger: outerRef.current,
          start: 'top top',
          end: '20% top', // Termina de encogerse relativamente rápido
          scrub: 1.5,
          onUpdate: (self: any) => {
            const p = self.progress;
            const inset = p * 40;
            const radius = p * 24;
            if (frame) {
              frame.style.clipPath = `inset(${inset}px round ${radius}px)`;
            }
          },
        });

        // ── ANIMACIÓN 2: Hero Text Fade Out al scrollear ──
        if (heroText) {
          gsap.to(heroText, {
            scrollTrigger: {
              trigger: outerRef.current,
              start: 'top top',
              end: '15% top',
              scrub: 1,
            },
            y: -150,
            opacity: 0,
            scale: 0.9,
            filter: 'blur(10px)',
            ease: 'none',
          });
        }

        // ── ANIMACIÓN 3: texto narrativo ──
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: outerRef.current,
            start: '15% top', // Inicia justo cuando el texto del Hero ya está opaco/desapareciendo
            end: 'bottom bottom',
            scrub: 1.2,
          },
        });

        BLOCKS.forEach((_: any, idx: number) => {
          const el = blockRefs[idx].current?.querySelector('[data-split]');
          if (!el) return;
          const s = new SplitType(el, { types: 'lines' });
          const lines = s.lines ?? [];
          const inAt = idx * 2.2;
          const outAt = inAt + 1.8;

          gsap.set(lines, {
            opacity: 0,
            yPercent: 60,
            rotateX: 15,
            filter: 'blur(20px)',
            z: -300,
          });

          tl.to(
            lines,
            {
              opacity: 1,
              yPercent: 0,
              rotateX: 0,
              filter: 'blur(0px)',
              z: 0,
              duration: 1.5,
              stagger: 0.08,
              ease: 'power3.out',
            },
            inAt
          );

          if (idx < BLOCKS.length - 1) {
            tl.to(
              lines,
              { opacity: 0, yPercent: -30, duration: 0.8, stagger: 0.05 },
              outAt
            );
          }

          tl.to(
            counterRef.current,
            { innerText: String(idx + 1), duration: 0.01 },
            inAt + 0.5
          );
        });
      }, outerRef);
    });

    return () => ctx?.revert();
  }, []);

  return (
    <section ref={outerRef} id="inicio" className="hero-narrative-section relative" style={{ height: '480vh', background: 'var(--color-1)', zIndex: 10 }}>
      {/* Marco adhesivo */}
      <div
        ref={frameRef}
        className="sticky top-0 h-screen w-screen overflow-hidden"
        style={{ clipPath: 'inset(0px round 0px)' }}
      >
        {/* Imagen de fondo (combinación del antiguo Hero y la clínica) */}
        <img
          src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1600&q=80"
          alt="Clínica Dr. Agudelo"
          className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-slate-950/60" />

        {/* ── Contenido Inicial del Hero ── */}
        <div ref={heroTextRef} className="absolute inset-0 flex flex-col flex-1 items-center justify-center text-center max-w-4xl mx-auto px-6 w-full z-20">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: ease }}
            className="hero-h1"
            style={{ color: 'var(--color-4)', fontWeight: 500, letterSpacing: '-0.03em' }}
          >
            Cirugía plástica con precisión, resultados que transforman
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: ease }}
            className="mt-5 text-base md:text-lg leading-relaxed max-w-xl"
            style={{ color: 'var(--color-5)', fontWeight: 400 }}
          >
            Especialista certificado en cirugía plástica estética y reconstructiva. Basado en Cali, atendiendo pacientes de toda Colombia y el exterior.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8, ease: ease }}
            className="mt-8 pointer-events-auto"
          >
            <a
              href="#agendar"
              className="inline-flex items-center gap-3 text-sm"
              style={{
                color: 'var(--color-4)', fontWeight: 500,
                border: '1px solid rgba(255,255,255,0.3)', borderRadius: '100px',
                padding: '0.875rem 1.75rem', textDecoration: 'none',
                backdropFilter: 'blur(8px)', background: 'rgba(255,255,255,0.10)',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(255,255,255,0.2)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(255,255,255,0.10)' }}
            >
              Agendar consulta
              <span style={{ fontSize: '1.1rem' }}>→</span>
            </a>
          </motion.div>
        </div>

        {/* ── Textos Narrativos (Pineados) ── */}
        <div
          ref={innerRef}
          className="relative h-screen flex items-center justify-center overflow-hidden perspective-deep z-10 pointer-events-none"
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(2,132,199,0.08),transparent)] pointer-events-none" />
          
          {/* Indicadores Laterales y Contador */}
          <div className="absolute right-12 top-1/2 -translate-y-1/2 flex items-center justify-center w-12 h-12 bg-white/5 backdrop-blur-md border border-white/10 rounded-full font-mono text-xs text-white/50">
            <span ref={counterRef}>1</span>
            <span className="mx-1">/</span>
            <span>3</span>
          </div>
          
          <div className="absolute left-8 top-1/2 -translate-y-1/2 flex flex-col gap-3">
            {BLOCKS.map((b, i) => (
              <div key={b.label} className="flex items-center gap-4">
                <div className={`text-xs font-mono tracking-widest ${i === 0 ? 'text-sky-400' : 'text-white/30'}`}>
                  {b.label}
                </div>
                <div className={`w-px h-8 ${i === 0 ? 'bg-sky-400' : 'bg-white/10'}`} />
              </div>
            ))}
          </div>

          {/* Text Blocks */}
          <div className="absolute inset-0 flex items-center px-12 z-20">
            {BLOCKS.map((block, i) => (
              <div
                key={i}
                ref={blockRefs[i]}
                className={
                  i === 0
                    ? 'relative'
                    : 'absolute inset-0 flex items-center justify-center px-12'
                }
              >
                <div className="mx-auto text-center">
                  <p className="text-sky-500/80 text-xs font-mono tracking-[0.3em] mb-6 uppercase">
                    {block.label} / {BLOCKS.length.toString().padStart(2, '0')}
                  </p>
                  <p
                    data-split
                    className="font-serif text-3xl md:text-5xl lg:text-6xl text-white leading-[1.2] max-w-3xl whitespace-pre-line block mx-auto text-center"
                  >
                    {block.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};


// ─── Differentiators ─────────────────────────────────────────────────────────
const DifferentiatorsSection = () => {
  const [active, setActive] = useState(0)
  const diff = DIFFERENTIATORS[active]
  const autoplayRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const goTo = (i: number) => {
    setActive(i)
    restartAutoplay()
  }
  const prev = () => goTo((active - 1 + DIFFERENTIATORS.length) % DIFFERENTIATORS.length)
  const next = () => goTo((active + 1) % DIFFERENTIATORS.length)

  const restartAutoplay = () => {
    if (autoplayRef.current) clearInterval(autoplayRef.current)
    autoplayRef.current = setInterval(() => {
      setActive(p => (p + 1) % DIFFERENTIATORS.length)
    }, 8000)
  }

  useEffect(() => {
    restartAutoplay()
    return () => { if (autoplayRef.current) clearInterval(autoplayRef.current) }
  }, [])

  return (
    <section id="diferenciadores" className="py-28" style={{ background: 'var(--color-4)' }}>
      <div className="max-w-7xl mx-auto px-6">
        {/* Section title */}
        <h2
          className="diff-title text-4xl md:text-5xl text-center mb-16"
          style={{ color: 'var(--color-1)', fontWeight: 700 }}
        >
          What makes us different
        </h2>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* LEFT — slider content */}
          <div>
            {/* Navigation pill */}
            <div
              className="inline-flex items-center gap-4 mb-10"
              style={{
                border: '1px solid rgba(0,0,0,0.12)',
                borderRadius: '100px',
                padding: '0.35rem 0.5rem',
              }}
            >
              <button onClick={prev} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0.25rem', color: '#242424', display: 'flex' }}>
                <ChevronLeft className="w-4 h-4" />
              </button>
              <AnimatePresence mode="wait">
                <motion.span
                  key={diff.id + '-nav'}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.25 }}
                  style={{ fontSize: '0.8rem', fontWeight: 500, color: '#242424', whiteSpace: 'nowrap', minWidth: '10rem', textAlign: 'center' }}
                >
                  {diff.label}
                </motion.span>
              </AnimatePresence>
              <button onClick={next} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0.25rem', color: '#242424', display: 'flex' }}>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={diff.id + '-content'}
                initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
                animate={{ opacity: 1, y: 0,  filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -20, filter: 'blur(6px)' }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <h3
                  className="text-3xl md:text-4xl mb-5 leading-tight"
                  style={{ color: 'var(--color-1)', fontWeight: 700, letterSpacing: '-0.02em' }}
                >
                  {diff.headline}
                </h3>
                <p
                  className="text-sm leading-relaxed mb-8 max-w-md"
                  style={{ color: '#64748b', fontWeight: 400 }}
                >
                  {diff.body}
                </p>
                <a
                  href="#agendar"
                  className="inline-flex items-center gap-2 text-sm"
                  style={{
                    border: '1px solid var(--color-11)',
                    borderRadius: '100px',
                    padding: '0.625rem 1.25rem',
                    fontWeight: 500,
                    color: 'var(--color-1)',
                    textDecoration: 'none',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={e => { const t = e.currentTarget as HTMLAnchorElement; t.style.background = '#242424'; t.style.color = '#fff' }}
                  onMouseLeave={e => { const t = e.currentTarget as HTMLAnchorElement; t.style.background = 'transparent'; t.style.color = '#242424' }}
                >
                  Consultar →
                </a>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* RIGHT — image + thumbnails */}
          <div className="flex gap-3">
            {/* Main image */}
            <div className="flex-1 relative overflow-hidden" style={{ borderRadius: '16px', aspectRatio: '4/5' }}>
              <AnimatePresence mode="wait">
                <motion.img
                  key={diff.id + '-img'}
                  src={diff.img}
                  alt={diff.label}
                  className="absolute inset-0 w-full h-full object-cover"
                  initial={{ opacity: 0, scale: 1.04, filter: 'blur(12px)' }}
                  animate={{ opacity: 1, scale: 1,    filter: 'blur(0px)' }}
                  exit={{ opacity: 0, scale: 0.97, filter: 'blur(8px)' }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                />
              </AnimatePresence>
            </div>

            {/* Thumbnails */}
            <div className="flex flex-col gap-2" style={{ width: '72px' }}>
              {DIFFERENTIATORS.map((d, i) => (
                <button
                  key={d.id}
                  onClick={() => goTo(i)}
                  className="relative overflow-hidden"
                  style={{
                    borderRadius: '8px',
                    aspectRatio: '1/1',
                    border: active === i ? '2px solid #0ea5e9' : '2px solid transparent',
                    opacity: active === i ? 1 : 0.55,
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                    padding: 0,
                    background: 'none',
                  }}
                >
                  <img src={d.img} alt={d.label} className="w-full h-full object-cover" style={{ borderRadius: '6px' }} />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Testimonials ─────────────────────────────────────────────────────────────
const TestimonialsSection = () => {
  const [idx, setIdx]         = useState(0)
  const [progress, setProgress] = useState(0)
  const scrollRef = useRef<HTMLDivElement>(null)
  const DURATION = 5000

  useEffect(() => {
    setProgress(0)
    const start = performance.now()
    let raf: number
    const step = (now: number) => {
      const p = Math.min((now - start) / DURATION, 1)
      setProgress(p)
      if (p < 1) { raf = requestAnimationFrame(step) }
      else { setIdx(i => (i + 1) % TESTIMONIALS.length) }
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [idx])

  // Scroll to active card
  useEffect(() => {
    const container = scrollRef.current
    if (!container) return
    const card = container.children[idx] as HTMLElement | undefined
    if (!card) return
    const left = card.offsetLeft - container.offsetWidth / 2 + card.offsetWidth / 2
    container.scrollTo({ left, behavior: 'smooth' })
  }, [idx])

  return (
    <section id="testimonios" className="py-28" style={{ background: '#f5f5f0' }}>
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-xs uppercase tracking-[0.2em] mb-4" style={{ color: '#94a3b8', fontWeight: 400 }}>
            A pesar de la distancia...
          </p>
          <h2
            className="testimonials-h2 mx-auto"
            style={{ color: 'var(--color-1)', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.05 }}
          >
            Estás a un paso de convertirte en la mejor versión de ti mismo
          </h2>
        </div>

        {/* Video-style cards slider */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto no-scrollbar pb-4"
          style={{ scrollSnapType: 'x mandatory' }}
        >
          {TESTIMONIALS.map((t, i) => (
            <div
              key={t.id}
              onClick={() => setIdx(i)}
              className="flex-shrink-0 relative"
              style={{
                width: 'clamp(200px, 28vw, 280px)',
                aspectRatio: '9/14',
                borderRadius: '20px',
                overflow: 'hidden',
                cursor: 'pointer',
                scrollSnapAlign: 'center',
                opacity: i === idx ? 1 : 0.45,
                transition: 'opacity 0.4s ease',
                background: '#1e1e24',
              }}
            >
              {/* Mute icon */}
              <div style={{
                position: 'absolute', top: '0.75rem', left: '0.75rem', zIndex: 10,
                background: 'rgba(0,0,0,0.5)', borderRadius: '50%',
                width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <VolumeX className="w-3.5 h-3.5" style={{ color: '#fff' }} />
              </div>

              {/* Center play + initials */}
              <div style={{
                position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center', gap: '0.75rem',
              }}>
                <div style={{
                  width: '56px', height: '56px', borderRadius: '50%',
                  background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(6px)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1.1rem', fontWeight: 700, color: '#fff', letterSpacing: '0.02em',
                }}>
                  {t.initials}
                </div>
                <div style={{
                  width: '40px', height: '40px', borderRadius: '50%',
                  background: 'rgba(255,255,255,0.18)', display: 'flex',
                  alignItems: 'center', justifyContent: 'center',
                }}>
                  <Play className="w-4 h-4" style={{ color: '#fff', marginLeft: '2px' }} />
                </div>
              </div>

              {/* Bottom chip */}
              <div style={{
                position: 'absolute', bottom: '0.75rem', left: '0.75rem', right: '0.75rem', zIndex: 10,
                background: 'rgba(255,255,255,0.95)', borderRadius: '14px',
                padding: '0.5rem 0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem',
              }}>
                <div style={{
                  width: '28px', height: '28px', borderRadius: '50%', background: '#242424',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '0.55rem', fontWeight: 700, color: '#fff', flexShrink: 0,
                }}>
                  {t.initials}
                </div>
                <div style={{ overflow: 'hidden' }}>
                  <p style={{ fontSize: '0.75rem', fontWeight: 600, color: '#242424', lineHeight: 1.2 }}>{t.name}</p>
                  <p style={{ fontSize: '0.625rem', color: '#94a3b8', fontWeight: 400 }}>{t.procedure}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Progress bar */}
        <div className="flex items-center gap-6 mt-6">
          <button onClick={() => setIdx(i => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#242424', display: 'flex' }}>
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="flex-1 flex items-center gap-4">
            {TESTIMONIALS.map((_, i) => (
              <button key={i} onClick={() => setIdx(i)} className="relative flex-1 overflow-hidden"
                style={{ height: '2px', background: 'rgba(0,0,0,0.08)', border: 'none', cursor: 'pointer', padding: 0 }}>
                {i === idx && (
                  <div className="absolute inset-y-0 left-0" style={{ background: '#242424', width: `${progress * 100}%` }} />
                )}
                {i < idx && (
                  <div className="absolute inset-0" style={{ background: '#242424' }} />
                )}
              </button>
            ))}
          </div>
          <button onClick={() => setIdx(i => (i + 1) % TESTIMONIALS.length)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#242424', display: 'flex' }}>
            <ChevronRight className="w-5 h-5" />
          </button>
          <span className="text-sm tabular-nums whitespace-nowrap" style={{ color: '#94a3b8', fontWeight: 400 }}>
            {String(idx + 1).padStart(2, '0')} / {String(TESTIMONIALS.length).padStart(2, '0')}
          </span>
        </div>
      </div>
    </section>
  )
}

// ─── Booking Section ─────────────────────────────────────────────────────────
const BookingSection = () => {
  const [step, setStep] = useState(1)
  const [form, setForm] = useState({ name: '', phone: '', email: '', date: '', procedure: '', message: '' })
  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }))

  const inputCls: React.CSSProperties = {
    width: '100%',
    background: 'rgba(255,255,255,0.06)',
    border: '1px solid rgba(255,255,255,0.12)',
    borderRadius: '12px',
    padding: '0.75rem 1rem',
    color: 'var(--color-4)',
    fontSize: '0.875rem',
    fontFamily: 'var(--font-sans)',
    fontWeight: 400,
    outline: 'none',
  }

  return (
    <section id="agendar" className="py-28" style={{ background: 'var(--color-1)' }}>
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-14">
          <p className="text-xs uppercase tracking-[0.2em] mb-3" style={{ color: 'var(--color-9)', fontWeight: 600 }}>
            Agenda tu consulta
          </p>
          <h2 className="text-4xl md:text-5xl mb-4" style={{ color: 'var(--color-4)', fontWeight: 700 }}>
            El primer paso hacia<br />
            <span style={{ fontWeight: 400, color: 'var(--color-5)' }}>tu transformación.</span>
          </h2>
          <p className="text-sm" style={{ color: 'var(--color-12)', fontWeight: 400 }}>
            Consulta de valoración completamente gratuita.
          </p>
        </div>

        <div className="flex items-center justify-center gap-4 mb-10">
          {[1, 2].map(s => (
            <div key={s} className="flex items-center gap-2">
              <div className="w-8 h-8 flex items-center justify-center text-xs"
                style={{
                  borderRadius: '50%',
                  background: step >= s ? 'var(--color-4)' : 'rgba(255,255,255,0.1)',
                  color: step >= s ? 'var(--color-1)' : 'rgba(255,255,255,0.4)',
                  fontWeight: 700, transition: 'all 0.3s ease',
                }}
              >{s}</div>
              <span className="text-xs" style={{ color: step >= s ? 'var(--color-5)' : 'rgba(255,255,255,0.3)', fontWeight: 400 }}>
                {s === 1 ? 'Datos personales' : 'Detalles de consulta'}
              </span>
              {s < 2 && <div className="w-12" style={{ height: '1px', background: step >= 2 ? 'var(--color-4)' : 'rgba(255,255,255,0.1)' }} />}
            </div>
          ))}
        </div>

        <div className="p-8" style={{ background: 'rgba(255,255,255,0.04)', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.08)' }}>
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div key="step1" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="grid gap-5">
                <div>
                  <label className="block text-xs uppercase tracking-wider mb-2" style={{ color: 'var(--color-5)', fontWeight: 400 }}>Nombre completo</label>
                  <input type="text" placeholder="Ej. Ana García" value={form.name} onChange={set('name')} style={inputCls} />
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs uppercase tracking-wider mb-2" style={{ color: 'var(--color-5)', fontWeight: 400 }}>Teléfono / WhatsApp</label>
                    <input type="tel" placeholder="+57 300 000 0000" value={form.phone} onChange={set('phone')} style={inputCls} />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider mb-2" style={{ color: 'var(--color-5)', fontWeight: 400 }}>Correo electrónico</label>
                    <input type="email" placeholder="ana@correo.com" value={form.email} onChange={set('email')} style={inputCls} />
                  </div>
                </div>
                <button
                  onClick={() => form.name && form.phone && form.email && setStep(2)}
                  className="flex items-center justify-center gap-2 w-full py-4 mt-2 text-sm transition-all"
                  style={{ background: 'var(--color-4)', color: 'var(--color-1)', borderRadius: '100px', fontWeight: 600, border: 'none', cursor: 'pointer' }}
                >
                  Continuar <ArrowRight className="w-4 h-4" />
                </button>
              </motion.div>
            )}
            {step === 2 && (
              <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="grid gap-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs uppercase tracking-wider mb-2" style={{ color: 'var(--color-5)', fontWeight: 400 }}>Fecha preferida</label>
                    <input type="date" value={form.date} onChange={set('date')} style={inputCls} />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider mb-2" style={{ color: 'var(--color-5)', fontWeight: 400 }}>Procedimiento de interés</label>
                    <select value={form.procedure} onChange={set('procedure')} style={inputCls}>
                      <option value="" style={{ background: '#242424' }}>Selecciona uno</option>
                      {PROCEDURES.map(p => <option key={p.id} value={p.id} style={{ background: '#242424' }}>{p.title}</option>)}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider mb-2" style={{ color: 'var(--color-5)', fontWeight: 400 }}>Mensaje (opcional)</label>
                  <textarea rows={3} placeholder="Cuéntanos brevemente tu caso..." value={form.message} onChange={set('message')} style={{ ...inputCls, resize: 'none' }} />
                </div>
                <div className="flex gap-3">
                  <button onClick={() => setStep(1)} className="flex-1 py-4 text-sm transition-all"
                    style={{ background: 'transparent', color: 'var(--color-5)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '100px', fontWeight: 500, cursor: 'pointer' }}
                  >← Volver</button>
                  <button className="flex-[2] flex items-center justify-center gap-2 py-4 text-sm transition-all"
                    style={{ background: 'var(--color-4)', color: 'var(--color-1)', borderRadius: '100px', fontWeight: 600, border: 'none', cursor: 'pointer' }}
                  ><Calendar className="w-4 h-4" /> Confirmar Consulta</button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

// ─── Footer ───────────────────────────────────────────────────────────────────
const Footer = () => (
  <footer style={{ background: 'var(--color-1)' }}>
    <div className="max-w-7xl mx-auto px-6 pt-20 pb-10">
      <div className="grid md:grid-cols-4 gap-12 mb-16">
        <div>
          <p style={{ color: 'var(--color-4)', fontWeight: 700, fontSize: '1.1rem', letterSpacing: '-0.02em', marginBottom: '1rem' }}>Dr. Agudelo</p>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--color-12)', fontWeight: 400, maxWidth: '18rem' }}>
            Resultados naturales. Confianza real. Especialista en cirugía plástica estética y reconstructiva en Cali, Colombia.
          </p>
          <div className="flex gap-4 mt-6">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" style={{ color: 'var(--color-12)' }}><Instagram className="w-5 h-5" /></a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" style={{ color: 'var(--color-12)' }}><Facebook className="w-5 h-5" /></a>
            <a href="https://wa.me/573000000000" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" style={{ color: 'var(--color-12)' }}><MessageSquare className="w-5 h-5" /></a>
          </div>
        </div>
        <div>
          <p className="text-xs uppercase tracking-widest mb-5" style={{ color: 'var(--color-12)', fontWeight: 600 }}>Navegación</p>
          <ul className="flex flex-col gap-3">
            {['Inicio', 'Procedimientos', 'La Clínica', 'Testimonios', 'Contacto'].map(l => (
              <li key={l}>
                <a href={`#${l.toLowerCase().replace(/\s/g, '')}`} className="text-sm transition-colors"
                  style={{ color: 'var(--color-12)', fontWeight: 400, textDecoration: 'none' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = 'var(--color-4)' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = 'var(--color-12)' }}
                >{l}</a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-xs uppercase tracking-widest mb-5" style={{ color: 'var(--color-12)', fontWeight: 600 }}>Ubicación</p>
          <div className="flex gap-3">
            <MapPin className="w-4 h-4 mt-0.5 shrink-0" style={{ color: 'var(--color-9)' }} />
            <p className="text-sm leading-relaxed" style={{ color: 'var(--color-12)', fontWeight: 400 }}>Cl. 5 #38-05<br />Cali, Colombia</p>
          </div>
        </div>
        <div>
          <p className="text-xs uppercase tracking-widest mb-5" style={{ color: 'var(--color-12)', fontWeight: 600 }}>Contacto</p>
          <ul className="flex flex-col gap-3">
            <li><a href="https://wa.me/573000000000" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm" style={{ color: 'var(--color-12)', fontWeight: 400, textDecoration: 'none' }}><MessageSquare className="w-4 h-4 shrink-0" style={{ color: 'var(--color-9)' }} />+57 300 000 0000</a></li>
            <li><a href="mailto:contacto@drvictoragudelo.com" className="flex items-center gap-2 text-sm" style={{ color: 'var(--color-12)', fontWeight: 400, textDecoration: 'none' }}><Mail className="w-4 h-4 shrink-0" style={{ color: 'var(--color-9)' }} />contacto@drvictoragudelo.com</a></li>
            <li><a href="tel:+5726001234" className="flex items-center gap-2 text-sm" style={{ color: 'var(--color-12)', fontWeight: 400, textDecoration: 'none' }}><Phone className="w-4 h-4 shrink-0" style={{ color: 'var(--color-9)' }} />+57 (2) 600-1234</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-brand text-center py-8" style={{ borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)', margin: '0 -1.5rem' }}>
        Dr. Agudelo
      </div>
      <div className="flex flex-col md:flex-row justify-between items-center gap-3 pt-8">
        <p className="text-xs" style={{ color: 'rgba(255,255,255,0.2)', fontWeight: 400 }}>2026 © Dr. Víctor Manuel Agudelo. Todos los derechos reservados.</p>
        <p className="text-xs" style={{ color: 'rgba(255,255,255,0.15)', fontWeight: 400 }}>Médico Cirujano · Registro RETHUS verificado</p>
      </div>
    </div>
  </footer>
)

// ─── Floating Buttons ─────────────────────────────────────────────────────────
const WhatsAppButton = () => (
  <a href="https://wa.me/573000000000?text=Hola%2C+me+gustar%C3%ADa+agendar+una+consulta." target="_blank" rel="noopener noreferrer" aria-label="Contactar por WhatsApp"
    className="hidden md:flex fixed bottom-8 right-8 z-50 items-center justify-center w-14 h-14 transition-transform duration-200 hover:scale-110"
    style={{ borderRadius: '50%', background: '#25D366', boxShadow: '0 4px 20px rgba(0,0,0,0.3)' }}
  ><MessageSquare className="w-6 h-6" style={{ color: '#fff' }} /></a>
)

const StickyMobileCTA = () => (
  <div className="md:hidden fixed bottom-0 inset-x-0 z-50 p-4"
    style={{ background: 'rgba(36,36,36,0.97)', backdropFilter: 'blur(16px)', borderTop: '1px solid rgba(255,255,255,0.06)' }}
  >
    <a href="#agendar" className="flex items-center justify-center gap-2 w-full py-3.5 text-sm"
      style={{ background: 'var(--color-4)', color: 'var(--color-1)', borderRadius: '100px', fontWeight: 600, textDecoration: 'none' }}
    ><Calendar className="w-4 h-4" /> Agendar Consulta Gratuita</a>
  </div>
)

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  // Lenis smooth scroll + GSAP ScrollTrigger sync
  useEffect(() => {
    let lenis: any
    import('lenis').then((m: any) => {
      const Lenis = m.default ?? m
      lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      })
      lenis.on('scroll', ScrollTrigger.update)
      const raf = (time: number) => { lenis.raf(time); requestAnimationFrame(raf) }
      requestAnimationFrame(raf)
    }).catch(() => {})
    return () => { lenis?.destroy() }
  }, [])

  // Global scroll reveals
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const fadeUpOnScroll = (selector: string, stagger = 0.1) => {
        const els = document.querySelectorAll(selector)
        if (!els.length) return
        gsap.fromTo(els,
          { opacity: 0, y: 40, filter: 'blur(8px)' },
          {
            opacity: 1, y: 0, filter: 'blur(0px)',
            duration: 0.8, stagger, ease: 'power3.out',
            scrollTrigger: {
              trigger: els[0],
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        )
      }

      // Delay slightly to ensure DOM is ready
      setTimeout(() => {
        fadeUpOnScroll('.diff-title')
        fadeUpOnScroll('.testimonials-h2')
      }, 200)
    })
    return () => ctx.revert()
  }, [])

  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-1)' }}>
      <Navbar />
      <main>
        <HeroSection />
        <div style={{ position: 'relative', zIndex: 2 }}>
          <HeroScrollText />
          <ProceduresSlider />
          <DifferentiatorsSection />
          <TestimonialsSection />
          <FaqAccordion />
          <BookingSection />
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
      <StickyMobileCTA />
    </div>
  )
}
