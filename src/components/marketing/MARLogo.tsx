import Image from 'next/image';
import { marLogo } from '@/lib/brand';
import { cn } from '@/lib/utils';

type MARLogoPlacement = 'header' | 'footer';

interface MARLogoProps {
  placement?: MARLogoPlacement;
  className?: string;
  priority?: boolean;
  /** Set when a parent already names the brand, e.g. an aria-labelled home link. */
  decorative?: boolean;
}

const placementClass: Record<MARLogoPlacement, string> = {
  header: 'w-[92px] sm:w-[100px] md:w-[108px]',
  footer: 'w-[120px] md:w-[132px]',
};

export function MARLogo({
  placement = 'header',
  className,
  priority = false,
  decorative = false,
}: MARLogoProps) {
  return (
    <Image
      src={marLogo.src}
      alt={decorative ? '' : marLogo.alt}
      width={marLogo.width}
      height={marLogo.height}
      priority={priority}
      sizes={placement === 'header' ? '108px' : '132px'}
      className={cn('h-auto max-w-full object-contain', placementClass[placement], className)}
    />
  );
}
