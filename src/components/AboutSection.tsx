import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedTextReveal from "./ui/AnimatedTextReveal";
import { useSectionReveal } from "@/hooks/useSectionReveal";
import { Cpu, Palette, BarChart3 } from "lucide-react";
import { useState } from "react";

const TransparentMeditation = ({ src }: { src: string }) => {
  const [dataUrl, setDataUrl] = useState<string | null>(null);

  useEffect(() => {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.src = src;
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d", { willReadFrequently: true });
      if (!ctx) return;

      ctx.drawImage(img, 0, 0);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      // Scan and remove any pixels that are "dark" (close to black)
      // This creates a clean alpha channel for the figure
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        const brightness = (r + g + b) / 3;
        
        // Threshold for black removal - everything darker than this becomes transparent
        if (brightness < 45) {
          data[i + 3] = 0; // Alpha to zero
        }
      }

      ctx.putImageData(imageData, 0, 0);
      setDataUrl(canvas.toDataURL());
    };
  }, [src]);

  if (!dataUrl) return <div className="w-64 h-64 border-2 border-white/10 border-dashed rounded-full animate-spin-slow opacity-20" />;

  return (
    <img 
      src={dataUrl} 
      alt="Meditation Silhouette" 
      className="max-h-full object-contain select-none pointer-events-none transition-opacity duration-1000"
      style={{ 
        animation: "meditation-breath 4s ease-in-out infinite",
        filter: "drop-shadow(0 0 20px rgba(59, 130, 246, 0.2)) brightness(0.85) contrast(1.1)"
      }}
    />
  );
};

gsap.registerPlugin(ScrollTrigger);

const highlights = [
  { icon: Cpu, label: "AI & ML", desc: "Deep learning & neural networks" },
  { icon: Palette, label: "UI/UX", desc: "Human-centered design" },
  { icon: BarChart3, label: "Data", desc: "Insights from complexity" },
];

const AboutSection = () => {
  const sectionRef = useSectionReveal();
  const headingRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!leftRef.current || !rightRef.current) return;

    if (headingRef.current) {
      gsap.fromTo(headingRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: headingRef.current, start: "top 90%", end: "top 40%", toggleActions: "play reverse play reverse" },
        }
      );
    }

    gsap.fromTo(leftRef.current,
      { x: -60, opacity: 0 },
      {
        x: 0, opacity: 1, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: leftRef.current, start: "top 88%", end: "top 35%", toggleActions: "play reverse play reverse" },
      }
    );
    gsap.fromTo(rightRef.current,
      { x: 60, opacity: 0 },
      {
        x: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.15,
        scrollTrigger: { trigger: rightRef.current, start: "top 88%", end: "top 35%", toggleActions: "play reverse play reverse" },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === leftRef.current || t.trigger === rightRef.current || t.trigger === headingRef.current) t.kill();
      });
    };
  }, []);

  return (
    <section ref={sectionRef} id="about" className="relative flex flex-col items-center px-4 md:px-20 lg:px-[120px] pt-32 pb-16 md:pb-24 overflow-hidden">
      {/* Section heading - centered at top */}
      <div ref={headingRef} className="text-center mb-12 w-full" style={{ opacity: 0 }}>
        <AnimatedTextReveal 
          text="About Me" 
          className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-foreground leading-tight tracking-tight justify-center" 
        />
      </div>

      <div className="section-content relative w-full flex items-center justify-center">
        <div className="grid md:grid-cols-2 gap-10 md:gap-14 items-center w-full">
          
          {/* Left Column: Text Content */}
          <div ref={leftRef} className="lg:col-span-1" style={{ opacity: 0 }}>
            <div className="mt-2 space-y-3 text-left">
              <p className="text-muted-foreground font-body leading-relaxed text-sm">
                I'm a multidisciplinary creative who thrives at the intersection of artificial intelligence,
                human-centered design, and data-driven insights.
              </p>
              <p className="text-muted-foreground font-body leading-relaxed text-sm">
                Every pixel serves a purpose, every interaction tells a story, and every dataset reveals an opportunity.
              </p>
            </div>

            {/* Highlight cards */}
            <div className="grid gap-3 mt-6">
              {highlights.map((h, i) => {
                const Icon = h.icon;
                return (
                  <div key={i} className="glass-card p-4 flex items-center gap-4 group hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-500">
                    <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-display text-sm font-semibold text-foreground">{h.label}</h3>
                      <p className="text-xs font-body text-muted-foreground">{h.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Meditation Silhouette */}
          <div ref={rightRef} className="relative flex items-center justify-center w-full min-h-[450px]" style={{ height: "clamp(450px, 65vh, 750px)", opacity: 0 }}>
            <div className="relative w-full h-full flex items-center justify-center">
              <TransparentMeditation src="/meditation_seamless.png" />
              
              {/* Secondary background glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-primary/15 blur-[160px] rounded-full pointer-events-none" />

              <style>{`
                @keyframes meditation-breath {
                  0%, 100% { transform: scale(1); opacity: 0.9; }
                  50% { transform: scale(1.03); opacity: 1; }
                }
              `}</style>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
};

export default AboutSection;
