import React, { useState } from 'react';
import { useCustomer } from '../../context/CustomerContext';
import { useAI } from '../../context/AIContext';
import { ProfileHeader } from './ProfileHeader';
import { HealthGauge } from '../common/HealthGauge';
import { TimelineView } from './TimelineView';
import { AdAttributionTab } from './AdAttributionTab';
import { DealsPipelineTab } from './DealsPipelineTab';
import { AIInsightsTab } from './AIInsightsTab';
import { MetricCard } from '../common/MetricCard';
import {
  Clock,
  Zap,
  DollarSign,
  TrendingUp,
  History,
  Megaphone,
  Briefcase,
  Sparkles,
  Phone,
  Mail,
  Calendar,
  FileText,
  Bot
} from 'lucide-react';
import { useToast } from '../../context/ToastContext';

type ProfileTab = 'timeline' | 'attribution' | 'deals' | 'ai';

export const CustomerProfileView: React.FC = () => {
  const { activeCustomer } = useCustomer();
  const { openEmailGenerator, setIsCopilotOpen } = useAI();
  const { success } = useToast();
  const [activeProfileTab, setActiveProfileTab] = useState<ProfileTab>('timeline');

  const customer = activeCustomer;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Profile Header */}
      <ProfileHeader customer={customer} />

      {/* Dedicated Customer Health & Sentiment Gauge (README Feature) */}
      <HealthGauge customer={customer} />

      {/* 4 Core Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Lead Qualification Score"
          value={`${customer.leadScore}/100`}
          change={customer.leadScore >= 80 ? '+12 pts' : '-4 pts'}
          isPositive={customer.leadScore >= 80}
          period="vs 30d ago"
          iconName="Target"
          sparkline={[60, 65, 70, 75, 82, 88, customer.leadScore]}
          secondaryText={`Tier: ${customer.leadTier} Lead`}
          accentColor={customer.leadScore >= 80 ? 'emerald' : 'amber'}
        />

        <MetricCard
          title="Engagement Velocity"
          value={`${customer.engagementScore}%`}
          change="+8.4%"
          isPositive={true}
          period="ad click-through"
          iconName="Zap"
          sparkline={[50, 62, 70, 74, 80, 85, customer.engagementScore]}
          secondaryText="Active on 3 ad platforms"
          accentColor="indigo"
        />

        <MetricCard
          title="Total Purchases & LTV"
          value={`$${(customer.totalPurchases / 1000).toFixed(0)}k`}
          change="+$50k ARR"
          isPositive={true}
          period="expansion"
          iconName="DollarSign"
          sparkline={[40, 60, 90, 140, 200, 240, customer.totalPurchases / 1000]}
          secondaryText={`Ad Spend LTV: $${(customer.adSpendLTV / 1000).toFixed(0)}k`}
          accentColor="emerald"
        />

        <MetricCard
          title="Last Touchpoint"
          value={customer.lastActivity}
          change="Recency: High"
          isPositive={true}
          period=""
          iconName="TrendingUp"
          sparkline={[10, 15, 20, 25, 30, 40, 50]}
          secondaryText={`Date: ${customer.lastActivityDate}`}
          accentColor="purple"
        />
      </div>

      {/* Quick Sales Action Strip */}
      <div className="p-4 rounded-2xl bg-card-light dark:bg-card-dark border border-slate-200/80 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 shadow-xs">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-200">
          <Sparkles className="w-4 h-4 text-brand-500" />
          <span>Quick Rep Actions:</span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => openEmailGenerator(customer, customer.healthStatus === 'At Risk' ? 'churn_rescue' : 'upsell')}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white text-xs font-bold shadow-xs transition-all active:scale-95 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-brand-200" />
            <span>AI Pitch Generator</span>
          </button>

          <button
            onClick={() => setIsCopilotOpen(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200 transition-colors cursor-pointer"
          >
            <Bot className="w-3.5 h-3.5 text-brand-500" />
            <span>Ask ZenAI Copilot</span>
          </button>

          <button
            onClick={() => openEmailGenerator(customer, 'qbr_review')}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200 transition-colors cursor-pointer"
          >
            <Calendar className="w-3.5 h-3.5 text-purple-500" />
            <span>Schedule QBR</span>
          </button>

          <button
            onClick={() => success('Report Exported', `${customer.name}'s Customer 360 PDF dossier generated.`)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200 transition-colors"
          >
            <FileText className="w-3.5 h-3.5 text-amber-500" />
            <span>Export 360 PDF</span>
          </button>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 overflow-x-auto pb-1">
        <button
          onClick={() => setActiveProfileTab('timeline')}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold rounded-xl transition-all ${
            activeProfileTab === 'timeline'
              ? 'bg-brand-600 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <History className="w-4 h-4" />
          <span>Activity Timeline ({customer.timeline.length})</span>
        </button>

        <button
          onClick={() => setActiveProfileTab('attribution')}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold rounded-xl transition-all ${
            activeProfileTab === 'attribution'
              ? 'bg-brand-600 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Megaphone className="w-4 h-4" />
          <span>Ad Attribution ({customer.adAttributions.length})</span>
        </button>

        <button
          onClick={() => setActiveProfileTab('deals')}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold rounded-xl transition-all ${
            activeProfileTab === 'deals'
              ? 'bg-brand-600 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Briefcase className="w-4 h-4" />
          <span>Opportunities & Deals ({customer.deals.length})</span>
        </button>

        <button
          onClick={() => setActiveProfileTab('ai')}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold rounded-xl transition-all ${
            activeProfileTab === 'ai'
              ? 'bg-brand-600 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>AI Insights & Next Best Action ({customer.aiInsights.length})</span>
        </button>
      </div>

      {/* Tab Content Display */}
      <div>
        {activeProfileTab === 'timeline' && (
          <TimelineView timeline={customer.timeline} customerName={customer.name} />
        )}
        {activeProfileTab === 'attribution' && (
          <AdAttributionTab attributions={customer.adAttributions} />
        )}
        {activeProfileTab === 'deals' && (
          <DealsPipelineTab deals={customer.deals} customerName={customer.name} />
        )}
        {activeProfileTab === 'ai' && (
          <AIInsightsTab insights={customer.aiInsights} customerName={customer.name} />
        )}
      </div>
    </div>
  );
};
