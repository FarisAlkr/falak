---
name: bilingual-content
description: Enforces correctness of Arabic (Modern Standard) and Hebrew physics content. Use this skill whenever writing, editing, or reviewing Arabic or Hebrew text — slide content, problem statements, vocabulary, UI strings, or hints. Prevents machine-translation errors, non-standard terminology, and RTL layout issues.
---

# Bilingual Content Skill

Physics content in Falak is bilingual by design. This skill ensures Arabic is Modern Standard (فصحى) and pedagogically clear, and Hebrew terminology matches the official Israeli Ministry of Education standard.

## When to trigger this skill

- Writing a slide in Arabic
- Writing a Hebrew term label
- Writing a problem statement in Arabic
- Writing a hint or feedback message in Arabic
- Writing a UI string in Arabic
- Reviewing any bilingual content

## The golden rule

**You (Claude) do not write final Arabic or Hebrew content unsupervised.** You produce drafts, flag uncertainties, and defer to the native-speaker reviewer. Machine translation of physics terminology produces plausible-looking but subtly wrong content — this is unacceptable.

## Arabic content protocol

### Step 1 · Register & register

- Use Modern Standard Arabic (فصحى) exclusively
- Formal but not archaic — pitched to a 10th–12th grade reader
- Never use dialectal constructions
- Never mix English transliterations where an Arabic term exists

### Step 2 · Verify physics terminology

Before using ANY physics term in Arabic, verify it against the terminology table in `docs/07_content_guidelines.md`. Common errors to avoid:

| Wrong / Non-standard | Correct |
|---|---|
| الإكسلرايشن | التسارع |
| الفورس | القوّة |
| الشدّة (for force) | القوّة |
| الوزن (for mass) | الكتلة |
| الكتلة (for weight) | الوزن |
| الزخم (for momentum, informal) | التنع / كمّيّة الحركة |
| الجول (for joule) | الجول (transliteration OK for units) |
| الدوائر (for circular, informal) | الدائريّة |
| السرعة (without qualifier for velocity) | السرعة المتجهة |

### Step 3 · Grammar & syntax check

Arabic is a highly inflected language. Common errors:

1. **Idhafa construction** — "force of gravity" is قوّة الجاذبيّة (definite article on the second word only, not the first)
2. **Verb conjugation** — match subject in gender and number
3. **Adjective agreement** — adjectives match the noun in definiteness, gender, and number
4. **Case endings** — in formal Arabic, use correct case when relevant; otherwise rely on sukun (most modern Arabic physics texts drop case endings except where ambiguous)
5. **Taa marbuta vs taa mabsuta** — قوّة (with ة) vs قوت (with ت); matters for meaning

### Step 4 · Style check

- Short sentences. Break at every comma that could be a period.
- Active voice: نُطبّق > يُطبَّق
- Direct address to the student is OK ("نحسب..." = "we calculate...") — inclusive "we" works well in Arabic physics texts
- Avoid unnecessary diacritics (only use تشكيل when disambiguating)
- Numbers in Western digits (1, 2, 3) not Eastern Arabic digits (١، ٢، ٣) — Bagrut uses Western digits

### Step 5 · Render check

- Every Arabic block has `dir="rtl"` explicitly
- Every Arabic block has `font-arabic` (Noto Kufi Arabic)
- Line height generous: `leading-[1.8]`
- Embedded math and English in Arabic text gets `dir="ltr"` spans
- Mixed-direction content tested in the actual rendered UI, not just in source

## Hebrew content protocol

### Step 1 · Verify terminology

Every Hebrew term MUST come from a verified source:

1. Ministry of Education official glossary
2. Recent past Bagrut exams (last 3 years)
3. Standard Israeli textbooks (Weizmann Institute materials)

### Step 2 · Acceptance check

If there's any doubt, flag with `REVIEW_HEBREW:` comment. Do not guess.

Example:
```tsx
<HebrewLabel>
  {/* REVIEW_HEBREW: Is "תאוצה צנטריפטלית" or "תאוצה מרכזית" the current standard? */}
  תאוצה מרכזית
</HebrewLabel>
```

### Step 3 · No full Hebrew sentences

Hebrew appears as:
- **Term labels** above Arabic titles ("חוקי ניוטון")
- **Inline brackets** when introducing a term in Arabic prose
- **Full exam problem statements** when quoting a real past Bagrut question (with attribution)

Never write tutorial-level Hebrew prose. That's not Falak's job.

## Bilingual rendering patterns

### Title block (standard across platform)

```tsx
<div dir="rtl" className="space-y-2">
  <div className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
    UNIT 03
  </div>
  <div className="font-hebrew text-sm uppercase tracking-[0.15em] text-accent">
    חוקי ניוטון
  </div>
  <h1 className="font-arabic text-5xl font-semibold text-ink leading-tight">
    قوانين نيوتن والديناميكا
  </h1>
  <p className="font-body italic text-ink-muted" dir="ltr">
    Newton's Laws & Dynamics
  </p>
</div>
```

### Equation with bilingual labels

```tsx
<div className="space-y-3" dir="rtl">
  <div className="flex justify-between items-baseline">
    <h3 className="font-arabic text-xl">قانون نيوتن الثاني</h3>
    <span className="font-hebrew text-sm text-ink-muted">חוק ניוטון השני</span>
  </div>
  <div dir="ltr" className="bg-paper-raised p-6 rounded">
    <Math>{`\\vec{F}_{net} = m\\vec{a}`}</Math>
  </div>
</div>
```

### Vocabulary row (in vocab slides)

```tsx
<div className="grid grid-cols-2 gap-6" dir="rtl">
  {terms.map(term => (
    <div className="flex justify-between py-2 border-b border-border">
      <span className="font-arabic text-lg">{term.ar}</span>
      <span className="font-hebrew text-base text-ink-muted">{term.he}</span>
    </div>
  ))}
</div>
```

## RTL gotchas

### Icons and chevrons

Directional icons must flip in RTL context:

```tsx
<ChevronRight className="rtl:rotate-180" />
<ArrowLeft className="rtl:rotate-180" />
```

### Numeric-heavy content

Numbers, equations, and SI units stay LTR within RTL text:

```tsx
<p dir="rtl">
  التسارع هو <span dir="ltr">5 m/s²</span> نحو اليمين.
</p>
```

### Form inputs

Text inputs for Arabic content: `dir="rtl"`, `text-align: right`. Numeric inputs: `dir="ltr"` even in Arabic UI.

## Review output format

When reviewing bilingual content, output a report:

```
🌐 BILINGUAL REVIEW · Unit 3 · Slide 4

Arabic text: "القوة المحصلة تسبّب تسارعًا للجسم"
  ✅ MSA register
  ✅ Standard terminology
  ✅ Grammar correct
  ⚠️  Consider "تسارعًا في الجسم" for more natural flow (minor)

Hebrew term: "כוח שקול"
  ✅ Matches Ministry of Education glossary
  ✅ Matches 2024 Bagrut exam

RTL rendering:
  ✅ dir="rtl" present
  ✅ font-arabic applied
  ✅ leading-[1.8] applied
  ⚠️  Embedded "5 m/s²" needs dir="ltr" span
```

## Escalation

When uncertain about:
- Arabic word choice → add `REVIEW_ARABIC:` comment, use best guess, flag in PR
- Hebrew term → add `REVIEW_HEBREW:` comment, use best guess, flag in PR
- Grammar construction → draft with alternates, ask the human

Never silently ship unverified Arabic or Hebrew. A subtle error in physics terminology that students memorize for the Bagrut could cost them points on the exam.
