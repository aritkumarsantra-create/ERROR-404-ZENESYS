import React, { useState } from 'react';
import {
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  Eye,
  ExternalLink,
  Phone,
  Mail,
  MoreHorizontal,
  Flame,
  ShieldCheck,
  ShieldAlert,
  AlertTriangle
} from 'lucide-react';
import { Customer } from '../../types';
import { LeadScoreBadge } from '../common/LeadScoreBadge';
import { useCustomer } from '../../context/CustomerContext';
import { EmptyState } from '../common/EmptyState';

interface CustomerTableProps {
  customers: Customer[];
  onResetFilters?: () => void;
}

type SortField = 'name' | 'company' | 'leadScore' | 'healthScore' | 'totalPurchases';
type SortOrder = 'asc' | 'desc';

export const CustomerTable: React.FC<CustomerTableProps> = ({ customers, onResetFilters }) => {
  const { selectCustomer, setSelectedDrawerCustomer } = useCustomer();

  const [sortField, setSortField] = useState<SortField>('leadScore');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(prev => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
  };

  const sortedCustomers = [...customers].sort((a, b) => {
    let aVal = a[sortField];
    let bVal = b[sortField];

    if (typeof aVal === 'string') {
      return sortOrder === 'asc'
        ? (aVal as string).localeCompare(bVal as string)
        : (bVal as string).localeCompare(aVal as string);
    }

    return sortOrder === 'asc'
      ? (aVal as number) - (bVal as number)
      : (bVal as number) - (aVal as number);
  });

  const totalPages = Math.ceil(sortedCustomers.length / pageSize) || 1;
  const paginatedCustomers = sortedCustomers.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const toggleSelectAll = () => {
    if (selectedIds.length === paginatedCustomers.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(paginatedCustomers.map(c => c.id));
    }
  };

  const toggleSelectOne = (id: string) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  if (customers.length === 0) {
    return (
      <EmptyState
        icon="search"
        title="No customers match your search"
        description="Try adjusting your search terms or clearing your status and industry filters."
        actionLabel="Reset All Filters"
        onAction={onResetFilters}
      />
    );
  }

  return (
    <div className="bg-card-light dark:bg-card-dark rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-card overflow-hidden">
      {/* Table Container */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-200/80 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/50 text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              <th className="p-4 w-10">
                <input
                  type="checkbox"
                  checked={
                    paginatedCustomers.length > 0 &&
                    selectedIds.length === paginatedCustomers.length
                  }
                  onChange={toggleSelectAll}
                  className="rounded border-slate-300 text-brand-600 focus:ring-brand-500"
                />
              </th>

              <th className="py-4 px-3 cursor-pointer hover:text-slate-900 dark:hover:text-white" onClick={() => handleSort('name')}>
                <div className="flex items-center gap-1">
                  <span>Customer Name</span>
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </th>

              <th className="py-4 px-3 cursor-pointer hover:text-slate-900 dark:hover:text-white" onClick={() => handleSort('company')}>
                <div className="flex items-center gap-1">
                  <span>Company & Industry</span>
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </th>

              <th className="py-4 px-3 cursor-pointer hover:text-slate-900 dark:hover:text-white" onClick={() => handleSort('leadScore')}>
                <div className="flex items-center gap-1">
                  <span>Lead Score</span>
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </th>

              <th className="py-4 px-3 cursor-pointer hover:text-slate-900 dark:hover:text-white" onClick={() => handleSort('healthScore')}>
                <div className="flex items-center gap-1">
                  <span>Health Meter</span>
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </th>

              <th className="py-4 px-3">Status</th>

              <th className="py-4 px-3">Last Activity</th>

              <th className="py-4 px-4 text-right">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80 text-xs">
            {paginatedCustomers.map(customer => {
              const isSelected = selectedIds.includes(customer.id);
              const isHealthRed = customer.healthScore < 60;
              const isHealthYellow = customer.healthScore >= 60 && customer.healthScore < 80;

              return (
                <tr
                  key={customer.id}
                  className={`hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors group ${
                    isSelected ? 'bg-indigo-50/40 dark:bg-indigo-950/20' : ''
                  }`}
                >
                  {/* Select Checkbox */}
                  <td className="p-4">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => toggleSelectOne(customer.id)}
                      className="rounded border-slate-300 text-brand-600 focus:ring-brand-500"
                    />
                  </td>

                  {/* Customer Name & Avatar */}
                  <td className="py-4 px-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={customer.avatar}
                        alt={customer.name}
                        className="w-9 h-9 rounded-full object-cover ring-1 ring-slate-200 dark:ring-slate-700 shrink-0"
                      />
                      <div className="min-w-0">
                        <button
                          onClick={() => selectCustomer(customer.id, true)}
                          className="font-bold text-slate-900 dark:text-white hover:text-brand-600 dark:hover:text-brand-400 text-left truncate block transition-colors"
                        >
                          {customer.name}
                        </button>
                        <div className="text-[11px] text-slate-400 truncate">
                          {customer.email}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Company & Industry */}
                  <td className="py-4 px-3">
                    <div className="font-semibold text-slate-800 dark:text-slate-200">
                      {customer.company}
                    </div>
                    <div className="text-[11px] text-slate-400 truncate max-w-[180px]">
                      {customer.industry}
                    </div>
                  </td>

                  {/* Lead Score */}
                  <td className="py-4 px-3">
                    <LeadScoreBadge
                      score={customer.leadScore}
                      tier={customer.leadTier}
                      showBar={true}
                      size="sm"
                    />
                  </td>

                  {/* Health Meter (README Requirement) */}
                  <td className="py-4 px-3">
                    <div className="inline-flex items-center gap-1.5 font-bold">
                      <span
                        className={`w-2.5 h-2.5 rounded-full ${
                          isHealthRed
                            ? 'bg-rose-500 shadow-glow-rose animate-pulse'
                            : isHealthYellow
                            ? 'bg-amber-500'
                            : 'bg-emerald-500'
                        }`}
                      />
                      <span
                        className={
                          isHealthRed
                            ? 'text-rose-600 dark:text-rose-400'
                            : isHealthYellow
                            ? 'text-amber-600 dark:text-amber-400'
                            : 'text-emerald-600 dark:text-emerald-400'
                        }
                      >
                        {customer.healthScore}/100
                      </span>
                      <span className="text-[10px] text-slate-400 font-normal">
                        ({customer.healthStatus})
                      </span>
                    </div>
                  </td>

                  {/* Status Badge */}
                  <td className="py-4 px-3">
                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold ${
                        customer.status === 'Active'
                          ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                          : customer.status === 'Churn Risk'
                          ? 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20'
                          : customer.status === 'Onboarding'
                          ? 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20'
                          : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                      }`}
                    >
                      {customer.status}
                    </span>
                  </td>

                  {/* Last Activity */}
                  <td className="py-4 px-3 text-slate-500 dark:text-slate-400">
                    {customer.lastActivity}
                  </td>

                  {/* Actions */}
                  <td className="py-4 px-4 text-right">
                    <div className="inline-flex items-center gap-1.5">
                      <button
                        onClick={() => setSelectedDrawerCustomer(customer)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                        title="Quick Preview Drawer"
                      >
                        <Eye className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => selectCustomer(customer.id, true)}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-brand-50 dark:bg-brand-950/40 text-brand-600 dark:text-brand-400 hover:bg-brand-100 dark:hover:bg-brand-900/60 font-semibold text-[11px] transition-colors"
                        title="Open Full 360 Profile"
                      >
                        <span>360 Profile</span>
                        <ExternalLink className="w-3 h-3" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="p-4 border-t border-slate-200/80 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 dark:text-slate-400">
        <div>
          Showing Page <strong>{currentPage}</strong> of <strong>{totalPages}</strong> ({sortedCustomers.length} total results)
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-1">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`w-7 h-7 rounded-lg font-bold text-xs transition-colors ${
                  currentPage === i + 1
                    ? 'bg-brand-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>

          <button
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
