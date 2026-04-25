import Dexie, { type Table } from 'dexie';
import type { Progress, Settings } from '@/types/progress';

export class FalakDB extends Dexie {
  progress!: Table<Progress, string>;
  settings!: Table<Settings, 'singleton'>;

  constructor() {
    super('falak');
    this.version(1).stores({
      progress: 'userId, lastActiveAt',
      settings: '&key',
    });
  }
}

let _db: FalakDB | null = null;

export function getDB(): FalakDB {
  if (!_db) {
    _db = new FalakDB();
  }
  return _db;
}
