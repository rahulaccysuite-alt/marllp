'use client';

import { FolderKanban, Link2, Search, TrendingUp } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { Glow } from '@/components/ui/Glow';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { easeOut, staggerCard } from '@/lib/motion';

const steps = [
  {
    number: '01',
    title: 'Connect',
    icon: Link2,
    description: 'Tell us about your business, financial needs, and goals.',
  },
  {
    number: '02',
    title: 'Organize',
    icon: FolderKanban,
    description: 'We review your accounting, tax, and financial requirements.',
  },
  {
    number: '03',
    title: 'Optimize',
    icon: Search,
    description: 'We identify opportunities to improve compliance, efficiency, and financial clarity.',
  },
  {
    number: '04',
    title: 'Grow',
    icon: TrendingUp,
    description: 'We provide ongoing professional guidance to support your long-term success.',
  },
];

export function HowItWorks() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="process" className="section-y-compact relative overflow-x-clip bg-white">
      <Glow className="ambient-drift left-1/2 top-8 h-[180px] w-[180px] -translate-x-1/2 bg-brand-100/60" />

      <div className="site-shell">
        <SectionHeading
          eyebrow="How it works"
          title="How It Works"
          description="A simple, structured path from financial uncertainty to clearer decisions."
        />

        <div className="relative mt-8 md:mt-10">
          <div
            className="absolute left-[12.5%] right-[12.5%] top-[28px] hidden h-[2px] lg:block"
            aria-hidden="true"
          >
            <div className="h-full overflow-hidden rounded-full bg-[#D9EAF7]">
              <motion.div
                className="h-full origin-left rounded-full bg-gradient-to-r from-brand-300 via-brand-600 to-brand-400"
                initial={reduceMotion ? { scaleX: 1 } : { scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.8, delay: 0.12, ease: easeOut }}
              />
            </div>
          </div>

          <div
            className="absolute bottom-3 left-6 top-3 w-px overflow-hidden bg-[#D9EAF7] sm:hidden"
            aria-hidden="true"
          >
            <motion.div
              className="h-full origin-top bg-gradient-to-b from-brand-300 via-brand-500 to-brand-200"
              initial={reduceMotion ? { scaleY: 1 } : { scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.8, delay: 0.12, ease: easeOut }}
            />
          </div>

          <ol className="relative grid list-none gap-8 p-0 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {steps.map((step, index) => (
              <li key={step.number} className="relative">
                <Reveal delay={index * staggerCard}>
                  <div className="relative px-1 py-1 sm:px-2 sm:text-center">
                    <div className="relative flex gap-4 sm:flex-col sm:items-center">
                      <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white text-brand-600 shadow-[0_10px_22px_-12px_rgb(22_131_232_/_0.28)] ring-1 ring-[#D9EAF7]">
                        <step.icon size={20} aria-hidden="true" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-[11px] font-bold tracking-[0.22em] text-brand-600">
                          {step.number}
                        </div>
                        <h3 className="mt-1 text-[1.25rem] font-bold tracking-tight text-ink">
                          {step.title}
                        </h3>
                        <p className="mt-2 max-w-[260px] text-sm leading-relaxed text-ink-muted sm:mx-auto">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
