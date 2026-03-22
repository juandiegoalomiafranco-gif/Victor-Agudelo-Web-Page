import { useState } from "react";
import { motion } from "framer-motion";
import { Send, MessageCircle, Mail, Phone, MapPin } from "lucide-react";

const serviceOptions = [
  "Material POP",
  "Señalización",
  "Publicidad en Eventos",
  "Branding Físico",
  "Impresión Gran Formato",
  "Puntos de Venta",
];

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    service: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Hola, soy ${formData.name} de ${formData.company}. Me interesa el servicio de ${formData.service}. ${formData.message}`;
    window.open(`https://wa.me/573001234567?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <section id="contacto" className="py-24 lg:py-32 bg-secondary">
      <div className="container mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-accent text-xs font-body font-semibold uppercase tracking-[0.2em] mb-4">
            Contacto
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-extrabold text-foreground leading-tight">
            ¿Listo para hacer{" "}
            <span className="text-gradient-brand italic">visible</span> tu marca?
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12 max-w-5xl mx-auto">
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-3 space-y-5"
          >
            <div className="grid sm:grid-cols-2 gap-5">
              <input
                type="text"
                name="name"
                placeholder="Tu nombre"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-card border border-border rounded-md px-4 py-3.5 text-foreground text-sm font-body placeholder:text-muted-foreground focus:outline-none focus:border-accent transition-colors"
              />
              <input
                type="text"
                name="company"
                placeholder="Tu empresa"
                value={formData.company}
                onChange={handleChange}
                className="w-full bg-card border border-border rounded-md px-4 py-3.5 text-foreground text-sm font-body placeholder:text-muted-foreground focus:outline-none focus:border-accent transition-colors"
              />
            </div>
            <select
              name="service"
              required
              value={formData.service}
              onChange={handleChange}
              className="w-full bg-card border border-border rounded-md px-4 py-3.5 text-foreground text-sm font-body focus:outline-none focus:border-accent transition-colors appearance-none"
            >
              <option value="" disabled>Servicio que necesitas</option>
              {serviceOptions.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
            <textarea
              name="message"
              placeholder="Cuéntanos sobre tu proyecto..."
              rows={4}
              value={formData.message}
              onChange={handleChange}
              className="w-full bg-card border border-border rounded-md px-4 py-3.5 text-foreground text-sm font-body placeholder:text-muted-foreground focus:outline-none focus:border-accent transition-colors resize-none"
            />
            <button
              type="submit"
              className="w-full bg-accent text-accent-foreground px-6 py-4 rounded-md text-base font-bold hover:brightness-110 transition-all inline-flex items-center justify-center gap-2"
            >
              <Send size={18} />
              Enviar cotización
            </button>
          </motion.form>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2 space-y-8"
          >
            <div>
              <h3 className="text-lg font-heading font-bold text-foreground mb-4">
                Datos de contacto
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <MapPin className="text-accent shrink-0 mt-0.5" size={18} />
                  <span className="text-muted-foreground text-sm">Bogotá, Colombia</span>
                </li>
                <li className="flex items-start gap-3">
                  <Phone className="text-accent shrink-0 mt-0.5" size={18} />
                  <span className="text-muted-foreground text-sm">+57 (1) 234 5678</span>
                </li>
                <li className="flex items-start gap-3">
                  <Mail className="text-accent shrink-0 mt-0.5" size={18} />
                  <span className="text-muted-foreground text-sm">info@imagenesgraficas.com</span>
                </li>
              </ul>
            </div>

            <a
              href="https://wa.me/573001234567"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 w-full bg-emerald-600 text-white px-6 py-4 rounded-md font-bold hover:bg-emerald-700 transition-colors"
            >
              <MessageCircle size={22} />
              Escríbenos por WhatsApp
            </a>

            <p className="text-muted-foreground text-xs leading-relaxed">
              Respondemos en menos de 24 horas. También puedes agendar una llamada directamente con nuestro equipo comercial.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
