import { ExternalLink, Github } from "lucide-react";

const projects = [
  {
    title: "E-Commerce Platform",
    description:
      "A full-stack e-commerce platform with real-time inventory management, secure payment processing, and an intuitive admin dashboard. Built with modern technologies for optimal performance.",
    technologies: ["React", "Node.js", "PostgreSQL", "Stripe", "Redis"],
    github: "https://github.com",
    demo: "https://example.com",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop",
  },
  {
    title: "Task Management App",
    description:
      "A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features. Designed for productivity and ease of use.",
    technologies: ["Next.js", "TypeScript", "Prisma", "WebSocket"],
    github: "https://github.com",
    demo: "https://example.com",
    image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&h=500&fit=crop",
  },
  {
    title: "Weather Dashboard",
    description:
      "An interactive weather dashboard featuring real-time data visualization, location-based forecasts, and customizable widgets. Clean design with smooth animations.",
    technologies: ["React", "Chart.js", "OpenWeather API", "Tailwind"],
    github: "https://github.com",
    demo: "https://example.com",
    image: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=800&h=500&fit=crop",
  },
];

export const Projects = () => {
  return (
    <section id="projects" className="mb-32 scroll-mt-16 animate-fade-in-up">
      <h2 className="section-heading">
        <span className="section-number">03.</span>
        Projects
      </h2>

      <div className="space-y-20">
        {projects.map((project, index) => (
          <div
            key={index}
            className="group relative"
          >
            <div className="relative overflow-hidden rounded-lg bg-card border border-border hover:border-primary/50 transition-all duration-300 card-interactive">
              <div className="aspect-video overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-2xl font-semibold text-slate-light">
                    {project.title}
                  </h3>
                  <div className="flex gap-4">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate hover:text-primary transition-colors duration-300"
                      aria-label="GitHub Repository"
                    >
                      <Github className="w-5 h-5" />
                    </a>
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate hover:text-primary transition-colors duration-300"
                      aria-label="Live Demo"
                    >
                      <ExternalLink className="w-5 h-5" />
                    </a>
                  </div>
                </div>

                <p className="text-slate mb-4 leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-background text-primary text-xs font-mono rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
