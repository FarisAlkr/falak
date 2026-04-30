import { loadUnit } from '@/lib/content/baseline';
import { BaselineSlideFrame } from './SlideFrame';

interface BaselineHookSlideProps {
  unit: string;
  slideNumber?: string;
}

/**
 * The "hook" slide — the question that motivates the unit. Pulled from the
 * baseline's `## Introduction` section. We render the introduction's first
 * substantive paragraph, surfaced as a single big question.
 */
export async function BaselineHookSlide({ unit, slideNumber }: BaselineHookSlideProps) {
  const u = await loadUnit(unit);
  const intro = extractFirstQuestion(u.introduction) ?? firstNonEmptyParagraph(u.introduction);
  const en = u.frontmatter.titles.en;
  return (
    <BaselineSlideFrame unitNumber={unit} slideNumber={slideNumber} kicker="HOOK · سؤال الانطلاق">
      <div className="flex h-full flex-col justify-center gap-8">
        <span dir="ltr" className="font-mono text-xs uppercase tracking-meta text-ink-faint">
          {en} · the question that drives this unit
        </span>
        <p dir="ltr" className="font-display text-3xl italic leading-snug text-ink md:text-4xl">
          {intro}
        </p>
      </div>
    </BaselineSlideFrame>
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
  // Look for **bold** highlighted question.
  const bold = text.match(/\*\*([^*]+\?)\*\*/);
  if (bold) return (bold[1] ?? '').trim();
  return undefined;
}
