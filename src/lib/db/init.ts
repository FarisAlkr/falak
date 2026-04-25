import { getDB } from './schema';
import { defaultProgress, defaultSettings, type Settings } from '@/types/progress';

export async function ensureInitialized(): Promise<Settings> {
  const db = getDB();
  let settings = await db.settings.get('singleton');
  if (!settings) {
    settings = defaultSettings(crypto.randomUUID());
    await db.settings.add(settings);
  }
  const existingProgress = await db.progress.get(settings.userId);
  if (!existingProgress) {
    await db.progress.add(defaultProgress(settings.userId));
  }
  return settings;
}
