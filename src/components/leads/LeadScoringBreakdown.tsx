import React from 'react';
import { Target, Zap, MousePointer, Building, ShieldCheck, Sparkles } from 'lucide-react';

export const LeadScoringBreakdown: React.FC = () => {
  const scoringFactors = [
    {
      factor: 'Ad Engagement & High-Intent Clicks',
      weight: '35% Weight',
      description: 'Clicks on Google Search bottom-of-funnel ads, LinkedIn Sponsored InMail opens, and video watch completion >75%.',
      icon: MousePointer,
      color: 'text-indigo-500'
    },
    {
      factor: 'Firmographic & Revenue Fit',
      weight: '25% Weight',
      description: 'Enterprise tier match ($50M+ annual company revenue), SaaS or Healthcare vertical, 50+ sales rep headcount.',
      icon: Building,
      color: 'text-emerald-500'
    },
    {
      factor: 'Website Intent Signals & Pricing Calculator',
      weight: '25% Weight',
      description: 'Browsing pricing pages, downloading technical whitepapers, and visiting enterprise API documentation.',
      icon: Zap,
      color: 'text-amber-500'
    },
    {
      factor: 'Communication Sentiment & Recency',
      weight: '15% Weight',
      description: 'NLP sentiment scan of incoming support inquiries and fast email response velocity.',
      icon: ShieldCheck,
      color: 'text-purple-500'
    }
  ];

  return (
    <div className="bg-card-light dark:bg-card-dark rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800/80 shadow-card space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <span className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
            <Sparkles className="w-4 h-4" />
          </span>
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white font-outfit">
              AI Scoring Model Architecture & Weights
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              How the Customer 360 AI engine computes dynamic 0-100 lead scores.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {scoringFactors.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="p-4 rounded-xl bg-slate-50/70 dark:bg-slate-900/40 border border-slate-200/80 dark:border-slate-800 space-y-2"
            >
              <div className="flex items-center justify-between">
                <Icon className={`w-5 h-5 ${item.color}`} />
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-mono">
                  {item.weight}
                </span>
              </div>
              <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                {item.factor}
              </h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                {item.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
