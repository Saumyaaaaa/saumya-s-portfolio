const ICONS = "cypress,postman,postgres,mongodb,docker,git,github,js,ts,python,react,nodejs,linux,vscode,pandas";
const ICONS_2 = "ts,react,nodejs,python,docker,postgres,mongodb,git,github,linux,vscode,js,postman,cypress,pandas";

const Row = ({ icons, direction, delay = "0s" }: { icons: string; direction: "left" | "right"; delay?: string }) => {
  // Build twice for seamless loop. Use individual icon URLs to allow per-icon hover grayscale.
  const list = icons.split(",");
  const items = [...list, ...list];
  return (
    <div className="flex gap-10 md:gap-14 shrink-0" style={{ animation: `marquee-${direction} 50s linear infinite`, animationDelay: delay }}>
      {items.map((name, i) => (
        <img
          key={`${name}-${i}`}
          src={`https://skillicons.dev/icons?i=${name}`}
          alt={name}
          width={48}
          height={48}
          loading="lazy"
          className="w-12 h-12 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 hover:scale-110 transition-all duration-300"
        />
      ))}
    </div>
  );
};

export const TechMarquee = () => {
  return (
    <section className="py-20 md:py-28 border-y border-border/40 bg-secondary/30 relative overflow-hidden">
      <div className="container">
        <p className="text-center text-xs uppercase tracking-[0.4em] text-muted-foreground mb-12">
          Tools & Technologies I work with
        </p>
      </div>

      <div className="space-y-6 md:space-y-8 marquee-mask group" style={{ animationPlayState: "running" }}>
        <div className="flex w-max hover:[&>*]:[animation-play-state:paused]">
          <Row icons={ICONS} direction="left" />
          <div className="w-10 md:w-14" />
          <Row icons={ICONS} direction="left" />
        </div>
        {/* Hide second row on mobile */}
        <div className="hidden md:flex w-max hover:[&>*]:[animation-play-state:paused]">
          <Row icons={ICONS_2} direction="right" />
          <div className="w-14" />
          <Row icons={ICONS_2} direction="right" />
        </div>
      </div>
    </section>
  );
};
