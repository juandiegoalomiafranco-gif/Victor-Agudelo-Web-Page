// Fuente única de verdad de las páginas individuales por procedimiento.
// Cada objeto alimenta:
//   - La plantilla ProcedimientoDetallePage
//   - Las tarjetas del hub en RinoplastiaPage
//   - La config SEO + JSON-LD por ruta en src/lib/seo.ts
//   - Las URLs del sitemap
//
// Contenido clínico: los datos médicos están marcados con
//   // VALIDAR CON EL DR. AGUDELO
// Son borradores razonables basados en el copy ya existente del sitio,
// pero deben confirmarse antes de publicar.

export type FaqItem = { q: string; a: string }
export type RecoveryStep = { etapa: string; titulo: string; detalle: string }
export type CasoGaleria = { alt: string; nota?: string }

export type Procedimiento = {
  slug: string                 // ej. 'ultrasonica'
  path: string                 // ej. '/rinoplastia/ultrasonica'
  nombre: string               // ej. 'Rinoplastia Ultrasónica'
  eyebrow: string              // pequeño tag arriba del H1
  tagline: string              // subtítulo de una línea en el hero
  duracion: string             // ej. '~4 horas' (VALIDAR)
  intro: string[]              // ¿Qué es? — 2 a 3 párrafos
  candidatoIdeal: {
    paraQuienSi: string[]
    paraQuienNo: string[]
  }
  tecnica: {
    descripcion: string
    puntosClave: string[]
  }
  galeria: CasoGaleria[]       // espacios para fotos del Dr. Agudelo
  recuperacion: RecoveryStep[] // timeline día a día
  riesgos: string[]            // honestidad médica → refuerza E-E-A-T
  faqs: FaqItem[]
  seo: {
    title: string
    description: string
    bodyLocation: string       // para MedicalProcedure (ej. 'Nariz')
    procedureDescription: string // descripción para MedicalProcedure schema
  }
}

// Galería estándar: 3 casos por procedimiento.
// El doctor solo necesita subir caso-1.jpg, caso-2.jpg, caso-3.jpg en
// public/images/procedimientos/<slug>/ y las imágenes aparecerán.
const galeriaCasos = (nombreProc: string): CasoGaleria[] => [
  { alt: `Resultado de ${nombreProc.toLowerCase()}, caso 1 — Dr. Víctor Agudelo, Cali` },
  { alt: `Resultado de ${nombreProc.toLowerCase()}, caso 2 — Dr. Víctor Agudelo, Cali` },
  { alt: `Resultado de ${nombreProc.toLowerCase()}, caso 3 — Dr. Víctor Agudelo, Cali` },
]

export const PROCEDIMIENTOS: Procedimiento[] = [
  // ────────────────────────────────────────────────────────────────────
  // 1) Rinoplastia Ultrasónica
  // ────────────────────────────────────────────────────────────────────
  {
    slug: 'ultrasonica',
    path: '/rinoplastia/ultrasonica',
    nombre: 'Rinoplastia Ultrasónica',
    eyebrow: 'Técnica de vanguardia',
    tagline: 'Más control, menos trauma, una recuperación más predecible.',
    duracion: '~4 horas', // VALIDAR CON EL DR. AGUDELO
    intro: [
      'La rinoplastia ultrasónica —también llamada Piezosurgery— utiliza ultrasonido piezoeléctrico para modificar la estructura ósea de la nariz con una precisión que los instrumentos convencionales no logran. El hueso responde de forma selectiva a la vibración ultrasónica, sin afectar los tejidos blandos circundantes.',
      'Esto se traduce en menos sangrado, edema más controlado y una recuperación que permite ver resultados más tempranos y predecibles. Es especialmente útil cuando se requiere refinar el dorso nasal con detalle milimétrico.',
      'En Cali, el Dr. Agudelo incorpora esta técnica desde hace más de dos años en sus procedimientos primarios y secundarios, según lo requiera cada caso.', // VALIDAR fecha exacta de adopción
    ],
    candidatoIdeal: {
      paraQuienSi: [
        'Pacientes que buscan refinamiento óseo del dorso nasal con máxima precisión',
        'Casos donde se prioriza una recuperación con menos hematomas e inflamación',
        'Personas con piel delgada, donde cualquier irregularidad ósea se nota fácilmente',
      ],
      paraQuienNo: [
        'Casos donde el componente principal es cartilaginoso o de punta nasal',
        'Pacientes con contraindicaciones generales para anestesia o cirugía electiva', // VALIDAR
      ],
    },
    tecnica: {
      descripcion:
        'El Dr. Agudelo trabaja con abordaje abierto y técnica estructural, complementada con instrumentación ultrasónica para la fase ósea. La planificación es 100 % individualizada: simulación previa, evaluación del marco facial y comparación con casos similares antes de cualquier decisión.',
      puntosClave: [
        'Ultrasonido piezoeléctrico para modificación ósea selectiva',
        'Abordaje abierto + técnica estructural',
        'Simulación computacional antes de la cirugía',
        'Sin uso de moldes — cada diseño parte de tu anatomía',
        'Acompañamiento postoperatorio directo del Dr. Agudelo',
      ],
    },
    galeria: galeriaCasos('Rinoplastia Ultrasónica'),
    recuperacion: [
      { etapa: 'Día 1–2',     titulo: 'Reposo en casa',           detalle: 'Férula nasal puesta, congestión nasal marcada y leve hinchazón periorbitaria. Hielo según indicaciones.' },
      { etapa: 'Semana 1',    titulo: 'Retiro de férula',         detalle: 'Se retira la férula nasal externa y se evalúa edema. Apto para trabajo de escritorio o remoto.' }, // VALIDAR día exacto
      { etapa: 'Semana 2–3',  titulo: 'Vuelta a la rutina',       detalle: 'Caminata, pilates suave y caminadora autorizados. El edema baja de forma visible.' },
      { etapa: 'Mes 1',       titulo: 'Forma general definida',   detalle: 'Se aprecia ya la forma general de la nariz, aunque persiste inflamación residual, sobre todo en la punta.' },
      { etapa: 'Mes 3–12',    titulo: 'Resultado se asienta',     detalle: 'A los 3–4 meses se ve cerca del 90 % del resultado. El resultado definitivo se alcanza entre los 12 y 18 meses.' },
    ],
    riesgos: [
      'Toda cirugía implica riesgos generales (anestesia, infección, hematoma).',
      'El edema y la inflamación residual pueden tardar hasta 12–18 meses en resolverse del todo.',
      'En casos muy específicos puede requerirse un retoque menor pasado el primer año.', // VALIDAR tasa real
      'Honestidad clínica: si tu caso no es buen candidato para esta técnica, te lo decimos directamente.',
    ],
    faqs: [
      { q: '¿Qué diferencia hay con la rinoplastia tradicional?', a: 'La ultrasónica usa vibración piezoeléctrica para esculpir el hueso con precisión milimétrica, sin afectar tejidos blandos. Esto suele traducirse en menos hematomas y una recuperación más predecible.' },
      { q: '¿Sirve para todos los casos?', a: 'No. Es especialmente útil para refinamiento óseo del dorso nasal. Cuando el componente principal es de cartílago o punta, otras técnicas pueden ser igual de efectivas. Lo evaluamos en consulta.' },
      { q: '¿La recuperación es realmente más rápida?', a: 'En la mayoría de pacientes sí — sobre todo en cuanto a hematomas e inflamación periorbitaria. El resultado final igualmente se asienta entre los 12 y 18 meses.' },
      { q: '¿Cuándo veré el resultado?', a: 'Alrededor del 90 % del resultado es visible entre los 3 y 4 meses. El resultado definitivo llega entre los 12 y 18 meses.' },
    ],
    seo: {
      title: 'Rinoplastia Ultrasónica en Cali | Dr. Víctor Agudelo',
      description: 'Rinoplastia ultrasónica (Piezosurgery) en Cali: precisión ósea milimétrica, menos hematomas y recuperación más predecible. Dr. Víctor Agudelo, 20+ años.',
      bodyLocation: 'Nariz',
      procedureDescription:
        'Rinoplastia con ultrasonido piezoeléctrico (Piezosurgery) para modificación ósea selectiva, menor trauma de tejidos blandos y recuperación más predecible. Realizada por el Dr. Víctor Agudelo en Cali.',
    },
  },

  // ────────────────────────────────────────────────────────────────────
  // 2) Rinoplastia Secundaria
  // ────────────────────────────────────────────────────────────────────
  {
    slug: 'secundaria',
    path: '/rinoplastia/secundaria',
    nombre: 'Rinoplastia Secundaria',
    eyebrow: 'Alta complejidad',
    tagline: 'Cuando una cirugía previa no dejó el resultado esperado.',
    duracion: '6+ horas', // VALIDAR CON EL DR. AGUDELO
    intro: [
      'La rinoplastia secundaria —o cirugía de revisión— se realiza en pacientes que ya pasaron por una rinoplastia previa y no quedaron conformes con el resultado, ya sea por motivos estéticos o funcionales.',
      'Es uno de los procedimientos técnicamente más complejos en cirugía nasal: el tejido cicatricial, la pérdida de soporte cartilaginoso o las modificaciones óseas previas obligan a planificar cada paso con extrema honestidad clínica.',
      'En la mayoría de casos se requiere uso de injertos (de septum, oreja o costilla) para reconstruir el soporte nasal y devolverle estabilidad estética y funcional.', // VALIDAR detalle de injertos
    ],
    candidatoIdeal: {
      paraQuienSi: [
        'Resultado estético insatisfactorio de una rinoplastia previa',
        'Asimetrías, irregularidades o deformidades post-cirugía',
        'Problemas respiratorios aparecidos o no resueltos después de una primera cirugía',
        'Pacientes con expectativas realistas, dispuestos a un proceso más largo',
      ],
      paraQuienNo: [
        'Pacientes con menos de 12 meses desde la cirugía anterior — los tejidos aún están en proceso de cicatrización',
        'Expectativas no compatibles con la condición actual de los tejidos',
      ],
    },
    tecnica: {
      descripcion:
        'El abordaje se decide caso por caso. El Dr. Agudelo combina abordaje abierto, técnica estructural y, cuando se requiere, ultrasonido piezoeléctrico e injertos cartilaginosos para reconstruir soporte. La evaluación previa es exhaustiva: estudio de imágenes, simulación y revisión detallada de la historia quirúrgica.',
      puntosClave: [
        'Planificación quirúrgica individualizada y detallada',
        'Uso de injertos cartilaginosos cuando se requiere reconstruir soporte',
        'Restauración de la función respiratoria si está comprometida',
        'Honestidad clínica: te decimos qué es realista lograr y qué no',
        'Cirugías típicamente más largas (6+ horas)', // VALIDAR
      ],
    },
    galeria: galeriaCasos('Rinoplastia Secundaria'),
    recuperacion: [
      { etapa: 'Día 1–2',     titulo: 'Reposo estricto',          detalle: 'Mayor inflamación que en una primaria, sobre todo si se usaron injertos. Reposo y control de hielo.' },
      { etapa: 'Semana 1',    titulo: 'Retiro de férula',         detalle: 'Se retira la férula y se evalúa el postoperatorio inicial. La congestión nasal puede ser más marcada.' }, // VALIDAR
      { etapa: 'Semana 2–3',  titulo: 'Vida normal progresiva',   detalle: 'Actividades de oficina retomadas. Ejercicio suave autorizado de forma progresiva.' },
      { etapa: 'Mes 1',       titulo: 'Inflamación que cede',     detalle: 'Comienza a apreciarse la nueva forma, aunque la inflamación residual es mayor que en una primaria.' },
      { etapa: 'Mes 3–18',    titulo: 'Resultado definitivo',     detalle: 'El resultado se asienta de forma más lenta — puede tomar entre 12 y 18 meses ver el resultado definitivo.' },
    ],
    riesgos: [
      'Mayor complejidad técnica que una rinoplastia primaria.',
      'Tejido cicatricial y soporte alterado por cirugías previas dificultan el resultado predecible.',
      'En ciertos casos, no es posible recuperar el 100 % de lo deseado — es fundamental tener expectativas realistas.',
      'Riesgo aumentado de necesitar nuevos retoques en el largo plazo.', // VALIDAR
    ],
    faqs: [
      { q: '¿Cuánto tiempo debo esperar después de mi cirugía anterior?', a: 'Lo recomendado es esperar al menos 12 meses desde la cirugía previa. Antes de ese tiempo los tejidos aún están en proceso de cicatrización y no es seguro intervenir.' },
      { q: '¿Siempre se necesitan injertos?', a: 'No siempre, pero es frecuente. Depende del estado del soporte cartilaginoso y de los cambios hechos en la cirugía anterior. En consulta evaluamos si tu caso los requiere.' },
      { q: '¿Puedo lograr el resultado que originalmente esperaba?', a: 'No siempre. Una secundaria parte de un terreno modificado y con cicatrices. Nuestro compromiso es ser honestos sobre qué es posible y qué no en tu caso particular.' },
      { q: '¿La recuperación es igual?', a: 'Suele ser más larga e impredecible que una primaria. La inflamación residual puede tardar hasta 18 meses en resolverse del todo.' },
    ],
    seo: {
      title: 'Rinoplastia Secundaria en Cali | Cirugía de Revisión — Dr. Agudelo',
      description: 'Rinoplastia secundaria en Cali: cirugía de revisión para corregir resultados insatisfactorios o problemas funcionales. Honestidad clínica con el Dr. Víctor Agudelo.',
      bodyLocation: 'Nariz',
      procedureDescription:
        'Cirugía de revisión nasal (rinoplastia secundaria) para corregir deformidades, asimetrías y problemas funcionales resultantes de una rinoplastia previa. Realizada por el Dr. Víctor Agudelo en Cali.',
    },
  },

  // ────────────────────────────────────────────────────────────────────
  // 3) Rinoplastia Afrolatina
  // ────────────────────────────────────────────────────────────────────
  {
    slug: 'afrolatina',
    path: '/rinoplastia/afrolatina',
    nombre: 'Rinoplastia Afrolatina',
    eyebrow: 'Técnica especializada',
    tagline: 'Equilibrar tus rasgos, sin borrarlos. Tu identidad intacta.',
    duracion: '~4 horas', // VALIDAR CON EL DR. AGUDELO
    intro: [
      'La rinoplastia afrolatina es una técnica adaptada a narices con características étnicas afrolatinas: dorso ancho, punta poco proyectada y piel más gruesa con mayor componente glandular.',
      'El objetivo no es transformar la nariz en otra completamente distinta, sino equilibrar las proporciones y darle más definición — preservando la identidad cultural y étnica del paciente.',
      'Cada plan se diseña a partir de tu anatomía y de tus referentes personales: nunca buscamos imponer un modelo único de nariz.',
    ],
    candidatoIdeal: {
      paraQuienSi: [
        'Pacientes con rasgos afrolatinos que buscan más definición preservando su identidad',
        'Necesidad de proyectar la punta nasal y refinar el dorso',
        'Personas con expectativas realistas sobre los límites de su anatomía y tipo de piel',
      ],
      paraQuienNo: [
        'Quien busca una nariz radicalmente distinta a su biotipo — eso no es ni armónico ni natural',
        'Pacientes con contraindicaciones médicas generales para cirugía electiva', // VALIDAR
      ],
    },
    tecnica: {
      descripcion:
        'El abordaje suele incluir refuerzo del soporte cartilaginoso para proyectar la punta, refinamiento del dorso y manejo cuidadoso de la piel gruesa característica. El Dr. Agudelo trabaja con técnica estructural y abordaje abierto, integrando injertos cuando es necesario.',
      puntosClave: [
        'Técnica adaptada a morfología afrolatina específica',
        'Refuerzo del soporte para proyectar adecuadamente la punta',
        'Manejo especializado de piel gruesa y componente glandular',
        'Casos reales similares mostrados antes de cualquier decisión',
        'Respeto absoluto por la identidad étnica y cultural del paciente',
      ],
    },
    galeria: galeriaCasos('Rinoplastia Afrolatina'),
    recuperacion: [
      { etapa: 'Día 1–2',     titulo: 'Reposo en casa',           detalle: 'Férula nasal, congestión nasal y leve edema. Indicaciones de hielo y elevación de cabecera.' },
      { etapa: 'Semana 1',    titulo: 'Retiro de férula',         detalle: 'Se retira la férula nasal externa. Apto para trabajo de oficina o remoto.' }, // VALIDAR
      { etapa: 'Semana 2–3',  titulo: 'Vida normal progresiva',   detalle: 'Caminadora, pilates y actividades suaves autorizadas. Aún hay inflamación visible en la punta.' },
      { etapa: 'Mes 1',       titulo: 'Forma definida',           detalle: 'La forma general se ve, pero la punta y el dorso pueden seguir un poco engrosados por el tipo de piel.' },
      { etapa: 'Mes 3–18',    titulo: 'Definición final',         detalle: 'En pieles gruesas el resultado se asienta más lento. La definición final llega entre los 12 y 18 meses.' },
    ],
    riesgos: [
      'La piel más gruesa típica de este biotipo puede prolongar la fase de inflamación residual.',
      'No siempre es posible lograr una punta tan refinada como en pieles más delgadas — la honestidad es esencial.',
      'Riesgos generales de toda cirugía: anestesia, infección, hematoma, asimetrías menores.',
    ],
    faqs: [
      { q: '¿Voy a perder mi identidad étnica con la cirugía?', a: 'No. El objetivo de la técnica es equilibrar, no borrar. Trabajamos para que la nariz se vea armónica con tu rostro — sin cambiar quién eres.' },
      { q: '¿Por qué la recuperación se siente más lenta?', a: 'El tipo de piel característico de esta morfología es más grueso y con mayor componente glandular. Esto hace que la inflamación residual tarde más en bajar y que la definición final llegue entre los 12 y 18 meses.' },
      { q: '¿Hace falta usar injertos?', a: 'Es muy frecuente. Para proyectar adecuadamente la punta y dar soporte estable suele requerirse cartílago propio del paciente (septum u oreja).' }, // VALIDAR
      { q: '¿Veré casos similares antes de decidir?', a: 'Sí. En la consulta te mostramos casos reales de pacientes con anatomía similar a la tuya, para que veas resultados realistas — no fotos genéricas de internet.' },
    ],
    seo: {
      title: 'Rinoplastia Afrolatina en Cali | Dr. Víctor Agudelo',
      description: 'Rinoplastia afrolatina en Cali: técnica especializada para narices con rasgos afrolatinos. Preservamos tu identidad mientras logramos más armonía. Dr. Víctor Agudelo.',
      bodyLocation: 'Nariz',
      procedureDescription:
        'Rinoplastia adaptada a la morfología nasal afrolatina: refuerzo de soporte, proyección de punta y manejo especializado de piel gruesa. Realizada por el Dr. Víctor Agudelo en Cali.',
    },
  },

  // ────────────────────────────────────────────────────────────────────
  // 4) Rinoplastia Masculina
  // ────────────────────────────────────────────────────────────────────
  {
    slug: 'masculina',
    path: '/rinoplastia/masculina',
    nombre: 'Rinoplastia Masculina',
    eyebrow: 'Diseño anatómico para el hombre',
    tagline: 'Una nariz fuerte, definida y proporcional. Sin perder masculinidad.',
    duracion: '~4 horas', // VALIDAR CON EL DR. AGUDELO
    intro: [
      'La rinoplastia masculina respeta los rasgos propios de la anatomía del hombre: dorso más recto, ángulos definidos y mayor proyección estructural. No se trata simplemente de "feminizar menos" — es una técnica con criterios estéticos propios.',
      'El objetivo es armonizar la nariz con el resto del rostro sin perder masculinidad: nada de narices respingadas, nada de ángulos forzados. Una nariz que se vea fuerte, natural y proporcional.',
      'En muchos hombres se combina con corrección funcional (septoplastia) para resolver simultáneamente problemas respiratorios.',
    ],
    candidatoIdeal: {
      paraQuienSi: [
        'Hombres que buscan refinar el dorso o la punta manteniendo rasgos masculinos',
        'Casos con dorso prominente, giba, o desviaciones leves a moderadas',
        'Combinación con septoplastia para mejorar respiración',
        'Expectativas claras: no buscar narices feminizadas',
      ],
      paraQuienNo: [
        'Quien busca un resultado muy "respingado" o feminizado — no es coherente con anatomía masculina',
        'Pacientes con contraindicaciones generales para cirugía electiva', // VALIDAR
      ],
    },
    tecnica: {
      descripcion:
        'El Dr. Agudelo aplica técnica estructural con abordaje abierto, manteniendo ángulos nasolabiales y nasofrontales propios de un perfil masculino. El uso de ultrasonido piezoeléctrico aporta precisión en la fase ósea, especialmente útil para conservar un dorso recto y definido.',
      puntosClave: [
        'Ángulos nasolabial y nasofrontal preservados según criterios masculinos',
        'Dorso recto, sin sobre-corrección',
        'Punta definida pero sin rotación excesiva',
        'Posibilidad de combinarse con septoplastia funcional',
        'Resultado natural y estable a largo plazo',
      ],
    },
    galeria: galeriaCasos('Rinoplastia Masculina'),
    recuperacion: [
      { etapa: 'Día 1–2',     titulo: 'Reposo en casa',           detalle: 'Férula nasal puesta. Congestión nasal y leve edema esperable.' },
      { etapa: 'Semana 1',    titulo: 'Retiro de férula',         detalle: 'Se retira la férula nasal. Apto para trabajo de oficina o teletrabajo.' }, // VALIDAR
      { etapa: 'Semana 2–3',  titulo: 'Vida normal progresiva',   detalle: 'Caminata y actividad ligera. Sin esfuerzo físico de carga ni deportes de impacto.' },
      { etapa: 'Mes 1',       titulo: 'Forma definida',           detalle: 'La forma general es clara. La piel masculina, típicamente más gruesa, conserva algo de inflamación en punta.' },
      { etapa: 'Mes 3–12',    titulo: 'Resultado se asienta',     detalle: 'A los 3–4 meses se ve cerca del 90 % del resultado. El resultado definitivo llega entre los 12 y 18 meses.' },
    ],
    riesgos: [
      'En piel masculina más gruesa, la inflamación residual puede tardar más en bajar.',
      'Riesgos generales de toda cirugía: anestesia, infección, hematoma.',
      'Si hay componente respiratorio asociado, puede requerirse septoplastia en el mismo tiempo quirúrgico.',
    ],
    faqs: [
      { q: '¿La nariz va a quedar feminizada?', a: 'No. Toda la técnica está pensada para preservar los ángulos y proporciones masculinas. El objetivo es refinar sin cambiar el carácter del rostro.' },
      { q: '¿Se puede combinar con septoplastia?', a: 'Sí, y es muy frecuente. Si hay tabique desviado o problemas respiratorios, se puede resolver en el mismo tiempo quirúrgico.' },
      { q: '¿Cuánto tiempo necesito de incapacidad?', a: 'Para trabajo de oficina o remoto: 7 a 10 días. Para actividad física moderada: 3 semanas. Para deporte de contacto o impacto: 6 meses.' }, // VALIDAR
      { q: '¿Se nota que estoy operado?', a: 'No, ese es justo el criterio: una nariz que no parezca operada. Diseñamos resultados que se vean tuyos.' },
    ],
    seo: {
      title: 'Rinoplastia Masculina en Cali | Dr. Víctor Agudelo',
      description: 'Rinoplastia masculina en Cali: técnica con criterios anatómicos del hombre — dorso recto, ángulos definidos, resultado natural. Dr. Víctor Agudelo, 20+ años.',
      bodyLocation: 'Nariz',
      procedureDescription:
        'Rinoplastia diseñada con criterios anatómicos masculinos: dorso recto, ángulos nasolabial y nasofrontal preservados, resultado natural sin feminización. Realizada por el Dr. Víctor Agudelo en Cali.',
    },
  },

  // ────────────────────────────────────────────────────────────────────
  // 5) Septoplastia (funcional)
  // ────────────────────────────────────────────────────────────────────
  {
    slug: 'septoplastia',
    path: '/rinoplastia/septoplastia',
    nombre: 'Septoplastia',
    eyebrow: 'Cirugía funcional',
    tagline: 'Para volver a respirar bien por la nariz.',
    duracion: '~1 a 2 horas', // VALIDAR CON EL DR. AGUDELO
    intro: [
      'La septoplastia es una cirugía estrictamente funcional: corrige la desviación del tabique nasal (septum) para restablecer un correcto flujo de aire. No modifica la forma externa de la nariz.',
      'Está indicada en pacientes con obstrucción nasal crónica, ronquido, sinusitis a repetición o dificultad para respirar — síntomas que no se resuelven con tratamiento médico.',
      'Cuando además existe un componente estético que el paciente desea corregir, la septoplastia puede combinarse con rinoplastia en un solo tiempo quirúrgico (septorrinoplastia).',
    ],
    candidatoIdeal: {
      paraQuienSi: [
        'Obstrucción nasal crónica con tabique desviado documentado',
        'Ronquido por dificultad respiratoria nasal',
        'Sinusitis a repetición asociada a desviación septal',
        'Dificultad para respirar durante el ejercicio o el sueño',
      ],
      paraQuienNo: [
        'Pacientes cuya obstrucción nasal es solo por causa alérgica o inflamatoria — primero se trata médicamente',
        'Quien busca mejorar la forma externa de la nariz (eso requiere rinoplastia, no septoplastia sola)',
      ],
    },
    tecnica: {
      descripcion:
        'La cirugía se realiza por dentro de la nariz (sin cicatrices externas en la mayoría de casos). El cirujano accede al tabique, corrige las desviaciones y conserva la estructura cartilaginosa necesaria para mantener la forma nasal. Cuando se combina con rinoplastia, se denomina septorrinoplastia.',
      puntosClave: [
        'Abordaje endonasal — sin cicatrices visibles',
        'Corrección de desviación septal preservando soporte',
        'Mejora directa de la función respiratoria',
        'Posibilidad de combinarse con rinoplastia estética en el mismo tiempo',
        'Recuperación generalmente más corta que una rinoplastia estética',
      ],
    },
    galeria: galeriaCasos('Septoplastia'),
    recuperacion: [
      { etapa: 'Día 1–2',     titulo: 'Reposo en casa',           detalle: 'Congestión nasal marcada. Sin férula externa (en la mayoría de casos). Hielo y elevación de cabecera.' },
      { etapa: 'Semana 1',    titulo: 'Mejora respiratoria',      detalle: 'Comienza a notarse mejoría en el flujo de aire al ceder la inflamación interna.' }, // VALIDAR
      { etapa: 'Semana 2–3',  titulo: 'Vida normal',              detalle: 'Reincorporación a trabajo y actividad física suave. La respiración mejora de forma progresiva.' },
      { etapa: 'Mes 1',       titulo: 'Función restablecida',     detalle: 'La función respiratoria se estabiliza. Pueden persistir sensaciones leves de cambio que ceden con el tiempo.' },
      { etapa: 'Mes 3–6',     titulo: 'Resultado funcional final', detalle: 'Función nasal completamente estabilizada. Mejora sostenida en respiración, sueño y ejercicio.' },
    ],
    riesgos: [
      'Riesgos generales de toda cirugía: anestesia, sangrado, infección.',
      'En casos muy específicos puede persistir alguna obstrucción residual si hay componente inflamatorio o alérgico asociado.',
      'La septoplastia no modifica la forma externa: si se desea cambio estético, debe combinarse con rinoplastia.',
    ],
    faqs: [
      { q: '¿La septoplastia cambia la forma de mi nariz?', a: 'No. Es una cirugía funcional, no estética. Solo corrige el tabique interno para mejorar la respiración. Si además quieres cambiar la forma externa, se combina con rinoplastia.' },
      { q: '¿Qué es una septorrinoplastia?', a: 'Es la combinación de septoplastia (función) y rinoplastia (estética) en un mismo tiempo quirúrgico. Es muy frecuente cuando hay un tabique desviado y, a la vez, un componente estético que se desea corregir.' },
      { q: '¿La cubre mi seguro o EPS?', a: 'En muchos casos sí, cuando hay indicación médica documentada (obstrucción nasal). Cada caso se evalúa individualmente; en consulta orientamos sobre el proceso.' }, // VALIDAR proceso administrativo
      { q: '¿Cuánto tarda la recuperación?', a: 'Generalmente es más corta que una rinoplastia estética. La mayoría de pacientes vuelve a trabajo de oficina en 5–7 días y a actividad física suave a las 2–3 semanas.' }, // VALIDAR
    ],
    seo: {
      title: 'Septoplastia en Cali | Cirugía Funcional Nasal — Dr. Víctor Agudelo',
      description: 'Septoplastia en Cali: cirugía funcional para corregir el tabique desviado y mejorar la respiración nasal. Posibilidad de combinarse con rinoplastia. Dr. Víctor Agudelo.',
      bodyLocation: 'Tabique nasal',
      procedureDescription:
        'Cirugía funcional del tabique nasal (septoplastia) para corregir desviaciones septales y restablecer la respiración nasal. Realizada por el Dr. Víctor Agudelo en Cali.',
    },
  },
]

export const getProcedimientoBySlug = (slug: string | undefined): Procedimiento | undefined =>
  PROCEDIMIENTOS.find(p => p.slug === slug)
