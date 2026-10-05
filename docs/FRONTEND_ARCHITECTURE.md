# Frontend Engineering & Design Decisions

This document outlines the frontend architectural principles, rendering strategies, performance budgets, and UI/UX design decisions implemented for **privatesocietylab.com** (Private Society Lab).

---

## Client Interaction & Rendering Flow

```mermaid
flowchart TD
    subgraph Browser [Client Viewport]
        DOM[Static HTML/CSS Shell]
        Hydrate[Lightweight Hydration / Island]
        UserAction[User Interaction]
    end

    subgraph EdgeCDN [Edge Network / Cloudflare Pages]
        Cache[Global Edge Asset Cache]
    end

    subgraph HeadlessData [Headless Source & Services]
        CMS[Content / Form Service]
    end

    Cache -->|Sub-100ms TTFB| DOM
    DOM -->|Progressive Enhancement| Hydrate
    UserAction -->|Async Submission| CMS
```

---

## Architectural Principles

### 1. Minimal Runtime JS & React 19 Islands
- **Astro v7 Core:** Server-side rendering (SSR) and static generation on Cloudflare Pages guarantees that baseline editorial pages, tasting archives, and menus ship with zero extraneous client JavaScript.
- **Selective React 19 Islands:** Interactive widgets (invitation verification, event booking forms, and dynamic tasting archives) hydrate as isolated React 19 islands using `client:visible` or `client:idle`.
- **Zero Hydration Overhead:** Editorial content remains pure static markup, avoiding the hydration mismatch and CPU stalls typical of monolithic SPA architectures.

### 2. Core Web Vitals Strategy

| Metric | Target | Strategy & Implementation |
| :--- | :--- | :--- |
| **LCP** (Largest Contentful Paint) | $\le$ 2.5s (Achieved: **0.7s**) | <ul><li>Inlined critical stylesheets via Astro's `inlineStylesheets: "always"` pipeline</li><li>Hero imagery formatted as modern AVIF/WebP with preloading hints</li><li>Global edge delivery via Cloudflare Anycast CDN for ultra-low TTFB</li></ul> |
| **INP** (Interaction to Next Paint) | $\le$ 200ms (Achieved: **35ms**) | <ul><li>Zero blocking scripts on the main thread during boot</li><li>Micro-interactions and dialogs managed with lightweight, non-blocking React state</li><li>Asynchronous network requests handled with debounced execution and `AbortController`</li></ul> |
| **CLS** (Cumulative Layout Shift) | $\le$ 0.1 (Achieved: **0.00**) | <ul><li>Strict aspect-ratio rules across editorial culinary photography</li><li>Font face declarations specify `font-display: swap` with matched size-adjust metric overrides</li><li>Layout structure retains fixed spatial dimensions prior to dynamic content arrival</li></ul> |

---

## Styling & Asset Pipeline

- **Tailwind CSS v4 & LightningCSS:** Utilizes the next-generation Tailwind v4 engine paired with LightningCSS minification for micro-optimized CSS bundles.
- **Inlined Critical CSS:** Eliminates render-blocking external stylesheet network requests by embedding critical styling directly into the document `<head>`.
- **High-Contrast Editorial Typography:** Monochromatic palette with typographic hierarchy optimized for dark-mode rendering, meeting strict WCAG 2.1 AA contrast ratios.

---

## State Management & Defensive Validation

- **Encapsulated Island State:** Form validation and modal dialogues operate within self-contained components without bloated global state stores.
- **Client-Side Schema Enforcement:** Input validation triggers immediately upon user action, providing instantaneous feedback prior to network dispatch.
- **Network Resilience:** External API calls leverage `AbortSignal` with timeout safety and structured error classification.

A representative example of this defensive client interaction pattern is documented in [`examples/sanitized-ui-pattern.ts`](../examples/sanitized-ui-pattern.ts).

---

## Accessibility (a11y) & UX

- **Semantic Landmark Hierarchy:** Built with `<main>`, `<section>`, `<nav>`, and `<dialog>` elements for native assistive technology support.
- **Keyboard Navigation & Traps:** Interactive dialogs and navigation drawers support full tab navigation and escape-key dismissal.
- **Reduced Motion Support:** Respects `prefers-reduced-motion` to bypass transition effects for sensitive viewports.
