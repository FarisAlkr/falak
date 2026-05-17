import { findMisconception, loadUnit } from '@/lib/content/baseline';
import { BaselineSlideFrame } from './SlideFrame';
import { SlideKicker } from './SlideKicker';
import { TrilingualBlock } from './Trilingual';
import { DiagramRenderer } from './DiagramRenderer';
import { hasDiagram } from './DiagramRegistry';
import { I18n } from '@/components/i18n/I18n';
import type { ArabicFlag, Severity } from '@/lib/content/types';

interface BaselineMisconceptionSlideProps {
  unit: string;
  id: string;
  slideNumber?: string;
}

const MISCONCEPTION_KICKER = { ar: 'مفهوم خاطئ', he: 'מושג מוטעה', en: 'MISCONCEPTION' };

const SEVERITY_LABEL: Record<Severity, { ar: string; he: string; en: string }> = {
  high: { ar: 'حرج', he: 'גבוה', en: 'HIGH' },
  medium: { ar: 'متوسّط', he: 'בינוני', en: 'MEDIUM' },
  low: { ar: 'منخفض', he: 'נמוך', en: 'LOW' },
};

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
      kicker={<SlideKicker text={MISCONCEPTION_KICKER} trailing={SEVERITY_LABEL[m.severity]} />}
    >
      <div className="flex h-full flex-col gap-6 pt-8">
        <header data-lang="en">
          <h2 dir="ltr" className="font-display text-xl uppercase tracking-meta text-ink-faint">
            {m.title}
          </h2>
        </header>

        <div className="grid flex-1 grid-cols-1 gap-6 md:grid-cols-[1fr_auto] md:items-start">
          <div className="min-w-0 space-y-4">
            <section className="space-y-2">
              <I18n
                k="whatStudentsSay"
                className="block text-[10px] uppercase tracking-meta text-error"
              />
              <div className="bg-error/5 rounded-sm border-s-2 border-error px-4 py-3">
                <TrilingualBlock value={m.wrong} tone="danger" />
              </div>
            </section>

            <section className="space-y-2">
              <I18n
                k="actuallyTrue"
                className="block text-[10px] uppercase tracking-meta text-success"
              />
              <div className="bg-success/5 rounded-sm border-s-2 border-success px-4 py-3">
                <TrilingualBlock value={m.right} tone="success" size="lead" />
              </div>
            </section>

            {m.whyStudentsFall && (
              <section className="border-t border-border pt-3">
                <I18n
                  k="whyTheyFall"
                  className="me-2 inline-block text-[10px] uppercase tracking-meta text-ink-faint"
                />
                <span className="font-body text-sm italic leading-relaxed text-ink-muted">
                  {firstSentence(m.whyStudentsFall)}
                </span>
              </section>
            )}
          </div>

          {hasDiagram(m.id) && (
            <div className="flex justify-center md:max-w-md md:justify-end">
              <DiagramRenderer id={m.id} />
            </div>
          )}
        </div>
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
