import { findConcept, loadUnit } from '@/lib/content/baseline';
import { BlockMath } from '@/components/math/Math';
import { BaselineSlideFrame } from './SlideFrame';
import { SlideKicker } from './SlideKicker';
import { TrilingualBlock } from './Trilingual';
import { I18n } from '@/components/i18n/I18n';
import type { ArabicFlag, ConceptType } from '@/lib/content/types';

interface BaselineConceptSlideProps {
  unit: string;
  id: string;
  slideNumber?: string;
  showVisualPlaceholder?: boolean;
}

const KICKER_TEXT: Record<ConceptType, { ar: string; he: string; en: string }> = {
  definition: { ar: 'مفهوم · تعريف', he: 'מושג · הגדרה', en: 'CONCEPT · DEFINITION' },
  law: { ar: 'مفهوم · قانون', he: 'מושג · חוק', en: 'CONCEPT · LAW' },
  derivation: { ar: 'مفهوم · اشتقاق', he: 'מושג · גזירה', en: 'CONCEPT · DERIVATION' },
  application: { ar: 'مفهوم · تطبيق', he: 'מושג · יישום', en: 'CONCEPT · APPLICATION' },
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
      kicker={<SlideKicker text={KICKER_TEXT[c.type]} />}
    >
      <div className="flex h-full flex-col gap-6 pt-8">
        <header data-lang="en" className="space-y-1">
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
            <div className="border-t border-border pt-3">
              <I18n
                k="watchOut"
                className="me-2 inline-block text-[10px] uppercase tracking-meta text-warning"
              />
              <span dir="rtl" className="font-arabic text-sm leading-arabic text-ink-muted">
                <ParagraphFirstLine text={c.studentDifficulty} />
              </span>
            </div>
          )}

          {showVisualPlaceholder && c.visualName && (
            <div data-lang="en" className="border-t border-border pt-3">
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
  const first = text.split(/\n{2,}/)[0]?.trim() ?? '';
  return <span>{first}</span>;
}

function highestFlag(...flags: Array<ArabicFlag | undefined>): ArabicFlag | undefined {
  if (flags.includes('pending')) return 'pending';
  if (flags.includes('verified')) return 'verified';
  if (flags.includes('sayakim')) return 'sayakim';
  return undefined;
}
