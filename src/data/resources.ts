export const resourceCategories = [
  'All',
  'Bookkeeping',
  'Tax',
  'GST',
  'Compliance',
  'Finance',
  'Business',
] as const;

export type ResourceCategory = (typeof resourceCategories)[number];

export interface ResourceArticle {
  slug: string;
  category: Exclude<ResourceCategory, 'All'>;
  title: string;
  description: string;
  body: string[];
  featured?: boolean;
}

export const resources: ResourceArticle[] = [
  {
    slug: 'financial-clarity-starts-with-better-information',
    category: 'Finance',
    title: 'Financial Clarity Starts With Better Information',
    description:
      'Why organized records, timely reports and a clear view of cash help business owners make better decisions.',
    featured: true,
    body: [
      'Most business decisions are easier when the numbers are current and easy to read. That does not require a complex finance team. It requires books that are up to date, reports that arrive on a known schedule, and a simple view of cash, expenses and upcoming obligations.',
      'When information is delayed, owners often rely on bank balances or last month’s memory. That can hide GST due, unpaid invoices or a cash gap that will appear in a few weeks.',
      'Better information is a habit: monthly bookkeeping, a short performance summary, and someone responsible for tax and compliance dates. Those pieces give you a clearer picture before you hire, spend or expand.',
    ],
  },
  {
    slug: 'why-accurate-bookkeeping-matters',
    category: 'Bookkeeping',
    title: 'Why Accurate Bookkeeping Matters for Growing Businesses',
    description:
      'How current, organized books support tax, cash flow and everyday decisions as a business grows.',
    body: [
      'Accurate bookkeeping is the foundation for tax filing, GST, payroll and any useful financial report. When records fall behind, every other financial task becomes slower and less reliable.',
      'Growing businesses feel this first. More invoices, more payment channels and more expenses make it harder to reconstruct a month after the fact.',
      'A monthly close — reconciliations done, payables and receivables recorded, and a simple report reviewed — keeps the picture current while there is still time to act.',
    ],
  },
  {
    slug: 'how-businesses-can-prepare-for-tax-season',
    category: 'Tax',
    title: 'How Businesses Can Prepare for Tax Season',
    description:
      'The records and routines that make tax preparation calmer and more accurate.',
    body: [
      'Tax season is easier when books are current throughout the year. Waiting until filing time often means missing documents, unreconciled accounts and last-minute estimates.',
      'Keep bank and payment accounts reconciled monthly. Record income and expenses as they happen, and store invoices, receipts and contracts in one place your advisor can access.',
      'A short monthly review of profit, cash and unusual items gives you a clearer tax position well before the deadline.',
    ],
  },
  {
    slug: 'understanding-gst-compliance',
    category: 'GST',
    title: 'Understanding GST Compliance for Your Business',
    description:
      'A clear view of GST registration, filing and reconciliation as transaction volume grows.',
    body: [
      'GST is an ongoing process, not a single annual task. Registration, return filing, invoice matching and input tax credit all need a repeatable routine.',
      'As sales channels and invoice volume grow, mismatches become more likely if reconciliation is left until the return is due.',
      'A structured approach — organized invoices, regular reconciliation and clear filing dates — keeps GST manageable alongside daily operations.',
    ],
  },
  {
    slug: 'essential-compliance-checklist',
    category: 'Compliance',
    title: 'Essential Compliance Checklist for Businesses',
    description:
      'The statutory and regulatory items growing businesses should keep on a visible calendar.',
    body: [
      'Compliance is easier when obligations are listed, dated and assigned. Tax, GST, TDS, payroll and statutory filings each have their own rhythm.',
      'A practical checklist includes current registrations, a filing calendar, stored supporting documents, and a monthly review of what is due next.',
      'The goal is not more paperwork. It is fewer surprises — so compliance work does not interrupt the rest of the business.',
    ],
  },
  {
    slug: 'how-to-improve-business-cash-flow',
    category: 'Finance',
    title: 'How to Improve Business Cash Flow',
    description:
      'Why cash on hand can differ from revenue, and what to review each month.',
    body: [
      'Revenue shows what you have billed or sold. Cash flow shows whether money is available to pay suppliers, salaries, tax and growth investments.',
      'A business can look profitable and still run short if customers pay late, inventory ties up cash, or tax and GST fall in the same month as large expenses.',
      'Review cash in, cash out and upcoming obligations — not only monthly revenue — before you commit to hiring, purchasing or expansion.',
    ],
  },
  {
    slug: 'when-should-you-outsource-accounting',
    category: 'Business',
    title: 'When Should You Outsource Your Accounting?',
    description:
      'Signs that bookkeeping and compliance have outgrown an informal, in-house setup.',
    body: [
      'Many businesses start by handling books themselves. That works until invoices, GST, payroll and tax dates take more time than the owner can spare.',
      'Outsourcing becomes useful when reports are late, compliance feels reactive, or decisions are being made without a clear financial picture.',
      'You do not need to hand over the whole business. Many owners keep visibility and approvals, and ask a partner to organize bookkeeping, filings and monthly reporting.',
    ],
  },
];

export function getResourceBySlug(slug: string) {
  return resources.find((resource) => resource.slug === slug);
}

export const listingResources = resources.filter((resource) => !resource.featured);
export const featuredResource = resources.find((resource) => resource.featured);
