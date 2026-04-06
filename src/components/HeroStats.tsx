import { useEffect, useRef } from 'react'

interface StatBlock {
  label: string
  target: number
  suffix?: string
  dots: number
}

const STATS: StatBlock[] = [
  { label: 'Años de experiencia',        target: 12,  dots: 2 },
  { label: 'Procedimientos realizados',  target: 850, dots: 2 },
  { label: 'Satisfacción de pacientes',  target: 98,  suffix: '%', dots: 3 },
]

export function HeroStats() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const blocks: HTMLElement[] = Array.from(container.querySelectorAll<HTMLElement>('.stat-block'))
    const timers: ReturnType<typeof setTimeout>[] = []
    const intervals: ReturnType<typeof setInterval>[] = []
    let cycleInterval: ReturnType<typeof setInterval> | null = null

    // ── Utilities ──────────────────────────────────────────────

    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3)

    const animateNumber = (el: HTMLElement, target: number, suffix = '') => {
      if (el.dataset.animating === 'true') return
      el.dataset.animating = 'true'
      el.style.opacity = '1'
      let start: number | null = null
      const duration = 2000
      const step = (ts: number) => {
        if (!start) start = ts
        const p = Math.min((ts - start) / duration, 1)
        const v = target * easeOutCubic(p)
        el.textContent = Math.round(v).toLocaleString('es-CO') + suffix
        if (p < 1) {
          requestAnimationFrame(step)
        } else {
          el.textContent = target.toLocaleString('es-CO') + suffix
          el.dataset.animating = 'false'
        }
      }
      requestAnimationFrame(step)
    }

    const animateDots = (dots: HTMLElement[]) => {
      if (!dots.length || dots[0].dataset.looping === 'true') return
      dots.forEach(d => (d.dataset.looping = 'true'))
      let dir = 1
      let i = 0
      const tick = () => {
        dots.forEach((d, idx) => d.classList.toggle('dot-active', idx <= i))
        i += dir
        if (i >= dots.length - 1) dir = -1
        else if (i <= 0) dir = 1
        const t = setTimeout(tick, 400)
        timers.push(t)
      }
      tick()
    }

    const stopDots = (dots: HTMLElement[]) => {
      dots.forEach(d => {
        d.classList.remove('dot-active')
        delete d.dataset.looping
      })
    }

    const animateBar = (bar: HTMLElement, delay = 0) => {
      bar.style.width = '0%'
      const t = setTimeout(() => {
        bar.style.transition = 'width 1.5s ease-in-out'
        bar.style.width = '100%'
      }, delay)
      timers.push(t)
    }

    const playBlock = (block: HTMLElement) => {
      const bar    = block.querySelector<HTMLElement>('.bar_active')
      const number = block.querySelector<HTMLElement>('.stat-number')
      const dots   = Array.from(block.querySelectorAll<HTMLElement>('.stat-dot'))
      const target = Number(block.dataset.target) || 0
      const suffix = block.dataset.suffix || ''
      if (bar)    animateBar(bar)
      if (number) animateNumber(number, target, suffix)
      if (dots.length) animateDots(dots)
    }

    const resetBlock = (block: HTMLElement) => {
      stopDots(Array.from(block.querySelectorAll<HTMLElement>('.stat-dot')))
      block.style.cssText = ''
    }

    // ── Desktop: staggered entrance ─────────────────────────────

    const setupDesktop = () => {
      blocks.forEach((block, i) => {
        block.style.opacity = '0'
        block.style.transform = 'translateY(20px)'
        const t = setTimeout(() => {
          block.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out'
          block.style.opacity = '1'
          block.style.transform = 'translateY(0)'
          const t2 = setTimeout(() => playBlock(block), 500)
          timers.push(t2)
        }, i * 1200)
        timers.push(t)
      })
      return () => blocks.forEach(resetBlock)
    }

    // ── Mobile: cycle one block at a time ───────────────────────

    const setupMobile = () => {
      let index = 0
      blocks.forEach((b, i) => {
        b.style.opacity    = i === 0 ? '1' : '0'
        b.style.transition = 'opacity 0.8s ease'
        b.style.position   = 'absolute'
        b.style.top = b.style.left = b.style.right = '0'
      })
      const cycle = () => {
        blocks.forEach(b => { b.style.opacity = '0' })
        blocks[index].style.opacity = '1'
        playBlock(blocks[index])
        index = (index + 1) % blocks.length
      }
      cycle()
      cycleInterval = setInterval(cycle, 5000)
      intervals.push(cycleInterval)
      return () => blocks.forEach(resetBlock)
    }

    // ── Mode switch on resize ────────────────────────────────────

    let teardown: (() => void) | null = null
    let resizeTimer: ReturnType<typeof setTimeout> | null = null

    const applyMode = () => {
      if (teardown) { teardown(); teardown = null }
      teardown = window.innerWidth < 768 ? setupMobile() : setupDesktop()
    }

    const onResize = () => {
      if (resizeTimer) clearTimeout(resizeTimer)
      resizeTimer = setTimeout(applyMode, 200)
    }

    applyMode()
    window.addEventListener('resize', onResize)

    // ── Cleanup ──────────────────────────────────────────────────
    return () => {
      window.removeEventListener('resize', onResize)
      timers.forEach(clearTimeout)
      intervals.forEach(clearInterval)
      if (cycleInterval) clearInterval(cycleInterval)
      if (resizeTimer) clearTimeout(resizeTimer)
      if (teardown) teardown()
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="relative flex gap-8 md:gap-12"
    >
      {STATS.map((stat, i) => (
        <div
          key={i}
          className="stat-block flex-1 min-w-0"
          data-target={stat.target}
          data-suffix={stat.suffix ?? ''}
        >
          {/* Progress bar */}
          <div className="bar_hero mb-2">
            <div className="bar_active" />
          </div>

          {/* Label */}
          <p
            className="text-[11px] uppercase tracking-[0.18em] mb-2"
            style={{ color: 'var(--color-5)', fontWeight: 400 }}
          >
            {stat.label}
          </p>

          {/* Animated number */}
          <div
            className="stat-number text-4xl md:text-5xl tabular-nums"
            style={{ color: 'var(--color-4)', fontWeight: 700 }}
          >
            0{stat.suffix ?? ''}
          </div>

          {/* Oscillating dots */}
          <div className="flex gap-1.5 mt-3">
            {Array.from({ length: stat.dots }).map((_, d) => (
              <div key={d} className="stat-dot" />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
