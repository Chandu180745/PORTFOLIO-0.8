import { Github, Linkedin, Twitter } from "lucide-react";

const Footer = () => (
  <footer className="border-t border-border/50 py-10 px-6">
    <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
      <span className="font-display text-sm text-muted-foreground">
        © 2026 Chandradeep<span className="text-primary">.</span>
      </span>
      <div className="flex items-center gap-3">
        <a href="https://github.com/Chandu180745" target="_blank" rel="noopener noreferrer"
          className="w-9 h-9 rounded-full bg-secondary/50 border border-border/30 flex items-center justify-center hover:bg-primary/10 hover:border-primary/30 hover:text-primary transition-all duration-300 group">
          <Github className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
        </a>
        <a href="https://www.linkedin.com/in/chandradeep-reddy" target="_blank" rel="noopener noreferrer"
          className="w-9 h-9 rounded-full bg-secondary/50 border border-border/30 flex items-center justify-center hover:bg-primary/10 hover:border-primary/30 hover:text-primary transition-all duration-300 group">
          <Linkedin className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"
          className="w-9 h-9 rounded-full bg-secondary/50 border border-border/30 flex items-center justify-center hover:bg-primary/10 hover:border-primary/30 hover:text-primary transition-all duration-300 group">
          <Twitter className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
        </a>
      </div>
    </div>
  </footer>
);

export default Footer;
