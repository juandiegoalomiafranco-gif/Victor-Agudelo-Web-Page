import { CONTACT } from './contact'
import { PROCEDIMIENTOS } from './procedimientos'
import { FAQ_SCHEMA_ENTRIES } from './faqs'

// SEO source of truth: por ruta. Consumido por RouteSeo.tsx en cliente y por
// el script de pre-render en build (src/entry-prerender.tsx).

export const SITE_URL = 'https://www.drvictoragudelo.com'
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.jpg`
export const ROUTES_TO_PRERENDER = [
  '/',
  '/rinoplastia',
  '/procedimientos',
  '/testimonios',
  '/preguntas-frecuentes',
  '/sobre-el-dr-agudelo',
  '/privacidad',
  ...PROCEDIMIENTOS.map(p => p.path),
] as const

export type SeoData = {
  title: string
  description: string
  canonical: string
  ogTitle?: string
  ogDescription?: string
  ogImage: string
  noindex?: boolean
  jsonLd: object[]
}

export type HeadElementType = 'meta' | 'link' | 'script'

export type HeadElement = {
  type: HeadElementType
  props: Record<string, string>
  children?: string
}

const breadcrumb = (items: { name: string; url: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((it, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: it.name,
    item: it.url,
  })),
})

const HOME_BUSINESS_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': ['Physician', 'MedicalBusiness'],
  name: 'Dr. Víctor Manuel Agudelo',
  description:
    'Especialista en rinoplastia estética y funcional en Cali, Colombia. Más de 20 años de experiencia en rinoplastia primaria, secundaria, ultrasónica y septoplastia.',
  medicalSpecialty: [
    'Otorrinolaringología',
    'Cirugía Plástica Facial',
    'Rinoplastia',
    'Rinoplastia Ultrasónica',
    'Septoplastia',
  ],
  url: `${SITE_URL}/`,
  telephone: CONTACT.phoneDisplay.replace(/\s/g, ''),
  email: CONTACT.email,
  image: DEFAULT_OG_IMAGE,
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Av. 4 Norte # 14-38, Consultorio 302',
    addressLocality: 'Cali',
    addressRegion: 'Valle del Cauca',
    postalCode: '760046',
    addressCountry: 'CO',
  },
  geo: { '@type': 'GeoCoordinates', latitude: '3.4577162', longitude: '-76.5321486' },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '08:00',
      closes: '18:00',
    },
  ],
  priceRange: '$$',
  currenciesAccepted: 'COP',
  paymentAccepted: 'Efectivo, Tarjeta de crédito, Transferencia bancaria',
  areaServed: { '@type': 'City', name: 'Cali', addressCountry: 'CO' },
  sameAs: [CONTACT.instagram, CONTACT.facebook],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Procedimientos de Rinoplastia',
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'MedicalProcedure', name: 'Rinoplastia Primaria' } },
      { '@type': 'Offer', itemOffered: { '@type': 'MedicalProcedure', name: 'Rinoplastia Secundaria' } },
      { '@type': 'Offer', itemOffered: { '@type': 'MedicalProcedure', name: 'Rinoplastia Ultrasónica' } },
      { '@type': 'Offer', itemOffered: { '@type': 'MedicalProcedure', name: 'Septoplastia' } },
      { '@type': 'Offer', itemOffered: { '@type': 'MedicalProcedure', name: 'Mentoplastia' } },
    ],
  },
}

const PHYSICIAN_REF = {
  '@type': 'Physician',
  name: 'Dr. Víctor Manuel Agudelo',
  url: `${SITE_URL}/`,
}

const procedure = (name: string, description: string, bodyLocation: string) => ({
  '@context': 'https://schema.org',
  '@type': 'MedicalProcedure',
  name,
  description,
  bodyLocation,
  procedureType: 'https://schema.org/SurgicalProcedure',
  performer: PHYSICIAN_REF,
  areaServed: { '@type': 'City', name: 'Cali', addressCountry: 'CO' },
})

const faqPage = (faqs: { q: string; a: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(({ q, a }) => ({
    '@type': 'Question',
    name: q,
    acceptedAnswer: { '@type': 'Answer', text: a },
  })),
})

const ROUTES: Record<string, SeoData> = {
  '/': {
    title: 'Dr. Víctor Agudelo — Rinoplastia Natural en Cali | Cirujano Especialista',
    description:
      'Cirujano especialista en rinoplastia en Cali con 20+ años de experiencia. Técnica ultrasónica piezoeléctrica. Rinoplastia estética, afrolatina y secundaria. Resultados 100% naturales. Evaluación gratuita.',
    canonical: `${SITE_URL}/`,
    ogTitle: 'Dr. Víctor Agudelo — Rinoplastia en Cali',
    ogDescription:
      'Cirujano especialista con 20+ años. Resultados naturales, acompañamiento postoperatorio personal.',
    ogImage: DEFAULT_OG_IMAGE,
    jsonLd: [HOME_BUSINESS_SCHEMA],
  },

  '/rinoplastia': {
    title: 'Tipos de Rinoplastia en Cali — Estética, Afrolatina y Secundaria | Dr. Agudelo',
    description:
      'Rinoplastia estética, afrolatina y secundaria en Cali. Técnica ultrasónica piezoeléctrica. 200+ casos documentados. Evaluación gratuita con el Dr. Víctor Agudelo.',
    canonical: `${SITE_URL}/rinoplastia`,
    ogImage: DEFAULT_OG_IMAGE,
    jsonLd: [
      breadcrumb([
        { name: 'Inicio', url: `${SITE_URL}/` },
        { name: 'Rinoplastia', url: `${SITE_URL}/rinoplastia` },
      ]),
      procedure(
        'Rinoplastia Estética',
        'Modificación de forma, tamaño y proporciones de la nariz para armonizar con el resto del rostro. Técnica estructural con abordaje abierto y ultrasonido piezoeléctrico para modificación ósea.',
        'Nariz',
      ),
      procedure(
        'Rinoplastia Afrolatina',
        'Técnica adaptada a narices con características afrolatinas. Preserva la identidad étnica del paciente mientras logra mayor armonía facial.',
        'Nariz',
      ),
      procedure(
        'Rinoplastia Secundaria',
        'Cirugía de revisión para pacientes con resultados insatisfactorios de una rinoplastia previa. Corrige deformidades, asimetrías y problemas funcionales.',
        'Nariz',
      ),
    ],
  },

  '/procedimientos': {
    title:
      'Procedimientos Faciales en Cali — Mentoplastia, Otoplastia, Blefaroplastia | Dr. Agudelo',
    description:
      'Cirugía facial en Cali: mentoplastia, otoplastia, blefaroplastia y tratamientos láser CO2. Cirujano plástico facial certificado con 20+ años. Consulta gratuita.',
    canonical: `${SITE_URL}/procedimientos`,
    ogImage: DEFAULT_OG_IMAGE,
    jsonLd: [
      breadcrumb([
        { name: 'Inicio', url: `${SITE_URL}/` },
        { name: 'Procedimientos', url: `${SITE_URL}/procedimientos` },
      ]),
      procedure(
        'Mentoplastia',
        'Cirugía de mentón para modificar proyección o forma y mejorar el equilibrio del perfil facial. Frecuentemente combinada con rinoplastia.',
        'Mentón',
      ),
      procedure(
        'Otoplastia',
        'Corrección de orejas prominentes, asimétricas o con forma irregular. Aplicable desde los 6 años. Cicatrices ocultas detrás de la oreja.',
        'Oreja',
      ),
      procedure(
        'Blefaroplastia',
        'Rejuvenecimiento de párpados superiores e inferiores eliminando exceso de piel y grasa. Cicatrices invisibles en pliegues naturales.',
        'Párpado',
      ),
      procedure(
        'Reducción de Papada con Láser',
        'Eliminación de grasa en la zona del cuello y papada con tecnología láser. Sin incisiones grandes, mínima recuperación.',
        'Cuello',
      ),
      procedure(
        'Procedimientos Mínimamente Invasivos',
        'Toxina botulínica, ácido hialurónico y láser CO₂ para rejuvenecimiento facial sin cirugía mayor.',
        'Cara',
      ),
    ],
  },

  '/testimonios': {
    title: 'Testimonios de Pacientes — Rinoplastia en Cali | Dr. Víctor Agudelo',
    description:
      'Testimonios reales de pacientes del Dr. Víctor Agudelo en Cali: rinoplastia estética, secundaria y afrolatina. Experiencias verificadas en RealSelf de quienes ya pasaron por esta decisión.',
    canonical: `${SITE_URL}/testimonios`,
    ogTitle: 'Testimonios de pacientes — Dr. Víctor Agudelo',
    ogDescription:
      'Experiencias reales de pacientes de rinoplastia en Cali, con sus propias palabras.',
    ogImage: DEFAULT_OG_IMAGE,
    jsonLd: [
      breadcrumb([
        { name: 'Inicio', url: `${SITE_URL}/` },
        { name: 'Testimonios', url: `${SITE_URL}/testimonios` },
      ]),
    ],
  },

  '/preguntas-frecuentes': {
    title: 'Preguntas Frecuentes sobre Rinoplastia en Cali | Dr. Víctor Agudelo',
    description:
      'Resolvemos las dudas más comunes sobre rinoplastia y cirugía facial: costos, consulta, cirugía, recuperación, resultados y riesgos. Respuestas honestas del Dr. Víctor Agudelo en Cali.',
    canonical: `${SITE_URL}/preguntas-frecuentes`,
    ogTitle: 'Preguntas frecuentes — Rinoplastia y cirugía facial | Dr. Agudelo',
    ogDescription:
      'Las preguntas que más nos hacen los pacientes, respondidas en detalle y con honestidad clínica.',
    ogImage: DEFAULT_OG_IMAGE,
    jsonLd: [
      breadcrumb([
        { name: 'Inicio', url: `${SITE_URL}/` },
        { name: 'Preguntas frecuentes', url: `${SITE_URL}/preguntas-frecuentes` },
      ]),
      faqPage(FAQ_SCHEMA_ENTRIES),
    ],
  },

  '/sobre-el-dr-agudelo': {
    title: 'Sobre el Dr. Víctor Agudelo — Cirujano de Rinoplastia en Cali',
    description:
      'Conoce al Dr. Víctor Manuel Agudelo: otorrinolaringólogo y cirujano plástico facial con 22 años de experiencia y más de 1.800 cirugías. Formación, filosofía y enfoque de rinoplastia natural en Cali.',
    canonical: `${SITE_URL}/sobre-el-dr-agudelo`,
    ogTitle: 'Sobre el Dr. Víctor Agudelo — Especialista en Rinoplastia',
    ogDescription:
      'Otorrinolaringólogo y cirujano plástico facial con 22 años de experiencia. Rinoplastia natural en Cali.',
    ogImage: DEFAULT_OG_IMAGE,
    jsonLd: [
      breadcrumb([
        { name: 'Inicio', url: `${SITE_URL}/` },
        { name: 'Sobre el Dr. Agudelo', url: `${SITE_URL}/sobre-el-dr-agudelo` },
      ]),
      {
        '@context': 'https://schema.org',
        '@type': 'Physician',
        name: 'Dr. Víctor Manuel Agudelo',
        jobTitle: 'Otorrinolaringólogo y Cirujano Plástico Facial',
        url: `${SITE_URL}/sobre-el-dr-agudelo`,
        image: DEFAULT_OG_IMAGE,
        medicalSpecialty: [
          'Otorrinolaringología',
          'Cirugía Plástica Facial',
          'Rinoplastia',
        ],
        alumniOf: [
          { '@type': 'EducationalOrganization', name: 'Universidad del Valle' },
          { '@type': 'EducationalOrganization', name: 'Universidad San Martín' },
        ],
        memberOf: [
          { '@type': 'Organization', name: 'Asociación Colombiana de Otorrinolaringología (ACORL)' },
          { '@type': 'Organization', name: 'Sociedad Colombiana de Cirugía Plástica Facial y Rinología (SCCPFR)' },
        ],
        knowsLanguage: ['es', 'en'],
        worksFor: {
          '@type': 'MedicalBusiness',
          name: 'Clínica de Otorrinolaringología y Cirugía Plástica',
          address: { '@type': 'PostalAddress', addressLocality: 'Cali', addressCountry: 'CO' },
        },
        sameAs: [
          'https://www.realself.com/dr/victor-manuel-agudelo-cali-colombia',
          'https://cirugiaplasticafacial.org/directorio-medico/victor-manuel-agudelo-ramos/',
          'https://acorl.org.co/directorio-otorrino/interno/8-VICTOR-MANUEL-AGUDELO-RAMOS',
          'https://www.instagram.com/doctorvictoragudelo/',
          'https://www.tiktok.com/@dr.victor.agudelo',
        ],
      },
    ],
  },

  '/privacidad': {
    title: 'Política de Privacidad | Dr. Víctor Agudelo',
    description:
      'Política de privacidad y tratamiento de datos personales del consultorio del Dr. Víctor Manuel Agudelo en Cali, Colombia.',
    canonical: `${SITE_URL}/privacidad`,
    ogImage: DEFAULT_OG_IMAGE,
    noindex: true,
    jsonLd: [
      breadcrumb([
        { name: 'Inicio', url: `${SITE_URL}/` },
        { name: 'Privacidad', url: `${SITE_URL}/privacidad` },
      ]),
    ],
  },

  // ─── Páginas individuales por procedimiento (generadas desde procedimientos.ts) ──
  ...Object.fromEntries(
    PROCEDIMIENTOS.map(p => [
      p.path,
      {
        title: p.seo.title,
        description: p.seo.description,
        canonical: `${SITE_URL}${p.path}`,
        ogImage: DEFAULT_OG_IMAGE,
        jsonLd: [
          breadcrumb([
            { name: 'Inicio',      url: `${SITE_URL}/` },
            { name: 'Rinoplastia', url: `${SITE_URL}/rinoplastia` },
            { name: p.nombre,      url: `${SITE_URL}${p.path}` },
          ]),
          procedure(p.nombre, p.seo.procedureDescription, p.seo.bodyLocation),
          faqPage(p.faqs),
        ],
      } satisfies SeoData,
    ]),
  ),
}

const buildElements = (seo: SeoData): HeadElement[] => {
  const ogTitle = seo.ogTitle ?? seo.title
  const ogDesc = seo.ogDescription ?? seo.description
  const els: HeadElement[] = [
    { type: 'meta', props: { name: 'description', content: seo.description } },
    { type: 'link', props: { rel: 'canonical', href: seo.canonical } },
    { type: 'meta', props: { property: 'og:type', content: 'website' } },
    { type: 'meta', props: { property: 'og:url', content: seo.canonical } },
    { type: 'meta', props: { property: 'og:title', content: ogTitle } },
    { type: 'meta', props: { property: 'og:description', content: ogDesc } },
    { type: 'meta', props: { property: 'og:image', content: seo.ogImage } },
    { type: 'meta', props: { property: 'og:locale', content: 'es_CO' } },
    { type: 'meta', props: { property: 'og:site_name', content: 'Dr. Víctor Manuel Agudelo' } },
    { type: 'meta', props: { name: 'twitter:card', content: 'summary_large_image' } },
    { type: 'meta', props: { name: 'twitter:url', content: seo.canonical } },
    { type: 'meta', props: { name: 'twitter:title', content: ogTitle } },
    { type: 'meta', props: { name: 'twitter:description', content: ogDesc } },
    { type: 'meta', props: { name: 'twitter:image', content: seo.ogImage } },
  ]
  if (seo.noindex) {
    els.push({ type: 'meta', props: { name: 'robots', content: 'noindex, follow' } })
  }
  for (const ld of seo.jsonLd) {
    els.push({
      type: 'script',
      props: { type: 'application/ld+json' },
      children: JSON.stringify(ld),
    })
  }
  return els
}

// Pre-construido y congelado al cargar el módulo. JSON.stringify de cada
// schema corre una sola vez, no en cada navegación SPA.
const ELEMENTS_CACHE: Record<string, HeadElement[]> = Object.fromEntries(
  Object.entries(ROUTES).map(([path, seo]) => [path, buildElements(seo)]),
)

export const getSeoForRoute = (pathname: string): SeoData =>
  ROUTES[pathname] ?? ROUTES['/']

export const getHeadElements = (pathname: string): HeadElement[] =>
  ELEMENTS_CACHE[pathname] ?? ELEMENTS_CACHE['/']
