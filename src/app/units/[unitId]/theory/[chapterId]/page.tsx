import { notFound } from 'next/navigation';
import { Fragment } from 'react';
import { loadUnit } from '@/lib/content/baseline';
import {
  findChapter,
  getUnitChapters,
  nextChapter,
  prevChapter,
  sliceDeckByChapter,
} from '@/lib/content/chapters';
import { getChapterStaticParams } from '@/lib/content/chapterParams';
import { UNIT_03_DECK, UNIT_03_NUMBER } from '@/content/units/newtons-laws/lectureDeck';
import { sectionAnchorForSlide } from '@/content/units/newtons-laws/toc';
import { ChapterDocumentLayout } from '@/components/chapter/ChapterDocumentLayout';
import { renderSpread } from '@/components/spreads';
import type { UnitId } from '@/types/unit';

export const generateStaticParams = getChapterStaticParams;

export interface ChapterPageProps {
  params: { unitId: string; chapterId: string };
}

/**
 * Per-chapter document. Renders the spreads in the chapter's slide range
 * inside the editorial `ChapterDocumentLayout` (breadcrumb, heading,
 * mini-sidebar, prev/next nav). The content rendering itself reuses the
 * same `renderSpread` switch as the long-scroll route — the difference is
 * just the slice.
 *
 * Chapter routes intentionally skip the long-scroll's `<ChapterBreak>`
 * dividers — the layout's heading already announces which chapter you're
 * in; an inline divider would be redundant.
 */
export default async function ChapterPage({ params }: ChapterPageProps) {
  const chapters = getUnitChapters(params.unitId);
  const chapter = findChapter(params.unitId, params.chapterId);
  if (!chapter || chapters.length === 0) {
    notFound();
  }

  // Each unit hard-codes its deck import. As more units land, this becomes
  // a per-unit lookup table.
  if (params.unitId !== 'newtons-laws') {
    notFound();
  }

  const unit = await loadUnit(UNIT_03_NUMBER);
  const slidesInChapter = sliceDeckByChapter(UNIT_03_DECK, chapter);
  const prev = prevChapter(params.unitId, params.chapterId);
  const next = nextChapter(params.unitId, params.chapterId);

  return (
    <ChapterDocumentLayout
      unitId={params.unitId as UnitId}
      unitTitle={unit.frontmatter.titles}
      unitNumber={unit.frontmatter.unit.number}
      chapter={chapter}
      chapters={chapters}
      prev={prev}
      next={next}
    >
      {slidesInChapter.map(({ n, entry }) => {
        const sectionId = sectionAnchorForSlide(n);
        return (
          <Fragment key={n}>
            {sectionId && (
              <span id={`section-${sectionId}`} aria-hidden className="block scroll-mt-24" />
            )}
            {renderSpread(entry, UNIT_03_NUMBER, `slide-${n}`)}
          </Fragment>
        );
      })}
    </ChapterDocumentLayout>
  );
}
