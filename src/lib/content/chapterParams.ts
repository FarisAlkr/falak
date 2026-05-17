import { CHAPTER_UNITS } from './chapterUnits';

/**
 * `generateStaticParams` helper for chapter routes
 * (`/units/[unitId]/theory/[chapterId]/...`). Returns one entry per
 * (unit × chapter) combination, derived from the central `CHAPTER_UNITS`
 * registry. Non-chapter-enabled units 404 on these routes — Next.js's
 * static export only pre-renders the params returned here.
 */
export function getChapterStaticParams(): Array<{
  unitId: string;
  chapterId: string;
}> {
  const params: Array<{ unitId: string; chapterId: string }> = [];
  for (const [unitId, cfg] of Object.entries(CHAPTER_UNITS)) {
    for (const chapter of cfg.chapters) {
      params.push({ unitId, chapterId: chapter.id });
    }
  }
  return params;
}
