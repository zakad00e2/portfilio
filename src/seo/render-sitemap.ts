import { languageCodes, type Language } from "@/i18n/locales";
import { alternateUrls, getCanonicalUrl } from "./site-seo";
import { blogPosts, getBlogPosts } from "@/blog/posts";
import { getBlogAlternates, getBlogCanonicalUrl } from "./blog-seo";

// Update the affected locale when the portfolio content or search metadata changes significantly.
const lastModified: Record<Language, string> = { en: "2026-11-24", ar: "2026-11-24" };

export const renderSitemap = () => {
  const entry = (url: string, date: string, alternates: ReadonlyArray<readonly [string, string]>) => [
    "  <url>",
    `    <loc>${url}</loc>`,
    `    <lastmod>${date}</lastmod>`,
    ...alternates.map(([code, href]) => `    <xhtml:link rel="alternate" hreflang="${code}" href="${href}" />`),
    "  </url>",
  ];
  const portfolio = languageCodes.flatMap((language) => entry(getCanonicalUrl(language), lastModified[language], alternateUrls));
  const archives = languageCodes.flatMap((language) => {
    const latest = getBlogPosts(language)[0];
    return latest ? entry(getBlogCanonicalUrl(language), latest.date, getBlogAlternates({ language })) : [];
  });
  const articles = blogPosts.filter((post) => post.language === "ar").flatMap((post) => entry(
    getBlogCanonicalUrl(post.language, post.slug), post.date, getBlogAlternates({ language: post.language, post }),
  ));

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
    ...portfolio,
    ...archives,
    ...articles,
    "</urlset>",
    "",
  ].join("\n");
};
