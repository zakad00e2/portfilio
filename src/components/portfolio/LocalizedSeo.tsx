import { useEffect } from "react";
import { useLocale } from "@/hooks/use-locale";
import { renderSeoHead } from "@/seo/render-seo-head";
import { getCanonicalUrl } from "@/seo/site-seo";
import type { BlogPage } from "@/blog/posts";
import { getBlogCanonicalUrl } from "@/seo/blog-seo";

export const LocalizedSeo = ({ blogPage }: { blogPage?: BlogPage }) => {
  const { direction, language } = useLocale();

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = direction;
    document.body.removeAttribute("dir");

    const canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    const expectedUrl = blogPage ? getBlogCanonicalUrl(language, blogPage.post?.slug) : getCanonicalUrl(language);
    if (canonical?.href === expectedUrl) {
      return;
    }

    const template = document.createElement("template");
    template.innerHTML = renderSeoHead(language, blogPage);
    document.head.querySelectorAll("[data-portfolio-seo]").forEach((element) => element.remove());
    document.head.append(template.content);
  }, [blogPage, direction, language]);

  return null;
};
