import type { Metadata } from 'next';
import { FinalCTA } from '@/components/marketing/FinalCTA';
import { ResourcesPage } from '@/components/marketing/ResourcesPage';

export const metadata: Metadata = {
  title: 'Insights',
  description:
    'Practical insights on accounting, taxation, GST, compliance, and financial management from MAR LLP.',
  alternates: { canonical: '/resources' },
};

export default function ResourcesRoutePage() {
  return (
    <>
      <ResourcesPage />
      <FinalCTA />
    </>
  );
}
