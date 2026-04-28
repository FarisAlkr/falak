---
unit:
  id: newtons-laws
  number: '03'
  domain: mechanics
  bagrut_shaalon: '037381'
  bagrut_weight_estimate: 25
  hours_estimated: 18

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
  - "State and apply Newton's three laws of motion"
  - 'Construct free-body diagrams for arbitrary configurations'
  - 'Decompose forces along chosen axes'
  - 'Solve dynamic problems involving weight, normal force, tension, and friction'
  - 'Distinguish between static and kinetic friction'
  - 'Solve incline problems with and without friction'
  - 'Identify action-reaction pairs across distinct bodies'
  - 'Apply Newton II per axis to 2D problems'

key_equations:
  - id: newton-first
    formula: "\\Sigma\\vec{F} = 0 \\Rightarrow \\vec{v} = \\text{const}"
    plain: 'If net force is zero, velocity stays constant'
  - id: newton-second-vector
    formula: "\\Sigma\\vec{F} = m\\vec{a}"
    plain: 'Net force equals mass times acceleration (vector form)'
  - id: newton-second-scalar-x
    formula: "\\Sigma F_x = m a_x"
    plain: 'Newton II on x-axis'
  - id: newton-second-scalar-y
    formula: "\\Sigma F_y = m a_y"
    plain: 'Newton II on y-axis'
  - id: newton-third
    formula: "\\vec{F}_{A\\to B} = -\\vec{F}_{B\\to A}"
    plain: 'Action and reaction are equal and opposite'
  - id: weight
    formula: 'W = mg'
    plain: 'Weight equals mass times gravitational acceleration'
  - id: normal-flat
    formula: 'N = mg'
    plain: 'Normal force on horizontal surface (no other vertical forces)'
  - id: normal-incline
    formula: "N = mg\\cos\\theta"
    plain: 'Normal force on incline at angle θ'
  - id: static-friction-bound
    formula: "f_s \\leq \\mu_s N"
    plain: 'Static friction is at most μₛ times normal force'
  - id: kinetic-friction
    formula: "f_k = \\mu_k N"
    plain: 'Kinetic friction equals μₖ times normal force'

interactive_concept: 'Free-body diagram builder — student places forces on a block, system computes ΣF, then a, then runs the simulation. Includes incline mode, multi-body (Atwood), and friction toggle.'

content_status:
  written: 2026-04-26
  reviewed_by: null
  arabic_review_pending: 8
  bagrut_questions_count: 5

references:
  - 'Sayakim Hebrew-Arabic-English Physics Dictionary, Israeli Ministry of Education'
  - 'Halliday, Resnick, Walker — Fundamentals of Physics, Chapters 5-6'
  - 'Tomer textbook (Israeli 5-unit physics standard)'
  - "PTC Weizmann teacher resources for Newton's Laws unit"
  - 'Past Bagrut exams: 2023 summer, 2023 winter, 2024 summer, 2024 winter, 2025 summer'
---

# Unit 03 · Newton's Laws & Dynamics

## Introduction

This unit answers a single deep question: **why do things move the way they move?**

The first two units (kinematics) describe motion — position, velocity, acceleration — without asking what causes it. This unit introduces the _cause_. Newton's three laws connect the geometry of motion to the forces that drive it.

By the end of this unit, students should:

- Understand that **force changes motion** (not "force causes motion")
- Be able to draw a **free-body diagram** for any body and translate it into Newton II
- Solve **incline problems with friction** (the standard Bagrut configuration)
- Distinguish action-reaction pairs from equilibrium pairs

This unit is the **central pillar of mechanics**. Everything that follows — energy, momentum, circular motion, gravitation — is Newton II applied to specific situations.

---

## Scope & Prerequisites

### What students must already know

- Position, velocity, acceleration in 1D and 2D ([[unit:kinematics-1d]], [[unit:kinematics-2d]])
- Vector addition: head-to-tail and component-wise
- Trigonometry: sine, cosine, decomposing a vector at an angle
- Algebraic manipulation of equations

### What this unit covers

1. **Force as a vector** (concepts: force-as-vector, vector-addition-of-forces, net-force-sigma)
2. **Newton's First Law** (concepts: newton-first-law, equilibrium)
3. **Newton's Second Law** (concepts: newton-second-vector, newton-second-per-axis, mass-vs-weight)
4. **Newton's Third Law** (concepts: newton-third-law, action-reaction-pairs)
5. **The four mechanical forces** (concepts: weight, normal, tension, friction-static, friction-kinetic)
6. **Free-body diagrams** (concepts: fbd-method)
7. **Application: incline + friction** (cumulative, the Bagrut staple)

### What this unit does NOT cover

- Energy methods (next unit)
- Momentum (Unit 05)
- Circular motion as application of Newton II (Unit 06 — though we'll preview it)
- Gravitation as universal force (Unit 06)

### Hours allocation (suggested)

| Section                                         | Hours  |
| ----------------------------------------------- | ------ |
| Force vectors & ΣF                              | 2      |
| Newton I (inertia, equilibrium)                 | 2      |
| Newton II (the engine, per-axis)                | 4      |
| Newton III (action-reaction)                    | 2      |
| Four forces (weight, normal, tension, friction) | 4      |
| FBD method + incline problems                   | 3      |
| Practice / cumulative review                    | 1      |
| **Total**                                       | **18** |

---

## Concepts

### Concept · Force as a vector

```yaml
concept:
  id: force-as-vector
  difficulty: basic
  type: definition
  pair_with_example: ex-two-forces-same-direction
```

#### Statement

> **Arabic:** القوّة هي تأثير يمكنه تغيير حالة حركة الجسم. لها مقدار واتّجاه — لذلك نمثّلها بسهم. ✓
> **Hebrew:** כוח הוא השפעה שיכולה לשנות את מצב התנועה של גוף. יש לו גודל וכיוון — לכן אנו מייצגים אותו בחץ.
> **English:** A force is an interaction that can change a body's state of motion. It has both magnitude and direction — so we represent it as an arrow.

#### Equations

No equation yet. Forces are _quantities_, not relations.

#### Visual: Force vector representation

> A horizontal arrow pointing right, drawn with thick ink stroke. Below the arrow, a measurement bracket spans its length labeled "magnitude (N)". A small arrowhead label points to the direction the arrow faces, labeled "direction →". Above the arrow, the symbol "F" in italic Fraunces. The diagram has no other elements — pure vector representation on white paper.

#### Common student difficulty

Many students treat force as a scalar number ("a force of 5") and ignore direction. The lesson is: **5 N to the right and 5 N to the left are different forces**, even though their magnitudes are equal. Direction is part of the identity of the force.

#### Cross-references

- Builds on: `vectors-basics` (from Unit 01-02)
- Required for: every concept that follows in this unit

#### Bilingual terminology

| Concept       | Arabic     | Hebrew | English    |
| ------------- | ---------- | ------ | ---------- |
| Force         | القوّة ✓   | כוח    | force      |
| Vector        | المتّجه ✓  | וקטור  | vector     |
| Magnitude     | المقدار ✓  | גודל   | magnitude  |
| Direction     | الاتّجاه ✓ | כיוון  | direction  |
| Newton (unit) | نيوتن ✓    | ניוטון | newton (N) |

---

### Example · Two forces in the same direction

```yaml
example:
  id: ex-two-forces-same-direction
  pairs_with: force-as-vector
  difficulty: basic
  type: tiny
  estimated_time_seconds: 45
```

#### Problem

> **Arabic:** قوّتان أفقيّتان تعملان في نفس الاتّجاه على جسم: 5 N و 3 N. ما المحصّلة؟ ✓
> **Hebrew:** שני כוחות אופקיים פועלים על גוף באותו כיוון: 5 N ו-3 N. מהו הכוח השקול?
> **English:** Two horizontal forces act on a body in the same direction: 5 N and 3 N. What is the net force?

#### Solution

```
F_total = 5 N + 3 N = 8 N
in the same direction as the original forces.
```

#### Solution narrative (Arabic)

> الاتّجاهان متطابقان، لذلك نجمع المقادير مباشرةً. النتيجة: 8 N في نفس الاتّجاه. ✓

#### What this example teaches

When forces are parallel and same-direction, vector addition reduces to scalar addition. This is the simplest case. Later, we'll see that perpendicular forces require Pythagoras and angled forces require decomposition.

---

### Concept · Net force (ΣF)

```yaml
concept:
  id: net-force-sigma
  difficulty: basic
  type: definition
  pair_with_example: ex-three-forces-1d
```

#### Statement

> **Arabic:** القوّة المحصّلة (ΣF) هي مجموع جميع القوى المؤثّرة على الجسم، جُمِعت متّجهيّاً. ✓
> **Hebrew:** הכוח השקול (ΣF) הוא סכום כל הכוחות הפועלים על הגוף, בחיבור וקטורי.
> **English:** The net force (ΣF) is the vector sum of all forces acting on a body.

#### Equations

\[
\Sigma\vec{F} = \vec{F}\_1 + \vec{F}\_2 + \vec{F}\_3 + \cdots
\]

The Greek letter sigma (Σ) means "sum of." We add **all** forces — every push, every pull, every contact, every field — using vector addition.

#### Visual: Three forces summed head-to-tail

> A central point representing the body. Three force arrows emanate from it: F₁ pointing right (length 60px), F₂ pointing up-right at 30° (length 40px), F₃ pointing down (length 30px). Below, a separate diagram shows the same three vectors drawn head-to-tail, with a final dashed arrow from the start of F₁ to the tip of F₃ labeled "ΣF". The dashed arrow is in red ink to emphasize it's the result of the construction.

#### Common student difficulty

Students often try to add forces algebraically without choosing axes — they add 5 N (rightward) + 3 N (upward) and get 8 N, which is wrong. The right answer requires either head-to-tail construction or decomposition into x and y components followed by Pythagoras: √(5² + 3²) ≈ 5.83 N.

#### Cross-references

- Builds on: `force-as-vector`, `vectors-basics`
- Required for: `newton-first-law`, `newton-second-vector`, every dynamics problem

#### Bilingual terminology

| Concept               | Arabic            | Hebrew       | English               |
| --------------------- | ----------------- | ------------ | --------------------- |
| Net force / resultant | القوّة المحصّلة ✓ | כוח שקול     | net force / resultant |
| Sum (Σ)               | المجموع ✓         | סכום         | sum                   |
| Vector sum            | جمع متّجهي ✓      | חיבור וקטורי | vector sum            |

---

### Example · Three forces in 1D

```yaml
example:
  id: ex-three-forces-1d
  pairs_with: net-force-sigma
  difficulty: basic
  type: tiny
  estimated_time_seconds: 60
```

#### Problem

> **Arabic:** ثلاث قوى أفقيّة تعمل على جسم: 10 N يميناً، 5 N يميناً، 6 N يساراً. ما المحصّلة؟ ✓
> **Hebrew:** שלושה כוחות אופקיים פועלים על גוף: 10 N ימינה, 5 N ימינה, 6 N שמאלה. מהו הכוח השקול?
> **English:** Three horizontal forces act on a body: 10 N right, 5 N right, 6 N left. What is the net force?

#### Solution

```
Choose right as positive (+).
ΣF = +10 + 5 - 6 = +9 N
The net force is 9 N to the right.
```

#### Solution narrative (Arabic)

> نختار اليمين موجباً. القوى موجهة جميعها على المحور الأفقي، فنجمعها كأعداد إشاريّة:
> ΣF = +10 + 5 − 6 = +9 N
> المحصّلة 9 N نحو اليمين. ✓

#### What this example teaches

In 1D, vector addition is signed-scalar addition. Choose a positive direction; assign + or − to each force; add. The student practices the _discipline_ of assigning signs explicitly — a habit that pays off when problems get harder.

---

### Concept · Newton's First Law (Inertia)

```yaml
concept:
  id: newton-first-law
  difficulty: basic
  type: law
  pair_with_example: ex-book-on-table
```

#### Statement

> **Arabic:** إذا كانت القوّة المحصّلة على الجسم تساوي صفر (ΣF = 0)، يبقى الجسم على حاله: ساكناً، أو متحرّكاً بسرعة ثابتة على خطٍّ مستقيم. ✓
> **Hebrew:** אם הכוח השקול על גוף הוא אפס (ΣF = 0), הגוף נשאר במצבו: במנוחה, או בתנועה במהירות קבועה על קו ישר.
> **English:** If the net force on a body is zero (ΣF = 0), the body remains in its current state: at rest, or moving with constant velocity in a straight line.

#### The deep idea

> **Arabic:** الجسم لا يحتاج إلى قوّة كي يتحرّك — يحتاجها فقط ليُغيّر حركته. ✓
> **English:** A body doesn't need a force to move — it needs a force to _change_ its motion.

This was Galileo's insight (refined by Newton). Aristotle had thought motion required continuous force; Galileo showed (by extrapolating from less and less friction) that motion would persist forever in the absence of any force.

#### Equations

\[
\Sigma\vec{F} = 0 \;\;\Longrightarrow\;\; \vec{v} = \text{constant}
\]

The arrow on velocity matters: if v is a vector, "constant" means **both magnitude and direction unchanged**.

#### Visual: Inertia in two scenes

> Two side-by-side panels.
> **Left panel:** A block at rest on the ground. Two arrows balance: weight W pointing down, normal force N pointing up, equal lengths. Below: "ΣF = 0, v = 0".
> **Right panel:** A block moving rightward with horizontal velocity v (dashed motion lines behind it). Same balanced vertical forces. Below: "ΣF = 0, v = constant".
> Caption: "Both states are 'inertia.' Both require zero net force."

#### Common student difficulty

Students think "at rest" is fundamentally different from "moving." Newton's insight is that they're the **same physical state** as far as the laws are concerned — both have ΣF = 0. A book on a table and an asteroid in deep space are doing the same thing, dynamically.

#### Cross-references

- Builds on: `net-force-sigma`
- Required for: `equilibrium`, every dynamics problem

#### Bilingual terminology

| Concept           | Arabic          | Hebrew       | English           |
| ----------------- | --------------- | ------------ | ----------------- |
| Inertia           | القصور الذاتي ✓ | התמדה        | inertia           |
| At rest           | ساكن ✓          | במנוחה       | at rest           |
| Constant velocity | سرعة ثابتة ✓    | מהירות קבועה | constant velocity |
| Equilibrium       | اتّزان ✓        | שיווי משקל   | equilibrium       |

---

### Example · Book on a table (equilibrium)

```yaml
example:
  id: ex-book-on-table
  pairs_with: newton-first-law
  difficulty: basic
  type: tiny
  estimated_time_seconds: 60
```

#### Problem

> **Arabic:** كتاب كتلته 2 kg موضوع على طاولة أفقيّة. اذكر القوى المؤثّرة عليه واحسب القوّة العموديّة N. ⚑
> **Hebrew:** ספר במסה 2 kg מונח על שולחן אופקי. ציין את הכוחות הפועלים עליו וחשב את הכוח הנורמלי N.
> **English:** A 2 kg book lies on a horizontal table. List the forces acting on it and find the normal force N.

#### Solution

```
Two forces act:
  - Weight W, downward, magnitude W = mg = 2 × 9.8 = 19.6 N
  - Normal force N, upward (table pushing up)

The book is at rest, so ΣF = 0.
On the vertical axis: N − W = 0
                      N = W = 19.6 N
```

#### Solution narrative (Arabic)

> القوّتان فقط: الوزن نحو الأسفل (W = mg = 19.6 N)، والقوّة العموديّة من الطاولة نحو الأعلى. الكتاب ساكن، إذن ΣF = 0. على المحور العمودي: N − W = 0، فـ N = 19.6 N. ⚑

#### What this example teaches

Newton I's "ΣF = 0" gives us **algebraic equations to solve for unknowns** when the body is at rest or moving uniformly. Here, the unknown is N, and equilibrium gives us the equation we need.

---

### Concept · Newton's Second Law

```yaml
concept:
  id: newton-second-vector
  difficulty: basic
  type: law
  pair_with_example: ex-block-pushed
```

#### Statement

> **Arabic:** القوّة المحصّلة على جسم تساوي حاصل ضرب كتلته في تسارعه، ولها نفس اتّجاه التسارع. ✓
> **Hebrew:** הכוח השקול על גוף שווה למכפלת המסה שלו בתאוצה שלו, ובאותו כיוון של התאוצה.
> **English:** The net force on a body equals its mass times its acceleration, in the same direction as the acceleration.

#### The central equation of mechanics

\[
\boxed{\Sigma\vec{F} = m\vec{a}}
\]

This is the most-used equation in this curriculum. Every dynamic problem in this unit, the next, and most that follow reduces to writing ΣF, equating it to ma, and solving.

#### What each letter means

| Symbol | Quantity              | SI unit        | Direction  |
| ------ | --------------------- | -------------- | ---------- |
| ΣF     | net force (vector)    | newtons (N)    | same as a  |
| m      | mass (scalar)         | kilograms (kg) | —          |
| a      | acceleration (vector) | m/s²           | same as ΣF |

Note: **mass is scalar** (no direction), **force and acceleration are vectors** (have direction). The equation is "vector = scalar × vector" — perfectly consistent.

#### Important consequences

1. **No net force ⇒ no acceleration** (this is just Newton I again)
2. **More force ⇒ more acceleration** (for fixed mass): a ∝ F
3. **More mass ⇒ less acceleration** (for fixed force): a ∝ 1/m
4. **Direction of a matches direction of ΣF** (always)

#### Visual: F = ma — three regimes

> Three small panels arranged horizontally.
> **Panel 1:** A block (label: m), force arrow F (length 60px) pointing right, acceleration arrow a (length 60px) above the block also pointing right. Caption: "F → a"
> **Panel 2:** Same block, double the force F (length 120px), double the acceleration a (length 120px). Caption: "2F → 2a"
> **Panel 3:** Triple the mass (label: 3m, drawn as a 3× wider block), same force F (length 60px), one-third the acceleration a (length 20px). Caption: "F on 3m → a/3"

#### Common student difficulty

Students often confuse mass and weight. Mass is "how much stuff," and is the same on the Moon as on Earth. Weight is "how hard gravity pulls," and changes with location. In F = ma, **m is mass, not weight**. If a problem gives you weight, you must divide by g to get mass first.

#### Cross-references

- Builds on: `force-as-vector`, `net-force-sigma`, `kinematics-1d#acceleration`
- Required for: every dynamics problem in the curriculum

#### Bilingual terminology

| Concept      | Arabic    | Hebrew | English      |
| ------------ | --------- | ------ | ------------ |
| Mass         | الكتلة ✓  | מסה    | mass         |
| Weight       | الوزن ✓   | משקל   | weight       |
| Acceleration | التسارع ✓ | תאוצה  | acceleration |

---

### Example · Block pushed horizontally

```yaml
example:
  id: ex-block-pushed
  pairs_with: newton-second-vector
  difficulty: basic
  type: tiny
  estimated_time_seconds: 60
```

#### Problem

> **Arabic:** نضع كتلة 5 kg على سطح أملس وندفعها بقوّة أفقيّة 20 N. احسب التسارع. ✓
> **Hebrew:** נניח גוף במסה 5 kg על משטח חלק ונדחוף אותו בכוח אופקי של 20 N. חשבו את התאוצה.
> **English:** A 5 kg block is on a smooth surface. We push it with a horizontal force of 20 N. Find the acceleration.

#### Solution

```
ΣF = ma
a = ΣF / m
a = 20 / 5
a = 4 m/s²

The acceleration is 4 m/s² in the direction of the applied force.
```

#### Solution narrative (Arabic)

> نطبّق القانون الثاني: ΣF = ma. لا توجد قوى أخرى أفقيّة (السطح أملس)، إذن ΣF = 20 N. التسارع: a = 20 / 5 = 4 m/s² في اتّجاه القوّة. ✓

#### What this example teaches

The simplest possible Newton II application: one force, one direction, smooth surface. The student practices the algorithm: identify ΣF, divide by m, get a. Direction of a equals direction of F.

---

### Concept · Newton II per axis

```yaml
concept:
  id: newton-second-per-axis
  difficulty: intermediate
  type: derivation
  pair_with_example: ex-2d-perpendicular-forces
```

#### Statement

> **Arabic:** القانون الثاني معادلة متّجهة. نطبّقها على كلّ محور بشكلٍ مستقلّ. ✓
> **Hebrew:** החוק השני הוא משוואה וקטורית. אנחנו מיישמים אותה על כל ציר בנפרד.
> **English:** Newton's Second Law is a vector equation. We apply it to each axis independently.

#### The two scalar equations

When ΣF = ma is decomposed into x and y components:

\[
\Sigma F_x = m a_x \qquad \Sigma F_y = m a_y
\]

These are **two separate equations**, solved independently. The x-axis and y-axis don't talk to each other — that's the whole point of choosing perpendicular axes.

#### Why this matters

Most real problems aren't 1D. A block on an incline, a projectile, a charged particle in a field — all are 2D. The trick is **choosing your axes wisely**:

- For a horizontal/vertical problem: use horizontal and vertical
- For an incline: use parallel-to-incline and perpendicular-to-incline
- For circular motion: use radial (toward center) and tangential

The right axes turn a hard 2D problem into two easy 1D problems.

#### Visual: Decomposition diagram

> A force vector F drawn at angle θ above horizontal. Dashed lines drop from F's tip to the x-axis and from F's tip to the y-axis, forming a right triangle. Labels: F (the hypotenuse), Fₓ = F cos θ (horizontal leg), Fᵧ = F sin θ (vertical leg). The angle θ is marked at the origin between F and the x-axis.

#### Common student difficulty

Students forget that **decomposition gives signed components**. A force at 150° has Fₓ = F cos 150° = −F · 0.87 (negative!). Always use signed sines and cosines based on the angle measured from the positive x-axis.

#### Cross-references

- Builds on: `newton-second-vector`, `vectors-basics`
- Required for: every 2D dynamics problem, especially `incline-with-friction`

#### Bilingual terminology

| Concept       | Arabic     | Hebrew | English       |
| ------------- | ---------- | ------ | ------------- |
| Component     | المركّبة ✓ | רכיב   | component     |
| Decomposition | تحليل ✓    | פירוק  | decomposition |
| Axis          | محور ✓     | ציר    | axis          |

---

### Example · 2D problem with perpendicular forces

```yaml
example:
  id: ex-2d-perpendicular-forces
  pairs_with: newton-second-per-axis
  difficulty: intermediate
  type: tiny
  estimated_time_seconds: 90
```

#### Problem

> **Arabic:** كتلة 2 kg على سطح أفقيّ أملس. تعمل عليها قوّة 8 N أفقيّاً وقوّة 6 N عموديّاً نحو الأعلى. احسب التسارع على كلّ محور. ✓
> **Hebrew:** גוף במסה 2 kg על משטח אופקי חלק. פועלים עליו כוח 8 N אופקי וכוח 6 N אנכי כלפי מעלה. חשבו את התאוצה בכל ציר.
> **English:** A 2 kg block on a smooth horizontal surface. An 8 N horizontal force and a 6 N upward vertical force act on it. Find the acceleration on each axis.

#### Solution

```
On x-axis: ΣFₓ = 8 N
           aₓ = ΣFₓ / m = 8 / 2 = 4 m/s²

On y-axis: forces are weight (W = mg = 19.6 N down),
           normal N (up), and applied 6 N up.
           ΣFᵧ = N + 6 − 19.6 = 0  (block stays on surface)
           N = 13.6 N
           aᵧ = 0

Result: aₓ = 4 m/s² (rightward), aᵧ = 0
```

#### Solution narrative (Arabic)

> نختار محوري x و y. على المحور x: ΣFₓ = 8 N، فـ aₓ = 4 m/s². على المحور y: مجموع القوى صفر (الجسم لا يقفز عن السطح)، فـ N = 13.6 N و aᵧ = 0. التسارع 4 m/s² أفقيّاً فقط. ✓

#### What this example teaches

The student practices: applying ΣF = ma to each axis separately, recognizing that the y-axis can constrain N (the unknown), and getting a 2D answer that's just two 1D answers stacked.

---

### Concept · Newton's Third Law

```yaml
concept:
  id: newton-third-law
  difficulty: intermediate
  type: law
  pair_with_example: ex-swimming
```

#### Statement

> **Arabic:** لكلّ فعلٍ ردّ فعلٍ مساوٍ له في المقدار، معاكس له في الاتّجاه — والقوّتان تعملان على جسمين مختلفين. ✓
> **Hebrew:** לכל פעולה יש תגובה שווה בגודל והפוכה בכיוון — ושני הכוחות פועלים על גופים שונים.
> **English:** For every action there is an equal and opposite reaction — and the two forces act on different bodies.

#### The crucial detail

The two forces in a Newton III pair act on **different bodies**. This is what people miss when they say "they cancel out."

\[
\vec{F}_{A \to B} = -\vec{F}_{B \to A}
\]

Read: "the force A exerts on B equals minus the force B exerts on A." Same magnitude, opposite direction, on different things.

#### Why they don't cancel

Two forces can only "cancel" if they act on the **same body**. Newton III pairs act on different bodies, so they appear in different free-body diagrams. They never appear in the same ΣF sum.

#### Visual: Action-reaction in swimming

> A simplified figure of a swimmer shown from above. The swimmer's hand pushes water backward (arrow on the water labeled "F: hand → water"). The water pushes the swimmer forward (arrow on the swimmer labeled "F: water → hand"). The two arrows are equal length, opposite direction. Below: caption "Two forces. Two bodies. They never cancel."

#### Common student difficulty

The classic mistake: "If I push the wall and the wall pushes me back equally, why does anything ever move?" The answer is in the _bodies_. The wall pushes me — that's a force on me. I push the wall — that's a force on the wall. To find what happens to me, I look at _my_ free-body diagram, which contains the wall's force on me but not my force on the wall. Net force on me may very well be nonzero.

#### Cross-references

- Builds on: `force-as-vector`
- Pairs with: `newton-second-vector`, `fbd-method`
- Required for: any system of bodies that exert forces on each other (Atwood machines, contact problems)

#### Bilingual terminology

| Concept              | Arabic             | Hebrew           | English              |
| -------------------- | ------------------ | ---------------- | -------------------- |
| Action               | الفعل ✓            | פעולה            | action               |
| Reaction             | ردّ الفعل ✓        | תגובה            | reaction             |
| Action-reaction pair | زوج فعل وردّ فعل ✓ | זוג פעולה ותגובה | action-reaction pair |

---

### Example · Swimming

```yaml
example:
  id: ex-swimming
  pairs_with: newton-third-law
  difficulty: basic
  type: tiny
  estimated_time_seconds: 45
```

#### Problem

> **Arabic:** عندما تسبح، تدفع يدك الماء إلى الخلف. ما الذي يدفعك إلى الأمام؟ ⚑
> **Hebrew:** כאשר אתה שוחה, ידך דוחפת את המים אחורה. מה דוחף אותך קדימה?
> **English:** When you swim, your hand pushes the water backward. What pushes you forward?

#### Solution

> The water pushes your hand forward, by Newton III.
> Your hand exerts F (hand → water) backward.
> The water exerts F (water → hand) = −F (hand → water) forward.
> The forward force on your hand is what propels you.

#### Solution narrative (Arabic)

> أنت تدفع الماء، والماء يدفعك بالقوّة نفسها في الاتّجاه المعاكس. القوّتان متساويتان في المقدار، متعاكستان، لكنّهما تعملان على جسمين مختلفين: واحدة على الماء، والأخرى عليك. ⚑

#### What this example teaches

Newton III is **why locomotion works**. Walking, swimming, flying, rowing, jet propulsion — all rely on pushing something back to be pushed forward. The student learns to _identify_ the action-reaction pair and to recognize that the forward force is the reaction force _on them_.

---

### Concept · Weight (W = mg)

```yaml
concept:
  id: weight
  difficulty: basic
  type: definition
  pair_with_example: ex-weight-of-book
```

#### Statement

> **Arabic:** الوزن هو قوّة جذب الأرض للجسم. كلّ كتلة قرب سطح الأرض تشعر بقوّةٍ نحو مركزها. ✓
> **Hebrew:** המשקל הוא כוח המשיכה של כדור הארץ על הגוף. כל מסה ליד פני כדור הארץ חשה כוח לכיוון מרכזה.
> **English:** Weight is Earth's gravitational pull on a body. Every mass near Earth's surface feels a force toward Earth's center.

#### Equation

\[
W = m g
\]

where g ≈ 9.8 m/s² is the gravitational acceleration near Earth's surface. (In Bagrut problems, g = 10 m/s² is often used to simplify arithmetic; the problem will state this.)

#### Mass vs. Weight (the critical distinction)

|                | Mass              | Weight                   |
| -------------- | ----------------- | ------------------------ |
| Symbol         | m                 | W                        |
| Unit           | kg                | N                        |
| Type           | scalar            | vector                   |
| Same on Moon?  | yes               | no (≈ 1/6 of Earth)      |
| Same in space? | yes               | no (≈ 0)                 |
| Definition     | "how much matter" | "how hard gravity pulls" |

A 70 kg astronaut has 70 kg mass on Earth, on the Moon, and floating in deep space. Their **weight** is ~686 N on Earth, ~114 N on the Moon, and ~0 in deep space.

#### Visual: Weight always points toward Earth's center

> A small Earth (circle) drawn at the bottom of the diagram. A block sits on the surface with an arrow pointing down to Earth's center labeled "W = mg". Another block on the side of Earth has an arrow pointing horizontally toward Earth's center, also labeled "W = mg". A third block at the top has an arrow pointing downward (toward Earth's center). The diagram shows: weight is always _toward Earth's center_, regardless of where you are on the surface.

#### Common student difficulty

In daily Arabic and Hebrew (as in English), "weight" is used loosely. Students say "I weigh 60 kg" — but kg is mass, not weight. Their **weight** is 60 × 9.8 ≈ 588 N. We have to retrain this informal usage in physics class.

#### Cross-references

- Builds on: `force-as-vector`, `kinematics-1d#free-fall`
- Required for: every problem involving gravity

#### Bilingual terminology

| Concept                    | Arabic            | Hebrew       | English                    |
| -------------------------- | ----------------- | ------------ | -------------------------- |
| Weight                     | الوزن ✓           | משקל         | weight                     |
| Mass                       | الكتلة ✓          | מסה          | mass                       |
| Gravitational acceleration | تسارع الجاذبيّة ✓ | תאוצת הכבידה | gravitational acceleration |

---

### Example · Weight of a book

```yaml
example:
  id: ex-weight-of-book
  pairs_with: weight
  difficulty: basic
  type: tiny
  estimated_time_seconds: 30
```

#### Problem

> **Arabic:** ما وزن كتاب كتلته 5 kg؟ (g = 9.8 m/s²) ✓
> **Hebrew:** מהו משקל ספר שמסתו 5 kg? (g = 9.8 m/s²)
> **English:** What is the weight of a book with mass 5 kg? (g = 9.8 m/s²)

#### Solution

```
W = mg = 5 × 9.8 = 49 N
```

#### Solution narrative (Arabic)

> نطبّق المعادلة: W = mg = 5 × 9.8 = 49 N. ✓

---

### Concept · Normal force

```yaml
concept:
  id: normal-force
  difficulty: intermediate
  type: definition
  pair_with_example: ex-block-on-incline-find-N
```

#### Statement

> **Arabic:** القوّة العموديّة هي القوّة التي يدفع بها السطح الجسم عموديّاً على السطح. اتّجاهها عمودي على السطح، وليس بالضرورة عمودي على الأرض. ✓
> **Hebrew:** הכוח הנורמלי הוא הכוח שבו המשטח דוחף את הגוף בניצב למשטח. הכיוון שלו ניצב למשטח, לא בהכרח ניצב לאדמה.
> **English:** The normal force is the force a surface exerts on a body, perpendicular to the surface. Its direction is perpendicular to the surface, not necessarily perpendicular to the ground.

#### The defining feature

The word "normal" in physics means **perpendicular** (from the Latin _norma_, meaning a right angle). On a flat horizontal surface, the normal force points straight up. On an incline, it points perpendicular to the incline — _tilted away from vertical_.

#### Equations (depend on situation)

**On a flat surface with no other vertical forces:**
\[
N = mg
\]

**On an incline of angle θ:**
\[
N = mg\cos\theta
\]

**On a flat surface with an additional applied force F at angle α above horizontal:**
\[
N = mg - F\sin\alpha
\]

**Whenever a body presses harder than its weight (e.g., upward acceleration in an elevator):**
\[
N > mg
\]

The point: **N is whatever the constraint requires**. Don't memorize "N = mg." Memorize: "the body doesn't penetrate the surface, so the y-equation must give the right N."

#### Visual: Normal force on flat vs incline

> Two side-by-side diagrams.
> **Left:** Block on horizontal ground. Three vectors from block: W down, N up (same length as W). Caption: "N = W = mg"
> **Right:** Block on incline at 30°. Three vectors: W straight down (full length), N perpendicular to incline (shorter, equal to W cos 30°), with a dashed line showing how N is shorter than W. Caption: "N = mg cos θ < W"

#### Common student difficulty

The most common mistake in all of mechanics: **assuming N = mg always**. This is wrong on inclines, in elevators, when a body is pressed by another force, etc. The fix: always derive N from ΣFᵧ = maᵧ in your specific axis system.

#### Cross-references

- Builds on: `force-as-vector`, `weight`, `newton-second-per-axis`
- Required for: friction problems, incline problems, FBD method

#### Bilingual terminology

| Concept       | Arabic             | Hebrew      | English       |
| ------------- | ------------------ | ----------- | ------------- |
| Normal force  | القوّة العموديّة ✓ | כוח נורמלי  | normal force  |
| Perpendicular | عمودي ✓            | ניצב        | perpendicular |
| Surface       | سطح ✓              | משטח        | surface       |
| Incline       | مستوى مائل ✓       | מישור משופע | incline       |

---

### Example · Block on incline (find N)

```yaml
example:
  id: ex-block-on-incline-find-N
  pairs_with: normal-force
  difficulty: intermediate
  type: tiny
  estimated_time_seconds: 90
```

#### Problem

> **Arabic:** كتلة 4 kg على مستوى مائل بزاوية 30°. أوجد القوّة العموديّة N. (g = 9.8 m/s²) ✓
> **Hebrew:** גוף במסה 4 kg על מישור משופע בזווית 30°. מצא את הכוח הנורמלי N.
> **English:** A 4 kg block on a 30° incline. Find the normal force N.

#### Solution

```
Choose axes: parallel to incline (x') and perpendicular to incline (y').
Decompose W = mg = 4 × 9.8 = 39.2 N:
  W parallel to incline (along x'): W sin 30° = 19.6 N (down the slope)
  W perpendicular to incline (along y'): W cos 30° = 33.95 N (into the slope)

Block doesn't sink into the surface, so on y':
  ΣF_y' = N − W cos θ = 0
  N = W cos θ = 39.2 × cos 30° ≈ 33.95 N

N ≈ 33.9 N (perpendicular to the incline, away from the surface)
```

#### Solution narrative (Arabic)

> نختار محورين: محور موازٍ للمستوى المائل (x')، ومحور عمودي عليه (y'). الوزن W = 39.2 N. نحلّل: المركّبة العموديّة W cos 30° = 33.95 N، والمركّبة الموازية W sin 30° = 19.6 N. الجسم لا يخترق السطح، فعلى المحور y': ΣF = 0، أي N = W cos 30° ≈ 33.9 N. ✓

#### What this example teaches

The student practices choosing tilted axes (parallel/perpendicular to incline), decomposing weight (the only force that's _not_ aligned with these axes), and using the perpendicular equilibrium equation to find N. This is the setup for every incline problem on the Bagrut.

---

### Concept · Tension

```yaml
concept:
  id: tension
  difficulty: intermediate
  type: definition
  pair_with_example: ex-atwood-basic
```

#### Statement

> **Arabic:** الشدّ هو القوّة التي ينقلها حبلٌ مشدود من طرفٍ إلى آخر. في حبلٍ عديم الكتلة وغير مرن، الشدّ نفسه على طول الحبل. ✓
> **Hebrew:** מתיחות היא הכוח שחבל מתוח מעביר מקצה לקצה. בחבל חסר מסה ובלתי-נמתח, המתיחות זהה לאורך כל החבל.
> **English:** Tension is the force a taut rope transmits from one end to the other. In a massless, inextensible rope, the tension is the same everywhere along the rope.

#### Properties of tension

1. **Always pulls** — never pushes. A rope can only pull on whatever it's attached to.
2. **Same throughout an ideal rope** — at every point along a massless inextensible rope, the tension magnitude is the same.
3. **Direction:** at any attachment point, the rope pulls the attached object **toward** the rope (along the rope's direction).

#### When tension is NOT constant

If the rope has mass, tension varies along it (the upper part has to support the lower rope's weight). If the rope passes over a non-ideal pulley with friction, tension differs on the two sides. We assume **ideal** ropes and pulleys in 5-unit Bagrut.

#### Visual: Tension in a rope

> A rope pulled taut between two hands. Multiple small arrows along the rope all pointing the same direction at every point, all the same length. Below: "T everywhere along an ideal rope is the same magnitude."

#### Common student difficulty

Students sometimes draw the tension on a body as a **push** (away from where the rope attaches). It's always a **pull** — toward the rope. If you find yourself drawing tension as pushing the body, you've got the direction backward.

#### Cross-references

- Builds on: `force-as-vector`
- Required for: Atwood machines, pulley problems, hanging-mass problems

#### Bilingual terminology

| Concept  | Arabic        | Hebrew  | English  |
| -------- | ------------- | ------- | -------- |
| Tension  | الشدّ ✓       | מתיחות  | tension  |
| Rope     | حبل ✓         | חבל     | rope     |
| Pulley   | بكرة ✓        | גלגלת   | pulley   |
| Massless | عديم الكتلة ✓ | חסר מסה | massless |

---

### Example · Basic Atwood machine

```yaml
example:
  id: ex-atwood-basic
  pairs_with: tension
  difficulty: intermediate
  type: tiny
  estimated_time_seconds: 120
```

#### Problem

> **Arabic:** كتلتان m₁ = 3 kg و m₂ = 5 kg مرتبطتان بحبل عديم الكتلة يمرّ فوق بكرة عديمة الاحتكاك. أوجد التسارع والشدّ. ✓
> **Hebrew:** שני גופים m₁ = 3 kg ו-m₂ = 5 kg קשורים בחבל חסר מסה העובר מעל גלגלת חסרת חיכוך. מצא את התאוצה ואת המתיחות.
> **English:** Two masses m₁ = 3 kg and m₂ = 5 kg are connected by a massless rope over a frictionless pulley. Find the acceleration and the tension.

#### Solution

```
The heavier mass (m₂) accelerates downward; the lighter (m₁) accelerates upward.
Both have the same magnitude of acceleration, a (rope is inextensible).

For m₁ (taking upward as positive):
  ΣF₁ = T − m₁g = m₁a       ... (i)

For m₂ (taking downward as positive):
  ΣF₂ = m₂g − T = m₂a       ... (ii)

Add (i) + (ii):
  T − m₁g + m₂g − T = m₁a + m₂a
  (m₂ − m₁)g = (m₁ + m₂)a
  a = (m₂ − m₁)g / (m₁ + m₂)
  a = (5 − 3)(9.8) / (3 + 5)
  a = 19.6 / 8
  a = 2.45 m/s²

Substitute back into (i):
  T = m₁(g + a) = 3(9.8 + 2.45) = 36.75 N
```

#### Solution narrative (Arabic)

> نطبّق القانون الثاني على كلّ كتلة بشكل منفصل. الكتلة الأخفّ تتسارع للأعلى، الأثقل للأسفل، ولهما نفس مقدار التسارع. نحصل على معادلتين بمجهولين (a, T) ونحلّ النظام: a ≈ 2.45 m/s²، T ≈ 36.75 N. ✓

#### What this example teaches

The student learns to **treat each body separately** in a system. Newton's laws apply to each mass; the rope connects them via tension and the constraint that they share |a|. This is the prototype for all multi-body Bagrut problems.

---

### Concept · Friction (static and kinetic)

```yaml
concept:
  id: friction
  difficulty: intermediate
  type: definition
  pair_with_example: ex-friction-bound
```

#### Statement

> **Arabic:** الاحتكاك هو قوّة تعاكس الحركة (أو محاولة الحركة) بين سطحين متلامسين. ✓
> **Hebrew:** חיכוך הוא כוח המתנגד לתנועה (או לניסיון לתנועה) בין שני משטחים במגע.
> **English:** Friction is a force that opposes motion (or attempted motion) between two surfaces in contact.

#### Two regimes

**Static friction** (`f_s`): when the body is **not yet moving** but a force is trying to slide it.

\[
f_s \leq \mu_s N
\]

Note the inequality. Static friction is **whatever value** is needed to keep the body still — _up to_ the maximum μₛN. It "negotiates" with the applied force.

**Kinetic friction** (`f_k`): when the body **is sliding**.

\[
f_k = \mu_k N
\]

Note the equality. Once sliding, kinetic friction has a definite value.

#### Important relationship

\[
\mu_k < \mu_s \quad \text{(usually)}
\]

This is why it's harder to **start** a heavy object sliding than to **keep** it sliding once started.

#### Visual: Static friction "negotiates"

> Three panels showing the same block on the floor. In each, an applied force (red arrow) pushes right.
> **Panel 1:** Small force F = 2 N applied. Static friction (gray arrow) = 2 N leftward. Block stationary. Caption: "F = 2 N → fₛ = 2 N"
> **Panel 2:** Larger force F = 5 N applied. Static friction = 5 N leftward. Block still stationary. Caption: "F = 5 N → fₛ = 5 N"
> **Panel 3:** Even larger force F = 10 N applied. Static friction reached maximum (= μₛN, say 6 N). Block now slides. Kinetic friction shown. Caption: "F = 10 N > μₛN, block slides. fₖ = μₖN"

#### Common student difficulty

Treating static friction as if it always equals μₛN. It doesn't. Static friction is a **range** [0, μₛN]; it equals exactly what's needed to keep the body still. Only the _maximum possible_ value is μₛN.

#### Cross-references

- Builds on: `normal-force`, `force-as-vector`
- Required for: incline-with-friction problems, almost every realistic Bagrut problem

#### Bilingual terminology

| Concept                 | Arabic           | Hebrew      | English                 |
| ----------------------- | ---------------- | ----------- | ----------------------- |
| Friction                | الاحتكاك ✓       | חיכוך       | friction                |
| Static friction         | احتكاك سكوني ✓   | חיכוך סטטי  | static friction         |
| Kinetic friction        | احتكاك حركي ✓    | חיכוך קינטי | kinetic friction        |
| Coefficient of friction | معامل الاحتكاك ✓ | מקדם חיכוך  | coefficient of friction |

---

### Example · Static friction is whatever is needed

```yaml
example:
  id: ex-friction-bound
  pairs_with: friction
  difficulty: intermediate
  type: tiny
  estimated_time_seconds: 90
```

#### Problem

> **Arabic:** كتلة 10 kg على أرضٍ أفقيّة، μₛ = 0.4، μₖ = 0.3. (g = 10 m/s²)
>
> ١. ندفع بقوّة 30 N. هل يتحرّك الجسم؟ ما الاحتكاك؟
> ٢. ندفع بقوّة 50 N. هل يتحرّك الجسم؟ ما الاحتكاك؟ ✓
> **English:** A 10 kg block on a horizontal floor. μₛ = 0.4, μₖ = 0.3. (g = 10 m/s²)
>
> 1. Push with 30 N. Does it move? What's the friction?
> 2. Push with 50 N. Does it move? What's the friction?

#### Solution

```
N = mg = 100 N
Maximum static friction: μₛN = 40 N

Case 1: F = 30 N
  Since 30 N < 40 N, static friction adjusts to balance.
  fₛ = 30 N (leftward), block stays still.

Case 2: F = 50 N
  Since 50 N > 40 N, static friction can't hold. Block slides.
  Once moving, friction is kinetic: fₖ = μₖN = 0.3 × 100 = 30 N.
  Net force = 50 − 30 = 20 N → a = 2 m/s²
```

#### Solution narrative (Arabic)

> أوّلاً نحسب الحدّ الأعلى للاحتكاك السكوني: μₛN = 40 N.
>
> الحالة الأولى (F = 30 N): القوّة أقلّ من الحدّ، فالاحتكاك السكوني يساوي القوّة المطبّقة (30 N) ويحفظ الجسم ساكناً.
>
> الحالة الثانية (F = 50 N): القوّة تتجاوز الحدّ، فيبدأ الانزلاق. الاحتكاك يصبح حركيّاً: fₖ = μₖN = 30 N. التسارع = (50 − 30)/10 = 2 m/s². ✓

#### What this example teaches

The "negotiating" nature of static friction. The student practices: computing the static-friction maximum, comparing the applied force to it, then either keeping the body still (with static friction = applied force) or letting it slide (with kinetic friction = μₖN).

---

## Cumulative Examples

### Cumulative · Block on incline with friction

```yaml
example:
  id: ex-incline-with-friction
  type: cumulative
  difficulty: advanced
  estimated_time_seconds: 600
  combines: [newton-second-per-axis, normal-force, friction, weight]
```

This is the **Bagrut staple**. Mastering this problem prepares students for ~30% of mechanics Bagrut questions.

#### Problem

> **Arabic:** كتلة m = 4 kg على مستوى مائل بزاوية θ = 30°، معامل احتكاك حركي μₖ = 0.20. حُرّرت من السكون. أوجد التسارع.
> (g = 9.8 m/s²) ✓
> **Hebrew:** גוף במסה m = 4 kg על מישור משופע בזווית θ = 30°, מקדם חיכוך קינטי μₖ = 0.20. שוחרר ממנוחה. מצא את התאוצה.
> **English:** A 4 kg block on a 30° incline, kinetic friction μₖ = 0.20. Released from rest. Find the acceleration.

#### Setup diagram

> An incline rising from lower-left to upper-right at 30° from horizontal. A square block sits on the incline. Three force arrows on the block:
>
> - W: straight down (toward Earth's center), labeled mg
> - N: perpendicular to the incline, pointing up-left away from surface
> - fₖ: along the incline, pointing up the slope (opposing the block's downward motion)
>   A 30° angle marked at the base of the incline.

#### Step 1 · Choose axes

Use **tilted axes**:

- x' axis: along the incline, positive direction = down the slope
- y' axis: perpendicular to the incline, positive direction = away from surface

Why tilted? Because the motion happens along the incline. The block doesn't accelerate perpendicular to the incline (it stays on the surface). With these axes, ay' = 0 always.

#### Step 2 · Decompose the weight

The weight W = mg = 4 × 9.8 = 39.2 N points straight down. In tilted axes:

- W\_{x'} = mg sin θ = 39.2 × 0.5 = 19.6 N (down the slope)
- W\_{y'} = -mg cos θ = -39.2 × 0.866 ≈ -33.95 N (into the surface)

The other two forces are already aligned with the new axes:

- N is along +y'
- fₖ is along -x' (opposing downward motion)

#### Step 3 · Apply Newton II per axis

**On y' axis (no acceleration perpendicular to incline):**
\[
\Sigma F*{y'} = m a*{y'} \;\Rightarrow\; N - mg\cos\theta = 0 \;\Rightarrow\; N = mg\cos\theta
\]
\[
N = 4 \times 9.8 \times 0.866 \approx 33.95 \text{ N}
\]

**On x' axis (motion happens here):**
\[
\Sigma F*{x'} = m a*{x'} \;\Rightarrow\; mg\sin\theta - f_k = ma
\]

Substitute fₖ = μₖN = μₖ mg cos θ:
\[
mg\sin\theta - \mu_k\, mg\cos\theta = ma
\]
\[
a = g(\sin\theta - \mu_k\cos\theta)
\]

#### Step 4 · Substitute numbers

\[
a = 9.8(\sin 30° - 0.20\cos 30°) = 9.8(0.5 - 0.2 \times 0.866) = 9.8(0.5 - 0.1732) = 9.8 \times 0.3268 \approx 3.20 \text{ m/s}^2
\]

#### Step 5 · Interpret

The block accelerates **down the slope** at 3.2 m/s². The acceleration is positive (in the +x' direction we chose), so the block speeds up as it slides down.

#### Solution narrative (Arabic, full)

> نختار محوراً موازياً للمستوى المائل (x') ومحوراً عمودياً عليه (y'). نحلّل الوزن: المركّبة الموازية mg sin θ والمركّبة العموديّة mg cos θ.
>
> على المحور y' لا تسارع، إذن: N = mg cos θ ≈ 33.95 N.
> الاحتكاك الحركي: fₖ = μₖ N = 0.20 × 33.95 ≈ 6.79 N.
>
> على المحور x': mg sin θ − fₖ = ma. نستخرج a:
> a = g(sin θ − μₖ cos θ) = 9.8(0.5 − 0.2 × 0.866) ≈ 3.2 m/s² في اتّجاه أسفل المستوى. ✓

#### What this cumulative example demonstrates

This problem combines:

- Vector decomposition (concept: `newton-second-per-axis`)
- Choice of tilted axes (technique)
- Normal force on incline (concept: `normal-force`)
- Kinetic friction (concept: `friction`)
- Newton II per axis (concept: `newton-second-per-axis`)
- Algebraic manipulation to isolate `a`
- Numerical substitution

It's the prototype for every "block on incline" Bagrut problem.

---

## Misconceptions

### Misconception · Moving objects need a constant force

```yaml
misconception:
  id: misc-moving-needs-force
  applies_to: [newton-first-law, newton-second-vector]
  severity: high
  bagrut_relevant: true
```

#### What students say (wrong)

> **Arabic:** «الجسم المتحرّك يحتاج قوّةً مستمرّة لكي يستمرّ في الحركة.» ✓
> **English:** "A moving object needs a constant force to keep moving."

#### What's actually true

> **Arabic:** فقط تغيُّر الحركة يحتاج إلى قوّة. السرعة الثابتة لا تحتاج إلى أيّ قوّة محصّلة. ✓
> **English:** Only changes in motion require a force. Constant velocity needs zero net force.

#### Why students fall for it

Everyday experience supports the misconception: every moving thing we see slows down. But that's because friction always acts. Imagine a hockey puck on perfectly frictionless ice — Newton's First Law tells us it moves forever at constant velocity, with no horizontal force needed.

#### Diagnostic question

> A hockey puck slides on perfectly frictionless ice at 5 m/s. Does it need a force to keep moving? Why or why not?

**Correct answer:** No. ΣF = 0 keeps it at 5 m/s forever. Newton's First Law.

---

### Misconception · Action and reaction cancel out

```yaml
misconception:
  id: misc-action-reaction-cancel
  applies_to: [newton-third-law]
  severity: high
  bagrut_relevant: true
```

#### What students say (wrong)

> **Arabic:** «الفعل وردّ الفعل متساويان ومتعاكسان، فيلغيان بعضهما بعضاً.» ✓
> **English:** "Action and reaction are equal and opposite, so they cancel each other out."

#### What's actually true

> **Arabic:** القوّتان تعملان على جسمين مختلفين — لذلك لا تلغيان شيئاً على أيٍّ منهما. ✓
> **English:** The two forces act on different bodies — so they cancel nothing on either body.

#### Why students fall for it

The phrase "equal and opposite" sounds like cancellation. And cancellation works when both forces act on the _same_ body. The crucial detail Newton III adds is "on different bodies" — and that detail is easy to forget.

#### Diagnostic question

> When you push a wall, the wall pushes you back equally. Why don't these forces cancel?

**Correct answer:** They act on different things. The wall's push is on you; your push is on the wall. To find what happens to you, look at _your_ free-body diagram, which contains only the wall's force on you (plus other forces, like friction from the ground). The action-reaction pair never appears in the same FBD.

---

### Misconception · N = mg always

```yaml
misconception:
  id: misc-N-equals-mg
  applies_to: [normal-force]
  severity: high
  bagrut_relevant: true
```

#### What students say (wrong)

> **Arabic:** «القوّة العموديّة على الجسم تساوي وزنه دائماً.» ✓
> **English:** "The normal force on a body is always equal to its weight."

#### What's actually true

> **Arabic:** صحيحة فقط على سطحٍ أفقيّ، بدون قوى عموديّة أخرى. على مستوى مائل: N = mg cos θ. وفي مصعد متسارع: N = m(g ± a). ✓
> **English:** True only on a flat surface with no other vertical forces. On an incline: N = mg cos θ. In an accelerating elevator: N = m(g ± a).

#### Why students fall for it

The first textbook example of normal force is always a flat surface where N = mg. The student generalizes prematurely and applies N = mg in situations where it's wrong (inclines, elevators, body pressed by additional force).

#### Diagnostic question

> A 5 kg block sits on a 30° incline. What is the normal force on it? (g = 10 m/s²)

**Correct answer:** N = mg cos 30° = 5 × 10 × 0.866 ≈ 43.3 N. NOT 50 N.

---

### Misconception · Friction always opposes the applied force

```yaml
misconception:
  id: misc-friction-opposes-force
  applies_to: [friction]
  severity: medium
  bagrut_relevant: true
```

#### What students say (wrong)

> **Arabic:** «الاحتكاك دائماً عكس اتّجاه القوّة المطبّقة.» ✓
> **English:** "Friction always points opposite to the applied force."

#### What's actually true

> **Arabic:** الاحتكاك يعاكس الحركة (أو محاولة الحركة)، لا القوّة المطبّقة بالضرورة. لو دفعت بزاوية، الاحتكاك يبقى عكس اتّجاه الانزلاق. ✓
> **English:** Friction opposes motion (or attempted motion), not necessarily the applied force. If you push at an angle, friction still points opposite the direction of sliding (along the surface), not opposite your push direction.

#### Why students fall for it

In the simplest examples, the applied force and the motion direction coincide. So "opposite the force" and "opposite the motion" look the same. Add an angle — push the block diagonally downward, for instance — and the two diverge.

#### Diagnostic question

> A block sits on a horizontal floor. You push it with a force at 30° below horizontal (downward and forward). Which direction does friction point?

**Correct answer:** Backward (along the floor, opposite the motion direction). Not at 30° above horizontal (which would be opposite the applied force vector).

---

### Misconception · An object at rest has no forces on it

```yaml
misconception:
  id: misc-rest-no-forces
  applies_to: [newton-first-law, equilibrium]
  severity: medium
  bagrut_relevant: false
```

#### What students say (wrong)

> **Arabic:** «الجسم الساكن لا توجد عليه أيّ قوى.» ✓
> **English:** "An object at rest has no forces acting on it."

#### What's actually true

> **Arabic:** السكون يعني أنّ مجموع القوى صفر — لا أنّ القوى غائبة. القوى موجودة (مثل الوزن والقوّة العموديّة على كتاب فوق طاولة)، لكنّها متوازنة. ✓
> **English:** "At rest" means **net** force is zero — not that forces are absent. Forces are present (like weight and normal force on a book on a table), but they balance.

#### Why students fall for it

"No motion = no forces" is intuitive but wrong. The book on a table is in **dynamic equilibrium** — many forces, summing to zero.

#### Diagnostic question

> A book lies still on a table. List the forces acting on it.

**Correct answer:** Weight W (downward), Normal force N (upward). Two forces. They balance: ΣF = 0. The book is at rest _because_ the forces balance, not because there are no forces.

---

## Bilingual Glossary

The complete terminology for this unit. Status markers indicate confidence level. → Sayakim entries should be confirmed against the official Sayakim dictionary before publication.

| Concept                    | Arabic             | Hebrew            | English                    | Status |
| -------------------------- | ------------------ | ----------------- | -------------------------- | ------ |
| Force                      | القوّة             | כוח               | force                      | ✓      |
| Vector                     | المتّجه            | וקטור             | vector                     | ✓      |
| Magnitude                  | المقدار            | גודל              | magnitude                  | ✓      |
| Direction                  | الاتّجاه           | כיוון             | direction                  | ✓      |
| Net force / resultant      | القوّة المحصّلة    | כוח שקול          | net force / resultant      | ✓      |
| Vector sum                 | جمع متّجهي         | חיבור וקטורי      | vector sum                 | ✓      |
| Sum (Σ)                    | المجموع            | סכום              | sum                        | ✓      |
| Newton (unit)              | نيوتن              | ניוטון            | newton (N)                 | ✓      |
| Mass                       | الكتلة             | מסה               | mass                       | ✓      |
| Weight                     | الوزن              | משקל              | weight                     | ✓      |
| Acceleration               | التسارع            | תאוצה             | acceleration               | ✓      |
| Velocity                   | السرعة المتجهة     | מהירות            | velocity                   | ✓      |
| At rest                    | ساكن               | במנוחה            | at rest                    | ✓      |
| Constant velocity          | سرعة ثابتة         | מהירות קבועה      | constant velocity          | ✓      |
| Inertia                    | القصور الذاتي      | התמדה             | inertia                    | ✓      |
| Equilibrium                | اتّزان             | שיווי משקל        | equilibrium                | ✓      |
| Newton's First Law         | قانون نيوتن الأوّل | חוק ניוטון הראשון | Newton's First Law         | ✓      |
| Newton's Second Law        | قانون نيوتن الثاني | חוק ניוטון השני   | Newton's Second Law        | ✓      |
| Newton's Third Law         | قانون نيوتن الثالث | חוק ניוטון השלישי | Newton's Third Law         | ✓      |
| Action                     | الفعل              | פעולה             | action                     | ✓      |
| Reaction                   | ردّ الفعل          | תגובה             | reaction                   | ✓      |
| Action-reaction pair       | زوج فعل وردّ فعل   | זוג פעולה ותגובה  | action-reaction pair       | ✓      |
| Component                  | المركّبة           | רכיב              | component                  | ✓      |
| Decomposition              | تحليل              | פירוק             | decomposition              | ✓      |
| Axis                       | محور               | ציר               | axis                       | ✓      |
| Gravitational acceleration | تسارع الجاذبيّة    | תאוצת הכבידה      | gravitational acceleration | ✓      |
| Normal force               | القوّة العموديّة   | כוח נורמלי        | normal force               | ✓      |
| Perpendicular              | عمودي              | ניצב              | perpendicular              | ✓      |
| Surface                    | سطح                | משטח              | surface                    | ✓      |
| Incline                    | مستوى مائل         | מישור משופע       | incline                    | ✓      |
| Tension                    | الشدّ              | מתיחות            | tension                    | ✓      |
| Rope                       | حبل                | חבל               | rope                       | ✓      |
| Pulley                     | بكرة               | גלגלת             | pulley                     | ✓      |
| Massless (idealization)    | عديم الكتلة        | חסר מסה           | massless                   | ✓      |
| Friction                   | الاحتكاك           | חיכוך             | friction                   | ✓      |
| Static friction            | احتكاك سكوني       | חיכוך סטטי        | static friction            | ✓      |
| Kinetic friction           | احتكاك حركي        | חיכוך קינטי       | kinetic friction           | ✓      |
| Coefficient of friction    | معامل الاحتكاك     | מקדם חיכוך        | coefficient of friction    | ✓      |
| Free-body diagram          | مخطّط الجسم الحرّ  | דיאגרמת כוחות     | free-body diagram          | ✓      |
| Atwood machine             | آلة آتوود          | מכונת אטווד       | Atwood machine             | ✓      |

---

## Past Bagrut Questions

The following past Bagrut problems test concepts from this unit. Full text and solutions to be added during the implementation phase by cross-referencing the Ministry's exam archive at meyda.education.gov.il.

```yaml
bagrut_archive_pending:
  - id: bagrut-2023-summer-q2
    year: 2023
    season: summer
    shaalon: '037381'
    question_number: 2
    topic_tags: [newton-second-law, friction, incline]
    estimated_difficulty: intermediate
    notes: 'Block on incline with kinetic friction; find acceleration and speed at bottom'

  - id: bagrut-2024-winter-q1
    year: 2024
    season: winter
    shaalon: '037381'
    question_number: 1
    topic_tags: [newton-second-law, atwood, pulley]
    estimated_difficulty: intermediate
    notes: 'Atwood machine with friction in pulley axle (qualitative + quantitative parts)'

  - id: bagrut-2024-summer-q3
    year: 2024
    season: summer
    shaalon: '037381'
    question_number: 3
    topic_tags: [newton-third-law, contact-forces, multi-body]
    estimated_difficulty: advanced
    notes: 'Two blocks pushed together; find contact force between them'

  - id: bagrut-2025-summer-q2
    year: 2025
    season: summer
    shaalon: '037381'
    question_number: 2
    topic_tags: [newton-second-law, incline, friction, kinematics]
    estimated_difficulty: advanced
    notes: 'Block on incline released from height; combines dynamics with kinematics'

  - id: bagrut-2023-winter-q4
    year: 2023
    season: winter
    shaalon: '037381'
    question_number: 4
    topic_tags: [newton-second-law, equilibrium, tension]
    estimated_difficulty: intermediate
    notes: 'Two-rope hanging mass; find tensions in each rope'
```

> **Action item:** Pull the actual problem statements, diagrams, and solutions from the Ministry archive. Add them to this file using the past-Bagrut block schema from `_format_spec.md`. This requires access to the official exam PDFs.

---

## Notes for the renderer (Claude Code)

When rendering this unit into slides:

1. **Follow `docs/09_pedagogy.md`** — interleave concept slides with their paired example slides
2. **Use the `pair_with_example` field** in concept blocks to determine slide adjacency
3. **The cumulative example** (incline-with-friction) becomes the multi-slide cumulative section near the end of the deck
4. **Misconceptions are quarantined** at the end (per pedagogy doc), not interleaved
5. **Every Arabic phrase** rendered to a slide must surface its `⚑` flag in dev mode, hide in production
6. **Visual descriptions** are prose specs — render to SVG using the design system in `docs/02_design_system.md`
7. **Bilingual structure** on every section header: Hebrew label small / Arabic title large / English caption italic

When rendering this unit into the interactive:

1. The `interactive_concept` field in the frontmatter is the spec
2. Build a free-body diagram canvas where students place forces
3. Compute ΣF in real-time using the equations defined in this file
4. Run the simulation using ΣF = ma — real Newtonian physics, no shortcuts

When rendering this unit into the exam:

1. Pull the past Bagrut questions from the `bagrut_archive_pending` section once data is added
2. Mix difficulties: at least 1 basic, 2 intermediate, 1 advanced
3. Include the cumulative incline-with-friction problem
4. Provide solutions that match the format of the example blocks above

---

## File metadata

```yaml
file: docs/content/03_newtons_laws.md
version: 1.0
last_updated: 2026-04-26
arabic_flags_count: 8
total_concepts: 10
total_examples: 10
total_misconceptions: 5
estimated_word_count: 7800
```
