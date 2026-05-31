# PROMPT PARA ANTIGRAVITY — Crear página `/preguntas-frecuentes`

Pégale este prompt completo a Antigravity (Claude Code dentro del proyecto). Está pensado para que respete la arquitectura, los tokens de diseño y el SEO que ya tienes.

---

## CONTEXTO DEL PROYECTO

Estoy trabajando en el sitio del Dr. Víctor Manuel Agudelo (cirujano plástico facial, Cali). Stack: React 19 + TypeScript + Vite + react-router-dom 7 + motion + GSAP + Tailwind 4. Las páginas viven en `src/pages/` y siguen el patrón de `RinoplastiaPage.tsx`, `ProcedimientosPage.tsx` y `TestimoniosPage.tsx`. El SEO se centraliza en `src/lib/seo.ts` y se aplica vía `src/components/RouteSeo.tsx`. El sitemap está en `public/sitemap.xml`.

## OBJETIVO

Crear una nueva página `/preguntas-frecuentes` (página dedicada de FAQ) que **complemente** —no reemplace— el acordeón `FaqAccordion` del home. Esta página agrupa muchas más preguntas reales por categoría, es escaneable, captura tráfico SEO long-tail y está marcada con `schema.org/FAQPage` para aparecer como rich result en Google y ser citada por ChatGPT, Perplexity y Google AI Overviews.

## ARCHIVOS A CREAR / MODIFICAR

1. **Crear** `src/pages/PreguntasFrecuentesPage.tsx` — la página completa.
2. **Modificar** `src/App.tsx`:
   - Importar `PreguntasFrecuentesPage`.
   - Agregar la ruta `<Route path="/preguntas-frecuentes" element={<PreguntasFrecuentesPage />} />`.
   - Agregar el link en el menú principal (después de "TESTIMONIOS") y en el footer.
3. **Modificar** `src/lib/seo.ts`:
   - Agregar `'/preguntas-frecuentes'` a `ROUTES_TO_PRERENDER`.
   - Agregar la entrada en el objeto `ROUTES` con `title`, `description`, `canonical`, `ogImage`, y un `jsonLd` que contenga **dos** schemas: `BreadcrumbList` (Inicio → Preguntas frecuentes) y `FAQPage` con todas las preguntas/respuestas listadas (mainEntity como array de `Question`/`acceptedAnswer`).
4. **Modificar** `public/sitemap.xml`: agregar la URL `/preguntas-frecuentes` con `priority: 0.7`, `changefreq: monthly`, `lastmod` igual a la fecha de hoy.

## TOKENS DE DISEÑO (úsalos sin modificar)

- Colores: `--ink: #1A1A1A`, `--green: #2D4A3E`, `--gold: #C9A84C`, `--cream: #FAF7F2`, `--bg-alt: #F7F5F0`, `--muted: #475569`, `--line: rgba(0,0,0,0.08)`.
- Tipografías ya cargadas globalmente: `var(--font-serif)` (Cormorant Garamond) para títulos, `var(--font-sans)` (DM Sans) para texto.
- Botón primario: dorado `#C9A84C` sobre texto `#1A1A1A`, border-radius `100px`.
- Botón secundario: verde `#2D4A3E` sobre texto `#fff`.
- Cards: fondo `#fff`, border `1px solid rgba(0,0,0,0.06)`, border-radius `20px`, sombras suaves.
- Anti-patrones: nada de emojis como íconos (usar `lucide-react`), nada de gradientes morados/rosa, mantener el "look editorial" del resto del sitio.

## ESTRUCTURA DE LA PÁGINA

1. **Header sticky** idéntico al de `TestimoniosPage` (volver, logo "Dr. Agudelo", botón dorado "Pedir cita" que apunte a `/#agendar`). Fondo crema con blur.
2. **Hero** con fondo `#1A1A1A`, breadcrumb (Inicio · Preguntas frecuentes), kicker dorado "Resolvemos tus dudas", titular en Cormorant Garamond grande, párrafo introductorio y dos CTAs (Evaluación gratuita + WhatsApp).
3. **Barra de categorías sticky** debajo del hero: chips horizontales con scroll horizontal en móvil. Al hacer click, hace scroll suave a la sección correspondiente y resalta la categoría activa según el scroll (usar `IntersectionObserver`). Las categorías son:
   - Antes de la consulta
   - Sobre la consulta
   - La cirugía
   - Recuperación
   - Resultados
   - Riesgos y casos especiales
   - Costos y financiación
4. **Secciones por categoría**: cada una con título en serif, subtítulo corto, y un acordeón limpio (no estilo chat — más editorial: pregunta en negrita con `+`/`−` a la derecha, respuesta debajo en gris). Solo una pregunta abierta a la vez por sección. Animar la apertura con `motion/react` o transición CSS suave (200-300ms ease-out).
5. **Banner CTA intermedio** después de la sección "La cirugía": fondo crema con borde dorado, "¿Tu duda no está aquí? Te respondemos personalmente por WhatsApp" + botón WhatsApp.
6. **CTA final** (clonado del de `TestimoniosPage`): fondo negro, párrafo de cierre, botones dorado y WhatsApp.
7. **Footer**: usar el `<Footer />` global si existe; si no, mantener consistente.

## CONTENIDO COMPLETO (escríbelo TAL CUAL)

### Hero

- Kicker: `Resolvemos tus dudas`
- Titular: `Preguntas frecuentes sobre *rinoplastia y cirugía facial*` (la parte en cursiva en dorado `#C9A84C`)
- Párrafo: `Las preguntas que más nos hacen los pacientes — respondidas en detalle, sin promesas vacías y con la honestidad clínica del Dr. Víctor Agudelo. Si tu duda no está aquí, escríbenos directamente: respondemos personalmente.`

### Categorías y preguntas

#### 1. Antes de la consulta

**¿Cuánto cuesta la consulta?**
La consulta médica con el Dr. Agudelo tiene un costo de $250.000 COP, sea virtual o presencial. La **evaluación inicial por fotos es gratuita y sin compromiso**: nos envías frente y perfil sin flash y recibes una primera valoración para saber si la cirugía es viable en tu caso.

**¿Publican precios de cirugía?**
No publicamos precios fijos porque cada caso es diferente — el costo varía según la técnica necesaria, la complejidad y si es primaria o secundaria. Después de la consulta médica completa entregamos una cotización personalizada y por escrito.

**¿Cómo solicito mi evaluación gratuita?**
Por el formulario de la página o directamente por WhatsApp al +57 302 323 4594. Envías dos fotos (frente y perfil, sin flash, sin maquillaje) y en menos de 48 horas recibes una respuesta.

**¿Puedo tener la consulta de forma virtual?**
Sí. Atendemos pacientes nacionales e internacionales por videoconsulta. Tiene el mismo costo que la presencial y permite la misma planeación quirúrgica.

**¿Cuánto tiempo antes de la cirugía debo hacer la consulta?**
Idealmente entre 4 y 6 semanas antes. Eso da tiempo para los exámenes prequirúrgicos, despejar dudas y agendar con tranquilidad.

#### 2. Sobre la consulta

**¿Qué pasa en la consulta médica?**
El Dr. Agudelo evalúa tu nariz desde lo estético y lo funcional, conversa contigo sobre lo que buscas, te muestra casos similares y te explica qué es realista en tu caso específico. La consulta dura entre 45 y 60 minutos.

**¿Me hacen una simulación de cómo voy a quedar?**
Sí. Trabajamos con simulación digital sobre tus propias fotos para que ambos partamos del mismo objetivo. La simulación es una guía — no una promesa exacta — pero ayuda a alinear expectativas antes de operar.

**¿Quién atiende la consulta?**
El Dr. Víctor Agudelo personalmente. No delegamos la consulta inicial ni los controles posteriores.

**¿Qué exámenes necesito antes de operarme?**
Una valoración prequirúrgica completa: laboratorios (hemograma, coagulación, función renal), electrocardiograma y valoración por anestesiología. Si tienes condiciones particulares (hipertensión, hipotiroidismo, etc.) podemos pedir adicionales.

#### 3. La cirugía

**¿Cuánto dura la cirugía?**
La rinoplastia primaria dura aproximadamente 4 horas. La secundaria puede tomar más tiempo según la complejidad.

**¿Qué tipo de anestesia se usa?**
Anestesia general, administrada por un anestesiólogo certificado. Es lo más seguro para el paciente y permite que el cirujano trabaje con precisión.

**¿Es ambulatoria u hospitalaria?**
Es ambulatoria. Sales el mismo día con el primer control programado para las siguientes 24-48 horas.

**¿Usan ultrasonido en la cirugía?**
Sí. Llevamos más de dos años usando **ultrasonido piezoeléctrico (Piezosurgery)** para modificar la estructura ósea con mayor precisión, menos trauma y menos moretones que las técnicas tradicionales con martillo y formón.

**¿Quién opera?**
El Dr. Víctor Agudelo realiza personalmente toda la cirugía. No hay cirujano en formación operando, ni residente cerrando.

**¿Dónde se realiza la cirugía?**
En clínica certificada con todos los estándares de habilitación. Te informamos la sede específica al confirmar el agendamiento.

#### 4. Recuperación

**¿La cirugía duele?**
No es dolorosa — es **incómoda**. La principal molestia es la congestión nasal de los primeros 5-7 días. La mayoría de pacientes se sorprende positivamente con la recuperación.

**¿Cuánto tiempo de incapacidad laboral necesito?**
Para trabajos de oficina: 7 a 10 días. Para trabajos físicos o que impliquen exposición al sol o esfuerzo: más tiempo. Lo evaluamos caso a caso.

**¿Cuánto tiempo tengo la férula?**
La férula externa se retira entre los 7 y 10 días después de la cirugía. Los puntos internos se reabsorben solos.

**¿Voy a tener moretones e inflamación?**
Algo de inflamación y moretones bajo los ojos es normal los primeros 7-10 días. Con la técnica ultrasónica los moretones son significativamente menores que con técnicas tradicionales.

**¿Cuándo puedo tomar un vuelo?**
10 días después de la cirugía.

**¿Cuándo puedo usar gafas?**
Para apoyarlas sobre la nariz: 2 meses después. Antes puedes usarlas apoyadas sobre la férula de protección o con accesorios que las eleven.

**¿Cuándo vuelvo al deporte?**
Pesas al 70%, caminadora, pilates: desde la semana 3. Trotar o saltar: semana 6. Deportes de contacto (fútbol, boxeo, artes marciales): 6 meses.

**¿Puedo exponerme al sol?**
Evita el sol directo y usa protector solar SPF 50+ durante los primeros 6 meses. La piel inflamada se pigmenta con facilidad.

**¿Puedo sonarme la nariz?**
No durante las primeras 3 semanas. Te explicamos cómo manejar la congestión con lavados de suero fisiológico.

#### 5. Resultados

**¿Cuándo voy a ver mi resultado final?**
A los 7-10 días ya se ve la nueva forma. El **resultado final completo se aprecia entre los 6 y 12 meses**, cuando termina de bajar toda la inflamación profunda. La punta es lo último en desinflamarse.

**¿El resultado es permanente?**
Sí. La rinoplastia es definitiva. La nariz cambia muy lentamente con la edad como el resto del rostro, pero la forma quirúrgica se mantiene.

**¿Voy a quedar con cicatrices visibles?**
No. En la rinoplastia abierta queda una cicatriz pequeña en la columela (entre las fosas nasales) que en pocas semanas es prácticamente imperceptible. En cierres internos no queda ninguna cicatriz visible.

**¿Puedo elegir cómo quiero quedar?**
Trabajamos en conjunto. Tú aportas el objetivo, el doctor aporta lo que es técnicamente posible y armónico con tu rostro. Nunca prometemos resultados imposibles ni "narices de molde".

**¿Y si no me gusta el resultado?**
Trabajamos con simulación previa para alinear expectativas y minimizar ese riesgo. El acompañamiento postoperatorio incluye varios controles. Si después del primer año persiste algo a corregir, evaluamos juntos opciones (incluyendo retoques menores que en algunos casos están contemplados).

**¿Cuántos controles tengo después de la cirugía?**
Controles a las 24-48 horas, 7-10 días (retiro de férula), 1 mes, 3 meses, 6 meses y 12 meses. Todos con el Dr. Agudelo directamente.

#### 6. Riesgos y casos especiales

**¿Cuáles son los riesgos de una rinoplastia?**
Como toda cirugía, tiene riesgos: infección, sangrado, asimetrías, irregularidades en el contorno o necesidad de retoque. Los riesgos son bajos cuando la cirugía la hace un cirujano calificado en una clínica habilitada y el paciente sigue las indicaciones postoperatorias.

**¿Puede afectar mi respiración?**
Al contrario: una rinoplastia bien planeada **puede mejorar la respiración**. Si tienes desviación del tabique o problemas funcionales, lo corregimos en la misma cirugía (rinoseptoplastia).

**¿Y si tengo desviación del tabique?**
Lo evaluamos en consulta. En la mayoría de casos hacemos la **septoplastia** (corrección funcional) y la rinoplastia estética en un solo tiempo quirúrgico.

**¿Me puedo operar si me he aplicado ácido hialurónico en la nariz?**
Sí. Lo ideal es disolverlo previamente con hialuronidasa antes de la cirugía. Lo evaluamos en consulta.

**¿A qué edad puedo operarme?**
Desde los 17-18 años, una vez completado el crecimiento facial. No hay edad máxima mientras la persona esté en buen estado de salud.

**¿Hago rinoplastia secundaria si quedé inconforme con una cirugía previa?**
Sí. El Dr. Agudelo tiene amplia experiencia en **rinoplastia secundaria** (revisión). Es una cirugía más compleja porque trabajamos sobre tejido ya operado, pero los resultados son posibles. Conversamos en consulta sobre qué es realista corregir.

**¿La rinoplastia afrolatina es diferente?**
Sí. Las narices con rasgos afrolatinos tienen una anatomía específica (piel más gruesa, cartílagos diferentes, ángulos distintos). Aplicamos técnicas que **respetan la identidad étnica** y logran armonía sin borrar los rasgos del paciente.

#### 7. Costos y financiación

**¿Cuánto cuesta la cirugía?**
Cada caso es diferente. Después de la consulta médica entregamos una cotización personalizada por escrito que incluye honorarios del cirujano, anestesiólogo, clínica y materiales.

**¿Tienen opciones de financiación?**
Conversamos opciones de pago en consulta. Aceptamos efectivo, tarjeta de crédito y transferencia bancaria. Si necesitas crédito médico, te orientamos sobre alternativas.

**¿El precio cambia según la técnica?**
Sí. La rinoplastia ultrasónica, la secundaria de alta complejidad o las cirugías combinadas (rinoplastia + mentoplastia) tienen costos diferentes a una primaria estándar.

**¿Qué incluye la cotización?**
Cirujano principal, anestesiólogo, sala quirúrgica, materiales, férula, primera consulta postoperatoria y los controles del primer año.

### Banner CTA intermedio (después de "La cirugía")

> **¿Tu duda no está en esta lista?**
> Escríbenos por WhatsApp y el equipo del Dr. Agudelo te responde personalmente, sin compromiso.

### CTA final

- Kicker: `Sigue siendo simple`
- Titular: `Lo más rápido es *preguntarnos directamente*` (en cursiva dorado)
- Párrafo: `Envía tus fotos (frente y perfil, sin flash) y recibe una evaluación inicial gratuita en menos de 48 horas. Sin compromiso, con toda la información que necesitas para decidir con tranquilidad.`
- Botones: Solicita tu evaluación gratuita (dorado) + Escribir por WhatsApp (transparente con borde)

## REQUISITOS TÉCNICOS

- Accesibilidad: cada pregunta usa `<button aria-expanded>` con `aria-controls` apuntando al panel de respuesta; navegación por teclado (Enter / Espacio para abrir).
- SEO técnico: el `FAQPage` schema en `seo.ts` debe incluir **todas las preguntas y respuestas** (cada `Question.acceptedAnswer.text` en texto plano sin HTML).
- Responsive: mobile-first, breakpoints 480 / 768 / 1024 / 1440.
- `prefers-reduced-motion`: desactivar las animaciones de apertura para usuarios que lo prefieran.
- No uses imágenes nuevas (la página es 100% texto + tipografía + diseño).
- Mantén consistencia visual con `RinoplastiaPage`, `ProcedimientosPage` y `TestimoniosPage` ya existentes.

## CHECKLIST FINAL (verifica antes de terminar)

- [ ] La página renderiza sin errores en `/preguntas-frecuentes`.
- [ ] El menú principal y el footer enlazan a la nueva página.
- [ ] `seo.ts` tiene la entrada nueva y el `FAQPage` JSON-LD válido (revísalo con un validador mental: cada pregunta es un `Question` con `acceptedAnswer.Answer.text`).
- [ ] `ROUTES_TO_PRERENDER` incluye `/preguntas-frecuentes`.
- [ ] `sitemap.xml` incluye la nueva URL con la fecha de hoy.
- [ ] No introdujiste colores, fuentes ni librerías fuera del sistema existente.
- [ ] La página pasa una revisión de teclado (puedo abrir/cerrar preguntas con Tab y Enter).

---
