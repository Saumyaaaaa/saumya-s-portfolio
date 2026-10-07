import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Github,
  ExternalLink,
  Plus,
  ArrowUpRight,
  Image as ImageIcon,
} from "lucide-react";
import { projectsData, Project } from "@/pages/ProjectDetail";

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

const Card = ({ p }: { p: Project }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      layout
      onClick={() => navigate(`/projects/${p.slug}`)}
      className={`group relative rounded-3xl border border-border bg-card p-6 md:p-8 hover:shadow-glow transition-all cursor-pointer ${
        p.size === "lg" ? "md:col-span-2" : ""
      }`}
      whileHover={{ y: -4 }}
    >
      <div>
        <MockBrowser image={p.image} title={p.title} />

        <div className="mt-6 flex items-center justify-between gap-3">
          <p className="text-xs uppercase tracking-widest text-muted-foreground">
            {p.date}
          </p>
          <div className="flex items-center gap-2">
            {p.github && (
              <a
                href={p.github}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="p-2 rounded-full border border-border hover:border-primary hover:text-primary transition-colors"
                title="View GitHub Repository"
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
                title="Open Live Preview"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
            <span className="p-2 rounded-full border border-border group-hover:border-primary group-hover:text-primary transition-colors">
              <ArrowUpRight className="w-4 h-4" />
            </span>
          </div>
        </div>

        <h3 className="font-serif text-2xl md:text-3xl mt-3 leading-tight group-hover:text-primary transition-colors">
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
      </div>
    </motion.div>
  );
};

export const Projects = () => {
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
          {projectsData.map((p) => (
            <Card key={p.slug} p={p} />
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
