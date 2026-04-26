import type { ReactNode } from 'react';
import { SlideFrame } from './SlideFrame';

export interface EquationsSlideProps {
  hebrewLabel?: string;
  arabicTitle: string;
  arabicSubtitle?: string;
  children: ReactNode;
  unitNumber?: string;
  slideNumber?: string;
}

export function EquationsSlide({
  hebrewLabel,
  arabicTitle,
  arabicSubtitle,
  children,
  unitNumber,
  slideNumber,
}: EquationsSlideProps) {
  return (
    <SlideFrame unitNumber={unitNumber} slideNumber={slideNumber}>
      <div className="flex h-full flex-col gap-8">
        <header className="space-y-3">
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
            className="font-arabic text-3xl font-semibold leading-tight text-ink md:text-4xl"
          >
            {arabicTitle}
          </h2>
          {arabicSubtitle && (
            <p dir="rtl" className="font-arabic text-lg leading-relaxed text-ink-muted md:text-xl">
              {arabicSubtitle}
            </p>
          )}
        </header>
        <div className="flex flex-1 flex-col items-center justify-center gap-6">{children}</div>
      </div>
    </SlideFrame>
  );
}
