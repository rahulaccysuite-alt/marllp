import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Reveal } from '@/components/ui/Reveal';

export function Statement() {
  return (
    <section className="relative overflow-x-clip bg-white py-24 md:py-32 lg:py-40">
      <div className="site-shell">
        <Reveal className="max-w-5xl">
          <p className="font-display text-[clamp(2rem,5.2vw,4.6rem)] leading-[1.12] tracking-tight text-ink">
            Your finances shouldn&apos;t just be accurate.
          </p>
          <p className="mt-5 font-display text-[clamp(2rem,5.2vw,4.6rem)] leading-[1.12] tracking-tight text-ink">
            They should help you
            <br />
            make <span className="text-brand-600">better decisions.</span>
          </p>
        </Reveal>

        <Reveal delay={0.15} className="mt-12">
          <Link
            href="/#services"
            className="group inline-flex items-center gap-2 text-[15px] font-semibold text-brand-700 transition-colors duration-300 hover:text-brand-800"
          >
            See How We Help
            <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
