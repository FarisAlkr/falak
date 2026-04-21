---
name: simulation-builder
description: Design patterns and implementation guidelines for building interactive physics simulations in Falak (the "play" mode of each unit). Use this skill when building or modifying a unit's interactive.tsx file, designing a new sim mechanic, or reviewing simulation physics. Enforces the universal interactive structure, real-physics requirement, live readouts, and difficulty ramps.
---

# Simulation Builder Skill

Falak interactives are where students transition from "understanding" to "applying." They must be pedagogically rigorous, physically accurate, and delightful to use. No cheap gamification, no fake physics.

## When to trigger this skill

- Building a new `interactive.tsx` for a unit
- Adding or modifying simulation mechanics
- Reviewing an existing simulation for correctness
- Debugging simulation performance or physics

## The universal interactive structure

Every interactive has these 6 parts (see `docs/06_interactive_patterns.md`):

1. **Problem statement** — what the student is being asked to do
2. **Simulation canvas** — the visual representation
3. **Controls** — sliders, inputs, drag targets
4. **Live readout** — computed physical quantities, update in real-time
5. **Preview** — dashed/ghost visualization of what WILL happen
6. **Result banner** — success/failure with hint

```
┌─────────────────────────────────────────┐
│ PROBLEM                                  │
│ Arabic problem statement · Hebrew terms  │
├─────────────────────────────────────────┤
│                                          │
│           SIMULATION CANVAS              │
│       (SVG, with preview overlay)        │
│                                          │
├──────────────────┬──────────────────────┤
│ CONTROLS         │ LIVE READOUT         │
│ sliders, inputs  │ v_x, v_y, a, F...    │
│ [PLAY] button    │                      │
├──────────────────┴──────────────────────┤
│ RESULT + HINT (after play)               │
└─────────────────────────────────────────┘
```

## The ten non-negotiables

1. **Real physics.** Use the same equations the student is learning. Import from `src/lib/physics/`.
2. **Live readout.** Computed values shown as controls change.
3. **Preview before commit.** Ghost visualization of predicted outcome.
4. **Arabic hint on failure.** One line. Direction of adjustment, never the answer.
5. **Difficulty ramp.** Targets shrink, constraints tighten, tolerances narrow with streak.
6. **Persistent streak.** Best streak saves to IndexedDB via `useProgress` hook.
7. **60fps.** Test on a mid-range laptop.
8. **Keyboard accessible.** Every control has a keyboard path.
9. **RTL-aware.** Arabic text RTL, numbers LTR.
10. **Pedagogically transparent.** Success shows WHY the answer was right (micro-explanation).

## Implementation structure

```tsx
// interactive.tsx skeleton
import { useState, useEffect, useRef } from 'react';
import { useProgress } from '@/lib/db/hooks';
import { runProjectileSim } from '@/lib/physics/kinematics';
import {
  ProblemStatement,
  SimulationCanvas,
  ControlPanel,
  LiveReadout,
  ResultBanner,
} from '@/components/interactive';

export default function ProjectileInteractive({ onComplete }: InteractiveProps) {
  // state
  const [angle, setAngle] = useState(45);
  const [velocity, setVelocity] = useState(25);
  const [streak, setStreak] = useState(0);
  const [result, setResult] = useState<SimResult | null>(null);
  const [running, setRunning] = useState(false);
  const [target, setTarget] = useState(() => generateTarget(streak));

  // persistence
  const { bestStreak, updateBestStreak } = useProgress('projectile-motion');

  // live computation (pure functions from /lib/physics)
  const preview = useMemo(
    () => computeProjectilePath(velocity, angle),
    [velocity, angle]
  );
  const liveValues = {
    vx: velocity * Math.cos((angle * Math.PI) / 180),
    vy: velocity * Math.sin((angle * Math.PI) / 180),
    range: (velocity ** 2 * Math.sin((2 * angle * Math.PI) / 180)) / 9.8,
  };

  // fire simulation
  const fire = () => {
    setRunning(true);
    const simResult = runProjectileSim(velocity, angle, target);
    // animate... then setResult
  };

  // difficulty ramp
  useEffect(() => {
    if (result?.hit) {
      setStreak(s => s + 1);
      setTarget(generateTarget(streak + 1));
    }
    if (result && !result.hit) {
      setStreak(0);
    }
  }, [result]);

  return (
    <div className="flex flex-col gap-4">
      <ProblemStatement problem={currentProblem} />
      <SimulationCanvas
        preview={preview}
        target={target}
        projectile={running ? /* live projectile */ : null}
      />
      <div className="grid grid-cols-2 gap-4">
        <ControlPanel
          controls={[
            { label: 'الزاوية · θ', value: angle, onChange: setAngle, min: 10, max: 85, unit: '°' },
            { label: 'السرعة · v₀', value: velocity, onChange: setVelocity, min: 10, max: 45, unit: 'm/s' },
          ]}
          onFire={fire}
          disabled={running}
        />
        <LiveReadout values={liveValues} />
      </div>
      {result && <ResultBanner result={result} />}
    </div>
  );
}
```

## Physics separation

**Physics functions live in `src/lib/physics/`, NEVER in the component.**

```ts
// src/lib/physics/kinematics.ts
export function projectilePath(
  v0: number,
  angleDeg: number,
  g = 9.8,
  dt = 0.016
): ProjectilePoint[] {
  const theta = (angleDeg * Math.PI) / 180;
  const vx0 = v0 * Math.cos(theta);
  const vy0 = v0 * Math.sin(theta);
  const points: ProjectilePoint[] = [];
  let t = 0;
  while (true) {
    const x = vx0 * t;
    const y = vy0 * t - 0.5 * g * t * t;
    if (y < 0 && points.length > 0) break;
    points.push({ t, x, y, vx: vx0, vy: vy0 - g * t });
    t += dt;
  }
  return points;
}
```

This separation means:
- Physics is unit-testable
- Components stay thin
- Multiple interactives can share helpers

## Rendering choices

### SVG (default)
Use SVG for 90% of Falak interactives. Fast enough for typical physics (projectile, FBD, orbits, fields). Accessible (aria-label on elements). Easy to style.

### Canvas
Use Canvas only when:
- Rendering >500 moving particles (interference, field visualization)
- Real-time pixel manipulation needed (heatmaps)
- Measured SVG performance is insufficient

### Matter.js
Use Matter.js only when:
- Rigid-body physics with complex contact (stacked blocks, multi-body collision)
- Pulley systems with realistic rope/chain dynamics
- Building the FBD Builder's simulation verification

Never use a physics engine for simple parametric physics (projectile, orbits, waves). You'll hide the physics behind a black box.

## Difficulty ramp patterns

Difficulty progression should feel smooth, not spiky:

- **Streak 1–3:** Large tolerance, forgiving controls, single variable to tune
- **Streak 4–6:** Tighter tolerance, second variable to optimize
- **Streak 7–10:** Realistic constraints (wind, obstacles, limited attempts)
- **Streak 11+:** Bagrut-equivalent problems — no hints, strict tolerance

When tolerance tightens, ALWAYS tell the student visually (shrinking target, narrower "correct zone" indicator).

## Live readout design

Controls change → readouts update. No delay. Tie readouts to the same state as controls:

```tsx
<LiveReadout>
  <Readout label="vₓ" value={vxLive.toFixed(1)} unit="m/s" />
  <Readout label="vᵧ" value={vyLive.toFixed(1)} unit="m/s" />
  <Readout label="R" value={rangeLive.toFixed(1)} unit="m" highlight />
</LiveReadout>
```

- Values in mono font
- Crimson for the "target" quantity (R when trying to hit a range)
- Ink for other quantities
- Update in the same frame as the control change (React will batch automatically)

## Hint system

On failure, the hint is one Arabic sentence. It indicates DIRECTION of adjustment only:

```tsx
function getHint(result: SimResult, target: Target): string {
  const err = result.landX - target.x;
  if (err < -target.r) return 'قصير — زِد السرعة أو ارفع الزاوية قليلًا.';
  if (err > target.r) return 'تجاوزت الهدف — قلّل السرعة أو قلّل الزاوية قليلًا.';
  if (Math.abs(err) < target.r * 1.5) return 'قريب جدًا — عدّل الزاوية بدرجات قليلة فقط.';
  return 'راجع القيم ثمّ جرّب ثانية.';
}
```

Never reveal the exact answer. Never use accusatory language. Keep it factual and directional.

## Persistence

```ts
// After a successful run
await updateUnitProgress('projectile-motion', {
  interactiveBestStreak: Math.max(streak + 1, bestStreak),
  lastPlayedAt: Date.now(),
});
```

Use the `useProgress` hook from `@/lib/db/hooks`. Never write to IndexedDB directly from a component.

## Performance checklist

- [ ] requestAnimationFrame used, not setInterval
- [ ] dt capped at 0.025s (avoid instability from large timesteps)
- [ ] State updates batched (React 18 does this automatically with useState)
- [ ] Preview trajectory memoized with useMemo
- [ ] SVG elements have keys for reconciliation
- [ ] No console.log in production paths
- [ ] Tested on a mid-range laptop at 60fps

## Review output format

```
🎮 SIMULATION REVIEW · Unit 3 · FBD Builder

Structure:
  ✅ ProblemStatement present
  ✅ SimulationCanvas with preview
  ✅ ControlPanel with palette + magnitude
  ✅ LiveReadout (Fx, Fy, a)
  ✅ ResultBanner with Arabic hint

Physics:
  ✅ Imports dynamics() from @/lib/physics/dynamics
  ✅ No physics logic inline in component
  ✅ Unit tests exist for relevant helpers

Performance:
  ✅ 60fps on baseline laptop
  ✅ dt = 0.016s, stable

Pedagogy:
  ⚠️  Hint "اقلب القوة العمودية" is a bit too specific — consider "تحقّق من اتّجاه القوّة العمودية"
  ✅ Difficulty ramps appropriately
  ✅ Persistent streak working

Accessibility:
  ✅ All controls keyboard-accessible
  ✅ Arabic text RTL, numbers LTR
  ✅ Focus states visible
```

## Common anti-patterns to reject

- ❌ "Nudging" success — if the student's input is wrong, the sim must fail faithfully
- ❌ Hiding the physics behind a black box ("you wouldn't understand")
- ❌ Over-dramatic success/failure animations (particle explosions, screen shakes) — the physics is the drama
- ❌ Sound effects unless the content demands it (wave interference demo OK; projectile "boom" — no)
- ❌ Leaderboards, points, badges — Falak is not a game, it's a teaching tool
- ❌ Ads, upsells, or any commercial content
