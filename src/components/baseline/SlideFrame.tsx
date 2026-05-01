import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils/cn';
import type { ArabicFlag } from '@/lib/content/types';
import { FlagRibbon } from './FlagRibbon';

export interface BaselineSlideFrameProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  unitNumber: string;
  slideNumber?: string;
  /** Highest-severity Arabic flag observed on this slide. Surfaced as a ribbon in dev. */
  arabicFlag?: ArabicFlag;
  /** A short label rendered above the slide title. Pass a `<SlideKicker>` for
   *  the full localized treatment, or a string for ad-hoc use. */
  kicker?: ReactNode;
}

export function BaselineSlideFrame({
  children,
  unitNumber,
  slideNumber,
  arabicFlag,
  kicker,
  className,
  ...props
}: BaselineSlideFrameProps) {
  return (
    <article
      className={cn(
        'relative mx-auto aspect-[16/10] w-full max-w-5xl overflow-hidden rounded-sm border border-border bg-paper p-12 md:p-20',
        className,
      )}
      {...props}
    >
      <div className="absolute left-5 top-5 flex items-center gap-3">
        {kicker && <span className="text-ink-muted">{kicker}</span>}
      </div>
      <div className="absolute right-5 top-5 flex items-center gap-3 text-xs text-ink-faint">
        {/* Brand mark — Latin in EN, native script in AR/HE */}
        <span dir="ltr" className="flex items-center gap-2">
          <span data-lang="ar" dir="rtl" className="font-arabic">
            فَلَك · {unitNumber}
          </span>
          <span data-lang="he" dir="rtl" className="font-hebrew">
            פלאק · {unitNumber}
          </span>
          <span data-lang="en" dir="ltr" className="font-mono uppercase tracking-meta">
            FALAK · {unitNumber}
          </span>
        </span>
        {slideNumber && (
          <>
            <span className="text-border-strong">·</span>
            <span dir="ltr" className="font-mono uppercase tabular-nums tracking-meta">
              {slideNumber}
            </span>
          </>
        )}
      </div>
      {arabicFlag === 'pending' && <FlagRibbon />}
      <div className="flex h-full flex-col">{children}</div>
    </article>
  );
}
