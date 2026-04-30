import { findMisconception, loadUnit } from '@/lib/content/baseline';
import { BaselineSlideFrame } from './SlideFrame';
import { TrilingualBlock } from './Trilingual';
import type { ArabicFlag } from '@/lib/content/types';

interface BaselineMisconceptionSlideProps {
  unit: string;
  id: string;
  slideNumber?: string;
}

export async function BaselineMisconceptionSlide({
  unit,
  id,
  slideNumber,
}: BaselineMisconceptionSlideProps) {
  const u = await loadUnit(unit);
  const m = findMisconception(u, id);
  const flag = highestFlag(m.wrong.arFlag, m.right.arFlag);
  return (
    <BaselineSlideFrame
      unitNumber={unit}
      slideNumber={slideNumber}
      arabicFlag={flag}
      kicker={`MISCONCEPTION · ${m.severity.toUpperCase()}`}
    >
      <div className="flex h-full flex-col gap-6 pt-8">
        <header>
          <h2 dir="ltr" className="font-display text-xl uppercase tracking-meta text-ink-faint">
            {m.title}
          </h2>
        </header>

        <section className="space-y-2">
          <span
            dir="ltr"
            className="block font-mono text-[10px] uppercase tracking-meta text-error"
          >
            What students say · الخطأ
          </span>
          <div className="bg-error/5 rounded-sm border-s-2 border-error px-4 py-3">
            <TrilingualBlock value={m.wrong} tone="danger" />
          </div>
        </section>

        <section className="space-y-2">
          <span
            dir="ltr"
            className="block font-mono text-[10px] uppercase tracking-meta text-success"
          >
            What&rsquo;s actually true · الصحيح
          </span>
          <div className="bg-success/5 rounded-sm border-s-2 border-success px-4 py-3">
            <TrilingualBlock value={m.right} tone="success" size="lead" />
          </div>
        </section>

        {m.whyStudentsFall && (
          <section
            dir="ltr"
            className="border-t border-border pt-3 font-body text-sm italic leading-relaxed text-ink-muted"
          >
            <span className="me-2 font-mono text-[10px] uppercase tracking-meta text-ink-faint">
              Why students fall for it
            </span>
            <span>{firstSentence(m.whyStudentsFall)}</span>
          </section>
        )}
      </div>
    </BaselineSlideFrame>
  );
}

function firstSentence(text: string): string {
  const t = text.trim().split(/\n{2,}/)[0] ?? '';
  return t.replace(/\s+/g, ' ').slice(0, 320);
}

function highestFlag(...flags: Array<ArabicFlag | undefined>): ArabicFlag | undefined {
  if (flags.includes('pending')) return 'pending';
  if (flags.includes('verified')) return 'verified';
  if (flags.includes('sayakim')) return 'sayakim';
  return undefined;
}
