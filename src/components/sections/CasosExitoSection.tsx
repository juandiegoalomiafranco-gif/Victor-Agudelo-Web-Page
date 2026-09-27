import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react'

import { BeforeAfterSlider } from '../ui/BeforeAfterSlider'
import { CASOS, VISTA_LABEL, altCaso, tipoLabel, tiposConCasos } from '../../lib/casos'

const pad = (n: number) => String(n).padStart(2, '0')

// Casos de éxito en el inicio: comparador antes/después con navegación entre
// casos (flechas, barra de progreso y miniaturas). Sin autoplay y sin swipe
// para cambiar de caso: el gesto horizontal pertenece al comparador.
export const CasosExitoSection = () => {
  const tipos = tiposConCasos()
  const [tipo, setTipo] = useState<string | null>(null) // null = todos
  const casos = useMemo(() => (tipo ? CASOS.filter(c => c.procedimiento === tipo) : CASOS), [tipo])
  const [idx, setIdx] = useState(0)
  const [vistaIdx, setVistaIdx] = useState(0)

  const caso = casos[Math.min(idx, casos.length - 1)]
  const vista = caso.vistas[Math.min(vistaIdx, caso.vistas.length - 1)]
  const nombreTipo = tipoLabel(caso.procedimiento)
  const n = idx + 1

  const go = (next: number) => {
    setIdx((next + casos.length) % casos.length)
    setVistaIdx(0)
  }

  // Precarga la primera vista de los casos vecinos para que el cambio sea instantáneo.
  useEffect(() => {
    const small = window.matchMedia('(max-width: 860px)').matches
    for (const d of [1, -1]) {
      const c = casos[(idx + d + casos.length) % casos.length]
      for (const f of [c.vistas[0].antes, c.vistas[0].despues]) {
        const img = new Image()
        img.src = small ? f.srcSm : f.src
      }
    }
  }, [idx, casos])

  const reduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

  return (
    <section id="casos-exito" className="cx-section" aria-labelledby="casos-exito-title">
      <div className="cx-inner cx-layout">
        <header className="cx-header">
          <p className="cx-eyebrow">Casos de éxito</p>
          <h2 id="casos-exito-title" className="cx-title section-reveal-header">
            Resultados reales, <span className="cx-title-soft">rasgos propios.</span>
          </h2>
          <p className="cx-lead">
            Desliza sobre la foto para comparar el antes y el después.
          </p>
        </header>

        <motion.div
          key={`${caso.id}-${vista.vista}`}
          className="cx-media"
          initial={reduced ? false : { opacity: 0, scale: 1.02 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <BeforeAfterSlider
            antes={vista.antes}
            despues={vista.despues}
            altAntes={altCaso(nombreTipo, n, vista.vista, 'antes')}
            altDespues={altCaso(nombreTipo, n, vista.vista, 'después')}
            sizes="(max-width: 860px) 80vw, 480px"
          />
        </motion.div>

        <div className="cx-info">
          {tipos.length > 1 && (
            <div className="cx-chips cx-filters" role="group" aria-label="Filtrar por tipo de rinoplastia">
              <button type="button" className="cx-chip" aria-pressed={tipo === null} onClick={() => { setTipo(null); setIdx(0); setVistaIdx(0) }}>
                Todos
              </button>
              {tipos.map(t => (
                <button key={t} type="button" className="cx-chip" aria-pressed={tipo === t} onClick={() => { setTipo(t); setIdx(0); setVistaIdx(0) }}>
                  {tipoLabel(t).replace(/^Rinoplastia /, '')}
                </button>
              ))}
            </div>
          )}

          <p className="cx-meta">
            Caso {pad(n)} <span aria-hidden="true">/</span> {pad(casos.length)} · {nombreTipo}
          </p>
          {caso.nota && <p className="cx-nota">{caso.nota}</p>}

          {caso.vistas.length > 1 && (
            <div className="cx-chips cx-vistas" role="group" aria-label="Elegir vista">
              {caso.vistas.map((v, i) => (
                <button key={v.vista} type="button" className="cx-chip" aria-pressed={v === vista} onClick={() => setVistaIdx(i)}>
                  {VISTA_LABEL[v.vista]}
                </button>
              ))}
            </div>
          )}

          <div className="cx-nav">
            <button type="button" className="cx-arrow" aria-label="Caso anterior" onClick={() => go(idx - 1)}>
              <ChevronLeft style={{ width: 20, height: 20 }} />
            </button>
            <div className="cx-progress" aria-hidden="true">
              {casos.map((c, i) => (
                <span key={c.id} className={i <= idx ? 'is-on' : undefined} />
              ))}
            </div>
            <button type="button" className="cx-arrow" aria-label="Caso siguiente" onClick={() => go(idx + 1)}>
              <ChevronRight style={{ width: 20, height: 20 }} />
            </button>
            <span className="cx-count" aria-hidden="true">{pad(n)} / {pad(casos.length)}</span>
          </div>

          <p className="cx-sr" aria-live="polite">
            Caso {n} de {casos.length}, {nombreTipo}, vista {VISTA_LABEL[vista.vista] === '¾' ? 'tres cuartos' : VISTA_LABEL[vista.vista].toLowerCase()}
          </p>

          <div className="cx-thumbs" role="group" aria-label="Elegir caso">
            {casos.map((c, i) => (
              <button
                key={c.id}
                type="button"
                className="cx-thumb"
                aria-pressed={i === idx}
                aria-label={`Ver caso ${i + 1}`}
                onClick={() => go(i)}
              >
                <img src={c.vistas[0].despues.srcSm} alt="" width={600} height={750} loading="lazy" decoding="async" />
              </button>
            ))}
          </div>

          <div className="cx-ctas">
            <Link to={`/rinoplastia/${caso.procedimiento}#casos`} className="cx-cta cx-cta--ghost">
              Ver todos los casos <ChevronRight style={{ width: 16, height: 16 }} aria-hidden="true" />
            </Link>
            <a href="#agendar" className="cx-cta cx-cta--solid">
              <Calendar style={{ width: 16, height: 16 }} aria-hidden="true" /> Quiero mi evaluación
            </a>
          </div>
          <p className="cx-legal">
            Imágenes publicadas con el consentimiento de cada paciente. Los resultados pueden variar según cada caso.
          </p>
        </div>
      </div>
    </section>
  )
}
