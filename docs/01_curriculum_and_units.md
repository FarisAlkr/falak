# Curriculum & Units

> **Source of truth:** `docs/content/00_baseline_index.md` — the verified Ministry of Education baseline. This document is a curriculum-level overview that points into the baseline. Where this document and the baseline disagree, **the baseline wins.**
>
> **Reference materials:** Israeli Ministry of Education 5-unit (5 יח״ל) physics Bagrut curriculum, Weizmann Institute Physics Teachers Center (PTC), and the Sayakim Hebrew–Arabic–English physics dictionary. Past Bagrut exams 2023–2025 cross-checked.

---

## 1. The Bagrut exam structure

Israel's 5-unit (מוגבר / ارتفاع) physics Bagrut consists of **two written exams (שאלונים)** plus a lab component:

| Component              | Hebrew                     | Code   | Duration | Weight                  | Domains covered                          |
| ---------------------- | -------------------------- | ------ | -------- | ----------------------- | ---------------------------------------- |
| Shaalon 037381         | שאלון מכניקה וחשמל         | 037381 | ~5 hours | written-portion (split) | Mechanics + Electromagnetism             |
| Shaalon 037382         | שאלון גלים ופיזיקה מודרנית | 037382 | ~5 hours | written-portion (split) | Waves, Optics + Modern & Atomic Physics  |
| Lab / Research project | מעבדה / מעבדת חקר          | —      | —        | 30%                     | Hands-on experiments or research project |

The two written shaalons together account for 70% of the final grade; the lab/research component accounts for 30%. (The exact split between the two shaalons depends on the program track — confirm against the current Ministry of Education weighting before publishing student-facing exam-prep material.)

> **Reform note.** A 2027 curriculum reform is approaching. Falak v1 targets the **current curriculum** (valid through 2027). A migration plan for the reform is documented separately.

Each written shaalon presents the student with a set of questions; the student selects a subset and answers in depth with full derivations, diagrams, and reasoning.

---

## 2. The 12 Falak units

Falak organizes the curriculum into **12 units**, mapped to the two shaalons. The full per-unit frontmatter (titles, prerequisites, key concepts, key equations, interactive concept, Bagrut topics) lives in `docs/content/00_baseline_index.md` — this section is the navigable summary.

```yaml
total_units: 12
total_classroom_hours_estimated: 192
shaalon_distribution:
  - shaalon: '037381'
    domain: 'Mechanics + Electromagnetism'
    units: [01, 02, 03, 04, 05, 06, 08, 09, 10]
  - shaalon: '037382'
    domain: 'Waves, Optics + Modern Physics'
    units: [07, 11, 12]
```

| #   | Unit ID           | Arabic                        | Hebrew                       | English                       | Shaalon | Hours | Status   |
| --- | ----------------- | ----------------------------- | ---------------------------- | ----------------------------- | ------- | ----- | -------- |
| 01  | `kinematics-1d`   | الحركة في بُعد واحد           | תנועה בציר אחד               | 1D Kinematics                 | 037381  | 12    | **FULL** |
| 02  | `kinematics-2d`   | الحركة في بُعدين والمقذوفات   | תנועה בשני צירים וזריקות     | 2D Kinematics & Projectiles   | 037381  | 14    | skeleton |
| 03  | `newtons-laws`    | قوانين نيوتن والديناميكا      | חוקי ניוטון ודינמיקה         | Newton's Laws & Dynamics      | 037381  | 18    | **FULL** |
| 04  | `work-energy`     | الشغل والطاقة والقدرة         | עבודה, אנרגיה והספק          | Work, Energy, Power           | 037381  | 16    | skeleton |
| 05  | `momentum`        | الزخم والدفع                  | תנע ומתקף                    | Momentum & Impulse            | 037381  | 14    | skeleton |
| 06  | `circular-motion` | الحركة الدائريّة والجاذبيّة   | תנועה מעגלית וגרביטציה       | Circular Motion & Gravitation | 037381  | 18    | skeleton |
| 07  | `oscillations`    | الاهتزازات والحركة التوافقيّة | תנודות ותנועה הרמונית        | Oscillations & SHM            | 037382  | 12    | skeleton |
| 08  | `electrostatics`  | الكهروستاتيكا                 | אלקטרוסטטיקה                 | Electrostatics                | 037381  | 16    | skeleton |
| 09  | `circuits`        | الدوائر الكهربائيّة           | מעגלים חשמליים               | DC Circuits                   | 037381  | 18    | skeleton |
| 10  | `magnetism`       | المغناطيسيّة والحثّ           | מגנטיות והשראה               | Magnetism & Induction         | 037381  | 16    | skeleton |
| 11  | `waves-optics`    | الموجات والبصريّات            | גלים ואופטיקה                | Waves & Optics                | 037382  | 20    | skeleton |
| 12  | `modern-atomic`   | الفيزياء الحديثة والذرّيّة    | פיזיקה מודרנית ופיזיקת האטום | Modern & Atomic Physics       | 037382  | 18    | skeleton |

> **Reorganization note** (vs an earlier 14-unit draft):
>
> - **Unit 06** merges Circular Motion with Gravitation (the Israeli curriculum teaches them together as "circular and gravitational motion").
> - **Unit 11** merges Geometric Optics with Physical Optics & Waves into a single Waves & Optics unit.
> - **Unit 12** merges Modern Physics with Atomic & Nuclear into a single Modern & Atomic Physics unit.
> - Oscillations (Unit 07) sits in shaalon 037382 because it is the bridge from mechanics to wave behavior in the curriculum.

---

## 3. Detailed unit specifications

Per-unit detail — concepts, key equations, bilingual vocabulary, interactive concept, key Bagrut topics, misconceptions, examples, references — lives in `docs/content/`:

- `docs/content/00_baseline_index.md` — frontmatter for all 12 units (id, titles, prerequisites, key concepts, key equations, interactive concept, Bagrut topics).
- `docs/content/{NN}_{unit}.md` — full content per `docs/content/_format_spec.md` for any unit marked **FULL**.

When working on a unit, read the unit's baseline file first. The schema in `_format_spec.md` defines every concept block, example block, misconception block, past Bagrut block, bilingual glossary, and the Arabic flag system (`✓` / `⚑` / `→ Sayakim`) used throughout.

### Currently authored (FULL)

- **Unit 01 · 1D Kinematics** — `docs/content/01_kinematics_1d.md`
- **Unit 03 · Newton's Laws & Dynamics** — `docs/content/03_newtons_laws.md` (the reference unit; use this as the structural template when deepening any other unit)

### Skeletons

Units 02, 04, 05, 06, 07, 08, 09, 10, 11, 12 — frontmatter present in `00_baseline_index.md`; full files to be authored per the build order below.

---

## 4. Curriculum-to-shaalon mapping

| Shaalon        | Weight | Covers units                                                                       |
| -------------- | ------ | ---------------------------------------------------------------------------------- |
| 037381         | 35%    | 01, 02, 03, 04, 05, 06, 08, 09, 10                                                 |
| 037382         | 35%    | 07, 11, 12                                                                         |
| Lab / Research | 30%    | Hands-on; not covered by Falak v1 (future: documentation of mandatory experiments) |

---

## 5. Build order (pedagogical, per baseline recommendation)

The build order from `docs/content/00_baseline_index.md`:

1. ✅ Unit 01 · 1D Kinematics (foundation)
2. ✅ Unit 03 · Newton's Laws (the central unit and structural reference)
3. Unit 02 · 2D Kinematics & Projectiles (visually demonstrative)
4. Unit 04 · Work, Energy, Power (depends on Newton)
5. Unit 05 · Momentum & Impulse (depends on Newton + Energy)
6. Unit 06 · Circular Motion & Gravitation (depends on Newton + Energy + Momentum)
7. Unit 07 · Oscillations (depends on Newton + Energy + Circular)
8. Unit 11 · Waves & Optics (depends on Oscillations)
9. Unit 08 · Electrostatics (independent enough to do early)
10. Unit 09 · DC Circuits (depends on Electrostatics)
11. Unit 10 · Magnetism (depends on Circuits + Electrostatics)
12. Unit 12 · Modern & Atomic (terminal — depends on most prior units)

The rationale is the same as the reference-implementation logic: tackle the central unit (03) early so the FBD-builder interactive — the most pedagogically ambitious — sets the bar for everything else.

---

## 6. Cross-cutting threads

These themes recur across multiple units. Reference these when building cross-unit summaries or the formula reference card (full list in `docs/content/00_baseline_index.md`):

- **Energy conservation** — Units 04, 05, 06, 07, 11, 12
- **Vector decomposition** — Units 02, 03, 06, 08, 10
- **Inverse-square laws** — Units 06 (gravity), 08 (Coulomb), 11 (sound intensity), 12 (radiation)
- **Wave behavior** — Units 07, 11, 12 (matter waves)
- **Conservation laws** — Energy (4–12), Momentum (5–12), Charge (8–10), Mass-energy (12)

---

## 7. External references

- Israeli Ministry of Education: <https://cms.education.gov.il/EducationCMS/Units/Mazkirut_Pedagogit/Phizika/>
- Weizmann Institute Physics Teachers Center (PTC): <https://ptc.weizmann.ac.il/>
- Sayakim Hebrew–Arabic–English Physics Dictionary (Ministry of Education) — contact PTC for current edition
- Campus IL free physics courses: <https://campus.gov.il/>
- Past Bagrut exams: Ministry of Education website and major tutoring platforms (Geva, Kidum, High-Q)
