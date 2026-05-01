'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useState, type ReactNode } from 'react';
import { I18n } from '@/components/i18n/I18n';
import { cn } from '@/lib/utils/cn';

interface SolutionBlockProps {
  /** Raw solution body from the baseline (typically multi-line text with
   *  blank-line separators between step groups). Math symbols are rendered
   *  literally — the baseline already uses Greek letters and subscripts. */
  text: string;
  /** Locale of the solution prose; controls the data-lang on the wrapper so
   *  it disappears in non-EN modes when the prose is English-only. */
  lang?: 'ar' | 'he' | 'en';
  /** Default open state. */
  defaultOpen?: boolean;
  /** Optional additional content rendered below the steps (e.g., result box). */
  trailing?: ReactNode;
}

/**
 * Editorial worked-solution renderer.
 *
 * - Splits the solution body on blank lines into discrete *step groups*.
 * - Each group is a small card with mono typography, tabular numerals, and
 *   accent-crimson for variable identifiers (lines that are predominantly
 *   math get a slightly heavier weight).
 * - Wrapped in a subtle disclosure: the trigger pill toggles a smooth
 *   stagger reveal (Framer Motion).
 *
 * Defaults to expanded — the deck is read mostly in study mode where keeping
 * solutions visible is what students want. The teacher's presenter mode
 * (Phase C) will flip the default to collapsed.
 */
export function SolutionBlock({
  text,
  lang = 'en',
  defaultOpen = true,
  trailing,
}: SolutionBlockProps) {
  const [open, setOpen] = useState(defaultOpen);
  const groups = splitIntoGroups(text);

  return (
    <section data-lang={lang} className="space-y-2">
      <div className="flex items-baseline justify-between gap-3">
        <I18n k="solution" className="block text-[10px] uppercase tracking-meta text-ink-muted" />
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className="group inline-flex items-center gap-1.5 text-[10px] uppercase tracking-meta text-ink-muted transition-colors duration-fast ease-out hover:text-accent"
        >
          <I18n
            ar={open ? 'اخفاء' : 'اعرض الحلّ'}
            he={open ? 'הסתר' : 'הצג פתרון'}
            en={open ? 'Hide' : 'Show solution'}
            unstyled
          />
          <ChevronDown
            size={12}
            strokeWidth={1.5}
            className={cn(
              'transition-transform duration-base ease-out',
              open ? 'rotate-180' : 'rotate-0',
            )}
            aria-hidden
          />
        </button>
      </div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="solution-body"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="space-y-2">
              {groups.map((group, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.35,
                    delay: 0.06 * i,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="rounded-sm border border-border bg-paper-raised px-4 py-3"
                >
                  {group.lines.map((line, j) => (
                    <p
                      key={j}
                      dir="ltr"
                      className={cn(
                        'whitespace-pre-wrap font-mono text-sm leading-relaxed',
                        line.kind === 'math' ? 'tabular-nums text-ink' : 'italic text-ink-muted',
                      )}
                    >
                      {colorizeMathLine(line.text)}
                    </p>
                  ))}
                </motion.div>
              ))}
              {trailing}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

interface StepGroup {
  lines: Array<{ text: string; kind: 'math' | 'prose' }>;
}

function splitIntoGroups(text: string): StepGroup[] {
  const blocks = text.split(/\n\s*\n/).filter((b) => b.trim().length > 0);
  return blocks.map((b) => {
    const lines = b.split('\n').map((line) => ({
      text: line,
      kind: classifyLine(line),
    }));
    return { lines };
  });
}

const MATH_SIGNAL = /[Σμθαβπ=÷×·\^_₀-₉²³√≤≥+\-/×÷]|m\/s|m\/s²|kg|N(?=\s|$|\b)/;

function classifyLine(line: string): 'math' | 'prose' {
  const t = line.trim();
  if (!t) return 'prose';
  // A line is "math" if a) it contains an `=` sign, b) it's predominantly
  // symbolic, or c) it's an indented continuation of a math expression.
  if (t.includes('=')) return 'math';
  // Predominantly symbolic: ratio of word-characters to total is low.
  const words = t.match(/[A-Za-zا-ي֐-׿]+/g) ?? [];
  const wordChars = words.join('').length;
  if (wordChars / t.length < 0.4 && MATH_SIGNAL.test(t)) return 'math';
  return 'prose';
}

/**
 * Lightly color-code math lines so variable identifiers (single-letter or
 * Greek) read as primary, operators and numerals stay ink. Pure CSS via
 * accent class on the variable spans.
 */
function colorizeMathLine(text: string): ReactNode {
  // Conservative: highlight `Σ`, single Latin letters surrounded by non-letters
  // (so we don't tag every `m` inside "m/s²"), and Greek letters. Skip if the
  // line has no obvious match.
  const re = /([Σμθα-ω])/g;
  const out: ReactNode[] = [];
  let last = 0;
  let match: RegExpExecArray | null;
  while ((match = re.exec(text)) !== null) {
    if (match.index > last) out.push(text.slice(last, match.index));
    out.push(
      <span key={`${match.index}-${match[0]}`} className="text-accent">
        {match[0]}
      </span>,
    );
    last = match.index + match[0].length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out.length > 0 ? out : text;
}
