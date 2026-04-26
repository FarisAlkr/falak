# Build Roadmap

> Phased plan from empty repo to full production platform.
> Each phase has a definition of done. Don't advance without completing the previous phase.

---

## Phase 0 · Planning & Setup (1 week)

**Goal:** Lock specs, set up tooling, make zero product decisions during implementation.

### Deliverables

- [ ] This entire `docs/` folder reviewed and approved
- [ ] Native Arabic speaker + physics teacher (the author) confirms all content guidelines
- [ ] Hebrew terminology list audited against latest Bagrut exam
- [ ] `package.json` initialized with dependencies from `04_tech_stack.md`
- [ ] Next.js skeleton with folder structure from `03_architecture.md`
- [ ] Tailwind + fonts + CSS tokens configured per `02_design_system.md`
- [ ] Empty route skeleton for all 14 units created (placeholders OK)
- [ ] `/home` page renders a units grid with real data from `unitRegistry.ts`
- [ ] Dexie schema drafted, hooks written for `useProgress`
- [ ] Git repo initialized, first commit, deploy preview on Vercel
- [ ] Lighthouse baseline score recorded (should already be >95 — nothing on page)

### Don't yet

- Don't implement any physics
- Don't write content for any unit
- Don't build interactives
- Don't build slide viewer (just the empty route)

### Gate check before Phase 1

Can you navigate to any unit's home page and see its metadata rendered? Yes → advance. No → finish Phase 0.

---

## Phase 1 · Reference Implementation (2 weeks)

**Goal:** Build Unit 3 (Newton's Laws) end-to-end as the quality benchmark for Units 2–14.

**Why Unit 3 first?** It has the hardest interactive (FBD Builder) and the most foundational content (everything downstream depends on FBDs). If we can do this one well, everything else is easier.

### Deliverables

- [ ] `src/content/units/newtons-laws/meta.ts` — full metadata
- [ ] `src/content/units/newtons-laws/slides.mdx` — complete deck (8–12 slides)
- [ ] `src/content/units/newtons-laws/interactive.tsx` — FBD Builder
- [ ] `src/content/units/newtons-laws/exam.ts` — 3–5 Bagrut questions
- [ ] `src/content/units/newtons-laws/summary.mdx` — summary card
- [ ] `src/lib/physics/dynamics.ts` — force/acceleration helpers with tests
- [ ] `src/components/slide/*.tsx` — all slide templates built as reusable components
- [ ] `src/components/interactive/*.tsx` — all interactive primitives
- [ ] SlideViewer works end-to-end with keyboard nav
- [ ] Teacher mode works (distraction-free full-screen)
- [ ] Native speaker reviews Arabic
- [ ] Physics expert reviews accuracy
- [ ] All lint/typecheck/test passing
- [ ] Lighthouse on `/units/newtons-laws/theory` ≥ 90

### Gate check before Phase 2

Can a teacher run a full 45-minute class using only Unit 3's theory slides, and can a student complete the interactive in 20–30 minutes independently? Yes → advance.

### Parallel work during Phase 1

While Unit 3 is being built, the author can:

- Collect past Bagrut problems for Units 1, 2, 4
- Draft outlines for Units 1, 2 slides in markdown (not MDX yet)
- Start recording terminology gaps for the glossary

---

## Phase 2 · Mechanics Core (6 weeks)

**Goal:** Ship Units 1, 2, 4, 5, 6, 7 — completing the mechanics section.

### Build order

1. Unit 1 · 1D Kinematics (1 week — content is mostly recap, interactive is moderate)
2. Unit 2 · 2D Motion & Projectiles (1 week — prototype already exists, needs full integration)
3. Unit 4 · Work, Energy, Power (1 week — interactive is moderate)
4. Unit 5 · Momentum & Impulse (1 week)
5. Unit 6 · Circular Motion (1 week)
6. Unit 7 · Gravitation & SHM (1 week — two distinct topics, plan carefully)

### Per-unit deliverables

Same as Phase 1, but each takes less time because infrastructure exists.

### Gate check before Phase 3

All 7 mechanics units are live, reviewed, deployed. Cross-unit features (formula sheet, mechanics-wide glossary) started.

---

## Phase 3 · Electromagnetism (4 weeks)

Units 8, 9, 10.

### Considerations

- Physics gets more abstract — interactives need to work harder to make fields and induction tangible
- Circuit Builder (Unit 9) is the most complex interactive in this phase — budget 2 weeks for it alone
- New physics helpers: `circuits.ts`, `electromagnetism.ts`, `fields.ts`

### Build order

1. Unit 8 · Electrostatics (1 week — Field Mapper interactive)
2. Unit 9 · DC Circuits (2 weeks — Circuit Builder is complex)
3. Unit 10 · Magnetism & Induction (1 week)

---

## Phase 4 · Radiation & Matter (4 weeks)

Units 11, 12, 13, 14.

### Considerations

- Physical optics (waves, interference) benefits from high-quality visualization
- Modern physics requires careful conceptual setup (intuition-breaking)
- New physics helpers: `optics.ts`, `waves.ts`, `quantum.ts`, `nuclear.ts`

### Build order

1. Unit 11 · Geometric Optics (1 week)
2. Unit 12 · Physical Optics & Waves (1.5 weeks — Interference Tank is visual-heavy)
3. Unit 13 · Modern Physics (1 week)
4. Unit 14 · Atomic & Nuclear (0.5 weeks — relatively straightforward interactives)

---

## Phase 5 · Cross-unit Features (2 weeks)

**Goal:** The platform-level features that span all units.

### Deliverables

- [ ] **Searchable bilingual glossary** — all 200+ terms, filterable by unit/section/language
- [ ] **Formula reference** — full Bagrut formula sheet, one page per section
- [ ] **Bagrut simulator** — mix problems from multiple units into a timed exam
- [ ] **Progress dashboard** — unit completion, exam scores over time, streak, weak-topic identification
- [ ] **Print/export** — every summary card printable, every exam exportable as PDF
- [ ] **Settings panel** — language preference (UI), reduced motion, high-contrast mode

---

## Phase 6 · Review, Polish, Launch (ongoing, ~4 weeks)

**Goal:** Ship-quality platform, real classroom testing.

### Deliverables

- [ ] All content reviewed by at least two independent physics teachers
- [ ] All Arabic reviewed by at least two native speakers (ideally one teacher, one student)
- [ ] All Hebrew vocabulary verified against 3 most recent past Bagrut exams
- [ ] Lighthouse scores ≥ 90 on mobile for all routes
- [ ] WCAG 2.1 AA compliance audit passed
- [ ] RTL testing on iPad Safari, desktop Chrome, Android Chrome
- [ ] Load testing (simulated classroom of 30 students)
- [ ] Domain registered, deployed to production
- [ ] Analytics set up (Plausible)
- [ ] Feedback mechanism in UI (simple form, no auth required)
- [ ] Used for a full semester in at least one real classroom
- [ ] Iteration based on teacher + student feedback

---

## Phase 7+ · Stretch features (deferred)

These are explicitly NOT v1. Revisit after Phase 6.

- NotebookLM video summaries per unit
- Classroom accounts (teachers invite students, see class analytics)
- Adaptive problem sets
- Voice-over mode (Arabic TTS for accessibility)
- Offline mode (PWA)
- Arabic-Hebrew bilingual toggle for FULL content (not just terminology)
- Gamification (badges, leaderboards) — **only if teachers request it**; risky pedagogically
- Expansion to 4-unit and 3-unit tracks
- Expansion to chemistry and math Bagrut (separate apps)

---

## Scheduling summary

| Phase                                | Duration      | Cumulative                        |
| ------------------------------------ | ------------- | --------------------------------- |
| 0 · Planning & Setup                 | 1 week        | 1 week                            |
| 1 · Reference (Unit 3)               | 2 weeks       | 3 weeks                           |
| 2 · Mechanics (Units 1, 2, 4–7)      | 6 weeks       | 9 weeks                           |
| 3 · Electromagnetism (Units 8–10)    | 4 weeks       | 13 weeks                          |
| 4 · Radiation & Matter (Units 11–14) | 4 weeks       | 17 weeks                          |
| 5 · Cross-unit features              | 2 weeks       | 19 weeks                          |
| 6 · Review & launch                  | 4 weeks       | 23 weeks                          |
| **Total to v1**                      | **~23 weeks** | ≈ 5.5 months of focused solo work |

### Parallelization notes

- **Content writing and code development can run in parallel.** The author drafts content while Claude Code builds infrastructure.
- **Physics helper tests** can be written before interactives (TDD pays off here).
- **Multiple units can be in flight** if there are collaborators, but only one per developer at a time.
- **Review happens continuously**, not in a separate block — every unit is reviewed when it's built.

---

## Risk register

| Risk                          | Likelihood | Impact    | Mitigation                                                           |
| ----------------------------- | ---------- | --------- | -------------------------------------------------------------------- |
| Arabic review bottleneck      | High       | Medium    | Identify reviewer(s) at Phase 0; build review into every unit's gate |
| FBD Builder complexity        | High       | High      | Budget 2 weeks, use Matter.js, prototype before full build           |
| Physics accuracy errors       | Medium     | Very high | Unit-test all physics helpers, physics-accuracy skill mandatory      |
| Scope creep (adding features) | Very high  | High      | Phase gates are hard; stretch features deferred unconditionally      |
| Burnout (solo project)        | High       | High      | Real classroom use from Phase 2 — celebrate wins, get feedback       |
| Deployment / perf issues      | Low        | Medium    | Test Lighthouse from Phase 0, no regressions allowed                 |

---

## Success metrics

By end of Phase 6, Falak should:

- Have all 14 units shipped at high quality
- Be used by at least 1 real classroom for a full semester
- Have positive feedback from at least 10 students and 2 teachers
- Load in < 1.5s on 4G mobile
- Work correctly in RTL on all major browsers
- Score ≥ 90 on Lighthouse mobile across all pages
