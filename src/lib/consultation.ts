import { contact } from '@/lib/contact';

export type ConsultationDetails = {
  fullName: string;
  businessName: string;
  email: string;
  phone: string;
  serviceNeeded: string;
  message: string;
};

export type ConsultationLinks = {
  mailtoUrl: string;
  whatsappUrl: string;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidConsultationEmail(email: string): boolean {
  return EMAIL_PATTERN.test(email);
}

export function readConsultationDetails(form: HTMLFormElement): ConsultationDetails {
  const data = new FormData(form);

  return {
    fullName: String(data.get('name') ?? '').trim(),
    businessName: String(data.get('business') ?? '').trim(),
    email: String(data.get('email') ?? '').trim(),
    phone: String(data.get('phone') ?? '').trim(),
    serviceNeeded: String(data.get('service') ?? '').trim(),
    message: String(data.get('message') ?? '').trim(),
  };
}

export function writeConsultationDetails(form: HTMLFormElement, details: ConsultationDetails) {
  const assign = (name: string, value: string) => {
    const field = form.elements.namedItem(name);
    if (
      field instanceof HTMLInputElement ||
      field instanceof HTMLTextAreaElement ||
      field instanceof HTMLSelectElement
    ) {
      field.value = value;
    }
  };

  assign('name', details.fullName);
  assign('business', details.businessName);
  assign('email', details.email);
  assign('phone', details.phone);
  assign('service', details.serviceNeeded);
  assign('message', details.message);
}

function field(form: HTMLFormElement, name: string) {
  return form.elements.namedItem(name) as
    | HTMLInputElement
    | HTMLTextAreaElement
    | HTMLSelectElement
    | null;
}

export function validateConsultationForm(
  form: HTMLFormElement,
  details: ConsultationDetails,
): boolean {
  const nameField = field(form, 'name');
  const emailField = field(form, 'email');
  const phoneField = field(form, 'phone');
  const serviceField = field(form, 'service');
  const messageField = field(form, 'message');

  nameField?.setCustomValidity(details.fullName ? '' : 'Please enter your full name.');
  emailField?.setCustomValidity(
    !details.email
      ? 'Please enter your email.'
      : isValidConsultationEmail(details.email)
        ? ''
        : 'Please enter a valid email address.',
  );
  phoneField?.setCustomValidity(details.phone ? '' : 'Please enter your phone number.');
  serviceField?.setCustomValidity(details.serviceNeeded ? '' : 'Please select a service.');
  messageField?.setCustomValidity(details.message ? '' : 'Please enter a message.');

  if (!form.checkValidity()) {
    form.reportValidity();
    return false;
  }

  return true;
}

export function buildConsultationEmailBody(details: ConsultationDetails): string {
  return `MAR LLP — New Consultation Request

Full Name: ${details.fullName}
Business Name: ${details.businessName}
Email: ${details.email}
Phone: ${details.phone}
Service Needed: ${details.serviceNeeded}

Message:
${details.message}

Sent from MAR LLP Contact Form`;
}

export function buildConsultationWhatsAppMessage(details: ConsultationDetails): string {
  return `Hello MAR LLP,

I would like to book a consultation.

Here are my details:

Full Name: ${details.fullName}
Business Name: ${details.businessName}
Email: ${details.email}
Phone: ${details.phone}
Service Needed: ${details.serviceNeeded}

Message:

${details.message}

Thank you.`;
}

export function buildConsultationLinks(details: ConsultationDetails): ConsultationLinks {
  const subject = encodeURIComponent('New Consultation Request — MAR LLP');
  const body = encodeURIComponent(buildConsultationEmailBody(details));
  const whatsappText = encodeURIComponent(buildConsultationWhatsAppMessage(details));

  return {
    mailtoUrl: `mailto:${contact.email}?subject=${subject}&body=${body}`,
    whatsappUrl: `${contact.whatsappHref}?text=${whatsappText}`,
  };
}

export function tryOpenConsultationChannels(links: ConsultationLinks) {
  const emailLink = document.createElement('a');
  emailLink.href = links.mailtoUrl;
  emailLink.rel = 'noopener noreferrer';
  emailLink.click();

  window.open(links.whatsappUrl, '_blank', 'noopener,noreferrer');
}
