# Falak · Physics Teaching Platform for Bagrut (Israel)

> This file is loaded into context at the start of every Claude Code session.
> Keep it concise. For deeper context, reference the `docs/` folder.

## WHY (purpose)

Falak teaches the Israeli 5-unit (5 יח״ל / 5 وحدات) physics Bagrut curriculum to Arab high-school students. It's taught in Arabic because students learn best in their native language, but uses Hebrew terminology because the Bagrut exam is written in Hebrew. Every design decision should serve two users: the **teacher** (preparing and delivering class) and the **student** (learning and practicing for the exam).

## WHAT (product)

A Next.js web platform of 14 units. Each unit has four parts:

1. **Theory** — beautifully designed slide deck the teacher projects in class
2. **Interactive** — physics simulation/game where students solve problems, input answers, and watch their solution animate (successful or not)
3. **Exam** — Bagrut-style questions with scoring and explanations
4. **Summary** — 2–3 sentence takeaway the student must memorize

*(Phase 2: video summaries via NotebookLM per unit.)*

## HOW (technical stack)

- **Framework:** Next.js 14 App Router (static export, deploy to Vercel)
- **Language:** TypeScript strict mode
- **Styling:** Tailwind CSS with design tokens from `docs/02_design_system.md`
- **Content:** MDX for slide authoring (markdown with React components)
- **Animation:** Framer Motion
- **Math:** KaTeX for equation rendering
- **Physics sims:** Custom SVG + React state; use Matter.js only for rigid-body sims that need it
- **Storage:** IndexedDB via Dexie.js for progress/scores
- **Fonts:** Fraunces (display), Inter (body), JetBrains Mono (math/code), Noto Kufi Arabic (Arabic), Heebo (Hebrew)

## Project layout (map)

```
falak/
├── CLAUDE.md, README.md, SPEC.md, START_HERE.md
├── docs/
│   ├── 01_curriculum_and_units.md     ← Bagrut curriculum + all 14 units
│   ├── 02_design_system.md            ← tokens, components, motion
│   ├── 03_architecture.md             ← routes, state, data flow
│   ├── 04_tech_stack.md               ← library decisions
│   ├── 05_unit_template.md            ← shape of every unit
│   ├── 06_interactive_patterns.md     ← sim/game patterns
│   ├── 07_content_guidelines.md       ← bilingual rules
│   ├── 08_build_roadmap.md            ← phased plan
│   └── units/                          ← per-unit specs (14 files)
├── .claude/
│   ├── skills/  (physics-accuracy, bilingual-content, slide-authoring, simulation-builder)
│   └── commands/ (/new-unit, /review-unit)
└── src/  (when code exists)
    ├── app/                    Next.js routes
    ├── components/             shared UI
    ├── content/                MDX unit content
    ├── lib/                    utilities, physics helpers
    └── styles/                 global styles
```

## Core conventions

### Code style
- ES modules only (`import`/`export`), never CommonJS
- Named exports only, no default exports (except Next.js page files where required)
- Type everything; no `any`
- Component files use PascalCase (`SlideDeck.tsx`), utility files camelCase (`physics.ts`)
- Every component file has exactly one default-level component
- Use Tailwind utility classes, not inline styles
- Physics calculations go in `src/lib/physics/` — never inline

### Content conventions
- All physics content verified against `docs/01_curriculum_and_units.md`
- All Hebrew terminology verified against the official Israeli Ministry of Education glossary
- All Arabic content written in Modern Standard Arabic (فصحى)
- Every slide has bilingual metadata: Arabic title + Hebrew term + English technical name
- Every equation wrapped in KaTeX, never ASCII-art or HTML entities for math

### File creation rules
- New units go under `src/content/units/{unit-id}/` with `meta.ts`, `slides.mdx`, `interactive.tsx`, `exam.ts`, `summary.mdx`
- Never create unit content without first consulting `docs/units/{unit-id}.md` for the spec
- Follow the naming in `docs/01_curriculum_and_units.md` — unit IDs are fixed

### Git workflow
- Branch per unit: `unit/03-newton-laws`
- Commit per phase: `feat(unit-03): theory slides`, `feat(unit-03): interactive sim`, `feat(unit-03): exam`, `test(unit-03): physics accuracy`
- One unit = one PR

## Prohibited (anti-patterns)

- ❌ **No machine translation** — if unsure of Arabic/Hebrew, flag it, don't guess. Physics terms have precise standard translations.
- ❌ **No purple-gradient AI aesthetic.** See `docs/02_design_system.md` for the required palette.
- ❌ **No `localStorage`** — use IndexedDB via Dexie. It's more robust and works for larger data.
- ❌ **No dumping content inline** — slide content lives in MDX files, exam questions live in TS data files.
- ❌ **No "TODO" comments in committed code.** If it's not done, it doesn't merge.
- ❌ **No physics approximations without flagging them.** If g = 10 is used for a problem, the slide must say so.
- ❌ **No simulations without a pedagogical purpose.** If it's cool but doesn't teach the physics, cut it.

## Workflow rules for Claude

1. **Before implementing anything**, read the relevant `docs/` files. If a unit is requested, read `docs/units/{id}.md` AND `docs/05_unit_template.md`.
2. **Plan before coding.** For anything larger than a single component, write the plan first and wait for approval.
3. **Ask when unclear.** Use the AskUserQuestion tool rather than assume. Especially for Arabic phrasing, pedagogical choices, or scope.
4. **Verify physics accuracy** by invoking the `physics-accuracy` skill. This is non-negotiable for equations, problems, and explanations.
5. **After completing a unit phase**, summarize what was done, what was tested, and what remains.
6. **Use subagents for large tasks.** Building a full unit should be split into subagent calls per phase.

## Commands

```bash
# Development
pnpm dev              # run dev server
pnpm build            # production build (static export)
pnpm lint             # eslint + prettier
pnpm typecheck        # tsc --noEmit
pnpm test             # vitest

# Custom Falak commands (once built)
pnpm verify:content   # checks all units against curriculum spec
pnpm verify:bilingual # checks Arabic/Hebrew completeness
pnpm verify:a11y      # accessibility audit (important for RTL)
```

## References (when stuck)

- **Curriculum questions** → `docs/01_curriculum_and_units.md`
- **Design questions** → `docs/02_design_system.md`
- **Arch/routing questions** → `docs/03_architecture.md`
- **What a unit should look like** → `docs/05_unit_template.md`
- **How to build an interactive** → `docs/06_interactive_patterns.md`
- **Arabic/Hebrew writing** → `docs/07_content_guidelines.md`
- **What to build next** → `docs/08_build_roadmap.md`

## Current phase

> **Phase 0 — project setup.** No code yet. First deliverable: `docs/IMPLEMENTATION_PLAN.md` — a Claude-generated phase-1 plan based on the roadmap in `docs/08_build_roadmap.md`. Do this in a planning-only session; switch to a fresh session for execution.
