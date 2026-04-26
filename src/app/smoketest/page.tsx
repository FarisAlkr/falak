import HelloMdx from '@/content/_smoketest/hello.mdx';

export default function SmoketestPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <header className="mb-12 border-b border-border pb-6">
        <span dir="ltr" className="font-mono text-xs uppercase tracking-meta text-ink-muted">
          Internal · Pipeline check
        </span>
        <h1 className="mt-3 font-display text-3xl font-medium text-ink">Smoke test</h1>
      </header>
      <HelloMdx />
    </main>
  );
}
