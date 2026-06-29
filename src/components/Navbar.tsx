import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
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
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    e.preventDefault();

    const id = href.replace("#", "");
    const element = document.getElementById(id);

    if (element) {
      setOpen(false);
      setTimeout(() => {
        const yOffset = -80;
        const y =
          element.getBoundingClientRect().top + window.scrollY + yOffset;

        window.scrollTo({
          top: y,
          behavior: "smooth",
        });
      }, 150);
    }
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? "py-3 glass shadow-soft" : "py-6 bg-transparent"
      }`}
    >
      <nav className="container mx-auto flex items-center justify-between px-4">
        {/* Logo */}
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, "#home")}
          className="group flex items-center gap-2"
        >
          <span className="font-serif text-2xl tracking-tight text-foreground">
            <span className="text-primary">S</span>N
          </span>
          <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-primary group-hover:scale-150 transition-transform" />
        </a>

        {/* Desktop Navigation Links */}
        <ul className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={(e) => handleNavClick(e, l.href)}
                className="relative px-4 py-2 text-sm text-foreground/75 hover:text-foreground transition-colors group"
              >
                {l.label}
                <span className="absolute left-4 right-4 bottom-1 h-px bg-primary scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300" />
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile Hamburger Button */}
        <div className="flex items-center md:hidden">
          <button
            className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-foreground hover:bg-primary/5 active:scale-95 transition-all z-50"
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle Menu"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Dropdown Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden overflow-hidden absolute top-full left-0 w-full bg-neutral-950/95 backdrop-blur-md border-b border-t border-border/50 z-50 shadow-2xl"
          >
            <ul className="container mx-auto py-6 px-6 flex flex-col gap-2">
              {links.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={(e) => handleNavClick(e, l.href)}
                    className="block px-4 py-3 rounded-lg text-lg text-foreground/80 hover:text-foreground hover:bg-white/5 active:bg-white/10 transition-all duration-200"
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
