import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useSectionReveal } from "@/hooks/useSectionReveal";
import { Github, ExternalLink } from "lucide-react";
import AnimatedTextReveal from "./ui/AnimatedTextReveal";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "Neural Canvas",
    description: "AI-powered art generation platform using diffusion models with real-time preview and style transfer.",
    tech: ["Python", "PyTorch", "React", "FastAPI"],
    color: "from-blue-500/20 to-purple-500/20",
    border: "border-blue-500/30"
  },
  {
    title: "DataFlow Studio",
    description: "Interactive drag-and-drop ETL pipeline builder with real-time data preview and schema validation.",
    tech: ["TypeScript", "D3.js", "Node.js", "PostgreSQL"],
    color: "from-emerald-500/20 to-teal-500/20",
    border: "border-emerald-500/30"
  },
  {
    title: "Sentiment Pulse",
    description: "Real-time social media sentiment analysis dashboard with ML-powered trend detection.",
    tech: ["Python", "TensorFlow", "React", "WebSocket"],
    color: "from-orange-500/20 to-red-500/20",
    border: "border-orange-500/30"
  },
  {
    title: "DesignAI Assistant",
    description: "AI copilot for UI designers with intelligent layout suggestions and component recommendations.",
    tech: ["OpenAI API", "Figma Plugin", "TypeScript"],
    color: "from-violet-500/20 to-pink-500/20",
    border: "border-violet-500/30"
  },
  {
    title: "EcoTrack",
    description: "ML-powered carbon footprint tracker with personalized AI-driven sustainability recommendations.",
    tech: ["React Native", "Python", "scikit-learn", "Firebase"],
    color: "from-green-500/20 to-lime-500/20",
    border: "border-green-500/30"
  },
  {
    title: "Visionary AI Dashboard",
    description: "Multi-modal AI analytical platform with integrated real-time data streaming and predictive modeling.",
    tech: ["AWS", "Next.js", "GraphQL", "Python"],
    color: "from-amber-500/20 to-orange-500/20",
    border: "border-amber-500/30"
  },
];

const ProjectCard = ({ project, index }: { project: any; index: number }) => (
  <div
    style={{ opacity: 0 }}
    className={`project-card bg-gradient-to-br ${project.color} backdrop-blur-xl border ${project.border}
      rounded-2xl p-4 sm:p-5 hover:scale-[1.02] hover:shadow-lg transition-all duration-300 cursor-pointer w-full group`}
  >
    <div className="flex items-center gap-2 mb-2">
      <span className="text-[10px] font-body tracking-wider uppercase px-2.5 py-0.5 rounded-full bg-primary/10 text-primary font-semibold">
        {project.tech[0]}
      </span>
      <div className="ml-auto flex gap-1.5 opacity-60 group-hover:opacity-100 transition-opacity">
        <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center cursor-pointer hover:bg-white/20 transition-colors">
          <Github className="w-3.5 h-3.5 text-foreground" />
        </div>
        <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center cursor-pointer hover:bg-white/20 transition-colors">
          <ExternalLink className="w-3.5 h-3.5 text-foreground" />
        </div>
      </div>
    </div>
    <h3 className="text-base sm:text-lg font-display font-bold text-foreground mb-1.5">{project.title}</h3>
    <p className="text-xs font-body text-muted-foreground leading-relaxed line-clamp-2">{project.description}</p>
    <div className="flex flex-wrap gap-1.5 mt-3">
      {project.tech.map((t: string) => (
        <span key={t} className="text-[10px] font-body px-2 py-0.5 rounded-full bg-white/10 text-foreground/80 border border-white/10">
          {t}
        </span>
      ))}
    </div>
  </div>
);

const ProjectsSection = () => {
  const sectionRef = useSectionReveal();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const cards = containerRef.current.querySelectorAll(".project-card");

    cards.forEach((card, i) => {
      gsap.fromTo(card,
        { y: 60, opacity: 0, scale: 0.9 },
        {
          y: 0, opacity: 1, scale: 1,
          duration: 0.7, delay: i * 0.06, ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 92%",
            end: "top 40%",
            toggleActions: "play reverse play reverse",
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (containerRef.current?.contains(t.trigger as Node)) t.kill();
      });
    };
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="relative flex flex-col items-center justify-center px-4 md:px-20 lg:px-[120px] pt-32 pb-16 md:pb-24 overflow-hidden min-h-screen">
      {/* Section Heading - Top (Centered) */}
      <div className="text-center mb-12 sm:mb-16 w-full z-10 flex justify-center">
        <div className="flex flex-col items-center">
          <AnimatedTextReveal 
            text="Featured Projects" 
            className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-foreground tracking-tight justify-center" 
          />
          <p className="mt-4 text-sm font-body text-muted-foreground/60 max-w-md mx-auto">
            A selection of my most impactful works in AI, Design, and Data.
          </p>
        </div>
      </div>

      <div ref={containerRef} className="section-content w-full max-w-6xl mx-auto flex flex-col items-center">

        {/* Project Grid */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-center">
          {projects.map((project, i) => (
            <ProjectCard key={i} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
