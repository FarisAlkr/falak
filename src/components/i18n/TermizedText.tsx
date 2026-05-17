import type { GlossaryEntry } from '@/lib/content/types';
import { Term } from './Term';

interface TermizedTextProps {
  text: string;
  glossary: GlossaryEntry[];
  /** Locale of the source text (so we know which glossary column to substring-match). */
  locale: 'ar' | 'he' | 'en';
}

/**
 * Wraps glossary terms inside a string with `<Term>` for hover-translation.
 *
 * - Substring-matches glossary entries against `text`, longest term first to
 *   avoid greedy collisions (e.g. "القوّة المحصّلة" wins over "القوّة").
 * - Returns a flat array of strings + `<Term>` JSX nodes ready to render
 *   inside any block-level container.
 *
 * Limitations (deliberate, MVP):
 *  - Naive substring match. Arabic clitics (e.g. "للقوّة") are NOT matched —
 *    only the bare form. Acceptable for v1; refine if needed.
 *  - Case-sensitive for English; Arabic and Hebrew are case-insensitive by
 *    nature of the script.
 */
export function termizeText(props: TermizedTextProps): React.ReactNode[] {
  const { text, glossary, locale } = props;
  if (!text || glossary.length === 0) return [text];

  // Sort longest first so multi-word terms get matched before their shorter parts.
  const entries = [...glossary]
    .filter((g) => g[locale] && g[locale].length > 0)
    .sort((a, b) => b[locale].length - a[locale].length);

  if (entries.length === 0) return [text];

  // Build a single regex with all source-locale terms as alternations.
  const escape = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const re = new RegExp(`(${entries.map((e) => escape(e[locale])).join('|')})`, 'g');

  const out: React.ReactNode[] = [];
  let cursor = 0;
  for (const m of text.matchAll(re)) {
    const start = m.index ?? 0;
    if (start > cursor) {
      out.push(text.slice(cursor, start));
    }
    const matched = m[0];
    const entry = entries.find((e) => e[locale] === matched);
    if (entry) {
      out.push(
        <Term key={`${start}-${matched}`} ar={entry.ar} he={entry.he} en={entry.en ?? ''} />,
      );
    } else {
      out.push(matched);
    }
    cursor = start + matched.length;
  }
  if (cursor < text.length) {
    out.push(text.slice(cursor));
  }
  return out;
}
