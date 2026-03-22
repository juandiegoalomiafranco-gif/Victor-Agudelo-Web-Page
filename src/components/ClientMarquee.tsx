const clients = [
  "Bavaria", "Postobón", "Alpina", "Nutresa", "Grupo Éxito", "EPM", "Bancolombia", "Sura"
];

const ExactMarquee = () => {
  return (
    <section className="py-12 bg-white overflow-hidden border-b border-black/[0.03]">
      <div className="flex whitespace-nowrap relative">
        <div className="animate-marquee flex gap-16 lg:gap-32 items-center text-primary/30">
          {[...clients, ...clients, ...clients].map((client, i) => (
            <span key={i} className="text-xl md:text-2xl font-heading font-extrabold tracking-tight hover:text-primary transition-colors duration-300">
              {client}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExactMarquee;
