import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

export function PrivacidadPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#FAF7F2', fontFamily: 'var(--font-sans, DM Sans, sans-serif)' }}>
      {/* Header */}
      <header style={{
        position: 'sticky', top: 0, zIndex: 50,
        background: 'rgba(250,247,242,0.96)', backdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(0,0,0,0.07)',
        padding: '1rem 1.5rem',
        display: 'flex', alignItems: 'center', gap: '1rem',
      }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none', color: '#475569', fontSize: '0.875rem', fontWeight: 500 }}>
          <ArrowLeft style={{ width: '16px', height: '16px' }} />
          Volver
        </Link>
        <span style={{ color: '#94a3b8', fontSize: '0.8rem' }}>Política de Tratamiento de Datos</span>
      </header>

      {/* Content */}
      <main style={{ maxWidth: '720px', margin: '0 auto', padding: '4rem 1.5rem 8rem' }}>
        <h1 style={{
          fontFamily: 'var(--font-serif, Cormorant Garamond, Georgia, serif)',
          fontSize: 'clamp(2rem, 4vw, 2.8rem)',
          fontWeight: 600, lineHeight: 1.1, letterSpacing: '-0.025em',
          color: '#1A1A1A', marginBottom: '0.5rem',
        }}>
          Política de Tratamiento de Datos Personales
        </h1>
        <p style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '3rem' }}>
          Última actualización: abril de 2026
        </p>

        <Section title="1. Identificación del Responsable del Tratamiento">
          <p>
            El responsable del tratamiento de los datos personales recolectados a través de este sitio web es:
          </p>
          <ul>
            <li><strong>Nombre:</strong> Dr. Víctor Manuel Agudelo</li>
            <li><strong>Actividad:</strong> Médico especialista en Otorrinolaringología y Cirugía Plástica Facial</li>
            <li><strong>Dirección:</strong> Av. 4 Norte # 14-38, Consultorio 302, Cali, Valle del Cauca, Colombia</li>
            <li><strong>Correo electrónico:</strong> contacto@drvictoragudelo.com</li>
            <li><strong>Teléfono:</strong> +57 302 323 4594</li>
          </ul>
        </Section>

        <Section title="2. Datos Personales Recolectados">
          <p>A través de este sitio web recolectamos los siguientes datos:</p>
          <ul>
            <li>Nombre completo</li>
            <li>Correo electrónico</li>
            <li>Número de teléfono / WhatsApp</li>
            <li>Mensaje o descripción del caso clínico</li>
            <li>Fotografías enviadas voluntariamente para evaluación (frente y perfil)</li>
          </ul>
          <p>
            No recolectamos datos financieros, documentos de identidad ni información sensible adicional a la descrita anteriormente, salvo que sea estrictamente necesario para la prestación del servicio médico y con el consentimiento explícito del titular.
          </p>
        </Section>

        <Section title="3. Finalidad del Tratamiento">
          <p>Los datos recolectados se utilizan exclusivamente para:</p>
          <ul>
            <li>Evaluar la viabilidad de procedimientos quirúrgicos o estéticos faciales solicitados por el titular</li>
            <li>Agendar y gestionar consultas médicas (virtuales o presenciales)</li>
            <li>Dar seguimiento postoperatorio a pacientes del Dr. Víctor Manuel Agudelo</li>
            <li>Responder inquietudes o solicitudes enviadas a través del formulario de contacto</li>
            <li>Cumplir con obligaciones legales aplicables en materia de atención en salud</li>
          </ul>
          <p>Los datos <strong>no</strong> serán vendidos, cedidos ni compartidos con terceros con fines comerciales.</p>
        </Section>

        <Section title="4. Derechos del Titular de los Datos">
          <p>Como titular de sus datos personales, usted tiene derecho a:</p>
          <ul>
            <li><strong>Conocer</strong> los datos personales que tenemos sobre usted y el tratamiento que se les da</li>
            <li><strong>Actualizar y rectificar</strong> sus datos cuando sean inexactos, incompletos o desactualizados</li>
            <li><strong>Suprimir</strong> sus datos cuando no sean necesarios para la finalidad para la que fueron recolectados o cuando haya vencido la finalidad del tratamiento</li>
            <li><strong>Revocar la autorización</strong> otorgada para el tratamiento de sus datos, siempre que no exista una obligación legal o contractual que lo impida</li>
            <li><strong>Presentar quejas</strong> ante la Superintendencia de Industria y Comercio (SIC) por infracciones a la normativa de protección de datos</li>
          </ul>
        </Section>

        <Section title="5. Canal para Ejercer sus Derechos">
          <p>Para ejercer cualquiera de los derechos descritos anteriormente, el titular puede contactarnos a través de:</p>
          <ul>
            <li><strong>Correo electrónico:</strong> contacto@drvictoragudelo.com</li>
            <li><strong>Dirección física:</strong> Av. 4 Norte # 14-38, Consultorio 302, Cali, Colombia</li>
            <li><strong>WhatsApp:</strong> +57 302 323 4594</li>
          </ul>
          <p>
            Responderemos su solicitud dentro de los plazos establecidos por la ley colombiana (máximo 15 días hábiles para consultas, 15 días hábiles para reclamos, prorrogables por 8 días hábiles adicionales).
          </p>
        </Section>

        <Section title="6. Vigencia del Tratamiento">
          <p>
            Los datos personales serán conservados durante el tiempo necesario para cumplir la finalidad para la que fueron recolectados, o durante el tiempo que la ley colombiana exija para efectos médicos, tributarios o de otro tipo.
          </p>
          <p>
            Una vez vencida la finalidad del tratamiento, los datos serán eliminados de forma segura o anonimizados, salvo que exista obligación legal de conservarlos.
          </p>
        </Section>

        <Section title="7. Seguridad de los Datos">
          <p>
            Adoptamos medidas técnicas y organizativas razonables para proteger sus datos personales contra acceso no autorizado, pérdida, alteración o divulgación indebida. Sin embargo, ningún sistema de transmisión por internet es completamente seguro.
          </p>
        </Section>

        <Section title="8. Marco Legal Aplicable">
          <p>Esta política se rige por:</p>
          <ul>
            <li>Ley 1581 de 2012 — Régimen General de Protección de Datos Personales de Colombia</li>
            <li>Decreto 1377 de 2013 — Reglamentación parcial de la Ley 1581 de 2012</li>
            <li>Circular Externa 002 de 2015 de la Superintendencia de Industria y Comercio (SIC)</li>
          </ul>
        </Section>

        <Section title="9. Actualización de esta Política">
          <p>
            Nos reservamos el derecho de modificar esta política en cualquier momento. Cualquier cambio relevante será comunicado a través de este sitio web. El uso continuado del sitio después de cualquier cambio constituye la aceptación de la nueva política.
          </p>
        </Section>

        <div style={{ marginTop: '3rem', padding: '1.5rem', background: 'rgba(0,0,0,0.04)', borderRadius: '12px', fontSize: '0.85rem', color: '#64748b', lineHeight: 1.7 }}>
          Para más información sobre sus derechos, puede consultar el sitio web de la Superintendencia de Industria y Comercio:{' '}
          <a href="https://www.sic.gov.co" target="_blank" rel="noopener noreferrer" style={{ color: '#2D4A3E' }}>www.sic.gov.co</a>
        </div>
      </main>
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section style={{ marginBottom: '2.5rem' }}>
      <h2 style={{
        fontSize: '1.1rem', fontWeight: 700, color: '#1A1A1A',
        marginBottom: '1rem', letterSpacing: '-0.01em',
      }}>
        {title}
      </h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', color: '#475569', fontSize: '0.9rem', lineHeight: 1.75 }}>
        {children}
      </div>
      <style>{`
        section ul { padding-left: 1.25rem; display: flex; flex-direction: column; gap: 0.375rem; }
        section li { list-style: disc; }
        section p { margin: 0; }
      `}</style>
    </section>
  )
}
