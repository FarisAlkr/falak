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
