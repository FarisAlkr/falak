import { notFound } from 'next/navigation';
import type { ReactNode } from 'react';
import { UnitHeader } from '@/components/layout/UnitHeader';
import { UnitModeNav } from '@/components/layout/UnitModeNav';
import { findUnit } from '@/lib/content/loadUnit';
import { getUnitStaticParams } from '@/lib/content/staticParams';

export const generateStaticParams = getUnitStaticParams;

export interface UnitLayoutProps {
  children: ReactNode;
  params: { unitId: string };
}

export default function UnitLayout({ children, params }: UnitLayoutProps) {
  const unit = findUnit(params.unitId);
  if (!unit) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-7xl px-6 py-12">
      <UnitHeader unit={unit} />
      <div className="mt-8">
        <UnitModeNav unitId={unit.id} />
      </div>
      {/* No max-width on the children container — spreads control their
          own width per variant (hero ≈ 700px, plate ≈ 1100px). */}
      <div className="mt-10">{children}</div>
    </main>
  );
}
