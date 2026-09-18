import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms & Conditions',
  description: 'Terms of use for the MAR LLP marketing website.',
  alternates: { canonical: '/terms' },
};

export default function TermsPage() {
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="site-shell">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-3xl font-bold tracking-tight text-ink md:text-5xl">
            Terms &amp; Conditions
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-ink-muted">
            This website is a marketing site for MAR LLP. The content is for general information
            about our bookkeeping, tax, GST, payroll, compliance and advisory services.
          </p>
          <div className="mt-10 space-y-5 text-[17px] leading-relaxed text-ink-muted">
            <p>
              Nothing on this site is tax, legal or investment advice, and it does not create a
              client relationship. Engagement terms are agreed separately in writing.
            </p>
            <p>
              Illustrative dashboard figures, sample reviews and example metrics are for presentation
              only and are not client results.
            </p>
            <p>
              For questions about these terms, write to MARLLPCPA@gmail.com.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
