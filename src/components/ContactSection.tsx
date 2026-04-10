import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useSectionReveal } from "@/hooks/useSectionReveal";
import AnimatedTextReveal from "./ui/AnimatedTextReveal";
import { Send, Mail, MapPin, Globe } from "lucide-react";
import ShapeBlur from "./reactbits/ShapeBlur";

gsap.registerPlugin(ScrollTrigger);

const ContactSection = () => {
  const sectionRef = useSectionReveal();
  const headerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

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

    if (formRef.current) {
      gsap.fromTo(formRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, delay: 0.2, ease: "power3.out",
          scrollTrigger: { trigger: formRef.current, start: "top 92%", end: "top 40%", toggleActions: "play reverse play reverse" },
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        const el = t.trigger as HTMLElement;
        if (el === headerRef.current || el === formRef.current) t.kill();
      });
    };
  }, []);

  const handleSend = () => {
    const subject = encodeURIComponent(`Message from ${name || "Portfolio Visitor"}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
    window.location.href = `mailto:yeschandu08@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <section ref={sectionRef} id="contact" className="relative flex flex-col items-center px-4 md:px-20 lg:px-[120px] pt-32 pb-16 md:pb-24 overflow-hidden">
      {/* ShapeBlur background effect */}
      <div className="absolute inset-0 z-[0] pointer-events-none opacity-30">
        <ShapeBlur
          variation={0}
          pixelRatioProp={window.devicePixelRatio || 1}
          shapeSize={1.8}
          roundness={0.5}
          borderSize={0.05}
          circleSize={0.1}
          circleEdge={1}
        />
      </div>

      {/* Section Heading - Top (Centered) */}
      <div ref={headerRef} className="text-center mb-10 w-full relative z-10 flex justify-center" style={{ opacity: 0 }}>
        <div className="flex flex-col items-center">
          <AnimatedTextReveal 
            text="Get in Touch" 
            className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-foreground tracking-tight justify-center" 
          />
          <p className="mt-4 text-sm font-body text-muted-foreground/80 max-w-sm mx-auto">
            Design. Develop. Deploy. Together.
          </p>
        </div>
      </div>

      <div className="section-content relative z-10 w-full max-w-lg mx-auto flex flex-col items-center">

        <div className="w-full neon-box p-6 md:p-8 flex flex-col items-center">
          <form
            ref={formRef}
            className="w-full space-y-4"
            style={{ opacity: 0 }}
            onSubmit={(e) => { e.preventDefault(); handleSend(); }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl text-sm font-body text-foreground placeholder:text-muted-foreground/50
                  bg-white/5 backdrop-blur-xl border border-white/10
                  focus:border-white/40 focus:outline-none focus:ring-1 focus:ring-white/20
                  transition-all duration-300"
              />
              <input
                type="email"
                placeholder="Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl text-sm font-body text-foreground placeholder:text-muted-foreground/50
                  bg-white/5 backdrop-blur-xl border border-white/10
                  focus:border-white/40 focus:outline-none focus:ring-1 focus:ring-white/20
                  transition-all duration-300"
              />
            </div>

            <textarea
              placeholder="Write your message here..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={5}
              className="w-full px-4 py-3 rounded-xl text-sm font-body text-foreground placeholder:text-muted-foreground/50 resize-none
                bg-white/5 backdrop-blur-xl border border-white/10
                focus:border-white/40 focus:outline-none focus:ring-1 focus:ring-white/20
                transition-all duration-300"
            />

            <div className="flex justify-center pt-4">
              <button
                type="submit"
                className="px-10 py-3 rounded-full font-body font-medium text-sm text-white/90 flex items-center justify-center gap-2
                  border border-white/25 bg-white/5 backdrop-blur-xl
                  shadow-[0_0_15px_rgba(255,255,255,0.06),inset_0_1px_1px_rgba(255,255,255,0.1)]
                  hover:border-white hover:bg-white hover:text-black hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]
                  transition-all duration-500 hover:scale-105 active:scale-95"
              >
                <Send className="w-4 h-4" />
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Footer copyright */}
      <div className="absolute bottom-6 left-0 right-0 text-center z-10">
        <span className="font-display text-xs text-muted-foreground/50">
          © 2026 Chandradeep<span className="text-primary">.</span>
        </span>
      </div>
    </section>
  );
};

export default ContactSection;
