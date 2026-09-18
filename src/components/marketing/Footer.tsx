import { ArrowRight, Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import Link from 'next/link';
import { contact } from '@/lib/contact';
import { MARLogo } from './MARLogo';

const serviceLinks = [
  { label: 'Accounting', href: '/services' },
  { label: 'Tax', href: '/services' },
  { label: 'Bookkeeping', href: '/services' },
  { label: 'Payroll', href: '/services' },
  { label: 'GST', href: '/services' },
  { label: 'Advisory', href: '/services' },
];

const companyLinks = [
  { label: 'About', href: '/about' },
  { label: 'Our Partners', href: '/about#partners' },
  { label: 'Industries', href: '/industries' },
  { label: 'Insights', href: '/resources' },
  { label: 'Contact', href: '/contact' },
];

function FooterLink({ href, children }: { href: string; children: string }) {
  return (
    <Link
      href={href}
      className="group inline-flex items-center gap-1 text-[13px] text-ink-muted transition-colors duration-300 hover:text-brand-600"
    >
      {children}
      <ArrowRight
        size={11}
        className="cta-arrow opacity-0 transition-opacity duration-300 group-hover:opacity-70"
        aria-hidden="true"
      />
    </Link>
  );
}

export function Footer() {
  return (
    <footer className="relative w-full max-w-none overflow-x-clip border-t border-[#D9EAF7] bg-white text-ink-muted">
      <div
        className="pointer-events-none absolute right-0 top-0 h-40 w-40 rounded-full bg-brand-100/70 blur-[90px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-0 left-0 h-32 w-32 rounded-full bg-brand-50 blur-[80px]"
        aria-hidden="true"
      />

      <div className="relative w-full px-5 py-10 sm:px-8 md:px-10 md:py-12 lg:px-12">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
          <div className="min-w-0 sm:col-span-2 lg:col-span-1">
            <Link
              href="/"
              aria-label="MAR LLP home"
              className="inline-flex opacity-90 transition-opacity duration-300 hover:opacity-100"
            >
              <MARLogo placement="footer" decorative />
            </Link>
            <p className="mt-3 max-w-[280px] text-[13px] leading-relaxed">
              Professional accounting, taxation, review engagements, financial reporting, and
              business advisory services.
            </p>
          </div>

          <div>
            <h2 className="mb-3 text-[10px] font-bold uppercase tracking-[0.18em] text-brand-800">Services</h2>
            <ul className="space-y-1.5">
              {serviceLinks.map((link) => (
                <li key={link.label}>
                  <FooterLink href={link.href}>{link.label}</FooterLink>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="mb-3 text-[10px] font-bold uppercase tracking-[0.18em] text-brand-800">Company</h2>
            <ul className="space-y-1.5">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <FooterLink href={link.href}>{link.label}</FooterLink>
                </li>
              ))}
            </ul>
          </div>

          <div className="min-w-0">
            <h2 className="mb-3 text-[10px] font-bold uppercase tracking-[0.18em] text-brand-800">Contact</h2>
            <ul className="space-y-2">
              <li>
                <a
                  href={contact.emailHref}
                  className="flex items-center gap-2 text-[13px] transition-colors duration-300 hover:text-brand-600"
                >
                  <Mail size={14} className="shrink-0 text-brand-600" aria-hidden="true" />
                  {contact.email}
                </a>
              </li>
              <li>
                <a
                  href={contact.landlineHref}
                  className="flex items-center gap-2 text-[13px] transition-colors duration-300 hover:text-brand-600"
                >
                  <Phone size={14} className="shrink-0 text-brand-600" aria-hidden="true" />
                  {contact.landline}
                </a>
              </li>
              <li>
                <a
                  href={contact.whatsappHref}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 text-[13px] transition-colors duration-300 hover:text-brand-600"
                >
                  <MessageCircle size={14} className="shrink-0 text-brand-600" aria-hidden="true" />
                  {contact.mobile}
                </a>
              </li>
              <li>
                <a
                  href={contact.mapsHref}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-start gap-2 text-[13px] transition-colors duration-300 hover:text-brand-600"
                >
                  <MapPin size={14} className="mt-0.5 shrink-0 text-brand-600" aria-hidden="true" />
                  <span>
                    {contact.addressLines[0]}
                    <br />
                    {contact.addressLines[1]}
                    <br />
                    {contact.addressLines[2]}
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-start justify-between gap-2 border-t border-[#D9EAF7] pt-4 text-[12px] sm:flex-row sm:items-center">
          <div>© MAR LLP. All rights reserved.</div>
          <div className="flex flex-wrap items-center gap-1.5">
            <Link href="/privacy" className="transition-colors duration-300 hover:text-brand-600">
              Privacy Policy
            </Link>
            <span aria-hidden="true">|</span>
            <Link href="/terms" className="transition-colors duration-300 hover:text-brand-600">
              Terms &amp; Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
