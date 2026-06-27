import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Github, ExternalLink, Plus, Image as ImageIcon } from "lucide-react";
import ngoImg from "@/assets/projects/ngo.jpg";
import youtubeImg from "@/assets/projects/youtube.jpg";
import hostel from "@/assets/projects/hostel.webp";
import healthImg from "@/assets/projects/healthImg.png";
import portfolio from "@/assets/projects/portfolio.png";


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
    description:
      "Full-stack MERN platform with role-based access for admin, owner, and student.",
    details:
      "Designed REST APIs, booking logic, and authentication flows. Handled backend debugging and database modeling for a real-world rental workflow.",
    github: "https://github.com/Saumyaaaaa/RoomBooking",
    image: hostel,
    size: "md",
  },
  {
    title: "Mental Health AI Detector",
    date: "Mar 2026",
    stack: ["Python", "ML", "NLP"],
    description:
      "AI-powered detector exploring early signals of mental health concerns from text.",
    details:
      "Experimenting with NLP techniques and lightweight ML models. Built a prototype to analyze text inputs for potential mental health indicators, aiming to provide early support and resources.",
    github: "https://github.com/Saumyaaaaa/mental-health-ai-detector",
    image: healthImg,
    size: "md",
  },
  {
    title: "Eco Himalaya Hub",
    date: "2024",
    stack: ["React", "Tailwind", "Vercel"],
    description:
      "NGO website spotlighting eco-conscious initiatives in the Himalayas.",
    details:
      "Designed and developed a content-driven site for an environmental NGO with a focus on storytelling and accessibility.",
    live: "https://ecohimalayahub.vercel.app/",
    image: ngoImg,
    size: "md",
  },
  {
    title: "YouTube Clone",
    date: "Aug 2024",
    stack: ["React", "REST APIs", "Tailwind"],
    description: "Dynamic video search with responsive component architecture.",
    details:
      "Built a clean, responsive UI consuming a public video API with reusable components and search-driven navigation.",
    github: "https://github.com/Saumyaaaaa/youtube_clone",
    live: "https://youtube-clone-phi-fawn.vercel.app",
    image: youtubeImg,
    size: "md",
  },
  {
    title: "Old Portfolio (v1)",
    date: "Mar 2025",
    stack: ["React", "EmailJS", "CSS"],
    description: "My first personal portfolio — where this story began.",
    details:
      "Kept here as a love letter to first attempts. Built with React and EmailJS before evolving into the site you're on now.",
    github: "https://github.com/Saumyaaaaa/portfolio_",
    live:"https://portfolio-eight-taupe-82.vercel.app/",
    image:portfolio,
    size: "md",
  },
];

const MockBrowser = ({ image, title }: { image?: string; title: string }) => (
  <div className="aspect-video w-full rounded-xl overflow-hidden border border-border bg-gradient-warm relative flex flex-col">
    <div className="flex items-center gap-1.5 px-3 py-2 border-b border-border/50 bg-background/40 shrink-0">
      <span className="w-2.5 h-2.5 rounded-full bg-foreground/15" />
      <span className="w-2.5 h-2.5 rounded-full bg-foreground/15" />
      <span className="w-2.5 h-2.5 rounded-full bg-foreground/15" />
    </div>
    <div className="flex-1 flex items-center justify-center text-muted-foreground overflow-hidden">
      {image ? (
        <img
          src={image}
          alt={`${title} preview`}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      ) : (
        <ImageIcon className="w-10 h-10 opacity-40" />
      )}
    </div>
  </div>
);

const Card = ({
  p,
  expanded,
  onToggle,
}: {
  p: Project;
  expanded: boolean;
  onToggle: () => void;
}) => {
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
        <MockBrowser image={p.image} title={p.title} />
        <div className="mt-6 flex items-center justify-between gap-3">
          <p className="text-xs uppercase tracking-widest text-muted-foreground">
            {p.date}
          </p>
          <div className="flex gap-2">
            {p.github && (
              <a
                href={p.github}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="p-2 rounded-full border border-border hover:border-primary hover:text-primary transition-colors"
              >
                <Github className="w-4 h-4" />
              </a>
            )}
            {p.live && (
              <a
                href={p.live}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="p-2 rounded-full border border-border hover:border-primary hover:text-primary transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>
        <h3 className="font-serif text-2xl md:text-3xl mt-3 leading-tight">
          {p.title}
        </h3>
        <p className="mt-2 text-foreground/70">{p.description}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {p.stack.map((s) => (
            <span
              key={s}
              className="text-xs px-3 py-1 rounded-full bg-secondary text-secondary-foreground"
            >
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
        <p className="text-xs uppercase tracking-[0.4em] text-primary mb-4">
          — selected work
        </p>
        <h2 className="font-serif text-4xl md:text-6xl mb-12">
          Things I've <span className="italic text-primary">built.</span>
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((p, i) => (
            <Card
              key={p.title}
              p={p}
              expanded={open === i}
              onToggle={() => setOpen(open === i ? null : i)}
            />
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
