import { useState, useCallback, useRef, useEffect } from "react";
import { useTheme } from "@/hooks/useTheme";
import Preloader from "@/components/Preloader";
import PillNav from "@/components/reactbits/PillNav";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ProjectsSection from "@/components/ProjectsSection";
import SkillsSection from "@/components/SkillsSection";
import CertificationsSection from "@/components/CertificationsSection";
import ResumeSection from "@/components/ResumeSection";
import ContactSection from "@/components/ContactSection";
import SpaceBackground from "@/components/SpaceBackground";
import SocialSidebar from "@/components/SocialSidebar";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { User, Folder, LayoutGrid, Mail, Home, Sun, Moon } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const SECTION_IDS = ["#hero", "#about", "#projects", "#skills", "#certifications", "#resume", "#contact"];

const Index = () => {
  const { isDark, toggle } = useTheme();
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState("#hero");
  const lenisRef = useRef<Lenis | null>(null);

  const navItems = [
    { label: "Home",     href: "#hero",     icon: <Home      className="w-[20px] h-[20px]" /> },
    { label: "About",    href: "#about",    icon: <User      className="w-[20px] h-[20px]" /> },
    { label: "Projects", href: "#projects", icon: <Folder    className="w-[20px] h-[20px]" /> },
    { label: "More",     href: "#skills",   icon: <LayoutGrid className="w-[20px] h-[20px]" /> },
    { label: "Contact",  href: "#contact",  icon: <Mail      className="w-[20px] h-[20px]" /> },
  ];

  const handlePreloaderComplete = useCallback(() => setLoading(false), []);

  // Initialize Lenis smooth scrolling
  useEffect(() => {
    if (loading) return;

    const lenis = new Lenis({
      duration: 1.8,
      easing: (t: number) => {
        // Custom easing: smooth cubic bezier-like for premium feel
        return t < 0.5
          ? 4 * t * t * t
          : 1 - Math.pow(-2 * t + 2, 3) / 2;
      },
      smoothWheel: true,
      lerp: 0.06,
      wheelMultiplier: 0.8,
      touchMultiplier: 1.5,
    });
    lenisRef.current = lenis;

    // Connect Lenis to GSAP ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    // --- Enhanced scroll-triggered section animations ---
    // Hero parallax: content drifts up and fades out as user scrolls past
    const heroContent = document.querySelector("#hero .relative.z-10");
    if (heroContent) {
      gsap.to(heroContent, {
        y: -120,
        opacity: 0,
        scale: 0.95,
        ease: "none",
        scrollTrigger: {
          trigger: "#hero",
          start: "top top",
          end: "bottom top",
          scrub: 0.5,
        },
      });
    }

    // Section heading reveals with stagger
    const sectionHeadings = document.querySelectorAll("section:not(#hero) [class*='text-center']");
    sectionHeadings.forEach((heading) => {
      gsap.fromTo(heading,
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: heading,
            start: "top 90%",
            toggleActions: "play reverse play reverse",
          },
        }
      );
    });

    return () => {
      gsap.ticker.remove(lenis.raf);
      lenis.destroy();
      lenisRef.current = null;
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [loading]);

  // IntersectionObserver to track the active section
  useEffect(() => {
    if (loading) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection("#" + entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );

    SECTION_IDS.forEach((id) => {
      const el = document.querySelector(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [loading]);

  // Navigate — smooth scroll to section
  const handleNavigate = useCallback((href: string) => {
    const target = document.querySelector(href);
    if (!target) return;

    if (lenisRef.current) {
      lenisRef.current.scrollTo(target as HTMLElement, { offset: 0, duration: 1.4 });
    } else {
      target.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return (
    <>
      {loading && <Preloader onComplete={handlePreloaderComplete} />}
      <div className={`transition-opacity duration-700 ${loading ? "opacity-0" : "opacity-100"}`}>
        <SpaceBackground />
        <div id="page-transition-overlay" className="fixed inset-0 z-40 bg-primary pointer-events-none opacity-0" />



        <PillNav
          logoText="CR"
          items={navItems}
          activeHref={activeSection}
          ease="power2.easeOut"
          baseColor={isDark ? "#ffffff" : "#000000"}
          pillColor={isDark ? "#000000" : "#ffffff"}
          hoveredPillTextColor={isDark ? "#000000" : "#ffffff"}
          pillTextColor={isDark ? "#ffffff" : "#000000"}
          initialLoadAnimation={false}
          onNavigate={handleNavigate}
        />

        <SocialSidebar />

        <main className="relative z-10">
          <HeroSection />
          <AboutSection />
          <ProjectsSection />
          <SkillsSection />
          <CertificationsSection />
          <ResumeSection />
          <ContactSection />
        </main>
      </div>
    </>
  );
};

export default Index;
