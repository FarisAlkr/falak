import { LOCALE_DIR } from '@/lib/i18n/constants';
import { Rise } from './Rise';

export interface ChapterBreakProps {
  /** Roman numeral (I, II, III, …). Set as the chapter mark. */
  numeral: string;
  /** Trilingual chapter title. */
  title: { ar: string; he: string; en: string };
}

/**
 * Editorial chapter break. Generous vertical breathing (8rem each side),
 * a thin hairline, a small Roman numeral mark, and the chapter's
 * trilingual title set in display Fraunces. Inserted between groups of
 * concept spreads to mark thematic transitions in the unit's narrative.
 */
export function ChapterBreak({ numeral, title }: ChapterBreakProps) {
  return (
    <div
      role="separator"
      aria-label={`Chapter ${numeral}: ${title.en}`}
      className="mx-auto my-32 max-w-[1100px] px-6 text-center md:my-40"
    >
      <Rise>
        <div className="flex items-center justify-center gap-6">
          <span aria-hidden className="h-px w-24 bg-border-strong md:w-32" />
          <span className="font-mono text-xs uppercase tracking-[0.4em] text-accent">
            {numeral}
          </span>
          <span aria-hidden className="h-px w-24 bg-border-strong md:w-32" />
        </div>
      </Rise>
      <Rise delay={0.1} className="mt-8">
        <h2 className="text-balance">
          <span
            data-lang="ar"
            dir={LOCALE_DIR.ar}
            className="block font-arabic text-[clamp(28px,4vw,56px)] font-medium leading-[1.2] tracking-[-0.01em] text-ink"
          >
            {title.ar}
          </span>
          <span
            data-lang="he"
            dir={LOCALE_DIR.he}
            className="block font-hebrew text-[clamp(26px,3.5vw,48px)] font-medium leading-[1.15] text-ink"
          >
            {title.he}
          </span>
          <span
            data-lang="en"
            dir={LOCALE_DIR.en}
            className="block font-display text-[clamp(24px,3.2vw,44px)] font-medium italic leading-[1.15] tracking-[-0.02em] text-ink"
          >
            {title.en}
          </span>
        </h2>
      </Rise>
    </div>
  );
}
