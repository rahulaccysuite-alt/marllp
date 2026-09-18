'use client';

import { CalendarDays, HeartHandshake, MapPin, Users } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';
import { Glow } from '@/components/ui/Glow';
import { ImageWithFallback } from '@/components/ui/ImageWithFallback';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { TiltCard } from '@/components/ui/TiltCard';
import { illustrativeMonths } from '@/data/dashboard';
import { trustStats } from '@/data/stats';

const FACT_IMAGE =
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=900&q=80';

const icons = {
  calendar: CalendarDays,
  users: Users,
  map: MapPin,
  focus: HeartHandshake,
} as const;

export function FinancialFacts() {
  const reduceMotion = useReducedMotion();
  const maxRevenue = Math.max(...illustrativeMonths.map((m) => m.revenue));

  return (
    <section id="facts" className="section-y relative w-full overflow-x-clip bg-gradient-to-b from-surface to-white">
      <Glow className="left-[-120px] top-20 h-[300px] w-[300px] bg-brand-100/70" />

      <div className="site-shell relative">
        <SectionHeading
          eyebrow="By the numbers"
          title="Financial clarity starts with understanding the numbers."
          description="Illustrative figures and patterns — not MAR LLP performance claims — to show how visibility supports better decisions."
        />

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 md:mt-14">
          {trustStats.map((stat, index) => {
            const Icon = icons[stat.icon];
            return (
              <Reveal key={stat.label} delay={index * 0.07} className="h-full">
                <TiltCard className="h-full" float={index % 2 === 0} maxTilt={3}>
                  <article className="relative flex h-full min-h-[180px] flex-col overflow-hidden rounded-[24px] border border-gray-100 bg-white p-6 shadow-[0_16px_36px_-18px_rgb(17_24_39_/_0.12)]">
                    <div
                      className="pointer-events-none absolute -right-6 -top-8 h-24 w-24 rounded-full bg-brand-100/80 blur-2xl"
                      aria-hidden="true"
                    />
                    <span className="relative inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
                      <Icon size={18} aria-hidden="true" />
                    </span>
                    {stat.display ? (
                      <div className="relative mt-5 block text-2xl font-bold tracking-tight text-ink">
                        {stat.display}
                      </div>
                    ) : (
                      <AnimatedCounter
                        value={stat.value ?? 0}
                        suffix={stat.suffix}
                        decimals={stat.decimals}
                        className="relative mt-5 block text-4xl font-bold tracking-tight text-ink"
                      />
                    )}
                    <p className="relative mt-2 text-sm font-medium text-ink-muted">{stat.label}</p>
                  </article>
                </TiltCard>
              </Reveal>
            );
          })}
        </div>

        <div className="mt-5 grid gap-5 md:grid-cols-6">
          <Reveal className="md:col-span-2">
            <article className="group relative h-full min-h-[240px] overflow-hidden rounded-[28px] border border-gray-100 depth-frame">
              <ImageWithFallback
                src={FACT_IMAGE}
                alt="Business analytics workspace"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="img-cinematic object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-navy-950/20 to-transparent" />
              <p className="absolute bottom-5 left-5 right-5 text-sm font-semibold text-white">
                Sample visual — financial review in practice
              </p>
            </article>
          </Reveal>

          <Reveal delay={0.08} className="md:col-span-2">
            <article className="flex h-full min-h-[200px] flex-col rounded-[28px] border border-gray-100 bg-white p-6 shadow-[0_10px_28px_-14px_rgb(17_24_39_/_0.08)] sm:p-7">
              <div className="flex items-center justify-between">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-600">
                  Sample revenue trend
                </p>
                <span className="rounded-full bg-brand-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-brand-700">
                  Illustrative
                </span>
              </div>
              <div className="mt-6 flex flex-1 items-end gap-2" aria-hidden="true">
                {illustrativeMonths.map((item, index) => (
                  <motion.div
                    key={item.month}
                    className="flex flex-1 flex-col items-center gap-1.5"
                    initial={reduceMotion ? false : { scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.05 * index, duration: 0.5 }}
                    style={{ originY: 1 }}
                  >
                    <div
                      className="w-full rounded-md bg-gradient-to-t from-brand-600 to-brand-400"
                      style={{ height: `${Math.max(28, (item.revenue / maxRevenue) * 100)}%` }}
                    />
                    <span className="text-[10px] font-medium text-ink-muted">{item.month}</span>
                  </motion.div>
                ))}
              </div>
            </article>
          </Reveal>

          <Reveal delay={0.12} className="md:col-span-2">
            <article className="flex h-full min-h-[200px] flex-col justify-between rounded-[28px] border border-brand-200 bg-gradient-to-br from-brand-50 to-white p-6 sm:p-7">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-600">
                Filing rhythm
              </p>
              <div>
                <p className="text-4xl font-bold tracking-tight text-ink">Monthly</p>
                <p className="mt-2 text-sm text-ink-muted">
                  Sample cadence for books close + compliance review — tailored per business.
                </p>
              </div>
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
