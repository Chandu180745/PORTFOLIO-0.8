import { useState, useEffect } from "react";
import { Moon, Sun, User, FolderOpen, Zap, Award, FileText, Mail, Menu, X } from "lucide-react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin);

const navItems = [
  { label: "About", href: "#about", icon: User },
  { label: "Projects", href: "#projects", icon: FolderOpen },
  { label: "Skills", href: "#skills", icon: Zap },
  { label: "Certs", href: "#certifications", icon: Award },
  { label: "Resume", href: "#resume", icon: FileText },
  { label: "Contact", href: "#contact", icon: Mail },
];

interface NavbarProps {
  isDark: boolean;
  onToggleTheme: () => void;
}

const Navbar = ({ isDark, onToggleTheme }: NavbarProps) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const scroller = document.getElementById("main-scroll");
    if (!scroller) return;
    const handler = () => setScrolled(scroller.scrollTop > 50);
    scroller.addEventListener("scroll", handler, { passive: true });
    return () => scroller.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    const scroller = document.getElementById("main-scroll");
    if (!scroller) return;
    const sections = navItems.map((item) => document.querySelector(item.href)).filter(Boolean) as Element[];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection("#" + entry.target.id);
        });
      },
      { root: scroller, rootMargin: "-40% 0px -55% 0px" }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const handleClick = (href: string) => {
    setMobileOpen(false);
    const target = document.querySelector(href);
    const scroller = document.getElementById("main-scroll");
    if (!target || !scroller) return;

    const overlay = document.getElementById("page-transition-overlay");
    if (overlay) {
      gsap.timeline()
        .to(overlay, { opacity: 0.15, duration: 0.25, ease: "power2.in" })
        .to(overlay, { opacity: 0, duration: 0.5, ease: "power2.out", delay: 0.1 });
    }

    const y = target.getBoundingClientRect().top + scroller.scrollTop;
    gsap.to(scroller, { scrollTo: { y, autoKill: false }, duration: 1.4, ease: "power3.inOut" });
  };

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50">
      <div
        className={`transition-all duration-500 rounded-full px-2 flex items-center gap-1 h-11 ${
          scrolled
            ? "bg-background/40 backdrop-blur-2xl border border-border/30 shadow-lg shadow-background/10"
            : "bg-background/20 backdrop-blur-xl border border-border/10"
        }`}
      >
        {/* Desktop icon nav */}
        <div className="hidden md:flex items-center gap-0.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.label}
                onClick={() => handleClick(item.href)}
                title={item.label}
                className={`relative p-2.5 rounded-full transition-all duration-300 group ${
                  activeSection === item.href
                    ? "bg-white text-black shadow-md shadow-white/10 dark:bg-white dark:text-black"
                    : "bg-black text-white hover:bg-white hover:text-black dark:bg-black dark:text-white dark:hover:bg-white dark:hover:text-black"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {/* Tooltip */}
                <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[10px] font-body bg-card/90 backdrop-blur-sm border border-border/30 px-2 py-0.5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap text-foreground">
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Separator */}
        <div className="hidden md:block w-px h-5 bg-border/30 mx-1" />

        {/* Theme toggle */}
        <button
          onClick={onToggleTheme}
          className="p-2.5 rounded-full hover:bg-secondary/40 transition-colors duration-300"
          aria-label="Toggle theme"
        >
          {isDark ? <Sun className="w-3.5 h-3.5 text-foreground" /> : <Moon className="w-3.5 h-3.5 text-foreground" />}
        </button>

        {/* Mobile menu button */}
        <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden p-2.5" aria-label="Menu">
          {mobileOpen ? <X className="w-4 h-4 text-foreground" /> : <Menu className="w-4 h-4 text-foreground" />}
        </button>
      </div>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div className="md:hidden mt-2 rounded-2xl bg-background/50 backdrop-blur-2xl border border-border/30 shadow-xl overflow-hidden animate-fade-in">
          <div className="flex flex-col p-2 gap-0.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.label}
                  onClick={() => handleClick(item.href)}
                  className={`flex items-center gap-3 text-sm font-body px-4 py-2.5 rounded-xl transition-all duration-200 ${
                    activeSection === item.href
                      ? "bg-white text-black dark:bg-white dark:text-black"
                      : "bg-black text-white hover:bg-white hover:text-black dark:bg-black dark:text-white dark:hover:bg-white dark:hover:text-black"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
