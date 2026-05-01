import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { UNIT_03_DECK, renderUnit03Slide } from '@/content/units/newtons-laws/lectureDeck';
import { UNIT_03_TOC } from '@/content/units/newtons-laws/toc';
import { PresenterShell } from '@/components/baseline/PresenterShell';

export function generateStaticParams() {
  // Only units with an authored deck get a presenter route; the others would
  // 404 at runtime anyway, so we don't pre-render the empty cases.
  return [{ unitId: 'newtons-laws' }];
}

export interface PresentPageProps {
  params: { unitId: string };
}

/**
 * Real presenter route. Renders all slides server-side once and hands the
 * array to the client `<PresenterShell>`, which manages keyboard navigation,
 * fullscreen, and the visible slide.
 */
export default function PresentPage({ params }: PresentPageProps) {
  if (params.unitId !== 'newtons-laws') {
    notFound();
  }
  const total = UNIT_03_DECK.length;
  const slides = UNIT_03_DECK.map((entry, i) => renderUnit03Slide(entry, `${i + 1}/${total}`));
  return (
    <Suspense fallback={null}>
      <PresenterShell
        slides={slides}
        toc={UNIT_03_TOC}
        unitId={params.unitId}
        totalSlides={total}
      />
    </Suspense>
  );
}
