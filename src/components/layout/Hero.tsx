export function Hero() {
  return (
    <section className="border-b border-border py-16 md:py-24">
      <div className="space-y-6">
        <span
          dir="ltr"
          className="font-mono text-xs uppercase tracking-meta text-ink-muted"
        >
          5 יח״ל · 5 وحدات · Israeli Bagrut
        </span>

        <h1
          dir="ltr"
          className="font-display text-6xl font-medium leading-none text-ink md:text-7xl"
        >
          Falak
        </h1>

        <p
          dir="rtl"
          className="font-arabic text-2xl text-ink md:text-3xl"
        >
          فَلَك
        </p>

        <p
          dir="ltr"
          className="max-w-2xl font-body text-lg text-ink-muted leading-relaxed"
        >
          A bilingual physics teaching platform for the Israeli 5-unit Bagrut. Built for
          Arab-speaking students preparing for the Hebrew exam.
        </p>
      </div>
    </section>
  );
}
