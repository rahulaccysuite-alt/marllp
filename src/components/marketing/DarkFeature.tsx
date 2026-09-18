'use client';

import { ArrowRight, CheckCircle2, LineChart, TrendingUp, Wallet } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import Link from 'next/link';
import { FinancialGrid } from '@/components/ui/FinancialGrid';
import { FloatingCard } from '@/components/ui/FloatingCard';
import { Glow } from '@/components/ui/Glow';
import { ImageWithFallback } from '@/components/ui/ImageWithFallback';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { Reveal } from '@/components/ui/Reveal';
import { SectionCurve } from '@/components/ui/SectionCurve';
import { TiltCard } from '@/components/ui/TiltCard';
import { media } from '@/lib/media';

export function DarkFeature() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative w-full overflow-x-clip bg-ink-dark py-24 text-white md:py-32">
      <SectionCurve fill="#ffffff" flip className="absolute inset-x-0 top-0" />
      <ImageWithFallback
        src={media.intelligence}
        alt=""
        fill
        sizes="100vw"
        className="object-cover opacity-25"
      />
      <div className="absolute inset-0 bg-ink-dark/78" aria-hidden="true" />
      <FinancialGrid variant="dark" className="opacity-35 [mask-image:radial-gradient(ellipse_65%_55%_at_60%_40%,black,transparent)]" />
      <motion.div
        className="absolute left-[-80px] top-1/4 h-[420px] w-[420px]"
        animate={reduceMotion ? undefined : { x: [0, 36, 0], y: [0, 18, 0], opacity: [0.35, 0.55, 0.35] }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden="true"
      >
        <Glow className="inset-0 h-full w-full bg-brand-600/30" />
      </motion.div>
      <motion.div
        className="absolute bottom-0 right-[-60px] h-[360px] w-[360px]"
        animate={reduceMotion ? undefined : { x: [0, -24, 0], y: [0, -16, 0], opacity: [0.2, 0.38, 0.2] }}
        transition={{ duration: 18, delay: 1.4, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden="true"
      >
        <Glow className="inset-0 h-full w-full bg-orange-500/20" />
      </motion.div>

      <svg
        className="pointer-events-none absolute inset-0 hidden h-full w-full lg:block"
        viewBox="0 0 1200 640"
        fill="none"
        aria-hidden="true"
        preserveAspectRatio="none"
      >
        <motion.path
          d="M140 180C280 170 420 240 560 260C700 280 820 220 980 250"
          stroke="rgba(47,128,237,0.28)"
          strokeWidth="1.2"
          initial={reduceMotion ? false : { pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        />
        <motion.path
          d="M180 420C320 380 480 430 640 400C800 370 920 430 1040 390"
          stroke="rgba(47,128,237,0.18)"
          strokeWidth="1"
          initial={reduceMotion ? false : { pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        />
      </svg>

      <motion.div
        className="absolute left-[12%] top-24 hidden h-px w-40 bg-gradient-to-r from-transparent via-brand-400/60 to-transparent lg:block"
        animate={reduceMotion ? undefined : { opacity: [0.3, 0.8, 0.3], scaleX: [0.85, 1, 0.85] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden="true"
      />

      <div className="site-shell relative z-10">
        <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-16">
          <div>
            <Reveal>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-300">Financial clarity</p>
              <h2 className="heading-display mt-4 text-pretty leading-[1.22] text-white" style={{ fontSize: 'clamp(1.75rem, 2.8vw, 2.5rem)' }}>
                Know your numbers. Make better decisions.
              </h2>
              <p className="mt-5 max-w-[34rem] text-lg leading-[1.7] text-white/65">
                When books, compliance, and reporting stay current, owners spend less time chasing numbers and more time acting on them.
              </p>
              <MagneticButton className="mt-8">
                <Link
                  href="/contact"
                  className="cta-primary group inline-flex min-h-12 items-center gap-2 rounded-full bg-brand-600 px-7 py-3.5 text-[15px] font-semibold text-white transition-all duration-300 hover:bg-brand-500"
                >
                  Book a Consultation
                  <ArrowRight size={17} className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
                </Link>
              </MagneticButton>
            </Reveal>
          </div>

          <Reveal delay={0.12} className="[perspective:1400px]">
            <div className="relative mx-auto w-full max-w-md lg:max-w-none">
              <div
                className="pointer-events-none absolute inset-6 translate-x-5 translate-y-8 rounded-[36px] bg-white/[0.04] blur-[1px]"
                aria-hidden="true"
              />
              <div
                className="pointer-events-none absolute inset-10 translate-x-9 translate-y-12 rounded-[36px] bg-brand-500/10"
                aria-hidden="true"
              />

              <FloatingCard delay={0.3} duration={5.5} className="absolute -left-2 top-8 z-20 hidden w-[148px] !bg-white/95 p-3 shadow-xl sm:block lg:-left-8">
                <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-muted">
                  <Wallet size={12} className="text-brand-600" aria-hidden="true" />
                  Cash
                </div>
                <div className="mt-1 text-sm font-bold text-ink">$8.6k</div>
              </FloatingCard>

              <FloatingCard delay={0.9} duration={6} className="absolute -right-1 top-20 z-20 hidden w-[148px] !bg-white/95 p-3 shadow-xl sm:block lg:-right-6">
                <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-muted">
                  <TrendingUp size={12} className="text-emerald-600" aria-hidden="true" />
                  Net
                </div>
                <div className="mt-1 text-sm font-bold text-ink">+12.4%</div>
              </FloatingCard>

              <TiltCard maxTilt={5} glow float>
                <div className="relative mx-auto overflow-hidden rounded-[36px] border border-white/15 bg-gradient-to-b from-navy-900 to-navy-950 p-3 shadow-[0_40px_80px_-24px_rgb(0_0_0_/_0.7)] sm:p-4 lg:[transform:rotateY(-4deg)_rotateX(3deg)]">
                  <div className="overflow-hidden rounded-[28px] border border-white/10 bg-navy-950">
                    <div className="flex items-center justify-between border-b border-white/8 px-5 py-3">
                      <div className="flex items-center gap-2">
                        <span className="h-2.5 w-2.5 rounded-full bg-rose-400/80" />
                        <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
                        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
                      </div>
                      <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/40">
                        Representative UI
                      </span>
                    </div>

                    <div className="space-y-4 p-5 sm:p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-semibold text-white">Performance</p>
                          <p className="text-xs text-white/45">Illustrative snapshot</p>
                        </div>
                        <LineChart size={18} className="text-brand-300" aria-hidden="true" />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="rounded-2xl border border-white/10 bg-white/5 p-3.5">
                          <p className="text-[10px] uppercase tracking-wider text-white/45">Revenue</p>
                          <p className="mt-1 text-lg font-bold text-white">$24.8k</p>
                        </div>
                        <div className="rounded-2xl border border-white/10 bg-white/5 p-3.5">
                          <p className="text-[10px] uppercase tracking-wider text-white/45">Expenses</p>
                          <p className="mt-1 text-lg font-bold text-white">$9.2k</p>
                        </div>
                      </div>

                      <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                        <div className="mb-3 flex items-center justify-between text-xs text-white/55">
                          <span>Monthly trend</span>
                          <span className="text-emerald-400">Sample</span>
                        </div>
                        <svg viewBox="0 0 240 64" className="h-16 w-full" aria-hidden="true">
                          <defs>
                            <linearGradient id="darkFeatureFill" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="#2E97EF" stopOpacity="0.45" />
                              <stop offset="100%" stopColor="#2E97EF" stopOpacity="0" />
                            </linearGradient>
                          </defs>
                          <motion.path
                            d="M0 48C28 48 36 28 60 30C84 32 92 18 120 20C148 22 156 12 180 14C204 16 216 8 240 10V64H0V48Z"
                            fill="url(#darkFeatureFill)"
                            initial={reduceMotion ? false : { opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.25 }}
                          />
                          <motion.path
                            d="M0 48C28 48 36 28 60 30C84 32 92 18 120 20C148 22 156 12 180 14C204 16 216 8 240 10"
                            fill="none"
                            stroke="#4FA8ED"
                            strokeWidth="2.5"
                            initial={reduceMotion ? false : { pathLength: 0 }}
                            whileInView={{ pathLength: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
                          />
                        </svg>
                      </div>

                      <div className="flex items-center gap-2 rounded-2xl border border-emerald-400/20 bg-emerald-400/10 px-3.5 py-2.5 text-sm text-emerald-300">
                        <CheckCircle2 size={16} aria-hidden="true" />
                        GST & tax status: healthy (sample)
                      </div>
                    </div>
                  </div>
                </div>
              </TiltCard>

              <div className="relative z-10 mt-4 grid grid-cols-2 gap-2 sm:hidden">
                <div className="glass-card rounded-2xl p-3">
                  <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-muted">Cash</div>
                  <div className="mt-1 text-sm font-bold text-ink">$8.6k</div>
                </div>
                <div className="glass-card rounded-2xl p-3">
                  <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-muted">Net</div>
                  <div className="mt-1 text-sm font-bold text-ink">+12.4%</div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
      <SectionCurve fill="#F5FAFF" />
    </section>
  );
}
