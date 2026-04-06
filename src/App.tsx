import React, { useState, useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import {
  Phone, Mail, MapPin, Instagram, Facebook,
  Menu, X, Star, Calendar, MessageSquare, ArrowRight,
} from 'lucide-react'

import { HeroStats }       from './components/HeroStats'
import { HeroScrollText }  from './components/HeroScrollText'
import { ProceduresSlider } from './components/ProceduresSlider'
import { FaqAccordion }    from './components/FaqAccordion'

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
  { id: 'ultra', label: 'Técnica Ultrasónica',    headline: 'Precisión que el bisturí tradicional no puede alcanzar.',        body: 'El sistema Piezotome® corta únicamente tejido óseo, preservando vasos y tejidos blandos. Menos inflamación, recuperación más rápida, resultados más predecibles.',    img: 'https://images.unsplash.com/photo-1530026405186-ed1f139313f3?w=900&q=80' },
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
    { label: 'Inicio',          href: '#inicio' },
    { label: 'Procedimientos',  href: '#procedimientos' },
    { label: 'Antes & Después', href: '#diferenciadores' },
    { label: 'Testimonios',     href: '#testimonios' },
    { label: 'Sobre mí',        href: '#doctor' },
    { label: 'Contacto',        href: '#agendar' },
  ]

  return (
    <>
      <header
        className={`header fixed inset-x-0 top-0 z-50 ${scrolled ? 'is-dark' : 'is-light'}`}
        style={{ padding: scrolled ? '0.75rem 0' : '1.5rem 0' }}
      >
        <div
          className="max-w-7xl mx-auto px-6 flex items-center justify-between"
          style={{ transition: 'padding 0.4s ease' }}
        >
          {/* Logo */}
          <a
            href="#inicio"
            className="h-link"
            style={{ fontWeight: 700, fontSize: '1.1rem', letterSpacing: '-0.02em', textDecoration: 'none' }}
          >
            <div>Dr. Agudelo</div>
          </a>

          {/* Desktop nav links */}
          <ul className="hidden md:flex items-center gap-7">
            {links.map(l => (
              <li key={l.href}>
                <a href={l.href} className="h-link w-inline-block" style={{ textDecoration: 'none' }}>
                  <div style={{ fontSize: '0.875rem', fontWeight: 400 }}>{l.label}</div>
                </a>
              </li>
            ))}
          </ul>

          {/* CTA button */}
          <div className="hidden md:block">
            <a href="#agendar" className="btn-header" style={{ textDecoration: 'none' }}>
              Agendar consulta
              <span style={{ fontSize: '1rem', lineHeight: 1 }}>→</span>
            </a>
          </div>

          {/* Hamburger */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2"
            style={{ color: scrolled ? 'var(--color-1)' : 'var(--color-4)', background: 'none', border: 'none', cursor: 'pointer' }}
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
                {links.map(l => (
                  <a
                    key={l.href}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    style={{
                      color: 'var(--color-4)',
                      fontWeight: 700,
                      fontSize: '1.75rem',
                      letterSpacing: '-0.02em',
                      textDecoration: 'none',
                    }}
                  >
                    {l.label}
                  </a>
                ))}
              </nav>

              {/* Social links */}
              <div className="mt-12">
                <p style={{ color: 'var(--color-5)', fontSize: '0.75rem', fontWeight: 400, textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '1rem' }}>
                  Síguenos
                </p>
                <div className="flex gap-5">
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-5)' }} aria-label="Instagram">
                    <Instagram className="w-5 h-5" />
                  </a>
                  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-5)' }} aria-label="Facebook">
                    <Facebook className="w-5 h-5" />
                  </a>
                  <a href="https://wa.me/573000000000" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-5)' }} aria-label="WhatsApp">
                    <MessageSquare className="w-5 h-5" />
                  </a>
                </div>
              </div>

              <a
                href="#agendar"
                onClick={() => setOpen(false)}
                className="mt-8 flex items-center justify-center gap-2 text-sm"
                style={{
                  background: 'var(--color-4)',
                  color: 'var(--color-1)',
                  fontWeight: 600,
                  borderRadius: '100px',
                  padding: '1rem',
                  textDecoration: 'none',
                }}
              >
                Agendar consulta →
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

// ─── Hero Section ────────────────────────────────────────────────────────────
const HeroSection = () => {
  const ease = [0.22, 1, 0.36, 1] as const

  return (
    <section id="inicio" className="hero first-screen relative flex flex-col" style={{ minHeight: '100svh' }}>
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1600&q=80"
          alt="Clínica Dr. Agudelo"
          className="w-full h-full object-cover"
          fetchPriority="high"
        />
        <div
          className="absolute inset-0"
          style={{ background: 'var(--color-10)' }}
        />
      </div>

      {/* Content wrapper */}
      <div className="relative z-10 flex flex-col flex-1 max-w-7xl mx-auto px-6 w-full">

        {/* Top: stats */}
        <div className="pt-32 pb-8">
          <HeroStats />
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Bottom: H1 left + CTA right */}
        <div
          className="pb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-8"
        >
          <div className="max-w-2xl">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: ease }}
              className="text-4xl sm:text-6xl lg:text-7xl leading-[1.0]"
              style={{ color: 'var(--color-4)', fontWeight: 700, letterSpacing: '-0.03em' }}
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
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8, ease: ease }}
            className="shrink-0"
          >
            <a
              href="#agendar"
              className="inline-flex items-center gap-3 text-sm"
              style={{
                color: 'var(--color-4)',
                fontWeight: 500,
                border: '1px solid rgba(255,255,255,0.3)',
                borderRadius: '100px',
                padding: '0.875rem 1.75rem',
                textDecoration: 'none',
                backdropFilter: 'blur(8px)',
                background: 'rgba(255,255,255,0.10)',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(255,255,255,0.2)'
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(255,255,255,0.10)'
              }}
            >
              Agendar consulta
              <span style={{ fontSize: '1.1rem' }}>→</span>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// ─── Differentiators ─────────────────────────────────────────────────────────
const DifferentiatorsSection = () => {
  const [active, setActive] = useState(0)
  const diff = DIFFERENTIATORS[active]
  return (
    <section id="diferenciadores" className="py-28" style={{ background: 'var(--color-4)' }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16">
          <p
            className="text-xs uppercase tracking-[0.2em] mb-3"
            style={{ color: 'var(--color-6)', fontWeight: 600 }}
          >
            ¿Por qué el Dr. Agudelo?
          </p>
          <h2
            className="text-4xl md:text-5xl max-w-2xl"
            style={{ color: 'var(--color-1)', fontWeight: 700 }}
          >
            Cuatro razones que<br />
            <span style={{ fontWeight: 400, color: 'var(--color-12)' }}>hacen la diferencia.</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-[1fr,1.4fr] gap-12 items-start">
          <div className="flex flex-col gap-2">
            {DIFFERENTIATORS.map((d, i) => (
              <button
                key={d.id}
                onClick={() => setActive(i)}
                className="text-left px-6 py-5 transition-all duration-300"
                style={{
                  borderRadius: '12px',
                  border: `1px solid ${active === i ? 'var(--color-1)' : 'var(--color-11)'}`,
                  background: active === i ? 'var(--color-1)' : 'transparent',
                  cursor: 'pointer',
                }}
              >
                <span
                  className="text-xs font-mono mr-3"
                  style={{ color: active === i ? 'var(--color-9)' : 'var(--color-12)' }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span
                  className="text-sm"
                  style={{ color: active === i ? 'var(--color-4)' : 'var(--color-1)', fontWeight: 500 }}
                >
                  {d.label}
                </span>
              </button>
            ))}
          </div>

          <div
            className="relative overflow-hidden"
            style={{ borderRadius: '20px', background: 'var(--color-1)', aspectRatio: '4/3' }}
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={diff.id + '-img'}
                src={diff.img}
                alt={diff.label}
                className="absolute inset-0 w-full h-full object-cover"
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              />
            </AnimatePresence>
            <div
              className="absolute inset-0"
              style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 60%)' }}
            />
            <AnimatePresence mode="wait">
              <motion.div
                key={diff.id + '-text'}
                className="absolute inset-x-0 bottom-0 p-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <h3
                  className="text-xl md:text-2xl mb-3"
                  style={{ color: 'var(--color-4)', fontWeight: 700 }}
                >
                  {diff.headline}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: 'var(--color-5)', fontWeight: 400 }}
                >
                  {diff.body}
                </p>
              </motion.div>
            </AnimatePresence>
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
  const t = TESTIMONIALS[idx]
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

  return (
    <section id="testimonios" className="py-28" style={{ background: 'var(--color-9)' }}>
      <div className="max-w-5xl mx-auto px-6">
        <div className="mb-16 text-center">
          <p
            className="text-xs uppercase tracking-[0.2em] mb-3"
            style={{ color: 'var(--color-12)', fontWeight: 600 }}
          >
            Testimonios
          </p>
          <h2
            className="text-4xl md:text-5xl"
            style={{ color: 'var(--color-1)', fontWeight: 700 }}
          >
            Lo que dicen quienes<br />
            <span style={{ fontWeight: 400 }}>ya dieron el paso.</span>
          </h2>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="p-10 md:p-14"
            style={{ background: 'var(--color-4)', borderRadius: '20px' }}
          >
            <div className="flex gap-1 mb-8">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5" style={{ fill: '#242424', color: '#242424' }} />
              ))}
            </div>
            <blockquote
              className="text-2xl md:text-3xl leading-relaxed mb-8"
              style={{ color: 'var(--color-1)', fontWeight: 700 }}
            >
              "{t.text}"
            </blockquote>
            <div className="flex items-center gap-4">
              <div
                className="w-12 h-12 flex items-center justify-center text-sm"
                style={{ borderRadius: '50%', background: 'var(--color-1)', color: 'var(--color-4)', fontWeight: 700 }}
              >
                {t.initials}
              </div>
              <div>
                <p style={{ color: 'var(--color-1)', fontWeight: 600 }}>{t.name}</p>
                <p className="text-sm" style={{ color: 'var(--color-12)', fontWeight: 400 }}>{t.procedure}</p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="flex items-center gap-6 mt-8">
          {TESTIMONIALS.map((test, i) => (
            <button
              key={test.id}
              onClick={() => setIdx(i)}
              className="relative flex-1 overflow-hidden"
              style={{ height: '2px', background: 'var(--color-11)', border: 'none', cursor: 'pointer', padding: 0 }}
            >
              {i === idx && (
                <div
                  className="absolute inset-y-0 left-0"
                  style={{ background: 'var(--color-1)', width: `${progress * 100}%` }}
                />
              )}
              {i < idx && (
                <div className="absolute inset-0" style={{ background: 'var(--color-1)' }} />
              )}
            </button>
          ))}
          <span className="text-sm tabular-nums whitespace-nowrap" style={{ color: 'var(--color-12)', fontWeight: 400 }}>
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
          <p
            className="text-xs uppercase tracking-[0.2em] mb-3"
            style={{ color: 'var(--color-9)', fontWeight: 600 }}
          >
            Agenda tu consulta
          </p>
          <h2
            className="text-4xl md:text-5xl mb-4"
            style={{ color: 'var(--color-4)', fontWeight: 700 }}
          >
            El primer paso hacia
            <br />
            <span style={{ fontWeight: 400, color: 'var(--color-5)' }}>tu transformación.</span>
          </h2>
          <p className="text-sm" style={{ color: 'var(--color-12)', fontWeight: 400 }}>
            Consulta de valoración completamente gratuita.
          </p>
        </div>

        {/* Step indicator */}
        <div className="flex items-center justify-center gap-4 mb-10">
          {[1, 2].map(s => (
            <div key={s} className="flex items-center gap-2">
              <div
                className="w-8 h-8 flex items-center justify-center text-xs"
                style={{
                  borderRadius: '50%',
                  background: step >= s ? 'var(--color-4)' : 'rgba(255,255,255,0.1)',
                  color: step >= s ? 'var(--color-1)' : 'rgba(255,255,255,0.4)',
                  fontWeight: 700,
                  transition: 'all 0.3s ease',
                }}
              >
                {s}
              </div>
              <span
                className="text-xs"
                style={{ color: step >= s ? 'var(--color-5)' : 'rgba(255,255,255,0.3)', fontWeight: 400 }}
              >
                {s === 1 ? 'Datos personales' : 'Detalles de consulta'}
              </span>
              {s < 2 && (
                <div
                  className="w-12"
                  style={{ height: '1px', background: step >= 2 ? 'var(--color-4)' : 'rgba(255,255,255,0.1)' }}
                />
              )}
            </div>
          ))}
        </div>

        <div
          className="p-8"
          style={{ background: 'rgba(255,255,255,0.04)', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.08)' }}
        >
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
                  <button
                    onClick={() => setStep(1)}
                    className="flex-1 py-4 text-sm transition-all"
                    style={{ background: 'transparent', color: 'var(--color-5)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '100px', fontWeight: 500, cursor: 'pointer' }}
                  >
                    ← Volver
                  </button>
                  <button
                    className="flex-[2] flex items-center justify-center gap-2 py-4 text-sm transition-all"
                    style={{ background: 'var(--color-4)', color: 'var(--color-1)', borderRadius: '100px', fontWeight: 600, border: 'none', cursor: 'pointer' }}
                  >
                    <Calendar className="w-4 h-4" /> Confirmar Consulta
                  </button>
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
        {/* Col 1: logo + tagline + social */}
        <div>
          <p style={{ color: 'var(--color-4)', fontWeight: 700, fontSize: '1.1rem', letterSpacing: '-0.02em', marginBottom: '1rem' }}>
            Dr. Agudelo
          </p>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--color-12)', fontWeight: 400, maxWidth: '18rem' }}>
            Resultados naturales. Confianza real. Especialista en cirugía plástica estética y reconstructiva en Cali, Colombia.
          </p>
          <div className="flex gap-4 mt-6">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" style={{ color: 'var(--color-12)' }}>
              <Instagram className="w-5 h-5" />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" style={{ color: 'var(--color-12)' }}>
              <Facebook className="w-5 h-5" />
            </a>
            <a href="https://wa.me/573000000000" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" style={{ color: 'var(--color-12)' }}>
              <MessageSquare className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Col 2: nav links */}
        <div>
          <p className="text-xs uppercase tracking-widest mb-5" style={{ color: 'var(--color-12)', fontWeight: 600 }}>Navegación</p>
          <ul className="flex flex-col gap-3">
            {['Inicio', 'Procedimientos', 'Antes & Después', 'Testimonios', 'Sobre mí', 'Contacto'].map(l => (
              <li key={l}>
                <a
                  href={`#${l.toLowerCase().replace(/\s/g, '').replace('&', '')}`}
                  className="text-sm transition-colors"
                  style={{ color: 'var(--color-12)', fontWeight: 400, textDecoration: 'none' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = 'var(--color-4)' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = 'var(--color-12)' }}
                >
                  {l}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 3: location */}
        <div>
          <p className="text-xs uppercase tracking-widest mb-5" style={{ color: 'var(--color-12)', fontWeight: 600 }}>Ubicación</p>
          <div className="flex gap-3">
            <MapPin className="w-4 h-4 mt-0.5 shrink-0" style={{ color: 'var(--color-9)' }} />
            <p className="text-sm leading-relaxed" style={{ color: 'var(--color-12)', fontWeight: 400 }}>
              Cl. 5 #38-05<br />Cali, Colombia
            </p>
          </div>
        </div>

        {/* Col 4: contact */}
        <div>
          <p className="text-xs uppercase tracking-widest mb-5" style={{ color: 'var(--color-12)', fontWeight: 600 }}>Contacto</p>
          <ul className="flex flex-col gap-3">
            <li>
              <a
                href="https://wa.me/573000000000"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm"
                style={{ color: 'var(--color-12)', fontWeight: 400, textDecoration: 'none' }}
              >
                <MessageSquare className="w-4 h-4 shrink-0" style={{ color: 'var(--color-9)' }} />
                +57 300 000 0000
              </a>
            </li>
            <li>
              <a
                href="mailto:contacto@drvictoragudelo.com"
                className="flex items-center gap-2 text-sm"
                style={{ color: 'var(--color-12)', fontWeight: 400, textDecoration: 'none' }}
              >
                <Mail className="w-4 h-4 shrink-0" style={{ color: 'var(--color-9)' }} />
                contacto@drvictoragudelo.com
              </a>
            </li>
            <li>
              <a
                href="tel:+5726001234"
                className="flex items-center gap-2 text-sm"
                style={{ color: 'var(--color-12)', fontWeight: 400, textDecoration: 'none' }}
              >
                <Phone className="w-4 h-4 shrink-0" style={{ color: 'var(--color-9)' }} />
                +57 (2) 600-1234
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Oversized brand name */}
      <div
        className="footer-brand text-center py-8"
        style={{ borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)', margin: '0 -1.5rem' }}
      >
        Dr. Agudelo
      </div>

      {/* Copyright */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-3 pt-8">
        <p className="text-xs" style={{ color: 'rgba(255,255,255,0.2)', fontWeight: 400 }}>
          2026 © Dr. Víctor Manuel Agudelo. Todos los derechos reservados.
        </p>
        <p className="text-xs" style={{ color: 'rgba(255,255,255,0.15)', fontWeight: 400 }}>
          Médico Cirujano · Registro RETHUS verificado
        </p>
      </div>
    </div>
  </footer>
)

// ─── Floating Buttons ─────────────────────────────────────────────────────────
const WhatsAppButton = () => (
  <a
    href="https://wa.me/573000000000?text=Hola%2C+me+gustar%C3%ADa+agendar+una+consulta."
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Contactar por WhatsApp"
    className="hidden md:flex fixed bottom-8 right-8 z-50 items-center justify-center w-14 h-14 transition-transform duration-200 hover:scale-110"
    style={{ borderRadius: '50%', background: '#25D366', boxShadow: '0 4px 20px rgba(0,0,0,0.3)' }}
  >
    <MessageSquare className="w-6 h-6" style={{ color: '#fff' }} />
  </a>
)

const StickyMobileCTA = () => (
  <div
    className="md:hidden fixed bottom-0 inset-x-0 z-50 p-4"
    style={{ background: 'rgba(36,36,36,0.97)', backdropFilter: 'blur(16px)', borderTop: '1px solid rgba(255,255,255,0.06)' }}
  >
    <a
      href="#agendar"
      className="flex items-center justify-center gap-2 w-full py-3.5 text-sm"
      style={{ background: 'var(--color-4)', color: 'var(--color-1)', borderRadius: '100px', fontWeight: 600, textDecoration: 'none' }}
    >
      <Calendar className="w-4 h-4" /> Agendar Consulta Gratuita
    </a>
  </div>
)

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  // Lenis smooth scroll + GSAP ScrollTrigger sync
  useEffect(() => {
    let lenis: any
    Promise.all([
      import('lenis').then((m: any) => m.default ?? m),
      import('gsap/ScrollTrigger').then((m: any) => m.ScrollTrigger),
    ]).then(([Lenis, ScrollTrigger]: any[]) => {
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

  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-1)' }}>
      <Navbar />
      <main>
        <HeroSection />
        <HeroScrollText />
        <ProceduresSlider />
        <DifferentiatorsSection />
        <TestimonialsSection />
        <FaqAccordion />
        <BookingSection />
      </main>
      <Footer />
      <WhatsAppButton />
      <StickyMobileCTA />
    </div>
  )
}
