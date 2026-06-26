import React, { useEffect, useRef, useState, useLayoutEffect } from "react";

interface PixelImageProps {
  src: string;
  alt?: string;
  width?: number;
  height?: number;
  pixelSize?: number;
}

interface Pixel {
  x: number;
  y: number;
  ox: number;
  oy: number;
  vx: number;
  vy: number;
  r: number;
  g: number;
  b: number;
  a: number;
  wobble: number;
}

const PixelImage: React.FC<PixelImageProps> = ({
  src,
  alt,
  width = 320,
  height = 400,
  pixelSize = 4,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999, active: false });
  const pixelsRef = useRef<Pixel[]>([]);
  const isActiveRef = useRef(false);
  const animationFrameRef = useRef<number | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const finalPixelSize = pixelSize;

  // High-res canvas setup based on device pixel ratio
  useLayoutEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);
    ctx.imageSmoothingEnabled = false; // Ensures crisp pixels
  }, [width, height]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    const drawStatic = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);
      const pixels = pixelsRef.current;
      for (let i = 0; i < pixels.length; i++) {
        const p = pixels[i];
        // Snap perfectly back to original position to prevent cracked image
        p.x = p.ox;
        p.y = p.oy;
        p.vx = 0;
        p.vy = 0;
        p.wobble = 0;
        ctx.fillStyle = `rgba(${p.r},${p.g},${p.b},${p.a / 255})`;
        ctx.fillRect(p.ox, p.oy, finalPixelSize, finalPixelSize);
      }
    };

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = src;

    img.onload = () => {
      const tempCanvas = document.createElement("canvas");
      const tempCtx = tempCanvas.getContext("2d", {
        willReadFrequently: true,
      })!;

      tempCanvas.width = width;
      tempCanvas.height = height;
      tempCtx.drawImage(img, 0, 0, width, height);

      const imgData = tempCtx.getImageData(0, 0, width, height).data;
      const tempPixels: Pixel[] = [];

      for (let y = 0; y < height; y += finalPixelSize) {
        for (let x = 0; x < width; x += finalPixelSize) {
          const index = (Math.floor(y) * width + Math.floor(x)) * 4;
          const a = imgData[index + 3];
          if (a > 128) {
            tempPixels.push({
              x: x,
              y: y,
              ox: x,
              oy: y,
              vx: 0,
              vy: 0,
              r: imgData[index],
              g: imgData[index + 1],
              b: imgData[index + 2],
              a,
              wobble: 0,
            });
          }
        }
      }

      pixelsRef.current = tempPixels;
      setIsLoaded(true);
      drawStatic();
    };

    const animate = () => {
      if (!isActiveRef.current || !ctx) return;

      ctx.clearRect(0, 0, width, height);
      const pixels = pixelsRef.current;
      const { x: mx, y: my, active } = mouseRef.current;

      const isMobile = window.innerWidth < 768;
      const RADIUS = isMobile ? 52 : 65;
      const time = performance.now() * 0.005;
      let needsAnimation = false;

      for (let i = 0; i < pixels.length; i++) {
        const p = pixels[i];

        const dx = p.x - mx;
        const dy = p.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);

        // Apply repulsion ONLY when active. Charge up wobble energy.
        if (active && dist < RADIUS && dist > 1) {
          const force = (RADIUS - dist) / RADIUS;
          p.vx += (dx / dist) * force * (isMobile ? 2.6 : 3.0);
          p.vy += (dy / dist) * force * (isMobile ? 2.6 : 3.0);
          p.wobble = 1;
        }

        // Spring back to original position
        p.vx += (p.ox - p.x) * 0.15;
        p.vy += (p.oy - p.y) * 0.15;

        // Damping/friction
        p.vx *= 0.88;
        p.vy *= 0.88;

        // Apply floating wobble effect if there is energy left
        if (p.wobble > 0.01) {
          const wobbleAmp = (isMobile ? 0.4 : 0.6) * p.wobble;
          p.vx += Math.sin(time + p.oy * 0.1) * wobbleAmp;
          p.vy += Math.cos(time + p.ox * 0.1) * wobbleAmp;

          // Decay wobble energy over time
          p.wobble *= 0.96;
        }

        p.x += p.vx;
        p.y += p.vy;

        // Keep animating if moving OR still has wobble energy
        if (
          Math.abs(p.x - p.ox) > 0.1 ||
          Math.abs(p.y - p.oy) > 0.1 ||
          Math.abs(p.vx) > 0.05 ||
          Math.abs(p.vy) > 0.05 ||
          p.wobble > 0.05
        ) {
          needsAnimation = true;
        }

        ctx.fillStyle = `rgba(${p.r},${p.g},${p.b},${p.a / 255})`;
        // Rounding prevents anti-aliasing blur, keeping it granular and crisp
        ctx.fillRect(
          Math.round(p.x),
          Math.round(p.y),
          finalPixelSize,
          finalPixelSize,
        );
      }

      // Stop animation ONLY when user is gone AND pixels are fully settled
      if (!active && !needsAnimation) {
        isActiveRef.current = false;
        drawStatic(); // Guarantees perfect alignment
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
          animationFrameRef.current = null;
        }
        return;
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    const getCoords = (clientX: number, clientY: number) => {
      const rect = canvas.getBoundingClientRect();
      return {
        x: ((clientX - rect.left) / rect.width) * width,
        y: ((clientY - rect.top) / rect.height) * height,
      };
    };

    const startInteraction = (clientX: number, clientY: number) => {
      const coords = getCoords(clientX, clientY);
      mouseRef.current = { ...coords, active: true };
      if (!isActiveRef.current) {
        isActiveRef.current = true;
        animate();
      }
      window.addEventListener("touchend", handleGlobalTouchEnd);
      window.addEventListener("touchcancel", handleGlobalTouchEnd);
    };

    const updateInteraction = (clientX: number, clientY: number) => {
      mouseRef.current = { ...getCoords(clientX, clientY), active: true };
    };

    const endInteraction = () => {
      // Don't kill animation, just set active to false.
      // The animate loop will continue until wobble decays and pixels settle.
      mouseRef.current.active = false;
    };

    // --- Event Handlers ---
    const handleMouseEnter = (e: MouseEvent) =>
      startInteraction(e.clientX, e.clientY);
    const handleMouseMove = (e: MouseEvent) =>
      updateInteraction(e.clientX, e.clientY);
    const handleMouseLeave = () => endInteraction();

    const handleTouchStart = (e: TouchEvent) => {
      e.preventDefault();
      startInteraction(e.touches[0].clientX, e.touches[0].clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      if (mouseRef.current.active) {
        updateInteraction(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    const handleGlobalTouchEnd = () => {
      endInteraction();
      window.removeEventListener("touchend", handleGlobalTouchEnd);
      window.removeEventListener("touchcancel", handleGlobalTouchEnd);
    };

    // --- Attach Listeners ---
    canvas.addEventListener("mouseenter", handleMouseEnter);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);
    canvas.addEventListener("touchstart", handleTouchStart, { passive: false });
    canvas.addEventListener("touchmove", handleTouchMove, { passive: false });

    // --- Cleanup ---
    return () => {
      if (animationFrameRef.current)
        cancelAnimationFrame(animationFrameRef.current);
      canvas.removeEventListener("mouseenter", handleMouseEnter);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      canvas.removeEventListener("touchstart", handleTouchStart);
      canvas.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleGlobalTouchEnd);
      window.removeEventListener("touchcancel", handleGlobalTouchEnd);
    };
  }, [src, width, height, finalPixelSize]);

  return (
    <canvas
      ref={canvasRef}
      aria-label={alt}
      role="img"
      className={`block w-full cursor-crosshair select-none transition-opacity duration-100 ${
        isLoaded ? "opacity-100" : "opacity-0"
      }`}
      style={{
        maxWidth: `${width}px`,
        aspectRatio: `${width} / ${height}`,
        imageRendering: "pixelated",
      }}
    />
  );
};

export default PixelImage;
