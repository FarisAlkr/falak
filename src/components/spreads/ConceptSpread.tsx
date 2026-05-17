import { findConcept, loadUnit } from '@/lib/content/baseline';
import { BlockMath } from '@/components/math/Math';
import { LOCALE_DIR } from '@/lib/i18n/constants';
import { PhysicsFigure } from '@/components/figure/PhysicsFigure';
import { hasDiagram, getDiagram } from '@/components/baseline/DiagramRegistry';
import { I18n } from '@/components/i18n/I18n';
import { termizeText } from '@/components/i18n/TermizedText';
import type { ArabicFlag, ConceptType } from '@/lib/content/types';
import { SpreadShell } from './SpreadShell';
import { Rise } from './Rise';

export interface ConceptSpreadProps {
  unit: string;
  id: string;
  /** DOM id for the wrapper section (e.g., `slide-7`). */
  domId?: string;
}

const KICKER_TEXT: Record<ConceptType, { ar: string; he: string; en: string }> = {
  definition: { ar: 'مفهوم · تعريف', he: 'מושג · הגדרה', en: 'CONCEPT · DEFINITION' },
  law: { ar: 'مفهوم · قانون', he: 'מושג · חוק', en: 'CONCEPT · LAW' },
  derivation: { ar: 'مفهوم · اشتقاق', he: 'מושג · גזירה', en: 'CONCEPT · DERIVATION' },
  application: { ar: 'مفهوم · تطبيق', he: 'מושג · יישום', en: 'CONCEPT · APPLICATION' },
};

/**
 * Concept spread — the workhorse of the lecture. Editorial composition:
 *
 *   1. Kicker (small mono uppercase, accent crimson) sets the type.
 *   2. The trilingual statement set as a *display* paragraph: Arabic in
 *      Naskh at lead size, Hebrew in Heebo, English in Fraunces. This is
 *      the verbal hero.
 *   3. PhysicsFigure (hero variant, ~700px) sits below as the visual hero.
 *      One concept = one canonical figure.
 *   4. Equations follow as a quiet callout — small accent border, ample
 *      vertical space above and below.
 *   5. The "watch out" (student-difficulty) note lives in the margin as
 *      italic Fraunces commentary; small, deferential, not a wall.
 *
 * The concept's own ID is the slide's section anchor — clicking the TOC
 * tick scrolls here.
 */
export async function ConceptSpread({ unit, id, domId }: ConceptSpreadProps) {
  const u = await loadUnit(unit);
  const c = findConcept(u, id);
  const arabicFlag = c.statement.arFlag;
  const kicker = KICKER_TEXT[c.type];

  return (
    <SpreadShell
      id={domId}
      width={hasDiagram(c.id) ? 'wide' : 'standard'}
      arabicFlag={arabicFlag}
      className="py-16 md:py-24"
    >
      {/* Reading column — text portions sit in a narrower band so the
          long Arabic prose stays comfortably readable. The figure below
          breaks out to the full spread width. */}
      <div className="mx-auto max-w-[760px]">
        {/* Kicker */}
        <Rise>
          <I18n
            ar={kicker.ar}
            he={kicker.he}
            en={kicker.en}
            as="span"
            className="block font-mono text-xs uppercase tracking-[0.3em] text-accent"
          />
        </Rise>

        {/* Trilingual statement set as the verbal hero */}
        <Rise delay={0.05} className="mt-8 md:mt-12">
          <div className="space-y-4">
            {c.statement.ar && (
              <p
                data-lang="ar"
                dir={LOCALE_DIR.ar}
                className="font-arabic text-[clamp(22px,2.6vw,36px)] font-medium leading-[1.5] tracking-[-0.005em] text-ink"
              >
                {termizeText({ text: c.statement.ar, glossary: u.glossary, locale: 'ar' })}
              </p>
            )}
            {c.statement.he && (
              <p
                data-lang="he"
                dir={LOCALE_DIR.he}
                className="font-hebrew text-[clamp(22px,2.6vw,36px)] font-medium leading-[1.4] text-ink"
              >
                {termizeText({ text: c.statement.he, glossary: u.glossary, locale: 'he' })}
              </p>
            )}
            {c.statement.en && (
              <p
                data-lang="en"
                dir={LOCALE_DIR.en}
                className="font-display text-[clamp(20px,2.3vw,32px)] font-medium leading-[1.3] tracking-[-0.015em] text-ink"
              >
                {termizeText({ text: c.statement.en, glossary: u.glossary, locale: 'en' })}
              </p>
            )}
          </div>
        </Rise>
      </div>

      {/* Hero figure — breaks out of the reading column */}
      {hasDiagram(c.id) && (
        <Rise delay={0.18} className="mt-8 md:mt-14">
          <ConceptFigure id={c.id} visualName={c.visualName} />
        </Rise>
      )}

      <div className="mx-auto max-w-[760px]">
        {/* Equations — quiet callout below the figure */}
        {c.equations.length > 0 && (
          <Rise delay={0.24} className="mt-2 md:mt-4">
            <div className="border-s-2 border-accent ps-6">
              {c.equations.slice(0, 3).map((eq, i) => (
                <div key={i} className="my-2">
                  <BlockMath>{eq.tex}</BlockMath>
                </div>
              ))}
            </div>
          </Rise>
        )}

        {/* Marginalia — student difficulty note as deferential commentary */}
        {c.studentDifficulty && (
          <Rise delay={0.32} className="mt-12 md:mt-16">
            <aside className="grid grid-cols-1 gap-3 border-t border-border pt-5 md:grid-cols-[auto_1fr] md:gap-8">
              <I18n
                k="watchOut"
                className="block font-mono text-[10px] uppercase tracking-[0.3em] text-warning"
              />
              <p
                dir="rtl"
                className="font-arabic text-base leading-arabic text-ink-muted md:text-lg"
              >
                {firstParagraph(c.studentDifficulty)}
              </p>
            </aside>
          </Rise>
        )}
      </div>
    </SpreadShell>
  );
}

interface ConceptFigureProps {
  id: string;
  visualName?: string;
}

function ConceptFigure({ id, visualName }: ConceptFigureProps) {
  const Component = getDiagram(id);
  if (!Component) return null;
  return (
    <PhysicsFigure variant="hero" caption={visualName ? { en: visualName } : undefined}>
      <Component />
    </PhysicsFigure>
  );
}

function firstParagraph(text: string): string {
  return (text.split(/\n{2,}/)[0] ?? text).trim();
}

// Re-export for the test fixture
export type { ArabicFlag };
