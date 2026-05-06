# PROMPT PARA CLAUDE CODE (Antigravity) — Fix integral del sitio Dr. Víctor Agudelo

> Copia y pega este prompt completo en Claude Code dentro de Antigravity. Está diseñado para ser ejecutado en una sola sesión, pero también funciona dividiéndolo en bloques (cada `## TAREA N` es independiente).

---

## CONTEXTO DEL PROYECTO

Estás trabajando en el proyecto **"Doctor Victor Agüelo página final"**, un sitio web médico para el Dr. Víctor Manuel Agudelo, cirujano especialista en rinoplastia en Cali, Colombia.

**Stack:**
- React 18 + TypeScript + Vite
- React Router DOM (3 rutas: `/`, `/rinoplastia`, `/procedimientos`)
- `motion/react` (Framer Motion v11)
- GSAP + ScrollTrigger
- Lenis (smooth scroll)
- Tailwind CSS + estilos inline

**Archivos clave:**
- `index.html` — SEO, schema.org, fuentes
- `src/App.tsx` — HomePage + Navbar + Footer + secciones principales
- `src/components/ProceduresSlider.tsx` — Carrusel infinito de procedimientos
- `src/components/FaqAccordion.tsx` — FAQ formato chat
- `src/components/HeroStats.tsx` — Existe pero NO se usa (revisar si conviene integrarlo o eliminarlo)
- `src/pages/RinoplastiaPage.tsx` — Subpágina /rinoplastia
- `src/pages/ProcedimientosPage.tsx` — Subpágina /procedimientos
- `src/index.css` — Variables CSS globales
- `public/sitemap.xml`, `public/robots.txt`

**Tono y posicionamiento de marca (NO MODIFICAR):**
- "Naturalidad ante todo" — *"Una nariz que se ve tuya, no operada."*
- Honestidad clínica, sin promesas exageradas
- Acompañamiento personal (el doctor nunca delega)
- Tipografías: Cormorant Garamond (serif) + DM Sans (sans)
- Paleta: negro `#1A1A1A`, dorado `#C9A84C`, verde clínico `#2D4A3E`, crema `#FAF7F2`

---

## OBJETIVO GENERAL

Resolver 14 problemas detectados en una auditoría que afectan **credibilidad, consistencia, legalidad y conversión**. Los problemas están priorizados por impacto. Ejecuta las tareas en orden, valida después de cada una y deja un changelog al final.

---

## TAREA 1 — UNIFICAR NÚMERO DE CASOS (CRITICAL — credibilidad)

**Problema:** Hay 4 cifras distintas para el mismo dato:
- `App.tsx` línea 39 (DIFFERENTIATORS): "Más de 200 casos documentados"
- `App.tsx` DifferentiatorsSection: "1500+"
- `App.tsx` AboutDoctorSection (badge): "1500+ casos documentados"
- `RinoplastiaPage.tsx` bullet: "200+ casos documentados"

**Acción:**
1. Pregúntame antes (o asume el dato correcto del Dr. Agudelo): el cliente confirmó que son **1500 cirugías totales en 20 años**, de las cuales **+200 son rinoplastias documentadas con foto antes/después**.
2. Reemplaza así:
   - Donde se hable de "casos del doctor" en general → **"1.500+ cirugías"**
   - Donde se hable específicamente de rinoplastias documentadas → **"+200 rinoplastias documentadas"**
3. Revisa **toda** la repo con grep: `200`, `1500`, `1.500`, `casos documentados`, `casos`. Busca también el `index.html` y el schema JSON-LD.
4. El schema.org (`index.html` líneas 73-77) tiene `"reviewCount": "47"` con `"ratingValue": "4.9"`. Si esos 47 reviews son verificables (RealSelf + Google), déjalos. Si no, **bájalo a un número defendible** (ej. 28 si es lo que tiene en RealSelf real).

**Acceptance criteria:**
- `grep -r "200 casos\|1500\|1.500\|casos documentados" src/ index.html` retorna cifras consistentes.
- No hay cifras contradictorias en ninguna sección.

---

## TAREA 2 — UNIFICAR TELÉFONO Y CONTACTO

**Problema:** Hay dos teléfonos distintos.
- `index.html` schema: `+57-311-308-9726`
- Footer + WhatsApp button: `+573023234594` / `302 323 4594`

**Acción:**
1. El número correcto es **+57 302 323 4594** (el del WhatsApp activo).
2. Reemplaza en `index.html` el `telephone` del schema por `+57-302-323-4594`.
3. Verifica que el `mailto:` y el `tel:` sean consistentes en footer, schema y meta tags.
4. Crea una **constante única** en `src/lib/contact.ts`:
   ```ts
   export const CONTACT = {
     phone: '+573023234594',
     phoneDisplay: '+57 302 323 4594',
     whatsapp: 'https://wa.me/573023234594?text=Hola%2C+me+gustar%C3%ADa+solicitar+una+evaluaci%C3%B3n+gratuita+con+el+Dr.+Agudelo.',
     email: 'contacto@drvictoragudelo.com',
     address: 'Av. 4 Norte # 14-38, Consultorio 302, Cali',
     instagram: 'https://instagram.com/doctorvictoragudelo',
     facebook: 'https://facebook.com/dr.victor.agudelo',
   } as const
   ```
5. Importa esta constante en App.tsx, Footer, RinoplastiaPage, ProcedimientosPage. **Cero strings hardcodeados** de teléfono/email.

**Acceptance criteria:**
- Solo hay UNA fuente de verdad para datos de contacto.
- El número del schema = número del footer = número del WhatsApp button.

---

## TAREA 3 — ELIMINAR CÓDIGO MUERTO Y DUPLICACIÓN

**Problema:**
- `App.tsx` define `DIFFERENTIATORS`, `PROCEDURES` y `TESTIMONIALS` arrays que nunca se usan tal cual (las secciones redefinen la data localmente).
- `ProceduresSlider.tsx` redefine `PROCEDURES` con copys ligeramente distintos.
- `HeroStats.tsx` existe en components pero no se importa en ningún lado.

**Acción:**
1. Crea `src/data/procedures.ts`, `src/data/differentiators.ts`, `src/data/testimonials.ts`, `src/data/faqs.ts`, `src/data/process-steps.ts`. Mueve toda la data ahí.
2. Cada componente debe importar la data de un solo sitio.
3. `HeroStats.tsx`: léelo y decide:
   - Si está terminado y se ve bien → intégralo en la home (entre Hero y ProceduresSlider).
   - Si está incompleto → bórralo.
4. Borra las interfaces no usadas en `App.tsx` (`Procedure`, `Differentiator`, `Testimonial`) y muévelas a `src/types/index.ts`.

**Acceptance criteria:**
- Cero arrays definidos dos veces.
- `npm run build` pasa sin warnings de imports no usados.

---

## TAREA 4 — CTA WORDING UNIFICADO

**Problema:** Hay 4 wordings distintos para el mismo CTA:
- "Pedir cita"
- "Solicita tu evaluación gratuita"
- "Solicitar evaluación gratuita"
- "Solicitar tu evaluación gratuita"

**Acción:**
1. Define dos versiones canónicas:
   - **Primaria (formularios y botones grandes):** `"Solicita tu evaluación gratuita"`
   - **Secundaria/compacta (navbar, mobile sticky):** `"Pedir evaluación"`
2. Crea `src/lib/copy.ts`:
   ```ts
   export const COPY = {
     ctaPrimary: 'Solicita tu evaluación gratuita',
     ctaSecondary: 'Pedir evaluación',
     ctaWhatsapp: 'Hablar por WhatsApp',
   } as const
   ```
3. Reemplaza TODOS los strings de CTA en App.tsx, RinoplastiaPage, ProcedimientosPage, navbar y mobile sticky.

**Acceptance criteria:**
- `grep -r "Pedir cita\|Solicitar evaluación" src/` retorna cero matches.

---

## TAREA 5 — TRADUCIR "MODULE OVERVIEW" AL ESPAÑOL

**Problema:** En `ProceduresSlider.tsx` línea 146 aparece literal `"Module Overview"` en inglés sobre cada card.

**Acción:**
1. Reemplaza por: `"Resumen del procedimiento"` o `"Detalle"` (mejor: `"Detalle"` por brevedad).
2. Audita todo el repo por strings en inglés que se hayan colado: `grep -ri "module\|overview\|book now\|learn more" src/`.

---

## TAREA 6 — ARREGLAR ANCHORS ROTOS DEL FOOTER

**Problema:** El footer (`App.tsx` ~línea 842) linkea a `#inicio`, `#procedimientos`, `#laclínica`, `#testimonios`, `#contacto`, pero los IDs reales en la home son: `procedimientos`, `diferenciadores`, `doctor`, `testimonios`, `agendar`.

**Acción:**
1. Sustituye el array de navegación del footer por:
   ```ts
   const FOOTER_NAV = [
     { label: 'Inicio', href: '/' },
     { label: 'Rinoplastia', href: '/rinoplastia' },
     { label: 'Procedimientos', href: '/procedimientos' },
     { label: 'Sobre el doctor', href: '/#doctor' },
     { label: 'Testimonios', href: '/#testimonios' },
     { label: 'Contacto', href: '/#agendar' },
   ]
   ```
2. Renderiza con `<Link>` cuando es ruta interna y `<a>` cuando es anchor.
3. Asegúrate que cada anchor (`#doctor`, `#testimonios`, `#agendar`) corresponda a un `id` real en HomePage.

---

## TAREA 7 — CREAR PÁGINA /privacidad (LEGAL OBLIGATORIO)

**Problema:** El footer linkea a `/privacidad` (Política de Privacidad y Habeas Data) pero la ruta no existe. Recibes formularios con datos personales (Ley 1581 de 2012 de Colombia exige política publicada).

**Acción:**
1. Crea `src/pages/PrivacidadPage.tsx` con estructura legal completa:
   - Identificación del responsable (Dr. Víctor Manuel Agudelo, NIT, dirección)
   - Datos personales recolectados (nombre, correo, teléfono, mensaje, fotos)
   - Finalidad (evaluación médica, agendamiento, seguimiento postoperatorio)
   - Derechos del titular (conocer, actualizar, rectificar, suprimir, revocar)
   - Canal para ejercer derechos (correo + dirección física)
   - Vigencia y procedimiento de actualización
   - Referencia a Ley 1581 de 2012 y Decreto 1377 de 2013
2. Diseño consistente con la marca: header simple con "Volver", body en `#FAF7F2`, tipografía DM Sans, max-width 720px.
3. Añade la ruta en `App.tsx`:
   ```tsx
   <Route path="/privacidad" element={<PrivacidadPage />} />
   ```
4. Añade un checkbox de consentimiento en `BookingSection`:
   ```tsx
   <label>
     <input type="checkbox" required />
     Acepto la <Link to="/privacidad">Política de Tratamiento de Datos</Link>
   </label>
   ```
5. NO envíes el form si el checkbox no está marcado.

---

## TAREA 8 — CLARIFICAR PRECIOS Y "EVALUACIÓN GRATUITA"

**Problema:** El meta description y el hero venden "Evaluación gratuita". El paso 2 del proceso dice que la consulta cuesta $250.000 COP. El FAQ dice "no publicamos precios". Hay percepción de bait & switch.

**Acción:**
1. En `ProcessSection` (App.tsx), reescribe los pasos 1 y 2:
   - **Paso 01** — `"Envío de fotos sin costo"` → `"Envías fotos de frente y perfil. Recibimos tu caso y respondemos si eres candidata. Sin costo."`
   - **Paso 02** — Mantén el costo pero hazlo explícito: `"Consulta médica con el Dr. Agudelo: $250.000 COP (virtual o presencial). En esta consulta revisamos tu caso, hacemos simulación 3D y te entregamos cotización personalizada. Si decides operarte, las consultas siguientes no tienen costo adicional."`
2. En el FAQ (FaqAccordion.tsx), añade:
   ```ts
   {
     question: '¿Cuánto cuesta la consulta?',
     answer: 'La consulta médica con el Dr. Agudelo cuesta $250.000 COP, sea virtual o presencial. La evaluación inicial por fotos es gratuita y sin compromiso. La cotización quirúrgica se entrega solo después de la consulta médica completa.',
   }
   ```
3. Actualiza la `meta description` en `index.html`:
   - Antes: `"...Evaluación gratuita."`
   - Después: `"...Evaluación inicial por fotos sin costo. Consulta médica desde $250.000 COP."`

---

## TAREA 9 — TESTIMONIOS: DECIDIR ENTRE VIDEO REAL O QUITAR PLAY

**Problema:** Los 4 testimonios son `"Paciente, Cali"` con iniciales `P1, P2, P3, P4`. Las cards muestran ícono de Play como si fueran videos, pero NO hay video conectado. Esto es engañoso.

**Acción (elige una de estas dos opciones — pregúntame si tienes duda):**

**Opción A — Si HAY videos disponibles (preguntar al cliente):**
1. Añade `videoUrl: string` al interface `Testimonial`.
2. Convierte la card en un video real con `<video muted loop poster={...}>` y un botón de play que abre un modal con el video con audio.
3. Pide los videos verticales 9:16 al cliente.

**Opción B — Si NO hay videos disponibles aún:**
1. Quita el ícono de Play y el `<VolumeX />` de las cards.
2. Reemplaza la card visual por una "card de testimonio escrito" con foto (o iniciales con buen tipografía), nombre + apellido inicial, procedimiento y la cita completa.
3. Añade un campo `verifiedSource: 'realself' | 'google' | 'instagram'` y un pequeño badge.
4. Pide al cliente al menos 6-8 testimonios reales con consentimiento (con nombre real o solo iniciales reales tipo "M. González").

**Por defecto, ejecuta Opción B.** Es más rápido, más honesto y se puede upgradar después.

---

## TAREA 10 — SECCIÓN DE ANTES/DESPUÉS (la mejora con más ROI)

**Problema:** Para una página de cirugía estética, la galería antes/después es la prueba #1 de credibilidad. La página NO tiene ni una.

**Acción:**
1. Crea `src/components/BeforeAfterGallery.tsx` con:
   - Slider con 6-8 casos reales (placeholder por ahora hasta recibir las fotos)
   - Cada caso: 2 fotos (antes/después) + tipo de rinoplastia + tiempo desde cirugía + edad de la paciente
   - **Disclaimer obligatorio** debajo: *"Imágenes publicadas con consentimiento informado. Los resultados varían según cada paciente."*
   - Componente con drag handler interactivo (estilo before/after slider con Framer Motion) — usa `motion/react` y trackeo de mouse.
2. Insértala entre `DifferentiatorsSection` y `AboutDoctorSection` en HomePage.
3. Mientras llegan las fotos reales, usa placeholders explícitos con texto: `"Antes/Después — pendiente de entrega del cliente con consentimiento firmado"`.

---

## TAREA 11 — REEMPLAZAR FOTO PLACEHOLDER DEL DOCTOR

**Problema:** En `AboutDoctorSection` (App.tsx ~línea 908) hay un placeholder gris con texto "Foto del Dr. Agudelo — pendiente de entrega" que está en producción.

**Acción:**
1. Mantén el placeholder pero hazlo más profesional:
   - Fondo `#E8E2DA` con un patrón sutil (puntos o textura noise)
   - Ícono de cámara discreto + texto pequeño "Foto profesional próximamente"
2. Crea un componente `<ProfileImagePlaceholder />` reutilizable.
3. Cuando llegue la foto real, debe ser **editable cambiando una sola variable**: `DOCTOR_PHOTO_URL` en `src/lib/assets.ts`.

---

## TAREA 12 — REPETICIÓN EXCESIVA DE "20 AÑOS"

**Problema:** "Más de 20 años" aparece 8+ veces en la home. Suena repetitivo y forzado.

**Acción:**
Reescribe variando la fórmula. Mantén UNA mención fuerte (en el hero) y varía las otras:

| Lugar | Antes | Después |
|---|---|---|
| Hero subtítulo | "Más de 20 años diseñando narices naturales en Cali." | "Dos décadas diseñando narices que se ven tuyas, no operadas." |
| Differentiators stat | "20 años — Solo en cirugía nasal" | "Desde 2004 — Dedicación exclusiva a rinoplastia" |
| About doctor | "Llevo más de 20 años dedicado a un solo objetivo..." | "Llevo dos décadas dedicado a un solo objetivo..." |
| Footer | "Más de 20 años de experiencia." | "Dedicación exclusiva a rinoplastia desde 2004." |
| Meta description | mantener "20+ años" (SEO) | sin cambio |

---

## TAREA 13 — ARREGLAR EL STAT "PRESENTE"

**Problema:** En DifferentiatorsSection el cuarto pilar tiene `stat: 'Presente'` que no es ni número ni concepto medible. Visualmente queda raro al lado de "20 años" y "1500+".

**Acción:**
Reemplázalo por algo medible. Opciones (elige la que más pegue):
- `stat: '5 controles'` + `label: 'Postoperatorios incluidos'`
- `stat: '100%'` + `label: 'Atendido por el doctor'`
- `stat: '0'` + `label: 'Asistentes que reemplazan al doctor'` (juego conceptual)

**Por defecto, usa la opción 1 (5 controles).**

---

## TAREA 14 — ASEGURAR SUBPÁGINAS Y TODA RUTA TENGA SEO

**Problema:** Solo `index.html` tiene meta tags. Las rutas `/rinoplastia` y `/procedimientos` heredan los mismos meta tags sin ajuste por página.

**Acción:**
1. Instala `react-helmet-async`: `npm install react-helmet-async`
2. Envuelve la app en `<HelmetProvider>` en `main.tsx`.
3. En cada página añade su propio `<Helmet>` con title, description y canonical específicos:
   - **/rinoplastia**: `"Tipos de Rinoplastia en Cali — Estética, Afrolatina, Secundaria | Dr. Agudelo"`
   - **/procedimientos**: `"Procedimientos Faciales en Cali — Mentoplastia, Otoplastia, Blefaroplastia | Dr. Agudelo"`
   - **/privacidad**: `"Política de Tratamiento de Datos | Dr. Víctor Agudelo"` con `<meta name="robots" content="noindex" />`
4. Añade JSON-LD específico de `MedicalProcedure` en `/rinoplastia`.
5. Actualiza `public/sitemap.xml` con las 4 URLs y `lastmod` correcto.

---

## TAREA FINAL — VERIFICACIÓN Y CHANGELOG

Después de todas las tareas:

1. Corre:
   ```bash
   npm run build
   npm run preview
   ```
2. Abre `http://localhost:4173` y verifica manualmente:
   - [ ] Hero animation se ve bien (clip-path shrink + entry stagger)
   - [ ] Cifras consistentes en todas las secciones
   - [ ] Todos los CTA dicen lo mismo
   - [ ] Footer links funcionan (no 404, no anchors muertos)
   - [ ] Página /privacidad carga correctamente
   - [ ] Formulario rechaza envío sin checkbox de privacidad
   - [ ] Cero strings en inglés colados
   - [ ] /rinoplastia y /procedimientos tienen su propio `<title>`
3. Crea un archivo `CHANGELOG-FIX.md` en la raíz del proyecto con la lista de tareas hechas, archivos tocados y commits sugeridos.
4. Sugiere un commit message en formato Conventional Commits (ej. `fix(content): unify case count and contact data across site`).

---

## REGLAS Y CONSTRAINTS

- **NO modifiques** los archivos de fuentes (`6202897e...pdf`, `font.pdf`).
- **NO toques** `vite.config.ts`, `tsconfig.json`, `package.json` salvo para añadir `react-helmet-async`.
- **NO cambies** la paleta de colores ni las tipografías.
- **NO inventes datos** — si necesitas un número o un dato y no lo tienes, deja un `TODO:` explícito y pregúntame.
- **NO rompas** las animaciones existentes (clip-path scroll, entry stagger del hero, FAQ chat, carousel infinito).
- **Mantén el tono honesto** del copy. No uses palabras como "revolucionario", "el mejor", "increíble" — el cliente lo odia.
- Cada cambio de copy debe respetar la voz: directa, honesta, sin promesas exageradas.
- Confirma conmigo antes de tomar decisiones que requieran datos del cliente (cifras reales, fotos, videos, testimonios reales).

---

## ORDEN DE EJECUCIÓN SUGERIDO

1. Tarea 3 (refactor data) → base para todo lo demás
2. Tarea 1 (números) + Tarea 2 (contacto) + Tarea 4 (CTAs) en paralelo
3. Tarea 5 + 6 + 12 + 13 (fixes rápidos de copy)
4. Tarea 7 (página privacidad) + Tarea 8 (precios)
5. Tarea 9 (testimonios) + Tarea 10 (antes/después) + Tarea 11 (foto)
6. Tarea 14 (SEO por página)
7. Verificación final + changelog

---

¿Listo? Empieza por la **Tarea 3** y avísame si tienes dudas antes de tocar archivos. Si una tarea requiere un dato real del cliente que no tienes, **detente y pregunta**, no inventes.
