import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import bidheeLogo from "@/assets/projects/bidheeLogo.png";
import bajraLogo from "@/assets/projects/bajraLogo.png";
import giftsjoyyLogo from "@/assets/projects/giftsjoyyLogo.jpg";
import lionsLogo from "@/assets/projects/lionsLogo.png";
import cfcLogo from "@/assets/projects/cfcLogo.png";

type ExpItem = {
  org: string;
  role: string;
  period: string;
  points: string[]; // Changed from a single string to an array for detailed bullet points
  current?: boolean;
  logo: string;
  category: "Professional" | "Venture" | "Community"; // Adds clear context for viewers
};

const items: ExpItem[] = [
  {
    org: "Bidhee Pvt. Ltd.",
    role: "QA Analyst",
    period: "Mar 2026 — Present",
    category: "Professional",
    current: true,
    logo: bidheeLogo,
    points: [
      "Perform manual testing of complex web applications, including functional, regression, integration, and exploratory testing phases.",
      "Conduct detailed API testing utilizing Postman and Insomnia to validate request/response payloads, status codes, and ensure strict endpoint reliability.",
      "Document, track, and manage software anomalies in issue trackers with detailed reproduction steps, severity classifications, and expected vs. actual behavior metrics."
    ],
  },
  {
    org: "Bajra Technologies",
    role: "QA Trainee",
    period: "Mar 2025 — Sep 2025",
    category: "Professional",
    logo: bajraLogo,
    points: [
      "Validated Apache Superset business intelligence dashboard outputs and verified underlying database accuracy utilizing PostgreSQL.",
      "Designed, mapped, and executed comprehensive test cases for specialized web-based data pipelines and analytics platforms.",
      "Engineered foundational end-to-end automated UI regression tests using Cypress to maintain platform consistency.",
      "Utilized Postman for cross-system data consistency testing to prevent structural mismatches across integrated environments."
    ],
  },
  {
    org: "GiftsJoyy",
    role: "Founder · Personal Venture",
    period: "Sep 2022 — Jul 2023",
    category: "Venture",
    logo: giftsjoyyLogo,
    points: [
      "Launched and managed an independent Instagram and TikTok online gift store storefront.",
      "Executed social media growth marketing strategies, driving targeted content creation and brand page engagement."
    ],
  },
  {
    org: "Lions Club of Kathmandu",
    role: "Charter Member",
    period: "2023 — Present",
    category: "Community",
    logo: lionsLogo,
    points: [
      "Coordinated blood donation initiatives and community health camp operations.",
      "Mobilized emergency disaster relief strategies and physical supply distributions during regional flooding incidents.",
      "Organized local environmental sanitation drives and community-level sustainability awareness programs."
    ],
  },
  {
    org: "Code for Change",
    role: "Member & Technical Participant",
    period: "2022 — 2025",
    category: "Community",
    logo: cfcLogo,
    points: [
      "Engaged in technical bootcamps, networking sessions, and peer-led development projects.",
      "Contributed to community ecosystem learning, reinforcing core tech competencies and professional networking in Nepal."
    ],
  },
];

export const Experience = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeItem = items[activeIndex];

  return (
    <section id="experience" className="py-28 md:py-36 bg-secondary/30">
      <div className="container max-w-5xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex items-end justify-between flex-wrap gap-4 mb-16">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-primary mb-4">
              — experience & involvement
            </p>
            <h2 className="font-serif text-4xl md:text-6xl">
              Where I've <span className="italic">grown.</span>
            </h2>
          </div>
          <p className="text-sm text-muted-foreground max-w-xs">
            Roles, ventures, and communities that shaped me.
          </p>
        </div>

        {/* Layout Container */}
        <div className="flex flex-col md:flex-row gap-8 min-h-[400px]">
          {/* Left Column: Tab Selector */}
          <div className="flex flex-row md:flex-col overflow-x-auto md:overflow-x-visible border-b md:border-b-0 md:border-l border-border/60 scrollbar-none md:w-64 shrink-0">
            {items.map((item, idx) => (
              <button
                key={item.org}
                onClick={() => setActiveIndex(idx)}
                className={`relative px-5 py-3 text-left text-sm font-medium transition-all whitespace-nowrap md:whitespace-normal flex items-center justify-between gap-3 border-b-2 md:border-b-0 md:border-l-2 -mb-[2px] md:-mb-0 md:-ml-[2px] ${
                  activeIndex === idx
                    ? "text-primary border-primary bg-primary/5"
                    : "text-muted-foreground border-transparent hover:text-foreground hover:bg-muted/30"
                }`}
              >
                <div className="flex items-center gap-3 truncate">
                  <img
                    src={item.logo}
                    alt=""
                    className="w-5 h-5 rounded object-contain bg-white p-0.5 border border-border shrink-0"
                  />
                  <span className="truncate">{item.org}</span>
                </div>
              </button>
            ))}
          </div>

          {/* Right Column: Experience Details */}
          <div className="flex-1 min-h-[300px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className={`p-6 md:p-8 rounded-2xl bg-card border ${
                  activeItem.current ? "border-primary/40 shadow-glow" : "border-border"
                }`}
              >
                {/* Meta Header */}
                <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1.5">
                      <span className={`text-[10px] px-2 py-0.5 rounded uppercase font-sans font-semibold tracking-wider ${
                        activeItem.category === "Professional" 
                          ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20" 
                          : activeItem.category === "Venture"
                          ? "bg-amber-500/10 text-amber-500 border border-amber-500/20"
                          : "bg-blue-500/10 text-blue-500 border border-blue-500/20"
                      }`}>
                        {activeItem.category}
                      </span>
                      {activeItem.current && (
                        <span className="inline-block px-2 py-0.5 text-[10px] uppercase tracking-wider font-sans font-semibold rounded bg-primary text-primary-foreground">
                          Current
                        </span>
                      )}
                    </div>
                    <h3 className="font-serif text-2xl md:text-3xl text-foreground">
                      {activeItem.org}
                    </h3>
                    <p className="text-primary font-medium text-base mt-1">
                      {activeItem.role}
                    </p>
                  </div>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground pt-1.5">
                    {activeItem.period}
                  </p>
                </div>

                {/* Rendered Bullet Points instead of paragraph blocks */}
                <ul className="mt-6 space-y-3.5 list-none text-foreground/80 text-sm md:text-base leading-relaxed">
                  {activeItem.points.map((point, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="text-primary mt-1.5 shrink-0 block w-1.5 h-1.5 rounded-full bg-primary" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 h-px bg-gradient-to-r from-primary/30 to-transparent" />
                <div className="mt-3 font-serif text-4xl text-primary/15 select-none">
                  0{activeIndex + 1}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
