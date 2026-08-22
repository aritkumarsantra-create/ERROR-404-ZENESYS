import React from 'react';
import { AD_PERFORMANCE_METRICS } from '../../data/mockData';
import { ArrowUpRight, Megaphone, TrendingUp, DollarSign, Target } from 'lucide-react';

export const AdPerformanceMatrix: React.FC = () => {
  return (
    <div className="bg-card-light dark:bg-card-dark rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800/80 shadow-card">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-600 dark:text-cyan-400">
              <Megaphone className="w-4 h-4" />
            </span>
            <h3 className="text-base font-bold text-slate-900 dark:text-white font-outfit">
              Ad Campaign & Channel Performance
            </h3>
          </div>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            Multi-platform ad spend, revenue generation, and return on ad spend (ROAS).
          </p>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {AD_PERFORMANCE_METRICS.map((metric, idx) => (
          <div
            key={idx}
            className="p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/40 hover:border-brand-500/40 transition-all group"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span
                  className="w-3 h-3 rounded-full shrink-0"
                  style={{ backgroundColor: metric.color }}
                />
                <span className="font-bold text-xs text-slate-900 dark:text-white">
                  {metric.platform}
                </span>
              </div>
              <span className="inline-flex items-center text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded">
                <ArrowUpRight className="w-3 h-3 mr-0.5" />+{metric.growth}%
              </span>
            </div>

            <div className="mt-4 space-y-2">
              <div className="flex justify-between items-baseline">
                <span className="text-xs text-slate-400">ROAS:</span>
                <span className="text-base font-bold text-emerald-600 dark:text-emerald-400 font-outfit">
                  {metric.roas}x
                </span>
              </div>

              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Ad Spend:</span>
                <span className="font-medium text-slate-700 dark:text-slate-300">
                  ${(metric.spend / 1000).toFixed(0)}k
                </span>
              </div>

              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Generated Sales:</span>
                <span className="font-bold text-slate-900 dark:text-white">
                  ${(metric.revenue / 1000).toFixed(0)}k
                </span>
              </div>

              <div className="flex justify-between text-xs pt-1 border-t border-slate-200/60 dark:border-slate-800">
                <span className="text-slate-400">Leads (CPL):</span>
                <span className="font-medium text-slate-700 dark:text-slate-300">
                  {metric.leads} (${metric.cpl.toFixed(0)})
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
