import type { CSSProperties } from 'react';
import { LOCALE_DIR } from '@/lib/i18n/constants';
import { cn } from '@/lib/utils/cn';

export interface TermProps {
  ar: string;
  he: string;
  en?: string;
  className?: string;
  style?: CSSProperties;
}

/**
 * Inline hoverable term. Shows the active language's text with a faint dotted
 * underline; on hover, a small pill above reveals the translation in the
 * complementary language (`HOVER_REVEALS` in `constants.ts`).
 *
 * The visibility is purely CSS-driven (rules in `globals.css` keyed off
 * `html[lang]`), so it works in static export with no JS runtime cost.
 */
export function Term({ ar, he, en, className, style }: TermProps) {
  const enText = en ?? '';
  return (
    <span className={cn('falak-term group relative inline-block', className)} style={style}>
      <span data-lang="ar" dir={LOCALE_DIR.ar} className="font-arabic">
        {ar}
      </span>
      <span data-lang="he" dir={LOCALE_DIR.he} className="font-hebrew">
        {he}
      </span>
      <span data-lang="en" dir={LOCALE_DIR.en} className="font-body">
        {enText}
      </span>
      {/* Tooltip — exactly one of these is shown per active locale (CSS-driven). */}
      <span
        role="tooltip"
        data-tooltip-for="ar"
        dir={LOCALE_DIR.he}
        className="falak-term-tooltip font-hebrew"
      >
        {he}
      </span>
      <span
        role="tooltip"
        data-tooltip-for="he"
        dir={LOCALE_DIR.ar}
        className="falak-term-tooltip font-arabic"
      >
        {ar}
      </span>
      <span
        role="tooltip"
        data-tooltip-for="en"
        dir={LOCALE_DIR.he}
        className="falak-term-tooltip font-hebrew"
      >
        {he}
      </span>
    </span>
  );
}
