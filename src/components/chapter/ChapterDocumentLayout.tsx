import Link from 'next/link';
import type { ReactNode } from 'react';
import { ChevronRight, Play } from 'lucide-react';
import type { Chapter } from '@/lib/content/types';
import type { UnitId } from '@/types/unit';
import { LOCALE_DIR } from '@/lib/i18n/constants';
import { I18n } from '@/components/i18n/I18n';
import { ChapterMiniSidebar } from './ChapterMiniSidebar';
import { ChapterPrevNext } from './ChapterPrevNext';
import { ChapterCompletionTracker } from './ChapterCompletionTracker';

export interface ChapterDocumentLayoutProps {
  unitId: UnitId;
  unitTitle: { ar: string; he: string; en: string };
  unitNumber: string;
  chapter: Chapter;
  chapters: readonly Chapter[];
  prev?: Chapter;
  next?: Chapter;
  children: ReactNode;
}

/**
 * Wraps a chapter document. Top-of-page chrome (breadcrumb, chapter
 * heading, slide-range meta), the spread document in the body, a sticky
 * mini-sidebar on the right edge listing every chapter, and prev/next
 * navigation at the foot.
 *
 * The chapter heading mirrors the editorial composition of TitleSpread
 * but at smaller, in-context scale: kicker mark, trilingual title,
 * crimson hairline, italic description, slide-range meta.
 */
export function ChapterDocumentLayout({
  unitId,
  unitTitle,
  unitNumber,
  chapter,
  chapters,
  prev,
  next,
  children,
}: ChapterDocumentLayoutProps) {
  const slideCount = chapter.slides[1] - chapter.slides[0] + 1;

  return (
    <>
      {/* Page body sits in a 12-column-ish grid on lg+ so a sticky
          mini-sidebar can occupy the right rail. On smaller widths the
          sidebar is hidden and the document takes the full column. */}
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 md:px-10">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_220px] lg:gap-16">
          <div className="min-w-0">
            {/* Breadcrumb */}
            <Breadcrumb
              unitId={unitId}
              unitTitle={unitTitle}
              unitNumber={unitNumber}
              chapter={chapter}
            />

            {/* Chapter heading */}
            <header className="mt-10 md:mt-14">
              <I18n
                ar={`الفصل ${chapter.number}`}
                he={`פרק ${chapter.number}`}
                en={`CHAPTER ${chapter.number}`}
                as="span"
                className="block font-mono text-xs uppercase tracking-[0.3em] text-accent"
              />
              <h1 className="mt-5 leading-[1.05]">
                <span
                  data-lang="ar"
                  dir={LOCALE_DIR.ar}
                  className="block font-arabic text-[clamp(36px,5.5vw,80px)] font-medium tracking-[-0.015em] text-ink"
                >
                  {chapter.title.ar}
                </span>
                <span
                  data-lang="he"
                  dir={LOCALE_DIR.he}
                  className="block font-hebrew text-[clamp(34px,5vw,72px)] font-medium text-ink"
                >
                  {chapter.title.he}
                </span>
                <span
                  data-lang="en"
                  dir={LOCALE_DIR.en}
                  className="block font-display text-[clamp(34px,5vw,72px)] font-medium tracking-[-0.025em] text-ink"
                >
                  {chapter.title.en}
                </span>
              </h1>
              {/* Hairline */}
              <div aria-hidden className="mt-6 h-px w-16 bg-accent" />
              {/* Description */}
              <p className="mt-6 max-w-[68ch] text-[clamp(17px,1.7vw,22px)] leading-relaxed">
                <span
                  data-lang="ar"
                  dir={LOCALE_DIR.ar}
                  className="font-arabic leading-arabic text-ink-muted"
                >
                  {chapter.description.ar}
                </span>
                <span data-lang="he" dir={LOCALE_DIR.he} className="font-hebrew text-ink-muted">
                  {chapter.description.he}
                </span>
                <span
                  data-lang="en"
                  dir={LOCALE_DIR.en}
                  className="font-display italic text-ink-muted"
                >
                  {chapter.description.en}
                </span>
              </p>
              {/* Meta */}
              <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[10px] uppercase tracking-[0.25em] text-ink-faint">
                <span>
                  Slides {chapter.slides[0]}–{chapter.slides[1]} ({slideCount})
                </span>
                <span aria-hidden>·</span>
                <span>~{chapter.estimatedMinutes} min</span>
                <span aria-hidden>·</span>
                <Link
                  href={`/units/${unitId}/theory/${chapter.id}/present/`}
                  className="inline-flex items-center gap-1.5 text-accent transition-colors duration-fast hover:text-accent-dark"
                >
                  <Play size={11} strokeWidth={1.5} aria-hidden />
                  <I18n ar="عرض الفصل" he="הצג מצגת" en="Open as presenter" unstyled />
                </Link>
              </div>
            </header>

            {/* The chapter's spreads */}
            <div className="mt-20 md:mt-28">{children}</div>

            {/* Auto-mark complete sentinel sits above the prev/next nav */}
            <ChapterCompletionTracker unitId={unitId} chapterId={chapter.id} />

            {/* Foot navigation */}
            <ChapterPrevNext unitId={unitId} prev={prev} next={next} />
          </div>

          {/* Sticky mini-sidebar — hidden under lg */}
          <ChapterMiniSidebar unitId={unitId} chapters={chapters} activeChapterId={chapter.id} />
        </div>
      </div>
    </>
  );
}

function Breadcrumb({
  unitId,
  unitTitle,
  unitNumber,
  chapter,
}: {
  unitId: UnitId;
  unitTitle: { ar: string; he: string; en: string };
  unitNumber: string;
  chapter: Chapter;
}) {
  return (
    <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-xs">
      <Link
        href={`/units/${unitId}/theory/`}
        className="font-mono uppercase tracking-[0.25em] text-ink-muted transition-colors duration-fast hover:text-ink"
      >
        <I18n
          ar={`الوحدة ${unitNumber} · ${unitTitle.ar}`}
          he={`יחידה ${unitNumber} · ${unitTitle.he}`}
          en={`UNIT ${unitNumber} · ${unitTitle.en}`}
          unstyled
        />
      </Link>
      <ChevronRight
        size={12}
        strokeWidth={1.5}
        aria-hidden
        className="text-ink-faint rtl:rotate-180"
      />
      <span className="font-mono uppercase tracking-[0.25em] text-accent">
        <I18n
          ar={`الفصل ${chapter.number}`}
          he={`פרק ${chapter.number}`}
          en={`Chapter ${chapter.number}`}
          unstyled
        />
      </span>
    </nav>
  );
}
