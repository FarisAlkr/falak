import type { BaselineDeckSlide, Chapter } from './types';
import { NEWTONS_LAWS_CHAPTERS } from '@/content/units/newtons-laws/chapters';
import { UNIT_03_DECK, UNIT_03_NUMBER } from '@/content/units/newtons-laws/lectureDeck';
import { sectionAnchorForSlide as newtonsLawsSectionAnchor } from '@/content/units/newtons-laws/toc';

/**
 * Single registry of units that have authored chapter manifests.
 *
 * Add a new unit here once its `chapters.ts`, `lectureDeck.tsx`, and
 * `toc.ts` are ready — this is the only place that needs to change.
 * Consumers:
 *   - `lib/content/chapters.ts` — chapter lookup utilities
 *   - `lib/content/chapterParams.ts` — chapter-route static params
 *   - the theory chapter-index page (slug → baseline number)
 *   - the per-chapter page (slug → deck + section-anchor resolver)
 */
export interface ChapterUnit {
  /** Zero-padded baseline number, e.g. `'03'`. */
  readonly number: string;
  /** Chapter manifest. */
  readonly chapters: readonly Chapter[];
  /** Full deck. Each chapter's slide range slices into this. */
  readonly deck: readonly BaselineDeckSlide[];
  /** Map a 1-indexed slide number to its TOC anchor, if any. */
  readonly sectionAnchorForSlide: (slideNumber: number) => string | undefined;
}

export const CHAPTER_UNITS = {
  'newtons-laws': {
    number: UNIT_03_NUMBER,
    chapters: NEWTONS_LAWS_CHAPTERS,
    deck: UNIT_03_DECK,
    sectionAnchorForSlide: newtonsLawsSectionAnchor,
  },
} as const satisfies Record<string, ChapterUnit>;

export type ChapterEnabledUnitId = keyof typeof CHAPTER_UNITS;

/** Type-guard form: narrows the slug to a chapter-enabled unit id. */
export function isChapterEnabled(slug: string): slug is ChapterEnabledUnitId {
  return slug in CHAPTER_UNITS;
}

/** Lookup. Returns undefined for non-chapter-enabled slugs. */
export function getChapterUnit(slug: string): ChapterUnit | undefined {
  return isChapterEnabled(slug) ? CHAPTER_UNITS[slug] : undefined;
}
