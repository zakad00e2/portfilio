import { ArrowUpRight } from "lucide-react";

const projects = [
  {
    image: "/1.png",
    title: "Digital Library",
    description: "A modern digital publishing platform built with React and TypeScript. It combines a social blog feed, knowledge wiki, and digital bookstore within a sleek, high-performance interface. The platform features a fully responsive Tailwind-powered design, multi-language support (i18n), and a content-focused user experience.",
    technologies: ["React", "tailwindcss","TypeScript", "i18n"],
    url: "https://pure-scribe-muse2.vercel.app/",
  },
  {
    image: "/2.png",
    title: "Dashboard",
    description:
    "An administrative dashboard designed for data visualization, management, and monitoring of key performance indicators (KPIs). It likely features charts, tables, and user management tools.",
    technologies: ["React", "Material UI", "Chart.js"],
    url: "https://dashboard-swart-two-88.vercel.app/",
  },
  {
    image: "/3.png",
    title: "Tshtri",
    description:
    "Tshtri is a comprehensive e-commerce platform that offers a seamless shopping experience. It features a user-friendly interface, secure payment gateways, and robust inventory management, making it easy for businesses to sell products online.",
    technologies: ["html", "css", "bootstrap","JavaScript"],
    url: "https://tshtri.vercel.app/",
  },
 
];

export const Projects = () => {
  return (
    <section id="projects" className="mb-16 scroll-mt-16 lg:mb-36">
      <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-background/75 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
        <h2 className="text-sm font-bold uppercase tracking-widest text-slate-light">
          Projects
        </h2>
      </div>

      <div>
        <ul className="group/list">
          {projects.map((project, index) => (
            <li key={index} className="mb-12">
              <div className="group relative grid gap-4 pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-50">
                <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-lg transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-slate-light/[0.03] lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg" />

                <div className="z-10 sm:order-2 sm:col-span-6">
                  <h3>
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-baseline font-medium leading-tight text-slate-light hover:text-primary focus-visible:text-primary group/link text-base"
                    >
                      <span className="absolute -inset-x-4 -inset-y-2.5 hidden rounded lg:-inset-x-6 lg:block" />
                      <span>
                        {project.title}
                        <ArrowUpRight className="inline-block h-4 w-4 shrink-0 transition-transform group-hover/link:-translate-y-1 group-hover/link:translate-x-1 group-focus-visible/link:-translate-y-1 group-focus-visible/link:translate-x-1 motion-reduce:transition-none ml-1 translate-y-px" />
                      </span>
                    </a>
                  </h3>

                  <p className="mt-2 text-sm leading-normal text-slate">
                    {project.description}
                  </p>

                  <ul className="mt-2 flex flex-wrap" aria-label="Technologies used">
                    {project.technologies.map((tech) => (
                      <li key={tech} className="mr-1.5 mt-2">
                        <div className="flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-medium leading-5 text-primary">
                          {tech}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                <img
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                  className="rounded border-2 border-slate/10 transition group-hover:border-slate/30 sm:order-1 sm:col-span-2 sm:translate-y-1"
                />
              </div>
            </li>
          ))}
        </ul>

        {/* <div className="mt-12">
          <a
            href="/archive"
            className="inline-flex items-center font-medium leading-tight text-slate-light group"
          >
            <span className="border-b border-transparent pb-px transition group-hover:border-primary motion-reduce:transition-none">
              View Full Project Archive
            </span>
            <ArrowUpRight className="ml-1 inline-block h-4 w-4 shrink-0 -translate-y-px transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 group-focus-visible:-translate-y-1 group-focus-visible:translate-x-1 motion-reduce:transition-none" />
          </a>
        </div> */}
      </div>
    </section>
  );
};
