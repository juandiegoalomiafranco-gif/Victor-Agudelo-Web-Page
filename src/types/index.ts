export interface Testimonial {
  id: string
  name: string
  procedure: string
  text: string
  initials: string
  verifiedSource?: 'realself' | 'google' | 'instagram'
  /** 1–5 estrellas. Presente en reseñas con calificación explícita (Google). */
  rating?: 1 | 2 | 3 | 4 | 5
  /** Fecha de publicación en formato ISO (YYYY-MM-DD). Usada en Review schema. */
  date?: string
}
