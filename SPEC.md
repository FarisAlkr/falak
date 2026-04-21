# Falak — Product Specification

> The source of truth for what Falak is and what it does.
> Read together with `docs/01_curriculum_and_units.md` for content specifics.

---

## 1. Vision

Falak is a bilingual physics teaching platform purpose-built for the Israeli 5-unit Bagrut. It exists because:

1. The Bagrut exam is written in Hebrew, but Arab students learn best in Arabic.
2. Existing Hebrew-only platforms force students to split cognitive load between physics and language.
3. Existing Arabic-only platforms don't prepare students for the Hebrew exam.
4. No current platform combines truly high-quality classroom-ready teaching tools with truly high-quality student practice tools in both languages.

Falak solves all four by being Arabic-first for instruction, Hebrew-parallel for terminology, and built around a single integrated teacher/student experience.

## 2. Users

### Primary user: The teacher
- Uses Falak's slide decks in class (projector, ~45 minute sessions)
- Assigns unit interactives as homework
- Uses the exam module for diagnostic assessment
- Wants: polished presentation material, physics accuracy, bilingual support, no extra prep time

### Primary user: The student
- Ages 15–18, 10th–12th grade
- Native Arabic speaker
- Varying math proficiency
- Preparing for a Hebrew-language exam
- Wants: understandable explanations, challenging but solvable problems, clear feedback, progress tracking

### Secondary user: The parent/tutor
- May review student progress
- Wants: visibility into what's being learned, how the student is doing

## 3. Core features

### 3.1 Unit structure (all 14 units follow this)

Each unit has **four modes**, accessible from a unit home screen:

#### 3.1.1 Theory (نظري / תיאוריה)
A slide deck the teacher projects. Navigable by arrow keys. Contains:
- Title slide (unit name, metadata)
- 6–12 concept slides with diagrams, equations (KaTeX), key Hebrew terms
- 1–2 worked example slides
- A bilingual vocabulary slide
- A summary slide with the 2–3 sentence takeaway

#### 3.1.2 Interactive (تفاعلي / אינטראקטיבי)
A physics sim/game where students:
1. Read a problem (Arabic primary, Hebrew terms inline)
2. Think through the solution
3. Input their answer (numerical value, vector components, selected forces, etc.)
4. Press "Play" / "شغّل"
5. Watch the simulation run — if their answer is right, the simulation succeeds (ball hits target, circuit lights up, etc.); if wrong, it visibly fails, with feedback
6. Retry with a hint if wrong, or advance to next problem

See `docs/06_interactive_patterns.md` for sim patterns per unit type.

#### 3.1.3 Exam (امتحان / בחינה)
- 3–5 Bagrut-style problems per unit
- Multi-part (a, b, c...) as in real Bagrut
- Submit full work, get score + model solution
- Store results in user profile for progress tracking

#### 3.1.4 Summary (خلاصة / סיכום)
- 2–3 sentences the student must memorize
- Visual: a mini concept map or formula sheet
- Printable/exportable card

### 3.2 Cross-unit features

- **Progress tracker** — which units viewed, interactives completed, exam scores, streak
- **Bilingual glossary** — searchable, 200+ terms, Arabic/Hebrew/English/formula
- **Bagrut simulator** — takes problems from multiple units and runs a timed exam
- **Formula reference** — the full Bagrut formula sheet, searchable
- **Teacher mode** — clean presentation mode, no clutter, works on any projector aspect ratio

### 3.3 Phase 2 features (not in v1)

- **Video summaries** — NotebookLM-generated per-unit video (teacher uploads the unit docs, NotebookLM produces the video, Falak embeds it)
- **Classroom accounts** — teachers invite students, see class-wide progress
- **Adaptive problem sets** — difficulty adjusts based on student performance
- **Voice-over mode** — slides read aloud in Arabic for accessibility
- **Offline mode** — PWA for classrooms with unreliable internet

## 4. Non-functional requirements

| Requirement | Specification |
|---|---|
| Performance | First contentful paint < 1.5s on 3G, Lighthouse score ≥ 90 |
| Accessibility | WCAG 2.1 AA; full RTL support; keyboard-navigable slides |
| Browser support | Last 2 versions of Chrome, Safari, Firefox, Edge; iPad Safari |
| Responsiveness | Works on 768px tablets up to 4K projectors |
| Privacy | No student PII required; all progress stored locally by default |
| i18n | Arabic (primary UI), Hebrew (terminology only), English (admin/debug) |
| Deployment | Static export to Vercel; no server required for v1 |
| Cost | Free for students and teachers; platform runs <$20/month to serve 1000 users |

## 5. Technical architecture (summary)

See `docs/03_architecture.md` for full detail.

- **Frontend:** Next.js 14 App Router, static export
- **Routing:** `/` home · `/units` list · `/units/[unitId]` unit home · `/units/[unitId]/{theory,interactive,exam,summary}`
- **State:** Zustand for cross-component state, React Context for unit-scoped state
- **Storage:** Dexie (IndexedDB) for progress, settings, cached content
- **Content:** MDX files per unit with frontmatter (metadata), compiled at build time
- **Math rendering:** KaTeX server-side for static content, client-side for interactive formulas
- **Physics simulations:** Custom React + SVG; Matter.js where rigid-body dynamics are needed

## 6. Design principles

See `docs/02_design_system.md` for the full system.

1. **Premium editorial feel.** Think physics journal, not textbook PDF. Serif display fonts (Fraunces), warm paper backgrounds, deep ink, single crimson accent.
2. **RTL-native.** Not an afterthought — Arabic and Hebrew are first-class.
3. **Motion with purpose.** Animation only when it reveals structure (physical motion, concept transitions). No decorative motion.
4. **Typography does the work.** The platform looks premium because fonts, spacing, and hierarchy are right — not because of heavy graphics.
5. **Physics is beautiful.** Equations, vectors, and diagrams are given the visual weight they deserve.

## 7. Success criteria

Falak v1 succeeds if:

- [ ] All 14 units shipped with all 4 modes
- [ ] A teacher can teach a 45-minute class using only the theory slides with zero prep
- [ ] A student who completes all 14 interactives can solve 70%+ of past Bagrut mechanics problems
- [ ] All physics content verified by at least one expert reviewer
- [ ] All Arabic content reviewed by a native speaker
- [ ] All Hebrew terminology matches Israeli Ministry of Education standard
- [ ] Lighthouse score ≥ 90 on mobile
- [ ] At least one real classroom (the author's) uses it end-to-end for a full semester

## 8. What Falak is NOT

- Not a video course (videos come in Phase 2 via NotebookLM)
- Not a replacement for a teacher (it's a teacher's tool + student practice tool)
- Not a full LMS (no assignments, grading, or classroom management in v1)
- Not for other exams (we don't try to be general-purpose; we are excellent at one thing: the 5-unit Israeli Bagrut)
- Not open to paid features in v1 (the author may monetize later but v1 ships free)

## 9. Timeline (rough)

See `docs/08_build_roadmap.md` for the real plan.

- **Phase 0** (1 week): this planning phase — specs, design system, skeleton
- **Phase 1** (2 weeks): build Unit 1 end-to-end as the reference implementation, all 4 modes, production-quality
- **Phase 2** (6 weeks): replicate across Units 2–7 (mechanics)
- **Phase 3** (4 weeks): Units 8–10 (electromagnetism)
- **Phase 4** (4 weeks): Units 11–14 (radiation & matter)
- **Phase 5** (2 weeks): cross-unit features (glossary, Bagrut simulator, progress tracker)
- **Phase 6** (ongoing): native-speaker review, polish, user testing, deployment

Total: ~19 weeks of focused solo work. Parallelizable with collaborators.
