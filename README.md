# Falak · فَلَك

> A physics teaching platform for the Israeli 5-unit Bagrut exam, built for Arab high-school classrooms.

Falak (Arabic for "orbit") is an open-source educational platform that helps teachers teach and students master the full 5-unit physics curriculum of the Israeli Bagrut exam. It's designed and written primarily in Arabic with Hebrew terminology layered throughout — preparing students for an exam written in a language that isn't their native tongue, without making them learn physics in that language from scratch.

## What's inside

- **14 units** covering the full Bagrut curriculum:
  - Mechanics (7 units): kinematics, Newton's laws, work-energy, momentum, circular motion, gravitation, harmonic motion
  - Electromagnetism (3 units): electrostatics, DC circuits, magnetism
  - Radiation & Matter (4 units): geometric optics, physical optics, modern physics, atomic/nuclear physics
- **Every unit includes:**
  - A beautifully designed slide deck for the teacher to project in class
  - An interactive simulation where students solve problems and watch their solution animate
  - A Bagrut-style exam with scoring and explanations
  - A concise takeaway summary

## For developers

Start with [`START_HERE.md`](./START_HERE.md). If you're using Claude Code, open this directory and the agent will auto-load [`CLAUDE.md`](./CLAUDE.md).

### Local development

Requires Node 20+ and pnpm 10+ (managed via Corepack — run `corepack enable` once if needed).

```bash
pnpm install
pnpm dev        # http://localhost:3000
```

### Build & checks

```bash
pnpm build      # produces ./out/ (static HTML/CSS/JS)
pnpm typecheck  # tsc --noEmit
pnpm lint       # next lint
```

## Tech stack

Next.js 14 (App Router, static export) · TypeScript · Tailwind CSS · Framer Motion · MDX · KaTeX · Zustand · Dexie (IndexedDB)

## Status

**Phase 0** — project setup. See [`docs/IMPLEMENTATION_PLAN.md`](./docs/IMPLEMENTATION_PLAN.md) for the current execution plan and [`docs/08_build_roadmap.md`](./docs/08_build_roadmap.md) for the long-term development plan.

## License

TBD.
