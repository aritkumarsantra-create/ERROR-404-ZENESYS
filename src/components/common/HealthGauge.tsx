import React from 'react';
import { ShieldAlert, ShieldCheck, AlertTriangle, RefreshCw, Sparkles, MessageSquareWarning, MailCheck } from 'lucide-react';
import { Customer } from '../../types';
import { useCustomer } from '../../context/CustomerContext';

interface HealthGaugeProps {
  customer: Customer;
  compact?: boolean;
}

export const HealthGauge: React.FC<HealthGaugeProps> = ({ customer, compact = false }) => {
  const { rescanSentiment, isScanningSentiment } = useCustomer();

  const score = customer.healthScore;
  const sentimentScore = customer.sentimentScore;

  // Determine status color configuration
  const isGreen = score >= 80;
  const isYellow = score >= 60 && score < 80;
  const isRed = score < 60;

  const statusConfig = {
    color: isGreen ? '#10b981' : isYellow ? '#f59e0b' : '#f43f5e',
    bgColor: isGreen
      ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30'
      : isYellow
      ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30'
      : 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30 animate-pulse-subtle',
    label: isGreen ? 'Good / Healthy' : isYellow ? 'Neutral / Attention Needed' : 'At Risk / Churn Warning',
    icon: isGreen ? (
      <ShieldCheck className="w-5 h-5 text-emerald-500" />
    ) : isYellow ? (
      <AlertTriangle className="w-5 h-5 text-amber-500" />
    ) : (
      <ShieldAlert className="w-5 h-5 text-rose-500" />
    ),
    badgeGradient: isGreen
      ? 'from-emerald-500/20 via-emerald-500/5 to-transparent'
      : isYellow
      ? 'from-amber-500/20 via-amber-500/5 to-transparent'
      : 'from-rose-500/20 via-rose-500/5 to-transparent'
  };

  // SVG Gauge calculations
  // Angle range: -180 to 0 degrees for half circle
  const radius = 70;
  const circumference = Math.PI * radius;
  const progressOffset = circumference - (score / 100) * circumference;

  if (compact) {
    return (
      <div className={`inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-xs font-semibold border ${statusConfig.bgColor}`}>
        {statusConfig.icon}
        <span>Health: {score}/100 ({customer.healthStatus})</span>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden rounded-2xl bg-card-light dark:bg-card-dark border ${
      isRed ? 'border-rose-500/40 shadow-glow-rose' : isYellow ? 'border-amber-500/30' : 'border-slate-200/80 dark:border-slate-800/80'
    } p-6 shadow-card transition-all duration-300`}>
      {/* Background ambient gradient */}
      <div className={`absolute top-0 right-0 w-80 h-80 bg-gradient-to-br ${statusConfig.badgeGradient} rounded-full blur-3xl -z-0 pointer-events-none`} />

      <div className="relative z-10">
        {/* Header with Title & Rescan Trigger */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200/60 dark:border-slate-800/60">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-indigo-500/10 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400">
                <Sparkles className="w-4 h-4" />
              </span>
              <h3 className="text-base font-bold text-slate-900 dark:text-white font-outfit">
                Customer Health & Sentiment Meter
              </h3>
              <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400">
                AI Powered
              </span>
            </div>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              Live sentiment monitoring from customer support tickets, email communications, and ad engagement signals.
            </p>
          </div>

          <button
            onClick={() => rescanSentiment(customer.id)}
            disabled={isScanningSentiment}
            className="inline-flex items-center justify-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-300/60 dark:border-slate-700 transition-all duration-200 active:scale-95 disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isScanningSentiment ? 'animate-spin text-brand-500' : ''}`} />
            {isScanningSentiment ? 'Scanning Inboxes & Tickets...' : 'Re-scan Sentiment'}
          </button>
        </div>

        {/* Meter & Signal Breakdown Section */}
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Visual Semi-Circle Gauge */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center text-center p-3">
            <div className="relative w-48 h-28 flex items-end justify-center">
              <svg className="w-48 h-48 transform -rotate-180" viewBox="0 0 160 160">
                {/* Background Arc */}
                <circle
                  cx="80"
                  cy="80"
                  r={radius}
                  fill="transparent"
                  stroke="currentColor"
                  strokeWidth="14"
                  strokeDasharray={circumference}
                  strokeDashoffset={0}
                  className="text-slate-200 dark:text-slate-800"
                />
                {/* Colored Progress Arc */}
                <circle
                  cx="80"
                  cy="80"
                  r={radius}
                  fill="transparent"
                  stroke={statusConfig.color}
                  strokeWidth="14"
                  strokeDasharray={circumference}
                  strokeDashoffset={progressOffset}
                  strokeLinecap="round"
                  className="transition-all duration-1000 ease-out"
                />
              </svg>

              {/* Center Gauge Value */}
              <div className="absolute bottom-2 flex flex-col items-center">
                <span className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white font-outfit">
                  {score}
                  <span className="text-base text-slate-400 font-normal">/100</span>
                </span>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Health Index
                </span>
              </div>
            </div>

            {/* Health Status Pill */}
            <div className="mt-4 flex items-center justify-center">
              <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold border shadow-sm ${statusConfig.bgColor}`}>
                {statusConfig.icon}
                <span>{statusConfig.label}</span>
              </div>
            </div>

            {/* Color Zone Legend */}
            <div className="mt-3 flex items-center justify-center gap-4 text-[11px] font-medium text-slate-400 dark:text-slate-500">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-rose-500" />
                &lt;60 At Risk
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                60-79 Neutral
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                80+ Good
              </span>
            </div>
          </div>

          {/* AI Sentiment Analysis & Recent Triggers */}
          <div className="lg:col-span-7 space-y-4">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <MailCheck className="w-4 h-4 text-brand-500" />
                  NLP Sentiment Summary
                </span>
                <span className="font-bold text-slate-900 dark:text-white">
                  {sentimentScore}% Positive Tone ({customer.sentimentLabel})
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {customer.sentimentSummary}
              </p>
            </div>

            {/* Trigger Warnings / Praise Items */}
            <div className="space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                Key Trigger Signals Detected:
              </span>
              <div className="space-y-2">
                {customer.sentimentTriggers.slice(0, 2).map((trigger, idx) => (
                  <div
                    key={idx}
                    className={`flex items-start gap-2.5 p-2.5 rounded-lg text-xs border ${
                      trigger.type === 'negative'
                        ? 'bg-rose-500/10 border-rose-500/30 text-rose-800 dark:text-rose-200'
                        : trigger.type === 'warning'
                        ? 'bg-amber-500/10 border-amber-500/30 text-amber-800 dark:text-amber-200'
                        : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-800 dark:text-emerald-200'
                    }`}
                  >
                    <div className="mt-0.5 shrink-0">
                      {trigger.type === 'negative' ? (
                        <MessageSquareWarning className="w-3.5 h-3.5 text-rose-500" />
                      ) : trigger.type === 'warning' ? (
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
                      ) : (
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between font-semibold text-[11px]">
                        <span>{trigger.source}</span>
                        <span className="opacity-70 font-normal">{trigger.date}</span>
                      </div>
                      <div className="mt-0.5 text-xs opacity-90">{trigger.text}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* At-Risk Immediate Sales Rep Call to Action */}
            {isRed && (
              <div className="flex items-center justify-between p-3 rounded-xl bg-rose-600 text-white shadow-glow-rose">
                <div className="flex items-center gap-2 text-xs font-semibold">
                  <ShieldAlert className="w-4 h-4 animate-bounce" />
                  <span>Warning: High Churn Probability. Immediate outreach advised.</span>
                </div>
                <button
                  onClick={() => alert(`Initiating direct outreach call with ${customer.name}...`)}
                  className="px-3 py-1 bg-white text-rose-700 font-bold rounded-lg text-xs hover:bg-rose-50 active:scale-95 transition-all shadow"
                >
                  Call Rep Now
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
