import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { motion } from "framer-motion";
import { ArrowDown, Download, ArrowUpRight } from "lucide-react";

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
    const count = isMobile ? 250 : 900;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 18;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 12;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const mat = new THREE.PointsMaterial({
      size: 0.045,
      color: new THREE.Color("#c4785a"),
      transparent: true,
      opacity: 0.55,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const points = new THREE.Points(geo, mat);
    scene.add(points);
    const updateColor = () => {
      const isDark = document.documentElement.classList.contains("dark");
      mat.color = new THREE.Color(isDark ? "#e3a78c" : "#c4785a");
      mat.opacity = isDark ? 0.7 : 0.5;
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
      const t = (performance.now() - start) * 0.0001;
      points.rotation.y = t * 0.6 + mx * 0.15;
      points.rotation.x = -my * 0.15;
      const arr = geo.attributes.position.array as Float32Array;
      for (let i = 0; i < count; i++) {
        arr[i * 3 + 1] += Math.sin(t * 4 + i) * 0.0008;
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
    const speed = del ? 50 : 90;
    const t = setTimeout(() => {
      if (!del) {
        const next = word.slice(0, text.length + 1);
        setText(next);
        if (next === word) setTimeout(() => setDel(true), 1500);
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
    <span className="font-sans text-foreground/80">
      {text}
      <span className="inline-block w-[2px] h-5 ml-0.5 bg-primary align-middle animate-pulse" />
    </span>
  );
};

export const Hero = () => {
  const [orb, setOrb] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const onMove = (e: MouseEvent) => setOrb({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden grain"
    >
      <ParticleField />

      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[40rem] h-[40rem] rounded-full bg-gradient-orb blur-3xl animate-blob" />
        <div
          className="absolute bottom-1/4 right-1/4 w-[32rem] h-[32rem] rounded-full bg-gradient-orb blur-3xl animate-blob"
          style={{ animationDelay: "-7s" }}
        />
      </div>

      <div
        className="hidden md:block fixed w-[28rem] h-[28rem] rounded-full bg-gradient-orb blur-3xl pointer-events-none -z-10 transition-transform duration-700 ease-out"
        style={{ transform: `translate(${orb.x - 224}px, ${orb.y - 224}px)` }}
        aria-hidden
      />

      <div className="container relative text-center pt-24 pb-16">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="font-hand text-xl md:text-2xl text-primary mb-4"
        >
          hello, namaste I am
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 1, ease: [0.2, 0.8, 0.2, 1] }}
          className="font-serif text-6xl sm:text-7xl md:text-8xl lg:text-9xl leading-[0.95] tracking-tight text-balance"
        >
          Saumya <span className="italic text-primary">Neupane</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="mt-8 text-lg md:text-xl text-muted-foreground min-h-[2rem] flex items-center justify-center gap-2 flex-wrap"
        >
          <span className="font-serif italic text-foreground/70">a</span>
          <Typewriter />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.7 }}
          className="mt-12 flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <a
            href="#projects"
            className="group inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary text-primary-foreground hover:shadow-glow transition-all duration-300"
          >
            View My Work
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>

          <a
            href="/SaumyaNeupane_CV.pdf"
            download="Saumya_Neupane_CV.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 px-8 py-4 rounded-full border border-foreground/20 hover:border-primary hover:bg-primary/5 transition-all"
          >
            <Download className="w-4 h-4" />
            Download CV
          </a>
        </motion.div>
      </div>

      <a
        href="#about"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-xs uppercase tracking-[0.3em] text-muted-foreground"
      >
        <span>scroll</span>
        <ArrowDown className="w-4 h-4 animate-pulse-down text-primary" />
      </a>
    </section>
  );
};
