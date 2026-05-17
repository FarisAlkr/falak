export type Difficulty = 'basic' | 'intermediate' | 'advanced';
export type ExampleType = 'tiny' | 'worked' | 'cumulative' | 'bagrut-style';
export type ConceptType = 'definition' | 'law' | 'derivation' | 'application';
export type Severity = 'low' | 'medium' | 'high';
export type ArabicFlag = 'verified' | 'pending' | 'sayakim';

export interface Trilingual {
  ar?: string;
  he?: string;
  en?: string;
  arFlag?: ArabicFlag;
}

export interface KeyEquation {
  id: string;
  formula: string;
  plain?: string;
}

export interface UnitFrontmatter {
  unit: {
    id: string;
    number: string;
    domain: string;
    bagrutShaalon: string;
    bagrutWeightEstimate?: number;
    hoursEstimated?: number;
  };
  titles: { ar: string; he: string; en: string };
  prerequisites: string[];
  leadsTo: string[];
  learningOutcomes: string[];
  keyEquations: KeyEquation[];
  interactiveConcept: string;
  contentStatus: {
    written?: string;
    reviewedBy?: string | null;
    arabicReviewPending?: number;
    bagrutQuestionsCount?: number;
  };
  references: string[];
}

export interface EquationBlock {
  tex: string;
}

export interface GlossaryEntry {
  ar: string;
  he: string;
  en: string;
  status?: ArabicFlag;
}

export interface ConceptBlock {
  kind: 'concept';
  id: string;
  title: string;
  difficulty: Difficulty;
  type: ConceptType;
  pairWithExample?: string;
  statement: Trilingual;
  equations: EquationBlock[];
  visualName?: string;
  visualDescription?: string;
  studentDifficulty?: string;
  glossary: GlossaryEntry[];
}

export interface ExampleBlock {
  kind: 'example';
  id: string;
  title: string;
  pairsWith?: string;
  difficulty: Difficulty;
  type: ExampleType;
  estimatedTimeSeconds?: number;
  combines?: string[];
  problem: Trilingual;
  solution?: string;
  solutionNarrativeAr?: string;
  solutionNarrativeArFlag?: ArabicFlag;
  teaches?: string;
  /** Cumulative examples have step-by-step subsections; captured as raw markdown. */
  steps?: string;
}

export interface MisconceptionBlock {
  kind: 'misconception';
  id: string;
  title: string;
  appliesTo: string[];
  severity: Severity;
  bagrutRelevant: boolean;
  wrong: Trilingual;
  right: Trilingual;
  whyStudentsFall?: string;
  diagnostic?: string;
}

export interface BagrutQuestion {
  id: string;
  year: number;
  season: string;
  shaalon: string;
  questionNumber: number;
  topicTags: string[];
  estimatedDifficulty?: Difficulty;
  notes?: string;
}

export interface UnitBaseline {
  unitNumber: string;
  filePath: string;
  frontmatter: UnitFrontmatter;
  introduction: string;
  scope: string;
  concepts: ConceptBlock[];
  examples: ExampleBlock[];
  misconceptions: MisconceptionBlock[];
  glossary: GlossaryEntry[];
  bagrutQueue: BagrutQuestion[];
  /** Total ⚑ flags counted while parsing the body. */
  flagCount: number;
}

/* ───────────────────────────────────────────────────────────────────────
 * Deck + TOC primitives — shared between hand-curated unit manifests
 * (`src/content/units/{slug}/lectureDeck.tsx`) and the auto-builder
 * (`src/lib/content/buildDeck.ts`).
 * ─────────────────────────────────────────────────────────────────────── */

export type BaselineSlideType =
  | 'title'
  | 'hook'
  | 'concept'
  | 'example'
  | 'misconception'
  | 'summary';

export interface BaselineDeckSlide {
  type: BaselineSlideType;
  /** Concept / example / misconception ID from the baseline. Unused for
   *  `title`, `hook`, `summary`. */
  id?: string;
}

export interface TocEntry {
  /** Anchor id (without `#`); matches a `<span id="section-{id}">` mounted
   *  on the section's first slide wrapper by the deck renderer. */
  id: string;
  title: { ar: string; he: string; en: string };
  /** Inclusive slide range, 1-indexed. */
  slides: [number, number];
  /** Sub-entries — typically the easy/medium/hard difficulty tiers within a
   *  law section. One level deep. */
  children?: TocEntry[];
}

/**
 * Chapter — the next layer up from TocEntry. A unit divides into a small
 * number of chapters (typically 4–6); each chapter spans a contiguous range
 * of slides and can contain multiple TocEntry sub-sections.
 *
 * Chapters drive the per-chapter routing under `/units/{id}/theory/{slug}/`
 * and the chapter-index landing page. They DO NOT replace the TOC — TOC
 * entries are slide-level structure inside the long-scroll document and
 * inside per-chapter pages; chapters are the outer organisational layer.
 */
export type ChapterKind = 'foundation' | 'core' | 'synthesis' | 'misconceptions' | 'summary';

export interface Chapter {
  /** URL slug. Stable across baseline revisions. Kebab-case. */
  id: string;
  /** Roman numeral (`I`, `II`, …) shown in chapter chrome. */
  number: string;
  /** Trilingual title — appears as the chapter heading and in nav. */
  title: { ar: string; he: string; en: string };
  /** Trilingual one-sentence summary — shown on the chapter index card
   *  and on the chapter document page below the title. Each language
   *  written natively (no machine translation). */
  description: { ar: string; he: string; en: string };
  /** Inclusive slide range, 1-indexed, matching the unit's slide manifest. */
  slides: [number, number];
  /** Rough study time, in minutes. */
  estimatedMinutes: number;
  /** TocEntry ids (from `toc.ts`) that fall within this chapter. Lets the
   *  index render a quick "what's inside this chapter" preview. */
  tocSectionIds: string[];
  /** Chapter ids the student is recommended to read first. Soft sequencing
   *  only — the route is always navigable regardless of completion state. */
  prerequisites: string[];
  /** Pedagogical role — drives small visual cues on the index card. */
  kind: ChapterKind;
}
