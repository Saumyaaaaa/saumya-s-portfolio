import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Heart, MessageCircle, Smile, Shield, Compass } from "lucide-react";

type Skill = { name: string; cat: string };

const skills: Skill[] = [
  { name: "JavaScript", cat: "Languages" },
  { name: "TypeScript", cat: "Languages" },
  { name: "Python", cat: "Languages" },
  { name: "SQL", cat: "Languages" },
  { name: "HTML/CSS", cat: "Languages" },
  { name: "Cypress", cat: "Testing" },
  { name: "Postman", cat: "Testing" },
  { name: "PostgreSQL", cat: "Data" },
  { name: "MongoDB", cat: "Data" },
  { name: "Pandas", cat: "Data" },
  { name: "NumPy", cat: "Data" },
  { name: "Git/GitHub", cat: "Tools" },
  { name: "Docker", cat: "Tools" },
  { name: "Linux", cat: "Tools" },
  { name: "VS Code", cat: "Tools" },
  { name: "Google Colab", cat: "Tools" },
  { name: "SDLC/STLC", cat: "Methodology" },
  { name: "Bug Reporting", cat: "Methodology" },
  { name: "Data Validation", cat: "Methodology" },
];

const catColor: Record<string, string> = {
  Languages: "hsl(17 47% 56% / 0.18)",
  Testing: "hsl(35 60% 60% / 0.18)",
  Data: "hsl(190 40% 55% / 0.18)",
  Tools: "hsl(150 30% 50% / 0.18)",
  Methodology: "hsl(280 30% 60% / 0.18)",
};

const softSkills = [
  { icon: Compass, label: "Curious Learner" },
  { icon: MessageCircle, label: "Great Communicator" },
  { icon: Smile, label: "Optimistic" },
  { icon: Shield, label: "Pressure-Resilient" },
  { icon: Heart, label: "Independent" },
];

type OrbPos = { x: number; y: number; vx: number; vy: number; r: number };

export const Skills = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [positions, setPositions] = useState<OrbPos[]>([]);
  const [hover, setHover] = useState<number | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const w = el.clientWidth;
    const h = el.clientHeight;
    const init: OrbPos[] = skills.map(() => {
      const r = 38 + Math.random() * 26;
      return {
        x: r + Math.random() * (w - r * 2),
        y: r + Math.random() * (h - r * 2),
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        r,
      };
    });
    setPositions(init);

    let raf = 0;
    const tick = () => {
      setPositions((prev) =>
        prev.map((p) => {
          let { x, y, vx, vy } = p;
          x += vx; y += vy;
          if (x < p.r || x > w - p.r) vx *= -1;
          if (y < p.r || y > h - p.r) vy *= -1;
          return { ...p, x, y, vx, vy };
        }),
      );
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section id="skills" className="py-28 md:py-36 bg-secondary/30">
      <div className="container">
        <p className="text-xs uppercase tracking-[0.4em] text-primary mb-4">— skills</p>
        <h2 className="font-serif text-4xl md:text-6xl mb-4">A floating constellation.</h2>
        <p className="text-muted-foreground max-w-xl mb-12">Hover an orb to see what it is. Categorized by color.</p>

        <div
          ref={containerRef}
          className="relative w-full h-[500px] md:h-[560px] rounded-3xl border border-border bg-background overflow-hidden"
        >
          {positions.map((p, i) => {
            const s = skills[i];
            const isHover = hover === i;
            return (
              <div
                key={s.name}
                onMouseEnter={() => setHover(i)}
                onMouseLeave={() => setHover(null)}
                className="absolute flex items-center justify-center rounded-full backdrop-blur-sm border border-border transition-transform duration-200"
                style={{
                  left: p.x - p.r,
                  top: p.y - p.r,
                  width: p.r * 2,
                  height: p.r * 2,
                  background: catColor[s.cat],
                  transform: isHover ? "scale(1.18)" : "scale(1)",
                  zIndex: isHover ? 10 : 1,
                  animation: `float ${5 + (i % 4)}s ease-in-out infinite`,
                  animationDelay: `${i * 0.2}s`,
                }}
              >
                <span className="text-[11px] md:text-xs text-center px-2 text-foreground/85 font-medium leading-tight">
                  {s.name}
                </span>
                {isHover && (
                  <span className="absolute -bottom-7 whitespace-nowrap text-[10px] uppercase tracking-widest text-primary">
                    {s.cat}
                  </span>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-20">
          <p className="text-xs uppercase tracking-[0.4em] text-primary mb-6">— soft skills</p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {softSkills.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="rounded-2xl border border-border bg-card p-6 text-center hover:border-primary/50 hover:-translate-y-1 transition-all"
              >
                <s.icon className="w-7 h-7 mx-auto text-primary mb-3" />
                <p className="text-sm">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
