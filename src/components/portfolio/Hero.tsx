import { Github, Linkedin } from "lucide-react";
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import gsap from "gsap";
import { personProfiles } from "@/seo/site-seo";

export const Hero = () => {
  const { t } = useTranslation();
  const heroRef = useRef<HTMLDivElement>(null);
  const heroName = t("hero.name");
  const isLatinHeroName = /^[\p{Script=Latin}\s]+$/u.test(heroName);

  useEffect(() => {
    const reduceMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (reduceMotionQuery.matches) {
      gsap.set("[data-gsap-hero]", { autoAlpha: 1, y: 0 });
      return;
    }

    const context = gsap.context(() => {
      gsap.fromTo(
        "[data-gsap-hero]",
        { autoAlpha: 0, y: 24 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.85,
          ease: "power3.out",
          stagger: 0.11,
          delay: 0.08,
        },
      );
    }, heroRef);

    return () => context.revert();
  }, []);

  return (
    <div ref={heroRef} className="flex min-h-screen flex-col justify-center lg:block lg:min-h-0">
      <p
        data-gsap-hero
        className="mb-3 inline-flex w-fit items-center gap-1.5 rounded-full border border-black/10 bg-white px-3 py-1.5 font-sans text-xs font-normal text-slate-light"
      >
        <svg aria-hidden="true" viewBox="0 0 24 24" className="h-3.5 w-3.5 shrink-0 fill-[#e88a3d]">
          <path d="m12 0 2.1 4.5 4.1-2.8-.5 5 5-.5-2.8 4.1L24 12l-4.1 1.7 2.8 4.1-5-.5.5 5-4.1-2.8L12 24l-2.1-4.5-4.1 2.8.5-5-5 .5 2.8-4.1L0 12l4.1-1.7-2.8-4.1 5 .5-.5-5 4.1 2.8L12 0Z" />
        </svg>
        {t("hero.title")}
      </p>
      <h1
        data-gsap-hero
        className="text-[clamp(2.5rem,8vw,3rem)] font-serif font-bold leading-[1.1] mb-4"
        style={{
          fontFamily: isLatinHeroName
            ? "'Inter', system-ui, -apple-system, sans-serif"
            : "'Thmanyah Sans', system-ui, sans-serif",
          fontFeatureSettings: "'ss01', 'cv11'",
        }}
      >
        <Link
          to="#about"
          className="hero-name-gradient"
          dir={isLatinHeroName ? "ltr" : undefined}
          lang={isLatinHeroName ? "en" : undefined}
        >
          {heroName}
        </Link>
      </h1>
      <p 
        data-gsap-hero
        className="text-slate max-w-xs leading-relaxed"
        style={{ fontFeatureSettings: "'ss01', 'cv11'" }}
      >
        {t("hero.intro")}
      </p>
      <div data-gsap-hero className="flex gap-5 mt-8">
        <a 
          href={personProfiles.github}
          target="_blank" 
          rel="noopener noreferrer"
          className="text-[#24292f] transition-opacity duration-200 hover:opacity-70"
          aria-label="GitHub"
        >
          <Github className="w-6 h-6" />
        </a>
        <a 
          href={personProfiles.linkedin}
          target="_blank" 
          rel="noopener noreferrer"
          className="text-[#0a66c2] transition-opacity duration-200 hover:opacity-70"
          aria-label="LinkedIn"
        >
          <Linkedin className="w-6 h-6" />
        </a>
        <a
          href={personProfiles.x}
          target="_blank"
          rel="noopener noreferrer"
          className="text-black transition-opacity duration-200 hover:opacity-70"
          aria-label="X"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6" aria-hidden="true">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.656l-5.214-6.817-5.967 6.817H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z" />
          </svg>
        </a>
        <a 
          href="https://wa.me/972597986160" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-[#168c46] transition-opacity duration-200 hover:opacity-70"
          aria-label="WhatsApp"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.008-.57-.008-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
          </svg>
        </a>
      </div>
    </div>
  );
};
