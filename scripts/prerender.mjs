import { mkdir, readFile, writeFile } from "node:fs/promises";
import { blogPosts, getBlogPath, languageCodes, renderPage, renderSitemap } from "../dist-ssr/entry-server.js";

const output = new URL("../dist/", import.meta.url);
const template = await readFile(new URL("index.html", output), "utf8");

const replaceRequired = (source, token, replacement) => {
  if (!source.includes(token)) {
    throw new Error(`Missing prerender template marker: ${token}`);
  }

  return source.replace(token, () => replacement);
};

const writePage = async (language, name, pathname) => {
  const { direction, headHtml, appHtml } = renderPage(language, pathname);
  let html = replaceRequired(template, '<html lang="en" dir="ltr">', `<html lang="${language}" dir="${direction}">`);
  html = replaceRequired(html, "<!--seo-head-->", headHtml);
  html = replaceRequired(html, '<div id="root"></div>', `<div id="root" data-language="${language}">${appHtml}</div>`);
  const destination = new URL(`${name}.html`, output);
  await mkdir(new URL(".", destination), { recursive: true });
  await writeFile(destination, html);
};

for (const language of languageCodes) {
  await writePage(language, language);
  const blogPath = getBlogPath(language);
  await writePage(language, blogPath.slice(1), blogPath);
}

for (const { language, slug } of blogPosts) {
  const postPath = getBlogPath(language, slug);
  await writePage(language, postPath.slice(1), postPath);
}

await writePage("en", "index", "/");
await writePage("en", "404", "/404.html");
await writeFile(new URL("sitemap.xml", output), renderSitemap());
