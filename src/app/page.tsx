import { Hero } from '@/components/layout/Hero';
import { UnitsGrid } from '@/components/layout/UnitsGrid';
import { UNIT_LISTING } from '@/lib/content/unitRegistry';

export default function HomePage() {
  return (
    <main className="mx-auto max-w-6xl px-6 pb-24">
      <Hero />
      <section className="pt-16">
        <UnitsGrid units={UNIT_LISTING} />
      </section>
    </main>
  );
}
