import { buildLocalizedPath, defaultLanguage, languageCodes, languages, type Language } from "@/i18n/locales";
import { resources } from "@/i18n/resources";

export const siteOrigin = "https://www.zakariasafi.me";
export const portfolioImage = `${siteOrigin}/og-preview.png`;
export const personProfiles = {
  github: "https://github.com/zakad00e2",
  linkedin: "https://www.linkedin.com/in/zakariasafi/",
  x: "https://x.com/Zakariaweb1",
};

export const getCanonicalUrl = (language: Language) => `${siteOrigin}${buildLocalizedPath(language)}`;

export const alternateUrls = [
  ...languageCodes.map((code) => [code, getCanonicalUrl(code)] as const),
  ["x-default", getCanonicalUrl(defaultLanguage)] as const,
];

export const buildSeoDocument = (language: Language) => {
  const { seo } = resources[language].translation;
  const alternateLanguage = language === "ar" ? "en" : "ar";
  const canonical = getCanonicalUrl(language);

  return {
    title: seo.title,
    canonical,
    standard: {
      description: seo.description,
      author: seo.author,
      robots: "index,follow",
      "twitter:card": "summary_large_image",
      "twitter:title": seo.title,
      "twitter:description": seo.description,
      "twitter:image": portfolioImage,
      "twitter:image:alt": seo.imageAlt,
    },
    openGraph: {
      "og:title": seo.title,
      "og:description": seo.description,
      "og:type": "website",
      "og:locale": languages[language].locale,
      "og:locale:alternate": languages[alternateLanguage].locale,
      "og:site_name": seo.siteName,
      "og:url": canonical,
      "og:image": portfolioImage,
      "og:image:secure_url": portfolioImage,
      "og:image:type": "image/png",
      "og:image:width": "1201",
      "og:image:height": "630",
      "og:image:alt": seo.imageAlt,
    },
  };
};
