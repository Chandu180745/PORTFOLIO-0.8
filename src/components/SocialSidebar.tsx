import { Github, Linkedin, Mail, Phone } from "lucide-react";

const socialLinks = [
  { icon: Github, label: "GitHub", href: "https://github.com/Chandu180745", neonColor: "#ffffff" },
  { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/chandradeep-reddy", neonColor: "#0077ff" },
  { icon: Mail, label: "Gmail", href: "mailto:yeschandu08@gmail.com", neonColor: "#ff0055" },
  { icon: Phone, label: "Phone", href: "tel:+918074152355", neonColor: "#00ff66" },
];

const CIRCLE_SIZE = 44;
const GAP = 6;
const PADDING = 6;

const SocialSidebar = () => {
  return (
    <div className="fixed left-[14px] top-[80%] -translate-y-1/2 z-[999] hidden md:block">
      <nav
        className="flex flex-col items-center"
        style={{
          background: "rgba(0,0,0,0.5)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          borderRadius: "9999px",
          padding: `${PADDING}px`,
          gap: `${GAP}px`,
          boxShadow: "0 4px 28px rgba(0,0,0,0.5)",
        }}
      >
        {socialLinks.map((link) => {
          const Icon = link.icon;
          return (
            <a
              key={link.label}
              href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                aria-label={link.label}
              title={link.label}
              className="relative inline-flex items-center justify-center rounded-full no-underline cursor-pointer flex-shrink-0
                hover:scale-110 active:scale-95 transition-all duration-300"
              style={{
                width: `${CIRCLE_SIZE}px`,
                height: `${CIRCLE_SIZE}px`,
                background: "#000",
                boxShadow: "none",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget;
                el.style.background = link.neonColor;
                el.style.boxShadow = `0 0 0 2.5px ${link.neonColor}, 0 0 16px ${link.neonColor}`;
                const icon = el.querySelector("svg");
                if (icon) icon.style.color = "#000";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget;
                el.style.background = "#000";
                el.style.boxShadow = "none";
                const icon = el.querySelector("svg");
                if (icon) icon.style.color = link.neonColor;
              }}
            >
              <Icon
                className="w-[24px] h-[24px] transition-colors duration-300"
                style={{ 
                  color: link.neonColor
                }}
              />
            </a>
          );
        })}
      </nav>
    </div>
  );
};

export default SocialSidebar;
