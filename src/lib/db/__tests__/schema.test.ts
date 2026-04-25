import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import 'fake-indexeddb/auto';
import { FalakDB } from '../schema';
import { ensureInitialized } from '../init';
import { defaultProgress, defaultSettings } from '@/types/progress';

describe('FalakDB schema v1', () => {
  let db: FalakDB;

  beforeEach(() => {
    db = new FalakDB();
  });

  afterEach(async () => {
    await db.delete();
  });

  it('creates settings + progress rows on first init', async () => {
    const settings = await ensureInitialized();
    expect(settings.key).toBe('singleton');
    expect(settings.userId).toBeTruthy();
    expect(settings.accountId).toBeNull();
    expect(settings.locale).toBe('ar');

    const progress = await db.progress.get(settings.userId);
    expect(progress).toBeDefined();
    expect(progress?.unitProgress).toEqual({});
  });

  it('is idempotent (calling twice does not duplicate rows)', async () => {
    await ensureInitialized();
    await ensureInitialized();
    const allSettings = await db.settings.toArray();
    expect(allSettings).toHaveLength(1);
  });

  it('round-trips a Progress object', async () => {
    const userId = 'test-user';
    const initial = defaultProgress(userId);
    initial.unitProgress['newtons-laws'] = {
      theoryCompleted: true,
      theoryLastSlide: 5,
      interactiveBestScore: 80,
      interactiveStreak: 3,
      examScores: [{ attemptId: 'a1', score: 75, date: 1700000000000 }],
    };
    await db.progress.put(initial);
    const fetched = await db.progress.get(userId);
    expect(fetched?.unitProgress['newtons-laws']?.theoryLastSlide).toBe(5);
    expect(fetched?.unitProgress['newtons-laws']?.examScores).toHaveLength(1);
  });

  it('reserves accountId as null pre-auth', async () => {
    const settings = defaultSettings('test-user');
    expect(settings.accountId).toBeNull();
  });
});
