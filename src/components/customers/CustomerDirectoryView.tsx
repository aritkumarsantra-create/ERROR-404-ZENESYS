import React, { useState, useMemo } from 'react';
import { useCustomer } from '../../context/CustomerContext';
import { CustomerFilterBar } from './CustomerFilterBar';
import { CustomerTable } from './CustomerTable';
import { SkeletonTable } from '../common/SkeletonLoader';
import { Users, UserPlus, Filter } from 'lucide-react';

export const CustomerDirectoryView: React.FC = () => {
  const { customers, isLoadingDemo } = useCustomer();

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [industryFilter, setIndustryFilter] = useState('all');
  const [leadTierFilter, setLeadTierFilter] = useState('all');
  const [healthFilter, setHealthFilter] = useState('all');

  const industries = useMemo(() => {
    const set = new Set<string>();
    customers.forEach(c => set.add(c.industry));
    return Array.from(set);
  }, [customers]);

  const handleResetFilters = () => {
    setSearch('');
    setStatusFilter('all');
    setIndustryFilter('all');
    setLeadTierFilter('all');
    setHealthFilter('all');
  };

  const filteredCustomers = useMemo(() => {
    return customers.filter(c => {
      // Search query
      if (search.trim() !== '') {
        const q = search.toLowerCase();
        const matches =
          c.name.toLowerCase().includes(q) ||
          c.email.toLowerCase().includes(q) ||
          c.company.toLowerCase().includes(q) ||
          c.role.toLowerCase().includes(q);
        if (!matches) return false;
      }

      // Status filter
      if (statusFilter !== 'all' && c.status !== statusFilter) {
        return false;
      }

      // Industry filter
      if (industryFilter !== 'all' && c.industry !== industryFilter) {
        return false;
      }

      // Lead tier filter
      if (leadTierFilter !== 'all' && c.leadTier !== leadTierFilter) {
        return false;
      }

      // Health filter
      if (healthFilter !== 'all' && c.healthStatus !== healthFilter) {
        return false;
      }

      return true;
    });
  }, [customers, search, statusFilter, industryFilter, leadTierFilter, healthFilter]);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Top Banner Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-4 rounded-2xl bg-card-light dark:bg-card-dark border border-slate-200/80 dark:border-slate-800/80 shadow-xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Total Directory</span>
          <div className="text-xl font-bold text-slate-900 dark:text-white font-outfit mt-1">
            {customers.length} Accounts
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-card-light dark:bg-card-dark border border-slate-200/80 dark:border-slate-800/80 shadow-xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-500">🔥 Hot Leads</span>
          <div className="text-xl font-bold text-emerald-600 dark:text-emerald-400 font-outfit mt-1">
            {customers.filter(c => c.leadTier === 'Hot').length} Hot Leads
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-card-light dark:bg-card-dark border border-slate-200/80 dark:border-slate-800/80 shadow-xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-rose-500">🔴 Churn Risk / Drop</span>
          <div className="text-xl font-bold text-rose-600 dark:text-rose-400 font-outfit mt-1">
            {customers.filter(c => c.healthStatus === 'At Risk' || c.status === 'Churn Risk').length} Accounts
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-card-light dark:bg-card-dark border border-slate-200/80 dark:border-slate-800/80 shadow-xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-500">Avg Lead Score</span>
          <div className="text-xl font-bold text-indigo-600 dark:text-indigo-400 font-outfit mt-1">
            78.4 / 100
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <CustomerFilterBar
        search={search}
        setSearch={setSearch}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        industryFilter={industryFilter}
        setIndustryFilter={setIndustryFilter}
        leadTierFilter={leadTierFilter}
        setLeadTierFilter={setLeadTierFilter}
        healthFilter={healthFilter}
        setHealthFilter={setHealthFilter}
        onReset={handleResetFilters}
        industries={industries}
        totalCount={customers.length}
        filteredCount={filteredCustomers.length}
      />

      {/* Table Section */}
      {isLoadingDemo ? (
        <SkeletonTable rows={6} />
      ) : (
        <CustomerTable
          customers={filteredCustomers}
          onResetFilters={handleResetFilters}
        />
      )}
    </div>
  );
};
