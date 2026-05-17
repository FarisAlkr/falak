# Falak Content Baseline · Format Specification

> This document defines the structure of every unit content file in `docs/content/`.
> Claude Code MUST follow this schema when reading or writing baseline content.
> Humans use this to understand the format. Claude Code uses it to parse reliably.

---

## Project rule (overrides defaults)

**Maximum results. Cost, time, and effort are not constraints unless explicitly stated by the project owner.**

This means:

- Claude does not optimize for shorter output, faster generation, or simpler structure
- Claude does not propose "good enough" alternatives — only excellence
- If a task can be done at quality X or quality X+1 for more effort, X+1 is always chosen
- Trade-off discussions only happen when explicitly requested

This rule applies project-wide, including in slide authoring, content writing, code generation, and design decisions.

---

## File anatomy

Every unit content file follows this structure:

```markdown
---
[YAML frontmatter — unit metadata]
---

# Unit Header

[Prose introduction — written for humans]

## Scope & Prerequisites

[Structured section]

## Concepts

[The bulk of the document — one section per concept]

## Cumulative Examples

[Multi-concept worked problems]

## Misconceptions

[Quarantined section]

## Bilingual Glossary

[Terminology table]

## Past Bagrut Questions

[Cross-referenced exam problems]

## References

[Citations]
```

---

## Frontmatter schema

Every file begins with YAML frontmatter:

```yaml
---
unit:
  id: newtons-laws # kebab-case identifier
  number: 03 # display number (string, zero-padded)
  domain: mechanics # mechanics | electromagnetism | waves-optics | modern-atomic
  bagrut_shaalon: 037381 # which shaalon (037381 or 037382)
  bagrut_weight_estimate: 25 # rough percentage of that shaalon
  hours_estimated: 18 # classroom hours

titles:
  ar: قوانين نيوتن والديناميكا
  he: חוקי ניוטון ודינמיקה
  en: Newton's Laws & Dynamics

prerequisites:
  - kinematics-1d
  - kinematics-2d
  - vectors-basics

leads_to:
  - work-energy
  - momentum
  - circular-motion

learning_outcomes:
  - "Apply Newton's three laws to dynamic systems"
  - 'Construct free-body diagrams for arbitrary configurations'
  - 'Solve incline problems with friction'
  # ...

key_equations:
  - id: newton-second
    formula: "\\Sigma\\vec{F} = m\\vec{a}"
    plain: 'Sum of forces equals mass times acceleration'
  # ...

interactive_concept: 'Free-body diagram builder + force-to-acceleration simulator'

content_status:
  written: 2026-04-26
  reviewed_by: null # set when native-speaker review complete
  arabic_review_pending: 12 # count of ⚑ flags
  bagrut_questions_count: 8

references:
  - 'Sayakim Hebrew-Arabic-English Physics Dictionary, Ministry of Education'
  - 'Halliday/Resnick/Walker, Fundamentals of Physics, Chapter 5'
  # ...
---
```

---

## Concept block schema

Each concept is a self-contained block. Claude Code parses these for individual use:

````markdown
### Concept · [English Title]

```yaml
concept:
  id: net-force-sigma
  difficulty: basic # basic | intermediate | advanced
  type: definition # definition | law | derivation | application
  pair_with_example: ex-net-force-3-forces
```
````

#### Statement

> **Arabic:** القوّة المحصّلة هي مجموع جميع القوى المؤثّرة على الجسم، جُمِعت متّجهيّاً.
> **Hebrew:** הכוח השקול הוא סכום כל הכוחות הפועלים על גוף, בחיבור וקטורי.
> **English:** The net force is the vector sum of all forces acting on a body.

#### Equations

\[
\Sigma\vec{F} = \vec{F}\_1 + \vec{F}\_2 + \vec{F}\_3 + \cdots
\]

#### Visual description

> A diagram showing three force vectors emanating from a single point (the body's center), tail-to-head sum forming a closed polygon, with the resultant arrow drawn from the start to the end. Labels: F₁, F₂, F₃, ΣF.

#### Common student difficulty

Students often confuse "many forces" with "complicated." The lesson: vector addition is mechanical — head-to-tail or component-wise, always works.

#### Cross-references

- Builds on: `vectors-basics`, `force-as-vector`
- Required for: `newton-first-law`, `newton-second-law`, every dynamics problem

#### Bilingual terminology

| Concept    | Arabic            | Hebrew       | English                     |
| ---------- | ----------------- | ------------ | --------------------------- |
| Net force  | القوّة المحصّلة ✓ | כוח שקול     | net force / resultant force |
| Vector sum | جمع متّجهات ✓     | חיבור וקטורי | vector sum                  |

````

---

## Example block schema

Examples sit alongside concepts. Each example pairs with a concept by `pair_with_example` ID:

```markdown
### Example · [Title]

```yaml
example:
  id: ex-net-force-3-forces
  pairs_with: net-force-sigma
  difficulty: basic
  type: tiny                # tiny | worked | bagrut-style
  estimated_time_seconds: 60
````

#### Problem

> **Arabic:** ثلاث قوى أفقيّة تؤثّر على جسم: 10 N يميناً، 5 N يميناً، 6 N يساراً. ما المحصّلة؟
> **Hebrew:** שלושה כוחות אופקיים פועלים על גוף: 10 N ימינה, 5 N ימינה, 6 N שמאלה. מהו הכוח השקול?
> **English:** Three horizontal forces act on a body: 10 N right, 5 N right, 6 N left. What is the net force?

#### Solution

```
ΣF = +10 + 5 - 6 = +9 N (rightward)
```

#### Solution narrative (Arabic)

> نختار اليمين موجباً. نجمع: +10 + 5 − 6 = +9 N. المحصّلة 9 N نحو اليمين.

#### What this example teaches

The student practices: choosing a positive direction, treating forces as signed scalars in 1D, and adding mechanically.

````

---

## Misconception block schema

```markdown
### Misconception · [Short title]

```yaml
misconception:
  id: misc-moving-needs-force
  applies_to: [newton-first-law, newton-second-law]
  severity: high          # how often students fall for it
  bagrut_relevant: true
````

#### What students say (wrong)

> "An object that's moving must have a force pushing it. If the force stops, the motion stops."

#### What's actually true

> Constant velocity requires zero net force. Force is required only to change velocity (i.e., to accelerate). A puck on frictionless ice keeps moving at constant velocity forever, with no horizontal force needed.

#### Why students fall for it

Everyday experience suggests this — every moving thing we see slows down without effort. But that's because friction always acts; remove friction (idealized) and motion persists. Galileo had to imagine away friction to discover this. We're asking students to do the same imaginative leap.

#### Diagnostic question

> "A hockey puck slides on perfectly frictionless ice. Does it need a force to keep moving at 5 m/s?"
> Answer: No. ΣF = 0 keeps it at 5 m/s.

#### Bilingual phrasings

| Language | Wrong (struck through)          | Right                        |
| -------- | ------------------------------- | ---------------------------- |
| Arabic   | الجسم المتحرّك يحتاج قوّة دافعة | فقط تغيُّر الحركة يحتاج قوّة |
| Hebrew   | גוף בתנועה צריך כוח קבוע        | רק שינוי בתנועה דורש כוח     |

````

---

## Past Bagrut question block schema

```markdown
### Past Bagrut · [Year-Season-Question]

```yaml
bagrut:
  id: bagrut-2023-summer-q2
  year: 2023
  season: summer            # summer | winter
  shaalon: 037381
  question_number: 2
  parts: [a, b, c]
  topics: [newton-second-law, friction, incline]
  difficulty: intermediate
  points_total: 25
  points_per_part:
    a: 8
    b: 10
    c: 7
````

#### Problem statement (Hebrew, original)

> [Full Hebrew text of the problem as it appeared on the exam]

#### Problem statement (Arabic translation)

> [Full Arabic translation]

#### Problem statement (English explanation)

> [English summary for non-Hebrew/Arabic readers]

#### Diagram description

> [Detailed description of any figure that accompanied the problem]

#### Solution

##### Part (a)

[Full worked solution]

##### Part (b)

[Full worked solution]

##### Part (c)

[Full worked solution]

#### Grading scheme

[Where students lose points, what partial credit looks like]

#### Concepts tested

- `newton-second-law` (primary)
- `friction-kinetic` (primary)
- `incline-decomposition` (primary)
- `vectors-basics` (assumed)

````

---

## Arabic flag system

Every Arabic phrase in the baseline carries one of three statuses, inline:

| Marker | Meaning | Action required |
|---|---|---|
| `✓` | Confirmed standard physics terminology | None |
| `⚑` | Best-effort draft, needs native-speaker review | Fix before student-facing publish |
| `→ Sayakim` | Pulled from official Sayakim Ministry of Education dictionary | None — already authoritative |

Example usage in prose:

> القوّة المحصّلة ✓ هي مجموع القوى المؤثّرة على الجسم، جُمِعت متّجهيّاً ⚑.

This means "القوّة المحصّلة" is verified, but "جُمِعت متّجهيّاً" needs review.

The auto-generated `_arabic_review_queue.md` file aggregates every `⚑` flag across all unit files into a single review queue.

---

## Visual description schema

Every diagram is described in **prose**, not drawn. The renderer (Claude Code, future designer, or AI image tool) interprets the description.

Format:
```markdown
#### Visual: [short name]

> [Detailed prose description: what's shown, what's labeled, what color or weight conventions, what's emphasized]
````

Bad example: "A diagram of forces."
Good example: "A horizontal line representing the ground (1.5px ink stroke). A square block (40px × 40px, paper-deep fill, 1.5px ink border) sits on the ground. From the block's left edge, a red arrow points right (label: F = 20 N). From the block's center, a black arrow points up (label: N) and another points down (label: W). Above the block, a thin red arrow points right with a smaller label (label: a = ?). The label 'm' appears centered inside the block."

---

## Cross-reference syntax

Concepts reference each other by ID:

- `[[concept:net-force-sigma]]` — links to a concept
- `[[example:ex-three-forces]]` — links to an example
- `[[misc:moving-needs-force]]` — links to a misconception
- `[[bagrut:2023-summer-q2]]` — links to a past Bagrut question
- `[[unit:kinematics-1d#velocity]]` — links to a section in another unit

Claude Code resolves these to actual content paths when rendering.

---

## File-naming convention

```
docs/content/
├── _format_spec.md            ← this file
├── _arabic_review_queue.md    ← auto-generated review queue
├── 00_baseline_index.md       ← all 12 units, skeletons
├── 01_kinematics_1d.md        ← Unit 01, full content
├── 02_kinematics_2d.md        ← Unit 02, full content (skeleton until built)
├── 03_newtons_laws.md         ← Unit 03, full content
├── 04_work_energy.md          ← skeleton
├── 05_momentum.md             ← skeleton
├── 06_circular_motion.md      ← skeleton
├── 07_oscillations.md         ← skeleton
├── 08_electrostatics.md       ← skeleton
├── 09_circuits.md             ← skeleton
├── 10_magnetism.md            ← skeleton
├── 11_waves_optics.md         ← skeleton
└── 12_modern_atomic.md        ← skeleton
```

---

## Content quality bar

Every unit file MUST satisfy:

1. **Every concept has at least one paired example** at matching difficulty
2. **Every key equation appears at least once with a worked numerical example**
3. **Every common misconception has a diagnostic question**
4. **Every Arabic phrase carries a status marker** (✓ / ⚑ / Sayakim)
5. **Every Hebrew term comes from the Sayakim glossary or is verifiable in a published Israeli textbook**
6. **At least 3 past Bagrut questions** are referenced and worked
7. **The bilingual glossary** has every key term in all three languages
8. **The references section** cites at least: Sayakim, one Israeli textbook, one international textbook (Halliday or equivalent), and PTC if relevant

A unit file that fails any of these is not "done."

---

## Workflow for Claude Code

When Claude Code is asked to produce slides/interactives/exams for a unit:

1. **Read** `docs/content/{NN}_{unit}.md` for that unit
2. **Read** `docs/09_pedagogy.md` for the teaching philosophy
3. **Read** `docs/02_design_system.md` for the visual language
4. **Construct** a spine plan that uses the unit's concepts in interleaved pairs
5. **Render** each slide using the concept block content directly — never paraphrase the Arabic, never invent the Hebrew
6. **Cross-link** to interactive and exam files as the pedagogy doc requires
7. **Surface** any `⚑` flagged Arabic in the output for the human to review

Claude Code does NOT invent content. It composes from the baseline.

---

## Workflow for content authors (you)

When updating or creating a unit:

1. **Open** the relevant `docs/content/{NN}_{unit}.md`
2. **Update** the frontmatter `content_status` block when changes happen
3. **Resolve** any `⚑` Arabic flags by replacing with the verified phrase + `✓`
4. **Add** new past Bagrut questions as you encounter them in real exams
5. **Cross-check** with the Sayakim dictionary for any new term
6. **Re-run** the auto-generation of `_arabic_review_queue.md`

---

## Why this format wins

- **Claude Code can parse it deterministically** (YAML blocks, fenced metadata)
- **Humans can read it without tooling** (it's just markdown)
- **Bilingual content is structured** (every claim has its three languages)
- **Quality is enforced** (the bar checklist is explicit)
- **Drift is prevented** (the Arabic flag system surfaces what needs review)
- **Slides become rendering output, not authored content** (the source of truth is here, not in JSX)

This is the foundation that makes the rest of the platform possible.
