# SEO audit — https://www.zakariasafi.me

_Generated 2026-11-24T09:35:52.843Z · 1 pages fetched, full sitemap coverage · seo-audit 2.2.1_

## SEO Score: 60/100 (1 pages fetched, full sitemap coverage)

1 pages scored · 0 capped at 60 by a P1 · site-level penalty 18.

| Severity | Count | Meaning |
|---|---:|---|
| P1 | 1 | Crawl or index blocker — the page may not be indexed at all |
| P2 | 4 | Indexed but misrepresented |
| P3 | 5 | Hygiene |

### Where the points went (`docs/11` rows)

| Category | P1 | P2 | P3 | ≈ points lost |
|---|---:|---:|---:|---:|
| Indexability & crawl foundation | 0 | 2 | 1 | 12 |
| Rendering & mobile parity | 1 | 1 | 0 | 18 |
| Structured data | 0 | 0 | 1 | 2 |
| Metadata quality | 0 | 0 | 0 | 0 |
| Internationalization | 0 | 0 | 0 | 0 |
| Headings, semantics & links | 0 | 1 | 1 | 8 |
| Images | 0 | 0 | 0 | 0 |

Core Web Vitals are not in this number: they come from CrUX field data, not from fetching a page (`docs/05`).

## GEO Score: 19/100 (provisional — automated) · capped at 60 by a GEO blocker

| Category | Points | / Max | Basis |
|---|---:|---:|---|
| AI crawler configuration | 0 | 20 | no explicit AI-crawler position in robots.txt |
| Extractable rendering | 0 | 20 | 0/1 pages carry their own subject in the raw HTML |
| Extractable content structure _(heuristic)_ | 0 | 15 | 0/1 pages have ≥2 h2/h3 and a list or table (heuristic — whether sections lead with a direct answer needs a reader) |
| Entity authority | 0 | 20 | homepage: no Organization/Person entity, 0 sameAs link(s), no WebSite node — About page and author bylines still need a human check |
| Classic-SEO prerequisite | 9 | 15 | round(SEO Score 60 × 0.15) |
| No wasted/counterproductive GEO effort _(heuristic)_ | 10 | 10 | not measurable by fetching pages — awarded provisionally; verify no unsourced 'AI SEO' tactics were shipped |

Caveat: these are technical SEO/GEO readiness scores, not a ranking or traffic guarantee. Off-page factors — backlinks, content quality, competition — are out of scope and are not measured here.

## Crawler access (robots.txt, resolved per RFC 9309)

| Crawler | Kind | Used by | Homepage | Rule group |
|---|---|---|---|---|
| Googlebot | Search engine | Google (and Brave, which follows Googlebot rules) | ✅ allowed | `googlebot` |
| Bingbot | Search engine | Bing, plus DuckDuckGo and Yahoo results (largely Bing-sourced) and Copilot answers built on Bing | ✅ allowed | `bingbot` |
| YandexBot | Search engine | Yandex | ✅ allowed | `*` |
| Applebot | Search engine | Apple — Siri, Spotlight, Safari Suggestions | ✅ allowed | `googlebot` |
| DuckDuckBot | Search engine | DuckDuckGo's own crawler | ✅ allowed | `*` |
| Baiduspider | Search engine | Baidu | ✅ allowed | `*` |
| Yeti | Search engine | Naver | ✅ allowed | `*` |
| SeznamBot | Search engine | Seznam | ✅ allowed | `*` |
| OAI-SearchBot | AI search / answers | ChatGPT search | ✅ allowed | `*` |
| ChatGPT-User | AI, user-triggered | ChatGPT, fetching on a user's request | ✅ allowed | `*` |
| GPTBot | AI training | OpenAI model training | ✅ allowed | `*` |
| Claude-SearchBot | AI search / answers | Claude search | ✅ allowed | `*` |
| Claude-User | AI, user-triggered | Claude, fetching on a user's request | ✅ allowed | `*` |
| ClaudeBot | AI training | Anthropic model training | ✅ allowed | `*` |
| PerplexityBot | AI search / answers | Perplexity search index | ✅ allowed | `*` |
| Perplexity-User | AI, user-triggered | Perplexity, fetching on a user's request | ✅ allowed | `*` |
| Google-Extended | AI training | Gemini training & grounding (not Search) | ✅ allowed | `*` |
| Applebot-Extended | AI training | Apple model training (not Siri/Spotlight) | ✅ allowed | `*` |
| Meta-ExternalAgent | AI training | Meta model training | ✅ allowed | `*` |
| Meta-WebIndexer | AI search / answers | Meta AI search results and citations | ✅ allowed | `*` |
| Meta-ExternalFetcher | AI, user-triggered | Meta AI, fetching on a user's request (may bypass robots.txt) | ✅ allowed | `*` |
| Amazonbot | AI training | Amazon products and services; may train Amazon AI models | ✅ allowed | `*` |
| Amzn-SearchBot | AI search / answers | Alexa and Amazon search experiences (not AI training) | ✅ allowed | `*` |
| Amzn-User | AI, user-triggered | Alexa, fetching on a user's request | ✅ allowed | `*` |
| CCBot | AI training | Common Crawl (feeds many models) | ✅ allowed | `*` |
| Bytespider | AI training | ByteDance model training | ✅ allowed | `*` |
| DuckAssistBot | AI search / answers | DuckDuckGo AI answers | ✅ allowed | `*` |
| MistralAI-User | AI, user-triggered | Mistral Vibe, fetching on a user's request | ✅ allowed | `*` |
| MistralAI-Index | AI search / answers | Mistral search index (not AI training) | ✅ allowed | `*` |
| MistralAI-Training | AI training | Mistral model training | ✅ allowed | `*` |

Allowing or blocking an AI crawler is a policy decision (`docs/10`), not a defect. Blocking a search engine is a defect unless someone decided it.

## Findings

### P1 — blockers (1)

- **Missing page answers 200 — a soft 404. Google drops the URL and, over time, discounts the template. Check for a `loading.tsx`/Suspense boundary above the segment that turns the refusal into a 200 shell.**
  - `https://www.zakariasafi.me/seo-audit-nonexistent-mwui1x33`
  - Rule: `docs/13` · Rendering & mobile parity

### P2 — misrepresentation (4)

- **No sitemap URLs found (none advertised in robots.txt, and /sitemap.xml is missing or empty). Only the homepage was audited.**
  - `/sitemap.xml`
  - Rule: `docs/06` · Indexability & crawl foundation
- **No `rel=canonical`. Without one, Google picks a canonical from the duplicate cluster itself — and it may not pick this URL.**
  - `/`
  - Rule: `docs/01` · Indexability & crawl foundation
- **The raw HTML does not contain this page's own subject ("Zakaria Safi") — only 0 words, all of it site chrome. The content arrives with JavaScript, and most AI crawlers never run any.**
  - `/`
  - Rule: `docs/05` · Rendering & mobile parity
- **No crawlable internal `<a href>` links. Router `onClick` handlers do not build a link graph.**
  - `/`
  - Rule: `docs/04` · Headings, semantics & links

### P3 — hygiene (5)

- **No `Sitemap:` line in robots.txt. It is the one discovery hint every engine reads without being asked.**
  - `/robots.txt`
  - Rule: `docs/06` · Indexability & crawl foundation
- **robots.txt takes no explicit position on AI crawlers. Training, AI-search and user-triggered fetching are three different decisions; defaulting silently is not one of them.**
  - `/robots.txt`
  - Rule: `docs/10` · GEO (AI search readiness)
- **No `<h1>`.**
  - `/`
  - Rule: `docs/04` · Headings, semantics & links
- **No JSON-LD. Structured data does not raise rankings, but it is how the entities on the page are stated unambiguously.**
  - `/`
  - Rule: `docs/08` · Structured data
- **The homepage declares no `Organization` or `Person` entity in JSON-LD. Answer engines resolve *who* is speaking from it, and `sameAs` on it is the highest-leverage GEO addition.**
  - `/`
  - Rule: `docs/10` · GEO (AI search readiness)


## Pages fetched

- `/` — 200 — Zakaria Safi | Front-End Engineer
