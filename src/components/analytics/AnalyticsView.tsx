import React, { useState } from 'react';
import { AcquisitionChannelChart } from './AcquisitionChannelChart';
import { AdCampaignTable } from './AdCampaignTable';
import { RevenueChart } from '../dashboard/RevenueChart';
import { SkeletonChart, SkeletonCard } from '../common/SkeletonLoader';
import { useCustomer } from '../../context/CustomerContext';
import { useAI } from '../../context/AIContext';
import { BarChart3, TrendingUp, DollarSign, Target, Calendar, Sparkles } from 'lucide-react';

export const AnalyticsView: React.FC = () => {
  const { isLoadingDemo } = useCustomer();
  const { openAdOptimizer } = useAI();
  const [timeframe, setTimeframe] = useState<'7D' | '30D' | '90D' | '1Y'>('30D');

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Top Banner & Timeframe Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-gradient-to-r from-brand-700 via-indigo-700 to-cyan-800 text-white shadow-glow-indigo">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-white/20">
              <BarChart3 className="w-4 h-4" />
            </span>
            <h2 className="text-lg font-bold font-outfit">
              Ad Attribution & Multi-Touch Revenue Analytics
            </h2>
          </div>
          <p className="text-xs text-indigo-100 mt-1">
            End-to-end ROAS analysis connecting ad spend to closed sales pipeline revenue.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 self-start sm:self-center">
          {/* AI Ad Spend Optimizer Button */}
          <button
            onClick={openAdOptimizer}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-bold rounded-xl bg-white text-brand-700 hover:bg-white/90 shadow-md transition-all active:scale-95 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-brand-600" />
            <span>AI Budget Optimizer</span>
          </button>

          {/* Timeframe selector */}
          <div className="flex items-center bg-white/10 backdrop-blur-md p-1 rounded-xl border border-white/20">
            {(['7D', '30D', '90D', '1Y'] as const).map(tf => (
              <button
                key={tf}
                onClick={() => setTimeframe(tf)}
                className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${
                  timeframe === tf
                    ? 'bg-white text-brand-700 shadow-sm'
                    : 'text-white/80 hover:text-white'
                }`}
              >
                {tf}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Analytics Aggregate Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 stagger-1">
        <div className="p-4 rounded-2xl bg-card-light dark:bg-card-dark border border-slate-200/80 dark:border-slate-800/80 shadow-card hover-elevate">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Total Ad Spend</span>
          <div className="text-xl font-black text-slate-900 dark:text-white font-outfit mt-1">$342,000</div>
          <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">+14.2% MoM</span>
        </div>

        <div className="p-4 rounded-2xl bg-card-light dark:bg-card-dark border border-slate-200/80 dark:border-slate-800/80 shadow-card hover-elevate">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Attributed Closed Sales</span>
          <div className="text-xl font-black text-emerald-600 dark:text-emerald-400 font-outfit mt-1">$1.57M</div>
          <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">+26.4% YoY</span>
        </div>

        <div className="p-4 rounded-2xl bg-card-light dark:bg-card-dark border border-slate-200/80 dark:border-slate-800/80 shadow-card hover-elevate">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Blended ROAS</span>
          <div className="text-xl font-black text-brand-600 dark:text-brand-400 font-outfit mt-1">4.6x Return</div>
          <span className="text-[11px] text-slate-400">Benchmark: 3.5x</span>
        </div>

        <div className="p-4 rounded-2xl bg-card-light dark:bg-card-dark border border-slate-200/80 dark:border-slate-800/80 shadow-card hover-elevate">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Average CAC</span>
          <div className="text-xl font-black text-slate-900 dark:text-white font-outfit mt-1">$89.10</div>
          <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">-18.5% Lower</span>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 stagger-2">
        <div className="lg:col-span-6">
          {isLoadingDemo ? <SkeletonChart /> : <RevenueChart />}
        </div>
        <div className="lg:col-span-6">
          {isLoadingDemo ? <SkeletonChart /> : <AcquisitionChannelChart />}
        </div>
      </div>

      {/* Campaigns Matrix Table */}
      <div className="stagger-3">
        {isLoadingDemo ? <SkeletonChart /> : <AdCampaignTable />}
      </div>
    </div>
  );
};
