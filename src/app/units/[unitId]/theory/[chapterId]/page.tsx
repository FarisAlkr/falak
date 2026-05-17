import { notFound } from 'next/navigation';
import { Fragment } from 'react';
import { loadUnit } from '@/lib/content/baseline';
import { findChapter, nextChapter, prevChapter, sliceDeckByChapter } from '@/lib/content/chapters';
import { getChapterStaticParams } from '@/lib/content/chapterParams';
import { getChapterUnit } from '@/lib/content/chapterUnits';
import { ChapterDocumentLayout } from '@/components/chapter/ChapterDocumentLayout';
import { renderSpread } from '@/components/spreads';
import { requireUnitId } from '@/types/unit';

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
  const cfg = getChapterUnit(params.unitId);
  const chapter = cfg && findChapter(params.unitId, params.chapterId);
  if (!cfg || !chapter) {
    notFound();
  }

  const unit = await loadUnit(cfg.number);
  const slidesInChapter = sliceDeckByChapter(cfg.deck, chapter);
  const prev = prevChapter(params.unitId, params.chapterId);
  const next = nextChapter(params.unitId, params.chapterId);

  return (
    <ChapterDocumentLayout
      unitId={requireUnitId(params.unitId)}
      unitTitle={unit.frontmatter.titles}
      unitNumber={unit.frontmatter.unit.number}
      chapter={chapter}
      chapters={cfg.chapters}
      prev={prev}
      next={next}
    >
      {slidesInChapter.map(({ n, entry }) => {
        const sectionId = cfg.sectionAnchorForSlide(n);
        return (
          <Fragment key={n}>
            {sectionId && (
              <span id={`section-${sectionId}`} aria-hidden className="block scroll-mt-24" />
            )}
            {renderSpread(entry, cfg.number, `slide-${n}`)}
          </Fragment>
        );
      })}
    </ChapterDocumentLayout>
  );
}
