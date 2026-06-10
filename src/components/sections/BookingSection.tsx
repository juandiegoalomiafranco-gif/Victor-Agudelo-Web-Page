import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Calendar, MessageSquare } from 'lucide-react'

import { CONTACT } from '../../lib/contact'
import { COPY } from '../../lib/copy'

export const BookingSection = () => {
  const [form, setForm] = useState({ name: '', phone: '', email: '', procedimiento: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [touched, setTouched] = useState<Record<string, boolean>>({})

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }))

  const markTouched = (k: string) => () => setTouched(t => ({ ...t, [k]: true }))

  const errors = {
    name: !form.name,
    email: !form.email,
    phone: !form.phone,
  }

  const handleSubmit = async () => {
    setTouched({ name: true, email: true, phone: true })
    if (errors.name || errors.email || errors.phone) return
    setStatus('loading')
    try {
      const res = await fetch('https://n8n.srv1559791.hstgr.cloud/webhook/agudelo-lead-capture', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre: form.name,
          correo: form.email,
          telefono: form.phone,
          procedimiento: form.procedimiento,
          mensaje: form.message,
        }),
      })
      if (!res.ok) throw new Error('server error')
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

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
    <section id="agendar" className="py-14 md:py-28" style={{ background: 'var(--color-1)' }}>
      <div className="max-w-3xl mx-auto px-4 md:px-6">
        <div className="text-center mb-14">
          <p className="text-xs uppercase tracking-[0.2em] mb-3" style={{ color: 'var(--color-9)', fontWeight: 600 }}>
            Contacto
          </p>
          <h2 className="text-4xl md:text-5xl mb-4 section-reveal-header" style={{ color: 'var(--color-4)', fontWeight: 700 }}>
            Da el primer paso —<br />
            <span style={{ fontWeight: 400, color: 'var(--color-5)' }}>sin compromiso.</span>
          </h2>
          <p className="text-sm" style={{ color: 'rgba(255,255,255,0.65)', fontWeight: 400 }}>
            Déjanos tus datos para una evaluación inicial.<br />
            El Dr. Agudelo revisa cada caso personalmente.
          </p>
        </div>

        <div className="p-5 md:p-8" style={{ background: 'rgba(255,255,255,0.04)', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.08)' }}>
          <AnimatePresence mode="wait">
            {status === 'success' ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-8"
              >
                <div style={{
                  width: '52px', height: '52px', borderRadius: '50%',
                  background: '#2D4A3E', display: 'flex', alignItems: 'center',
                  justifyContent: 'center', margin: '0 auto 1.25rem',
                }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <p style={{ color: 'var(--color-4)', fontSize: '1.15rem', fontWeight: 600, marginBottom: '0.5rem' }}>
                  ¡Mensaje recibido!
                </p>
                <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.9rem' }}>
                  El Dr. Agudelo revisará tu caso y te contactará pronto.
                </p>
              </motion.div>
            ) : (
              <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid gap-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs uppercase tracking-wider mb-2" style={{ color: 'var(--color-5)', fontWeight: 400 }}>Nombre completo *</label>
                    <input type="text" placeholder="Ej. Ana García" value={form.name} onChange={set('name')} onBlur={markTouched('name')}
                      aria-invalid={touched.name && errors.name}
                      style={{ ...inputCls, borderColor: touched.name && errors.name ? 'rgba(248,113,113,0.6)' : 'rgba(255,255,255,0.12)' }} />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider mb-2" style={{ color: 'var(--color-5)', fontWeight: 400 }}>Correo electrónico *</label>
                    <input type="email" placeholder="ana@correo.com" value={form.email} onChange={set('email')} onBlur={markTouched('email')}
                      aria-invalid={touched.email && errors.email}
                      style={{ ...inputCls, borderColor: touched.email && errors.email ? 'rgba(248,113,113,0.6)' : 'rgba(255,255,255,0.12)' }} />
                  </div>
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider mb-2" style={{ color: 'var(--color-5)', fontWeight: 400 }}>Teléfono / WhatsApp *</label>
                  <input type="tel" placeholder="+57 300 000 0000" value={form.phone} onChange={set('phone')} onBlur={markTouched('phone')}
                    aria-invalid={touched.phone && errors.phone}
                    style={{ ...inputCls, borderColor: touched.phone && errors.phone ? 'rgba(248,113,113,0.6)' : 'rgba(255,255,255,0.12)' }} />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider mb-2" style={{ color: 'var(--color-5)', fontWeight: 400 }}>Procedimiento de interés</label>
                  <select value={form.procedimiento} onChange={set('procedimiento')}
                    style={{ ...inputCls, appearance: 'none', backgroundImage: 'url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'12\' height=\'8\' viewBox=\'0 0 12 8\' fill=\'none\'><path d=\'M1 1L6 6L11 1\' stroke=\'%23ffffff80\' stroke-width=\'1.5\' stroke-linecap=\'round\'/></svg>")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center', paddingRight: '2.5rem' }}>
                    <option value="" style={{ background: '#1A1A1A' }}>Selecciona una opción</option>
                    <option value="Rinoplastia Estética" style={{ background: '#1A1A1A' }}>Rinoplastia Estética</option>
                    <option value="Rinoplastia Afrolatina" style={{ background: '#1A1A1A' }}>Rinoplastia Afrolatina</option>
                    <option value="Rinoplastia Secundaria" style={{ background: '#1A1A1A' }}>Rinoplastia Secundaria</option>
                    <option value="Mentoplastia" style={{ background: '#1A1A1A' }}>Mentoplastia</option>
                    <option value="Otoplastia" style={{ background: '#1A1A1A' }}>Otoplastia</option>
                    <option value="Blefaroplastia" style={{ background: '#1A1A1A' }}>Blefaroplastia</option>
                    <option value="Reducción de Papada" style={{ background: '#1A1A1A' }}>Reducción de Papada</option>
                    <option value="No Quirúrgicos" style={{ background: '#1A1A1A' }}>No Quirúrgicos · Toxina · Ácido</option>
                    <option value="No estoy seguro" style={{ background: '#1A1A1A' }}>Aún no estoy segura</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider mb-2" style={{ color: 'var(--color-5)', fontWeight: 400 }}>Mensaje (opcional)</label>
                  <textarea rows={3} placeholder="Cuéntanos brevemente tu caso..." value={form.message} onChange={set('message')} style={{ ...inputCls, resize: 'none' }} />
                </div>
                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.78rem', lineHeight: 1.55 }}>
                  ¿Quieres enviar fotos? Tras recibir tu solicitud te escribimos por WhatsApp para coordinar el envío seguro de imágenes.
                </p>
                {status === 'error' && (
                  <div style={{ background: 'rgba(248,113,113,0.08)', border: '1px solid rgba(248,113,113,0.25)', borderRadius: '12px', padding: '0.75rem 1rem', textAlign: 'center' }}>
                    <p style={{ color: '#fca5a5', fontSize: '0.82rem', marginBottom: '0.5rem' }}>
                      Hubo un problema al enviar. Intenta de nuevo o escríbenos directamente.
                    </p>
                    <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer"
                      style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: '#25D366', fontSize: '0.82rem', fontWeight: 600, textDecoration: 'none' }}>
                      <MessageSquare className="w-4 h-4" /> Abrir WhatsApp
                    </a>
                  </div>
                )}
                <button
                  onClick={handleSubmit}
                  disabled={status === 'loading'}
                  className="flex items-center justify-center gap-2 w-full py-4 mt-2 text-sm transition-all"
                  style={{
                    background: '#2D4A3E',
                    color: '#fff',
                    borderRadius: '100px',
                    fontWeight: 600,
                    border: 'none',
                    cursor: status === 'loading' ? 'not-allowed' : 'pointer',
                    opacity: status === 'loading' ? 0.7 : 1,
                  }}
                >
                  {status === 'loading' ? 'Enviando…' : <><Calendar className="w-4 h-4" /> {COPY.ctaPrimary}</>}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
