'use client';

import { useSettings } from '@/lib/db/hooks';
import { useSettingsStore } from '@/stores/settingsStore';
import { LOCALES, LOCALE_DIR, LOCALE_NATIVE_NAME } from '@/lib/i18n/constants';
import type { Locale } from '@/types/progress';
import { cn } from '@/lib/utils/cn';

const LOCALE_FONT: Record<Locale, string> = {
  ar: 'font-arabic',
  he: 'font-hebrew',
  en: 'font-body',
};

/**
 * Top-bar language selector. Three pills (AR · HE · EN) showing each language
 * in its native script. The active one is underlined in crimson; the others
 * are muted ink and animate to ink on hover.
 *
 * Persists to Dexie via the existing `setLocale` action; the
 * `<LanguageBootstrap>` client component then reflects the change onto
 * `<html lang>` and CSS hides the non-active language content site-wide.
 */
export function LanguageSelector() {
  const settings = useSettings();
  const setLocale = useSettingsStore((s) => s.setLocale);
  const active = settings?.locale ?? 'ar';

  const handleSelect = (next: Locale) => {
    if (next === active) return;
    // Optimistic DOM update so the swap feels instant — Dexie write follows.
    document.documentElement.setAttribute('lang', next);
    document.documentElement.setAttribute('dir', LOCALE_DIR[next]);
    void setLocale(next);
  };

  return (
    <div
      role="group"
      aria-label="Language"
      dir="ltr"
      className="inline-flex items-center gap-0.5 rounded-sm border border-border bg-paper p-0.5"
    >
      {LOCALES.map((locale) => {
        const isActive = locale === active;
        return (
          <button
            key={locale}
            type="button"
            onClick={() => handleSelect(locale)}
            aria-pressed={isActive}
            aria-label={LOCALE_NATIVE_NAME[locale]}
            className={cn(
              'group relative px-3 py-1.5 text-sm transition-colors duration-fast ease-out',
              LOCALE_FONT[locale],
              isActive ? 'text-ink' : 'text-ink-muted hover:text-ink',
            )}
          >
            <span dir={LOCALE_DIR[locale]}>{LOCALE_NATIVE_NAME[locale]}</span>
            <span
              aria-hidden
              className={cn(
                'pointer-events-none absolute inset-x-2 -bottom-px h-px bg-accent transition-opacity duration-fast',
                isActive ? 'opacity-100' : 'opacity-0',
              )}
            />
          </button>
        );
      })}
    </div>
  );
}
