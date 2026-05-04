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
 * Minimal vertical scroll line.
 *
 * A 1px track running floor-to-ceiling (minus a comfortable inset for the
 * sticky AppHeader and the slide-counter at the bottom), pinned to the
 * start edge — right in LTR, left in RTL via the `rtl:` modifier.
 *
 *  - Track in `border` color, full height.
 *  - Crimson fill grows top → bottom as the page scrolls.
 *  - Tiny ink-faint dots at each section boundary; the active section's
 *    dot is bigger and crimson. Hover any dot to reveal the section's
 *    trilingual title in a small pill on the inner side. Click to jump.
 *  - Slide counter at the bottom of the line.
 *
 * Hidden until the reader has scrolled past the فهرس card so the index
 * keeps the stage to itself at the top of the page. On mobile (< md) the
 * line is replaced by a thin sticky strip below the AppHeader since a
 * 1px vertical line is too easy to miss on small viewports.
 */
export function ScrollProgressRail({ entries, totalSlides }: ScrollProgressRailProps) {
  const activeId = useActiveSection(entries);
  const progress = useScrollProgress();
  const currentSlide = guessSlideFromProgress(progress, totalSlides);

  if (!activeId) return null;

  return (
    <>
      {/* Desktop: bare 1px vertical line on the start edge */}
      <div
        aria-label="Scroll progress"
        dir="ltr"
        className="pointer-events-none fixed bottom-12 right-8 top-12 z-20 hidden w-px md:block rtl:left-8 rtl:right-auto"
      >
        {/* Track */}
        <div aria-hidden className="absolute inset-0 bg-border" />
        {/* Fill */}
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 bg-accent transition-[height] duration-base ease-out"
          style={{ height: `${progress * 100}%` }}
        />

        {/* Section dots */}
        {entries.map((entry) => {
          const topPct = ((entry.slides[0] - 1) / totalSlides) * 100;
          const isActive = entry.id === activeId;
          return (
            <a
              key={entry.id}
              href={`#section-${entry.id}`}
              aria-label={entry.title.en}
              aria-current={isActive ? 'location' : undefined}
              className="group/tick pointer-events-auto absolute left-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{ top: `${topPct}%` }}
            >
              {/* Dot */}
              <span
                aria-hidden
                className={cn(
                  'block rounded-full border-2 border-paper transition-all duration-fast',
                  isActive
                    ? 'h-2.5 w-2.5 bg-accent'
                    : 'h-1.5 w-1.5 bg-ink-faint group-hover/tick:bg-ink',
                )}
              />
              {/* Label — appears on hover on the inner (page) side */}
              <span
                className={cn(
                  'pointer-events-none absolute top-1/2 -translate-y-1/2 whitespace-nowrap rounded-sm border border-border bg-paper-raised px-2 py-0.5 text-[11px] opacity-0 shadow-soft transition-opacity duration-fast',
                  'group-hover/tick:opacity-100 group-focus-visible/tick:opacity-100',
                  // Inner side = away from the viewport edge: left in LTR, right in RTL
                  'right-3 rtl:left-3 rtl:right-auto',
                )}
              >
                <SectionTitle entry={entry} />
              </span>
            </a>
          );
        })}

        {/* Slide counter at the foot of the line */}
        <span
          dir="ltr"
          className="absolute -bottom-6 right-1/2 translate-x-1/2 whitespace-nowrap font-mono text-[10px] uppercase tabular-nums tracking-meta text-ink-faint"
        >
          {currentSlide}
          <span className="mx-px text-border-strong">/</span>
          {totalSlides}
        </span>
      </div>

      {/* Mobile: thin sticky strip below the AppHeader */}
      <div
        dir="ltr"
        className="bg-paper/85 sticky top-[52px] z-20 border-b border-border backdrop-blur-md md:hidden"
      >
        <div className="mx-auto max-w-6xl px-4 py-1.5">
          <div className="flex items-center justify-between text-[10px]">
            <span className="truncate text-ink-muted">
              <SectionTitle entry={findEntry(entries, activeId) ?? entries[0]!} />
            </span>
            <span className="shrink-0 font-mono uppercase tabular-nums tracking-meta text-ink-faint">
              {currentSlide} / {totalSlides}
            </span>
          </div>
          <div className="relative mt-1 h-px w-full bg-border">
            <div
              className="absolute inset-y-0 left-0 bg-accent transition-all duration-base ease-out"
              style={{ width: `${progress * 100}%` }}
              aria-hidden
            />
          </div>
        </div>
      </div>
    </>
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
  const n = Math.round(progress * (totalSlides - 1)) + 1;
  return Math.max(1, Math.min(totalSlides, n));
}
