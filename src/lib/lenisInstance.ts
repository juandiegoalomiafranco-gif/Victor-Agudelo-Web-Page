import type Lenis from 'lenis'

// Singleton para exponer la instancia de Lenis (creada en HomePage vía import
// dinámico) a otros módulos, p. ej. el Navbar, que necesitan enrutar clicks en
// anclas internas (#hash) a través de Lenis en lugar de dejar que compitan el
// scroll nativo (`scroll-behavior: smooth` de index.css) y el rAF de Lenis.
let instance: Lenis | null = null

export const setLenis = (l: Lenis | null) => {
  instance = l
}

export const getLenis = () => instance
