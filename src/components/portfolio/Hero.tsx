import { Github, Linkedin, Mail, Twitter } from "lucide-react";

export const Hero = () => {
  return (
    <div className="animate-fade-in-up">
      <h1 className="text-5xl lg:text-6xl font-bold text-slate-light mb-4">
        <span className="glow-text">Your Name</span>
      </h1>
      <h2 className="text-2xl lg:text-3xl font-semibold text-slate mb-4">
        Full Stack Developer
      </h2>
      <p className="text-slate max-w-sm mb-8">
        I build exceptional digital experiences that live on the web.
      </p>
      
      <div className="flex gap-6">
        <a 
          href="https://github.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-slate hover:text-primary transition-colors duration-300"
          aria-label="GitHub"
        >
          <Github className="w-6 h-6" />
        </a>
        <a 
          href="https://linkedin.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-slate hover:text-primary transition-colors duration-300"
          aria-label="LinkedIn"
        >
          <Linkedin className="w-6 h-6" />
        </a>
        <a 
          href="https://twitter.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-slate hover:text-primary transition-colors duration-300"
          aria-label="Twitter"
        >
          <Twitter className="w-6 h-6" />
        </a>
        <a 
          href="mailto:email@example.com"
          className="text-slate hover:text-primary transition-colors duration-300"
          aria-label="Email"
        >
          <Mail className="w-6 h-6" />
        </a>
      </div>
    </div>
  );
};
