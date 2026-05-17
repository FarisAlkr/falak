---
unit:
  id: kinematics-1d
  number: '01'
  domain: mechanics
  bagrut_shaalon: '037381'
  bagrut_weight_estimate: 15
  hours_estimated: 12

titles:
  ar: الحركة في بُعدٍ واحد
  he: תנועה בציר אחד
  en: 1D Kinematics

prerequisites:
  - basic-algebra
  - graph-reading
  - signed-numbers

leads_to:
  - kinematics-2d
  - newtons-laws

learning_outcomes:
  - 'Distinguish position, displacement, distance traveled, and path'
  - 'Distinguish average velocity, instantaneous velocity, and speed'
  - 'Apply kinematic equations for constant acceleration'
  - 'Read and construct position-time, velocity-time, and acceleration-time graphs'
  - 'Analyze free-fall problems'
  - 'Solve problems involving multiple phases of motion (e.g., accelerate then coast)'

key_equations:
  - id: average-velocity
    formula: "\\bar{v} = \\frac{\\Delta x}{\\Delta t}"
    plain: 'Average velocity is displacement divided by elapsed time'
  - id: average-acceleration
    formula: "\\bar{a} = \\frac{\\Delta v}{\\Delta t}"
    plain: 'Average acceleration is change in velocity divided by elapsed time'
  - id: kinematic-1
    formula: 'v = v_0 + at'
    plain: 'Velocity as function of time (constant acceleration)'
  - id: kinematic-2
    formula: "x = x_0 + v_0 t + \\tfrac{1}{2}at^2"
    plain: 'Position as function of time (constant acceleration)'
  - id: kinematic-3
    formula: "v^2 = v_0^2 + 2a\\Delta x"
    plain: 'Time-independent kinematic equation'
  - id: kinematic-4
    formula: "\\Delta x = \\tfrac{1}{2}(v_0 + v)t"
    plain: 'Displacement as average velocity times time'
  - id: free-fall
    formula: "y = y_0 + v_0 t - \\tfrac{1}{2}g t^2"
    plain: 'Position under free-fall (taking up as positive)'

interactive_concept: 'Motion graph matcher — student adjusts position-time curve directly; system shows resulting velocity-time and acceleration-time graphs in real time. Reverse mode: student is shown a v-t graph and must reconstruct the position story.'

content_status:
  written: 2026-04-26
  reviewed_by: null
  arabic_review_pending: 6
  bagrut_questions_count: 4

references:
  - 'Sayakim Hebrew-Arabic-English Physics Dictionary'
  - 'Halliday, Resnick, Walker — Fundamentals of Physics, Chapter 2'
  - 'PTC Weizmann teacher resources for kinematics'
  - 'Past Bagrut exams: 2023-2025'
---

# Unit 01 · 1D Kinematics

## Introduction

Physics begins with **describing motion**. Before we can ask "why does this thing move?" (the question of dynamics), we must answer "how is it moving?" — what's its position, how fast is it changing, and how is its speed itself changing.

This unit teaches the **language and tools** of motion description in one dimension. Students learn:

- The precise difference between distance and displacement, speed and velocity
- The kinematic equations for constant acceleration
- How to read position, velocity, and acceleration graphs
- Free fall as a special case of constant acceleration

This unit is a prerequisite for everything else in mechanics. Students who don't internalize the difference between position, velocity, and acceleration will struggle with Newton's laws, energy, momentum — every subsequent unit.

---

## Scope & Prerequisites

### What students must already know

- Basic algebra (solving linear and quadratic equations)
- Signed-number arithmetic (positive and negative values, especially for direction)
- Graph reading and slope interpretation
- Basic geometry (areas of rectangles and triangles, for v-t graph areas)

### What this unit covers

1. **Position, displacement, distance** (concepts: position, displacement-vs-distance)
2. **Velocity vs. speed; instantaneous vs. average** (concepts: velocity-vs-speed, instantaneous-velocity, average-velocity)
3. **Acceleration** (concepts: acceleration, instantaneous-acceleration)
4. **Kinematic equations for constant acceleration** (concepts: kinematic-equations, derivation-from-graphs)
5. **Free fall** (concepts: free-fall, gravity-as-constant-acceleration)
6. **Motion graphs** (concepts: position-time-graph, velocity-time-graph, acceleration-time-graph, area-and-slope)

### What this unit does NOT cover

- 2D motion (next unit)
- Forces causing acceleration (Unit 03)
- Vector decomposition (Unit 02)
- Variable (non-constant) acceleration via calculus

### Hours allocation (suggested)

| Section                                   | Hours  |
| ----------------------------------------- | ------ |
| Position, displacement                    | 1      |
| Velocity, speed, average vs instantaneous | 2      |
| Acceleration                              | 1.5    |
| Kinematic equations                       | 3      |
| Motion graphs                             | 2      |
| Free fall                                 | 1.5    |
| Cumulative practice                       | 1      |
| **Total**                                 | **12** |

---

## Concepts

### Concept · Position and displacement

```yaml
concept:
  id: position-displacement
  difficulty: basic
  type: definition
  pair_with_example: ex-displacement-vs-distance
```

#### Statement

> **Arabic:** الموقع هو مكان الجسم على محور إحداثيٍّ مختار. الإزاحة هي التغيُّر في الموقع، Δx = x_f − x_i. ✓
> **Hebrew:** המיקום הוא המקום של הגוף על ציר נבחר. ההעתק הוא השינוי במיקום, Δx = x_f − x_i.
> **English:** Position is the body's location on a chosen axis. Displacement is the change in position, Δx = x_f − x_i.

#### Equation

\[
\Delta x = x_f - x_i
\]

#### Displacement vs. distance traveled

These are not the same.

- **Displacement (Δx):** signed; depends only on start and end points; can be negative.
- **Distance traveled:** unsigned; depends on the entire path; can never be negative.

A car drives 30 km east then 10 km west. Distance = 40 km. Displacement = +20 km (east).

#### Visual: Displacement vs distance

> A horizontal axis with marked positions 0, 10, 20, 30. A car icon starts at 0, an arrow shows it moving to position 30, then a second arrow shows it returning to position 20. Below the axis: "distance traveled = 30 + 10 = 40 km". Inside the axis showing the net trajectory: a single arrow from 0 to 20, labeled "Δx = +20 km".

#### Common student difficulty

Students conflate distance with displacement. The fix: emphasize that **displacement has a sign** and depends only on endpoints; distance is always positive and depends on the entire path.

#### Cross-references

- Required for: every concept in this unit
- Connects to: vectors-basics (Unit 02), where displacement becomes a vector in 2D

#### Bilingual terminology

| Concept      | Arabic    | Hebrew | English      |
| ------------ | --------- | ------ | ------------ |
| Position     | الموقع ✓  | מיקום  | position     |
| Displacement | الإزاحة ✓ | העתק   | displacement |
| Distance     | المسافة ✓ | מרחק   | distance     |
| Path         | المسار ✓  | מסלול  | path         |

---

### Example · Displacement vs distance

```yaml
example:
  id: ex-displacement-vs-distance
  pairs_with: position-displacement
  difficulty: basic
  type: tiny
  estimated_time_seconds: 60
```

#### Problem

> **Arabic:** سيّارة تتحرّك من الموقع x = 0 إلى x = 50 m، ثمّ تعود إلى x = 20 m. ما المسافة المقطوعة وما الإزاحة؟ ✓
> **Hebrew:** מכונית נעה ממיקום x = 0 ל-x = 50 m, ואז חוזרת ל-x = 20 m. מהו המרחק שעברה ומהו ההעתק?
> **English:** A car moves from x = 0 to x = 50 m, then returns to x = 20 m. What is the distance traveled and what is the displacement?

#### Solution

```
Distance traveled = |50 − 0| + |50 − 20| = 50 + 30 = 80 m
Displacement Δx = x_final − x_initial = 20 − 0 = +20 m
```

#### Solution narrative (Arabic)

> المسافة المقطوعة هي مجموع جميع الانتقالات بصرف النظر عن الاتّجاه: 50 + 30 = 80 m. الإزاحة تعتمد فقط على البداية والنهاية: x_f − x_i = 20 − 0 = 20 m. ✓

---

### Concept · Average velocity vs. average speed

```yaml
concept:
  id: average-velocity
  difficulty: basic
  type: definition
  pair_with_example: ex-average-velocity-trip
```

#### Statement

> **Arabic:** السرعة المتوسّطة هي الإزاحة مقسومة على الزمن المنقضي. السرعة العاديّة (سُكَيلر) هي المسافة المقطوعة مقسومة على الزمن. ⚑
> **Hebrew:** המהירות הממוצעת היא ההעתק לחלק לזמן שעבר. המהירות הסקלרית הממוצעת היא המרחק לחלק לזמן.
> **English:** Average velocity is displacement divided by elapsed time. Average speed (scalar) is distance divided by time.

#### Equations

\[
\bar{v} = \frac{\Delta x}{\Delta t}
\]

\[
\text{average speed} = \frac{\text{distance traveled}}{\Delta t}
\]

#### Why they differ

A car drives 60 km in 1 hour east, then 60 km in 1 hour west. Total time: 2 hours. Distance: 120 km. Displacement: 0.

- Average speed = 120 / 2 = 60 km/h
- Average velocity = 0 / 2 = **0 km/h**

The car's average velocity is zero because it ended where it started. Its average speed was 60 km/h.

#### Visual: Velocity is signed, speed is not

> A two-row table.
> Row 1: "Velocity" — arrow on a number line, can point either direction, can be negative.
> Row 2: "Speed" — same arrow but with the magnitude only, always positive.

#### Common student difficulty

In everyday Hebrew/Arabic/English, "speed" and "velocity" are used interchangeably. In physics they mean different things: velocity has direction (sign), speed doesn't.

#### Cross-references

- Builds on: position-displacement
- Required for: instantaneous-velocity, kinematic-equations

#### Bilingual terminology

| Concept           | Arabic             | Hebrew           | English          |
| ----------------- | ------------------ | ---------------- | ---------------- |
| Velocity (vector) | السرعة المتجهة ✓   | מהירות (וקטורית) | velocity         |
| Speed (scalar)    | السرعة ⚑           | מהירות סקלרית    | speed            |
| Average velocity  | السرعة المتوسّطة ✓ | מהירות ממוצעת    | average velocity |

> ⚑ Note: Arabic distinguishes between "السرعة المتجهة" (velocity, vector) and "السرعة" (speed, scalar) but in informal Arabic both can mean the same thing. The distinction matters in physics — review whether students/teachers in your district use "السرعة العدديّة" or another phrasing for scalar speed.

---

### Example · Average velocity for a round trip

```yaml
example:
  id: ex-average-velocity-trip
  pairs_with: average-velocity
  difficulty: basic
  type: tiny
  estimated_time_seconds: 60
```

#### Problem

> **Arabic:** يقطع راكض 200 m شمالاً في 30 ثانية، ثمّ يعود 100 m جنوباً في 20 ثانية. أوجد السرعة المتوسّطة. ✓
> **Hebrew:** רץ עובר 200 m צפונה ב-30 שניות, ואז חוזר 100 m דרומה ב-20 שניות. מהי המהירות הממוצעת?
> **English:** A runner covers 200 m north in 30 s, then returns 100 m south in 20 s. Find the average velocity.

#### Solution

```
Take north as positive.
Total displacement: Δx = +200 − 100 = +100 m (north)
Total time: Δt = 30 + 20 = 50 s

Average velocity = Δx / Δt = 100 / 50 = +2 m/s (north)

(For comparison: average speed = 300 / 50 = 6 m/s.)
```

#### Solution narrative (Arabic)

> الإزاحة الكليّة: 100 m شمالاً. الزمن الكلّي: 50 s. السرعة المتوسّطة = 2 m/s شمالاً. لاحظ الفرق عن السرعة المتوسّطة العاديّة (6 m/s). ✓

---

### Concept · Instantaneous velocity

```yaml
concept:
  id: instantaneous-velocity
  difficulty: intermediate
  type: definition
  pair_with_example: ex-slope-of-position-graph
```

#### Statement

> **Arabic:** السرعة اللحظيّة هي السرعة في لحظة معيّنة. هندسيّاً، هي ميل المماس لمنحنى x(t) في تلك اللحظة. ✓
> **Hebrew:** המהירות הרגעית היא המהירות ברגע מסוים. גיאומטרית, היא השיפוע של המשיק לעקומת x(t) באותו רגע.
> **English:** Instantaneous velocity is the velocity at a specific instant. Geometrically, it is the slope of the tangent to the x(t) curve at that instant.

#### Why we need it

Average velocity tells us what happened across an interval. But often we want to know "how fast was the car going at exactly t = 5 s?" That's the instantaneous velocity.

#### As a slope

On a position-time graph, the slope of the curve at a point equals the instantaneous velocity at that time. A horizontal tangent means v = 0 (momentarily at rest). A steep tangent means high speed. A negative slope means moving in the negative direction.

#### Visual: Tangent line on x(t)

> A curved x(t) graph (showing position increasing then leveling off then decreasing). At three points along the curve: tangent lines drawn. Tangent 1 has steep positive slope, labeled "v large positive." Tangent 2 is horizontal, labeled "v = 0 (instantaneously at rest)." Tangent 3 has negative slope, labeled "v negative (moving back)."

#### Common student difficulty

Confusing the height of the position graph with the velocity. Velocity is the **slope**, not the height. A particle can be at a large position with zero velocity, or at zero position with large velocity.

#### Cross-references

- Builds on: average-velocity
- Required for: kinematic-equations, motion-graphs

#### Bilingual terminology

| Concept                | Arabic            | Hebrew       | English                |
| ---------------------- | ----------------- | ------------ | ---------------------- |
| Instantaneous velocity | السرعة اللحظيّة ✓ | מהירות רגעית | instantaneous velocity |
| Tangent                | المماس ✓          | משיק         | tangent                |
| Slope                  | الميل ✓           | שיפוע        | slope                  |

---

### Example · Slope of position-time graph

```yaml
example:
  id: ex-slope-of-position-graph
  pairs_with: instantaneous-velocity
  difficulty: intermediate
  type: tiny
  estimated_time_seconds: 90
```

#### Problem

> **Arabic:** الجدول التالي يعطي موقع جسم: عند t = 0 فإنّ x = 0، عند t = 2 s فإنّ x = 10 m، عند t = 4 s فإنّ x = 30 m. قدِّر السرعة اللحظيّة عند t = 3 s. ⚑
> **Hebrew:** הטבלה הבאה נותנת את מיקום הגוף: ב-t = 0 יש x = 0, ב-t = 2 s יש x = 10 m, ב-t = 4 s יש x = 30 m. הערך את המהירות הרגעית ב-t = 3 s.
> **English:** The following table gives a body's position: at t = 0, x = 0; at t = 2 s, x = 10 m; at t = 4 s, x = 30 m. Estimate the instantaneous velocity at t = 3 s.

#### Solution

```
Best estimate: average velocity over a small interval centered on t = 3 s.
Use the interval [2, 4]:
  v ≈ (30 − 10) / (4 − 2) = 20 / 2 = 10 m/s

The instantaneous velocity at t = 3 s is approximately 10 m/s.
```

#### Solution narrative (Arabic)

> نستخدم فترة صغيرة حول t = 3 s، أي الفترة [2, 4]: v ≈ (30 − 10)/(4 − 2) = 10 m/s. كلّما صغرت الفترة، كان التقدير أدقّ — هذا أصل تعريف السرعة اللحظيّة. ⚑

#### What this example teaches

The connection between average velocity (over an interval) and instantaneous velocity (at a point) — the latter is the limit of the former as the interval shrinks.

---

### Concept · Acceleration

```yaml
concept:
  id: acceleration
  difficulty: basic
  type: definition
  pair_with_example: ex-acceleration-from-zero
```

#### Statement

> **Arabic:** التسارع هو معدّل تغيُّر السرعة بالنسبة للزمن: a = Δv / Δt. ✓
> **Hebrew:** התאוצה היא קצב השינוי של המהירות ביחס לזמן: a = Δv / Δt.
> **English:** Acceleration is the rate of change of velocity with time: a = Δv / Δt.

#### Equations

Average acceleration:
\[
\bar{a} = \frac{\Delta v}{\Delta t} = \frac{v_f - v_i}{\Delta t}
\]

Instantaneous acceleration: the slope of v(t) at an instant.

#### Sign of acceleration

- **a > 0:** velocity increasing in the positive direction OR decreasing in the negative direction
- **a < 0:** velocity decreasing in the positive direction OR increasing in the negative direction
- **a = 0:** velocity constant (uniform motion)

The sign of acceleration tells us about velocity _change_, not necessarily direction of motion. A car braking while moving rightward has v > 0 and a < 0 — it's decelerating, but acceleration is just "negative" in our sign convention.

#### Visual: Three regimes

> Three side-by-side panels.
> **Panel 1:** car moving right, velocity arrow getting longer over time. Caption: "v↑, same direction → a positive (in motion direction)"
> **Panel 2:** car moving right, velocity arrow getting shorter over time. Caption: "v↓, motion still rightward → a negative"
> **Panel 3:** car moving right at constant velocity (arrow doesn't change). Caption: "v constant → a = 0"

#### Common student difficulty

Students think "negative acceleration" means "moving backward" or "stopped." It doesn't. Acceleration is about how velocity _changes_ — and a negative acceleration could just mean "slowing down while still moving forward" or "speeding up in the negative direction."

#### Cross-references

- Builds on: instantaneous-velocity
- Required for: kinematic-equations, free-fall, all of dynamics (Unit 03)

#### Bilingual terminology

| Concept                | Arabic       | Hebrew      | English                |
| ---------------------- | ------------ | ----------- | ---------------------- |
| Acceleration           | التسارع ✓    | תאוצה       | acceleration           |
| Deceleration (slowing) | التباطؤ ✓    | האטה        | deceleration / slowing |
| Constant acceleration  | تسارع ثابت ✓ | תאוצה קבועה | constant acceleration  |

---

### Example · Car accelerating from rest

```yaml
example:
  id: ex-acceleration-from-zero
  pairs_with: acceleration
  difficulty: basic
  type: tiny
  estimated_time_seconds: 60
```

#### Problem

> **Arabic:** سيّارة تنطلق من السكون وتصل إلى 20 m/s خلال 5 ثوانٍ. أوجد التسارع المتوسّط. ✓
> **Hebrew:** מכונית מתחילה ממנוחה ומגיעה ל-20 m/s תוך 5 שניות. מצא את התאוצה הממוצעת.
> **English:** A car starts from rest and reaches 20 m/s in 5 seconds. Find its average acceleration.

#### Solution

```
ā = Δv / Δt = (20 − 0) / 5 = 4 m/s²
```

#### Solution narrative (Arabic)

> ā = (20 − 0) / 5 = 4 m/s². تعني أنّ السرعة تزداد بمقدار 4 m/s كلّ ثانية. ✓

---

### Concept · Kinematic equations (constant acceleration)

```yaml
concept:
  id: kinematic-equations
  difficulty: intermediate
  type: derivation
  pair_with_example: ex-stopping-distance
```

#### Statement

> **Arabic:** عند ثبات التسارع، تربط أربع معادلات بين الموقع والسرعة والزمن والتسارع. ✓
> **Hebrew:** כאשר התאוצה קבועה, ארבע משוואות מקשרות בין מיקום, מהירות, זמן ותאוצה.
> **English:** With constant acceleration, four equations relate position, velocity, time, and acceleration.

#### The four kinematic equations

\[
v = v_0 + at \tag{1}
\]
\[
x = x_0 + v_0 t + \tfrac{1}{2} a t^2 \tag{2}
\]
\[
v^2 = v_0^2 + 2a\Delta x \tag{3}
\]
\[
\Delta x = \tfrac{1}{2}(v_0 + v) t \tag{4}
\]

#### How to choose which equation

Each equation is missing one variable:

| Equation                | Missing | Use when...                                           |
| ----------------------- | ------- | ----------------------------------------------------- |
| (1) v = v₀ + at         | x       | You don't care about position; only velocity and time |
| (2) x = x₀ + v₀t + ½at² | v       | You don't know final velocity but know time           |
| (3) v² = v₀² + 2aΔx     | t       | You don't know time                                   |
| (4) Δx = ½(v₀ + v)t     | a       | You don't know acceleration                           |

The first instinct should be: **list what you know, identify what you want to find, and pick the equation that has those quantities and nothing else unknown.**

#### Visual: The kinematic equations diagrammed

> A 5-column table with columns: Equation | x | v | a | t. Each row is one of the four equations. Cells contain ✓ if the variable appears, ✗ if it doesn't. The pattern visually shows which equation skips which variable.

#### Common student difficulty

Memorizing the equations without understanding which to use. The fix: practice **selecting** the right equation before solving — make selection itself an exercise.

#### Cross-references

- Builds on: position-displacement, average-velocity, acceleration
- Required for: free-fall, every dynamics problem in Unit 03

#### Bilingual terminology

| Concept             | Arabic               | Hebrew         | English             |
| ------------------- | -------------------- | -------------- | ------------------- |
| Kinematic equations | معادلات الحركة ✓     | משוואות תנועה  | kinematic equations |
| Initial velocity    | السرعة الابتدائيّة ✓ | מהירות התחלתית | initial velocity    |
| Final velocity      | السرعة النهائيّة ✓   | מהירות סופית   | final velocity      |
| Initial position    | الموقع الابتدائي ✓   | מיקום התחלתי   | initial position    |

---

### Example · Stopping distance

```yaml
example:
  id: ex-stopping-distance
  pairs_with: kinematic-equations
  difficulty: intermediate
  type: tiny
  estimated_time_seconds: 90
```

#### Problem

> **Arabic:** سيّارة تسير بسرعة 20 m/s. تفرمل بتباطؤ ثابت قدره 5 m/s². ما المسافة التي تقطعها قبل التوقّف؟ ⚑
> **Hebrew:** מכונית נוסעת במהירות 20 m/s. בולמת בהאטה קבועה של 5 m/s². מה המרחק שעוברת עד עצירה?
> **English:** A car travels at 20 m/s. It brakes with constant deceleration 5 m/s². What distance does it cover before stopping?

#### Solution

```
We know: v₀ = 20 m/s, v = 0 (stopped), a = −5 m/s² (deceleration)
We want: Δx
We don't have: t — so use equation (3), v² = v₀² + 2aΔx

0² = 20² + 2(−5)(Δx)
0 = 400 − 10·Δx
Δx = 40 m
```

#### Solution narrative (Arabic)

> نختار معادلة v² = v₀² + 2aΔx لأنّها لا تتطلّب الزمن. نعوّض: 0 = 400 − 10·Δx، فـ Δx = 40 m. ⚑

#### What this example teaches

The discipline of **equation selection**. Listed knowns, listed unknowns, identified that t was the missing variable, picked equation (3) accordingly. This is more important than the algebra — the algebra is easy once the right equation is chosen.

---

### Concept · Free fall

```yaml
concept:
  id: free-fall
  difficulty: basic
  type: application
  pair_with_example: ex-free-fall-from-height
```

#### Statement

> **Arabic:** السقوط الحرّ هو حركة جسم تحت تأثير الجاذبيّة فقط، دون مقاومة الهواء. التسارع ثابت ويساوي g ≈ 9.8 m/s² نحو الأسفل. ✓
> **Hebrew:** נפילה חופשית היא תנועת גוף תחת השפעת הכבידה בלבד, ללא התנגדות אוויר. התאוצה קבועה ושווה ל-g ≈ 9.8 m/s² כלפי מטה.
> **English:** Free fall is the motion of a body under gravity alone, with no air resistance. The acceleration is constant and equal to g ≈ 9.8 m/s² downward.

#### What "free fall" actually means

Free fall doesn't require the object to be falling **down**. A ball thrown straight up is in free fall the entire time — including on the way up — because the only force on it (ignoring air resistance) is gravity.

#### The free-fall equations

Free fall is just kinematic equations with a = -g (taking up as positive).

\[
v(t) = v_0 - gt
\]
\[
y(t) = y_0 + v_0 t - \tfrac{1}{2} g t^2
\]
\[
v^2 = v_0^2 - 2g\Delta y
\]

#### A famous result

All objects in free fall (regardless of mass) have the same acceleration g. A feather and a hammer dropped on the Moon (no air) hit the ground at the same time. Galileo predicted this; Apollo 15 demonstrated it on TV in 1971.

#### Visual: Ball thrown up

> A vertical axis (y) with marks. A ball at three positions:
>
> - Bottom: just leaving hand, large upward velocity arrow.
> - Middle: at peak, no velocity arrow (v = 0 momentarily).
> - Top: returning to hand, large downward velocity arrow (same magnitude as initial).
>   Throughout, a small downward arrow labeled "g" indicating constant acceleration. Caption: "Throughout the journey, a = -g (down). Only v changes."

#### Common student difficulty

Thinking that at the peak of a thrown ball's trajectory, "the ball stops accelerating because v = 0." Wrong. v is momentarily zero, but a is still -g. It's the constant downward pull of gravity that immediately starts pulling the ball back down.

#### Cross-references

- Builds on: kinematic-equations, acceleration
- Required for: 2D projectile motion (Unit 02)

#### Bilingual terminology

| Concept                        | Arabic            | Hebrew           | English                    |
| ------------------------------ | ----------------- | ---------------- | -------------------------- |
| Free fall                      | السقوط الحرّ ✓    | נפילה חופשית     | free fall                  |
| Gravity                        | الجاذبيّة ✓       | כבידה / גרביטציה | gravity                    |
| g (gravitational acceleration) | تسارع الجاذبيّة ✓ | תאוצת הכבידה     | gravitational acceleration |

---

### Example · Free fall from height

```yaml
example:
  id: ex-free-fall-from-height
  pairs_with: free-fall
  difficulty: basic
  type: tiny
  estimated_time_seconds: 90
```

#### Problem

> **Arabic:** يُسقَط حجر من ارتفاع 45 m من السكون. كم زمن يستغرق ليصل إلى الأرض؟ بأيّ سرعة يصل؟ (g = 10 m/s²) ✓
> **Hebrew:** משחררים אבן ממנוחה מגובה 45 m. כמה זמן ייקח לה להגיע לקרקע? באיזו מהירות תגיע? (g = 10 m/s²)
> **English:** A stone is dropped from rest from height 45 m. How long does it take to reach the ground? At what speed does it arrive? (g = 10 m/s²)

#### Solution

```
Take down as positive (simpler since the motion is downward).
Initial: v₀ = 0, y₀ = 0 (top), Δy = 45 m
g = 10 m/s² (positive because we're taking down as +)

Time to fall: y = ½gt² → 45 = ½(10)t² → t² = 9 → t = 3 s

Final speed: v = v₀ + gt = 0 + 10(3) = 30 m/s
```

#### Solution narrative (Arabic)

> نختار اتّجاه الأسفل موجباً لتبسيط الإشارات. نطبّق y = ½gt²: 45 = 5t² → t = 3 s. السرعة النهائيّة: v = gt = 30 m/s. ✓

---

### Concept · Motion graphs

```yaml
concept:
  id: motion-graphs
  difficulty: intermediate
  type: visualization
  pair_with_example: ex-graph-interpretation
```

#### Statement

> **Arabic:** ثلاث رسوم بيانيّة تحكي قصّة الحركة: x(t)، v(t)، a(t). كلّ رسم يخبرنا شيئاً مختلفاً. ✓
> **Hebrew:** שלושה גרפים מספרים את סיפור התנועה: x(t), v(t), a(t). כל גרף אומר משהו אחר.
> **English:** Three graphs tell the story of motion: x(t), v(t), a(t). Each says something different.

#### The relationships among graphs

| Graph | Slope tells you...    | Area under tells you... |
| ----- | --------------------- | ----------------------- |
| x(t)  | velocity              | (not meaningful)        |
| v(t)  | acceleration          | displacement (Δx)       |
| a(t)  | (rate of change of a) | change in velocity (Δv) |

The crucial insight: **slope of one graph = value of the next; area under one = change in the previous**.

#### Visual: Three graphs of one motion

> Three stacked graphs sharing a common t-axis. The motion: a car accelerates from rest for 5s, cruises at constant velocity for 5s, then decelerates to rest in 5s.
>
> **Top graph (x vs t):** A curve that's parabolic upward (during acceleration), then straight line with positive slope (constant velocity), then parabolic flattening (deceleration).
>
> **Middle graph (v vs t):** A straight line increasing from 0 (acceleration phase), then horizontal at peak velocity (cruise), then straight line decreasing to 0 (deceleration).
>
> **Bottom graph (a vs t):** Constant positive value during acceleration, zero during cruise, constant negative value during deceleration.
>
> Vertical dashed lines connect the three graphs at the phase boundaries (t = 5, t = 10).

#### Common student difficulty

Confusing **height** of a graph with **slope** of a graph. The position graph tells you where the car is. The slope of the position graph tells you how fast. These are different things — students often grab the height when they should be looking at slope.

#### Cross-references

- Builds on: position-displacement, instantaneous-velocity, acceleration
- Required for: visualization in every subsequent mechanics unit

#### Bilingual terminology

| Concept             | Arabic                | Hebrew         | English             |
| ------------------- | --------------------- | -------------- | ------------------- |
| Position-time graph | منحنى الموقع-الزمن ✓  | גרף מיקום-זמן  | position-time graph |
| Velocity-time graph | منحنى السرعة-الزمن ✓  | גרף מהירות-זמן | velocity-time graph |
| Slope               | الميل ✓               | שיפוע          | slope               |
| Area under curve    | المساحة تحت المنحنى ✓ | שטח מתחת לגרף  | area under curve    |

---

### Example · Reading a v-t graph

```yaml
example:
  id: ex-graph-interpretation
  pairs_with: motion-graphs
  difficulty: intermediate
  type: tiny
  estimated_time_seconds: 90
```

#### Problem

> **Arabic:** يُظهر منحنى v(t) أنّ سرعة جسم تزداد خطّيّاً من 0 إلى 20 m/s خلال 4 ثوانٍ، ثمّ تبقى ثابتة عند 20 m/s لمدّة 6 ثوانٍ. ما إجمالي الإزاحة بعد 10 ثوانٍ؟ ⚑
> **Hebrew:** גרף v(t) מראה שמהירות גוף עולה לינארית מ-0 ל-20 m/s במשך 4 שניות, ואז נשארת קבועה ב-20 m/s במשך 6 שניות. מהו ההעתק הכולל אחרי 10 שניות?
> **English:** A v(t) graph shows velocity rising linearly from 0 to 20 m/s over 4 seconds, then staying constant at 20 m/s for 6 seconds. What's the total displacement after 10 seconds?

#### Solution

```
Total displacement = area under v(t) curve.

Phase 1 (0 to 4 s): triangle with base 4 s, height 20 m/s
  Area = ½ × 4 × 20 = 40 m

Phase 2 (4 to 10 s): rectangle with base 6 s, height 20 m/s
  Area = 6 × 20 = 120 m

Total displacement = 40 + 120 = 160 m
```

#### Solution narrative (Arabic)

> الإزاحة هي المساحة تحت منحنى v(t). المرحلة الأولى: مثلّث (½ × 4 × 20 = 40 m). المرحلة الثانية: مستطيل (6 × 20 = 120 m). الإجمالي 160 m. ⚑

#### What this example teaches

The student practices interpreting a v-t graph as a story (acceleration phase, then cruise phase) and using **area** geometry to compute displacement — the most powerful trick of motion-graph analysis.

---

## Cumulative Examples

### Cumulative · Two-phase journey

```yaml
example:
  id: ex-two-phase-journey
  type: cumulative
  difficulty: intermediate
  estimated_time_seconds: 480
  combines: [kinematic-equations, motion-graphs, average-velocity]
```

#### Problem

> **Arabic:** سيّارة تنطلق من السكون بتسارع ثابت 2 m/s² لمدّة 6 ثوانٍ، ثمّ تستمرّ بسرعة ثابتة لمدّة 10 ثوانٍ، ثمّ تتباطأ إلى السكون في 4 ثوانٍ.
>
> ١. ما السرعة القصوى؟
> ٢. ما الإزاحة الكليّة؟
> ٣. ما السرعة المتوسّطة؟ ✓
> **English:** A car starts from rest with constant acceleration 2 m/s² for 6 seconds, then continues at constant velocity for 10 seconds, then decelerates to rest in 4 seconds.
>
> 1. What's the maximum speed?
> 2. What's the total displacement?
> 3. What's the average velocity?

#### Solution

```
Phase 1 (0 to 6 s): accelerating from rest at a = 2 m/s²
  v at end = v₀ + at = 0 + 2(6) = 12 m/s        ← maximum speed
  displacement = ½at² = ½(2)(36) = 36 m

Phase 2 (6 to 16 s): constant velocity 12 m/s for 10 s
  displacement = 12 × 10 = 120 m

Phase 3 (16 to 20 s): decelerating from 12 m/s to 0 in 4 s
  a = (0 − 12)/4 = −3 m/s²
  displacement = ½(v₀ + v)t = ½(12 + 0)(4) = 24 m

Total displacement = 36 + 120 + 24 = 180 m
Total time = 6 + 10 + 4 = 20 s
Average velocity = 180 / 20 = 9 m/s
```

#### Solution narrative (Arabic)

> نقسم الحركة إلى ثلاث مراحل ونحسب كلّ مرحلة على حدة. المرحلة 1: تسارع، v\_{max} = 12 m/s، الإزاحة 36 m. المرحلة 2: سرعة ثابتة، الإزاحة 120 m. المرحلة 3: تباطؤ، الإزاحة 24 m. الإجمالي 180 m في 20 ثانية، السرعة المتوسّطة 9 m/s. ✓

#### What this cumulative example demonstrates

Multi-phase motion problems test the student's ability to **decompose a complex motion into simple phases**, apply kinematic equations to each, and combine results. This is a Bagrut staple.

---

## Misconceptions

### Misconception · Negative acceleration means slowing down

```yaml
misconception:
  id: misc-negative-a-means-slowing
  applies_to: [acceleration]
  severity: medium
  bagrut_relevant: true
```

#### What students say (wrong)

> **Arabic:** «التسارع السالب يعني أنّ الجسم يتباطأ.» ✓
> **English:** "Negative acceleration means the object is slowing down."

#### What's actually true

> **Arabic:** التسارع السالب يعني أنّ الإشارة معاكسة لاتّجاه المحور الموجب — وليس بالضرورة أنّ الجسم يتباطأ. الجسم يتباطأ فقط إذا كانت السرعة والتسارع في اتّجاهين متعاكسين. ✓
> **English:** Negative acceleration means it points opposite to the positive axis — not necessarily that the object is slowing. An object slows only when velocity and acceleration point in opposite directions.

#### Why students fall for it

In daily life, "deceleration" and "negative acceleration" are used as synonyms. In physics, the sign of a tells you about direction (relative to the chosen axis), not whether speed is increasing or decreasing.

#### Diagnostic question

> A car is moving leftward at 10 m/s. It has acceleration −2 m/s² (with right being positive). Is the car speeding up or slowing down?

**Correct answer:** Speeding up. The velocity is negative (leftward) and the acceleration is negative (leftward). Same direction — so the car gets faster (more negative velocity).

---

### Misconception · A body at rest has zero acceleration

```yaml
misconception:
  id: misc-rest-zero-acceleration
  applies_to: [acceleration, free-fall]
  severity: medium
  bagrut_relevant: true
```

#### What students say (wrong)

> **Arabic:** «إذا كانت سرعة الجسم صفر، فتسارعه أيضاً صفر.» ✓
> **English:** "If a body's velocity is zero, its acceleration is also zero."

#### What's actually true

> **Arabic:** السرعة والتسارع مستقلّان. الجسم يمكن أن يكون له تسارع كبير حتّى لو كانت سرعته اللحظيّة صفر. مثال: كرة في أعلى مسارها — السرعة = 0، التسارع = -g. ✓
> **English:** Velocity and acceleration are independent. A body can have large acceleration even when its instantaneous velocity is zero. Example: a ball at the peak of its trajectory — v = 0, a = -g.

#### Why students fall for it

Intuitively, "no motion" feels like "no change." But acceleration measures how velocity _will_ change, not what it currently is. A ball at the peak of a throw has v = 0 but a = -g — and the next instant, gravity pulls it back down.

#### Diagnostic question

> A ball is thrown straight up. At its highest point, what are v and a?

**Correct answer:** v = 0, a = -g. The ball is momentarily at rest, but gravity is still pulling it down at full strength. That's exactly what causes it to start falling immediately.

---

### Misconception · Distance and displacement are the same

```yaml
misconception:
  id: misc-distance-displacement
  applies_to: [position-displacement]
  severity: high
  bagrut_relevant: true
```

#### What students say (wrong)

> **Arabic:** «المسافة والإزاحة متساويتان دائماً.» ✓
> **English:** "Distance and displacement are always equal."

#### What's actually true

> **Arabic:** المسافة هي طول المسار المقطوع، الإزاحة هي التغيُّر في الموقع. تكون متساويتين فقط في الحركة المستقيمة في اتّجاه واحد. ✓
> **English:** Distance is the path length traveled. Displacement is the change in position. They're equal only when motion is along a straight line in one direction.

#### Why students fall for it

In simple problems (a car travels 50 m), distance and displacement happen to be equal. The student generalizes to all problems and gets confused when the body backtracks.

#### Diagnostic question

> A runner jogs 200 m east, then 200 m back west. What's the distance traveled and the displacement?

**Correct answer:** Distance = 400 m. Displacement = 0. (They started and ended at the same point.)

---

## Bilingual Glossary

| Concept                 | Arabic              | Hebrew           | English                | Status |
| ----------------------- | ------------------- | ---------------- | ---------------------- | ------ |
| Position                | الموقع              | מיקום            | position               | ✓      |
| Displacement            | الإزاحة             | העתק             | displacement           | ✓      |
| Distance                | المسافة             | מרחק             | distance               | ✓      |
| Path                    | المسار              | מסלול            | path                   | ✓      |
| Velocity (vector)       | السرعة المتجهة      | מהירות (וקטורית) | velocity               | ✓      |
| Speed (scalar)          | السرعة              | מהירות סקלרית    | speed                  | ⚑      |
| Average velocity        | السرعة المتوسّطة    | מהירות ממוצעת    | average velocity       | ✓      |
| Instantaneous velocity  | السرعة اللحظيّة     | מהירות רגעית     | instantaneous velocity | ✓      |
| Tangent                 | المماس              | משיק             | tangent                | ✓      |
| Slope                   | الميل               | שיפוע            | slope                  | ✓      |
| Acceleration            | التسارع             | תאוצה            | acceleration           | ✓      |
| Deceleration            | التباطؤ             | האטה             | deceleration           | ✓      |
| Constant acceleration   | تسارع ثابت          | תאוצה קבועה      | constant acceleration  | ✓      |
| Kinematic equations     | معادلات الحركة      | משוואות תנועה    | kinematic equations    | ✓      |
| Initial velocity        | السرعة الابتدائيّة  | מהירות התחלתית   | initial velocity       | ✓      |
| Final velocity          | السرعة النهائيّة    | מהירות סופית     | final velocity         | ✓      |
| Initial position        | الموقع الابتدائي    | מיקום התחלתי     | initial position       | ✓      |
| Free fall               | السقوط الحرّ        | נפילה חופשית     | free fall              | ✓      |
| Gravity                 | الجاذبيّة           | כבידה / גרביטציה | gravity                | ✓      |
| g (grav. acceleration)  | تسارع الجاذبيّة     | תאוצת הכבידה     | grav. acceleration     | ✓      |
| Position-time graph     | منحنى الموقع-الزمن  | גרף מיקום-זמן    | x-t graph              | ✓      |
| Velocity-time graph     | منحنى السرعة-الزمن  | גרף מהירות-זמן   | v-t graph              | ✓      |
| Acceleration-time graph | منحنى التسارع-الزمن | גרף תאוצה-זמן    | a-t graph              | ✓      |
| Area under curve        | المساحة تحت المنحنى | שטח מתחת לגרף    | area under curve       | ✓      |

---

## Past Bagrut Questions

```yaml
bagrut_archive_pending:
  - id: bagrut-2024-summer-q1
    year: 2024
    season: summer
    shaalon: '037381'
    question_number: 1
    topic_tags: [kinematic-equations, free-fall]
    estimated_difficulty: basic
    notes: 'Stone dropped from cliff; find time and final velocity'

  - id: bagrut-2023-winter-q1
    year: 2023
    season: winter
    shaalon: '037381'
    question_number: 1
    topic_tags: [motion-graphs, two-phase-motion]
    estimated_difficulty: intermediate
    notes: 'Given v(t) graph, compute displacement, average velocity, average acceleration'

  - id: bagrut-2024-winter-q2
    year: 2024
    season: winter
    shaalon: '037381'
    question_number: 2
    topic_tags: [free-fall, ball-thrown-up]
    estimated_difficulty: intermediate
    notes: 'Ball thrown vertically; compute max height and time of flight'

  - id: bagrut-2025-summer-q1
    year: 2025
    season: summer
    shaalon: '037381'
    question_number: 1
    topic_tags: [kinematic-equations, two-objects]
    estimated_difficulty: advanced
    notes: 'Two cars; one starts later; when do they meet?'
```

---

## Notes for the renderer (Claude Code)

When rendering this unit:

1. **Pedagogy:** strict interleaving of concept-example pairs; misconceptions at end (per `09_pedagogy.md`)
2. **Visualization heavy:** kinematics is graphical — every motion graph in the visual descriptions should be rendered as actual SVG, not just described
3. **The interactive (motion graph matcher)** is the unit's distinguishing feature — invest in it
4. **Number of slides:** target 28-32 (similar to Newton's Laws unit)
5. **Special attention:** the difference between average vs instantaneous velocity is conceptually challenging — give it room

When rendering the interactive:

1. Two modes: forward (student adjusts x(t), system shows v(t) and a(t)) and reverse (system shows v(t), student tries to draw matching x(t))
2. Real-time computation — slope and area calculations done as student drags
3. Reward exact matching with positive feedback; show the discrepancy graph if not matching

---

## File metadata

```yaml
file: docs/content/01_kinematics_1d.md
version: 1.0
last_updated: 2026-04-26
arabic_flags_count: 6
total_concepts: 8
total_examples: 8
total_misconceptions: 3
estimated_word_count: 6500
```
