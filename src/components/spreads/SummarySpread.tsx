import { loadUnit } from '@/lib/content/baseline';
import { BlockMath } from '@/components/math/Math';
import { LOCALE_DIR } from '@/lib/i18n/constants';
import { I18n } from '@/components/i18n/I18n';
import { SpreadShell } from './SpreadShell';
import { Rise } from './Rise';

export interface SummarySpreadProps {
  unit: string;
  id?: string;
  /** Equation IDs to feature. Defaults to first three from frontmatter. */
  highlightEquations?: string[];
}

/**
 * Closing spread — the takeaway. Key equations as massive typographic
 * heroes (each in its own card with generous whitespace), title block as
 * an ascending mark on top, learning outcomes as small numbered items
 * below.
 */
export async function SummarySpread({ unit, id, highlightEquations }: SummarySpreadProps) {
  const u = await loadUnit(unit);
  const t = u.frontmatter.titles;
  const ids = highlightEquations ?? u.frontmatter.keyEquations.slice(0, 3).map((e) => e.id);
  const eqs = ids
    .map((eid) => u.frontmatter.keyEquations.find((e) => e.id === eid))
    .filter((e): e is NonNullable<typeof e> => Boolean(e));
  const outcomes = u.frontmatter.learningOutcomes.slice(0, 5);

  return (
    <SpreadShell id={id} width="wide" className="py-24 md:py-32">
      {/* Title mark */}
      <Rise>
        <I18n
          ar="الخلاصة"
          he="סיכום"
          en="SUMMARY"
          as="span"
          className="block font-mono text-xs uppercase tracking-[0.3em] text-accent"
        />
      </Rise>
      <Rise delay={0.05} className="mt-6">
        <h2 className="leading-[1.05]">
          <span
            data-lang="ar"
            dir={LOCALE_DIR.ar}
            className="block font-arabic text-[clamp(40px,6vw,96px)] font-medium tracking-[-0.015em] text-ink"
          >
            {t.ar}
          </span>
          <span
            data-lang="he"
            dir={LOCALE_DIR.he}
            className="block font-hebrew text-[clamp(36px,5vw,80px)] font-medium text-ink"
          >
            {t.he}
          </span>
          <span
            data-lang="en"
            dir={LOCALE_DIR.en}
            className="block font-display text-[clamp(36px,5vw,80px)] font-medium tracking-[-0.025em] text-ink"
          >
            {t.en}
          </span>
        </h2>
      </Rise>

      {/* Key equations as typographic heroes */}
      {eqs.length > 0 && (
        <div className="mt-14 grid grid-cols-1 gap-8 md:mt-20 md:gap-12">
          {eqs.map((eq, i) => (
            <Rise key={eq.id} delay={0.12 + 0.08 * i}>
              <div className="border-s-2 border-accent py-4 ps-8">
                <div className="text-[clamp(28px,4vw,56px)]">
                  <BlockMath>{eq.formula}</BlockMath>
                </div>
                {eq.plain && (
                  <p
                    dir="ltr"
                    className="mt-2 font-mono text-xs uppercase tracking-[0.25em] text-ink-muted"
                  >
                    {eq.plain}
                  </p>
                )}
              </div>
            </Rise>
          ))}
        </div>
      )}

      {/* Learning outcomes */}
      {outcomes.length > 0 && (
        <Rise delay={0.4} className="mt-20 md:mt-28">
          <I18n
            ar="ما يجب أن تتقنه"
            he="מה תדעו לעשות"
            en="WHAT YOU SHOULD BE ABLE TO DO"
            as="span"
            className="block font-mono text-[10px] uppercase tracking-[0.3em] text-ink-faint"
          />
          <ol className="mt-6 space-y-3" dir="ltr" data-lang="en">
            {outcomes.map((o, i) => (
              <li key={i} className="flex gap-4">
                <span className="font-mono text-sm tabular-nums text-accent">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="font-body text-base leading-relaxed text-ink md:text-lg">{o}</span>
              </li>
            ))}
          </ol>
        </Rise>
      )}
    </SpreadShell>
  );
}
