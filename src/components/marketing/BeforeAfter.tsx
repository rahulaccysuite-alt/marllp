'use client';

import { Check, X } from 'lucide-react';
import { motion, useMotionValue, useMotionValueEvent, useReducedMotion } from 'motion/react';
import { useEffect, useRef, useState, type PointerEvent } from 'react';
import { Glow } from '@/components/ui/Glow';
import { ImageWithFallback } from '@/components/ui/ImageWithFallback';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { media } from '@/lib/media';
import { easeOut } from '@/lib/motion';

const beforeItems = [
  'Scattered invoices',
  'Spreadsheets',
  'Missed deadlines',
  'Unclear cash flow',
  'Manual reporting',
];

const afterItems = [
  'Organized books',
  'Compliance tracking',
  'Clear reports',
  'Predictable processes',
  'Better financial visibility',
];

export function BeforeAfter() {
  const reduceMotion = useReducedMotion();
  const frameRef = useRef<HTMLDivElement>(null);
  const [split, setSplit] = useState(52);
  const [entered, setEntered] = useState(false);
  const dragging = useRef(false);
  const liveSplit = useMotionValue(52);

  useMotionValueEvent(liveSplit, 'change', (value) => {
    setSplit(value);
  });

  useEffect(() => {
    const node = frameRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setEntered(true);
      },
      { threshold: 0.35 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!entered) return;
    if (reduceMotion) {
      liveSplit.set(52);
      return;
    }
    const controls = liveSplit;
    controls.set(18);
    const timeout = window.setTimeout(() => {
      const start = performance.now();
      const from = 18;
      const to = 52;
      const tick = (now: number) => {
        const progress = Math.min(1, (now - start) / 900);
        const eased = 1 - (1 - progress) ** 3;
        controls.set(from + (to - from) * eased);
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, 80);
    return () => window.clearTimeout(timeout);
  }, [entered, liveSplit, reduceMotion]);

  const updateFromClientX = (clientX: number) => {
    const node = frameRef.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    const next = ((clientX - rect.left) / rect.width) * 100;
    liveSplit.set(Math.min(82, Math.max(18, next)));
  };

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    dragging.current = true;
    event.currentTarget.setPointerCapture(event.pointerId);
    updateFromClientX(event.clientX);
  };

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!dragging.current) return;
    updateFromClientX(event.clientX);
  };

  const onPointerUp = () => {
    dragging.current = false;
  };

  return (
    <section id="transformation" className="section-y relative w-full overflow-x-clip bg-surface">
      <div className="section-fade-top [--fade-from:rgb(11_16_32/0.06)]" aria-hidden="true" />
      <Glow className="right-[-120px] top-24 h-[320px] w-[320px] bg-brand-100/80" />

      <div className="site-shell relative">
        <SectionHeading
          eyebrow="The shift"
          title="From financial complexity to complete clarity."
          description="See what changes when bookkeeping, compliance and reporting sit with a dedicated partner."
        />

        <Reveal delay={0.08} className="mx-auto mt-14 max-w-5xl md:mt-20">
          <div
            ref={frameRef}
            className="relative overflow-hidden rounded-[32px] border border-white/80 depth-frame [perspective:1400px]"
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
          >
            <div className="relative min-h-[460px] overflow-hidden p-7 text-white sm:min-h-[520px] sm:p-10">
              <ImageWithFallback
                src={media.after}
                alt=""
                fill
                sizes="(max-width: 1024px) 100vw, 1024px"
                className="img-cinematic object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-brand-900/88 via-brand-800/78 to-navy-950/70" aria-hidden="true" />
              <p className="relative text-xs font-bold uppercase tracking-[0.18em] text-brand-100">With MAR LLP</p>
              <ul className="relative mt-8 max-w-sm space-y-4">
                {afterItems.map((item, index) => (
                  <motion.li
                    key={item}
                    initial={reduceMotion ? false : { opacity: 0, x: 16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 + 0.08 * index, duration: 0.45, ease: easeOut }}
                    className="flex items-start gap-3 text-[15px] text-white/92"
                  >
                    <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/15 text-emerald-300">
                      <Check size={14} strokeWidth={2.8} aria-hidden="true" />
                    </span>
                    {item}
                  </motion.li>
                ))}
              </ul>
            </div>

            <div
              className="absolute inset-0 overflow-hidden bg-[#F5FAFF] will-change-[clip-path]"
              style={{ clipPath: `inset(0 ${100 - split}% 0 0)` }}
            >
              <div className="relative min-h-[460px] w-full overflow-hidden border-r border-gray-200/80 p-7 sm:min-h-[520px] sm:p-10">
                <ImageWithFallback
                  src={media.before}
                  alt=""
                  fill
                  sizes="(max-width: 1024px) 100vw, 1024px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-[#F5FAFF]/94 via-[#F5FAFF]/88 to-white/80" aria-hidden="true" />
                <p className="relative text-xs font-bold uppercase tracking-[0.18em] text-ink-muted">Before MAR LLP</p>
                <ul className="relative mt-8 max-w-sm space-y-4">
                  {beforeItems.map((item, index) => (
                    <motion.li
                      key={item}
                      initial={reduceMotion ? false : { opacity: 0, x: -12 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.08 * index, duration: 0.45, ease: easeOut }}
                      className="flex items-start gap-3 text-[15px] text-ink-muted"
                    >
                      <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-rose-50 text-rose-500">
                        <X size={14} strokeWidth={2.5} aria-hidden="true" />
                      </span>
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>

            <div
              className="absolute inset-y-0 z-20 flex w-10 -translate-x-1/2 cursor-ew-resize touch-none items-center justify-center"
              style={{ left: `${split}%` }}
              role="slider"
              aria-label="Compare before and after MAR LLP"
              aria-valuemin={18}
              aria-valuemax={82}
              aria-valuenow={Math.round(split)}
              tabIndex={0}
              onKeyDown={(event) => {
                if (event.key === 'ArrowLeft') liveSplit.set(Math.max(18, split - 4));
                if (event.key === 'ArrowRight') liveSplit.set(Math.min(82, split + 4));
              }}
            >
              <span className="h-full w-px bg-white shadow-[0_0_0_1px_rgb(22_131_232_/_0.25)]" aria-hidden="true" />
              <span className="absolute flex h-12 w-12 items-center justify-center rounded-full border border-brand-200 bg-white text-xs font-bold uppercase tracking-wider text-brand-700 shadow-lg">
                ↔
              </span>
            </div>
          </div>
          <p className="mt-4 text-center text-sm text-ink-muted">Drag to compare the shift.</p>
        </Reveal>
      </div>
    </section>
  );
}
