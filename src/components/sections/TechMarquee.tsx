const ICONS =
  "cypress,postman,postgres,mongodb,docker,git,github,js,ts,python,react,nodejs,linux,vscode,pandas";

const Row = () => {
  const list = ICONS.split(",");
  const items = [...list, ...list];

  return (
    <div
      className="flex gap-8 items-center"
      style={{
        animation: "marquee-left 35s linear infinite",
        width: "max-content",
      }}
    >
      {items.map((name, i) => (
        <img
          key={`${name}-${i}`}
          src={`https://skillicons.dev/icons?i=${name}`}
          alt={name}
          width={36}
          height={36}
          loading="lazy"
          className="w-9 h-9 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 hover:scale-110 transition-all duration-300"
        />
      ))}
    </div>
  );
};

export const TechMarquee = () => {
  return (
    <section className="py-10 border-y border-border/40 bg-secondary/20">
      <p className="text-center text-[10px] uppercase tracking-[0.4em] text-muted-foreground mb-6">
        Tools & Technologies I am familiar with
      </p>
      <div
        className="overflow-hidden w-full"
        style={{
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
          maskImage:
            "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        }}
      >
        <Row />
      </div>
    </section>
  );
};
