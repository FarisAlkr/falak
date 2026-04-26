#!/usr/bin/env node
import { execSync } from 'node:child_process';
import { readFileSync } from 'node:fs';

const PATTERNS = ['REVIEW_ARABIC:', 'REVIEW_HEBREW:', 'REVIEW_PEDAGOGY:'];
const EXTENSIONS = ['.ts', '.tsx', '.mdx'];
const IGNORE_DIRS = [
  'node_modules',
  '.next',
  'out',
  '.git',
  'public',
  'coverage',
  'scripts/check-review-comments.mjs',
];

function getCurrentBranch() {
  if (process.env.GITHUB_REF_NAME) return process.env.GITHUB_REF_NAME;
  if (process.env.GITHUB_HEAD_REF) return process.env.GITHUB_HEAD_REF;
  try {
    return execSync('git branch --show-current', { encoding: 'utf8' }).trim();
  } catch {
    return '';
  }
}

function listFiles() {
  const output = execSync('git ls-files', { encoding: 'utf8' });
  return output
    .split('\n')
    .filter(Boolean)
    .filter((f) => EXTENSIONS.some((ext) => f.endsWith(ext)))
    .filter((f) => !IGNORE_DIRS.some((d) => f.startsWith(d)));
}

function findHits(files) {
  const hits = [];
  for (const file of files) {
    const content = readFileSync(file, 'utf8');
    const lines = content.split('\n');
    lines.forEach((line, i) => {
      for (const pattern of PATTERNS) {
        if (line.includes(pattern)) {
          hits.push({ file, line: i + 1, pattern, snippet: line.trim().slice(0, 100) });
        }
      }
    });
  }
  return hits;
}

const branch = getCurrentBranch();
const files = listFiles();
const hits = findHits(files);

const isUnitBranch = branch.startsWith('unit/');

if (hits.length === 0) {
  console.log(`✓ No REVIEW_* comments found (branch: ${branch || 'unknown'})`);
  process.exit(0);
}

console.log(`Found ${hits.length} REVIEW_* comment(s) on branch '${branch}':`);
for (const h of hits) {
  console.log(`  ${h.file}:${h.line}  ${h.pattern}  ${h.snippet}`);
}

if (isUnitBranch) {
  console.error(`\n✗ Unit branches must have ZERO REVIEW_* comments before merge.`);
  console.error(`  Address each comment, then commit and push.`);
  process.exit(1);
}

console.log(`\n⚠ Branch '${branch}' is not unit/* — informational only, not blocking.`);
process.exit(0);
