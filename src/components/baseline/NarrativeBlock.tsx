'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { I18n } from '@/components/i18n/I18n';
import { LOCALE_DIR } from '@/lib/i18n/constants';
import { cn } from '@/lib/utils/cn';
import type { Locale } from '@/types/progress';

interface NarrativeBlockProps {
  text: string;
  lang: Locale;
  defaultOpen?: boolean;
}

const FONT: Record<Locale, string> = {
  ar: 'font-arabic leading-arabic',
  he: 'font-hebrew',
  en: 'font-body',
};

/**
 * Editorial narrative block — the prose explanation of an example solution
 * in a single locale (Arabic narrative for now; Hebrew/English variants will
 * follow once the baseline carries them). Same disclosure UX as
 * SolutionBlock: trigger pill toggles a smooth height/fade reveal.
 */
export function NarrativeBlock({ text, lang, defaultOpen = true }: NarrativeBlockProps) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <section data-lang={lang} className="space-y-2">
      <div className="flex items-baseline justify-between gap-3">
        <I18n k="narrative" className="block text-[10px] uppercase tracking-meta text-ink-muted" />
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className="group inline-flex items-center gap-1.5 text-[10px] uppercase tracking-meta text-ink-muted transition-colors duration-fast ease-out hover:text-accent"
        >
          <I18n
            ar={open ? 'اخفاء' : 'اعرض الشرح'}
            he={open ? 'הסתר' : 'הצג הסבר'}
            en={open ? 'Hide' : 'Show narrative'}
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
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p
              dir={LOCALE_DIR[lang]}
              className={cn(
                FONT[lang],
                'bg-accent-tint/20 rounded-sm border-s-2 border-accent px-4 py-3 text-base text-ink md:text-lg',
              )}
            >
              {text}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
