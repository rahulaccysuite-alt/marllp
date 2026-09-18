import type { Metadata } from 'next';
import { AdvisorySupport } from '@/components/marketing/AdvisorySupport';
import { FAQ } from '@/components/marketing/FAQ';

export const metadata: Metadata = {
  title: 'Support',
  description:
    'Discuss accounting, tax, and advisory support with MAR LLP. Every business has different needs — we help you find the right fit.',
  alternates: { canonical: '/pricing' },
};

export default function PricingPage() {
  return (
    <>
      <AdvisorySupport />
      <FAQ />
    </>
  );
}
