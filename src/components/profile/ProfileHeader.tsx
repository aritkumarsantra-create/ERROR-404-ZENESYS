import React from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Building2,
  Calendar,
  Sparkles,
  ExternalLink,
  ChevronDown,
  UserCheck,
  Flame,
  Award
} from 'lucide-react';
import { Customer } from '../../types';
import { useCustomer } from '../../context/CustomerContext';
import { LeadScoreBadge } from '../common/LeadScoreBadge';

interface ProfileHeaderProps {
  customer: Customer;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({ customer }) => {
  const { customers, selectCustomer } = useCustomer();

  return (
    <div className="bg-card-light dark:bg-card-dark rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800/80 shadow-card space-y-6">
      {/* Top Customer Switcher & Tier Tag */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Switch Profile:
          </span>
          <select
            value={customer.id}
            onChange={e => selectCustomer(e.target.value)}
            className="px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-500"
          >
            {customers.map(c => (
              <option key={c.id} value={c.id}>
                {c.name} — {c.company} ({c.leadTier} • Health: {c.healthScore})
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-brand-500/10 text-brand-600 dark:text-brand-400 border border-brand-500/20 flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5" />
            {customer.tier} Tier ($100k+ ARR)
          </span>

          <span
            className={`px-3 py-1 rounded-full text-xs font-bold ${
              customer.status === 'Active'
                ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                : customer.status === 'Churn Risk'
                ? 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20 animate-pulse-subtle'
                : 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20'
            }`}
          >
            {customer.status}
          </span>
        </div>
      </div>

      {/* Main Profile Info Row */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="relative">
            <img
              src={customer.avatar}
              alt={customer.name}
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover ring-4 ring-brand-500/20 shadow-lg"
            />
            <div
              className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full border-2 border-white dark:border-card-dark flex items-center justify-center ${
                customer.healthScore >= 80 ? 'bg-emerald-500' : customer.healthScore >= 60 ? 'bg-amber-500' : 'bg-rose-500'
              }`}
              title={`Health Score: ${customer.healthScore}/100`}
            >
              <UserCheck className="w-3.5 h-3.5 text-white" />
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white font-outfit tracking-tight">
                {customer.name}
              </h2>
              <LeadScoreBadge score={customer.leadScore} tier={customer.leadTier} size="md" />
            </div>

            <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
              {customer.role} at <span className="text-brand-600 dark:text-brand-400 font-bold">{customer.company}</span>
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {customer.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Assigned Rep Card */}
        <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 text-xs w-full md:w-auto">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
            Assigned Sales Executive
          </span>
          <div className="flex items-center gap-3">
            <img
              src={customer.assignedRep.avatar}
              alt={customer.assignedRep.name}
              className="w-9 h-9 rounded-full object-cover ring-1 ring-slate-300 dark:ring-slate-700"
            />
            <div>
              <div className="font-bold text-slate-900 dark:text-white">
                {customer.assignedRep.name}
              </div>
              <div className="text-[11px] text-slate-400">{customer.assignedRep.email}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact & Meta Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 pt-4 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300">
        <div className="flex items-center gap-2">
          <Mail className="w-4 h-4 text-slate-400 shrink-0" />
          <a href={`mailto:${customer.email}`} className="truncate hover:text-brand-500 font-medium">
            {customer.email}
          </a>
        </div>

        <div className="flex items-center gap-2">
          <Phone className="w-4 h-4 text-slate-400 shrink-0" />
          <span className="font-medium">{customer.phone}</span>
        </div>

        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
          <span className="truncate font-medium">{customer.location}</span>
        </div>

        <div className="flex items-center gap-2">
          <Building2 className="w-4 h-4 text-slate-400 shrink-0" />
          <span className="truncate font-medium">{customer.industry}</span>
        </div>
      </div>
    </div>
  );
};
