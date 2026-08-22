import React, { useState } from 'react';
import {
  ResponsiveContainer,
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend
} from 'recharts';
import { REVENUE_TREND_DATA } from '../../data/mockData';
import { TrendingUp, DollarSign } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export const RevenueChart: React.FC = () => {
  const { theme } = useTheme();
  const [viewMode, setViewMode] = useState<'all' | 'revenue' | 'adSpend'>('all');

  const isDark = theme === 'dark';
  const gridColor = isDark ? '#1e293b' : '#f1f5f9';
  const textMuted = isDark ? '#94a3b8' : '#64748b';

  return (
    <div className="bg-card-light dark:bg-card-dark rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800/80 shadow-card">
      {/* Header & Filter Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <DollarSign className="w-4 h-4" />
            </span>
            <h3 className="text-base font-bold text-slate-900 dark:text-white font-outfit">
              Revenue & Ad Sales Pipeline Trend
            </h3>
          </div>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            Monthly closed revenue against targets and ad spend efficiency ($ in thousands).
          </p>
        </div>

        {/* View mode toggle */}
        <div className="flex items-center bg-slate-100 dark:bg-slate-800/80 p-1 rounded-xl text-xs font-semibold">
          <button
            onClick={() => setViewMode('all')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              viewMode === 'all'
                ? 'bg-white dark:bg-card-dark text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Combined
          </button>
          <button
            onClick={() => setViewMode('revenue')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              viewMode === 'revenue'
                ? 'bg-white dark:bg-card-dark text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Revenue
          </button>
          <button
            onClick={() => setViewMode('adSpend')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              viewMode === 'adSpend'
                ? 'bg-white dark:bg-card-dark text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Ad Spend
          </button>
        </div>
      </div>

      {/* Chart */}
      <div className="mt-6 h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={REVENUE_TREND_DATA}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
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
              tickFormatter={val => `$${val}k`}
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
              formatter={(value: any, name: string) => [
                `$${value}k`,
                name === 'actualRevenue'
                  ? 'Closed Revenue'
                  : name === 'targetRevenue'
                  ? 'Revenue Target'
                  : name === 'adSpend'
                  ? 'Ad Spend'
                  : 'Pipeline Value'
              ]}
            />
            <Legend
              wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }}
              formatter={value =>
                value === 'actualRevenue'
                  ? 'Closed Revenue'
                  : value === 'targetRevenue'
                  ? 'Sales Target'
                  : value === 'adSpend'
                  ? 'Paid Ad Spend'
                  : 'Active Pipeline'
              }
            />

            {(viewMode === 'all' || viewMode === 'revenue') && (
              <Bar
                dataKey="actualRevenue"
                fill="#6366f1"
                radius={[6, 6, 0, 0]}
                barSize={24}
              />
            )}

            {(viewMode === 'all' || viewMode === 'adSpend') && (
              <Bar
                dataKey="adSpend"
                fill="#f59e0b"
                radius={[6, 6, 0, 0]}
                barSize={18}
              />
            )}

            {(viewMode === 'all' || viewMode === 'revenue') && (
              <Line
                type="monotone"
                dataKey="targetRevenue"
                stroke="#10b981"
                strokeWidth={2.5}
                strokeDasharray="4 4"
                dot={{ r: 3, fill: '#10b981' }}
              />
            )}
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* Footer Highlights */}
      <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 grid grid-cols-3 gap-2 text-center">
        <div>
          <span className="text-[10px] uppercase font-bold text-slate-400">Total YTD Revenue</span>
          <p className="text-sm sm:text-base font-bold text-slate-900 dark:text-white font-outfit">$3.49M</p>
        </div>
        <div>
          <span className="text-[10px] uppercase font-bold text-slate-400">Total Ad Spend</span>
          <p className="text-sm sm:text-base font-bold text-amber-600 dark:text-amber-400 font-outfit">$613K</p>
        </div>
        <div>
          <span className="text-[10px] uppercase font-bold text-slate-400">Blended ROAS</span>
          <p className="text-sm sm:text-base font-bold text-emerald-600 dark:text-emerald-400 font-outfit">5.7x</p>
        </div>
      </div>
    </div>
  );
};
