import { useState, useEffect } from 'react'

// Hook compartido de media queries. `ssrDefault` define el valor del
// pre-render y del primer render en cliente: cada consumidor debe elegirlo
// igual al que hoy usa para no romper la paridad de hidratación.
export function useMediaQuery(query: string, ssrDefault = false): boolean {
  const [matches, setMatches] = useState(ssrDefault)
  useEffect(() => {
    const mq = window.matchMedia(query)
    setMatches(mq.matches)
    const fn = (e: MediaQueryListEvent) => setMatches(e.matches)
    mq.addEventListener('change', fn)
    return () => mq.removeEventListener('change', fn)
  }, [query])
  return matches
}

export function usePrefersReducedMotion(): boolean {
  return useMediaQuery('(prefers-reduced-motion: reduce)', false)
}
