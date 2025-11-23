export const About = () => {
  return (
    <section id="about" className="mb-32 scroll-mt-16 animate-fade-in-up">
      <h2 className="section-heading">
        <span className="section-number">01.</span>
        About Me
      </h2>
      
      <div className="space-y-4 text-slate leading-relaxed">
        <p>
          Hello! I'm a passionate developer who enjoys creating things that live on the internet. 
          My interest in web development started back in 2020 when I decided to try building my 
          first custom website — turns out hacking together a custom theme taught me a lot about 
          HTML & CSS!
        </p>
        
        <p>
          Fast-forward to today, and I've had the privilege of working at various companies, 
          building amazing products and contributing to open-source projects. My main focus these 
          days is building accessible, inclusive products and digital experiences for a variety of clients.
        </p>
        
        <p>
          Here are a few technologies I've been working with recently:
        </p>
        
        <ul className="grid grid-cols-2 gap-2 mt-4 font-mono text-sm">
          {[
            "JavaScript (ES6+)",
            "TypeScript",
            "React",
            "Node.js",
            "Next.js",
            "Tailwind CSS",
          ].map((tech) => (
            <li key={tech} className="flex items-center gap-2">
              <span className="text-primary">▹</span>
              <span>{tech}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
