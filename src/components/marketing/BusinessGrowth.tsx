import { whyChoose } from '@/data/whyChoose';
import { FinancialGrid } from '@/components/ui/FinancialGrid';
import { Glow } from '@/components/ui/Glow';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';

export function BusinessGrowth() {
  return (
    <section id="why-mar" className="section-y relative w-full overflow-x-clip bg-surface">
      <FinancialGrid className="opacity-40 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_40%,black,transparent)]" />
      <Glow className="left-1/4 top-[-80px] h-[280px] w-[280px] bg-brand-200/40" />
      <Glow className="bottom-[-60px] right-[-40px] h-[240px] w-[240px] bg-brand-100/50" />

      <div className="site-shell relative">
        <SectionHeading
          eyebrow="Why MAR LLP"
          title="What Makes MAR LLP Different"
          description="Professional expertise, specialized tax knowledge, and a practical understanding of business — so clients can move forward with confidence."
        />

        <div className="mt-8 grid gap-4 sm:grid-cols-2 md:mt-10 lg:grid-cols-3">
          {whyChoose.map((item, index) => (
            <Reveal key={item.title} delay={index * 0.07} className="h-full">
              <article className="premium-card premium-card-industry group relative flex h-full flex-col overflow-hidden rounded-2xl border border-[#D9EAF7] bg-white p-5 shadow-[0_10px_24px_-18px_rgb(11_46_89_/_0.1)] sm:p-6">
                <div className="relative flex items-start justify-between gap-4">
                  <span className="text-xs font-bold tracking-[0.2em] text-brand-400">{item.number}</span>
                  <span className="card-icon inline-flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-600 ring-1 ring-[#D9EAF7]">
                    <item.icon size={18} aria-hidden="true" />
                  </span>
                </div>
                <h3 className="relative mt-4 text-lg font-bold tracking-tight text-ink">{item.title}</h3>
                <p className="relative mt-2 text-sm leading-relaxed text-ink-muted">{item.description}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
