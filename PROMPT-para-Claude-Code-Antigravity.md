# Prompt para Claude Code (Antigravity)

> Copia y pega todo lo que está dentro del bloque de abajo en Claude Code dentro de Antigravity.
> Está escrito para que lo ejecute solo, paso a paso, con verificación al final.

---

```
Eres mi asistente de desarrollo en este proyecto (sitio web del Dr. Víctor Agudelo,
cirujano de rinoplastia en Cali). Vas a crear una nueva sección de páginas individuales
por procedimiento. Trabaja con cuidado, sin romper nada de lo existente, y verifica el
build al final.

══════════════════════════════════════════════════════════════
0) ANTES DE TOCAR CÓDIGO — USA TUS SKILLS
══════════════════════════════════════════════════════════════
Tienes skills instaladas. Úsalas activamente en este orden:

- `file-search`: para mapear el proyecto antes de editar. Localiza y LEE:
  src/App.tsx, src/pages/RinoplastiaPage.tsx, src/lib/seo.ts,
  public/sitemap.xml, y cómo está montado el pre-render (busca
  "ROUTES_TO_PRERENDER" y "entry-prerender"). No asumas: confírmalo leyendo.
- `ui-ux-pro-max`: para que la maquetación quede profesional, jerárquica y pulida.
- `brand-style`: para mantener EXACTAMENTE la misma identidad visual (colores y
  tipografías) que ya usa el sitio. NO inventes una paleta nueva.
- `seo`: para los meta tags, canonical y el schema.org (MedicalProcedure,
  BreadcrumbList, FAQPage) de cada página.
- `animation-extractor` (opcional): para reveals on-scroll suaves y discretos,
  acordes a un sitio médico premium. Nada estridente.
- `systematic-debugging`: si el build falla, úsala para diagnosticar.

══════════════════════════════════════════════════════════════
1) CONTEXTO TÉCNICO DEL PROYECTO
══════════════════════════════════════════════════════════════
- React 19 + TypeScript + Vite.
- Enrutado: react-router-dom v7 (<Routes>/<Route>, <Link>, useParams).
- SEO/indexabilidad: vite-prerender-plugin genera un HTML estático por cada ruta
  listada en ROUTES_TO_PRERENDER (en src/lib/seo.ts). TODA ruta nueva DEBE añadirse
  ahí o no se indexará.
- src/lib/seo.ts es la FUENTE ÚNICA DE VERDAD de SEO (objeto ROUTES por path).
- src/pages/RinoplastiaPage.tsx usa ESTILOS INLINE (no clases Tailwind). Replica
  ese mismo patrón para mantener consistencia.

SISTEMA VISUAL (respétalo al pie de la letra):
- Negro base: #1A1A1A
- Verde profundo: #2D4A3E
- Verde claro de acento: #A8C5B4
- Crema fondo claro: #F7F5F0
- Tipografía display/títulos: Cormorant Garamond (serif), con el fallback que ya
  usa el proyecto: var(--font-serif, 'Cormorant Garamond', Georgia, serif)
- Tipografía de texto: DM Sans (sans-serif)
Antes de codificar, abre RinoplastiaPage.tsx y copia su estética (espaciados,
tamaños clamp(), radios, sombras). Las páginas nuevas deben sentirse del mismo sitio.

══════════════════════════════════════════════════════════════
2) QUÉ HAY QUE CONSTRUIR
══════════════════════════════════════════════════════════════
5 páginas individuales, una por procedimiento, todas anidadas bajo /rinoplastia/:

  Rinoplastia ultrasónica  → /rinoplastia/ultrasonica
  Rinoplastia secundaria   → /rinoplastia/secundaria
  Rinoplastia afrolatina   → /rinoplastia/afrolatina
  Rinoplastia masculina    → /rinoplastia/masculina
  Septoplastia (funcional) → /rinoplastia/septoplastia

Arquitectura: PLANTILLA + DATOS (no 5 archivos duplicados):
- src/lib/procedimientos.ts → arreglo con un objeto por procedimiento (slug, path,
  títulos, textos de cada sección, bullets, pasos de recuperación, FAQs y campos SEO).
  Es la fuente única del contenido.
- src/pages/ProcedimientoDetallePage.tsx → componente plantilla. Lee el slug con
  useParams(), busca el objeto en procedimientos.ts y renderiza la misma maqueta.
  Si el slug no existe → muestra un fallback 404 elegante con enlace a /rinoplastia.
- Una sola ruta dinámica en App.tsx: <Route path="/rinoplastia/:slug" .../>

══════════════════════════════════════════════════════════════
3) ESTRUCTURA DE CADA PÁGINA (de arriba a abajo)
══════════════════════════════════════════════════════════════
1. Navbar fijo (el mismo del sitio).
2. HERO: eyebrow + título (nombre del procedimiento) + subtítulo de una línea +
   breadcrumb VISIBLE (Inicio › Rinoplastia › Procedimiento) + dato rápido
   (ej. duración) + botón CTA "Agenda tu valoración".
3. ¿Qué es? (2–3 párrafos claros y cercanos).
4. Candidato ideal (criterios: para quién sí / para quién no).
5. La técnica (cómo lo hace el Dr. Agudelo + lista de puntos clave).
6. GALERÍA DE RESULTADOS — *** ESPACIO PARA FOTOS (ver sección 4) ***.
7. Recuperación día a día (timeline sobre fondo oscuro: Día 1–2, Semana 1,
   Semana 2–3, Mes 1, Mes 3–12).
8. Riesgos y consideraciones (honestidad médica, refuerza confianza/E-E-A-T).
9. Preguntas frecuentes (acordeón con <details>; alimenta el schema FAQPage).
10. Otros procedimientos (enlaces a las páginas hermanas).
11. CTA final (bloque destacado: WhatsApp / teléfono / agendar).

CASO ESPECIAL — Septoplastia: mismo esqueleto pero el contenido pivota a lo
FUNCIONAL/RESPIRATORIO (tabique desviado, obstrucción nasal, ronquido, sinusitis).
El "candidato ideal" habla de síntomas respiratorios, no estéticos. Menciona la
septorrinoplastia (combinada) como puente hacia las páginas estéticas.

══════════════════════════════════════════════════════════════
4) ESPACIOS PARA FOTOS DEL DOCTOR  (IMPORTANTE)
══════════════════════════════════════════════════════════════
En cada página deja una GALERÍA de resultados lista para que solo se reemplacen
las imágenes después, sin tocar la maquetación:

- Crea una sección "Resultados reales" con una grilla de 2–3 espacios tipo
  ANTES / DESPUÉS (o casos), con placeholders claramente marcados.
- Cada placeholder debe ser un contenedor con proporción fija (ej. aspect-ratio
  4/5), fondo gris suave, ícono o texto "Foto del procedimiento — Dr. Agudelo",
  y un atributo alt descriptivo ya escrito (ej. alt="Resultado de rinoplastia
  ultrasónica, caso 1 — Dr. Víctor Agudelo, Cali").
- Define las rutas de imagen apuntando a una carpeta previsible, p. ej.
  /images/procedimientos/<slug>/caso-1.jpg, caso-2.jpg, caso-3.jpg, de modo que
  el doctor solo tenga que subir los archivos a public/images/procedimientos/<slug>/.
- Deja un comentario en el código: // TODO: reemplazar por fotos reales del Dr. Agudelo.
- Incluye una nota discreta de cumplimiento: "Imágenes de pacientes reales
  publicadas con su consentimiento". (texto editable)
- La galería debe verse hermosa con o sin imágenes cargadas (estado placeholder
  estético, no roto).

══════════════════════════════════════════════════════════════
5) LÓGICA DE CONEXIÓN — LOS BOTONES DEBEN ABRIR CADA PÁGINA
══════════════════════════════════════════════════════════════
Esto es crítico: cada procedimiento tiene que ser navegable de verdad.

a) En src/pages/RinoplastiaPage.tsx (el HUB): agrega una sección "Cada
   procedimiento, paso a paso" con una tarjeta por procedimiento. Cada tarjeta es
   un <Link to={p.path}> (react-router) que ABRE su página. Genera las tarjetas
   recorriendo el arreglo de procedimientos.ts (no las escribas a mano).
b) En cada página spoke: la sección "Otros procedimientos" enlaza con <Link> a las
   hermanas (filtra el procedimiento actual).
c) En el FOOTER (src/App.tsx): añade los 5 enlaces con isRoute: true a sus paths.
d) Breadcrumb del hero: "Rinoplastia" enlaza a /rinoplastia con <Link>.
e) USA SIEMPRE <Link to="..."> de react-router-dom para navegación interna
   (NO <a href>), para que sea SPA y no recargue.
f) Verifica explícitamente que cada botón/tarjeta tenga su `to` correcto apuntando
   al path del objeto, y que al hacer clic se abra la página correspondiente.

══════════════════════════════════════════════════════════════
6) SEO (usa la skill `seo`)
══════════════════════════════════════════════════════════════
En src/lib/seo.ts, genera la config de las 5 rutas DESDE procedimientos.ts (una
sola fuente de verdad). Cada ruta debe tener:
- title y meta description únicos, con intención local (ej. "Rinoplastia
  Ultrasónica en Cali | Dr. Víctor Agudelo").
- canonical propio.
- JSON-LD: BreadcrumbList + MedicalProcedure + FAQPage (a partir de las FAQs).
- Añade los 5 paths a ROUTES_TO_PRERENDER para que se generen como HTML estático.
Luego añade las 5 URLs a public/sitemap.xml (y a dist/sitemap.xml si existe).

══════════════════════════════════════════════════════════════
7) CONTENIDO MÉDICO
══════════════════════════════════════════════════════════════
Redacta borradores de contenido en el tono cercano y profesional del sitio, PERO
marca claramente con comentarios // VALIDAR CON EL DR. AGUDELO los datos clínicos
(duración, técnica exacta, tiempos de recuperación, riesgos). No inventes cifras
como si fueran definitivas. Deja el contenido fácil de editar en procedimientos.ts.

══════════════════════════════════════════════════════════════
8) CALIDAD VISUAL
══════════════════════════════════════════════════════════════
Tiene que quedar HERMOSO y coherente con el resto del sitio: misma tipografía
(Cormorant Garamond + DM Sans), misma paleta, mismos espaciados generosos, mismo
nivel de pulido que RinoplastiaPage. Responsive impecable (móvil primero).
Animaciones de entrada sutiles si aportan. Accesible (contraste, alt, foco).

══════════════════════════════════════════════════════════════
9) RITMO DE TRABAJO
══════════════════════════════════════════════════════════════
Puedes hacerlo de una de estas dos formas, la que consideres más segura:
- TODO de una vez (plantilla + datos de los 5 + rutas + SEO + sitemap + hub), o
- UNA por una: primero monta la plantilla y los datos de "ultrasonica",
  verifica que abre y se ve bien, y luego replica el resto.
Si vas una por una, avísame al terminar cada hito.

══════════════════════════════════════════════════════════════
10) VERIFICACIÓN OBLIGATORIA AL FINAL
══════════════════════════════════════════════════════════════
- Ejecuta `tsc --noEmit` (o `npm run lint`) y `npm run build`: deben pasar SIN
  errores. Ignora errores que vengan de carpetas ajenas al proyecto (p. ej.
  "Anti gravity Skills/").
- Confirma que el build pre-renderizó las 5 rutas nuevas (revisa la carpeta dist).
- Revisa que cada <Link> abre la página correcta y que el 404 funciona con un
  slug inexistente.
- Reporta un resumen: archivos creados/modificados, rutas nuevas, y la lista de
  datos clínicos que el Dr. Agudelo debe confirmar.

No modifiques nada fuera del alcance de esta tarea. Mantén el diseño existente
intacto salvo la nueva sección de enlaces en /rinoplastia.
```
