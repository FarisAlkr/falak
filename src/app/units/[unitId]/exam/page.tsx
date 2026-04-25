import { PlaceholderPanel } from '@/components/layout/PlaceholderPanel';
import { getUnitStaticParams } from '@/lib/content/staticParams';

export const generateStaticParams = getUnitStaticParams;

export default function ExamPage() {
  return <PlaceholderPanel mode="exam" />;
}
