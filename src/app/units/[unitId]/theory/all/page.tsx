import Link from 'next/link';
import { ChevronRight, List, Play } from 'lucide-react';
import { Fragment } from 'react';
import { PlaceholderPanel } from '@/components/layout/PlaceholderPanel';
import { UNIT_03_DECK, UNIT_03_NUMBER } from '@/content/units/newtons-laws/lectureDeck';
import { UNIT_03_TOC, sectionAnchorForSlide } from '@/content/units/newtons-laws/toc';
import { DeckIndex } from '@/components/baseline/DeckIndex';
import { ScrollProgressRail } from '@/components/baseline/ScrollProgressRail';
import { ChapterBreak, renderSpread } from '@/components/spreads';
import { I18n } from '@/components/i18n/I18n';

export function generateStaticParams() {
  // Only units with an authored deck get the long-scroll route.
  return [{ unitId: 'newtons-laws' }];
}

export interface TheoryAllPageProps {
  params: { unitId: string };
}

/**
 * Long-scroll variant of the theory document. Renders the entire unit as
 * one continuous editorial composition with chapter breaks marking
 * thematic transitions. Reachable from the chapter index for students
 * who prefer to read straight through.
 *
 * The chapter breaks here are *announcements* (typographic dividers
 * between sections) — they do NOT match the chapter route boundaries
 * exactly because the long-scroll version closes with the unit summary
 * (slide 33) which doesn't belong to any single chapter route.
 */
const CHAPTER_BREAKS: Record<
  number,
  { numeral: string; title: { ar: string; he: string; en: string } }
> = {
  7: {
    numeral: 'I',
    title: { ar: 'القوانين', he: 'החוקים', en: 'The Laws' },
  },
  19: {
    numeral: 'II',
    title: {
      ar: 'القوى الأربع',
      he: 'ארבעת הכוחות',
      en: 'The Four Forces',
    },
  },
  27: {
    numeral: 'III',
    title: { ar: 'التركيب', he: 'הסינתזה', en: 'Synthesis' },
  },
  28: {
    numeral: 'IV',
    title: {
      ar: 'مفاهيم خاطئة شائعة',
      he: 'טעויות נפוצות',
      en: 'Common Pitfalls',
    },
  },
};

export default function TheoryAllPage({ params }: TheoryAllPageProps) {
  if (params.unitId !== 'newtons-laws') {
    return <PlaceholderPanel mode="theory" />;
  }
  const total = UNIT_03_DECK.length;
  return (
    <>
      <ScrollProgressRail entries={UNIT_03_TOC} totalSlides={total} />

      {/* Header strip — back link + presenter CTA + index card. */}
      <div className="mx-auto max-w-[1100px] px-4 sm:px-6 md:px-10">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Link
            href={`/units/${params.unitId}/theory/`}
            className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-ink-muted transition-colors duration-fast hover:text-ink"
          >
            <List size={13} strokeWidth={1.5} aria-hidden />
            <I18n ar="فهرس الفصول" he="תוכן עניינים" en="Back to chapters" as="span" unstyled />
            <ChevronRight size={12} strokeWidth={1.5} aria-hidden className="rtl:rotate-180" />
          </Link>
          <Link
            href={`/units/${params.unitId}/theory/present/`}
            className="group inline-flex items-center gap-2 border border-accent bg-accent px-5 py-2.5 text-xs uppercase tracking-meta text-ink-inverted transition-colors duration-fast ease-out hover:bg-accent-dark"
          >
            <Play size={14} strokeWidth={1.5} aria-hidden />
            <I18n ar="ابدأ العرض" he="הפעל מצגת" en="Open presenter" as="span" unstyled />
          </Link>
        </div>

        <div className="mt-10">
          <DeckIndex entries={UNIT_03_TOC} totalSlides={total} />
        </div>
      </div>

      {/* The full-unit spread document */}
      <article className="mt-20 md:mt-32">
        {UNIT_03_DECK.map((entry, i) => {
          const n = i + 1;
          const sectionId = sectionAnchorForSlide(n);
          const chapter = CHAPTER_BREAKS[n];
          return (
            <Fragment key={n}>
              {chapter && <ChapterBreak numeral={chapter.numeral} title={chapter.title} />}
              {sectionId && (
                <span id={`section-${sectionId}`} aria-hidden className="block scroll-mt-24" />
              )}
              {renderSpread(entry, UNIT_03_NUMBER, `slide-${n}`)}
            </Fragment>
          );
        })}
      </article>
    </>
  );
}
