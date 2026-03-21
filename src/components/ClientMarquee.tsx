const clients = [
  "Postobón", "Coomeva", "Grupo Éxito", "Bavaria", "Colombina",
  "Colpatria", "Bancolombia", "Alpina", "Nutresa", "EPM",
];

const ClientMarquee = () => {
  return (
    <section className="py-12 bg-background border-b border-border overflow-hidden">
      <p className="text-center text-sm font-semibold uppercase tracking-[0.15em] text-muted-foreground mb-8">
        Confían en nosotros
      </p>
      <div className="relative overflow-hidden">
        <div className="animate-marquee flex gap-16 whitespace-nowrap">
          {[...clients, ...clients].map((client, i) => (
            <span
              key={i}
              className="text-2xl font-bold text-muted-foreground/40 hover:text-foreground transition-colors duration-300 select-none"
            >
              {client}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientMarquee;
