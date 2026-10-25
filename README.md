# privatesocietylab.com (Private Society Lab) — Client Frontend & Architecture Showcase

> **Notice on Proprietary Code & NDA Compliance:**  
> This website was designed and built as a commercial deliverable for a paying client.  
> To protect client intellectual property, copyrighted assets, and proprietary brand designs,  
> the production source repository remains private. This repository serves as an architectural  
> breakdown, responsive UI review, and web performance case study.

[🔗 Visit Live Website](https://privatesocietylab.com) · [🏛️ System Architecture](architecture.md) · [📐 Frontend Architecture](docs/FRONTEND_ARCHITECTURE.md) · [👤 Return to Portfolio](https://sehnalik.com)

---

## Overview & Scope

| Attribute | Specification |
| :--- | :--- |
| **Site Type** | Invitation-Only Culinary Collective & Experiential Member Portal |
| **Status** | Live in Production |
| **Architecture** | Edge-First SSR + Static Assets (Cloudflare Workers Runtime) |
| **Frontend Stack** | Astro v7 / Tailwind CSS v4 (LightningCSS) / Vanilla TypeScript |
| **Data & Storage** | Cloudflare D1 (SQLite) / Cloudflare R2 Bucket (`privatesociety-assets`) |
| **CMS & Mail Engine** | Embedded KideCMS Runtime / Resend Transactional Mail API |
| **Full Architecture** | Detailed deep-dive in [`architecture.md`](architecture.md) |

---

## 🏛️ Comprehensive System Architecture Deep-Dive

For an exhaustive, production-grade breakdown of the full-stack system architecture, see **[`architecture.md`](architecture.md)**. Key architectural pillars include:

1. **Edge Runtime Topology ([`architecture.md § 2`](architecture.md#2-high-level-system-architecture)):**
   - Astro 7 SSR executed globally on Cloudflare Workers edge nodes.
   - Zero-DDL hot paths with deterministic schema management via `schema.sql`.
   - Embedded administrative CMS (`/admin`) and dynamic member portal (`/portal`).

2. **Zero-Trust Security & Cryptography ([`architecture.md § 6`](architecture.md#6-security--cryptographic-architecture)):**
   - **Passwordless Magic Links:** One-time 256-bit random tokens hashed with SHA-256 at rest in D1 and consumed via single atomic `UPDATE ... RETURNING` queries to prevent race conditions and replay attacks.
   - **Stateless HMAC Sessions:** Signed `ps_member_session` cookies with constant-time verification using the native Web Crypto API (`crypto.subtle.verify`).
   - **Dual-Layer Rate Limiting:** Sliding-window protection per IP and per email in D1 with memory fallback and self-cleaning retention.

3. **Database Architecture & Data Flows ([`architecture.md § 3–4`](architecture.md#3-core-data-flows--sequence-diagrams)):**
   - Complete Mermaid sequence diagrams for guest allocation review and magic link authentication.
   - Comprehensive Entity-Relationship (ER) diagram for D1 tables (`cms_*`, `member_tokens`, `rate_limits`).
   - Lifecycle state machine: `pending` $\rightarrow$ `approved` $\rightarrow$ `paid` / `denied` with idempotent email dispatches.

4. **Automated Verification & Design System ([`architecture.md § 5, 7`](architecture.md#7-design-system--visual-styling)):**
   - Automated Vitest verification suite covering sessions, rate limiting, and email renderers.
   - Neo-brutalist archival design tokens, self-hosted WOFF2 fonts (`Dela Gothic One` & `Space Mono`), and cross-client transactional HTML emails.

---

## Core Web Vitals & Real Performance Audits

Audited via **Lighthouse 13.5.0** (Desktop) across multi-region edge testing nodes:

| Test Location | Performance | Accessibility | Best Practices | SEO | FCP | LCP | TTI | TBT | CLS |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **Germany** | **100** | **100** | **100** | **100** | 306ms | 346ms | 346ms | 0ms | 0.02 |
| **Finland** | **100** | **100** | **100** | **100** | 307ms | 342ms | 342ms | 0ms | 0.00 |
| **US East** | **100** | **100** | **100** | **100** | 494ms | 494ms | 494ms | 0ms | 0.02 |

### Performance Engineering Takeaways
- **Perfect 100 Across All Categories:** Achieved straight 100/100/100/100 scores for Performance, Accessibility, Best Practices, and SEO across all geographic testing nodes.
- **Sub-500ms Global LCP:** Critical CSS inlining via `inlineStylesheets: "always"`, combined with LightningCSS minification and Cloudflare Pages edge delivery, maintains Largest Contentful Paint between 342ms and 494ms worldwide.
- **Zero Blocking Time (TBT = 0ms):** Eliminating client-side framework runtimes on public routes guarantees 0ms main-thread blocking time.
- **Near-Zero Layout Shift (CLS $\le$ 0.02):** Monospace tabular numbers in countdown intervals and rigid editorial layout wrappers eliminate visual jitter.

---

## Key Frontend Engineering Highlights

- **Zero-Framework Runtime Baseline:** Built with Astro v7. Editorial layouts, tasting archives, and menus ship with zero JavaScript framework runtime, delivering instant responsiveness without client-side hydration delays.
- **Critical CSS Inlining:** Stylesheets are compiled with LightningCSS and inlined directly into document `<head>`, eliminating render-blocking CSS network roundtrips.
- **Invitation Vetting Flow:** Progressive client-side form captures applicant handles (Signal, Telegram, PGP), pre-fills referral tokens from URL search parameters (`?ref=CODE`), and dispatches to edge endpoints.
- **Monospace Real-Time Counter:** Zero-dependency session countdown timer formatted with tabular figures to eliminate layout jitter.

For client-side rendering strategies and UX patterns, see [`docs/FRONTEND_ARCHITECTURE.md`](docs/FRONTEND_ARCHITECTURE.md). For end-to-end edge infrastructure, see [`architecture.md`](architecture.md).

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
