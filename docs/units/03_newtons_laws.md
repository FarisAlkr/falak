# Unit 3 · Newton's Laws & Dynamics — Specification

> Per `IMPLEMENTATION_PLAN.md` §4.2.1 — research outline. Source-of-truth for
> the Unit 3 build (slides, interactive, exam, summary). Pedagogical decisions
> here lock in for the rest of Phase 1; revise via PR if anything changes.

## 1. Identity & metadata

| Field                 | Value                                                                            |
| --------------------- | -------------------------------------------------------------------------------- |
| **Unit ID**           | `newtons-laws`                                                                   |
| **Number**            | 3                                                                                |
| **Section**           | Mechanics                                                                        |
| **Bagrut weight**     | very-high (most foundational unit; every subsequent mechanics unit applies F=ma) |
| **Prerequisites**     | `kinematics-1d`, `kinematics-2d`                                                 |
| **Estimated minutes** | Theory 45 · Interactive 30 · Exam 45 · Summary 5                                 |
| **Interactive type**  | `fbd-builder`                                                                    |

### Trilingual title

| Language | Title                    |
| -------- | ------------------------ |
| العربية  | قوانين نيوتن والديناميكا |
| עברית    | חוקי ניוטון ודינמיקה     |
| English  | Newton's Laws & Dynamics |

---

## 2. Pedagogical strategy

### Concept teaching order

The canonical 1st → 2nd → 3rd progression is pedagogically inverted: students
remember best when the **2nd law lands first** (it's the engine of every
problem they'll solve), then 1st and 3rd are presented as natural corollaries.

Order:

1. **Force as a vector** — direction matters; we add forces head-to-tail.
2. **2nd law (the engine):** F⃗ₙₑₜ = m·a⃗ — the relationship that turns force
   into motion.
3. **The four mechanical forces** — weight, normal, tension, friction —
   recognized in any real-world problem.
4. **1st law (corollary):** if F⃗ₙₑₜ = 0, then a⃗ = 0 — equilibrium.
5. **3rd law (corollary):** F⃗_AB = −F⃗_BA — reaction pairs are on different
   bodies, and that's why they don't cancel.
6. **Free-body diagrams** — the technology for applying the laws to real
   problems.
7. **Friction** — static (≤ μ_s·N) and kinetic (= μ_k·N).
8. **Inclined planes & connected systems** — the two canonical Bagrut setups.

### Headline equation

The unit's slide-frame star and the symbol students must internalize:

$$\vec{F}_{net} = m \cdot \vec{a}$$

Variants used downstream:

- $\sum \vec{F} = m\vec{a}$ — Bagrut notation (matches Hebrew exam style)
- $a = F_{net}/m$ — student-friendly when solving for acceleration

Slides use the boxed vector form as the canonical anchor; problem solutions
show the scalar/component forms when working axis-by-axis.

---

## 3. Key equations

All equations rendered via KaTeX in slides and exam solutions.

| Equation                                         | Use                                                          |
| ------------------------------------------------ | ------------------------------------------------------------ |
| $\vec{F}_{net} = m\vec{a}$                       | Newton's 2nd law (the engine)                                |
| $W = mg$                                         | Weight as a scalar                                           |
| $\vec{F}_{AB} = -\vec{F}_{BA}$                   | Newton's 3rd law (action-reaction)                           |
| $f_s \leq \mu_s N$                               | Static friction (inequality — not a fixed value)             |
| $f_k = \mu_k N$                                  | Kinetic friction                                             |
| $N = mg\cos\theta$                               | Normal force on a frictionless incline                       |
| $a_\parallel = g(\sin\theta - \mu_k \cos\theta)$ | Acceleration down a rough incline                            |
| $T = \frac{2 m_1 m_2 g}{m_1 + m_2}$              | Tension in an Atwood machine (frictionless, massless pulley) |
| $a_{Atwood} = \frac{(m_1 - m_2) g}{m_1 + m_2}$   | Atwood acceleration                                          |

`g = 9.8 m/s²` is the default. Any problem using `g = 10` must say so on the
slide or in the problem statement (per `CLAUDE.md` anti-pattern: "no physics
approximations without flagging them").

---

## 4. Bilingual vocabulary

Minimum 12 terms; deck shows them on a final `VocabSlide`. Arabic verified
against `docs/07` §2; Hebrew verified against `docs/07` §3 and recent past
Bagrut sittings.

| English           | العربية          | עברית         |
| ----------------- | ---------------- | ------------- |
| Force             | القوّة           | כוח           |
| Mass              | الكتلة           | מסה           |
| Weight            | الوزن            | משקל          |
| Acceleration      | التسارع          | תאוצה         |
| Net force         | القوّة المحصّلة  | כוח שקול      |
| Normal force      | القوّة العموديّة | כוח נורמלי    |
| Tension           | الشدّ            | מתיחות        |
| Static friction   | الاحتكاك السكوني | חיכוך סטטי    |
| Kinetic friction  | الاحتكاك الحركي  | חיכוך קינטי   |
| Free-body diagram | مخطط الجسم الحر  | דיאגרמת כוחות |
| Equilibrium       | اتّزان           | שיווי משקל    |
| Inclined plane    | مستوى مائل       | מישור משופע   |
| Pulley            | بكرة             | גלגלת         |
| Connected masses  | كتل متّصلة       | מסות מחוברות  |

---

## 5. Targeted misconceptions

Five misconceptions get explicit treatment — both on slides (a "Watch out"
panel) and as exam-question distractors:

1. **"Force of motion"** — students think a moving object must have a
   forward force on it. False: motion needs no force; only changes in motion
   do.
2. **"Action and reaction cancel"** — the 3rd-law pair acts on _different
   bodies_, so they don't cancel on either body.
3. **"Normal force equals weight"** — true on a flat horizontal floor only.
   On an incline, $N = mg\cos\theta$.
4. **"At rest means no force acting"** — confuses _no net force_ with _no
   force at all_. A book on a table has gravity and normal both acting; they
   sum to zero.
5. **"Friction always opposes the applied force"** — friction opposes
   _motion_ or _attempted motion_, not the applied force. (E.g., you push a
   stationary box with a small force — static friction matches your push in
   magnitude but opposite in direction; if you push it from a different
   angle, static friction adjusts.)

---

## 6. Slide-deck outline (10 slides)

Sequence follows `docs/05` §2 required slide order. Each slide is bilingual
(Arabic title + Hebrew label + English caption) per `docs/02` §5.

| #   | Type                 | Topic                                       | Notes                                                           |
| --- | -------------------- | ------------------------------------------- | --------------------------------------------------------------- |
| 1   | `TitleSlide`         | Unit 3 · قوانين نيوتن والديناميكا           | Hero; meta = "الوحدة الثالثة · 5 יח״ל · מכניקה"                 |
| 2   | `ConceptSlide`       | الفكرة المحوريّة — القوّة تغيّر الحركة      | The big idea: net force changes velocity                        |
| 3   | `EquationsSlide`     | قانون نيوتن الثاني                          | $\vec{F}_{net} = m\vec{a}$ as the engine; one boxed equation    |
| 4   | `VisualSlide`        | القوى الميكانيكية الأربع                    | Diagrams of weight, normal, tension, friction on a single block |
| 5   | `ConceptSlide`       | القانونان الأول والثالث (نتيجتان طبيعيّتان) | 1st as F=0 → a=0; 3rd as A↔B distinct bodies                   |
| 6   | `VisualSlide`        | مخطط الجسم الحرّ (FBD) — التقنية            | How to draw an FBD; arrows from a single dot                    |
| 7   | `EquationsSlide`     | الاحتكاك السكوني والحركي                    | $f_s \leq \mu_s N$, $f_k = \mu_k N$; emphasize the inequality   |
| 8   | `WorkedExampleSlide` | كتلة على مستوى مائل بوجود احتكاك            | Full solution; see §7 below                                     |
| 9   | `ConceptSlide`       | تنبيهات (Misconceptions)                    | The five from §5; each as a one-line "watch out"                |
| 10  | `VocabSlide`         | المصطلحات                                   | Bilingual table from §4                                         |

Slide count target: 10 (within 8–12 spec).

---

## 7. Worked example (Slide 8)

**Problem (Arabic):**

> كتلة كتلتها $m = 4 \text{ kg}$ موضوعة على مستوى مائل بزاوية
> $\theta = 30°$ فوق الأفقي. معامل الاحتكاك الحركي بين الكتلة والمستوى
> $\mu_k = 0.20$. احسب التسارع الذي تنزلق به الكتلة على المستوى.

**Setup:**

- Choose axes parallel and perpendicular to the incline (this is the
  pedagogical move — students often try x/y horizontal/vertical and get
  trapped in algebra).

**Forces along the incline (positive = down the slope):**

- Component of weight: $mg\sin\theta$
- Kinetic friction (up the slope): $f_k = \mu_k N$

**Forces perpendicular to the incline:**

- Normal: $N$
- Component of weight: $mg\cos\theta$
- Net = 0 (no perpendicular acceleration), so $N = mg\cos\theta$

**Apply F=ma along the slope:**

$$
ma = mg\sin\theta - \mu_k mg\cos\theta
$$

$$
a = g(\sin\theta - \mu_k \cos\theta)
$$

**Substitute:**

$$
a = 9.8 \cdot (\sin 30° - 0.20 \cdot \cos 30°)
= 9.8 \cdot (0.500 - 0.173)
= 9.8 \cdot 0.327
\approx 3.20 \text{ m/s}^2
$$

**Answer:** $a \approx 3.2 \text{ m/s}^2$ down the slope.

**Why this problem:** in one block, it covers (a) decomposing weight, (b)
finding $N$ from perpendicular equilibrium, (c) recognizing kinetic friction
acts opposite to motion, (d) algebra-light vector application of F=ma. It's
the densest single problem in the curriculum.

---

## 8. FBD Builder scenarios (5 tiers)

Per `IMPLEMENTATION_PLAN` §4.1 item 4, the interactive runs 5 progressively
harder scenarios. Each scenario presents the student with a diagram; they
drag force arrows from a palette onto the object(s); the simulation runs
F=ma on whatever FBD they assembled — correct → motion matches the target
behavior; wrong → motion is visibly wrong (and an Arabic hint suggests the
direction of correction without giving the answer).

| Tier | Scenario                                           | Forces required                                                             | Pedagogical focus                                                          |
| ---- | -------------------------------------------------- | --------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| 1    | **Single block on horizontal surface**             | Weight ↓, Normal ↑, Applied →                                               | The basic 4-arrow FBD; perpendicular forces sum to zero                    |
| 2    | **Block on inclined plane (frictionless)**         | Weight ↓ (decomposed in solution), Normal ⊥ to incline                      | Component decomposition; $N \neq mg$                                       |
| 3    | **Atwood machine** (two masses over a pulley)      | Two FBDs: each mass has Weight ↓ and Tension ↑                              | Connected systems; tension is internal but appears as external on each FBD |
| 4    | **Block on incline with friction + applied force** | Weight, Normal, Friction (direction depends on motion), Applied at an angle | Friction direction logic; combining with applied-force decomposition       |
| 5    | **Stacked blocks pushed across a rough floor**     | Each block separately: Weight, Normal, Friction, Contact-force pair         | 3rd-law pairs across the contact between the two blocks                    |

**Difficulty ramp:**

- Tier 1–2: students get all forces shown as ghost arrows; they must place
  them and set magnitudes.
- Tier 3: ghost arrows are absent for one of the two masses — student
  derives the second FBD from understanding the connection.
- Tier 4–5: no ghost arrows; full freedom; tighter tolerance on magnitudes.

**Hint examples (Arabic, never the answer):**

- _Missing a force:_ "هل تذكّرت كل القوى التي تلامس الجسم؟"
- _Wrong friction direction:_ "اتّجاه الاحتكاك يعاكس الحركة، لا يعاكس قوّتك."
- _Wrong magnitude (normal on incline):_ "تذكّر أنّ السطح مائل — هل القوّة
  العموديّة تساوي الوزن كاملاً؟"

**Streak:** persists via `useProgress('newtons-laws').interactiveStreak`. Best
streak shown in the corner. After 3 successive successes, scenario tier
auto-advances.

---

## 9. Exam questions (4)

Per `IMPLEMENTATION_PLAN` §4.1 item 6: ≥ 4 questions, multi-part, ≥ 1 from a
real past Bagrut (verbatim with attribution). Phase-1 strategy (per the user's
direction): **author originals first**; replace one or more with verbatim past
questions in a follow-up commit once `bagrut/mechanics/` is populated.

Each question follows the `ExamQuestion` shape from `docs/03` §4 — multi-part
(`a`, `b`, `c`), each part with numeric/symbolic/choice answer + Arabic
solution walkthrough.

| #   | ID       | Difficulty | Topic                                                                                                        | Source                                        |
| --- | -------- | ---------- | ------------------------------------------------------------------------------------------------------------ | --------------------------------------------- |
| 1   | `nl-001` | 1          | Single block on horizontal surface — applied force, find $a$ and friction                                    | Original                                      |
| 2   | `nl-002` | 2          | Block on incline with friction — find acceleration, then time to slide $L = 2 \text{ m}$                     | Original                                      |
| 3   | `nl-003` | 2          | Atwood machine — find tension and acceleration; then if heavier mass triples, compare new tension            | Original (Bagrut-style)                       |
| 4   | `nl-004` | 3          | Connected blocks pushed across a rough floor — multi-FBD analysis; find contact force between the two blocks | Original (stretch — exam 3rd-law application) |

**Verbatim past-Bagrut replacement plan:** once `bagrut/mechanics/` has the
2022–2024 sittings, replace `nl-002` or `nl-003` with a verbatim past question
matching the topic. Attribution inline: `year`, `season`.

Each part's `solution` field is Arabic prose walking through the steps; the
final numeric answer goes in the `answer` field with `tolerance` (e.g.
$\pm 0.05 \text{ m/s}^2$ on accelerations).

---

## 10. Summary takeaway

Two-line memorizable summary, per `docs/05` §5:

| Lang    | Text                                                                                          |
| ------- | --------------------------------------------------------------------------------------------- |
| العربية | القوّة المحصّلة على جسم تساوي حاصل ضرب كتلته في تسارعه. بدون قوّة محصّلة، لا يوجد تسارع.      |
| עברית   | הכוח השקול על גוף שווה למכפלת המסה בתאוצה. בלי כוח שקול, אין תאוצה.                           |
| English | Net force on an object equals its mass times its acceleration. No net force, no acceleration. |

Renders on `summary.mdx` as a printable card with the boxed equation
$\vec{F}_{net} = m\vec{a}$ above the takeaway, plus a "next unit" link to
Unit 4 (Work, Energy, Power).

---

## 11. Build-order checklist (maps to `IMPLEMENTATION_PLAN` §4.2)

- [x] §4.2.1 — this spec doc
- [ ] §4.2.2 — content draft: `meta.ts`, `slides.mdx`, `summary.mdx` (Arabic
      pre-review)
- [ ] §4.2.3 — physics helpers: `src/lib/physics/dynamics.ts` with unit tests
- [ ] §4.2.4 — shared interactive primitives (SimulationCanvas, ControlPanel,
      LiveReadout, AnswerInput, ResultBanner, ProblemStatement)
- [ ] §4.2.5 — FBD Builder (the hard part) — 5 scenarios, real physics,
      streak persistence
- [ ] §4.2.6 — `exam.ts` — 4 questions, Arabic solutions, `/physics-accuracy`
      verification
- [ ] §4.2.7 — integration: register in `unitRegistry`, wire `useProgress`,
      teacher mode
- [ ] §4.2.8 — fresh-session staff-engineer review + classroom dry run

---

## 12. Open items for Faris

These are pedagogical/content decisions only the teacher can finalize. Each
will be addressed before the corresponding sub-phase begins. Not blockers for
the spec doc itself.

- **Hebrew terminology — `כוח שקול` vs `שקול הכוחות`.** Both appear in
  `docs/07` §3. Pick whichever the most recent past Bagrut uses; `כוח שקול`
  is my default.
- **Worked example numbers.** $m = 4 \text{ kg}$, $\theta = 30°$,
  $\mu_k = 0.20$ are conventional. Override if a Geva/Kidum textbook has a
  better-tuned set.
- **Atwood mass ratio** for FBD scenario 3. I'd use $m_1 = 3 \text{ kg}$,
  $m_2 = 5 \text{ kg}$ — non-trivial ratio, simple integer, clear winner. OK?
- **Stretch-question difficulty.** `nl-004` (stacked blocks on rough floor
  with contact-force question) is the hardest. If it feels too hard for the
  Bagrut average, replace with a less stretchy 3rd-law application.
