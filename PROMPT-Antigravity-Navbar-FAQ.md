# Prompt para Antigravity — Navbar animado + título en Preguntas Frecuentes

> Copia y pega todo este bloque en Antigravity. Está escrito para que el agente
> ejecute los cambios sin romper nada del resto del sitio.

---

## SKILLS QUE DEBES USAR (obligatorio)

Antes de escribir una sola línea de código, **lee y aplica estas skills**:

1. **`animation-extractor`** → Úsala para transcribir con precisión la animación del
   Navbar del inicio (transiciones de fondo, blur, color de texto, cambio de fase al
   hacer scroll) y replicarla EXACTAMENTE en la página de Preguntas Frecuentes.
2. **`ui-ux-pro-max`** → Úsala para ajustar el tamaño/jerarquía del título del hero
   de FAQ y para que el botón CTA de WhatsApp quede consistente con el sistema visual
   del sitio (mismos tokens de color, radios, tipografía).

No improvises la animación "a ojo": extrae los valores reales del Navbar existente.

---

## CONTEXTO DEL PROYECTO

Sitio en **React + TypeScript + Vite + react-router-dom** (estilos inline + algunas
clases Tailwind + GSAP/Lenis/motion).

Archivos relevantes:

- `src/App.tsx` → contiene el componente `Navbar` (líneas ~43 a ~331). Es el navbar
  del inicio. **NO está exportado**: está declarado como `const Navbar = () => {...}`
  dentro de `App.tsx`.
- `src/pages/PreguntasFrecuentesPage.tsx` → la página a modificar. Hoy tiene su PROPIO
  header sticky (distinto al del inicio) en las líneas ~79 a ~108.
- `src/lib/contact.ts` → `CONTACT.whatsapp` (link de WhatsApp ya preparado con mensaje).
- `src/lib/copy.ts` → `COPY.ctaSecondary = 'Pedir evaluación'` (texto del botón actual
  del inicio).

### Cómo funciona la animación del Navbar del inicio (referencia exacta a replicar)

El `Navbar` de `App.tsx` tiene 3 fases derivadas de dos estados (`scrolled`, `darkSection`):

- **Fase `hero`** (`!scrolled`): píldora totalmente **transparente**, sin borde ni
  sombra, texto **blanco**, logo blanco sobre círculo translúcido.
- **Fase `dark-glass`** (`scrolled` + sección oscura debajo): fondo
  `rgba(20,20,20,0.55)`, `backdrop-filter: blur(22px) saturate(1.5)`, borde
  `rgba(255,255,255,0.10)`, sombra `0 4px 28px rgba(0,0,0,0.35)`, texto blanco.
- **Fase `light-glass`** (`scrolled` + sección clara debajo): fondo
  `rgba(255,255,255,0.72)`, mismo blur, borde `rgba(0,0,0,0.08)`, sombra
  `0 2px 24px rgba(0,0,0,0.10)`, texto/logo **oscuros**.

Detalles clave de la animación que debes conservar tal cual:

- El `<header>` es `position: fixed; inset-x-0; top-0; z-50` con `padding: 0.75rem 0`.
- El `<nav>` interior es una píldora (`borderRadius: 100px`) con
  `transition` de 0.55s `cubic-bezier(0.4,0,0.2,1)` en `background`, `border-color`,
  `box-shadow`, `backdrop-filter`, y `padding 0.45s ease`.
- El padding de la píldora cambia con `scrolled`:
  `'0.45rem 0.45rem 0.45rem 1.25rem'` cuando hay scroll vs
  `'0.5rem 0.5rem 0.5rem 0'` arriba del todo.
- `setScrolled(y > 60)` en el listener de scroll (passive).
- La detección de sección clara/oscura se hace midiendo `offsetTop`/`offsetHeight`
  de secciones por `id` (`#inicio`, `#diferenciadores`, `#agendar`).

---

## OBJETIVO

En **`src/pages/PreguntasFrecuentesPage.tsx`** quiero:

1. **Reemplazar el header sticky actual** (el de "Volver / Dr. Agudelo / Pedir cita",
   líneas ~79–108) por **el mismo Navbar del inicio**, con **exactamente la misma
   animación** de píldora de vidrio.
2. El Navbar debe quedar **fijo arriba del todo** (`position: fixed; top: 0; z-50`),
   igual que en el inicio. No quiero ningún navbar pegado abajo ni a media página.
3. **Mantener el logo "Dr. Agudelo"** y los links de navegación idénticos al inicio.
4. **Cambiar SOLO el botón de la derecha**: en lugar de "Pedir evaluación", poner un
   **CTA de WhatsApp** que invite a preguntar directamente. Esa debe ser la **única**
   diferencia respecto al navbar del inicio.
5. **Agrandar el título** (`h1`) del hero de FAQ para que ocupe un poco más de pantalla
   y se vea más protagonista.
6. **No cambiar absolutamente nada más** del sitio ni de la página (contenido,
   acordeón, barra de categorías, CTAs intermedios, footer, etc. quedan igual).

---

## IMPLEMENTACIÓN PASO A PASO

### Paso 1 — Extraer el Navbar a un componente reutilizable (sin alterar el inicio)

Para no duplicar código ni romper el inicio:

1. Crea `src/components/Navbar.tsx` y **mueve allí** el componente `Navbar` que hoy
   vive dentro de `src/App.tsx`, exportándolo (`export function Navbar(...)`).
2. En `src/App.tsx`, importa el Navbar desde el nuevo archivo y elimina la definición
   local. El resultado visual y de comportamiento del inicio debe quedar **idéntico,
   byte por byte** (mismas fases, mismos colores, mismo CTA "Pedir evaluación").
3. Añade al `Navbar` una prop opcional para variar SOLO el botón de la derecha y la
   lógica de detección de secciones. Por ejemplo:

   ```tsx
   type CtaVariant = 'evaluacion' | 'whatsapp'

   interface NavbarProps {
     /** 'evaluacion' (default, comportamiento del inicio) | 'whatsapp' (FAQ) */
     ctaVariant?: CtaVariant
     /** ids de las secciones OSCURAS de la página actual, para la animación de fase.
      *  Default = comportamiento del inicio. */
     darkSectionIds?: string[]
   }
   ```

   - Con `ctaVariant='evaluacion'` (default) el botón es el actual:
     `<Calendar/> {COPY.ctaSecondary}` apuntando a `#agendar`. → El inicio NO cambia.
   - Con `ctaVariant='whatsapp'` el botón usa el ícono `MessageCircle` de `lucide-react`,
     texto del CTA (ver Paso 3) y `href={CONTACT.whatsapp}` con
     `target="_blank" rel="noopener noreferrer"`.
   - Aplica la misma variación en el **menú móvil** (overlay): el botón inferior también
     debe ser el de WhatsApp cuando `ctaVariant='whatsapp'`.

> IMPORTANTE: el inicio debe seguir usando `<Navbar />` sin props (o con
> `ctaVariant="evaluacion"`), de modo que su apariencia y animación no cambien en nada.

### Paso 2 — Adaptar la detección de fase (claro/oscuro) a la página de FAQ

El navbar del inicio decide `darkSection` mirando `#inicio`, `#diferenciadores`,
`#agendar`, que **no existen** en FAQ. Hazlo configurable:

- Generaliza la lógica para que reciba qué zonas son oscuras (vía `darkSectionIds` o
  detectando el color de fondo del elemento bajo el header). Mantén el default actual
  para el inicio.
- En la página de FAQ la estructura de fondos es: **hero oscuro arriba**
  (`#1A1A1A`), luego **secciones claras** (categorías), y al final un **CTA oscuro**
  (`#1A1A1A`). Por tanto el navbar debe verse:
  - `hero` (transparente, texto blanco) sobre el hero oscuro mientras no hay scroll,
  - `dark-glass` sobre el hero oscuro y sobre el CTA final oscuro,
  - `light-glass` sobre las secciones claras de categorías.
- Pon `id`s a esas secciones de FAQ si hace falta para detectarlas (p. ej. añadir
  `id="faq-hero"` a la `<section>` del hero y `id="faq-cta-final"` a la sección final),
  o usa una detección por color de fondo. Reutiliza la MISMA función de medición del
  navbar del inicio; solo cambian los `id`/zonas de entrada.

### Paso 3 — Botón CTA de WhatsApp (lado derecho)

- Ícono: `MessageCircle` (de `lucide-react`).
- Link: `href={CONTACT.whatsapp}`, `target="_blank"`, `rel="noopener noreferrer"`.
- Estilo: reutiliza los tokens del botón actual del navbar (mismo `borderRadius: 100px`,
  mismo padding, misma tipografía/peso). Usa `ui-ux-pro-max` para que el color quede
  coherente con el sistema (puedes mantener el verde `#2D4A3E` / hover `#1F3329` que ya
  usa el navbar del inicio, para máxima consistencia).
- Texto sugerido (elige el que mejor encaje; es un call-to-action para preguntar directo):
  - **"Pregúntanos por WhatsApp"** (recomendado), o
  - "Escríbenos directamente", o
  - "Pregunta directa".

### Paso 4 — Reemplazar el header sticky viejo

- Elimina el `<header ref={headerRef} ...>` actual de FAQ (líneas ~79–108) y, en su
  lugar, renderiza `<Navbar ctaVariant="whatsapp" darkSectionIds={[...]} />` como
  primer elemento, fuera del flujo (es `fixed`).
- Como el navbar pasa a ser `fixed` (flota sobre el contenido), **ajusta el offset**
  de la barra de categorías sticky:
  - Hoy `barRef` usa `top: offsets.barTop` calculado con la altura del header en flujo.
    Al volverse `fixed` el navbar ya no ocupa espacio en el flujo. Ajusta `barTop` y
    `scrollMargin` para que la barra de categorías sticky quede **justo debajo** de la
    píldora flotante (la píldora mide aprox. `0.75rem` de padding + ~52px ≈ **64–72px**).
    Verifícalo visualmente y deja la barra de categorías sin solaparse con el navbar.
  - El hero oscuro de FAQ es alto, así que la píldora transparente se verá bien sobre
    él al cargar (igual que el inicio sobre su hero).

### Paso 5 — Agrandar el título del hero de FAQ

En el `h1` del hero (actualmente
`fontSize: 'clamp(2.4rem, 5vw, 4.2rem)'`, `maxWidth: '760px'`):

- Aumenta el tamaño a algo como **`clamp(2.8rem, 7vw, 5.5rem)`** (ajústalo con
  `ui-ux-pro-max` para que respire bien y no se desborde en móvil).
- Si hace falta, sube el `maxWidth` del `h1` (p. ej. a `860–920px`) y/o el padding
  superior del hero para que el título "ocupe un poco más de pantalla" sin romper el
  layout.
- Mantén la fuente serif, el `<em>` dorado y el resto del contenido del hero igual.

---

## REGLAS / RESTRICCIONES

- **No cambies nada del inicio.** Tras extraer el Navbar, el home debe verse y
  comportarse exactamente igual que antes.
- **No cambies** el contenido del acordeón de FAQ, la barra de categorías (más allá del
  ajuste de `top`), los CTAs intermedios, ni el CTA final.
- El único cambio del navbar respecto al inicio es el **botón derecho (WhatsApp)**.
  El logo "Dr. Agudelo" y los links se mantienen idénticos.
- La animación debe ser **la misma** que en el inicio (mismas duraciones, curvas,
  colores y blur). No la reinventes.
- Respeta `prefers-reduced-motion` igual que el resto del sitio.

---

## VERIFICACIÓN ANTES DE TERMINAR

1. En el inicio: navbar idéntico al original (transparente sobre hero, glass al
   scrollear, botón "Pedir evaluación"). Sin regresiones.
2. En `/preguntas-frecuentes`:
   - El navbar aparece **arriba del todo**, fijo, con la misma animación de fases.
   - Transparente sobre el hero oscuro; se vuelve glass oscuro/claro según la sección.
   - Botón derecho = WhatsApp (`MessageCircle`), abre `CONTACT.whatsapp` en pestaña nueva.
   - El título del hero se ve más grande y bien proporcionado en desktop y móvil.
   - La barra de categorías sticky queda justo debajo del navbar, sin solaparse, y el
     scroll-spy sigue funcionando.
3. Probar en móvil: el menú hamburguesa funciona y su botón inferior es el de WhatsApp.
4. `npm run build` (o `bun run build`) sin errores de TypeScript.

---

## DUDA A CONFIRMAR (menor)

El texto exacto del botón de WhatsApp no quedó 100% definido. Por defecto usa
**"Pregúntanos por WhatsApp"**. Si el cliente prefiere otro wording
("Escríbenos directamente" / "Pregunta directa"), cámbialo solo ahí.
