import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { buildLocalizedPath, type SectionSlug } from "@/i18n/locales";
import { useLocale } from "@/hooks/use-locale";

const navItems: SectionSlug[] = ["about", "experience", "projects"];

const scrollToSection = (id: SectionSlug) => {
  const element = document.getElementById(id);

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
};

export const Navigation = () => {
  const [activeSection, setActiveSection] = useState<SectionSlug>("about");
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const { language } = useLocale();

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map((item) => document.getElementById(item));
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section) {
          const sectionTop = section.offsetTop;
          
          if (scrollPosition >= sectionTop) {
            setActiveSection(navItems[i]);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigateToSection = (id: SectionSlug) => {
    const path = buildLocalizedPath(language, id);

    if (location.pathname === path) {
      scrollToSection(id);
      return;
    }

    navigate(path);
  };

  return (
    <nav className="hidden lg:block mt-16" aria-label={t("navigation.ariaLabel")}>
      <ul className="space-y-6">
        {navItems.map((item) => (
          <li key={item}>
            <button
              type="button"
              onClick={() => navigateToSection(item)}
              aria-current={activeSection === item ? "location" : undefined}
              className="group flex items-center gap-4 transition-all duration-200"
            >
              <span
                className={`h-px transition-all duration-200 ${
                  activeSection === item
                    ? "w-16 bg-slate-light"
                    : "w-8 bg-slate group-hover:w-16 group-hover:bg-slate-light"
                }`}
              />
              <span
                className={`nav-link-text ${
                  activeSection === item
                    ? "text-slate-light"
                    : "text-slate group-hover:text-slate-light"
                }`}
              >
                {t(`navigation.${item}`)}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};
