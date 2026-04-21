# Interactive Patterns

> Design patterns for the simulation/game in each unit.
> Every interactive must follow the universal structure and adopt (or consciously deviate from) the per-unit pattern.

---

## Universal structure (all interactives)

Every interactive, regardless of unit, follows this 6-part structure:

```
┌──────────────────────────────────────────────────────┐
│  PROBLEM STATEMENT                                    │
│  Arabic problem. Hebrew terms inline. Visual hint.    │
└──────────────────────────────────────────────────────┘
┌──────────────────────────────────────────────────────┐
│  SIMULATION CANVAS                                    │
│  SVG or canvas. Shows the scenario, any preview,      │
│  and the simulation when fired.                       │
└──────────────────────────────────────────────────────┘
┌───────────────────────┐  ┌───────────────────────────┐
│  CONTROLS             │  │  LIVE READOUT             │
│  Sliders, inputs,     │  │  Computed values          │
│  drag targets.        │  │  (velocity, force, etc.)  │
│                       │  │  Updates as student       │
│  [PLAY] button        │  │  adjusts controls.        │
└───────────────────────┘  └───────────────────────────┘
┌──────────────────────────────────────────────────────┐
│  RESULT (appears after play)                          │
│  Success banner, failure banner with Arabic hint.     │
│  "Next problem" or "Try again" button.                │
└──────────────────────────────────────────────────────┘
```

---

## Universal rules

These rules apply to EVERY interactive. No exceptions.

1. **Real physics.** The simulation is driven by the same equations the student is learning. If they're right, it succeeds. If they're wrong, it fails — visibly.
2. **Live readout.** Show computed physical quantities as controls change. This makes the formula tangible.
3. **Preview before commit.** Dashed trajectory / ghost FBD / expected field pattern shows what WILL happen before the student presses play.
4. **Arabic hints on failure.** One line. Direction of adjustment, never the answer itself.
5. **Difficulty ramp.** Problems get harder as streak grows (smaller targets, more constraints, less forgiving tolerances).
6. **Persistent streak.** Best streak saves to IndexedDB and greets the student next session.
7. **60 fps.** Tune simulation dt and rendering so it's smooth on a 5-year-old laptop.
8. **Keyboard accessible.** Every control has a keyboard alternative. Space plays. Arrow keys tune sliders.
9. **RTL-aware.** Arabic text RTL. Numbers and equations LTR. No broken layouts when switching.
10. **Pedagogically transparent.** After a success, a micro-explanation shows WHY the answer worked.

---

## Per-unit interactive patterns

### Pattern 1 · Graph matching (Unit 1)
**Concept taught:** Relating v-t, x-t, a-t graphs

**UX:** Student sees a target x-t graph. They build the matching v-t graph by placing 4–6 control points. On play, a ball animates along the motion their graph describes, and they see if it matches the target.

**Controls:** Drag points on an empty v-t grid.

**Live readout:** Max velocity, min velocity, intervals of acceleration (sign), total displacement so far.

**Win condition:** The generated x-t graph overlaps the target within tolerance.

**Failure hint:** "الجسم تحرّك بعيدًا جدًا — قلّل السرعة في المقطع الثاني." ("The object moved too far — reduce velocity in the second segment.")

---

### Pattern 2 · Projectile target (Unit 2)
**Concept taught:** Projectile motion, angle/velocity relationship

**UX:** Student aims a cannon at a target. Adjusts angle and velocity. Dashed preview shows predicted trajectory. Presses fire. Projectile flies with real physics.

**Controls:** Angle slider (10°–85°), velocity slider (10–45 m/s).

**Live readout:** vₓ, vᵧ, predicted range, predicted max height.

**Win condition:** Projectile lands within target radius.

**Difficulty ramp:** Target smaller, further, and moving as streak grows. Then add obstacles. Then add wind.

**Failure hint:** "قصير — زِد السرعة أو ارفع الزاوية قليلًا." ("Short — increase velocity or raise angle slightly.")

*(This is the existing prototype. Use it as the reference implementation for other interactives.)*

---

### Pattern 3 · FBD Builder (Unit 3) ★ MOST IMPORTANT
**Concept taught:** Free-body diagrams, Newton's 2nd law application

**UX:** Student sees a scenario (block on incline, pulley system, stacked masses, etc.). They drag force arrows onto the body from a palette: weight, normal, tension, friction, applied force. Each force has adjustable magnitude.

On play, the simulation uses the student's FBD (not the real one) to compute acceleration via F = ma and animates the object. If the FBD is correct, motion matches reality. If not, the object moves wrong — maybe flies off, maybe stays stuck, maybe moves in the wrong direction.

**Controls:** Drag force arrows from palette. Adjust magnitude via slider when arrow is selected.

**Live readout:** Net force (Fₓ, Fᵧ), predicted acceleration (aₓ, aᵧ), missing forces (count only, not identity).

**Win condition:** Object moves as the real physics predicts.

**Difficulty ramp:** More complex scenarios (pulleys → inclines → pulleys-with-inclines → friction → multi-body systems).

**Failure hint:** "هناك قوة ناقصة — فكّر في الاتّصال بين الجسم والسطح." ("There's a missing force — think about the contact between the object and the surface.")

**Technical notes:** This is the hardest interactive in the project. Budget extra time. Use Matter.js here if needed.

---

### Pattern 4 · Energy Roller Coaster (Unit 4)
**Concept taught:** Work-energy theorem, conservation of mechanical energy

**UX:** Student designs a track with hills and valleys (drag vertices). A cart is released from the start. Live energy bars show KE, PE, total. Student's goal varies: "make it over hill 3" or "land in valley 2" or "match this speed at point X."

**Controls:** Drag track vertices. Set initial height, initial velocity. Toggle friction.

**Live readout:** KE, PE, total E at current position. Energy lost to friction (if enabled).

**Win condition:** Specific to level (reach target height, reach target speed, etc.).

**Failure hint:** "لم يصل إلى القمّة — ابدأ من ارتفاع أعلى." ("Didn't reach the top — start from a higher elevation.")

---

### Pattern 5 · Collision Lab (Unit 5)
**Concept taught:** Momentum conservation, elastic vs inelastic collisions

**UX:** Two pucks on an air table. Student sets masses and initial velocities. Chooses collision type (elastic, perfectly inelastic). Predicts post-collision velocities numerically. Presses play. Watches collision.

**Controls:** Mass and velocity sliders per puck. Collision type toggle. Numeric inputs for predicted post-collision velocities.

**Live readout:** Initial total momentum, initial total KE.

**Win condition:** Predicted velocities match simulation within tolerance.

**Failure hint:** "تذكّر: التنع يُحفظ دائمًا، لكن الطاقة الحركية تُحفظ فقط في التصادم المرن." ("Remember: momentum is always conserved, but kinetic energy is only conserved in elastic collisions.")

---

### Pattern 6 · Orbit Control (Unit 6)
**Concept taught:** Uniform circular motion, centripetal force

**UX:** Ball on a string. Student sets string length and rotation speed. Watches tension readout. Must hit a target at a specific moment by releasing the ball. Advanced: string breaks if tension exceeds max.

**Controls:** String length, rotation speed, release timing (tap or time-based).

**Live readout:** Period T, centripetal acceleration aₒ, tension T_str.

**Win condition:** Released ball hits target after flying tangentially.

**Failure hint:** "حرّر الكرة قبل أن يصل الخيط إلى الهدف مباشرةً — لأنّها ستنطلق بشكل مماسي." ("Release the ball before the string points directly at the target — it'll fly tangentially.")

---

### Pattern 7 · Orbit Designer (Unit 7)
**Concept taught:** Gravitation, Kepler's laws

**UX:** Student places a satellite at a given distance from Earth with initial velocity. Orbit is simulated using F = Gm₁m₂/r². Outcomes: circular orbit, elliptical orbit, escape trajectory, crash.

**Controls:** Distance from Earth, initial velocity magnitude and direction.

**Live readout:** Current orbital velocity, period (if stable), energy.

**Win condition:** Level-specific (achieve circular orbit, escape, match a given period).

**Failure hint:** "أسرع بكثير — ستفلت من الجاذبية." ("Too fast — will escape gravity.")

---

### Pattern 8 · Field Mapper (Unit 8)
**Concept taught:** Electric fields, superposition

**UX:** Student places charges (+ or −) on a grid. They predict the field line pattern by drawing it. Then sim reveals real field lines using superposition of Coulomb fields.

**Controls:** Drag charges onto grid, set sign and magnitude.

**Live readout:** Field magnitude at selected test points, potential at those points.

**Win condition:** Student's predicted pattern matches actual within structural tolerance.

**Advanced:** Capacitor mode — place parallel plates, vary separation and voltage, see energy stored.

---

### Pattern 9 · Circuit Builder (Unit 9)
**Concept taught:** DC circuits, Kirchhoff's laws

**UX:** Student drags resistors, batteries, wires onto a breadboard grid. Predicts currents and voltages. Sim solves Kirchhoff's equations and shows the real values; bulbs light with correct brightness, LEDs show polarity.

**Controls:** Drag components, set resistance/EMF values. Numeric input for predictions.

**Live readout:** Total current, total power, voltage across each component.

**Win condition:** Predictions match simulation within tolerance.

**Advanced:** Internal resistance, short-circuit detection with visual feedback.

---

### Pattern 10 · Magnetic Playground (Unit 10)
**Concept taught:** Magnetic force on moving charge, Faraday's law

**UX:** Three modes:
- **Mode A:** Drop a charged particle into a magnetic field. Student sets velocity vector, predicts trajectory. Sim shows circular/helical motion.
- **Mode B:** Move a magnet through a coil. Sim shows induced current direction and magnitude. Student predicts direction (Lenz's law).
- **Mode C:** Alternating current through a wire, see induced EMF in nearby coil.

**Controls:** Vary by mode.

**Live readout:** Force magnitude and direction, flux, induced EMF.

---

### Pattern 11 · Lens Lab (Unit 11)
**Concept taught:** Thin lens equation, image formation

**UX:** Student places an object at chosen distance from a lens (converging or diverging). Predicts image distance, size, and type (real/virtual, upright/inverted). Sim traces rays (principal rays: parallel, through focus, through center) and shows the image.

**Controls:** Object distance slider, lens type toggle, focal length slider. Numeric inputs for predictions.

**Live readout:** Computed dᵢ, magnification M.

**Win condition:** Prediction correct within tolerance.

**Failure hint:** "الجسم داخل البؤرة — الصورة ستكون افتراضيّة وخلف العدسة." ("Object inside the focal length — image will be virtual, behind the lens.")

---

### Pattern 12 · Interference Tank (Unit 12)
**Concept taught:** Wave superposition, interference, diffraction

**UX:** Two coherent sources on a water-like grid. Student sets frequency and source separation. Predicts locations of nodes and antinodes at a given distance. Sim runs the superposition, heatmap shows the pattern.

**Controls:** Frequency, source separation, distance to observation line.

**Live readout:** Wavelength, fringe spacing, path difference at selected points.

**Advanced:** Single-slit diffraction, standing waves on string.

---

### Pattern 13 · Photon Collider (Unit 13)
**Concept taught:** Photoelectric effect, photon energy

**UX:** Student sets photon wavelength (or frequency). Selects metal (each has a different work function). Presses fire. Photons hit the metal. If E_photon > φ, electrons emit with some KE. If not, nothing happens.

**Controls:** Wavelength slider, metal selector, intensity (determines number of photons, not their energy — this is the key lesson).

**Live readout:** E_photon, work function φ, predicted KE_max.

**Win condition:** Student predicts correctly whether emission occurs and what KE_max is.

**Key pedagogical insight the sim must drive home:** Increasing intensity does not increase photon energy — only wavelength/frequency does. Students need to SEE this.

---

### Pattern 14 · Atomic Transitions (Unit 14)
**Concept taught:** Bohr model, atomic spectra, radioactive decay

**UX:** Two modes:

- **Mode A (transitions):** Student selects initial and final energy levels for hydrogen. Sim shows the emitted photon's wavelength and places it on a visible spectrum chart. Student identifies the spectral series.
- **Mode B (decay):** Student places N radioactive atoms. Sim runs decay over time, updating a counter. Student estimates half-life from the curve.

**Controls:** Level selectors (mode A), N and λ (mode B).

**Live readout:** Photon wavelength, photon energy, series name. Or: N(t), fraction remaining, empirical half-life.

---

## Patterns that connect across units

Some interactives teach concepts that appear in multiple units. When building a later unit, check if an existing pattern can be extended rather than starting over. For example:

- FBD Builder (Unit 3) is reused conceptually in Unit 4 (energy with FBDs), Unit 5 (momentum with FBDs for forces during collision), and Unit 6 (centripetal force as net force in FBD).
- Graph matching (Unit 1) is reused in Unit 4 (energy vs position graphs), Unit 7 (SHM position vs time), and Unit 14 (decay curves).

Don't literally reuse components across units — each unit's interactive should be specific — but reuse the underlying helpers in `src/lib/physics/` and the design language of controls/readouts.

---

## Building your first interactive (Unit 3, FBD Builder)

Since this is the most ambitious one, building it first sets the bar for everything else.

Recommended build path:

1. Build the problem selector and scenario renderer (SVG of box on incline, pulleys, etc.)
2. Build the force palette (drag source for weight, normal, tension, friction, applied)
3. Build the force placement + magnitude adjustment logic
4. Build the physics engine that reads the FBD and computes motion
5. Build the simulation renderer (object moves according to the FBD)
6. Build the compare logic (how far from the "real" physics?)
7. Build the result banner and hint system
8. Polish: preview, readouts, difficulty ramp, persistence
9. Test with 5–10 representative scenarios

Allow 1.5–2 weeks for this one. Everything after it is easier.
