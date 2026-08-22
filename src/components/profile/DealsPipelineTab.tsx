import React from 'react';
import { Deal } from '../../types';
import { Briefcase, CheckCircle2, Clock, Sparkles, DollarSign, ArrowRight } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

interface DealsPipelineTabProps {
  deals: Deal[];
  customerName: string;
}

export const DealsPipelineTab: React.FC<DealsPipelineTabProps> = ({ deals, customerName }) => {
  const { success } = useToast();

  if (deals.length === 0) {
    return (
      <div className="p-8 text-center bg-card-light dark:bg-card-dark rounded-2xl border border-slate-200/80 dark:border-slate-800">
        <Briefcase className="w-8 h-8 text-slate-400 mx-auto mb-2" />
        <h4 className="text-sm font-bold text-slate-900 dark:text-white font-outfit">
          No Active Opportunities
        </h4>
        <p className="text-xs text-slate-400 mt-1">
          Create a new expansion opportunity or pilot deal for {customerName}.
        </p>
      </div>
    );
  }

  const stages = ['Qualification', 'Proposal', 'Negotiation', 'Closed Won'];

  return (
    <div className="bg-card-light dark:bg-card-dark rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800/80 shadow-card space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white font-outfit">
            Sales Opportunities & Deal Flow
          </h3>
          <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
            Track deal stages, closing probabilities, and ad attribution sources.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {deals.map(deal => {
          const currentStageIndex = stages.indexOf(deal.stage);

          return (
            <div
              key={deal.id}
              className="p-5 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/40 space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white font-outfit">
                    {deal.title}
                  </h4>
                  <div className="text-xs text-slate-500 dark:text-slate-400">
                    Source: <strong className="text-brand-600 dark:text-brand-400">{deal.adSource}</strong> • Target Close: {deal.closeDate}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <span className="text-xs text-slate-400">Deal Value</span>
                    <div className="text-base font-black text-slate-900 dark:text-white font-outfit">
                      ${deal.value.toLocaleString()}
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                    {deal.probability}% Win Odds
                  </span>
                </div>
              </div>

              {/* Visual Deal Stages Progress */}
              <div className="pt-2">
                <div className="grid grid-cols-4 gap-2 text-center text-[10px] font-bold uppercase">
                  {stages.map((stageName, idx) => {
                    const isPassed = idx <= currentStageIndex;
                    const isCurrent = idx === currentStageIndex;

                    return (
                      <div key={idx} className="space-y-1">
                        <div
                          className={`h-2 rounded-full transition-all ${
                            isCurrent
                              ? 'bg-brand-600 shadow-glow-indigo'
                              : isPassed
                              ? 'bg-emerald-500'
                              : 'bg-slate-200 dark:bg-slate-800'
                          }`}
                        />
                        <span
                          className={
                            isCurrent
                              ? 'text-brand-600 dark:text-brand-400 font-extrabold'
                              : isPassed
                              ? 'text-slate-700 dark:text-slate-300'
                              : 'text-slate-400'
                          }
                        >
                          {stageName}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 text-xs">
                <span className="text-slate-400">Pipeline Stage: <strong className="text-slate-700 dark:text-slate-200">{deal.stage}</strong></span>
                <button
                  onClick={() => success('Opportunity Advanced', `Moved "${deal.title}" to next review stage.`)}
                  className="inline-flex items-center gap-1 text-brand-600 dark:text-brand-400 font-bold hover:underline"
                >
                  <span>Advance Stage</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
