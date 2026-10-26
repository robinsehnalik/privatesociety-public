# privatesocietylab.com (Private Society Lab) — Architectural Case Study

> **Notice on Proprietary Code & NDA Compliance:**  
> This website was designed and built as a commercial deliverable for a paying client.  
> To protect client intellectual property, copyrighted assets, and proprietary brand designs,  
> the production source repository remains private. This repository serves as an architectural  
> breakdown, responsive UI review, and web performance case study.

[🔗 Visit Live Website](https://privatesocietylab.com) · [📐 System Architecture](architecture.md) · [🔍 SEO Strategy](seo.md) · [👤 Return to Portfolio](https://sehnalik.com)

---

<p align="center">
  <img src="images/ps-1.webp" alt="Private Society — Desktop Landing & Hero Showcase" width="100%">
</p>

---

## Overview & Scope

| Attribute | Specification |
| :--- | :--- |
| **Site Type** | Invitation-Only Culinary Collective & Experiential Member Portal |
| **Status** | Live in Production |
| **Runtime Topology** | Edge-First SSR + Static Assets (Cloudflare Workers Runtime) |
| **Frontend Stack** | Astro v7 / Tailwind CSS v4 (LightningCSS) / Vanilla TypeScript |
| **Data & Storage** | Cloudflare D1 (SQLite) / Cloudflare R2 Bucket (`privatesociety-assets`) |
| **CMS & Mail Engine** | Embedded KideCMS Runtime / Resend Transactional Mail API |
| **Architecture Specification** | Fully unified master document in [`architecture.md`](architecture.md) |
| **SEO & Crawl Strategy** | Technical audit & indexation report in [`seo.md`](seo.md) |

---

## Visual Showcase & Interface Gallery

Private Society implements a **Neo-Brutalist Archival Dispatch** aesthetic across all viewports, pairing high-contrast typography (`Dela Gothic One` & `Space Mono`) with tactile offset drop shadows and warm archival paper textures.

### Desktop Experience

<p align="center">
  <img src="images/ps-2.webp" alt="Private Society — Gastronomical Philosophy & Session Briefing" width="100%">
  <em>Curation Philosophy & Assembly Briefing — Session scheduling, live-fire culinary principles, and pillar archive.</em>
</p>

<p align="center">
  <img src="images/ps-3.webp" alt="Private Society — Encrypted Member Portal" width="100%">
  <em>Encrypted Member Portal (/portal) — Gated access with tasting flight cards, timeline schedules, and QR payment tier selection.</em>
</p>

### Mobile-First Responsive Engineering

Strict aspect-ratio containers, fluid clamp typography, and zero-framework scripts guarantee zero Cumulative Layout Shift (CLS $\le$ 0.02) and instantaneous touch response on mobile viewports.

<div align="center">

| Mobile Hero & Navigation | Mobile Session Briefing & Admission |
| :---: | :---: |
| <img src="images/ps-4.webp" alt="Mobile Hero & Navigation" width="340px"> | <img src="images/ps-5.webp" alt="Mobile Session Briefing & Admission" width="340px"> |

</div>

---

## Core Web Vitals & Real Performance Audits

<p align="center">
  <img src="images/lighthouse.webp" alt="Lighthouse 13.5.0 Multi-Region Audit — 100/100/100/100 Perfect Scores" width="100%">
</p>

### Performance Engineering Takeaways
- **100/100 Across All Categories:** Achieved straight 100/100/100/100 scores for Performance, Accessibility, Best Practices, and SEO across global edge testing locations.
- **Sub-500ms Global LCP:** Critical CSS inlining via `inlineStylesheets: "always"`, combined with LightningCSS minification and Cloudflare Pages edge delivery, maintains rapid Largest Contentful Paint worldwide.
- **Zero Blocking Time (TBT = 0ms):** Eliminating client-side framework runtimes on public routes guarantees 0ms main-thread blocking time.
- **Zero Layout Shift (CLS = 0):** Monospace tabular numbers in countdown intervals and rigid editorial layout wrappers eliminate visual jitter.

For full benchmark analysis and technical drivers, see [`architecture.md § 8`](architecture.md#8-frontend-performance--core-web-vitals).

---

## Technical SEO, Crawl Discipline & Structured Data

In an early-stage deployment with zero initial backlink authority, the search footprint is protected through strict indexation discipline, semantic HTML landmarks, and rich machine-readable entities:

- **Entity Clarity via Schema.org JSON-LD:** Every public route emits a linked `@graph` defining the brand as an `Organization` (Prague, CZ) and scheduled degustation assemblies as a `FoodEvent` (`Session #2: Heat & Grill 2` with attendance modes and capacity).
- **Indexation Hygiene & Soft-404 Elimination:** Restricted views (`/portal`, `/login`, `/emails/preview`, and `/404`) enforce `<meta name="robots" content="noindex, nofollow">` and crawler disallow rules in `robots.txt`, concentrating domain equity exclusively on indexable public routes.
- **Dynamic XML Sitemap:** Automatically reflects real `_updatedAt` timestamps queried directly from KideCMS singletons, eliminating daily build-date falsification.
- **Resource Priority & Semantics:** Fixed `<picture>` fallback MIME definitions, removed competing `fetchpriority="high"` flags from logos to preserve LCP candidate bandwidth, and restored clean single `<main>` HTML5 document landmarks.

For the full technical SEO audit and implementation details, see **[`seo.md`](seo.md)**.

---

## Key Engineering Highlights

- **Unified Master Architecture ([`architecture.md`](architecture.md)):** An exhaustive specification covering Cloudflare Workers edge execution, D1 SQLite schema migrations, and transactional email triggers.
- **Zero-Trust Security & Cryptography:** Passwordless magic links with SHA-256 tokens and atomic SQLite consumption (`UPDATE ... RETURNING`), paired with stateless HMAC-SHA256 signed session cookies via Web Crypto API.
- **Zero-Framework Runtime Baseline:** Built with Astro v7. Editorial layouts, tasting archives, and menus ship with zero JavaScript framework runtime, delivering instant responsiveness without client-side hydration delays.
- **Critical CSS Inlining:** Stylesheets are compiled with LightningCSS and inlined directly into document `<head>`, eliminating render-blocking CSS network roundtrips.
- **Invitation Vetting Flow:** Progressive client-side form captures applicant handles (Signal, Telegram, PGP), pre-fills referral tokens from URL search parameters (`?ref=CODE`), and dispatches to edge endpoints.
- **Monospace Real-Time Counter:** Zero-dependency session countdown timer formatted with tabular figures to eliminate layout jitter.

---

## Showcase Components & Sanitized Patterns

To demonstrate real engineering approaches used in the production application without exposing proprietary business rules or credentials, the following sanitized components are available:

- 📑 [`components/SanitizedRegistrationForm.astro`](components/SanitizedRegistrationForm.astro) — High-contrast invitation admission form with URL referral parameter extraction and multi-phase submission state machine.
- ⏱️ [`components/SanitizedCountdown.astro`](components/SanitizedCountdown.astro) — Zero-dependency real-time countdown timer with tabular monospace typography to prevent CLS.
- ⚡ [`examples/sanitized-ui-pattern.ts`](examples/sanitized-ui-pattern.ts) — Clean TypeScript pattern demonstrating referral parsing, secure messaging handle validation, and async error recovery.

---

## Inquiries & Author

Designed & developed by **Robin Sehnalík**.  
For frontend contract availability or portfolio inquiries: [https://sehnalik.com](https://sehnalik.com).
