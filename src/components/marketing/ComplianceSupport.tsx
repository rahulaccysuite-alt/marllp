import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { taxServices } from '@/data/taxServices';
import { Glow } from '@/components/ui/Glow';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';

export function ComplianceSupport() {
  return (
    <section id="tax-services" className="section-y-compact relative w-full overflow-x-clip bg-surface">
      <Glow className="right-[-120px] top-1/4 h-[240px] w-[240px] bg-brand-100/55" />

      <div className="site-shell relative">
        <SectionHeading
          eyebrow="Tax services"
          title="Canadian Tax Support, Handled With Care."
          description="GST, payroll, T1 / T2 / T3 returns, and corporate tax planning — structured support for individuals, corporations, and growing businesses."
        />

        <div className="mt-8 grid gap-4 sm:grid-cols-2 md:mt-10 lg:grid-cols-3">
          {taxServices.map((item, index) => (
            <Reveal key={item.title} delay={index * 0.07} className="h-full">
              <article className="premium-card premium-card-tax group flex h-full flex-col rounded-2xl border border-[#D9EAF7] bg-white p-4 shadow-[0_10px_24px_-18px_rgb(11_46_89_/_0.1)] sm:p-5">
                <span className="card-icon inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[#D9EAF7] bg-brand-50 text-brand-600">
                  <item.icon size={18} strokeWidth={1.75} aria-hidden="true" />
                </span>
                <h3 className="mt-3 text-base font-bold text-ink">{item.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">{item.description}</p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.15} className="mt-8 text-center">
          <MagneticButton>
            <Link
              href="/contact"
              className="cta-primary group inline-flex min-h-12 items-center gap-2 rounded-[14px] bg-brand-600 px-7 py-3.5 text-[15px] font-semibold text-white"
            >
              Book a Consultation
              <ArrowRight size={17} className="cta-arrow" aria-hidden="true" />
            </Link>
          </MagneticButton>
        </Reveal>
      </div>
    </section>
  );
}
