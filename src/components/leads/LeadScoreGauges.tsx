import React from 'react';
import { Flame, Sun, Snowflake, TrendingUp, Sparkles, Target, Zap } from 'lucide-react';
import { LEAD_DISTRIBUTION_DATA } from '../../data/mockData';

export const LeadScoreGauges: React.FC = () => {
  const hotData = LEAD_DISTRIBUTION_DATA[0];
  const warmData = LEAD_DISTRIBUTION_DATA[1];
  const coldData = LEAD_DISTRIBUTION_DATA[2];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Hot Leads Card */}
      <div className="relative overflow-hidden rounded-2xl bg-card-light dark:bg-card-dark border border-emerald-500/30 p-6 shadow-card hover:shadow-glow-emerald transition-all group">
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                <Flame className="w-5 h-5 text-emerald-500" />
              </span>
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white font-outfit">
                  Hot Tier Leads
                </h4>
                <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                  Score Range: 80 - 100
                </span>
              </div>
            </div>

            <div className="mt-4">
              <div className="text-3xl font-black text-slate-900 dark:text-white font-outfit">
                {hotData.count.toLocaleString()}
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                {hotData.percentage}% of active pipeline
              </p>
            </div>
          </div>

          <div className="text-right">
            <span className="text-[10px] uppercase font-bold text-slate-400">Win Rate</span>
            <div className="text-lg font-black text-emerald-600 dark:text-emerald-400 font-outfit">
              {hotData.conversionRate}%
            </div>
          </div>
        </div>

        {/* Visual Progress Gauge */}
        <div className="mt-4 space-y-1.5">
          <div className="flex justify-between text-[11px] font-semibold text-slate-600 dark:text-slate-300">
            <span>High Intent Readiness</span>
            <span className="text-emerald-600 dark:text-emerald-400 font-bold">Priority Tier</span>
          </div>
          <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden p-0.5">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-700 shadow-glow-emerald"
              style={{ width: `${hotData.percentage * 2}%` }}
            />
          </div>
        </div>
      </div>

      {/* Warm Leads Card */}
      <div className="relative overflow-hidden rounded-2xl bg-card-light dark:bg-card-dark border border-amber-500/30 p-6 shadow-card hover:shadow-glow-amber transition-all group">
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                <Sun className="w-5 h-5 text-amber-500" />
              </span>
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white font-outfit">
                  Warm Tier Leads
                </h4>
                <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400">
                  Score Range: 50 - 79
                </span>
              </div>
            </div>

            <div className="mt-4">
              <div className="text-3xl font-black text-slate-900 dark:text-white font-outfit">
                {warmData.count.toLocaleString()}
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                {warmData.percentage}% of active pipeline
              </p>
            </div>
          </div>

          <div className="text-right">
            <span className="text-[10px] uppercase font-bold text-slate-400">Win Rate</span>
            <div className="text-lg font-black text-amber-600 dark:text-amber-400 font-outfit">
              {warmData.conversionRate}%
            </div>
          </div>
        </div>

        {/* Visual Progress Gauge */}
        <div className="mt-4 space-y-1.5">
          <div className="flex justify-between text-[11px] font-semibold text-slate-600 dark:text-slate-300">
            <span>Nurture & Mid-Funnel</span>
            <span className="text-amber-600 dark:text-amber-400 font-bold">Nurture Flow</span>
          </div>
          <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden p-0.5">
            <div
              className="h-full bg-gradient-to-r from-amber-500 to-orange-400 rounded-full transition-all duration-700"
              style={{ width: `${warmData.percentage * 1.8}%` }}
            />
          </div>
        </div>
      </div>

      {/* Cold Leads Card */}
      <div className="relative overflow-hidden rounded-2xl bg-card-light dark:bg-card-dark border border-rose-500/30 p-6 shadow-card hover:shadow-glow-rose transition-all group">
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-rose-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20">
                <Snowflake className="w-5 h-5 text-rose-500" />
              </span>
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white font-outfit">
                  Cold Tier Leads
                </h4>
                <span className="text-[10px] font-bold text-rose-600 dark:text-rose-400">
                  Score Range: &lt; 50
                </span>
              </div>
            </div>

            <div className="mt-4">
              <div className="text-3xl font-black text-slate-900 dark:text-white font-outfit">
                {coldData.count.toLocaleString()}
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                {coldData.percentage}% of active pipeline
              </p>
            </div>
          </div>

          <div className="text-right">
            <span className="text-[10px] uppercase font-bold text-slate-400">Win Rate</span>
            <div className="text-lg font-black text-rose-600 dark:text-rose-400 font-outfit">
              {coldData.conversionRate}%
            </div>
          </div>
        </div>

        {/* Visual Progress Gauge */}
        <div className="mt-4 space-y-1.5">
          <div className="flex justify-between text-[11px] font-semibold text-slate-600 dark:text-slate-300">
            <span>Automated Retargeting</span>
            <span className="text-rose-600 dark:text-rose-400 font-bold">Low Intent</span>
          </div>
          <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden p-0.5">
            <div
              className="h-full bg-gradient-to-r from-rose-500 to-red-400 rounded-full transition-all duration-700"
              style={{ width: `${coldData.percentage * 2}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
