import type { GlossaryEntry, Trilingual } from '@/lib/content/types';
import { cn } from '@/lib/utils/cn';
import { LOCALE_DIR } from '@/lib/i18n/constants';
import { termizeText } from '@/components/i18n/TermizedText';

interface TrilingualBlockProps {
  value: Trilingual;
  /** Tone affects color treatment — neutral by default, danger for "wrong" claims. */
  tone?: 'neutral' | 'danger' | 'success';
  /** Heading-style sizing. Defaults to body. */
  size?: 'body' | 'lead';
  /**
   * Glossary entries scoped to this block (typically the parent unit's full
   * glossary). When provided, the rendered prose has every glossary-matched
   * substring wrapped in a `<Term>` for hover-translate.
   */
  glossary?: GlossaryEntry[];
}

/**
 * Renders all three language variants (`data-lang="ar|he|en"`) so the active
 * one is shown and the other two are hidden by CSS rules driven by
 * `<html lang>`. The Arabic and Hebrew variants are RTL; English is LTR.
 *
 * If a `glossary` prop is supplied, the *headline* of each variant is wrapped
 * in a `<Term>` for hover-translation. (We don't substring-match prose here
 * because the Trilingual block is used for short statements where the whole
 * line is essentially the term.)
 */
export function TrilingualBlock({
  value,
  tone = 'neutral',
  size = 'body',
  glossary,
}: TrilingualBlockProps) {
  const arClass = cn(
    'font-arabic leading-arabic',
    size === 'lead' ? 'text-2xl font-medium md:text-3xl' : 'text-base md:text-lg',
    tone === 'danger' && 'text-error',
    (tone === 'success' || tone === 'neutral') && 'text-ink',
  );
  const heClass = cn(
    'font-hebrew',
    size === 'lead' ? 'text-2xl font-medium md:text-3xl' : 'text-base md:text-lg',
    tone === 'danger' && 'text-error line-through opacity-70',
    (tone === 'success' || tone === 'neutral') && 'text-ink',
  );
  const enClass = cn(
    'font-body italic',
    size === 'lead' ? 'text-xl md:text-2xl' : 'text-sm md:text-base',
    tone === 'danger' && 'text-error line-through opacity-70',
    (tone === 'success' || tone === 'neutral') && 'text-ink-muted',
  );
  const renderText = (text: string, locale: 'ar' | 'he' | 'en') =>
    glossary && glossary.length > 0 ? termizeText({ text, glossary, locale }) : text;

  return (
    <div className="space-y-2">
      {value.ar && (
        <p data-lang="ar" dir={LOCALE_DIR.ar} className={arClass}>
          {renderText(value.ar, 'ar')}
        </p>
      )}
      {value.he && (
        <p data-lang="he" dir={LOCALE_DIR.he} className={heClass}>
          {renderText(value.he, 'he')}
        </p>
      )}
      {value.en && (
        <p data-lang="en" dir={LOCALE_DIR.en} className={enClass}>
          {renderText(value.en, 'en')}
        </p>
      )}
    </div>
  );
}
