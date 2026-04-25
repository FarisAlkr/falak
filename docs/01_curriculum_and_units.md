# Curriculum & Units

> **Source:** Israeli Ministry of Education 5-unit (5 יח״ל) physics Bagrut curriculum, as published by the Weizmann Institute's Physics Teachers Center and the Ministry of Education's pedagogical secretariat. Exam structure confirmed by Kidum and High-Q preparatory materials (2025 reference).

---

## 1. The Bagrut exam structure

The 5-unit (מוגבר / ارتفاع) physics Bagrut consists of four separate exam papers (שאלונים):

| Exam | Topic | Code | Duration | Weight |
|---|---|---|---|---|
| Mechanics | מכניקה | 036-361 | 2 hours | 30% |
| Electromagnetism | חשמל ומגנטיות | 036-371 | 2 hours | 25% |
| Radiation & Matter | קרינה וחומר | 036-282 | 2 hours | 30% |
| Laboratory | מעבדה / מעבדת חקר | — | 2.5 hours | 15% |

Each written exam presents the student with a set of questions; the student selects a subset and answers in depth with full derivations, diagrams, and reasoning.

---

## 2. The 14 Falak units

Falak organizes the curriculum into 14 units. Each maps to a specific segment of the Bagrut curriculum.

### SECTION A — Mechanics (Units 1–7)

| # | Unit ID | Arabic | Hebrew | English |
|---|---|---|---|---|
| 1 | `kinematics-1d` | الحركة في بُعد واحد | תנועה בציר אחד | 1D Kinematics |
| 2 | `kinematics-2d` | الحركة في بُعدين والمقذوفات | תנועה במישור וזריקות | 2D Motion & Projectiles |
| 3 | `newtons-laws` | قوانين نيوتن والديناميكا | חוקי ניוטון ודינמיקה | Newton's Laws & Dynamics |
| 4 | `work-energy` | العمل والطاقة والقدرة | עבודה, אנרגיה והספק | Work, Energy, Power |
| 5 | `momentum` | الزخم والدفع | תנע ומתקף | Momentum & Impulse |
| 6 | `circular-motion` | الحركة الدائرية | תנועה מעגלית | Circular Motion |
| 7 | `gravitation` | الجاذبية والحركة الهرمونية | גרביטציה ותנועה הרמונית | Gravitation & SHM |

### SECTION B — Electromagnetism (Units 8–10)

| # | Unit ID | Arabic | Hebrew | English |
|---|---|---|---|---|
| 8 | `electrostatics` | الكهروستاتيكا | אלקטרוסטטיקה | Electrostatics |
| 9 | `dc-circuits` | الدوائر الكهربائية | זרם חשמלי ומעגלים | DC Circuits |
| 10 | `magnetism` | المغناطيسية والحث | מגנטיות והשראה | Magnetism & Induction |

### SECTION C — Radiation & Matter (Units 11–14)

| # | Unit ID | Arabic | Hebrew | English |
|---|---|---|---|---|
| 11 | `geometric-optics` | البصريات الهندسية | אופטיקה גאומטרית | Geometric Optics |
| 12 | `physical-optics` | البصريات الفيزيائية والموجات | אופטיקה פיזיקלית וגלים | Physical Optics & Waves |
| 13 | `modern-physics` | الفيزياء الحديثة | פיזיקה מודרנית | Modern Physics |
| 14 | `atomic-nuclear` | الذرة والنواة | האטום והגרעין | Atomic & Nuclear |

---

## 3. Detailed unit specifications

Each unit below lists: **(1)** concepts to cover, **(2)** key equations, **(3)** bilingual vocabulary, **(4)** interactive simulation idea, **(5)** common misconceptions to address. Full per-unit specs live in `docs/units/*.md`.

### Unit 1 · 1D Kinematics

**Concepts:** Position, displacement vs distance, speed vs velocity, acceleration (including signed acceleration), uniform motion, uniformly accelerated motion, free fall.

**Key equations:**
$$v = v_0 + at \quad,\quad x = x_0 + v_0 t + \tfrac{1}{2}at^2$$
$$v^2 = v_0^2 + 2a\Delta x \quad,\quad \Delta x = \tfrac{1}{2}(v_0 + v)t$$

**Hebrew terms:** העתק, דרך, מהירות, תאוצה, נפילה חופשית, תנועה בתאוצה קבועה.

**Interactive:** "Motion Graphs" — given a v-t graph, student predicts x-t shape and then drags control points to construct it. Sim plays, ball moves per student's graph, shows if it matches target motion.

**Misconceptions:** Negative acceleration ≠ slowing down. Free-fall speed doesn't depend on mass.

---

### Unit 2 · 2D Motion & Projectiles

**Concepts:** Vectors in 2D, vector decomposition, independence of axes, projectile motion (horizontal launch, angled launch), range, max height, time of flight, relative motion.

**Key equations:**
$$x(t) = v_0 \cos\theta \cdot t \quad,\quad y(t) = v_0 \sin\theta \cdot t - \tfrac{1}{2}gt^2$$
$$R = \frac{v_0^2 \sin(2\theta)}{g} \quad,\quad H = \frac{v_0^2 \sin^2\theta}{2g}$$

**Hebrew terms:** וקטור, רכיבים, זריקה אופקית, זריקה בזווית, טווח, גובה מרבי, זמן מעוף, תנועה יחסית.

**Interactive:** "Projectile Target" — student sets angle and velocity to hit a moving target. Real physics with g = 9.8. Uses the existing Falak projectile prototype as the reference implementation.

**Misconceptions:** Horizontal and vertical motion are independent. Gravity doesn't "kick in" at the peak.

---

### Unit 3 · Newton's Laws & Dynamics

**Concepts:** Force as a vector, the four mechanical forces (weight, normal, tension, friction), Newton's three laws, free-body diagrams, equilibrium, inclined planes, connected masses, pulleys, friction (static vs kinetic).

**Key equations:**
$$\vec{F}_\text{net} = m\vec{a} \quad,\quad W = mg$$
$$f_s \leq \mu_s N \quad,\quad f_k = \mu_k N$$
$$N = mg\cos\theta \text{ (on incline)} \quad,\quad a_\parallel = g(\sin\theta - \mu_k\cos\theta)$$

**Hebrew terms:** כוח, מסה, משקל, כוח נורמלי, מתיחות, חיכוך סטטי, חיכוך קינטי, דיאגרמת כוחות, שיווי משקל, מישור משופע, גלגלת, מסות מחוברות.

**Interactive:** "FBD Builder" — student drags force arrows onto a diagrammed object (box on incline, pulley system, etc.). Sim runs Newton's 2nd law with the student's forces — correct FBD leads to correct motion, wrong forces lead to visibly wrong motion.

**Misconceptions:** "Force of motion" myth. 3rd-law pairs don't cancel. N ≠ mg on an incline.

---

### Unit 4 · Work, Energy, Power

**Concepts:** Work as a scalar product, kinetic energy, gravitational PE, elastic PE (springs), conservation of mechanical energy, non-conservative forces (friction), work-energy theorem, power.

**Key equations:**
$$W = \vec{F} \cdot \vec{d} = Fd\cos\theta \quad,\quad E_k = \tfrac{1}{2}mv^2$$
$$E_\text{grav} = mgh \quad,\quad E_\text{spring} = \tfrac{1}{2}kx^2$$
$$W_\text{net} = \Delta E_k \quad,\quad P = \frac{W}{\Delta t} = \vec{F} \cdot \vec{v}$$

**Hebrew terms:** עבודה, אנרגיה קינטית, אנרגיית פוטנציאל כבידתית, אנרגיית פוטנציאל אלסטית, שימור אנרגיה, הספק, קבוע הקפיץ, משפט עבודה-אנרגיה.

**Interactive:** "Energy Roller Coaster" — student designs a track with hills and valleys; the sim shows the cart's kinetic and potential energy at every point, live-updating bars. Student answers: "Will the cart make it over hill 3?"

**Misconceptions:** Work can be negative. PE depends on choice of zero-point (and that's OK). Friction converts KE to heat (not "destroys" energy).

---

### Unit 5 · Momentum & Impulse

**Concepts:** Momentum as $\vec{p} = m\vec{v}$, impulse as $\vec{J} = \vec{F}\Delta t = \Delta\vec{p}$, conservation of momentum, elastic vs inelastic collisions, 2D collisions, center of mass.

**Key equations:**
$$\vec{p} = m\vec{v} \quad,\quad \vec{J} = \int \vec{F}\, dt = \Delta\vec{p}$$
$$\sum \vec{p}_\text{before} = \sum \vec{p}_\text{after} \text{ (isolated system)}$$
$$\text{Elastic: } \sum E_k \text{ conserved}$$

**Hebrew terms:** תנע, מתקף, שימור תנע, התנגשות אלסטית, התנגשות פלסטית, מרכז מסה.

**Interactive:** "Collision Lab" — student sets masses and velocities of two pucks on an air table, predicts their post-collision velocities (for both elastic and perfectly inelastic cases), watches the sim, compares prediction to truth.

**Misconceptions:** Momentum is a vector (direction matters!). Kinetic energy is not conserved in inelastic collisions. "Action" and "reaction" produce equal momentum changes.

---

### Unit 6 · Circular Motion

**Concepts:** Uniform circular motion, angular velocity, period, centripetal acceleration, centripetal force (as requirement, not a new force), car on flat curve, car on banked curve, conical pendulum, vertical circular motion.

**Key equations:**
$$a_c = \frac{v^2}{r} = \omega^2 r \quad,\quad \omega = \frac{2\pi}{T} = 2\pi f$$
$$F_c = \frac{mv^2}{r} \text{ (net inward force required)}$$

**Hebrew terms:** תנועה מעגלית קצובה, מהירות זוויתית, מחזור, תדירות, תאוצה צנטריפטלית, כוח מרכזי, מסלול בנקה, מטוטלת חרוטית.

**Interactive:** "Orbit Control" — student pilots a ball on a string in a circle; must set string length and rotation rate to hit a target moment. Bonus: string breaks if tension exceeds limit (real physics).

**Misconceptions:** "Centrifugal force" doesn't exist in inertial frames. Centripetal force is a requirement provided by real forces (tension, gravity, normal, friction).

---

### Unit 7 · Gravitation & Simple Harmonic Motion

**Concepts:** Universal gravitation (Newton), gravitational field, orbital motion, Kepler's laws, escape velocity, simple harmonic motion (springs and pendulums), SHM energy, damping (qualitative).

**Key equations:**
$$F = G\frac{m_1 m_2}{r^2} \quad,\quad g = \frac{GM}{r^2}$$
$$T_\text{orbit}^2 = \frac{4\pi^2}{GM}r^3 \text{ (Kepler's 3rd)}$$
$$x(t) = A\cos(\omega t + \phi) \quad,\quad T_\text{spring} = 2\pi\sqrt{m/k}$$
$$T_\text{pendulum} = 2\pi\sqrt{L/g}$$

**Hebrew terms:** כבידה אוניברסלית, שדה כבידה, מסלול, חוקי קפלר, מהירות מילוט, תנועה הרמונית פשוטה, משרעת, מטוטלת מתמטית, קפיץ.

**Interactive:** "Orbit Designer" — student places a satellite at a distance from Earth and gives it initial velocity; sim runs Kepler's laws and shows whether orbit is stable, escapes, or crashes. Second mode: spring-mass system with energy graph.

**Misconceptions:** Satellites are in free fall (not "floating"). Gravity doesn't end at the atmosphere. A period of SHM doesn't depend on amplitude (for ideal pendulum).

---

### Unit 8 · Electrostatics

**Concepts:** Electric charge, Coulomb's law, electric field, field lines, superposition, electric potential, potential energy, capacitors, parallel plate capacitors, energy stored in capacitor, dielectrics (qualitative).

**Key equations:**
$$F = k\frac{q_1 q_2}{r^2} \quad,\quad \vec{E} = \frac{\vec{F}}{q}$$
$$V = \frac{kq}{r} \quad,\quad U = qV$$
$$C = \frac{Q}{V} \quad,\quad C_\text{parallel plate} = \frac{\varepsilon_0 A}{d}$$
$$E_\text{stored} = \tfrac{1}{2}CV^2$$

**Hebrew terms:** מטען חשמלי, חוק קולון, שדה חשמלי, קווי שדה, פוטנציאל חשמלי, מתח, קבל, קיבול, דיאלקטרי.

**Interactive:** "Field Mapper" — student places charges on a grid, predicts the field line pattern, then sim draws the real field lines. Second mode: build a capacitor with variable plate size/distance and see stored energy.

**Misconceptions:** Electric field exists even without a test charge. Field lines never cross. Potential is a scalar; field is a vector.

---

### Unit 9 · DC Circuits

**Concepts:** Electric current, voltage, resistance, Ohm's law, resistors in series/parallel, Kirchhoff's laws, EMF, internal resistance, electric power, energy and efficiency.

**Key equations:**
$$I = \frac{\Delta Q}{\Delta t} \quad,\quad V = IR$$
$$R_\text{series} = R_1 + R_2 + \cdots \quad,\quad \frac{1}{R_\text{parallel}} = \frac{1}{R_1} + \frac{1}{R_2} + \cdots$$
$$P = VI = I^2 R = \frac{V^2}{R}$$
$$\text{EMF: } \varepsilon = I(R + r) \text{ where } r = \text{internal resistance}$$

**Hebrew terms:** זרם, מתח, התנגדות, חוק אוהם, בטור/במקביל, חוקי קירכהוף, כוח אלקטרו-מניע, התנגדות פנימית, הספק חשמלי.

**Interactive:** "Circuit Builder" — drag resistors, batteries, switches onto a breadboard; student predicts currents and voltages, then sim runs Kirchhoff and shows the real values. Bulbs light up with correct brightness.

**Misconceptions:** Current is not "used up" by components. Voltage is a difference, not an amount at a point. Batteries provide constant EMF, not constant voltage (internal resistance matters).

---

### Unit 10 · Magnetism & Induction

**Concepts:** Magnetic field, force on moving charge (Lorentz), force on current-carrying wire, magnetic field of wire/loop/solenoid, Faraday's law, Lenz's law, induced EMF, transformers (qualitative).

**Key equations:**
$$\vec{F} = q\vec{v} \times \vec{B} \quad,\quad F = BIL\sin\theta$$
$$B_\text{wire} = \frac{\mu_0 I}{2\pi r} \quad,\quad B_\text{solenoid} = \mu_0 n I$$
$$\Phi_B = BA\cos\theta \quad,\quad \varepsilon = -\frac{d\Phi_B}{dt}$$

**Hebrew terms:** שדה מגנטי, כוח לורנץ, חוק פארדיי, חוק לנץ, שטף מגנטי, השראה, סליל, שנאי.

**Interactive:** "Magnetic Playground" — drop a charged particle into a magnetic field, set initial velocity, watch it spiral. Second mode: move a magnet through a coil, see induced current (Faraday/Lenz). Third mode: predict the polarity.

**Misconceptions:** Magnetic force does no work (perpendicular to velocity). Induced current opposes change, not just opposing the field. Flux, not field, is what Faraday cares about.

---

### Unit 11 · Geometric Optics

**Concepts:** Reflection, refraction, Snell's law, total internal reflection, thin lenses (converging, diverging), lens equation, magnification, image formation (real/virtual, upright/inverted), human eye, optical instruments (qualitative).

**Key equations:**
$$n_1 \sin\theta_1 = n_2 \sin\theta_2$$
$$\frac{1}{f} = \frac{1}{d_o} + \frac{1}{d_i} \quad,\quad M = -\frac{d_i}{d_o} = \frac{h_i}{h_o}$$
$$\sin\theta_c = \frac{n_2}{n_1} \text{ (total internal reflection)}$$

**Hebrew terms:** החזרה, שבירה, חוק סנל, החזרה פנימית מלאה, עדשה מרכזת, עדשה מפזרת, מרחק מוקד, הגדלה, דמות ממשית, דמות מדומה.

**Interactive:** "Lens Lab" — student places an object at a given distance from a lens, predicts image distance and size, sim traces rays and shows the image. Works for both lens types and all object positions.

**Misconceptions:** Virtual images ARE real things you can see. Light doesn't speed up in vacuum relative to itself. Focal point is a property of the lens, not the object.

---

### Unit 12 · Physical Optics & Waves

**Concepts:** Wave properties (wavelength, frequency, period, amplitude, phase), superposition, interference (constructive/destructive), Young's double-slit, diffraction (single slit), thin films, standing waves (strings and tubes).

**Key equations:**
$$v = f\lambda$$
$$\text{Double slit: } d\sin\theta = m\lambda \text{ (maxima)}$$
$$\text{Single slit: } a\sin\theta = m\lambda \text{ (minima)}$$
$$\text{Standing wave (string): } f_n = \frac{nv}{2L}$$

**Hebrew terms:** אורך גל, תדירות, משרעת, הפרש מופע, התאבכות בונה/הורסת, סדק כפול, עקיפה, גלים עומדים.

**Interactive:** "Interference Tank" — two coherent sources, student sets frequency and separation, predicts where nodes/antinodes will be, sim shows the interference pattern. Second mode: standing waves on a string with variable tension.

**Misconceptions:** Waves transfer energy, not matter. Interference is not about waves "bumping." Diffraction increases with smaller openings (counter-intuitive for many students).

---

### Unit 13 · Modern Physics

**Concepts:** Photoelectric effect, photon energy, wave-particle duality, de Broglie wavelength, quantization of energy, Compton effect (qualitative), special relativity introduction (time dilation, length contraction, mass-energy) *[note: relativity depth depends on current syllabus version — confirm]*.

**Key equations:**
$$E_\text{photon} = hf = \frac{hc}{\lambda}$$
$$KE_\text{max} = hf - \phi \text{ (photoelectric)}$$
$$\lambda_\text{de Broglie} = \frac{h}{p}$$
$$E = mc^2$$

**Hebrew terms:** אפקט פוטואלקטרי, פוטון, אורך גל דה-ברולי, קוונט, תורת היחסות, הילוך אישי, התכווצות אורך.

**Interactive:** "Photon Collider" — student sets photon wavelength, sim shows whether electrons are emitted from a given metal (with its work function). Graph KE_max vs frequency. Second mode: de Broglie wavelength calculator for fast particles.

**Misconceptions:** Photons are both particle and wave (don't pick sides). Work function is a property of the metal. More intense light ≠ more energetic photons.

---

### Unit 14 · Atomic & Nuclear

**Concepts:** Bohr model of hydrogen atom, atomic spectra (emission/absorption), energy levels, hydrogen transitions (Lyman, Balmer series), nuclear composition, isotopes, radioactive decay (α, β, γ), half-life, nuclear reactions, mass defect and binding energy, fission/fusion (qualitative).

**Key equations:**
$$E_n = -\frac{13.6\text{ eV}}{n^2} \text{ (hydrogen)}$$
$$hf = E_n - E_m \text{ (transition)}$$
$$N(t) = N_0 e^{-\lambda t} \quad,\quad T_{1/2} = \frac{\ln 2}{\lambda}$$
$$E = \Delta m \cdot c^2 \text{ (binding energy)}$$

**Hebrew terms:** מודל בוהר, רמות אנרגיה, ספקטרום, סדרת באלמר, סדרת ליימן, איזוטופ, דעיכה רדיואקטיבית, זמן מחצית חיים, מעברים גרעיניים, אנרגיית קשר, ביקוע, היתוך.

**Interactive:** "Atomic Transitions" — student selects an initial and final energy level for hydrogen; sim shows the emitted photon's wavelength and color on the spectrum. Second mode: radioactive decay simulator (shows N atoms decaying over time, student estimates half-life).

**Misconceptions:** Bohr model is wrong (but useful). Electrons don't "orbit" in the classical sense. α/β particles are physical; γ is EM wave. Half-life is a property, not a function of how much you start with.

---

## 4. Curriculum-to-exam mapping

| Bagrut exam | Covers units |
|---|---|
| Mechanics (30%) | 1, 2, 3, 4, 5, 6, 7 |
| Electromagnetism (25%) | 8, 9, 10 |
| Radiation & Matter (30%) | 11, 12, 13, 14 |
| Lab (15%) | Hands-on — not covered by Falak directly (future: documentation of mandatory experiments) |

## 5. Build priority (pedagogical order)

For the reference implementation and rollout, build in this order:

1. **Unit 3 (Newton's Laws)** — most foundational, connects to everything
2. **Unit 1 (1D Kinematics)** — basic vocabulary of motion
3. **Unit 2 (2D Motion & Projectiles)** — already has a prototype in the repo
4. **Unit 4 (Work & Energy)** — pivotal for everything downstream
5. **Unit 9 (DC Circuits)** — very high-yield on the exam
6. Remaining units — in curriculum order

This order means the reference implementation (Unit 3) tackles the hardest case first (FBD interactive is the most pedagogically ambitious), ensuring all subsequent units are easier.

## 6. External references

- Israeli Ministry of Education: https://cms.education.gov.il/EducationCMS/Units/Mazkirut_Pedagogit/Phizika/
- Weizmann Institute Physics Teachers Center: https://ptc.weizmann.ac.il/
- Campus IL free physics courses: https://campus.gov.il/
- Past Bagrut exams: accessible via Ministry of Education website and major tutoring platforms (Geva, Kidum, High-Q)
