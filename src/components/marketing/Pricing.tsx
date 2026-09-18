import { Check } from 'lucide-react';
import Link from 'next/link';
import { plans } from '@/data/pricing';
import { Glow } from '@/components/ui/Glow';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { TiltCard } from '@/components/ui/TiltCard';
import { cn } from '@/lib/utils';

export function Pricing() {
  return (
    <section id="pricing" className="section-y relative overflow-x-clip bg-white">
      <Glow className="right-[-140px] top-1/4 h-[380px] w-[380px] bg-brand-100/70" />

      <div className="site-shell relative">
        <SectionHeading
          eyebrow="Pricing plans"
          title="Plans built around your business."
          description="Choose the level of financial support your business needs. We recommend a fit after understanding your books, compliance and goals — no one-size-fits-all fees."
        />

        <div className="mx-auto mt-16 grid max-w-6xl items-stretch gap-7 md:mt-20 lg:grid-cols-3 lg:items-center lg:gap-6">
          {plans.map((plan, index) => (
            <Reveal key={plan.name} delay={index * 0.1} className={cn(plan.featured && 'lg:z-10')}>
              <TiltCard className={cn('h-full', plan.featured && 'lg:scale-[1.05]')} glow={plan.featured}>
                <div
                  className={cn(
                    'relative flex h-full flex-col rounded-[28px] p-6 sm:p-7',
                    plan.featured
                      ? 'border-2 border-brand-400/70 bg-gradient-to-b from-brand-600 to-brand-800 text-white shadow-[0_40px_80px_-24px_rgb(11_46_89_/_0.6)] lg:p-9'
                      : 'border border-gray-100 bg-white shadow-[0_18px_40px_-16px_rgb(17_24_39_/_0.12)]',
                  )}
                >
                  {plan.featured && (
                    <span className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]" aria-hidden="true">
                      <span className="absolute inset-y-0 w-1/2 animate-featured-shimmer bg-gradient-to-r from-transparent via-white/16 to-transparent" />
                    </span>
                  )}
                  {plan.badge && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-white px-3.5 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-brand-800 shadow-lg ring-2 ring-white">
                      {plan.badge}
                    </span>
                  )}

                  <div className={cn('text-xs font-bold uppercase tracking-[0.2em]', plan.featured ? 'text-white' : 'text-brand-600')}>
                    {plan.name}
                  </div>
                  <div className={cn('mt-2 text-sm leading-relaxed', plan.featured ? 'text-white/80' : 'text-ink-muted')}>
                    {plan.audience}
                  </div>

                  <div className="mt-6">
                    <span className={cn('text-3xl font-bold tracking-tight', plan.featured ? 'text-white' : 'text-ink')}>
                      {plan.price}
                    </span>
                  </div>

                  <ul className="mb-8 mt-6 space-y-3">
                    {plan.features.map((feature) => (
                      <li
                        key={feature}
                        className={cn('flex items-center gap-3 text-sm', plan.featured ? 'text-white' : 'text-ink-muted')}
                      >
                        <span
                          className={cn(
                            'flex h-5 w-5 shrink-0 items-center justify-center rounded-full',
                            plan.featured ? 'bg-white/20 text-emerald-300' : 'bg-brand-50 text-brand-600',
                          )}
                        >
                          <Check
                            size={12}
                            strokeWidth={3}
                            className={plan.featured ? 'text-emerald-300' : undefined}
                            aria-hidden="true"
                          />
                        </span>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <MagneticButton className="mt-auto w-full">
                    <Link
                      href="/contact"
                      className={cn(
                        'inline-flex min-h-12 w-full items-center justify-center rounded-full px-6 py-3.5 font-semibold transition-all duration-300',
                        plan.featured
                          ? 'bg-white text-brand-800 shadow-[0_10px_28px_-8px_rgb(12_8_31_/_0.45)] ring-2 ring-white hover:bg-slate-50'
                          : 'border border-brand-200 text-brand-700 hover:border-brand-400 hover:bg-brand-50',
                      )}
                    >
                      {plan.cta}
                    </Link>
                  </MagneticButton>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
