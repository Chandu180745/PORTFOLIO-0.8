import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedTextReveal from "./ui/AnimatedTextReveal";
import { useSectionReveal } from "@/hooks/useSectionReveal";
import { ShieldCheck, Award, FileBadge, ExternalLink } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

import BorderGlow from "./reactbits/BorderGlow";

const certifications = [
  { title: "TensorFlow Developer Certificate", org: "Google", year: "2024" },
  { title: "AWS Certified Machine Learning", org: "Amazon", year: "2024" },
  { title: "Google UX Design Professional", org: "Google", year: "2023" },
  { title: "Deep Learning Specialization", org: "Coursera / Andrew Ng", year: "2023" },
];

const CertCard = ({ cert }: { cert: any }) => (
  <div className="cert-card w-full" style={{ opacity: 0 }}>
    <BorderGlow
      edgeSensitivity={30}
      glowColor="40 80 80"
      backgroundColor="#060010"
      borderRadius={28}
      glowRadius={40}
      glowIntensity={1}
      coneSpread={25}
      animated={false}
      colors={['#c084fc', '#f472b6', '#38bdf8']}
    >
      <div className="p-5 group transition-all duration-300 flex items-start gap-3 min-h-[100px]">
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
          <Award className="w-5 h-5 text-primary" />
        </div>
        <div className="flex-1">
          <h3 className="font-display text-sm font-semibold text-foreground leading-tight">{cert.title}</h3>
          <p className="text-xs font-body text-muted-foreground mt-1.5">{cert.org} · {cert.year}</p>
        </div>
        <div className="self-start mt-1">
          <ExternalLink className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer" />
        </div>
      </div>
    </BorderGlow>
  </div>
);

const CertificationsSection = () => {
  const sectionRef = useSectionReveal();
  const headerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (headerRef.current) {
      gsap.fromTo(headerRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: headerRef.current, start: "top 90%", end: "top 40%", toggleActions: "play reverse play reverse" },
        }
      );
    }

    if (containerRef.current) {
      const cards = containerRef.current.querySelectorAll(".cert-card");
      cards.forEach((card, i) => {
        gsap.fromTo(card,
          { y: 40, opacity: 0, scale: 0.95 },
          {
            y: 0, opacity: 1, scale: 1,
            duration: 0.6, delay: i * 0.08, ease: "power3.out",
            scrollTrigger: { trigger: card, start: "top 92%", end: "top 40%", toggleActions: "play reverse play reverse" },
          }
        );
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (containerRef.current?.contains(t.trigger as Node) || t.trigger === headerRef.current) t.kill();
      });
    };
  }, []);

  return (
    <section ref={sectionRef} id="certifications" className="relative min-h-screen flex flex-col items-center px-4 md:px-20 lg:px-[120px] pt-32 pb-16 md:pb-24 overflow-hidden">
      {/* Section Heading - Top (Centered) */}
      <div ref={headerRef} className="text-center mb-12 sm:mb-16 w-full flex justify-center" style={{ opacity: 0 }}>
        <div className="flex flex-col items-center">
          <AnimatedTextReveal 
            text="Certifications" 
            className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-foreground tracking-tight justify-center" 
          />
          <div className="mt-4 flex items-center justify-center gap-2 text-primary opacity-60">
            <ShieldCheck className="w-4 h-4" />
            <span className="text-xs font-body tracking-widest uppercase">Verified Credentials</span>
          </div>
        </div>
      </div>

      <div className="section-content relative flex flex-col items-center justify-center w-full max-w-4xl mx-auto">

        {/* Certifications Grid */}
        <div ref={containerRef} className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
          {certifications.map((cert, i) => (
            <CertCard key={i} cert={cert} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CertificationsSection;
