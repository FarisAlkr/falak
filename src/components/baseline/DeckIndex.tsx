import type { TocEntry } from '@/content/units/newtons-laws/toc';
import { I18n } from '@/components/i18n/I18n';
import { LOCALE_DIR } from '@/lib/i18n/constants';

interface DeckIndexProps {
  entries: TocEntry[];
  /** Total slide count, shown as a small caption. */
  totalSlides: number;
}

/**
 * Editorial-style table of contents (فهرس). A clickable nav with section
 * titles, leader-dot fillers, and slide-number ranges. Each link scrolls to
 * the matching `#section-{id}` anchor mounted on the deck below.
 *
 * Renders all three locales; CSS rules driven by `<html lang>` show only the
 * active one.
 */
export function DeckIndex({ entries, totalSlides }: DeckIndexProps) {
  return (
    <nav
      aria-label="Table of contents"
      className="rounded-sm border border-border bg-paper-raised px-8 py-10 md:px-12 md:py-12"
    >
      <header className="mb-8 flex items-baseline justify-between gap-6 border-b border-border pb-5">
        <h2 className="text-2xl font-semibold tracking-tight text-ink md:text-3xl">
          <span data-lang="ar" dir="rtl" className="font-arabic">
            فهرس
          </span>
          <span data-lang="he" dir="rtl" className="font-hebrew">
            תוכן עניינים
          </span>
          <span data-lang="en" dir="ltr" className="font-display">
            Index
          </span>
        </h2>
        <I18n
          ar={`${totalSlides} شريحة`}
          he={`${totalSlides} שקופיות`}
          en={`${totalSlides} slides`}
          as="span"
          className="text-xs uppercase tracking-meta text-ink-faint"
        />
      </header>

      <ol className="space-y-3">
        {entries.map((entry) => (
          <TocItem key={entry.id} entry={entry} />
        ))}
      </ol>
    </nav>
  );
}

function TocItem({ entry, depth = 0 }: { entry: TocEntry; depth?: number }) {
  const range =
    entry.slides[0] === entry.slides[1]
      ? String(entry.slides[0])
      : `${entry.slides[0]}–${entry.slides[1]}`;
  const isChild = depth > 0;

  return (
    <li>
      <a
        href={`#section-${entry.id}`}
        className="group flex items-baseline gap-3 py-1.5 text-ink transition-colors duration-fast ease-out hover:text-accent focus-visible:text-accent"
      >
        {isChild && (
          <span aria-hidden className="font-mono text-xs text-ink-faint">
            ↳
          </span>
        )}
        <span className="shrink-0">
          <span data-lang="ar" dir={LOCALE_DIR.ar} className={titleClass(isChild, 'ar')}>
            {entry.title.ar}
          </span>
          <span data-lang="he" dir={LOCALE_DIR.he} className={titleClass(isChild, 'he')}>
            {entry.title.he}
          </span>
          <span data-lang="en" dir={LOCALE_DIR.en} className={titleClass(isChild, 'en')}>
            {entry.title.en}
          </span>
        </span>
        <span
          aria-hidden
          className="leader-dots flex-1 self-end pb-1 text-ink-faint group-hover:text-accent"
        />
        <span
          dir="ltr"
          className="shrink-0 font-mono text-xs tabular-nums text-ink-muted group-hover:text-accent"
        >
          {range}
        </span>
      </a>
      {entry.children && (
        <ol className="mt-1 space-y-1 ps-6">
          {entry.children.map((c) => (
            <TocItem key={c.id} entry={c} depth={depth + 1} />
          ))}
        </ol>
      )}
    </li>
  );
}

function titleClass(isChild: boolean, locale: 'ar' | 'he' | 'en'): string {
  const base = locale === 'ar' ? 'font-arabic' : locale === 'he' ? 'font-hebrew' : 'font-display';
  const size = isChild ? 'text-base' : 'text-lg md:text-xl font-medium';
  return `${base} ${size}`;
}
