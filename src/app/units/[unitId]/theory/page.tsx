import { PlaceholderPanel } from '@/components/layout/PlaceholderPanel';
import { getUnitStaticParams } from '@/lib/content/staticParams';
import { UNIT_03_DECK, renderUnit03Slide } from '@/content/units/newtons-laws/lectureDeck';
import { UNIT_03_TOC, sectionAnchorForSlide } from '@/content/units/newtons-laws/toc';
import { DeckIndex } from '@/components/baseline/DeckIndex';

export const generateStaticParams = getUnitStaticParams;

export interface TheoryPageProps {
  params: { unitId: string };
}

export default function TheoryPage({ params }: TheoryPageProps) {
  if (params.unitId === 'newtons-laws') {
    const total = UNIT_03_DECK.length;
    return (
      <div className="space-y-12">
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
                {renderUnit03Slide(entry, `${n}/${total}`)}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
  return <PlaceholderPanel mode="theory" />;
}
