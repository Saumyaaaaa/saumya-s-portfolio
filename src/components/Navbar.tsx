import { Moon, Sun, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useTheme } from "./ThemeProvider";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Life", href: "#life" },
  { label: "Contact", href: "#contact" },
];

export const Navbar = () => {
  const { theme, toggle } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? "py-3 glass shadow-soft" : "py-6 bg-transparent"
      }`}
    >
      <nav className="container flex items-center justify-between">
        <a href="#home" className="group flex items-center gap-2">
          <span className="font-serif text-2xl tracking-tight text-foreground">
            <span className="text-primary">S</span>N
          </span>
          <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-primary group-hover:scale-150 transition-transform" />
        </a>

        <ul className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="relative px-4 py-2 text-sm text-foreground/75 hover:text-foreground transition-colors group"
              >
                {l.label}
                <span className="absolute left-4 right-4 bottom-1 h-px bg-primary scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300" />
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <button
            onClick={toggle}
            aria-label="Toggle theme"
            className="relative w-10 h-10 rounded-full border border-border hover:border-primary/60 hover:bg-primary/5 transition-all flex items-center justify-center"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={theme}
                initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                exit={{ rotate: 90, opacity: 0, scale: 0.6 }}
                transition={{ duration: 0.25 }}
              >
                {theme === "light" ? (
                  <Moon className="w-4 h-4 text-foreground" />
                ) : (
                  <Sun className="w-4 h-4 text-primary" />
                )}
              </motion.span>
            </AnimatePresence>
          </button>
          <button
            className="md:hidden w-10 h-10 rounded-full border border-border flex items-center justify-center"
            onClick={() => setOpen((o) => !o)}
            aria-label="Menu"
          >
            {open ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden glass border-t border-border/50"
          >
            <ul className="container py-4 flex flex-col gap-1">
              {links.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block px-4 py-3 rounded-lg hover:bg-primary/5 text-foreground/80"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
