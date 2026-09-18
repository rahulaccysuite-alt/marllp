'use client';

import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { FinancialGrid } from '@/components/ui/FinancialGrid';
import { Glow } from '@/components/ui/Glow';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { Reveal } from '@/components/ui/Reveal';
import { SectionCurve } from '@/components/ui/SectionCurve';

export function FinalCTA() {
  return (
    <section className="relative w-full overflow-x-clip bg-gradient-to-br from-brand-700 via-brand-600 to-[#2E97EF] pt-16 pb-12 text-white md:pt-20 md:pb-14">
      <SectionCurve fill="#ffffff" flip className="absolute inset-x-0 top-0" />
      <FinancialGrid
        variant="dark"
        className="opacity-25 [mask-image:radial-gradient(ellipse_65%_60%_at_50%_45%,black,transparent)]"
      />
      <Glow className="glow-drift -top-24 right-1/4 h-[280px] w-[280px] bg-white/15" />
      <Glow className="ambient-drift-alt -bottom-24 left-1/4 h-[240px] w-[240px] bg-white/10" />
      <div
        className="glow-drift pointer-events-none absolute left-1/2 top-1/2 h-[320px] w-[320px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/10 blur-[90px]"
        aria-hidden="true"
      />

      <div className="site-shell relative z-10">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <h2 className="heading-display text-pretty text-[1.7rem] leading-[1.2] sm:text-[2rem] md:text-[2.25rem]">
              Ready to Take Control of Your Finances?
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mx-auto mt-4 max-w-[36rem] text-[1.02rem] leading-[1.7] text-white/75 sm:text-lg">
              Let&apos;s simplify your accounting, strengthen your compliance, and give your business
              the clarity it needs to grow.
            </p>
          </Reveal>

          <Reveal delay={0.18}>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
              <MagneticButton strength={8}>
                <Link
                  href="/contact"
                  className="btn-lift group inline-flex h-12 w-full items-center justify-center gap-2 rounded-[14px] bg-white px-7 font-semibold text-brand-800 shadow-[0_12px_36px_-8px_rgb(0_0_0_/_0.28)] hover:bg-brand-50 hover:shadow-[0_16px_40px_-8px_rgb(0_0_0_/_0.32)] sm:w-auto sm:px-8"
                >
                  Book a Consultation
                  <ArrowRight size={18} className="cta-arrow" aria-hidden="true" />
                </Link>
              </MagneticButton>
              <Link
                href="/contact"
                className="btn-lift inline-flex h-12 w-full items-center justify-center rounded-[14px] border border-white/30 bg-white/5 px-7 font-semibold text-white backdrop-blur-sm hover:border-white/50 hover:bg-white/10 sm:w-auto sm:px-8"
              >
                Contact MAR LLP
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
