import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import gsap from "gsap";
import { personProfiles } from "@/seo/site-seo";
import { Navigation } from "@/components/portfolio/Navigation";

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

      <div className="flex flex-col-reverse items-start gap-2">
        <div className="min-w-0">
          <h1
            data-gsap-hero
            className={`portfolio-name-type mb-3 lg:mb-1 ${isLatinHeroName ? "" : "lg:flex lg:max-w-xs lg:items-center lg:whitespace-nowrap lg:!text-[2.5rem]"}`}
            lang={isLatinHeroName ? "en" : "ar"}
          >
            <Link
              to="#about"
              className="hero-name-gradient"
              dir={isLatinHeroName ? "ltr" : undefined}
            >
              {heroName}
            </Link>
            <img src="/icons/x-verified-gold.svg" alt="" className="ms-2 inline-block h-[0.75em] w-[0.75em] shrink-0 -translate-y-1 align-middle" />
          </h1>
          <p 
            data-gsap-hero
            className="text-slate max-w-xs leading-relaxed"
            style={{ fontFeatureSettings: "'ss01', 'cv11'" }}
          >
            {t("hero.intro")}
          </p>
          <div data-gsap-hero className="mt-4 flex items-center gap-3">
            <a 
              href={personProfiles.github}
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[#24292f] transition-opacity duration-200 hover:opacity-70"
              aria-label="GitHub"
            >
              <span aria-hidden="true" className="block h-6 w-6 bg-current" style={{ mask: "url(/icons/github.svg) center / contain no-repeat" }} />
            </a>
            <a 
              href={personProfiles.linkedin}
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[#0a66c2] transition-opacity duration-200 hover:opacity-70"
              aria-label="LinkedIn"
            >
              <span aria-hidden="true" className="block h-6 w-6 bg-current" style={{ mask: "url(/icons/linkedin.svg) center / contain no-repeat" }} />
            </a>
            <a
              href={personProfiles.x}
              target="_blank"
              rel="noopener noreferrer"
              className="text-black transition-opacity duration-200 hover:opacity-70"
              aria-label="X"
            >
              <span aria-hidden="true" className="block h-6 w-6 bg-current" style={{ mask: "url(/icons/x-twitter.svg) center / contain no-repeat" }} />
            </a>
            <a 
              href="https://wa.me/972597986160" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[#168c46] transition-opacity duration-200 hover:opacity-70"
              aria-label="WhatsApp"
            >
              <img src="/icons/whatsapp-seeklogo.svg" alt="" className="block h-8 w-8" />
            </a>
          </div>
          <Navigation />
        </div>
        <div data-gsap-hero className="relative shrink-0">
          <img
            src="/images/zakaria-safi-color.png"
            alt={heroName}
            width="144"
            height="144"
            className="h-24 w-24 rounded-xl object-cover object-top lg:h-20 lg:w-20"
          />
        </div>
      </div>

    </div>
  );
};
