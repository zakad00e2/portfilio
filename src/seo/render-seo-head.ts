import type { Language } from "@/i18n/locales";
import type { BlogPage } from "@/blog/posts";
import { languages } from "@/i18n/locales";
import { resources } from "@/i18n/resources";
import { alternateUrls, buildSeoDocument } from "./site-seo";
import { buildStructuredData } from "./structured-data";
import { buildBlogStructuredData, getBlogAlternates, getBlogCanonicalUrl, isIndexableBlogPage } from "./blog-seo";

const escapeHtml = (value: string) => value
  .replace(/&/g, "&amp;")
  .replace(/"/g, "&quot;")
  .replace(/</g, "&lt;")
  .replace(/>/g, "&gt;");

export const renderNoIndexHead = (title: string) =>
  `<title data-portfolio-seo>${escapeHtml(title)}</title>\n<meta data-portfolio-seo name="robots" content="noindex,follow" />`;

export const renderSeoHead = (language: Language, blogPage?: BlogPage) => {
  const portfolio = buildSeoDocument(language);
  const { blog, seo } = resources[language].translation;
  const post = blogPage?.post;
  const canonical = blogPage ? getBlogCanonicalUrl(language, post?.slug) : portfolio.canonical;
  const title = blogPage ? `${post?.title ?? blog.title} | ${seo.author}` : portfolio.title;
  const description = blogPage ? post?.description ?? blog.description : portfolio.standard.description;
  const alternates = blogPage ? getBlogAlternates(blogPage) : alternateUrls;
  const standard = {
    ...portfolio.standard,
    description,
    robots: blogPage && !isIndexableBlogPage(blogPage) ? "noindex,follow" : portfolio.standard.robots,
    "twitter:title": title,
    "twitter:description": description,
  };
  const { "og:locale:alternate": portfolioAlternate, ...openGraph } = portfolio.openGraph;
  const alternateLanguage = alternates.find(([code]) => code !== language && code !== "x-default")?.[0];
  const pageOpenGraph = {
    ...openGraph,
    "og:title": title,
    "og:description": description,
    "og:type": post ? "article" : openGraph["og:type"],
    "og:url": canonical,
    ...(blogPage
      ? alternateLanguage && { "og:locale:alternate": languages[alternateLanguage].locale }
      : { "og:locale:alternate": portfolioAlternate }),
    ...(post && { "article:published_time": post.date }),
  };
  const structuredData = blogPage ? buildBlogStructuredData(blogPage) : buildStructuredData(language);

  return [
    `<title data-portfolio-seo>${escapeHtml(title)}</title>`,
    ...Object.entries(standard).map(([name, value]) =>
      `<meta data-portfolio-seo name="${name}" content="${escapeHtml(value)}" />`),
    ...Object.entries(pageOpenGraph).map(([property, value]) =>
      `<meta data-portfolio-seo property="${property}" content="${escapeHtml(value)}" />`),
    `<link data-portfolio-seo rel="canonical" href="${canonical}" />`,
    ...alternates.map(([code, url]) =>
      `<link data-portfolio-seo rel="alternate" hreflang="${code}" href="${url}" />`),
    structuredData && `<script data-portfolio-seo type="application/ld+json">${JSON.stringify(structuredData).replace(/</g, "\\u003c")}</script>`,
  ].join("\n");
};
