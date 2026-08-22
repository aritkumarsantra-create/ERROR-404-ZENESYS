import React from 'react';
import { AIInsight } from '../../types';
import { Sparkles, ArrowRight, TrendingUp, AlertTriangle, Clock, Zap } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

interface AIInsightsTabProps {
  insights: AIInsight[];
  customerName: string;
}

export const AIInsightsTab: React.FC<AIInsightsTabProps> = ({ insights, customerName }) => {
  const { success } = useToast();

  const getImpactBadge = (impact: 'High' | 'Medium' | 'Low') => {
    switch (impact) {
      case 'High':
        return 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20';
      case 'Medium':
        return 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20';
      case 'Low':
        return 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20';
    }
  };

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'opportunity':
        return <TrendingUp className="w-5 h-5 text-emerald-500" />;
      case 'risk':
        return <AlertTriangle className="w-5 h-5 text-rose-500" />;
      case 'timing':
        return <Clock className="w-5 h-5 text-amber-500" />;
      default:
        return <Zap className="w-5 h-5 text-brand-500" />;
    }
  };

  return (
    <div className="bg-card-light dark:bg-card-dark rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800/80 shadow-card space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <span className="p-1.5 rounded-lg bg-brand-500/10 text-brand-600 dark:text-brand-400">
            <Sparkles className="w-4 h-4" />
          </span>
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white font-outfit">
              AI Sales Intelligence & Next Best Actions
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Predictive recommendations calculated from ad engagement velocity and touchpoint recency.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {insights.map(insight => (
          <div
            key={insight.id}
            className="p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/40 hover:border-brand-500/40 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          >
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 shadow-xs shrink-0">
                {getInsightIcon(insight.type)}
              </div>
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white font-outfit">
                    {insight.title}
                  </h4>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${getImpactBadge(insight.impact)}`}>
                    {insight.impact} Impact
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed max-w-xl">
                  {insight.description}
                </p>
              </div>
            </div>

            {insight.actionLabel && (
              <button
                onClick={() => success('Action Executed', `Triggered "${insight.actionLabel}" for ${customerName}.`)}
                className="inline-flex items-center justify-center gap-2 px-4 py-2 text-xs font-bold rounded-xl bg-brand-600 hover:bg-brand-500 text-white shadow-sm transition-all active:scale-95 shrink-0"
              >
                <span>{insight.actionLabel}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
