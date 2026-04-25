'use client';

import { useEffect } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { getDB } from './schema';
import { ensureInitialized } from './init';
import {
  defaultUnitProgress,
  type Progress,
  type Settings,
  type UnitProgress,
} from '@/types/progress';
import type { UnitId } from '@/types/unit';

let _initPromise: Promise<Settings> | null = null;

function ensureOnce(): Promise<Settings> {
  if (!_initPromise) {
    _initPromise = ensureInitialized();
  }
  return _initPromise;
}

export function useDexieInit(): Settings | undefined {
  useEffect(() => {
    void ensureOnce();
  }, []);
  return useLiveQuery(() => getDB().settings.get('singleton'));
}

export function useSettings(): Settings | undefined {
  return useDexieInit();
}

export function useUserId(): string | undefined {
  return useSettings()?.userId;
}

export function useProgress(unitId: UnitId): UnitProgress {
  const userId = useUserId();
  const progress = useLiveQuery<Progress | undefined>(
    () => (userId ? getDB().progress.get(userId) : undefined),
    [userId],
  );
  return progress?.unitProgress[unitId] ?? defaultUnitProgress();
}
