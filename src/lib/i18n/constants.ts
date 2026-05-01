import type { Locale } from '@/types/progress';

export const LOCALES: readonly Locale[] = ['ar', 'he', 'en'] as const;

export const LOCALE_DIR: Record<Locale, 'rtl' | 'ltr'> = {
  ar: 'rtl',
  he: 'rtl',
  en: 'ltr',
};

/** Native-script display name. Used in the language selector. */
export const LOCALE_NATIVE_NAME: Record<Locale, string> = {
  ar: 'العربيّة',
  he: 'עברית',
  en: 'English',
};

/**
 * Which language a hover-tooltip should reveal when each mode is active.
 * AR student preparing for the Hebrew Bagrut → see the Hebrew term.
 * HE student → see the Arabic equivalent.
 * EN reader (admin/dev) → see the Hebrew term (the Bagrut language).
 */
export const HOVER_REVEALS: Record<Locale, Locale> = {
  ar: 'he',
  he: 'ar',
  en: 'he',
};
