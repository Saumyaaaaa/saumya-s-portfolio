import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import myPhoto from "@/assets/projects/my-photo.jpeg";
import PixelImage from "@/components/sections/PixelImage";

const Counter = ({ to, label }: { to: number; label: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const start = performance.now();
    const dur = 1200;
    const tick = () => {
      const p = Math.min(1, (performance.now() - start) / dur);
      setN(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);

  return (
    <div ref={ref} className="text-center">
      <div className="font-serif text-4xl md:text-5xl text-primary">
        {n}
        {label.includes("+") ? "+" : ""}
      </div>
      <div className="mt-2 text-xs uppercase tracking-widest text-muted-foreground">
        {label.replace("+", "")}
      </div>
    </div>
  );
};

export const About = () => {
  return (
    <section id="about" className="py-28 md:py-40 relative">
      <div className="container">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-xs uppercase tracking-[0.4em] text-primary mb-4"
        >
          — about
        </motion.p>

        <div className="grid md:grid-cols-12 gap-12 md:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30, rotate: -8 }}
            whileInView={{ opacity: 1, x: 0, rotate: -3 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="md:col-span-5"
          >
            {/* The Pixel Image Card wrapper */}
            <div className="bg-card p-4 pb-2 shadow-soft max-w-[320px] mx-auto flex flex-col items-center justify-center">
              <div className="relative w-full aspect-[4/5] rounded-sm overflow-hidden flex items-center justify-center bg-black/5 dark:bg-white/5">
                <PixelImage
                  src={myPhoto}
                  alt="Saumya Neupane"
                  width={320}
                  height={400}
                  pixelSize={3}
                />
              </div>
              <p className="font-hand text-xl text-center mt-3 text-foreground/70">
                That's me :)
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="md:col-span-7"
          >
            <h2 className="font-serif text-4xl md:text-6xl leading-tight text-balance">
              A little story{" "}
              <span className="italic text-primary">about me.</span>
            </h2>

            <div className="mt-8 space-y-5 text-lg text-foreground/80 leading-relaxed">
              <p>
                As a Computer Science graduate and current{" "}
                <span className="text-primary font-medium">QA Analyst</span>, my
                professional focus is shifting toward the future of
                intelligence. I spend my time exploring modern AI evaluation
                methodologies and advanced frameworks, refining my expertise to
                transition into dedicated research ecosystems.
              </p>
            </div>

            <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-6 py-6 border-y border-border">
              <Counter to={2} label="Companies" />
              <Counter to={4} label="Projects+" />
              <Counter to={1} label="Lions Club" />
              <Counter to={1} label="Online Store" />
            </div>

            <blockquote className="mt-10 pl-6 border-l-2 border-primary font-serif italic text-2xl md:text-3xl text-foreground/70 leading-snug">
              "Curious, optimistic, and always adapting."
            </blockquote>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
