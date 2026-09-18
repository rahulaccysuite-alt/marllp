import { cn } from '@/lib/utils';

interface SectionCurveProps {
  fill: string;
  className?: string;
  flip?: boolean;
}

/** Soft curved handoff between adjacent sections. */
export function SectionCurve({ fill, className, flip = false }: SectionCurveProps) {
  return (
    <div
      className={cn('pointer-events-none z-[1] -mb-px leading-[0]', className)}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1440 72"
        preserveAspectRatio="none"
        className={cn('block h-10 w-full md:h-14 lg:h-16', flip && 'rotate-180')}
      >
        <path d="M0 72C240 16 480 0 720 14C960 28 1200 52 1440 10V72H0Z" fill={fill} />
      </svg>
    </div>
  );
}
