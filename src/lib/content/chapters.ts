import type { BaselineDeckSlide, Chapter } from './types';
import { NEWTONS_LAWS_CHAPTERS } from '@/content/units/newtons-laws/chapters';

/**
 * Generic chapter utilities. Per-unit chapter manifests live alongside
 * each unit's content (`src/content/units/{slug}/chapters.ts`); this
 * module is the lookup + slicing layer that pages and route helpers
 * call against any unit.
 */

const UNIT_CHAPTERS: Record<string, readonly Chapter[]> = {
  'newtons-laws': NEWTONS_LAWS_CHAPTERS,
};

/** All chapters for the given unit. Empty if the unit has no manifest. */
export function getUnitChapters(unitId: string): readonly Chapter[] {
  return UNIT_CHAPTERS[unitId] ?? [];
}

/** Find a chapter by its slug within a unit. */
export function findChapter(unitId: string, chapterId: string): Chapter | undefined {
  return getUnitChapters(unitId).find((c) => c.id === chapterId);
}

/** Index of the chapter in the unit's chapter list. -1 if not found. */
export function chapterIndex(unitId: string, chapterId: string): number {
  return getUnitChapters(unitId).findIndex((c) => c.id === chapterId);
}

/** The next chapter after the given one, or undefined if it's the last. */
export function nextChapter(unitId: string, chapterId: string): Chapter | undefined {
  const chapters = getUnitChapters(unitId);
  const i = chapterIndex(unitId, chapterId);
  if (i < 0 || i >= chapters.length - 1) return undefined;
  return chapters[i + 1];
}

/** The previous chapter before the given one, or undefined if it's the first. */
export function prevChapter(unitId: string, chapterId: string): Chapter | undefined {
  const chapters = getUnitChapters(unitId);
  const i = chapterIndex(unitId, chapterId);
  if (i <= 0) return undefined;
  return chapters[i - 1];
}

/**
 * Slice a deck manifest to only the slides in a chapter's range. Returns
 * pairs of (slideNumber, entry) so the renderer keeps the unit-wide slide
 * numbers (essential for the slide-counter chrome and for cross-references
 * back to the long-scroll page).
 */
export function sliceDeckByChapter(
  deck: readonly BaselineDeckSlide[],
  chapter: Chapter,
): Array<{ n: number; entry: BaselineDeckSlide }> {
  const [start, end] = chapter.slides;
  const out: Array<{ n: number; entry: BaselineDeckSlide }> = [];
  for (let i = start - 1; i < end && i < deck.length; i++) {
    const entry = deck[i];
    if (entry) out.push({ n: i + 1, entry });
  }
  return out;
}

/** All TocEntries for a unit limited to the chapter's range. Used by the
 *  chapter mini-sidebar to show in-chapter navigation if needed later. */
export function chapterTotalSlides(chapter: Chapter): number {
  return chapter.slides[1] - chapter.slides[0] + 1;
}
