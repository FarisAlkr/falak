import type { ReactNode } from 'react';
import { SlideFrame } from './SlideFrame';

export interface WorkedExampleSlideProps {
  hebrewLabel?: string;
  arabicTitle: string;
  problem: ReactNode;
  steps: ReactNode;
  unitNumber?: string;
  slideNumber?: string;
}

export function WorkedExampleSlide({
  hebrewLabel,
  arabicTitle,
  problem,
  steps,
  unitNumber,
  slideNumber,
}: WorkedExampleSlideProps) {
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

        <section
          dir="rtl"
          className="rounded-sm border border-border bg-paper-raised p-4 font-arabic text-base leading-[1.8] text-ink md:text-lg"
        >
          {problem}
        </section>

        <section className="flex-1 space-y-3 overflow-y-auto" dir="rtl">
          {steps}
        </section>
      </div>
    </SlideFrame>
  );
}
