export interface Testimonial {
  id: string
  name: string
  procedure: string
  text: string
  initials: string
  verifiedSource?: 'realself' | 'google' | 'instagram'
}
