import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { UNIT_03_DECK, UNIT_03_NUMBER } from '@/content/units/newtons-laws/lectureDeck';
import { UNIT_03_TOC } from '@/content/units/newtons-laws/toc';
import { findChapter, nextChapter, sliceDeckByChapter } from '@/lib/content/chapters';
import { getChapterStaticParams } from '@/lib/content/chapterParams';
import { PresenterShell } from '@/components/baseline/PresenterShell';
import { renderBaselineSlide } from '@/components/baseline/renderSlide';

export const generateStaticParams = getChapterStaticParams;

export interface ChapterPresentPageProps {
  params: { unitId: string; chapterId: string };
}

/**
 * Per-chapter presenter route. Same `PresenterShell` as the full-unit
 * presenter, scoped to one chapter's slide range. The shell receives the
 * chapter object so it can:
 *
 *   - swap the breadcrumb to "Chapter II · The Three Laws"
 *   - count slides locally ("3 / 12" not "9 / 33")
 *   - exit back to the chapter document instead of the chapter index
 *   - show the "End of chapter — continue?" CTA on the last slide
 */
export default function ChapterPresentPage({ params }: ChapterPresentPageProps) {
  if (params.unitId !== 'newtons-laws') {
    notFound();
  }
  const chapter = findChapter(params.unitId, params.chapterId);
  if (!chapter) {
    notFound();
  }
  const next = nextChapter(params.unitId, params.chapterId);
  const slidesInChapter = sliceDeckByChapter(UNIT_03_DECK, chapter);
  const total = slidesInChapter.length;
  const slides = slidesInChapter.map(({ n, entry }) =>
    renderBaselineSlide(UNIT_03_NUMBER, entry, `${n - chapter.slides[0] + 1}/${total}`),
  );

  return (
    <Suspense fallback={null}>
      <PresenterShell
        slides={slides}
        toc={UNIT_03_TOC}
        unitId={params.unitId}
        totalSlides={total}
        chapter={chapter}
        nextChapter={next}
      />
    </Suspense>
  );
}
