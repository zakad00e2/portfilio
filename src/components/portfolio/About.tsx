import { Trans, useTranslation } from "react-i18next";

export const About = () => {
  const { t } = useTranslation();
  const paragraphs = t("about.paragraphs", { returnObjects: true }) as string[];

  return (
    <section id="about" className="mb-16 scroll-mt-16 lg:mb-36">
      <div className="pointer-events-none sticky top-0 z-50 -mx-6 mb-4 w-screen px-6 py-5 md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
        <h2 className="section-heading">
          {t("about.sectionTitle")}
        </h2>
      </div>

      <div className="space-y-4 text-slate leading-relaxed">
        {paragraphs.map((paragraph, index) => (
          <p key={paragraph} data-gsap-reveal>
            <Trans i18nKey={`about.paragraphs.${index}`} components={{ strong: <strong className="font-medium text-black" /> }} />
          </p>
        ))}
      </div>
    </section>
  );
};
