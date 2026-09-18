'use client';

import { Play } from 'lucide-react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { FinancialGrid } from '@/components/ui/FinancialGrid';
import { FloatingCard } from '@/components/ui/FloatingCard';
import { Glow } from '@/components/ui/Glow';
import { ImageWithFallback } from '@/components/ui/ImageWithFallback';
import { Reveal } from '@/components/ui/Reveal';
import { SectionCurve } from '@/components/ui/SectionCurve';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { cn } from '@/lib/utils';

const POSTER =
  'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1600&q=80';

const overlayCards = [
  { label: 'GST filed', value: 'On time', tone: 'text-emerald-600', delay: 0.2, duration: 5.5, position: 'absolute -left-2 top-8 z-20 hidden w-[150px] sm:block lg:-left-6' },
  { label: 'Books reconciled', value: 'Current', tone: 'text-brand-600', delay: 0.8, duration: 6.2, position: 'absolute -right-2 top-16 z-20 hidden w-[168px] sm:block lg:-right-8' },
  { label: 'Tax deadline', value: 'Tracked', tone: 'text-emerald-600', delay: 1.1, duration: 5.2, position: 'absolute bottom-16 -left-1 z-20 hidden w-[150px] md:block lg:-left-4' },
  { label: 'Cash flow', value: '$8.6k', tone: 'text-ink', delay: 1.4, duration: 5.8, position: 'absolute -bottom-4 left-1/2 z-20 hidden w-[160px] -translate-x-1/2 md:block' },
];

interface VideoShowcaseProps {
  /** Optional local MP4 under /public. Leave empty for poster-only presentation. */
  srcMp4?: string;
  /** Optional local WebM under /public. */
  srcWebm?: string;
  poster?: string;
}

/**
 * Premium video presentation block.
 * Uses local media when provided; otherwise shows a poster + play affordance.
 */
export function VideoShowcase({
  srcMp4,
  srcWebm,
  poster = POSTER,
}: VideoShowcaseProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduceMotion = useReducedMotion();
  const [playing, setPlaying] = useState(false);
  const [inView, setInView] = useState(false);
  const hasMedia = Boolean(srcMp4 || srcWebm);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const scale = useTransform(scrollYProgress, [0, 0.45, 1], [0.97, 1, 1.025]);
  const frameY = useTransform(scrollYProgress, [0, 1], [22, -16]);

  useEffect(() => {
    const node = frameRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting && entry.intersectionRatio >= 0.35),
      { threshold: [0.35, 0.5] },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !hasMedia) return;

    if (reduceMotion || !inView) {
      video.pause();
      return;
    }

    video.muted = true;
    const playAttempt = video.play();
    if (playAttempt) {
      void playAttempt
        .then(() => setPlaying(true))
        .catch(() => setPlaying(false));
    }
  }, [hasMedia, inView, reduceMotion]);

  const handlePlay = () => {
    if (!hasMedia || !videoRef.current) return;
    videoRef.current.muted = true;
    void videoRef.current.play();
    setPlaying(true);
  };

  return (
    <section
      id="clarity"
      ref={sectionRef}
      className="section-y relative w-full overflow-x-clip bg-navy-950 text-white"
    >
      <SectionCurve fill="#ffffff" flip className="absolute inset-x-0 top-0" />
      <FinancialGrid variant="dark" className="opacity-40 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_40%,black,transparent)]" />
      <Glow className="left-1/4 top-[-100px] h-[360px] w-[360px] bg-brand-600/30" />
      <Glow className="bottom-[-80px] right-1/5 h-[280px] w-[280px] bg-brand-400/18" />

      <div className="site-shell relative">
        <SectionHeading
          dark
          eyebrow="In action"
          title="Your finances. Finally under control."
          description="A closer look at how organized books, compliance and reporting come together for business owners."
        />

        <Reveal delay={0.1} className="relative mx-auto mt-14 max-w-5xl md:mt-20">
          <div className="relative [perspective:1600px]">
            <div
              className="pointer-events-none absolute inset-5 translate-y-7 rounded-[40px] bg-white/[0.05] blur-[1px]"
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute inset-10 translate-y-12 rounded-[40px] bg-brand-500/12"
              aria-hidden="true"
            />
            {overlayCards.map((card) => (
              <FloatingCard
                key={card.label}
                delay={card.delay}
                duration={card.duration}
                className={cn(card.position, '!bg-white/95 p-3.5')}
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-ink-muted">
                    {card.label}
                  </div>
                  <span className="status-dot shrink-0" aria-hidden="true" />
                </div>
                <div className={cn('mt-1 text-sm font-bold', card.tone)}>{card.value}</div>
              </FloatingCard>
            ))}

            <motion.div
              ref={frameRef}
              className="relative overflow-hidden rounded-[28px] border border-white/15 bg-navy-900 depth-frame-dark ring-1 ring-brand-400/20 [transform-style:preserve-3d] sm:rounded-[36px]"
              style={reduceMotion ? undefined : { scale, y: frameY }}
            >
              <div className="relative aspect-[16/9] w-full">
                {hasMedia ? (
                  <video
                    ref={videoRef}
                    className="h-full w-full object-cover"
                    poster={poster}
                    playsInline
                    muted
                    loop
                    preload="metadata"
                    controls={playing && !inView}
                    onEnded={() => setPlaying(false)}
                  >
                    {srcWebm ? <source src={srcWebm} type="video/webm" /> : null}
                    {srcMp4 ? <source src={srcMp4} type="video/mp4" /> : null}
                  </video>
                ) : (
                  <ImageWithFallback
                    src={poster}
                    alt="Financial clarity presentation for MAR LLP clients"
                    fill
                    sizes="(max-width: 1024px) 100vw, 1024px"
                    className="object-cover"
                  />
                )}

                <div
                  className={cn(
                    'absolute inset-0 bg-gradient-to-t from-navy-950/80 via-navy-950/25 to-navy-950/10 transition-opacity duration-500',
                    playing && hasMedia && 'opacity-30',
                  )}
                  aria-hidden="true"
                />
                <div
                  className="pointer-events-none absolute inset-0 shadow-[inset_0_0_80px_rgba(8,11,22,0.35)]"
                  aria-hidden="true"
                />

                {(!playing || !hasMedia) && (
                  <button
                    type="button"
                    onClick={handlePlay}
                    className="group absolute inset-0 flex items-center justify-center"
                    aria-label={hasMedia ? 'Play video' : 'Video showcase preview'}
                  >
                    <span className="relative flex h-20 w-20 items-center justify-center rounded-full bg-white text-brand-700 shadow-[0_16px_40px_-8px_rgb(0_0_0_/_0.45)] transition-transform duration-500 group-hover:scale-110 sm:h-24 sm:w-24">
                      <span className="absolute inset-0 rounded-full bg-white/30 motion-safe:animate-ping" aria-hidden="true" />
                      <Play size={32} className="relative ml-1 fill-current" aria-hidden="true" />
                    </span>
                  </button>
                )}
              </div>
            </motion.div>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-2 sm:hidden">
            {overlayCards.map((card) => (
              <div key={card.label} className="glass-card rounded-2xl p-3">
                <div className="flex items-center justify-between gap-2">
                  <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-muted">
                    {card.label}
                  </div>
                  <span className="status-dot shrink-0" aria-hidden="true" />
                </div>
                <div className={cn('mt-1 text-sm font-bold', card.tone)}>{card.value}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
      <SectionCurve fill="#F5FAFF" />
    </section>
  );
}
