import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useLocale } from "@/hooks/use-locale";
import { buildLocalizedPath, getCurrentSection, languageCodes, languages, setStoredLanguage } from "@/i18n/locales";
import { cn } from "@/lib/utils";

export const LanguageSwitcher = () => {
  const location = useLocation();
  const { t } = useTranslation();
  const { language } = useLocale();
  const section = getCurrentSection(location.pathname);

  return (
    <div
      className="inline-flex rounded-full border border-slate-light/10 bg-navy-light/80 p-1 text-xs font-medium shadow-lg shadow-background/20 backdrop-blur"
      role="group"
      dir="ltr"
      aria-label={t("common.languageSwitcher")}
    >
      {languageCodes.map((code) => {
        const isActive = code === language;

        return (
          <Link
            key={code}
            to={buildLocalizedPath(code, section)}
            lang={code}
            dir={languages[code].dir}
            aria-current={isActive ? "page" : undefined}
            onClick={() => setStoredLanguage(code)}
            className={cn(
              "rounded-full px-3 py-1.5 leading-none transition-colors duration-200",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
              isActive ? "bg-primary text-primary-foreground" : "text-slate hover:text-slate-light",
            )}
          >
            {languages[code].nativeName}
          </Link>
        );
      })}
    </div>
  );
};
