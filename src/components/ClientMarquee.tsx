const clients = [
  "Postobón", "Coomeva", "Grupo Éxito", "Bavaria", "Colombina",
  "Colpatria", "Bancolombia", "Alpina", "Nutresa", "EPM",
];

const ClientMarquee = () => {
  return (
    <section className="py-10 bg-secondary border-y border-border overflow-hidden">
      <p className="text-center text-xs font-body font-semibold uppercase tracking-[0.2em] text-muted-foreground mb-6">
        Marcas que confían en nosotros
      </p>
      <div className="relative overflow-hidden">
        <div className="animate-marquee flex gap-20 whitespace-nowrap">
          {[...clients, ...clients].map((client, i) => (
            <span
              key={i}
              className="text-xl font-body font-bold text-foreground/20 hover:text-accent transition-colors duration-500 select-none cursor-default"
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
