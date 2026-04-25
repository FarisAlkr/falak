import { MODE_LABELS, type UnitMode } from '@/types/mode';

export interface PlaceholderPanelProps {
  mode: UnitMode;
}

export function PlaceholderPanel({ mode }: PlaceholderPanelProps) {
  const label = MODE_LABELS[mode];

  return (
    <section className="border border-border bg-paper-raised p-12 text-center md:p-20">
      <span
        dir="ltr"
        className="font-mono text-xs uppercase tracking-meta text-ink-muted"
      >
        {label.en}
      </span>
      <p
        dir="rtl"
        className="mt-6 font-arabic text-3xl font-semibold text-ink md:text-4xl"
      >
        قريباً
      </p>
      <p
        dir="rtl"
        className="mt-3 font-hebrew text-sm text-ink-muted"
      >
        בקרוב
      </p>
      <p
        dir="ltr"
        className="mt-3 font-body text-sm italic text-ink-faint"
      >
        Coming soon
      </p>
    </section>
  );
}
