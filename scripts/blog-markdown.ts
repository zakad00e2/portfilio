import { readFile } from "node:fs/promises";
import MarkdownIt from "markdown-it";
import type { Plugin } from "vite";
import { parse } from "yaml";
import { z } from "zod";

const markdown = new MarkdownIt({ html: false });

// The page supplies the article's H1 from the title in its front matter.
markdown.core.ruler.push("article-headings", ({ tokens }) => {
  for (const token of tokens) {
    if ((token.type === "heading_open" || token.type === "heading_close") && token.tag === "h1") {
      token.tag = "h2";
    }
  }
});

const date = z.string().regex(/^\d{4}-\d{2}-\d{2}$/).refine((value) => {
  const parsed = new Date(value);
  return !Number.isNaN(parsed.getTime()) && parsed.toISOString().slice(0, 10) === value;
}, "Expected a valid date in YYYY-MM-DD format");

const articleMetadata = z.object({
  title: z.string().trim().min(1),
  description: z.string().trim().min(1),
  date,
  draft: z.boolean().optional(),
}).strict();

export const blogMarkdown = (): Plugin => ({
  name: "portfolio-blog-markdown",
  async load(id) {
    const [filename, query] = id.split("?");
    if (!filename.endsWith(".md") || !new URLSearchParams(query).has("portfolio-post")) return;

    const relativePath = filename.match(/\/content\/blog\/(ar|en)\/([a-z0-9]+(?:-[a-z0-9]+)*)\.md$/);
    if (!relativePath) this.error(`Invalid blog file name: ${filename}. Use lowercase letters, digits and hyphens.`);

    this.addWatchFile(filename);
    const content = await readFile(filename, "utf8");
    const article = content.match(/^\uFEFF?---[ \t]*\r?\n([\s\S]*?)\r?\n---[ \t]*(?:\r?\n|$)([\s\S]*)$/);
    if (!article) this.error(`Missing YAML front matter in ${filename}`);

    try {
      const metadata = articleMetadata.parse(parse(article[1]));
      if (metadata.draft) return "export default null;";
      if (!article[2].trim()) this.error(`Missing article body in ${filename}`);

      const { title, description, date } = metadata;
      const [, language, slug] = relativePath;
      return `export default ${JSON.stringify({ title, description, date, language, slug, html: markdown.render(article[2]) })};`;
    } catch (error) {
      this.error(`Could not load blog article ${filename}: ${error instanceof Error ? error.message : String(error)}`);
    }
  },
});
