'use client';

import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { CheckCircle2, Mail, MapPin, MessageCircle, Phone, X } from 'lucide-react';
import { useCallback, useEffect, useId, useRef, useState, type FormEvent } from 'react';
import { createPortal } from 'react-dom';
import { contactServiceOptions } from '@/data/services';
import { ImageWithFallback } from '@/components/ui/ImageWithFallback';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { contact } from '@/lib/contact';
import {
  buildConsultationLinks,
  readConsultationDetails,
  tryOpenConsultationChannels,
  validateConsultationForm,
  writeConsultationDetails,
  type ConsultationLinks,
} from '@/lib/consultation';
import { media } from '@/lib/media';
import { easeOut } from '@/lib/motion';

const inputClasses =
  'w-full rounded-xl border border-[#D9EAF7] bg-white px-4 py-3 text-[15px] text-ink placeholder:text-gray-400 transition-all duration-300 focus:border-brand-400 focus:outline-none focus:ring-4 focus:ring-brand-100';

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

function WhatsAppGlyph({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}

function ConsultationReadyPanel({
  links,
  onClose,
}: {
  links: ConsultationLinks;
  onClose: () => void;
}) {
  const reduceMotion = useReducedMotion();
  const titleId = useId();
  const descriptionId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const previous = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    closeRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== 'Tab' || !panelRef.current) return;

      const focusable = Array.from(panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)).filter(
        (element) => !element.hasAttribute('disabled') && element.getAttribute('aria-hidden') !== 'true',
      );

      if (focusable.length === 0) {
        event.preventDefault();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKeyDown);
      previous?.focus();
    };
  }, [onClose]);

  return createPortal(
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[80] flex items-center justify-center px-4 py-8"
        initial={reduceMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={reduceMotion ? undefined : { opacity: 0 }}
        transition={{ duration: 0.32, ease: easeOut }}
      >
        <div
          className="absolute inset-0 bg-navy-950/40"
          onClick={onClose}
          aria-hidden="true"
        />
        <motion.div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          aria-describedby={descriptionId}
          tabIndex={-1}
          className="relative w-full max-w-md overflow-hidden rounded-2xl border border-[#D9EAF7] bg-white p-6 shadow-[0_28px_56px_-24px_rgb(11_46_89_/_0.16)] sm:p-8"
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduceMotion ? undefined : { opacity: 0, y: 8 }}
          transition={{ duration: 0.34, ease: easeOut }}
        >
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className="absolute right-4 top-4 rounded-full p-1.5 text-ink-muted transition-colors hover:bg-brand-50 hover:text-ink"
            aria-label="Close consultation details"
          >
            <X size={18} aria-hidden="true" />
          </button>

          <div className="flex flex-col items-center text-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
              <CheckCircle2 size={28} aria-hidden="true" />
            </span>
            <h3 id={titleId} className="mt-5 text-xl font-bold text-navy-950 sm:text-2xl">
              Consultation details are ready!
            </h3>
            <p id={descriptionId} className="mt-3 max-w-sm text-[15px] text-ink-muted">
              We&apos;ve prepared your email and WhatsApp with all your details.
            </p>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <a
              href={links.mailtoUrl}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border-2 border-brand-600 bg-white px-5 py-3 text-sm font-semibold text-brand-700 transition-colors hover:bg-brand-50"
              aria-label="Open Email"
            >
              <Mail size={18} aria-hidden="true" />
              Open Email
            </a>
            <a
              href={links.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#1EBE5A]"
              aria-label="Continue on WhatsApp"
            >
              <WhatsAppGlyph />
              Continue on WhatsApp
            </a>
          </div>

          <p className="mt-5 text-center text-sm text-ink-muted">
            If nothing opens automatically, please click the buttons above.
          </p>

          <button
            type="button"
            onClick={onClose}
            className="mx-auto mt-4 block text-sm font-semibold text-brand-700 transition-colors hover:text-brand-800"
          >
            Close
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.body,
  );
}

export function Contact() {
  const [preparing, setPreparing] = useState(false);
  const [links, setLinks] = useState<ConsultationLinks | null>(null);
  const submittingRef = useRef(false);
  const prepareTimerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (prepareTimerRef.current !== null) {
        window.clearTimeout(prepareTimerRef.current);
      }
    };
  }, []);

  const closePanel = useCallback(() => {
    setLinks(null);
  }, []);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (submittingRef.current || preparing || links) return;

    const form = event.currentTarget;
    const details = readConsultationDetails(form);
    writeConsultationDetails(form, details);

    if (!validateConsultationForm(form, details)) {
      return;
    }

    submittingRef.current = true;
    setPreparing(true);

    const nextLinks = buildConsultationLinks(details);

    prepareTimerRef.current = window.setTimeout(() => {
      setLinks(nextLinks);
      setPreparing(false);
      submittingRef.current = false;
      tryOpenConsultationChannels(nextLinks);
    }, 280);
  };

  const clearFieldValidity = (event: FormEvent<HTMLFormElement>) => {
    const target = event.target;
    if (
      target instanceof HTMLInputElement ||
      target instanceof HTMLTextAreaElement ||
      target instanceof HTMLSelectElement
    ) {
      target.setCustomValidity('');
    }
  };

  return (
    <section id="contact" className="section-y relative overflow-x-clip bg-gradient-to-b from-white to-brand-50/50">
      <div className="absolute bottom-0 right-[-140px] h-[380px] w-[380px] rounded-full bg-brand-100/60 blur-[130px]" aria-hidden="true" />

      <div className="site-shell relative">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-20">
          <div>
            <div className="relative mb-10 h-52 overflow-hidden rounded-2xl depth-frame sm:h-64">
              <ImageWithFallback
                src={media.contact}
                alt=""
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="img-cinematic object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/55 to-transparent" aria-hidden="true" />
            </div>
            <SectionHeading
              align="left"
              eyebrow="Contact us"
              title="Let's talk about your business."
              description="Whether you need help with accounting, tax, GST, payroll, compliance, or financial strategy, we're here to help."
            />

            <Reveal delay={0.15} className="mt-10">
              <div className="space-y-5">
                <a href={contact.emailHref} className="group flex items-center gap-4">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-brand-600 shadow-sm ring-1 ring-[#D9EAF7] transition-colors duration-300 group-hover:bg-brand-600 group-hover:text-white">
                    <Mail size={19} aria-hidden="true" />
                  </span>
                  <span className="font-medium text-ink transition-colors group-hover:text-brand-700">
                    {contact.email}
                  </span>
                </a>
                <a href={contact.landlineHref} className="group flex items-center gap-4">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-brand-600 shadow-sm ring-1 ring-[#D9EAF7] transition-colors duration-300 group-hover:bg-brand-600 group-hover:text-white">
                    <Phone size={19} aria-hidden="true" />
                  </span>
                  <span className="font-medium text-ink transition-colors group-hover:text-brand-700">
                    {contact.landline}
                  </span>
                </a>
                <a
                  href={contact.whatsappHref}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center gap-4"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-brand-600 shadow-sm ring-1 ring-[#D9EAF7] transition-colors duration-300 group-hover:bg-brand-600 group-hover:text-white">
                    <MessageCircle size={19} aria-hidden="true" />
                  </span>
                  <span className="font-medium text-ink transition-colors group-hover:text-brand-700">
                    WhatsApp / Cell {contact.mobile}
                  </span>
                </a>
                <a
                  href={contact.mapsHref}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-start gap-4"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-brand-600 shadow-sm ring-1 ring-[#D9EAF7] transition-colors duration-300 group-hover:bg-brand-600 group-hover:text-white">
                    <MapPin size={19} aria-hidden="true" />
                  </span>
                  <span className="font-medium text-ink transition-colors group-hover:text-brand-700">
                    {contact.addressLines[0]}
                    <br />
                    {contact.addressLines[1]}
                    <br />
                    {contact.addressLines[2]}
                  </span>
                </a>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <div className="glass-card rounded-2xl p-6 shadow-[0_28px_56px_-24px_rgb(11_46_89_/_0.16)] sm:p-8 md:p-10">
              <form onSubmit={handleSubmit} onInput={clearFieldValidity} className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="contact-name" className="mb-1.5 block text-sm font-semibold text-ink">
                      Full Name
                    </label>
                    <input id="contact-name" name="name" required placeholder="Your name" className={inputClasses} />
                  </div>
                  <div>
                    <label htmlFor="contact-business" className="mb-1.5 block text-sm font-semibold text-ink">
                      Business Name
                    </label>
                    <input id="contact-business" name="business" placeholder="Your company" className={inputClasses} />
                  </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="contact-email" className="mb-1.5 block text-sm font-semibold text-ink">
                      Email
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      required
                      placeholder="you@company.com"
                      className={inputClasses}
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-phone" className="mb-1.5 block text-sm font-semibold text-ink">
                      Phone
                    </label>
                    <input
                      id="contact-phone"
                      name="phone"
                      type="tel"
                      required
                      placeholder="+1"
                      className={inputClasses}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-service" className="mb-1.5 block text-sm font-semibold text-ink">
                    Service Needed
                  </label>
                  <select id="contact-service" name="service" required defaultValue="" className={inputClasses}>
                    <option value="" disabled>
                      Select a service
                    </option>
                    {contactServiceOptions.map((service) => (
                      <option key={service} value={service}>
                        {service}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="contact-message" className="mb-1.5 block text-sm font-semibold text-ink">
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={4}
                    required
                    placeholder="Tell us a bit about your business and what you need help with"
                    className={inputClasses}
                  />
                </div>

                <button
                  type="submit"
                  disabled={preparing}
                  aria-busy={preparing}
                  className="w-full rounded-full bg-brand-600 px-8 py-4 font-semibold text-white shadow-[0_8px_28px_-8px_rgb(22_131_232_/_0.45)] transition-all duration-300 hover:bg-brand-700 hover:shadow-[0_14px_36px_-8px_rgb(22_131_232_/_0.5)] disabled:pointer-events-none disabled:opacity-80"
                >
                  {preparing ? 'Preparing...' : 'Book a Consultation'}
                </button>
              </form>
            </div>
            {links ? <ConsultationReadyPanel links={links} onClose={closePanel} /> : null}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
