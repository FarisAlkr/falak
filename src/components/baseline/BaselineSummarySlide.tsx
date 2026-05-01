import { loadUnit } from '@/lib/content/baseline';
import { BlockMath } from '@/components/math/Math';
import { BaselineSlideFrame } from './SlideFrame';
import { SlideKicker } from './SlideKicker';
import { LOCALE_DIR } from '@/lib/i18n/constants';

interface BaselineSummarySlideProps {
  unit: string;
  slideNumber?: string;
  highlightEquations?: string[];
}

const SUMMARY_KICKER = { ar: 'الخلاصة', he: 'סיכום', en: 'SUMMARY' };

export async function BaselineSummarySlide({
  unit,
  slideNumber,
  highlightEquations,
}: BaselineSummarySlideProps) {
  const u = await loadUnit(unit);
  const t = u.frontmatter.titles;
  const ids = highlightEquations ?? u.frontmatter.keyEquations.slice(0, 3).map((e) => e.id);
  const eqs = ids
    .map((id) => u.frontmatter.keyEquations.find((e) => e.id === id))
    .filter((e): e is NonNullable<typeof e> => Boolean(e));
  const outcomes = u.frontmatter.learningOutcomes.slice(0, 3);
  return (
    <BaselineSlideFrame
      unitNumber={unit}
      slideNumber={slideNumber}
      kicker={<SlideKicker text={SUMMARY_KICKER} />}
    >
      <div className="flex h-full flex-col gap-6 pt-8">
        <header className="space-y-1">
          <h2 className="leading-tight">
            <span
              data-lang="ar"
              dir={LOCALE_DIR.ar}
              className="block font-arabic text-3xl font-semibold text-ink md:text-4xl"
            >
              {t.ar}
            </span>
            <span
              data-lang="he"
              dir={LOCALE_DIR.he}
              className="block font-hebrew text-3xl font-semibold text-ink md:text-4xl"
            >
              {t.he}
            </span>
            <span
              data-lang="en"
              dir={LOCALE_DIR.en}
              className="block font-display text-3xl font-medium text-ink md:text-4xl"
            >
              {t.en}
            </span>
          </h2>
        </header>

        {eqs.length > 0 && (
          <div className="bg-accent-tint/30 space-y-3 rounded-sm border-s-2 border-accent px-6 py-4">
            {eqs.map((eq) => (
              <div key={eq.id} className="space-y-1">
                <BlockMath>{eq.formula}</BlockMath>
                {eq.plain && (
                  <p
                    dir="ltr"
                    className="text-center font-mono text-xs uppercase tracking-meta text-ink-muted"
                  >
                    {eq.plain}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}

        {outcomes.length > 0 && (
          <ul dir="ltr" className="space-y-2 font-body text-sm text-ink">
            {outcomes.map((o, i) => (
              <li key={i} className="flex gap-3">
                <span className="font-mono text-xs text-accent">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span>{o}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </BaselineSlideFrame>
  );
}
