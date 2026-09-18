import { ArrowRight, Calculator, Landmark, Scale } from 'lucide-react';
import Link from 'next/link';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';

const areas = [
  {
    icon: Calculator,
    title: 'Accounting & Compliance',
    description: 'Reliable accounting, bookkeeping, payroll, and compliance support.',
  },
  {
    icon: Landmark,
    title: 'Tax & Planning',
    description: 'Corporate and personal tax preparation and planning.',
  },
  {
    icon: Scale,
    title: 'Business Advisory',
    description: 'Practical guidance for financial and business decisions.',
  },
] as const;

export function AdvisorySupport() {
  return (
    <section id="support" className="section-y relative overflow-x-clip bg-white">
      <div className="site-shell relative">
        <SectionHeading
          title="Find the Right Support for Your Business"
          description="Every business has different accounting, tax, and advisory needs. Let's discuss what support makes sense for you."
        />

        <div className="mx-auto mt-8 grid max-w-5xl gap-5 md:mt-10 md:grid-cols-3">
          {areas.map((area, index) => (
            <Reveal key={area.title} delay={index * 0.07} className="h-full">
              <article className="premium-card premium-card-industry group flex h-full flex-col rounded-2xl border border-[#D9EAF7] bg-white p-6 shadow-[0_10px_24px_-18px_rgb(11_46_89_/_0.1)]">
                <span className="card-icon inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600 ring-1 ring-[#D9EAF7]">
                  <area.icon size={20} strokeWidth={1.75} aria-hidden="true" />
                </span>
                <h3 className="mt-5 text-lg font-bold tracking-tight text-ink">{area.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">{area.description}</p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.14} className="mt-8 text-center">
          <MagneticButton>
            <Link
              href="/contact"
              className="cta-primary group inline-flex min-h-12 items-center gap-2 rounded-[14px] bg-brand-600 px-7 py-3.5 text-[15px] font-semibold text-white"
            >
              Talk to a Professional
              <ArrowRight size={17} className="cta-arrow" aria-hidden="true" />
            </Link>
          </MagneticButton>
        </Reveal>
      </div>
    </section>
  );
}
