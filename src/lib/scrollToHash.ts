import { getLenis } from './lenisInstance'

// Mismo offset que usa el interceptor de anclas del inicio (App.tsx) para
// que la sección no quede tapada por la píldora flotante del Navbar.
const NAV_OFFSET = -80

/**
 * Hace scroll suave hasta el elemento con id `hash`, reintentando durante
 * unos frames mientras la sección o Lenis terminan de montar (necesario
 * justo después de navegar a otra ruta).
 */
export function scrollToHash(hash: string, maxFrames = 90) {
  let frame = 0
  const attempt = () => {
    const target = document.getElementById(hash)
    const lenis = getLenis()
    // Mientras el overlay del menú móvil está abierto, el body queda fijado
    // (scroll-lock del Navbar) y la página no puede desplazarse: esperamos.
    const bodyLocked = document.body.style.position === 'fixed'
    if (target && lenis && !bodyLocked) {
      // El scroll-lock colapsa la altura del documento y Lenis recorta el
      // destino a su límite cacheado; recalculamos antes de desplazarnos.
      lenis.resize?.()
      lenis.scrollTo(target, { offset: NAV_OFFSET })
      return
    }
    // Si la sección ya existe pero Lenis no llegó (falló su carga o la página
    // no lo usa), caemos al scroll nativo tras darle un margen razonable.
    if (target && !bodyLocked && frame >= 30) {
      window.scrollTo({
        top: target.getBoundingClientRect().top + window.scrollY + NAV_OFFSET,
        behavior: 'smooth',
      })
      return
    }
    if (frame++ < maxFrames) requestAnimationFrame(attempt)
  }
  requestAnimationFrame(attempt)
}
