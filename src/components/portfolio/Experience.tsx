import { ArrowUpRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useLocale } from "@/hooks/use-locale";
import { cn } from "@/lib/utils";

type ExperienceItem = {
  period: string;
  title: string;
  company?: string;
  url?: string;
  description: string;
  technologies: string[];
};

export const Experience = () => {
  const { t } = useTranslation();
  const { isRtl } = useLocale();
  const experiences = t("experience.items", { returnObjects: true }) as ExperienceItem[];
  const iconClassName = cn(
    "ms-1 inline-block h-4 w-4 shrink-0 translate-y-px transition-transform motion-reduce:transition-none",
    isRtl
      ? "group-hover/link:-translate-x-1 group-hover/link:-translate-y-1 group-focus-visible/link:-translate-x-1 group-focus-visible/link:-translate-y-1"
      : "group-hover/link:translate-x-1 group-hover/link:-translate-y-1 group-focus-visible/link:translate-x-1 group-focus-visible/link:-translate-y-1",
  );

  return (
    <section id="experience" className="mb-16 scroll-mt-16 lg:mb-36">
      <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-background/75 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
        <h2 className="section-heading">
          {t("experience.sectionTitle")}
        </h2>
      </div>

      <div>
        <ol className="group/list">
          {experiences.map((exp) => {
            const titleContent = (
              <span>
                {exp.title}
                {exp.company ? (
                  <>
                    {" - "}
                    <span className="inline-block">
                      {exp.company}
                      {exp.url ? <ArrowUpRight className={iconClassName} /> : null}
                    </span>
                  </>
                ) : exp.url ? (
                  <ArrowUpRight className={iconClassName} />
                ) : null}
              </span>
            );

            return (
              <li key={`${exp.period}-${exp.title}`} className="mb-12" data-gsap-reveal>
                <div className="group relative grid gap-4 pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-50">
                  <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-lg transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-slate-light/[0.03] lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg" />

                  <header className="z-10 mb-2 mt-1 text-xs font-normal uppercase tracking-wide text-slate sm:col-span-2" aria-label={exp.period}>
                    {exp.period}
                  </header>

                  <div className="z-10 sm:col-span-6">
                    <h3 className="font-medium leading-snug text-slate-light">
                      {exp.url ? (
                        <a
                          href={exp.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group/link inline-flex items-baseline font-medium leading-tight text-slate-light hover:text-primary focus-visible:text-primary text-base"
                          aria-label={
                            exp.company
                              ? t("experience.linkLabel", { title: exp.title, company: exp.company })
                              : exp.title
                          }
                        >
                          <span className="absolute -inset-x-4 -inset-y-2.5 hidden rounded lg:-inset-x-6 lg:block" />
                          {titleContent}
                        </a>
                      ) : (
                        <span className="text-base font-medium leading-tight text-slate-light">
                          {titleContent}
                        </span>
                      )}
                    </h3>

                    <p className="mt-2 text-sm leading-normal text-slate font-light">
                      {exp.description}
                    </p>

                    <ul className="mt-2 flex flex-wrap" aria-label={t("common.technologiesUsed")}>
                      {exp.technologies.map((tech) => (
                        <li key={tech} className="me-1.5 mt-2">
                          <div className="flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-medium leading-5 text-primary">
                            {tech}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </li>
            );
          })}
        </ol>

        <div className="mt-12">
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="group/link inline-flex items-center font-medium leading-tight text-slate-light"
          >
            <span className="border-b border-transparent pb-px transition group-hover/link:border-primary motion-reduce:transition-none">
              {t("experience.viewFullResume")}
            </span>
            <ArrowUpRight className={iconClassName} />
          </a>
        </div>
      </div>
    </section>
  );
};
