const experiences = [
  {
    title: "Senior Frontend Developer",
    company: "Tech Company",
    period: "2022 - Present",
    description: [
      "Led development of core product features using React and TypeScript",
      "Improved application performance by 40% through code optimization",
      "Mentored junior developers and conducted code reviews",
      "Collaborated with design team to implement pixel-perfect UI components",
    ],
    technologies: ["React", "TypeScript", "Next.js", "Tailwind CSS"],
  },
  {
    title: "Full Stack Developer",
    company: "Digital Agency",
    period: "2020 - 2022",
    description: [
      "Built and maintained multiple client websites and web applications",
      "Implemented RESTful APIs using Node.js and Express",
      "Worked with cross-functional teams to deliver projects on time",
      "Optimized database queries reducing load times by 50%",
    ],
    technologies: ["JavaScript", "Node.js", "MongoDB", "React"],
  },
  {
    title: "Junior Developer",
    company: "Startup Inc",
    period: "2019 - 2020",
    description: [
      "Developed responsive web applications using modern JavaScript frameworks",
      "Participated in agile development processes and daily standups",
      "Wrote clean, maintainable code following best practices",
      "Contributed to open-source projects and internal tools",
    ],
    technologies: ["JavaScript", "Vue.js", "CSS", "Git"],
  },
];

export const Experience = () => {
  return (
    <section id="experience" className="mb-32 scroll-mt-16 animate-fade-in-up">
      <h2 className="section-heading">
        <span className="section-number">02.</span>
        Experience
      </h2>

      <div className="space-y-12">
        {experiences.map((exp, index) => (
          <div
            key={index}
            className="group relative border-l-2 border-card pl-8 pb-8 last:pb-0 hover:border-primary transition-colors duration-300"
          >
            <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            <h3 className="text-xl font-semibold text-slate-light mb-1">
              {exp.title}
            </h3>
            
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-4">
              <span className="text-primary font-medium">{exp.company}</span>
              <span className="hidden sm:block text-slate">•</span>
              <span className="font-mono text-sm text-slate">{exp.period}</span>
            </div>

            <ul className="space-y-2 mb-4">
              {exp.description.map((item, i) => (
                <li key={i} className="text-slate flex gap-2">
                  <span className="text-primary mt-1">▹</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-2">
              {exp.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 bg-card text-primary text-xs font-mono rounded-full"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
