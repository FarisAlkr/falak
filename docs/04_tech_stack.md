# Tech Stack

> Library and framework choices for Falak, with the reasoning behind each.
> Every dependency added to the project must be listed here.

---

## Core framework

### Next.js 14 (App Router, static export)
**Why:** Mature, great RTL support, static export means no server costs, excellent font loading via `next/font`, App Router's layouts fit our unit structure perfectly, strong TypeScript support.
**Alternatives considered:** Remix (great but smaller ecosystem), Astro (excellent for content but weaker for interactive sims), SvelteKit (smaller community for RTL/i18n libs).

### TypeScript (strict mode)
**Why:** A project of this size needs types. Physics calculations especially benefit from strong typing (vectors, units, etc.). `strict: true`, no `any`.

---

## Styling

### Tailwind CSS
**Why:** Matches the prototype, excellent RTL support via logical properties, small final bundle, design tokens as CSS vars integrate cleanly.
**Config requirements:** Custom colors from design system, custom font families, logical property preference.

### `tailwindcss-rtl` plugin
**Why:** Better RTL utility class support than Tailwind's built-in RTL variants.

---

## Content authoring

### MDX (`@next/mdx` + `next-mdx-remote`)
**Why:** Slide content is a mix of structured data (titles, equations) and prose (Arabic explanations). MDX lets content authors use React components inline without writing TS. Compiles at build time for zero runtime cost.
**Alternatives considered:** Pure TSX (too verbose for content), plain Markdown (can't embed interactive components), a CMS (overkill for v1, dependency risk).

### `@shikijs/rehype` (optional)
For any code snippets in slides (rare but possible).

---

## Math rendering

### KaTeX (`katex` + `rehype-katex` + `remark-math`)
**Why:** Fast (server-side rendered), beautiful output, standard LaTeX input, huge community. Better than MathJax for our use case (smaller, faster, fewer runtime dependencies).
**Important:** Server-side render for static equations, client-side for interactive equations where parameters change.

---

## Animation

### Framer Motion
**Why:** Physics-inspired API fits our domain, excellent for orchestrated animations, handles `prefers-reduced-motion` properly, strong React integration.
**When to use:** Page transitions, slide transitions, coordinated multi-element animations, physics playground motion.
**When NOT to use:** Simple hover/focus states (use CSS transitions), micro-interactions that don't need orchestration.

---

## Physics simulation

### Pure React + SVG (primary)
For most Falak interactives — projectile motion, energy graphs, free-body diagrams, field lines, orbits — SVG with React state and `requestAnimationFrame` is sufficient, fast, and accessible.

### Matter.js (only where needed)
**Why:** Rigid-body physics engine. Use for complex interactions (stacked blocks sliding down inclines with friction, pulley systems with multiple objects) where hand-written physics would be fragile.
**When NOT to use:** Any simulation where we control the physics directly (projectiles, orbits, waves, fields).

### Canvas API (for perf-critical sims)
If a sim needs >500 animated particles (interference patterns, particle-in-field) use Canvas via a thin React wrapper. Fall back to SVG for everything else.

---

## State management

### Zustand
**Why:** Tiny (~1kb), no boilerplate, excellent TypeScript support, works great with React Server Components.
**Use for:** `progressStore`, `settingsStore`, anything that survives across routes.

### React Context (scoped)
**Use for:** Unit-level state that shouldn't leak across units. Don't overuse — Zustand is almost always better.

---

## Persistent storage

### Dexie.js (IndexedDB wrapper)
**Why:** IndexedDB is more robust than `localStorage`, supports larger data, async-first, transactional. Dexie makes it pleasant to use.
**Schema versioning:** Required from day 1 — add schema migration logic in `src/lib/db/schema.ts`.

---

## Typography

### Google Fonts via `next/font`
**Why:** `next/font` self-hosts the fonts automatically (zero runtime requests to Google), handles font-display, reduces CLS.

**Fonts loaded:**
- Fraunces (display)
- Inter (body)
- JetBrains Mono (code/math)
- Noto Kufi Arabic (Arabic)
- Heebo (Hebrew)

---

## Icons

### lucide-react
**Why:** Tree-shakable, consistent stroke-based style, matches editorial feel. 1000+ icons cover any need.

---

## Data & validation

### Zod
**Why:** Runtime validation for content files (exam questions, unit metadata) — catches content errors at build time.

---

## Testing

### Vitest
**Why:** Faster than Jest, great TypeScript support, works with Vite/Next.js.

### React Testing Library
For component tests. Focus on physics helpers + complex interactive logic.

### Playwright (E2E, phase 2)
For critical user flows (teacher navigates slides, student completes an interactive).

---

## Developer experience

### ESLint + Prettier
Standard. Prettier config:
```json
{
  "semi": true,
  "singleQuote": true,
  "trailingComma": "es5",
  "printWidth": 100,
  "tabWidth": 2
}
```

### Husky + lint-staged
Pre-commit: run `prettier --check`, `eslint`, `typecheck`.

### Commitlint
Enforce conventional commits.

---

## Build & deploy

### pnpm (not npm, not yarn)
**Why:** Fast, efficient disk usage, strict dependency resolution.

### Vercel (primary)
**Why:** Best Next.js integration, global edge network, free tier covers v1.
**Settings:** Output = static, framework preset = Next.js.

### Cloudflare Pages (fallback)
Keep in config for redundancy.

---

## NOT using (conscious rejections)

| Tool | Why not |
|---|---|
| Redux | Overkill; Zustand is better for our size |
| styled-components | Tailwind is cleaner and faster at build |
| MobX | Don't need observable complexity |
| GraphQL | Static site, no backend |
| Storybook | Too much overhead for our component count |
| Chart.js / D3.js | We render SVG directly for custom aesthetics (D3 kept in mind for phase 2 if needed) |
| localStorage directly | Use Dexie/IndexedDB; more robust |
| Three.js | SVG is sufficient for 2D physics; 3D adds complexity without pedagogical benefit |
| Any UI framework (Chakra, Mantine, Radix) | We're building custom components from primitives for distinctive aesthetic |

---

## Dependency policy

- Every new dependency requires a line in this document explaining the choice.
- Prefer standard libraries (`Date`, `Intl`) before adding `date-fns` etc.
- Evaluate bundle size impact on every add (`bundle-phobia` or `size-limit`).
- Pin versions with `~` (patch updates only) in production, `^` is OK in dev deps.

---

## Initial `package.json` (approximate)

```json
{
  "dependencies": {
    "next": "~14.2.0",
    "react": "~18.3.0",
    "react-dom": "~18.3.0",
    "typescript": "~5.4.0",
    "tailwindcss": "~3.4.0",
    "@next/mdx": "~14.2.0",
    "framer-motion": "~11.0.0",
    "katex": "~0.16.0",
    "rehype-katex": "~7.0.0",
    "remark-math": "~6.0.0",
    "zustand": "~4.5.0",
    "dexie": "~4.0.0",
    "dexie-react-hooks": "~1.1.0",
    "lucide-react": "~0.390.0",
    "zod": "~3.23.0",
    "clsx": "~2.1.0",
    "tailwind-merge": "~2.3.0"
  },
  "devDependencies": {
    "eslint": "~8.57.0",
    "eslint-config-next": "~14.2.0",
    "prettier": "~3.3.0",
    "vitest": "~1.6.0",
    "@testing-library/react": "~15.0.0",
    "@types/node": "~20.12.0",
    "@types/react": "~18.3.0",
    "husky": "~9.0.0",
    "lint-staged": "~15.2.0",
    "@commitlint/cli": "~19.3.0",
    "@commitlint/config-conventional": "~19.2.0",
    "tailwindcss-rtl": "~0.9.0"
  }
}
```

Matter.js, Plotly, Chart.js etc. are deliberately NOT in the default install — add them when a specific unit needs them, with a note here.
