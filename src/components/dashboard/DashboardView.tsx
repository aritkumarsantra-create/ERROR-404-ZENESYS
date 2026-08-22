import React from 'react';
import { KPI_METRICS } from '../../data/mockData';
import { MetricCard } from '../common/MetricCard';
import { RevenueChart } from './RevenueChart';
import { CustomerGrowthChart } from './CustomerGrowthChart';
import { LeadDistributionChart } from './LeadDistributionChart';
import { AdPerformanceMatrix } from './AdPerformanceMatrix';
import { UrgentLeadsFeed } from './UrgentLeadsFeed';
import { SkeletonCard, SkeletonChart } from '../common/SkeletonLoader';
import { useCustomer } from '../../context/CustomerContext';
import { Sparkles } from 'lucide-react';

export const DashboardView: React.FC = () => {
  const { isLoadingDemo } = useCustomer();

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Banner / Welcome */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-gradient-to-r from-brand-600 via-indigo-600 to-indigo-800 text-white shadow-glow-indigo">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-1 rounded-md bg-white/20">
              <Sparkles className="w-4 h-4" />
            </span>
            <h2 className="text-lg sm:text-xl font-extrabold font-outfit">
              Customer 360 & Ad Sales Intelligence
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-indigo-100 max-w-xl">
            Real-time multi-touch attribution, predictive AI lead scoring, and proactive sentiment health monitoring.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-center">
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/20 backdrop-blur-sm border border-white/30 text-white">
            Q3 Forecast: +32% Growth
          </span>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {isLoadingDemo ? (
          <>
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </>
        ) : (
          KPI_METRICS.map((kpi, idx) => (
            <MetricCard
              key={kpi.id}
              title={kpi.title}
              value={kpi.value}
              change={kpi.change}
              isPositive={kpi.isPositive}
              period={kpi.period}
              iconName={kpi.iconName}
              sparkline={kpi.sparkline}
              secondaryText={kpi.secondaryText}
              accentColor={
                idx === 0
                  ? 'indigo'
                  : idx === 1
                  ? 'emerald'
                  : idx === 2
                  ? 'purple'
                  : idx === 3
                  ? 'emerald'
                  : 'amber'
              }
            />
          ))
        )}
      </div>

      {/* Priority Urgent Actions Feed */}
      <UrgentLeadsFeed />

      {/* Main Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8">
          {isLoadingDemo ? <SkeletonChart /> : <RevenueChart />}
        </div>
        <div className="lg:col-span-4">
          {isLoadingDemo ? <SkeletonChart /> : <LeadDistributionChart />}
        </div>
      </div>

      {/* Secondary Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-6">
          {isLoadingDemo ? <SkeletonChart /> : <CustomerGrowthChart />}
        </div>
        <div className="lg:col-span-6">
          {isLoadingDemo ? <SkeletonChart /> : <AdPerformanceMatrix />}
        </div>
      </div>
    </div>
  );
};
