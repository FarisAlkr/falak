import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils/cn';

export interface SlideFrameProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  unitNumber?: string;
  slideNumber?: string;
}

export function SlideFrame({
  children,
  unitNumber,
  slideNumber,
  className,
  ...props
}: SlideFrameProps) {
  return (
    <article
      className={cn(
        'relative mx-auto aspect-[16/10] w-full max-w-5xl overflow-hidden rounded-sm border border-border bg-paper p-12 md:p-20',
        className,
      )}
      {...props}
    >
      {(unitNumber || slideNumber) && (
        <div
          dir="ltr"
          className="absolute right-5 top-5 flex items-center gap-3 font-mono text-xs uppercase tracking-meta text-ink-faint"
        >
          {unitNumber && <span>FALAK · {unitNumber}</span>}
          {unitNumber && slideNumber && <span className="text-border-strong">·</span>}
          {slideNumber && <span>{slideNumber}</span>}
        </div>
      )}
      {children}
    </article>
  );
}
