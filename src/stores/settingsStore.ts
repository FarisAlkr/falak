'use client';

import { create } from 'zustand';
import { getDB } from '@/lib/db/schema';
import { ensureInitialized } from '@/lib/db/init';
import type { Locale } from '@/types/progress';

interface SettingsActions {
  setLocale: (locale: Locale) => Promise<void>;
  setAccountId: (accountId: string | null) => Promise<void>;
}

export const useSettingsStore = create<SettingsActions>(() => ({
  setLocale: async (locale) => {
    await ensureInitialized();
    await getDB().settings.update('singleton', { locale });
  },

  setAccountId: async (accountId) => {
    await ensureInitialized();
    await getDB().settings.update('singleton', { accountId });
  },
}));
