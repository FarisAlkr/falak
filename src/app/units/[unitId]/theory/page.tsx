import { PlaceholderPanel } from '@/components/layout/PlaceholderPanel';
import { getUnitStaticParams } from '@/lib/content/staticParams';
import { UNIT_03_DECK, renderUnit03Slide } from '@/content/units/newtons-laws/lectureDeck';

export const generateStaticParams = getUnitStaticParams;

export interface TheoryPageProps {
  params: { unitId: string };
}

export default function TheoryPage({ params }: TheoryPageProps) {
  if (params.unitId === 'newtons-laws') {
    const total = UNIT_03_DECK.length;
    return (
      <div className="space-y-10">
        {UNIT_03_DECK.map((entry, i) => (
          <div key={i}>{renderUnit03Slide(entry, `${i + 1}/${total}`)}</div>
        ))}
      </div>
    );
  }
  return <PlaceholderPanel mode="theory" />;
}
