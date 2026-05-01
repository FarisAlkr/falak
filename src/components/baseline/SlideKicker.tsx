import type { Locale } from '@/types/progress';
import { LOCALE_DIR } from '@/lib/i18n/constants';

type LocaleStrings = Record<Locale, string>;

interface SlideKickerProps {
  /** Localized kicker text. The English variant gets mono+uppercase; the
   *  Arabic/Hebrew variants use their script font at the same small size. */
  text: LocaleStrings;
  /** Optional secondary fragment (e.g. difficulty/severity), shown after a · */
  trailing?: LocaleStrings;
}

/**
 * Small uppercase meta label that sits at the top-left of every baseline
 * slide. Renders all three locales with `data-lang` markers so CSS
 * (driven by `<html lang>`) reveals just the active one.
 *
 * Arabic and Hebrew variants drop the uppercase + tracking treatment that
 * makes English meta labels read as labels — both scripts look wrong with
 * letter-spacing or pseudo-capitals.
 */
export function SlideKicker({ text, trailing }: SlideKickerProps) {
  return (
    <span className="text-ink-muted">
      <KickerVariant locale="en" text={text.en} trailing={trailing?.en} />
      <KickerVariant locale="ar" text={text.ar} trailing={trailing?.ar} />
      <KickerVariant locale="he" text={text.he} trailing={trailing?.he} />
    </span>
  );
}

function KickerVariant({
  locale,
  text,
  trailing,
}: {
  locale: Locale;
  text: string;
  trailing?: string;
}) {
  const isEnglish = locale === 'en';
  const cls = isEnglish
    ? 'font-mono text-[10px] uppercase tracking-meta'
    : locale === 'ar'
      ? 'font-arabic text-xs'
      : 'font-hebrew text-xs';
  return (
    <span data-lang={locale} dir={LOCALE_DIR[locale]} className={cls}>
      {text}
      {trailing && (
        <>
          {' · '}
          {trailing}
        </>
      )}
    </span>
  );
}
