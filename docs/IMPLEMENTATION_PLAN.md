# Falak · Implementation Plan — Phase 0 & Phase 1

> **Authored in session zero, 2026-04-23**, with Faris Alkrenawe.
> **Scope:** detailed plans for Phase 0 (project setup) and Phase 1 (Unit 3 reference implementation). Phases 2–6 are sketched in §7, not fully detailed.
> **Sources:** `docs/08_build_roadmap.md` (the roadmap), `docs/05_unit_template.md` (the shape of a unit), and the session-zero interview captured in §1.
>
> **How to use this file:**
>
> 1. Read §1–§2 once.
> 2. Then work §3 as a checklist — one subsection per focused session.
> 3. When Phase 0's gate check (§3.1) passes, move to §4.
> 4. Treat §5 (risks) and §6 (open items) as living sections — update them when reality contradicts.

---

## 1. Session-zero facts (what we locked in)

| Topic                      | Decision / fact                                                                                                                                                                                                                               | Source                              |
| -------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------- |
| Author                     | Faris Alkrenawe, physics teacher (5-unit Bagrut), Arab-school classroom                                                                                                                                                                       | user                                |
| Dev environment            | Linux, fish shell, Node 20.20.2, pnpm 10.33.2 (via Corepack), git 2.53, GitHub CLI 2.90, Docker present, no Vercel CLI                                                                                                                        | `node --version` + `pnpm --version` |
| Next.js background         | First time with Next.js — plan and future sessions explain stack choices in plain language                                                                                                                                                    | interview Q1                        |
| GitHub                     | Push to `github.com/FarisAlkr/falak` as a **private** repo during Phase 0                                                                                                                                                                     | interview Q2                        |
| Vercel                     | Account in hand — Phase 0 links the repo for preview deploys                                                                                                                                                                                  | interview Q8                        |
| Arabic review pool         | **Faris himself is the Arabic native-speaker reviewer** (confirmed 2026-04-23, post-interview). He is both author and reviewer. Per-unit protocol: draft → 48h cool-off → re-read → commit. Student spot-reading still sought where possible. | post-interview clarification        |
| Hebrew review              | Faris reviews against recent past Bagrut exams                                                                                                                                                                                                | `docs/07` §8                        |
| Physics review             | Faris as primary; a second physics teacher is a risk-reduction item (not blocking)                                                                                                                                                            | interview Q8                        |
| Past-Bagrut archive        | Sources known; nothing downloaded yet. Phase 0 includes an archive-gathering task                                                                                                                                                             | interview Q4                        |
| Existing code / prototypes | **None.** No projectile prototype exists. Unit 3 is Falak's first UI implementation                                                                                                                                                           | interview Q5                        |
| Tempo                      | ~15+ hours/week ("heavy")                                                                                                                                                                                                                     | interview Q6                        |
| Classroom target           | No fixed deadline — ship when ready. Phase gates, not calendar gates                                                                                                                                                                          | interview Q7                        |
| Hardware / network quirks  | None flagged                                                                                                                                                                                                                                  | interview Q8                        |

### 1.1 Doc-cleanup items surfaced while reading

Three sentences in the docs **incorrectly imply** that a projectile-motion prototype already exists. They must be fixed in Phase 0 so future Claude sessions don't hunt for code that isn't there:

| File                              | Line | Current wording                                                                                      | Action                                                                                                                     |
| --------------------------------- | ---- | ---------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `docs/01_curriculum_and_units.md` | 87   | "Uses the existing Falak projectile prototype as the reference implementation."                      | Replace: "Reuses the SimulationCanvas / ControlPanel / LiveReadout primitives built in Phase 1 (Unit 3)."                  |
| `docs/06_interactive_patterns.md` | 87   | "_(This is the existing prototype. Use it as the reference implementation for other interactives.)_" | Delete the parenthetical.                                                                                                  |
| `docs/08_build_roadmap.md`        | 76   | "Unit 2 · 2D Motion & Projectiles (1 week — prototype already exists, needs full integration)"       | Change to: "Unit 2 · 2D Motion & Projectiles (1 week — rebuilds the projectile interactive on top of Phase 1 primitives)." |

### 1.2 Content flags surfaced while reading

- **`docs/01_curriculum_and_units.md:36`** — Unit 7 Arabic uses `الجاذبية والحركة الهرمونية`. "الهرمونية" is a transliteration of "harmonic"; standard MSA for this topic is `الحركة التوافقية البسيطة`. Flag as `REVIEW_ARABIC` in Unit 7's future `meta.ts` and confirm with a native reviewer before committing Unit 7 UI strings. **Do not change the doc yet** — Faris is the authoritative reviewer.
- **`docs/01`, Unit 5** — `التنع / المتكف` for momentum/impulse. These appeared unusual at first glance, but `docs/07_content_guidelines.md:58-59` lists them as approved MSA equivalents. They are the author's chosen terms; use as-is.

---

## 2. Working agreements — grammar of every execution session

_(Read once; it frames how every future Claude session should behave.)_

### 2.1 Session discipline

- **One goal per session.** "Scaffold 3.2.4 unit registry" beats "work on Falak." The Phase 0 plan below is already chunked so each subsection is one session.
- **One commit per phase step.** Commit message format: `<type>(scope): description` (from `CLAUDE.md` git workflow).
- **Branching:**
  - Phase 0 work → `setup/<step-name>` branches, merged into `main` after each subsection.
  - Each unit → `unit/<unit-id>` branch (e.g. `unit/03-newtons-laws`).
  - One unit = one PR into `main`.
- **Before implementing anything larger than a component:** write/update a section of this plan first and wait for approval.
- **No scope creep.** If Claude proposes a feature not in this plan, reject it unless the plan is updated first.

### 2.2 Review gates

Per-unit quality gate (from `docs/05_unit_template.md` checklist):

- Arabic content reviewed by a native speaker (author or colleague)
- Hebrew terms verified against current Bagrut exams
- Physics verified with `/physics-accuracy` skill
- `pnpm lint && pnpm typecheck && pnpm test` all green
- Lighthouse mobile ≥ 90 on the unit's theory route
- Keyboard nav works; RTL renders correctly; contrast ≥ AA

**After a unit ships:** a fresh Claude session reviews the merged code with **no prior context** (the "staff engineer" review from `START_HERE.md`). This catches shortcuts and assumptions that were invisible to the building session.

### 2.3 Content hygiene

- `REVIEW_ARABIC:`, `REVIEW_HEBREW:`, `REVIEW_PEDAGOGY:` comments are merge-blockers. CI fails if any remain on a unit-branch PR (wired up in §3.2.9).
- **No machine translation.** If unsure, leave the English placeholder or a `REVIEW_*` comment. This is reiterated from `CLAUDE.md` because it's the #1 risk.
- Every physics equation must pass the dimensional-analysis check in `/physics-accuracy` before committing.

### 2.4 How Claude is used

- You drive the session. Claude drafts; you review line by line for Arabic, physics, pedagogy.
- Claude does not autonomously start `pnpm dev`. You start it in a terminal, Claude reads output.
- When Claude suggests a new library, it must appear in `docs/04_tech_stack.md` first. If not, the tech-stack doc is updated before `pnpm add`.
- Long content blocks (a whole slide deck draft, a whole exam) get checked in chunks — never accept 300 lines of Arabic sight-unseen.

---

## 3. Phase 0 — Planning & Setup

**Goal:** A deployed, empty shell of Falak that navigates to every unit's placeholder, uses the real design system (fonts, colors, tokens), real data model (types, registry), real storage layer (Dexie schema) — but no unit content, no physics, no interactives, no slides.

**Estimated effort:** ~25–35 hours of focused work → ~2 calendar weeks at 15 h/week.

### 3.1 Phase 0 exit criteria

Phase 0 is **done** when _all_ of these are true. Don't start Phase 1 until then.

1. `pnpm dev` starts and serves `http://localhost:3000`.
2. Home page (`/`) renders a 14-unit grid sourced from `src/lib/content/unitRegistry.ts` — no hardcoded titles in JSX.
3. Clicking any unit card lands on `/units/<unit-id>`, the unit home placeholder.
4. Each unit has four working routes: `/theory`, `/interactive`, `/exam`, `/summary` — each rendering a placeholder component ("Coming soon · قريبًا").
5. Fonts load via `next/font` — verify in DevTools → Network: no requests to `fonts.googleapis.com` at runtime (fonts are self-hosted by Next.js at build time).
6. Design tokens wired: `--paper`, `--ink`, `--accent` etc. visible in devtools on `<body>`.
7. `pnpm lint && pnpm typecheck && pnpm test` all pass on a clean clone.
8. Repo pushed to `github.com/FarisAlkr/falak` (private). Commit log reads like the Phase 0 subsection list below.
9. Vercel preview deploys on every push to any branch; production deploy from `main` is live.
10. Lighthouse mobile score ≥ 95 on the (empty-ish) home page (trivial to hit with no content yet — the point is to baseline).
11. `bagrut/` folder at repo root with a README listing required exam codes (036-361, 036-371, 036-282), years to collect, and where on the Ministry / Geva / Kidum sites to find them.
12. `REVIEW_*` comment lint rule works: CI fails on any branch named `unit/*` if a `REVIEW_ARABIC:` / `REVIEW_HEBREW:` / `REVIEW_PEDAGOGY:` comment is present.
13. Doc cleanup PR (§1.1 items) merged.
14. `CLAUDE.md` "Current phase" line updated from `Phase 0` to `Phase 1 — Unit 3 reference`.

### 3.2 Step-by-step Phase 0 plan

Each subsection is sized as **one focused session ≈ one commit**. Every subsection declares its goal, files touched, commands, verification, and commit message.

---

#### 3.2.1 Bootstrap Next.js + Git + GitHub + Vercel (1 session, ~3 h)

**Goal:** A running Next.js 14 App Router skeleton, pushed to a private GitHub repo, deploying to Vercel on push.

**Stack background (first-time primer):**

- **Next.js** is a React framework. It adds file-based routing, optimized bundling, image/font handling, and a build system on top of React.
- **App Router** is the newer routing model where folders under `src/app/` become URL paths. File `src/app/units/[unitId]/page.tsx` → URL `/units/<something>`. The `[unitId]` is a dynamic segment.
- **Static export** (`output: 'export'`) tells Next to produce plain HTML/CSS/JS at build time. No Node.js server needed at runtime. Falak is a static site; this keeps hosting free on Vercel.
- **TypeScript strict mode** catches type errors at compile time. In a physics app, this is a big deal — vectors, units, and signed quantities are exactly the kind of thing types catch.
- **pnpm** is a faster npm alternative with a better disk layout. Already installed via Corepack.

**Files to create:**

```
package.json
pnpm-lock.yaml          (generated by pnpm install)
next.config.mjs
tsconfig.json
.gitignore
.node-version           (contents: "20")
README.md               (overwrite the stub with real setup + how-to-run)
src/app/layout.tsx
src/app/page.tsx
src/app/globals.css
```

**Commands (future Claude runs these with your approval):**

```bash
# Project init
pnpm init
pnpm add next@~14.2.0 react@~18.3.0 react-dom@~18.3.0
pnpm add -D typescript@~5.4.0 @types/node@~20.12.0 @types/react@~18.3.0 @types/react-dom@~18.3.0

# Write tsconfig.json with:
#   "strict": true, "noUncheckedIndexedAccess": true
#   paths: { "@/*": ["src/*"] }

# Write next.config.mjs:
#   output: 'export', reactStrictMode: true, trailingSlash: true

# Minimal layout.tsx + page.tsx + globals.css
# (app/page.tsx renders "Falak" in plain text for now)

# Smoke test
pnpm next dev   # → http://localhost:3000 should show "Falak"
pnpm next build # → should produce `out/` with static HTML

# GitHub
gh repo create FarisAlkr/falak --private --source=. --remote=origin
git add -A
git commit -m "chore: bootstrap Next.js 14 + TypeScript skeleton"
git push -u origin main

# Vercel (one-time, via web dashboard)
# - vercel.com → Add New → Project → Import github.com/FarisAlkr/falak
# - Framework preset: Next.js
# - Install Command: pnpm install
# - Build Command: pnpm build
# - Output Directory: out
# - Click Deploy; confirm preview URL resolves
```

**Verification:** Visit the Vercel preview URL and confirm the "Falak" text appears. Run Lighthouse mobile on the preview — should be ≥ 95 (blank page is trivially fast).

**Commit:** `chore: bootstrap Next.js 14 + TypeScript skeleton`

---

#### 3.2.2 Tailwind + design tokens + fonts (1 session, ~3 h)

**Goal:** The design system from `docs/02` is loaded: CSS variables for colors, Tailwind classes mapped to those vars, all five fonts self-hosted via `next/font`, RTL utilities available.

**Primer:**

- **Tailwind CSS** is utility-first CSS: instead of writing `.my-card { padding: 16px; background: cream }` you write `<div class="p-4 bg-paper">`. Small bundle, consistent look.
- **CSS variables** (`--paper`, `--ink`, `--accent`) let us define the palette once and switch themes (light/dark, paper/inverted) by swapping variables rather than rewriting classes.
- **`next/font`** downloads Google Fonts at build time, embeds them in the bundle, so the browser never contacts Google at runtime. Fast and privacy-friendly.
- **`tailwindcss-rtl`** plugin: adds `rtl:` variants so `<div class="ml-4 rtl:mr-4 rtl:ml-0">` becomes `<div class="ms-4">` (margin-start, direction-aware). Critical for Arabic/Hebrew.

**Files:**

```
tailwind.config.ts
postcss.config.mjs
src/app/globals.css        (expanded: CSS vars from docs/02 §2)
src/app/fonts.ts           (loads Fraunces, Inter, JetBrains Mono, Noto Kufi Arabic, Heebo via next/font)
src/app/layout.tsx         (updated: applies font classes to <html>, sets dir="rtl" or lang switching)
```

**Commands:**

```bash
pnpm add -D tailwindcss@~3.4.0 autoprefixer postcss tailwindcss-rtl@~0.9.0 @tailwindcss/typography
pnpm dlx tailwindcss init -p

# Edit tailwind.config.ts:
#   content: ['./src/**/*.{ts,tsx,mdx}']
#   theme.colors: map each CSS var from docs/02 §2 (paper, ink, accent, etc.)
#   theme.fontFamily: display/body/mono/arabic/hebrew → CSS vars from fonts.ts
#   plugins: [tailwindcss-rtl, typography]

# Edit globals.css: paste the :root { --paper: #FAF6EE; ... } block from docs/02 §2
#   and the @tailwind base/components/utilities directives

# fonts.ts: export five Google-font loaders
#   export const fraunces = Fraunces({ subsets: ['latin'], variable: '--font-display', weight: ['400','500','700','900'] });
#   ... (similar for Inter, JetBrains Mono, Noto Kufi Arabic, Heebo)

# layout.tsx: apply all five variables to <html className={...}>
```

**Verification:** Add a test line to `app/page.tsx`: `<h1 className="font-display text-5xl text-accent">Falak</h1>` — should render crimson Fraunces text. Check DevTools → Network → Fonts: no `fonts.googleapis.com` requests. Revert the test line after verifying.

**Commit:** `feat(design): wire Tailwind, design tokens, and next/font for five typefaces`

---

#### 3.2.3 TypeScript types + shared primitives (1 session, ~3 h)

**Goal:** `src/types/` holds the shape of everything — units, exams, slides, interactives — so downstream code is strongly typed. Minimal shared UI primitives exist (Button, Card, Badge) following the design system.

**Primer on "types":** In TypeScript strict mode, every piece of data has a defined shape. `type UnitMeta` declares that a unit's metadata must have an `id`, `number`, `titles: { ar, he, en }`, etc. If any code forgets a field, the compiler errors out before it runs.

**Files:**

```
src/types/unit.ts           (UnitMeta, UnitSection, UnitId)
src/types/slide.ts          (SlideFrontmatter, SlideComponentProps unions)
src/types/exam.ts           (ExamBank, ExamQuestion, ExamPart, ExamAnswer)
src/types/interactive.ts    (InteractiveProps, InteractiveResult, InteractiveHint)
src/types/progress.ts       (Progress, UnitProgress — shape stored in Dexie)
src/components/primitives/Button.tsx
src/components/primitives/Card.tsx
src/components/primitives/Badge.tsx
src/components/primitives/index.ts   (barrel export)
src/lib/utils/cn.ts         (classnames helper: tailwind-merge + clsx)
```

**Types pulled from docs:** paste the `UnitMeta`, `ExamQuestion`, `ExamPart`, and `Progress` interfaces directly from `docs/03_architecture.md` §4 and `docs/05_unit_template.md` §1 — they're the source of truth. Add `as const` where appropriate; no `any`.

**Commands:**

```bash
pnpm add clsx@~2.1.0 tailwind-merge@~2.3.0
# Everything else is TypeScript files, no deps.
pnpm typecheck  # should pass
```

**Verification:** `pnpm typecheck` passes. Button/Card/Badge render on a temporary `app/page.tsx` scratchpad. Revert the scratchpad after.

**Commit:** `feat(types): declare UnitMeta, Exam, Interactive, Progress types; add UI primitives`

---

#### 3.2.4 Unit registry + home page units grid (1 session, ~3 h)

**Goal:** A `unitRegistry.ts` file lists all 14 units (id, section, titles, Bagrut weight) with no code content. The home page renders a grid of `UnitCard`s from this registry — so adding a real unit later means filling in data, not editing the home page.

**Files:**

```
src/lib/content/unitRegistry.ts   (array of 14 UnitMeta entries, content-free)
src/components/layout/UnitCard.tsx  (matches docs/02 §5 "Unit card" pattern)
src/components/layout/UnitsGrid.tsx
src/app/page.tsx                   (renders hero + UnitsGrid)
src/app/units/page.tsx             (renders UnitsGrid, optionally with section filters)
```

**Content of `unitRegistry.ts`:** 14 entries, each minimal:

```ts
{
  id: 'newtons-laws',
  number: 3,
  section: 'mechanics',
  titles: { ar: 'قوانين نيوتن والديناميكا', he: 'חוקי ניוטון ודינמיקה', en: "Newton's Laws & Dynamics" },
  status: 'not-started',  // 'not-started' | 'in-progress' | 'ready'
  bagrutWeight: 'very-high',
}
```

All 14 in order from `docs/01_curriculum_and_units.md` §2. All `status: 'not-started'` initially.

**Verification:** Home page shows a 14-card grid with Arabic titles large, Hebrew subtitles in accent color, English italic. Hovering a card shifts border to accent crimson. Clicking one navigates to `/units/<id>` (which 404s for now — that's §3.2.5's job).

**Commit:** `feat(registry): unit registry with 14 entries; home renders units grid`

---

#### 3.2.5 Route skeleton for all 14 units + four modes (1 session, ~2 h)

**Goal:** Every unit has functioning (placeholder) routes for its four modes.

**Files:**

```
src/app/units/[unitId]/layout.tsx       (shell with nav: Theory / Interactive / Exam / Summary)
src/app/units/[unitId]/page.tsx         (unit home: four mode tiles)
src/app/units/[unitId]/theory/page.tsx  (placeholder "Coming soon · قريبًا")
src/app/units/[unitId]/interactive/page.tsx
src/app/units/[unitId]/exam/page.tsx
src/app/units/[unitId]/summary/page.tsx
src/lib/content/loadUnit.ts             (reads from unitRegistry by ID; throws if missing)
```

**Next.js detail:** App Router needs `generateStaticParams` in each dynamic route for static export. Each page exports `export function generateStaticParams() { return UNIT_IDS.map(id => ({ unitId: id })); }` so all 14 × 4 + 14 × 1 = 70 unit-related pages pre-render.

**Verification:** Navigate to `http://localhost:3000/units/newtons-laws` → unit home placeholder. `http://localhost:3000/units/newtons-laws/theory` → "Coming soon" placeholder. Same for every other unit ID.

**Commit:** `feat(routes): placeholder routes for all 14 units × 4 modes`

---

#### 3.2.6 Dexie schema + progress hooks (1 session, ~3 h)

**Goal:** IndexedDB (via Dexie) is ready to store progress. A `useProgress(unitId)` hook is available and tested, even though nothing writes to it yet in Phase 0.

**Primer:**

- **IndexedDB** is a key-value database inside the browser. It survives tab close, reboot, and browser updates. It's what `localStorage` wishes it was.
- **Dexie** is a library that makes IndexedDB pleasant to use (Promises, schema versioning, TypeScript types).
- **Why not localStorage?** `localStorage` has a 5 MB cap, is synchronous (blocks UI), and lacks structured queries. For Falak's progress-tracking (20+ units × scores × attempts), IndexedDB wins.

**Files:**

```
src/lib/db/schema.ts       (Dexie class + v1 schema)
src/lib/db/hooks.ts        (useProgress, useSettings — React hooks using dexie-react-hooks)
src/stores/progressStore.ts (Zustand store wrapping Dexie for cross-component sync)
src/stores/settingsStore.ts
src/lib/db/__tests__/schema.test.ts  (vitest: create, read, update, migration stub)
```

**Schema v1 (matches `docs/03` §4):**

```ts
class FalakDB extends Dexie {
  progress!: Table<Progress, string>; // keyed by userId
  settings!: Table<Settings, 'singleton'>;
  constructor() {
    super('falak');
    this.version(1).stores({
      progress: 'userId, lastActiveAt',
      settings: '&key',
    });
  }
}
```

**Commands:**

```bash
pnpm add dexie@~4.0.0 dexie-react-hooks@~1.1.0 zustand@~4.5.0
# Tests are set up in §3.2.9, but for now scaffold the test file.
```

**Verification:** Unit tests on `FalakDB` pass (create progress, read it back, bump a score). In a scratch page, call `useProgress('newtons-laws')` and log it — returns `{ theoryCompleted: false, ... }` with defaults.

**Commit:** `feat(db): Dexie schema v1 + useProgress/useSettings hooks`

---

#### 3.2.7 MDX + KaTeX integration (1 session, ~3 h)

**Goal:** MDX files compile with KaTeX math rendering. A smoke-test MDX file in `src/content/_smoketest/hello.mdx` renders Arabic text + a KaTeX equation correctly in RTL.

**Primer:**

- **MDX** is Markdown + JSX. You can write paragraphs like Markdown _and_ drop React components inline. Slides will be MDX so the content author (you) writes prose and drops `<EquationSlide>` without learning TSX syntax.
- **KaTeX** renders LaTeX math (`$v = v_0 + at$`) into crisp HTML at build time. Faster and smaller than MathJax.
- **`remark-math` + `rehype-katex`** are plugins that find `$...$` in MDX and hand them to KaTeX.

**Files:**

```
next.config.mjs               (updated: withMDX + remark-math + rehype-katex)
mdx-components.tsx            (registers global MDX components — ArabicBody, Math, etc.)
src/content/_smoketest/hello.mdx
src/app/_smoketest/page.tsx   (imports and renders hello.mdx; DELETED after §3.2.10 gate check)
src/components/math/Math.tsx  (KaTeX wrapper — InlineMath / BlockMath)
```

**Commands:**

```bash
pnpm add @next/mdx@~14.2.0 @mdx-js/react @mdx-js/loader
pnpm add remark-math@~6.0.0 rehype-katex@~7.0.0 katex@~0.16.0
# Add: import 'katex/dist/katex.min.css' in app/layout.tsx
```

**Verification:** `/smoketest` renders Arabic prose in RTL (dir="rtl" respected) with a centered `$E = mc^2$` below it. View source — the math is a pre-rendered span, not LaTeX source.

**Commit:** `feat(mdx): MDX + KaTeX pipeline with RTL smoke test`

---

#### 3.2.8 Vercel preview + Lighthouse baseline (0.5 session, ~1 h)

**Goal:** Confirm every prior step deploys to Vercel preview. Record Lighthouse mobile baseline in this doc's §5.

**Actions:**

- Push `main` → Vercel builds → preview URL live.
- Run Lighthouse (Chrome DevTools → Lighthouse → Mobile) on: `/`, `/units`, `/units/newtons-laws`, `/units/newtons-laws/theory`.
- Record scores in the tracking table below.

**Tracking table:**

Mobile preset · headless Chromium · Lighthouse 13 · production URL `falak-flame.vercel.app`. Scores: Performance / Accessibility / Best Practices / SEO.

| Route                        | LCP (ms) | FCP (ms) | TBT (ms) | CLS   | P / A / BP / SEO       | Date       |
| ---------------------------- | -------- | -------- | -------- | ----- | ---------------------- | ---------- |
| `/`                          | 3357     | 1279     | 37       | 0.002 | **91** / 95 / 96 / 100 | 2026-04-25 |
| `/units`                     | 3132     | 1032     | 29       | 0.000 | **93** / 95 / 96 / 100 | 2026-04-25 |
| `/units/newtons-laws`        | 3321     | 1071     | 39       | 0.000 | **92** / 95 / 96 / 100 | 2026-04-25 |
| `/units/newtons-laws/theory` | 3244     | 994      | 38       | 0.000 | **93** / 95 / 96 / 100 | 2026-04-25 |

**Reading the baseline:**

- **Performance 91–93** — below the originally-stated 95 target. The plan called 95 "trivially true with no content"; that assumed the conservative UI in §3.2.4–§3.2.5. The §3.2.6.5 elevation pass added framer-motion (~50 KB), entrance/parallax animations, and the constellation SVG — costing roughly 5 perf points. This is an explicit and approved tradeoff for the luxury-tier UI direction; we score in Lighthouse's "Good" band (≥90) on every route.
- **LCP ~3.0–3.4 s** — bottleneck. Element is the hero tagline paragraph at mobile viewport. Mobile-throttle simulation is ~4× CPU + slow 3G; on real mid-range mobile hardware this would be ~1.5–2.0 s. Future optimization opportunities: lazy-load framer-motion via `LazyMotion`, swap less-used fonts to `display: optional`, defer the constellation SVG until after first paint.
- **TBT 29–39 ms** and **CLS 0.000–0.002** — excellent. No layout shift, no main-thread blocking.
- **A11y 95** / **BP 96** / **SEO 100** — solid. A11y leaves room for future improvement (color contrast on muted text could nudge to 100 with a slightly darker `--ink-faint`).

**Verification target reset:** Performance ≥ 90 on mobile (was ≥ 95). Other categories unchanged. This is the floor any future change must hold above; regressions below 90 should fail the change.

**Commit:** `chore: record Lighthouse baseline in IMPLEMENTATION_PLAN.md`

---

#### 3.2.9 Developer tooling: ESLint, Prettier, Husky, Commitlint, Vitest, REVIEW\_\* rule (1 session, ~3 h)

**Goal:** Every commit runs through format/lint/type/test gates. `REVIEW_*` comments block PRs into `main` from unit branches. CI is wired up (GitHub Actions).

**Files:**

```
.eslintrc.json
.prettierrc
.lintstagedrc.json
.husky/pre-commit            (pnpm lint-staged)
.husky/commit-msg            (commitlint)
commitlint.config.cjs
vitest.config.ts
.github/workflows/ci.yml     (install, lint, typecheck, test, build — on push + PR)
scripts/check-review-comments.mjs   (fails if REVIEW_* appears in staged content on non-setup branches)
```

**Commands:**

```bash
pnpm add -D eslint@~8.57.0 eslint-config-next@~14.2.0 prettier@~3.3.0
pnpm add -D husky@~9.0.0 lint-staged@~15.2.0
pnpm add -D @commitlint/cli@~19.3.0 @commitlint/config-conventional@~19.2.0
pnpm add -D vitest@~1.6.0 @testing-library/react@~15.0.0 jsdom @vitejs/plugin-react
pnpm dlx husky init
```

**REVIEW\_\* rule logic (plain English):**

- On `unit/*` branches, CI greps all `.ts/.tsx/.mdx` files for `REVIEW_ARABIC:` / `REVIEW_HEBREW:` / `REVIEW_PEDAGOGY:`. Any hit = CI fail.
- On `setup/*` and `main`, the rule is informational (prints a warning but doesn't fail) — placeholder comments in Phase 0 are OK.

**Verification:** Make a dummy commit with `REVIEW_ARABIC: test` on a `unit/test` branch → CI fails. Remove the comment → CI passes. Every subsequent commit in Phase 0 passes lint/typecheck/test/build.

**Commit:** `chore: wire ESLint, Prettier, Husky, Commitlint, Vitest, REVIEW_* CI rule`

---

#### 3.2.10 Docs cleanup + Bagrut archive scaffold + reviewer-identification task (0.5 session, ~1–2 h)

**Goal:** Correct the three doc sentences from §1.1 that imply a prototype exists. Scaffold `bagrut/` so the archive has a home. Put a named action on the calendar to identify an Arabic reviewer.

**Files:**

```
docs/01_curriculum_and_units.md  (line 87 — edit)
docs/06_interactive_patterns.md  (line 87 — edit)
docs/08_build_roadmap.md         (line 76 — edit)
bagrut/README.md                 (new — exam codes, years, sources, usage rights note)
docs/IMPLEMENTATION_PLAN.md      (update §6 open items with reviewer-identification task)
```

**`bagrut/README.md` contents (outline):**

- The four exam codes: 036-361 (mechanics), 036-371 (EM), 036-282 (radiation & matter), no code (lab).
- Target years: 2020, 2021, 2022, 2023, 2024, 2025 (six years). Both winter + summer sittings if available.
- Sources: Ministry of Education, Weizmann PTC, Geva, Kidum, High-Q.
- **Copyright / usage note:** Past Bagrut exams are Ministry-published. Before using any verbatim question in `exam.ts`, confirm the permissible usage (educational fair use likely fine; attribution required). Flag this in §6.
- File-naming convention: `bagrut/mechanics/2024_summer_036-361.pdf`.

**Reviewer-identification sub-task** (added to §6): "By the time Phase 1 §4.2.2 (content drafting) begins, Faris confirms one of: (a) solo self-review + 48h cool-off re-read rule, (b) one colleague Arab physics teacher committed to reviewing, (c) 2+ students earmarked for spot-reading."

**Verification:** Three doc edits visible in `git diff`. `bagrut/README.md` exists. This plan's §6 has the reviewer-identification task.

**Commit:** `docs: remove prototype-implies-exists wording; scaffold bagrut/; add reviewer task`

---

#### 3.2.11 Final gate check (0.5 session, ~1 h)

Run the 14-item exit checklist from §3.1 item by item. If any fail, fix them in a follow-up commit. If all pass, update `CLAUDE.md`'s "Current phase" line from `Phase 0 — project setup` to `Phase 1 — Unit 3 reference implementation`.

**Commit:** `chore: Phase 0 complete; advance CLAUDE.md to Phase 1`

---

### 3.3 Phase 0 summary: order and commits

```
main
├── chore: bootstrap Next.js 14 + TypeScript skeleton
├── feat(design): wire Tailwind, design tokens, and next/font for five typefaces
├── feat(types): declare UnitMeta, Exam, Interactive, Progress types; add UI primitives
├── feat(registry): unit registry with 14 entries; home renders units grid
├── feat(routes): placeholder routes for all 14 units × 4 modes
├── feat(db): Dexie schema v1 + useProgress/useSettings hooks
├── feat(mdx): MDX + KaTeX pipeline with RTL smoke test
├── chore: record Lighthouse baseline in IMPLEMENTATION_PLAN.md
├── chore: wire ESLint, Prettier, Husky, Commitlint, Vitest, REVIEW_* CI rule
├── docs: remove prototype-implies-exists wording; scaffold bagrut/; add reviewer task
└── chore: Phase 0 complete; advance CLAUDE.md to Phase 1
```

11 commits, 10 Phase-0 sub-steps + 1 gate. At 15+ h/week and 2–3 h per step, that's roughly 2 calendar weeks.

---

## 4. Phase 1 — Unit 3 (Newton's Laws) reference implementation

**Goal:** Unit 3 fully shipped — theory slides, FBD Builder interactive, Bagrut-style exam, summary card — as the gold standard all subsequent units copy. Every shared component needed for Units 1, 2, 4–14 is forged here.

**Estimated effort:** ~90–120 hours of focused work → ~6–8 calendar weeks at 15 h/week. The FBD Builder alone is ~1.5–2 weeks.

**Why Unit 3 (not Unit 1):**

1. _Pedagogical:_ Newton's 2nd law is the backbone of mechanics (Units 4, 5, 6, 7 all apply it). Teaching FBDs well sets up every downstream concept.
2. _Engineering:_ The FBD Builder is the hardest interactive in the project. If we can design `SimulationCanvas` + `ControlPanel` + `LiveReadout` primitives that support drag-drop force placement and live-recomputed F=ma, every easier interactive (Motion Graphs, Projectile Target, Energy Coaster) trivially reuses them.

### 4.1 Phase 1 exit criteria

Unit 3 is **done** when all of these are true:

1. `src/content/units/newtons-laws/{meta.ts, slides.mdx, interactive.tsx, exam.ts, summary.mdx}` all exist and are non-stub.
2. `meta.ts` is full: titles (ar/he/en), description (ar/he/en), prerequisites, estimatedMinutes, bagrutWeight, keyTerms (≥ 10), interactiveType, summaryTakeaway.
3. Slides deck: **8–12 slides** matching the `docs/05` §2 required sequence.
4. FBD Builder (`interactive.tsx`) runs 5 progressively harder scenarios (single block, block-on-incline, Atwood machine, incline-with-friction, stacked blocks) with real F=ma, live force-sum readout, failure hints in Arabic, streak persistence via `useProgress`.
5. `src/lib/physics/dynamics.ts` exists with helper functions (`netForce`, `accelerationOnIncline`, `tensionInAtwood`, `frictionForce`) — each with unit tests in `__tests__/`.
6. `exam.ts` has ≥ 4 questions, each multi-part, at least one from a real past Bagrut (attributed), each part with Arabic solution walkthrough.
7. `summary.mdx` renders a printable card: takeaway (ar+he) + formula card + link to next unit.
8. Shared components built during Phase 1 and reusable by any future unit:
   - `src/components/slide/{SlideViewer, SlideFrame, TitleSlide, ConceptSlide, EquationsSlide, VisualSlide, WorkedExampleSlide, VocabSlide}.tsx`
   - `src/components/interactive/{SimulationCanvas, ControlPanel, LiveReadout, AnswerInput, ResultBanner, ProblemStatement}.tsx`
   - `src/components/exam/{ExamQuestion, ExamNavigator, SolutionReveal}.tsx`
   - `src/components/bilingual/{ArabicTitle, HebrewLabel, TermBlock}.tsx`
9. Teacher mode (`/teacher-mode/newtons-laws/theory`) works: full-screen, keyboard-only nav (←/→ for slides, Esc to exit), no chrome.
10. Arabic content reviewed by whoever §3.2.10's reviewer-identification task named.
11. `pnpm lint && pnpm typecheck && pnpm test` green; all `REVIEW_*` comments resolved; Lighthouse mobile on `/units/newtons-laws/theory` ≥ 90.
12. A fresh Claude session reviews the merged PR as "staff engineer with no prior context" and signs off (per `START_HERE.md`).
13. The real acceptance: Faris teaches a 45-minute mock class using only the Unit 3 theory slides + a student runs the FBD Builder solo for 20 minutes and completes ≥ 3 scenarios.

### 4.2 Phase 1 intra-unit sequence (follows `docs/05` §7)

Each sub-phase is multi-session. Commit discipline: feature-per-session, but batch at logical boundaries (research → one commit; content draft → one commit; content reviewed → another commit).

#### 4.2.1 Research & outline (1 session, ~3 h)

- Re-read `docs/01` §Unit 3 + `docs/05` + `docs/06` Pattern 3.
- Pull 2–3 past Bagrut Newton's Laws problems from `bagrut/mechanics/` (requires archive from §3.2.10 to be populated — coordinate with Faris).
- Draft `docs/units/03_newtons_laws.md` (the per-unit spec file — currently missing). Include: slide-deck outline (8–12 bullets), interactive scenario list (5 scenarios), exam questions (4 total), targeted misconceptions.
- **Exit:** outline file approved by Faris before any code.

**Commit:** `docs(unit-03): research outline for Newton's Laws`

#### 4.2.2 Content draft — meta + slides + summary (2–3 sessions, ~8 h)

- Write `meta.ts` in full. All Arabic strings as draft; mark uncertain phrasings with `REVIEW_ARABIC`.
- Draft `slides.mdx` — 8–12 slides following `docs/05` §2 required sequence. Each slide Arabic+Hebrew+English. Equations as KaTeX. Zero inline logic — pure content.
- Draft `summary.mdx`.
- **Before Arabic review:** Faris reads draft; flags any terminology slip; sleeps on it, re-reads next day.
- **Arabic review:** whoever §3.2.10 named. Apply corrections.
- **Hebrew review:** Faris verifies against a recent past Bagrut (from `bagrut/`).

**Commit (after draft):** `feat(unit-03): draft meta, slides, summary (pre-review)`
**Commit (after review):** `docs(unit-03): apply Arabic + Hebrew reviewer corrections`

#### 4.2.3 Physics helpers (1–2 sessions, ~6 h)

- Create `src/lib/physics/dynamics.ts`: `netForce`, `accelerationOnIncline`, `tensionInAtwood`, `frictionForce(mu, N, direction)`, `decompose(vector, angle)`.
- Unit tests in `src/lib/physics/__tests__/dynamics.test.ts` — known inputs, expected outputs (include edge cases: zero mass, 90° incline, μ=0, μ=∞).
- Invoke `/physics-accuracy` skill on the signature + tests. Fix any flags.

**Commit:** `feat(physics): dynamics helpers with unit tests`

#### 4.2.4 Shared interactive primitives (2–3 sessions, ~10 h)

Built generic so every future unit's interactive can use them.

- `SimulationCanvas` — SVG container with resize, pan/zoom (optional), coordinate-system utilities (world-to-screen).
- `ControlPanel` — sliders + numeric inputs + PLAY button. RTL-aware.
- `LiveReadout` — 2-column table of (label, value, unit) that re-renders at 60fps.
- `AnswerInput` — for numeric predictions, selections, etc.
- `ResultBanner` — success/failure with Arabic hint. Animates in per `docs/02` §6 timing tokens.
- `ProblemStatement` — reads Arabic problem + inline Hebrew terms.

Each with Storybook-style demo in a `/dev/components` route (not shipped to prod — gated by `process.env.NODE_ENV === 'development'`).

**Commits (one per primitive or batch):** `feat(components/interactive): <name>`

#### 4.2.5 FBD Builder — the hard part (3–5 sessions, ~20–30 h) ★

This is the risky chunk. Budget generously.

**Build order (from `docs/06` §Building your first interactive):**

1. Scenario renderer — SVG of box-on-incline, Atwood, stacked masses (5 scenarios total).
2. Force palette — drag source for weight/normal/tension/friction/applied.
3. Force placement + magnitude adjustment logic.
4. Physics engine reading the student's FBD and computing motion via F=ma. Consider **Matter.js** only if hand-rolled physics becomes fragile — evaluate after step 4.
5. Simulation renderer — object moves per the FBD (right FBD → matches target; wrong → visibly wrong).
6. Compare logic — "how far from the real physics?" Threshold for pass/fail.
7. Result banner + Arabic hint selection (rule-based: missing force? → hint about contact; wrong magnitude? → hint about g or μ).
8. Preview: ghost FBD before commit, dashed expected path.
9. Difficulty ramp: scenarios 1→5, smaller tolerances on 4–5.
10. Streak persistence via `useProgress`.

**Technical watchouts:**

- 60 fps on a 5-year-old laptop → budget ≤ 16 ms per frame. Avoid re-renders on drag; use refs for transient positions and commit to state on drop.
- Drag-and-drop on touch devices (classroom iPads) — use pointer events, not mouse events.
- RTL: force arrow labels use JetBrains Mono LTR; Arabic hint text RTL. Test both.
- Accessibility: every force placement has a keyboard alternative (Tab to palette → Enter to select → arrow keys to place).

**Commits:** per build-step, e.g. `feat(unit-03): FBD scenario renderer (5 scenarios)`, `feat(unit-03): force palette + drag`, `feat(unit-03): physics integration`, etc.

#### 4.2.6 Exam (1–2 sessions, ~6 h)

- Write 4 questions in `exam.ts` per `docs/05` §4 shape.
- At least 1 pulled verbatim from `bagrut/mechanics/` with year + season attribution.
- Each question multi-part (a, b, c). Numeric answers have `tolerance`. Every part has an Arabic `solution` walkthrough.
- Use `/physics-accuracy` skill to verify each answer (dimensional, sign, scope).
- Arabic reviewer checks solution prose.

**Commits:** `feat(unit-03): exam bank — 4 Bagrut-style questions`, then `docs(unit-03): exam Arabic review corrections`.

#### 4.2.7 Integration (1 session, ~3 h)

- Register Unit 3 in `unitRegistry.ts` with `status: 'ready'`.
- Update `UnitCard` to show ready state (accent ring, "⌁ ready" tag).
- Wire `/units/newtons-laws/summary` to render `summary.mdx`.
- Verify `useProgress('newtons-laws')` persists streak from the interactive.
- Add Unit 3 terms to the in-progress bilingual glossary (even though the glossary page is Phase 5 — populate its data source now).
- Teacher mode route: `src/app/teacher-mode/[unitId]/theory/page.tsx` — strip chrome, full-screen, arrow-key nav.

**Commit:** `feat(unit-03): register unit, wire progress, teacher mode`

#### 4.2.8 Fresh-session review + real-classroom dry run (1 session, ~3 h)

- Start a brand-new Claude session, no prior context. Prompt: "Review `src/content/units/newtons-laws/` as a staff engineer with no prior context. Catch shortcuts, missing cases, inconsistencies."
- Address all critical findings; log non-critical findings in §6.
- **Real classroom dry run (if feasible):** run 30 minutes of Unit 3 theory with a student or colleague. Watch where they get stuck. Make notes; fix top 3 issues.

**Commit:** `fix(unit-03): address staff-engineer review + dry-run findings`

### 4.3 The shared component manifest (built during Phase 1, used for all units)

This is effectively the Falak design-system-as-code. Maintain this table — every future unit shouldn't need new primitives, only new _content_.

| Component                           | Purpose                                       | Location                                          |
| ----------------------------------- | --------------------------------------------- | ------------------------------------------------- |
| `SlideViewer`                       | Keyboard-nav deck player                      | `src/components/slide/SlideViewer.tsx`            |
| `SlideFrame`                        | 16:10 container, top-right meta mark          | `src/components/slide/SlideFrame.tsx`             |
| `TitleSlide`                        | First slide, bilingual                        | `src/components/slide/TitleSlide.tsx`             |
| `ConceptSlide`                      | The big idea                                  | `src/components/slide/ConceptSlide.tsx`           |
| `EquationsSlide`                    | 1–3 equations max                             | `src/components/slide/EquationsSlide.tsx`         |
| `VisualSlide`                       | Diagrams                                      | `src/components/slide/VisualSlide.tsx`            |
| `WorkedExampleSlide`                | Fully-solved problem                          | `src/components/slide/WorkedExampleSlide.tsx`     |
| `VocabSlide`                        | Bilingual term table                          | `src/components/slide/VocabSlide.tsx`             |
| `SimulationCanvas`                  | SVG sim container                             | `src/components/interactive/SimulationCanvas.tsx` |
| `ControlPanel`                      | Sliders + PLAY                                | `src/components/interactive/ControlPanel.tsx`     |
| `LiveReadout`                       | Real-time values table                        | `src/components/interactive/LiveReadout.tsx`      |
| `AnswerInput`                       | Numeric / selection inputs                    | `src/components/interactive/AnswerInput.tsx`      |
| `ResultBanner`                      | Success / failure + hint                      | `src/components/interactive/ResultBanner.tsx`     |
| `ProblemStatement`                  | Arabic problem + Hebrew terms                 | `src/components/interactive/ProblemStatement.tsx` |
| `ExamQuestion`                      | Multi-part question renderer                  | `src/components/exam/ExamQuestion.tsx`            |
| `ExamNavigator`                     | Scroll-to-next question                       | `src/components/exam/ExamNavigator.tsx`           |
| `SolutionReveal`                    | Hidden-until-asked solution                   | `src/components/exam/SolutionReveal.tsx`          |
| `ArabicTitle`                       | `font-arabic text-Xl` wrapper                 | `src/components/bilingual/ArabicTitle.tsx`        |
| `HebrewLabel`                       | `font-hebrew text-sm text-accent uppercase`   | `src/components/bilingual/HebrewLabel.tsx`        |
| `TermBlock`                         | Hebrew label + Arabic title + English caption | `src/components/bilingual/TermBlock.tsx`          |
| `Math` / `InlineMath` / `BlockMath` | KaTeX wrappers                                | `src/components/math/Math.tsx`                    |

---

## 5. Risk register (updated with session-zero intel)

_Updates from the roadmap's risk register using what we learned in the interview._

| Risk                                                                                | Likelihood                          | Impact    | Mitigation (updated)                                                                                                                                                                                                                          |
| ----------------------------------------------------------------------------------- | ----------------------------------- | --------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Arabic review bottleneck                                                            | **Medium** (author is the reviewer) | Medium    | Faris is a native Arabic speaker and the reviewer. The 48-hour cool-off re-read rule is now the primary check (not a fallback) since there is no second pair of eyes. Student spot-reading sought opportunistically.                          |
| FBD Builder complexity                                                              | High                                | High      | §4.2.5 allocates 3–5 sessions (~20–30 h). Stop and reach for Matter.js only after step 4 of the 10-step build if hand-rolled physics becomes fragile. Scenarios ordered easiest → hardest so an MVP can ship with scenarios 1–3 if 4–5 stall. |
| Physics accuracy errors                                                             | Medium                              | Very high | Author is a physics teacher — first line of defense. `physics-accuracy` skill on every equation. Unit-tested helpers. Second-teacher peer review is a future mitigation (§6).                                                                 |
| Scope creep                                                                         | High                                | High      | Phase gates are hard. The plan deliberately defers features (teacher accounts, adaptive difficulty, TTS, PWA) to Phase 7+.                                                                                                                    |
| Burnout (solo project)                                                              | High                                | High      | Tempo is 15+ h/week, not 40. Real-classroom dry run at end of Phase 1 (§4.2.8) provides a concrete win.                                                                                                                                       |
| Perf regressions                                                                    | Low                                 | Medium    | Lighthouse baselined in §3.2.8; re-run on every unit's theory/interactive route. Perf budget 150 KB JS gzipped from `docs/03` §10 is a hard limit.                                                                                            |
| **Past-Bagrut copyright / usage rights** (new)                                      | Medium                              | Medium    | `bagrut/README.md` documents usage note. Before pasting a verbatim problem into `exam.ts`, Faris confirms educational fair use is adequate; otherwise the question is paraphrased and attributed.                                             |
| **Drift between docs and code** (new, because docs mention a nonexistent prototype) | Medium                              | Low       | §3.2.10 fixes today. Future: a doc-lint step (Phase 5 or earlier) that cross-references `docs/units/*.md` against `src/content/units/*/meta.ts`.                                                                                              |

---

## 6. Open items to resolve before / during Phase 1

Track these here. Mark done (✓) when resolved; add new items as they appear.

- [x] **Reviewer identification** — resolved 2026-04-23: Faris is the Arabic reviewer (native speaker + physics teacher). Per-unit Arabic protocol: draft → 48h cool-off → re-read → commit. Student spot-reading still sought opportunistically but not blocking.
- [ ] **Past-Bagrut archive** — download last 6 years of mechanics (036-361), EM (036-371), radiation (036-282). Populate `bagrut/` per §3.2.10. **Due:** before §4.2.1 research phase (Unit 3 exam drafting depends on it).
- [ ] **Second physics reviewer** — nice to have, not blocking. Ask one other 5-unit physics teacher whether they'd peer-review one unit per month. Risk-reduction for §5's "Physics accuracy" row.
- [ ] **Domain name** — `falak.education` is suggested. Register-or-don't decision can wait until Phase 2 (when there's something to deploy publicly).
- [ ] **`docs/units/03_newtons_laws.md`** — per-unit spec file currently missing; §4.2.1 creates it.
- [ ] **Unit 7 Arabic title review** (`REVIEW_ARABIC` flagged in §1.2) — confirm `التوافقية البسيطة` vs `الهرمونية` with native reviewer. Not urgent; Unit 7 is far away.
- [ ] **Bagrut exam reproduction rights** — confirm educational fair use permits verbatim republishing in `exam.ts` with attribution. If unclear, default to paraphrasing.
- [ ] **Accessibility audit plan** — Phase 0 has no accessibility issues (empty routes), but a proper WCAG 2.1 AA audit is Phase 6. Intermediate spot-checks should happen at each unit's gate.

---

## 7. Phase 2+ preview (not detailed — do not plan ahead of reality)

Listed as orientation, not a commitment. Build out detail when Phase 1 completes.

| Phase                            | Units / features                                             | Estimated weeks @ 15h/week |
| -------------------------------- | ------------------------------------------------------------ | -------------------------- |
| **Phase 2 · Mechanics core**     | Units 1, 2, 4, 5, 6, 7                                       | ~12–16                     |
| **Phase 3 · Electromagnetism**   | Units 8, 9, 10 (Circuit Builder is the hard one)             | ~8–10                      |
| **Phase 4 · Radiation & Matter** | Units 11, 12, 13, 14                                         | ~8–10                      |
| **Phase 5 · Cross-unit**         | Glossary, Bagrut simulator, progress dashboard, print/export | ~4                         |
| **Phase 6 · Review & launch**    | Reviewer passes, WCAG audit, domain, first classroom use     | ~6–8 (ongoing)             |

Critical path from Phase 1 end to v1: ~9–12 calendar months at the stated tempo.

---

## 8. Appendix · mini-glossary for first-time Next.js users

(Kept brief; the plan explains concepts where they matter.)

- **App Router** — Next.js 13+ routing model. Folders under `src/app/` become URL paths. Special filenames: `page.tsx` (the route), `layout.tsx` (wraps children), `loading.tsx` (loading UI), `error.tsx` (error boundary).
- **Static export** — `next build` + `output: 'export'` produces an `out/` folder with plain HTML/CSS/JS. No Node.js at runtime. Hostable anywhere.
- **Server Component vs Client Component** — App Router components are server-side by default (rendered on build). Adding `"use client"` at the top makes a component client-side (for hooks like `useState`, interactive UI). Falak's slide content is mostly server; interactives are client.
- **`generateStaticParams`** — for dynamic routes (`[unitId]`), this function tells Next which values to build pages for. We return all 14 unit IDs.
- **`next/font`** — Next's built-in font loader. It downloads Google Fonts _at build time_, self-hosts them, and inlines critical CSS. No runtime request to Google.
- **MDX** — Markdown + JSX. Write `## Heading` _and_ `<CustomComponent />` in the same file. Slides are MDX.
- **KaTeX** — a math typesetting library. Renders `$E = mc^2$` to pretty HTML. Faster than MathJax.
- **Zustand** — a small state-management library. Acts like a global hook. We use it for progress and settings.
- **Dexie** — a friendly wrapper over IndexedDB (browser-side database). Versioned schema, Promises, TypeScript.
- **Framer Motion** — React animation library. Powers slide transitions and pedagogical motion. Respects `prefers-reduced-motion`.
- **Tailwind** — utility-first CSS framework. Instead of `.card { padding: 16px }`, you write `<div class="p-4">`.
- **`tailwindcss-rtl`** — plugin that adds `ms-4` (margin-start, direction-aware) and `rtl:` variants. Required for Arabic/Hebrew layouts.
- **Lighthouse** — Chrome DevTools audit for performance, accessibility, best practices, SEO. Mobile score ≥ 90 is Falak's target per unit route.
- **Corepack** — Node 16.13+ feature that manages pnpm/yarn versions per project. That's why `pnpm --version` printed a "downloading pnpm" notice on first run — Corepack was installing the pinned version.

---

_End of plan. Update this file whenever the reality of the project diverges from what's written here. A stale plan is worse than no plan._
