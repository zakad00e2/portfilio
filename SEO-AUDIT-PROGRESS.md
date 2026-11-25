# Technical SEO and GEO audit

## Stack report

24 November 2026. Baseline source `54164da`, live home `https://www.zakariasafi.me/`. Vite 5.4.19, React 18.3.1, React Router 6, TypeScript 5, Tailwind, i18next and Vercel. Baseline is client rendering behind a catch-all HTML rewrite. `/en` and `/ar` are URL-prefixed versions of the same freelance software engineering portfolio. The local storage preference applies to `/`. `LocalizedSeo.tsx` updates metadata on the client. `index.html` has English defaults. `public/robots.txt` allows crawling. There is a Search Console verification file. The domain is operational and the repository records the existing SEO design in August 2026. Search Console Pages data and domain launch date were unavailable. Two candidate pages require no sitemap ramp. Client shops are portfolio examples and belong to external domains.

Verification order is `npx --no-install tsc -p tsconfig.app.json --noEmit`, `npx --no-install tsc -p tsconfig.node.json --noEmit`, `npm run lint`, `npm run build`, then raw HTTP and browser checks. Baseline app typecheck failed in `src/i18n/locales.ts` because the guard narrowed an expression instead of the returned variable. Baseline lint had zero errors and 15 warnings, including seven from a nested worktree. Baseline build passed with an outdated Browserslist data notice and a 536 kB client chunk warning.

## Baseline rendered findings

The requested SEO Prompt Master CLI 2.2.1 fetched `/` only and reported 60 SEO and 19 GEO under its own rubric. Its report is `seo-report.md`. Direct live GETs covered both index candidates, `/`, all six old sections, both invalid-path classes, `/ar/`, `/EN`, `robots.txt`, `sitemap.xml`, the PDF and the verification file. Both language responses had the same English title, no H1, no canonical or hreflang and an empty app root. All six sections and both nonexistent paths returned that shell with HTTP 200. `/ar/` returned 404. `/sitemap.xml` returned HTML with HTTP 200. HTTP apex redirected to HTTPS apex with 308, then the apex temporarily redirected to HTTPS `www` with 307.

| Page | 1 Metadata | 2 Canonical / locale | 3 Robots | 4 Schema | 5 Headings | 6 Images | 7 Links | 8 Rendering | 9 Sitemap |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `/en` | Partial, English static title/description/cards | Fail, client-only and host-dependent | Partial, implicitly allowed | Fail, absent | Fail in HTML, one H1 in source | Partial, lazy PNGs lack dimensions | Fail in HTML, section buttons in client | Fail, empty HTML and shared soft 404 | Fail, missing XML |
| `/ar` | Fail, identical English initial head | Fail, client-only and host-dependent | Partial, implicitly allowed | Fail, absent | Fail in HTML, one H1 in source | Partial, lazy PNGs lack dimensions | Fail in HTML, section buttons in client | Fail, empty HTML and shared soft 404 | Fail, missing XML |

Sources read for both locales are `App.tsx`, `pages/Index.tsx`, `pages/NotFound.tsx`, `index.html`, `LocalizedSeo.tsx`, `resources.ts`, and the Hero, About, Experience, Projects, Navigation and LanguageSwitcher components. Route classification is in `ROUTES-INVENTORY.md`.

## Ordered backlog

- [x] P1 infrastructure. Render the two locale pages in Vite's production output and hydrate the same React tree. Emit localized titles, robots, canonicals, social metadata and reciprocal hreflang through shared SEO logic. Fix the baseline locale type error. Verified both HTML responses through Vite preview with no JavaScript execution.
- [x] P1 infrastructure. Replace the catch-all rewrite with explicit locale routing, single-hop redirects for recognized variants, and HTTP 404 for unknown routes. Keep `/` crawlable with `noindex,follow` and preference-aware navigation. The apex-wide live redirect is managed by Vercel domain settings. Verified 21 local HTTP paths using the validated Vercel route manifest.
- [x] P1 page. Render real section links, preserve hash navigation and language switching, and verify mobile content parity. Chromium passed both languages at 390 and 1440 pixels, with JavaScript enabled and disabled. It also verified hash scrolling, language switching, the saved root preference and the localized 404.
- [x] P2 infrastructure. Generate the two-URL XML sitemap, record meaningful modification dates, expose it in robots.txt and add the selected AI crawler rules. Owner decision on 24 November 2026 is to allow search and citations and block training crawlers. Parsed both sitemap entries and passed 81 crawler access assertions across `/`, `/en` and `/ar`.
- [x] P2 page. Emit localized profile, person, website, service catalog and project list entities. The no-JavaScript browser matched all three service titles and descriptions, 15 project anchors and three visible identity links per page. The two pages have no hierarchical breadcrumb trail. Breadcrumb markup was omitted and scored as a gap in the prescribed rubric.
- [x] P3 page. Corrected hero heading order and localized project image alt text, intrinsic dimensions and lazy loading. All 30 WebP variants served, and Chromium selected the expected 480 px and 960 px files. First project images were below the initial viewport in every desktop and mobile run. The OG preview and one PNG fallback now match their MIME type with identical decoded pixels.

Implementation uses the prior approved single-page design and code in `codex/seo-single-page` as reference. Adapt its static generation and metadata to the current Lenis navigation, latest project list, verified `www` host and real HTTP routing. Leave verification TXT/HTML and client work content in place.

## Baseline scores

Coverage is 2/2 indexable pages. An independent second live pass checked both pages and `/`, the entire candidate set plus the preference route. The existing description/card presence checks passed again. Both locale checks failed the HTML H1, canonical and localized-response contract. Post-fix will repeat the checks on every candidate.

| SEO category | Max | Baseline |
| --- | ---: | ---: |
| Indexability and crawl foundation | 25 | 5 |
| Rendering and mobile parity | 20 | 0 |
| Structured data | 15 | 0 |
| Metadata quality | 10 | 4 |
| Internationalization | 10 | 0 |
| Headings, semantics and links | 10 | 0 |
| Images | 5 | 2 |
| Core Web Vitals, heuristic, not measured | 5 | 2 |
| **SEO total** | **100** | **13** |

Both pages score 5 for open crawl access without a robots conflict, 2 for lazy real images in the client template, and 2 for below-fold image deferral and swap fonts. Metadata is 7 on English and 1 on Arabic for an average of 4. Page scores are 16 and 10, both below the P1 cap of 60.

| GEO category | Max | Baseline |
| --- | ---: | ---: |
| AI crawler configuration | 20 | 0 |
| Extractable rendering | 20 | 0 |
| Extractable content structure | 15 | 0 |
| Entity authority | 20 | 0 |
| Classic SEO prerequisite | 15 | 2 |
| No wasted GEO effort | 10 | 10 |
| **GEO total** | **100** | **12** |

The baseline GEO blocker cap of 60 does not change the total. These technical readiness scores cover the supplied audit rubric. Rankings and traffic also depend on off-page factors including backlinks, content quality and competition.

## Scope decisions and live verification

- The canonical host is `https://www.zakariasafi.me`, which directly served both locale paths and the social image. The HTTPS apex still returned 307 to `www` on the independent recheck. HTTP `www` returned 308 directly to HTTPS `www`. Production host consolidation depends on the Vercel domain redirect configuration. That setting and production deployment were outside the repository changes. [Google redirect guidance](https://developers.google.com/search/docs/crawling-indexing/301-redirects)
- The approved architecture has one portfolio page per language. Both homepages describe the person, so the graph uses `ProfilePage` and `WebPage` with `Person`, `WebSite`, `OfferCatalog` and the visible project `ItemList`. There is no navigable breadcrumb hierarchy. The audit's visible-content rule also excludes the social card as a person photo, a phone number as on-page copy, and a regional service-area claim. The public profile links and professional title are visible. [ProfilePage requirements](https://developers.google.com/search/docs/appearance/structured-data/profile-page), [Breadcrumb requirements](https://developers.google.com/search/docs/appearance/structured-data/breadcrumb), [Schema.org offer catalog](https://schema.org/hasOfferCatalog)
- Google Rich Results Test accepted code input for each locale and asked for sign-in before returning a result. Local Chromium verified the JSON-LD and its correspondence with the visible DOM. Google eligibility remains unverified. [Rich Results Test](https://search.google.com/test/rich-results)
- The owner chose named search and citation access with named training crawlers blocked. Googlebot remains open, including Google Search AI features. Google currently combines training and grounding in standalone Gemini Apps and Vertex AI under `Google-Extended`, so the training opt-out covers that grounding too. [Google crawler controls](https://developers.google.com/crawling/docs/crawlers-fetchers/google-common-crawlers), [Google Search AI features](https://developers.google.com/search/docs/appearance/ai-features), [OpenAI crawler controls](https://developers.openai.com/api/docs/bots), [Anthropic crawler controls](https://support.claude.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler), [Perplexity crawler controls](https://docs.perplexity.ai/docs/resources/perplexity-crawlers)
- The sitemap reflects the 24 November 2026 content and metadata update. The source dates are maintained per locale and do not change on rebuilds. The site has two destinations and no sitemap ramp or split is needed. No high-frequency publishing workflow uses IndexNow. [Sitemap guidance](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)
- Pagination, UGC, paid links, rating, storefront, local-address and job-posting markup are inapplicable to this portfolio. Its showcased work links to other sites. No separate About page or byline was added because the one-page design presents the owner's name, role, About and work history together.
- Phase 5 was skipped because no connected SEO data tool was available. The live baseline HTTP observations are recorded above. The post-fix crawl and browser checks use the production build served locally. Search Console index counts, CrUX field metrics and deployment propagation were unavailable. [Core Web Vitals](https://web.dev/articles/vitals)

## Post-fix page findings

| Page | 1 Metadata | 2 Canonical / locale | 3 Robots | 4 Schema | 5 Headings | 6 Images | 7 Links | 8 Rendering | 9 Sitemap |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `/en` | Unique English title, description and complete share cards | Self-canonical plus reciprocal `en`, `ar`, `x-default` in head | `index,follow`, crawl allowed | WebPage/ProfilePage and visible Person, services and projects. Breadcrumb exception applies. | One H1, correct heading order and landmarks | 15 descriptive, sized, lazy images with WebP variants | Crawlable section, locale and project links | Full static HTML, JS hydration, mobile content parity, real 404s | Canonical URL, alternates and actual `lastmod` |
| `/ar` | Unique Arabic title, description and complete share cards | Self-canonical plus reciprocal `en`, `ar`, `x-default` in head | `index,follow`, crawl allowed | WebPage/ProfilePage and visible Person, services and projects. Breadcrumb exception applies. | One H1, correct heading order and landmarks | 15 Arabic alt texts, sized, lazy images with WebP variants | Crawlable section, locale and project links | Full Arabic RTL static HTML, JS hydration, mobile content parity, real 404s | Canonical URL, alternates and actual `lastmod` |

The shared host deduction reflects the observed production apex redirect. No locale page has an open P1 in the tested build. Production continues to serve the baseline until deployment.

## Verification log

| Item | Change | Evidence |
| --- | --- | --- |
| P1 initial HTML | Build emits `en.html` and `ar.html` from the same React tree the browser hydrates. | Served HTML contains localized language, direction, main content, H1, canonical, hreflang, robots and complete social cards. `npm run build:dev` also emitted localized HTML. |
| P1 routing | Exact locale rewrites and case-sensitive legacy redirects, root language selector and real error response. | Vercel routing utilities accepted the manifest. Local HTTP checks confirmed 21 single-hop 301 redirects, eight invalid paths returning 404, root `noindex,follow` and PDF and verification-file `X-Robots-Tag`. Chromium confirmed that encoded invalid locale and section paths stayed noindex 404 after hydration. [Vercel route semantics](https://vercel.com/docs/build-output-api/configuration#source-route) |
| P1 navigation | Section anchors, mobile navigation and localized links that retain browser query and hash after hydration. | Desktop and phone tests covered both motion modes, known section aliases, project example links, stored language preference and query/hash preservation. Both locales had identical primary text, headings and links across JS-on and JS-off runs. |
| P2 crawl controls | Two-entry XML generated from canonical locale URLs. Robots publishes its location and named crawler rules. | Parsed the served sitemap as XML, checked both dates and all alternates, and resolved 81 crawler access assertions across the root and both locale URLs. |
| P2 structured data and content | Localized service section and profile graph with the current portfolio items. | Served JSON-LD parsed in each head. Matched three services, 15 project anchors and three profile links to the DOM for each locale. Verified the single existing WhatsApp call to action. |
| P3 images and headings | Localized alt text, dimensions, WebP selection, PNG MIME consistency and improved H1 order. | 30 WebPs returned HTTP 200 and decoded at the expected widths. Chromium chose 480 px desktop and 960 px on a two-times-density phone. The 480 px set totals 180,488 bytes, and the 960 px set totals 541,494 bytes. Pre-audit screenshot originals totaled 22,192,302 bytes. |
| Build gates | App and tooling typechecks, lint and production build. | `npm run typecheck`, `npm run lint` and `npm run build` passed. Lint retained eight Fast Refresh warnings. Vite still reported stale Browserslist data, the approximately 542 kB client bundle warning and an existing unused Sonner export during the SSR build. Final verification included a separate workspace edit adding `@vercel/analytics` to the dependency manifests. |

## Final scores for the local production build

Final coverage is 2/2 indexable pages. Rechecked both post-fix pages and `/` in a separate HTTP/browser pass. Desktop and mobile parity checks covered 1440×900 and 390×844 in both locales. Scores use the supplied rubric. Phase 5 production signals remain unverified.

| SEO category | Max | Baseline | After |
| --- | ---: | ---: | ---: |
| Indexability and crawl foundation | 25 | 5 | 22 |
| Rendering and mobile parity | 20 | 0 | 20 |
| Structured data | 15 | 0 | 12 |
| Metadata quality | 10 | 4 | 10 |
| Internationalization | 10 | 0 | 10 |
| Headings, semantics and links | 10 | 0 | 10 |
| Images | 5 | 2 | 5 |
| Core Web Vitals, heuristic, not measured | 5 | 2 | 3 |
| **SEO total** | **100** | **13** | **92 (+79)** |

Each locale scores 92. Three points remain for production host consolidation and three for the breadcrumb exception in the audit rubric. The Core Web Vitals estimate credits initial HTML, lazy sized images and font handling. Hydration and animation cost remain visible in the size of the initial client bundle. The largest content in the initial viewport is text, so no project image was forced eager.

| GEO category | Max | Baseline | After |
| --- | ---: | ---: | ---: |
| AI crawler configuration | 20 | 0 | 20 |
| Extractable rendering | 20 | 0 | 20 |
| Extractable content structure | 15 | 0 | 15 |
| Entity authority | 20 | 0 | 18 |
| Classic SEO prerequisite | 15 | 2 | 14 |
| No wasted GEO effort | 10 | 10 | 10 |
| **GEO total** | **100** | **12** | **97 (+85)** |

Entity authority credits the substantive About section, three visible identity links and the displayed professional role. The single-page layout has no standalone About page or separate author byline. `round(92 × 0.15)` gives 14 for the SEO prerequisite. These scores measure technical readiness. Rankings and traffic also depend on backlinks, content quality and competition, which are outside this audit.

## Final summary

| Page or area | Delivered change | Verification evidence |
| --- | --- | --- |
| `/en` | Crawlable English portfolio with services, case examples and localized search and share metadata | HTTP 200, stable canonical, crawlable links and full HTML with or without browser JavaScript |
| `/ar` | Crawlable Arabic RTL portfolio with the same project inventory and localized services and metadata | HTTP 200, matching RTL document and content, reciprocal alternates and hydrated language switching |
| URL variants and unknown paths | Redirect existing section paths to language-page fragments and return HTTP 404 for invalid content | Single-hop HTTP matrix, case rules validated and client 404 hydration tested |
| Robots and sitemap | Explicit AI policy, two canonical URLs and locale-specific content date | Served XML parser output and named user-agent checks |
| Social and project images | Consistent image format, localized alt text, fallback dimensions and responsive previews | PNG byte signatures, all 30 WebP decode checks, size selection and visual checks in the English desktop and Arabic phone views |
