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
    e:
      | React.MouseEvent<HTMLAnchorElement>
      | React.TouchEvent<HTMLAnchorElement>,
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
        scrolled
          ? "py-3 bg-background/80 backdrop-blur-md border-b border-border shadow-soft"
          : "py-6 bg-transparent"
      }`}
    >
      <nav className="container mx-auto flex items-center justify-between px-6">
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
                className="relative px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors group"
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
            className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-primary/5 active:scale-95 transition-all z-50"
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
            className="md:hidden overflow-hidden absolute top-full left-0 w-full bg-[#030712]/95 backdrop-blur-md border-b border-border z-50 shadow-soft"
          >
            <ul className="container mx-auto py-6 px-6 flex flex-col gap-2">
              {links.map((l) => (
                <li key={l.href}>
                  {/* Changed anchor to a Framer Motion component to control mobile states perfectly */}
                  <motion.a
                    href={l.href}
                    onClick={(e) => handleNavClick(e, l.href)}
                    className="relative block px-4 py-3 rounded-lg text-lg font-medium text-slate-200 transition-colors duration-200 group overflow-hidden"
                    whileTap="tap"
                  >
                    {/* Background gold flash exactly matching hover logic */}
                    <motion.span
                      variants={{
                        tap: { scaleY: 1, opacity: 0.15 },
                      }}
                      initial={{ scaleY: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="absolute inset-0 bg-primary origin-bottom z-0"
                    />

                    {/* Text Element */}
                    <motion.span
                      variants={{
                        tap: { color: "hsl(var(--primary))" },
                      }}
                      className="relative z-10 block transition-colors"
                    >
                      {l.label}
                    </motion.span>

                    {/* Expanding Gold Underline tailored to mobile tracking */}
                    <motion.span
                      variants={{
                        tap: { scaleX: 1 },
                      }}
                      initial={{ scaleX: 0 }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                      className="absolute left-4 right-4 bottom-2 h-px bg-primary origin-left z-10"
                    />
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
