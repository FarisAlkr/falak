import { describe, expect, it } from 'vitest';
import {
  findConcept,
  findExample,
  findExampleByConcept,
  findMisconception,
  loadUnit,
  parseUnit,
} from './baseline';
import type { UnitBaseline } from './types';

let unit03Cache: UnitBaseline | undefined;

async function getUnit03(): Promise<UnitBaseline> {
  if (!unit03Cache) {
    unit03Cache = await loadUnit('03');
  }
  return unit03Cache;
}

describe("loadUnit · Unit 03 (Newton's Laws)", () => {
  it('loads the file and parses frontmatter', async () => {
    const u = await getUnit03();
    expect(u.unitNumber).toBe('03');
    expect(u.frontmatter.unit.id).toBe('newtons-laws');
    expect(u.frontmatter.unit.number).toBe('03');
    expect(u.frontmatter.unit.bagrutShaalon).toBe('037381');
    expect(u.frontmatter.unit.hoursEstimated).toBe(18);
  });

  it('extracts trilingual unit titles', async () => {
    const u = await getUnit03();
    expect(u.frontmatter.titles.ar).toBe('قوانين نيوتن والديناميكا');
    expect(u.frontmatter.titles.he).toBe('חוקי ניוטון ודינמיקה');
    expect(u.frontmatter.titles.en).toBe("Newton's Laws & Dynamics");
  });

  it('parses key_equations with formula and plain', async () => {
    const u = await getUnit03();
    expect(u.frontmatter.keyEquations.length).toBeGreaterThan(0);
    const second = u.frontmatter.keyEquations.find((e) => e.id === 'newton-second-vector');
    expect(second).toBeDefined();
    expect(second?.formula).toContain('m\\vec{a}');
    expect(second?.plain).toBeTruthy();
  });

  it('finds 10 concept blocks with stable IDs', async () => {
    const u = await getUnit03();
    expect(u.concepts.length).toBe(10);
    const ids = u.concepts.map((c) => c.id);
    expect(ids).toContain('force-as-vector');
    expect(ids).toContain('net-force-sigma');
    expect(ids).toContain('newton-first-law');
    expect(ids).toContain('newton-second-vector');
    expect(ids).toContain('newton-second-per-axis');
    expect(ids).toContain('newton-third-law');
    expect(ids).toContain('weight');
    expect(ids).toContain('normal-force');
    expect(ids).toContain('tension');
    expect(ids).toContain('friction');
  });

  it('finds 11 example blocks (10 paired + 1 cumulative)', async () => {
    const u = await getUnit03();
    expect(u.examples.length).toBe(11);
    expect(u.examples.filter((e) => e.type === 'cumulative').length).toBe(1);
    expect(u.examples.filter((e) => e.type === 'tiny').length).toBe(10);
  });

  it('finds 5 misconception blocks', async () => {
    const u = await getUnit03();
    expect(u.misconceptions.length).toBe(5);
    expect(u.misconceptions.map((m) => m.id)).toContain('misc-moving-needs-force');
    expect(u.misconceptions.map((m) => m.id)).toContain('misc-action-reaction-cancel');
    expect(u.misconceptions.map((m) => m.id)).toContain('misc-N-equals-mg');
  });

  it('extracts trilingual statements with Arabic flag detection', async () => {
    const u = await getUnit03();
    const c = findConcept(u, 'force-as-vector');
    expect(c.statement.ar).toBeTruthy();
    expect(c.statement.he).toBeTruthy();
    expect(c.statement.en).toBeTruthy();
    expect(c.statement.arFlag).toBe('verified');
    // Inline flag character should be stripped from the rendered Arabic.
    expect(c.statement.ar).not.toContain('✓');
    expect(c.statement.ar).not.toContain('⚑');
  });

  it('detects ⚑ pending flag on the book-on-table example', async () => {
    const u = await getUnit03();
    const ex = findExample(u, 'ex-book-on-table');
    expect(ex.problem.arFlag).toBe('pending');
  });

  it('pairs concepts with their examples via pair_with_example / pairs_with', async () => {
    const u = await getUnit03();
    const c = findConcept(u, 'newton-second-vector');
    expect(c.pairWithExample).toBe('ex-block-pushed');
    const ex = findExampleByConcept(u, 'newton-second-vector');
    expect(ex?.id).toBe('ex-block-pushed');
  });

  it('extracts \\[ ... \\] equations from concept bodies', async () => {
    const u = await getUnit03();
    const second = findConcept(u, 'newton-second-vector');
    expect(second.equations.length).toBeGreaterThan(0);
    expect(second.equations[0]?.tex).toMatch(/\\Sigma\\vec\{F\}/);
  });

  it('parses the bilingual glossary (≥30 rows)', async () => {
    const u = await getUnit03();
    expect(u.glossary.length).toBeGreaterThanOrEqual(30);
    const force = u.glossary.find((g) => g.en === 'force');
    expect(force?.ar).toBe('القوّة');
    expect(force?.he).toBe('כוח');
    expect(force?.status).toBe('verified');
  });

  it('parses the past Bagrut placeholder queue', async () => {
    const u = await getUnit03();
    expect(u.bagrutQueue.length).toBeGreaterThanOrEqual(5);
    const first = u.bagrutQueue[0];
    expect(first?.id).toMatch(/^bagrut-/);
    expect(first?.year).toBeGreaterThan(2020);
    expect(first?.shaalon).toBe('037381');
  });

  it('counts ⚑ flags in the body', async () => {
    const u = await getUnit03();
    expect(u.flagCount).toBeGreaterThan(0);
  });

  it('parses misconception wrong/right pair', async () => {
    const u = await getUnit03();
    const m = findMisconception(u, 'misc-moving-needs-force');
    expect(m.wrong.ar).toBeTruthy();
    expect(m.wrong.en).toBeTruthy();
    expect(m.right.ar).toBeTruthy();
    expect(m.right.en).toBeTruthy();
    expect(m.severity).toBe('high');
    expect(m.bagrutRelevant).toBe(true);
  });
});

describe('parseUnit · error handling', () => {
  it('throws when frontmatter is missing required fields', () => {
    const malformed = `---
unit:
  number: '03'
---

# Unit 03

## Concepts
`;
    expect(() => parseUnit(malformed, '/test/malformed.md', '03')).toThrow(
      /missing required field/i,
    );
  });

  it('throws when a concept block has no YAML metadata fence', () => {
    const malformed = `---
unit:
  id: x
  number: 1
  domain: mechanics
  bagrut_shaalon: '037381'
titles:
  ar: x
  he: x
  en: x
---

## Concepts

### Concept · Without metadata

#### Statement

> **Arabic:** ...
> **Hebrew:** ...
> **English:** ...
`;
    expect(() => parseUnit(malformed, '/test/no-yaml.md', '01')).toThrow(/missing YAML metadata/i);
  });
});

describe('Pedagogy invariant · every concept has a paired example', () => {
  it('Unit 03: every concept references a real example via pair_with_example', async () => {
    const u = await getUnit03();
    for (const c of u.concepts) {
      if (!c.pairWithExample) continue;
      expect(
        u.examples.some((e) => e.id === c.pairWithExample),
        `concept "${c.id}" pairs with missing example "${c.pairWithExample}"`,
      ).toBe(true);
    }
  });
});
