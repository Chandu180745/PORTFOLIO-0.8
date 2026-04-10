import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useSectionReveal } from "@/hooks/useSectionReveal";
import AnimatedTextReveal from "./ui/AnimatedTextReveal";
import LogoLoop from "./reactbits/LogoLoop";
import {
  SiPython,
  SiReact,
  SiTensorflow,
  SiFigma,
  SiTypescript,
  SiPostgresql,
  SiNextdotjs,
  SiDocker,
  SiFirebase,
  SiGit,
  SiHtml5,
  SiCss,
} from "react-icons/si";
import { FaJava } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

const techLogos = [
  { node: <SiPython color="#3776AB" />, title: "Python" },
  { node: <SiReact color="#61DAFB" />, title: "React" },
  { node: <SiTensorflow color="#FF6F00" />, title: "TensorFlow" },
  { node: <SiFigma color="#F24E1E" />, title: "Figma" },
  { node: <SiTypescript color="#3178C6" />, title: "TypeScript" },
  { node: <SiPostgresql color="#4169E1" />, title: "PostgreSQL" },
  { node: <SiNextdotjs color="#ffffff" />, title: "Next.js" },
  { node: <SiDocker color="#2496ED" />, title: "Docker" },
  { node: <SiFirebase color="#FFCA28" />, title: "Firebase" },
  { node: <SiGit color="#F05032" />, title: "Git" },
  { node: <FaJava color="#5382a1" />, title: "Java" },
  { node: <SiHtml5 color="#E34F26" />, title: "HTML5" },
  { node: <SiCss color="#1572B6" />, title: "CSS3" },
  { src: "https://upload.wikimedia.org/wikipedia/commons/c/cf/New_Power_BI_Logo.svg", title: "Power BI" },
];

const SkillsSection = () => {
  const sectionRef = useSectionReveal();
  const headingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!headingRef.current) return;
    gsap.fromTo(headingRef.current,
      { y: 40, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: headingRef.current, start: "top 90%", end: "top 40%", toggleActions: "play reverse play reverse" },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === headingRef.current) t.kill();
      });
    };
  }, []);

  return (
    <section ref={sectionRef} id="skills" className="relative flex flex-col items-center justify-center px-4 md:px-20 lg:px-[120px] pt-32 pb-24 overflow-hidden min-h-screen">
      
      {/* Top Heading (Middle/Starting) */}
      <div className="text-center mb-16 w-full z-20 flex justify-center" ref={headingRef} style={{ opacity: 0 }}>
        <div className="flex flex-col items-center">
          <AnimatedTextReveal 
            text="Skills & Tools" 
            className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-foreground tracking-tight justify-center" 
          />
          <p className="mt-4 text-sm font-body text-muted-foreground max-w-md mx-auto text-center">
            Architecting solutions with modern technologies.
          </p>
        </div>
      </div>

      <div className="w-full relative py-12 flex flex-col items-center z-10">
        <LogoLoop
          logos={techLogos}
          speed={45}
          direction="left"
          logoHeight={200}
          gap={100}
          hoverSpeed={0}
          scaleOnHover={true}
          fadeOut={true}
          ariaLabel="Tech Stack"
        />
      </div>
    </section>
  );
};

export default SkillsSection;
