import { getUnitChapters } from './chapters';

/**
 * `generateStaticParams` helper for chapter routes
 * (`/units/[unitId]/theory/[chapterId]/...`). Returns one entry per
 * (unit × chapter) combination. Today only Newton's Laws has chapters,
 * so this yields exactly five entries.
 *
 * Other units would 404 on chapter routes regardless, so we don't
 * generate empty static paths for them — Next.js's static export only
 * pre-renders what we list here.
 */
export function getChapterStaticParams(): Array<{
  unitId: string;
  chapterId: string;
}> {
  const params: Array<{ unitId: string; chapterId: string }> = [];
  // Hard-coded set of units that have chapter manifests. As more units
  // are authored their slugs go here.
  const unitsWithChapters = ['newtons-laws'] as const;
  for (const unitId of unitsWithChapters) {
    for (const chapter of getUnitChapters(unitId)) {
      params.push({ unitId, chapterId: chapter.id });
    }
  }
  return params;
}
