import React from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';
import { LEAD_DISTRIBUTION_DATA } from '../../data/mockData';
import { Flame, Sun, Snowflake, Target } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export const LeadDistributionChart: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const totalLeads = LEAD_DISTRIBUTION_DATA.reduce((acc, curr) => acc + curr.count, 0);

  return (
    <div className="bg-card-light dark:bg-card-dark rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800/80 shadow-card flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <Target className="w-4 h-4" />
            </span>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white font-outfit">
                Lead Score Distribution
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Segmented by AI lead qualification confidence
              </p>
            </div>
          </div>
        </div>

        {/* Donut Chart with Center Stat */}
        <div className="relative mt-4 h-56 flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={LEAD_DISTRIBUTION_DATA}
                cx="50%"
                cy="50%"
                innerRadius={65}
                outerRadius={88}
                paddingAngle={5}
                dataKey="count"
              >
                {LEAD_DISTRIBUTION_DATA.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: isDark ? '#0f172a' : '#ffffff',
                  borderColor: isDark ? '#334155' : '#e2e8f0',
                  borderRadius: '1rem',
                  color: isDark ? '#f8fafc' : '#0f172a',
                  fontSize: '12px'
                }}
                formatter={(value: any, name: any, item: any) => [
                  `${value.toLocaleString()} leads (${item.payload.percentage}%)`,
                  item.payload.tier
                ]}
              />
            </PieChart>
          </ResponsiveContainer>

          {/* Donut Center Counter */}
          <div className="absolute flex flex-col items-center justify-center text-center pointer-events-none">
            <span className="text-2xl font-black text-slate-900 dark:text-white font-outfit">
              {totalLeads.toLocaleString()}
            </span>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Total Leads
            </span>
          </div>
        </div>
      </div>

      {/* Legend & Win Probabilities */}
      <div className="mt-4 space-y-2.5 pt-4 border-t border-slate-100 dark:border-slate-800">
        {LEAD_DISTRIBUTION_DATA.map((item, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between p-2 rounded-xl bg-slate-50 dark:bg-slate-800/50 text-xs"
          >
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
              <span className="font-semibold text-slate-800 dark:text-slate-200">
                {item.tier}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-slate-500 dark:text-slate-400 font-medium">
                {item.count.toLocaleString()} ({item.percentage}%)
              </span>
              <span className="font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                {item.conversionRate}% conv.
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
