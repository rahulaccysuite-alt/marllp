'use client';

import { ArrowRight, BadgeCheck, CalendarDays, HeartHandshake, MapPin, Users } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import Link from 'next/link';
import { HeroContactStrip } from './HeroContactStrip';
import { HeroVisual } from './HeroVisual';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';
import { CursorGlow } from '@/components/ui/CursorGlow';
import { FinancialGrid } from '@/components/ui/FinancialGrid';
import { Glow } from '@/components/ui/Glow';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { SectionCurve } from '@/components/ui/SectionCurve';
import { durationReveal, easeOut } from '@/lib/motion';

const trustMetrics = [
  { value: 15, suffix: '+', label: 'Years of Professional Experience', icon: CalendarDays },
  { value: 2, suffix: '', label: 'CPA Partners', icon: Users },
  { display: 'Canada', label: 'Professional Accounting & Tax Services', icon: MapPin },
  { display: 'Client Focused', label: 'Practical & Personalized Advice', icon: HeartHandshake },
] as const;

function TrustMetrics() {
  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-5 border-t border-[#D9EAF7] pt-6 sm:grid-cols-4 sm:items-start sm:gap-0">
      {trustMetrics.map((item, index) => {
        const Icon = item.icon;
        return (
          <div
            key={item.label}
            className={`min-w-0 sm:px-3 xl:px-4 ${
              index > 0 ? 'sm:border-l sm:border-[#D9EAF7]' : 'sm:pl-0'
            }`}
          >
            <div className="flex min-h-[1.7rem] items-center gap-1.5">
              <Icon size={14} className="shrink-0 text-brand-600" aria-hidden="true" />
              <div className="text-[1.02rem] font-bold leading-tight tracking-tight text-brand-800 sm:text-[1.08rem]">
                {'value' in item ? (
                  <AnimatedCounter value={item.value} suffix={item.suffix} duration={1.05} />
                ) : (
                  item.display
                )}
              </div>
            </div>
            <div className="mt-1 min-h-[2.1rem] text-[12px] font-medium leading-snug text-ink-muted">
              {item.label}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function Hero() {
  const reduceMotion = useReducedMotion();

  const enter = (delay: number) => ({
    initial: reduceMotion ? false : ({ opacity: 0, y: 24 } as const),
    animate: { opacity: 1, y: 0 },
    transition: { duration: durationReveal, delay, ease: easeOut },
  });

  return (
    <section
      id="home"
      className="relative w-full overflow-x-clip bg-gradient-to-b from-[#EAF6FF] via-[#F5FAFF] to-white"
    >
      <CursorGlow />
      <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_80%_70%_at_48%_28%,black,transparent)]">
        <FinancialGrid className="opacity-40" />
      </div>
      <div
        className="ambient-drift pointer-events-none absolute inset-0 opacity-[0.16] [mask-image:radial-gradient(ellipse_70%_60%_at_20%_30%,black,transparent)]"
        style={{
          backgroundImage: 'radial-gradient(#1683E8 0.9px, transparent 0.9px)',
          backgroundSize: '18px 18px',
        }}
        aria-hidden="true"
      />
      <svg
        className="ambient-drift-alt pointer-events-none absolute left-[-40px] top-24 h-[280px] w-[420px] text-brand-300/35 sm:left-0"
        viewBox="0 0 420 280"
        fill="none"
        aria-hidden="true"
      >
        <path d="M20 210C90 170 140 90 220 80C300 70 340 130 400 90" stroke="currentColor" strokeWidth="1.2" />
        <path d="M40 240C110 200 170 130 250 122" stroke="currentColor" strokeWidth="1" />
      </svg>
      <div className="ambient-drift absolute -top-28 -left-20 h-[420px] w-[420px]" aria-hidden="true">
        <Glow className="inset-0 h-full w-full bg-white/70" />
      </div>
      <div className="ambient-drift-alt absolute top-10 right-[-140px] h-[380px] w-[380px]" aria-hidden="true">
        <Glow className="inset-0 h-full w-full bg-[#2E97EF]/12" />
      </div>

      <div className="site-shell relative flex flex-col justify-center py-12 md:py-14 lg:min-h-[calc(100svh-var(--header-height))] lg:py-12">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-10 xl:gap-14">
          <div className="min-w-0 max-w-2xl lg:max-w-none">
            <motion.div {...enter(0.1)}>
              <span className="inline-flex items-center gap-2 rounded-full border border-brand-300 bg-[#EAF6FF] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-700">
                <BadgeCheck size={14} className="shrink-0 text-brand-600" aria-hidden="true" />
                Chartered Professional Accountants
              </span>
            </motion.div>

            <motion.h1
              {...enter(0.18)}
              className="heading-display mt-6 text-pretty text-brand-800 [font-size:clamp(1.625rem,1.05rem+2.6vw,3.5rem)] leading-[1.14]"
            >
              Trusted Accounting &amp;
              <br />
              Tax Advice for
              <br />
              <span className="text-brand-600">Your Business</span>
            </motion.h1>

            <motion.div
              {...enter(0.22)}
              className="mt-5 h-[3px] w-16 rounded-full bg-brand-600"
              aria-hidden="true"
            />

            <motion.p
              {...enter(0.26)}
              className="mt-6 max-w-[560px] text-[1.05rem] leading-[1.7] text-ink-muted sm:text-lg"
            >
              MAR LLP provides professional accounting, taxation, review engagements, financial
              reporting, and business advisory services to businesses, professionals, and
              entrepreneurs across Canada.
            </motion.p>

            <motion.div
              {...enter(0.34)}
              className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4"
            >
              <MagneticButton>
                <Link
                  href="/contact"
                  className="cta-primary group inline-flex h-12 w-full items-center justify-center gap-2 rounded-[14px] bg-brand-600 px-7 text-[15px] font-semibold text-white sm:w-auto sm:px-8"
                >
                  Book a Consultation
                  <ArrowRight size={18} className="cta-arrow" aria-hidden="true" />
                </Link>
              </MagneticButton>
              <Link
                href="/#services"
                className="btn-lift inline-flex h-12 w-full items-center justify-center rounded-[14px] border border-brand-600 bg-white px-7 text-[15px] font-semibold text-brand-800 hover:bg-[#F5FAFF] sm:w-auto"
              >
                Explore Our Services
              </Link>
            </motion.div>

            <motion.div {...enter(0.42)} className="mt-10 hidden lg:block">
              <TrustMetrics />
            </motion.div>
          </div>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.25, ease: easeOut }}
          >
            <HeroVisual />
          </motion.div>

          <motion.div {...enter(0.42)} className="lg:hidden">
            <TrustMetrics />
          </motion.div>
        </div>
      </div>

      <motion.div {...enter(0.5)}>
        <HeroContactStrip />
      </motion.div>

      <SectionCurve fill="#F5FAFF" />
    </section>
  );
}
