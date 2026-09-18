import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How MAR LLP handles information shared through this website.',
  alternates: { canonical: '/privacy' },
};

export default function PrivacyPage() {
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="site-shell">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-3xl font-bold tracking-tight text-ink md:text-5xl">Privacy Policy</h1>
          <p className="mt-6 text-lg leading-relaxed text-ink-muted">
            This page describes how MAR LLP treats information you choose to share through this
            marketing website. It is a general statement for this static site and is not a substitute
            for formal legal advice.
          </p>
          <div className="mt-10 space-y-5 text-[17px] leading-relaxed text-ink-muted">
            <p>
              If you contact us by email, phone or the enquiry form, we use the details you provide
              only to respond to your request and discuss our services.
            </p>
            <p>
              This website does not operate user accounts, payment processing or a client portal. We
              do not sell personal information.
            </p>
            <p>
              For questions about this policy, write to MARLLPCPA@gmail.com.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
