import type React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { scrollToHash } from '../lib/scrollToHash'

interface HashLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  /** Destino interno con ancla, p. ej. "/#agendar". */
  to: string
}

// Enlace a una sección de otra página (o de la actual) que navega dentro de
// la SPA y hace scroll suave hasta el ancla. Reemplaza los <a href="/#…">
// nativos, que recargaban la página completa y saltaban de golpe al ancla.
export function HashLink({ to, onClick, children, ...rest }: HashLinkProps) {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const hashIdx = to.indexOf('#')
  const path = hashIdx === -1 ? to : to.slice(0, hashIdx) || '/'
  const hash = hashIdx === -1 ? '' : to.slice(hashIdx + 1)

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e)
    if (e.defaultPrevented) return
    // Clicks modificados (abrir en pestaña nueva, etc.) siguen el flujo nativo.
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return
    e.preventDefault()
    if (pathname === path) {
      if (hash) scrollToHash(hash)
    } else {
      navigate(hash ? `${path}#${hash}` : path)
    }
  }

  return (
    <a href={to} {...rest} onClick={handleClick}>
      {children}
    </a>
  )
}
