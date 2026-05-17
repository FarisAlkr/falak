import { findMisconception, loadUnit } from '@/lib/content/baseline';
import { LOCALE_DIR } from '@/lib/i18n/constants';
import { PhysicsFigure } from '@/components/figure/PhysicsFigure';
import { hasDiagram, getDiagram } from '@/components/baseline/DiagramRegistry';
import { I18n } from '@/components/i18n/I18n';
import type { ArabicFlag, Severity } from '@/lib/content/types';
import { SpreadShell } from './SpreadShell';
import { Rise } from './Rise';

export interface MisconceptionSpreadProps {
  unit: string;
  id: string;
  domId?: string;
}

const SEVERITY_LABEL: Record<Severity, { ar: string; he: string; en: string }> = {
  high: { ar: 'حرج', he: 'גבוה', en: 'HIGH' },
  medium: { ar: 'متوسّط', he: 'בינוני', en: 'MEDIUM' },
  low: { ar: 'منخفض', he: 'נמוך', en: 'LOW' },
};

/**
 * Misconception spread — dramatic split composition.
 *
 *   1. Kicker: `MISCONCEPTION · {severity}`.
 *   2. The wrong claim sits first, struck through, at smaller scale —
 *      it's the trap.
 *   3. A "But:" pivot beat — italic Fraunces "But:" / "بل:" / "אבל:" —
 *      lets the eye breathe before the resolution.
 *   4. The right claim follows, set in confident larger typography. Wins
 *      the visual hierarchy.
 *   5. Optional comparative diagram (wrong-vs-right) as a plate figure
 *      below.
 *   6. The "why students fall for it" line as small marginalia at the
 *      bottom — italic Fraunces, deferential.
 */
export async function MisconceptionSpread({ unit, id, domId }: MisconceptionSpreadProps) {
  const u = await loadUnit(unit);
  const m = findMisconception(u, id);
  const arabicFlag = highest(m.wrong.arFlag, m.right.arFlag);
  const sev = SEVERITY_LABEL[m.severity];

  return (
    <SpreadShell
      id={domId}
      width={hasDiagram(m.id) ? 'wide' : 'standard'}
      arabicFlag={arabicFlag}
      className="py-16 md:py-24"
    >
      <div className="mx-auto max-w-[760px]">
        {/* Kicker */}
        <Rise>
          <I18n
            ar={`مفهوم خاطئ · ${sev.ar}`}
            he={`מושג מוטעה · ${sev.he}`}
            en={`MISCONCEPTION · ${sev.en}`}
            as="span"
            className="block font-mono text-xs uppercase tracking-[0.3em] text-error"
          />
        </Rise>

        {/* The wrong claim — struck through, smaller, less authoritative */}
        <Rise delay={0.05} className="mt-8 md:mt-12">
          <div className="space-y-2 opacity-80">
            {m.wrong.ar && (
              <p
                data-lang="ar"
                dir={LOCALE_DIR.ar}
                className="font-arabic text-[clamp(18px,2.1vw,24px)] leading-[1.6] text-error line-through"
              >
                {m.wrong.ar}
              </p>
            )}
            {m.wrong.he && (
              <p
                data-lang="he"
                dir={LOCALE_DIR.he}
                className="font-hebrew text-[clamp(18px,2.1vw,24px)] leading-[1.5] text-error line-through"
              >
                {m.wrong.he}
              </p>
            )}
            {m.wrong.en && (
              <p
                data-lang="en"
                dir={LOCALE_DIR.en}
                className="font-display text-[clamp(16px,1.8vw,22px)] italic leading-[1.5] text-error line-through"
              >
                {m.wrong.en}
              </p>
            )}
          </div>
        </Rise>

        {/* "But:" pivot */}
        <Rise delay={0.12} className="my-8 md:my-12">
          <div className="flex items-center gap-4">
            <span aria-hidden className="h-px flex-1 bg-border-strong" />
            <span className="font-display text-2xl italic text-accent md:text-3xl">
              <span data-lang="ar" className="font-arabic">
                بل
              </span>
              <span data-lang="he" className="font-hebrew">
                אבל
              </span>
              <span data-lang="en">but</span>
            </span>
            <span aria-hidden className="h-px flex-1 bg-border-strong" />
          </div>
        </Rise>

        {/* The right claim — confident, large, hero */}
        <Rise delay={0.18}>
          <div className="space-y-3">
            {m.right.ar && (
              <p
                data-lang="ar"
                dir={LOCALE_DIR.ar}
                className="font-arabic text-[clamp(24px,3vw,40px)] font-medium leading-[1.4] tracking-[-0.005em] text-ink"
              >
                {m.right.ar}
              </p>
            )}
            {m.right.he && (
              <p
                data-lang="he"
                dir={LOCALE_DIR.he}
                className="font-hebrew text-[clamp(24px,3vw,40px)] font-medium leading-[1.35] text-ink"
              >
                {m.right.he}
              </p>
            )}
            {m.right.en && (
              <p
                data-lang="en"
                dir={LOCALE_DIR.en}
                className="font-display text-[clamp(20px,2.6vw,32px)] font-medium leading-[1.3] tracking-[-0.02em] text-ink"
              >
                {m.right.en}
              </p>
            )}
          </div>
        </Rise>
      </div>

      {/* Comparative diagram — plate-width breakout */}
      {hasDiagram(m.id) && (
        <Rise delay={0.28} className="mt-10 md:mt-14">
          <MisconceptionFigure id={m.id} title={m.title} />
        </Rise>
      )}

      {/* "Why students fall for it" — marginalia */}
      {m.whyStudentsFall && (
        <div className="mx-auto max-w-[760px]">
          <Rise delay={0.34} className="mt-12 md:mt-16">
            <aside className="grid grid-cols-1 gap-3 border-t border-border pt-5 md:grid-cols-[auto_1fr] md:gap-8">
              <I18n
                k="whyTheyFall"
                className="block font-mono text-[10px] uppercase tracking-[0.3em] text-ink-faint"
              />
              <p className="font-display text-base italic leading-relaxed text-ink-muted md:text-lg">
                {firstParagraph(m.whyStudentsFall)}
              </p>
            </aside>
          </Rise>
        </div>
      )}
    </SpreadShell>
  );
}

function MisconceptionFigure({ id, title }: { id: string; title: string }) {
  const Component = getDiagram(id);
  if (!Component) return null;
  return (
    <PhysicsFigure variant="plate" caption={{ en: title }}>
      <Component />
    </PhysicsFigure>
  );
}

function firstParagraph(text: string): string {
  return (text.split(/\n{2,}/)[0] ?? text).trim();
}

function highest(...flags: Array<ArabicFlag | undefined>): ArabicFlag | undefined {
  if (flags.includes('pending')) return 'pending';
  if (flags.includes('verified')) return 'verified';
  if (flags.includes('sayakim')) return 'sayakim';
  return undefined;
}
