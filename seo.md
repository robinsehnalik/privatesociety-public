# Early-Stage SEO Optimization Strategy — Private Society (`privatesocietylab.com`)

This document outlines how we audited and maximally improved Search Engine Optimization (SEO), AI Answer Engine Optimization (GEO), crawl budget discipline, semantic HTML structure, and Core Web Vitals for **Private Society** during its initial deployment phase.

---

## 1. Executive Summary

In the early stage of deploying an invitation-only brand (`https://privatesocietylab.com`), search engines have zero historical backlink authority to rely on. Every crawl cycle, meta tag, landmark element, and structured data node must communicate an unambiguous identity:

1. **Entity Clarity (`Schema.org` JSON-LD):** Search engines and AI answer engines (Google Rich Results, Perplexity, ChatGPT Search) immediately recognize **Private Society** as a Prague-based luxury gastronomical organization and **Session #2: Heat & Grill 2** as a scheduled, invitation-only `FoodEvent` in North Bohemia.
2. **Strict Indexation Hygiene (`robots` & `sitemap.xml`):** Only high-value public pages (`/`, `/terms`, `/privacy`) are indexed. Internal email template previews (`/emails/preview`), authentication screens (`/login`), member-only portals (`/portal`), and error routes (`/404`) are strictly excluded via `<meta name="robots" content="noindex, nofollow">` and `robots.txt`.
3. **Flawless On-Page Semantics & Core Web Vitals:** Invalid nested `<main>` tags were eliminated, broken cross-page anchor links (`#register` -> `/#register`) were repaired, fallback `<picture>` `srcset` MIME mismatches were fixed, and LCP fetch priority contention was resolved.

---

## 2. Key Technical SEO Improvements Implemented

### 2.1. JSON-LD Structured Data (`Organization`, `WebSite`, & `FoodEvent`)
- **Before:** Zero structured data (`application/ld+json`) existed on any page. Search engines had to guess the entity type, geographic focus, and event details from unstructured poster text.
- **After:**
  - [`src/components/BaseHead.astro`](src/components/BaseHead.astro) now automatically emits a linked `@graph` containing `Organization` (`#organization`, based in Prague, CZ, with official logo and description) and `WebSite` (`#website`, `inLanguage: "en-US"`) on all indexable pages.
  - [`src/pages/index.astro`](src/pages/index.astro) injects a `FoodEvent` schema for **Session #2: Heat & Grill 2** (`startDate`, `EventScheduled`, `OfflineEventAttendanceMode`, `maximumAttendeeCapacity: 40`, `North Bohemia, CZ` location, linked to `#organization`).

### 2.2. Indexation Control & Crawl Budget Protection (`noindex` & `robots.txt`)
- **Before:**
  - [`src/components/BaseHead.astro`](src/components/BaseHead.astro) hardcoded `<meta name="robots" content="index, follow">` on every route.
  - `/emails/preview` (an internal Resend template testbench containing sample user data like `"Julian Vance"`) was publicly indexable.
  - `/404` emitted `index, follow` with a self-referencing canonical URL to whatever broken path was requested, creating soft-404 index bloat.
  - `/login` was listed in `sitemap.xml` with priority `0.6` and lacked its own meta description (duplicating the homepage description).
- **After:**
  - Added a `noindex?: boolean` prop across [`BaseHead.astro`](src/components/BaseHead.astro), [`BaseLayout.astro`](src/layouts/BaseLayout.astro), and [`PageLayout.astro`](src/layouts/PageLayout.astro) that switches `<meta name="robots">` to `noindex, nofollow` and suppresses JSON-LD output.
  - Enabled `noindex={true}` on [`src/pages/404.astro`](src/pages/404.astro), [`src/pages/login.astro`](src/pages/login.astro), [`src/pages/portal.astro`](src/pages/portal.astro), and [`src/pages/emails/preview.astro`](src/pages/emails/preview.astro).
  - Updated [`src/pages/robots.txt.ts`](src/pages/robots.txt.ts) to disallow `/emails/` and `/login` alongside `/admin/`, `/portal`, and `/api/`.

### 2.3. Real CMS Timestamps in `sitemap.xml`
- **Before:** [`src/pages/sitemap.xml.ts`](src/pages/sitemap.xml.ts) used `new Date().toISOString().split('T')[0]` on every request, telling Googlebot that every page was modified today on every single crawl—a known anti-pattern that causes crawlers to distrust `<lastmod>`.
- **After:** [`src/pages/sitemap.xml.ts`](src/pages/sitemap.xml.ts) queries the actual `_updatedAt` / `_createdAt` date from the KideCMS singletons (`homepage`, `terms`, `privacy`) with a deterministic fallback (`2026-10-25`), and removes the non-content `/login` route.

### 2.4. Title Tag, Brand Alignment, & OpenGraph Fixes
- **Before:**
  - When `cmsData.metaTitle` was unset, [`src/pages/index.astro`](src/pages/index.astro) generated a truncated title mid-sentence: `PRIVATE SOCIETY — ${t.hero.lead.slice(0, 40)}...`.
  - Fallback copy in [`src/i18n/translations.ts`](src/i18n/translations.ts) contradicted [`src/site-config.yml`](src/site-config.yml) and [`src/cms/cms.config.ts`](src/cms/cms.config.ts).
  - `cmsData.ogImage` was configured in the CMS schema for the homepage but never passed to `<BaseLayout>` in [`src/pages/index.astro`](src/pages/index.astro).
  - [`src/components/BaseHead.astro`](src/components/BaseHead.astro) hardcoded `openGraph.image.type = 'image/png'` even when a `.jpg`, `.webp`, or `.avif` social image was used, and omitted `og:locale` and `theme-color`.
- **After:**
  - Replaced the truncated fallback title with `PRIVATE SOCIETY — Invitation-Only Gastronomical Assembly & Grand Cru Pairings`.
  - Aligned [`src/i18n/translations.ts`](src/i18n/translations.ts) fallback copy with the live-fire culinary degustation and biodynamic Grand Cru wine positioning in `site-config.yml` and `cms.config.ts`.
  - Wired `image={cmsData.ogImage || '/images/preview.png'}` in [`src/pages/index.astro`](src/pages/index.astro) and added dynamic MIME type resolution (`image/jpeg`, `image/webp`, `image/avif`, `image/png`), `og:locale` (`en_US`), and `<meta name="theme-color" content="#0d0d0d">` in [`src/components/BaseHead.astro`](src/components/BaseHead.astro).

### 2.5. Semantic HTML Landmarks & Internal Link Graph Repair
- **Before:**
  - [`src/layouts/BaseLayout.astro`](src/layouts/BaseLayout.astro) wrapped `<slot />` inside `<main>`, while [`index.astro`](src/pages/index.astro), [`privacy.astro`](src/pages/privacy.astro), [`terms.astro`](src/pages/terms.astro), [`login.astro`](src/pages/login.astro), [`portal.astro`](src/pages/portal.astro), and [`emails/preview.astro`](src/pages/emails/preview.astro) rendered a second nested `<main>` inside the slot. On the homepage, the `<section>` containing the `<h1>` sat outside the inner `<main>`.
  - [`src/components/Header.astro`](src/components/Header.astro) and [`src/components/Footer.astro`](src/components/Footer.astro) linked "REQUEST ACCESS" to `#register` instead of `/#register`, creating dead anchor links on `/terms` and `/privacy`.
- **After:**
  - Replaced all inner `<main>` wrappers with `<div>` containers so every page has exactly one valid HTML5 `<main>` landmark enclosing all primary content (including the `<h1>`).
  - Updated header and footer CTA links to `${homePath}#register` (`/#register`) so internal link equity flows cleanly back to the homepage registration section from every route.

### 2.6. Core Web Vitals (LCP & CLS) Optimization
- **Before:**
  - In [`src/pages/index.astro`](src/pages/index.astro), the `<picture>` fallback `<img>` had `.avif` sources inside its `srcset` (`srcset="/images/hero-bg-640.avif 640w, /images/hero-bg-1024.avif 1024w, /images/hero-bg-1376.jpg 1376w"`), breaking fallback rendering on crawlers/browsers that do not support AVIF.
  - [`src/components/Header.astro`](src/components/Header.astro) set `fetchpriority="high"` on the navbar logo (`/images/logo-96.png`), competing with the full-bleed hero LCP image (`hero-bg`).
  - Content images in [`src/pages/portal.astro`](src/pages/portal.astro), [`src/components/PastSessionCard.astro`](src/components/PastSessionCard.astro), and [`src/components/PaymentTierCard.astro`](src/components/PaymentTierCard.astro) lacked explicit `width` and `height` attributes, risking Cumulative Layout Shift (CLS).
- **After:**
  - Cleaned up the `<picture>` fallback `<img>` in [`src/pages/index.astro`](src/pages/index.astro) with descriptive alt text (`"Private Society live-fire gastronomical assembly and Grand Cru wine tasting"`).
  - Removed `fetchpriority="high"` from the header logo so only the primary hero LCP candidate receives `fetchpriority="high"`.
  - Added intrinsic `width`, `height`, `loading="lazy"`, and `decoding="async"` attributes to all content and gallery images.
