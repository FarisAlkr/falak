import { loadUnit } from '@/lib/content/baseline';
import { HookMotionDiagram } from '@/components/diagrams/physics';
import { I18n } from '@/components/i18n/I18n';
import { PhysicsFigure } from '@/components/figure/PhysicsFigure';
import { SpreadShell } from './SpreadShell';
import { Rise } from './Rise';

export interface HookSpreadProps {
  unit: string;
  id?: string;
}

/**
 * Opening question. The verb (the actual question text) sets in display
 * Fraunces at clamp(40px, 5vw, 80px); a supporting plate-figure sits
 * underneath as the visual restatement of the question. Generous
 * whitespace above and below so the question has room to breathe.
 *
 * The introduction prose in the baseline is currently Arabic-leaning;
 * Hebrew/English readers see Arabic regardless. (Open issue: extend the
 * baseline schema for a trilingual hook.)
 */
export async function HookSpread({ unit, id }: HookSpreadProps) {
  const u = await loadUnit(unit);
  const intro = extractFirstQuestion(u.introduction) ?? firstNonEmptyParagraph(u.introduction);

  return (
    <SpreadShell id={id} width="wide" className="py-20 md:py-28">
      <div className="space-y-16 md:space-y-20">
        <div className="mx-auto max-w-[820px]">
          <Rise>
            <I18n
              ar="سؤال الانطلاق"
              he="שאלת פתיחה"
              en="OPENING QUESTION"
              as="span"
              className="block font-mono text-xs uppercase tracking-[0.3em] text-accent"
            />
          </Rise>

          <Rise delay={0.08} className="mt-8 md:mt-10">
            <p
              dir="rtl"
              className="font-arabic text-[clamp(30px,4.4vw,68px)] font-medium leading-[1.2] tracking-[-0.015em] text-ink"
            >
              {intro}
            </p>
          </Rise>
        </div>

        <Rise delay={0.18}>
          <PhysicsFigure
            variant="plate"
            caption={{
              ar: 'ما الذي يصنع الفرق بين الجسمين؟',
              he: 'מה ההבדל בין שני המצבים?',
              en: 'what makes the difference?',
            }}
          >
            <HookMotionDiagram />
          </PhysicsFigure>
        </Rise>
      </div>
    </SpreadShell>
  );
}

function firstNonEmptyParagraph(text: string): string {
  const blocks = text.split(/\n{2,}/);
  for (const b of blocks) {
    const t = b.trim();
    if (!t) continue;
    if (t.startsWith('#') || t.startsWith('|') || t.startsWith('-')) continue;
    if (t.startsWith('>')) {
      return t.replace(/^\s*>\s?/gm, '').trim();
    }
    return t;
  }
  return '';
}

function extractFirstQuestion(text: string): string | undefined {
  const bold = text.match(/\*\*([^*]+\?)\*\*/);
  if (bold) return (bold[1] ?? '').trim();
  return undefined;
}
