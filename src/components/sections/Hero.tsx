import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { motion } from "framer-motion";
import { ArrowDown, FileText, ArrowUpRight } from "lucide-react";

const ParticleField = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = ref.current!;
    const isMobile = window.matchMedia("(pointer: coarse)").matches;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      mount.clientWidth / mount.clientHeight,
      0.1,
      100,
    );
    camera.position.z = 8;
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);
    const count = isMobile ? 200 : 700;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 18;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 12;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    // UPDATED THREE.JS COLOR STRINGS TO LUXURY GOLD
    const mat = new THREE.PointsMaterial({
      size: 0.035,
      color: new THREE.Color("#c4b295"),
      transparent: true,
      opacity: 0.45,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const points = new THREE.Points(geo, mat);
    scene.add(points);
    const updateColor = () => {
      const isDark = document.documentElement.classList.contains("dark");
      mat.color = new THREE.Color(isDark ? "#c4b295" : "#8a7a63");
      mat.opacity = isDark ? 0.55 : 0.4;
    };
    updateColor();
    const observer = new MutationObserver(updateColor);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    let mx = 0,
      my = 0;
    const onMove = (e: MouseEvent) => {
      mx = (e.clientX / window.innerWidth - 0.5) * 2;
      my = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMove);
    let raf = 0;
    const start = performance.now();
    const tick = () => {
      const t = (performance.now() - start) * 0.00008;
      points.rotation.y = t * 0.5 + mx * 0.12;
      points.rotation.x = -my * 0.12;
      const arr = geo.attributes.position.array as Float32Array;
      for (let i = 0; i < count; i++) {
        arr[i * 3 + 1] += Math.sin(t * 4 + i) * 0.0005;
      }
      geo.attributes.position.needsUpdate = true;
      renderer.render(scene, camera);
      raf = requestAnimationFrame(tick);
    };
    tick();
    const onResize = () => {
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", onResize);
      observer.disconnect();
      mount.removeChild(renderer.domElement);
      geo.dispose();
      mat.dispose();
      renderer.dispose();
    };
  }, []);

  return <div ref={ref} className="absolute inset-0 -z-10" aria-hidden />;
};

const subtitlePhrases = [
  "QA Analyst",
  "CS Graduate",
  "AI Enthusiast",
  "Kathmandu, Nepal",
];

const Typewriter = () => {
  const [i, setI] = useState(0);
  const [text, setText] = useState("");
  const [del, setDel] = useState(false);

  useEffect(() => {
    const word = subtitlePhrases[i];
    const speed = del ? 40 : 80;
    const t = setTimeout(() => {
      if (!del) {
        const next = word.slice(0, text.length + 1);
        setText(next);
        if (next === word) setTimeout(() => setDel(true), 1800);
      } else {
        const next = word.slice(0, text.length - 1);
        setText(next);
        if (next === "") {
          setDel(false);
          setI((v) => (v + 1) % subtitlePhrases.length);
        }
      }
    }, speed);
    return () => clearTimeout(t);
  }, [text, del, i]);

  return (
    <span className="font-sans text-foreground/75 tracking-wide text-sm font-light">
      {text}
      <span className="inline-block w-[1px] h-4 ml-1 bg-primary/70 align-middle animate-pulse" />
    </span>
  );
};

export const Hero = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden grain"
    >
      <ParticleField />

      {/* Atmospheric Soft Fluid Light Core */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-1/4 left-1/3 w-[35rem] h-[35rem] rounded-full bg-gradient-orb blur-[120px] opacity-60 mix-blend-screen" />
      </div>

      <div className="container relative text-center pt-24 pb-16 max-w-4xl px-6">
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="font-hand text-lg md:text-xl text-primary mb-5 tracking-wide"
        >
          hello, namaste I am
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light leading-[1.05] tracking-tight text-balance text-foreground"
        >
          Saumya{" "}
          <span className="italic font-normal text-primary/90">Neupane</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-6 text-muted-foreground min-h-[2rem] flex items-center justify-center gap-1.5 flex-wrap"
        >
          <span className="font-serif italic text-foreground/40 text-sm">
            a
          </span>
          <Typewriter />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-14 flex flex-col sm:flex-row gap-6 justify-center items-center"
        >
          {/* Button 1: Framed Outline Style */}
          <a
            href="#projects"
            className="group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full border border-primary/30 text-foreground/90 hover:text-foreground hover:bg-primary/10 hover:shadow-glow hover:border-primary/60 transition-all duration-300 font-sans tracking-wider text-xs uppercase font-medium"
          >
            View My Work
            <ArrowUpRight className="w-3.5 h-3.5 text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>

          {/* Button 2: Modern Inline Core Link */}
          <a
            href="/SaumyaNeupane_CV.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 px-6 py-3 text-muted-foreground hover:text-primary transition-colors duration-300 font-sans tracking-wider text-xs uppercase font-medium"
          >
            <FileText className="w-3.5 h-3.5" />
            View CV
          </a>
        </motion.div>
      </div>

      <a
        href="#about"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2.5 text-[10px] uppercase tracking-[0.4em] text-muted-foreground/60 hover:text-foreground transition-colors duration-300"
      >
        <span>scroll</span>
        <ArrowDown className="w-3 h-3 text-primary/70 animate-bounce" />
      </a>
    </section>
  );
};
