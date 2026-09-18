import { ArrowRight, BookOpen, FileCheck, Landmark, Receipt, ShieldCheck, Wallet } from 'lucide-react';
import Link from 'next/link';
import { listingResources, type ResourceArticle } from '@/data/resources';
import { ImageWithFallback } from '@/components/ui/ImageWithFallback';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';

const categoryIcons = {
  Bookkeeping: BookOpen,
  Tax: FileCheck,
  GST: Receipt,
  Compliance: ShieldCheck,
  Finance: Wallet,
  Business: Landmark,
} as const;

const categoryImages = {
  Bookkeeping: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=800&q=80',
  Tax: 'https://images.unsplash.com/photo-1554224154-26032ffc0d07?auto=format&fit=crop&w=800&q=80',
  GST: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
  Compliance: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=800&q=80',
  Finance: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=80',
  Business: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80',
} as const;

const preferredSlugs = [
  'understanding-gst-compliance',
  'why-accurate-bookkeeping-matters',
  'how-businesses-can-prepare-for-tax-season',
  'how-to-improve-business-cash-flow',
  'essential-compliance-checklist',
  'when-should-you-outsource-accounting',
];

function shortDescription(text: string) {
  if (text.length <= 92) return text;
  return `${text.slice(0, 89).replace(/\s+\S*$/, '')}…`;
}

function homepageInsights(): ResourceArticle[] {
  const picked = preferredSlugs
    .map((slug) => listingResources.find((resource) => resource.slug === slug))
    .filter((resource): resource is ResourceArticle => Boolean(resource));

  if (picked.length >= 6) return picked.slice(0, 6);

  const remaining = listingResources.filter((resource) => !picked.some((p) => p.slug === resource.slug));
  return [...picked, ...remaining].slice(0, 6);
}

export function Resources() {
  const cards = homepageInsights();

  return (
    <section id="resources" className="section-y relative overflow-x-clip bg-surface">
      <div className="site-shell relative">
        <SectionHeading
          eyebrow="Insights"
          title="Financial Insights That Help You Make Better Decisions"
          description="Practical reading on GST, bookkeeping, tax, cash flow, and growth — written for owners, not accountants."
        />

        <div className="mt-8 grid gap-5 sm:grid-cols-2 md:mt-10 lg:grid-cols-3">
          {cards.map((resource, index) => {
            const Icon = categoryIcons[resource.category] ?? Landmark;
            const image = categoryImages[resource.category];

            return (
              <Reveal key={resource.slug} delay={index * 0.07} className="h-full">
                <article className="premium-card premium-card-insight group flex h-full flex-col overflow-hidden rounded-2xl border border-[#D9EAF7] bg-white shadow-[0_12px_28px_-18px_rgb(11_46_89_/_0.12)]">
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <ImageWithFallback
                      src={image}
                      alt=""
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="img-zoom object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-950/40 to-transparent" aria-hidden="true" />
                    <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-white/94 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-brand-700">
                      <Icon size={12} aria-hidden="true" />
                      {resource.category}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-5 sm:p-6">
                    <h3 className="line-clamp-2 min-h-[2.75rem] text-base font-bold leading-snug text-ink">
                      {resource.title}
                    </h3>
                    <p className="mt-2 line-clamp-2 min-h-[2.5rem] text-sm leading-relaxed text-ink-muted">
                      {shortDescription(resource.description)}
                    </p>
                    <Link
                      href={`/resources/${resource.slug}`}
                      className="mt-auto inline-flex min-h-10 items-center gap-1.5 pt-4 text-sm font-semibold text-brand-600 transition-colors duration-300 hover:text-brand-700"
                    >
                      Read More
                      <span className="sr-only">: {resource.title}</span>
                      <ArrowRight size={14} className="cta-arrow" aria-hidden="true" />
                    </Link>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.1} className="mt-8 text-center">
          <Link
            href="/resources"
            className="group inline-flex min-h-11 items-center gap-2 text-[15px] font-semibold text-brand-700 transition-colors hover:text-brand-800"
          >
            View All Insights
            <ArrowRight size={16} className="cta-arrow" aria-hidden="true" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
