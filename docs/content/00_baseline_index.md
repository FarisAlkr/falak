# Falak Content Baseline · Index

> The complete map of the platform. All 12 units in skeleton form.
> Two units (01 Kinematics 1D, 03 Newton's Laws) have full content in their dedicated files.
> The other 10 are skeletons — Claude Code will deepen them one by one using Newton's as the template.

---

## Curriculum framing (per Ministry of Education research, 2026)

Israel's 5-unit physics Bagrut consists of two written exams (שאלונים):

- **Shaalon 037381** — Mechanics + Electromagnetism (5-hour exam)
- **Shaalon 037382** — Waves, Optics + Modern Physics (5-hour exam)
- **Lab component** — 30% of final grade (research project alternative available)

A **2027 reform** is approaching. Falak v1 targets the **current curriculum** (valid through 2027). A migration plan for the reform is documented separately.

---

## The 12 units

```yaml
total_units: 12
total_classroom_hours_estimated: 192
shaalon_distribution:
  - shaalon: 037381
    units: [01, 02, 03, 04, 05, 06, 07, 08, 09]
    domain: 'Mechanics + Electromagnetism'
  - shaalon: 037382
    units: [10, 11, 12]
    domain: 'Waves, Optics + Modern Physics'
```

| #   | Unit                          | Domain           | Shaalon | Hours | Status   |
| --- | ----------------------------- | ---------------- | ------- | ----- | -------- |
| 01  | 1D Kinematics                 | Mechanics        | 037381  | 12    | **FULL** |
| 02  | 2D Kinematics & Projectiles   | Mechanics        | 037381  | 14    | skeleton |
| 03  | Newton's Laws & Dynamics      | Mechanics        | 037381  | 18    | **FULL** |
| 04  | Work, Energy, Power           | Mechanics        | 037381  | 16    | skeleton |
| 05  | Momentum & Impulse            | Mechanics        | 037381  | 14    | skeleton |
| 06  | Circular Motion & Gravitation | Mechanics        | 037381  | 18    | skeleton |
| 07  | Oscillations (SHM)            | Waves            | 037382  | 12    | skeleton |
| 08  | Electrostatics                | Electromagnetism | 037381  | 16    | skeleton |
| 09  | DC Circuits                   | Electromagnetism | 037381  | 18    | skeleton |
| 10  | Magnetism & Induction         | Electromagnetism | 037381  | 16    | skeleton |
| 11  | Waves & Optics                | Waves/Optics     | 037382  | 20    | skeleton |
| 12  | Modern & Atomic Physics       | Modern           | 037382  | 18    | skeleton |

> **Note on changes from prior 14-unit structure:** Gravitation merged with Circular Motion (Unit 06). Modern Physics merged with Atomic & Nuclear (Unit 12). Geometric and Physical Optics merged into a single Waves & Optics unit (Unit 11). This aligns with the actual Israeli curriculum where these topics are taught together rather than separately.

---

## Unit 01 · 1D Kinematics

```yaml
unit:
  id: kinematics-1d
  number: '01'
  domain: mechanics
  bagrut_shaalon: '037381'
  hours_estimated: 12
  status: FULL_CONTENT
  file: 01_kinematics_1d.md

titles:
  ar: الحركة في بُعد واحد
  he: תנועה בציר אחד
  en: 1D Kinematics

prerequisites:
  - basic-algebra
  - graph-reading

leads_to:
  - kinematics-2d
  - newtons-laws

key_concepts:
  - position-displacement
  - velocity-instantaneous-vs-average
  - acceleration-constant
  - kinematic-equations
  - free-fall
  - graphs-position-time
  - graphs-velocity-time
  - graphs-acceleration-time

interactive_concept: 'Motion graph matching — student adjusts position-time graph, system shows resulting v-t and a-t'
```

> See `01_kinematics_1d.md` for full content.

---

## Unit 02 · 2D Kinematics & Projectiles

```yaml
unit:
  id: kinematics-2d
  number: '02'
  domain: mechanics
  bagrut_shaalon: '037381'
  hours_estimated: 14
  status: SKELETON

titles:
  ar: الحركة في بُعدين والمقذوفات
  he: תנועה בשני צירים וזריקות
  en: 2D Kinematics & Projectiles

prerequisites:
  - kinematics-1d
  - vectors-basics
  - trigonometry

leads_to:
  - newtons-laws
  - circular-motion

key_concepts:
  - vectors-position-velocity-2d
  - independence-of-perpendicular-motion
  - projectile-motion-decomposition
  - range-time-of-flight-max-height
  - projectile-from-height
  - relative-velocity

interactive_concept: 'Projectile launcher with target — student adjusts angle and velocity to hit moving targets'

key_equations:
  - id: range-equal-height
    formula: "R = \\frac{v_0^2 \\sin 2\\theta}{g}"
    plain: 'Range when launch height equals landing height'
  - id: max-height
    formula: "H = \\frac{v_0^2 \\sin^2\\theta}{2g}"
    plain: 'Maximum height of projectile'
  - id: time-of-flight
    formula: "T = \\frac{2 v_0 \\sin\\theta}{g}"
    plain: 'Total time of flight'
  - id: trajectory
    formula: "y(x) = x\\tan\\theta - \\frac{g x^2}{2 v_0^2 \\cos^2\\theta}"
    plain: 'Parabolic trajectory equation'

bagrut_topics:
  - 'Projectile from cliff (different launch and landing heights)'
  - 'Target hit problem (find angle/velocity)'
  - 'Two-projectile collision problems'
```

---

## Unit 03 · Newton's Laws & Dynamics

```yaml
unit:
  id: newtons-laws
  number: '03'
  domain: mechanics
  bagrut_shaalon: '037381'
  hours_estimated: 18
  status: FULL_CONTENT
  file: 03_newtons_laws.md

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
```

> See `03_newtons_laws.md` for full content.

---

## Unit 04 · Work, Energy, Power

```yaml
unit:
  id: work-energy
  number: '04'
  domain: mechanics
  bagrut_shaalon: '037381'
  hours_estimated: 16
  status: SKELETON

titles:
  ar: الشغل والطاقة والقدرة
  he: עבודה, אנרגיה והספק
  en: Work, Energy, Power

prerequisites:
  - newtons-laws
  - kinematics-1d

leads_to:
  - momentum
  - oscillations
  - electrostatics

key_concepts:
  - work-definition-dot-product
  - work-by-constant-force
  - work-by-variable-force-graph
  - kinetic-energy
  - work-energy-theorem
  - potential-energy-gravitational
  - potential-energy-spring
  - conservation-mechanical-energy
  - power-instantaneous-and-average
  - work-by-friction-energy-loss
  - conservative-vs-non-conservative-forces

interactive_concept: 'Energy track — student designs a roller-coaster track, system shows KE/PE/total energy at each point with friction toggle'

key_equations:
  - id: work
    formula: "W = \\vec{F} \\cdot \\vec{d} = Fd\\cos\\theta"
  - id: kinetic-energy
    formula: "K = \\tfrac{1}{2}mv^2"
  - id: work-energy-theorem
    formula: "W_{net} = \\Delta K"
  - id: gravitational-pe
    formula: 'U_g = mgh'
  - id: spring-pe
    formula: "U_s = \\tfrac{1}{2}kx^2"
  - id: power
    formula: "P = \\frac{dW}{dt} = \\vec{F}\\cdot\\vec{v}"

bagrut_topics:
  - 'Block sliding down incline with friction — find speed at bottom'
  - 'Spring + mass + ramp combination problems'
  - 'Power required to lift / accelerate'
  - 'Work-energy theorem with multiple forces'
```

---

## Unit 05 · Momentum & Impulse

```yaml
unit:
  id: momentum
  number: '05'
  domain: mechanics
  bagrut_shaalon: '037381'
  hours_estimated: 14
  status: SKELETON

titles:
  ar: الزخم والدفع
  he: תנע ומתקף
  en: Momentum & Impulse

prerequisites:
  - newtons-laws
  - work-energy

leads_to:
  - circular-motion

key_concepts:
  - momentum-vector-definition
  - impulse-force-times-time
  - impulse-momentum-theorem
  - conservation-of-momentum-isolated-system
  - elastic-vs-inelastic-collisions
  - 1d-collision-analysis
  - 2d-collision-analysis
  - center-of-mass
  - explosion-and-recoil

interactive_concept: 'Collision lab — two carts on a track, student sets masses and initial velocities, sees momentum + KE conservation in real time'

key_equations:
  - id: momentum
    formula: "\\vec{p} = m\\vec{v}"
  - id: impulse
    formula: "\\vec{J} = \\vec{F}\\Delta t = \\Delta\\vec{p}"
  - id: conservation
    formula: "\\sum \\vec{p}_{before} = \\sum \\vec{p}_{after}"
  - id: elastic-1d
    formula: "v_1' = \\frac{m_1-m_2}{m_1+m_2}v_1 + \\frac{2m_2}{m_1+m_2}v_2"

bagrut_topics:
  - 'Ballistic pendulum'
  - 'Two-cart collision (elastic and inelastic)'
  - 'Recoil of gun'
  - 'Explosions splitting masses'
  - 'Combined momentum + energy problems'
```

---

## Unit 06 · Circular Motion & Gravitation

```yaml
unit:
  id: circular-motion
  number: '06'
  domain: mechanics
  bagrut_shaalon: '037381'
  hours_estimated: 18
  status: SKELETON

titles:
  ar: الحركة الدائريّة والجاذبيّة
  he: תנועה מעגלית וגרביטציה
  en: Circular Motion & Gravitation

prerequisites:
  - newtons-laws
  - work-energy

leads_to:
  - oscillations

key_concepts:
  - uniform-circular-motion
  - period-frequency-angular-velocity
  - centripetal-acceleration
  - centripetal-force-not-a-real-force
  - banked-curves
  - vertical-circles
  - newton-universal-gravitation
  - kepler-laws
  - orbital-velocity
  - gravitational-potential-energy-orbit
  - escape-velocity
  - geostationary-orbit

interactive_concept: 'Orbit designer — student sets initial position and velocity of a satellite, watches resulting orbit (real Newtonian gravity, no shortcuts)'

key_equations:
  - id: centripetal-acceleration
    formula: "a_c = \\frac{v^2}{r} = \\omega^2 r"
  - id: centripetal-force
    formula: "F_c = \\frac{mv^2}{r}"
  - id: universal-gravitation
    formula: "F = G\\frac{m_1 m_2}{r^2}"
  - id: orbital-velocity
    formula: "v_{orbit} = \\sqrt{\\frac{GM}{r}}"
  - id: kepler-third
    formula: "T^2 = \\frac{4\\pi^2}{GM}r^3"
  - id: escape-velocity
    formula: "v_{esc} = \\sqrt{\\frac{2GM}{r}}"

bagrut_topics:
  - 'Car on banked curve'
  - 'Satellite orbit calculations'
  - 'Conical pendulum'
  - 'Loop-the-loop minimum speed at top'
  - 'Two-body gravitational problems'
```

---

## Unit 07 · Oscillations (SHM)

```yaml
unit:
  id: oscillations
  number: '07'
  domain: waves
  bagrut_shaalon: '037382'
  hours_estimated: 12
  status: SKELETON

titles:
  ar: الاهتزازات والحركة التوافقيّة
  he: תנודות ותנועה הרמונית
  en: Oscillations & Simple Harmonic Motion

prerequisites:
  - newtons-laws
  - work-energy
  - circular-motion

leads_to:
  - waves-optics

key_concepts:
  - shm-definition-restoring-force
  - mass-spring-system
  - simple-pendulum-small-angle
  - period-frequency-amplitude
  - position-velocity-acceleration-shm
  - energy-in-shm
  - shm-as-projection-of-circular-motion
  - damped-oscillation-qualitative
  - resonance-qualitative

interactive_concept: 'Spring-mass-pendulum lab — toggle between mass-spring and pendulum, see x(t), v(t), a(t), KE(t), PE(t) graphs in real time'

key_equations:
  - id: hookes-law
    formula: 'F = -kx'
  - id: spring-period
    formula: "T = 2\\pi\\sqrt{m/k}"
  - id: pendulum-period
    formula: "T = 2\\pi\\sqrt{L/g}"
  - id: shm-position
    formula: "x(t) = A\\cos(\\omega t + \\phi)"
  - id: shm-energy
    formula: "E = \\tfrac{1}{2}kA^2"

bagrut_topics:
  - 'Spring on incline'
  - 'Compound spring systems (series and parallel)'
  - 'Pendulum period changes with length / location'
  - 'Energy exchange in oscillation'
```

---

## Unit 08 · Electrostatics

```yaml
unit:
  id: electrostatics
  number: '08'
  domain: electromagnetism
  bagrut_shaalon: '037381'
  hours_estimated: 16
  status: SKELETON

titles:
  ar: الكهروستاتيكا
  he: אלקטרוסטטיקה
  en: Electrostatics

prerequisites:
  - newtons-laws
  - work-energy
  - vectors-basics

leads_to:
  - circuits
  - magnetism

key_concepts:
  - charge-quantization-conservation
  - coulombs-law
  - electric-field-from-point-charge
  - superposition-of-fields
  - field-lines-visualization
  - electric-potential
  - potential-difference-voltage
  - work-done-by-electric-field
  - capacitance-parallel-plate
  - energy-stored-in-capacitor
  - charge-in-uniform-field-trajectory

interactive_concept: 'Field mapper — student places point charges on a grid, sees field lines and equipotential lines update live; can drop a test charge and watch its trajectory'

key_equations:
  - id: coulombs-law
    formula: "F = k\\frac{q_1 q_2}{r^2}"
  - id: electric-field
    formula: "\\vec{E} = \\frac{\\vec{F}}{q}"
  - id: field-of-point
    formula: "E = k\\frac{Q}{r^2}"
  - id: potential-of-point
    formula: "V = k\\frac{Q}{r}"
  - id: work-electric
    formula: "W = q\\Delta V"
  - id: capacitance
    formula: "C = \\frac{Q}{V}"
  - id: capacitor-energy
    formula: "U = \\tfrac{1}{2}CV^2"
  - id: parallel-plate
    formula: "E = \\frac{V}{d}"

bagrut_topics:
  - 'Two-charge equilibrium problems'
  - 'Charged particle deflection in parallel plates'
  - 'Capacitor charge/energy problems'
  - 'Field/potential at a point from multiple charges'
```

---

## Unit 09 · DC Circuits

```yaml
unit:
  id: circuits
  number: '09'
  domain: electromagnetism
  bagrut_shaalon: '037381'
  hours_estimated: 18
  status: SKELETON

titles:
  ar: الدوائر الكهربائيّة
  he: מעגלים חשמליים
  en: DC Circuits

prerequisites:
  - electrostatics

leads_to:
  - magnetism

key_concepts:
  - current-as-charge-flow
  - ohms-law
  - resistors-in-series
  - resistors-in-parallel
  - power-dissipated
  - emf-and-internal-resistance
  - kirchhoffs-current-law
  - kirchhoffs-voltage-law
  - rc-circuit-charging
  - rc-circuit-discharging-qualitative
  - measurement-ammeter-voltmeter

interactive_concept: 'Circuit builder — drag-and-drop resistors, batteries, switches, capacitors; live simulation shows current through each branch and voltage across each component'

key_equations:
  - id: current
    formula: "I = \\frac{\\Delta Q}{\\Delta t}"
  - id: ohms-law
    formula: 'V = IR'
  - id: power
    formula: "P = VI = I^2 R = \\frac{V^2}{R}"
  - id: series
    formula: "R_{eq} = R_1 + R_2 + \\cdots"
  - id: parallel
    formula: "\\frac{1}{R_{eq}} = \\frac{1}{R_1} + \\frac{1}{R_2} + \\cdots"
  - id: emf
    formula: "V_{terminal} = \\varepsilon - Ir"

bagrut_topics:
  - 'Mixed series-parallel networks'
  - 'Battery internal resistance problems'
  - 'Power dissipation and efficiency'
  - 'RC charging time constants (qualitative)'
  - 'Real-instrument circuits (ammeter as small R, voltmeter as large R)'
```

---

## Unit 10 · Magnetism & Induction

```yaml
unit:
  id: magnetism
  number: '10'
  domain: electromagnetism
  bagrut_shaalon: '037381'
  hours_estimated: 16
  status: SKELETON

titles:
  ar: المغناطيسيّة والحثّ
  he: מגנטיות והשראה
  en: Magnetism & Induction

prerequisites:
  - electrostatics
  - circuits
  - vectors-basics

leads_to:
  - waves-optics # for light as EM wave

key_concepts:
  - magnetic-field-vector
  - force-on-moving-charge-lorentz
  - circular-motion-in-magnetic-field
  - velocity-selector
  - mass-spectrometer
  - force-on-current-carrying-wire
  - magnetic-field-from-current-wire
  - magnetic-field-from-loop-and-solenoid
  - magnetic-flux
  - faradays-law
  - lenzs-law
  - induced-emf
  - ac-generation-qualitative
  - transformers-qualitative

interactive_concept: 'Field-and-current playground — student manipulates current loops, magnets, and moving charges; sees force vectors and induced currents live'

key_equations:
  - id: lorentz-force
    formula: "\\vec{F} = q\\vec{v}\\times\\vec{B}"
  - id: lorentz-magnitude
    formula: "F = qvB\\sin\\theta"
  - id: force-on-wire
    formula: "F = BIL\\sin\\theta"
  - id: field-of-wire
    formula: "B = \\frac{\\mu_0 I}{2\\pi r}"
  - id: field-of-solenoid
    formula: "B = \\mu_0 n I"
  - id: magnetic-flux
    formula: "\\Phi_B = \\vec{B}\\cdot\\vec{A} = BA\\cos\\theta"
  - id: faradays-law
    formula: "\\varepsilon = -\\frac{d\\Phi_B}{dt}"

bagrut_topics:
  - 'Charged particle in crossed E and B fields'
  - 'Mass spectrometer calculations'
  - 'Force between parallel wires'
  - 'Rod sliding on rails (motional EMF)'
  - 'Loop entering / leaving uniform B field'
  - "Faraday's law with changing flux"
```

---

## Unit 11 · Waves & Optics

```yaml
unit:
  id: waves-optics
  number: '11'
  domain: waves-optics
  bagrut_shaalon: '037382'
  hours_estimated: 20
  status: SKELETON

titles:
  ar: الموجات والبصريّات
  he: גלים ואופטיקה
  en: Waves & Optics

prerequisites:
  - oscillations
  - magnetism # for EM waves

leads_to:
  - modern-atomic

key_concepts:
  - wave-fundamentals-amplitude-period-wavelength
  - wave-equation-v-equals-f-lambda
  - transverse-vs-longitudinal
  - reflection-and-refraction-snells-law
  - total-internal-reflection
  - critical-angle
  - mirrors-flat-and-curved
  - thin-lens-equation
  - magnification
  - real-vs-virtual-images
  - wave-superposition
  - interference-constructive-destructive
  - double-slit
  - diffraction-single-slit
  - diffraction-grating
  - thin-films
  - polarization-qualitative
  - electromagnetic-spectrum
  - doppler-effect

interactive_concept: 'Optics bench — student builds lens systems, ray-traces interactively; AND wave tank — shows two-source interference with adjustable parameters'

key_equations:
  - id: wave-equation
    formula: "v = f\\lambda"
  - id: snells-law
    formula: "n_1\\sin\\theta_1 = n_2\\sin\\theta_2"
  - id: critical-angle
    formula: "\\sin\\theta_c = \\frac{n_2}{n_1}"
  - id: thin-lens
    formula: "\\frac{1}{f} = \\frac{1}{u} + \\frac{1}{v}"
  - id: magnification
    formula: "M = -\\frac{v}{u} = \\frac{h'}{h}"
  - id: double-slit-bright
    formula: "d\\sin\\theta = m\\lambda"
  - id: double-slit-dark
    formula: "d\\sin\\theta = (m+\\tfrac{1}{2})\\lambda"
  - id: single-slit-dark
    formula: "a\\sin\\theta = m\\lambda"

bagrut_topics:
  - "Snell's law with multiple interfaces"
  - 'Image formation by thin lens (drawing + calculation)'
  - 'Double-slit fringe spacing'
  - 'Single-slit diffraction pattern'
  - 'Combinations of lenses (telescope/microscope)'
  - 'Total internal reflection problems'
```

---

## Unit 12 · Modern & Atomic Physics

```yaml
unit:
  id: modern-atomic
  number: '12'
  domain: modern-atomic
  bagrut_shaalon: '037382'
  hours_estimated: 18
  status: SKELETON

titles:
  ar: الفيزياء الحديثة والذرّيّة
  he: פיזיקה מודרנית ופיזיקת האטום
  en: Modern & Atomic Physics

prerequisites:
  - waves-optics
  - work-energy
  - electrostatics

leads_to: [] # terminal unit

key_concepts:
  - photoelectric-effect
  - photon-energy-e-h-f
  - work-function
  - stopping-potential
  - de-broglie-wavelength
  - wave-particle-duality
  - bohr-model-of-hydrogen
  - energy-level-diagrams
  - hydrogen-spectral-lines
  - emission-vs-absorption-spectra
  - atomic-nucleus-structure
  - mass-number-atomic-number
  - radioactive-decay-alpha-beta-gamma
  - half-life
  - mass-energy-equivalence-e-mc2
  - binding-energy
  - nuclear-reactions-fusion-fission

interactive_concept: 'Photoelectric simulator (PhET-style) — adjust frequency and intensity of light, see ejected electrons and stopping potential; AND energy-level diagram explorer for hydrogen'

key_equations:
  - id: photon-energy
    formula: "E = hf = \\frac{hc}{\\lambda}"
  - id: photoelectric
    formula: "K_{max} = hf - \\phi"
  - id: stopping-potential
    formula: 'eV_s = K_{max}'
  - id: de-broglie
    formula: "\\lambda = \\frac{h}{p}"
  - id: hydrogen-energy
    formula: "E_n = -\\frac{13.6}{n^2}\\text{ eV}"
  - id: emission
    formula: 'hf = E_i - E_f'
  - id: half-life
    formula: "N(t) = N_0 \\left(\\tfrac{1}{2}\\right)^{t/T_{1/2}}"
  - id: mass-energy
    formula: 'E = mc^2'

bagrut_topics:
  - 'Photoelectric effect calculations'
  - 'Compton scattering (qualitative)'
  - 'de Broglie wavelength for various particles'
  - 'Hydrogen spectrum line calculations'
  - 'Half-life decay calculations'
  - 'Mass defect and binding energy'
```

---

## Status legend

- **FULL** — `docs/content/{NN}_{unit}.md` contains complete content per format spec
- **skeleton** — listed here in this index, but no dedicated file yet
- **DRAFTING** — file exists but content is incomplete

---

## Build order recommendation

If Claude Code or the project owner wants to deepen unit content beyond Newton's Laws and 1D Kinematics, the recommended order is:

1. ✅ Unit 01 · 1D Kinematics (foundation)
2. ✅ Unit 03 · Newton's Laws (the central unit)
3. Unit 02 · 2D Kinematics & Projectiles (visually demonstrative)
4. Unit 04 · Work, Energy, Power (depends on Newton)
5. Unit 05 · Momentum (depends on Newton + Energy)
6. Unit 06 · Circular Motion & Gravitation (depends on Newton + Energy + Momentum)
7. Unit 07 · Oscillations (depends on Newton + Energy + Circular)
8. Unit 11 · Waves & Optics (depends on Oscillations)
9. Unit 08 · Electrostatics (independent enough to do early)
10. Unit 09 · DC Circuits (depends on Electrostatics)
11. Unit 10 · Magnetism (depends on Circuits + Electrostatics)
12. Unit 12 · Modern & Atomic (terminal — depends on most prior units)

---

## Cross-cutting threads

These themes recur across multiple units. Claude Code should reference these when building cross-unit summaries or the formula reference card:

- **Energy conservation** — Units 04, 05, 06, 07, 11, 12
- **Vector decomposition** — Units 02, 03, 06, 08, 10
- **Inverse-square laws** — Units 06 (gravity), 08 (Coulomb), 11 (sound intensity), 12 (radiation)
- **Wave behavior** — Units 07, 11, 12 (matter waves)
- **Conservation laws** — Energy (4-12), Momentum (5-12), Charge (8-10), Mass-energy (12)

---

## What goes into Sayakim-aligned terminology

The Ministry of Education's Sayakim project provides the official Hebrew–Arabic–English physics dictionary. Falak's bilingual glossaries should align with Sayakim. Unit files include a glossary section where each term has a status:

- **→ Sayakim** — pulled directly from Sayakim, authoritative
- **✓** — confirmed standard physics terminology
- **⚑** — best-effort draft, needs native-speaker review

Sayakim access: contact PTC (Weizmann Institute Physics Teachers Center) for the most current dictionary.
