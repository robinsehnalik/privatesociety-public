# Frontend Engineering & Design Decisions

This document outlines the frontend architectural principles, rendering strategies, performance budgets, and UI/UX design decisions implemented for **privatesocietylab.com** (Private Society Lab).

---

## Client Interaction & Rendering Flow

```mermaid
flowchart TD
    subgraph Browser [Client Viewport]
        DOM[Static High-Contrast Shell]
        UrlParser[URL Parameter Parser ?ref=]
        VettingEngine[Client Vetting & State Machine]
        UserAction[User Submits Credentials]
    end

    subgraph EdgeCDN [Edge Network / Cloudflare Pages]
        Cache[Edge Asset Cache & Inlined CSS]
    end

    subgraph HeadlessData [Headless CMS & Edge API]
        VettingEndpoint[API /api/cms/forms/submit/form-submissions]
        D1[Cloudflare D1 Ledger]
    end

    Cache -->|Sub-100ms TTFB| DOM
    DOM --> UrlParser
    UrlParser --> VettingEngine
    UserAction -->|Async Transmission| VettingEndpoint
    VettingEndpoint --> D1
```

---

## Architectural Principles

### 1. Zero-Framework Runtime Baseline & Astro v7
- **Astro v7 Engine:** Built using Astro v7 with Cloudflare Pages adapter. All public editorial content, tasting session archives, and culinary manifestos compile to static HTML at build time with **zero client-side framework overhead**.
- **Progressive Client Script Modules:** Interactive components (the member vetting form and the session countdown timer) use lightweight, zero-dependency vanilla TypeScript modules bundled natively by Astro.
- **Inlined Critical Stylesheets:** Configured with `build: { inlineStylesheets: "always" }`, ensuring stylesheets are embedded directly into document `<head>`, eliminating network round-trips for CSS.

### 2. Core Web Vitals Strategy

| Metric | Target | Strategy & Implementation |
| :--- | :--- | :--- |
| **LCP** (Largest Contentful Paint) | $\le$ 2.5s (Achieved: **0.7s**) | <ul><li>Zero blocking external stylesheets via `inlineStylesheets: "always"`</li><li>LightningCSS minification (`cssMinify: 'lightningcss'`) micro-optimizes the final CSS footprint</li><li>Edge caching on Cloudflare Pages Anycast network delivers sub-100ms TTFB worldwide</li></ul> |
| **INP** (Interaction to Next Paint) | $\le$ 200ms (Achieved: **35ms**) | <ul><li>Zero hydration lag: all form elements and action buttons are immediately interactive on initial paint</li><li>No monolithic SPA runtime on the main thread</li><li>Debounced async submissions and non-blocking state updates</li></ul> |
| **CLS** (Cumulative Layout Shift) | $\le$ 0.1 (Achieved: **0.00**) | <ul><li>Tabular numeric styling (`font-variant-numeric: tabular-nums`) prevents shifts during countdown ticks</li><li>Monospace typography guarantees predictable character widths across all devices</li><li>Editorial photography containers reserve fixed spatial aspect ratios</li></ul> |

---

## Authentic Component Architecture Showcases

Public sanitized implementations of the core UI components are available directly in the repository:

1. **Member Vetting & Admission Form ([`components/SanitizedRegistrationForm.astro`](../components/SanitizedRegistrationForm.astro)):**
   - High-contrast brutalist aesthetic (`#ede5d5` parchment background, `#0d0d0d` borders, offset box shadows).
   - Ingests and pre-fills URL query parameters (`?ref=CODE`) for sponsored member referrals.
   - Enforces multi-channel alternative communication handles (Signal, Telegram, PGP).
   - Multi-phase async state machine with loading spinners and manual review confirmation text.

2. **Session Countdown Timer ([`components/SanitizedCountdown.astro`](../components/SanitizedCountdown.astro)):**
   - Pure vanilla JavaScript timer interval without external library dependencies.
   - Tabular monospace numbers preventing horizontal and vertical layout shifts.

3. **Sanitized TypeScript Vetting Pattern ([`examples/sanitized-ui-pattern.ts`](../examples/sanitized-ui-pattern.ts)):**
   - Independent TypeScript module demonstrating URL referral parameter parsing, identity handle validation, and async error recovery.

---

## Design System & Typography

- **High-Contrast Editorial Brutalism:** Monochromatic color scheme with warm parchment contrast and accent crimson (`#7a1f28`).
- **Tactile UI Elements:** 2px high-contrast borders and sharp offset shadows (`box-shadow: 6px 6px 0 #0d0d0d`) with snappy hover translations (`translate(-3px, -3px)`).
- **Accessibility:** Full keyboard navigability and WCAG 2.1 AA compliant contrast ratios across all text elements.
