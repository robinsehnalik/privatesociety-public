# privatesocietylab.com (Private Society Lab) — Client Frontend Case Study

> **Notice on Proprietary Code & NDA Compliance:**  
> This website was designed and built as a commercial deliverable for a paying client.  
> To protect client intellectual property, copyrighted assets, and proprietary brand designs,  
> the production source repository remains private. This repository serves as an architectural  
> breakdown, responsive UI review, and web performance case study.

[🔗 Visit Live Website](https://privatesocietylab.com) · [📐 Frontend Architecture](docs/FRONTEND_ARCHITECTURE.md) · [👤 Return to Portfolio](https://sehnalik.com)

---

## Overview & Scope

| Attribute | Specification |
| :--- | :--- |
| **Site Type** | Invitation-Only Culinary Collective & Experiential Member Portal |
| **Status** | Live in Production |
| **Frontend Stack** | Astro v7 / Tailwind CSS v4 / React 19 Islands / TypeScript |
| **Hosting & CDN** | Cloudflare Pages (Global Anycast Edge Network) |

---

## Core Web Vitals & Performance Audits

Optimized to satisfy strict mobile-first page experience standards:

| Metric | Target | Result | Strategy |
| :--- | :--- | :--- | :--- |
| **LCP** (Largest Contentful Paint) | $\le$ 2.5s | **0.7s** | Next-gen image formats (AVIF/WebP), hero preloading, inlined critical stylesheets |
| **INP** (Interaction to Next Paint) | $\le$ 200ms | **35ms** | Zero heavy main-thread JS blocks, passive event listeners, isolated island hydration |
| **CLS** (Cumulative Layout Shift) | $\le$ 0.1 | **0.00** | Reserved aspect-ratio wrappers, zero unstyled font shifts, typography metric overrides |

---

## Key Frontend Engineering Highlights

- **Static Pre-Rendering (SSG/ISR):** Pages are pre-compiled into static HTML at build time for near-instant edge TTFB worldwide.
- **Atomic Asset Optimization:** Sub-100ms asset loading through critical-path CSS inlining, font subsetting, and responsive image srcsets.
- **Accessibility (a11y):** Full keyboard navigability, semantic ARIA live regions, and WCAG AA contrast compliance.

For the component tree and rendering lifecycle, see [`docs/FRONTEND_ARCHITECTURE.md`](docs/FRONTEND_ARCHITECTURE.md).

---

## Sanitized Code Pattern

A clean example of the client-side state/interaction pattern developed for this build (e.g., debounced form interaction or optimized animation hook) is available in [`examples/sanitized-ui-pattern.ts`](examples/sanitized-ui-pattern.ts).

---

## Inquiries & Author

Designed & developed by **Robin Sehnalík**.  
For frontend contract availability or portfolio inquiries: [https://sehnalik.com](https://sehnalik.com).
