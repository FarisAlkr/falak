import { findConcept, loadUnit } from '@/lib/content/baseline';
import { BlockMath } from '@/components/math/Math';
import { BaselineSlideFrame } from './SlideFrame';
import { TrilingualBlock } from './Trilingual';
import type { ArabicFlag } from '@/lib/content/types';

interface BaselineConceptSlideProps {
  unit: string;
  id: string;
  slideNumber?: string;
  /** Hide the visual-description placeholder (used when the deck explicitly
   *  pairs the concept with a separate visual slide). Default: shows placeholder. */
  showVisualPlaceholder?: boolean;
}

const TYPE_LABEL: Record<string, string> = {
  definition: 'CONCEPT · DEFINITION',
  law: 'CONCEPT · LAW',
  derivation: 'CONCEPT · DERIVATION',
  application: 'CONCEPT · APPLICATION',
};

export async function BaselineConceptSlide({
  unit,
  id,
  slideNumber,
  showVisualPlaceholder = true,
}: BaselineConceptSlideProps) {
  const u = await loadUnit(unit);
  const c = findConcept(u, id);
  const flag = highestFlag(c.statement.arFlag);
  return (
    <BaselineSlideFrame
      unitNumber={unit}
      slideNumber={slideNumber}
      arabicFlag={flag}
      kicker={TYPE_LABEL[c.type] ?? 'CONCEPT'}
    >
      <div className="flex h-full flex-col gap-6 pt-8">
        <header className="space-y-1">
          <h2 dir="ltr" className="font-display text-xl uppercase tracking-meta text-ink-faint">
            {c.title}
          </h2>
        </header>

        <div className="flex-1 space-y-6">
          <TrilingualBlock value={c.statement} size="lead" />

          {c.equations.length > 0 && (
            <div className="bg-accent-tint/30 rounded-sm border-s-2 border-accent px-6 py-4">
              {c.equations.slice(0, 2).map((eq, i) => (
                <BlockMath key={i}>{eq.tex}</BlockMath>
              ))}
            </div>
          )}

          {c.studentDifficulty && (
            <div
              dir="rtl"
              className="border-t border-border pt-3 font-arabic text-sm leading-arabic text-ink-muted"
            >
              <span
                dir="ltr"
                className="me-2 inline-block font-mono text-[10px] uppercase tracking-meta text-warning"
              >
                Watch out
              </span>
              <ParagraphFirstLine text={c.studentDifficulty} />
            </div>
          )}

          {showVisualPlaceholder && c.visualName && (
            <div className="border-t border-border pt-3">
              <span
                dir="ltr"
                className="font-mono text-[10px] uppercase tracking-meta text-ink-faint"
              >
                Visual: {c.visualName}
              </span>
            </div>
          )}
        </div>
      </div>
    </BaselineSlideFrame>
  );
}

function ParagraphFirstLine({ text }: { text: string }) {
  // Render the first paragraph only; the full prose belongs in teacher notes.
  const first = text.split(/\n{2,}/)[0]?.trim() ?? '';
  return <span>{first}</span>;
}

function highestFlag(...flags: Array<ArabicFlag | undefined>): ArabicFlag | undefined {
  if (flags.includes('pending')) return 'pending';
  if (flags.includes('verified')) return 'verified';
  if (flags.includes('sayakim')) return 'sayakim';
  return undefined;
}
