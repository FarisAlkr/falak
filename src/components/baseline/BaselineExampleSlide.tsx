import { findExample, loadUnit } from '@/lib/content/baseline';
import { BaselineSlideFrame } from './SlideFrame';
import { TrilingualBlock } from './Trilingual';
import type { ArabicFlag, Difficulty } from '@/lib/content/types';

interface BaselineExampleSlideProps {
  unit: string;
  id: string;
  slideNumber?: string;
}

const DIFFICULTY_DOT: Record<Difficulty, { label: string; color: string }> = {
  basic: { label: 'BASIC', color: 'text-success' },
  intermediate: { label: 'INTERMEDIATE', color: 'text-warning' },
  advanced: { label: 'ADVANCED', color: 'text-accent' },
};

export async function BaselineExampleSlide({ unit, id, slideNumber }: BaselineExampleSlideProps) {
  const u = await loadUnit(unit);
  const ex = findExample(u, id);
  const flag = highestFlag(ex.problem.arFlag, ex.solutionNarrativeArFlag);
  const diff = DIFFICULTY_DOT[ex.difficulty];
  return (
    <BaselineSlideFrame
      unitNumber={unit}
      slideNumber={slideNumber}
      arabicFlag={flag}
      kicker={`EXAMPLE · ${diff.label}`}
    >
      <div className="flex h-full flex-col gap-6 pt-8">
        <header className="flex items-baseline justify-between gap-4">
          <h2 dir="ltr" className="font-display text-xl uppercase tracking-meta text-ink-faint">
            {ex.title}
          </h2>
          <span
            dir="ltr"
            className={`font-mono text-[10px] uppercase tracking-meta ${diff.color}`}
            aria-label={`Difficulty: ${diff.label}`}
          >
            ● {diff.label}
          </span>
        </header>

        <section className="space-y-3">
          <span
            dir="ltr"
            className="block font-mono text-[10px] uppercase tracking-meta text-ink-muted"
          >
            Problem · المسألة
          </span>
          <TrilingualBlock value={ex.problem} size="lead" />
        </section>

        {ex.solution && (
          <section className="space-y-2">
            <span
              dir="ltr"
              className="block font-mono text-[10px] uppercase tracking-meta text-ink-muted"
            >
              Solution
            </span>
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
            <span
              dir="ltr"
              className="block font-mono text-[10px] uppercase tracking-meta text-ink-muted"
            >
              Narrative · الشرح بالعربية
            </span>
            <p dir="rtl" className="font-arabic text-base leading-arabic text-ink md:text-lg">
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
