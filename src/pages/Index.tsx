import { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Hero } from "@/components/portfolio/Hero";
import { About } from "@/components/portfolio/About";
import { Services } from "@/components/portfolio/Services";
import { Experience } from "@/components/portfolio/Experience";
import { Projects } from "@/components/portfolio/Projects";
import { MouseFollower } from "@/components/portfolio/MouseFollower";
import { MobileNavigation } from "@/components/portfolio/MobileNavigation";
import { LocalizedSeo } from "@/components/portfolio/LocalizedSeo";
import { useGsapReveal } from "@/hooks/use-gsap-reveal";
import { isLanguage, isSectionSlug, setStoredLanguage } from "@/i18n/locales";
import { useSmoothScroll } from "@/components/SmoothScroll";
import { getBlogPath, getBlogPosts } from "@/blog/posts";
import { useLocale } from "@/hooks/use-locale";

const Index = () => {
  const { i18n, t } = useTranslation();
  const { language } = useLocale();
  const posts = getBlogPosts(language);
  const { lang, section } = useParams();
  const location = useLocation();
  const lenis = useSmoothScroll();
  useGsapReveal();

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
    const target = location.hash.slice(1) || (isSectionSlug(section) ? section : "");
    if (!target) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      const element = document.getElementById(target);

      if (!element) {
        return;
      }

      const top = element.getBoundingClientRect().top + window.scrollY - 80;
      if (lenis) {
        lenis.scrollTo(top);
        return;
      }

      window.scrollTo({ top });
    }, 80);

    return () => window.clearTimeout(timeoutId);
  }, [lenis, location.hash, location.key, section]);

  return (
    <div className="min-h-screen bg-background relative">
      <div className="site-intro" aria-hidden="true">
        <span className="site-intro__name portfolio-name-type" lang={language} dir="auto">
          {t("hero.name")}
        </span>
      </div>
      <LocalizedSeo />
      <MouseFollower />
      <div className="pointer-events-none fixed inset-x-0 top-0 z-40 h-[76px] lg:hidden">
        <div className="blog-header-blur" aria-hidden="true">
          <span /><span /><span /><span /><span />
        </div>
        <div className="language-switcher-position pointer-events-auto absolute top-4">
          <MobileNavigation />
        </div>
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
          </div>
        </header>

        <main id="content" className="lg:w-1/2 lg:pt-24 lg:pb-12 px-6 pb-12 md:px-12 lg:ps-6 lg:pe-32">
          <About />
          <Services />
          <Experience />
          <Projects />
            <section id="blog" className="mb-16 scroll-mt-16">
              <h2 className="sr-only">{t("blog.title")}</h2>
              {posts.length > 0 ? (
              <ul className="space-y-8">
                {posts.map((post) => (
                  <li key={post.slug}>
                    <article>
                      <h3 className="text-sm font-medium text-slate-light">
                        <a className="hover:text-primary" href={getBlogPath(language, post.slug)}>{post.title}</a>
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-slate">{post.description}</p>
                      <time className="mt-2 block text-xs text-slate" dateTime={post.date}>
                        {new Intl.DateTimeFormat(language, { dateStyle: "long", timeZone: "UTC" }).format(new Date(post.date))}
                      </time>
                    </article>
                  </li>
                ))}
              </ul>
              ) : <p className="text-slate">{t("blog.empty")}</p>}
            </section>
        </main>
      </div>
    </div>
  );
};

export default Index;
