import type { ReactNode } from 'react';
import { SlideFrame } from './SlideFrame';

export interface VisualSlideProps {
  hebrewLabel?: string;
  arabicTitle: string;
  caption?: string;
  children: ReactNode;
  unitNumber?: string;
  slideNumber?: string;
}

export function VisualSlide({
  hebrewLabel,
  arabicTitle,
  caption,
  children,
  unitNumber,
  slideNumber,
}: VisualSlideProps) {
  return (
    <SlideFrame unitNumber={unitNumber} slideNumber={slideNumber}>
      <div className="flex h-full flex-col gap-6">
        <header className="space-y-2">
          {hebrewLabel && (
            <span
              dir="rtl"
              className="block font-hebrew text-sm uppercase tracking-meta text-accent"
            >
              {hebrewLabel}
            </span>
          )}
          <h2
            dir="rtl"
            className="font-arabic text-2xl font-semibold leading-tight text-ink md:text-4xl"
          >
            {arabicTitle}
          </h2>
        </header>
        <div className="flex flex-1 items-center justify-center">{children}</div>
        {caption && (
          <p dir="rtl" className="text-center font-arabic text-base text-ink-muted md:text-lg">
            {caption}
          </p>
        )}
      </div>
    </SlideFrame>
  );
}
