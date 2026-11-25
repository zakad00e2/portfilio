import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import { existsSync, readFileSync } from "node:fs";
import path from "path";
import type { ServerResponse } from "node:http";
import { componentTagger } from "lovable-tagger";
import { blogMarkdown } from "./scripts/blog-markdown";

type StaticRoute = {
  src?: string;
  dest?: string;
  status?: number;
  handle?: string;
  caseSensitive?: boolean;
  check?: boolean;
  headers?: Record<string, string>;
};

const previewRoutes = (): Plugin => ({
  name: "portfolio-preview-routes",
  configurePreviewServer(server) {
    const { root, build } = server.config;
    const { routes } = JSON.parse(readFileSync(path.join(root, "vercel.json"), "utf8")) as { routes: StaticRoute[] };
    const filesystemIndex = routes.findIndex(({ handle }) => handle === "filesystem");
    const rules = routes.slice(0, filesystemIndex).map((rule) => ({
      ...rule,
      pattern: new RegExp(`^${rule.src}$`, rule.caseSensitive ? "" : "i"),
    }));
    const sendNotFound = (response: ServerResponse) => {
      response.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
      response.end(readFileSync(path.resolve(root, build.outDir, "404.html")));
    };

    server.middlewares.use((request, response, next) => {
      const url = new URL(request.url ?? "/", "http://localhost");
      for (const { pattern, status, dest, headers, check } of rules) {
        const match = pattern.exec(url.pathname);
        if (!match) continue;

        const expand = (value: string) => value.replace(/\$(\d+)/g, (_, index) => match[Number(index)] ?? "");
        const destination = dest && expand(dest);
        if (check && destination && !existsSync(path.resolve(root, build.outDir, `.${destination}`))) continue;

        for (const [name, value] of Object.entries(headers ?? {})) response.setHeader(name, expand(value));
        if (status === 404) return sendNotFound(response);
        if (status) {
          response.writeHead(status).end();
          return;
        }
        if (destination) {
          request.url = `${destination}${url.search}`;
          break;
        }
      }
      next();
    });
    return () => server.middlewares.use((_request, response) => sendNotFound(response));
  },
});

export default defineConfig(({ mode, isSsrBuild, isPreview }) => ({
  appType: isPreview ? "mpa" : "spa",
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react(), blogMarkdown(), mode === "development" && componentTagger(), isPreview && previewRoutes()].filter(Boolean),
  ssr: { noExternal: ["gsap"] },
  build: { copyPublicDir: !isSsrBuild },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
