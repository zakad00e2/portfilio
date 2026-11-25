import type { Language } from "@/i18n/locales";
import { isLanguage } from "@/i18n/locales";

export type BlogPost = {
  language: Language;
  slug: string;
  title: string;
  description: string;
  date: string;
  html: string;
};

export type BlogPage = { language: Language; post?: BlogPost };

const modules = import.meta.glob<BlogPost | null>("../../content/blog/{ar,en}/*.md", {
  eager: true,
  import: "default",
  query: "?portfolio-post",
});

export const blogPosts = Object.values(modules)
  .filter((post): post is BlogPost => post !== null)
  .sort((a, b) => b.date.localeCompare(a.date) || a.slug.localeCompare(b.slug));

export const getBlogPath = (language: Language, slug?: string) =>
  slug ? `/${language}/blog/${slug}` : `/${language}/blog`;

export const getBlogPosts = (language: Language) => blogPosts.filter((post) => post.language === language);

export const getBlogPost = (language: Language, slug: string) =>
  blogPosts.find((post) => post.language === language && post.slug === slug);

export const getBlogPage = (pathname: string): BlogPage | undefined => {
  const [, language, section, slug] = pathname.split("/");
  if (!isLanguage(language) || section !== "blog" || pathname !== getBlogPath(language, slug)) return;
  if (!slug) return { language };

  const post = getBlogPost(language, slug);
  if (post) return { language, post };
};
