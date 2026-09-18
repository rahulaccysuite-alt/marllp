import type { Metadata } from 'next';
import { BusinessGrowth } from '@/components/marketing/BusinessGrowth';
import { HowItWorks } from '@/components/marketing/HowItWorks';
import { HowWeHelp } from '@/components/marketing/HowWeHelp';
import { Stats } from '@/components/marketing/Stats';
import { Team } from '@/components/marketing/Team';

export const metadata: Metadata = {
  title: 'About',
  description:
    'MAR LLP is a Calgary CPA firm providing professional accounting, taxation, review engagements, financial reporting, and business advisory services across Canada.',
  alternates: { canonical: '/about' },
};

export default function AboutPage() {
  return (
    <>
      <Team detailed />
      <BusinessGrowth />
      <HowWeHelp />
      <HowItWorks />
      <Stats />
    </>
  );
}
