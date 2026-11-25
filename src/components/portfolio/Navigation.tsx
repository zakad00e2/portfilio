import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { sections, type SectionSlug } from "@/i18n/locales";

export const Navigation = () => {
  const [activeSection, setActiveSection] = useState<SectionSlug | "blog">("about");
  const { t } = useTranslation();

  useEffect(() => {
    const handleScroll = () => {
      const blog = document.getElementById("blog");
      const atPageEnd = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2;
      if (atPageEnd && blog && blog.getBoundingClientRect().top < window.innerHeight) {
        setActiveSection("blog");
        return;
      }

      const scrollPosition = window.scrollY + window.innerHeight / 3;
      const active = [...sections, "blog" as const].reverse().find((item) => {
        const element = document.getElementById(item);
        return element && element.getBoundingClientRect().top + window.scrollY <= scrollPosition;
      });
      setActiveSection(active ?? "about");
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className="hidden lg:mt-16 lg:block" aria-label={t("navigation.ariaLabel")}>
      <ul className="flex flex-wrap gap-x-5 gap-y-3 lg:block lg:space-y-6">
        {[...sections, "blog" as const].map((item) => (
          <li key={item}>
            <Link
              to={`#${item}`}
              aria-current={activeSection === item ? "location" : undefined}
              className="group flex items-center gap-4 transition-all duration-200"
            >
              <span
                className={`hidden h-px transition-all duration-200 lg:block ${
                  activeSection === item
                    ? "w-16 bg-black"
                    : "w-8 bg-neutral-500 group-hover:w-16 group-hover:bg-neutral-600"
                }`}
              />
              <span
                className={`nav-link-text ${
                  activeSection === item
                    ? "text-black"
                    : "text-neutral-500 group-hover:text-neutral-600"
                }`}
              >
                {t(`navigation.${item}`)}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
