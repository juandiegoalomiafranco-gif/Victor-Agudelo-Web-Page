// Fuente única de las preguntas frecuentes de /preguntas-frecuentes.
// La página consume FAQ_CATEGORIES (renderiza **negrita**); seo.ts consume
// FAQ_SCHEMA_ENTRIES (texto plano) para el schema FAQPage.

export interface FaqItem {
  q: string
  a: string
}

export interface FaqCategory {
  id: string
  titulo: string
  subtitulo: string
  preguntas: FaqItem[]
}

export const FAQ_CATEGORIES: FaqCategory[] = [
  {
    id: 'antes-consulta',
    titulo: 'Antes de la consulta',
    subtitulo: 'Cómo empezar, qué cuesta y cómo pedir tu evaluación inicial.',
    preguntas: [
      {
        q: '¿Cuánto cuesta la consulta?',
        a: 'La consulta médica con el Dr. Agudelo tiene un costo de $250.000 COP, sea virtual o presencial. La **evaluación inicial por fotos es gratuita y sin compromiso**: nos envías frente y perfil sin flash y recibes una primera valoración para saber si la cirugía es viable en tu caso.',
      },
      {
        q: '¿Publican precios de cirugía?',
        a: 'No publicamos precios fijos porque cada caso es diferente — el costo varía según la técnica necesaria, la complejidad y si es primaria o secundaria. Después de la consulta médica completa entregamos una cotización personalizada y por escrito.',
      },
      {
        q: '¿Cómo solicito mi evaluación gratuita?',
        a: 'Por el formulario de la página o directamente por WhatsApp al +57 302 323 4594. Envías dos fotos (frente y perfil, sin flash, sin maquillaje) y en menos de 48 horas recibes una respuesta.',
      },
      {
        q: '¿Puedo tener la consulta de forma virtual?',
        a: 'Sí. Atendemos pacientes nacionales e internacionales por videoconsulta. Tiene el mismo costo que la presencial y permite la misma planeación quirúrgica.',
      },
      {
        q: '¿Cuánto tiempo antes de la cirugía debo hacer la consulta?',
        a: 'Idealmente entre 4 y 6 semanas antes. Eso da tiempo para los exámenes prequirúrgicos, despejar dudas y agendar con tranquilidad.',
      },
    ],
  },
  {
    id: 'sobre-consulta',
    titulo: 'Sobre la consulta',
    subtitulo: 'Qué pasa en la cita, quién te atiende y cómo planeamos tu cirugía.',
    preguntas: [
      {
        q: '¿Qué pasa en la consulta médica?',
        a: 'El Dr. Agudelo evalúa tu nariz desde lo estético y lo funcional, conversa contigo sobre lo que buscas, te muestra casos similares y te explica qué es realista en tu caso específico. La consulta dura entre 45 y 60 minutos.',
      },
      {
        q: '¿Me hacen una simulación de cómo voy a quedar?',
        a: 'Sí. Trabajamos con simulación digital sobre tus propias fotos para que ambos partamos del mismo objetivo. La simulación es una guía — no una promesa exacta — pero ayuda a alinear expectativas antes de operar.',
      },
      {
        q: '¿Quién atiende la consulta?',
        a: 'El Dr. Víctor Agudelo personalmente. No delegamos la consulta inicial ni los controles posteriores.',
      },
      {
        q: '¿Qué exámenes necesito antes de operarme?',
        a: 'Una valoración prequirúrgica completa: laboratorios (hemograma, coagulación, función renal), electrocardiograma y valoración por anestesiología. Si tienes condiciones particulares (hipertensión, hipotiroidismo, etc.) podemos pedir adicionales.',
      },
    ],
  },
  {
    id: 'la-cirugia',
    titulo: 'La cirugía',
    subtitulo: 'Duración, anestesia, técnica y quién opera.',
    preguntas: [
      {
        q: '¿Cuánto dura la cirugía?',
        a: 'La rinoplastia primaria dura aproximadamente 4 horas. La secundaria puede tomar más tiempo según la complejidad.',
      },
      {
        q: '¿Qué tipo de anestesia se usa?',
        a: 'Anestesia general, administrada por un anestesiólogo certificado. Es lo más seguro para el paciente y permite que el cirujano trabaje con precisión.',
      },
      {
        q: '¿Es ambulatoria u hospitalaria?',
        a: 'Es ambulatoria. Sales el mismo día con el primer control programado para las siguientes 24-48 horas.',
      },
      {
        q: '¿Usan ultrasonido en la cirugía?',
        a: 'Sí. Llevamos más de dos años usando **ultrasonido piezoeléctrico (Piezosurgery)** para modificar la estructura ósea con mayor precisión, menos trauma y menos moretones que las técnicas tradicionales con martillo y formón.',
      },
      {
        q: '¿Quién opera?',
        a: 'El Dr. Víctor Agudelo realiza personalmente toda la cirugía. No hay cirujano en formación operando, ni residente cerrando.',
      },
      {
        q: '¿Dónde se realiza la cirugía?',
        a: 'En clínica certificada con todos los estándares de habilitación. Te informamos la sede específica al confirmar el agendamiento.',
      },
    ],
  },
  {
    id: 'recuperacion',
    titulo: 'Recuperación',
    subtitulo: 'Molestias, tiempos, cuidados y cuándo retomas tu vida normal.',
    preguntas: [
      {
        q: '¿La cirugía duele?',
        a: 'No es dolorosa — es **incómoda**. La principal molestia es la congestión nasal de los primeros 5-7 días. La mayoría de pacientes se sorprende positivamente con la recuperación.',
      },
      {
        q: '¿Cuánto tiempo de incapacidad laboral necesito?',
        a: 'Para trabajos de oficina: 7 a 10 días. Para trabajos físicos o que impliquen exposición al sol o esfuerzo: más tiempo. Lo evaluamos caso a caso.',
      },
      {
        q: '¿Cuánto tiempo tengo la férula?',
        a: 'La férula externa se retira entre los 7 y 10 días después de la cirugía. Los puntos internos se reabsorben solos.',
      },
      {
        q: '¿Voy a tener moretones e inflamación?',
        a: 'Algo de inflamación y moretones bajo los ojos es normal los primeros 7-10 días. Con la técnica ultrasónica los moretones son significativamente menores que con técnicas tradicionales.',
      },
      {
        q: '¿Cuándo puedo tomar un vuelo?',
        a: '10 días después de la cirugía.',
      },
      {
        q: '¿Cuándo puedo usar gafas?',
        a: 'Para apoyarlas sobre la nariz: 2 meses después. Antes puedes usarlas apoyadas sobre la férula de protección o con accesorios que las eleven.',
      },
      {
        q: '¿Cuándo vuelvo al deporte?',
        a: 'Pesas al 70%, caminadora, pilates: desde la semana 3. Trotar o saltar: semana 6. Deportes de contacto (fútbol, boxeo, artes marciales): 6 meses.',
      },
      {
        q: '¿Puedo exponerme al sol?',
        a: 'Evita el sol directo y usa protector solar SPF 50+ durante los primeros 6 meses. La piel inflamada se pigmenta con facilidad.',
      },
      {
        q: '¿Puedo sonarme la nariz?',
        a: 'No durante las primeras 3 semanas. Te explicamos cómo manejar la congestión con lavados de suero fisiológico.',
      },
    ],
  },
  {
    id: 'resultados',
    titulo: 'Resultados',
    subtitulo: 'Cuándo ves el resultado, si es permanente y cómo trabajamos las expectativas.',
    preguntas: [
      {
        q: '¿Cuándo voy a ver mi resultado final?',
        a: 'A los 7-10 días ya se ve la nueva forma. El **resultado final completo se aprecia entre los 6 y 12 meses**, cuando termina de bajar toda la inflamación profunda. La punta es lo último en desinflamarse.',
      },
      {
        q: '¿El resultado es permanente?',
        a: 'Sí. La rinoplastia es definitiva. La nariz cambia muy lentamente con la edad como el resto del rostro, pero la forma quirúrgica se mantiene.',
      },
      {
        q: '¿Voy a quedar con cicatrices visibles?',
        a: 'No. En la rinoplastia abierta queda una cicatriz pequeña en la columela (entre las fosas nasales) que en pocas semanas es prácticamente imperceptible. En cierres internos no queda ninguna cicatriz visible.',
      },
      {
        q: '¿Puedo elegir cómo quiero quedar?',
        a: 'Trabajamos en conjunto. Tú aportas el objetivo, el doctor aporta lo que es técnicamente posible y armónico con tu rostro. Nunca prometemos resultados imposibles ni "narices de molde".',
      },
      {
        q: '¿Y si no me gusta el resultado?',
        a: 'Trabajamos con simulación previa para alinear expectativas y minimizar ese riesgo. El acompañamiento postoperatorio incluye varios controles. Si después del primer año persiste algo a corregir, evaluamos juntos opciones (incluyendo retoques menores que en algunos casos están contemplados).',
      },
      {
        q: '¿Cuántos controles tengo después de la cirugía?',
        a: 'Controles a las 24-48 horas, 7-10 días (retiro de férula), 1 mes, 3 meses, 6 meses y 12 meses. Todos con el Dr. Agudelo directamente.',
      },
    ],
  },
  {
    id: 'riesgos',
    titulo: 'Riesgos y casos especiales',
    subtitulo: 'Riesgos reales, respiración, tabique y casos particulares.',
    preguntas: [
      {
        q: '¿Cuáles son los riesgos de una rinoplastia?',
        a: 'Como toda cirugía, tiene riesgos: infección, sangrado, asimetrías, irregularidades en el contorno o necesidad de retoque. Los riesgos son bajos cuando la cirugía la hace un cirujano calificado en una clínica habilitada y el paciente sigue las indicaciones postoperatorias.',
      },
      {
        q: '¿Puede afectar mi respiración?',
        a: 'Al contrario: una rinoplastia bien planeada **puede mejorar la respiración**. Si tienes desviación del tabique o problemas funcionales, lo corregimos en la misma cirugía (rinoseptoplastia).',
      },
      {
        q: '¿Y si tengo desviación del tabique?',
        a: 'Lo evaluamos en consulta. En la mayoría de casos hacemos la **septoplastia** (corrección funcional) y la rinoplastia estética en un solo tiempo quirúrgico.',
      },
      {
        q: '¿Me puedo operar si me he aplicado ácido hialurónico en la nariz?',
        a: 'Sí. Lo ideal es disolverlo previamente con hialuronidasa antes de la cirugía. Lo evaluamos en consulta.',
      },
      {
        q: '¿A qué edad puedo operarme?',
        a: 'Desde los 17-18 años, una vez completado el crecimiento facial. No hay edad máxima mientras la persona esté en buen estado de salud.',
      },
      {
        q: '¿Hago rinoplastia secundaria si quedé inconforme con una cirugía previa?',
        a: 'Sí. El Dr. Agudelo tiene amplia experiencia en **rinoplastia secundaria** (revisión). Es una cirugía más compleja porque trabajamos sobre tejido ya operado, pero los resultados son posibles. Conversamos en consulta sobre qué es realista corregir.',
      },
      {
        q: '¿La rinoplastia afrolatina es diferente?',
        a: 'Sí. Las narices con rasgos afrolatinos tienen una anatomía específica (piel más gruesa, cartílagos diferentes, ángulos distintos). Aplicamos técnicas que **respetan la identidad étnica** y logran armonía sin borrar los rasgos del paciente.',
      },
    ],
  },
  {
    id: 'costos',
    titulo: 'Costos y financiación',
    subtitulo: 'Qué incluye la cotización y opciones de pago.',
    preguntas: [
      {
        q: '¿Cuánto cuesta la cirugía?',
        a: 'Cada caso es diferente. Después de la consulta médica entregamos una cotización personalizada por escrito que incluye honorarios del cirujano, anestesiólogo, clínica y materiales.',
      },
      {
        q: '¿Tienen opciones de financiación?',
        a: 'Conversamos opciones de pago en consulta. Aceptamos efectivo, tarjeta de crédito y transferencia bancaria. Si necesitas crédito médico, te orientamos sobre alternativas.',
      },
      {
        q: '¿El precio cambia según la técnica?',
        a: 'Sí. La rinoplastia ultrasónica, la secundaria de alta complejidad o las cirugías combinadas (rinoplastia + mentoplastia) tienen costos diferentes a una primaria estándar.',
      },
      {
        q: '¿Qué incluye la cotización?',
        a: 'Cirujano principal, anestesiólogo, sala quirúrgica, materiales, férula, primera consulta postoperatoria y los controles del primer año.',
      },
    ],
  },
]

// Texto plano (sin marcadores **) para el schema FAQPage en seo.ts.
export const FAQ_SCHEMA_ENTRIES: FaqItem[] = FAQ_CATEGORIES.flatMap(cat =>
  cat.preguntas.map(({ q, a }) => ({ q, a: a.replace(/\*\*/g, '') })),
)
