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
  const hasDrawnInitialRef = useRef(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Use layout effect for immediate canvas setup
  useLayoutEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.scale(dpr, dpr);

    return () => {
      if (animationFrameRef.current)
        cancelAnimationFrame(animationFrameRef.current);
    };
  }, [width, height]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

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

      for (let y = 0; y < height; y += pixelSize) {
        for (let x = 0; x < width; x += pixelSize) {
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
            });
          }
        }
      }

      pixelsRef.current = tempPixels;
      hasDrawnInitialRef.current = true;
      setIsLoaded(true);

      // Force immediate perfect static draw
      drawStatic(true);
    };

    const drawStatic = (resetPositions = false) => {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);

      const pixels = pixelsRef.current;
      for (let i = 0; i < pixels.length; i++) {
        const p = pixels[i];
        if (resetPositions) {
          p.x = p.ox;
          p.y = p.oy;
          p.vx = 0;
          p.vy = 0;
        }

        ctx.fillStyle = `rgba(${p.r},${p.g},${p.b},${p.a / 255})`;
        ctx.fillRect(Math.floor(p.x), Math.floor(p.y), pixelSize, pixelSize);
      }
    };

    const animate = () => {
      if (!isActiveRef.current || !ctx || !hasDrawnInitialRef.current) return;

      ctx.clearRect(0, 0, width, height);
      const pixels = pixelsRef.current;
      const { x: mx, y: my } = mouseRef.current;
      const RADIUS = 68;
      const time = performance.now() * 0.006;
      let anyMoving = false;

      for (let i = 0; i < pixels.length; i++) {
        const p = pixels[i];

        const dx = p.x - mx;
        const dy = p.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < RADIUS && dist > 0.001) {
          const force = (RADIUS - dist) / RADIUS;
          const wobbleX = Math.sin(time + p.oy * 0.04) * 0.6;
          const wobbleY = Math.cos(time + p.ox * 0.04) * 0.6;

          p.vx += (dx / dist) * force * 3.2 + wobbleX;
          p.vy += (dy / dist) * force * 3.2 + wobbleY;
        }

        p.vx += (p.ox - p.x) * 0.095;
        p.vy += (p.oy - p.y) * 0.095;

        p.vx *= 0.74;
        p.vy *= 0.74;

        p.x += p.vx;
        p.y += p.vy;

        if (Math.abs(p.vx) > 0.025 || Math.abs(p.vy) > 0.025) {
          anyMoving = true;
        }

        ctx.fillStyle = `rgba(${p.r},${p.g},${p.b},${p.a / 255})`;
        ctx.fillRect(Math.floor(p.x), Math.floor(p.y), pixelSize, pixelSize);
      }

      if (!mouseRef.current.active && !anyMoving) {
        isActiveRef.current = false;
        drawStatic(true);
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
    };

    const updateInteraction = (clientX: number, clientY: number) => {
      const coords = getCoords(clientX, clientY);
      mouseRef.current = { ...coords, active: true };
    };

    const endInteraction = () => {
      mouseRef.current.active = false;
    };

    const onMouseEnter = (e: MouseEvent) =>
      startInteraction(e.clientX, e.clientY);
    const onMouseMove = (e: MouseEvent) =>
      updateInteraction(e.clientX, e.clientY);
    const onMouseLeave = () => endInteraction();

    const onTouchStart = (e: TouchEvent) => {
      e.preventDefault();
      startInteraction(e.touches[0].clientX, e.touches[0].clientY);
    };
    const onTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      if (mouseRef.current.active)
        updateInteraction(e.touches[0].clientX, e.touches[0].clientY);
    };
    const onTouchEnd = () => endInteraction();

    canvas.addEventListener("mouseenter", onMouseEnter);
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mouseleave", onMouseLeave);
    canvas.addEventListener("touchstart", onTouchStart, { passive: false });
    canvas.addEventListener("touchmove", onTouchMove, { passive: false });
    canvas.addEventListener("touchend", onTouchEnd, { passive: false });

    return () => {
      if (animationFrameRef.current)
        cancelAnimationFrame(animationFrameRef.current);
      canvas.removeEventListener("mouseenter", onMouseEnter);
      canvas.removeEventListener("mousemove", onMouseMove);
      canvas.removeEventListener("mouseleave", onMouseLeave);
      canvas.removeEventListener("touchstart", onTouchStart);
      canvas.removeEventListener("touchmove", onTouchMove);
      canvas.removeEventListener("touchend", onTouchEnd);
    };
  }, [src, width, height, pixelSize]);

  return (
    <canvas
      ref={canvasRef}
      aria-label={alt}
      role="img"
      className={`block max-w-full cursor-crosshair select-none transition-opacity duration-100 ${
        isLoaded ? "opacity-100" : "opacity-0"
      }`}
    />
  );
};

export default PixelImage;
