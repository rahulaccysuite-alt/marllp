export type TrustStat = {
  icon: 'calendar' | 'users' | 'map' | 'focus';
  label: string;
  value?: number;
  suffix?: string;
  decimals?: number;
  display?: string;
};

export const trustStats: TrustStat[] = [
  {
    value: 15,
    suffix: '+',
    label: 'Years of Professional Experience',
    decimals: 0,
    icon: 'calendar',
  },
  {
    value: 2,
    suffix: '',
    label: 'CPA Partners',
    decimals: 0,
    icon: 'users',
  },
  {
    display: 'Canada',
    label: 'Professional Accounting & Tax Services',
    icon: 'map',
  },
  {
    display: 'Client Focused',
    label: 'Practical & Personalized Advice',
    icon: 'focus',
  },
];
