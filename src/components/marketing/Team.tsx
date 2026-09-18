import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { partners } from '@/data/team';

interface TeamProps {
  detailed?: boolean;
}

export function Team({ detailed = false }: TeamProps) {
  return (
    <section id="partners" className="section-y relative w-full overflow-x-clip bg-white">
      <div className="site-shell relative">
        <SectionHeading
          eyebrow="Our Partners"
          title="Leadership You Can Trust."
          description="MAR LLP is led by experienced professionals with deep expertise in accounting, taxation, financial reporting, and business advisory."
        />

        <div className="mx-auto mt-8 grid max-w-5xl items-stretch gap-6 md:mt-10 lg:grid-cols-2">
          {partners.map((partner, index) => (
            <Reveal key={partner.slug} delay={index * 0.07} className="h-full">
              <article
                id={partner.slug}
                className="premium-card premium-card-partner group flex h-full scroll-mt-24 flex-col overflow-hidden rounded-2xl border border-[#D9EAF7] bg-white shadow-[0_14px_32px_-20px_rgb(11_46_89_/_0.14)]"
              >
                <div className="partner-media relative flex aspect-[5/2] items-center justify-center overflow-hidden bg-gradient-to-br from-brand-700 to-brand-500 transition-[filter] duration-500">
                  <span
                    className="partner-photo flex h-20 w-20 items-center justify-center rounded-full border border-white/20 bg-white/10 text-[1.65rem] font-semibold tracking-[0.08em] text-white transition-transform duration-500"
                    aria-hidden="true"
                  >
                    {partner.initials}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6 sm:p-7">
                  <h3 className="text-xl font-bold text-ink">{partner.name}</h3>
                  <p className="mt-1.5 min-h-[2.6rem] text-sm font-semibold leading-snug text-brand-600">
                    {partner.credentials}
                  </p>
                  <p className="mt-2 text-[12px] font-semibold uppercase tracking-[0.14em] text-ink-muted">
                    {partner.role}
                  </p>
                  {detailed ? (
                    <div className="mt-5 space-y-4 text-sm leading-relaxed text-ink-muted">
                      {partner.biography.map((paragraph) => (
                        <p key={paragraph.slice(0, 32)}>{paragraph}</p>
                      ))}
                    </div>
                  ) : (
                    <>
                      <p className="mt-4 flex-1 text-sm leading-relaxed text-ink-muted">{partner.excerpt}</p>
                      <Link
                        href={`/about#${partner.slug}`}
                        className="group mt-6 inline-flex h-10 items-center gap-1.5 self-start rounded-full border border-[#D9EAF7] bg-white px-4 text-sm font-semibold text-brand-700 transition-colors hover:border-brand-600 hover:text-brand-800"
                      >
                        View Full Profile
                        <ArrowRight size={15} className="cta-arrow" aria-hidden="true" />
                      </Link>
                    </>
                  )}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
