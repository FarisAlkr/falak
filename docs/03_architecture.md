# Architecture

> The technical structure of the Falak application.
> Paired with `docs/04_tech_stack.md` (library choices).

---

## 1. High-level architecture

```
┌─────────────────────────────────────────────────────────┐
│                      Browser (Client)                    │
│                                                          │
│  ┌────────────────────────────────────────────────────┐ │
│  │        Next.js 14 App (static export)              │ │
│  │                                                    │ │
│  │  ┌─────────┐ ┌──────────┐ ┌─────────┐ ┌───────┐  │ │
│  │  │ Pages   │ │ Unit     │ │ Shared  │ │ MDX   │  │ │
│  │  │ (App    │ │ Modules  │ │ UI      │ │ Units │  │ │
│  │  │ Router) │ │          │ │ Library │ │       │  │ │
│  │  └────┬────┘ └─────┬────┘ └────┬────┘ └───┬───┘  │ │
│  │       │            │           │          │      │ │
│  │       └────────────┼───────────┘          │      │ │
│  │                    │                      │      │ │
│  │   ┌────────────────▼──────────────────────▼───┐  │ │
│  │   │         Client State (Zustand)            │  │ │
│  │   │   + Unit Context (React Context per unit) │  │ │
│  │   └────────────────┬──────────────────────────┘  │ │
│  │                    │                              │ │
│  │   ┌────────────────▼─────────┐                   │ │
│  │   │  IndexedDB (via Dexie)   │                   │ │
│  │   │  - Progress              │                   │ │
│  │   │  - Exam scores           │                   │ │
│  │   │  - Settings              │                   │ │
│  │   └──────────────────────────┘                   │ │
│  └────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────┘
           ▲
           │ static HTML/JS/CSS/MDX
           │
┌──────────┴──────────────────────────────────────────────┐
│        Vercel / Cloudflare Pages (Static Hosting)        │
└──────────────────────────────────────────────────────────┘
```

No backend server is required for v1. All content is statically exported, all user data is in IndexedDB.

---

## 2. Directory structure (`src/`)

```
src/
├── app/                              Next.js App Router pages
│   ├── layout.tsx                    Root layout: fonts, providers, metadata
│   ├── page.tsx                      Home: welcome + units grid
│   ├── globals.css                   CSS variables, Tailwind directives
│   ├── units/
│   │   ├── page.tsx                  All units list
│   │   └── [unitId]/
│   │       ├── layout.tsx            Unit shell (nav: Theory/Interactive/Exam/Summary)
│   │       ├── page.tsx              Unit home (overview, 4 mode tiles)
│   │       ├── theory/
│   │       │   └── page.tsx          Slide viewer
│   │       ├── interactive/
│   │       │   └── page.tsx          Sim/game shell
│   │       ├── exam/
│   │       │   └── page.tsx          Bagrut exam shell
│   │       └── summary/
│   │           └── page.tsx          Summary card
│   ├── glossary/
│   │   └── page.tsx                  Searchable bilingual glossary
│   ├── bagrut-simulator/
│   │   └── page.tsx                  Cross-unit timed exam
│   ├── progress/
│   │   └── page.tsx                  User's progress dashboard
│   └── teacher-mode/
│       └── page.tsx                  Clean presentation shell
│
├── components/                       Shared UI
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── ThemeToggle.tsx
│   ├── primitives/                   Base UI
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Slider.tsx
│   │   └── Badge.tsx
│   ├── bilingual/                    Bilingual-specific
│   │   ├── ArabicTitle.tsx
│   │   ├── HebrewLabel.tsx
│   │   └── TermBlock.tsx             Arabic + Hebrew + English
│   ├── slide/                        Slide viewer + slide templates
│   │   ├── SlideViewer.tsx           keyboard nav, progress dots
│   │   ├── SlideFrame.tsx            16:10 container
│   │   ├── TitleSlide.tsx
│   │   ├── ConceptSlide.tsx
│   │   ├── EquationsSlide.tsx
│   │   ├── VisualSlide.tsx
│   │   ├── WorkedExampleSlide.tsx
│   │   └── VocabSlide.tsx
│   ├── interactive/                  Sim building blocks
│   │   ├── SimulationCanvas.tsx
│   │   ├── ControlPanel.tsx
│   │   ├── LiveReadout.tsx
│   │   ├── AnswerInput.tsx
│   │   └── ResultBanner.tsx
│   ├── exam/
│   │   ├── ExamQuestion.tsx
│   │   ├── ExamNavigator.tsx
│   │   └── SolutionReveal.tsx
│   └── math/
│       └── Math.tsx                  KaTeX wrapper
│
├── content/                          MDX unit content
│   └── units/
│       ├── kinematics-1d/
│       │   ├── meta.ts               Unit metadata
│       │   ├── slides.mdx            Slide content
│       │   ├── interactive.tsx       Sim component
│       │   ├── exam.ts               Exam questions (typed)
│       │   └── summary.mdx           Summary card
│       ├── kinematics-2d/
│       └── ... (all 14 units)
│
├── lib/                              Utilities
│   ├── physics/                      Physics calculations (pure functions)
│   │   ├── kinematics.ts
│   │   ├── dynamics.ts
│   │   ├── energy.ts
│   │   ├── circuits.ts
│   │   ├── optics.ts
│   │   └── constants.ts              g, c, h, k, etc.
│   ├── db/                           IndexedDB schema & hooks
│   │   ├── schema.ts                 Dexie schema
│   │   └── hooks.ts                  useProgress(), useSettings()
│   ├── content/                      Content loading
│   │   ├── loadUnit.ts
│   │   └── unitRegistry.ts
│   ├── i18n/                         Language helpers
│   │   ├── terms.ts                  Bilingual terms dictionary
│   │   └── format.ts                 Number formatting (Arabic/Hebrew)
│   └── utils/
│       ├── cn.ts                     classnames helper
│       └── a11y.ts
│
├── stores/                           Zustand stores
│   ├── progressStore.ts
│   └── settingsStore.ts
│
├── styles/
│   └── globals.css
│
└── types/                            Shared TypeScript types
    ├── unit.ts
    ├── slide.ts
    └── exam.ts
```

---

## 3. Routing

### Route table

| Route | Purpose |
|---|---|
| `/` | Home — welcome + units grid |
| `/units` | All units list (filterable by section) |
| `/units/[unitId]` | Unit home — 4 mode tiles |
| `/units/[unitId]/theory` | Slide viewer |
| `/units/[unitId]/interactive` | Interactive sim |
| `/units/[unitId]/exam` | Bagrut exam |
| `/units/[unitId]/summary` | Takeaway card |
| `/glossary` | Searchable bilingual glossary |
| `/bagrut-simulator` | Cross-unit timed exam |
| `/progress` | User's dashboard |
| `/teacher-mode/[unitId]/theory` | Distraction-free projection mode |

### URL examples

```
/                                         → Home
/units/newtons-laws                       → Newton's Laws unit home
/units/newtons-laws/theory                → Slides
/units/newtons-laws/interactive           → FBD Builder sim
/units/projectile-motion/exam             → Bagrut questions for projectiles
/teacher-mode/kinematics-1d/theory        → Clean slides for class
```

Unit IDs are kebab-case and match those in `docs/01_curriculum_and_units.md`.

---

## 4. Data model

### Unit metadata (`meta.ts`)

```ts
export const meta: UnitMeta = {
  id: 'newtons-laws',
  number: 3,
  section: 'mechanics',
  titles: {
    ar: 'قوانين نيوتن والديناميكا',
    he: 'חוקי ניוטון ודינמיקה',
    en: "Newton's Laws & Dynamics"
  },
  prerequisites: ['kinematics-1d', 'kinematics-2d'],
  estimatedMinutes: {
    theory: 45,
    interactive: 30,
    exam: 45,
    summary: 5
  },
  bagrutWeight: 'very-high',
  keyTerms: [/* full bilingual vocab */],
  interactiveType: 'fbd-builder'
};
```

### Exam question

```ts
export interface ExamQuestion {
  id: string;
  year?: number;               // if pulled from real past Bagrut
  season?: 'summer' | 'winter';
  difficulty: 1 | 2 | 3;       // 1 = basic, 3 = stretch
  problem: {
    ar: string;                // Arabic problem statement
    he: string;                // Hebrew (for Bagrut alignment practice)
  };
  parts: ExamPart[];
  totalPoints: number;
}

export interface ExamPart {
  id: string;                  // 'a', 'b', 'c'...
  prompt: { ar: string; he: string };
  answer: ExamAnswer;          // expected answer (numeric + tolerance, or symbolic)
  points: number;
  hint?: { ar: string };
  solution: { ar: string };    // full worked solution
}
```

### Progress (IndexedDB)

```ts
interface Progress {
  userId: string;              // local-only uuid, no auth in v1
  unitProgress: {
    [unitId: string]: {
      theoryCompleted: boolean;
      theoryLastSlide: number;
      interactiveBestScore: number;
      interactiveStreak: number;
      examScores: { attemptId: string; score: number; date: number }[];
    };
  };
  streak: number;              // daily use streak
  lastActiveAt: number;
}
```

---

## 5. State management

### Zustand stores (global)

- **`progressStore`** — user progress across all units, synced to IndexedDB
- **`settingsStore`** — theme preference, language preference, reduced-motion preference

### React Context (unit-scoped)

- **`UnitContext`** — current unit's metadata, current mode, available nav
- **`SlideContext`** — within slide viewer: current index, total, nav functions
- **`InteractiveContext`** — within sim: simulation state, controls, result

### Local component state

Everything else (UI toggles, transient form state) is `useState` in components.

---

## 6. Content pipeline

### How a unit gets rendered

1. **Build time:**
   - MDX files in `src/content/units/{unitId}/slides.mdx` are compiled
   - `meta.ts` is imported and registered in `unitRegistry.ts`
   - Static pages pre-render for all unit IDs

2. **Runtime (client):**
   - User navigates to `/units/{id}/theory`
   - Page component loads pre-compiled MDX and slide metadata
   - `SlideViewer` renders with the imported slides array

### MDX component injection

Slide MDX files can use these components directly without import:

```mdx
<TitleSlide
  arabic="حركة المقذوف"
  hebrew="תנועת זריקה"
  english="Projectile Motion"
  unit="02"
/>

<ConceptSlide>
  <ArabicBody>حركة المقذوف هي اتحاد حركتين...</ArabicBody>
  <Diagram type="projectile-independence" />
</ConceptSlide>

<EquationsSlide title="المحور العمودي" hebrewLabel="ציר אנכי">
  <Math>a_y = -g</Math>
  <Math>v_y(t) = v_0 \sin\theta - gt</Math>
</EquationsSlide>
```

---

## 7. Physics engine layer

Physics is in pure TS functions in `src/lib/physics/`. Never in components.

**Example:**
```ts
// src/lib/physics/kinematics.ts
export function projectilePath(
  v0: number,
  angleDeg: number,
  g = 9.8,
  dt = 0.016
): ProjectilePoint[] {
  const theta = (angleDeg * Math.PI) / 180;
  const vx = v0 * Math.cos(theta);
  const vy0 = v0 * Math.sin(theta);
  const points: ProjectilePoint[] = [];
  let t = 0;
  while (true) {
    const x = vx * t;
    const y = vy0 * t - 0.5 * g * t * t;
    if (y < 0 && points.length > 0) break;
    points.push({ t, x, y, vx, vy: vy0 - g * t });
    t += dt;
  }
  return points;
}
```

This separation means:
- Physics can be unit-tested (and it MUST be)
- UI components become thin
- Same physics can power theory diagrams, interactives, and exam auto-grading

---

## 8. Deployment

- **Target:** Vercel (primary), Cloudflare Pages (fallback)
- **Strategy:** `next build && next export` — 100% static, no serverless functions needed for v1
- **Preview deploys:** every PR
- **Domains:** `falak.education` (suggested) and regional variants (`falak.ps`, `falak.sa`, etc.) if scaling later
- **Analytics:** privacy-respecting (Plausible or Fathom) — no cookies, no PII

---

## 9. Offline & PWA (phase 2)

Plan but don't implement in v1:
- Service worker for offline unit access
- `manifest.json` for install-to-home-screen
- IndexedDB already enables offline progress tracking

---

## 10. Performance budget

- Initial JS bundle: ≤ 150 KB gzipped
- Largest Contentful Paint (LCP): ≤ 1.5s on 4G
- Time to Interactive (TTI): ≤ 3s on mobile
- Cumulative Layout Shift (CLS): < 0.1
- No blocking third-party scripts

Use Next.js `next/font` for font loading, `next/image` for any images (physics diagrams are SVG anyway, so images are rare).
