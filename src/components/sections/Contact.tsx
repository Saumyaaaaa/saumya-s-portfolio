import { motion, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { Github, Linkedin, Mail, Instagram, Twitter, Check, Send, Loader2 } from "lucide-react";
import { toast } from "sonner";

// 🔑 Replace the placeholders below with your own EmailJS values.
// Sign up free at https://www.emailjs.com — create a service, template, and grab your public key.
const EMAILJS_SERVICE_ID = "YOUR_EMAILJS_SERVICE_ID";
const EMAILJS_TEMPLATE_ID = "YOUR_EMAILJS_TEMPLATE_ID";
const EMAILJS_PUBLIC_KEY = "YOUR_EMAILJS_PUBLIC_KEY";

const socials = [
  { icon: Github, label: "GitHub", href: "https://github.com/Saumyaaaaa" },
  { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com/in/saumyaneupane" },
  { icon: Mail, label: "Gmail", href: "mailto:saumyaneupane@gmail.com" },
  { icon: Instagram, label: "Instagram", href: "https://instagram.com/saumya_neupane" },
  { icon: Twitter, label: "Twitter", href: "https://twitter.com/saumya_neupane" },
];

export const Contact = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formRef.current) return;
    setStatus("loading");
    try {
      if (EMAILJS_SERVICE_ID.startsWith("YOUR_")) {
        // Fallback when EmailJS isn't configured yet
        await new Promise((r) => setTimeout(r, 900));
        toast.message("Message captured (demo)", {
          description: "Add your EmailJS keys in Contact.tsx to send for real.",
        });
      } else {
        await emailjs.sendForm(
          EMAILJS_SERVICE_ID,
          EMAILJS_TEMPLATE_ID,
          formRef.current,
          { publicKey: EMAILJS_PUBLIC_KEY },
        );
        toast.success("Message sent! I'll get back to you soon.");
      }
      setStatus("success");
      formRef.current.reset();
      setTimeout(() => setStatus("idle"), 2400);
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Please try again or email me directly.");
      setStatus("idle");
    }
  };

  return (
    <section id="contact" className="py-28 md:py-36 bg-secondary/30 relative overflow-hidden">
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[40rem] h-[40rem] rounded-full bg-gradient-orb blur-3xl pointer-events-none -z-0" />

      <div className="container max-w-2xl relative">
        <div className="text-center mb-12">
          <p className="text-xs uppercase tracking-[0.4em] text-primary mb-4">— get in touch</p>
          <h2 className="font-serif text-4xl md:text-6xl">Let's talk.</h2>
          <p className="text-muted-foreground mt-4">
            Open to scholarships, opportunities, collaborations & friendly hellos.
          </p>
        </div>

        <motion.form
          ref={formRef}
          onSubmit={onSubmit}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-3xl border border-border bg-card p-8 md:p-10 shadow-soft space-y-5"
        >
          <div className="grid sm:grid-cols-2 gap-5">
            <label className="block">
              <span className="text-xs uppercase tracking-widest text-muted-foreground">Name</span>
              <input
                required
                name="from_name"
                type="text"
                className="mt-2 w-full bg-transparent border-b border-border focus:border-primary outline-none py-2 transition-colors"
                placeholder="Your name"
              />
            </label>
            <label className="block">
              <span className="text-xs uppercase tracking-widest text-muted-foreground">Email</span>
              <input
                required
                name="reply_to"
                type="email"
                className="mt-2 w-full bg-transparent border-b border-border focus:border-primary outline-none py-2 transition-colors"
                placeholder="you@email.com"
              />
            </label>
          </div>
          <label className="block">
            <span className="text-xs uppercase tracking-widest text-muted-foreground">Message</span>
            <textarea
              required
              name="message"
              rows={5}
              className="mt-2 w-full bg-transparent border-b border-border focus:border-primary outline-none py-2 resize-none transition-colors"
              placeholder="Say hi…"
            />
          </label>

          <button
            type="submit"
            disabled={status !== "idle"}
            className="relative w-full mt-4 px-6 py-4 rounded-full bg-primary text-primary-foreground font-medium overflow-hidden disabled:opacity-90 hover:shadow-glow transition-all"
          >
            <AnimatePresence mode="wait">
              {status === "idle" && (
                <motion.span key="i" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="inline-flex items-center gap-2">
                  Send Message <Send className="w-4 h-4" />
                </motion.span>
              )}
              {status === "loading" && (
                <motion.span key="l" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="inline-flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" /> Sending…
                </motion.span>
              )}
              {status === "success" && (
                <motion.span key="s" initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ opacity: 0 }} className="inline-flex items-center gap-2">
                  <Check className="w-5 h-5" /> Sent!
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </motion.form>

        <div className="mt-12 flex justify-center gap-3">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              aria-label={s.label}
              className="w-12 h-12 rounded-full border border-border bg-background flex items-center justify-center hover:border-primary hover:text-primary hover:-translate-y-1 transition-all"
            >
              <s.icon className="w-5 h-5" />
            </a>
          ))}
        </div>

        <p className="text-center text-sm text-muted-foreground mt-12">
          Designed &amp; built with love from Kathmandu 🇳🇵 · Saumya Neupane 2025
        </p>
      </div>
    </section>
  );
};
