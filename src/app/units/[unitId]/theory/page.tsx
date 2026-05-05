import Link from 'next/link';
import { Play } from 'lucide-react';
import { Fragment, type ReactNode } from 'react';
import { PlaceholderPanel } from '@/components/layout/PlaceholderPanel';
import { getUnitStaticParams } from '@/lib/content/staticParams';
import { UNIT_03_DECK, UNIT_03_NUMBER } from '@/content/units/newtons-laws/lectureDeck';
import { UNIT_03_TOC, sectionAnchorForSlide } from '@/content/units/newtons-laws/toc';
import { DeckIndex } from '@/components/baseline/DeckIndex';
import { ScrollProgressRail } from '@/components/baseline/ScrollProgressRail';
import {
  ChapterBreak,
  ConceptSpread,
  ExampleSpread,
  HookSpread,
  MisconceptionSpread,
  SummarySpread,
  TitleSpread,
} from '@/components/spreads';
import type { BaselineDeckSlide } from '@/lib/content/types';
import { I18n } from '@/components/i18n/I18n';

export const generateStaticParams = getUnitStaticParams;

export interface TheoryPageProps {
  params: { unitId: string };
}

/**
 * Chapter breaks for Unit 03's narrative. Inserted *before* the slide at
 * the given 1-indexed slide number. The unit reads as five chapters:
 *
 *   - Foundations (slides 1-6)        — title, hook, force-vector, net-force
 *   - I · The Laws (slides 7-18)      — N-I, N-II, N-III + their examples
 *   - II · The Four Forces (19-26)    — weight, normal, tension, friction
 *   - III · Synthesis (27)            — cumulative incline-with-friction
 *   - IV · Common Pitfalls (28-32)    — misconceptions
 *   - Closing (33)                    — summary
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

function renderSpread(entry: BaselineDeckSlide, unit: string, domId: string): ReactNode {
  switch (entry.type) {
    case 'title':
      return <TitleSpread unit={unit} id={domId} />;
    case 'hook':
      return <HookSpread unit={unit} id={domId} />;
    case 'concept':
      if (!entry.id) return null;
      return <ConceptSpread unit={unit} id={entry.id} domId={domId} />;
    case 'example':
      if (!entry.id) return null;
      return <ExampleSpread unit={unit} id={entry.id} domId={domId} />;
    case 'misconception':
      if (!entry.id) return null;
      return <MisconceptionSpread unit={unit} id={entry.id} domId={domId} />;
    case 'summary':
      return <SummarySpread unit={unit} id={domId} />;
  }
}

export default function TheoryPage({ params }: TheoryPageProps) {
  if (params.unitId === 'newtons-laws') {
    const total = UNIT_03_DECK.length;
    return (
      <>
        <ScrollProgressRail entries={UNIT_03_TOC} totalSlides={total} />

        {/* Header strip — present CTA + index card. The editorial spread
            document begins below. */}
        <div className="mx-auto max-w-[1100px] px-4 sm:px-6 md:px-10">
          <div className="flex items-center justify-end">
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

        {/* The spread document — one continuous editorial composition.
            No uniform card frames. Each slide-type renders a spread that
            owns its layout, figure size, and typographic hierarchy. */}
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
  return <PlaceholderPanel mode="theory" />;
}
