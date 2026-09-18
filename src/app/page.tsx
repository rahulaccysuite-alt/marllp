import type { Metadata } from 'next';
import { AdvisorySupport } from '@/components/marketing/AdvisorySupport';
import { BusinessGrowth } from '@/components/marketing/BusinessGrowth';
import { ComplianceSupport } from '@/components/marketing/ComplianceSupport';
import { FAQ } from '@/components/marketing/FAQ';
import { FinalCTA } from '@/components/marketing/FinalCTA';
import { Hero } from '@/components/marketing/Hero';
import { HowItWorks } from '@/components/marketing/HowItWorks';
import { Industries } from '@/components/marketing/Industries';
import { Resources } from '@/components/marketing/Resources';
import { Services } from '@/components/marketing/Services';
import { Team } from '@/components/marketing/Team';
import { TrustedBy } from '@/components/marketing/TrustedBy';

export const metadata: Metadata = {
  alternates: { canonical: '/' },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustedBy />
      <Services />
      <Industries />
      <BusinessGrowth />
      <HowItWorks />
      <ComplianceSupport />
      <Team />
      <Resources />
      <AdvisorySupport />
      <FAQ />
      <FinalCTA />
    </>
  );
}
