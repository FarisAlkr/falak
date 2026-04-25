import { PlaceholderPanel } from '@/components/layout/PlaceholderPanel';
import { getUnitStaticParams } from '@/lib/content/staticParams';

export const generateStaticParams = getUnitStaticParams;

export default function SummaryPage() {
  return <PlaceholderPanel mode="summary" />;
}
