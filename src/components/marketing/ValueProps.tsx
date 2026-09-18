import { challenges } from '@/data/challenges';
import { ImageWithFallback } from '@/components/ui/ImageWithFallback';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { TiltCard } from '@/components/ui/TiltCard';
import { cn } from '@/lib/utils';

export function ValueProps() {
  return (
    <section id="challenges" className="section-y relative w-full overflow-x-clip bg-white">
      <div className="absolute left-[-140px] top-24 h-[320px] w-[320px] rounded-full bg-brand-100/35 blur-[120px]" aria-hidden="true" />

      <div className="site-shell relative">
        <SectionHeading
          eyebrow="The challenge"
          title="Financial complexity shouldn't slow your business down."
          description="Business owners often spend too much time dealing with financial administration and too little time focusing on growth."
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-6 lg:mt-20">
          {challenges.map((challenge, index) => (
            <Reveal
              key={challenge.title}
              delay={index * 0.07}
              className={cn('h-full lg:col-span-2', index === 3 && 'lg:col-start-2')}
            >
              <TiltCard className="h-full">
                <article className="group relative flex h-full min-h-[300px] flex-col overflow-hidden rounded-[28px] border border-gray-100 bg-white shadow-[0_16px_40px_-18px_rgb(17_24_39_/_0.14)]">
                  <div className="relative h-36 overflow-hidden">
                    <ImageWithFallback
                      src={challenge.image}
                      alt=""
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className={cn('object-cover', index % 2 === 0 ? 'img-zoom' : '')}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-white via-white/35 to-navy-950/10" aria-hidden="true" />
                  </div>
                  <div className="relative flex flex-1 flex-col p-6 sm:p-7">
                  <span
                    className="pointer-events-none absolute -right-4 top-3 font-display text-[5.5rem] leading-none text-brand-600/8 transition-colors duration-400 group-hover:text-brand-600/20"
                    aria-hidden="true"
                  >
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div
                    className="pointer-events-none absolute -bottom-10 -right-8 h-32 w-32 rounded-full bg-brand-100/40 blur-2xl transition-all duration-400 group-hover:bg-brand-200/50"
                    aria-hidden="true"
                  />

                  <div className="relative flex items-start justify-between gap-4">
                    <span className="text-4xl font-bold tracking-tight text-brand-200 transition-colors duration-400 group-hover:text-brand-600">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-50 to-brand-100 text-brand-600 shadow-[inset_0_1px_0_rgb(255_255_255_/_0.85)] transition-transform duration-300 group-hover:scale-110">
                      <challenge.icon size={20} aria-hidden="true" />
                    </span>
                  </div>

                  <h3 className="relative mt-8 text-lg font-bold tracking-tight text-ink">
                    {challenge.title}
                  </h3>
                  <p className="relative mt-3 text-sm leading-relaxed text-ink-muted">{challenge.description}</p>
                  </div>
                </article>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
