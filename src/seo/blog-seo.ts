import { getBlogPath, getBlogPost, getBlogPosts, type BlogPage } from "@/blog/posts";
import { languageCodes, type Language } from "@/i18n/locales";
import { resources } from "@/i18n/resources";
import { getCanonicalUrl, siteOrigin } from "./site-seo";

export const getBlogCanonicalUrl = (language: Language, slug?: string) => `${siteOrigin}${getBlogPath(language, slug)}`;

export const isIndexableBlogPage = ({ language, post }: BlogPage) => Boolean(post || getBlogPosts(language).length);

export const getBlogAlternates = ({ post }: BlogPage) => {
  const available = languageCodes.filter((code) => post ? getBlogPost(code, post.slug) : getBlogPosts(code).length);
  return available.length > 1 ? available.map((code) => [code, getBlogCanonicalUrl(code, post?.slug)] as const) : [];
};

export const buildBlogStructuredData = ({ language, post }: BlogPage) => {
  if (!post) return undefined;

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    url: getBlogCanonicalUrl(language, post.slug),
    mainEntityOfPage: getBlogCanonicalUrl(language, post.slug),
    datePublished: post.date,
    inLanguage: language,
    author: { "@type": "Person", name: resources[language].translation.seo.author, url: getCanonicalUrl(language) },
  };
};
