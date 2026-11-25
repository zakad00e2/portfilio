# Route inventory

Audited on 24 November 2026 against commit `54164da` and the live Vercel site. The site has one portfolio page per language. HTTPS `www.zakariasafi.me` serves the live content. The apex currently redirects there.

| Route | Baseline → target bucket | Rendering | Notes |
| --- | --- | --- | --- |
| `/en` | public-index → public-index | English CSR → static HTML + hydration | English and `x-default` destination. |
| `/ar` | public-index → public-index | Arabic CSR over English HTML → Arabic static HTML + hydration | Arabic `lang`, RTL and metadata in the first response. |
| `/` | public-index → public-noindex | SPA redirect → static language links + preference-aware client redirect | Stored preference remains available. Default is English. |
| `/index.html` | public-index → public-noindex | HTML alias → 301 | Redirects to `/`. |
| `/en/about` | public-index → public-noindex | Duplicate CSR → 301 | `/en#about`. |
| `/en/experience` | public-index → public-noindex | Duplicate CSR → 301 | `/en#experience`. |
| `/en/projects` | public-index → public-noindex | Duplicate CSR → 301 | `/en#projects`. |
| `/ar/about` | public-index → public-noindex | Duplicate CSR → 301 | `/ar#about`. |
| `/ar/experience` | public-index → public-noindex | Duplicate CSR → 301 | `/ar#experience`. |
| `/ar/projects` | public-index → public-noindex | Duplicate CSR → 301 | `/ar#projects`. |
| `/ar/`, `/en/`, case and HTML file variants | public-index or error → public-noindex | Edge/SPA fallback → 301 | Resolve recognized aliases to one canonical path. |
| `/:lang`, `/:lang/:section`, `*` outside recognized paths | public-index → public-noindex | CSR soft 404 → HTTP 404 | No dynamic entities. Unknown path, invalid language or section and absent file all use the error response. |
| `/404.html` | public-index → public-noindex | SPA fallback → HTTP 404 | Static error document with a recovery link. |
| `/robots.txt` | public-noindex → public-noindex | Static text | Crawl policy infrastructure. |
| `/sitemap.xml` | public-index → public-noindex | HTML fallback → XML | Crawl infrastructure lists only `/ar` and `/en`. |
| `/google85f0118633a54026.html` | public-index → public-noindex | Static HTML | Keep Search Console verification body accessible. |
| `/resume.pdf` | public-index → public-noindex | Static PDF | Keep human access and add a direct index directive per the two-page design. |
| `/assets/*`, `/fonts/*`, public image and SVG files | public-noindex → public-noindex | Static media | Crawlable supporting resources. Page sitemap contains HTML destinations. See asset inventory below. |
| `/images/projects/{project}-{480,960}.webp` | Absent → public-noindex | Static media | Two responsive sources for each of the 15 project IDs in `src/data/project-images.ts`. |

Infrastructure and media rows use the public-noindex bucket for sitemap accounting. Media remains crawlable for rendering and previews. Permanent redirects and HTTP 404s enforce exclusion through their HTTP status. Tracking query strings on the two canonical routes serve the same localized document and canonicalize to the clean URLs. Section fragments identify parts of the portfolio document. No deployed dashboards, accounts, authentication routes, APIs, search, pagination, legal pages, or project detail routes exist. The PHP file and CV working files at repository root are outside the Vite output. The portfolio's client work may link to external shops and dashboards.

Static asset paths tracked at baseline are `/1.png`, `/2.png`, `/3.png`, `/Screenshot 2025-12-01 122458.png`, `/Screenshot 2026-02-11 225245.png`, `/Screenshot 2026-02-11 230150.png`, `/Screenshot 2026-02-11 231128.png`, `/architectural-portfolio.png`, `/art.png`, `/athr.png`, `/athr.svg`, `/besan-khalaily.png`, `/favicon.svg`, `/image_original`, `/jaha.png`, `/market.png`, `/oday-tourism.png`, `/oday-tourism.svg`, `/og-preview.png`, `/pelmatech.png`, `/placeholder.svg`, `/safi-cashier.png`, `/state.png`, `/stayle.png`, `/unsporty.png`, `/vantage-tech.png`, and the five `/fonts/thmanyah*.woff2` files. Vite fingerprints generated JS and CSS under `/assets/`.

## Mismatches to fix

- The two intended landing pages respond with the same English SPA shell. Their visible portfolio content, canonical, alternates and JSON-LD are missing from the initial response.
- Navigation creates multiple crawlable shells for the same localized content. Unknown paths also return HTTP 200.
- The apex redirects temporarily to `www`, but the static OG URL uses the apex. The live `/ar/` returns 404.
- `/sitemap.xml` returns an HTML shell and `robots.txt` has no sitemap declaration or explicit AI policy.
- Section navigation uses buttons and is absent visually on mobile. Project screenshots lack intrinsic dimensions and use full-size originals. The social preview and one screenshot used JPEG bytes at `.png` URLs.
