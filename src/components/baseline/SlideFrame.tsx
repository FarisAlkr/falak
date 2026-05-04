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

/**
 * Editorial slide frame.
 *
 * No aspect-ratio lock and no `overflow-hidden` on content — both choices
 * are deliberate. An earlier version forced 16:10 + clipped overflow,
 * which made content-rich slides (concept + equations + diagram, or
 * misconception with wrong/right panels + diagram) overrun the box and
 * appear cut off. Outline mode is a vertical scroll where each slide
 * reads on its own; constraining height there fights the medium.
 *
 * Presenter mode (`/units/{id}/theory/present/`) re-applies a 16:10
 * letterbox via its own scaled container — that's where the aspect
 * matters (one slide projected at a time).
 */
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
        'relative mx-auto w-full max-w-5xl rounded-sm border border-border bg-paper',
        // Top padding leaves room for the absolute-positioned chrome
        // (kicker on the start side, brand + slide number on the end).
        'px-6 pb-6 pt-12 sm:px-10 sm:pb-10 sm:pt-14 md:px-14 md:pb-12 md:pt-16',
        className,
      )}
      {...props}
    >
      <div className="absolute left-5 top-4 flex items-center gap-3">
        {kicker && <span className="text-ink-muted">{kicker}</span>}
      </div>
      <div className="absolute right-5 top-4 flex items-center gap-3 text-xs text-ink-faint">
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
      <div className="flex flex-col">{children}</div>
    </article>
  );
}
