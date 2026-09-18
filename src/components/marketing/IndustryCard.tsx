import { ArrowRight, type LucideIcon } from 'lucide-react';
import Link from 'next/link';

interface IndustryCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export function IndustryCard({ icon: Icon, title, description }: IndustryCardProps) {
  return (
    <article className="premium-card premium-card-industry group flex h-full flex-col rounded-2xl border border-[#D9EAF7] bg-white p-5 shadow-[0_8px_20px_-16px_rgb(11_46_89_/_0.08)] sm:p-6">
      <span className="card-icon inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[#D9EAF7] bg-brand-50 text-brand-600">
        <Icon size={20} strokeWidth={1.75} aria-hidden="true" />
      </span>
      <h3 className="mt-4 min-h-[1.5rem] text-base font-bold tracking-tight text-ink">{title}</h3>
      <p className="mt-2 line-clamp-3 min-h-[3.75rem] text-sm leading-relaxed text-ink-muted">{description}</p>
      <Link
        href="/industries"
        className="mt-auto inline-flex items-center gap-1 pt-4 text-sm font-semibold text-brand-600 transition-colors hover:text-brand-700"
      >
        Learn more
        <span className="sr-only"> about {title}</span>
        <ArrowRight size={14} className="cta-arrow" aria-hidden="true" />
      </Link>
    </article>
  );
}
