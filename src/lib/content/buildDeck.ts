import type { Difficulty, ExampleBlock, UnitBaseline } from './types';

/**
 * Generic deck/TOC builder.
 *
 * Given a parsed `UnitBaseline`, produces a `DeckSlide[]` manifest and a
 * `TocEntry[]` table of contents that obey the three pedagogy rules:
 *
 *   Rule 1 — every concept is followed by its paired example(s).
 *   Rule 2 — examples within each concept group are ordered easy → mid → hard.
 *   Rule 3 — misconceptions sit in a contiguous block at the tail, never
 *            interleaved with concept teaching.
 *
 * The output is a "default deck" — sensible for any unit. A unit that wants
 * a hand-curated structure (like Unit 03's "four mechanical forces" grouping)
 * can author its own manifest and pass it through render directly; the
 * generic path is the cheap one for cloning new units.
 */

export interface BuildDeckSlide {
  type: 'title' | 'hook' | 'concept' | 'example' | 'misconception' | 'summary';
  id?: string;
}

export interface BuildTocEntry {
  id: string;
  title: { ar: string; he: string; en: string };
  slides: [number, number];
  children?: BuildTocEntry[];
}

export interface BuiltDeck {
  slides: BuildDeckSlide[];
  toc: BuildTocEntry[];
}

const DIFFICULTY_ORDER: Record<Difficulty, number> = {
  basic: 0,
  intermediate: 1,
  advanced: 2,
};

export function buildDeckFromBaseline(unit: UnitBaseline): BuiltDeck {
  const slides: BuildDeckSlide[] = [];
  const toc: BuildTocEntry[] = [];

  // Opening
  const openingStart = slides.length + 1;
  slides.push({ type: 'title' });
  // Only emit a hook slide if the introduction is non-empty.
  if (unit.introduction.trim().length > 0) {
    slides.push({ type: 'hook' });
  }
  toc.push({
    id: 'opening',
    title: { ar: 'الافتتاح', he: 'פתיחה', en: 'Opening' },
    slides: [openingStart, slides.length],
  });

  // Concept-driven core sections.
  // Each concept becomes a section; its paired examples (sorted by difficulty)
  // follow it in order. Cumulative examples are deferred to the tail.
  const cumulativeExamples = unit.examples.filter((e) => e.type === 'cumulative');
  const tieredExamples = unit.examples.filter((e) => e.type !== 'cumulative');

  for (const concept of unit.concepts) {
    const sectionStart = slides.length + 1;
    slides.push({ type: 'concept', id: concept.id });

    const paired = tieredExamples
      .filter((e) => e.pairsWith === concept.id)
      .sort(
        (a, b) =>
          DIFFICULTY_ORDER[a.difficulty] - DIFFICULTY_ORDER[b.difficulty] ||
          (a.estimatedTimeSeconds ?? 0) - (b.estimatedTimeSeconds ?? 0),
      );

    for (const ex of paired) {
      slides.push({ type: 'example', id: ex.id });
    }

    toc.push({
      id: `concept-${concept.id}`,
      title: deriveSectionTitle(concept.title, concept.statement),
      slides: [sectionStart, slides.length],
      children: difficultyChildren(paired, sectionStart + 1),
    });
  }

  // Cumulative tier
  if (cumulativeExamples.length > 0) {
    const cumStart = slides.length + 1;
    for (const ex of cumulativeExamples) {
      slides.push({ type: 'example', id: ex.id });
    }
    toc.push({
      id: 'cumulative',
      title: {
        ar: 'مثال تراكميّ',
        he: 'דוגמה מצטברת',
        en: 'Cumulative example',
      },
      slides: [cumStart, slides.length],
    });
  }

  // Misconception quarantine — Rule 3
  if (unit.misconceptions.length > 0) {
    const miscStart = slides.length + 1;
    const sortedMisc = [...unit.misconceptions].sort(
      (a, b) => severityRank(b.severity) - severityRank(a.severity),
    );
    for (const m of sortedMisc) {
      slides.push({ type: 'misconception', id: m.id });
    }
    toc.push({
      id: 'misconceptions',
      title: {
        ar: 'الأخطاء الشائعة',
        he: 'טעויות נפוצות',
        en: 'Common misconceptions',
      },
      slides: [miscStart, slides.length],
    });
  }

  // Summary
  const summaryStart = slides.length + 1;
  slides.push({ type: 'summary' });
  toc.push({
    id: 'summary',
    title: { ar: 'الخلاصة', he: 'סיכום', en: 'Summary' },
    slides: [summaryStart, slides.length],
  });

  return { slides, toc };
}

function severityRank(s: 'low' | 'medium' | 'high'): number {
  return s === 'high' ? 2 : s === 'medium' ? 1 : 0;
}

function deriveSectionTitle(
  conceptTitle: string,
  statement: { ar?: string; he?: string; en?: string },
): { ar: string; he: string; en: string } {
  // Use the concept's English title (from the H3 heading) for EN; pull a
  // short AR/HE label from the trilingual statement when available, else
  // fall back to the English title.
  return {
    ar: shortLabel(statement.ar) ?? conceptTitle,
    he: shortLabel(statement.he) ?? conceptTitle,
    en: conceptTitle,
  };
}

function shortLabel(s: string | undefined): string | undefined {
  if (!s) return undefined;
  // Take the first sentence-ish chunk, capped at ~40 chars.
  const first = s.split(/[.،؟!]/)[0]?.trim() ?? s;
  if (first.length <= 40) return first;
  return first.slice(0, 38).trim() + '…';
}

function difficultyChildren(
  paired: ExampleBlock[],
  startSlide: number,
): BuildTocEntry[] | undefined {
  if (paired.length < 2) return undefined;
  return paired.map((ex, i) => ({
    id: `ex-${ex.id}`,
    title: difficultyLabel(ex.difficulty, i),
    slides: [startSlide + i, startSlide + i],
  }));
}

function difficultyLabel(d: Difficulty, i: number): { ar: string; he: string; en: string } {
  if (d === 'basic') {
    return { ar: 'مثال أساسيّ', he: 'דוגמה בסיסית', en: `Easy · ${i + 1}` };
  }
  if (d === 'intermediate') {
    return { ar: 'مثال متوسّط', he: 'דוגמה בינונית', en: `Medium · ${i + 1}` };
  }
  return { ar: 'مثال متقدّم', he: 'דוגמה מתקדמת', en: `Hard · ${i + 1}` };
}
