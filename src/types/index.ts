export type LeadTier = 'Hot' | 'Warm' | 'Cold';
export type CustomerStatus = 'Active' | 'Churn Risk' | 'Onboarding' | 'Prospect' | 'Inactive';
export type HealthStatus = 'Good' | 'Neutral' | 'At Risk';
export type ActivityType = 
  | 'website_visit' 
  | 'purchase' 
  | 'marketing_interaction' 
  | 'sales_call' 
  | 'ad_click' 
  | 'support_ticket' 
  | 'email';

export type AdPlatform = 'Google Ads' | 'Meta Ads' | 'LinkedIn Ads' | 'YouTube Ads' | 'Direct / Organic';

export interface ActivityEvent {
  id: string;
  type: ActivityType;
  title: string;
  description: string;
  timestamp: string;
  channel?: string;
  metric?: string;
  sentiment?: 'positive' | 'neutral' | 'negative';
  author?: {
    name: string;
    avatar?: string;
  };
}

export interface Deal {
  id: string;
  title: string;
  value: number;
  stage: 'Qualification' | 'Proposal' | 'Negotiation' | 'Closed Won' | 'Closed Lost';
  probability: number;
  closeDate: string;
  adSource: string;
}

export interface AdAttribution {
  id: string;
  campaignName: string;
  platform: AdPlatform;
  adSpend: number;
  impressions: number;
  clicks: number;
  conversions: number;
  roas: number;
  cpc: number;
  date: string;
}

export interface AIInsight {
  id: string;
  type: 'opportunity' | 'risk' | 'next_best_action' | 'timing';
  title: string;
  description: string;
  impact: 'High' | 'Medium' | 'Low';
  actionLabel?: string;
  score?: number;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  company: string;
  industry: string;
  location: string;
  role: string;
  tier: 'Enterprise' | 'Mid-Market' | 'Growth' | 'Startup';
  status: CustomerStatus;
  leadScore: number; // 0-100
  leadTier: LeadTier;
  engagementScore: number; // 0-100
  healthScore: number; // 0-100 (for README Health & Sentiment Gauge)
  healthStatus: HealthStatus;
  sentimentScore: number; // 0-100 (e.g. 88% positive)
  sentimentLabel: string;
  sentimentSummary: string;
  sentimentTriggers: {
    source: string;
    text: string;
    type: 'positive' | 'warning' | 'negative';
    date: string;
  }[];
  totalPurchases: number;
  annualRevenue: number;
  adSpendLTV: number;
  roas: number;
  assignedRep: {
    name: string;
    avatar: string;
    email: string;
  };
  lastActivity: string;
  lastActivityDate: string;
  tags: string[];
  timeline: ActivityEvent[];
  deals: Deal[];
  adAttributions: AdAttribution[];
  aiInsights: AIInsight[];
}

export interface KPIStat {
  id: string;
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  period: string;
  iconName: string;
  sparkline: number[];
  secondaryText?: string;
}

export interface LeadDistributionData {
  tier: string;
  count: number;
  percentage: number;
  conversionRate: number;
  color: string;
}

export interface RevenueTrendData {
  month: string;
  actualRevenue: number;
  targetRevenue: number;
  adSpend: number;
  pipelineValue: number;
}

export interface CustomerGrowthData {
  month: string;
  totalCustomers: number;
  newCustomers: number;
  churned: number;
  organic: number;
  paidAds: number;
}

export interface AdPerformanceMetric {
  platform: AdPlatform;
  spend: number;
  revenue: number;
  roas: number;
  leads: number;
  cpl: number; // cost per lead
  growth: number;
  color: string;
}
