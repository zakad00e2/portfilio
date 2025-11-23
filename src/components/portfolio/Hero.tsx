import { Github, Linkedin, Instagram } from "lucide-react";

export const Hero = () => {
  return (
    <div>
      <h1 className="text-[clamp(2.5rem,8vw,5rem)] font-bold leading-[1.1] mb-3">
        <a href="/" className="text-slate-light hover:text-primary transition-colors duration-200">
          Brittany Chiang
        </a>
      </h1>
      <h2 className="text-xl md:text-2xl font-medium text-slate-light mb-4 tracking-tight">
        Front End Engineer
      </h2>
      <p className="text-slate max-w-xs leading-relaxed">
        I build accessible, pixel-perfect digital experiences for the web.
      </p>
      
      <div className="flex gap-5 mt-8">
        <a 
          href="https://github.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-slate hover:text-slate-light transition-colors duration-200"
          aria-label="GitHub"
        >
          <Github className="w-6 h-6" />
        </a>
        <a 
          href="https://linkedin.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-slate hover:text-slate-light transition-colors duration-200"
          aria-label="LinkedIn"
        >
          <Linkedin className="w-6 h-6" />
        </a>
        <a 
          href="https://instagram.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-slate hover:text-slate-light transition-colors duration-200"
          aria-label="Instagram"
        >
          <Instagram className="w-6 h-6" />
        </a>
      </div>
    </div>
  );
};
