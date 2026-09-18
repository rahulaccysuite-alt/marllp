import { faqs } from '@/data/faq';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';

export function FAQ() {
  return (
    <section id="faq" className="section-y-compact overflow-x-clip bg-white">
      <div className="site-shell">
        <SectionHeading
          eyebrow="FAQ"
          title="Questions, Answered"
          description="Everything you need to know about working with MAR LLP."
        />

        <Reveal className="mx-auto mt-8 w-full max-w-[820px] md:mt-10" delay={0.08}>
          <Accordion type="single" collapsible defaultValue="faq-0" className="space-y-3">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={faq.question}
                value={`faq-${index}`}
                className="overflow-hidden rounded-xl border border-[#D9EAF7] bg-white px-4 transition-[background-color,border-color,box-shadow] duration-300 last:border-b hover:bg-brand-50/60 data-[state=open]:border-brand-300 data-[state=open]:shadow-[0_12px_28px_-16px_rgb(22_131_232_/_0.16)] sm:px-5"
              >
                <AccordionTrigger className="min-h-12 py-3.5 text-left text-[0.98rem] font-semibold leading-snug text-ink hover:no-underline focus-visible:ring-brand-400 data-[state=open]:text-brand-700 sm:text-[1rem]">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="pb-4 text-[15px] leading-relaxed text-ink-muted">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
}
