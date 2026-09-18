import { trustStats } from '@/data/stats';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';
import { Reveal } from '@/components/ui/Reveal';

export function Stats() {
  return (
    <section className="relative w-full border-y border-[#D9EAF7] bg-gradient-to-b from-white to-brand-50/40 py-12 md:py-16">
      <div className="site-shell">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="text-xl font-medium leading-relaxed text-ink md:text-2xl">
            Professional accounting and tax advice for businesses across Canada.
          </p>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {trustStats.map((stat, index) => (
            <Reveal key={stat.label} delay={index * 0.08} className="text-center">
              {stat.display ? (
                <div className="block text-2xl font-bold tracking-tight text-ink md:text-3xl">
                  {stat.display}
                </div>
              ) : (
                <AnimatedCounter
                  value={stat.value ?? 0}
                  suffix={stat.suffix}
                  decimals={stat.decimals}
                  className="block text-3xl font-bold tracking-tight text-ink md:text-4xl"
                />
              )}
              <div className="mt-2 text-sm font-medium text-ink-muted">{stat.label}</div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
