# START HERE — Falak Project Onboarding

**Read this file first. Every time. Both you (the builder) and Claude.**

---

## What is this?

Falak (فَلَك · "orbit") is a physics teaching platform for the Israeli 5-unit Bagrut exam, built for Arab high-school classrooms. It teaches in Arabic, uses Hebrew terminology (because the Bagrut is in Hebrew), and covers the complete 5-unit mechanics + electromagnetism + radiation-and-matter curriculum.

## The project at a glance

| Thing        | Value                                                                         |
| ------------ | ----------------------------------------------------------------------------- |
| Product name | Falak (فَلَك)                                                                 |
| Tech stack   | Next.js 14 (App Router) + TypeScript + Tailwind + Framer Motion + MDX + KaTeX |
| Deployment   | Vercel (static export)                                                        |
| Languages    | Arabic (primary) + Hebrew (terminology) + English (technical labels)          |
| Curriculum   | 14 units spanning 3 Bagrut exam sections + lab                                |
| Audience     | Arab high-schoolers, grades 10–12, 5-unit physics track                       |

## How to use this repository with Claude Code

### First session (project setup)

1. **Open Claude Code in this directory.** Claude Code will automatically read `CLAUDE.md`.
2. **Verify with Claude that it has correctly loaded the context.** Ask: _"Summarize the Falak project in three sentences and list the 14 units by name."_ If it can't, something is wrong — don't proceed.
3. **Run `/init`** — let Claude Code generate anything it thinks is missing, then review and trim.
4. **Read `SPEC.md`** together with Claude as the source of truth for what you're building.
5. **Do not jump into implementation.** The first session should produce a phase-1 implementation plan and nothing else. Save it to `docs/IMPLEMENTATION_PLAN.md`.

### Every subsequent session

1. **Start each session with a specific goal.** "Build Unit 3 slides" beats "work on units."
2. **Use phase-gated execution.** Each unit goes through: Content → Slides → Interactive → Exam → Review. Don't skip phases.
3. **Commit after every phase.** Use clear commit messages like `feat(unit-03): slides complete`.
4. **Review with a fresh session.** After finishing a unit, start a new Claude session and ask it to review as a staff engineer with no prior context. Catches shortcuts and assumptions.

### What NOT to ask Claude to do

- ❌ "Build all 14 units" (too large, context will collapse)
- ❌ "Make it look good" (non-specific, will produce AI slop)
- ❌ "Translate this to Arabic" (Claude machine-translates incorrectly for physics terminology — always have a native speaker review)
- ❌ "Figure out the Bagrut curriculum" (already done in `docs/01_curriculum_and_units.md` — always point there)

### What TO ask

- ✅ "Build Unit 03 slides per the spec in `docs/units/03_newton_laws.md`"
- ✅ "Create an interactive FBD trainer per `docs/06_interactive_patterns.md`"
- ✅ "Review Unit 05's physics accuracy against `docs/01_curriculum_and_units.md`"

## The files in this project

```
falak/
├── START_HERE.md                    ← you are here
├── CLAUDE.md                        ← Claude Code reads this every session (concise, ~150 lines)
├── AGENTS.md                        ← same as CLAUDE.md (for tool-agnostic support)
├── README.md                        ← public readme
├── SPEC.md                          ← full product specification
│
├── docs/                            ← deep reference material (progressive disclosure)
│   ├── 01_curriculum_and_units.md   ← complete Bagrut curriculum + all 14 units
│   ├── 02_design_system.md          ← colors, fonts, components, motion
│   ├── 03_architecture.md           ← app structure, routing, state, storage
│   ├── 04_tech_stack.md             ← framework/library choices + rationale
│   ├── 05_unit_template.md          ← the canonical shape of every unit
│   ├── 06_interactive_patterns.md   ← game/simulation design patterns
│   ├── 07_content_guidelines.md     ← bilingual writing rules
│   ├── 08_build_roadmap.md          ← phased development plan
│   └── units/                       ← per-unit detailed specs
│       ├── 01_kinematics_1d.md
│       ├── 02_kinematics_2d_projectile.md
│       ├── 03_newtons_laws.md
│       ├── ...
│       └── 14_modern_atomic.md
│
└── .claude/
    ├── skills/                      ← custom skills (load on demand)
    │   ├── physics-accuracy/        ← verifies physics content against curriculum
    │   ├── bilingual-content/       ← enforces Arabic/Hebrew correctness
    │   ├── slide-authoring/         ← templates and guidelines for slides
    │   └── simulation-builder/      ← patterns for interactive sims
    └── commands/                    ← custom slash commands
        ├── new-unit.md              ← /new-unit
        └── review-unit.md           ← /review-unit
```

## The golden rules

1. **Accuracy over speed.** A physics error in a slide will be copied verbatim by students. Every equation, every number, every Hebrew term must be verified.
2. **Bilingual from day one.** Never build a feature "Arabic first, translate later." Every slide, every interactive, every error message is designed bilingually from the start.
3. **Pedagogy drives design, not the other way around.** Every visual choice must serve learning. If an animation is cool but distracting, cut it.
4. **The Bagrut is the bar.** If a student finishes a Falak unit and can't solve the corresponding Bagrut problem, we failed. Every unit ends with a past Bagrut exercise.
5. **Ship one good unit before building ten mediocre ones.** Unit 1 sets the standard for Units 2–14.

## Ready?

Next file to read: `CLAUDE.md`
