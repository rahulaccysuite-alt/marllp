'use client';

import { Check } from 'lucide-react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import type { ReactNode } from 'react';
import { useRef } from 'react';
import { ImageWithFallback } from '@/components/ui/ImageWithFallback';
import { useDesktopMotion } from '@/hooks/useDesktopMotion';
import { media } from '@/lib/media';
import { easeOut } from '@/lib/motion';
import { cn } from '@/lib/utils';

function MiniSparkline({ reduceMotion }: { reduceMotion: boolean | null }) {
  return (
    <svg width="64" height="22" viewBox="0 0 64 22" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="heroSparkFillBrand" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1683E8" stopOpacity="0.28" />
          <stop offset="100%" stopColor="#1683E8" stopOpacity="0" />
        </linearGradient>
      </defs>
      <motion.path
        d="M1 16C9 16 12 10 18 11C24 12 27 6 36 7C45 8 50 4 63 3V22H1V16Z"
        fill="url(#heroSparkFillBrand)"
        initial={reduceMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.7 }}
      />
      <motion.path
        d="M1 16C9 16 12 10 18 11C24 12 27 6 36 7C45 8 50 4 63 3"
        stroke="#1683E8"
        strokeWidth="1.8"
        strokeLinecap="round"
        fill="none"
        initial={reduceMotion ? false : { pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.1, delay: 0.55, ease: easeOut }}
      />
    </svg>
  );
}

function MiniBarChart({ reduceMotion }: { reduceMotion: boolean | null }) {
  const bars = [10, 14, 12, 18, 22];

  return (
    <svg width="52" height="28" viewBox="0 0 52 28" fill="none" aria-hidden="true">
      {bars.map((height, index) => (
        <motion.rect
          key={index}
          x={index * 10 + 2}
          width="6"
          rx="1.5"
          fill="#2E97EF"
          initial={reduceMotion ? { y: 28 - height, height } : { y: 28, height: 0 }}
          animate={{ y: 28 - height, height }}
          transition={{ duration: 0.7, delay: 0.55 + index * 0.08, ease: easeOut }}
        />
      ))}
    </svg>
  );
}

function MiniDonut({ reduceMotion }: { reduceMotion: boolean | null }) {
  const radius = 11;
  const circumference = 2 * Math.PI * radius;

  return (
    <svg width="36" height="36" viewBox="0 0 36 36" aria-hidden="true">
      <circle cx="18" cy="18" r={radius} fill="none" stroke="#EAF6FF" strokeWidth="4.5" />
      <motion.circle
        cx="18"
        cy="18"
        r={radius}
        fill="none"
        stroke="#1683E8"
        strokeWidth="4.5"
        strokeLinecap="round"
        strokeDasharray={circumference}
        transform="rotate(-90 18 18)"
        initial={reduceMotion ? false : { strokeDashoffset: circumference }}
        animate={{ strokeDashoffset: circumference * 0.14 }}
        transition={{ duration: 1.1, delay: 0.7, ease: easeOut }}
      />
    </svg>
  );
}

function StatusPill({ children }: { children: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700 ring-1 ring-emerald-100">
      <span className="status-dot" aria-hidden="true" />
      {children}
    </span>
  );
}

function FinanceChip({
  label,
  className,
  children,
}: {
  label: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        'glass-card rounded-2xl px-3 py-2.5 shadow-[0_12px_28px_-16px_rgb(11_46_89_/_0.22)] transition-shadow duration-300 hover:shadow-[0_18px_36px_-16px_rgb(11_46_89_/_0.3)] sm:px-3.5 sm:py-3',
        className,
      )}
    >
      <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-ink-muted">
        {label}
      </div>
      {children}
    </div>
  );
}

function FloatingMetric({
  className,
  delay,
  duration,
  enterDelay,
  children,
}: {
  className?: string;
  delay: number;
  duration: number;
  enterDelay: number;
  children: ReactNode;
}) {
  const reduceMotion = useReducedMotion();
  const { enabled } = useDesktopMotion();

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: enterDelay, ease: easeOut }}
    >
      <motion.div
        animate={enabled ? { y: [0, -4, 0] } : undefined}
        transition={{ duration, delay, repeat: Infinity, ease: 'easeInOut' }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

export function HeroVisual() {
  const reduceMotion = useReducedMotion();
  const { enabled } = useDesktopMotion();
  const imageRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: imageRef,
    offset: ['start end', 'end start'],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], [10, -10]);

  return (
    <div className="relative mx-auto w-full max-w-[min(100%,560px)] overflow-x-clip px-1 pb-5 pt-2 sm:max-w-none sm:px-2 sm:pb-6 lg:mx-0 lg:ml-auto lg:px-1 lg:pb-3 lg:pt-1">
      <div
        className="glow-drift pointer-events-none absolute left-[8%] top-[14%] h-28 w-28 rounded-full bg-[#2E97EF]/20 blur-3xl sm:h-36 sm:w-36"
        aria-hidden="true"
      />
      <div
        className="ambient-drift-alt pointer-events-none absolute right-[2%] top-[6%] h-24 w-24 rounded-full bg-[#1683E8]/18 blur-3xl sm:h-32 sm:w-32"
        aria-hidden="true"
      />
      <div
        className="ambient-drift pointer-events-none absolute left-1/2 top-1/2 h-[88%] w-[92%] -translate-x-1/2 -translate-y-1/2 rounded-[40px] bg-[#2E97EF]/18 blur-[90px]"
        aria-hidden="true"
      />

      <div className="group relative">
        <div
          className="pointer-events-none absolute -inset-3 rounded-[36px] bg-[#1683E8]/14 blur-2xl sm:-inset-4"
          aria-hidden="true"
        />
        <motion.div
          ref={imageRef}
          className="hero-visual-frame relative aspect-[3/2] overflow-hidden rounded-[24px] border border-white/80 shadow-[0_28px_56px_-22px_rgb(22_131_232_/_0.32)] ring-1 ring-[#D9EAF7] sm:aspect-[4/3] sm:rounded-[28px] lg:rounded-[32px]"
          style={enabled ? { y: imageY } : undefined}
        >
          <ImageWithFallback
            src={media.hero}
            alt="MAR LLP advisors meeting with clients around a conference table"
            fill
            priority
            sizes="(max-width: 1024px) 90vw, min(50vw, 720px)"
            className="hero-visual-img object-cover object-center"
          />
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0B2E59]/10 via-transparent to-white/8"
            aria-hidden="true"
          />
        </motion.div>

        <FloatingMetric
          className="absolute left-2 top-3 z-20 hidden w-[min(42%,176px)] sm:block lg:left-3 lg:top-4 lg:w-[184px]"
          delay={0.4}
          duration={5.2}
          enterDelay={0.28}
        >
          <FinanceChip label="Books up to date">
            <div className="mt-1.5 flex items-end justify-between gap-2">
              <StatusPill>Healthy</StatusPill>
              <MiniSparkline reduceMotion={reduceMotion} />
            </div>
          </FinanceChip>
        </FloatingMetric>

        <FloatingMetric
          className="absolute right-2 top-2 z-20 hidden w-[min(44%,188px)] sm:block lg:right-3 lg:top-3 lg:w-[200px]"
          delay={1.1}
          duration={4.6}
          enterDelay={0.36}
        >
          <FinanceChip label="Monthly close">
            <div className="mt-1 flex items-end justify-between gap-3">
              <div>
                <div className="text-lg font-bold tracking-tight text-brand-800">On track</div>
                <div className="mt-0.5 text-[11px] font-medium text-ink-muted">Illustrative view</div>
              </div>
              <MiniBarChart reduceMotion={reduceMotion} />
            </div>
          </FinanceChip>
        </FloatingMetric>

        <FloatingMetric
          className="absolute bottom-4 left-2 z-20 hidden w-[min(40%,160px)] sm:block lg:bottom-5 lg:left-3"
          delay={1.8}
          duration={5.6}
          enterDelay={0.44}
        >
          <FinanceChip label="Tax ready">
            <div className="mt-1.5 flex items-center justify-between gap-2">
              <StatusPill>Filed</StatusPill>
              <MiniDonut reduceMotion={reduceMotion} />
            </div>
          </FinanceChip>
        </FloatingMetric>

        <FloatingMetric
          className="absolute bottom-3 right-2 z-20 hidden w-[min(44%,176px)] sm:block lg:bottom-4 lg:right-3"
          delay={0.8}
          duration={4.8}
          enterDelay={0.52}
        >
          <FinanceChip label="GST filings">
            <div className="mt-1 flex items-end justify-between gap-2">
              <div>
                <div className="text-lg font-bold text-brand-600">Current</div>
                <div className="mt-0.5 text-[11px] font-medium text-ink-muted">Illustrative view</div>
              </div>
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 ring-1 ring-emerald-100">
                <Check size={13} strokeWidth={2.6} aria-hidden="true" />
              </span>
            </div>
          </FinanceChip>
        </FloatingMetric>
      </div>

      <div className="relative z-10 mt-4 grid grid-cols-2 gap-2 sm:hidden">
        <FinanceChip label="Books up to date">
          <div className="mt-1.5">
            <StatusPill>Healthy</StatusPill>
          </div>
        </FinanceChip>
        <FinanceChip label="Monthly close">
          <div className="mt-1 text-sm font-bold text-brand-800">On track</div>
          <div className="text-[11px] font-medium text-ink-muted">Illustrative view</div>
        </FinanceChip>
        <FinanceChip label="Tax ready">
          <div className="mt-1 flex items-center justify-between gap-2">
            <StatusPill>Filed</StatusPill>
            <MiniDonut reduceMotion={reduceMotion} />
          </div>
        </FinanceChip>
        <FinanceChip label="GST filings">
          <div className="mt-1 flex items-center justify-between">
            <div>
              <div className="text-sm font-bold text-brand-600">Current</div>
              <div className="text-[11px] font-medium text-ink-muted">Illustrative view</div>
            </div>
            <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
              <Check size={11} strokeWidth={2.6} aria-hidden="true" />
            </span>
          </div>
        </FinanceChip>
      </div>
    </div>
  );
}
