import { useEffect, useRef } from "react";

/**
 * SpaceBackground — a fixed, full-viewport canvas that renders
 * a continuous traveling through space 3D starfield effect and cosmic nebula.
 */
const STAR_COUNT = 600;
const BASE_SPEED = 0.5;
const Z_DEPTH = 2000;

interface Star {
  x: number;
  y: number;
  z: number;
  pz: number; // Previous Z for drawing trails
  opacity: number;
}
interface Dust {
  x: number;
  y: number;
  size: number;
  vx: number;
  vy: number;
  opacity: number;
}

const DUST_COUNT = 250;

const SpaceBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const dustRef = useRef<Dust[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const animRef = useRef<number>(0);
  const bgPosRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = window.innerWidth;
    let h = window.innerHeight;

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w;
      canvas.height = h;
    };
    resize();
    window.addEventListener("resize", resize);

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Initialize stars with random 3D coordinates
    starsRef.current = Array.from({ length: STAR_COUNT }, () => ({
      x: (Math.random() - 0.5) * Z_DEPTH * 2,
      y: (Math.random() - 0.5) * Z_DEPTH * 2,
      z: Math.random() * Z_DEPTH,
      pz: 0,
      opacity: Math.random() * 0.8 + 0.2,
    }));
    
    // Set initial pz slightly offset to avoid long initial lines
    starsRef.current.forEach(star => {
      star.pz = star.z;
    });

    // Initialize dust particles
    dustRef.current = Array.from({ length: DUST_COUNT }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      size: Math.random() * 1.5 + 0.5,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      opacity: Math.random() * 0.5 + 0.1,
    }));

    const draw = () => {
      // Clear the canvas cleanly to allow background image to show perfectly
      ctx.clearRect(0, 0, w, h);

      const cx = w / 2;
      const cy = h / 2;

      for (const star of starsRef.current) {
        star.pz = star.z;
        star.z -= BASE_SPEED * 0.4; // Move towards camera

        if (star.z < 1) {
          star.z = Z_DEPTH;
          star.x = (Math.random() - 0.5) * Z_DEPTH * 2;
          star.y = (Math.random() - 0.5) * Z_DEPTH * 2;
          star.pz = star.z;
        }

        // Perspective division
        const factor = Z_DEPTH / star.z;
        const px = star.x * factor + cx;
        const py = star.y * factor + cy;

        const pFactor = Z_DEPTH / star.pz;
        const ppx = star.x * pFactor + cx;
        const ppy = star.y * pFactor + cy;

        // Skip drawing if outside screen to improve performance
        if (px < 0 || px > w || py < 0 || py > h) continue;

        // Calculate size and brightness based on depth
        const depthRatio = 1 - star.z / Z_DEPTH;
        const brightness = Math.min(1, depthRatio * 1.5) * star.opacity;
        const size = Math.max(0.5, depthRatio * 2.5);

        ctx.beginPath();
        ctx.moveTo(ppx, ppy);
        ctx.lineTo(px, py);
        // Slight blueish tint to match hero space vibe
        ctx.strokeStyle = `rgba(180, 220, 255, ${brightness})`;
        ctx.lineWidth = size;
        ctx.lineCap = "round";
        ctx.stroke();
      }

      // Draw dust
      for (const dust of dustRef.current) {
        dust.x += dust.vx;
        dust.y += dust.vy;

        // Wrap around
        if (dust.x < 0) dust.x = w;
        if (dust.x > w) dust.x = 0;
        if (dust.y < 0) dust.y = h;
        if (dust.y > h) dust.y = 0;

        // Interactive mouse repulsion
        const dx = mouseRef.current.x - dust.x;
        const dy = mouseRef.current.y - dust.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < 120 && dist > 0) {
          const force = (120 - dist) / 120;
          dust.x -= (dx / dist) * force * 2;
          dust.y -= (dy / dist) * force * 2;
        }

        ctx.beginPath();
        ctx.arc(dust.x, dust.y, dust.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200, 230, 255, ${dust.opacity})`;
        ctx.fill();
      }

      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // Continuous background image scroll
  useEffect(() => {
    const animateBg = () => {
      bgPosRef.current += 0.09;
      const bgDiv = document.getElementById("kosmic-bg");
      if (bgDiv) {
        bgDiv.style.backgroundPositionY = `${bgPosRef.current}px`;
      }
      requestAnimationFrame(animateBg);
    };
    const bgAnim = requestAnimationFrame(animateBg);
    return () => cancelAnimationFrame(bgAnim);
  }, []);

  return (
    <>
      {/* Base black */}
      <div className="fixed inset-0 z-[-1] bg-[#030612] overflow-hidden" />
      
      {/* Stunning Galactic Image Layer with continuous vertical scroll */}
      <div 
        id="kosmic-bg"
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: "url('/kosmic-bg.png')",
          backgroundSize: "cover",
          backgroundPositionX: "center",
          opacity: 0.22,
          mixBlendMode: "screen",
          willChange: "background-position",
        }}
      />

      {/* Nebula glow layers */}
      <div
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          mixBlendMode: "screen",
          filter: "blur(90px)",
          opacity: 0.45,
          background: `
            radial-gradient(ellipse 70% 60% at 20% 30%, rgba(40, 70, 200, 0.3) 0%, transparent 65%),
            radial-gradient(ellipse 60% 70% at 80% 70%, rgba(100, 40, 220, 0.25) 0%, transparent 65%),
            radial-gradient(ellipse 80% 40% at 50% 90%, rgba(20, 150, 220, 0.2) 0%, transparent 60%),
            radial-gradient(ellipse 60% 50% at 10% 80%, rgba(70, 30, 200, 0.15) 0%, transparent 50%)
          `,
        }}
      />

      {/* Animated 3D traveling star canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 z-0 pointer-events-none"
        style={{ mixBlendMode: "screen" }}
      />
    </>
  );
};

export default SpaceBackground;
