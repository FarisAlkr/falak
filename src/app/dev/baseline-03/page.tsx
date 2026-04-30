import {
  BaselineConceptSlide,
  BaselineExampleSlide,
  BaselineHookSlide,
  BaselineMisconceptionSlide,
  BaselineSummarySlide,
  BaselineTitleSlide,
} from '@/components/baseline';
import { loadUnit } from '@/lib/content/baseline';
import type { ReactNode } from 'react';

const UNIT = '03';

/**
 * Unit 03 · Newton's Laws — full deck rendered from `docs/content/03_newtons_laws.md`.
 *
 * This file is a **manifest**, not authored content. Every slide is one
 * component invocation that names a concept/example/misconception ID. The
 * scientific source of truth is the baseline file — change content there, not
 * here.
 *
 * The slide order follows `docs/09_pedagogy.md`:
 *   - title + hook
 *   - interleaved concept/example pairs (Rule 1)
 *   - cumulative example (advanced 🔴)
 *   - misconceptions quarantined to the tail (Rule 3)
 *   - summary
 */

interface DeckSlide {
  type: 'title' | 'hook' | 'concept' | 'example' | 'misconception' | 'summary';
  id?: string;
}

const DECK: DeckSlide[] = [
  // Opening
  { type: 'title' },
  { type: 'hook' },

  // Force as a vector
  { type: 'concept', id: 'force-as-vector' },
  { type: 'example', id: 'ex-two-forces-same-direction' },

  // Net force
  { type: 'concept', id: 'net-force-sigma' },
  { type: 'example', id: 'ex-three-forces-1d' },

  // Newton I
  { type: 'concept', id: 'newton-first-law' },
  { type: 'example', id: 'ex-book-on-table' },

  // Newton II — the engine
  { type: 'concept', id: 'newton-second-vector' },
  { type: 'example', id: 'ex-block-pushed' },

  // Newton II per axis
  { type: 'concept', id: 'newton-second-per-axis' },
  { type: 'example', id: 'ex-2d-perpendicular-forces' },

  // Newton III
  { type: 'concept', id: 'newton-third-law' },
  { type: 'example', id: 'ex-swimming' },

  // The four mechanical forces
  { type: 'concept', id: 'weight' },
  { type: 'example', id: 'ex-weight-of-book' },
  { type: 'concept', id: 'normal-force' },
  { type: 'example', id: 'ex-block-on-incline-find-N' },
  { type: 'concept', id: 'tension' },
  { type: 'example', id: 'ex-atwood-basic' },
  { type: 'concept', id: 'friction' },
  { type: 'example', id: 'ex-friction-bound' },

  // Cumulative — the 🔴 Bagrut staple
  { type: 'example', id: 'ex-incline-with-friction' },

  // Misconception quarantine (Rule 3 — must come after cumulative)
  { type: 'misconception', id: 'misc-moving-needs-force' },
  { type: 'misconception', id: 'misc-action-reaction-cancel' },
  { type: 'misconception', id: 'misc-N-equals-mg' },
  { type: 'misconception', id: 'misc-friction-opposes-force' },
  { type: 'misconception', id: 'misc-rest-no-forces' },

  // Closing
  { type: 'summary' },
];

export default async function BaselineUnit03Page() {
  // Pre-load once for the header, in parallel with each slide's own load
  // (cached at the module level — see `src/lib/content/baseline.ts`).
  const u = await loadUnit(UNIT);
  const total = DECK.length;
  const slides = DECK.map((entry, i) => {
    const slideNumber = `${i + 1}/${total}`;
    return renderSlide(entry, slideNumber);
  });

  return (
    <main className="mx-auto max-w-6xl space-y-12 px-6 py-12">
      <header className="space-y-3 border-b border-border pb-6">
        <span dir="ltr" className="font-mono text-xs uppercase tracking-meta text-ink-muted">
          Baseline-rendered preview · Unit {UNIT} · {total} slides · {u.flagCount} ⚑ flags pending
        </span>
        <h1 className="font-display text-3xl font-medium text-ink">{u.frontmatter.titles.en}</h1>
        <p dir="ltr" className="font-body text-base text-ink-muted">
          Source of truth: <code>{u.filePath.split('/').slice(-3).join('/')}</code>. Every slide
          below is one component invocation that names a concept, example, or misconception ID from
          the baseline.
        </p>
      </header>

      <div className="space-y-10">
        {slides.map((slide, i) => {
          const entry = DECK[i]!;
          return (
            <NumberedSlot key={i} n={`${i + 1}/${total}`} type={entry.type} id={entry.id}>
              {slide}
            </NumberedSlot>
          );
        })}
      </div>
    </main>
  );
}

function renderSlide(entry: DeckSlide, slideNumber: string): ReactNode {
  switch (entry.type) {
    case 'title':
      return <BaselineTitleSlide unit={UNIT} slideNumber={slideNumber} />;
    case 'hook':
      return <BaselineHookSlide unit={UNIT} slideNumber={slideNumber} />;
    case 'concept':
      return <BaselineConceptSlide unit={UNIT} id={entry.id!} slideNumber={slideNumber} />;
    case 'example':
      return <BaselineExampleSlide unit={UNIT} id={entry.id!} slideNumber={slideNumber} />;
    case 'misconception':
      return <BaselineMisconceptionSlide unit={UNIT} id={entry.id!} slideNumber={slideNumber} />;
    case 'summary':
      return <BaselineSummarySlide unit={UNIT} slideNumber={slideNumber} />;
  }
}

function NumberedSlot({
  n,
  type,
  id,
  children,
}: {
  n: string;
  type: DeckSlide['type'];
  id?: string;
  children: ReactNode;
}) {
  return (
    <section className="space-y-3">
      <div className="flex items-baseline gap-3">
        <span dir="ltr" className="font-mono text-[10px] uppercase tracking-meta text-ink-faint">
          Slide {n}
        </span>
        <span dir="ltr" className="font-mono text-[10px] uppercase tracking-meta text-accent">
          {type}
        </span>
        {id && (
          <span dir="ltr" className="font-mono text-[10px] text-ink-faint">
            <code>{id}</code>
          </span>
        )}
        <span className="h-px flex-1 bg-border" />
      </div>
      {children}
    </section>
  );
}
