import type { Metadata } from 'next';
import { Contact } from '@/components/marketing/Contact';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Contact MAR LLP in Calgary for accounting, tax, GST, payroll, compliance, or financial advisory support.',
  alternates: { canonical: '/contact' },
};

export default function ContactPage() {
  return <Contact />;
}
