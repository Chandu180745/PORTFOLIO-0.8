import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitText from "./reactbits/SplitText";
import ShinyText from "./ShinyText";
import { ArrowDown, Rocket, Sparkles, Code2, Globe, Cpu } from "lucide-react";
import MagneticElement from "./ui/MagneticElement";
import CometEffect from "./CometEffect";

gsap.registerPlugin(ScrollTrigger);

const VIDEO_URL =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260217_030345_246c0224-10a4-422c-b324-070b7c0eceda.mp4";

const HeroSection = () => {
  const nameRef = useRef<HTMLDivElement>(null);
  const subRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {

    const tl = gsap.timeline({ delay: 1 });
    tl.fromTo(nameRef.current, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 1.25, ease: "power3.out" })
      .fromTo(subRef.current, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, ease: "power3.out" }, "-=0.2")
      .fromTo(ctaRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" }, "-=0.4");
  }, []);

  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden" style={{ perspective: "1200px" }}>
      {/* --- Seamless fading background wrapper to prevent sharp dividing lines --- */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          WebkitMaskImage: "linear-gradient(to bottom, black 50%, transparent 100%)",
          maskImage: "linear-gradient(to bottom, black 50%, transparent 100%)"
        }}
      >
        <div
          className="absolute inset-0 w-full h-full object-cover"
          style={{ transform: "scale(1.08) translateZ(-20px)", transformOrigin: "center center" }}
          dangerouslySetInnerHTML={{
            __html: `<video autoplay loop muted playsinline style="width:100%;height:100%;object-fit:cover;" src="${VIDEO_URL}"></video>`
          }}
        />
        <div className="absolute inset-0 bg-black/20" />

        {/* Realistic Glowing Nebula Effect - Geographically at the top of the page */}
        <div
          className="absolute top-[-10%] left-0 right-0 h-[60vh] animate-hero-glow pointer-events-none"
          style={{
            mixBlendMode: "screen",
            filter: "blur(80px)",
            opacity: 1,
            background: `
              radial-gradient(ellipse 60% 80% at 50% 0%, rgba(60, 110, 255, 0.7) 0%, transparent 70%),
              radial-gradient(ellipse 50% 80% at 30% 0%, rgba(150, 60, 255, 0.6) 0%, transparent 60%),
              radial-gradient(ellipse 70% 80% at 70% 0%, rgba(40, 200, 255, 0.5) 0%, transparent 70%),
              radial-gradient(circle at 50% 0%, rgba(120, 80, 255, 0.5) 0%, transparent 40%)
            `,
          }}
        />
        <div
          className="absolute animate-hero-lens"
          style={{
            top: "0%", left: "50%", transform: "translate(-50%, -20%)", width: "800px", height: "400px",
            background: "radial-gradient(circle at 50% 0%, rgba(120,160,255,0.15) 0%, rgba(120,160,255,0.05) 40%, transparent 70%)", borderRadius: "50%",
          }}
        />
        <div
          className="absolute inset-0"
          style={{ background: "radial-gradient(ellipse at 50% 60%, transparent 35%, rgba(0,0,0,0.65) 100%)" }}
        />
      </div>

      {/* Animated Comets */}
      <CometEffect />

      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto mt-24">
        {/* Name with ShinyText animation */}
        <div ref={nameRef} className="flex flex-wrap justify-center items-center gap-x-3 sm:gap-x-5 mb-2 w-full opacity-0">
          <span className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-display font-medium leading-[0.9] tracking-tight text-[#b5b5b5]">
            Chandradeep
          </span>
          <ShinyText
            text="Reddy"
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-display font-medium leading-[0.9] tracking-tight"
            speed={3}
            delay={0}
            color="hsl(var(--primary))"
            shineColor="#ffffff"
            spread={100}
            direction="left"
            yoyo={true}
            animationTimingFunction="ease-in-out"
            pauseOnHover={true}
            disabled={false}
          />
        </div>

        <div ref={subRef} className="opacity-0">
          <p className="mt-6 text-sm sm:text-base font-body text-primary/80 tracking-[0.2em] uppercase font-semibold">
            An Aspiring Engineer
          </p>
          <p className="mt-3 text-base sm:text-lg md:text-xl font-body text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            AI Explorer · Web Design · Data Science
            <br className="hidden sm:block" />
            <span className="text-foreground/70 font-medium">Turn Curiosity into Code.</span>
          </p>
        </div>

        <div ref={ctaRef} className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 opacity-0">
          <MagneticElement range={40} strength={0.4}>
            <button
              onClick={() => scrollTo("#projects")}
              className="px-8 py-3.5 rounded-full font-body font-medium text-sm text-white/90
                border border-white/25 bg-white/5 backdrop-blur-xl
                shadow-[0_0_15px_rgba(255,255,255,0.06),inset_0_1px_1px_rgba(255,255,255,0.1)]
                hover:bg-primary hover:border-primary hover:text-white hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]
                transition-all duration-300 hover:scale-105 active:scale-95"
            >
              View Projects
            </button>
          </MagneticElement>
          <MagneticElement range={40} strength={0.4}>
            <button
              onClick={() => scrollTo("#contact")}
              className="px-8 py-3.5 rounded-full font-body font-medium text-sm text-white/90
                border border-white/25 bg-white/5 backdrop-blur-xl
                shadow-[0_0_15px_rgba(255,255,255,0.06),inset_0_1px_1px_rgba(255,255,255,0.1)]
                hover:bg-primary hover:border-primary hover:text-white hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]
                transition-all duration-300 hover:scale-105 active:scale-95"
            >
              Get in Touch
            </button>
          </MagneticElement>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
