import React, { useState, useEffect } from 'react';
import {
  X,
  Sparkles,
  Briefcase,
  ShieldAlert,
  ShieldCheck,
  CheckCircle2,
  TrendingUp,
  Target,
  Swords,
  Copy,
  Check,
  Calendar,
  AlertTriangle
} from 'lucide-react';
import { useAI } from '../../context/AIContext';
import { useCustomer } from '../../context/CustomerContext';
import { useToast } from '../../context/ToastContext';
import { aiService, DealStrategyResult } from '../../services/aiService';
import { Deal, Customer } from '../../types';

export const AIDealStrategizerModal: React.FC = () => {
  const { isDealStrategizerOpen, closeDealStrategizer, targetDeal, dealCustomer } = useAI();
  const { activeCustomer } = useCustomer();
  const { success } = useToast();

  const activeDeal = targetDeal;
  const activeCust = dealCustomer || activeCustomer;

  const [strategyResult, setStrategyResult] = useState<DealStrategyResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (isDealStrategizerOpen && activeDeal) {
      loadStrategy(activeDeal, activeCust);
    }
  }, [isDealStrategizerOpen, activeDeal?.id]);

  const loadStrategy = async (deal: Deal, customer: Customer) => {
    setIsLoading(true);
    try {
      const res = await aiService.generateDealStrategy(deal, customer);
      setStrategyResult(res);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isDealStrategizerOpen || !activeDeal) return null;

  const handleCopy = () => {
    if (!strategyResult) return;
    const summary = `=== AI DEAL STRATEGY: ${activeDeal.title} ===\nWin Odds: ${strategyResult.winProbability}%\nTarget Close: ${strategyResult.expectedCloseDays} days\n\nTop Advantage: ${strategyResult.competitorBattlecard[0]?.ourAdvantage}\n\nAction Plan:\n${strategyResult.closingActionPlan.map(p => `${p.day}: ${p.action} (${p.owner})`).join('\n')}`;
    navigator.clipboard.writeText(summary);
    setCopied(true);
    success('Playbook Copied', 'Deal closing strategy copied to clipboard.');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-card-light dark:bg-card-dark w-full max-w-4xl max-h-[92vh] rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col overflow-hidden animate-slide-up">
        {/* Header */}
        <div className="p-6 border-b border-slate-200/80 dark:border-slate-800/80 flex items-center justify-between bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
              <Swords className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold font-outfit">
                  AI Deal Closing Strategizer & Battlecards
                </h3>
                <span className="px-2 py-0.5 text-[10px] font-extrabold uppercase rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  Opportunity Intelligence
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Predictive win probability, competitive objection handling, and executive closing action plan.
              </p>
            </div>
          </div>

          <button
            onClick={closeDealStrategizer}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Deal Context Bar */}
        <div className="px-6 py-3 bg-slate-50 dark:bg-slate-900/60 border-b border-slate-200/60 dark:border-slate-800/60 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div>
            <span className="font-bold text-slate-900 dark:text-white text-sm">
              {activeDeal.title}
            </span>
            <div className="text-slate-400 text-[11px] mt-0.5">
              Account: <strong className="text-slate-700 dark:text-slate-200">{activeCust.name} ({activeCust.company})</strong> • Source: {activeDeal.adSource}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <span className="text-[10px] uppercase font-bold text-slate-400">Opportunity Value</span>
              <div className="text-base font-black text-slate-900 dark:text-white font-outfit">
                ${activeDeal.value.toLocaleString()}
              </div>
            </div>
          </div>
        </div>

        {/* Body Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-xs">
          {isLoading ? (
            <div className="py-12 flex flex-col items-center justify-center space-y-3">
              <div className="w-10 h-10 rounded-full border-4 border-brand-500/20 border-t-brand-500 animate-spin" />
              <p className="text-xs font-semibold text-slate-500">
                Calibrating win probability & competitor battlecards...
              </p>
            </div>
          ) : strategyResult ? (
            <>
              {/* Score & Key Strengths Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    AI Win Probability
                  </span>
                  <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400 font-outfit mt-1">
                    {strategyResult.winProbability}%
                  </div>
                  <span className="text-[11px] text-slate-500">
                    Base: {activeDeal.probability}% ({strategyResult.winProbability > activeDeal.probability ? 'Accelerating' : 'Guarded'})
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Target Closing Velocity
                  </span>
                  <div className="text-2xl font-black text-brand-600 dark:text-brand-400 font-outfit mt-1">
                    {strategyResult.expectedCloseDays} Days
                  </div>
                  <span className="text-[11px] text-slate-500">
                    Target Date: {activeDeal.closeDate}
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Customer Health Factor
                  </span>
                  <div className="text-2xl font-black text-slate-900 dark:text-white font-outfit mt-1">
                    {activeCust.healthScore}/100
                  </div>
                  <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                    {activeCust.healthStatus} Status
                  </span>
                </div>
              </div>

              {/* Strengths & Risks */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-emerald-50/40 dark:bg-emerald-950/20 border border-emerald-200/60 dark:border-emerald-900/40 space-y-2">
                  <div className="flex items-center gap-2 font-bold text-emerald-900 dark:text-emerald-300 text-xs">
                    <ShieldCheck className="w-4 h-4 text-emerald-500" />
                    <span>Deal Accelerators & Strengths:</span>
                  </div>
                  <ul className="space-y-1.5 text-slate-700 dark:text-slate-300 text-[11px]">
                    {strategyResult.keyStrengths.map((st, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-emerald-500 font-bold">•</span>
                        <span>{st}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 rounded-2xl bg-rose-50/40 dark:bg-rose-950/20 border border-rose-200/60 dark:border-rose-900/40 space-y-2">
                  <div className="flex items-center gap-2 font-bold text-rose-900 dark:text-rose-300 text-xs">
                    <AlertTriangle className="w-4 h-4 text-rose-500" />
                    <span>Critical Deal Risks to Mitigate:</span>
                  </div>
                  <ul className="space-y-1.5 text-slate-700 dark:text-slate-300 text-[11px]">
                    {strategyResult.keyRiskFactors.map((rf, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-rose-500 font-bold">•</span>
                        <span>{rf}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Competitor Battlecard */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Swords className="w-4 h-4 text-brand-500" />
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white font-outfit">
                    Competitor Battlecards & Kill Shots
                  </h4>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {strategyResult.competitorBattlecard.map((card, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 space-y-2.5"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-900 dark:text-white text-xs">
                          {card.competitor}
                        </span>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                          {card.threatLevel} Threat
                        </span>
                      </div>

                      <div className="text-[11px] space-y-1.5">
                        <div>
                          <strong className="text-slate-500 dark:text-slate-400">Their Vulnerability: </strong>
                          <span className="text-slate-700 dark:text-slate-300">{card.theirWeakness}</span>
                        </div>
                        <div>
                          <strong className="text-brand-600 dark:text-brand-400">Our Winning Advantage: </strong>
                          <span className="text-slate-700 dark:text-slate-300">{card.ourAdvantage}</span>
                        </div>
                        <div className="p-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-brand-600 dark:text-brand-300 font-medium">
                          <strong>Kill Shot: </strong> {card.counterKillShot}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Objection Handling Playbook */}
              <div className="space-y-3">
                <h4 className="font-bold text-sm text-slate-900 dark:text-white font-outfit">
                  Objection Handling Script Playbook
                </h4>
                <div className="space-y-2">
                  {strategyResult.objectionPlaybook.map((obj, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 space-y-1"
                    >
                      <div className="font-bold text-slate-900 dark:text-white text-xs">
                        {obj.objection}
                      </div>
                      <p className="text-slate-600 dark:text-slate-300 text-[11px] leading-relaxed italic">
                        {obj.responseScript}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* 14-Day Action Plan */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-brand-500" />
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white font-outfit">
                    14-Day Closing Roadmap
                  </h4>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
                  {strategyResult.closingActionPlan.map((step, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-1"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-extrabold text-brand-600 dark:text-brand-400 text-xs">
                          {step.day}
                        </span>
                        <span className="text-[10px] text-slate-400">{step.owner}</span>
                      </div>
                      <p className="text-[11px] text-slate-700 dark:text-slate-300 leading-snug">
                        {step.action}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : null}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-200/80 dark:border-slate-800/80 bg-slate-50 dark:bg-slate-900 flex items-center justify-between">
          <button
            onClick={closeDealStrategizer}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
          >
            Close
          </button>

          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs shadow-md shadow-brand-500/20 transition-all active:scale-95 cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Playbook Copied' : 'Copy Strategy Playbook'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
