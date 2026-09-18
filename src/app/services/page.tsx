import type { Metadata } from 'next';
import { Services } from '@/components/marketing/Services';
import { FinalCTA } from '@/components/marketing/FinalCTA';

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Accounting, tax, bookkeeping, payroll, GST, compliance, review engagements, and financial advisory services from MAR LLP.',
  alternates: { canonical: '/services' },
};

export default function ServicesPage() {
  return (
    <>
      <Services showViewAll={false} />
      <FinalCTA />
    </>
  );
}
