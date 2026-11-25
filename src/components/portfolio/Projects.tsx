import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useLocale } from "@/hooks/use-locale";
import { projectImages } from "@/data/project-images";
import { cn } from "@/lib/utils";

type Project = {
  id: keyof typeof projectImages;
  title: string;
  description: string;
  technologies: string[];
  url?: string;
};

export const Projects = () => {
  const { t } = useTranslation();
  const { hash } = useLocation();
  const [showAll, setShowAll] = useState(false);
  const { isRtl } = useLocale();
  const projects = t("projects.items", { returnObjects: true }) as Project[];
  useEffect(() => {
    if (projects.slice(6).some((project) => hash === `#project-${project.id}`)) {
      setShowAll(true);
    }
  }, [hash, projects]);

  useEffect(() => {
    if (showAll) {
      ScrollTrigger.refresh();
    }
  }, [showAll]);

  const iconClassName = cn(
    "ms-1 inline-block h-4 w-4 shrink-0 translate-y-px transition-transform motion-reduce:transition-none",
    isRtl
      ? "-scale-x-100 group-hover/link:-translate-x-1 group-hover/link:-translate-y-1 group-focus-visible/link:-translate-x-1 group-focus-visible/link:-translate-y-1"
      : "group-hover/link:translate-x-1 group-hover/link:-translate-y-1 group-focus-visible/link:translate-x-1 group-focus-visible/link:-translate-y-1",
  );

  return (
    <section id="projects" className="mb-16 scroll-mt-16 lg:mb-36">
      <div className="pointer-events-none sticky top-0 z-50 -mx-6 mb-4 w-screen px-6 py-5 md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
        <h2 className="section-heading">
          {t("projects.sectionTitle")}
        </h2>
      </div>

      <div>
        <ul className="group/list">
          {projects.map((project, index) => {
            const image = projectImages[project.id];
            const source = `/images/projects/${project.id}`;
            return (
              <li id={`project-${project.id}`} key={project.id} className={cn("relative scroll-mt-16", !showAll && index === 6 ? "mb-2 max-h-28 overflow-hidden" : "mb-12")} hidden={!showAll && index >= 7} aria-hidden={!showAll && index === 6 ? true : undefined} data-gsap-reveal={index < 6 ? "" : undefined}>
                <div className="group relative grid gap-4 pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-75">
                  <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-lg transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-slate-light/[0.03]" />

                  <picture className="sm:order-1 sm:col-span-2 sm:translate-y-1">
                    <source
                      type="image/webp"
                      srcSet={`${source}-480.webp 480w, ${source}-960.webp 960w`}
                      sizes="(min-width: 1024px) 10vw, (min-width: 640px) 23vw, calc(100vw - 3rem)"
                    />
                    <img
                      src={image.src}
                      alt={t("projects.imageAlt", { title: project.title })}
                      width={image.width}
                      height={image.height}
                      loading="lazy"
                      decoding="async"
                      className="w-full rounded border-2 border-slate/10 transition group-hover:border-slate/30"
                    />
                  </picture>

                  <div className="z-10 sm:order-2 sm:col-span-6">
                    <h3>
                      {project.url ? (
                        <a
                          href={project.url}
                          tabIndex={!showAll && index === 6 ? -1 : undefined}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group/link inline-flex items-baseline font-medium leading-tight text-slate-light hover:text-primary focus-visible:text-primary text-base"
                        >
                          <span className="absolute -inset-x-4 -inset-y-2.5 rounded lg:-inset-x-6 block" />
                          <span>
                            {project.title}
                            <ArrowUpRight className={iconClassName} />
                          </span>
                        </a>
                      ) : (
                        <span className="font-medium leading-tight text-slate-light text-base">
                          {project.title}
                        </span>
                      )}
                    </h3>

                    <p className="mt-2 text-sm leading-normal text-slate font-light">
                      {project.description}
                    </p>

                    <ul className="mt-2 flex flex-wrap" aria-label={t("common.technologiesUsed")}>
                      {project.technologies.map((tech) => (
                        <li key={tech} className="me-1.5 mt-2">
                          <div className="flex items-center rounded-full bg-primary/5 px-3 py-1 text-xs font-normal leading-5 text-neutral-600">
                            {tech}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                {!showAll && index === 6 && (
                  <div aria-hidden="true" className="absolute inset-0 z-20 bg-gradient-to-t from-background via-background/80 to-transparent" />
                )}
              </li>
            );
          })}
        </ul>
        {!showAll && projects.length > 6 && (
          <button
            type="button"
            onClick={() => setShowAll(true)}
            className="group mx-auto flex min-h-11 items-center gap-2 font-medium text-slate transition-colors hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
          >
            {t("projects.showMore")}
            <ArrowDown aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-y-1 motion-reduce:transition-none motion-reduce:group-hover:translate-y-0" />
          </button>
        )}
      </div>
    </section>
  );
};
