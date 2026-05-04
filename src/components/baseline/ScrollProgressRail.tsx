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
 * Vertical scroll-progress rail. Pinned to the right edge of the viewport
 * (start side of the page in LTR; flipped to the left edge in RTL via
 * Tailwind's `rtl:` modifier). Reads as a slim editorial progress index:
 *
 *  - One row per top-level TOC section.
 *  - Each row: a tick (filled crimson when active, ink-muted when already
 *    scrolled past, border-strong when upcoming) and a hidden-by-default
 *    section label that reveals on hover/focus.
 *  - A continuous crimson line on the inner edge fills as scroll progresses.
 *  - Slide counter (N / total) at the bottom.
 *
 * The whole rail hides when the reader is still at the top of the page
 * (no section in view), so the فهرس card has the stage to itself.
 *
 * On mobile (< md), the rail collapses to a thin progress strip at the
 * bottom of the viewport — a vertical rail next to the slide eats too
 * much horizontal real estate on small screens.
 */
export function ScrollProgressRail({ entries, totalSlides }: ScrollProgressRailProps) {
  const activeId = useActiveSection(entries);
  const progress = useScrollProgress();
  const currentSlide = guessSlideFromProgress(progress, totalSlides);

  if (!activeId) return null;

  return (
    <>
      {/* Desktop: vertical rail on the start edge */}
      <aside
        aria-label="Scroll progress"
        dir="ltr"
        className="pointer-events-none fixed inset-y-0 right-4 z-20 hidden flex-col items-end justify-center md:flex rtl:left-4 rtl:right-auto rtl:items-start"
      >
        <div className="bg-paper/85 pointer-events-auto relative flex flex-col gap-3 rounded-sm border border-border px-2 py-4 shadow-soft backdrop-blur-md">
          {/* Crimson progress line on the inner edge */}
          <span
            aria-hidden
            className="absolute inset-y-0 left-0 w-px bg-border rtl:left-auto rtl:right-0"
          />
          <span
            aria-hidden
            className="absolute left-0 top-0 w-px bg-accent transition-[height] duration-base ease-out rtl:left-auto rtl:right-0"
            style={{ height: `${progress * 100}%` }}
          />

          {entries.map((entry) => {
            const isActive = entry.id === activeId;
            const isPast = entry.slides[1] / totalSlides <= progress && !isActive;
            return (
              <a
                key={entry.id}
                href={`#section-${entry.id}`}
                aria-label={entry.title.en}
                aria-current={isActive ? 'location' : undefined}
                className="group/tick relative flex items-center gap-2 rtl:flex-row-reverse"
              >
                {/* Section title — reveals on hover */}
                <span
                  className={cn(
                    'pointer-events-none whitespace-nowrap rounded-sm border border-border bg-paper-raised px-2 py-0.5 text-[11px] opacity-0 shadow-soft transition-opacity duration-fast',
                    'group-hover/tick:opacity-100 group-focus-visible/tick:opacity-100',
                    isActive && 'opacity-100',
                  )}
                >
                  <SectionTitle entry={entry} />
                </span>
                {/* Tick */}
                <span
                  aria-hidden
                  className={cn(
                    'block h-1.5 w-1.5 shrink-0 rounded-full transition-colors duration-fast',
                    isActive
                      ? 'h-2 w-2 bg-accent'
                      : isPast
                        ? 'bg-ink-muted'
                        : 'bg-border-strong group-hover/tick:bg-ink-muted',
                  )}
                />
              </a>
            );
          })}

          {/* Slide counter */}
          <span
            dir="ltr"
            className="mt-2 border-t border-border pt-2 text-end font-mono text-[10px] uppercase tabular-nums tracking-meta text-ink-faint"
          >
            {currentSlide} / {totalSlides}
          </span>
        </div>
      </aside>

      {/* Mobile: thin sticky progress strip below the AppHeader */}
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
