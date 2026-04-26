# Design System

> The visual and interaction language for Falak.
> Every screen, component, and piece of content must follow this system. No exceptions without updating this document first.

---

## 1. Design philosophy

Falak looks like a **physics journal**, not an edtech app. Warm and editorial rather than cool and tech-y. Think Aeon, The Atlantic, or MIT Press rather than Khan Academy. Every visual decision should feel deliberate.

**Three principles:**

1. **Restraint over density** — white space is not wasted space. A single carefully set equation on a page has more impact than a crowded grid of cards.
2. **Typography as architecture** — the page is structured by type hierarchy, not by boxes and borders.
3. **Motion reveals structure** — use animation only where it teaches something about the physics itself or about the interface's structure.

**Explicit rejects:**

- ❌ Purple gradients on white (the "generic AI" aesthetic)
- ❌ Neumorphism, glassmorphism, or other texture-heavy trends
- ❌ Overuse of emoji, illustrated characters, or cartoonish mascots
- ❌ Drop shadows on every card (use only to indicate lift/focus)
- ❌ Five different accent colors

---

## 2. Color tokens

### Semantic color system (CSS variables in `src/styles/globals.css`)

```css
:root {
  /* Surfaces */
  --paper: #faf6ee; /* default page background, warm cream */
  --paper-raised: #fdfbf5; /* elevated surface (cards when needed) */
  --paper-inverted: #14110e; /* dark surfaces (game mode, slide viewer) */
  --paper-inverted-raised: #1e1a15;

  /* Ink (text and structure) */
  --ink: #1a1612; /* primary text on paper */
  --ink-muted: #6b6257; /* secondary text, labels */
  --ink-faint: #a09684; /* tertiary text, placeholders */
  --ink-inverted: #faf6ee; /* primary text on dark */
  --ink-inverted-muted: rgba(250, 246, 238, 0.6);

  /* Accent (use sparingly) */
  --accent: #c1272d; /* crimson — CTAs, equations emphasis, Hebrew labels */
  --accent-dark: #a01f24;
  --accent-tint: rgba(193, 39, 45, 0.08);

  /* Functional */
  --success: #3b7a3b;
  --warning: #c08a2e;
  --error: #c1272d; /* same as accent on purpose */
  --info: #2c5e8f;

  /* Borders */
  --border: rgba(26, 22, 18, 0.1);
  --border-strong: rgba(26, 22, 18, 0.2);
  --border-inverted: rgba(250, 246, 238, 0.1);
}
```

### Usage rules

- **`--accent` (crimson)** appears ONLY on: primary CTAs, equation symbols that need emphasis, the Hebrew term labels above Arabic titles, hover/focus states. Never for decoration.
- **Dark theme (`--paper-inverted`)** is used ONLY in: game/interactive mode, slide presentation mode. Never for regular navigation.
- **No pure black (#000) and no pure white (#FFF).** Always warm variants.

### Tailwind config

```js
// tailwind.config.ts
export default {
  theme: {
    colors: {
      paper: 'var(--paper)',
      'paper-raised': 'var(--paper-raised)',
      'paper-inverted': 'var(--paper-inverted)',
      ink: 'var(--ink)',
      'ink-muted': 'var(--ink-muted)',
      'ink-faint': 'var(--ink-faint)',
      'ink-inverted': 'var(--ink-inverted)',
      accent: 'var(--accent)',
      'accent-dark': 'var(--accent-dark)',
      border: 'var(--border)',
      // functional colors...
    },
  },
};
```

---

## 3. Typography

### Font families

| Purpose                             | Font                 | Source       | Weights                 |
| ----------------------------------- | -------------------- | ------------ | ----------------------- |
| Display (titles, headlines)         | **Fraunces**         | Google Fonts | 400, 500, 700, 900      |
| Body (prose, UI, English)           | **Inter**            | Google Fonts | 300, 400, 500, 600, 700 |
| Mono (equations, code, meta labels) | **JetBrains Mono**   | Google Fonts | 400, 500, 600           |
| Arabic                              | **Noto Kufi Arabic** | Google Fonts | 400, 500, 600, 700, 800 |
| Hebrew                              | **Heebo**            | Google Fonts | 400, 500, 600, 700      |

**Never substitute these fonts.** Never use Arial, Roboto, or system defaults as fallback — use proper fallbacks in the stack.

### Type scale

```css
--text-xs: 0.75rem; /* 12px — meta labels, footnotes */
--text-sm: 0.875rem; /* 14px — captions, small body */
--text-base: 1rem; /* 16px — body text */
--text-lg: 1.125rem; /* 18px — large body */
--text-xl: 1.25rem; /* 20px — subtitle */
--text-2xl: 1.5rem; /* 24px — H3 */
--text-3xl: 1.875rem; /* 30px — H2 */
--text-4xl: 2.25rem; /* 36px — H1 */
--text-5xl: 3rem; /* 48px — display */
--text-6xl: 3.75rem; /* 60px — hero */
--text-7xl: 4.5rem; /* 72px — slide title */
```

### Font pairings by context

```tsx
// English titles
<h1 className="font-display text-5xl font-medium">Projectile Motion</h1>

// Arabic titles
<h1 dir="rtl" className="font-arabic text-6xl font-semibold">حركة المقذوف</h1>

// Hebrew label above Arabic title (common pattern)
<div dir="rtl" className="font-hebrew text-sm uppercase tracking-[0.2em] text-accent">
  תנועת זריקה
</div>

// Equations
<code className="font-mono text-xl text-accent">v² = v₀² + 2aΔx</code>

// Body prose (Arabic)
<p dir="rtl" className="font-arabic text-lg leading-relaxed text-ink">
  حركة المقذوف هي اتحاد حركتين مستقلّتين...
</p>

// Meta labels (UPPERCASE, wide tracking)
<span className="font-mono text-xs uppercase tracking-[0.2em] text-ink-muted">
  UNIT 02
</span>
```

### Line height & spacing

- Display / titles: `leading-none` (1) or `leading-tight` (1.1)
- Body prose: `leading-relaxed` (1.625)
- Arabic body: `leading-[1.8]` — Arabic needs slightly more line height

---

## 4. Spacing & layout

### Spacing scale (Tailwind defaults)

4px base. Use increments of 4 (1, 2, 3, 4, 6, 8, 12, 16, 20, 24, 32).

### Max widths

- Prose (reading): `max-w-2xl` (672px) — Arabic and Hebrew especially need this
- Wide content (grids): `max-w-6xl` (1152px)
- Slide content: `max-w-5xl` (1024px), 16:10 aspect ratio
- Full-bleed: `max-w-none`

### Vertical rhythm

- Section spacing: `mb-16` (64px) between major sections
- Subsection: `mb-8` (32px)
- Paragraph: `mb-4` (16px)

---

## 5. Component patterns

### Unit card (home grid)

```
┌───────────────────────────────┐
│ UNIT 03              ● Ready  │  ← mono label · pulsing dot indicator
│                               │
│                               │
│ قوانين نيوتن                  │  ← Arabic title, font-arabic text-2xl
│ חוקי ניוטון                   │  ← Hebrew subtitle, font-hebrew, muted
│ Newton's Laws                 │  ← English caption, font-body italic
│                               │
│ ─────────────────────────     │
│ 10 slides · game · exam   →   │  ← meta + chevron
└───────────────────────────────┘
```

Hover: border transitions to crimson, subtle shadow lifts. No scale transform.

### Slide frame

- Aspect ratio: 16:10
- Background: `--paper`
- Border: 1px `--border`, rounded-sm (2px)
- Top-right corner: "FALAK · 01" meta mark
- Max width: 1024px
- Padding: 64px (md:96px)

### Equation display

```tsx
// Inline equation
<InlineMath>v = v_0 + at</InlineMath>

// Block equation, centered, larger
<BlockMath>
  {`x = x_0 + v_0 t + \\frac{1}{2}at^2`}
</BlockMath>
```

Use KaTeX. Never HTML math entities or Unicode hacks.

### Bilingual term pattern

```tsx
<div dir="rtl" className="space-y-1">
  <span className="font-hebrew text-sm uppercase tracking-wider text-accent">תאוצה</span>
  <h2 className="font-arabic text-4xl font-semibold text-ink">التسارع</h2>
  <p className="font-mono text-sm text-ink-muted" dir="ltr">
    acceleration
  </p>
</div>
```

### Buttons

**Primary button (CTA):**

```tsx
<button className="bg-accent px-6 py-3 font-mono text-xs uppercase tracking-[0.2em] text-ink-inverted transition-colors hover:bg-accent-dark">
  Fire · اطلق
</button>
```

**Secondary button:**

```tsx
<button className="border border-border px-5 py-2.5 font-mono text-xs uppercase tracking-wider text-ink transition-colors hover:border-ink hover:text-ink">
  Back
</button>
```

No rounded buttons (use sharp corners or 2px max). No gradients. No drop shadows.

### Input controls

**Range slider** (custom-styled to match):

- Track: 2px tall, ink background
- Thumb: 18px circle, accent color, 2px paper border, 1px ink outline
- Focus state: thicker outline, no color change

**Number input:**

- Bottom border only (no full box)
- Focus: border becomes accent color

---

## 6. Motion

### Timing tokens

```css
--ease-out: cubic-bezier(0.16, 1, 0.3, 1);
--ease-in-out: cubic-bezier(0.83, 0, 0.17, 1);
--duration-fast: 150ms;
--duration-base: 300ms;
--duration-slow: 500ms;
```

### Acceptable motion

- **Fade-in on mount** — 500ms ease-out, translateY(8px → 0). Stagger by 60ms for grids/lists.
- **Color transitions on hover** — 150ms.
- **Page transitions** — simple fade, 300ms.
- **Physics simulations** — 60fps, no easing (physics is physics).
- **Equation reveal** — character-by-character or term-by-term for worked examples.

### Unacceptable motion

- ❌ Bouncing
- ❌ Spring animations on UI elements
- ❌ Scale transforms on hover (except for image zooms)
- ❌ Parallax scrolling
- ❌ Floating decorative elements
- ❌ "Text typing" effect on regular content (fine for pedagogical emphasis on single equations)

---

## 7. Icons

Use `lucide-react` exclusively. No emoji in UI chrome (emoji OK in content when a student will read them).

Standard sizes: 14, 16, 20, 24px. Stroke width: 1.5 for large, 2 for small.

---

## 8. RTL handling

Arabic and Hebrew are both right-to-left. Treat RTL as the default for content areas, LTR for math and code.

### Rules

1. All Arabic blocks: `dir="rtl"` explicit
2. All Hebrew blocks: `dir="rtl"` explicit (even when inside RTL parent — makes it portable)
3. Math and code blocks inside RTL prose: `dir="ltr"` explicit
4. Numeric values and units: `dir="ltr"` (e.g., "25 m/s" should read left-to-right)
5. Icons that imply direction (chevrons, arrows): flip for RTL using `rtl:rotate-180` Tailwind utility
6. Tailwind logical properties preferred: `ms-4` (margin-start), `me-4`, `ps-4`, `pe-4` instead of `ml-4`, `mr-4`

---

## 9. Iconography for physics concepts

Use a consistent vector style for physics diagrams:

- **Vectors:** arrows with 2px stroke, triangular head, labeled with variable name in JetBrains Mono
- **Forces:** crimson color
- **Velocity/acceleration:** ink color
- **Measurement lines:** dashed, ink-muted
- **Objects:** simple geometric shapes, solid fill, no gradients

See `docs/06_interactive_patterns.md` for diagram templates.

---

## 10. Accessibility

- Minimum text contrast: 7:1 (AAA) for body, 4.5:1 (AA) for large text
- All interactive elements keyboard-accessible
- Focus states visible (outline: 2px accent)
- Respect `prefers-reduced-motion` — disable fade-ins if user prefers
- All images have alt text in the page's primary language
- Physics simulations need a text-based "solution" alternative for screen readers

---

## 11. When to update this document

Update this file BEFORE introducing any new color, font, spacing value, or component pattern. If the system needs a new token, add it here first, then implement.
