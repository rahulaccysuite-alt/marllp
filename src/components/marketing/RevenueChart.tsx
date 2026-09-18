'use client';

import { motion, useReducedMotion } from 'motion/react';
import { Area, AreaChart, ResponsiveContainer, XAxis } from 'recharts';
import { illustrativeMonths } from '@/data/dashboard';

interface RevenueChartProps {
  reduceMotion?: boolean | null;
  variant?: 'revenue' | 'expense';
  replayKey?: string | number;
}

const easeOut = [0.22, 1, 0.36, 1] as const;

export function RevenueChart({ reduceMotion, variant = 'revenue', replayKey = 'idle' }: RevenueChartProps) {
  const isExpense = variant === 'expense';
  const data = illustrativeMonths.map((item) => ({
    month: item.month,
    value: isExpense ? item.expenses : item.revenue,
  }));
  const gradientId = isExpense ? 'whyExpenseGradient' : 'whyRevenueGradient';
  const color = isExpense ? '#AED9F7' : '#4FA8ED';

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data} margin={{ top: 4, right: 4, bottom: 0, left: 4 }}>
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2E97EF" stopOpacity={isExpense ? 0.28 : 0.45} />
            <stop offset="100%" stopColor="#2E97EF" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis
          dataKey="month"
          axisLine={false}
          tickLine={false}
          tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 10 }}
        />
        <Area
          key={`${variant}-${replayKey}`}
          type="monotone"
          dataKey="value"
          stroke={color}
          strokeWidth={2.5}
          fill={`url(#${gradientId})`}
          isAnimationActive={!reduceMotion}
          animationDuration={900}
          animationEasing="ease-out"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export function MiniBarChart({
  selectedMonth,
  replayKey = 'idle',
}: {
  selectedMonth: string;
  replayKey?: string | number;
}) {
  const reduceMotion = useReducedMotion();
  const max = Math.max(...illustrativeMonths.map((item) => item.revenue));

  return (
    <div className="flex h-16 items-end gap-1.5" aria-hidden="true">
      {illustrativeMonths.map((item, index) => {
        const active = item.month === selectedMonth;
        const height = `${Math.max(18, (item.revenue / max) * 100)}%`;
        return (
          <div key={item.month} className="flex flex-1 flex-col items-center gap-1">
            <motion.div
              key={`${item.month}-${replayKey}`}
              className={`w-full origin-bottom rounded-sm ${active ? 'bg-brand-400' : 'bg-white/15'}`}
              initial={reduceMotion ? false : { scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 0.5, delay: 0.05 * index, ease: easeOut }}
              style={{ height }}
            />
            <span className={`text-[9px] ${active ? 'text-white' : 'text-white/35'}`}>{item.month}</span>
          </div>
        );
      })}
    </div>
  );
}
