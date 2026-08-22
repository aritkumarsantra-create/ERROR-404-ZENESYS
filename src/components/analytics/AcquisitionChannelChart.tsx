import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend
} from 'recharts';
import { useTheme } from '../../context/ThemeContext';
import { Megaphone, TrendingUp } from 'lucide-react';

export const AcquisitionChannelChart: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const gridColor = isDark ? '#1e293b' : '#f1f5f9';
  const textMuted = isDark ? '#94a3b8' : '#64748b';

  const channelData = [
    { channel: 'Google Search Ads', leads: 1540, deals: 420, revenue: 724 },
    { channel: 'LinkedIn InMail', leads: 980, deals: 310, revenue: 554 },
    { channel: 'Meta Lookalike', leads: 1020, deals: 240, revenue: 256 },
    { channel: 'YouTube Video', leads: 302, deals: 72, revenue: 65 },
    { channel: 'Organic & Direct', leads: 820, deals: 190, revenue: 380 },
  ];

  return (
    <div className="bg-card-light dark:bg-card-dark rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800/80 shadow-card">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-brand-500/10 text-brand-600 dark:text-brand-400">
              <Megaphone className="w-4 h-4" />
            </span>
            <h3 className="text-base font-bold text-slate-900 dark:text-white font-outfit">
              Customer Acquisition by Ad Channel
            </h3>
          </div>
          <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
            Comparing Lead generation volume vs. Won Closed Deals by acquisition channel.
          </p>
        </div>
      </div>

      <div className="mt-6 h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={channelData}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
            <XAxis
              dataKey="channel"
              tickLine={false}
              stroke={textMuted}
              fontSize={11}
              dy={5}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              stroke={textMuted}
              fontSize={12}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: isDark ? '#0f172a' : '#ffffff',
                borderColor: isDark ? '#334155' : '#e2e8f0',
                borderRadius: '1rem',
                color: isDark ? '#f8fafc' : '#0f172a',
                fontSize: '12px'
              }}
            />
            <Legend
              wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }}
              formatter={value => (value === 'leads' ? 'Total Generated Leads' : 'Closed Deals Won')}
            />
            <Bar dataKey="leads" fill="#6366f1" radius={[4, 4, 0, 0]} barSize={20} />
            <Bar dataKey="deals" fill="#10b981" radius={[4, 4, 0, 0]} barSize={20} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
