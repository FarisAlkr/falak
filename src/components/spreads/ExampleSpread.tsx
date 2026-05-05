import { findExample, loadUnit } from '@/lib/content/baseline';
import { LOCALE_DIR } from '@/lib/i18n/constants';
import { PhysicsFigure } from '@/components/figure/PhysicsFigure';
import { hasDiagram, getDiagram } from '@/components/baseline/DiagramRegistry';
import { I18n } from '@/components/i18n/I18n';
import { SolutionBlock } from '@/components/baseline/SolutionBlock';
import { NarrativeBlock } from '@/components/baseline/NarrativeBlock';
import type { ArabicFlag, Difficulty } from '@/lib/content/types';
import { SpreadShell } from './SpreadShell';
import { Rise } from './Rise';

export interface ExampleSpreadProps {
  unit: string;
  id: string;
  domId?: string;
}

const DIFF_LABEL: Record<Difficulty, { ar: string; he: string; en: string }> = {
  basic: { ar: 'مثال أساسيّ', he: 'דוגמה בסיסית', en: 'EXAMPLE · BASIC' },
  intermediate: { ar: 'مثال متوسّط', he: 'דוגמה בינונית', en: 'EXAMPLE · INTERMEDIATE' },
  advanced: { ar: 'مثال متقدّم', he: 'דוגמה מתקדמת', en: 'EXAMPLE · ADVANCED' },
};

const DIFF_ACCENT: Record<Difficulty, string> = {
  basic: 'text-success',
  intermediate: 'text-warning',
  advanced: 'text-accent',
};

/**
 * Example spread — tighter than concept spread but still editorial.
 *
 *   1. Difficulty kicker color-coded by tier (basic = success, intermediate
 *      = warning, advanced = accent).
 *   2. Problem statement at lead-display sizes — same trilingual
 *      treatment as concept spreads.
 *   3. Hero figure of the scenario (concept's own diagram or example-
 *      specific one).
 *   4. Solution as `<SolutionBlock>` — already an editorial worked-proof
 *      composition with reveal motion.
 *   5. Narrative as `<NarrativeBlock>`.
 */
export async function ExampleSpread({ unit, id, domId }: ExampleSpreadProps) {
  const u = await loadUnit(unit);
  const ex = findExample(u, id);
  const arabicFlag = highest(ex.problem.arFlag, ex.solutionNarrativeArFlag);
  const diff = DIFF_LABEL[ex.difficulty];
  const accent = DIFF_ACCENT[ex.difficulty];

  return (
    <SpreadShell
      id={domId}
      width={hasDiagram(ex.id) ? 'wide' : 'standard'}
      arabicFlag={arabicFlag}
      className="py-16 md:py-24"
    >
      <div className="mx-auto max-w-[760px]">
        {/* Kicker */}
        <Rise>
          <I18n
            ar={diff.ar}
            he={diff.he}
            en={diff.en}
            as="span"
            className={`block font-mono text-xs uppercase tracking-[0.3em] ${accent}`}
          />
        </Rise>

        {/* Problem statement */}
        <Rise delay={0.05} className="mt-6 md:mt-10">
          <div className="space-y-3">
            {ex.problem.ar && (
              <p
                data-lang="ar"
                dir={LOCALE_DIR.ar}
                className="font-arabic text-[clamp(18px,2.2vw,28px)] font-medium leading-[1.6] tracking-[-0.005em] text-ink"
              >
                {ex.problem.ar}
              </p>
            )}
            {ex.problem.he && (
              <p
                data-lang="he"
                dir={LOCALE_DIR.he}
                className="font-hebrew text-[clamp(18px,2.2vw,28px)] font-medium leading-[1.5] text-ink"
              >
                {ex.problem.he}
              </p>
            )}
            {ex.problem.en && (
              <p
                data-lang="en"
                dir={LOCALE_DIR.en}
                className="font-display text-[clamp(17px,2vw,24px)] leading-[1.5] tracking-[-0.01em] text-ink"
              >
                {ex.problem.en}
              </p>
            )}
          </div>
        </Rise>
      </div>

      {/* Hero figure — breaks out of the reading column */}
      {hasDiagram(ex.id) && (
        <Rise delay={0.16} className="mt-8 md:mt-12">
          <ExampleFigure id={ex.id} title={ex.title} />
        </Rise>
      )}

      <div className="mx-auto max-w-[760px]">
        {/* Solution */}
        {ex.solution && (
          <Rise delay={0.24} className="mt-4 md:mt-8">
            <SolutionBlock text={ex.solution} lang="en" />
          </Rise>
        )}

        {/* Arabic narrative */}
        {ex.solutionNarrativeAr && (
          <Rise delay={0.3} className="mt-8 md:mt-10">
            <NarrativeBlock text={ex.solutionNarrativeAr} lang="ar" />
          </Rise>
        )}
      </div>
    </SpreadShell>
  );
}

function ExampleFigure({ id, title }: { id: string; title: string }) {
  const Component = getDiagram(id);
  if (!Component) return null;
  return (
    <PhysicsFigure variant="hero" caption={{ en: title }}>
      <Component />
    </PhysicsFigure>
  );
}

function highest(...flags: Array<ArabicFlag | undefined>): ArabicFlag | undefined {
  if (flags.includes('pending')) return 'pending';
  if (flags.includes('verified')) return 'verified';
  if (flags.includes('sayakim')) return 'sayakim';
  return undefined;
}
