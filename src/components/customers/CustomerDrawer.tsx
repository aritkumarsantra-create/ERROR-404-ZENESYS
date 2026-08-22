import React from 'react';
import { X, ExternalLink, Mail, Phone, Building2, MapPin, Sparkles, ShieldCheck, Flame, ArrowRight } from 'lucide-react';
import { Customer } from '../../types';
import { HealthGauge } from '../common/HealthGauge';
import { LeadScoreBadge } from '../common/LeadScoreBadge';
import { useCustomer } from '../../context/CustomerContext';

interface CustomerDrawerProps {
  customer: Customer | null;
  onClose: () => void;
}

export const CustomerDrawer: React.FC<CustomerDrawerProps> = ({ customer, onClose }) => {
  const { selectCustomer } = useCustomer();

  if (!customer) return null;

  const handleOpenFullProfile = () => {
    selectCustomer(customer.id, true);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white dark:bg-card-dark shadow-2xl border-l border-slate-200 dark:border-slate-800 flex flex-col justify-between animate-slide-up">
          {/* Header */}
          <div className="p-6 border-b border-slate-200/80 dark:border-slate-800">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400">
                Quick 360 Snapshot
              </span>
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Profile Avatar & Title */}
            <div className="mt-4 flex items-center gap-4">
              <img
                src={customer.avatar}
                alt={customer.name}
                className="w-14 h-14 rounded-2xl object-cover ring-2 ring-brand-500/40 shadow"
              />
              <div className="min-w-0 flex-1">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white font-outfit truncate">
                  {customer.name}
                </h3>
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400 truncate">
                  {customer.role} • {customer.company}
                </p>
                <div className="mt-2 flex items-center gap-2">
                  <LeadScoreBadge score={customer.leadScore} tier={customer.leadTier} size="sm" />
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      customer.status === 'Active'
                        ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                        : customer.status === 'Churn Risk'
                        ? 'bg-rose-500/10 text-rose-600 dark:text-rose-400'
                        : 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400'
                    }`}
                  >
                    {customer.status}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Drawer Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* Health & Sentiment Gauge Mini */}
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                Health & Sentiment Gauge
              </div>
              <HealthGauge customer={customer} compact={false} />
            </div>

            {/* Contact Details */}
            <div className="space-y-2 p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 text-xs">
              <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                <Mail className="w-4 h-4 text-slate-400" />
                <span>{customer.email}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                <Phone className="w-4 h-4 text-slate-400" />
                <span>{customer.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                <MapPin className="w-4 h-4 text-slate-400" />
                <span>{customer.location}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                <Building2 className="w-4 h-4 text-slate-400" />
                <span>{customer.industry} ({customer.tier})</span>
              </div>
            </div>

            {/* Financial Metrics */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800">
                <span className="text-[10px] uppercase font-bold text-slate-400">Total Purchases</span>
                <div className="text-base font-bold text-slate-900 dark:text-white font-outfit">
                  ${customer.totalPurchases.toLocaleString()}
                </div>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800">
                <span className="text-[10px] uppercase font-bold text-slate-400">Ad Spend LTV</span>
                <div className="text-base font-bold text-indigo-600 dark:text-indigo-400 font-outfit">
                  ${customer.adSpendLTV.toLocaleString()}
                </div>
              </div>
            </div>

            {/* Assigned Rep */}
            <div className="p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60">
              <span className="text-[10px] uppercase font-bold text-slate-400">Assigned Sales Lead</span>
              <div className="mt-2 flex items-center gap-3">
                <img
                  src={customer.assignedRep.avatar}
                  alt={customer.assignedRep.name}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white">
                    {customer.assignedRep.name}
                  </div>
                  <div className="text-[11px] text-slate-400">{customer.assignedRep.email}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Drawer Footer */}
          <div className="p-4 border-t border-slate-200/80 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 flex items-center justify-between gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800"
            >
              Close
            </button>
            <button
              onClick={handleOpenFullProfile}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-xl bg-brand-600 hover:bg-brand-500 text-white shadow-sm transition-all"
            >
              <span>View Full 360 Profile</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
