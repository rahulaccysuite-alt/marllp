import { CalendarDays, HeartHandshake, MapPin, Users } from 'lucide-react';
import { trustStats } from '@/data/stats';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';
import { Reveal } from '@/components/ui/Reveal';

const icons = {
  calendar: CalendarDays,
  users: Users,
  map: MapPin,
  focus: HeartHandshake,
} as const;

export function TrustedBy() {
  return (
    <section id="trust" className="relative w-full overflow-x-clip bg-white py-10 md:py-14">
      <div className="site-shell">
        <div className="grid grid-cols-2 gap-x-4 gap-y-8 rounded-[22px] border border-[#D9EAF7] bg-white px-4 py-8 sm:px-8 lg:grid-cols-4 lg:gap-0 lg:px-2 lg:py-10">
          {trustStats.map((stat, index) => {
            const Icon = icons[stat.icon];
            return (
              <Reveal
                key={stat.label}
                delay={index * 0.07}
                className={`flex flex-col items-center px-2 text-center sm:px-4 ${
                  index > 0 ? 'lg:border-l lg:border-[#D9EAF7]' : ''
                }`}
              >
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#D9EAF7] bg-[#F5FAFF] text-brand-600">
                  <Icon size={17} strokeWidth={1.75} aria-hidden="true" />
                </span>
                {stat.display ? (
                  <div className="heading-display mt-3 block min-h-[2.15rem] text-[1.5rem] leading-tight tracking-tight text-brand-800 md:text-[1.65rem]">
                    {stat.display}
                  </div>
                ) : (
                  <AnimatedCounter
                    value={stat.value ?? 0}
                    suffix={stat.suffix}
                    decimals={stat.decimals}
                    className="heading-display mt-3 block min-h-[2.15rem] text-[1.65rem] leading-tight tracking-tight text-brand-800 md:text-[1.8rem]"
                  />
                )}
                <div className="mt-1.5 max-w-[13rem] text-[13px] font-medium leading-snug text-ink-muted">
                  {stat.label}
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
