import { motion } from "framer-motion";

const skillGroups = [
  {
    category: "Languages",
    skills: ["JavaScript", "TypeScript", "Python", "SQL", "HTML/CSS"],
  },
  {
    category: "Testing & QA",
    skills: [
      "Cypress",
      "Postman",
      "Manual Testing",
      "API Testing",
      "SDLC/STLC",
      "Bug Reporting",
      "Data Validation",
    ],
  },
  {
    category: "Data & Databases",
    skills: ["PostgreSQL", "MongoDB", "Pandas", "NumPy", "Basic Data Analysis"],
  },
  {
    category: "Tools & Platforms",
    skills: [
      "Git/GitHub",
      "Docker",
      "Linux (Ubuntu)",
      "VS Code",
      "Google Colab",
    ],
  },
  {
    category: "Soft Skills",
    skills: [
      "Curious Learner",
      "Great Communicator",
      "Optimistic",
      "Pressure-Resilient",
      "Independent",
    ],
  },
];

export const Skills = () => {
  return (
    <section id="skills" className="py-28 md:py-36 bg-secondary/30">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-xs uppercase tracking-[0.4em] text-primary mb-4">
            — skills
          </p>
          <h2 className="font-serif text-4xl md:text-6xl mb-4">
            What I bring <span className="italic">to the table.</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mb-16">
            A CS graduate with a QA focus — bridging software quality, data, and
            a growing passion for AI.
          </p>
        </motion.div>

        <div className="divide-y divide-border">
          {skillGroups.map((group, gi) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: gi * 0.07, duration: 0.5 }}
              className="py-8 md:py-10 grid md:grid-cols-12 gap-4 md:gap-8 items-start"
            >
              {/* Category label */}
              <div className="md:col-span-3">
                <span className="text-xs uppercase tracking-[0.3em] text-primary">
                  {group.category}
                </span>
              </div>

              {/* Skills pills */}
              <div className="md:col-span-9 flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-4 py-1.5 rounded-full border border-border bg-background text-sm text-foreground/80 hover:border-primary/50 hover:text-foreground transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
