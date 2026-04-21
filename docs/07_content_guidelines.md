# Content Writing Guidelines

> Rules for writing Arabic and Hebrew content in Falak.
> Every piece of written content must follow these rules. Violations are a release blocker.

---

## 1. Language policy

### Arabic is the primary language of instruction
- All concept explanations, problem statements, worked examples, hints, and UI strings are in Modern Standard Arabic (فصحى / MSA).
- No dialectal Arabic. Not Egyptian, not Levantine, not Gulf. A student from anywhere in the Arab world should understand every sentence.
- Formal but not stuffy — pitched to a 10th–12th grade reader who is learning physics, not a physics PhD.

### Hebrew is the terminology language
- Every physics term gets its Hebrew equivalent, either inline (in brackets/parens) or in a dedicated vocabulary block.
- Hebrew is exam vocabulary, not instruction language. Don't write full Hebrew sentences except in direct quotes from Bagrut problems.
- Use the terminology the Israeli Ministry of Education uses — verify against the Weizmann Institute physics glossary.

### English
- Used for unit titles in Latin script (on home screens)
- Used for SI units (m/s, N, kg)
- Used for technical developer-facing strings only
- Never appears in slide body content

---

## 2. Arabic writing rules

### Do
- Use short, direct sentences
- Define every new term when first introduced
- Use active voice: "نُطبّق قانون نيوتن الثاني" > "يُطبَّق قانون نيوتن الثاني"
- Use diacritics (تشكيل) sparingly — only on ambiguous words or unusual vocabulary. Overuse slows reading.
- Use standard physics terminology: use القوّة (not الشدّة), الطاقة (not الإيرج), التسارع (not التعجيل)
- Number direction: Arabic text is RTL, but numbers within are LTR. The text engine handles this automatically; don't insert direction marks manually.

### Don't
- Don't use Colloquial/slang constructions ("ليش"، "شلون"، "كيفك")
- Don't use English transliterations where an Arabic term exists ("الإكسلرايشن" → use التسارع)
- Don't use run-on sentences. Break at every comma that could be a period.
- Don't translate Hebrew word-for-word into Arabic when a natural Arabic phrasing is better

### Standard physics term list (non-exhaustive — always defer to official glossary)

| English | الصحيح | لا تستخدم |
|---|---|---|
| Force | القوّة | الشدّة |
| Mass | الكتلة | الوزن (for mass) |
| Weight | الوزن | الكتلة |
| Velocity (vector) | السرعة المتجهة | — |
| Speed (scalar) | السرعة القياسيّة | — |
| Acceleration | التسارع | التعجيل |
| Free fall | السقوط الحرّ | السقوط الحُرّ |
| Energy | الطاقة | — |
| Work | الشغل / العمل | — |
| Power | القدرة / الاستطاعة | — |
| Momentum | التنع / كمّيّة الحركة | الزخم (acceptable but less common) |
| Impulse | الدفع / المتكف | — |
| Circular motion | الحركة الدائريّة | — |
| Centripetal | مركزي | جاذب (wrong) |
| Current (electric) | التيّار الكهربائي | — |
| Voltage | الجهد / فرق الجهد | — |
| Resistance | المقاومة | — |
| Capacitor | المكثّف | — |
| Magnetic field | المجال المغناطيسي | — |
| Photon | الفوتون | — |
| Wavelength | الطول الموجي | — |

### Worked example of good vs bad Arabic

❌ Bad:
> في هذه المسألة راح نطبق كانون نيوتن الثاني لأنو فيها force خارجي وبدنا نحسب الاكسلريشن، فاحنا نعرف إنو F = ma، يعني بنحسب a = F/m وبنعوض، هيك الحل خلص.

✅ Good:
> في هذه المسألة نطبّق قانون نيوتن الثاني، لأنّ الجسم يخضع لقوّة خارجيّة، ونريد حساب تسارعه. المعادلة هي F = ma، ومنها: a = F/m. بتعويض القيم نحصل على التسارع.

---

## 3. Hebrew terminology rules

### Always
- Match the standard Israeli Ministry of Education terminology
- Use the term students will see on the Bagrut exam
- When there are two acceptable terms, pick the one used in the most recent official exams

### Common terms (verify against official glossary before adding)

| English | עברית |
|---|---|
| Displacement | העתק |
| Distance | דרך / מרחק |
| Velocity | מהירות |
| Acceleration | תאוצה |
| Force | כוח |
| Net force | כוח שקול / שקול הכוחות |
| Mass | מסה |
| Weight | משקל |
| Normal force | כוח נורמלי |
| Tension | מתיחות |
| Friction (static) | חיכוך סטטי |
| Friction (kinetic) | חיכוך קינטי |
| Free-body diagram | דיאגרמת כוחות |
| Work | עבודה |
| Kinetic energy | אנרגיה קינטית |
| Potential energy | אנרגיית פוטנציאל |
| Momentum | תנע |
| Impulse | מתקף |
| Period | מחזור |
| Frequency | תדירות |
| Centripetal acceleration | תאוצה מרכזית |
| Electric field | שדה חשמלי |
| Electric potential | פוטנציאל חשמלי |
| Capacitor | קבל |
| Capacitance | קיבול |
| Current | זרם |
| Resistance | התנגדות |
| EMF | כוח אלקטרו־מניע |
| Magnetic field | שדה מגנטי |
| Magnetic flux | שטף מגנטי |
| Induction | השראה |
| Refraction | שבירה |
| Reflection | החזרה |
| Total internal reflection | החזרה פנימית מלאה |
| Lens (converging) | עדשה מרכזת |
| Lens (diverging) | עדשה מפזרת |
| Wavelength | אורך גל |
| Interference | התאבכות |
| Diffraction | עקיפה |
| Photon | פוטון |
| Photoelectric effect | אפקט פוטו־אלקטרי |
| Work function | פונקציית עבודה / פוטנציאל הכפל |
| Energy level | רמת אנרגיה |
| Half-life | זמן מחצית חיים |
| Binding energy | אנרגיית קשר |

---

## 4. Bilingual presentation patterns

### Standard title pattern (used everywhere)

```
UNIT 03                                                  [meta]
חוקי ניוטון                                             [Hebrew label, red, small]
قوانين نيوتن والديناميكا                                [Arabic title, large]
Newton's Laws & Dynamics                                 [English, italic, muted]
```

### Inline Hebrew term pattern

When introducing a term for the first time in Arabic prose:

✅ "نستخدم مخطّط الجسم الحرّ (בעברית: דיאגרמת כוחות) لتحديد جميع القوى المؤثّرة..."

### Equation labels pattern

```
قانون نيوتن الثاني                     (Newton's 2nd law label)
חוק ניוטון השני                        (Hebrew subtitle)

        F_net = m · a                    (the equation itself — LTR, mono)
```

### Problem statements (exam questions)

Show BOTH Arabic and Hebrew. Arabic for comprehension, Hebrew for exam alignment. Student can toggle.

---

## 5. Equations

- Use KaTeX/LaTeX syntax exclusively
- Variable names match convention: vectors get arrows ($\vec{F}$), magnitudes don't
- Subscripts for components: $v_x$, $F_{net}$, $E_k$
- Use `\text{}` for multi-letter labels in equations: $E_\text{kinetic}$
- SI units rendered in upright font, not italic: `5\,\text{m/s}^2` not `5\,m/s^2`
- Use `\,` for thin space before units
- Pythagorean theorem rendered correctly in RTL contexts — test with `dir` attribute

### Example correct LaTeX

```latex
\vec{F}_{net} = m\vec{a}
v^2 = v_0^2 + 2a\Delta x
E_k = \tfrac{1}{2}mv^2
P = \frac{E}{\Delta t}
```

---

## 6. Numerical conventions

- Decimal separator: dot `.` (not comma), even in Arabic contexts
- Thousands separator: comma or thin space — but avoid in simple numbers
- Scientific notation: `3.0 \times 10^8` not `3e8`
- Units: always SI with explicit unit (5 m/s, not just "5")
- Round sensibly — don't write "34.6524 m/s" when "34.7 m/s" is the answer
- If g = 10 is used (common in Bagrut), state it on the slide

---

## 7. Tone & voice

- **Confident, not condescending.** Assume intelligence. Don't over-explain basic math.
- **Curious, not smug.** Physics is fascinating. Let that come through.
- **Precise, not pedantic.** Correct but not obsessive.
- **Direct, not wordy.** Every sentence does work.
- **Warm, not cold.** This is a teacher speaking, not a textbook.

❌ Don't write: "It might possibly be worth considering that perhaps the force could be..."
✅ Write: "القوّة هنا هي..." ("The force here is...")

---

## 8. Review process

Every piece of Arabic content must be reviewed by:

1. **A native Arabic speaker with strong physics background** (ideally the author/teacher)
2. **A high school student in the target demographic** (spot reader — does it read naturally?)

Every piece of Hebrew content must be reviewed by:

1. **Someone with current Bagrut exam familiarity** — the author who teaches this material
2. **Comparison against a recent past Bagrut exam** — does the vocabulary match?

No content ships without this review. Machine translation (including Claude's own) is NEVER sufficient for final content.

---

## 9. Handling uncertainty

When Claude (or anyone) is unsure about:
- An Arabic word choice → flag in code comments, use placeholder, do NOT guess
- A Hebrew term → flag, leave the English, do NOT guess
- A pedagogical choice → flag, ask the human

Example comment convention:

```tsx
// REVIEW_ARABIC: Is "تسارع مركزي" the standard term or should we use "تسارع جاذب"?
// REVIEW_HEBREW: Official term from Ministry - verify against current curriculum
// REVIEW_PEDAGOGY: Is this the right place to introduce the distinction?
```

These comments are tracked by a build check — no PR merges with `REVIEW_*` comments unresolved.

---

## 10. Typography nuances

- **Arabic text** should use Noto Kufi Arabic with generous line-height (1.8). Kufi chosen for its geometric, modern feel that suits a physics journal.
- **Hebrew text** should use Heebo with standard line-height (1.5).
- **Mixed text** (Arabic with Hebrew terms in parens) should use `font-arabic` as base and inherit direction changes for Hebrew substrings.
- **Equation rendering** uses KaTeX's default font (Computer Modern-like). Don't override.
- **Numbers in Arabic text** display as Western digits (1, 2, 3) not Eastern Arabic digits (١، ٢، ٣). Modern physics education uses Western digits even in Arabic contexts; the Bagrut uses Western digits.
