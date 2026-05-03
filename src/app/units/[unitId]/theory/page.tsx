import Link from 'next/link';
import { Play } from 'lucide-react';
import { PlaceholderPanel } from '@/components/layout/PlaceholderPanel';
import { getUnitStaticParams } from '@/lib/content/staticParams';
import { UNIT_03_DECK, UNIT_03_NUMBER } from '@/content/units/newtons-laws/lectureDeck';
import { UNIT_03_TOC, sectionAnchorForSlide } from '@/content/units/newtons-laws/toc';
import { DeckIndex } from '@/components/baseline/DeckIndex';
import { ScrollProgressRail } from '@/components/baseline/ScrollProgressRail';
import { renderBaselineSlide } from '@/components/baseline/renderSlide';
import { I18n } from '@/components/i18n/I18n';

export const generateStaticParams = getUnitStaticParams;

export interface TheoryPageProps {
  params: { unitId: string };
}

export default function TheoryPage({ params }: TheoryPageProps) {
  if (params.unitId === 'newtons-laws') {
    const total = UNIT_03_DECK.length;
    return (
      <>
        <ScrollProgressRail entries={UNIT_03_TOC} totalSlides={total} />
        <div className="space-y-12">
          <div className="flex items-center justify-end">
            <Link
              href={`/units/${params.unitId}/theory/present/`}
              className="group inline-flex items-center gap-2 border border-accent bg-accent px-5 py-2.5 text-xs uppercase tracking-meta text-ink-inverted transition-colors duration-fast ease-out hover:bg-accent-dark"
            >
              <Play size={14} strokeWidth={1.5} aria-hidden />
              <I18n ar="ابدأ العرض" he="הפעל מצגת" en="Open presenter" as="span" unstyled />
            </Link>
          </div>

          <DeckIndex entries={UNIT_03_TOC} totalSlides={total} />

          <div className="space-y-10">
            {UNIT_03_DECK.map((entry, i) => {
              const n = i + 1;
              const sectionId = sectionAnchorForSlide(n);
              return (
                <div
                  key={n}
                  id={`slide-${n}`}
                  {...(sectionId ? { 'data-section': sectionId } : {})}
                  className="scroll-mt-24"
                >
                  {sectionId && (
                    // Invisible section anchor placed *above* the slide so a
                    // jump-to-section link lands on the section break, not on
                    // the slide chrome. scroll-mt-24 keeps the title visible
                    // below the sticky header.
                    <span id={`section-${sectionId}`} aria-hidden className="block scroll-mt-24" />
                  )}
                  {renderBaselineSlide(UNIT_03_NUMBER, entry, `${n}/${total}`)}
                </div>
              );
            })}
          </div>
        </div>
      </>
    );
  }
  return <PlaceholderPanel mode="theory" />;
}
