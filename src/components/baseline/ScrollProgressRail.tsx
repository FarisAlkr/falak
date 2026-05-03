'use client';

import { useEffect, useState } from 'react';
import type { TocEntry } from '@/lib/content/types';
import { LOCALE_DIR } from '@/lib/i18n/constants';
import { cn } from '@/lib/utils/cn';

interface ScrollProgressRailProps {
  entries: TocEntry[];
  totalSlides: number;
}

/**
 * Sticky horizontal rail below the AppHeader. Two things at once:
 *
 *  1. **Where you are** — the leftmost label shows the current section's
 *     trilingual title (deepest TOC match for the slide currently in view).
 *  2. **Where you're going** — the bar is divided into section-proportional
 *     segments, each clickable; a crimson fill grows as you scroll. The
 *     active segment is solid, the others are an ink-faint outline.
 *
 * Mounted via IntersectionObserver on `<span id="section-{id}">` anchors
 * placed by the deck renderer. Scroll progress is computed from the
 * page's vertical scroll position over its content height.
 *
 * The rail hides when the reader is still on the فهرس card at the top
 * (no section in view yet) so it doesn't compete with the index for
 * attention.
 */
export function ScrollProgressRail({ entries, totalSlides }: ScrollProgressRailProps) {
  const activeId = useActiveSection(entries);
  const progress = useScrollProgress();
  const currentSlide = guessSlideFromProgress(progress, totalSlides);
  const active = activeId ? findEntry(entries, activeId) : null;

  // Hide when there's no active section yet (i.e., the reader is still on
  // the index card) so the rail doesn't compete with the فهرس.
  if (!active) return null;

  return (
    <div
      dir="ltr"
      className="bg-paper/85 sticky top-[52px] z-20 border-b border-border backdrop-blur-md"
    >
      <div className="mx-auto max-w-6xl px-6 py-2.5">
        <div className="flex items-center justify-between gap-4">
          {/* Active section breadcrumb */}
          <div className="min-w-0 flex-1 truncate text-xs">
            <span className="me-2 text-ink-faint">·</span>
            <SectionTitle entry={active} />
          </div>

          {/* Slide counter */}
          <span className="shrink-0 font-mono text-[10px] uppercase tabular-nums tracking-meta text-ink-muted">
            {currentSlide} / {totalSlides}
          </span>
        </div>

        {/* Progress bar with section ticks */}
        <div className="relative mt-1.5">
          {/* Track */}
          <div className="h-px w-full bg-border" aria-hidden />
          {/* Crimson fill */}
          <div
            className="absolute inset-y-0 left-0 h-px bg-accent transition-all duration-base ease-out"
            style={{ width: `${progress * 100}%` }}
            aria-hidden
          />
          {/* Section ticks */}
          <div className="absolute inset-x-0 top-0 -mt-1 flex">
            {entries.map((entry) => {
              const start = (entry.slides[0] - 1) / totalSlides;
              const end = entry.slides[1] / totalSlides;
              const width = end - start;
              const isActive = entry.id === activeId;
              return (
                <a
                  key={entry.id}
                  href={`#section-${entry.id}`}
                  aria-label={entry.title.en}
                  className="group relative flex items-center justify-start"
                  style={{
                    left: `${start * 100}%`,
                    width: `${width * 100}%`,
                    position: 'absolute',
                  }}
                >
                  <span
                    aria-hidden
                    className={cn(
                      'block h-2 w-px transition-colors duration-fast',
                      isActive
                        ? 'bg-accent'
                        : entry.slides[1] / totalSlides <= progress
                          ? 'bg-ink-muted'
                          : 'bg-border-strong group-hover:bg-ink-muted',
                    )}
                  />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function SectionTitle({ entry }: { entry: TocEntry }) {
  return (
    <>
      <span data-lang="ar" dir={LOCALE_DIR.ar} className="font-arabic text-ink">
        {entry.title.ar}
      </span>
      <span data-lang="he" dir={LOCALE_DIR.he} className="font-hebrew text-ink">
        {entry.title.he}
      </span>
      <span data-lang="en" dir={LOCALE_DIR.en} className="font-display text-ink">
        {entry.title.en}
      </span>
    </>
  );
}

function findEntry(entries: TocEntry[], id: string): TocEntry | null {
  for (const top of entries) {
    if (top.id === id) return top;
    for (const child of top.children ?? []) {
      if (child.id === id) return child;
    }
  }
  return null;
}

/**
 * Reports the section id currently in view. Mirrors the implementation in
 * `DeckIndex` so the رail and the index agree on what's "active".
 */
function useActiveSection(entries: TocEntry[]): string | null {
  const [active, setActive] = useState<string | null>(null);
  useEffect(() => {
    const ids: string[] = [];
    for (const top of entries) {
      ids.push(top.id);
      for (const c of top.children ?? []) ids.push(c.id);
    }
    const targets = ids
      .map((id) => document.getElementById(`section-${id}`))
      .filter((el): el is HTMLElement => el !== null);
    if (targets.length === 0) return;

    const visible = new Map<string, number>();
    const observer = new IntersectionObserver(
      (records) => {
        for (const r of records) {
          const id = r.target.id.replace(/^section-/, '');
          if (r.isIntersecting) visible.set(id, r.intersectionRatio);
          else visible.delete(id);
        }
        let best: string | null = null;
        let bestRatio = 0;
        for (const [id, ratio] of visible) {
          if (ratio > bestRatio) {
            best = id;
            bestRatio = ratio;
          }
        }
        if (best) setActive(best);
      },
      { rootMargin: '-20% 0% -60% 0%', threshold: [0, 0.25, 0.5, 0.75, 1] },
    );
    for (const t of targets) observer.observe(t);
    return () => observer.disconnect();
  }, [entries]);
  return active;
}

function useScrollProgress(): number {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      if (total <= 0) {
        setProgress(0);
        return;
      }
      const p = Math.max(0, Math.min(1, window.scrollY / total));
      setProgress(p);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);
  return progress;
}

function guessSlideFromProgress(progress: number, totalSlides: number): number {
  // Approximate — uses linear scroll fraction. Good enough for a counter
  // that reads "12 / 33"; the active-section breadcrumb is the precise
  // signal of where the reader is.
  const n = Math.round(progress * (totalSlides - 1)) + 1;
  return Math.max(1, Math.min(totalSlides, n));
}
