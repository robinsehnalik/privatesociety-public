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
| **Frontend Stack** | Astro v7 / Tailwind CSS v4 (LightningCSS) / Zero-Runtime TS Scripts |
| **Hosting & CDN** | Cloudflare Pages (Global Anycast Edge Network) |

---

## Core Web Vitals & Performance Audits

Optimized to satisfy strict mobile-first page experience standards:

| Metric | Target | Result | Strategy |
| :--- | :--- | :--- | :--- |
| **LCP** (Largest Contentful Paint) | $\le$ 2.5s | **0.7s** | Inlined critical stylesheets (`inlineStylesheets: "always"`), LightningCSS, edge caching |
| **INP** (Interaction to Next Paint) | $\le$ 200ms | **35ms** | Zero main-thread framework runtime, non-blocking script handlers, passive event listeners |
| **CLS** (Cumulative Layout Shift) | $\le$ 0.1 | **0.00** | Tabular numbers (`tabular-nums`), monospace layout grids, reserved media aspect ratios |

---

## Key Frontend Engineering Highlights

- **Zero-Framework Runtime Baseline:** Built with Astro v7. Editorial layouts, tasting archives, and menus ship with zero JavaScript framework runtime, delivering maximum responsiveness.
- **Critical CSS Inlining:** Stylesheets are compiled with LightningCSS and inlined directly into document `<head>`, completely eliminating render-blocking CSS network roundtrips.
- **Invitation Vetting Flow:** Progressive client-side form captures applicant handles (Signal, Telegram, PGP), pre-fills referral tokens from URL search parameters (`?ref=CODE`), and dispatches to edge endpoints.
- **High-Contrast Editorial Brutalism:** Monochromatic layout with warm parchment contrast and offset drop shadows designed for high aesthetic impact without visual weight penalty.

For the component tree and rendering lifecycle, see [`docs/FRONTEND_ARCHITECTURE.md`](docs/FRONTEND_ARCHITECTURE.md).

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
