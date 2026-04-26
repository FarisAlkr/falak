import type { BilingualTerm } from '@/types/i18n';
import { SlideFrame } from './SlideFrame';

export interface VocabSlideProps {
  hebrewLabel?: string;
  arabicTitle?: string;
  terms: readonly BilingualTerm[];
  unitNumber?: string;
  slideNumber?: string;
}

export function VocabSlide({
  hebrewLabel = 'מילון מונחים',
  arabicTitle = 'المصطلحات',
  terms,
  unitNumber,
  slideNumber,
}: VocabSlideProps) {
  return (
    <SlideFrame unitNumber={unitNumber} slideNumber={slideNumber}>
      <div className="flex h-full flex-col gap-6">
        <header className="space-y-2">
          <span dir="rtl" className="block font-hebrew text-sm uppercase tracking-meta text-accent">
            {hebrewLabel}
          </span>
          <h2
            dir="rtl"
            className="font-arabic text-2xl font-semibold leading-tight text-ink md:text-4xl"
          >
            {arabicTitle}
          </h2>
        </header>

        <div className="grid flex-1 grid-cols-1 gap-x-12 gap-y-3 overflow-y-auto sm:grid-cols-2">
          {terms.map((term, i) => (
            <div
              key={i}
              dir="rtl"
              className="flex items-baseline justify-between border-b border-border pb-2"
            >
              <span className="font-arabic text-base text-ink md:text-lg">{term.ar}</span>
              <span className="font-hebrew text-sm text-accent">{term.he}</span>
              {term.en && (
                <span dir="ltr" className="font-body text-xs italic text-ink-faint">
                  {term.en}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </SlideFrame>
  );
}
