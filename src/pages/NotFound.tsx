import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { buildLocalizedPath, getLanguageFromPath, getStoredLanguage, languages } from "@/i18n/locales";

const NotFound = () => {
  const location = useLocation();
  const { i18n, t } = useTranslation();
  const language = getLanguageFromPath(location.pathname) ?? getStoredLanguage();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  useEffect(() => {
    if (i18n.language !== language) {
      void i18n.changeLanguage(language);
    }

    document.documentElement.lang = language;
    document.documentElement.dir = languages[language].dir;
    document.body.dir = languages[language].dir;
  }, [i18n, language]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold">{t("notFound.title")}</h1>
        <p className="mb-4 text-xl text-muted-foreground">{t("notFound.message")}</p>
        <Link to={buildLocalizedPath(language)} className="text-primary underline hover:text-primary/90">
          {t("notFound.homeLink")}
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
