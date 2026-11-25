import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { buildLocalizedPath, getStoredLanguage, languages } from "@/i18n/locales";
import { renderNoIndexHead } from "@/seo/render-seo-head";

const NotFound = () => {
  const { i18n, t } = useTranslation();
  const language = getStoredLanguage();

  useEffect(() => {
    if (i18n.language !== language) {
      void i18n.changeLanguage(language);
    }

    document.documentElement.lang = language;
    document.documentElement.dir = languages[language].dir;
    const template = document.createElement("template");
    template.innerHTML = renderNoIndexHead(`${t("notFound.message", { lng: language })} | ${t("seo.author", { lng: language })}`);
    document.head.querySelectorAll("[data-portfolio-seo]").forEach((element) => element.remove());
    document.head.append(template.content);
  }, [i18n, language, t]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-muted">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold">{t("notFound.title")}</h1>
        <p className="mb-4 text-xl text-muted-foreground">{t("notFound.message")}</p>
        <Link to={buildLocalizedPath(language)} className="text-primary underline hover:text-primary/90">
          {t("notFound.homeLink")}
        </Link>
      </div>
    </main>
  );
};

export default NotFound;
