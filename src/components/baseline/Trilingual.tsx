import type { Trilingual } from '@/lib/content/types';
import { cn } from '@/lib/utils/cn';

interface TrilingualBlockProps {
  value: Trilingual;
  /** Tone affects color treatment — neutral by default, danger for "wrong" claims. */
  tone?: 'neutral' | 'danger' | 'success';
  /** Hide the English caption (used on dense slides). */
  showEnglish?: boolean;
  /** Heading-style sizing. Defaults to body. */
  size?: 'body' | 'lead';
}

export function TrilingualBlock({
  value,
  tone = 'neutral',
  showEnglish = true,
  size = 'body',
}: TrilingualBlockProps) {
  const arClass = cn(
    'font-arabic leading-arabic',
    size === 'lead' ? 'text-2xl font-medium md:text-3xl' : 'text-base md:text-lg',
    tone === 'danger' && 'text-error',
    tone === 'success' && 'text-ink',
    tone === 'neutral' && 'text-ink',
  );
  const heClass = cn(
    'font-hebrew text-sm text-ink-muted md:text-base',
    tone === 'danger' && 'line-through opacity-70',
  );
  const enClass = cn(
    'font-body text-sm italic text-ink-muted',
    tone === 'danger' && 'line-through opacity-70',
  );
  return (
    <div className="space-y-2">
      {value.ar && (
        <p dir="rtl" className={arClass}>
          {value.ar}
        </p>
      )}
      {value.he && (
        <p dir="rtl" className={heClass}>
          {value.he}
        </p>
      )}
      {showEnglish && value.en && (
        <p dir="ltr" className={enClass}>
          {value.en}
        </p>
      )}
    </div>
  );
}
