'use client';

import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { useProgress } from '@/lib/db/hooks';
import type { Chapter } from '@/lib/content/types';
import type { UnitId } from '@/types/unit';
import { LOCALE_DIR } from '@/lib/i18n/constants';
import { I18n } from '@/components/i18n/I18n';
import { cn } from '@/lib/utils/cn';

interface ChapterCardProps {
  unitId: UnitId;
  chapter: Chapter;
  /** All chapters in the unit, used to look up prerequisite titles for the
   *  "Recommended after Chapter X" hint. */
  chapters: readonly Chapter[];
}

/**
 * Editorial chapter index row. Not a card frame — the whole component is
 * a clickable Link composed of typographic regions separated by space and
 * a hairline rule beneath. Reads like a beautifully set magazine table of
 * contents.
 *
 * Layout:
 *   - Roman numeral on the start side, large italic Fraunces in crimson.
 *   - Title block — trilingual title in display, description in italic
 *     beneath, optional "recommended after Chapter X" hint if the
 *     prerequisite isn't yet completed.
 *   - End side — slide-range and minutes in mono, with a thin progress
 *     track showing completion (filled = read end-to-end, empty otherwise).
 *   - On hover: chevron slides toward the start in RTL / end in LTR;
 *     subtle ink shift.
 */
export function ChapterCard({ unitId, chapter, chapters }: ChapterCardProps) {
  const progress = useProgress(unitId);
  const isCompleted = progress.completedChapters.includes(chapter.id);

  // Soft-sequencing hint: if a prerequisite isn't yet done, surface a
  // gentle "read X first" caption.
  const unmetPrereq = chapter.prerequisites
    .map((id) => chapters.find((c) => c.id === id))
    .find((c) => c && !progress.completedChapters.includes(c.id));

  return (
    <li className="border-b border-border last:border-b-0">
      <Link
        href={`/units/${unitId}/theory/${chapter.id}/`}
        className={cn(
          'group block py-10 transition-colors duration-fast md:py-12',
          isCompleted ? 'text-ink-muted' : 'text-ink',
        )}
      >
        <div className="grid grid-cols-[auto_1fr_auto] items-baseline gap-6 md:gap-12">
          {/* Roman numeral */}
          <span
            aria-hidden
            className={cn(
              'self-start font-display text-[clamp(28px,3.6vw,48px)] font-medium italic leading-none tracking-tight transition-colors duration-fast',
              isCompleted ? 'text-ink-faint' : 'text-accent group-hover:text-accent-dark',
            )}
          >
            {chapter.number}
          </span>

          {/* Title + description */}
          <div className="min-w-0">
            <h3 className="leading-tight">
              <span
                data-lang="ar"
                dir={LOCALE_DIR.ar}
                className="block font-arabic text-[clamp(22px,2.6vw,34px)] font-medium tracking-[-0.005em]"
              >
                {chapter.title.ar}
              </span>
              <span
                data-lang="he"
                dir={LOCALE_DIR.he}
                className="block font-hebrew text-[clamp(22px,2.6vw,34px)] font-medium"
              >
                {chapter.title.he}
              </span>
              <span
                data-lang="en"
                dir={LOCALE_DIR.en}
                className="block font-display text-[clamp(22px,2.6vw,34px)] font-medium tracking-[-0.02em] group-hover:text-accent"
              >
                {chapter.title.en}
              </span>
            </h3>
            <p className="mt-3 max-w-[58ch] text-base leading-relaxed md:text-lg">
              <span
                data-lang="ar"
                dir={LOCALE_DIR.ar}
                className="font-arabic leading-arabic text-ink-muted"
              >
                {chapter.description.ar}
              </span>
              <span data-lang="he" dir={LOCALE_DIR.he} className="font-hebrew text-ink-muted">
                {chapter.description.he}
              </span>
              <span
                data-lang="en"
                dir={LOCALE_DIR.en}
                className="font-display italic text-ink-muted"
              >
                {chapter.description.en}
              </span>
            </p>
            {unmetPrereq && (
              <p className="mt-3 font-display text-sm italic text-ink-faint">
                <I18n
                  ar={`يُستحسَن بعد ${unmetPrereq.title.ar}`}
                  he={`מומלץ אחרי ${unmetPrereq.title.he}`}
                  en={`Recommended after Chapter ${unmetPrereq.number} · ${unmetPrereq.title.en}`}
                  unstyled
                />
              </p>
            )}
          </div>

          {/* Slide range + minutes + progress */}
          <div dir="ltr" className="flex w-32 shrink-0 flex-col items-end gap-2 self-start md:w-44">
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-ink-faint">
              Slides {chapter.slides[0]}–{chapter.slides[1]}
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-ink-faint">
              ~{chapter.estimatedMinutes} min
            </span>
            <ProgressTrack isCompleted={isCompleted} />
            {isCompleted && (
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-success">
                ✓ Read
              </span>
            )}
            <ChevronLeft
              size={14}
              strokeWidth={1.5}
              aria-hidden
              className="mt-1 -translate-x-0 text-ink-faint transition-transform duration-fast group-hover:-translate-x-1 group-hover:text-accent rtl:rotate-180 rtl:group-hover:translate-x-1"
            />
          </div>
        </div>
      </Link>
    </li>
  );
}

function ProgressTrack({ isCompleted }: { isCompleted: boolean }) {
  return (
    <div
      aria-hidden
      className="relative mt-2 h-px w-full bg-border"
      role="progressbar"
      aria-valuenow={isCompleted ? 100 : 0}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <span
        className={cn(
          'absolute inset-y-0 left-0 transition-all duration-base ease-out',
          isCompleted ? 'w-full bg-accent' : 'w-0',
        )}
      />
    </div>
  );
}
