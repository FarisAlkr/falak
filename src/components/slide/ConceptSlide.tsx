import type { ReactNode } from 'react';
import { SlideFrame } from './SlideFrame';

export interface ConceptSlideProps {
  hebrewLabel?: string;
  arabicTitle: string;
  children: ReactNode;
  unitNumber?: string;
  slideNumber?: string;
}

export function ConceptSlide({
  hebrewLabel,
  arabicTitle,
  children,
  unitNumber,
  slideNumber,
}: ConceptSlideProps) {
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
            className="font-arabic text-3xl font-semibold leading-tight text-ink md:text-5xl"
          >
            {arabicTitle}
          </h2>
        </header>
        <div className="flex-1 space-y-6">{children}</div>
      </div>
    </SlideFrame>
  );
}
