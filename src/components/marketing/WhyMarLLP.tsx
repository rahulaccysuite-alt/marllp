'use client';

import { ShieldCheck, TrendingDown, TrendingUp, Wallet } from 'lucide-react';
import { motion, useMotionValueEvent, useReducedMotion, useScroll } from 'motion/react';
import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';
import { FinancialGrid } from '@/components/ui/FinancialGrid';
import { Glow } from '@/components/ui/Glow';
import { Reveal } from '@/components/ui/Reveal';
import { SectionCurve } from '@/components/ui/SectionCurve';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { TiltCard } from '@/components/ui/TiltCard';
import { illustrativeMonths } from '@/data/dashboard';
import { easeOut } from '@/lib/motion';
import { cn } from '@/lib/utils';

const RevenueChart = dynamic(
  () => import('./RevenueChart').then((module) => module.RevenueChart),
  {
    ssr: false,
    loading: () => <div className="h-24 sm:h-28" aria-hidden="true" />,
  },
);

const MiniBarChart = dynamic(
  () => import('./RevenueChart').then((module) => module.MiniBarChart),
  {
    ssr: false,
    loading: () => <div className="h-16" aria-hidden="true" />,
  },
);

const STORY_STEPS = [
  { key: 'revenue', title: 'Revenue', copy: 'See how monthly income is tracking.' },
  { key: 'expenses', title: 'Expenses', copy: 'Understand where money is going.' },
  { key: 'cashflow', title: 'Cash Flow', copy: 'Know what is available to operate and grow.' },
  { key: 'compliance', title: 'Compliance', copy: 'Keep GST and tax status visible.' },
] as const;

type StoryStep = (typeof STORY_STEPS)[number]['key'];

function formatCad(value: number) {
  return `$${value.toFixed(1)}k`;
}

function stepFromProgress(progress: number): number {
  if (progress < 0.28) return 0;
  if (progress < 0.52) return 1;
  if (progress < 0.76) return 2;
  return 3;
}

export function WhyMarLLP() {
  const reduceMotion = useReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);
  const [isDesktop, setIsDesktop] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedMonth, setSelectedMonth] = useState<(typeof illustrativeMonths)[number]['month']>('Jun');
  const current = illustrativeMonths.find((item) => item.month === selectedMonth) ?? illustrativeMonths[5];
  const netIncome = current.revenue - current.expenses;
  const activeStep = STORY_STEPS[activeIndex].key;

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start start', 'end end'],
  });

  useEffect(() => {
    const media = window.matchMedia('(min-width: 1280px)');
    const sync = () => setIsDesktop(media.matches);
    sync();
    media.addEventListener('change', sync);
    return () => media.removeEventListener('change', sync);
  }, []);

  useMotionValueEvent(scrollYProgress, 'change', (value) => {
    if (!isDesktop || reduceMotion) return;
    const next = stepFromProgress(value);
    setActiveIndex((currentIndex) => (currentIndex === next ? currentIndex : next));
  });

  const metrics = [
    { key: 'revenue' as const, label: 'Revenue', value: formatCad(current.revenue), change: '+18.4%', up: true, icon: TrendingUp },
    { key: 'expenses' as const, label: 'Expenses', value: formatCad(current.expenses), change: '-4.8%', up: false, icon: TrendingDown },
    { key: 'cashflow' as const, label: 'Net Income', value: formatCad(netIncome), change: '+22.1%', up: true, icon: TrendingUp },
    { key: 'cashflow' as const, label: 'Cash Flow', value: '$8.6k', change: '+12.7%', up: true, icon: Wallet },
  ];

  const activate = (step: StoryStep) => {
    setActiveIndex(STORY_STEPS.findIndex((item) => item.key === step));
  };

  return (
    <section id="dashboard" className="relative overflow-x-clip bg-gradient-to-b from-brand-900 via-brand-800 to-navy-950 text-white">
      <SectionCurve fill="#080b16" flip className="absolute inset-x-0 top-0" />
      <FinancialGrid variant="dark" className="opacity-30 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_40%,black,transparent)]" />
      <Glow className="left-[-140px] top-1/4 h-[420px] w-[420px] bg-brand-400/30" />
      <Glow className="bottom-0 right-[-80px] h-[320px] w-[320px] bg-brand-300/20" />

      <div ref={trackRef} className="relative xl:h-[220vh] motion-reduce:xl:h-auto">
        <div className="site-shell relative section-y xl:sticky xl:top-[var(--header-height)] xl:flex xl:min-h-[calc(100vh-var(--header-height))] xl:items-center xl:py-10 motion-reduce:xl:static motion-reduce:xl:block motion-reduce:xl:min-h-0">
          <div className="grid w-full items-center gap-14 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16 xl:gap-20">
            <div>
              <SectionHeading
                dark
                align="left"
                eyebrow="Financial clarity"
                title="Know Your Numbers. Make Better Decisions."
                description="Clear and reliable financial information helps business owners understand performance, identify opportunities, and make confident decisions. Illustrative dashboard only."
              />

              <div className="mt-8 grid grid-cols-2 gap-3 xl:grid-cols-1">
                {STORY_STEPS.map((step, index) => (
                  <button
                    key={step.key}
                    type="button"
                    onClick={() => activate(step.key)}
                    className={cn(
                      'rounded-2xl border px-4 py-3 text-left transition-all duration-400',
                      activeIndex === index
                        ? 'border-brand-300/50 bg-white/10 shadow-[0_12px_32px_-16px_rgb(0_0_0_/_0.45)]'
                        : 'border-white/10 bg-white/5 hover:bg-white/10',
                    )}
                  >
                    <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-brand-200">
                      Step {index + 1}
                    </div>
                    <div className="mt-1 text-sm font-semibold text-white">{step.title}</div>
                    <p className="mt-1 hidden text-xs text-white/60 xl:block">{step.copy}</p>
                  </button>
                ))}
              </div>

              <Reveal delay={0.12} className="mt-6 space-y-3">
                <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/70">
                  <ShieldCheck size={18} className="shrink-0 text-emerald-400" aria-hidden="true" />
                  GST status: Compliant (sample)
                </div>
                <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/70">
                  <ShieldCheck size={18} className="shrink-0 text-emerald-400" aria-hidden="true" />
                  Tax status: Healthy (sample)
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.1} className="[perspective:1400px]">
              <div className="relative mx-auto w-full px-1">
                <div
                  className="pointer-events-none absolute inset-4 translate-y-6 rounded-[32px] bg-white/[0.04] blur-[1px]"
                  aria-hidden="true"
                />
                <div
                  className="pointer-events-none absolute inset-8 translate-y-10 rounded-[32px] bg-brand-500/10"
                  aria-hidden="true"
                />
                <TiltCard maxTilt={4} glow float>
                  <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-gradient-to-br from-navy-900/95 to-navy-950 p-5 shadow-[0_32px_64px_-22px_rgb(8_11_22_/_0.55)] sm:p-6 xl:p-9">
                    <div className="pointer-events-none absolute inset-0 bg-grid-soft-light opacity-20" aria-hidden="true" />
                    <div className="absolute right-[-60px] top-[-60px] h-40 w-40 rounded-full bg-brand-600/18 blur-3xl" aria-hidden="true" />

                    <div className="relative flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="relative flex h-2 w-2">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-40 motion-reduce:animate-none" />
                            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                          </span>
                          <div className="text-sm font-semibold text-white">Financial Overview</div>
                        </div>
                        <div className="text-xs text-white/50">Representative financial dashboard</div>
                      </div>
                      <span className="shrink-0 rounded-full border border-white/15 bg-white/5 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/70">
                        Illustrative
                      </span>
                    </div>

                    <div className="relative mt-5 flex flex-wrap gap-1.5" role="tablist" aria-label="Illustrative month">
                      {illustrativeMonths.map((item) => (
                        <button
                          key={item.month}
                          type="button"
                          role="tab"
                          aria-selected={item.month === selectedMonth}
                          onClick={() => setSelectedMonth(item.month)}
                          className={cn(
                            'min-h-9 rounded-full px-2.5 py-1 text-[11px] font-semibold transition-colors duration-300',
                            item.month === selectedMonth
                              ? 'bg-white text-navy-950'
                              : 'bg-white/5 text-white/55 hover:bg-white/10 hover:text-white',
                          )}
                        >
                          {item.month}
                        </button>
                      ))}
                    </div>

                    <div className="relative mt-5 grid grid-cols-2 gap-3">
                      {metrics.map((metric) => {
                        const isActive = metric.key === activeStep;
                        return (
                          <button
                            key={metric.label}
                            type="button"
                            onClick={() => activate(metric.key)}
                            className={cn(
                              'glass-card-dark rounded-2xl p-4 text-left transition-all duration-400',
                              isActive
                                ? 'bg-white/10 ring-1 ring-brand-400/45'
                                : 'opacity-70 hover:opacity-100',
                            )}
                          >
                            <div className="flex items-center gap-2 text-xs text-white/55">
                              <metric.icon size={14} className={metric.up ? 'text-emerald-400' : 'text-brand-300'} aria-hidden="true" />
                              {metric.label}
                            </div>
                            <motion.div
                              key={`${metric.label}-${metric.value}`}
                              className="mt-1.5 text-base font-bold tracking-tight text-white sm:text-lg"
                              initial={reduceMotion ? false : { opacity: 0, y: 6 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.4, ease: easeOut }}
                            >
                              {metric.value}
                            </motion.div>
                            <div className={`text-xs font-semibold ${metric.up ? 'text-emerald-400' : 'text-brand-300'}`}>
                              {metric.change}
                            </div>
                          </button>
                        );
                      })}
                    </div>

                    <div className="relative mt-4 grid gap-3 sm:grid-cols-2">
                      <button
                        type="button"
                        onClick={() => activate('revenue')}
                        className={cn(
                          'glass-card-dark rounded-2xl p-4 text-left transition-all duration-400',
                          activeStep === 'revenue' ? 'bg-white/10 ring-1 ring-brand-400/40' : 'opacity-75',
                        )}
                      >
                        <div className="mb-2 flex items-center justify-between">
                          <span className="text-xs font-medium text-white/70">Monthly revenue</span>
                          <span className="text-xs font-semibold text-emerald-400">{formatCad(current.revenue)}</span>
                        </div>
                        <div className="h-24 sm:h-28">
                          <RevenueChart
                            reduceMotion={reduceMotion}
                            variant="revenue"
                            replayKey={activeStep === 'revenue' ? `rev-${activeIndex}` : 'rev-idle'}
                          />
                        </div>
                      </button>
                      <button
                        type="button"
                        onClick={() => activate('expenses')}
                        className={cn(
                          'glass-card-dark rounded-2xl p-4 text-left transition-all duration-400',
                          activeStep === 'expenses' ? 'bg-white/10 ring-1 ring-brand-400/40' : 'opacity-75',
                        )}
                      >
                        <div className="mb-2 flex items-center justify-between">
                          <span className="text-xs font-medium text-white/70">Expense chart</span>
                          <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white/60">
                            Sample
                          </span>
                        </div>
                        <MiniBarChart
                          selectedMonth={selectedMonth}
                          replayKey={activeStep === 'expenses' ? `exp-${activeIndex}-${selectedMonth}` : selectedMonth}
                        />
                      </button>
                    </div>

                    <div className="relative mt-3 grid gap-3 sm:grid-cols-2">
                      <button
                        type="button"
                        onClick={() => activate('cashflow')}
                        className={cn(
                          'glass-card-dark rounded-2xl p-4 text-left transition-all duration-400',
                          activeStep === 'cashflow' ? 'bg-white/10 ring-1 ring-brand-400/40' : 'opacity-75',
                        )}
                      >
                        <div className="mb-3 flex items-center justify-between">
                          <span className="text-xs font-medium text-white/70">Cash-flow indicator</span>
                          <span className="rounded-full bg-emerald-400/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-emerald-300">
                            Positive
                          </span>
                        </div>
                        <div className="h-2 overflow-hidden rounded-full bg-white/10">
                          <motion.div
                            key={activeStep === 'cashflow' ? 'cash-on' : 'cash-off'}
                            className="h-full rounded-full bg-gradient-to-r from-brand-400 to-emerald-400"
                            initial={reduceMotion || activeStep !== 'cashflow' ? { scaleX: 0.72 } : { scaleX: 0 }}
                            animate={{ scaleX: 0.72 }}
                            style={{ transformOrigin: 'left' }}
                            transition={{ duration: reduceMotion ? 0 : 0.8, ease: [0.22, 1, 0.36, 1] }}
                          />
                        </div>
                      </button>
                      <button
                        type="button"
                        onClick={() => activate('compliance')}
                        className={cn(
                          'glass-card-dark rounded-2xl p-4 text-left transition-all duration-400',
                          activeStep === 'compliance' ? 'bg-white/10 ring-1 ring-emerald-400/35' : 'opacity-75',
                        )}
                      >
                        <div className="flex items-center gap-2 text-xs text-white/55">
                          <ShieldCheck size={14} className="text-emerald-400" aria-hidden="true" />
                          GST & tax status
                        </div>
                        <div className="mt-1.5 text-base font-bold text-emerald-400">Healthy</div>
                        <div className="text-xs text-white/50">Sample — no pending filings</div>
                      </button>
                    </div>
                  </div>
                </TiltCard>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
      <SectionCurve fill="#ffffff" />
    </section>
  );
}
