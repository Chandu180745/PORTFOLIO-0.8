import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useSectionReveal } from "@/hooks/useSectionReveal";
import AnimatedTextReveal from "./ui/AnimatedTextReveal";
import { Briefcase, GraduationCap, Calendar, Download, ArrowRight, Compass, Mail, MessageCircle, Settings, CalendarDays, FileText, Terminal } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const ResumeSection = () => {
  const sectionRef = useSectionReveal();
  const monitorRef = useRef<HTMLDivElement>(null);
  const screenRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!monitorRef.current || !screenRef.current) return;

    gsap.fromTo(monitorRef.current,
      { y: 80, opacity: 0, scale: 0.85 },
      {
        y: 0, opacity: 1, scale: 1, duration: 1.2, ease: "power3.out",
        scrollTrigger: { trigger: monitorRef.current, start: "top 88%", end: "top 30%", toggleActions: "play reverse play reverse" },
      }
    );

    gsap.to(screenRef.current, {
      boxShadow: "0 0 60px hsla(217, 91%, 60%, 0.15), 0 0 120px hsla(217, 91%, 60%, 0.08), inset 0 0 30px hsla(217, 91%, 60%, 0.05)",
      duration: 1.5, delay: 0.7, ease: "power2.out",
      scrollTrigger: { trigger: screenRef.current, start: "top 88%", end: "top 30%", toggleActions: "play reverse play reverse" },
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === monitorRef.current || t.trigger === screenRef.current) t.kill();
      });
    };
  }, []);

  return (
    <section ref={sectionRef} id="resume" className="relative min-h-screen flex flex-col items-center px-4 md:px-20 lg:px-[120px] pt-16 pb-16 md:pb-24 overflow-hidden">
      <div className="section-content relative flex flex-col items-center justify-center w-full min-h-screen">

        <div ref={monitorRef} className="max-w-4xl mx-auto w-full" style={{ perspective: "1200px", opacity: 0 }}>
          {/* Monitor Assembly */}
          <div className="relative" style={{ transformStyle: "preserve-3d" }}>

            {/* Realistic Aluminum Outer Shell */}
            <div className="relative rounded-[24px] shadow-2xl p-[2px] ring-1 ring-white/20"
              style={{
                background: "linear-gradient(180deg, #d1d5db, #6b7280)",
                boxShadow: "0 40px 100px rgba(0,0,0,0.8), 0 10px 40px rgba(0,0,0,0.5)",
              }}
            >
              {/* Black Glass Bezel */}
              <div className="relative rounded-[22px] overflow-hidden"
                style={{
                  background: "#050505",
                  padding: "8px", 
                  boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.08)",
                }}
              >

                {/* Screen internal active area */}
                <div ref={screenRef} className="relative rounded-md overflow-hidden aspect-[16/10] bg-[#0c1220] transition-all duration-1000 ring-1 ring-white/10"
                  style={{ boxShadow: "inset 0 0 20px hsla(0, 0%, 0%, 0.4)" }}
                >
                {/* Desktop Wallpaper */}
                <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#0f172a] via-[#020617] to-[#000000] opacity-90" />

                {/* Glass reflection */}
                <div className="absolute inset-0 pointer-events-none z-50 mix-blend-screen"
                  style={{ background: "linear-gradient(135deg, hsla(0, 0%, 100%, 0.08) 0%, transparent 40%, transparent 60%, hsla(0, 0%, 100%, 0.03) 100%)" }}
                />

                {/* Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 flex items-center justify-center z-[60]">
                  <div className="bg-black w-[100px] sm:w-[140px] h-[16px] sm:h-[22px] rounded-b-[10px] sm:rounded-b-[14px] flex items-center justify-center relative shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
                    <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#111] border border-white/5 shadow-inner flex items-center justify-center mr-2">
                       <div className="w-0.5 h-0.5 sm:w-1 sm:h-1 rounded-full bg-[#1a4b8c] shadow-[inset_0_0_2px_rgba(255,255,255,0.3)]" />
                    </div>
                    <div className="w-0.5 h-0.5 sm:w-1 sm:h-1 rounded-full bg-[#124d26] opacity-30" />
                  </div>
                </div>

                {/* macOS menu bar */}
                <div className="absolute top-0 left-0 right-0 z-40 flex items-center justify-between px-3 h-[18px] sm:h-[24px] bg-black/40 backdrop-blur-md text-[8px] sm:text-[10px] font-medium text-white/90 shadow-sm border-b border-white/10">
                  <div className="flex items-center gap-3 sm:gap-4">
                    <span className="font-sans"></span>
                    <span className="font-bold">Safari</span>
                    <span className="hidden sm:inline">File</span>
                    <span className="hidden sm:inline">Edit</span>
                    <span className="hidden sm:inline">View</span>
                    <span className="hidden sm:inline">History</span>
                    <span className="hidden sm:inline">Bookmarks</span>
                    <span className="hidden sm:inline">Window</span>
                    <span className="hidden sm:inline">Help</span>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-3 opacity-90">
                    <div className="flex gap-1">
                      <div className="w-2.5 h-2.5 rounded-full border border-white/60 flex items-center justify-center">
                        <div className="w-1 h-1 bg-white/80 rounded-full pb-[1px]" />
                      </div>
                      <div className="w-2.5 h-2.5 rounded bg-white/20 border border-white/40" />
                    </div>
                    <span>Mon 9:41 AM</span>
                  </div>
                </div>

                {/* Safari Browser Window */}
                <div className="absolute top-8 sm:top-10 left-1/2 -translate-x-1/2 w-[92%] sm:w-[85%] z-20 rounded-lg shadow-2xl overflow-hidden border border-white/10 flex flex-col"
                  style={{ background: "hsl(var(--card))", maxHeight: "calc(100% - 80px)" }}>
                  
                  {/* Safari Toolbar */}
                  <div className="bg-[#e5e5e5] dark:bg-[#2d2d2d] flex items-center px-3 py-1.5 sm:py-2 border-b border-gray-300 dark:border-white/10 shrink-0">
                    <div className="flex gap-1.5 w-12 sm:w-16">
                      <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#ff5f56] shadow-[inset_0_1px_1px_rgba(0,0,0,0.1)]" />
                      <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#ffbd2e] shadow-[inset_0_1px_1px_rgba(0,0,0,0.1)]" />
                      <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#27c93f] shadow-[inset_0_1px_1px_rgba(0,0,0,0.1)]" />
                    </div>
                    <div className="flex-1 flex justify-center">
                      <div className="w-[60%] h-5 sm:h-6 bg-white dark:bg-black/30 rounded flex items-center justify-center border border-gray-200 dark:border-white/5 shadow-inner">
                        <span className="text-[8px] sm:text-[10px] text-gray-500 dark:text-white/40 font-sans tracking-wide">
                          Search or enter website name
                        </span>
                      </div>
                    </div>
                    <div className="w-12 sm:w-16" />
                  </div>

                  {/* Safari Content */}
                  <div className="flex-1 bg-[#1a1c23] dark:bg-[#11131a] flex flex-col items-center justify-center p-6 sm:p-10 text-center relative overflow-y-auto">
                    <div className="relative z-10 w-full">
                      <AnimatedTextReveal 
                        text="Want to know more?" 
                        className="text-xl sm:text-2xl md:text-3xl font-display font-bold text-white mb-2 sm:mb-3" 
                      />
                      <p className="text-white/60 font-body mb-6 max-w-[280px] sm:max-w-md mx-auto text-xs sm:text-sm leading-relaxed">
                        Download my resume for a detailed look at my experience, skills, and achievements.
                      </p>
                      <a href="#"
                        className="group/btn inline-flex items-center gap-2 px-6 sm:px-8 py-2.5 sm:py-3.5 rounded-full font-body font-semibold text-xs sm:text-sm
                          backdrop-blur-xl border border-primary/30
                          hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 relative overflow-hidden"
                        style={{
                          background: "hsla(217, 91%, 60%, 0.15)",
                          boxShadow: "0 0 30px hsla(217, 91%, 60%, 0.1), inset 0 1px 0 hsla(0, 0%, 100%, 0.1)",
                          color: "hsl(217, 91%, 60%)",
                        }}
                      >
                        <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300 rounded-full" />
                        <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4 relative z-10" />
                        <span className="relative z-10">Download CV</span>
                      </a>
                    </div>
                  </div>
                </div>

                {/* macOS Dock */}
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-30 px-1.5 sm:px-2 py-1.5 rounded-2xl bg-white/10 backdrop-blur-2xl border border-white/20 shadow-2xl flex items-end gap-1 sm:gap-1.5">
                  {[
                    { bg: "bg-gradient-to-b from-gray-100 to-gray-300", Icon: Compass, color: "text-blue-500" }, 
                    { bg: "bg-gradient-to-b from-blue-400 to-blue-600", Icon: Mail, color: "text-white" }, 
                    { bg: "bg-gradient-to-b from-green-400 to-green-600", Icon: MessageCircle, color: "text-white" }, 
                    { bg: "bg-gradient-to-b from-yellow-300 to-yellow-500", Icon: FileText, color: "text-gray-800" }, 
                    { bg: "bg-gradient-to-b from-white to-gray-200 border border-gray-300", Icon: CalendarDays, color: "text-red-500" }, 
                    { bg: "bg-gradient-to-b from-gray-800 to-black border border-gray-700", Icon: Terminal, color: "text-green-400" }, 
                    { bg: "bg-gradient-to-b from-gray-300 to-gray-500", Icon: Settings, color: "text-white" } 
                  ].map((app, i) => (
                    <div key={i} className={`w-7 h-7 sm:w-10 sm:h-10 rounded-lg sm:rounded-[10px] ${app.bg} hover:-translate-y-2 hover:scale-110 active:scale-95 transition-all duration-200 cursor-pointer shadow-md overflow-hidden relative flex items-center justify-center`}>
                       <app.Icon className={`w-4 h-4 sm:w-6 sm:h-6 ${app.color} drop-shadow z-10`} strokeWidth={2} />
                       <div className="absolute inset-0 bg-white/20 shadow-[inset_0_1px_1px_rgba(255,255,255,0.6)] rounded-lg sm:rounded-[10px] pointer-events-none" />
                    </div>
                  ))}
                  <div className="w-[1px] h-6 sm:h-8 bg-white/30 mx-0.5 sm:mx-1 rounded-full shadow-[0_0_2px_rgba(0,0,0,0.5)]" />
                  <div className="w-7 h-7 sm:w-10 sm:h-10 rounded-lg sm:rounded-[10px] bg-gradient-to-br from-gray-200 to-gray-400 hover:-translate-y-2 hover:scale-110 active:scale-95 transition-all duration-200 cursor-pointer shadow-md relative flex items-center justify-center border border-white/20">
                    <div className="absolute inset-2 border-2 border-black/30 rounded flex items-center justify-center bg-gray-100">
                      <div className="w-full h-1/2 bg-black/10" />
                    </div>
                    <div className="absolute inset-0 shadow-[inset_0_1px_1px_rgba(255,255,255,0.8)] rounded-lg sm:rounded-[10px] pointer-events-none" />
                  </div>
                </div>
                </div> {/* Close Screen internal active area */}
              </div> {/* Close Black Glass Bezel */}
            </div> {/* Close Aluminum Outer Shell */}
            
            {/* Desktop shadow below the floating screen */}
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-[90%] h-12 rounded-[100%] opacity-60 blur-xl z-[-1]" style={{ background: "hsla(0, 0%, 0%, 0.9)" }} />
          </div>
        </div>
      </div>

    </section>
  );
};

export default ResumeSection;
