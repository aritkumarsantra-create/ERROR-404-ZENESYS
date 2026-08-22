import React from 'react';
import { ArrowUpRight, ArrowDownRight, Users, Zap, Target, DollarSign, TrendingUp, Sparkles } from 'lucide-react';
import { ResponsiveContainer, LineChart, Line } from 'recharts';

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  period?: string;
  iconName?: string;
  sparkline?: number[];
  secondaryText?: string;
  accentColor?: 'indigo' | 'emerald' | 'amber' | 'rose' | 'purple';
}

const iconMap: Record<string, React.ReactNode> = {
  Users: <Users className="w-5 h-5" />,
  Zap: <Zap className="w-5 h-5" />,
  Target: <Target className="w-5 h-5" />,
  DollarSign: <DollarSign className="w-5 h-5" />,
  TrendingUp: <TrendingUp className="w-5 h-5" />,
  Sparkles: <Sparkles className="w-5 h-5" />,
};

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  change,
  isPositive,
  period = 'vs last month',
  iconName = 'TrendingUp',
  sparkline = [10, 20, 15, 25, 30, 28, 40],
  secondaryText,
  accentColor = 'indigo'
}) => {
  const chartData = sparkline.map((val, idx) => ({ index: idx, value: val }));

  const colorStyles = {
    indigo: 'from-indigo-500/10 to-indigo-500/0 text-indigo-600 dark:text-indigo-400 border-indigo-500/20',
    emerald: 'from-emerald-500/10 to-emerald-500/0 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
    amber: 'from-amber-500/10 to-amber-500/0 text-amber-600 dark:text-amber-400 border-amber-500/20',
    rose: 'from-rose-500/10 to-rose-500/0 text-rose-600 dark:text-rose-400 border-rose-500/20',
    purple: 'from-purple-500/10 to-purple-500/0 text-purple-600 dark:text-purple-400 border-purple-500/20',
  };

  const sparklineStroke = isPositive ? '#10b981' : '#f43f5e';

  return (
    <div className="relative overflow-hidden bg-card-light dark:bg-card-dark rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800/80 shadow-card hover-elevate group cursor-default">
      {/* Subtle top gradient glow */}
      <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${
        accentColor === 'emerald' ? 'from-emerald-500 to-teal-400' :
        accentColor === 'amber' ? 'from-amber-500 to-orange-400' :
        accentColor === 'rose' ? 'from-rose-500 to-pink-400' :
        accentColor === 'purple' ? 'from-purple-500 to-indigo-400' :
        'from-indigo-500 to-cyan-400'
      } group-hover:h-1.5 transition-all duration-300`} />

      <div className="flex items-start justify-between">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 group-hover:text-brand-500 transition-colors">
            {title}
          </span>
          <div className="mt-2 text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white font-outfit group-hover:translate-x-0.5 transition-transform">
            {value}
          </div>
        </div>

        <div className={`p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800/80 border ${colorStyles[accentColor]} transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 shadow-xs`}>
          {iconMap[iconName] || <TrendingUp className="w-5 h-5" />}
        </div>
      </div>

      {/* Sparkline & Sub-metrics */}
      <div className="mt-4 flex items-end justify-between gap-2">
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 text-xs font-semibold">
            <span
              className={`inline-flex items-center px-1.5 py-0.5 rounded-md ${
                isPositive
                  ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                  : 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20'
              }`}
            >
              {isPositive ? <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" /> : <ArrowDownRight className="w-3.5 h-3.5 mr-0.5" />}
              {change}
            </span>
            <span className="text-slate-400 dark:text-slate-500 font-normal hidden sm:inline">{period}</span>
          </div>

          {secondaryText && (
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              {secondaryText}
            </p>
          )}
        </div>

        {/* Mini Sparkline Chart */}
        <div className="w-24 h-10 shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <Line
                type="monotone"
                dataKey="value"
                stroke={sparklineStroke}
                strokeWidth={2}
                dot={false}
                isAnimationActive={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
