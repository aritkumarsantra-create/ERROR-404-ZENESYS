import React from 'react';
import { Customer, LeadTier } from '../../types';
import { useCustomer } from '../../context/CustomerContext';
import { Flame, Sun, Snowflake, ArrowRight, PhoneCall, Sparkles, Building2 } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

export const LeadKanbanBoard: React.FC = () => {
  const { customers, selectCustomer, updateCustomer } = useCustomer();
  const { success } = useToast();

  const hotLeads = customers.filter(c => c.leadTier === 'Hot');
  const warmLeads = customers.filter(c => c.leadTier === 'Warm');
  const coldLeads = customers.filter(c => c.leadTier === 'Cold');

  const handlePromoteTier = (customer: Customer, nextTier: LeadTier) => {
    const newScore = nextTier === 'Hot' ? 88 : 65;
    updateCustomer(customer.id, { leadTier: nextTier, leadScore: newScore });
    success('Lead Promoted', `${customer.name} moved to ${nextTier} tier (${newScore} pts).`);
  };

  const columns: {
    tier: LeadTier;
    title: string;
    icon: any;
    colorClass: string;
    borderClass: string;
    leads: Customer[];
  }[] = [
    {
      tier: 'Hot',
      title: '🔥 Hot Leads (Priority Outreach)',
      icon: Flame,
      colorClass: 'text-emerald-600 dark:text-emerald-400 bg-emerald-500/10',
      borderClass: 'border-emerald-500/30',
      leads: hotLeads
    },
    {
      tier: 'Warm',
      title: '☀️ Warm Leads (Nurture & Demos)',
      icon: Sun,
      colorClass: 'text-amber-600 dark:text-amber-400 bg-amber-500/10',
      borderClass: 'border-amber-500/30',
      leads: warmLeads
    },
    {
      tier: 'Cold',
      title: '❄️ Cold Leads (Automated Retargeting)',
      icon: Snowflake,
      colorClass: 'text-rose-600 dark:text-rose-400 bg-rose-500/10',
      borderClass: 'border-rose-500/30',
      leads: coldLeads
    }
  ];

  return (
    <div className="bg-card-light dark:bg-card-dark rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800/80 shadow-card space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white font-outfit">
            AI Lead Qualification Pipeline
          </h3>
          <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
            Interactive pipeline board with real-time scoring adjustments and conversion actions.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {columns.map(col => {
          const Icon = col.icon;
          return (
            <div
              key={col.tier}
              className="rounded-2xl bg-slate-50/70 dark:bg-slate-900/50 border border-slate-200/80 dark:border-slate-800 p-4 flex flex-col justify-between space-y-4"
            >
              {/* Column Header */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-200/60 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <span className={`p-1.5 rounded-lg ${col.colorClass}`}>
                    <Icon className="w-4 h-4" />
                  </span>
                  <span className="text-xs font-bold text-slate-900 dark:text-white">
                    {col.title}
                  </span>
                </div>
                <span className="px-2 py-0.5 text-xs font-bold rounded-full bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                  {col.leads.length}
                </span>
              </div>

              {/* Lead Cards List */}
              <div className="space-y-3 flex-1 min-h-[300px]">
                {col.leads.map(lead => (
                  <div
                    key={lead.id}
                    className="p-4 rounded-xl bg-white dark:bg-card-dark border border-slate-200/80 dark:border-slate-800 shadow-xs hover:shadow-card transition-all space-y-3"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2.5">
                        <img
                          src={lead.avatar}
                          alt={lead.name}
                          className="w-8 h-8 rounded-full object-cover ring-1 ring-slate-200 dark:ring-slate-700"
                        />
                        <div>
                          <button
                            onClick={() => selectCustomer(lead.id, true)}
                            className="font-bold text-xs text-slate-900 dark:text-white hover:text-brand-500 text-left line-clamp-1"
                          >
                            {lead.name}
                          </button>
                          <span className="text-[11px] text-slate-400 block line-clamp-1">
                            {lead.company}
                          </span>
                        </div>
                      </div>

                      <span className="text-xs font-black px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-outfit">
                        {lead.leadScore} pts
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 pt-1 border-t border-slate-100 dark:border-slate-800/80">
                      <span>Health: <strong className={lead.healthScore >= 80 ? 'text-emerald-500' : lead.healthScore >= 60 ? 'text-amber-500' : 'text-rose-500'}>{lead.healthScore}/100</strong></span>
                      <span>{lead.lastActivity}</span>
                    </div>

                    {/* Quick Card Actions */}
                    <div className="flex items-center justify-between pt-1">
                      <button
                        onClick={() => selectCustomer(lead.id, true)}
                        className="text-[11px] font-semibold text-brand-600 dark:text-brand-400 hover:underline"
                      >
                        View 360 &rarr;
                      </button>

                      {col.tier === 'Cold' && (
                        <button
                          onClick={() => handlePromoteTier(lead, 'Warm')}
                          className="text-[11px] font-bold text-amber-600 dark:text-amber-400 hover:underline"
                        >
                          Promote to Warm &uarr;
                        </button>
                      )}

                      {col.tier === 'Warm' && (
                        <button
                          onClick={() => handlePromoteTier(lead, 'Hot')}
                          className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 hover:underline"
                        >
                          Promote to Hot &uarr;
                        </button>
                      )}

                      {col.tier === 'Hot' && (
                        <button
                          onClick={() => success('Deal Opportunity Created', `Initiated proposal pipeline for ${lead.company}`)}
                          className="px-2 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-[10px] font-bold shadow-xs transition-all"
                        >
                          Convert to Deal
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
