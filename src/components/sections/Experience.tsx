import { motion } from "framer-motion";
import { useRef } from "react";
import bidheeLogo from "@/assets/projects/bidheeLogo.png";
import bajraLogo from "@/assets/projects/bajraLogo.png";
import giftsjoyyLogo from "@/assets/projects/giftsjoyyLogo.jpg";
import lionsLogo from "@/assets/projects/lionsLogo.png";
import cfcLogo from "@/assets/projects/cfcLogo.png";

type ExpItem = {
  org: string;
  role: string;
  period: string;
  desc: string;
  current?: boolean;
  logo: string;
};

const items: ExpItem[] = [
  {
    org: "Bidhee Pvt. Ltd.",
    role: "Junior QA Analyst",
    period: "Oct 2025",
    desc: "Manual testing, automation, and API testing with Postman across production-grade products.",
    current: true,
    logo: bidheeLogo,
  },
  {
    org: "Bajra Technologies",
    role: "QA Trainee",
    period: "Mar 2025 — Sep 2025",
    desc: "PostgreSQL validation, Postman API testing, Cypress automation, and structured test case design.",
    logo: bajraLogo,
  },
  {
    org: "GiftsJoyy",
    role: "Founder · Personal Venture",
    period: "Sep 2022 — Jul 2023",
    desc: "Instagram + TikTok online gift store. Social media marketing, content creation, and page growth.",
    logo: giftsjoyyLogo,
  },
  {
    org: "Lions Club of Kathmandu",
    role: "Charter Member",
    period: "2023 — 2025",
    desc: "Blood donation drives, disaster relief efforts, and environmental cleanup initiatives.",
    logo: lionsLogo,
  },
  {
    org: "Code for Change",
    role: "Member",
    period: "2022 — 2025",
    desc: "Community learning, networking, and confidence building in the tech ecosystem of Nepal.",
    logo: cfcLogo,
  },
];

const TiltCard = ({ item, index }: { item: ExpItem; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current!;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(900px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateZ(0)`;
  };

  const onLeave = () => {
    if (ref.current)
      ref.current.style.transform = "perspective(900px) rotateY(0) rotateX(0)";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay: index * 0.05 }}
      className="snap-center shrink-0 w-[85vw] sm:w-[440px]"
    >
      <div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className={`tilt-card relative h-full p-8 md:p-10 rounded-3xl bg-card border mt-5 ${
          item.current ? "border-primary/60 shadow-glow" : "border-border"
        }`}
      >
        {/* Current badge — inside card, never clipped */}
        {item.current && (
          <div className="mb-5">
            <span className="inline-block px-3 py-1 text-[10px] uppercase tracking-widest rounded-full bg-primary text-primary-foreground">
              Current
            </span>
          </div>
        )}

        {/* Logo + period row */}
        <div className="flex items-center gap-3 mb-5">
          <img
            src={item.logo}
            alt={`${item.org} logo`}
            className="w-11 h-11 rounded-xl object-contain bg-white p-1 border border-border flex-shrink-0"
          />
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
            {item.period}
          </p>
        </div>

        <h3 className="font-serif text-3xl leading-tight">{item.org}</h3>
        <p className="mt-1 text-primary text-sm font-medium">{item.role}</p>
        <p className="mt-6 text-foreground/75 leading-relaxed">{item.desc}</p>
        <div className="mt-8 h-px bg-gradient-to-r from-primary/40 to-transparent" />
        <div className="mt-3 font-serif text-5xl text-primary/20">
          0{index + 1}
        </div>
      </div>
    </motion.div>
  );
};

export const Experience = () => {
  return (
    <section id="experience" className="py-28 md:py-36 bg-secondary/30">
      <div className="container">
        <div className="flex items-end justify-between flex-wrap gap-4 mb-12">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-primary mb-4">
              — experience
            </p>
            <h2 className="font-serif text-4xl md:text-6xl">
              Where I've <span className="italic">grown.</span>
            </h2>
          </div>
          <p className="text-sm text-muted-foreground max-w-xs">
            Roles, ventures, and communities that shaped me.
          </p>
        </div>
      </div>

      <div className="overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-none">
        <div className="flex gap-6 px-6 md:px-12">
          {items.map((it, i) => (
            <TiltCard key={it.org} item={it} index={i} />
          ))}
          <div className="shrink-0 w-4" />
        </div>
      </div>
    </section>
  );
};
