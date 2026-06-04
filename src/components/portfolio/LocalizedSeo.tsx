import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useLocale } from "@/hooks/use-locale";
import { buildLocalizedPath, getSectionFromPath, languageCodes, languages } from "@/i18n/locales";

const setMetaTag = (attribute: "name" | "property", key: string, content: string) => {
  let element = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);

  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }

  element.content = content;
};

const setLinkTag = (rel: string, href: string, hreflang?: string) => {
  const selector = hreflang
    ? `link[rel="${rel}"][hreflang="${hreflang}"]`
    : `link[rel="${rel}"]:not([hreflang])`;
  let element = document.head.querySelector<HTMLLinkElement>(selector);

  if (!element) {
    element = document.createElement("link");
    element.rel = rel;
    if (hreflang) {
      element.hreflang = hreflang;
    }
    document.head.appendChild(element);
  }

  element.href = href;
};

export const LocalizedSeo = () => {
  const location = useLocation();
  const { t } = useTranslation();
  const { direction, language } = useLocale();
  const title = t("seo.title");
  const description = t("seo.description");
  const author = t("seo.author");
  const siteName = t("seo.siteName");

  useEffect(() => {
    const section = getSectionFromPath(location.pathname);
    const origin = window.location.origin;
    const canonicalUrl = new URL(buildLocalizedPath(language, section), origin).toString();

    document.documentElement.lang = language;
    document.documentElement.dir = direction;
    document.body.dir = direction;
    document.title = title;

    setMetaTag("name", "description", description);
    setMetaTag("name", "author", author);
    setMetaTag("property", "og:title", title);
    setMetaTag("property", "og:description", description);
    setMetaTag("property", "og:type", "website");
    setMetaTag("property", "og:locale", languages[language].locale);
    setMetaTag("property", "og:site_name", siteName);
    setMetaTag("property", "og:url", canonicalUrl);
    setMetaTag("name", "twitter:card", "summary_large_image");
    setMetaTag("name", "twitter:title", title);
    setMetaTag("name", "twitter:description", description);

    setLinkTag("canonical", canonicalUrl);

    languageCodes.forEach((code) => {
      const localizedUrl = new URL(buildLocalizedPath(code, section), origin).toString();
      setLinkTag("alternate", localizedUrl, code);
    });

    setLinkTag("alternate", new URL(buildLocalizedPath("en", section), origin).toString(), "x-default");
  }, [author, description, direction, language, location.pathname, siteName, title]);

  return null;
};
