// Casos reales antes/después del Dr. Agudelo. Fuente única de la galería de
// cada procedimiento (/rinoplastia/:slug) y de "Resultados reales" en
// /testimonios.
//
// Las fotos se publican con el consentimiento de cada paciente. Están
// procesadas en public/images/procedimientos/<slug>/: cada par antes/después
// viene alineado (misma escala y posición del rostro, recorte 4:5) para que
// el comparador deslizable no "salte", en dos tamaños (1000×1250 y -sm 600×750).
//
// Para agregar un caso: subir `caso-NN-<vista>-antes(.webp|-sm.webp)` y
// `-despues` a la carpeta del procedimiento y añadir su entrada aquí.

export type Vista = 'frente' | 'perfil' | 'tres-cuartos'

export const VISTA_LABEL: Record<Vista, string> = {
  frente: 'Frente',
  perfil: 'Perfil',
  'tres-cuartos': '¾',
}

export type Foto = { src: string; srcSm: string }

export type CasoVista = { vista: Vista; antes: Foto; despues: Foto }

export type Caso = {
  id: string
  procedimiento: string // slug de PROCEDIMIENTOS
  vistas: CasoVista[]
  nota?: string
}

export type Resultado = { id: string; procedimiento: string; vista: Vista; foto: Foto }

const foto = (slug: string, base: string): Foto => ({
  src: `/images/procedimientos/${slug}/${base}.webp`,
  srcSm: `/images/procedimientos/${slug}/${base}-sm.webp`,
})

const par = (slug: string, caso: string, vista: Vista): CasoVista => ({
  vista,
  antes: foto(slug, `${caso}-${vista}-antes`),
  despues: foto(slug, `${caso}-${vista}-despues`),
})

const AFRO = 'afrolatina'

// El orden define la numeración visible ("Caso 1", "Caso 2"…). La primera
// vista de cada caso es la que se muestra al seleccionarlo.
export const CASOS: Caso[] = [
  {
    id: 'caso-05', procedimiento: AFRO,
    vistas: [par(AFRO, 'caso-05', 'perfil'), par(AFRO, 'caso-05', 'frente'), par(AFRO, 'caso-05', 'tres-cuartos')],
    nota: 'Dorso más recto y punta mejor definida, conservando la base propia de sus rasgos.',
  },
  {
    id: 'caso-08', procedimiento: AFRO,
    vistas: [par(AFRO, 'caso-08', 'perfil'), par(AFRO, 'caso-08', 'frente')],
    nota: 'Corrección de la giba dorsal: el perfil queda recto y armónico con el mentón.',
  },
  {
    id: 'caso-06', procedimiento: AFRO,
    vistas: [par(AFRO, 'caso-06', 'perfil'), par(AFRO, 'caso-06', 'frente'), par(AFRO, 'caso-06', 'tres-cuartos')],
    nota: 'Perfil más fino y punta proyectada, con un resultado natural.',
  },
  {
    id: 'caso-07', procedimiento: AFRO,
    vistas: [par(AFRO, 'caso-07', 'perfil'), par(AFRO, 'caso-07', 'frente'), par(AFRO, 'caso-07', 'tres-cuartos')],
    nota: 'Refinamiento de la punta y las alas nasales, respetando su identidad.',
  },
  {
    id: 'caso-04', procedimiento: AFRO,
    vistas: [par(AFRO, 'caso-04', 'frente'), par(AFRO, 'caso-04', 'tres-cuartos'), par(AFRO, 'caso-04', 'perfil')],
    nota: 'Nariz más estrecha y definida vista de frente.',
  },
  {
    id: 'caso-01', procedimiento: AFRO,
    vistas: [par(AFRO, 'caso-01', 'frente'), par(AFRO, 'caso-01', 'tres-cuartos')],
    nota: 'Base nasal más armónica y punta refinada.',
  },
]

// Fotos de resultado sin "antes" disponible (se muestran sin comparador).
export const RESULTADOS: Resultado[] = [
  { id: 'caso-02-frente', procedimiento: AFRO, vista: 'frente', foto: foto(AFRO, 'caso-02-frente-resultado') },
  { id: 'caso-02-tres-cuartos', procedimiento: AFRO, vista: 'tres-cuartos', foto: foto(AFRO, 'caso-02-tres-cuartos-resultado') },
  { id: 'caso-02-perfil', procedimiento: AFRO, vista: 'perfil', foto: foto(AFRO, 'caso-02-perfil-resultado') },
]

// Los mejores comparadores (vista de perfil) para /testimonios.
export const CASOS_DESTACADOS: { caso: Caso; vista: CasoVista }[] = ['caso-05', 'caso-08', 'caso-06']
  .map(id => CASOS.find(c => c.id === id)!)
  .map(caso => ({ caso, vista: caso.vistas[0] }))

export const casosDe = (slug: string) => CASOS.filter(c => c.procedimiento === slug)
export const resultadosDe = (slug: string) => RESULTADOS.filter(r => r.procedimiento === slug)

export const altCaso = (nombreProc: string, n: number, vista: Vista, momento: 'antes' | 'después') =>
  `${nombreProc}, caso ${n}, vista de ${VISTA_LABEL[vista] === '¾' ? 'tres cuartos' : VISTA_LABEL[vista].toLowerCase()} — ${momento} — Dr. Víctor Agudelo, Cali`
