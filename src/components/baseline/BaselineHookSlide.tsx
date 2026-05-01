import { loadUnit } from '@/lib/content/baseline';
import { BaselineSlideFrame } from './SlideFrame';
import { SlideKicker } from './SlideKicker';

interface BaselineHookSlideProps {
  unit: string;
  slideNumber?: string;
}

const HOOK_KICKER = {
  ar: 'سؤال الانطلاق',
  he: 'שאלת פתיחה',
  en: 'OPENING QUESTION',
};

/**
 * The hook slide renders the deep question that motivates the unit. Pulled
 * from the baseline's `## Introduction` section. Currently the introduction
 * text is Arabic-only in `03_newtons_laws.md` so the hook displays Arabic
 * regardless of active locale (no Hebrew/English variant exists in the
 * baseline). Once introductions become trilingual in the baseline, this slide
 * will pick the active-locale variant automatically.
 */
export async function BaselineHookSlide({ unit, slideNumber }: BaselineHookSlideProps) {
  const u = await loadUnit(unit);
  const intro = extractFirstQuestion(u.introduction) ?? firstNonEmptyParagraph(u.introduction);
  return (
    <BaselineSlideFrame
      unitNumber={unit}
      slideNumber={slideNumber}
      kicker={<SlideKicker text={HOOK_KICKER} />}
    >
      <div className="flex h-full flex-col justify-center gap-8">
        <p dir="rtl" className="font-arabic text-3xl font-medium leading-snug text-ink md:text-5xl">
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
  const bold = text.match(/\*\*([^*]+\?)\*\*/);
  if (bold) return (bold[1] ?? '').trim();
  return undefined;
}
