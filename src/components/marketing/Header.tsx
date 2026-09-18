'use client';

import { ArrowRight, Phone } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { navLinks } from '@/data/navigation';
import { contact } from '@/lib/contact';
import { cn } from '@/lib/utils';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { MARLogo } from './MARLogo';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const headerBarRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const syncHeight = () => {
      const height = headerBarRef.current?.offsetHeight;
      if (height) {
        document.documentElement.style.setProperty('--header-height', `${height}px`);
      }
    };
    syncHeight();
    window.addEventListener('resize', syncHeight);
    return () => window.removeEventListener('resize', syncHeight);
  }, [scrolled]);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const closeMenu = () => setMobileMenuOpen(false);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full border-b transition-[background-color,border-color,box-shadow,backdrop-filter] duration-300',
        scrolled
          ? 'border-[#D9EAF7] bg-white/94 shadow-[0_8px_24px_-18px_rgb(11_46_89_/_0.16)] backdrop-blur-[12px]'
          : 'border-transparent bg-white',
      )}
    >
      <nav className="w-full px-5 sm:px-8 lg:px-12" aria-label="Main navigation">
        <div
          ref={headerBarRef}
          className={cn(
            'flex items-center justify-between gap-4 transition-all duration-300 xl:grid xl:grid-cols-[auto_1fr_auto]',
            scrolled ? 'py-1.5' : 'py-2',
          )}
        >
          <Link
            href="/"
            aria-label="MAR LLP home"
            className="flex shrink-0 items-center py-0.5 opacity-100 transition-opacity duration-300 hover:opacity-80"
          >
            <MARLogo placement="header" priority decorative />
          </Link>

          <div className="hidden items-center justify-center gap-5 xl:flex 2xl:gap-7">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'relative whitespace-nowrap rounded-sm text-[14px] font-medium transition-colors duration-300 after:absolute after:-bottom-1.5 after:left-0 after:h-0.5 after:w-0 after:rounded-full after:bg-brand-600 after:transition-[width] after:duration-[280ms] after:ease-[cubic-bezier(0.22,1,0.36,1)]',
                  isActive(link.href)
                    ? 'text-brand-600 after:w-full'
                    : 'text-brand-800 hover:text-brand-600 hover:after:w-full',
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex shrink-0 items-center justify-end gap-3">
            <a
              href={contact.landlineHref}
              className="hidden h-10 items-center gap-2 text-[13px] font-semibold text-brand-800 transition-colors hover:text-brand-600 xl:inline-flex"
            >
              <Phone size={15} className="text-brand-600" aria-hidden="true" />
              {contact.landline}
            </a>
            <MagneticButton>
              <Link
                href="/contact"
                aria-label="Book a Consultation"
                className="cta-primary group pointer-events-auto inline-flex h-10 items-center gap-1.5 rounded-[12px] bg-brand-600 px-3.5 text-[13px] font-semibold text-white sm:px-5 sm:text-[14px]"
              >
                Book<span className="hidden min-[380px]:inline"> a Consultation</span>
                <ArrowRight size={16} className="cta-arrow" aria-hidden="true" />
              </Link>
            </MagneticButton>

            <button
              type="button"
              className="relative flex h-10 w-10 items-center justify-center rounded-full text-ink transition-colors hover:bg-brand-50 xl:hidden"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation"
              onClick={() => setMobileMenuOpen((open) => !open)}
            >
              <span className="relative block h-3.5 w-5">
                <span
                  className={cn(
                    'absolute left-0 top-0 h-0.5 w-full rounded-full bg-current transition-all duration-300',
                    mobileMenuOpen && 'top-1.5 rotate-45',
                  )}
                />
                <span
                  className={cn(
                    'absolute left-0 top-1.5 h-0.5 w-full rounded-full bg-current transition-all duration-300',
                    mobileMenuOpen && 'opacity-0',
                  )}
                />
                <span
                  className={cn(
                    'absolute left-0 top-3 h-0.5 w-full rounded-full bg-current transition-all duration-300',
                    mobileMenuOpen && 'top-1.5 -rotate-45',
                  )}
                />
              </span>
            </button>
          </div>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={reduceMotion ? false : { height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={reduceMotion ? undefined : { height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              id="mobile-navigation"
              className="overflow-hidden xl:hidden"
            >
              <div className="space-y-1 border-t border-[#D9EAF7] pb-6 pt-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={closeMenu}
                    className={cn(
                      'block rounded-xl px-4 py-3 font-medium transition-colors hover:bg-brand-50 hover:text-brand-700',
                      isActive(link.href) ? 'bg-brand-50 text-brand-700' : 'text-ink-muted',
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="space-y-2 px-4 pt-4 text-sm">
                  <a href={contact.landlineHref} className="block font-semibold text-brand-800">
                    {contact.landline}
                  </a>
                  <a
                    href={contact.whatsappHref}
                    target="_blank"
                    rel="noreferrer"
                    className="block text-ink-muted"
                  >
                    WhatsApp / Cell {contact.mobile}
                  </a>
                  <a href={contact.emailHref} className="block text-ink-muted">
                    {contact.email}
                  </a>
                </div>
                <div className="px-4 pt-4">
                  <Link
                    href="/contact"
                    onClick={closeMenu}
                    className="cta-primary group inline-flex w-full items-center justify-center gap-1.5 rounded-[14px] bg-brand-600 px-6 py-3 text-center font-semibold text-white"
                  >
                    Book a Consultation
                    <ArrowRight size={16} className="cta-arrow" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
