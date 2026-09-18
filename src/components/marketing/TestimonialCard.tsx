import { Quote, Star } from 'lucide-react';

export interface Testimonial {
  quote: string;
  name: string;
  company: string;
  industry: string;
  rating: number;
  isPlaceholder?: boolean;
}

function getInitials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase();
}

export function TestimonialCard({
  quote,
  name,
  company,
  industry,
  rating,
  isPlaceholder,
}: Testimonial) {
  return (
    <figure className="card-3d relative flex h-full min-h-0 flex-col overflow-hidden rounded-[28px] border border-gray-100 bg-white/90 p-8 shadow-[0_20px_44px_-18px_rgb(17_24_39_/_0.16)] backdrop-blur-md sm:p-9">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-brand-50/80 to-transparent" aria-hidden="true" />
      <Quote size={40} className="absolute right-6 top-6 text-brand-500/25" aria-hidden="true" />

      <div className="flex flex-wrap items-center gap-2">
        <div className="flex gap-1" aria-label={`Rated ${rating} out of 5 stars`}>
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              size={16}
              className={i < rating ? 'fill-amber-400 text-amber-400' : 'text-brand-100'}
              aria-hidden="true"
            />
          ))}
        </div>
        {isPlaceholder && (
          <span className="rounded-full bg-brand-50 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-brand-700">
            Sample testimonial
          </span>
        )}
      </div>

      {isPlaceholder && (
        <p className="mt-3 text-[11px] font-medium text-ink-muted/80">
          Sample testimonial — replace with approved client quote.
        </p>
      )}

      <blockquote className="heading-display mt-5 line-clamp-5 flex-1 text-[1.2rem] leading-[1.45] text-ink">
        &ldquo;{quote}&rdquo;
      </blockquote>

      <figcaption className="mt-7 flex items-center gap-3">
        <span
          aria-hidden="true"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-brand-200 bg-brand-600 text-sm font-semibold tracking-wide text-white shadow-[0_2px_8px_-2px_rgb(22_131_232_/_0.35)]"
        >
          {getInitials(name)}
        </span>
        <div className="min-w-0">
          <div className="font-bold text-ink">{name}</div>
          <div className="text-sm text-ink-muted">{company}</div>
          <div className="mt-1 text-xs font-semibold uppercase tracking-[0.14em] text-brand-600">
            {industry}
          </div>
        </div>
      </figcaption>
    </figure>
  );
}
