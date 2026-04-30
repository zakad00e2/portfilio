import { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Hero } from "@/components/portfolio/Hero";
import { About } from "@/components/portfolio/About";
import { Experience } from "@/components/portfolio/Experience";
import { Projects } from "@/components/portfolio/Projects";
import { Navigation } from "@/components/portfolio/Navigation";
import { MouseFollower } from "@/components/portfolio/MouseFollower";
import { LanguageSwitcher } from "@/components/portfolio/LanguageSwitcher";
import { LocalizedSeo } from "@/components/portfolio/LocalizedSeo";
import { isLanguage, isSectionSlug, setStoredLanguage } from "@/i18n/locales";

const Index = () => {
  const { i18n, t } = useTranslation();
  const { lang, section } = useParams();
  const location = useLocation();

  useEffect(() => {
    if (!isLanguage(lang)) {
      return;
    }

    if (i18n.language !== lang) {
      void i18n.changeLanguage(lang);
    }

    setStoredLanguage(lang);
  }, [i18n, lang]);

  useEffect(() => {
    if (!isSectionSlug(section)) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      const element = document.getElementById(section);

      if (!element) {
        return;
      }

      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }, 80);

    return () => window.clearTimeout(timeoutId);
  }, [location.pathname, section]);

  return (
    <div className="min-h-screen bg-background relative">
      <LocalizedSeo />
      <MouseFollower />
      <div className="fixed right-4 top-4 z-40 md:right-8 lg:right-10">
        <LanguageSwitcher />
      </div>
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground"
      >
        {t("common.skipToContent")}
      </a>
      
      <div className="lg:flex lg:justify-between lg:gap-4">
        <header className="lg:sticky lg:top-0 lg:flex lg:max-h-screen lg:w-1/2 lg:flex-col lg:justify-between lg:pt-24 lg:pb-12 px-6 pt-12 pb-0 md:px-12 lg:ps-40 lg:pe-24">
          <div>
            <Hero />
            <Navigation />
          </div>
        </header>

        <main id="content" className="lg:w-1/2 lg:pt-24 lg:pb-12 px-6 pb-12 md:px-12 lg:ps-6 lg:pe-32">
          <About />
          <Experience />
          <Projects />
        </main>
      </div>
    </div>
  );
};

export default Index;
