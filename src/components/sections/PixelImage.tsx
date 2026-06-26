import React, { useEffect, useRef } from "react";

interface PixelImageProps {
  src: string;
  alt?: string;
  width?: number;
  height?: number;
  pixelSize?: number;
}

interface Pixel {
  x: number; // Current X
  y: number; // Current Y
  ox: number; // Target Origin X
  oy: number; // Target Origin Y
  vx: number; // Velocity X
  vy: number; // Velocity Y
  r: number;
  g: number;
  b: number;
  a: number;
}

const PixelImage: React.FC<PixelImageProps> = ({
  src,
  width = 320,
  height = 400,
  pixelSize = 3,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000, radius: 70 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    let animationFrameId: number;
    let pixels: Pixel[] = [];

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = src;

    img.onload = () => {
      canvas.width = width;
      canvas.height = height;
      ctx.drawImage(img, 0, 0, width, height);

      const imgData = ctx.getImageData(0, 0, width, height).data;
      ctx.clearRect(0, 0, width, height);

      pixels = [];

      for (let y = 0; y < height; y += pixelSize) {
        for (let x = 0; x < width; x += pixelSize) {
          const index = (y * width + x) * 4;
          const a = imgData[index + 3];

          if (a > 128) {
            // Cool spawn logic: Pixels explode in from random off-screen coordinates
            const angle = Math.random() * Math.PI * 2;
            const distance = Math.random() * 300 + 200; // start way outside
            const spawnX = x + Math.cos(angle) * distance;
            const spawnY = y + Math.sin(angle) * distance;

            pixels.push({
              x: spawnX,
              y: spawnY,
              ox: x,
              oy: y,
              vx: 0,
              vy: 0,
              r: imgData[index],
              g: imgData[index + 1],
              b: imgData[index + 2],
              a: a,
            });
          }
        }
      }
      animate();
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      const mouse = mouseRef.current;
      const totalPixels = pixels.length;

      for (let i = 0; i < totalPixels; i++) {
        const p = pixels[i];

        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        // Interactive Liquid Ripple Hover
        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          const time = performance.now() * 0.007;
          const wobbleX = Math.sin(time + p.oy) * 0.8;
          const wobbleY = Math.cos(time + p.ox) * 0.8;

          p.vx += (dx / dist) * force * 3 + wobbleX;
          p.vy += (dy / dist) * force * 3 + wobbleY;
        }

        // Magnetized Spring physics to snap into final destination position
        const springForce = 0.04; // Slightly lighter so assembling looks smooth
        const ax = (p.ox - p.x) * springForce;
        const ay = (p.oy - p.y) * springForce;

        p.vx += ax;
        p.vy += ay;

        p.vx *= 0.82; // Damping
        p.vy *= 0.82;

        p.x += p.vx;
        p.y += p.vy;

        ctx.fillStyle = `rgba(${p.r}, ${p.g}, ${p.b}, ${p.a / 255})`;
        ctx.fillRect(p.x, p.y, pixelSize, pixelSize);
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouseRef.current.x = -1000;
      mouseRef.current.y = -1000;
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      cancelAnimationFrame(animationFrameId);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [src, width, height, pixelSize]);

  return (
    <canvas
      ref={canvasRef}
      className="cursor-pointer block max-w-full h-auto object-contain"
      style={{
        width,
        height,
        imageRendering: "pixelated",
      }}
    />
  );
};

export default PixelImage;
