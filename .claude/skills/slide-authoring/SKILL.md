---
name: slide-authoring
description: Templates and guidelines for writing Falak slide decks (MDX files). Use this skill when creating or editing a unit's slides.mdx file, adding new slide types, or reviewing slide pedagogy. Enforces the canonical slide sequence, visual patterns, and pedagogical structure.
---

# Slide Authoring Skill

Falak slides are the teacher's primary classroom tool. They are projected, pointed at, discussed around. Every slide must be designed for classroom use — not for silent self-study.

## When to trigger this skill

- Writing a new `slides.mdx` file for any unit
- Adding or modifying slides in an existing deck
- Creating a new slide template component
- Reviewing slide pedagogy for quality

## The canonical slide sequence

Every unit's slide deck follows this pattern (see `docs/05_unit_template.md`):

1. **Title slide** — unit name, bilingual, sets the stage
2. **Core concept** — the big idea in one or two sentences
3. **Definitions & vocabulary** (1–2 slides)
4. **Key equations** (1–3 slides, separated by axis or concept)
5. **Diagrams & visualizations** — often interleaved with equations
6. **Derived quantities** (period, range, etc. as applicable)
7. **Worked example** — one problem, every step shown
8. **Common misconceptions** — explicit "don't believe this" cautions
9. **Bilingual vocabulary summary**
10. **Takeaway summary**

Target: 8–12 slides per unit. More means you're rushing; fewer means you're dense.

## Slide types and when to use each

### TitleSlide

First slide of every deck. Full bilingual.

```mdx
<TitleSlide
  unitNumber="03"
  arabic="قوانين نيوتن والديناميكا"
  hebrew="חוקי ניוטון ודינמיקה"
  english="Newton's Laws & Dynamics"
  meta="الوحدة الثالثة · 5 יח״ל"
/>
```

### ConceptSlide

Big idea + one diagram. Short Arabic prose. No more than 60 words.

```mdx
<ConceptSlide hebrewLabel="הרעיון המרכזי" arabicTitle="الفكرة المحوريّة">
  <ArabicBody>القوة المحصلة على الجسم تساوي حاصل ضرب كتلته في تسارعه.</ArabicBody>
  <Diagram type="newton-second-law" />
</ConceptSlide>
```

### EquationsSlide

1–3 related equations. Each with symbol | = | value. Optional italic note at bottom.

```mdx
<EquationsSlide
  hebrewLabel="חוק ניוטון השני"
  arabicTitle="قانون نيوتن الثاني"
  arabicSubtitle="العلاقة بين القوة والتسارع"
>
  <EquationRow symbol="\vec{F}_{net}" value="m\vec{a}" />
  <EquationRow symbol="F_x" value="m\,a_x" />
  <EquationRow symbol="F_y" value="m\,a_y" />
  <Note ar="المعادلة موجّهة: محور واحد لكل معادلة سكالرية." />
</EquationsSlide>
```

### VisualSlide

Diagram-dominant. Minimal text. Used when the image IS the point.

```mdx
<VisualSlide
  hebrewLabel="מסלול פרבולי"
  arabicTitle="المسار: قطع مكافئ"
  arabicCaption="اتحاد سرعة أفقيّة ثابتة مع سرعة عموديّة متغيّرة"
>
  <Diagram type="parabolic-trajectory" />
</VisualSlide>
```

### KeyQuantitiesSlide

Summary of derived formulas (range, period, etc.) as a quick reference.

```mdx
<KeyQuantitiesSlide hebrewLabel="גדלים חשובים" arabicTitle="المقادير المهمّة">
  <QuantityRow ar="زمن الطيران" he="זמן מעוף" formula="T = \frac{2 v_0 \sin\theta}{g}" />
  <QuantityRow ar="الارتفاع الأقصى" he="גובה מרבי" formula="H = \frac{v_0^2 \sin^2\theta}{2g}" />
  <QuantityRow ar="المدى" he="טווח" formula="R = \frac{v_0^2 \sin 2\theta}{g}" />
  <Note ar="الصيغ تفترض أنّ الارتفاع الابتدائي يساوي الارتفاع النهائي." />
</KeyQuantitiesSlide>
```

### WorkedExampleSlide

One problem. Full solution. Every step.

```mdx
<WorkedExampleSlide
  hebrewLabel="דוגמה פתורה"
  arabicTitle="مثال محلول"
  problem="يُطلق لاعب كرة بسرعة v₀ = 20 m/s بزاوية 30° فوق الأفق. احسب المدى والارتفاع الأقصى وزمن الطيران."
>
  <SolutionStep
    label="تحليل السرعة"
    work="vₓ = 20·cos30° ≈ 17.3 m/s   ·   vᵧ = 20·sin30° = 10 m/s"
  />
  <SolutionStep label="زمن الطيران" work="T = (2·10)/10 = 2 s" />
  <SolutionStep label="الارتفاع الأقصى" work="H = 10²/(2·10) = 5 m" />
  <SolutionStep label="المدى" work="R = vₓ·T = 17.3·2 ≈ 34.6 m" />
</WorkedExampleSlide>
```

### MisconceptionSlide

Explicit "don't believe this" slide. Critical for pedagogy.

```mdx
<MisconceptionSlide hebrewLabel="טעויות נפוצות" arabicTitle="مفاهيم خاطئة شائعة">
  <Misconception
    wrong="الأجسام الأثقل تسقط أسرع"
    right="جميع الأجسام تسقط بالتسارع نفسه g (بدون مقاومة الهواء)"
  />
  <Misconception
    wrong="تسارع سالب يعني الجسم يتباطأ"
    right="إشارة التسارع تعتمد على اختيار اتجاه المحور الموجب"
  />
</MisconceptionSlide>
```

### VocabSlide

Bilingual terminology summary. Always penultimate slide.

```mdx
<VocabSlide
  hebrewLabel="מונחי מפתח"
  arabicTitle="مصطلحات أساسيّة"
  terms={[
    { ar: 'حركة المقذوف', he: 'תנועת זריקה' },
    { ar: 'المسار', he: 'מסלול' },
    { ar: 'القطع المكافئ', he: 'פרבולה' },
    // ...more
  ]}
/>
```

### SummarySlide

Last slide. The 2–3 sentence takeaway.

```mdx
<SummarySlide hebrewLabel="סיכום" arabicTitle="الخلاصة">
  <Takeaway ar="حركة المقذوف = حركة أفقية منتظمة + حركة عمودية متسارعة. المحوران مستقلان تمامًا." />
  <FormulaCard>
    <Math>x(t) = v_0 \cos\theta \cdot t</Math>
    <Math>
      y(t) = v_0 \sin\theta \cdot t - \tfrac{1}
      {2}gt^2
    </Math>
  </FormulaCard>
</SummarySlide>
```

## Writing rules for slides

### Do

- Every slide has one clear point. If you need a second point, make a second slide.
- Arabic body text under 80 words per slide
- Equations in KaTeX with no Unicode hacks
- Diagrams as components (`<Diagram type="..." />`) not images
- Every slide works when projected (tested at 1920×1080)

### Don't

- Don't put more than 3 equations on one slide
- Don't put more than 60 words of Arabic body per concept slide
- Don't use bullet point lists for the body of a concept (bullets are fine for vocabulary slides)
- Don't hide the key point behind decoration

## Pedagogical checklist for each slide

Before committing a slide, ask:

1. **Can a teacher speak to this slide for 3–5 minutes?** If not, there's too much/too little.
2. **Is the Hebrew term visible?** Every new physics concept must show its Hebrew equivalent.
3. **Is the equation readable from 10 meters away?** If it's tiny, students in the back can't see.
4. **Does this slide build on the previous one?** No jumps; each slide should feel like a logical next step.
5. **Would I be embarrassed if another teacher saw this slide?** If yes, rebuild.

## Common authoring mistakes

- Skipping the misconception slide ("students won't make that mistake") — they always do
- Putting too many derivations on a title slide
- Forgetting the Hebrew label on a slide with an Arabic title
- Writing worked examples with only algebraic steps (missing numeric substitution)
- Using English technical terms when Arabic terms exist

## Output format when reviewing

```
📑 SLIDE REVIEW · Unit 3 · Slide 4

Type: EquationsSlide
Content: Newton's 2nd law

✅ Single clear point (one law, its vector form, its scalar forms)
✅ Hebrew label present ("חוק ניוטון השני")
✅ 3 equations — at the maximum, trim to 2 if possible
⚠️  Italic note could be clearer: "One axis, one scalar equation" is cleaner
✅ Equations render correctly in KaTeX
✅ Arabic subtitle describes the slide's content
```

Push for clarity. The best slides are not the most comprehensive — they're the ones that leave a clear impression.
