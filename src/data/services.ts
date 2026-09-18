import {
  BookOpen,
  Calculator,
  FileSearch,
  FileText,
  Landmark,
  Receipt,
  ShieldCheck,
  TrendingUp,
  Users,
} from 'lucide-react';

export const services = [
  {
    icon: BookOpen,
    title: 'Bookkeeping',
    description: 'Organized, up-to-date books so your records stay accurate throughout the year.',
    includes: ['Monthly bookkeeping', 'Bank reconciliation', 'Accounts payable & receivable', 'Financial reporting'],
  },
  {
    icon: FileText,
    title: 'Tax Filing',
    description: 'Corporate and personal tax preparation with a focus on accuracy and compliance.',
    includes: ['Tax preparation', 'Filing support', 'Tax planning', 'Documentation'],
  },
  {
    icon: Receipt,
    title: 'GST Services',
    description: 'GST registration, filing, reporting, and ongoing compliance support.',
    includes: ['GST registration', 'GST return filing', 'ITC matching', 'Compliance support'],
  },
  {
    icon: Users,
    title: 'Payroll',
    description: 'Payroll processing and related filings handled with care and consistency.',
    includes: ['Payroll processing', 'Salary calculations', 'Deductions', 'Compliance support'],
  },
  {
    icon: ShieldCheck,
    title: 'Business Compliance',
    description: 'Corporate filings, documentation, and ongoing regulatory requirements.',
    includes: ['Corporate filings', 'Documentation', 'Regulatory support', 'Record management'],
  },
  {
    icon: TrendingUp,
    title: 'Financial Advisory',
    description: 'Practical guidance to support confident financial and business decisions.',
    includes: ['Financial analysis', 'Cash-flow planning', 'Business reporting', 'Growth planning'],
  },
  {
    icon: Calculator,
    title: 'Accounting',
    description: 'Professional accounting and financial reporting tailored to your business.',
    includes: ['Financial statements', 'Month-end close', 'Management reporting', 'Year-end support'],
  },
  {
    icon: Landmark,
    title: 'Corporate & Personal Tax',
    description: 'Tax planning and preparation for individuals, corporations, and entrepreneurs.',
    includes: ['T1 / T2 / T3 returns', 'Corporate tax', 'Personal tax', 'Year-round support'],
  },
  {
    icon: FileSearch,
    title: 'Review Engagements',
    description: 'Professional review engagement services to provide assurance over financial information where applicable.',
    includes: ['Review engagement support', 'Financial statement review', 'Analytical procedures', 'Professional reporting'],
  },
];

export const contactServiceOptions = [
  'Bookkeeping',
  'Tax Filing',
  'GST Services',
  'Payroll',
  'Business Compliance',
  'Financial Advisory',
  'Accounting',
  'Corporate & Personal Tax',
  'Review Engagements',
  'Not sure yet',
];
