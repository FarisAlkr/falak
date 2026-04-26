---
name: review-unit
description: Comprehensive review of a Falak unit before it's considered complete. Runs physics-accuracy, bilingual-content, slide-authoring, and simulation-builder checks on the specified unit. Produces a structured review report with pass/fail per category. Use this before merging a unit's PR or after major changes.
argument-hint: [unit-id]
---

# /review-unit command

Review a unit end-to-end for quality.

**Usage:** `/review-unit newtons-laws`

## What this command does

Invokes all four Falak skills in sequence on the specified unit and produces a comprehensive review report. Acts as the final gate before a unit is merged.

## Execution steps

### Step 1 · Locate unit

Read `src/content/units/{unit-id}/` — confirm all required files exist:

- `meta.ts`
- `slides.mdx`
- `interactive.tsx`
- `exam.ts`
- `summary.mdx`

Halt with an error list if any are missing.

### Step 2 · Verify metadata

Confirm `meta.ts` has all required fields per `docs/05_unit_template.md`. No missing fields, no TODOs, no REVIEW\_\* placeholders.

### Step 3 · Physics review

Invoke the `physics-accuracy` skill.

- For every equation in slides.mdx: dimensional check, sign convention, standard form
- For every worked example: redo calculation, check units, check reasonableness
- For every exam answer: verify
- For interactive.tsx: confirm physics imports from `@/lib/physics/`, no inline physics
- For physics helpers used: confirm unit tests exist

### Step 4 · Bilingual review

Invoke the `bilingual-content` skill.

- Arabic: MSA register, standard terminology, grammar
- Hebrew: matches Ministry of Education standard, verified against past Bagrut
- Bilingual rendering: dir attributes, font classes, layout
- No REVIEW\_\* comments unresolved

### Step 5 · Slide review

Invoke the `slide-authoring` skill.

- Canonical slide sequence followed
- 8–12 slides total
- Each slide has single clear point
- Arabic body under 80 words per concept slide
- Max 3 equations per slide
- Bilingual labels everywhere
- Misconception slide present

### Step 6 · Simulation review

Invoke the `simulation-builder` skill.

- Universal structure (problem, canvas, controls, readout, preview, result)
- Real physics from `/lib/physics/`
- Live readout updates
- Arabic hints on failure
- Difficulty ramp
- Persistent streak
- 60fps target met
- Keyboard accessible

### Step 7 · Exam review

Confirm:

- At least 3 questions
- Mix of difficulty 1, 2, 3
- At least one from a real past Bagrut (with year attribution)
- All multi-part
- All have Arabic solutions
- All numeric answers have tolerance

### Step 8 · Accessibility review

- RTL tested in actual browser
- Keyboard navigation works end-to-end
- Contrast passes WCAG AA
- Reduced-motion respected
- Screen reader tested on at least the theory route

### Step 9 · Performance review

- Lighthouse score ≥ 90 on mobile for `/units/{unit-id}/theory`
- Interactive runs at 60fps on a mid-range laptop
- Bundle size not inflated by this unit (diff the build)

### Step 10 · Integration review

- Unit registered in `unitRegistry.ts`
- Shows up in home grid
- Progress tracking works (completing theory updates progress)
- Linked in glossary (all new terms added)

## Output format

```
📋 UNIT REVIEW · newtons-laws

Metadata                         ✅ PASS
Physics accuracy                 ⚠️  1 warning, 0 errors
Bilingual content                ⚠️  2 REVIEW_ARABIC unresolved
Slide pedagogy                   ✅ PASS
Simulation quality               ✅ PASS
Exam integrity                   ❌ FAIL (only 2 questions; need 3+)
Accessibility                    ✅ PASS
Performance                      ✅ PASS (Lighthouse mobile: 94)
Integration                      ✅ PASS

VERDICT: NEEDS WORK before merge.

Required fixes:
  1. Add at least 1 more exam question (currently 2, need 3+)
  2. Resolve 2 REVIEW_ARABIC comments in slides.mdx lines 47, 89

Warnings (not blocking):
  1. Slide 5 note could be clearer ("One axis, one scalar equation")

Next step:
  Address the 2 required fixes, then re-run /review-unit newtons-laws.
```

## When to run this command

- **Always** before opening a PR for a completed unit
- **Always** after accepting a major change to an existing unit
- **Periodically** on older units as the curriculum evolves

## Constraints

- Do not mark VERDICT as PASS if any required fix exists
- Do not hide warnings — surface all findings
- Do not modify code during review — review is read-only
- If a skill fails to run (missing dependency), halt and report
