'use client';

import {
  ArrowRight,
  BookOpen,
  Briefcase,
  FileCheck,
  Landmark,
  Receipt,
  ShieldCheck,
  Wallet,
} from 'lucide-react';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import {
  featuredResource,
  listingResources,
  resourceCategories,
  type ResourceArticle,
  type ResourceCategory,
} from '@/data/resources';
import { FloatingCard } from '@/components/ui/FloatingCard';
import { ImageWithFallback } from '@/components/ui/ImageWithFallback';
import { Reveal } from '@/components/ui/Reveal';
import { TiltCard } from '@/components/ui/TiltCard';
import { cn } from '@/lib/utils';

const categoryImages = {
  Bookkeeping: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=800&q=80',
  Tax: 'https://images.unsplash.com/photo-1554224154-26032ffc0d07?auto=format&fit=crop&w=800&q=80',
  GST: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
  Compliance: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=800&q=80',
  Finance: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=80',
  Business: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80',
} as const;

const categoryIcons = {
  Bookkeeping: BookOpen,
  Tax: FileCheck,
  GST: Receipt,
  Compliance: ShieldCheck,
  Finance: Wallet,
  Business: Briefcase,
} as const;

function ResourceCard({ resource }: { resource: ResourceArticle }) {
  const Icon = categoryIcons[resource.category] ?? Landmark;
  const image = categoryImages[resource.category];

  return (
    <article className="card-3d group flex h-full flex-col overflow-hidden rounded-[28px] border border-gray-100 bg-white shadow-[0_18px_40px_-18px_rgb(17_24_39_/_0.14)]">
      <div className="relative h-52 overflow-hidden">
        <ImageWithFallback
          src={image}
          alt=""
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="img-zoom object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/40 to-transparent" />
      </div>
      <div className="flex flex-1 flex-col p-7">
        <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-50 text-brand-600 transition-colors duration-300 group-hover:bg-brand-600 group-hover:text-white">
          <Icon size={20} aria-hidden="true" />
        </span>
        <span className="mt-5 text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-600">
          {resource.category}
        </span>
        <h3 className="mt-3 text-lg font-bold leading-snug text-ink">{resource.title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-ink-muted">{resource.description}</p>
        <Link
          href={`/resources/${resource.slug}`}
          className="mt-auto inline-flex min-h-11 items-center gap-2 pt-6 text-sm font-semibold text-brand-600 transition-colors duration-300 hover:text-brand-700"
        >
          Read More
          <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}

function MiniChart() {
  return (
    <svg viewBox="0 0 220 88" className="h-20 w-full" aria-hidden="true">
      <defs>
        <linearGradient id="resourceChart" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2E97EF" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#2E97EF" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d="M4 70C28 70 36 48 58 50C80 52 88 28 118 30C148 32 160 18 216 12V88H4V70Z" fill="url(#resourceChart)" />
      <path d="M4 70C28 70 36 48 58 50C80 52 88 28 118 30C148 32 160 18 216 12" fill="none" stroke="#1683E8" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

export function ResourcesPage() {
  const [activeCategory, setActiveCategory] = useState<ResourceCategory>('All');

  const visibleResources = useMemo(() => {
    if (activeCategory === 'All') return listingResources;
    return listingResources.filter((resource) => resource.category === activeCategory);
  }, [activeCategory]);

  return (
    <>
      <section className="relative w-full overflow-x-clip">
        <div className="absolute inset-0 bg-grid-soft [mask-image:radial-gradient(ellipse_75%_65%_at_50%_35%,black,transparent)]" aria-hidden="true" />
        <div className="absolute -top-24 right-[-80px] h-[320px] w-[320px] rounded-full bg-brand-200/30 blur-[120px]" aria-hidden="true" />

        <div className="site-shell relative grid items-center gap-12 py-16 md:py-20 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-16">
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-600">Resources</p>
            <h1 className="heading-display mt-4 text-pretty text-[1.95rem] leading-[1.12] text-ink sm:text-4xl md:text-[2.85rem] lg:text-[3.25rem]">
              Financial Insights for Smarter Business
            </h1>
            <p className="mt-5 max-w-[34rem] text-lg leading-[1.7] text-ink-muted">
              Practical insights on bookkeeping, taxation, GST, compliance, and financial management to help you make better business decisions.
            </p>
          </div>

          <div className="relative mx-auto w-full max-w-md [perspective:1000px]">
            <TiltCard maxTilt={5} glow>
              <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-gradient-to-br from-navy-900 to-navy-950 p-6 shadow-[0_28px_56px_-20px_rgb(12_8_31_/_0.45)] sm:p-7">
                <div className="pointer-events-none absolute inset-0 bg-grid-soft-light opacity-30" aria-hidden="true" />
                <div className="relative flex items-center justify-between">
                  <div>
                    <div className="text-sm font-semibold text-white">Insight snapshot</div>
                    <div className="text-xs text-white/50">Cash, tax and reporting</div>
                  </div>
                  <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-white/70">
                    Sample
                  </span>
                </div>
                <div className="relative mt-5 grid grid-cols-2 gap-3">
                  <div className="glass-card-dark rounded-2xl p-3">
                    <div className="text-[11px] text-white/55">Cash visibility</div>
                    <div className="mt-1 text-sm font-bold text-white">Clearer</div>
                  </div>
                  <div className="glass-card-dark rounded-2xl p-3">
                    <div className="text-[11px] text-white/55">Tax position</div>
                    <div className="mt-1 text-sm font-bold text-emerald-400">Prepared</div>
                  </div>
                </div>
                <div className="relative mt-4">
                  <MiniChart />
                </div>
              </div>
            </TiltCard>
            <FloatingCard delay={0.4} className="absolute -bottom-4 -left-2 z-10 px-3 py-2 sm:left-0">
              <div className="text-[11px] font-medium text-ink-muted">Monthly close</div>
              <div className="text-sm font-bold text-ink">On schedule</div>
            </FloatingCard>
          </div>
        </div>
      </section>

      <section className="relative overflow-x-clip bg-white pb-16 md:pb-20 lg:pb-24">
        <div className="site-shell">
          <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {resourceCategories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={cn(
                  'shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition-all duration-300',
                  activeCategory === category
                    ? 'bg-brand-600 text-white shadow-[0_8px_20px_-8px_rgb(22_131_232_/_0.45)]'
                    : 'border border-gray-200 bg-white text-ink-muted hover:border-brand-200 hover:text-brand-700',
                )}
              >
                {category}
              </button>
            ))}
          </div>

          {featuredResource && activeCategory === 'All' && (
            <Reveal className="mt-10">
              <article className="card-3d relative overflow-hidden rounded-[32px] border border-brand-100 bg-gradient-to-br from-white via-white to-brand-50/50 shadow-[0_24px_56px_-24px_rgb(22_131_232_/_0.22)]">
                <div className="grid items-stretch lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
                  <div className="p-7 sm:p-10">
                    <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-600">
                      Featured · {featuredResource.category}
                    </span>
                    <h2 className="heading-display mt-4 text-3xl leading-[1.15] text-ink md:text-4xl">
                      {featuredResource.title}
                    </h2>
                    <p className="mt-4 max-w-xl text-base leading-relaxed text-ink-muted">
                      {featuredResource.description}
                    </p>
                    <Link
                      href={`/resources/${featuredResource.slug}`}
                      className="group mt-6 inline-flex items-center gap-2 text-[15px] font-semibold text-brand-600 hover:text-brand-700"
                    >
                      Read Article
                      <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
                    </Link>
                  </div>
                  <div className="relative min-h-[220px] overflow-hidden lg:min-h-full">
                    <ImageWithFallback
                      src={categoryImages[featuredResource.category]}
                      alt=""
                      fill
                      sizes="(max-width: 1024px) 100vw, 40vw"
                      className="img-cinematic object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-navy-950/25 to-transparent" aria-hidden="true" />
                    <div className="absolute inset-x-5 bottom-5 rounded-2xl border border-white/10 bg-navy-950/55 p-4 backdrop-blur-md">
                      <div className="text-xs font-medium text-white/60">Financial visibility</div>
                      <div className="mt-1 text-sm font-bold text-white">Better information, clearer decisions</div>
                      <MiniChart />
                    </div>
                  </div>
                </div>
              </article>
            </Reveal>
          )}

          <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {visibleResources.map((resource, index) => (
              <Reveal key={resource.slug} delay={index * 0.06} className="h-full">
                <ResourceCard resource={resource} />
              </Reveal>
            ))}
          </div>

          {visibleResources.length === 0 && (
            <p className="mt-10 text-center text-ink-muted">No articles in this category yet.</p>
          )}
        </div>
      </section>
    </>
  );
}
