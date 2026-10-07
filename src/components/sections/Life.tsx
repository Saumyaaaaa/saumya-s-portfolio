import { motion, AnimatePresence } from "framer-motion";
import { Camera, RotateCcw, Bug } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import graduationPhoto from "@/assets/projects/graduation.jfif";
import bajraPhoto from "@/assets/projects/bajra.jfif";
import cfcPhoto from "@/assets/projects/cfc.jfif";

const slots = [
  {
    caption: "Graduation Day",
    h: "tall",
    defaultSrc: graduationPhoto,
    position: "object-center",
    style: { objectPosition: "85% center" },
  },
  {
    caption: "Team Moments @ Bajra",
    h: "short",
    defaultSrc: bajraPhoto,
    position: "object-center",
    style: {},
  },
  {
    caption: "Code for Change Meetup",
    h: "med",
    defaultSrc: cfcPhoto,
    position: "object-center",
    style: {},
  },
];

const heightClass: Record<string, string> = {
  tall: "h-[460px]",
  med: "h-[340px]",
  short: "h-[260px]",
};

const PhotoSlot = ({
  caption,
  hClass,
  index,
  defaultSrc,
  position = "object-center",
  style = {},
}: {
  caption: string;
  hClass: string;
  index: number;
  defaultSrc?: string;
  position?: string;
  style?: React.CSSProperties;
}) => {
  const [src, setSrc] = useState<string | null>(defaultSrc || null);
  const [isCustom, setIsCustom] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSrc(URL.createObjectURL(file));
      setIsCustom(true);

      // Pops up only AFTER they upload, turning their "bug discovery" into the Easter egg
      toast.custom(
        () => (
          <div className="bg-card border-2 border-primary/50 text-foreground p-4 rounded-2xl shadow-xl flex items-start gap-3 max-w-sm">
            <span className="p-2 rounded-xl bg-primary/10 text-primary shrink-0">
              <Bug className="w-5 h-5" />
            </span>
            <div>
              <p className="font-serif font-bold text-base text-primary">
                🐛 Congratulations, you found the bug!
              </p>
              <p className="text-xs text-foreground/80 mt-1 leading-relaxed">
                ...or did you? As someone in QA, I intentionally left this
                client-side upload here as a playful Easter egg for curious
                visitors. Your image only lives in your browser's local memory
                and vanishes on refresh!
              </p>
            </div>
          </div>
        ),
        { duration: 7000 },
      );
    }
  };

  const resetPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSrc(defaultSrc || null);
    setIsCustom(false);
    if (inputRef.current) inputRef.current.value = "";
    toast.info("Restored original photo.");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.06, duration: 0.6 }}
      className="break-inside-avoid mb-6 relative group"
    >
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className={`group relative block w-full ${hClass} rounded-2xl border-2 border-dashed border-border bg-card overflow-hidden hover:border-primary/60 transition-colors focus:outline-none`}
      >
        {src ? (
          <motion.img
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            src={src}
            alt={caption}
            className={`w-full h-full object-cover ${position}`}
            style={style}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-muted-foreground bg-gradient-warm p-6 text-center">
            <Camera className="w-7 h-7 text-primary/70 mb-3" />
            <span className="text-xs uppercase tracking-widest">
              Click to upload
            </span>
          </div>
        )}
      </button>

      {/* Floating reset button appears once an image is uploaded so they can revert it */}
      <AnimatePresence>
        {isCustom && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={resetPhoto}
            title="Reset to original photo"
            className="absolute top-3 right-3 p-2 bg-background/90 text-foreground hover:text-primary rounded-full border border-border shadow-md z-10 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
          </motion.button>
        )}
      </AnimatePresence>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleImageUpload}
      />

      <p className="font-hand italic text-lg mt-3 text-foreground/70">
        {caption}
      </p>
    </motion.div>
  );
};

export const Life = () => {
  return (
    <section id="life" className="py-28 md:py-36">
      <div className="container">
        <p className="text-xs uppercase tracking-[0.4em] text-primary mb-4">
          — life
        </p>
        <h2 className="font-serif text-4xl md:text-6xl mb-4">
          Beyond the screen.
        </h2>
        <p className="text-muted-foreground max-w-xl mb-12">
          A wall of moments — community, friends, and small joys.
        </p>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6">
          {slots.map((s, i) => (
            <PhotoSlot
              key={s.caption}
              caption={s.caption}
              hClass={heightClass[s.h]}
              index={i}
              defaultSrc={s.defaultSrc}
              position={s.position}
              style={s.style}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
