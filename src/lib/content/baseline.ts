import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import yaml from 'js-yaml';
import type {
  ArabicFlag,
  BagrutQuestion,
  ConceptBlock,
  ConceptType,
  Difficulty,
  EquationBlock,
  ExampleBlock,
  ExampleType,
  GlossaryEntry,
  KeyEquation,
  MisconceptionBlock,
  Severity,
  Trilingual,
  UnitBaseline,
  UnitFrontmatter,
} from './types';

const CONTENT_DIR = path.join(process.cwd(), 'docs', 'content');
const FLAG_PENDING = '⚑'; // ⚑
const FLAG_VERIFIED = '✓'; // ✓

const cacheByNumber = new Map<string, Promise<UnitBaseline>>();

export function loadUnit(unitNumber: string): Promise<UnitBaseline> {
  const padded = padNumber(unitNumber);
  let entry = cacheByNumber.get(padded);
  if (!entry) {
    entry = loadUnitImpl(padded);
    cacheByNumber.set(padded, entry);
  }
  return entry;
}

async function loadUnitImpl(unitNumber: string): Promise<UnitBaseline> {
  const filename = await findUnitFile(unitNumber);
  const filePath = path.join(CONTENT_DIR, filename);
  const raw = await fs.promises.readFile(filePath, 'utf-8');
  return parseUnit(raw, filePath, unitNumber);
}

async function findUnitFile(unitNumber: string): Promise<string> {
  const entries = await fs.promises.readdir(CONTENT_DIR);
  const match = entries.find((f) => f.startsWith(`${unitNumber}_`) && f.endsWith('.md'));
  if (!match) {
    throw new Error(`Baseline parser: no unit file found for unit ${unitNumber} in ${CONTENT_DIR}`);
  }
  return match;
}

export function parseUnit(raw: string, filePath: string, unitNumber: string): UnitBaseline {
  const parsed = matter(raw);
  const frontmatter = normalizeFrontmatter(parsed.data, filePath);
  const sections = splitH2Sections(parsed.content);

  const introduction = (sections.get('Introduction') ?? '').trim();
  const scope = (sections.get('Scope & Prerequisites') ?? '').trim();

  const conceptSection = sections.get('Concepts') ?? '';
  const cumulativeSection = sections.get('Cumulative Examples') ?? '';
  const misconceptionSection = sections.get('Misconceptions') ?? '';
  const glossarySection = sections.get('Bilingual Glossary') ?? '';
  const bagrutSection = sections.get('Past Bagrut Questions') ?? '';

  const concepts: ConceptBlock[] = [];
  const examples: ExampleBlock[] = [];

  for (const block of splitH3Blocks(conceptSection)) {
    if (block.heading.startsWith('Concept ·')) {
      concepts.push(parseConcept(block, filePath));
    } else if (block.heading.startsWith('Example ·')) {
      examples.push(parseExample(block, filePath));
    } else {
      throw new Error(
        `Baseline parser (${filePath}): unexpected H3 in Concepts section: ${block.heading}`,
      );
    }
  }

  for (const block of splitH3Blocks(cumulativeSection)) {
    if (!block.heading.startsWith('Cumulative ·') && !block.heading.startsWith('Example ·')) {
      throw new Error(
        `Baseline parser (${filePath}): unexpected H3 in Cumulative Examples section: ${block.heading}`,
      );
    }
    examples.push(parseExample(block, filePath));
  }

  const misconceptions: MisconceptionBlock[] = [];
  for (const block of splitH3Blocks(misconceptionSection)) {
    if (!block.heading.startsWith('Misconception ·')) {
      throw new Error(
        `Baseline parser (${filePath}): unexpected H3 in Misconceptions section: ${block.heading}`,
      );
    }
    misconceptions.push(parseMisconception(block, filePath));
  }

  const glossary = parseGlossaryTable(glossarySection);
  const bagrutQueue = parseBagrutQueue(bagrutSection, filePath);

  const flagCount =
    countFlags(parsed.content) +
    /* statement/problem/wrong/right blocks already inside parsed.content, so the
       single content sweep above suffices */ 0;

  return {
    unitNumber,
    filePath,
    frontmatter,
    introduction,
    scope,
    concepts,
    examples,
    misconceptions,
    glossary,
    bagrutQueue,
    flagCount,
  };
}

function padNumber(unitNumber: string): string {
  const digits = unitNumber.replace(/[^0-9]/g, '');
  if (digits.length === 0) {
    throw new Error(`Baseline parser: invalid unit number "${unitNumber}"`);
  }
  return digits.padStart(2, '0');
}

function requireField<T>(value: T | undefined | null, field: string, filePath: string): T {
  if (value === undefined || value === null) {
    throw new Error(`Baseline parser (${filePath}): missing required field "${field}"`);
  }
  return value;
}

function normalizeFrontmatter(data: Record<string, unknown>, filePath: string): UnitFrontmatter {
  const unit = requireField(data.unit as Record<string, unknown> | undefined, 'unit', filePath);
  const titles = requireField(
    data.titles as Record<string, string> | undefined,
    'titles',
    filePath,
  );
  const keyEquationsRaw = (data.key_equations ?? []) as Array<Record<string, unknown>>;
  const contentStatus = (data.content_status ?? {}) as Record<string, unknown>;

  return {
    unit: {
      id: requireField(unit.id as string | undefined, 'unit.id', filePath),
      number: String(requireField(unit.number, 'unit.number', filePath)),
      domain: requireField(unit.domain as string | undefined, 'unit.domain', filePath),
      bagrutShaalon: String(requireField(unit.bagrut_shaalon, 'unit.bagrut_shaalon', filePath)),
      bagrutWeightEstimate: unit.bagrut_weight_estimate as number | undefined,
      hoursEstimated: unit.hours_estimated as number | undefined,
    },
    titles: {
      ar: requireField(titles.ar, 'titles.ar', filePath),
      he: requireField(titles.he, 'titles.he', filePath),
      en: requireField(titles.en, 'titles.en', filePath),
    },
    prerequisites: (data.prerequisites ?? []) as string[],
    leadsTo: (data.leads_to ?? []) as string[],
    learningOutcomes: (data.learning_outcomes ?? []) as string[],
    keyEquations: keyEquationsRaw.map((eq, i): KeyEquation => {
      const id = requireField(eq.id as string | undefined, `key_equations[${i}].id`, filePath);
      const formula = requireField(
        eq.formula as string | undefined,
        `key_equations[${i}].formula`,
        filePath,
      );
      return { id, formula, plain: eq.plain as string | undefined };
    }),
    interactiveConcept: (data.interactive_concept as string | undefined) ?? '',
    contentStatus: {
      written: contentStatus.written as string | undefined,
      reviewedBy: contentStatus.reviewed_by as string | null | undefined,
      arabicReviewPending: contentStatus.arabic_review_pending as number | undefined,
      bagrutQuestionsCount: contentStatus.bagrut_questions_count as number | undefined,
    },
    references: (data.references ?? []) as string[],
  };
}

interface H3Block {
  heading: string;
  body: string;
}

function splitH2Sections(content: string): Map<string, string> {
  const sections = new Map<string, string>();
  const lines = content.split('\n');
  let currentTitle: string | null = null;
  let buffer: string[] = [];
  for (const line of lines) {
    const m = line.match(/^##\s+(.+?)\s*$/);
    if (m && !line.startsWith('### ') && !line.startsWith('####')) {
      if (currentTitle !== null) {
        sections.set(currentTitle, buffer.join('\n'));
      }
      currentTitle = (m[1] ?? '').trim();
      buffer = [];
      continue;
    }
    buffer.push(line);
  }
  if (currentTitle !== null) {
    sections.set(currentTitle, buffer.join('\n'));
  }
  return sections;
}

function splitH3Blocks(section: string): H3Block[] {
  const blocks: H3Block[] = [];
  const lines = section.split('\n');
  let currentHeading: string | null = null;
  let buffer: string[] = [];
  for (const line of lines) {
    const m = line.match(/^###\s+(.+?)\s*$/);
    if (m && !line.startsWith('####')) {
      if (currentHeading !== null) {
        blocks.push({ heading: currentHeading, body: buffer.join('\n') });
      }
      currentHeading = (m[1] ?? '').trim();
      buffer = [];
      continue;
    }
    buffer.push(line);
  }
  if (currentHeading !== null) {
    blocks.push({ heading: currentHeading, body: buffer.join('\n') });
  }
  return blocks;
}

interface H4Subsection {
  heading: string;
  body: string;
}

function splitH4Subsections(body: string): H4Subsection[] {
  const subs: H4Subsection[] = [];
  const lines = body.split('\n');
  let currentHeading: string | null = null;
  let buffer: string[] = [];
  for (const line of lines) {
    const m = line.match(/^####\s+(.+?)\s*$/);
    if (m) {
      if (currentHeading !== null) {
        subs.push({ heading: currentHeading, body: buffer.join('\n') });
      }
      currentHeading = (m[1] ?? '').trim();
      buffer = [];
      continue;
    }
    buffer.push(line);
  }
  if (currentHeading !== null) {
    subs.push({ heading: currentHeading, body: buffer.join('\n') });
  }
  return subs;
}

function findSubsection(
  subs: H4Subsection[],
  match: (h: string) => boolean,
): H4Subsection | undefined {
  return subs.find((s) => match(s.heading));
}

function extractFirstYamlFence<T>(body: string): { value: T; rest: string } | undefined {
  const match = body.match(/```yaml\s*\n([\s\S]*?)```\s*\n?/);
  if (!match) return undefined;
  const yamlText = match[1] ?? '';
  const rest = body.slice(0, match.index ?? 0) + body.slice((match.index ?? 0) + match[0].length);
  const parsed = yaml.load(yamlText) as T;
  return { value: parsed, rest };
}

function extractFirstFencedBlock(body: string, lang: string): string | undefined {
  const re = new RegExp('```' + lang + '\\s*\\n([\\s\\S]*?)```', 'm');
  const match = body.match(re);
  return match ? (match[1] ?? '').trim() : undefined;
}

function extractEquations(body: string): EquationBlock[] {
  const eqs: EquationBlock[] = [];
  const re = /\\\[([\s\S]*?)\\\]/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(body)) !== null) {
    eqs.push({ tex: cleanTex(m[1] ?? '') });
  }
  return eqs;
}

/**
 * Markdown's emphasis rules eat literal underscores inside LaTeX. The baseline
 * compensates by writing `\_` for subscripts. We unescape that for KaTeX.
 * (We deliberately do NOT try to repair `*{...}` collisions — that's a
 * baseline-source issue and surfacing it loudly is the right move.)
 */
function cleanTex(tex: string): string {
  return tex.replace(/\\_/g, '_').trim();
}

function parseTrilingualBlockquote(text: string): Trilingual {
  const lines = text.split('\n');
  const buffers: { ar: string[]; he: string[]; en: string[] } = { ar: [], he: [], en: [] };
  let current: 'ar' | 'he' | 'en' | null = null;
  for (const line of lines) {
    const m = line.match(/^>\s*\*\*(Arabic|Hebrew|English):\*\*\s*(.*)$/);
    if (m) {
      const langName = m[1] ?? '';
      const initial = m[2] ?? '';
      const lang = langName.toLowerCase().slice(0, 2) as 'ar' | 'he' | 'en';
      current = lang;
      if (initial.length > 0) buffers[lang].push(initial);
      continue;
    }
    if (current && line.trimStart().startsWith('>')) {
      const cont = line.replace(/^\s*>\s?/, '');
      buffers[current].push(cont);
      continue;
    }
    // Stop the trilingual region on the first non-blockquote line after we've
    // started capturing.
    if (current && line.trim() === '') {
      buffers[current].push('');
      continue;
    }
    if (current) break;
  }
  const arRaw = buffers.ar.length ? buffers.ar.join('\n').trim() : undefined;
  const heRaw = buffers.he.length ? buffers.he.join('\n').trim() : undefined;
  const enRaw = buffers.en.length ? buffers.en.join('\n').trim() : undefined;
  let arFlag: ArabicFlag | undefined;
  let ar = arRaw;
  if (arRaw) {
    if (arRaw.includes(FLAG_PENDING)) {
      arFlag = 'pending';
    } else if (arRaw.includes(FLAG_VERIFIED)) {
      arFlag = 'verified';
    }
    ar = stripTrailingFlag(arRaw);
  }
  return { ar, he: heRaw, en: enRaw, arFlag };
}

function stripTrailingFlag(s: string): string {
  return s
    .replace(new RegExp(`\\s*${FLAG_PENDING}\\s*$`), '')
    .replace(new RegExp(`\\s*${FLAG_VERIFIED}\\s*$`), '')
    .replace(new RegExp(`\\s*${FLAG_PENDING}\\s*\n`, 'g'), '\n')
    .replace(new RegExp(`\\s*${FLAG_VERIFIED}\\s*\n`, 'g'), '\n')
    .trim();
}

function countFlags(content: string): number {
  let count = 0;
  for (const ch of content) {
    if (ch === FLAG_PENDING) count += 1;
  }
  return count;
}

function parseConcept(block: H3Block, filePath: string): ConceptBlock {
  const fence = extractFirstYamlFence<{ concept: Record<string, unknown> }>(block.body);
  if (!fence || !fence.value || !fence.value.concept) {
    throw new Error(
      `Baseline parser (${filePath}): concept block "${block.heading}" missing YAML metadata`,
    );
  }
  const meta = fence.value.concept;
  const subs = splitH4Subsections(fence.rest);

  const statementSub = findSubsection(subs, (h) => h === 'Statement');
  if (!statementSub) {
    throw new Error(
      `Baseline parser (${filePath}): concept "${block.heading}" missing Statement subsection`,
    );
  }
  const statement = parseTrilingualBlockquote(statementSub.body);

  const equationsSub = findSubsection(
    subs,
    (h) => h === 'Equations' || h === 'Equation' || h === 'The central equation of mechanics',
  );
  const equations = equationsSub ? extractEquations(equationsSub.body) : [];

  const visualSub = findSubsection(subs, (h) => h.startsWith('Visual'));
  let visualName: string | undefined;
  let visualDescription: string | undefined;
  if (visualSub) {
    const m = visualSub.heading.match(/^Visual:\s*(.+)$/);
    visualName = m ? (m[1] ?? '').trim() : undefined;
    visualDescription = stripBlockquote(visualSub.body).trim() || undefined;
  }

  const difficultySub = findSubsection(subs, (h) => h === 'Common student difficulty');
  const studentDifficulty = difficultySub ? difficultySub.body.trim() : undefined;

  const glossarySub = findSubsection(subs, (h) => h === 'Bilingual terminology');
  const glossary = glossarySub ? parseGlossaryTable(glossarySub.body) : [];

  return {
    kind: 'concept',
    id: requireString(meta.id, 'concept.id', filePath),
    title: stripPrefix(block.heading, 'Concept · '),
    difficulty: requireEnum<Difficulty>(
      meta.difficulty,
      ['basic', 'intermediate', 'advanced'],
      'concept.difficulty',
      filePath,
    ),
    type: requireEnum<ConceptType>(
      meta.type,
      ['definition', 'law', 'derivation', 'application'],
      'concept.type',
      filePath,
    ),
    pairWithExample: meta.pair_with_example as string | undefined,
    statement,
    equations,
    visualName,
    visualDescription,
    studentDifficulty,
    glossary,
  };
}

function parseExample(block: H3Block, filePath: string): ExampleBlock {
  const fence = extractFirstYamlFence<{ example: Record<string, unknown> }>(block.body);
  if (!fence || !fence.value || !fence.value.example) {
    throw new Error(
      `Baseline parser (${filePath}): example block "${block.heading}" missing YAML metadata`,
    );
  }
  const meta = fence.value.example;
  const subs = splitH4Subsections(fence.rest);

  const problemSub = findSubsection(subs, (h) => h === 'Problem');
  if (!problemSub) {
    throw new Error(
      `Baseline parser (${filePath}): example "${block.heading}" missing Problem subsection`,
    );
  }
  const problem = parseTrilingualBlockquote(problemSub.body);

  const solutionSub = findSubsection(subs, (h) => h === 'Solution');
  const solutionFenced = solutionSub
    ? (extractFirstFencedBlock(solutionSub.body, '') ?? solutionSub.body.trim())
    : undefined;
  const solution = solutionFenced ? cleanFencedSolution(solutionFenced) : undefined;

  const narrativeSub = findSubsection(subs, (h) => h.startsWith('Solution narrative'));
  let solutionNarrativeAr: string | undefined;
  let solutionNarrativeArFlag: ArabicFlag | undefined;
  if (narrativeSub) {
    const raw = stripBlockquote(narrativeSub.body).trim();
    if (raw.includes(FLAG_PENDING)) solutionNarrativeArFlag = 'pending';
    else if (raw.includes(FLAG_VERIFIED)) solutionNarrativeArFlag = 'verified';
    solutionNarrativeAr = stripTrailingFlag(raw) || undefined;
  }

  const teachesSub = findSubsection(
    subs,
    (h) =>
      h.startsWith('What this example teaches') ||
      h.startsWith('What this cumulative example demonstrates'),
  );
  const teaches = teachesSub ? teachesSub.body.trim() : undefined;

  // Cumulative examples: capture everything after the "Setup diagram" or
  // "Step 1" sections as raw markdown so renderers can format steps.
  const stepSubs = subs.filter(
    (s) =>
      s.heading.startsWith('Step ') ||
      s.heading === 'Setup diagram' ||
      s.heading.startsWith('Step') /* tolerant */,
  );
  const steps = stepSubs.length
    ? stepSubs.map((s) => `#### ${s.heading}\n\n${s.body.trim()}`).join('\n\n')
    : undefined;

  const exampleType = (meta.type as ExampleType) ?? 'tiny';

  return {
    kind: 'example',
    id: requireString(meta.id, 'example.id', filePath),
    title: stripPrefix(stripPrefix(block.heading, 'Example · '), 'Cumulative · '),
    pairsWith: meta.pairs_with as string | undefined,
    difficulty: requireEnum<Difficulty>(
      meta.difficulty,
      ['basic', 'intermediate', 'advanced'],
      'example.difficulty',
      filePath,
    ),
    type: requireEnum<ExampleType>(
      exampleType,
      ['tiny', 'worked', 'cumulative', 'bagrut-style'],
      'example.type',
      filePath,
    ),
    estimatedTimeSeconds: meta.estimated_time_seconds as number | undefined,
    combines: (meta.combines as string[] | undefined) ?? undefined,
    problem,
    solution,
    solutionNarrativeAr,
    solutionNarrativeArFlag,
    teaches,
    steps,
  };
}

function cleanFencedSolution(s: string): string {
  // Strip leading/trailing newlines. Preserve internal layout.
  return s.replace(/^\n+/, '').replace(/\n+$/, '');
}

function parseMisconception(block: H3Block, filePath: string): MisconceptionBlock {
  const fence = extractFirstYamlFence<{ misconception: Record<string, unknown> }>(block.body);
  if (!fence || !fence.value || !fence.value.misconception) {
    throw new Error(
      `Baseline parser (${filePath}): misconception "${block.heading}" missing YAML metadata`,
    );
  }
  const meta = fence.value.misconception;
  const subs = splitH4Subsections(fence.rest);

  const wrongSub = findSubsection(subs, (h) => h.startsWith('What students say'));
  const rightSub = findSubsection(subs, (h) => h.startsWith("What's actually true"));
  if (!wrongSub || !rightSub) {
    throw new Error(
      `Baseline parser (${filePath}): misconception "${block.heading}" missing wrong/right subsection`,
    );
  }
  const wrong = parseTrilingualBlockquote(wrongSub.body);
  const right = parseTrilingualBlockquote(rightSub.body);

  const whySub = findSubsection(subs, (h) => h.startsWith('Why students fall'));
  const whyStudentsFall = whySub ? whySub.body.trim() : undefined;

  const diagnosticSub = findSubsection(subs, (h) => h.startsWith('Diagnostic question'));
  const diagnostic = diagnosticSub ? diagnosticSub.body.trim() : undefined;

  return {
    kind: 'misconception',
    id: requireString(meta.id, 'misconception.id', filePath),
    title: stripPrefix(block.heading, 'Misconception · '),
    appliesTo: (meta.applies_to as string[] | undefined) ?? [],
    severity: requireEnum<Severity>(
      meta.severity,
      ['low', 'medium', 'high'],
      'misconception.severity',
      filePath,
    ),
    bagrutRelevant: Boolean(meta.bagrut_relevant ?? false),
    wrong,
    right,
    whyStudentsFall,
    diagnostic,
  };
}

function parseGlossaryTable(section: string): GlossaryEntry[] {
  const entries: GlossaryEntry[] = [];
  const lines = section.split('\n');
  let inTable = false;
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed.startsWith('|')) {
      inTable = false;
      continue;
    }
    if (/^\|\s*[-:|\s]+\|\s*$/.test(trimmed)) {
      // Separator row. Anything from here on is a body row.
      inTable = true;
      continue;
    }
    if (!inTable) continue;
    const cells = trimmed
      .replace(/^\|/, '')
      .replace(/\|$/, '')
      .split('|')
      .map((c) => c.trim());
    if (cells.length < 3) continue;
    // Two shapes are valid:
    //  - Concept | Arabic | Hebrew | English [| Status]
    //  - Arabic | Hebrew | English [| Status]
    let ar: string;
    let he: string;
    let en: string;
    let statusCell: string | undefined;
    if (cells.length >= 4 && !looksLikeFlag(cells[3] ?? '')) {
      // Treat first column as concept label (not stored separately here)
      ar = cells[1] ?? '';
      he = cells[2] ?? '';
      en = cells[3] ?? '';
      statusCell = cells[4];
    } else {
      ar = cells[0] ?? '';
      he = cells[1] ?? '';
      en = cells[2] ?? '';
      statusCell = cells[3];
    }
    if (!ar || !he || !en) continue;
    const status = readStatus(ar, statusCell);
    entries.push({ ar: stripTrailingFlag(ar), he, en, status });
  }
  return entries;
}

function looksLikeFlag(s: string): boolean {
  if (!s) return false;
  const t = s.trim();
  return t === FLAG_PENDING || t === FLAG_VERIFIED || /Sayakim/i.test(t);
}

function readStatus(arCell: string, statusCell: string | undefined): ArabicFlag | undefined {
  if (statusCell) {
    const t = statusCell.trim();
    if (t === FLAG_PENDING) return 'pending';
    if (t === FLAG_VERIFIED) return 'verified';
    if (/Sayakim/i.test(t)) return 'sayakim';
  }
  if (arCell.includes(FLAG_PENDING)) return 'pending';
  if (arCell.includes(FLAG_VERIFIED)) return 'verified';
  return undefined;
}

function parseBagrutQueue(section: string, filePath: string): BagrutQuestion[] {
  const fence = section.match(/```yaml\s*\n([\s\S]*?)```/);
  if (!fence) return [];
  const data = yaml.load(fence[1] ?? '') as Record<string, unknown> | undefined;
  if (!data) return [];
  const list = (data.bagrut_archive_pending as Array<Record<string, unknown>> | undefined) ?? [];
  return list.map(
    (q, i): BagrutQuestion => ({
      id: requireString(q.id, `bagrut[${i}].id`, filePath),
      year: q.year as number,
      season: String(q.season ?? ''),
      shaalon: String(q.shaalon ?? ''),
      questionNumber: Number(q.question_number ?? 0),
      topicTags: (q.topic_tags as string[] | undefined) ?? [],
      estimatedDifficulty: q.estimated_difficulty as Difficulty | undefined,
      notes: q.notes as string | undefined,
    }),
  );
}

function stripBlockquote(text: string): string {
  return text
    .split('\n')
    .map((l) => l.replace(/^\s*>\s?/, ''))
    .join('\n');
}

function stripPrefix(s: string, prefix: string): string {
  return s.startsWith(prefix) ? s.slice(prefix.length) : s;
}

function requireString(value: unknown, field: string, filePath: string): string {
  if (typeof value !== 'string' || value.length === 0) {
    throw new Error(`Baseline parser (${filePath}): missing or invalid string field "${field}"`);
  }
  return value;
}

function requireEnum<T extends string>(
  value: unknown,
  allowed: readonly T[],
  field: string,
  filePath: string,
): T {
  if (typeof value !== 'string' || !allowed.includes(value as T)) {
    throw new Error(
      `Baseline parser (${filePath}): field "${field}" must be one of ${allowed.join('|')}, got ${String(value)}`,
    );
  }
  return value as T;
}

// Lookup helpers ------------------------------------------------------------

export function findConcept(unit: UnitBaseline, id: string): ConceptBlock {
  const c = unit.concepts.find((x) => x.id === id);
  if (!c) {
    throw new Error(`Baseline lookup: concept "${id}" not found in unit ${unit.unitNumber}`);
  }
  return c;
}

export function findExample(unit: UnitBaseline, id: string): ExampleBlock {
  const e = unit.examples.find((x) => x.id === id);
  if (!e) {
    throw new Error(`Baseline lookup: example "${id}" not found in unit ${unit.unitNumber}`);
  }
  return e;
}

export function findMisconception(unit: UnitBaseline, id: string): MisconceptionBlock {
  const m = unit.misconceptions.find((x) => x.id === id);
  if (!m) {
    throw new Error(`Baseline lookup: misconception "${id}" not found in unit ${unit.unitNumber}`);
  }
  return m;
}

export function findExampleByConcept(
  unit: UnitBaseline,
  conceptId: string,
): ExampleBlock | undefined {
  return unit.examples.find((x) => x.pairsWith === conceptId);
}
