import { useEffect, useRef } from "react";

/**
 * CometEffect — Renders animated comets streaking across the hero section.
 * Multiple comets with glowing tails at random intervals for dynamic feel.
 */

interface Comet {
  x: number;
  y: number;
  angle: number;
  speed: number;
  length: number;
  opacity: number;
  width: number;
  hue: number;
  active: boolean;
  life: number;
  maxLife: number;
}

const CometEffect = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const cometsRef = useRef<Comet[]>([]);
  const timerRef = useRef(0);

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

    const spawnComet = (): Comet => {
      // Decide spawn edge — mostly from top-left quadrant streaking towards bottom-right
      const side = Math.random();
      let x: number, y: number, angle: number;

      if (side < 0.5) {
        // Spawn from top edge
        x = Math.random() * w * 0.8;
        y = -20;
        angle = Math.PI * (0.2 + Math.random() * 0.25); // ~36° to 81° downward
      } else if (side < 0.8) {
        // Spawn from left edge
        x = -20;
        y = Math.random() * h * 0.5;
        angle = Math.PI * (0.05 + Math.random() * 0.2); // ~9° to ~45°
      } else {
        // Spawn from right edge (rare, streaking down-left)
        x = w + 20;
        y = Math.random() * h * 0.3;
        angle = Math.PI * (0.6 + Math.random() * 0.2); // ~108° to ~144°
      }

      return {
        x,
        y,
        angle,
        speed: 6 + Math.random() * 10,
        length: 80 + Math.random() * 180,
        opacity: 0.6 + Math.random() * 0.4,
        width: 1 + Math.random() * 2,
        hue: 200 + Math.random() * 60, // Blue to cyan range
        active: true,
        life: 0,
        maxLife: 60 + Math.random() * 100, // frames
      };
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      timerRef.current++;

      // Spawn new comets at random intervals
      if (timerRef.current % (90 + Math.floor(Math.random() * 120)) === 0) {
        cometsRef.current.push(spawnComet());
      }

      // Occasionally spawn a bright one
      if (timerRef.current % (300 + Math.floor(Math.random() * 200)) === 0) {
        const bright = spawnComet();
        bright.opacity = 1;
        bright.width = 2.5 + Math.random() * 1.5;
        bright.length = 200 + Math.random() * 150;
        bright.speed = 10 + Math.random() * 8;
        cometsRef.current.push(bright);
      }

      for (let i = cometsRef.current.length - 1; i >= 0; i--) {
        const c = cometsRef.current[i];
        c.life++;

        // Move comet
        c.x += Math.cos(c.angle) * c.speed;
        c.y += Math.sin(c.angle) * c.speed;

        // Fade in and out
        let alpha = c.opacity;
        if (c.life < 10) {
          alpha *= c.life / 10;
        }
        if (c.life > c.maxLife - 20) {
          alpha *= (c.maxLife - c.life) / 20;
        }

        // Check if offscreen or dead
        if (
          c.x < -c.length * 2 ||
          c.x > w + c.length * 2 ||
          c.y < -c.length * 2 ||
          c.y > h + c.length * 2 ||
          c.life > c.maxLife
        ) {
          cometsRef.current.splice(i, 1);
          continue;
        }

        // Draw comet tail (gradient line)
        const tailX = c.x - Math.cos(c.angle) * c.length;
        const tailY = c.y - Math.sin(c.angle) * c.length;

        const gradient = ctx.createLinearGradient(tailX, tailY, c.x, c.y);
        gradient.addColorStop(0, `hsla(${c.hue}, 80%, 70%, 0)`);
        gradient.addColorStop(0.3, `hsla(${c.hue}, 80%, 70%, ${alpha * 0.1})`);
        gradient.addColorStop(0.7, `hsla(${c.hue}, 80%, 80%, ${alpha * 0.5})`);
        gradient.addColorStop(1, `hsla(${c.hue}, 90%, 90%, ${alpha})`);

        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(c.x, c.y);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = c.width;
        ctx.lineCap = "round";
        ctx.stroke();

        // Draw bright head glow
        const headGlow = ctx.createRadialGradient(c.x, c.y, 0, c.x, c.y, c.width * 6);
        headGlow.addColorStop(0, `hsla(${c.hue}, 100%, 95%, ${alpha * 0.8})`);
        headGlow.addColorStop(0.3, `hsla(${c.hue}, 90%, 80%, ${alpha * 0.3})`);
        headGlow.addColorStop(1, `hsla(${c.hue}, 80%, 70%, 0)`);

        ctx.beginPath();
        ctx.arc(c.x, c.y, c.width * 6, 0, Math.PI * 2);
        ctx.fillStyle = headGlow;
        ctx.fill();

        // Inner bright core
        ctx.beginPath();
        ctx.arc(c.x, c.y, c.width * 0.8, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(0, 0%, 100%, ${alpha * 0.9})`;
        ctx.fill();
      }

      animRef.current = requestAnimationFrame(draw);
    };

    // Spawn initial comet with small delay
    setTimeout(() => {
      cometsRef.current.push(spawnComet());
    }, 2000);

    animRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-[5] pointer-events-none"
      style={{ mixBlendMode: "screen" }}
    />
  );
};

export default CometEffect;
