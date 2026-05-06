import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { getSeoForRoute, getHeadElements } from '../lib/seo'

const MANAGED_ATTR = 'data-route-seo'

const removeManaged = () => {
  document.querySelectorAll(`head [${MANAGED_ATTR}]`).forEach((el) => el.remove())
}

// El plugin de pre-render inyecta los meta correctos por ruta en build.
// Este componente cubre navegación SPA: cuando cambia pathname sin recarga,
// reescribe document.title + meta tags del <head>.
export function RouteSeo() {
  const { pathname } = useLocation()

  useEffect(() => {
    if (typeof document === 'undefined') return
    document.title = getSeoForRoute(pathname).title

    removeManaged()
    for (const el of getHeadElements(pathname)) {
      const node = document.createElement(el.type)
      node.setAttribute(MANAGED_ATTR, '')
      for (const [key, val] of Object.entries(el.props)) {
        node.setAttribute(key, val)
      }
      if (el.children) node.textContent = el.children
      document.head.appendChild(node)
    }

    return removeManaged
  }, [pathname])

  return null
}
