import { ArrowUpRight } from "lucide-react";

const experiences = [
  {
    period: "2024 — PRESENT",
    title: "Freelance Front-End Developer",
    company: "Forlanso",
    url: "https://www.forlanso.com/ar/zkrya-safy",
    description:
      "Delivered responsive and modern web interfaces for local clients, enhancing user engagement and overall visual appeal while optimizing performance for portfolio and business websites to improve load times and accessibility. Additionally, collaborated closely with clients to implement custom UI solutions, increasing satisfaction and encouraging repeat visits.",
    technologies: ["JavaScript", "TypeScript", "React", "Tailwind CSS", "Next.js"],
  },
  {
    period: "2023 — 2024",
    title: "Front-End Developer ",
    company: "Personal & Open-Source Projects",
    // url: "https://upstatement.com/",
    description:
    "Built multiple personal and open-source projects to strengthen front-end fundamentals, including responsive landing pages, interactive UI components, and API-powered applications. Focused on clean architecture, reusable components, and modern JavaScript patterns. Contributed to improving accessibility, performance, and cross-browser compatibility across several projects.",
    technologies: ["JavaScript", "Git", "CSS3", "REST APIs"],
  },
    {
    period: "2023 — 2023",
    title: "Front-End Volunteer Developer · Community Projects",
    // company: "Upstatement",
    // url: "https://upstatement.com/",
    description:
    "Collaborated with a small team to develop user-friendly pages for community and student initiatives. Helped design responsive layouts, fix UI bugs, and implement features such as contact forms, simple dashboards, and blog layouts. Ensured smooth deployment workflows and continuous updates based on user feedback.",
    technologies: [ "HTML", "CSS", "Bootstrap", "UI Debugging","GitHub"],
  },
     {
    period: "2022 — 2024",
    title: "Web Development Intern",
    // company: "Upstatement",
    // url: "https://upstatement.com/",
    description:
      "Assisted in maintaining front-end components and improving overall website speed for academic and small business projects, while supporting the debugging of JavaScript features and contributing to enhanced front-end performance and stability.",
    technologies: ["React", "HTML", "CSS", "Git", "JavaScript"],
  }
];

export const Experience = () => {
  return (
    <section id="experience" className="mb-16 scroll-mt-16 lg:mb-36">
      <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-background/75 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
        <h2 className="text-sm font-bold uppercase tracking-widest text-slate-light">
          Experience
        </h2>
      </div>

      <div>
        <ol className="group/list">
          {experiences.map((exp, index) => (
            <li key={index} className="mb-12">
              <div className="group relative grid gap-4 pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-50">
                <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-lg transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-slate-light/[0.03] lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg" />

                <header className="z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide text-slate sm:col-span-2" aria-label={exp.period}>
                  {exp.period}
                </header>

                <div className="z-10 sm:col-span-6">
                  <h3 className="font-medium leading-snug text-slate-light">
                    <div>
                      <a
                        href={exp.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-baseline font-medium leading-tight text-slate-light hover:text-primary focus-visible:text-primary group/link text-base"
                        aria-label={`${exp.title} at ${exp.company}`}
                      >
                        <span className="absolute -inset-x-4 -inset-y-2.5 hidden rounded lg:-inset-x-6 lg:block" />
                        <span>
                          {exp.title} ·{" "}
                          <span className="inline-block">
                            {exp.company}
                            <ArrowUpRight className="inline-block h-4 w-4 shrink-0 transition-transform group-hover/link:-translate-y-1 group-hover/link:translate-x-1 group-focus-visible/link:-translate-y-1 group-focus-visible/link:translate-x-1 motion-reduce:transition-none ml-1 translate-y-px" />
                          </span>
                        </span>
                      </a>
                    </div>
                  </h3>

                  <p className="mt-2 text-sm leading-normal text-slate">
                    {exp.description}
                  </p>

                  <ul className="mt-2 flex flex-wrap" aria-label="Technologies used">
                    {exp.technologies.map((tech) => (
                      <li key={tech} className="mr-1.5 mt-2">
                        <div className="flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-medium leading-5 text-primary">
                          {tech}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-12">
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center font-medium leading-tight text-slate-light group"
          >
            <span className="border-b border-transparent pb-px transition group-hover:border-primary motion-reduce:transition-none">
              View Full Resume
            </span>
            <ArrowUpRight className="ml-1 inline-block h-4 w-4 shrink-0 -translate-y-px transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 group-focus-visible:-translate-y-1 group-focus-visible:translate-x-1 motion-reduce:transition-none" />
          </a>
        </div>
      </div>
    </section>
  );
};
