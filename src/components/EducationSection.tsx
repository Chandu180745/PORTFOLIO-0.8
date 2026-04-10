import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useSectionReveal } from "@/hooks/useSectionReveal";
import AnimatedTextReveal from "./ui/AnimatedTextReveal";
import ParallaxLayer from "./ParallaxLayer";
import { GraduationCap } from "lucide-react";

const education = [
  {
    degree: "M.Sc. Artificial Intelligence",
    institution: "Stanford University",
    year: "2022 – 2024",
    description: "Focused on deep learning, computer vision, and human-computer interaction.",
  },
  {
    degree: "B.Sc. Computer Science & Design",
    institution: "MIT",
    year: "2018 – 2022",
    description: "Double major combining computational thinking with design methodology.",
  },
];

const EducationItem = ({ item, index }: { item: any; index: number }) => {
  const ref = useScrollAnimation(index % 2 === 0 ? "slideLeft" : "fadeUp", 0.1);
  return (
    <div
      ref={ref}
      className={`opacity-0 relative flex items-start gap-6 mb-12 ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
    >
      <div className="absolute left-6 md:left-1/2 w-3 h-3 rounded-full bg-primary border-2 border-background -translate-x-1.5 mt-2 z-10" />
      <div className={`ml-14 md:ml-0 md:w-[45%] ${index % 2 === 0 ? "md:pr-12" : "md:pl-12"}`}>
        <div className="glass-card p-6 hover:border-primary/30 transition-colors duration-300">
          <div className="flex items-center gap-3 mb-3">
            <GraduationCap className="w-5 h-5 text-primary" />
            <span className="text-xs font-body text-muted-foreground">{item.year}</span>
          </div>
          <h3 className="font-display text-base font-semibold text-foreground">{item.degree}</h3>
          <p className="text-sm font-body text-primary mt-1">{item.institution}</p>
          <p className="text-sm font-body text-muted-foreground mt-2 leading-relaxed">{item.description}</p>
        </div>
      </div>
    </div>
  );
};

const EducationSection = () => {
  const sectionRef = useSectionReveal();
  const titleRef = useScrollAnimation("fadeUp");

  return (
    <section ref={sectionRef} id="education" className="relative flex flex-col items-center pt-32 pb-16 md:pb-24 px-4 md:px-20 lg:px-[120px] overflow-hidden min-h-screen">
      <ParallaxLayer speed={-0.2} className="top-[20%] right-[5%] w-52 h-52 bg-primary/5 rounded-full blur-[80px]" />
      <ParallaxLayer speed={0.25} className="bottom-[10%] left-[10%] w-36 h-36 bg-primary/8 rounded-full blur-[60px]" />

      {/* Section Heading - Top (Centered) */}
      <div ref={titleRef} className="opacity-0 text-center mb-16 w-full z-10 flex justify-center">
        <AnimatedTextReveal 
          text="Education" 
          className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-foreground tracking-tight justify-center" 
        />
      </div>

      <div className="section-content relative flex flex-col items-center justify-center w-full">

        {/* Timeline */}
        <div className="relative max-w-4xl mx-auto w-full">
          {/* Vertical Timeline Line */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-border md:left-1/2 md:-translate-x-px z-0" />

          {education.map((item, i) => (
            <EducationItem key={i} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
