import { findExample, loadUnit } from '@/lib/content/baseline';
import { BaselineSlideFrame } from './SlideFrame';
import { SlideKicker } from './SlideKicker';
import { TrilingualBlock } from './Trilingual';
import { I18n } from '@/components/i18n/I18n';
import { LOCALE_DIR } from '@/lib/i18n/constants';
import type { ArabicFlag, Difficulty } from '@/lib/content/types';

interface BaselineExampleSlideProps {
  unit: string;
  id: string;
  slideNumber?: string;
}

const EXAMPLE_KICKER = { ar: 'مثال', he: 'דוגמה', en: 'EXAMPLE' };

const DIFFICULTY: Record<
  Difficulty,
  { kicker: { ar: string; he: string; en: string }; color: string }
> = {
  basic: {
    kicker: { ar: 'أساسي', he: 'בסיסי', en: 'BASIC' },
    color: 'text-success',
  },
  intermediate: {
    kicker: { ar: 'متوسّط', he: 'בינוני', en: 'INTERMEDIATE' },
    color: 'text-warning',
  },
  advanced: {
    kicker: { ar: 'متقدّم', he: 'מתקדם', en: 'ADVANCED' },
    color: 'text-accent',
  },
};

export async function BaselineExampleSlide({ unit, id, slideNumber }: BaselineExampleSlideProps) {
  const u = await loadUnit(unit);
  const ex = findExample(u, id);
  const flag = highestFlag(ex.problem.arFlag, ex.solutionNarrativeArFlag);
  const diff = DIFFICULTY[ex.difficulty];
  return (
    <BaselineSlideFrame
      unitNumber={unit}
      slideNumber={slideNumber}
      arabicFlag={flag}
      kicker={<SlideKicker text={EXAMPLE_KICKER} trailing={diff.kicker} />}
    >
      <div className="flex h-full flex-col gap-6 pt-8">
        <header className="flex items-baseline justify-between gap-4">
          <h2 dir="ltr" className="font-display text-xl uppercase tracking-meta text-ink-faint">
            {ex.title}
          </h2>
          <span dir="ltr" className={`text-[10px] ${diff.color}`} aria-label={diff.kicker.en}>
            ●
          </span>
        </header>

        <section className="space-y-3">
          <I18n k="problem" className="block text-[10px] uppercase tracking-meta text-ink-muted" />
          <TrilingualBlock value={ex.problem} size="lead" />
        </section>

        {ex.solution && (
          <section className="space-y-2">
            <I18n
              k="solution"
              className="block text-[10px] uppercase tracking-meta text-ink-muted"
            />
            <pre
              dir="ltr"
              className="overflow-x-auto whitespace-pre-wrap rounded-sm border border-border bg-paper-raised p-4 font-mono text-sm leading-relaxed text-ink"
            >
              {ex.solution}
            </pre>
          </section>
        )}

        {ex.solutionNarrativeAr && (
          <section className="space-y-2">
            <I18n
              k="narrative"
              className="block text-[10px] uppercase tracking-meta text-ink-muted"
            />
            <p
              data-lang="ar"
              dir={LOCALE_DIR.ar}
              className="font-arabic text-base leading-arabic text-ink md:text-lg"
            >
              {ex.solutionNarrativeAr}
            </p>
          </section>
        )}
      </div>
    </BaselineSlideFrame>
  );
}

function highestFlag(...flags: Array<ArabicFlag | undefined>): ArabicFlag | undefined {
  if (flags.includes('pending')) return 'pending';
  if (flags.includes('verified')) return 'verified';
  if (flags.includes('sayakim')) return 'sayakim';
  return undefined;
}
