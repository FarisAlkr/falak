import { notFound } from 'next/navigation';
import { ModeTile } from '@/components/layout/ModeTile';
import { findUnit } from '@/lib/content/loadUnit';
import { getUnitStaticParams } from '@/lib/content/staticParams';
import { MODE_ORDER } from '@/types/mode';

export const generateStaticParams = getUnitStaticParams;

export interface UnitHomePageProps {
  params: { unitId: string };
}

export default function UnitHomePage({ params }: UnitHomePageProps) {
  const unit = findUnit(params.unitId);
  if (!unit) {
    notFound();
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
      {MODE_ORDER.map((mode) => (
        <ModeTile key={mode} unitId={unit.id} mode={mode} />
      ))}
    </div>
  );
}
