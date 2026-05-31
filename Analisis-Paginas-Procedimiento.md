# Análisis: páginas individuales por procedimiento

Propuesta de estructura para crear una sección conectada con páginas dedicadas por
procedimiento de alto valor. **Este documento es solo análisis y diseño — no implica cambios
en el código.**

Procedimientos objetivo:

- Rinoplastia ultrasónica
- Rinoplastia secundaria
- Rinoplastia afrolatina
- Rinoplastia masculina
- Septoplastia (enfoque funcional / respiración)

---

## 1. Diagnóstico del proyecto actual

El sitio es una SPA en **React 19 + TypeScript + Vite**, con enrutado por
**react-router-dom v7** y pre-renderizado estático mediante **vite-prerender-plugin**
(genera un HTML por ruta en build, clave para que Google indexe cada página).

Piezas relevantes que ya existen y que condicionan la solución:

| Archivo | Rol |
|---|---|
| `src/App.tsx` | Declara las `<Routes>`, el navbar y el footer. |
| `src/pages/RinoplastiaPage.tsx` | Página "categoría" actual. Usa estilos *inline*, no clases Tailwind. Es el patrón visual a replicar. |
| `src/lib/seo.ts` | **Fuente única de verdad de SEO.** Define `ROUTES` (title, description, canonical, JSON-LD) y `ROUTES_TO_PRERENDER` (qué rutas se vuelven HTML estático). |
| `public/sitemap.xml` | Sitemap manual con 4 URLs. |

Hoy `/rinoplastia` es una sola página que describe varios tipos en bloques. El problema SEO:
una sola URL compite por muchas intenciones de búsqueda distintas ("rinoplastia ultrasónica
Cali", "rinoplastia secundaria", "septoplastia"...). Google premia páginas dedicadas, una por
intención.

---

## 2. Estrategia recomendada: arquitectura "hub-and-spoke"

`/rinoplastia` se mantiene como **hub** (página categoría que resume y enlaza). Cada
procedimiento se convierte en un **spoke**: una página propia, profunda, que ataca una
búsqueda concreta y enlaza de vuelta al hub y a sus hermanas.

```
                    /rinoplastia  (HUB)
                          │
        ┌─────────┬───────┼────────┬──────────────┐
        ▼         ▼       ▼        ▼              ▼
 /ultrasonica /secundaria /afrolatina /masculina /septoplastia
        (SPOKES — una intención de búsqueda cada una)
```

### URLs propuestas

| Procedimiento | URL |
|---|---|
| Rinoplastia ultrasónica | `/rinoplastia/ultrasonica` |
| Rinoplastia secundaria | `/rinoplastia/secundaria` |
| Rinoplastia afrolatina | `/rinoplastia/afrolatina` |
| Rinoplastia masculina | `/rinoplastia/masculina` |
| Septoplastia | `/rinoplastia/septoplastia` |

Todas anidadas bajo `/rinoplastia/…`. Ventaja: la jerarquía de URL refuerza la relación
temática y los breadcrumbs (Inicio › Rinoplastia › Procedimiento) quedan naturales. La
septoplastia, aunque es funcional, se beneficia de colgar del clúster de rinoplastia porque
el público la busca asociada.

---

## 3. Patrón técnico recomendado: "plantilla + datos"

En vez de crear 5 archivos de página casi idénticos (duplicación = mantenimiento costoso), se
recomienda **un solo componente plantilla + un registro de datos**.

- **`procedimientos.ts`** (datos): un arreglo con un objeto por procedimiento (slug, títulos,
  textos de cada sección, FAQs, datos SEO). Fuente única de verdad del contenido.
- **`ProcedimientoDetallePage.tsx`** (plantilla): lee el `:slug` de la URL, busca el objeto
  correspondiente y renderiza siempre la misma maqueta. Si el slug no existe → 404.
- **Una ruta dinámica**: `/rinoplastia/:slug` cubre las 5 páginas (y futuras).

Beneficio: añadir un procedimiento nuevo en el futuro = agregar **un objeto** al arreglo. Cero
duplicación de maquetación, consistencia visual garantizada.

```
src/lib/procedimientos.ts          ← contenido de las 5 (+ futuras) páginas
src/pages/ProcedimientoDetallePage.tsx ← plantilla única, usa useParams()
src/App.tsx                        ← + <Route path="/rinoplastia/:slug" …>
src/lib/seo.ts                     ← + SEO y prerender generados desde procedimientos.ts
public/sitemap.xml                 ← + 5 URLs
src/pages/RinoplastiaPage.tsx      ← + sección que enlaza a las 5 (cierra el hub→spoke)
```

---

## 4. Estructura detallada de cada página (spoke)

Orden de secciones de arriba hacia abajo, manteniendo el sistema visual actual (negro
`#1A1A1A`, verde `#2D4A3E`, verde claro de acento `#A8C5B4`, crema `#F7F5F0`, tipografías
Cormorant Garamond + DM Sans):

1. **Navbar fijo** — el mismo del resto del sitio.
2. **Hero** — eyebrow (ej. "Técnica piezoeléctrica"), título grande (nombre del procedimiento),
   subtítulo de una frase, **breadcrumb visible** (Inicio › Rinoplastia › Procedimiento) y un
   dato rápido (ej. duración aproximada). Botón CTA "Agenda tu valoración".
3. **¿Qué es?** — 2–3 párrafos que definen el procedimiento en lenguaje claro y cercano,
   alineados con el tono del sitio.
4. **Candidato ideal** — para quién está indicado / quién no. Lista de criterios.
5. **La técnica** — cómo lo realiza el Dr. Agudelo; abordaje, particularidades. Incluye una
   lista de puntos clave (bullets) que diferencian su método.
6. **Recuperación día a día** — *timeline* visual sobre fondo oscuro: Día 1–2, Semana 1,
   Semana 2–3, Mes 1, Mes 3–12. Qué esperar en cada hito.
7. **Riesgos y consideraciones** — honestidad médica; complicaciones posibles y cómo se
   mitigan. Refuerza confianza y E-E-A-T (señal de calidad para Google).
8. **Preguntas frecuentes (FAQ)** — acordeón (`<details>`). Doble función: resuelve dudas del
   usuario **y** alimenta el schema `FAQPage` para *rich snippets* en Google.
9. **Otros procedimientos** — enlaces a las páginas hermanas (cierra el enlazado interno del
   clúster).
10. **CTA final** — bloque destacado para agendar valoración (WhatsApp / teléfono / formulario).

### Particularidad de Septoplastia

Mismo esqueleto, pero el contenido pivota a lo **funcional/respiratorio**: tabique desviado,
obstrucción nasal, ronquido, sinusitis recurrente. El "candidato ideal" habla de síntomas
respiratorios, no estéticos. Puede mencionar la **septorrinoplastia** (combinada) como puente
hacia las páginas estéticas.

---

## 5. Plan SEO por página

Cada spoke necesita su propio paquete SEO, generado desde el mismo registro de datos:

- **`<title>` y meta description** únicos y orientados a la búsqueda local
  (ej. *"Rinoplastia Ultrasónica en Cali | Dr. Víctor Agudelo"*).
- **Canonical** propio (`https://www.drvictoragudelo.com/rinoplastia/ultrasonica`).
- **JSON-LD estructurado** por página:
  - `BreadcrumbList` (Inicio › Rinoplastia › Procedimiento).
  - `MedicalProcedure` (nombre, descripción, zona corporal, médico que lo realiza).
  - `FAQPage` (las preguntas de la sección FAQ → candidatas a *rich snippet*).
- **Pre-render**: añadir las 5 rutas a `ROUTES_TO_PRERENDER` para que cada una exista como HTML
  estático indexable.
- **Sitemap**: añadir las 5 URLs a `public/sitemap.xml`.
- **Enlazado interno**: el hub `/rinoplastia` enlaza a los 5 spokes y cada spoke enlaza a sus
  hermanos → clúster temático fuerte.

---

## 6. Datos clínicos a confirmar con el Dr. Agudelo

El contenido médico debe validarlo el doctor antes de publicar. Por cada procedimiento se
necesita confirmar:

- **Duración** aproximada de la cirugía y tipo de anestesia.
- **Técnica exacta** que emplea (abordaje abierto/cerrado, uso de ultrasonido, injertos, etc.).
- **Tiempos de recuperación reales**: cuándo se retira la férula, cuándo baja la inflamación,
  cuándo se retoma actividad/deporte, cuándo se ve el resultado final.
- **Riesgos** específicos que él comunica a sus pacientes.
- **Candidato ideal y contraindicaciones** según su criterio.
- En **septoplastia**: síntomas que la justifican y si suele combinarla con rinoplastia.
- **3–6 preguntas frecuentes reales** que escucha en consulta por cada procedimiento.

---

## 7. Resumen de impacto

| Hoy | Con la propuesta |
|---|---|
| 1 URL para muchas búsquedas | 1 URL dedicada por intención de búsqueda |
| `/rinoplastia` compite consigo misma | Hub + 5 spokes que se refuerzan entre sí |
| Sin FAQ estructurada | `FAQPage` schema → posibles *rich snippets* |
| 4 URLs en sitemap | 9 URLs indexables |
| Añadir procedimiento = nueva página a mano | Añadir procedimiento = 1 objeto de datos |

Riesgo / esfuerzo: bajo. Reutiliza el sistema de pre-render y SEO ya existente; no cambia el
diseño visual del sitio; el patrón plantilla+datos minimiza el código nuevo.
