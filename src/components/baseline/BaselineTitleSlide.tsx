import { loadUnit } from '@/lib/content/baseline';
import { BaselineSlideFrame } from './SlideFrame';

interface BaselineTitleSlideProps {
  unit: string;
  slideNumber?: string;
}

export async function BaselineTitleSlide({ unit, slideNumber }: BaselineTitleSlideProps) {
  const u = await loadUnit(unit);
  const t = u.frontmatter.titles;
  const meta = `الوحدة ${u.frontmatter.unit.number} · 5 יח״ל · ${u.frontmatter.unit.domain}`;
  return (
    <BaselineSlideFrame unitNumber={unit} slideNumber={slideNumber}>
      <div className="flex h-full flex-col justify-end">
        <div className="space-y-4">
          <span dir="ltr" className="block font-mono text-xs uppercase tracking-meta text-accent">
            UNIT {u.frontmatter.unit.number}
          </span>
          <span
            dir="rtl"
            className="block font-hebrew text-base uppercase tracking-meta text-accent"
          >
            {t.he}
          </span>
          <h1
            dir="rtl"
            className="font-arabic text-4xl font-semibold leading-tight text-ink md:text-6xl"
          >
            {t.ar}
          </h1>
          <p dir="ltr" className="font-display text-2xl italic text-ink-muted md:text-3xl">
            {t.en}
          </p>
          <div className="pt-6">
            <span dir="rtl" className="font-arabic text-sm text-ink-muted">
              {meta}
            </span>
          </div>
        </div>
      </div>
    </BaselineSlideFrame>
  );
}
