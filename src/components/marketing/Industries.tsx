import { industries } from '@/data/industries';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { IndustryCard } from './IndustryCard';

export function Industries() {
  return (
    <section id="industries" className="section-y relative overflow-x-clip bg-surface">
      <div className="site-shell relative">
        <SectionHeading
          eyebrow="Industries"
          title="Industries we support"
          description="Professional accounting and tax advice shaped around how different businesses actually operate."
        />

        <div className="mt-8 grid gap-4 sm:grid-cols-2 md:mt-10 lg:grid-cols-4">
          {industries.map((industry, index) => (
            <Reveal key={industry.title} delay={index * 0.07} className="h-full">
              <IndustryCard {...industry} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
