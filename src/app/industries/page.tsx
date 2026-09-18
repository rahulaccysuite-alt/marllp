import type { Metadata } from 'next';
import { Industries } from '@/components/marketing/Industries';
import { FinalCTA } from '@/components/marketing/FinalCTA';

export const metadata: Metadata = {
  title: 'Industries',
  description:
    'Accounting and tax support for startups, technology, e-commerce, professional services, healthcare, real estate, manufacturing, and retail.',
  alternates: { canonical: '/industries' },
};

export default function IndustriesPage() {
  return (
    <>
      <Industries />
      <FinalCTA />
    </>
  );
}
