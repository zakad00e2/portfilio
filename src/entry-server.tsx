import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { I18nextProvider } from "react-i18next";
import App from "./App";
import { createPortfolioI18n } from "./i18n/config";
import { buildLocalizedPath, languageCodes, languages, type Language } from "./i18n/locales";
import { renderNoIndexHead, renderSeoHead } from "./seo/render-seo-head";
import { getBlogPage } from "./blog/posts";

export { languageCodes };
export { blogPosts, getBlogPath } from "./blog/posts";
export { renderSitemap } from "./seo/render-sitemap";

const arabicFontPreloads = ["thmanyahsans-Regular", "thmanyahserifdisplay-Bold"]
  .map((font) => `<link rel="preload" as="font" type="font/woff2" href="/fonts/${font}.woff2" crossorigin />`)
  .join("\n");

export const renderPage = (language: Language, pathname = buildLocalizedPath(language)) => {
  const blogPage = getBlogPage(pathname);
  return {
    direction: languages[language].dir,
    appHtml: renderToString(
      <I18nextProvider i18n={createPortfolioI18n(language)}>
        <StaticRouter location={pathname}>
          <App />
        </StaticRouter>
      </I18nextProvider>,
    ),
    headHtml: pathname === buildLocalizedPath(language) || blogPage
      ? [renderSeoHead(language, blogPage), language === "ar" ? arabicFontPreloads : ""].join("\n")
      : renderNoIndexHead(pathname === "/" ? "Zakaria Safi Portfolio" : "Page not found | Zakaria Safi"),
  };
};
