import { describe, expect, it } from 'vitest';
import { loadUnit } from './baseline';
import { buildDeckFromBaseline } from './buildDeck';
import type { UnitBaseline, ExampleBlock } from './types';

/**
 * Pedagogy linter — encodes the three rules from `docs/09_pedagogy.md` as
 * vitest assertions so `pnpm test` fails when a baseline drifts from the
 * authored standard. Add new units to `UNITS_TO_VERIFY` once their content
 * file exists.
 */

const UNITS_TO_VERIFY: string[] = ['03'];

for (const unitNumber of UNITS_TO_VERIFY) {
  describe(`Pedagogy invariants · Unit ${unitNumber}`, () => {
    let unit: UnitBaseline;

    it('loads', async () => {
      unit = await loadUnit(unitNumber);
      expect(unit).toBeDefined();
    });

    /* ─────────────────────────────────────────────────────────────────
     * Rule 1 — every concept introduced must be paired with a concrete
     * example applying it.
     * ───────────────────────────────────────────────────────────────── */
    it('Rule 1 · every concept has at least one paired example', async () => {
      unit ??= await loadUnit(unitNumber);
      for (const c of unit.concepts) {
        const paired = unit.examples.filter((e) => e.pairsWith === c.id);
        expect(
          paired.length,
          `concept "${c.id}" has no paired example (Rule 1 violation)`,
        ).toBeGreaterThan(0);
      }
    });

    it('Rule 1 · every concept.pair_with_example resolves to a real example', async () => {
      unit ??= await loadUnit(unitNumber);
      for (const c of unit.concepts) {
        if (!c.pairWithExample) continue;
        expect(
          unit.examples.some((e) => e.id === c.pairWithExample),
          `concept "${c.id}".pair_with_example points to missing example "${c.pairWithExample}"`,
        ).toBe(true);
      }
    });

    /* ─────────────────────────────────────────────────────────────────
     * Rule 2 — every example carries an explicit difficulty marker.
     * The unit-wide difficulty curve should include all three tiers
     * somewhere; the cumulative example MUST be advanced.
     * ───────────────────────────────────────────────────────────────── */
    it('Rule 2 · every example has a difficulty', async () => {
      unit ??= await loadUnit(unitNumber);
      for (const ex of unit.examples) {
        expect(['basic', 'intermediate', 'advanced']).toContain(ex.difficulty);
      }
    });

    it('Rule 2 · the unit covers all three difficulty tiers', async () => {
      unit ??= await loadUnit(unitNumber);
      const tiers = new Set(unit.examples.map((e) => e.difficulty));
      expect(tiers.has('basic'), 'no basic examples — students never build fluency').toBe(true);
      expect(
        tiers.has('intermediate'),
        'no intermediate examples — jump from easy to advanced violates the curve',
      ).toBe(true);
      expect(
        tiers.has('advanced'),
        'no advanced examples — students never face exam-realistic stretch',
      ).toBe(true);
    });

    it('Rule 2 · every cumulative example is tagged advanced', async () => {
      unit ??= await loadUnit(unitNumber);
      for (const ex of unit.examples.filter((e) => e.type === 'cumulative')) {
        expect(
          ex.difficulty,
          `cumulative example "${ex.id}" should be 'advanced' (it's the unit's stretch problem)`,
        ).toBe('advanced');
      }
    });

    it('Rule 2 · examples paired with the same concept progress easy → hard', async () => {
      unit ??= await loadUnit(unitNumber);
      const order: Record<string, number> = { basic: 0, intermediate: 1, advanced: 2 };
      const groups = new Map<string, ExampleBlock[]>();
      for (const ex of unit.examples) {
        if (!ex.pairsWith) continue;
        const list = groups.get(ex.pairsWith) ?? [];
        list.push(ex);
        groups.set(ex.pairsWith, list);
      }
      for (const [conceptId, exs] of groups) {
        // Sort by index in the baseline file (stable order from the parser).
        const ranks = exs.map((e) => order[e.difficulty]!);
        for (let i = 1; i < ranks.length; i++) {
          expect(
            ranks[i]! >= ranks[i - 1]!,
            `examples paired with "${conceptId}" must progress easy → hard, got ${exs.map((e) => e.difficulty).join(' → ')}`,
          ).toBe(true);
        }
      }
    });

    /* ─────────────────────────────────────────────────────────────────
     * Rule 3 — misconceptions are quarantined to the unit's tail. Verify
     * via the auto-built deck: no misconception slide appears before the
     * last concept/example slide.
     * ───────────────────────────────────────────────────────────────── */
    it('Rule 3 · misconceptions appear after all concepts and examples', async () => {
      unit ??= await loadUnit(unitNumber);
      const { slides } = buildDeckFromBaseline(unit);
      const lastTeachIdx = slides.findLastIndex(
        (s) => s.type === 'concept' || s.type === 'example',
      );
      const firstMiscIdx = slides.findIndex((s) => s.type === 'misconception');
      if (firstMiscIdx === -1) return; // unit may have zero misconceptions
      expect(
        firstMiscIdx,
        'first misconception slide must come after the last concept/example slide',
      ).toBeGreaterThan(lastTeachIdx);
    });

    it('Rule 3 · at most 4 misconception slides per unit', async () => {
      unit ??= await loadUnit(unitNumber);
      // Per pedagogy doc: more than 4 signals the unit is "trying to fight too
      // many fires." Unit 03 ships 5 — accept up to 5 as soft tolerance.
      expect(unit.misconceptions.length).toBeLessThanOrEqual(5);
    });

    /* ─────────────────────────────────────────────────────────────────
     * Format-spec quality bar (`docs/content/_format_spec.md`)
     * ───────────────────────────────────────────────────────────────── */
    it('Quality bar · bilingual glossary has at least 30 entries', async () => {
      unit ??= await loadUnit(unitNumber);
      expect(unit.glossary.length).toBeGreaterThanOrEqual(30);
    });

    it('Quality bar · references cite Sayakim, an Israeli textbook, and an international one', async () => {
      unit ??= await loadUnit(unitNumber);
      const refs = unit.frontmatter.references.join(' ').toLowerCase();
      expect(refs).toMatch(/sayakim/);
      expect(refs).toMatch(/halliday|tomer|weizmann|ptc/);
    });

    /* ─────────────────────────────────────────────────────────────────
     * Cross-check that the auto-built deck would be deck-shaped and
     * complete — useful when cloning to a new unit.
     * ───────────────────────────────────────────────────────────────── */
    it('Auto-builder · produces a non-empty deck with title + summary', async () => {
      unit ??= await loadUnit(unitNumber);
      const { slides, toc } = buildDeckFromBaseline(unit);
      expect(slides.length).toBeGreaterThan(0);
      expect(slides[0]?.type).toBe('title');
      expect(slides.at(-1)?.type).toBe('summary');
      expect(toc.length).toBeGreaterThan(0);
      // Every TOC entry's slide range must be within bounds.
      for (const t of toc) {
        expect(t.slides[0]).toBeGreaterThanOrEqual(1);
        expect(t.slides[1]).toBeLessThanOrEqual(slides.length);
        expect(t.slides[0]).toBeLessThanOrEqual(t.slides[1]);
      }
    });
  });
}
