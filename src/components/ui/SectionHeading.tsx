import type { ReactNode } from 'react';
import { staggerCard } from '@/lib/motion';
import { cn } from '@/lib/utils';
import { Reveal } from './Reveal';

interface SectionHeadingProps {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: 'center' | 'left';
  dark?: boolean;
  className?: string;
}

/** Consistent eyebrow + heading + description block for each section. */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'center',
  dark = false,
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        align === 'center' ? 'mx-auto text-center' : 'text-left',
        'max-w-3xl',
        className,
      )}
    >
      <Reveal>
        {eyebrow && (
          <div
            className={cn(
              'mb-3 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] sm:mb-3.5',
              dark ? 'text-brand-300' : 'text-brand-600',
            )}
          >
            <span className="h-px w-7 bg-current opacity-60" aria-hidden="true" />
            {eyebrow}
            {align === 'center' && (
              <span className="h-px w-7 bg-current opacity-60" aria-hidden="true" />
            )}
          </div>
        )}
        <h2
          className={cn(
            'heading-display text-pretty text-[1.5rem] leading-[1.22] sm:text-[1.75rem] md:text-[1.95rem] lg:text-[2.15rem]',
            dark ? 'text-white' : 'text-ink',
          )}
        >
          {title}
        </h2>
      </Reveal>
      {description && (
        <Reveal delay={staggerCard}>
          <p
            className={cn(
              'mt-2.5 max-w-[34rem] text-[0.98rem] leading-[1.65] md:mt-3 md:text-[1.02rem] md:leading-[1.7]',
              dark ? 'text-white/68' : 'text-ink-muted',
              align === 'center' && 'mx-auto',
            )}
          >
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );
}
