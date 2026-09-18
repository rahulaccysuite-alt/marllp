import { testimonials } from '@/data/testimonials';
import { Glow } from '@/components/ui/Glow';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Slider } from '@/components/ui/Slider';
import { TestimonialCard } from './TestimonialCard';

export function Testimonials() {
  return (
    <section id="testimonials" className="section-y relative overflow-x-clip bg-gradient-to-b from-surface to-white">
      <Glow className="left-[-140px] top-20 h-[360px] w-[360px] bg-brand-100/80" />

      <div className="site-shell relative">
        <SectionHeading
          eyebrow="Testimonials"
          title="What business owners say"
          description="Sample testimonials for layout and tone. Replace with approved client quotes before publishing as social proof."
        />

        <Reveal className="mt-14 md:mt-20" delay={0.1}>
          <Slider
            ariaLabel="Client testimonials"
            autoplayMs={5500}
            slideClassName="flex-[0_0_100%] md:flex-[0_0_calc((100%-1.5rem)/2)] xl:flex-[0_0_calc((100%-3rem)/3)]"
          >
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={`${testimonial.industry}-${index}`} {...testimonial} />
            ))}
          </Slider>
        </Reveal>
      </div>
    </section>
  );
}
