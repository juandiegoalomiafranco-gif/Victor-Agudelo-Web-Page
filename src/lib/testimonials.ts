import type { Testimonial } from '../types/index'

// Calificación y enlace públicos del perfil de Google Business. Fuente única de
// verdad: consumidos por la sección de testimonios del home y por /testimonios.
// El rating es el promedio real mostrado en Google (sin conteo fijo por decisión
// del titular). No se emite aggregateRating en JSON-LD sin reviewCount válido.
export const GOOGLE_RATING = 4.3
export const GOOGLE_REVIEW_URL = 'https://g.page/r/CZQN1D4C-DJWEAE/review'

export const TESTIMONIALS: Testimonial[] = [
  // ─── Reseñas verificadas de Google (5★, texto original del paciente) ──────────
  { id: 'g1', name: 'Aaron Regalado', procedure: 'Rinoplastia', initials: 'AR', verifiedSource: 'google', rating: 5, date: '2025-06-09', text: 'I had a wonderful experience with Dr. Agudelo, who was able to speak in Spanish and English. The process was great, from before I went to the city (showing me in a video call how my nose would potentially look and making any changes I wanted beforehand), to the actual procedure itself and the recovery house that they recommended. Also, pretty minimal swelling, I\'ll say. Only thing is, for any rhinoplasty, keep in mind that the first few nights after the procedure will be hard to get through, and that your nose will look pretty swollen for a few weeks.' },
  { id: 'g2', name: 'Nicola Di Chiara', procedure: 'Cirugía facial', initials: 'ND', verifiedSource: 'google', rating: 5, date: '2022-05-31', text: 'I had an awesome experience with Dr Agudelo. He is honest with pricing and in giving the possible outcome of the surgery. He took his time listening to what I was concerned about and gave me all the answers. He really takes in consideration to what you like and what you wouldn\'t want as a result of your surgery. Dr Agudelo other than being extremely skilled is also very kind and professional. I would suggest him to everybody in my family and to all of you reading this review.' },
  { id: 'g3', name: 'Anny', procedure: 'Rinoplastia', initials: 'A', verifiedSource: 'google', rating: 5, date: '2022-05-27', text: 'El mejor doctor, llenó todas mis expectativas. Me encantó la atención y mi nariz quedó perfecta, lo recomiendo al 100%.' },
  { id: 'g4', name: 'NHBS', procedure: 'Cirugía facial', initials: 'N', verifiedSource: 'google', rating: 5, date: '2021-10-29', text: 'Excellent Dr. Honest, professional, kind and great quality of work. I\'d recommend him to anyone.' },

  // ─── Reseñas publicadas por pacientes en RealSelf ─────────────────────────────
  { id: '1', name: 'Paciente, Cali', procedure: 'Rinoplastia', initials: 'P1', verifiedSource: 'realself', text: 'Consulté con otros dos médicos antes y en ninguno me dedicaron tiempo real. Con el Dr. Agudelo fue completamente diferente — me escuchó, me mostró casos similares y fui a la cirugía con expectativas claras. El resultado es exactamente lo que quería: natural.' },
  { id: '2', name: 'Paciente, Cali', procedure: 'Rinoplastia', initials: 'P2', verifiedSource: 'realself', text: 'Lo que más me sorprendió fue el seguimiento postoperatorio. El doctor me llamaba personalmente para saber cómo estaba. Nunca sentí que me dejaron sola después de la cirugía.' },
  { id: '3', name: 'Paciente, Cali', procedure: 'Rinoplastia', initials: 'P3', verifiedSource: 'realself', text: 'Tenía mucho miedo de quedar con la nariz muy levantada. Desde la primera consulta el doctor fue claro: "El objetivo es que no se note que estuviste operada." Y así quedé.' },
  { id: '4', name: 'Paciente, Cali', procedure: 'Rinoplastia Secundaria', initials: 'P4', verifiedSource: 'realself', text: 'Venía de una cirugía previa que no me dejó satisfecha. Busqué al Dr. Agudelo porque encontré sus casos en RealSelf y eran los más naturales que había visto. Hoy, un año después, no puedo estar más feliz con el resultado.' },
]
