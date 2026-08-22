import React from 'react';
import { Search, Filter, Download, X, RotateCcw } from 'lucide-react';
import { CustomerStatus, HealthStatus, LeadTier } from '../../types';
import { useToast } from '../../context/ToastContext';

interface CustomerFilterBarProps {
  search: string;
  setSearch: (val: string) => void;
  statusFilter: string;
  setStatusFilter: (val: string) => void;
  industryFilter: string;
  setIndustryFilter: (val: string) => void;
  leadTierFilter: string;
  setLeadTierFilter: (val: string) => void;
  healthFilter: string;
  setHealthFilter: (val: string) => void;
  onReset: () => void;
  industries: string[];
  totalCount: number;
  filteredCount: number;
}

export const CustomerFilterBar: React.FC<CustomerFilterBarProps> = ({
  search,
  setSearch,
  statusFilter,
  setStatusFilter,
  industryFilter,
  setIndustryFilter,
  leadTierFilter,
  setLeadTierFilter,
  healthFilter,
  setHealthFilter,
  onReset,
  industries,
  totalCount,
  filteredCount
}) => {
  const { success } = useToast();

  const hasActiveFilters =
    search.trim() !== '' ||
    statusFilter !== 'all' ||
    industryFilter !== 'all' ||
    leadTierFilter !== 'all' ||
    healthFilter !== 'all';

  const handleExportCSV = () => {
    success('Export Started', `Exporting ${filteredCount} customer records to CSV...`);
  };

  return (
    <div className="bg-card-light dark:bg-card-dark rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800/80 shadow-card space-y-4">
      {/* Top Search & Action Buttons */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by customer name, email, company, role..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Export & Reset Buttons */}
        <div className="flex items-center gap-2">
          {hasActiveFilters && (
            <button
              onClick={onReset}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          )}

          <button
            onClick={handleExportCSV}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Filter Dropdowns Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 border-t border-slate-100 dark:border-slate-800/80">
        {/* Status Filter */}
        <div>
          <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
            Status
          </label>
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            className="w-full px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-brand-500"
          >
            <option value="all">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Churn Risk">Churn Risk</option>
            <option value="Onboarding">Onboarding</option>
            <option value="Prospect">Prospect</option>
          </select>
        </div>

        {/* Lead Tier Filter */}
        <div>
          <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
            Lead Tier
          </label>
          <select
            value={leadTierFilter}
            onChange={e => setLeadTierFilter(e.target.value)}
            className="w-full px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-brand-500"
          >
            <option value="all">All Tiers</option>
            <option value="Hot">🔥 Hot (80-100)</option>
            <option value="Warm">☀️ Warm (50-79)</option>
            <option value="Cold">❄️ Cold (&lt;50)</option>
          </select>
        </div>

        {/* Health Sentiment Filter */}
        <div>
          <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
            Health & Sentiment
          </label>
          <select
            value={healthFilter}
            onChange={e => setHealthFilter(e.target.value)}
            className="w-full px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-brand-500"
          >
            <option value="all">All Health Scores</option>
            <option value="Good">🟢 Healthy / Good (&gt;80)</option>
            <option value="Neutral">🟡 Neutral (60-79)</option>
            <option value="At Risk">🔴 At Risk (&lt;60)</option>
          </select>
        </div>

        {/* Industry Filter */}
        <div>
          <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
            Industry
          </label>
          <select
            value={industryFilter}
            onChange={e => setIndustryFilter(e.target.value)}
            className="w-full px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-brand-500"
          >
            <option value="all">All Industries</option>
            {industries.map((ind, i) => (
              <option key={i} value={ind}>
                {ind}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Results Count summary */}
      <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
        <span>
          Showing <strong>{filteredCount}</strong> of <strong>{totalCount}</strong> accounts
        </span>
        {hasActiveFilters && (
          <span className="text-brand-500 font-semibold">Active filters applied</span>
        )}
      </div>
    </div>
  );
};
