import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getResourceBySlug, resources } from '@/data/resources';
import { FinalCTA } from '@/components/marketing/FinalCTA';
import { ImageWithFallback } from '@/components/ui/ImageWithFallback';

const categoryImages = {
  Bookkeeping: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1600&q=80',
  Tax: 'https://images.unsplash.com/photo-1554224154-26032ffc0d07?auto=format&fit=crop&w=1600&q=80',
  GST: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1600&q=80',
  Compliance: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1600&q=80',
  Finance: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1600&q=80',
  Business: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1600&q=80',
} as const;

interface ResourcePageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return resources.map((resource) => ({ slug: resource.slug }));
}

export async function generateMetadata({ params }: ResourcePageProps): Promise<Metadata> {
  const { slug } = await params;
  const resource = getResourceBySlug(slug);

  if (!resource) {
    return { title: 'Resource | MAR LLP' };
  }

  return {
    title: resource.title,
    description: resource.description,
    alternates: { canonical: `/resources/${resource.slug}` },                                                                  //SEO                                                                                                                                                                                                                                                                            
    openGraph: {
      title: resource.title,
      description: resource.description,                                                                                           //SEO                                                                                                                                                                                                                                                                                          
      type: 'article',
    },
  };
}

export default async function ResourceArticlePage({ params }: ResourcePageProps) {
  const { slug } = await params;
  const resource = getResourceBySlug(slug);

  if (!resource) {
    notFound();                                                                                                                    //error handling                                                                                                                                                                                     
  }

  return (
    <>
      <article className="bg-white pb-20 md:pb-28">
        <div className="relative h-[42vw] min-h-[240px] max-h-[420px] overflow-hidden">
          <ImageWithFallback
            src={categoryImages[resource.category]}
            alt=""
            fill
            sizes="100vw"
            className="img-cinematic object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-navy-950/25" aria-hidden="true" />
        </div>
        <div className="site-shell">
          <div className="mx-auto max-w-3xl pt-12 md:pt-16">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-600">
              {resource.category}
            </p>
            <h1 className="heading-display mt-4 text-pretty text-[1.85rem] leading-[1.14] text-ink sm:text-4xl md:text-[2.75rem] lg:text-[3.15rem]">
              {resource.title}
            </h1>
            <p className="mt-5 max-w-[36rem] text-lg leading-[1.7] text-ink-muted">{resource.description}</p>

            <div className="mt-10 space-y-5 text-[17px] leading-relaxed text-ink-muted">
              {resource.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <Link
              href="/resources"
              className="mt-12 inline-flex text-sm font-semibold text-brand-600 hover:text-brand-700"
            >
              ← All insights
            </Link>
          </div>
        </div>
      </article>
      <FinalCTA />
    </>
  );
}
