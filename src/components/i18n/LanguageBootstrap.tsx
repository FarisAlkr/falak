'use client';

import { useEffect } from 'react';
import { useSettings } from '@/lib/db/hooks';
import { LOCALE_DIR } from '@/lib/i18n/constants';

/**
 * Reads the persisted locale from Dexie and syncs it to the document's
 * `<html lang>` and `<html dir>` attributes. CSS rules in `globals.css` then
 * hide non-active language content and orient the layout correctly.
 *
 * This is mounted once at the root layout level. It renders nothing.
 */
export function LanguageBootstrap() {
  const settings = useSettings();
  const locale = settings?.locale;

  useEffect(() => {
    if (!locale) return;
    const html = document.documentElement;
    html.setAttribute('lang', locale);
    html.setAttribute('dir', LOCALE_DIR[locale]);
  }, [locale]);

  return null;
}
