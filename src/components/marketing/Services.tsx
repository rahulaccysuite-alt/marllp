import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { services } from '@/data/services';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { media } from '@/lib/media';
import { ServiceCard } from './ServiceCard';

interface ServicesProps {
  showViewAll?: boolean;
}

export function Services({ showViewAll = true }: ServicesProps) {
  return (
    <section id="services" className="section-y relative overflow-x-clip bg-white">
      <div className="site-shell relative">
        <SectionHeading
          eyebrow="Services"
          title="Professional services for every stage of your business."
          description="Accounting, tax, bookkeeping, payroll, GST, compliance, and advisory — structured support from a Canadian CPA firm."
        />

        <div className="mt-8 grid gap-5 md:mt-10 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <Reveal key={service.title} delay={index * 0.07} className="h-full">
              <ServiceCard
                {...service}
                image={media.services[service.title as keyof typeof media.services]}
              />
            </Reveal>
          ))}
        </div>

        {showViewAll && (
          <Reveal delay={0.1} className="mt-10 text-center">
            <Link
              href="/services"
              className="group inline-flex min-h-11 items-center gap-2 text-[15px] font-semibold text-brand-700 transition-colors hover:text-brand-800"
            >
              View All Services
              <ArrowRight size={16} className="cta-arrow" aria-hidden="true" />
            </Link>
          </Reveal>
        )}
      </div>
    </section>
  );
}
