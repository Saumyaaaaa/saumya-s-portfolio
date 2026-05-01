import { motion } from "framer-motion";
import { GraduationCap, Sparkles } from "lucide-react";

const courses = [
  "Statistics", "Linear Algebra", "DSA", "DBMS",
  "Artificial Intelligence", "Software Engineering", "Operating Systems", "Discrete Structures",
];

export const Education = () => {
  return (
    <section id="education" className="py-28 md:py-36">
      <div className="container max-w-5xl">
        <p className="text-xs uppercase tracking-[0.4em] text-primary mb-4">— education</p>
        <h2 className="font-serif text-4xl md:text-6xl mb-12">The foundation.</h2>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-3xl border border-border bg-card p-8 md:p-12 shadow-soft"
        >
          <div className="flex items-start gap-5 flex-wrap">
            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
              <GraduationCap className="w-7 h-7 text-primary" />
            </div>
            <div className="flex-1 min-w-[260px]">
              <h3 className="font-serif text-3xl">St. Lawrence College</h3>
              <p className="text-muted-foreground mt-1">Tribhuvan University, Kathmandu</p>
              <p className="mt-4 text-foreground/85">
                BSc Computer Science &amp; Information Technology
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                Apr 2021 — Sep 2025 · Final Grade: <span className="text-primary font-medium">71.83%</span>
              </p>
            </div>
          </div>

          <div className="mt-10">
            <p className="text-xs uppercase tracking-widest text-muted-foreground mb-4">Selected coursework</p>
            <div className="flex flex-wrap gap-2">
              {courses.map((c, i) => (
                <motion.span
                  key={c}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  className="px-4 py-1.5 rounded-full text-sm border border-border bg-background hover:border-primary hover:text-primary transition-colors"
                >
                  {c}
                </motion.span>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="mt-10 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary/10 border border-primary/30 text-primary text-sm"
          >
            <Sparkles className="w-4 h-4" />
            Actively seeking fully-funded MSc in Artificial Intelligence
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
