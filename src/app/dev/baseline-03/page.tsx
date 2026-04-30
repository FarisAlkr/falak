import { loadUnit } from '@/lib/content/baseline';
import {
  UNIT_03_DECK,
  UNIT_03_NUMBER,
  renderUnit03Slide,
  type Unit03DeckSlide,
} from '@/content/units/newtons-laws/lectureDeck';
import type { ReactNode } from 'react';

/**
 * Dev preview — Unit 03's full deck rendered from `docs/content/03_newtons_laws.md`,
 * with per-slide labels showing the slide number and baseline ID. Useful for
 * matching a rendered slide to its source block. The canonical (clean)
 * rendering lives at `/units/newtons-laws/theory/`.
 */

export default async function BaselineUnit03DevPreviewPage() {
  const u = await loadUnit(UNIT_03_NUMBER);
  const total = UNIT_03_DECK.length;

  return (
    <main className="mx-auto max-w-6xl space-y-12 px-6 py-12">
      <header className="space-y-3 border-b border-border pb-6">
        <span dir="ltr" className="font-mono text-xs uppercase tracking-meta text-ink-muted">
          Baseline-rendered preview · Unit {UNIT_03_NUMBER} · {total} slides · {u.flagCount} ⚑ flags
          pending
        </span>
        <h1 className="font-display text-3xl font-medium text-ink">{u.frontmatter.titles.en}</h1>
        <p dir="ltr" className="font-body text-base text-ink-muted">
          Source of truth: <code>{u.filePath.split('/').slice(-3).join('/')}</code>. Every slide
          below is one component invocation that names a concept, example, or misconception ID from
          the baseline.
        </p>
      </header>

      <div className="space-y-10">
        {UNIT_03_DECK.map((entry, i) => (
          <NumberedSlot key={i} n={`${i + 1}/${total}`} type={entry.type} id={entry.id}>
            {renderUnit03Slide(entry, `${i + 1}/${total}`)}
          </NumberedSlot>
        ))}
      </div>
    </main>
  );
}

function NumberedSlot({
  n,
  type,
  id,
  children,
}: {
  n: string;
  type: Unit03DeckSlide['type'];
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
