# Unit Template

> The canonical shape of every Falak unit.
> Every one of the 14 units is an instance of this template.

---

## Checklist (definition of done for a unit)

A unit is considered **complete** when:

- [ ] `src/content/units/{unitId}/meta.ts` — typed metadata with all fields
- [ ] `src/content/units/{unitId}/slides.mdx` — complete slide deck (see spec below)
- [ ] `src/content/units/{unitId}/interactive.tsx` — working simulation
- [ ] `src/content/units/{unitId}/exam.ts` — 3–5 Bagrut-style questions
- [ ] `src/content/units/{unitId}/summary.mdx` — summary card content
- [ ] Unit registered in `src/lib/content/unitRegistry.ts`
- [ ] Physics helpers (if new) in `src/lib/physics/`
- [ ] Physics helpers unit-tested in `src/lib/physics/__tests__/`
- [ ] Arabic content reviewed by native speaker
- [ ] Hebrew terms verified against curriculum
- [ ] Passes `pnpm lint && pnpm typecheck && pnpm test`
- [ ] Meets design system (see `docs/02_design_system.md`)
- [ ] Accessible: keyboard nav works, RTL correct, contrast passes AA
- [ ] Linked from unit index and progress tracker

---

## 1. Metadata (`meta.ts`)

```ts
import { UnitMeta } from '@/types/unit';

export const meta: UnitMeta = {
  id: 'newtons-laws',            // kebab-case, matches curriculum doc
  number: 3,                     // 1-14
  section: 'mechanics',          // 'mechanics' | 'electromagnetism' | 'radiation-matter'

  titles: {
    ar: 'قوانين نيوتن والديناميكا',
    he: 'חוקי ניוטון ודינמיקה',
    en: "Newton's Laws & Dynamics",
  },

  description: {
    ar: 'فهم قوانين نيوتن الثلاثة وتطبيقها في حل مسائل الديناميكا.',
    he: 'הבנת שלושת חוקי ניוטון ויישומם בפתרון בעיות דינמיקה.',
    en: "Understanding Newton's three laws and applying them to dynamics problems.",
  },

  prerequisites: ['kinematics-1d', 'kinematics-2d'],

  estimatedMinutes: {
    theory: 45,
    interactive: 30,
    exam: 45,
    summary: 5,
  },

  bagrutWeight: 'very-high',     // 'low' | 'medium' | 'high' | 'very-high'

  keyTerms: [
    { ar: 'قوة', he: 'כוח', en: 'Force' },
    { ar: 'كتلة', he: 'מסה', en: 'Mass' },
    // ... full glossary for this unit
  ],

  interactiveType: 'fbd-builder', // string discriminator; see interactive patterns doc

  summaryTakeaway: {
    ar: 'القوة المحصلة على جسم تساوي حاصل ضرب كتلته في تسارعه. بدون قوة محصلة، لا يوجد تسارع.',
    he: 'הכוח השקול על גוף שווה למכפלת המסה בתאוצה. בלי כוח שקול, אין תאוצה.',
    en: "Net force on an object equals its mass times its acceleration. No net force, no acceleration.",
  },
};
```

---

## 2. Slides (`slides.mdx`)

Every slide deck follows this structure. Slide count is flexible but target 8–12.

### Required slide sequence

1. **Title slide** (TitleSlide component)
2. **Core concept** (ConceptSlide) — the big idea in one sentence
3. **Definitions & vocabulary** (may span multiple slides)
4. **Key equations** (EquationsSlide) — one or more slides
5. **Diagrams & visualizations** (VisualSlide) — often interleaved with equations
6. **Derived quantities or laws** (EquationsSlide or ConceptSlide)
7. **Worked example** (WorkedExampleSlide) — one problem, fully solved
8. **Common misconceptions** (ConceptSlide with cautionary tone)
9. **Bilingual vocabulary** (VocabSlide) — all the Hebrew/Arabic terms in one table
10. **Summary** (ConceptSlide) — the 2-3 sentence takeaway

### Example slide file skeleton

```mdx
---
unitId: newtons-laws
---

<TitleSlide
  unitNumber="03"
  arabic="قوانين نيوتن والديناميكا"
  hebrew="חוקי ניוטון ודינמיקה"
  english="Newton's Laws & Dynamics"
  meta="الوحدة الثالثة · 5 יח״ל · מכניקה"
/>

<ConceptSlide
  hebrewLabel="הרעיון המרכזי"
  arabicTitle="الفكرة المحوريّة"
>
  <ArabicBody>
    القوة هي السبب المسؤول عن تغيير حالة الحركة...
  </ArabicBody>
  <Diagram type="newton-first-law" />
</ConceptSlide>

<EquationsSlide
  hebrewLabel="חוק ניוטון השני"
  arabicTitle="قانون نيوتن الثاني"
  arabicSubtitle="القوة المحصلة، الكتلة، والتسارع"
>
  <EquationRow symbol="\vec{F}_{net}" value="m\vec{a}" />
  <EquationRow symbol="W" value="mg" />
  <Note ar="تذكّر: المعادلة موجّهة. كل محور على حدة." />
</EquationsSlide>

<!-- ...more slides... -->

<VocabSlide
  terms={[
    { ar: 'قوة', he: 'כוח' },
    { ar: 'كتلة', he: 'מסה' },
    // ...
  ]}
/>
```

### Slide authoring rules

- Every slide has a Hebrew label AND an Arabic title where applicable
- Equations use KaTeX syntax (`<Math>`)
- Diagrams are SVG components, not images
- Worked examples show EVERY step — students will copy the approach
- Never put more than 3 equations on one slide
- Never put more than ~80 words of Arabic text on a single slide (readability)
- Every slide works standalone (printable, shareable)

---

## 3. Interactive (`interactive.tsx`)

The interactive is a React component that:

1. Presents a problem to the student (text + visual)
2. Collects an answer (numeric value, selection, placed vectors, etc.)
3. Runs a simulation based on that answer
4. Shows success or failure, with physics-accurate animation
5. Provides a hint on failure
6. Advances to the next problem on success (with difficulty ramp)
7. Persists best streak and progress

### Required props and structure

```tsx
import { type InteractiveProps } from '@/types/interactive';

export default function Interactive({ unitId, onComplete }: InteractiveProps) {
  // ... uses pure physics from @/lib/physics/
  // ... uses <SimulationCanvas>, <ControlPanel>, <LiveReadout>, <AnswerInput>, <ResultBanner>
  // ... saves streak via useProgress hook
  return (
    <div>
      <ProblemStatement problem={currentProblem} />
      <SimulationCanvas /* ... */ />
      <AnswerInput /* ... */ />
      <LiveReadout /* ... */ />
      <ControlPanel onSubmit={runSimulation} />
      <ResultBanner result={result} hint={hint} />
    </div>
  );
}
```

### Interactive non-negotiables

- Real physics (no cheating — if the student is right, the sim succeeds; if wrong, it fails visibly)
- Live readout of computed values (teaches the formulas)
- Preview (dashed trajectory, ghost FBD, expected field line pattern) BEFORE the student commits
- Arabic hint on failure, direction of adjustment (never the answer)
- Difficulty scales with streak
- Best streak persists across sessions
- Works at 60fps on a mid-range laptop
- Accessible via keyboard (all controls, not just mouse)

See `docs/06_interactive_patterns.md` for per-unit-type patterns.

---

## 4. Exam (`exam.ts`)

```ts
import { type ExamBank } from '@/types/exam';

export const exam: ExamBank = {
  unitId: 'newtons-laws',

  questions: [
    {
      id: 'nl-001',
      year: 2022,
      season: 'summer',
      difficulty: 2,
      problem: {
        ar: 'كتلة m₁ = 3 kg موضوعة على سطح أفقي أملس ومتصلة بكتلة m₂ = 2 kg...',
        he: 'מסה m₁ = 3 kg מונחת על משטח אופקי חלק ומחוברת למסה m₂ = 2 kg...',
      },
      parts: [
        {
          id: 'a',
          prompt: {
            ar: 'ارسم مخطط الجسم الحر لكل كتلة.',
            he: 'צייר דיאגרמת כוחות לכל מסה.',
          },
          answer: { type: 'free-form-diagram' },
          points: 15,
          solution: {
            ar: 'على m₁ تؤثر: قوة الوزن W₁ ↓، القوة العمودية N ↑، قوة الشد T →...',
          },
        },
        {
          id: 'b',
          prompt: {
            ar: 'احسب تسارع الكتلتين.',
            he: 'חשב את התאוצה של שתי המסות.',
          },
          answer: {
            type: 'numeric',
            value: 3.92,
            unit: 'm/s²',
            tolerance: 0.1,
          },
          points: 20,
          hint: {
            ar: 'تذكّر: الكتلتان مربوطتان، أي لهما نفس مقدار التسارع.',
          },
          solution: {
            ar: 'اكتب قانون نيوتن الثاني لكل كتلة... (a = 3.92 m/s²)',
          },
        },
        // ...more parts
      ],
      totalPoints: 35,
    },
    // ...more questions
  ],
};
```

### Exam rules

- 3–5 questions per unit minimum
- Mix of difficulties (at least one difficulty-3 question)
- Include at least one real past-Bagrut question (with attribution)
- Multi-part structure (a, b, c...) like the actual Bagrut
- Numeric answers have tolerance
- Every question has an Arabic solution walkthrough
- Each question is standalone (not dependent on getting previous ones right)

---

## 5. Summary (`summary.mdx`)

Short. Printable. Memorizable. 2–3 sentences of takeaway plus a mini-formula-card.

```mdx
---
unitId: newtons-laws
---

<SummaryCard
  unitNumber="03"
  arabic="قوانين نيوتن والديناميكا"
  hebrew="חוקי ניוטון ודינמיקה"
>
  <KeyTakeaway
    ar="القوة المحصلة على جسم = الكتلة × التسارع. بدون قوة محصلة، لا يوجد تسارع. لكل فعل رد فعل مساوٍ في المقدار ومعاكس في الاتجاه، يؤثران على أجسام مختلفة."
    he="הכוח השקול על גוף = מסה × תאוצה. ללא כוח שקול, אין תאוצה. לכל פעולה יש תגובה שווה בגודל והפוכה בכיוון, הפועלות על גופים שונים."
  />

  <FormulaCard>
    <Math>\vec{F}_{net} = m\vec{a}</Math>
    <Math>W = mg</Math>
    <Math>f_k = \mu_k N</Math>
  </FormulaCard>

  <NextSteps>
    <Link to="/units/work-energy">التالي: العمل والطاقة</Link>
  </NextSteps>
</SummaryCard>
```

---

## 6. Test plan per unit

Every unit ships with:

- **Physics accuracy tests** (`src/lib/physics/__tests__/`): all helper functions unit-tested with known inputs and expected outputs
- **Exam integrity check**: `pnpm verify:content` confirms every exam question has all required fields
- **Bilingual completeness check**: `pnpm verify:bilingual` confirms every Arabic term has a Hebrew equivalent
- **Snapshot tests for critical components**: SlideViewer, Interactive wrapper
- **Manual smoke test**: teacher walks through theory slides start-to-finish, student completes interactive, student attempts exam

---

## 7. Build order within a single unit

When Claude Code builds a unit, follow this order:

1. **Research phase** (fresh session)
   - Read curriculum doc and unit spec
   - Read past Bagrut problems for this unit
   - Draft the outline of slides + interactive + exam in a markdown file
   - Get approval on the outline before coding

2. **Content phase**
   - Write `meta.ts`
   - Write `slides.mdx`
   - Write `summary.mdx`
   - Native speaker reviews Arabic at this point

3. **Physics phase**
   - Implement any new physics helpers in `src/lib/physics/`
   - Write unit tests for them
   - Commit

4. **Interactive phase**
   - Build `interactive.tsx`
   - Verify it works at 60fps
   - Verify the live readout matches the physics

5. **Exam phase**
   - Write `exam.ts` with 3–5 questions
   - Include at least one real past Bagrut question
   - Verify solutions

6. **Integration phase**
   - Register unit in `unitRegistry.ts`
   - Link from progress tracker
   - Add to glossary
   - Run full verification

7. **Review phase** (fresh session)
   - New Claude session, staff engineer persona
   - Reviews all files with no prior context
   - Catches shortcuts, missing cases, inconsistencies

Total estimated time per unit: **3–5 days of focused work**.
