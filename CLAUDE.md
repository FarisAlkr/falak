# Falak · Physics Teaching Platform for Bagrut (Israel)

> This file is loaded into context at the start of every Claude Code session.
> Keep it concise. For deeper context, reference the `docs/` folder.

## WHY (purpose)

Falak teaches the Israeli 5-unit (5 יח״ל / 5 وحدات) physics Bagrut curriculum to Arab high-school students. It's taught in Arabic because students learn best in their native language, but uses Hebrew terminology because the Bagrut exam is written in Hebrew. Every design decision should serve two users: the **teacher** (preparing and delivering class) and the **student** (learning and practicing for the exam).

## Content Source of Truth

The scientific teaching content for every unit lives in **`docs/content/`**. These files are the single authoritative source for physics content, equations, examples, misconceptions, bilingual terminology, and past Bagrut questions. They reflect verified research against the Israeli Ministry of Education curriculum and the Sayakim Hebrew–Arabic–English physics dictionary.

**Hard rules:**

- These files MUST be read before generating slides, exams, interactives, or summaries for a unit.
- Physics content must NEVER be invented. Always pull concepts, equations, examples, and bilingual phrasings from the baseline.
- Slides, MDX, exams, and components are **rendering output** — the source of truth is `docs/content/`, not the rendered files.
- Do NOT modify the baseline files as a side effect of rendering work. The baseline is updated only when content authors deliberately revise it.

**The five baseline files:**

| File                                   | Purpose                                                                                                                                    |
| -------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| `docs/content/_format_spec.md`         | The schema. Defines frontmatter, concept blocks, example blocks, misconception blocks, Bagrut blocks, Arabic flag system, and quality bar. |
| `docs/content/00_baseline_index.md`    | The 12-unit map. Frontmatter for every unit, build order, cross-cutting threads, status (FULL / skeleton).                                 |
| `docs/content/01_kinematics_1d.md`     | Unit 01 · 1D Kinematics — fully built deep-dive content.                                                                                   |
| `docs/content/03_newtons_laws.md`      | Unit 03 · Newton's Laws — the **structural reference** for deepening any other unit.                                                       |
| `docs/content/_arabic_review_queue.md` | Aggregates every `⚑` Arabic flag across baseline files into one review queue for native-speaker review.                                    |

**When deepening another unit:** follow `docs/content/_format_spec.md` and use `docs/content/03_newtons_laws.md` as the structural reference. Never invent — research, draft, flag uncertainty with `⚑`, and let the human reviewer resolve flags.

## Project rule (overrides defaults)

**Maximum results. Cost, time, complexity, and output length are not constraints unless explicitly stated otherwise.**

This means: do not optimize for shorter output, faster generation, or simpler structure. Do not propose "good enough" alternatives — only excellence. If a task can be done at quality X or quality X+1 for more effort, X+1 is always chosen. Trade-off discussions only happen when explicitly requested. Applies project-wide: slide authoring, content writing, code generation, design decisions.

## WHAT (product)

A Next.js web platform of 12 units. Each unit has four parts:

1. **Theory** — beautifully designed slide deck the teacher projects in class
2. **Interactive** — physics simulation/game where students solve problems, input answers, and watch their solution animate (successful or not)
3. **Exam** — Bagrut-style questions with scoring and explanations
4. **Summary** — 2–3 sentence takeaway the student must memorize

_(Phase 2: video summaries via NotebookLM per unit.)_

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
│   ├── content/                        ← scientific teaching baseline (source of truth)
│   │   ├── _format_spec.md             ← schema for every unit content file
│   │   ├── 00_baseline_index.md        ← all 12 units, frontmatter + status
│   │   ├── 01_kinematics_1d.md         ← Unit 01, full content
│   │   ├── 03_newtons_laws.md          ← Unit 03, full content (reference unit)
│   │   └── _arabic_review_queue.md     ← pending native-speaker review queue
│   ├── 01_curriculum_and_units.md     ← Bagrut curriculum overview + 12-unit map
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

- All physics content sourced from `docs/content/{NN}_{unit}.md` per the schema in `docs/content/_format_spec.md`; `docs/01_curriculum_and_units.md` provides the curriculum-level overview
- All Hebrew terminology verified against the official Israeli Ministry of Education glossary
- All Arabic content written in Modern Standard Arabic (فصحى)
- Every slide has bilingual metadata: Arabic title + Hebrew term + English technical name
- Every equation wrapped in KaTeX, never ASCII-art or HTML entities for math

### File creation rules

- New units go under `src/content/units/{unit-id}/` with `meta.ts`, `slides.mdx`, `interactive.tsx`, `exam.ts`, `summary.mdx`
- Never create unit content without first reading `docs/content/{NN}_{unit}.md` (the canonical baseline) and `docs/05_unit_template.md` (the rendered-unit shape)
- Follow the unit IDs and numbering in `docs/content/00_baseline_index.md` — they are fixed

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

1. **Before implementing anything**, read the relevant `docs/` files. If a unit is requested, read `docs/content/{NN}_{unit}.md` (the scientific baseline), `docs/content/_format_spec.md` (the schema), and `docs/05_unit_template.md` (the rendered shape).
2. **Plan before coding.** For anything larger than a single component, write the plan first and wait for approval.
3. **Ask when unclear.** Use the AskUserQuestion tool rather than assume. Especially for Arabic phrasing, pedagogical choices, or scope.
4. **Verify physics accuracy** by invoking the `physics-accuracy` skill. This is non-negotiable for equations, problems, and explanations.
5. **After completing a unit phase**, summarize what was done, what was tested, and what remains.
6. **Use subagents for large tasks.** Building a full unit should be split into subagent calls per phase.
7. **Architecture revision after every long session.** Codebases turn into spaghetti when feature work isn't followed by deliberate cleanup. After any session where 5+ files changed, a multi-phase feature shipped, or a major refactor landed, run a deep architecture revision before declaring the work done. The pass:
   - **Inventory** — list every file under `src/`; spot-check what's there.
   - **Dead code** — `grep -rn` for every exported symbol; flag any with zero non-self-referential callers. Delete (or document why kept).
   - **Duplicates / parallel implementations** — two components solving the same problem (old + new), two type definitions for the same shape, two pages rendering near-identical content. Pick one, delete the other.
   - **Stale references** — IDs, file paths, counts (e.g., "14 units" vs the canonical "12 units"), unit-registry vs baseline-index drift. Reconcile.
   - **Cloneability friction** — anything hardcoded to the unit you just shipped (constants, renderer functions, registry keys) that the next unit will have to copy-paste. Lift to shared layer.
   - **Bad design** — overly broad types, circular imports, components with too many props, physics or content logic in components instead of `src/lib/`.
   - **Triage** — definitely-fix / probably-fix / debatable. Execute as **focused commits, one concern per commit**, with `typecheck` + `lint` + `test` + `build` green after each. Document in the commit message exactly what was kept and why.
     This is non-negotiable. The cost of a 30-minute revision pass after each session is far less than the cost of letting parallel implementations and stale references compound. The recent example of this rule in action is on this branch: `edebf41` → `8f2ccd0` (4 cleanup commits after the Phase A–F + diagram-enrichment session).

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

- **Scientific content baseline (source of truth)** → `docs/content/` (schema in `_format_spec.md`, map in `00_baseline_index.md`)
- **Curriculum / exam structure / unit map** → `docs/01_curriculum_and_units.md`
- **Design questions** → `docs/02_design_system.md`
- **Arch/routing questions** → `docs/03_architecture.md`
- **What a unit should look like** → `docs/05_unit_template.md`
- **How to build an interactive** → `docs/06_interactive_patterns.md`
- **Arabic/Hebrew writing** → `docs/07_content_guidelines.md`
- **What to build next** → `docs/08_build_roadmap.md`

## Current phase

> **Phase 1 — Unit 3 reference implementation.** Phase 0 closed 2026-04-26. The platform shell is built: 14-unit registry, all 70 unit×mode placeholder routes, design system, mouse-interactive UI elevation, Dexie progress layer, MDX+KaTeX pipeline, ESLint/Prettier/Husky/Commitlint/Vitest/CI quality gates, Lighthouse baseline (mobile perf 91-93, A11y 95, BP 96, SEO 100), past-Bagrut archive scaffold. Phase 1 builds the first real unit — Newton's Laws & Dynamics — including theory slides, FBD Builder interactive, Bagrut-style exam, and Arabic summary takeaway. See `docs/IMPLEMENTATION_PLAN.md` §4 for the Phase 1 plan.
