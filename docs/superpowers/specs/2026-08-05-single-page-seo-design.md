# Single-Page SEO and Lead Generation Design

**Date:** 2026-08-05

**Status:** Approved design, pending implementation plan
**Site:** https://zakariasafi.me

## Objective

Improve organic discovery among Arabic-speaking prospects and make the existing portfolio more effective at generating qualified WhatsApp conversations. The target audience is:

- Online store owners.
- Experts and service providers who need a professional portfolio website.
- Companies that need a corporate or institutional website.

The site will continue to support Arabic and English. No country-specific targeting will be added; the Arabic-speaking market is the preferred service area.

## Constraints

- Keep the site as a single page per language. Do not create new service pages.
- Keep the existing WhatsApp link as the only WhatsApp call to action. Do not add or duplicate a WhatsApp button.
- Preserve the current visual identity, animation behavior, projects, and overall layout.
- Do not invent business claims, a physical address, reviews, credentials, or client results.
- Avoid keyword stuffing and metadata that search engines do not use, such as `meta keywords`.

## Chosen Approach

Use a conversion-focused, single-page SEO approach. Add a focused services section to the existing homepage, strengthen the crawlable bilingual document output, consolidate duplicate section routes, add accurate structured data and sitemap signals, and reduce image transfer cost.

This approach has less keyword isolation than dedicated service pages, but it respects the single-page constraint and provides the highest-value improvements available within that boundary.

## Information Architecture

The canonical indexable pages are:

- `https://zakariasafi.me/ar`
- `https://zakariasafi.me/en`

The homepage content order becomes:

1. Hero
2. About
3. Services
4. Experience
5. Projects

The in-page navigation gains a Services item. Section navigation uses same-page anchors. Existing section-style routes such as `/ar/about`, `/ar/experience`, and `/ar/projects` remain backward-compatible entry points, but their canonical URL is always the corresponding language homepage. New navigation does not create or promote section-style routes.

Only `/ar` and `/en` are listed in the sitemap.

## Services Content

Add a bilingual Services section with one `h2` and three semantic service entries using `h3` headings:

1. E-commerce website development.
2. Professional portfolio websites for experts and service providers.
3. Corporate and institutional website development.

Each entry contains concise, natural copy that describes the prospective client's need, the solution Zakaria provides, and the business outcome. Copy must be factual and consistent with the projects already shown on the site. Relevant existing projects may be named or referenced in the text, but no new project detail pages will be created.

The existing WhatsApp icon in the hero remains unchanged and is not repeated in the Services section.

## Search Metadata

Each language homepage receives localized:

- Document title.
- Meta description.
- Canonical URL.
- `hreflang` alternates for `ar`, `en`, and `x-default`.
- Open Graph title, description, locale, URL, image, and image alt text.
- X/Twitter title, description, image, and image alt text.

The Arabic metadata emphasizes Arabic-language web development services without claiming a fixed location. The English metadata presents the same offer accurately for English-language searchers.

The production build must emit the localized metadata and complete primary page content in the initial HTML for both `/ar` and `/en`. Client-side hydration then preserves the existing interactivity and language switching.

## Structured Data

Add valid JSON-LD on each canonical homepage using entities that match the actual site:

- `ProfilePage` for the portfolio page.
- `Person` for Zakaria Safi.
- `WebSite` for the bilingual website.
- A service offer catalog describing the three approved services, using schema.org vocabulary that accurately represents the content.

The graph includes the public website URL, display name, localized description, existing GitHub, LinkedIn, and X profile URLs, the existing portfolio preview image, the existing WhatsApp contact number, and an Arabic-speaking service area. It must not use `LocalBusiness`, a postal address, ratings, prices, or other facts that are not present and verified.

JSON-LD text is localized where appropriate and must serialize safely without creating duplicate scripts during client navigation.

## Crawling and URL Signals

- Create `public/sitemap.xml` containing the two canonical language URLs and their language alternates.
- Add the sitemap URL to `public/robots.txt` while preserving crawl access.
- Consolidate duplicate section routes to their language homepage.
- Keep the root route as a user-facing language redirect, but ensure it does not become a competing canonical URL.
- Preserve useful 404 behavior for invalid language or section paths.

## Image and Performance Work

Project images currently include multiple PNG files larger than 1 MB, with the largest exceeding 4 MB. Generate appropriately sized modern variants for images used by the Projects section and serve them responsively while retaining a compatible fallback where needed.

For each project image:

- Keep an ordinary `img` fallback source.
- Add responsive source candidates and a correct `sizes` value.
- Set intrinsic `width` and `height` to reduce layout shift.
- Preserve lazy loading for below-the-fold images.
- Use localized, descriptive alt text that describes the project preview rather than repeating keywords.
- Prefer descriptive filenames for generated optimized assets.

Do not reduce images to a visibly degraded quality. The existing Open Graph preview remains at its suitable social sharing dimensions unless testing shows a concrete problem.

## Component Boundaries

- `Services`: renders the localized service section only.
- SEO metadata utility/component: owns canonical, alternate, social, and robots-related head elements without accumulating duplicates.
- Structured data utility/component: builds and injects the localized JSON-LD graph.
- Locale resources: own all Arabic and English user-facing content, including navigation, services, metadata, and image alt text.
- Build-time SEO generation: produces localized crawlable output and static sitemap assets without coupling presentation components to build scripts.

These units should expose data-driven interfaces and follow the existing i18n and component patterns.

## Data Flow

1. The route determines the active language.
2. i18n supplies localized visible content and SEO strings.
3. The Services component renders the three approved services.
4. SEO utilities derive the canonical URL and language alternates from the canonical language route, not from section aliases.
5. The structured data builder consumes the same localized service data to avoid visible-content/schema drift.
6. The production build generates localized indexable output and static crawl assets.

## Error and Fallback Behavior

- If a translation is unavailable, use the existing English fallback rather than rendering empty metadata.
- If the browser blocks local storage, route language remains authoritative and the existing fallback behavior continues.
- Invalid language or route segments continue to render the 404 page.
- Optimized images retain a fallback source so unsupported formats do not create broken previews.
- Build-time SEO generation must fail the build when a canonical page, required metadata field, or sitemap entry is missing.

## Verification Strategy

Automated checks will verify:

- The Services section contains exactly the three approved services in both languages.
- Heading hierarchy contains one primary page heading and semantic service headings.
- Canonical and `hreflang` output for `/ar` and `/en` is correct.
- Section aliases do not declare themselves as separate canonical pages.
- JSON-LD parses and contains only factual entities and the three services.
- `sitemap.xml` contains only the two canonical language URLs with alternates.
- `robots.txt` remains permissive and references the sitemap.
- Project images include intrinsic dimensions, descriptive localized alt text, lazy loading, and responsive sources.

Project verification includes the repository's lint and production build commands, targeted SEO tests, a browser inspection in Arabic and English at mobile and desktop sizes, and an available Lighthouse/PageSpeed-style baseline after the production build.

## Acceptance Criteria

- The site still has one content page per language and no new service page routes.
- The existing WhatsApp icon remains the sole WhatsApp call to action.
- Arabic and English homepages include the approved Services section in the approved location.
- Search metadata, canonical URLs, language alternates, JSON-LD, sitemap, and robots configuration are valid and consistent.
- Duplicate section URLs no longer compete as canonical documents.
- Project image payload is materially reduced without visible quality loss.
- Lint, production build, targeted automated checks, and browser verification pass.
- The final handoff includes concise Google Search Console sitemap submission steps and does not promise an immediate ranking increase.

## Sources

- [Google Search Central: JavaScript SEO basics](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics)
- [Google Search Central: Canonical URLs](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls)
- [Google Search Central: Image SEO best practices](https://developers.google.com/search/docs/appearance/google-images)
- [Google Search Central: ProfilePage structured data](https://developers.google.com/search/docs/appearance/structured-data/profile-page)
