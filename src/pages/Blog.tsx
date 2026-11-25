import { useEffect } from "react";
import { getBlogPath, getBlogPosts, type BlogPage } from "@/blog/posts";
import { LocalizedSeo } from "@/components/portfolio/LocalizedSeo";
import { buildLocalizedPath, setStoredLanguage } from "@/i18n/locales";
import { resources } from "@/i18n/resources";

const Blog = ({ page }: { page: BlogPage }) => {
  const { language, post } = page;
  const { blog, seo } = resources[language].translation;
  const posts = getBlogPosts(language);
  const dates = new Intl.DateTimeFormat(language === "ar" ? "ar" : "en", { dateStyle: "long", timeZone: "UTC" });
  const formatDate = (value: string) => dates.format(new Date(value));

  useEffect(() => setStoredLanguage(language), [language]);

  return (
    <div className="mx-auto min-h-screen max-w-3xl px-6 pb-24 sm:px-10">
      <LocalizedSeo blogPage={page} />
      <header className="sticky top-0 z-40 mb-14 flex flex-wrap items-center gap-x-6 gap-y-4 py-5 text-sm text-slate-light sm:mb-20">
        <div className="blog-header-blur" aria-hidden="true">
          <span /><span /><span /><span /><span />
        </div>
        <a
          className="inline-flex items-center gap-3 text-xl font-semibold hover:text-primary"
          href={buildLocalizedPath(language)}
          style={{ fontFeatureSettings: "'ss01', 'cv11'" }}
        >
          <img src="/images/zakaria-safi-color.png" alt="" width="40" height="40" className="h-10 w-10 rounded-lg object-cover" />
          {language === "ar" ? resources.ar.translation.hero.name.replace(/ـ+/g, "ـ") : seo.author}
        </a>
        <nav className="ms-auto flex flex-wrap gap-x-5 gap-y-2" aria-label={blog.title}>
          <a className="hover:text-primary" href={buildLocalizedPath(language)}>
            {blog.portfolio}
          </a>
        </nav>
      </header>

      <main>
        {post ? (
          <article>
            <h1 className="mb-5 break-words text-3xl font-bold leading-tight text-slate-light sm:text-4xl">{post.title}</h1>
            <p className="mb-4 text-base leading-relaxed text-slate-light">{post.description}</p>
            <p className="mb-10 flex flex-wrap gap-x-4 gap-y-2 text-sm text-slate">
              <a href={buildLocalizedPath(language)} className="hover:text-primary">{seo.author}</a>
              <time dateTime={post.date}>{formatDate(post.date)}</time>
            </p>
            <div
              className="overflow-x-auto break-words text-[0.9375rem] leading-loose text-slate-light [&>*+*]:mt-6 [&_a]:text-primary [&_a]:underline [&_blockquote]:border-s-2 [&_blockquote]:border-primary [&_blockquote]:ps-4 [&_h2]:pt-4 [&_h2]:text-2xl [&_h2]:font-bold [&_h3]:text-xl [&_h3]:font-semibold [&_img]:h-auto [&_img]:max-w-full [&_ol]:list-decimal [&_ol]:ps-6 [&_pre]:overflow-x-auto [&_pre]:bg-navy-light [&_pre]:p-4 [&_pre]:text-left [&_pre]:[direction:ltr] [&_td]:py-1 [&_td]:pe-4 [&_th]:pe-4 [&_th]:text-start [&_ul]:list-disc [&_ul]:ps-6"
              dangerouslySetInnerHTML={{ __html: post.html }}
            />
          </article>
        ) : (
          <>
            <h1 className="mb-5 text-4xl font-bold leading-tight text-slate-light sm:text-5xl">{blog.title}</h1>
            <p className="mb-12 max-w-xl text-base leading-relaxed text-slate-light">{blog.description}</p>
            {posts.length ? (
              <ul className="space-y-8">
                {posts.map((article) => (
                  <li key={article.slug}>
                    <article>
                      <h2 className="mb-2 break-words text-xl font-semibold leading-snug text-slate-light">
                        <a href={getBlogPath(language, article.slug)} className="hover:text-primary">{article.title}</a>
                      </h2>
                      <p className="mb-2 text-sm leading-relaxed text-slate-light">{article.description}</p>
                      <time dateTime={article.date} className="text-sm text-slate">{formatDate(article.date)}</time>
                    </article>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-slate">{blog.empty}</p>
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default Blog;
