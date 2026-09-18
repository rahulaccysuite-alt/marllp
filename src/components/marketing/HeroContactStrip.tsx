import type { ReactNode } from 'react';
import { Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { contact } from '@/lib/contact';

const items: {
  label: string;
  value: ReactNode;
  href: string;
  icon: typeof Mail;
  iconClass: string;
  external: boolean;
}[] = [
  {
    label: 'Email Us',
    value: contact.email,
    href: contact.emailHref,
    icon: Mail,
    iconClass: 'text-brand-600',
    external: false,
  },
  {
    label: 'Landline',
    value: contact.landline,
    href: contact.landlineHref,
    icon: Phone,
    iconClass: 'text-brand-600',
    external: false,
  },
  {
    label: 'WhatsApp / Cell',
    value: contact.mobile,
    href: contact.whatsappHref,
    icon: MessageCircle,
    iconClass: 'text-[#25D366]',
    external: true,
  },
  {
    label: 'Our Office',
    value: (
      <>
        {contact.addressLines[0]},
        <br />
        {contact.addressLines[1]}, {contact.addressLines[2]}
      </>
    ),
    href: contact.mapsHref,
    icon: MapPin,
    iconClass: 'text-brand-600',
    external: true,
  },
];

export function HeroContactStrip() {
  return (
    <div className="site-shell relative pb-10 md:pb-12">
      <div className="grid gap-4 rounded-[22px] border border-[#D9EAF7] bg-white p-4 shadow-[0_16px_40px_-24px_rgb(11_46_89_/_0.18)] sm:p-5 lg:grid-cols-4 lg:gap-0 lg:p-0">
        {items.map((item, index) => {
          const Icon = item.icon;
          return (
            <a
              key={item.label}
              href={item.href}
              {...(item.external ? { target: '_blank', rel: 'noreferrer' } : {})}
              className={`group flex items-start gap-3 rounded-2xl px-4 py-3 transition-colors duration-300 hover:bg-brand-50/80 lg:rounded-none lg:px-6 lg:py-6 ${
                index > 0 ? 'lg:border-l lg:border-[#D9EAF7]' : ''
              }`}
            >
              <span className="mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 ring-1 ring-[#D9EAF7]">
                <Icon size={18} className={item.iconClass} aria-hidden="true" />
              </span>
              <span className="min-w-0">
                <span className="block text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-muted">
                  {item.label}
                </span>
                <span className="mt-1 block text-[14px] font-semibold leading-snug text-brand-800 transition-colors group-hover:text-brand-600">
                  {item.value}
                </span>
              </span>
            </a>
          );
        })}
      </div>
    </div>
  );
}
