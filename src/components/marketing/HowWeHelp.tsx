import { Check, X } from 'lucide-react';
import { ImageWithFallback } from '@/components/ui/ImageWithFallback';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { media } from '@/lib/media';

const beforeItems = [
  'Disorganized records',
  'Delayed reports',
  'Compliance stress',
  'Limited visibility',
  'Reactive decisions',
];

const afterItems = [
  'Organized financial records',
  'Timely reporting',
  'Structured compliance',
  'Clear financial visibility',
  'Better-informed decisions',
];

export function HowWeHelp() {
  return (
    <section id="how-we-help" className="section-y relative w-full overflow-x-clip bg-gradient-to-b from-brand-50/40 via-white to-white">
      <div className="site-shell">
        <SectionHeading
          eyebrow="How we help"
          title="From financial administration to financial clarity."
          description="The difference is not more paperwork. It is a structured way of keeping records, compliance and decisions in order."
        />

        <Reveal className="mx-auto mt-20 max-w-5xl overflow-hidden rounded-[32px] border border-gray-100 depth-frame" delay={0.1}>
          <div className="grid md:grid-cols-2">
            <div className="relative overflow-hidden p-8 sm:p-10">
              <ImageWithFallback src={media.before} alt="" fill sizes="50vw" className="object-cover" />
              <div className="absolute inset-0 bg-[#F5FAFF]/90" aria-hidden="true" />
              <p className="relative text-xs font-bold uppercase tracking-[0.2em] text-ink-muted">
                Before MAR LLP
              </p>
              <ul className="relative mt-6 space-y-4">
                {beforeItems.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-[15px] text-ink-muted">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white text-gray-400 ring-1 ring-gray-200">
                      <X size={14} aria-hidden="true" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative overflow-hidden p-8 text-white sm:p-10">
              <ImageWithFallback src={media.after} alt="" fill sizes="50vw" className="img-cinematic object-cover" />
              <div className="absolute inset-0 bg-gradient-to-br from-navy-950/88 via-navy-900/80 to-brand-900/75" aria-hidden="true" />
              <p className="relative text-xs font-bold uppercase tracking-[0.2em] text-brand-300">
                With MAR LLP
              </p>
              <ul className="relative mt-6 space-y-4">
                {afterItems.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-[15px] text-white/90">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/10 text-emerald-300 ring-1 ring-white/15">
                      <Check size={14} strokeWidth={3} aria-hidden="true" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
