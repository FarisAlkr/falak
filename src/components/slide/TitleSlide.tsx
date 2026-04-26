import { SlideFrame } from './SlideFrame';

export interface TitleSlideProps {
  unitNumber: string;
  arabic: string;
  hebrew?: string;
  english: string;
  meta?: string;
}

export function TitleSlide({ unitNumber, arabic, hebrew, english, meta }: TitleSlideProps) {
  return (
    <SlideFrame unitNumber={unitNumber}>
      <div className="flex h-full flex-col justify-center gap-6">
        {meta && (
          <span dir="ltr" className="font-mono text-xs uppercase tracking-meta text-ink-muted">
            {meta}
          </span>
        )}
        <h1
          dir="rtl"
          className="font-arabic text-5xl font-semibold leading-tight text-ink md:text-7xl"
        >
          {arabic}
        </h1>
        {hebrew && (
          <p dir="rtl" className="font-hebrew text-xl text-accent md:text-2xl">
            {hebrew}
          </p>
        )}
        <p dir="ltr" className="font-body text-lg italic text-ink-muted md:text-2xl">
          {english}
        </p>
      </div>
    </SlideFrame>
  );
}
