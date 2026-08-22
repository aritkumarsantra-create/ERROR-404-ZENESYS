import React from 'react';
import { Flame, ShieldAlert, ArrowRight, PhoneCall, Mail, Sparkles, CheckCircle2 } from 'lucide-react';
import { useCustomer } from '../../context/CustomerContext';
import { useToast } from '../../context/ToastContext';

export const UrgentLeadsFeed: React.FC = () => {
  const { customers, selectCustomer } = useCustomer();
  const { success } = useToast();

  const urgentItems = [
    {
      customer: customers.find(c => c.id === 'cust-002') || customers[1],
      type: 'health_drop',
      badge: 'URGENT: Health Drop (42/100)',
      actionText: 'Review Sentiment & Call Rep',
      reason: 'Negative sentiment detected in tracking tag discrepancy ticket.'
    },
    {
      customer: customers.find(c => c.id === 'cust-001') || customers[0],
      type: 'hot_lead',
      badge: 'HOT: Score Surged to 94',
      actionText: 'Send Renewal Proposal',
      reason: 'Viewed AI Bidding docs 14m ago. 90% close probability.'
    },
    {
      customer: customers.find(c => c.id === 'cust-006') || customers[5],
      type: 'demo_request',
      badge: 'HIGH INTENT: Inbound Demo',
      actionText: 'Schedule 50-Seat Pilot',
      reason: 'Submitted demo request form for clinical trial ad acceleration.'
    }
  ];

  return (
    <div className="bg-card-light dark:bg-card-dark rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800/80 shadow-card">
      <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <span className="p-1.5 rounded-lg bg-rose-500/10 text-rose-600 dark:text-rose-400">
            <Flame className="w-4 h-4" />
          </span>
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white font-outfit">
              Priority Sales Actions Today
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              AI-prioritized outreach queue based on intent spikes and customer health alerts.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-4 space-y-3">
        {urgentItems.map((item, idx) => {
          const cust = item.customer;
          const isWarning = item.type === 'health_drop';
          return (
            <div
              key={idx}
              className={`p-4 rounded-xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                isWarning
                  ? 'bg-rose-50/60 dark:bg-rose-950/20 border-rose-200 dark:border-rose-900/50'
                  : 'bg-slate-50/60 dark:bg-slate-900/40 border-slate-200/80 dark:border-slate-800'
              }`}
            >
              <div className="flex items-start gap-3">
                <img
                  src={cust.avatar}
                  alt={cust.name}
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-slate-200 dark:ring-slate-700"
                />
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm font-bold text-slate-900 dark:text-white">
                      {cust.name}
                    </span>
                    <span className="text-xs text-slate-400">• {cust.company}</span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        isWarning
                          ? 'bg-rose-500 text-white'
                          : 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400'
                      }`}
                    >
                      {item.badge}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-slate-600 dark:text-slate-300">
                    {item.reason}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                <button
                  onClick={() => {
                    success('Action Triggered', `Outreach logged for ${cust.name}`);
                  }}
                  className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 transition-colors"
                  title="Quick Call"
                >
                  <PhoneCall className="w-4 h-4" />
                </button>
                <button
                  onClick={() => {
                    selectCustomer(cust.id, true);
                  }}
                  className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold shadow-xs transition-all ${
                    isWarning
                      ? 'bg-rose-600 hover:bg-rose-500 text-white'
                      : 'bg-brand-600 hover:bg-brand-500 text-white'
                  }`}
                >
                  <span>{item.actionText}</span>
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
