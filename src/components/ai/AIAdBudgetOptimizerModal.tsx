import React, { useState, useEffect } from 'react';
import {
  X,
  Sparkles,
  TrendingUp,
  DollarSign,
  ArrowRight,
  RefreshCw,
  CheckCircle2,
  Sliders,
  Layers,
  ArrowUpRight,
  ArrowDownRight,
  Lightbulb
} from 'lucide-react';
import { useAI } from '../../context/AIContext';
import { useToast } from '../../context/ToastContext';
import { aiService, AdOptimizationResult } from '../../services/aiService';
import { AD_PERFORMANCE_METRICS } from '../../data/mockData';

export const AIAdBudgetOptimizerModal: React.FC = () => {
  const { isAdOptimizerOpen, closeAdOptimizer } = useAI();
  const { success, info } = useToast();

  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<AdOptimizationResult | null>(null);

  useEffect(() => {
    if (isAdOptimizerOpen) {
      runOptimization();
    }
  }, [isAdOptimizerOpen]);

  const runOptimization = async () => {
    setIsLoading(true);
    info('AI Ad Optimization Engine', 'Analyzing cross-channel attribution data and marginal return curves...');
    try {
      const res = await aiService.optimizeAdBudget(AD_PERFORMANCE_METRICS);
      setResult(res);
      success('Optimization Complete', 'New multi-channel budget model synthesized.');
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isAdOptimizerOpen) return null;

  const handleApply = () => {
    success('Budget Allocation Published', 'Connected Google Ads & LinkedIn Campaign Managers updated with new bidding thresholds.');
    closeAdOptimizer();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-card-light dark:bg-card-dark w-full max-w-4xl max-h-[92vh] rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col overflow-hidden animate-slide-up">
        {/* Header */}
        <div className="p-6 border-b border-slate-200/80 dark:border-slate-800/80 flex items-center justify-between bg-gradient-to-r from-brand-900 via-indigo-900 to-cyan-900 text-white">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-white/10 text-white border border-white/20">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold font-outfit">
                  AI Ad Budget & ROAS Optimizer
                </h3>
                <span className="px-2 py-0.5 text-[10px] font-extrabold uppercase rounded bg-brand-500/20 text-brand-200 border border-brand-500/30">
                  Cross-Channel Intelligence
                </span>
              </div>
              <p className="text-xs text-indigo-200">
                Calculates marginal revenue returns across ad platforms and rebalances spend to maximize blended ROAS.
              </p>
            </div>
          </div>

          <button
            onClick={closeAdOptimizer}
            className="p-2 rounded-xl text-indigo-200 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-xs">
          {isLoading ? (
            <div className="py-16 flex flex-col items-center justify-center space-y-3">
              <div className="w-10 h-10 rounded-full border-4 border-brand-500/20 border-t-brand-500 animate-spin" />
              <p className="text-xs font-semibold text-slate-500">
                Running algorithmic ROAS regression across 4 platforms...
              </p>
            </div>
          ) : result ? (
            <>
              {/* Top Projected KPIs */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-gradient-to-br from-brand-500/10 to-indigo-500/5 border border-brand-500/20">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Projected Blended ROAS
                  </span>
                  <div className="text-2xl font-black text-brand-600 dark:text-brand-400 font-outfit mt-1">
                    {result.projectedBlendedROAS}x Return
                  </div>
                  <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1 mt-0.5">
                    <ArrowUpRight className="w-3.5 h-3.5" />
                    <span>+{(result.projectedBlendedROAS - result.currentBlendedROAS).toFixed(2)}x lift from {result.currentBlendedROAS}x</span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-teal-500/5 border border-emerald-500/20">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Projected Pipeline Revenue Lift
                  </span>
                  <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400 font-outfit mt-1">
                    +${result.projectedAnnualRevenueLift.toLocaleString()}
                  </div>
                  <span className="text-[11px] text-slate-500">
                    Annualized closed-won pipeline expansion
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-blue-500/5 border border-cyan-500/20">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Customer Acquisition Cost (CAC)
                  </span>
                  <div className="text-2xl font-black text-cyan-600 dark:text-cyan-400 font-outfit mt-1">
                    -{result.projectedCACDrop}%
                  </div>
                  <span className="text-[11px] text-slate-500">
                    Reduced waste on underperforming keywords
                  </span>
                </div>
              </div>

              {/* Platform Reallocation Table */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white font-outfit">
                    Platform Spend & ROAS Rebalance Breakdown
                  </h4>
                  <span className="text-[11px] text-slate-400">
                    Total Spend Budget: ${result.currentTotalSpend.toLocaleString()}
                  </span>
                </div>

                <div className="space-y-3">
                  {result.allocations.map((alloc, idx) => {
                    const isIncrease = alloc.shiftAmount >= 0;
                    return (
                      <div
                        key={idx}
                        className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 space-y-2.5"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <div className="flex items-center gap-2.5">
                            <span className="font-bold text-sm text-slate-900 dark:text-white font-outfit">
                              {alloc.platform}
                            </span>
                            <span
                              className={`px-2 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-1 ${
                                isIncrease
                                  ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                                  : 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20'
                              }`}
                            >
                              {isIncrease ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                              <span>{isIncrease ? `+$${alloc.shiftAmount.toLocaleString()}` : `-$${Math.abs(alloc.shiftAmount).toLocaleString()}`}</span>
                            </span>
                          </div>

                          <div className="flex items-center gap-4 text-right">
                            <div>
                              <span className="text-[10px] text-slate-400 block">Current &rarr; New Spend</span>
                              <span className="font-bold text-slate-900 dark:text-white">
                                ${alloc.currentSpend.toLocaleString()} &rarr; <strong className="text-brand-600 dark:text-brand-400">${alloc.recommendedSpend.toLocaleString()}</strong>
                              </span>
                            </div>
                            <div>
                              <span className="text-[10px] text-slate-400 block">Target ROAS</span>
                              <span className="font-extrabold text-emerald-600 dark:text-emerald-400">
                                {alloc.projectedROAS}x
                              </span>
                            </div>
                          </div>
                        </div>

                        <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed bg-white dark:bg-slate-800 p-2.5 rounded-xl border border-slate-200/60 dark:border-slate-700">
                          <strong>AI Rationale:</strong> {alloc.rational}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Strategic Insights Box */}
              <div className="p-4 rounded-2xl bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-200/80 dark:border-indigo-900/50 space-y-2">
                <div className="flex items-center gap-2 font-bold text-indigo-950 dark:text-indigo-200 text-xs">
                  <Lightbulb className="w-4 h-4 text-brand-500" />
                  <span>Strategic AI Insights & Growth Levers:</span>
                </div>
                <ul className="space-y-1.5 text-slate-700 dark:text-slate-300 text-[11px]">
                  {result.aiStrategicInsights.map((insight, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-brand-500 font-bold">•</span>
                      <span>{insight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </>
          ) : null}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-200/80 dark:border-slate-800/80 bg-slate-50 dark:bg-slate-900 flex items-center justify-between">
          <button
            onClick={closeAdOptimizer}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
          >
            Cancel
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={runOptimization}
              disabled={isLoading}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-semibold transition-colors"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
              <span>Recalculate</span>
            </button>

            <button
              onClick={handleApply}
              className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs shadow-md shadow-brand-500/20 transition-all active:scale-95 cursor-pointer"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Apply AI Budget Rebalancing</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
