import type { CSSProperties, ReactNode } from 'react';
import type { ArabicFlag } from '@/lib/content/types';
import { FlagRibbon } from '@/components/baseline/FlagRibbon';
import { cn } from '@/lib/utils/cn';

export interface SpreadShellProps {
  children: ReactNode;
  /** Spread-level identifier used as the DOM id, e.g. `slide-7`. */
  id?: string;
  /** Hint to the layout — most spreads use the standard column. The
   *  `wide` variant lets a spread bleed out to plate-figure widths. */
  width?: 'standard' | 'wide';
  /** Highest-severity Arabic flag observed on this spread's content. The
   *  small dev-mode `⚑ Arabic review pending` ribbon mounts at the foot. */
  arabicFlag?: ArabicFlag;
  /** Editorial scroll-margin so anchor jumps don't tuck a heading behind
   *  the sticky AppHeader. */
  className?: string;
  style?: CSSProperties;
}

/**
 * Editorial spread container. Replaces the uniform `BaselineSlideFrame`
 * card from the previous outline-mode design. There's no border, no
 * paper-raised background, no chrome — each spread is composed against
 * the page itself, like a magazine page. Scroll margin keeps section
 * jumps clear of the sticky header.
 *
 * Width variants:
 *   - `standard` ≈ 760px content column (matches the hero figure).
 *   - `wide`     ≈ 1100px content column (matches the plate figure).
 *
 * The shell also handles the dev-only ⚑ ribbon, mounted at the bottom
 * edge of the spread when content is flagged as pending review.
 */
export function SpreadShell({
  children,
  id,
  width = 'standard',
  arabicFlag,
  className,
  style,
}: SpreadShellProps) {
  return (
    <section
      id={id}
      style={style}
      className={cn(
        'relative mx-auto px-4 sm:px-6 md:px-10',
        width === 'wide' ? 'max-w-[1100px]' : 'max-w-[760px]',
        // Comfortable scroll margin so anchor jumps land below the
        // sticky AppHeader (52px) plus the optional rail strip.
        'scroll-mt-24',
        className,
      )}
    >
      {children}
      {arabicFlag === 'pending' && (
        <div className="relative">
          <FlagRibbon />
        </div>
      )}
    </section>
  );
}
