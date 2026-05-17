---
name: physics-accuracy
description: Verifies physics content (equations, problem statements, solutions, simulations) against the 5-unit Israeli Bagrut curriculum. Use this skill whenever writing or reviewing physics content — equations, worked examples, exam problems, simulation physics, or explanations. Catches sign errors, unit mismatches, non-standard symbols, and scope violations.
---

# Physics Accuracy Skill

This skill is the first line of defense against physics errors in Falak content. Run this skill mentally (or literally invoke it via `/physics-accuracy`) before committing any physics content.

## When to trigger this skill

- Writing a new slide with an equation
- Writing a worked example
- Writing an exam question or its solution
- Implementing a physics helper in `src/lib/physics/`
- Building a simulation that uses physics
- Reviewing someone else's physics content

## The accuracy protocol

### Step 1 · Verify against curriculum scope

The canonical source for unit-level scope is **`docs/content/{NN}_{unit}.md`** (full content) and **`docs/content/00_baseline_index.md`** (the 12-unit map). The schema lives in `docs/content/_format_spec.md`. `docs/01_curriculum_and_units.md` is the curriculum-level overview pointing into the baseline.

Confirm:

1. The topic appears as a `concept` block in the unit's baseline file (or in the unit's `key_concepts` list in `00_baseline_index.md`)
2. The topic is in the unit you're writing for (not a different unit)
3. The depth matches 5-unit expectations (not 3-unit, not university)
4. Any "stretch" material is explicitly marked as optional in the baseline

**Red flag:** If you're writing about relativistic effects in a 10th-grade kinematics unit, stop. That's a scope error.

### Step 2 · Verify equations

For every equation:

1. **Dimensional analysis.** Both sides have the same units. If not, the equation is wrong.
2. **Sign conventions stated.** If the equation uses signed quantities, the sign convention is defined (up = positive, or motion direction = positive, etc.).
3. **Standard form.** Use the form that appears in standard textbooks. Don't re-derive your own.
4. **Variables defined.** Every symbol in the equation is defined before or after it (in the slide, in a vocabulary slide, or in an intro line).
5. **Limits stated.** If an equation has limits (flat ground only, small angles only, non-relativistic only), they're stated.

**Common equation errors to catch:**

- `R = v₀² sin(2θ) / g` — only true for launch height = landing height. If not, use full trajectory.
- `f = μ mg` — only true on horizontal surfaces with no vertical applied force. Otherwise use `f = μN` with N computed correctly.
- `E_k = ½ mv²` — non-relativistic only. At Bagrut level, always fine, but flag when introducing.
- `T = 2π√(L/g)` — small-angle approximation only. At Bagrut level, pendulums are always "ideal."
- `a = v²/r` — magnitude of centripetal acceleration only. Direction is toward center.

### Step 3 · Verify numerical answers

For every worked example or exam answer:

1. **Redo the calculation.** Don't trust previous work. Calculate independently.
2. **Units check.** Does the final answer have the right units for the quantity asked?
3. **Order of magnitude check.** Is the answer in a plausible range? A car accelerating at 500 m/s² is wrong. A ball thrown at 3000 m/s is wrong.
4. **Significant figures.** Match the precision of input data. Don't write 34.6524 m/s if input was "25 m/s."
5. **Specified `g` value.** Bagrut often uses g = 10 m/s² for simpler arithmetic. If you use g = 10, state it. If you use g = 9.8, state that.

### Step 4 · Verify conceptual claims

Physics prose must be accurate too:

- "Heavier objects fall faster" → FALSE (ignore in free fall)
- "Action and reaction cancel out" → FALSE (they act on different bodies)
- "Centrifugal force pushes outward" → FALSE (no centrifugal in inertial frame)
- "Energy is destroyed by friction" → FALSE (converted to heat)
- "Momentum is like energy but faster" → MEANINGLESS (kill such statements)

### Step 5 · Verify simulation physics

For any interactive simulation:

1. **Pure physics function.** The core physics lives in `src/lib/physics/`, separate from rendering.
2. **Standard equations.** The sim uses the same equations the student is learning (no shortcuts).
3. **Timestep stability.** dt ≤ 0.02s. If instability appears, reduce dt or use a better integrator.
4. **No cheating.** The sim does NOT nudge outcomes toward "success." If the student's input is wrong, the sim produces the wrong outcome faithfully.
5. **Unit test.** Physics function has tests with known inputs → expected outputs.

### Step 6 · Verify with a second source

When in doubt, cross-reference:

- Halliday, Resnick, Walker — "Fundamentals of Physics"
- Israeli Bagrut past exams (official Ministry of Education solutions)
- Weizmann Institute physics materials
- PhET simulations (physics is always correct)

Do NOT use:

- Wikipedia as a final source (usually correct but often incomplete)
- Random YouTube explanations
- Reddit answers
- Unverified blog posts

## Common Bagrut-specific nuances

1. **g = 10 m/s²** is often used in Bagrut problems for simpler arithmetic. When it is, the problem statement says so.
2. **No calculus notation** in standard 5-unit problems. Use kinematic equations, not integrals.
3. **Ideal conditions assumed** unless stated: ideal pulley (massless, frictionless), ideal string (inextensible, massless), no air resistance.
4. **Vectors in 2D only** — 3D vectors do not appear on Bagrut.
5. **SHM** assumes small-angle / ideal spring.
6. **Circular motion** assumes uniform unless specified.
7. **Lenses** are thin lenses only (no thick-lens corrections).
8. **Circuits** are DC only in 5-unit. AC only qualitatively.
9. **Modern physics** stops at wave-particle duality, photoelectric effect, hydrogen atom. No quantum mechanics machinery (Schrödinger, operators, etc.).

## Review output format

After running this skill, produce a review summary like this:

```
✅ PHYSICS REVIEW · Unit 3 · Slide 4 (Newton's 2nd Law)

Equation: F_net = m · a
  ✅ Dimensional check: [N] = [kg]·[m/s²] = [kg·m/s²] ✓
  ✅ Variables defined on slide 3
  ✅ Vector notation correct (\vec{F}, \vec{a})
  ⚠️  "Net force" could be ambiguous — specify "vector sum of all forces"

Worked example: a = F/m = 30N / 5kg = 6 m/s²
  ✅ Calculation correct
  ✅ Units correct
  ✅ Reasonable magnitude

Conceptual prose: "القوة المحصلة تسبّب تسارعًا"
  ✅ Accurate
  ✅ Arabic grammar correct
```

If any issue is found, fix it before committing. Never suppress a warning.

## Escalation

If this skill cannot confidently verify a claim (unusual physics, boundary case, unclear Bagrut inclusion), add a `REVIEW_PHYSICS:` comment in the code and flag it in the PR description. Do not merge without human review.
