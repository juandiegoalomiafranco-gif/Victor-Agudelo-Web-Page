import { useEffect, useRef } from 'react'
import { ChevronsLeftRight } from 'lucide-react'

import type { Foto } from '../../lib/casos'

interface BeforeAfterSliderProps {
  antes: Foto
  despues: Foto
  altAntes: string
  altDespues: string
  /** Atributo `sizes` de las imágenes (elige entre la versión de 600 y 1000px). */
  sizes?: string
  /** Pequeño vaivén de la línea la primera vez que entra en pantalla. */
  hint?: boolean
  /** Carga inmediata (primer comparador visible) en lugar de lazy. */
  eager?: boolean
}

const clamp = (v: number) => Math.min(100, Math.max(0, v))

// Comparador antes/después. Antes a la izquierda, después a la derecha.
// - Mouse: clic en cualquier punto (la línea se desliza ahí) y arrastre.
// - Táctil: arrastre horizontal mueve la línea; el gesto vertical sigue
//   siendo scroll de la página (touch-action: pan-y). Un toque la lleva ahí.
// - Teclado: flechas, Re Pág/Av Pág, Inicio/Fin.
// La posición vive en una CSS var (--ba-pos) para no re-renderizar por frame.
export function BeforeAfterSlider({
  antes, despues, altAntes, altDespues,
  sizes = '(max-width: 767px) 100vw, 560px',
  hint = true, eager = false,
}: BeforeAfterSliderProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const posRef = useRef(50)
  const hintRaf = useRef<number | null>(null)
  const interacted = useRef(false)
  const drag = useRef<{ id: number; type: string; x: number; y: number; moved: boolean } | null>(null)

  const setPos = (p: number, animate = false) => {
    const el = rootRef.current
    if (!el) return
    posRef.current = clamp(p)
    el.classList.toggle('is-animating', animate)
    el.style.setProperty('--ba-pos', `${posRef.current}%`)
    el.setAttribute('aria-valuenow', String(Math.round(posRef.current)))
  }

  const pctFromEvent = (clientX: number) => {
    const rect = rootRef.current!.getBoundingClientRect()
    return ((clientX - rect.left) / rect.width) * 100
  }

  const stopHint = () => {
    interacted.current = true
    if (hintRaf.current !== null) cancelAnimationFrame(hintRaf.current)
    hintRaf.current = null
  }

  // Animación de invitación: 50 → 62 → 38 → 50, una sola vez al entrar en pantalla.
  useEffect(() => {
    const el = rootRef.current
    if (!el || !hint) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const KEYS = [50, 62, 38, 50]
    const DUR = 1600
    const ease = (t: number) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2)
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      observer.disconnect()
      if (interacted.current) return
      const start = performance.now() + 350
      const step = (now: number) => {
        if (interacted.current) return
        const t = Math.min(Math.max((now - start) / DUR, 0), 1)
        const seg = Math.min(Math.floor(t * (KEYS.length - 1)), KEYS.length - 2)
        const local = t * (KEYS.length - 1) - seg
        setPos(KEYS[seg] + (KEYS[seg + 1] - KEYS[seg]) * ease(local))
        if (t < 1) hintRaf.current = requestAnimationFrame(step)
        else hintRaf.current = null
      }
      hintRaf.current = requestAnimationFrame(step)
    }, { threshold: 0.6 })
    observer.observe(el)
    return () => {
      observer.disconnect()
      if (hintRaf.current !== null) cancelAnimationFrame(hintRaf.current)
    }
  }, [hint])

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return
    stopHint()
    drag.current = { id: e.pointerId, type: e.pointerType, x: e.clientX, y: e.clientY, moved: false }
    if (e.pointerType === 'mouse') {
      // Con mouse el clic lleva la línea al punto y luego se puede arrastrar.
      e.currentTarget.setPointerCapture(e.pointerId)
      setPos(pctFromEvent(e.clientX), true)
    }
  }

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const d = drag.current
    if (!d || d.id !== e.pointerId) return
    if (d.type !== 'mouse' && !d.moved) {
      // Táctil: solo tomamos el gesto si es claramente horizontal; si es
      // vertical el navegador ya lo convirtió en scroll (pointercancel).
      const dx = Math.abs(e.clientX - d.x), dy = Math.abs(e.clientY - d.y)
      if (dx < 6 || dx < dy) return
      e.currentTarget.setPointerCapture(e.pointerId)
    }
    d.moved = true
    setPos(pctFromEvent(e.clientX))
  }

  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    const d = drag.current
    if (!d || d.id !== e.pointerId) return
    if (d.type !== 'mouse' && !d.moved) setPos(pctFromEvent(e.clientX), true) // toque
    drag.current = null
  }

  const onPointerCancel = () => { drag.current = null }

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const steps: Record<string, number> = { ArrowLeft: -5, ArrowDown: -5, ArrowRight: 5, ArrowUp: 5, PageDown: -20, PageUp: 20 }
    let next: number | null = null
    if (e.key in steps) next = posRef.current + steps[e.key]
    else if (e.key === 'Home') next = 0
    else if (e.key === 'End') next = 100
    if (next === null) return
    e.preventDefault()
    stopHint()
    setPos(next, true)
  }

  const img = (f: Foto, alt: string, className: string) => (
    <img
      className={className}
      src={f.src}
      srcSet={`${f.srcSm} 600w, ${f.src} 1000w`}
      sizes={sizes}
      alt={alt}
      width={1000}
      height={1250}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      draggable={false}
    />
  )

  return (
    <div
      ref={rootRef}
      className="ba-slider"
      role="slider"
      tabIndex={0}
      aria-label="Comparar antes y después: desliza para ver el cambio"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={50}
      aria-valuetext="Porcentaje visible de la foto de después"
      style={{ '--ba-pos': '50%' } as React.CSSProperties}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerCancel}
      onKeyDown={onKeyDown}
      onTransitionEnd={() => rootRef.current?.classList.remove('is-animating')}
    >
      {img(antes, altAntes, 'ba-slider__img')}
      {img(despues, altDespues, 'ba-slider__img ba-slider__after')}

      <span className="ba-slider__chip ba-slider__chip--antes" aria-hidden="true">Antes</span>
      <span className="ba-slider__chip ba-slider__chip--despues" aria-hidden="true">Después</span>

      <div className="ba-slider__handle" aria-hidden="true">
        <span className="ba-slider__knob">
          <ChevronsLeftRight style={{ width: 20, height: 20 }} />
        </span>
      </div>
    </div>
  )
}
