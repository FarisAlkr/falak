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
  /** A short label rendered above the slide title (e.g. "CONCEPT · LAW"). */
  kicker?: string;
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
      <div
        dir="ltr"
        className="absolute left-5 top-5 flex items-center gap-3 font-mono text-xs uppercase tracking-meta text-ink-faint"
      >
        {kicker && <span className="text-ink-muted">{kicker}</span>}
      </div>
      <div
        dir="ltr"
        className="absolute right-5 top-5 flex items-center gap-3 font-mono text-xs uppercase tracking-meta text-ink-faint"
      >
        <span>FALAK · {unitNumber}</span>
        {slideNumber && <span className="text-border-strong">·</span>}
        {slideNumber && <span>{slideNumber}</span>}
      </div>
      {arabicFlag === 'pending' && <FlagRibbon />}
      <div className="flex h-full flex-col">{children}</div>
    </article>
  );
}
