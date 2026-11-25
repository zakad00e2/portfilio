import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useLocale } from "@/hooks/use-locale";
import { resources } from "@/i18n/resources";

export const Services = () => {
  const { language } = useLocale();
  const { services, projects } = resources[language].translation;
  const projectTitles = new Map(projects.items.map(({ id, title }) => [id, title] as const));

  return (
    <section id="services" className="mb-16 scroll-mt-16 lg:mb-36">
      <div className="pointer-events-none sticky top-0 z-50 -mx-6 mb-4 w-screen px-6 py-5 md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
        <h2 className="section-heading">{services.sectionTitle}</h2>
      </div>
      <ul className="space-y-8">
        {services.items.map(({ title, description, examples }) => (
          <li key={title} data-gsap-reveal>
            <h3 className="text-base font-medium text-slate-light">{title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate">{description}</p>
            <p className="mt-3 text-xs text-slate">
              {services.examplesLabel}{" "}
              {examples.map((id, index) => (
                <span key={id}>
                  {index > 0 && (language === "ar" ? "، " : ", ")}
                  <Link className="group/link inline-flex items-center gap-1 text-primary hover:underline" to={`#project-${id}`}>
                    {projectTitles.get(id)}
                    <ArrowUpRight
                      aria-hidden="true"
                      className="size-3 shrink-0 rtl:-scale-x-100 motion-safe:transition-transform motion-safe:group-hover/link:-translate-y-0.5 motion-safe:ltr:group-hover/link:translate-x-0.5 motion-safe:rtl:group-hover/link:-translate-x-0.5"
                    />
                  </Link>
                </span>
              ))}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
};
