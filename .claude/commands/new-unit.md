---
name: new-unit
description: Scaffold a new Falak unit from the curriculum spec. Creates the folder structure, meta.ts placeholder, empty slides.mdx, interactive.tsx skeleton, exam.ts template, and summary.mdx — all pre-filled with the unit's curriculum content from docs/01_curriculum_and_units.md.
argument-hint: [unit-id]
---

# /new-unit command

Scaffold a new Falak unit.

**Usage:** `/new-unit kinematics-1d`

## What this command does

1. Read `docs/01_curriculum_and_units.md` to find the unit with matching ID
2. Read `docs/units/{unit-id}.md` if it exists (detailed per-unit spec)
3. Read `docs/05_unit_template.md` for the canonical shape
4. Create the folder `src/content/units/{unit-id}/`
5. Generate these files with real content from the curriculum:
   - `meta.ts` — with all metadata filled in
   - `slides.mdx` — with the canonical slide sequence, Arabic titles, Hebrew labels, and placeholder Arabic body content (marked for review)
   - `interactive.tsx` — skeleton with the interactive pattern from `docs/06_interactive_patterns.md`
   - `exam.ts` — template with 3 placeholder questions
   - `summary.mdx` — template with the unit's summary takeaway
6. Register the unit in `src/lib/content/unitRegistry.ts`
7. Create a branch `unit/{unit-id}`
8. Run `pnpm typecheck` to confirm nothing breaks
9. Commit with message: `feat(unit): scaffold {unit-id}`

## Execution steps

Execute this task step by step:

### Step 1 · Parse argument

`$ARGUMENTS` should be a valid unit ID from the curriculum. If not, halt and list valid IDs.

### Step 2 · Read references

Before creating any file, read:

- `docs/01_curriculum_and_units.md` — full curriculum
- `docs/05_unit_template.md` — unit template spec
- `docs/06_interactive_patterns.md` — find the pattern for this unit's interactive type

### Step 3 · Generate `meta.ts`

Use the curriculum data. Fill in titles, descriptions, prerequisites, key terms, interactive type, summary takeaway. Every field MUST be filled — no TODOs.

### Step 4 · Generate `slides.mdx`

Include:

- TitleSlide with all three titles (ar/he/en)
- Concept slide with placeholder Arabic body marked `{/* REVIEW_ARABIC: draft */}`
- Equations slides for each key equation group
- Worked example slide with a template problem
- Misconception slide with unit-specific misconceptions from the curriculum
- VocabSlide with all key terms
- SummarySlide with takeaway

### Step 5 · Generate `interactive.tsx`

Use the skeleton from `simulation-builder` skill. Reference the specific pattern for this unit type.

### Step 6 · Generate `exam.ts`

Three placeholder questions. Each has:

- Problem statement in Arabic AND Hebrew (mark Hebrew as `REVIEW_HEBREW` if not from a real past Bagrut)
- 2–3 parts per question
- Expected answers with tolerance
- Solution walkthrough in Arabic

### Step 7 · Generate `summary.mdx`

Use the takeaway from meta.ts. Include the formula card and next-unit link.

### Step 8 · Register

Add the unit to `src/lib/content/unitRegistry.ts`.

### Step 9 · Verify

Run `pnpm typecheck && pnpm lint`. Fix any issues.

### Step 10 · Report

Summarize what was created, what needs REVIEW\_\* attention, and the next step for the author.

## Output format

```
✅ Scaffolded unit: kinematics-1d

Files created:
  src/content/units/kinematics-1d/meta.ts              (complete)
  src/content/units/kinematics-1d/slides.mdx           (8 slides, 3 need Arabic review)
  src/content/units/kinematics-1d/interactive.tsx      (Graph Match pattern skeleton)
  src/content/units/kinematics-1d/exam.ts              (3 questions, 2 need Hebrew review)
  src/content/units/kinematics-1d/summary.mdx          (complete)

Modified:
  src/lib/content/unitRegistry.ts                      (registered)

Branch: unit/kinematics-1d
Commit: feat(unit): scaffold kinematics-1d

REVIEW_* items pending:
  - 3 REVIEW_ARABIC comments in slides.mdx
  - 2 REVIEW_HEBREW comments in exam.ts
  - 1 REVIEW_PHYSICS: verify sign convention on slide 5

Next step:
  Review the scaffolded content, fill in REVIEW_* items, then proceed to:
  1. Author final Arabic prose
  2. Implement the Graph Match interactive mechanics
  3. Replace placeholder exam questions with real Bagrut problems
```

## Constraints

- Do not commit REVIEW\_\* items as resolved unless they are
- Do not skip registering the unit (it won't render)
- Do not create content that violates `docs/07_content_guidelines.md`
- Do not invent physics not in the curriculum for this unit
