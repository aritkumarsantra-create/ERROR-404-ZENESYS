import React from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend
} from 'recharts';
import { CUSTOMER_GROWTH_DATA } from '../../data/mockData';
import { Users, TrendingUp } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export const CustomerGrowthChart: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const gridColor = isDark ? '#1e293b' : '#f1f5f9';
  const textMuted = isDark ? '#94a3b8' : '#64748b';

  return (
    <div className="bg-card-light dark:bg-card-dark rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800/80 shadow-card">
      <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
              <Users className="w-4 h-4" />
            </span>
            <h3 className="text-base font-bold text-slate-900 dark:text-white font-outfit">
              Customer Growth & Acquisition Channels
            </h3>
          </div>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            Monthly cumulative customer growth segmented by Paid Ad campaigns vs Organic discovery.
          </p>
        </div>
      </div>

      <div className="mt-6 h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={CUSTOMER_GROWTH_DATA}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorPaidAds" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0.0} />
              </linearGradient>
              <linearGradient id="colorOrganic" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              stroke={textMuted}
              fontSize={12}
              dy={5}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              stroke={textMuted}
              fontSize={12}
              tickFormatter={val => `${val / 1000}k`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: isDark ? '#0f172a' : '#ffffff',
                borderColor: isDark ? '#334155' : '#e2e8f0',
                borderRadius: '1rem',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.2)',
                color: isDark ? '#f8fafc' : '#0f172a',
                fontSize: '12px'
              }}
            />
            <Legend
              wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }}
              formatter={value =>
                value === 'totalCustomers'
                  ? 'Total Customers'
                  : value === 'paidAds'
                  ? 'Paid Ad Acquisition'
                  : 'Organic Acquisition'
              }
            />
            <Area
              type="monotone"
              dataKey="totalCustomers"
              stroke="#6366f1"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorPaidAds)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
        <span className="text-slate-500 dark:text-slate-400">Net Customer Churn: <strong>0.48%</strong></span>
        <span className="text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
          <TrendingUp className="w-3.5 h-3.5" /> +35.6% YoY Net Retention
        </span>
      </div>
    </div>
  );
};
