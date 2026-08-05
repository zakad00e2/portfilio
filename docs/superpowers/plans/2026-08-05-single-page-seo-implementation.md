# Single-Page SEO and Lead Generation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Turn the existing bilingual single-page portfolio into a crawlable, faster, service-focused site that attracts Arabic-speaking e-commerce, expert-portfolio, and corporate-website prospects and sends qualified leads to the existing WhatsApp link.

**Architecture:** Keep `/ar` and `/en` as the only canonical pages and add an in-page Services section backed by the existing i18n resources. Extract SEO and schema generation into pure functions shared by the browser and a small Vite SSR entry; a post-build script renders complete localized HTML into `dist/ar/index.html` and `dist/en/index.html`. Keep original PNG files as fallbacks while serving generated responsive WebP project previews from a shared asset manifest.

**Tech Stack:** React 18.3.1, TypeScript 5.8.3, Vite 5.4.19, React Router 6.30.1, i18next 26.0.8, Vitest, React DOM server rendering, Sharp, Vercel static routing.

## Global Constraints

- Keep the site as a single page per language. Do not create new service pages.
- Keep the existing WhatsApp link as the only WhatsApp call to action. Do not add or duplicate a WhatsApp button.
- Preserve the current visual identity, animation behavior, projects, and overall layout.
- Support Arabic and English, including correct `rtl` and `ltr` behavior.
- Target Arabic-speaking countries as a preferred service area without claiming a fixed business location.
- Implement exactly three services: e-commerce websites, professional portfolio websites for experts and service providers, and corporate or institutional websites.
- Do not invent business claims, a physical address, reviews, credentials, prices, or client results.
- Do not add `meta keywords` or keyword-stuffed copy.
- Keep `/ar` and `/en` as the only URLs in `sitemap.xml`.
- Existing section routes remain backward-compatible but canonicalize to their language homepage.
- The production build must contain complete localized body content and localized head metadata in the initial HTML for `/ar` and `/en`.

## File Map

### Create

- `src/data/project-assets.json` — one source of truth for original project image filenames and intrinsic dimensions.
- `src/data/project-assets.ts` — typed browser helpers for the JSON image manifest and generated WebP URLs.
- `src/components/portfolio/Services.tsx` — the bilingual in-page services section and related-project links.
- `src/components/portfolio/Services.test.tsx` — static-render tests for the section in both languages.
- `src/components/portfolio/Projects.test.tsx` — responsive, localized project-image markup tests.
- `src/i18n/locales.test.ts` — URL, hash, and canonical-section behavior tests.
- `src/i18n/resources.test.ts` — service/project ID consistency and copy-presence tests.
- `src/seo/site-seo.ts` — site constants and localized SEO document model.
- `src/seo/site-seo.test.ts` — canonical, alternate, and localized metadata tests.
- `src/seo/structured-data.ts` — factual localized JSON-LD graph builder.
- `src/seo/structured-data.test.ts` — schema entity and forbidden-claim tests.
- `src/seo/render-seo-head.ts` — escaped static head markup generator.
- `src/entry-server.tsx` — Vite SSR entry returning localized body and head strings.
- `src/entry-server.test.tsx` — Arabic and English server-render tests.
- `src/seo/static-assets.test.ts` — sitemap and robots assertions.
- `scripts/prerender.mjs` — post-build localized HTML writer.
- `scripts/verify-seo-build.mjs` — fail-fast production HTML verifier.
- `scripts/optimize-project-images.mjs` — deterministic 480 px and 960 px WebP generator.
- `public/sitemap.xml` — two-language canonical sitemap with alternates.
- `public/images/projects/<project-id>-480.webp` — generated small project previews.
- `public/images/projects/<project-id>-960.webp` — generated large project previews.
- `docs/seo-search-console.md` — deployment and sitemap-submission checklist.

### Modify

- `package.json` and `package-lock.json` — add test/image tooling and build pipeline scripts.
- `tsconfig.app.json` — enable typed JSON imports.
- `src/i18n/locales.ts` — add `services` and hash URL helpers.
- `src/i18n/resources.ts` — localized services, SEO copy, image alt template, and stable project IDs.
- `src/components/portfolio/Projects.tsx` — stable anchors, localized alt text, dimensions, and responsive images.
- `src/components/portfolio/Navigation.tsx` — add Services and use in-page hash links.
- `src/components/portfolio/Hero.tsx` — replace the section route link with a same-page anchor and lazy-load GSAP in the effect.
- `src/components/portfolio/LanguageSwitcher.tsx` — preserve the active section as a hash when switching language.
- `src/components/portfolio/MouseFollower.tsx` — lazy-load GSAP inside the effect for SSR safety.
- `src/hooks/use-gsap-reveal.ts` — lazy-load GSAP and ScrollTrigger inside the effect for SSR safety.
- `src/pages/Index.tsx` — render Services and resolve initial scrolling from route aliases or hashes.
- `src/components/portfolio/LocalizedSeo.tsx` — consume shared SEO/schema builders and canonicalize aliases.
- `src/App.tsx` — export router-independent providers and routes for client and server entries.
- `src/main.tsx` — hydrate prerendered HTML instead of replacing it.
- `index.html` — add replaceable SEO markers and a production-safe English fallback head.
- `public/robots.txt` — declare the sitemap.
- `vercel.json` — serve localized prerendered HTML for language routes and aliases.

---

### Task 1: Add the Test Harness and Canonical Hash Helpers

**Files:**

- Modify: `package.json`
- Modify: `package-lock.json`
- Modify: `src/i18n/locales.ts`
- Create: `src/i18n/locales.test.ts`

**Interfaces:**

- Produces: `getSectionFromHash(hash: string): SectionSlug | null`
- Produces: `buildLocalizedHashPath(language: Language, section?: SectionSlug | null): string`
- Produces: `SectionSlug` containing `"about" | "services" | "experience" | "projects"`
- Consumes: existing `Language`, `buildLocalizedPath`, and route parsing helpers.

- [ ] **Step 1: Install only the test and image-build dependencies needed by this plan**

Run:

```powershell
npm install --save-dev vitest sharp
```

Expected: `package.json` and `package-lock.json` record `vitest` and `sharp`; no production dependency changes.

- [ ] **Step 2: Add repeatable test scripts**

Change `package.json` scripts to include:

```json
{
  "test": "vitest run",
  "test:watch": "vitest"
}
```

Keep the existing `dev`, `lint`, `build:dev`, and `preview` scripts unchanged in this task.

- [ ] **Step 3: Write the failing locale/hash tests**

Create `src/i18n/locales.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import {
  buildLocalizedHashPath,
  getSectionFromHash,
  sections,
} from "./locales";

describe("localized section hashes", () => {
  it("includes the approved services section in page order", () => {
    expect(sections).toEqual(["about", "services", "experience", "projects"]);
  });

  it("parses only known section hashes", () => {
    expect(getSectionFromHash("#services")).toBe("services");
    expect(getSectionFromHash("#unknown")).toBeNull();
    expect(getSectionFromHash("")).toBeNull();
  });

  it("builds language home URLs with optional anchors", () => {
    expect(buildLocalizedHashPath("ar", "services")).toBe("/ar#services");
    expect(buildLocalizedHashPath("en", null)).toBe("/en");
  });
});
```

- [ ] **Step 4: Run the test to prove the API is missing**

Run:

```powershell
npm test -- src/i18n/locales.test.ts
```

Expected: FAIL because `getSectionFromHash`, `buildLocalizedHashPath`, and the `services` section do not exist.

- [ ] **Step 5: Implement the smallest locale/hash API**

Modify `src/i18n/locales.ts`:

```ts
export const sections = ["about", "services", "experience", "projects"] as const;

export const getSectionFromHash = (hash: string): SectionSlug | null => {
  const value = hash.replace(/^#/, "");
  return isSectionSlug(value) ? value : null;
};

export const buildLocalizedHashPath = (
  language: Language,
  section?: SectionSlug | null,
) => `${buildLocalizedPath(language)}${section ? `#${section}` : ""}`;
```

- [ ] **Step 6: Run tests and lint**

Run:

```powershell
npm test -- src/i18n/locales.test.ts
npm run lint
```

Expected: locale tests PASS; lint exits 0 with only the seven existing `react-refresh/only-export-components` warnings from `src/components/ui`.

- [ ] **Step 7: Commit the test foundation**

```powershell
git add package.json package-lock.json src/i18n/locales.ts src/i18n/locales.test.ts
git commit -m "test: add SEO workflow test foundation"
```

---

### Task 2: Add Stable Project Identity and Approved Bilingual Content

**Files:**

- Create: `src/data/project-assets.json`
- Create: `src/data/project-assets.ts`
- Create: `src/i18n/resources.test.ts`
- Modify: `src/i18n/resources.ts`
- Modify: `tsconfig.app.json`

**Interfaces:**

- Produces: `ProjectId`, the keys of `project-assets.json`.
- Produces: `projectAssets: Record<ProjectId, { src: string; width: number; height: number }>`.
- Produces: `getProjectWebpSrcSet(id: ProjectId): string`.
- Produces: translation shape `services.items[] = { id, title, description, exampleProjectIds }`.
- Produces: every `projects.items[]` entry with a stable `id: ProjectId` and no localized image path.

- [ ] **Step 1: Create the failing resource consistency test**

Create `src/i18n/resources.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import assets from "@/data/project-assets.json";
import { resources } from "./resources";

const approvedServiceIds = ["ecommerce", "expert-portfolio", "corporate"];

describe.each(["en", "ar"] as const)("%s resources", (language) => {
  const translation = resources[language].translation;

  it("contains exactly the approved services", () => {
    expect(translation.services.items.map((service) => service.id)).toEqual(
      approvedServiceIds,
    );
  });

  it("uses unique project IDs backed by the asset manifest", () => {
    const ids = translation.projects.items.map((project) => project.id);
    expect(new Set(ids).size).toBe(ids.length);
    expect(ids.every((id) => id in assets)).toBe(true);
  });

  it("references only projects that exist in the same locale", () => {
    const ids = new Set(translation.projects.items.map((project) => project.id));
    for (const service of translation.services.items) {
      expect(service.exampleProjectIds.every((id) => ids.has(id))).toBe(true);
    }
  });
});
```

- [ ] **Step 2: Run the test to verify the data contract is absent**

Run:

```powershell
npm test -- src/i18n/resources.test.ts
```

Expected: FAIL because the asset manifest, service content, and project IDs do not exist.

- [ ] **Step 3: Create the exact shared project asset manifest**

Create `src/data/project-assets.json` with this mapping:

```json
{
  "besan-khalaily": { "src": "/besan-khalaily.png", "width": 1897, "height": 1078 },
  "safi-cashier": { "src": "/safi-cashier.png", "width": 1897, "height": 1079 },
  "pelmatech": { "src": "/pelmatech.png", "width": 1901, "height": 858 },
  "athr": { "src": "/athr.png", "width": 1896, "height": 1079 },
  "oday-tourism": { "src": "/oday-tourism.png", "width": 1896, "height": 856 },
  "architectural-portfolio": { "src": "/architectural-portfolio.png", "width": 1877, "height": 847 },
  "vantage-tech": { "src": "/vantage-tech.png", "width": 1024, "height": 579 },
  "maisam": { "src": "/Screenshot 2026-02-11 231128.png", "width": 1893, "height": 1074 },
  "sakan-gaza": { "src": "/Screenshot 2026-02-11 225245.png", "width": 1887, "height": 862 },
  "marketpro": { "src": "/market.png", "width": 1897, "height": 866 },
  "elara": { "src": "/stayle.png", "width": 1892, "height": 863 },
  "artist-lens-hub": { "src": "/art.png", "width": 1895, "height": 863 },
  "vertex-ai": { "src": "/Screenshot 2025-12-01 122458.png", "width": 1900, "height": 868 },
  "digital-library": { "src": "/1.png", "width": 1916, "height": 875 },
  "dashboard": { "src": "/2.png", "width": 1918, "height": 866 },
  "tshtri": { "src": "/3.png", "width": 1673, "height": 858 }
}
```

Set `"resolveJsonModule": true` in `tsconfig.app.json`, then create `src/data/project-assets.ts`:

```ts
import assets from "./project-assets.json";

export type ProjectId = keyof typeof assets;
export const projectAssets = assets;

export const getProjectWebpSrcSet = (id: ProjectId) =>
  `/images/projects/${id}-480.webp 480w, /images/projects/${id}-960.webp 960w`;
```

- [ ] **Step 4: Add exact bilingual SEO and Services copy**

In `src/i18n/resources.ts`, replace the English SEO block with:

```ts
seo: {
  title: "Zakaria Safi | E-commerce, Corporate & Portfolio Websites",
  description:
    "Web developer building fast, professional e-commerce, corporate, and portfolio websites for businesses, experts, and service providers in Arabic and English.",
  author: "Zakaria Safi",
  siteName: "Zakaria Safi Web Development",
  imageAlt: "Zakaria Safi web development portfolio",
},
```

Add the English navigation and Services strings:

```ts
navigation: {
  ariaLabel: "In-page navigation",
  about: "ABOUT",
  services: "SERVICES",
  experience: "EXPERIENCE",
  projects: "PROJECTS",
},
services: {
  sectionTitle: "Services",
  examplesLabel: "Selected work",
  items: [
    {
      id: "ecommerce",
      title: "E-commerce Website Development",
      description:
        "I build fast, responsive online stores that help customers discover products, complete purchases, and trust your brand. Each store is shaped around the products, sales flow, and management needs of the business.",
      exampleProjectIds: ["marketpro", "elara"],
    },
    {
      id: "expert-portfolio",
      title: "Professional Portfolio Websites",
      description:
        "I create focused portfolio websites for experts and service providers that present their expertise, services, and work clearly, helping potential clients understand their value and contact them with confidence.",
      exampleProjectIds: ["besan-khalaily", "architectural-portfolio"],
    },
    {
      id: "corporate",
      title: "Corporate and Institutional Websites",
      description:
        "I develop credible corporate websites that explain what a company does, present its services and work, and give prospective clients a clear path to learn more and get in touch.",
      exampleProjectIds: ["vantage-tech", "pelmatech"],
    },
  ],
},
```

Replace the Arabic SEO block and add the Arabic navigation and Services strings:

```ts
seo: {
  title: "زكريا صافي | تطوير متاجر ومواقع شركات وبورتفوليو",
  description:
    "مطور ويب يساعد المتاجر والشركات والخبراء على بناء مواقع سريعة واحترافية: متاجر إلكترونية، مواقع شركات، ومواقع بورتفوليو بالعربية والإنجليزية.",
  author: "زكريا صافي",
  siteName: "زكريا صافي لتطوير الويب",
  imageAlt: "معرض أعمال زكريا صافي في تطوير مواقع الويب",
},
navigation: {
  ariaLabel: "التنقل داخل الصفحة",
  about: "نبذة عني",
  services: "الخدمات",
  experience: "الخبرة",
  projects: "المشاريع",
},
services: {
  sectionTitle: "الخدمات",
  examplesLabel: "نماذج مختارة",
  items: [
    {
      id: "ecommerce",
      title: "تطوير المتاجر الإلكترونية",
      description:
        "أطوّر متاجر إلكترونية سريعة ومتجاوبة تساعد العملاء على اكتشاف المنتجات وإتمام الشراء والثقة بعلامتك. يُبنى كل متجر بما يناسب المنتجات ومسار البيع واحتياجات الإدارة الخاصة بالمشروع.",
      exampleProjectIds: ["marketpro", "elara"],
    },
    {
      id: "expert-portfolio",
      title: "إنشاء مواقع بورتفوليو احترافية",
      description:
        "أبني مواقع بورتفوليو مركّزة للخبراء ومقدمي الخدمات، تعرض الخبرة والخدمات والأعمال بوضوح، وتساعد العميل المحتمل على فهم القيمة والتواصل بثقة.",
      exampleProjectIds: ["besan-khalaily", "architectural-portfolio"],
    },
    {
      id: "corporate",
      title: "تطوير مواقع الشركات والمؤسسات",
      description:
        "أطوّر مواقع موثوقة للشركات توضّح نشاطها وتعرض خدماتها وأعمالها، وتمنح العملاء المحتملين مسارًا واضحًا للتعرّف عليها والتواصل معها.",
      exampleProjectIds: ["vantage-tech", "pelmatech"],
    },
  ],
},
```

Add `projects.imageAlt` in both languages:

```ts
// English
imageAlt: "Preview of the {{title}} web project",

// Arabic
imageAlt: "معاينة لمشروع الويب {{title}}",
```

- [ ] **Step 5: Replace localized image fields with stable project IDs**

For both `projects.items` arrays, remove each `image` property and add the corresponding `id` using this exact title mapping:

| English title | Arabic title | ID |
|---|---|---|
| Besan Khalaily | بيسان خلايلي | `besan-khalaily` |
| Safi Cashier | صافي كاشير | `safi-cashier` |
| Pelmatech | Pelmatech | `pelmatech` |
| Athr | أثر | `athr` |
| Oday Tourism | عدي للسياحة | `oday-tourism` |
| Architectural Portfolio | معرض أعمال معماري | `architectural-portfolio` |
| Vantage Tech | فانتج تك | `vantage-tech` |
| Maisam | ميسم | `maisam` |
| SakanGaza | سكن غزة | `sakan-gaza` |
| MarketPro | MarketPro | `marketpro` |
| ELARA - Timeless Fashion & Conscious Design. | إيلارا - أزياء خالدة وتصميم واع | `elara` |
| Artist Lens Hub | Artist Lens Hub | `artist-lens-hub` |
| Vertex AI | Vertex AI | `vertex-ai` |
| Digital Library | المكتبة الرقمية | `digital-library` |
| Dashboard | لوحة تحكم | `dashboard` |
| Tshtri | Tshtri | `tshtri` |

- [ ] **Step 6: Run the resource tests**

Run:

```powershell
npm test -- src/i18n/resources.test.ts
```

Expected: all resource consistency tests PASS.

- [ ] **Step 7: Commit the content model**

```powershell
git add tsconfig.app.json src/data/project-assets.json src/data/project-assets.ts src/i18n/resources.ts src/i18n/resources.test.ts
git commit -m "feat: add bilingual service content model"
```

---

### Task 3: Render Services and Convert Section Navigation to Anchors

**Files:**

- Create: `src/components/portfolio/Services.tsx`
- Create: `src/components/portfolio/Services.test.tsx`
- Modify: `src/components/portfolio/Projects.tsx`
- Modify: `src/components/portfolio/Navigation.tsx`
- Modify: `src/components/portfolio/Hero.tsx`
- Modify: `src/components/portfolio/LanguageSwitcher.tsx`
- Modify: `src/pages/Index.tsx`

**Interfaces:**

- Consumes: `ProjectId`, `projectAssets`, `getProjectWebpSrcSet`, `getSectionFromHash`, and `buildLocalizedHashPath`.
- Produces: `<Services />` with `section#services`, three `h3` headings, and links to `#project-<id>`.
- Produces: project anchors named `project-<ProjectId>`.

- [ ] **Step 1: Write the failing static-render test**

Create `src/components/portfolio/Services.test.tsx` using an isolated i18next instance:

```tsx
import { createInstance } from "i18next";
import { renderToStaticMarkup } from "react-dom/server";
import { I18nextProvider, initReactI18next } from "react-i18next";
import { describe, expect, it } from "vitest";
import { resources } from "@/i18n/resources";
import { Services } from "./Services";

const renderServices = async (language: "ar" | "en") => {
  const instance = createInstance();
  await instance.use(initReactI18next).init({
    resources,
    lng: language,
    fallbackLng: "en",
    interpolation: { escapeValue: false },
  });
  return renderToStaticMarkup(
    <I18nextProvider i18n={instance}>
      <Services />
    </I18nextProvider>,
  );
};

describe("Services", () => {
  it("renders exactly three English services with project anchors", async () => {
    const html = await renderServices("en");
    expect(html.match(/<h3/g)).toHaveLength(3);
    expect(html).toContain("E-commerce Website Development");
    expect(html).toContain('href="#project-marketpro"');
  });

  it("renders the approved Arabic corporate service", async () => {
    const html = await renderServices("ar");
    expect(html).toContain("تطوير مواقع الشركات والمؤسسات");
    expect(html).toContain('href="#project-vantage-tech"');
  });
});
```

- [ ] **Step 2: Run the component test to verify it fails**

Run:

```powershell
npm test -- src/components/portfolio/Services.test.tsx
```

Expected: FAIL because `Services.tsx` does not exist.

- [ ] **Step 3: Implement the focused Services component**

Create `src/components/portfolio/Services.tsx` with these types and structure:

```tsx
import { useTranslation } from "react-i18next";
import type { ProjectId } from "@/data/project-assets";

type Service = {
  id: "ecommerce" | "expert-portfolio" | "corporate";
  title: string;
  description: string;
  exampleProjectIds: ProjectId[];
};

type ProjectSummary = { id: ProjectId; title: string };

export const Services = () => {
  const { t } = useTranslation();
  const services = t("services.items", { returnObjects: true }) as Service[];
  const projects = t("projects.items", { returnObjects: true }) as ProjectSummary[];
  const titleById = new Map(projects.map((project) => [project.id, project.title]));

  return (
    <section id="services" className="mb-16 scroll-mt-16 lg:mb-36">
      <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-background/75 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
        <h2 className="section-heading">{t("services.sectionTitle")}</h2>
      </div>
      <div className="space-y-10">
        {services.map((service) => (
          <article key={service.id} data-gsap-reveal>
            <h3 className="text-base font-medium text-slate-light">{service.title}</h3>
            <p className="mt-2 leading-relaxed text-slate">{service.description}</p>
            <p className="mt-3 text-sm text-slate">
              <span>{t("services.examplesLabel")}: </span>
              {service.exampleProjectIds.map((id, index) => (
                <span key={id}>
                  {index > 0 ? ", " : null}
                  <a className="text-primary hover:underline" href={`#project-${id}`}>
                    {titleById.get(id)}
                  </a>
                </span>
              ))}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
};
```

Do not add a WhatsApp element to this component.

- [ ] **Step 4: Wire Services into the existing single page**

In `src/pages/Index.tsx`, import `Services` and render it exactly between `<About />` and `<Experience />`.

Resolve the scroll target with:

```ts
const routeSection = isSectionSlug(section) ? section : null;
const hashSection = getSectionFromHash(location.hash);
const targetSection = routeSection ?? hashSection;
```

Make the existing scroll effect depend on `targetSection` and `location.hash`. Keep route aliases working.

- [ ] **Step 5: Use same-page anchors for all new navigation**

In `src/components/portfolio/Navigation.tsx`:

```ts
const navItems: SectionSlug[] = ["about", "services", "experience", "projects"];
```

Replace each navigation `<button>` with:

```tsx
<a
  href={`#${item}`}
  aria-current={activeSection === item ? "location" : undefined}
  className="group flex items-center gap-4 transition-all duration-200"
>
  <span
    className={`h-px transition-all duration-200 ${
      activeSection === item
        ? "w-16 bg-slate-light"
        : "w-8 bg-slate group-hover:w-16 group-hover:bg-slate-light"
    }`}
  />
  <span
    className={`nav-link-text ${
      activeSection === item
        ? "text-slate-light"
        : "text-slate group-hover:text-slate-light"
    }`}
  >
    {t(`navigation.${item}`)}
  </span>
</a>
```

Remove `useNavigate`, `useLocation`, `buildLocalizedPath`, `scrollToSection`, and `navigateToSection` from this component. Native anchor scrolling uses the existing `scroll-behavior: smooth` rule and section `scroll-mt-16` classes.

In `src/components/portfolio/Hero.tsx`, replace the name's React Router `<Link>` with `<a href="#about">` while retaining all existing class, direction, language, and typography properties.

- [ ] **Step 6: Preserve the active anchor when switching languages**

In `src/components/portfolio/LanguageSwitcher.tsx`, choose the section from the hash first, then a backward-compatible route alias:

```ts
const section = getSectionFromHash(location.hash) ?? getSectionFromPath(location.pathname);
```

Use `to={buildLocalizedHashPath(code, section)}` for each language link.

- [ ] **Step 7: Give projects stable link targets and responsive-ready markup**

Change the local `Project` type in `src/components/portfolio/Projects.tsx` to include `id: ProjectId` and remove `image`. Add `id={`project-${project.id}`}` and `scroll-mt-20` to each project `<li>`. Read the fallback asset from `projectAssets[project.id]` and, temporarily in this task, render:

```tsx
<img
  src={asset.src}
  alt={t("projects.imageAlt", { title: project.title })}
  width={asset.width}
  height={asset.height}
  loading="lazy"
  decoding="async"
  className="rounded border-2 border-slate/10 transition group-hover:border-slate/30 sm:order-1 sm:col-span-2 sm:translate-y-1"
/>
```

- [ ] **Step 8: Run focused tests, lint, and build**

Run:

```powershell
npm test -- src/components/portfolio/Services.test.tsx src/i18n/locales.test.ts src/i18n/resources.test.ts
npm run lint
npm run build
```

Expected: all focused tests PASS; lint exits 0 with the existing seven warnings; the Vite build succeeds.

- [ ] **Step 9: Commit the single-page service experience**

```powershell
git add src/components/portfolio/Services.tsx src/components/portfolio/Services.test.tsx src/components/portfolio/Projects.tsx src/components/portfolio/Navigation.tsx src/components/portfolio/Hero.tsx src/components/portfolio/LanguageSwitcher.tsx src/pages/Index.tsx
git commit -m "feat: add single-page services section"
```

---

### Task 4: Centralize Canonical Metadata and Factual Structured Data

**Files:**

- Create: `src/seo/site-seo.ts`
- Create: `src/seo/site-seo.test.ts`
- Create: `src/seo/structured-data.ts`
- Create: `src/seo/structured-data.test.ts`
- Create: `src/seo/render-seo-head.ts`
- Modify: `src/components/portfolio/LocalizedSeo.tsx`

**Interfaces:**

- Produces: `SITE_URL = "https://zakariasafi.me"`.
- Produces: `buildSeoDocument(language: Language): SeoDocument`.
- Produces: `buildStructuredData(language: Language): Record<string, unknown>`.
- Produces: `renderSeoHead(language: Language): string`.
- Consumes: localized `resources[language].translation.seo` and `services.items`.

- [ ] **Step 1: Write failing metadata tests**

Create `src/seo/site-seo.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import { buildSeoDocument } from "./site-seo";

describe("buildSeoDocument", () => {
  it("canonicalizes Arabic aliases to the Arabic homepage", () => {
    const seo = buildSeoDocument("ar");
    expect(seo.canonicalUrl).toBe("https://zakariasafi.me/ar");
    expect(seo.alternates).toEqual({
      ar: "https://zakariasafi.me/ar",
      en: "https://zakariasafi.me/en",
      "x-default": "https://zakariasafi.me/en",
    });
  });

  it("uses localized service-focused metadata", () => {
    expect(buildSeoDocument("ar").title).toContain("متاجر");
    expect(buildSeoDocument("en").description).toContain("corporate");
  });
});
```

Create `src/seo/structured-data.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import { buildStructuredData } from "./structured-data";

describe("buildStructuredData", () => {
  it("describes one profile, person, website, and exactly three offers", () => {
    const graph = buildStructuredData("en")["@graph"] as Array<Record<string, unknown>>;
    expect(graph.map((entity) => entity["@type"])).toEqual([
      "WebSite",
      "Person",
      "ProfilePage",
    ]);
    const person = graph[1];
    expect(person.makesOffer).toHaveLength(3);
  });

  it("contains no fabricated local-business or rating claims", () => {
    const json = JSON.stringify(buildStructuredData("ar"));
    expect(json).not.toContain("LocalBusiness");
    expect(json).not.toContain("aggregateRating");
    expect(json).not.toContain("postalCode");
  });
});
```

- [ ] **Step 2: Run the tests to verify the builders are absent**

Run:

```powershell
npm test -- src/seo/site-seo.test.ts src/seo/structured-data.test.ts
```

Expected: FAIL because the SEO modules do not exist.

- [ ] **Step 3: Implement the canonical SEO document builder**

Create `src/seo/site-seo.ts` with this public shape:

```ts
import { resources } from "@/i18n/resources";
import { languages, type Language } from "@/i18n/locales";

export const SITE_URL = "https://zakariasafi.me";
export const OG_IMAGE_URL = `${SITE_URL}/og-preview.png`;

export type SeoDocument = {
  language: Language;
  direction: "ltr" | "rtl";
  locale: string;
  alternateLocale: string;
  title: string;
  description: string;
  author: string;
  siteName: string;
  imageAlt: string;
  canonicalUrl: string;
  alternates: Record<"ar" | "en" | "x-default", string>;
};

export const buildSeoDocument = (language: Language): SeoDocument => {
  const seo = resources[language].translation.seo;
  const otherLanguage = language === "ar" ? "en" : "ar";
  return {
    language,
    direction: languages[language].dir,
    locale: languages[language].locale,
    alternateLocale: languages[otherLanguage].locale,
    ...seo,
    canonicalUrl: `${SITE_URL}/${language}`,
    alternates: {
      ar: `${SITE_URL}/ar`,
      en: `${SITE_URL}/en`,
      "x-default": `${SITE_URL}/en`,
    },
  };
};
```

- [ ] **Step 4: Implement factual JSON-LD**

Create `src/seo/structured-data.ts`. Build an `@graph` in this exact order:

```ts
[
  {
    "@type": "WebSite",
    "@id": "https://zakariasafi.me/#website",
    url: "https://zakariasafi.me",
    name: localizedSeo.siteName,
    inLanguage: ["ar", "en"],
  },
  {
    "@type": "Person",
    "@id": "https://zakariasafi.me/#person",
    name: localizedSeo.author,
    url: localizedSeo.canonicalUrl,
    image: "https://zakariasafi.me/og-preview.png",
    description: localizedSeo.description,
    sameAs: [
      "https://github.com/zakad00e2",
      "https://www.linkedin.com/in/zakariasafi/",
      "https://x.com/Zakariaweb1"
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      telephone: "+972597986160",
      availableLanguage: ["Arabic", "English"]
    },
    makesOffer: services.map((service) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: service.title,
        description: service.description,
        areaServed: {
          "@type": "Place",
          name: language === "ar" ? "الدول العربية" : "Arabic-speaking countries"
        }
      }
    }))
  },
  {
    "@type": "ProfilePage",
    "@id": `${localizedSeo.canonicalUrl}#profile`,
    url: localizedSeo.canonicalUrl,
    name: localizedSeo.title,
    description: localizedSeo.description,
    inLanguage: language,
    isPartOf: { "@id": "https://zakariasafi.me/#website" },
    mainEntity: { "@id": "https://zakariasafi.me/#person" }
  }
]
```

Return `{ "@context": "https://schema.org", "@graph": graph }`.

- [ ] **Step 5: Render safely escaped static head markup**

Create `src/seo/render-seo-head.ts`:

```ts
import type { Language } from "@/i18n/locales";
import { buildSeoDocument, OG_IMAGE_URL } from "./site-seo";
import { buildStructuredData } from "./structured-data";

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

const escapeJsonForHtml = (value: unknown) =>
  JSON.stringify(value).replace(/</g, "\\u003c");

export const renderSeoHead = (language: Language) => {
  const seo = buildSeoDocument(language);
  const attribute = (value: string) => escapeHtml(value);
  return [
    `<title>${escapeHtml(seo.title)}</title>`,
    `<meta name="description" content="${attribute(seo.description)}" />`,
    `<meta name="author" content="${attribute(seo.author)}" />`,
    `<link rel="canonical" href="${seo.canonicalUrl}" />`,
    `<link rel="alternate" hreflang="ar" href="${seo.alternates.ar}" />`,
    `<link rel="alternate" hreflang="en" href="${seo.alternates.en}" />`,
    `<link rel="alternate" hreflang="x-default" href="${seo.alternates["x-default"]}" />`,
    `<meta property="og:title" content="${attribute(seo.title)}" />`,
    `<meta property="og:description" content="${attribute(seo.description)}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:locale" content="${seo.locale}" />`,
    `<meta property="og:locale:alternate" content="${seo.alternateLocale}" />`,
    `<meta property="og:site_name" content="${attribute(seo.siteName)}" />`,
    `<meta property="og:url" content="${seo.canonicalUrl}" />`,
    `<meta property="og:image" content="${OG_IMAGE_URL}" />`,
    `<meta property="og:image:type" content="image/png" />`,
    `<meta property="og:image:width" content="1201" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:image:alt" content="${attribute(seo.imageAlt)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${attribute(seo.title)}" />`,
    `<meta name="twitter:description" content="${attribute(seo.description)}" />`,
    `<meta name="twitter:image" content="${OG_IMAGE_URL}" />`,
    `<meta name="twitter:image:alt" content="${attribute(seo.imageAlt)}" />`,
    `<script id="site-structured-data" type="application/ld+json">${escapeJsonForHtml(buildStructuredData(language))}</script>`,
  ].join("\n");
};
```

This keeps the existing `1201 × 630` Open Graph dimensions.

- [ ] **Step 6: Make runtime SEO consume the same data**

Refactor `src/components/portfolio/LocalizedSeo.tsx` so its effect builds one canonical model independent of the current section alias:

```ts
useEffect(() => {
  const seo = buildSeoDocument(language);
  const schema = buildStructuredData(language);
  document.documentElement.lang = language;
  document.documentElement.dir = seo.direction;
  document.body.dir = seo.direction;
  document.title = seo.title;

  setMetaTag("name", "description", seo.description);
  setMetaTag("name", "author", seo.author);
  setMetaTag("property", "og:title", seo.title);
  setMetaTag("property", "og:description", seo.description);
  setMetaTag("property", "og:type", "website");
  setMetaTag("property", "og:locale", seo.locale);
  setMetaTag("property", "og:locale:alternate", seo.alternateLocale);
  setMetaTag("property", "og:site_name", seo.siteName);
  setMetaTag("property", "og:url", seo.canonicalUrl);
  setMetaTag("property", "og:image", OG_IMAGE_URL);
  setMetaTag("property", "og:image:alt", seo.imageAlt);
  setMetaTag("name", "twitter:card", "summary_large_image");
  setMetaTag("name", "twitter:title", seo.title);
  setMetaTag("name", "twitter:description", seo.description);
  setMetaTag("name", "twitter:image", OG_IMAGE_URL);
  setMetaTag("name", "twitter:image:alt", seo.imageAlt);
  setLinkTag("canonical", seo.canonicalUrl);
  setLinkTag("alternate", seo.alternates.ar, "ar");
  setLinkTag("alternate", seo.alternates.en, "en");
  setLinkTag("alternate", seo.alternates["x-default"], "x-default");

  let script = document.getElementById("site-structured-data") as HTMLScriptElement | null;
  if (!script) {
    script = document.createElement("script");
    script.id = "site-structured-data";
    script.type = "application/ld+json";
    document.head.appendChild(script);
  }
  script.textContent = JSON.stringify(schema);
}, [language]);
```

Remove `window.location.origin`, `buildLocalizedPath`, and `getSectionFromPath` from this component. Keep `document.documentElement.lang`, `dir`, and `document.body.dir` updates.

- [ ] **Step 7: Run focused tests**

Run:

```powershell
npm test -- src/seo/site-seo.test.ts src/seo/structured-data.test.ts
```

Expected: all SEO and structured-data tests PASS.

- [ ] **Step 8: Commit the SEO model**

```powershell
git add src/seo src/components/portfolio/LocalizedSeo.tsx
git commit -m "feat: centralize localized SEO metadata"
```

---

### Task 5: Make the App Server-Renderable Without Changing Animation Behavior

**Files:**

- Create: `src/entry-server.tsx`
- Create: `src/entry-server.test.tsx`
- Modify: `src/App.tsx`
- Modify: `src/main.tsx`
- Modify: `src/components/portfolio/Hero.tsx`
- Modify: `src/components/portfolio/MouseFollower.tsx`
- Modify: `src/hooks/use-gsap-reveal.ts`

**Interfaces:**

- Produces: `AppProviders({ children }: PropsWithChildren)`.
- Produces: `AppRoutes()` independent of router implementation.
- Produces: `renderPage(url: string, language: Language): Promise<{ appHtml: string; headHtml: string }>`.
- Consumes: `renderSeoHead(language)` and initialized i18n.

- [ ] **Step 1: Write the failing server-render test**

Create `src/entry-server.test.tsx`:

```tsx
import { describe, expect, it } from "vitest";
import { renderPage } from "./entry-server";

describe("renderPage", () => {
  it("renders complete Arabic service content and Arabic head metadata", async () => {
    const page = await renderPage("/ar", "ar");
    expect(page.appHtml).toContain("تطوير المتاجر الإلكترونية");
    expect(page.appHtml).toContain('id="services"');
    expect(page.appHtml.match(/<h1/g)).toHaveLength(1);
    expect(page.headHtml).toContain('href="https://zakariasafi.me/ar"');
    expect(page.headHtml).toContain('type="application/ld+json"');
  });

  it("renders English content without a browser global", async () => {
    const page = await renderPage("/en", "en");
    expect(page.appHtml).toContain("Corporate and Institutional Websites");
    expect(page.headHtml).toContain("Zakaria Safi");
  });

  it("canonicalizes a backward-compatible section alias", async () => {
    const page = await renderPage("/ar/projects", "ar");
    expect(page.headHtml).toContain('rel="canonical" href="https://zakariasafi.me/ar"');
    expect(page.headHtml).not.toContain('rel="canonical" href="https://zakariasafi.me/ar/projects"');
  });
});
```

- [ ] **Step 2: Run the test to expose browser-only imports**

Run:

```powershell
npm test -- src/entry-server.test.tsx
```

Expected: FAIL because `entry-server.tsx` does not exist; after the first skeleton is added, any top-level GSAP/ScrollTrigger browser access must also fail until Step 4.

- [ ] **Step 3: Split providers, routes, and router selection**

Refactor `src/App.tsx` to export:

```tsx
export const AppProviders = ({ children }: PropsWithChildren) => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      {children}
    </TooltipProvider>
  </QueryClientProvider>
);

export const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<RootRedirect />} />
    <Route path="/:lang" element={<LocalizedRoute />} />
    <Route path="/:lang/:section" element={<LocalizedRoute />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
);

const App = () => (
  <AppProviders>
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  </AppProviders>
);
```

Import `PropsWithChildren` from React. Preserve the existing query client and route validation logic.

- [ ] **Step 4: Move animation library loading inside effects**

Remove the top-level GSAP import from `Hero.tsx` and replace its current effect with:

```ts
useEffect(() => {
  let cancelled = false;
  let cleanup: (() => void) | undefined;

  void import("gsap").then(({ default: gsap }) => {
    if (cancelled) return;
    const reduceMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduceMotionQuery.matches) {
      gsap.set("[data-gsap-hero]", { autoAlpha: 1, y: 0 });
      return;
    }
    const context = gsap.context(() => {
      gsap.fromTo(
        "[data-gsap-hero]",
        { autoAlpha: 0, y: 24 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.85,
          ease: "power3.out",
          stagger: 0.11,
          delay: 0.08,
        },
      );
    }, heroRef);
    cleanup = () => context.revert();
  });

  return () => {
    cancelled = true;
    cleanup?.();
  };
}, []);
```

Remove the top-level GSAP import from `MouseFollower.tsx` and replace its effect with:

```ts
useEffect(() => {
  const glow = glowRef.current;
  if (!glow) return;
  let cancelled = false;
  let cleanup: (() => void) | undefined;

  void import("gsap").then(({ default: gsap }) => {
    if (cancelled) return;
    const reduceMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduceMotionQuery.matches) return;
    gsap.set(glow, { xPercent: -50, yPercent: -50, opacity: 0 });
    const setX = gsap.quickTo(glow, "x", { duration: 0.45, ease: "power3.out" });
    const setY = gsap.quickTo(glow, "y", { duration: 0.45, ease: "power3.out" });
    let isActive = false;
    const handleMouseMove = (event: MouseEvent) => {
      if (!isActive) {
        isActive = true;
        gsap.set(glow, { x: event.clientX, y: event.clientY, opacity: 1 });
      }
      setX(event.clientX);
      setY(event.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    cleanup = () => window.removeEventListener("mousemove", handleMouseMove);
  });

  return () => {
    cancelled = true;
    cleanup?.();
  };
}, []);
```

Remove both top-level animation imports from `use-gsap-reveal.ts` and replace the hook effect with:

```ts
useEffect(() => {
  let cancelled = false;
  let cleanup: (() => void) | undefined;

  void Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(
    ([{ default: gsap }, { ScrollTrigger }]) => {
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);
      const reduceMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      if (reduceMotionQuery.matches) {
        gsap.set(selector, { autoAlpha: 1, y: 0 });
        return;
      }
      const context = gsap.context(() => {
        gsap.utils.toArray<HTMLElement>(selector).forEach((element) => {
          gsap.fromTo(
            element,
            { autoAlpha: 0, y: 28 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.9,
              ease: "power3.out",
              scrollTrigger: { trigger: element, start: "top 86%", once: true },
            },
          );
        });
      });
      cleanup = () => context.revert();
    },
  );

  return () => {
    cancelled = true;
    cleanup?.();
  };
}, [selector]);
```

These replacements preserve the current animation values while making server imports safe and moving GSAP into lazy chunks.

- [ ] **Step 5: Implement the Vite server entry**

Create `src/entry-server.tsx`:

```tsx
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import i18n from "./i18n/config";
import { AppProviders, AppRoutes } from "./App";
import type { Language } from "./i18n/locales";
import { renderSeoHead } from "./seo/render-seo-head";

export const renderPage = async (url: string, language: Language) => {
  await i18n.changeLanguage(language);
  const appHtml = renderToString(
    <AppProviders>
      <StaticRouter location={url}>
        <AppRoutes />
      </StaticRouter>
    </AppProviders>,
  );
  return { appHtml, headHtml: renderSeoHead(language) };
};
```

- [ ] **Step 6: Hydrate the prerendered client**

Use hydration for generated language pages and a normal client mount for the empty root redirect document in `src/main.tsx`:

```tsx
import { createRoot, hydrateRoot } from "react-dom/client";

const root = document.getElementById("root")!;

if (root.hasChildNodes()) {
  hydrateRoot(root, <App />);
} else {
  createRoot(root).render(<App />);
}
```

- [ ] **Step 7: Run the server-render and regression tests**

Run:

```powershell
npm test -- src/entry-server.test.tsx src/components/portfolio/Services.test.tsx
npm run lint
```

Expected: server rendering tests PASS without `window is not defined`; lint exits 0 with only the existing seven UI warnings.

- [ ] **Step 8: Commit SSR compatibility**

```powershell
git add src/App.tsx src/main.tsx src/entry-server.tsx src/entry-server.test.tsx src/components/portfolio/Hero.tsx src/components/portfolio/MouseFollower.tsx src/hooks/use-gsap-reveal.ts
git commit -m "feat: make portfolio content server renderable"
```

---

### Task 6: Generate and Verify Localized Production HTML

**Files:**

- Create: `scripts/prerender.mjs`
- Create: `scripts/verify-seo-build.mjs`
- Modify: `package.json`
- Modify: `index.html`
- Modify: `vercel.json`

**Interfaces:**

- Consumes: compiled `dist-ssr/entry-server.js` and `renderPage(url, language)`.
- Produces: `dist/ar/index.html` and `dist/en/index.html` with complete app HTML and localized head markup.
- Produces: build failure when either localized document is incomplete or canonically incorrect.

- [ ] **Step 1: Write the failing build verifier first**

Create `scripts/verify-seo-build.mjs` using `node:assert/strict` and `node:fs/promises`. For each of `ar` and `en`, read `dist/<language>/index.html` and assert:

```js
assert.match(html, /<div id="root">[\s\S]+<\/div>/);
assert.match(html, new RegExp(`<html lang="${language}"`));
assert.match(html, new RegExp(`dir="${language === "ar" ? "rtl" : "ltr"}"`));
assert.match(html, /<title>[^<]+<\/title>/);
assert.match(html, /<meta name="description" content="[^"]+" \/>/);
assert.match(html, new RegExp(`rel="canonical" href="https://zakariasafi.me/${language}"`));
assert.match(html, /hreflang="ar"/);
assert.match(html, /hreflang="en"/);
assert.match(html, /hreflang="x-default"/);
assert.match(html, /id="site-structured-data"/);
assert.match(html, /id="services"/);
assert.equal((html.match(/wa\.me\/972597986160/g) ?? []).length, 1);
```

Also assert the Arabic file contains `تطوير مواقع الشركات والمؤسسات` and the English file contains `Professional Portfolio Websites`.

- [ ] **Step 2: Run the verifier against the current build to prove localized HTML is missing**

Run:

```powershell
npm run build
node scripts/verify-seo-build.mjs
```

Expected: FAIL with `ENOENT` for `dist/ar/index.html` or an equivalent missing localized-output assertion.

- [ ] **Step 3: Mark the replaceable SEO region in the HTML template**

Set the opening element to `<html lang="en" dir="ltr">`. In `index.html`, surround the title, description, author, canonical/alternate links, Open Graph tags, X/Twitter tags, and JSON-LD fallback with:

```html
<!-- SEO_HEAD_START -->
<title>Zakaria Safi | E-commerce, Corporate &amp; Portfolio Websites</title>
<meta name="description" content="Web developer building fast, professional e-commerce, corporate, and portfolio websites for businesses, experts, and service providers in Arabic and English." />
<meta name="author" content="Zakaria Safi" />
<link rel="canonical" href="https://zakariasafi.me/en" />
<link rel="alternate" hreflang="ar" href="https://zakariasafi.me/ar" />
<link rel="alternate" hreflang="en" href="https://zakariasafi.me/en" />
<link rel="alternate" hreflang="x-default" href="https://zakariasafi.me/en" />
<meta property="og:title" content="Zakaria Safi | E-commerce, Corporate &amp; Portfolio Websites" />
<meta property="og:description" content="Web developer building fast, professional e-commerce, corporate, and portfolio websites for businesses, experts, and service providers in Arabic and English." />
<meta property="og:type" content="website" />
<meta property="og:locale" content="en_US" />
<meta property="og:locale:alternate" content="ar_AR" />
<meta property="og:site_name" content="Zakaria Safi Web Development" />
<meta property="og:url" content="https://zakariasafi.me/en" />
<meta property="og:image" content="https://zakariasafi.me/og-preview.png" />
<meta property="og:image:type" content="image/png" />
<meta property="og:image:width" content="1201" />
<meta property="og:image:height" content="630" />
<meta property="og:image:alt" content="Zakaria Safi web development portfolio" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="Zakaria Safi | E-commerce, Corporate &amp; Portfolio Websites" />
<meta name="twitter:description" content="Web developer building fast, professional e-commerce, corporate, and portfolio websites for businesses, experts, and service providers in Arabic and English." />
<meta name="twitter:image" content="https://zakariasafi.me/og-preview.png" />
<meta name="twitter:image:alt" content="Zakaria Safi web development portfolio" />
<script id="site-structured-data" type="application/ld+json">{"@context":"https://schema.org","@graph":[{"@type":"WebSite","@id":"https://zakariasafi.me/#website","url":"https://zakariasafi.me","name":"Zakaria Safi Web Development","inLanguage":["ar","en"]},{"@type":"Person","@id":"https://zakariasafi.me/#person","name":"Zakaria Safi","url":"https://zakariasafi.me/en","image":"https://zakariasafi.me/og-preview.png","description":"Web developer building fast, professional e-commerce, corporate, and portfolio websites for businesses, experts, and service providers in Arabic and English.","sameAs":["https://github.com/zakad00e2","https://www.linkedin.com/in/zakariasafi/","https://x.com/Zakariaweb1"],"contactPoint":{"@type":"ContactPoint","contactType":"sales","telephone":"+972597986160","availableLanguage":["Arabic","English"]},"makesOffer":[{"@type":"Offer","itemOffered":{"@type":"Service","name":"E-commerce Website Development","description":"I build fast, responsive online stores that help customers discover products, complete purchases, and trust your brand. Each store is shaped around the products, sales flow, and management needs of the business.","areaServed":{"@type":"Place","name":"Arabic-speaking countries"}}},{"@type":"Offer","itemOffered":{"@type":"Service","name":"Professional Portfolio Websites","description":"I create focused portfolio websites for experts and service providers that present their expertise, services, and work clearly, helping potential clients understand their value and contact them with confidence.","areaServed":{"@type":"Place","name":"Arabic-speaking countries"}}},{"@type":"Offer","itemOffered":{"@type":"Service","name":"Corporate and Institutional Websites","description":"I develop credible corporate websites that explain what a company does, present its services and work, and give prospective clients a clear path to learn more and get in touch.","areaServed":{"@type":"Place","name":"Arabic-speaking countries"}}}]},{"@type":"ProfilePage","@id":"https://zakariasafi.me/en#profile","url":"https://zakariasafi.me/en","name":"Zakaria Safi | E-commerce, Corporate & Portfolio Websites","description":"Web developer building fast, professional e-commerce, corporate, and portfolio websites for businesses, experts, and service providers in Arabic and English.","inLanguage":"en","isPartOf":{"@id":"https://zakariasafi.me/#website"},"mainEntity":{"@id":"https://zakariasafi.me/#person"}}]}</script>
<!-- SEO_HEAD_END -->
```

The content between markers must be the literal English output defined by `renderSeoHead("en")`; do not leave the middle empty. Keep the favicon, font preconnects, font stylesheet, and language bootstrap script outside the markers.

- [ ] **Step 4: Implement the deterministic prerender script**

Create `scripts/prerender.mjs`:

```js
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { pathToFileURL } from "node:url";
import path from "node:path";

const root = process.cwd();
const template = await readFile(path.join(root, "dist", "index.html"), "utf8");
const serverEntry = pathToFileURL(path.join(root, "dist-ssr", "entry-server.js")).href;
const { renderPage } = await import(serverEntry);

const replaceRequired = (source, pattern, replacement, label) => {
  const output = source.replace(pattern, replacement);
  if (output === source) {
    throw new Error(`Missing ${label} in dist/index.html`);
  }
  return output;
};

for (const language of ["ar", "en"]) {
  const { appHtml, headHtml } = await renderPage(`/${language}`, language);
  const localizedDocument = replaceRequired(
    template,
    /<html lang="[^"]+" dir="[^"]+">/,
    `<html lang="${language}" dir="${language === "ar" ? "rtl" : "ltr"}">`,
    "html language attributes",
  );
  const withHead = replaceRequired(
    localizedDocument,
    /<!-- SEO_HEAD_START -->[\s\S]*?<!-- SEO_HEAD_END -->/,
    `<!-- SEO_HEAD_START -->\n${headHtml}\n<!-- SEO_HEAD_END -->`,
    "SEO head markers",
  );
  const html = replaceRequired(
    withHead,
    '<div id="root"></div>',
    `<div id="root">${appHtml}</div>`,
    "root mount element",
  );
  const outputDir = path.join(root, "dist", language);
  await mkdir(outputDir, { recursive: true });
  await writeFile(path.join(outputDir, "index.html"), html, "utf8");
}
```

The required replacements now fail with a descriptive error instead of silently writing incomplete HTML.

- [ ] **Step 5: Replace the production build script with a verified pipeline**

Set these exact `package.json` scripts:

```json
{
  "build:client": "vite build",
  "build:ssr": "vite build --ssr src/entry-server.tsx --outDir dist-ssr",
  "prerender": "node scripts/prerender.mjs",
  "verify:seo": "node scripts/verify-seo-build.mjs",
  "build": "npm run build:client && npm run build:ssr && npm run prerender && npm run verify:seo"
}
```

- [ ] **Step 6: Route language requests to their localized HTML**

Replace `vercel.json` with:

```json
{
  "rewrites": [
    { "source": "/ar", "destination": "/ar/index.html" },
    { "source": "/ar/:path*", "destination": "/ar/index.html" },
    { "source": "/en", "destination": "/en/index.html" },
    { "source": "/en/:path*", "destination": "/en/index.html" },
    { "source": "/:path*", "destination": "/index.html" }
  ]
}
```

This keeps aliases such as `/ar/about` working while their HTML and runtime metadata canonicalize to `/ar`.

- [ ] **Step 7: Run the complete production pipeline**

Run:

```powershell
npm run build
```

Expected: client build, SSR build, prerender, and verifier all exit 0; `dist/ar/index.html` and `dist/en/index.html` contain localized visible content before JavaScript runs.

- [ ] **Step 8: Commit localized prerendering**

```powershell
git add package.json package-lock.json index.html vercel.json scripts/prerender.mjs scripts/verify-seo-build.mjs
git commit -m "feat: prerender localized portfolio pages"
```

---

### Task 7: Add Sitemap and Robots Discovery Signals

**Files:**

- Create: `src/seo/static-assets.test.ts`
- Create: `public/sitemap.xml`
- Modify: `public/robots.txt`

**Interfaces:**

- Produces: a sitemap containing exactly `/ar` and `/en` canonical URLs plus reciprocal alternates.
- Produces: a permissive robots file with one absolute sitemap declaration.

- [ ] **Step 1: Write the failing static asset test**

Create `src/seo/static-assets.test.ts`:

```ts
// @vitest-environment node
import { readFile } from "node:fs/promises";
import { describe, expect, it } from "vitest";

describe("crawl assets", () => {
  it("lists only the two canonical language pages", async () => {
    const sitemap = await readFile("public/sitemap.xml", "utf8");
    const locations = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]);
    expect(locations).toEqual([
      "https://zakariasafi.me/ar",
      "https://zakariasafi.me/en",
    ]);
    expect(sitemap).toContain('hreflang="ar" href="https://zakariasafi.me/ar"');
    expect(sitemap).toContain('hreflang="en" href="https://zakariasafi.me/en"');
    expect(sitemap).toContain('hreflang="x-default" href="https://zakariasafi.me/en"');
  });

  it("allows crawling and declares the sitemap", async () => {
    const robots = await readFile("public/robots.txt", "utf8");
    expect(robots).toMatch(/User-agent: \*\r?\nAllow: \//);
    expect(robots).toContain("Sitemap: https://zakariasafi.me/sitemap.xml");
  });
});
```

- [ ] **Step 2: Run the test to verify the sitemap is missing**

Run:

```powershell
npm test -- src/seo/static-assets.test.ts
```

Expected: FAIL because `public/sitemap.xml` does not exist and robots has no sitemap line.

- [ ] **Step 3: Create the exact two-URL sitemap**

Create `public/sitemap.xml`:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <url>
    <loc>https://zakariasafi.me/ar</loc>
    <xhtml:link rel="alternate" hreflang="ar" href="https://zakariasafi.me/ar" />
    <xhtml:link rel="alternate" hreflang="en" href="https://zakariasafi.me/en" />
    <xhtml:link rel="alternate" hreflang="x-default" href="https://zakariasafi.me/en" />
  </url>
  <url>
    <loc>https://zakariasafi.me/en</loc>
    <xhtml:link rel="alternate" hreflang="ar" href="https://zakariasafi.me/ar" />
    <xhtml:link rel="alternate" hreflang="en" href="https://zakariasafi.me/en" />
    <xhtml:link rel="alternate" hreflang="x-default" href="https://zakariasafi.me/en" />
  </url>
</urlset>
```

Do not add the root URL or section aliases.

- [ ] **Step 4: Simplify robots rules and declare the sitemap**

Replace `public/robots.txt` with:

```txt
User-agent: *
Allow: /

Sitemap: https://zakariasafi.me/sitemap.xml
```

- [ ] **Step 5: Run static asset tests and production build**

Run:

```powershell
npm test -- src/seo/static-assets.test.ts
npm run build
```

Expected: tests PASS and the built `dist/sitemap.xml` and `dist/robots.txt` match the source files.

- [ ] **Step 6: Commit crawl assets**

```powershell
git add public/sitemap.xml public/robots.txt src/seo/static-assets.test.ts
git commit -m "feat: add bilingual sitemap discovery"
```

---

### Task 8: Generate Responsive Project Images and Serve Them Semantically

**Files:**

- Create: `scripts/optimize-project-images.mjs`
- Create: `src/data/project-assets.test.ts`
- Modify: `src/data/project-assets.ts`
- Modify: `src/components/portfolio/Projects.tsx`
- Create: `src/components/portfolio/Projects.test.tsx`
- Create: `public/images/projects/*.webp` (32 generated files: 16 project IDs at 480 px and 960 px)

**Interfaces:**

- Consumes: `src/data/project-assets.json`.
- Produces: `getProjectWebpSrcSet(id)` and generated files matching its URLs.
- Produces: responsive `<picture>` markup with original PNG fallback, intrinsic dimensions, localized alt text, lazy loading, and async decoding.

- [ ] **Step 1: Write failing asset and markup tests**

Create `src/data/project-assets.test.ts`:

```ts
// @vitest-environment node
import { access, stat } from "node:fs/promises";
import { describe, expect, it } from "vitest";
import { projectAssets, getProjectWebpSrcSet } from "./project-assets";

describe("optimized project assets", () => {
  it("has both generated widths for every project", async () => {
    for (const id of Object.keys(projectAssets)) {
      await access(`public/images/projects/${id}-480.webp`);
      await access(`public/images/projects/${id}-960.webp`);
      expect(getProjectWebpSrcSet(id as keyof typeof projectAssets)).toContain(`${id}-960.webp 960w`);
    }
  });

  it("keeps every generated file below its original fallback size", async () => {
    for (const [id, asset] of Object.entries(projectAssets)) {
      const original = await stat(`public${asset.src}`);
      for (const width of [480, 960]) {
        const optimized = await stat(`public/images/projects/${id}-${width}.webp`);
        expect(optimized.size).toBeLessThan(original.size);
      }
    }
  });
});
```

Create `src/components/portfolio/Projects.test.tsx`:

```tsx
import { createInstance } from "i18next";
import { renderToStaticMarkup } from "react-dom/server";
import { I18nextProvider, initReactI18next } from "react-i18next";
import { describe, expect, it } from "vitest";
import { resources } from "@/i18n/resources";
import { Projects } from "./Projects";

describe("Projects responsive images", () => {
  it("renders responsive, intrinsic, lazy English project previews", async () => {
    const instance = createInstance();
    await instance.use(initReactI18next).init({
      resources,
      lng: "en",
      fallbackLng: "en",
      interpolation: { escapeValue: false },
    });
    const html = renderToStaticMarkup(
      <I18nextProvider i18n={instance}>
        <Projects />
      </I18nextProvider>,
    );
    expect(html).toContain("<picture");
    expect(html).toContain("srcset=");
    expect(html).toContain("width=");
    expect(html).toContain("height=");
    expect(html).toContain('loading="lazy"');
    expect(html).toContain("Preview of the Besan Khalaily web project");
  });
});
```

- [ ] **Step 2: Run the image tests to verify generated assets are absent**

Run:

```powershell
npm test -- src/data/project-assets.test.ts src/components/portfolio/Projects.test.tsx
```

Expected: FAIL because the WebP files and `<picture>` markup do not exist.

- [ ] **Step 3: Implement deterministic image generation**

Create `scripts/optimize-project-images.mjs`:

```js
import { mkdir, readFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const manifest = JSON.parse(
  await readFile(path.join(root, "src/data/project-assets.json"), "utf8"),
);
const outputDir = path.join(root, "public/images/projects");
await mkdir(outputDir, { recursive: true });

for (const [id, asset] of Object.entries(manifest)) {
  const input = path.join(root, "public", asset.src.replace(/^\//, ""));
  for (const width of [480, 960]) {
    await sharp(input)
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: 78, effort: 6 })
      .toFile(path.join(outputDir, `${id}-${width}.webp`));
  }
}
```

Add `"optimize:images": "node scripts/optimize-project-images.mjs"` to `package.json`.

- [ ] **Step 4: Generate all 32 committed WebP assets**

Run:

```powershell
npm run optimize:images
```

Expected: `public/images/projects` contains exactly 32 WebP files named from the 16 manifest keys.

- [ ] **Step 5: Serve responsive WebP with a PNG fallback**

In `src/components/portfolio/Projects.tsx`, wrap the Task 3 `<img>` in:

```tsx
<picture className="sm:order-1 sm:col-span-2 sm:translate-y-1">
  <source
    type="image/webp"
    srcSet={getProjectWebpSrcSet(project.id)}
    sizes="(min-width: 1024px) 160px, (min-width: 640px) 25vw, calc(100vw - 3rem)"
  />
  <img
    src={asset.src}
    alt={t("projects.imageAlt", { title: project.title })}
    width={asset.width}
    height={asset.height}
    loading="lazy"
    decoding="async"
    className="h-auto w-full rounded border-2 border-slate/10 transition group-hover:border-slate/30"
  />
</picture>
```

Remove grid-order classes from the `<img>` itself so the `<picture>` occupies the grid cell.

- [ ] **Step 6: Run image, component, and build verification**

Run:

```powershell
npm test -- src/data/project-assets.test.ts src/components/portfolio/Projects.test.tsx
npm run build
```

Then compare payload totals:

```powershell
$originalBytes = (Get-Content -Raw src/data/project-assets.json | ConvertFrom-Json).PSObject.Properties | ForEach-Object { (Get-Item (Join-Path "public" $_.Value.src.TrimStart('/'))).Length } | Measure-Object -Sum
$webpBytes = Get-ChildItem public/images/projects/*.webp | Measure-Object Length -Sum
Write-Output "Original bytes: $($originalBytes.Sum)"
Write-Output "Responsive WebP bytes: $($webpBytes.Sum)"
```

Expected: tests and build PASS; each optimized file is smaller than its fallback; total WebP bytes are materially below the original PNG total.

- [ ] **Step 7: Commit image optimization**

```powershell
git add package.json package-lock.json scripts/optimize-project-images.mjs src/data/project-assets.ts src/data/project-assets.test.ts src/components/portfolio/Projects.tsx src/components/portfolio/Projects.test.tsx public/images/projects
git commit -m "perf: add responsive project previews"
```

---

### Task 9: Final Verification, Browser QA, and Search Console Handoff

**Files:**

- Create: `docs/seo-search-console.md`
- Verify: all files changed in Tasks 1–8.

**Interfaces:**

- Consumes: the complete test/build pipeline and production preview.
- Produces: reproducible deployment checks and a concise post-deploy indexing checklist.

- [ ] **Step 1: Write the Search Console handoff document**

Create `docs/seo-search-console.md` with these exact steps:

1. Deploy the verified production build to `https://zakariasafi.me`.
2. Open the existing domain property in Google Search Console, or create and verify a Domain property for `zakariasafi.me`.
3. Open **Sitemaps**, submit `https://zakariasafi.me/sitemap.xml`, and confirm it reports two discovered page URLs.
4. Use **URL Inspection** for `https://zakariasafi.me/ar` and `https://zakariasafi.me/en`; test the live URL and request indexing when the rendered HTML, canonical, and mobile screenshot are correct.
5. Recheck **Page indexing**, **Core Web Vitals**, and **Search results** after Google recrawls the site.
6. Record WhatsApp inquiries and the search query/page that led to them when known; compare qualified inquiries over a 28-day period rather than treating impressions alone as success.

State clearly that indexing and ranking timing are controlled by search engines and are not guaranteed.

- [ ] **Step 2: Run the complete automated verification**

The first client-build step empties and recreates `dist`, so no manual recursive deletion is required. Run:

```powershell
npm test
npm run lint
npm run build
git diff --check
```

Expected:

- All Vitest tests PASS.
- ESLint exits 0; the seven pre-existing shadcn fast-refresh warnings are acceptable, and no new warnings are introduced.
- Client build, SSR build, prerender, and SEO verifier exit 0.
- The main client bundle is smaller than the 516.41 kB baseline or GSAP is emitted into lazy chunks.
- `git diff --check` reports no whitespace errors.

- [ ] **Step 3: Start a hidden production preview for browser checks**

Run in PowerShell:

```powershell
$preview = Start-Process -FilePath "npm.cmd" -ArgumentList @("run", "preview", "--", "--host", "127.0.0.1", "--port", "4173") -WorkingDirectory (Get-Location) -WindowStyle Hidden -PassThru
```

Use the in-app browser to inspect:

- `http://127.0.0.1:4173/ar`
- `http://127.0.0.1:4173/en`
- `http://127.0.0.1:4173/ar/services` for backward-compatible alias behavior and canonical `/ar`

Check desktop at 1440 × 900 and mobile at 390 × 844. Confirm:

- Services appears after About and before Experience.
- Exactly three service headings appear.
- Arabic is RTL and English is LTR.
- Service example links scroll to the correct project.
- Language switching preserves the current section anchor.
- The existing WhatsApp icon appears exactly once and no new WhatsApp button exists.
- Project images load sharply without visible layout shift.
- Existing animations still run and reduced-motion mode remains usable.
- The console has no hydration mismatch or broken-image errors.

Stop only the captured preview process:

```powershell
Stop-Process -Id $preview.Id
```

- [ ] **Step 4: Capture a Lighthouse-style baseline**

With the preview running again, run Chrome Lighthouse against both canonical routes if Chrome is available:

```powershell
npx --yes lighthouse http://127.0.0.1:4173/ar --only-categories=performance,seo,accessibility --output=json --output-path=$env:TEMP\zakaria-lighthouse-ar.json --chrome-flags="--headless"
npx --yes lighthouse http://127.0.0.1:4173/en --only-categories=performance,seo,accessibility --output=json --output-path=$env:TEMP\zakaria-lighthouse-en.json --chrome-flags="--headless"
```

Expected: both audits complete; SEO has no missing title, description, canonical, language, image-alt, crawl, or structured-data basics. Record the scores and material warnings in the final handoff; do not weaken checks merely to raise a score.

- [ ] **Step 5: Request code review and fix only verified findings**

Invoke `superpowers:requesting-code-review` with the approved design spec, this plan, and the commit range from the Task 1 parent through Task 8. Address findings using `superpowers:receiving-code-review`, rerun the smallest affected test first, then rerun the full verification commands from Step 2.

- [ ] **Step 6: Perform completion verification**

Invoke `superpowers:verification-before-completion`. Confirm fresh output for `npm test`, `npm run lint`, `npm run build`, `git diff --check`, browser QA, and the final git status before stating that implementation is complete.

- [ ] **Step 7: Commit the handoff documentation**

```powershell
git add docs/seo-search-console.md
git commit -m "docs: add SEO launch checklist"
```

- [ ] **Step 8: Finish the development branch**

Invoke `superpowers:finishing-a-development-branch` and present the integration choices required by that workflow. Do not push or create a pull request unless the user selects that option.
