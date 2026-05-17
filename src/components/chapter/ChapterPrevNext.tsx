import Link from 'next/link';
import { ChevronLeft, ChevronRight, List } from 'lucide-react';
import type { Chapter } from '@/lib/content/types';
import type { UnitId } from '@/types/unit';
import { LOCALE_DIR } from '@/lib/i18n/constants';
import { I18n } from '@/components/i18n/I18n';
import { cn } from '@/lib/utils/cn';

interface ChapterPrevNextProps {
  unitId: UnitId;
  prev?: Chapter;
  next?: Chapter;
}

/**
 * Foot-of-chapter navigation. Two large editorial links — previous and
 * next — flanking a small "Back to chapters" return link. Disabled (and
 * unfocusable) when at first / last chapter.
 *
 * Both prev and next show: a small mono numeral mark, the chapter's
 * trilingual title, and an arrow chevron. Hover reverses chevron motion
 * to mark direction.
 */
export function ChapterPrevNext({ unitId, prev, next }: ChapterPrevNextProps) {
  return (
    <nav
      aria-label="Chapter navigation"
      className="mx-auto mt-32 grid max-w-[1100px] grid-cols-1 gap-10 border-t border-border pt-12 md:mt-40 md:grid-cols-[1fr_auto_1fr] md:gap-12 md:pt-16"
    >
      {/* Prev */}
      <div className="md:justify-self-start">
        <ChapterLink unitId={unitId} chapter={prev} direction="prev" />
      </div>

      {/* Center — back to chapter index */}
      <div className="md:self-end md:pb-2">
        <Link
          href={`/units/${unitId}/theory/`}
          className="group inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-ink-muted transition-colors duration-fast hover:text-ink"
        >
          <List size={14} strokeWidth={1.5} aria-hidden />
          <I18n
            ar="فهرس الفصول"
            he="תוכן עניינים"
            en="Chapters"
            as="span"
            unstyled
            className="font-mono"
          />
        </Link>
      </div>

      {/* Next */}
      <div className="md:justify-self-end md:text-end">
        <ChapterLink unitId={unitId} chapter={next} direction="next" />
      </div>
    </nav>
  );
}

function ChapterLink({
  unitId,
  chapter,
  direction,
}: {
  unitId: UnitId;
  chapter: Chapter | undefined;
  direction: 'prev' | 'next';
}) {
  if (!chapter) {
    // Disabled placeholder so the grid row still has its slot.
    return (
      <span
        aria-hidden
        className="block text-xs uppercase tracking-[0.25em] text-ink-faint opacity-50"
      >
        <span className="font-mono">
          {direction === 'prev' ? '— first chapter' : 'last chapter —'}
        </span>
      </span>
    );
  }
  const isPrev = direction === 'prev';
  return (
    <Link
      href={`/units/${unitId}/theory/${chapter.id}/`}
      className="group flex flex-col gap-2 text-ink transition-colors duration-fast hover:text-accent"
    >
      <span
        className={cn(
          'inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-accent',
          !isPrev && 'md:flex-row-reverse',
        )}
      >
        {isPrev ? (
          <ChevronLeft size={14} strokeWidth={1.5} aria-hidden />
        ) : (
          <ChevronRight size={14} strokeWidth={1.5} aria-hidden />
        )}
        <span>
          <I18n
            ar={isPrev ? 'الفصل السابق' : 'الفصل التالي'}
            he={isPrev ? 'הפרק הקודם' : 'הפרק הבא'}
            en={isPrev ? 'Previous chapter' : 'Next chapter'}
            unstyled
          />
        </span>
        <span aria-hidden className="text-ink-faint">
          ·
        </span>
        <span aria-hidden>{chapter.number}</span>
      </span>
      <span className="block text-2xl leading-tight md:text-3xl">
        <span data-lang="ar" dir={LOCALE_DIR.ar} className="font-arabic font-medium">
          {chapter.title.ar}
        </span>
        <span data-lang="he" dir={LOCALE_DIR.he} className="font-hebrew font-medium">
          {chapter.title.he}
        </span>
        <span
          data-lang="en"
          dir={LOCALE_DIR.en}
          className="font-display font-medium tracking-[-0.015em]"
        >
          {chapter.title.en}
        </span>
      </span>
    </Link>
  );
}
