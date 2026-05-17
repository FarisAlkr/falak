import { describe, expect, it } from 'vitest';
import { NEWTONS_LAWS_CHAPTERS } from './chapters';
import { UNIT_03_DECK } from './lectureDeck';

describe('Unit 03 chapter manifest', () => {
  it('declares exactly five chapters', () => {
    expect(NEWTONS_LAWS_CHAPTERS).toHaveLength(5);
  });

  it('each chapter has all required trilingual fields', () => {
    for (const c of NEWTONS_LAWS_CHAPTERS) {
      expect(c.id).toBeTruthy();
      expect(c.number).toBeTruthy();
      expect(c.title.ar).toBeTruthy();
      expect(c.title.he).toBeTruthy();
      expect(c.title.en).toBeTruthy();
      expect(c.description.ar).toBeTruthy();
      expect(c.description.he).toBeTruthy();
      expect(c.description.en).toBeTruthy();
      expect(c.slides[0]).toBeGreaterThanOrEqual(1);
      expect(c.slides[1]).toBeGreaterThanOrEqual(c.slides[0]);
      expect(c.estimatedMinutes).toBeGreaterThan(0);
      expect(c.kind).toMatch(/^(foundation|core|synthesis|misconceptions|summary)$/);
    }
  });

  it('slide ranges cover slides 1..32 with no gaps and no overlaps', () => {
    const sorted = [...NEWTONS_LAWS_CHAPTERS].sort((a, b) => a.slides[0] - b.slides[0]);
    expect(sorted[0]?.slides[0]).toBe(1);
    for (let i = 0; i < sorted.length - 1; i++) {
      const cur = sorted[i]!;
      const next = sorted[i + 1]!;
      // Adjacent ranges must be consecutive: cur ends, next starts at end+1.
      expect(next.slides[0]).toBe(cur.slides[1] + 1);
    }
    // Per design intent, slide 33 (the unit summary) is not in any chapter
    // — it's reachable only through the long-scroll route.
    expect(sorted.at(-1)?.slides[1]).toBe(32);
  });

  it('every chapter range is within the deck bounds', () => {
    const deckSize = UNIT_03_DECK.length;
    for (const c of NEWTONS_LAWS_CHAPTERS) {
      expect(c.slides[1]).toBeLessThanOrEqual(deckSize);
    }
  });

  it('prerequisites form a valid DAG (no cycles, no unknown ids)', () => {
    const ids = new Set(NEWTONS_LAWS_CHAPTERS.map((c) => c.id));
    for (const c of NEWTONS_LAWS_CHAPTERS) {
      for (const p of c.prerequisites) {
        expect(ids.has(p)).toBe(true);
      }
    }
    // Topological sort — should succeed.
    const order = NEWTONS_LAWS_CHAPTERS.map((c) => c.id);
    const seen = new Set<string>();
    for (const id of order) {
      const c = NEWTONS_LAWS_CHAPTERS.find((x) => x.id === id)!;
      for (const p of c.prerequisites) {
        expect(seen.has(p)).toBe(true);
      }
      seen.add(id);
    }
  });

  it('chapter ids are unique kebab-case slugs', () => {
    const ids = NEWTONS_LAWS_CHAPTERS.map((c) => c.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const id of ids) {
      expect(id).toMatch(/^[a-z][a-z0-9-]*$/);
    }
  });

  it('Roman numerals are sequential and valid', () => {
    const expectedNumerals = ['I', 'II', 'III', 'IV', 'V'];
    for (let i = 0; i < NEWTONS_LAWS_CHAPTERS.length; i++) {
      expect(NEWTONS_LAWS_CHAPTERS[i]?.number).toBe(expectedNumerals[i]);
    }
  });
});
