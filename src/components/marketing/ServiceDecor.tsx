import type { JSX } from 'react';
import { cn } from '@/lib/utils';

function LedgerDecor() {
  return (
    <svg viewBox="0 0 120 88" className="h-full w-full" aria-hidden="true">
      <rect x="14" y="10" width="92" height="68" rx="8" fill="#F5FAFF" />
      <rect x="22" y="22" width="56" height="3" rx="1.5" fill="#AED9F7" />
      <rect x="22" y="32" width="76" height="3" rx="1.5" fill="#D9EAF7" />
      <rect x="22" y="42" width="48" height="3" rx="1.5" fill="#AED9F7" />
      <rect x="22" y="52" width="68" height="3" rx="1.5" fill="#D9EAF7" />
      <rect x="22" y="62" width="40" height="3" rx="1.5" fill="#4FA8ED" />
    </svg>
  );
}

function DocumentStackDecor() {
  return (
    <svg viewBox="0 0 120 88" className="h-full w-full" aria-hidden="true">
      <rect x="28" y="28" width="64" height="48" rx="6" fill="#EAF6FF" transform="rotate(-8 60 52)" />
      <rect x="32" y="20" width="64" height="48" rx="6" fill="#D9EAF7" transform="rotate(-3 64 44)" />
      <rect x="36" y="14" width="64" height="48" rx="6" fill="white" stroke="#AED9F7" />
      <rect x="46" y="26" width="36" height="3" rx="1.5" fill="#4FA8ED" />
      <rect x="46" y="34" width="28" height="3" rx="1.5" fill="#D9EAF7" />
      <rect x="46" y="42" width="32" height="3" rx="1.5" fill="#D9EAF7" />
    </svg>
  );
}

function ComplianceRingDecor() {
  return (
    <svg viewBox="0 0 120 88" className="h-full w-full" aria-hidden="true">
      <circle cx="60" cy="44" r="28" fill="none" stroke="#EAF6FF" strokeWidth="8" />
      <circle
        cx="60"
        cy="44"
        r="28"
        fill="none"
        stroke="#1683E8"
        strokeWidth="8"
        strokeLinecap="round"
        strokeDasharray="150 176"
        transform="rotate(-90 60 44)"
      />
      <text x="60" y="49" textAnchor="middle" fill="#0B2E59" fontSize="14" fontWeight="700">
        98
      </text>
    </svg>
  );
}

function AvatarsDecor() {
  return (
    <svg viewBox="0 0 120 88" className="h-full w-full" aria-hidden="true">
      <circle cx="44" cy="40" r="16" fill="#EAF6FF" />
      <circle cx="44" cy="35" r="6" fill="#4FA8ED" />
      <path d="M32 52c2-8 22-8 24 0" fill="#AED9F7" />
      <circle cx="72" cy="44" r="14" fill="#F5FAFF" stroke="#D9EAF7" />
      <circle cx="72" cy="40" r="5" fill="#2E97EF" />
      <path d="M62 54c2-7 18-7 20 0" fill="#D9EAF7" />
      <circle cx="92" cy="38" r="12" fill="#FFFFFF" stroke="#AED9F7" />
    </svg>
  );
}

function ShieldDecor() {
  return (
    <svg viewBox="0 0 120 88" className="h-full w-full" aria-hidden="true">
      <path
        d="M60 12L90 24V44C90 62 76 74 60 80C44 74 30 62 30 44V24L60 12Z"
        fill="#F5FAFF"
        stroke="#AED9F7"
      />
      <path d="M48 44L56 52L74 34" fill="none" stroke="#1683E8" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function GraphDecor() {
  return (
    <svg viewBox="0 0 120 88" className="h-full w-full" aria-hidden="true">
      <path d="M16 64C32 64 36 48 48 46C60 44 64 28 80 26C96 24 100 16 112 14V76H16V64Z" fill="#F5FAFF" />
      <path d="M16 64C32 64 36 48 48 46C60 44 64 28 80 26C96 24 100 16 112 14" fill="none" stroke="#1683E8" strokeWidth="3" strokeLinecap="round" />
      <circle cx="80" cy="26" r="3.5" fill="#0B2E59" />
    </svg>
  );
}

const visuals: Record<string, () => JSX.Element> = {
  Bookkeeping: LedgerDecor,
  'Tax Filing': DocumentStackDecor,
  'GST Services': ComplianceRingDecor,
  Payroll: AvatarsDecor,
  Compliance: ShieldDecor,
  'Business Compliance': ShieldDecor,
  'Financial Advisory': GraphDecor,
  Accounting: LedgerDecor,
  'Corporate & Personal Tax': DocumentStackDecor,
  'Review Engagements': ShieldDecor,
};

export function ServiceDecor({ title, className }: { title: string; className?: string }) {
  const Visual = visuals[title];
  if (!Visual) return null;

  return (
    <div className={cn('pointer-events-none absolute -right-2 -top-1 h-24 w-32 opacity-80', className)} aria-hidden="true">
      <Visual />
    </div>
  );
}
