import { ArrowRight, type LucideIcon } from 'lucide-react';
import Link from 'next/link';
import { ImageWithFallback } from '@/components/ui/ImageWithFallback';

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  includes?: string[];
  image: string;
}

export function ServiceCard({ icon: Icon, title, description, includes, image }: ServiceCardProps) {
  return (
    <article className="premium-card premium-card-service group flex h-full flex-col overflow-hidden rounded-2xl border border-[#D9EAF7] bg-white shadow-[0_12px_28px_-20px_rgb(11_46_89_/_0.12)]">
      <div className="relative aspect-[16/10] overflow-hidden bg-[#EAF6FF]">
        <ImageWithFallback
          src={image}
          alt=""
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="img-zoom object-cover"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent"
          aria-hidden="true"
        />
        <span className="card-icon absolute bottom-3 left-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-white text-brand-600 shadow-[0_8px_18px_-10px_rgb(11_46_89_/_0.28)] ring-1 ring-[#D9EAF7]">
          <Icon size={20} aria-hidden="true" />
        </span>
      </div>

      <div className="flex flex-1 flex-col px-5 pb-5 pt-4 sm:px-6 sm:pb-6">
        <h3 className="text-lg font-bold tracking-tight text-ink">{title}</h3>
        <p className="mt-2 line-clamp-2 min-h-[2.7rem] text-[15px] leading-relaxed text-ink-muted">
          {description}
        </p>

        {includes && includes.length > 0 && (
          <ul className="mt-3 space-y-1.5">
            {includes.slice(0, 4).map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-ink-muted">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        )}

        <Link
          href="/services"
          className="mt-auto inline-flex min-h-10 items-center gap-1.5 pt-4 text-[14px] font-semibold text-brand-600 transition-colors duration-300 hover:text-brand-700"
        >
          Explore Service
          <span className="sr-only">: {title}</span>
          <ArrowRight size={15} className="cta-arrow" aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}
