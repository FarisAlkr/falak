'use client';

import Link from 'next/link';
import { useProgress } from '@/lib/db/hooks';
import type { Chapter } from '@/lib/content/types';
import type { UnitId } from '@/types/unit';
import { LOCALE_DIR } from '@/lib/i18n/constants';
import { cn } from '@/lib/utils/cn';

interface ChapterMiniSidebarProps {
  unitId: UnitId;
  chapters: readonly Chapter[];
  /** The chapter currently being read. Used to mark the active row. */
  activeChapterId: string;
}

/**
 * Sticky right-edge mini-sidebar shown on chapter document pages. Lists
 * every chapter of the unit with a soft-sequencing dot system:
 *
 *   - filled crimson dot = currently reading
 *   - filled ink dot     = already completed
 *   - empty hairline dot = not yet started
 *
 * No locks. Every chapter is clickable regardless of completion state.
 *
 * Hidden under md (a vertical rail next to a long document is too noisy
 * on small viewports; the prev/next nav at the foot covers mobile).
 */
export function ChapterMiniSidebar({ unitId, chapters, activeChapterId }: ChapterMiniSidebarProps) {
  const progress = useProgress(unitId);
  const completed = progress.completedChapters;

  return (
    <aside aria-label="Chapter navigation" dir="ltr" className="hidden lg:block">
      <div className="sticky top-32 flex flex-col gap-3 rtl:items-end">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink-faint">
          Chapters
        </span>
        <nav>
          <ol className="space-y-3">
            {chapters.map((c) => {
              const isActive = c.id === activeChapterId;
              const isCompleted = completed.includes(c.id);
              return (
                <li key={c.id}>
                  <Link
                    href={`/units/${unitId}/theory/${c.id}/`}
                    aria-current={isActive ? 'page' : undefined}
                    className={cn(
                      'group flex items-baseline gap-3 transition-colors duration-fast',
                      isActive
                        ? 'text-ink'
                        : isCompleted
                          ? 'text-ink-muted hover:text-ink'
                          : 'text-ink-faint hover:text-ink-muted',
                    )}
                  >
                    <span
                      aria-hidden
                      className={cn(
                        'mt-2 inline-block shrink-0 rounded-full transition-all duration-fast',
                        isActive
                          ? 'h-2.5 w-2.5 bg-accent ring-2 ring-paper'
                          : isCompleted
                            ? 'h-2 w-2 bg-ink-muted'
                            : 'h-2 w-2 border border-ink-faint',
                      )}
                    />
                    <span className="flex flex-col">
                      <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink-faint">
                        {c.number}
                      </span>
                      <span className="leading-snug">
                        <span data-lang="ar" dir={LOCALE_DIR.ar} className="font-arabic">
                          {c.title.ar}
                        </span>
                        <span data-lang="he" dir={LOCALE_DIR.he} className="font-hebrew">
                          {c.title.he}
                        </span>
                        <span data-lang="en" dir={LOCALE_DIR.en} className="font-display">
                          {c.title.en}
                        </span>
                      </span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ol>
        </nav>
      </div>
    </aside>
  );
}
