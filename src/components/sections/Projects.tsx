import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Github, ExternalLink, Plus, Image as ImageIcon } from "lucide-react";
import ngoImg from "@/assets/projects/ngo.jpg";
import youtubeImg from "@/assets/projects/youtube.jpg";
import recipeImg from "@/assets/projects/recipe.jpg";
import groceryImg from "@/assets/projects/grocery.jpg";

type Project = {
  title: string;
  date: string;
  stack: string[];
  description: string;
  details: string;
  github?: string;
  live?: string;
  image?: string;
  size: "lg" | "md";
};

const projects: Project[] = [
  {
    title: "Hostel Rental Management System",
    date: "Jan 2025",
    stack: ["MongoDB", "Express", "React", "Node.js"],
    description: "Full-stack MERN platform with role-based access for admin, owner, and student.",
    details: "Designed REST APIs, booking logic, and authentication flows. Handled backend debugging and database modeling for a real-world rental workflow.",
    github: "https://github.com/Saumyaaaaa/RoomBooking",
    size: "lg",
  },
  {
    title: "Mental Health AI Detector",
    date: "Mar 2026",
    stack: ["Python", "ML", "NLP"],
    description: "AI-powered detector exploring early signals of mental health concerns from text.",
    details: "Experimenting with NLP techniques and lightweight ML models — part of my path toward a Masters in Artificial Intelligence.",
    github: "https://github.com/Saumyaaaaa/mental-health-ai-detector",
    size: "md",
  },
  {
    title: "Eco Himalaya Hub",
    date: "2024",
    stack: ["React", "Tailwind", "Vercel"],
    description: "NGO website spotlighting eco-conscious initiatives in the Himalayas.",
    details: "Designed and developed a content-driven site for an environmental NGO with a focus on storytelling and accessibility.",
    live: "https://ecohimalayahub.vercel.app/",
    image: ngoImg,
    size: "md",
  },
  {
    title: "YouTube Clone",
    date: "Aug 2024",
    stack: ["React", "REST APIs", "Tailwind"],
    description: "Dynamic video search with responsive component architecture.",
    details: "Built a clean, responsive UI consuming a public video API with reusable components and search-driven navigation.",
    github: "https://github.com/Saumyaaaaa/youtube_clone",
    live: "https://youtube-clone-phi-fawn.vercel.app",
    image: youtubeImg,
    size: "md",
  },
  {
    title: "Recipe App",
    date: "2024",
    stack: ["React", "API", "CSS"],
    description: "Browse and discover recipes with a warm, friendly interface.",
    details: "A small project built while learning React fundamentals — focused on component composition and API integration.",
    github: "https://github.com/Saumyaaaaa/my-recipe",
    live: "https://my-recipe-dusky.vercel.app",
    image: recipeImg,
    size: "md",
  },
  {
    title: "Cypress E2E Testing Suite",
    date: "Mar 2025",
    stack: ["Cypress", "JavaScript", "QA"],
    description: "Practical E2E test suite reflecting my QA Analyst day-to-day.",
    details: "Hands-on exploration of end-to-end testing patterns, fixtures, and assertions — the toolkit I use as a QA Analyst.",
    github: "https://github.com/Saumyaaaaa/cypress-example",
    size: "md",
  },
  {
    title: "Grocery App",
    date: "2024",
    stack: ["HTML", "CSS", "JavaScript"],
    description: "Lightweight grocery list web app with a clean, friendly UI.",
    details: "Vanilla JS project focused on DOM manipulation, persistence, and a tactile, easy-to-use interface.",
    github: "https://github.com/Saumyaaaaa/Quote-Generator",
    live: "https://saumyaaaaa.github.io/grocery/",
    image: groceryImg,
    size: "md",
  },
  {
    title: "Old Portfolio (v1)",
    date: "Mar 2025",
    stack: ["React", "EmailJS", "CSS"],
    description: "My first personal portfolio — where this story began.",
    details: "Kept here as a love letter to first attempts. Built with React and EmailJS before evolving into the site you're on now.",
    github: "https://github.com/Saumyaaaaa/portfolio_",
    size: "md",
  },
];

const MockBrowser = () => (
  <div className="aspect-video w-full rounded-xl overflow-hidden border border-border bg-gradient-warm relative">
    <div className="flex items-center gap-1.5 px-3 py-2 border-b border-border/50 bg-background/40">
      <span className="w-2.5 h-2.5 rounded-full bg-foreground/15" />
      <span className="w-2.5 h-2.5 rounded-full bg-foreground/15" />
      <span className="w-2.5 h-2.5 rounded-full bg-foreground/15" />
    </div>
    <div className="flex-1 flex items-center justify-center h-full text-muted-foreground">
      <ImageIcon className="w-10 h-10 opacity-40" />
    </div>
  </div>
);

const Card = ({ p, expanded, onToggle }: { p: Project; expanded: boolean; onToggle: () => void }) => {
  return (
    <motion.div
      layout
      onClick={onToggle}
      className={`group relative rounded-3xl border border-border bg-card p-6 md:p-8 hover:shadow-glow transition-shadow ${
        p.size === "lg" ? "md:col-span-2" : ""
      }`}
      whileHover={{ y: -4 }}
    >
      <motion.div layout="position">
        <MockBrowser />
        <div className="mt-6 flex items-center justify-between gap-3">
          <p className="text-xs uppercase tracking-widest text-muted-foreground">{p.date}</p>
          <div className="flex gap-2">
            {p.github && (
              <a href={p.github} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()} className="p-2 rounded-full border border-border hover:border-primary hover:text-primary transition-colors">
                <Github className="w-4 h-4" />
              </a>
            )}
            {p.live && (
              <a href={p.live} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()} className="p-2 rounded-full border border-border hover:border-primary hover:text-primary transition-colors">
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>
        <h3 className="font-serif text-2xl md:text-3xl mt-3 leading-tight">{p.title}</h3>
        <p className="mt-2 text-foreground/70">{p.description}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {p.stack.map((s) => (
            <span key={s} className="text-xs px-3 py-1 rounded-full bg-secondary text-secondary-foreground">
              {s}
            </span>
          ))}
        </div>
      </motion.div>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0, marginTop: 0 }}
            animate={{ opacity: 1, height: "auto", marginTop: 24 }}
            exit={{ opacity: 0, height: 0, marginTop: 0 }}
            transition={{ duration: 0.4 }}
            className="overflow-hidden"
          >
            <div className="pt-6 border-t border-border text-foreground/75 leading-relaxed">
              {p.details}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export const Projects = () => {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="projects" className="py-28 md:py-36">
      <div className="container">
        <p className="text-xs uppercase tracking-[0.4em] text-primary mb-4">— selected work</p>
        <h2 className="font-serif text-4xl md:text-6xl mb-12">Things I've <span className="italic text-primary">built.</span></h2>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((p, i) => (
            <Card key={p.title} p={p} expanded={open === i} onToggle={() => setOpen(open === i ? null : i)} />
          ))}
          <div className="rounded-3xl border-2 border-dashed border-border p-10 flex flex-col items-center justify-center text-muted-foreground min-h-[260px] hover:border-primary/50 hover:text-primary transition-colors">
            <Plus className="w-8 h-8 mb-3" />
            <p className="font-serif text-2xl">More projects</p>
            <p className="text-sm mt-1">coming soon</p>
          </div>
        </div>
      </div>
    </section>
  );
};
