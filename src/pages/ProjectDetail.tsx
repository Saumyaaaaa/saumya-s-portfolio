import { useParams, Link, Navigate } from "react-router-dom";
import { ArrowLeft, Github, ExternalLink, Calendar, Code2 } from "lucide-react";
import { motion } from "framer-motion";

// Project assets
import ngoImg from "@/assets/projects/ngo.jpg";
import youtubeImg from "@/assets/projects/youtube.jpg";
import neuroqaImg from "@/assets/projects/neuro_qa.png";
import locusLabImg from "@/assets/projects/locus-lab.png";
import tomImg from "@/assets/projects/tom.png";

export interface ProjectSection {
  heading: string;
  body: string | string[];
}

export interface Project {
  slug: string;
  title: string;
  subtitle: string;
  date: string;
  stack: string[];
  description: string;
  github?: string;
  live?: string;
  image?: string;
  size: "lg" | "md";
  overview: string;
  sections: ProjectSection[];
}

export const projectsData: Project[] = [
  {
    slug: "tom-tutor",
    title: "Learner-State Scaffolding Tutor (Theory of Mind)",
    subtitle: "A monitor-constrained dual-agent system for Socratic tutoring",
    date: "Oct 2026",
    stack: ["Python", "FastAPI", "Gemini Flash", "Next.js", "SQLite", "BKT"],
    description:
      "Monitor-constrained dual-agent system delivering Socratic tutoring steered by Bayesian Knowledge Tracing.",
    overview:
      "A monitor-constrained dual-agent system designed to guide students through single-variable linear algebra using Socratic tutoring. Rather than relying on a single conversational model, the architecture uses a hidden 'Modeler' agent to dynamically map a student's cognitive state—tracking their mastered concepts, active misconceptions, and frustration levels. This internal state deterministically governs a separate, user-facing 'Interlocutor' agent, mechanically restricting its vocabulary to ensure it never reveals direct answers or introduces concepts the student has not yet earned.",
    sections: [
      {
        heading: "Core Engineering & Architecture",
        body: [
          "Bayesian Knowledge Tracing (BKT): Deterministic mathematical BKT model that continuously calculates and updates true concept mastery probability based on student interactions.",
          "Mechanical Verification Layer: Pure-Python verification layer auditing drafted interlocutor replies against a rigid ontology graph, ensuring a 0.00% leakage rate of unmastered terms or equation forms.",
          "Counterfactual State Probing: Debugging UI featuring a live concept graph allowing researchers to manually flip cognitive states and inspect deterministic, side-by-side prompt responses.",
          "Empirical Evaluation Framework: Tested against an offline benchmark of simulated adversarial student personas (such as a 'Persistent Misconceiver' and an 'Answer-Fisher') to quantify diagnosis latency.",
        ],
      },
      {
        heading: "Tech Stack & Implementation",
        body: "Backend powered by Python 3.10+, FastAPI, and SQLite; LLM logic orchestrated through Google Gemini Flash (google-genai SDK); and an interactive frontend built with Next.js/React.",
      },
    ],
    github: "https://github.com/Saumyaaaaa/Theory-of-mind--TOM-",
    live: "https://theory-of-mind-tom.vercel.app/",
    image: tomImg,
    size: "md",
  },
  {
    slug: "neuroqa",
    title: "NeuroQA: Explainable EEG Artifact Detection",
    subtitle:
      "Research-grade spatial-temporal Vision Transformer for clinical EEG analysis",
    date: "Sep 2026",
    stack: ["PyTorch", "Python", "MNE-Python", "FastAPI", "Streamlit", "ONNX"],
    description:
      "Research-grade spatial-temporal Vision Transformer for automated and interpretable EEG artifact rejection.",
    overview:
      "A research-grade deep learning framework built to automatically detect, segment, and explain artifacts in multi-channel EEG recordings. The platform translates 'black-box' neural network decisions into human-readable clinical time-window reports, establishing trust for both research and clinical applications.",
    sections: [
      {
        heading: "The Problem Solved",
        body: "Manual EEG artifact rejection (eye blinks, muscle movement, noise) is slow and subjective, while existing automated methods rely on rigid thresholds or uninterpretable AI. NeuroQA accurately detects artifacts and applies an explainability layer to tell clinicians exactly which time ranges and channels triggered the detection.",
      },
      {
        heading: "Key Engineering Highlights",
        body: [
          "Custom AI Architecture: Designed and trained a spatial-temporal Vision Transformer (~600k parameters) processing 2-second overlapping sliding windows.",
          "Explainable AI (XAI): Implemented an Attention Rollout layer to map the Transformer's attention weights back to specific input seconds, generating actionable diagnostic reports.",
          "Digital Signal Processing (DSP): Zero-phase Butterworth bandpass (1–40 Hz) and IIR notch filters (50 Hz) for robust noise removal.",
          "Production-Grade MLOps: Automated CI pipelines via GitHub Actions, comprehensive pytest suites (gradient flow, model shapes, adversarial robustness), and a compact 0.379MB ONNX export for low-latency standalone inference.",
        ],
      },
    ],
    github: "https://github.com/Saumyaaaaa/neuroqa",
    live: "https://neuroapp.streamlit.app/",
    image: neuroqaImg,
    size: "md",
  },
  {
    slug: "locus-lab",
    title: "Locus Lab: 3D Memory Palace Experiment",
    subtitle:
      "Browser-based citizen-science platform benchmarking spatial encoding",
    date: "Oct 2026",
    stack: [
      "React",
      "TypeScript",
      "Three.js",
      "Zustand",
      "Supabase",
      "PostgreSQL",
    ],
    description:
      "Citizen-science platform running browser-based A/B memory tests comparing the method of loci to flashcards.",
    overview:
      "A free, anonymous citizen-science web platform designed to test whether spatial encoding (the method of loci) outperforms traditional flashcards for word recall. The application runs a personalized A/B memory test entirely in the browser, revealing study preferences while securely aggregating data for cognitive research.",
    sections: [
      {
        heading: "Key Engineering Highlights",
        body: [
          "3D Web Environment: Low-poly, browser-based 3D house using react-three-fiber and @react-three/drei, allowing fixed-route locus associations without VR hardware.",
          "Experiment State Machine: Multi-stage user flow engineered in Zustand managing consent, vividness questionnaires, 2D/3D study phases, distractor math tasks, and delayed recall testing (24-hour and 7-day intervals).",
          "Privacy-First Architecture: Anonymous Supabase sign-ins with Row Level Security (RLS) guaranteeing zero personally identifiable information (PII) is retained.",
          "Scoring & Visualization: Free-recall scoring engine with Levenshtein distance typo tolerance and a personalized results dashboard with custom SVG bar charts.",
        ],
      },
    ],
    github: "https://github.com/Saumyaaaaa/LocusLab",
    live: "https://locus-lab-three.vercel.app/",
    image: locusLabImg,
    size: "md",
  },
  {
    slug: "eco-himalaya-hub",
    title: "Eco Himalaya Hub",
    subtitle: "Environmental initiative and advocacy platform",
    date: "2024",
    stack: ["React", "Tailwind", "Vercel"],
    description:
      "NGO website spotlighting eco-conscious initiatives in the Himalayas.",
    overview:
      "Designed and developed a content-driven site for an environmental NGO with a focus on storytelling, high performance, and accessibility.",
    sections: [
      {
        heading: "Overview & Impact",
        body: "Created accessible, responsive web interfaces showcasing grassroots conservation efforts in the Himalayan belt.",
      },
    ],
    live: "https://ecohimalayahub.vercel.app/",
    image: ngoImg,
    size: "md",
  },
  {
    slug: "youtube-clone",
    title: "YouTube Clone",
    subtitle: "Modern client-side video streaming and exploration UI",
    date: "Aug 2024",
    stack: ["React", "REST APIs", "Tailwind"],
    description: "Dynamic video search with responsive component architecture.",
    overview:
      "Built a clean, responsive UI consuming a public video API with reusable components, state-managed playback, and search-driven navigation.",
    sections: [
      {
        heading: "Architecture & UI",
        body: "Engineered responsive video card grids, search-as-you-type input debouncing, and lightweight state handling.",
      },
    ],
    github: "https://github.com/Saumyaaaaa/youtube_clone",
    live: "https://youtube-clone-phi-fawn.vercel.app",
    image: youtubeImg,
    size: "md",
  },
];

export const ProjectDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const project = projectsData.find((p) => p.slug === slug);

  if (!project) {
    return <Navigate to="/#projects" replace />;
  }

  return (
    <div className="min-h-screen py-24 md:py-32">
      <div className="container max-w-4xl px-4 mx-auto">
        <Link
          to="/#projects"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          Back to Projects
        </Link>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="flex items-center gap-2 text-xs tracking-wider uppercase text-muted-foreground mb-4">
            <Calendar className="w-3.5 h-3.5 text-primary" />
            <span>{project.date}</span>
          </div>

          <h1 className="font-serif text-3xl md:text-5xl leading-tight">
            {project.title}
          </h1>
          <p className="text-lg text-foreground/80 mt-4 leading-relaxed font-light">
            {project.subtitle}
          </p>

          <div className="flex flex-wrap items-center justify-between gap-4 mt-8 pt-6 border-t border-border">
            <div className="flex flex-wrap gap-2 items-center">
              <Code2 className="w-4 h-4 text-primary mr-1" />
              {project.stack.map((s) => (
                <span
                  key={s}
                  className="text-xs px-3 py-1 rounded-full bg-secondary text-secondary-foreground"
                >
                  {s}
                </span>
              ))}
            </div>

            <div className="flex gap-3">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border hover:border-primary hover:text-primary transition-colors text-sm"
                >
                  <Github className="w-4 h-4" />
                  Code
                </a>
              )}
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary text-primary-foreground hover:opacity-90 transition-opacity text-sm font-medium"
                >
                  <ExternalLink className="w-4 h-4" />
                  Live Preview
                </a>
              )}
            </div>
          </div>
        </motion.div>

        {/* Hero Mockup */}
        {project.image && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-12 rounded-2xl overflow-hidden border border-border shadow-2xl bg-card"
          >
            <div className="flex items-center gap-1.5 px-4 py-3 border-b border-border/50 bg-background/50">
              <span className="w-2.5 h-2.5 rounded-full bg-foreground/15" />
              <span className="w-2.5 h-2.5 rounded-full bg-foreground/15" />
              <span className="w-2.5 h-2.5 rounded-full bg-foreground/15" />
            </div>
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-auto object-cover max-h-[520px]"
            />
          </motion.div>
        )}

        {/* Details & Engineering breakdown */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-14 space-y-10"
        >
          <section>
            <h2 className="font-serif text-2xl mb-4">Overview</h2>
            <p className="text-foreground/80 leading-relaxed text-base">
              {project.overview}
            </p>
          </section>

          {project.sections.map((section) => (
            <section
              key={section.heading}
              className="pt-8 border-t border-border"
            >
              <h2 className="font-serif text-2xl mb-4">{section.heading}</h2>
              {Array.isArray(section.body) ? (
                <ul className="space-y-3">
                  {section.body.map((item, idx) => (
                    <li
                      key={idx}
                      className="text-foreground/80 leading-relaxed pl-5 relative before:content-['—'] before:absolute before:left-0 before:text-primary"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-foreground/80 leading-relaxed text-base">
                  {section.body}
                </p>
              )}
            </section>
          ))}
        </motion.div>
      </div>
    </div>
  );
};
