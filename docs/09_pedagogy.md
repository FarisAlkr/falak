# Falak · Pedagogy

**Status:** Authoritative
**Audience:** Claude Code, content authors, slide authors, instructional designers
**Last updated:** 2026-04-28

---

## Project rule (overrides defaults)

> **MAXIMUM RESULTS. Cost, time, complexity, and output length are not constraints unless explicitly stated otherwise.**

This rule applies to pedagogical decisions: when in doubt between teaching something briefly and teaching it well, teach it well. When in doubt between fewer slides and more slides that pace correctly, pace correctly.

---

## What this document is

This document defines **how Falak teaches**. It governs:

- The order of slides within a unit
- The relationship between concepts and examples
- How difficulty scales across the deck
- Where misconceptions are introduced
- How interactives integrate with explanation
- What every unit must contain pedagogically

It does **not** govern _what_ the platform teaches (that's `docs/01_curriculum_and_units.md` and `docs/content/`), nor _how it looks_ (that's `docs/02_design_system.md`).

---

## The three core pedagogy rules

These three rules are non-negotiable. Every Falak unit obeys them. Every slide deck Claude Code renders obeys them. Every example added to the baseline obeys them.

---

### Rule 1 — The Interleaved Pair Rule

**Every concept introduced in a slide deck must be followed within 2 slides by a concrete tiny example applying it.**

This is the cognitive cement that turns abstract claims into usable skills.

**Why this rule exists:** Students who hear a concept without immediately applying it do not learn it. Their brains catalog it as "heard, not understood." Cognitive load research (Sweller, Kirschner) shows that immediate application closes the loop between explanation and procedural memory.

**What this looks like in practice:**

For Newton's Second Law, the concept slide states `ΣF = m · a`. The very next slide (or at most one slide later) shows: _"5 kg block, 20 N applied force, find a"_ and walks through `a = F/m = 20/5 = 4 m/s²`. The pair is inseparable.

**What this rule forbids:**

- Three concept slides in a row before any example
- An example that doesn't directly apply the immediately preceding concept
- Skipping the example because "it's obvious" — if it's obvious, the example is fast; never skipped
- Examples that introduce _new_ concepts under the guise of practicing old ones

**How Claude Code applies this rule:**

When rendering a unit's deck from `docs/content/{unit}.md`, every concept block in the baseline must be paired with at least one tiny example. The baseline format spec (`docs/content/_format_spec.md`) requires `examples:` arrays on concept blocks specifically to enable this rule.

---

### Rule 2 — The Calibrated Difficulty Rule

**Every example slide carries an explicit difficulty marker. The marker must match the example's actual cognitive load. Examples must follow a calibrated difficulty curve across the unit.**

The three difficulty levels:

| Marker | Name         | Description                                                                               |
| ------ | ------------ | ----------------------------------------------------------------------------------------- |
| 🟢     | BASIC        | Single-step application of one concept. Plug-and-chug. ≤30 seconds.                       |
| 🟡     | INTERMEDIATE | Multi-step, combines 2-3 concepts. Requires choosing the right approach. ≤2 minutes.      |
| 🔴     | ADVANCED     | Multi-concept, exam-realistic. Requires the full FBD-then-equations workflow. 5+ minutes. |

**Why this rule exists:**

Students who only see 🔴 examples become demoralized — they never feel competent. Students who only see 🟢 examples become overconfident — they fail on the Bagrut. The calibrated curve mirrors how skill is actually built: fluency with basics → ability to combine → ability to handle novelty.

**The required structure within a unit:**

A unit's example sequence follows this curve:

```
🟢 🟢 🟡 🟢 🟡 🟡 🟡 🔴
```

- The first two examples after any new concept are 🟢 (build fluency)
- 🟡 examples appear once 2-3 concepts have been introduced (combine them)
- The unit's cumulative example is always 🔴 (exam-realistic stretch)
- Misconceptions slides (Rule 3) come after the 🔴 example

**What this rule forbids:**

- Hiding difficulty (no marker = student doesn't know what to expect)
- Mismatched difficulty (calling an example 🟢 when it's actually 🟡)
- Jumping from 🟢 to 🔴 without 🟡 stepping stones
- Putting all examples at the same level "for consistency"

**How Claude Code applies this rule:**

Every example block in `docs/content/{unit}.md` has a `difficulty:` field. When rendering, Claude Code reads this field and emits the difficulty marker visibly on the slide. When deepening a unit, Claude Code checks that the curve follows the required shape.

---

### Rule 3 — The Misconception Quarantine Rule

**Common student errors are surfaced explicitly — but only at the end of the unit, after all concepts and examples have been correctly introduced.**

**Why this rule exists:**

Showing students wrong ideas at the same time as right ones produces interference: the brain remembers both, and under stress (like an exam), it's not always sure which was correct. By introducing the right idea first, building fluency with it, and _then_ surfacing the common error, we give students a clear "this is right, this is the trap" structure.

**The misconception quarantine structure:**

```
Slide [last concept-example pair]
Slide [interactive callout]
Slide [interactive — actual simulation]
Slide [cumulative 🔴 example — setup]
Slide [cumulative 🔴 example — solution]
Slide [misconception 1: wrong claim → why students fall for it → correct claim]
Slide [misconception 2: same structure]
Slide [misconception 3: same structure]
Slide [closing summary]
```

**What every misconception slide must contain:**

1. **The wrong claim**, in quotation marks, with strikethrough styling
2. **A one-line explanation** of why students fall for it (the daily-experience pattern that misleads them, or the partial truth that mistakenly generalizes)
3. **The correct claim**, set typographically as the resolution — the right answer wins the visual hierarchy

**What this rule forbids:**

- Introducing the wrong idea before the right idea
- Mentioning misconceptions parenthetically inside concept slides ("note: students often think X is true — it isn't")
- Having more than 4 misconception slides per unit (signals the unit is trying to fight too many fires)
- Skipping the "why students fall for it" line — without it, the misconception slide is just a quiz question

**How Claude Code applies this rule:**

The unit baseline file's misconceptions are collected in a top-level inventory (`docs/content/_format_spec.md` requires this). When rendering, Claude Code emits all misconception slides in a contiguous block after the cumulative example, never interleaved with concept teaching.

---

## The standard unit deck shape

Every unit deck in Falak has this skeleton. Variation happens within the slots, not in the slot order itself.

```
Slot 01 — Title
Slot 02 — Hook (the question that motivates the unit)
Slot 03–N — Interleaved concept-example pairs (Rule 1)
            difficulty curve calibrated (Rule 2)
Slot N+1 — Interactive callout (bridge to simulation)
Slot N+2 — Interactive simulation (the live experience)
Slot N+3 — Cumulative example setup (🔴, exam-realistic)
Slot N+4 — Cumulative example solution
Slot N+5 to N+7 — Misconceptions (Rule 3, 1-3 slides)
Slot N+8 — Summary card / takeaway
```

For a 30-slide unit, this typically resolves to:

- 1 title + 1 hook = 2 slides
- 8-10 concept slides + 8-10 paired examples = 16-20 slides
- 1 interactive callout + 1 simulation = 2 slides
- 2 cumulative example slides = 2 slides
- 3 misconception slides = 3 slides
- 1 summary = 1 slide

Total: ~26-30 slides, depending on concept count.

---

## Pedagogical principles below the three rules

These guide finer decisions — they're recommendations, not absolute laws.

### Bilingual hierarchy

Every conceptual slide carries:

- **Arabic primary** (largest, body of the explanation)
- **Hebrew terminology** (small, in the slide's chrome — this is what students will see on the Bagrut)
- **English support** (italic, for the international physics name and standard symbols)

This is the language the student thinks in (Arabic), the language they'll be tested in (Hebrew), and the language the global physics community uses (English). All three matter.

### Concrete before abstract

Every concept introduces with a concrete situation — a block, a car, a ball, a person — _before_ introducing the abstract symbol or equation.

Wrong: _"The second law states ΣF = ma. Let's see an example."_
Right: _"Push a 5kg block. It accelerates. The harder you push or the lighter the block, the faster it accelerates. We write this as ΣF = ma."_

### Equations always with units

No equation in Falak appears without its units. Numbers without units are not physics — they're arithmetic. `a = 4` is wrong. `a = 4 m/s²` is right.

### Diagram-first for vector concepts

For any concept involving direction (forces, velocities, fields), the diagram appears before the equation. The student should _see_ the vectors before they're algebraically combined.

### One hero per slide

Every slide has exactly one element that owns the visual hierarchy. If a slide has two competing heroes, it's two slides.

This is a design rule too (`docs/02_design_system.md`), but it's also pedagogical: split attention reduces retention.

### Repetition without redundancy

Core equations (`ΣF = ma`, `v² = v₀² + 2aΔx`, etc.) appear multiple times across a unit's deck — each time at a different scale of importance:

- First appearance: massive, the slide's hero (introduction)
- Second appearance: medium, on a corner of an example slide (application)
- Third appearance: small, in the summary card (consolidation)

The same equation, three sizes, three roles. Not three copies of the same slide.

---

## How Claude Code uses this document

When rendering or deepening a unit, Claude Code follows this workflow:

1. **Read the unit's baseline file** (`docs/content/{NN}_{unit}.md`)
2. **Read this pedagogy document** (this file)
3. **Read the design system** (`docs/02_design_system.md`)
4. **Apply the three core rules:**
   - Pair every concept block with an example block (Rule 1)
   - Tag every example with its difficulty and check the curve (Rule 2)
   - Quarantine misconceptions to the unit's tail (Rule 3)
5. **Apply the standard deck shape** as the slide ordering template
6. **Apply the principles** for finer decisions (bilingual hierarchy, concrete-first, etc.)
7. **Output** the deck as MDX or React components per the project's tech stack

If a unit's baseline content does not have enough examples to satisfy Rule 1 (every concept paired with an example), Claude Code stops and reports which concepts are missing examples — it does **not** invent examples to fill the gap. Examples must come from the baseline.

---

## How content authors use this document

When deepening a unit's baseline file, the author:

1. Lists every concept the curriculum requires
2. Writes a concept block for each, following the format spec
3. **For every concept, writes at least one paired example** (Rule 1)
4. Tags each example with its difficulty (Rule 2)
5. Calibrates the difficulty curve across all examples
6. Identifies the 1-3 most common misconceptions students have for this unit (Rule 3)
7. Writes the cumulative 🔴 example
8. Builds the bilingual glossary

The author **does not** write slides. Slides are rendered output, not authored content. Authoring stops at the baseline file.

---

## Examples of the three rules in action

Drawn from the existing `docs/content/03_newtons_laws.md` reference unit:

### Rule 1 example

`03_newtons_laws.md` introduces the concept `force-as-vector`. Within two slides, the deck shows:

> A 5 N arrow and a 3 N arrow on the same block, in the same direction.
> What's the resultant?
> 5 N + 3 N = 8 N.

That's the tiny example. It applies the just-introduced concept. It takes 30 seconds. It cements the abstract claim ("force is a vector with magnitude and direction") into a procedure ("we add them when they're aligned").

### Rule 2 example

The Newton's Laws deck has 8 examples in this difficulty curve:

```
🟢 5+3=8 (sum of forces, same direction)
🟢 ΣF on 3 forces in 1D
🟢 F=20, m=5, find a (single application of N2)
🟡 Same force, two masses (compare a values)
🟡 2D forces (per-axis decomposition)
🟡 Weight of a 5kg book
🟡 Block on incline (find N)
🔴 Cumulative: 4kg block on 30° incline with friction
```

Notice: the 🔴 sits at the end. The 🟡 examples scaffold toward it. The 🟢 examples build fluency in the basics.

### Rule 3 example

Newton's Laws deck has 3 misconception slides at the tail:

1. _"Moving objects need a constant force"_ → why students think this (everyday friction makes it look true) → "Only changes in motion need force. Constant velocity needs no net force."
2. _"Action and reaction cancel out"_ → why students think this (the words "equal and opposite" sound like canceling) → "They act on different bodies — they can't cancel anything on either body."
3. _"N = mg, always"_ → why students think this (the first example they ever saw was a book on a flat table) → "True only on flat surfaces with no other vertical forces. On an incline: N = mg cos θ."

All three sit after the cumulative example. None are mentioned anywhere in the concept teaching slides.

---

## Open questions for future revision

This document is v1. As the platform matures, these questions need answers:

1. **How do we handle students who already know a concept?** A 12th-grader reviewing for Bagrut doesn't need the same hook as a 10th-grader meeting the concept for the first time. Should there be a "review mode" deck shape?
2. **How do we integrate spaced repetition?** Misconceptions in Unit 03 reappear in Unit 04. How does the platform surface them again at the right time?
3. **How do we handle units where misconceptions are _the_ main thing?** (E.g., circular motion, where most of teaching is fighting the centrifugal-force misconception.)
4. **What's the pedagogy for the lab component?** This doc currently focuses on theoretical units. The lab pedagogy is different.
5. **How do we test whether the pedagogy works?** What's the metric — Bagrut pass rate, time-to-fluency, student-reported confidence?

These will be answered as the platform sees real students. For now, v1 of this doc is sufficient to ship.

---

## References

- Cognitive Load Theory — Sweller, J. (1988, 2011)
- _Why Don't Students Like School?_ — Daniel T. Willingham (2009)
- _Make It Stick: The Science of Successful Learning_ — Brown, Roediger, McDaniel (2014)
- _How Learning Works_ — Ambrose et al. (2010)
- Israeli MoE Pedagogical Framework for Physics (תוכנית הלימודים)
- Falak format spec: `docs/content/_format_spec.md`
- Falak design system: `docs/02_design_system.md`
- Falak unit template: `docs/05_unit_template.md`
