import type { CSSProperties, ElementType, ReactNode } from 'react';
import type { Locale } from '@/types/progress';
import { LOCALE_DIR } from '@/lib/i18n/constants';
import { STRINGS, type StringKey } from '@/lib/i18n/strings';

const LOCALE_FONT: Record<Locale, string> = {
  ar: 'font-arabic',
  he: 'font-hebrew',
  en: 'font-body',
};

interface BaseProps {
  className?: string;
  style?: CSSProperties;
  /** Override the rendered tag. Defaults to <span>. */
  as?: ElementType;
  /** Skip applying the per-locale font class (use the parent's font instead). */
  unstyled?: boolean;
}

interface I18nInlineProps extends BaseProps {
  ar?: ReactNode;
  he?: ReactNode;
  en?: ReactNode;
}

interface I18nKeyProps extends BaseProps {
  k: StringKey;
}

/**
 * Renders all three language variants with `data-lang` markers. Only the active
 * locale is visible — the rest are hidden via CSS rules in `globals.css`
 * driven by the `<html lang>` attribute.
 *
 * Two call shapes:
 *  - `<I18n ar="..." he="..." en="..." />` for one-off strings authored at the
 *    call site.
 *  - `<I18n k="appName" />` to look up a key from the central `STRINGS` table.
 */
export function I18n(props: I18nInlineProps | I18nKeyProps) {
  const { className, style, as: Tag = 'span', unstyled } = props;
  const variants = isKey(props) ? STRINGS[props.k] : { ar: props.ar, he: props.he, en: props.en };

  if (!variants) return null;

  return (
    <Tag className={className} style={style}>
      {(['ar', 'he', 'en'] as const).map((locale) => {
        const value = variants[locale];
        if (value === undefined || value === null || value === '') return null;
        return (
          <span
            key={locale}
            data-lang={locale}
            dir={LOCALE_DIR[locale]}
            className={unstyled ? undefined : LOCALE_FONT[locale]}
          >
            {value}
          </span>
        );
      })}
    </Tag>
  );
}

function isKey(props: I18nInlineProps | I18nKeyProps): props is I18nKeyProps {
  return 'k' in props && typeof (props as I18nKeyProps).k === 'string';
}

/**
 * Render a single locale's content explicitly (lower-level escape hatch). Use
 * this when you need different markup per locale rather than just different
 * text — for example a different layout for LTR English.
 */
export function Lang({
  for: locale,
  children,
  as: Tag = 'span',
  className,
}: {
  for: Locale;
  children: ReactNode;
  as?: ElementType;
  className?: string;
}) {
  return (
    <Tag data-lang={locale} dir={LOCALE_DIR[locale]} className={className}>
      {children}
    </Tag>
  );
}
