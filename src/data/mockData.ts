import { Customer, KPIStat, LeadDistributionData, RevenueTrendData, CustomerGrowthData, AdPerformanceMetric } from '../types';

export const MOCK_CUSTOMERS: Customer[] = [
  {
    id: 'cust-001',
    name: 'Sarah Jenkins',
    email: 's.jenkins@apexcloud.io',
    phone: '+1 (415) 892-4102',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    company: 'ApexCloud Technologies',
    industry: 'Cloud Infrastructure / SaaS',
    location: 'San Francisco, CA, USA',
    role: 'VP of Growth & Marketing',
    tier: 'Enterprise',
    status: 'Active',
    leadScore: 94,
    leadTier: 'Hot',
    engagementScore: 91,
    healthScore: 92,
    healthStatus: 'Good',
    sentimentScore: 95,
    sentimentLabel: 'Extremely Satisfied',
    sentimentSummary: 'Recent email exchange and quarterly review show high delight with Q3 Ad ROAS (+38%). Positive response to expansion proposal.',
    sentimentTriggers: [
      {
        source: 'Executive QBR Call Note',
        text: 'Sarah praised the multi-touch attribution reports and approved +$50k monthly ad budget increase.',
        type: 'positive',
        date: '2 days ago'
      },
      {
        source: 'Customer Support Ticket #4821',
        text: 'Inquired about upgrading to Enterprise Custom Audiences sync with Salesforce.',
        type: 'positive',
        date: '5 days ago'
      }
    ],
    totalPurchases: 284500,
    annualRevenue: 340000,
    adSpendLTV: 142000,
    roas: 4.8,
    assignedRep: {
      name: 'Marcus Vance',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      email: 'm.vance@zenesys.ai'
    },
    lastActivity: '14 mins ago',
    lastActivityDate: '2026-08-22 13:53',
    tags: ['High LTV', 'Decision Maker', 'Google Ads Heavy', 'Quarterly Expansion'],
    timeline: [
      {
        id: 'act-1',
        type: 'website_visit',
        title: 'Explored Enterprise AI Bidding Feature',
        description: 'Spent 8m 42s browsing the Ad Sales Optimization documentation and pricing calculators.',
        timestamp: '14 mins ago',
        channel: 'Web Direct',
        metric: '5 page views'
      },
      {
        id: 'act-2',
        type: 'ad_click',
        title: 'Engaged with LinkedIn Sponsored InMail',
        description: 'Clicked CTA on "Next-Gen Customer 360 AI for Ad Optimization" campaign.',
        timestamp: 'Yesterday at 4:15 PM',
        channel: 'LinkedIn Ads',
        metric: 'CPC $12.40'
      },
      {
        id: 'act-3',
        type: 'sales_call',
        title: 'Expansion Strategy Call with Marcus Vance',
        description: 'Discussed annual enterprise license renewal and rollout across 4 regional sales squads.',
        timestamp: 'Aug 19, 2026',
        channel: 'Zoom Call (35 min)',
        sentiment: 'positive',
        author: { name: 'Marcus Vance' }
      },
      {
        id: 'act-4',
        type: 'purchase',
        title: 'Ad Budget Scale Commitment ($50,000)',
        description: 'Upgraded monthly ad spend allocation via Stripe automated billing.',
        timestamp: 'Aug 14, 2026',
        metric: '$50,000 ARR'
      },
      {
        id: 'act-5',
        type: 'marketing_interaction',
        title: 'Downloaded "2026 B2B Ad Sales Benchmark Report"',
        description: 'Downloaded PDF from lead nurturing workflow.',
        timestamp: 'Aug 08, 2026',
        channel: 'Email Newsletter'
      }
    ],
    deals: [
      {
        id: 'deal-01',
        title: 'ApexCloud - 2026 Enterprise Ad Platform Renewal',
        value: 180000,
        stage: 'Negotiation',
        probability: 90,
        closeDate: '2026-09-15',
        adSource: 'LinkedIn Enterprise InMail'
      },
      {
        id: 'deal-02',
        title: 'Add-on: Real-time Multi-Touch Attribution API',
        value: 45000,
        stage: 'Proposal',
        probability: 75,
        closeDate: '2026-10-01',
        adSource: 'Google Search Retargeting'
      }
    ],
    adAttributions: [
      {
        id: 'attr-1',
        campaignName: 'Google Search - Enterprise Customer 360',
        platform: 'Google Ads',
        adSpend: 18500,
        impressions: 48200,
        clicks: 3420,
        conversions: 182,
        roas: 5.2,
        cpc: 5.41,
        date: 'Last 30 Days'
      },
      {
        id: 'attr-2',
        campaignName: 'LinkedIn - B2B Sales Leader Retargeting',
        platform: 'LinkedIn Ads',
        adSpend: 24000,
        impressions: 31000,
        clicks: 1840,
        conversions: 94,
        roas: 4.6,
        cpc: 13.04,
        date: 'Last 30 Days'
      },
      {
        id: 'attr-3',
        campaignName: 'Meta Lookalike - High Intent Tech Execs',
        platform: 'Meta Ads',
        adSpend: 9200,
        impressions: 89000,
        clicks: 2900,
        conversions: 62,
        roas: 3.8,
        cpc: 3.17,
        date: 'Last 30 Days'
      }
    ],
    aiInsights: [
      {
        id: 'ai-1',
        type: 'opportunity',
        title: 'High Propensity for Annual Pre-Payment',
        description: 'Customer is utilizing 92% of monthly ad event limits. Offering 15% discount on 2-year upfront commitment has 88% probability of close.',
        impact: 'High',
        actionLabel: 'Send Custom Proposal'
      },
      {
        id: 'ai-2',
        type: 'next_best_action',
        title: 'Optimal Reachout Time: 10:30 AM PST',
        description: 'Historical email open rate is highest on Tuesday mornings between 10:00 AM - 11:30 AM PST.',
        impact: 'Medium',
        actionLabel: 'Schedule Touchpoint'
      }
    ]
  },
  {
    id: 'cust-002',
    name: 'David Chen',
    email: 'd.chen@novabiotech.com',
    phone: '+1 (617) 552-9381',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    company: 'Nova BioTech Systems',
    industry: 'Healthcare / BioTech',
    location: 'Boston, MA, USA',
    role: 'Chief Commercial Officer',
    tier: 'Enterprise',
    status: 'Churn Risk',
    leadScore: 68,
    leadTier: 'Warm',
    engagementScore: 48,
    healthScore: 42,
    healthStatus: 'At Risk',
    sentimentScore: 35,
    sentimentLabel: 'Frustrated / High Risk',
    sentimentSummary: 'Critical Alert: Recent email ticket showed frustration over ad tracking discrepancy with HubSpot and delayed campaign onboarding.',
    sentimentTriggers: [
      {
        source: 'Email to Sales Rep (Aug 20)',
        text: 'We are seeing a 22% mismatch between Meta ad conversions and CRM revenue. Need an immediate audit or we may pause the Q4 ad campaign.',
        type: 'negative',
        date: '2 days ago'
      },
      {
        source: 'Support Escalation Ticket #4902',
        text: 'Integration sync timed out for 3 consecutive days on custom HIPAA endpoint.',
        type: 'warning',
        date: '4 days ago'
      }
    ],
    totalPurchases: 145000,
    annualRevenue: 180000,
    adSpendLTV: 78000,
    roas: 2.9,
    assignedRep: {
      name: 'Elena Rostova',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
      email: 'e.rostova@zenesys.ai'
    },
    lastActivity: '1 hour ago',
    lastActivityDate: '2026-08-22 13:02',
    tags: ['At Risk', 'HIPAA Compliant', 'Requires Technical Review', 'Escalation'],
    timeline: [
      {
        id: 'act-201',
        type: 'support_ticket',
        title: 'Priority Escalation: Tracking Tag Discrepancy',
        description: 'Customer logged P1 ticket regarding Meta Pixel revenue discrepancy.',
        timestamp: '1 hour ago',
        channel: 'Zendesk',
        sentiment: 'negative'
      },
      {
        id: 'act-202',
        type: 'email',
        title: 'Inbound Message from David Chen',
        description: '"Need urgent call with solutions architect regarding conversion API sync."',
        timestamp: 'Yesterday at 2:30 PM',
        channel: 'Direct Email',
        sentiment: 'negative'
      },
      {
        id: 'act-203',
        type: 'website_visit',
        title: 'Viewed Data Export & Cancellation Terms',
        description: 'Customer visited Settings -> Billing & Data Export page twice in 24 hours.',
        timestamp: 'Aug 20, 2026',
        channel: 'Web App'
      }
    ],
    deals: [
      {
        id: 'deal-03',
        title: 'Nova BioTech - Q4 Ad Acceleration Package',
        value: 95000,
        stage: 'Qualification',
        probability: 30,
        closeDate: '2026-11-01',
        adSource: 'Google Search BioTech'
      }
    ],
    adAttributions: [
      {
        id: 'attr-4',
        campaignName: 'Google Search - Healthcare Compliance Ads',
        platform: 'Google Ads',
        adSpend: 14200,
        impressions: 22000,
        clicks: 1100,
        conversions: 38,
        roas: 3.1,
        cpc: 12.90,
        date: 'Last 30 Days'
      },
      {
        id: 'attr-5',
        campaignName: 'LinkedIn - Life Science Decision Makers',
        platform: 'LinkedIn Ads',
        adSpend: 18000,
        impressions: 19500,
        clicks: 920,
        conversions: 24,
        roas: 2.7,
        cpc: 19.56,
        date: 'Last 30 Days'
      }
    ],
    aiInsights: [
      {
        id: 'ai-3',
        type: 'risk',
        title: 'Immediate Churn Risk Mitigation Required',
        description: 'Sentiment score dropped by 45 points in 7 days. Recommend VP of Customer Success scheduling an executive triage call within 4 hours.',
        impact: 'High',
        actionLabel: 'Trigger Executive Escalation'
      },
      {
        id: 'ai-4',
        type: 'next_best_action',
        title: 'Deploy Conversion API Diagnostic Script',
        description: 'Auto-detecting Meta CAPI timestamp delays can resolve 90% of tracking mismatch inquiries.',
        impact: 'High',
        actionLabel: 'Run Tag Diagnostic'
      }
    ]
  },
  {
    id: 'cust-003',
    name: 'Amara Okafor',
    email: 'amara@stratafin.co',
    phone: '+44 20 7946 0912',
    avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=150&auto=format&fit=crop&q=80',
    company: 'Strata Financial Group',
    industry: 'Fintech / Banking',
    location: 'London, United Kingdom',
    role: 'Head of Digital Acquisition',
    tier: 'Enterprise',
    status: 'Active',
    leadScore: 89,
    leadTier: 'Hot',
    engagementScore: 87,
    healthScore: 88,
    healthStatus: 'Good',
    sentimentScore: 91,
    sentimentLabel: 'Very Satisfied',
    sentimentSummary: 'Consistently strong sentiment. Praised new cohort retention metrics and increased programmatic ad spend by 25%.',
    sentimentTriggers: [
      {
        source: 'Slack Connect Channel',
        text: 'The new ad attribution dashboard has cut our reporting time in half. Stellar work team!',
        type: 'positive',
        date: '3 days ago'
      }
    ],
    totalPurchases: 310000,
    annualRevenue: 420000,
    adSpendLTV: 185000,
    roas: 5.4,
    assignedRep: {
      name: 'Marcus Vance',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      email: 'm.vance@zenesys.ai'
    },
    lastActivity: '45 mins ago',
    lastActivityDate: '2026-08-22 13:22',
    tags: ['FinTech', 'High ROAS', 'UK & EMEA', 'Global Expansion'],
    timeline: [
      {
        id: 'act-301',
        type: 'ad_click',
        title: 'Interacted with YouTube Video Ad Campaign',
        description: 'Watched 100% of "Next Gen FinTech Ad Attribution" case study video.',
        timestamp: '45 mins ago',
        channel: 'YouTube Ads'
      },
      {
        id: 'act-302',
        type: 'purchase',
        title: 'EMEA Regional License Expansion',
        description: 'Added 20 seats for London & Frankfurt marketing teams.',
        timestamp: 'Aug 17, 2026',
        metric: '$32,000 ARR'
      }
    ],
    deals: [
      {
        id: 'deal-04',
        title: 'Strata FinTech - Global Multi-Currency Ad Engine',
        value: 120000,
        stage: 'Proposal',
        probability: 85,
        closeDate: '2026-09-30',
        adSource: 'LinkedIn Ads EMEA'
      }
    ],
    adAttributions: [
      {
        id: 'attr-6',
        campaignName: 'LinkedIn - EMEA Wealth Management Directors',
        platform: 'LinkedIn Ads',
        adSpend: 31000,
        impressions: 42000,
        clicks: 2800,
        conversions: 142,
        roas: 5.6,
        cpc: 11.07,
        date: 'Last 30 Days'
      }
    ],
    aiInsights: [
      {
        id: 'ai-5',
        type: 'opportunity',
        title: 'Cross-Sell: Predictive Churn Prevention Suite',
        description: 'Customer has large B2C end-user volume. Adding predictive churn signals matches their current Q4 OKRs.',
        impact: 'High',
        actionLabel: 'Send Case Study'
      }
    ]
  },
  {
    id: 'cust-004',
    name: 'Julian Montgomery',
    email: 'j.montgomery@vanguardretail.com',
    phone: '+1 (312) 670-2194',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    company: 'Vanguard Omnichannel Retail',
    industry: 'E-Commerce & Retail',
    location: 'Chicago, IL, USA',
    role: 'Director of Performance Marketing',
    tier: 'Enterprise',
    status: 'Active',
    leadScore: 91,
    leadTier: 'Hot',
    engagementScore: 89,
    healthScore: 84,
    healthStatus: 'Good',
    sentimentScore: 86,
    sentimentLabel: 'Satisfied',
    sentimentSummary: 'Scaling holiday ad budgets early. Positive response to Meta Dynamic Product Ad feeds integration.',
    sentimentTriggers: [
      {
        source: 'Monthly Ad Performance Review',
        text: 'Exceeded Q3 Black Friday test ROAS target by 18%. Inquiring about TikTok ad sync.',
        type: 'positive',
        date: '1 week ago'
      }
    ],
    totalPurchases: 420000,
    annualRevenue: 510000,
    adSpendLTV: 290000,
    roas: 6.2,
    assignedRep: {
      name: 'Elena Rostova',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
      email: 'e.rostova@zenesys.ai'
    },
    lastActivity: '2 hours ago',
    lastActivityDate: '2026-08-22 12:07',
    tags: ['E-Commerce', 'DTC Brand', 'Meta Ads Leader', 'High Volume'],
    timeline: [
      {
        id: 'act-401',
        type: 'sales_call',
        title: 'Q4 Holiday Ad Surge Strategy Session',
        description: 'Reviewed automated bidding rules for Black Friday / Cyber Monday surge.',
        timestamp: '2 hours ago',
        channel: 'Google Meet (45 min)',
        author: { name: 'Elena Rostova' }
      },
      {
        id: 'act-402',
        type: 'ad_click',
        title: 'Google Shopping Feed Optimization Ad',
        description: 'Customer clicked ad on high-converting product feed automation.',
        timestamp: 'Aug 21, 2026',
        channel: 'Google Ads'
      }
    ],
    deals: [
      {
        id: 'deal-05',
        title: 'Vanguard Retail - Holiday Ad Scaling Accelerator',
        value: 240000,
        stage: 'Negotiation',
        probability: 92,
        closeDate: '2026-09-01',
        adSource: 'Meta Lookalike E-Comm'
      }
    ],
    adAttributions: [
      {
        id: 'attr-7',
        campaignName: 'Meta - Omnichannel Holiday Shopping Surge',
        platform: 'Meta Ads',
        adSpend: 62000,
        impressions: 410000,
        clicks: 18400,
        conversions: 940,
        roas: 6.4,
        cpc: 3.36,
        date: 'Last 30 Days'
      }
    ],
    aiInsights: [
      {
        id: 'ai-6',
        type: 'opportunity',
        title: 'Deploy Automated Smart Bidding Rules for Cyber Week',
        description: 'Customer stands to save an estimated $34k in wasted spend during peak bidding spikes.',
        impact: 'High',
        actionLabel: 'Enable Auto-Bidding'
      }
    ]
  },
  {
    id: 'cust-005',
    name: 'Hiroshi Tanaka',
    email: 'h.tanaka@solarmobility.jp',
    phone: '+81 3 5555 0143',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
    company: 'Solar Mobility NextGen',
    industry: 'Clean Energy & Automotive',
    location: 'Tokyo, Japan',
    role: 'Global VP of Business Development',
    tier: 'Mid-Market',
    status: 'Onboarding',
    leadScore: 76,
    leadTier: 'Warm',
    engagementScore: 72,
    healthScore: 78,
    healthStatus: 'Neutral',
    sentimentScore: 74,
    sentimentLabel: 'Neutral / Moderately Happy',
    sentimentSummary: 'Onboarding phase is on track. Technical team is configuring Japanese localized landing page tracking pixels.',
    sentimentTriggers: [
      {
        source: 'Onboarding Survey',
        text: 'Platform is smooth, but would appreciate Japanese timezone support on real-time alerts.',
        type: 'warning',
        date: '4 days ago'
      }
    ],
    totalPurchases: 85000,
    annualRevenue: 110000,
    adSpendLTV: 45000,
    roas: 3.6,
    assignedRep: {
      name: 'Marcus Vance',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      email: 'm.vance@zenesys.ai'
    },
    lastActivity: '5 hours ago',
    lastActivityDate: '2026-08-22 09:07',
    tags: ['APAC', 'EV / CleanTech', 'Onboarding Phase'],
    timeline: [
      {
        id: 'act-501',
        type: 'marketing_interaction',
        title: 'Completed Onboarding Step 4: Ad Pixel Integration',
        description: 'Successfully verified tracking script on Japanese consumer portal.',
        timestamp: '5 hours ago',
        channel: 'System Automation'
      }
    ],
    deals: [
      {
        id: 'deal-06',
        title: 'Solar Mobility - APAC Regional Rollout',
        value: 65000,
        stage: 'Closed Won',
        probability: 100,
        closeDate: '2026-08-10',
        adSource: 'Google APAC Search'
      }
    ],
    adAttributions: [
      {
        id: 'attr-8',
        campaignName: 'Google Ads - APAC EV Fleet Solutions',
        platform: 'Google Ads',
        adSpend: 11500,
        impressions: 19000,
        clicks: 890,
        conversions: 32,
        roas: 3.7,
        cpc: 12.92,
        date: 'Last 30 Days'
      }
    ],
    aiInsights: [
      {
        id: 'ai-7',
        type: 'timing',
        title: 'Schedule Onboarding Milestone Check-in',
        description: 'Send automated milestone congratulation email with Japanese time-zone options.',
        impact: 'Medium',
        actionLabel: 'Send Welcome Kit'
      }
    ]
  },
  {
    id: 'cust-006',
    name: 'Rachel Sterling',
    email: 'rachel@sterlinghealth.org',
    phone: '+1 (206) 441-9872',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    company: 'Sterling Telehealth Labs',
    industry: 'Healthcare / BioTech',
    location: 'Seattle, WA, USA',
    role: 'Chief Marketing Officer',
    tier: 'Mid-Market',
    status: 'Prospect',
    leadScore: 82,
    leadTier: 'Hot',
    engagementScore: 85,
    healthScore: 80,
    healthStatus: 'Good',
    sentimentScore: 88,
    sentimentLabel: 'High Intent',
    sentimentSummary: 'High engagement across webinars and ad retargeting. Requested demo for clinical trial recruitment ad acceleration.',
    sentimentTriggers: [
      {
        source: 'Webinar Q&A Chat',
        text: '"Can Customer 360 handle multi-state medical licensing compliance for ad targeting?"',
        type: 'positive',
        date: 'Yesterday'
      }
    ],
    totalPurchases: 0,
    annualRevenue: 0,
    adSpendLTV: 0,
    roas: 0,
    assignedRep: {
      name: 'Elena Rostova',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
      email: 'e.rostova@zenesys.ai'
    },
    lastActivity: '30 mins ago',
    lastActivityDate: '2026-08-22 13:37',
    tags: ['Prospect', 'High Intent', 'Telehealth', 'Demo Requested'],
    timeline: [
      {
        id: 'act-601',
        type: 'website_visit',
        title: 'Submitted Demo Request Form',
        description: 'Filled out form specifying 50+ sales seats and HIPAA compliance requirements.',
        timestamp: '30 mins ago',
        channel: 'Direct Web'
      },
      {
        id: 'act-602',
        type: 'ad_click',
        title: 'LinkedIn Lead Gen Form Submission',
        description: 'Interacted with "HIPAA-Compliant Ad Sales Engine" sponsored post.',
        timestamp: 'Yesterday at 11:00 AM',
        channel: 'LinkedIn Ads'
      }
    ],
    deals: [
      {
        id: 'deal-07',
        title: 'Sterling Health - Initial 50-Seat Pilot',
        value: 72000,
        stage: 'Qualification',
        probability: 60,
        closeDate: '2026-10-15',
        adSource: 'LinkedIn Lead Gen'
      }
    ],
    adAttributions: [
      {
        id: 'attr-9',
        campaignName: 'LinkedIn - Healthcare Marketers Direct',
        platform: 'LinkedIn Ads',
        adSpend: 8400,
        impressions: 14000,
        clicks: 720,
        conversions: 18,
        roas: 0,
        cpc: 11.66,
        date: 'Last 30 Days'
      }
    ],
    aiInsights: [
      {
        id: 'ai-8',
        type: 'opportunity',
        title: 'High Conversion Probability: Schedule Demo Today',
        description: 'Lead score increased by +28 pts in 48 hours following webinar attendance.',
        impact: 'High',
        actionLabel: 'Call Lead Now'
      }
    ]
  },
  {
    id: 'cust-007',
    name: 'Carlos Mendoza',
    email: 'c.mendoza@latamlogistics.com',
    phone: '+52 55 4160 8820',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
    company: 'LatAm Supply & Logistics',
    industry: 'Supply Chain / Freight',
    location: 'Mexico City, Mexico',
    role: 'Managing Director',
    tier: 'Growth',
    status: 'Prospect',
    leadScore: 42,
    leadTier: 'Cold',
    engagementScore: 31,
    healthScore: 50,
    healthStatus: 'Neutral',
    sentimentScore: 50,
    sentimentLabel: 'Low Activity',
    sentimentSummary: 'Low recent engagement. Clicked an ad 3 weeks ago but hasn\'t opened the last 2 email nurture sequences.',
    sentimentTriggers: [
      {
        source: 'Automated Email Nurture',
        text: 'Unopened campaign: "Optimize Freight Ad Spend in 2026"',
        type: 'warning',
        date: '10 days ago'
      }
    ],
    totalPurchases: 0,
    annualRevenue: 0,
    adSpendLTV: 0,
    roas: 0,
    assignedRep: {
      name: 'Marcus Vance',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      email: 'm.vance@zenesys.ai'
    },
    lastActivity: '8 days ago',
    lastActivityDate: '2026-08-14 11:20',
    tags: ['Cold Lead', 'LatAm', 'Nurture Workflow'],
    timeline: [
      {
        id: 'act-701',
        type: 'ad_click',
        title: 'Meta Video Ad View',
        description: 'Watched 5 seconds of top-of-funnel brand awareness video.',
        timestamp: '8 days ago',
        channel: 'Meta Ads'
      }
    ],
    deals: [],
    adAttributions: [],
    aiInsights: [
      {
        id: 'ai-9',
        type: 'timing',
        title: 'Re-engage with Value-Driven Retargeting Ad',
        description: 'Serve a LinkedIn static customer story to re-spark awareness.',
        impact: 'Low',
        actionLabel: 'Add to Retargeting Audience'
      }
    ]
  },
  {
    id: 'cust-008',
    name: 'Emily Watson',
    email: 'emily@nexusecom.com',
    phone: '+1 (512) 902-8819',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    company: 'Nexus Direct Brands',
    industry: 'E-Commerce & Retail',
    location: 'Austin, TX, USA',
    role: 'VP of Growth & Acquisition',
    tier: 'Growth',
    status: 'Active',
    leadScore: 86,
    leadTier: 'Hot',
    engagementScore: 88,
    healthScore: 90,
    healthStatus: 'Good',
    sentimentScore: 94,
    sentimentLabel: 'Enthusiastic',
    sentimentSummary: 'Very positive sentiment. Customer is expanding Google Shopping and Meta Catalog campaigns with 5.1x ROAS.',
    sentimentTriggers: [
      {
        source: 'Slack Support Channel',
        text: 'Our customer acquisition cost fell by 26% after implementing the automated ad sync. You guys rock!',
        type: 'positive',
        date: '3 days ago'
      }
    ],
    totalPurchases: 112000,
    annualRevenue: 156000,
    adSpendLTV: 68000,
    roas: 5.1,
    assignedRep: {
      name: 'Elena Rostova',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
      email: 'e.rostova@zenesys.ai'
    },
    lastActivity: '3 hours ago',
    lastActivityDate: '2026-08-22 11:05',
    tags: ['DTC Fast Growth', 'Austin Tech', 'High ROAS', 'Meta + Google'],
    timeline: [
      {
        id: 'act-801',
        type: 'purchase',
        title: 'Quarterly Ad Credit Top-up',
        description: 'Auto-charged $25,000 for ad execution budget.',
        timestamp: '3 hours ago',
        metric: '$25,000'
      }
    ],
    deals: [
      {
        id: 'deal-08',
        title: 'Nexus DTC - Automated Bid Orchestrator',
        value: 54000,
        stage: 'Closed Won',
        probability: 100,
        closeDate: '2026-08-01',
        adSource: 'Meta Ads Retargeting'
      }
    ],
    adAttributions: [
      {
        id: 'attr-10',
        campaignName: 'Meta Ads - DTC Summer Flash Sale Promo',
        platform: 'Meta Ads',
        adSpend: 28000,
        impressions: 210000,
        clicks: 11500,
        conversions: 580,
        roas: 5.3,
        cpc: 2.43,
        date: 'Last 30 Days'
      }
    ],
    aiInsights: [
      {
        id: 'ai-10',
        type: 'opportunity',
        title: 'Introduce TikTok Ads Sync',
        description: 'Their DTC catalog has strong viral appeal. Adding TikTok catalog sync can capture +30% incremental gen-Z shoppers.',
        impact: 'High',
        actionLabel: 'Propose TikTok Add-on'
      }
    ]
  }
];

export const KPI_METRICS: KPIStat[] = [
  {
    id: 'kpi-1',
    title: 'Total Customers',
    value: '12,480',
    change: '+14.2%',
    isPositive: true,
    period: 'vs last month',
    iconName: 'Users',
    sparkline: [10200, 10500, 10850, 11200, 11800, 12100, 12480],
    secondaryText: '94.8% Retention Rate'
  },
  {
    id: 'kpi-2',
    title: 'Active Ad Leads',
    value: '3,842',
    change: '+18.6%',
    isPositive: true,
    period: 'vs last month',
    iconName: 'Zap',
    sparkline: [2900, 3100, 3250, 3400, 3550, 3700, 3842],
    secondaryText: '1,420 Hot Tier (37%)'
  },
  {
    id: 'kpi-3',
    title: 'Average Lead Score',
    value: '78.4',
    change: '+4.2 pts',
    isPositive: true,
    period: 'vs last month',
    iconName: 'Target',
    sparkline: [71.2, 72.5, 73.8, 75.0, 76.4, 77.2, 78.4],
    secondaryText: 'Top 10% average 94.6'
  },
  {
    id: 'kpi-4',
    title: 'Revenue Generated',
    value: '$4.82M',
    change: '+24.8%',
    isPositive: true,
    period: 'vs last quarter',
    iconName: 'DollarSign',
    sparkline: [3.4, 3.7, 3.9, 4.1, 4.3, 4.6, 4.82],
    secondaryText: 'Target: $5.0M (96.4%)'
  },
  {
    id: 'kpi-5',
    title: 'Ad Spend & ROAS',
    value: '4.6x ROAS',
    change: '+0.8x',
    isPositive: true,
    period: 'vs last month',
    iconName: 'TrendingUp',
    sparkline: [3.6, 3.8, 4.0, 4.1, 4.3, 4.5, 4.6],
    secondaryText: '$342k Spend -> $1.57M Sales'
  }
];

export const LEAD_DISTRIBUTION_DATA: LeadDistributionData[] = [
  { tier: 'Hot Leads (80-100)', count: 1420, percentage: 37, conversionRate: 64.8, color: '#10b981' },
  { tier: 'Warm Leads (50-79)', count: 1680, percentage: 44, conversionRate: 32.4, color: '#f59e0b' },
  { tier: 'Cold Leads (<50)', count: 742, percentage: 19, conversionRate: 8.2, color: '#f43f5e' }
];

export const REVENUE_TREND_DATA: RevenueTrendData[] = [
  { month: 'Jan', actualRevenue: 320, targetRevenue: 300, adSpend: 62, pipelineValue: 850 },
  { month: 'Feb', actualRevenue: 345, targetRevenue: 320, adSpend: 65, pipelineValue: 920 },
  { month: 'Mar', actualRevenue: 390, targetRevenue: 350, adSpend: 70, pipelineValue: 1040 },
  { month: 'Apr', actualRevenue: 410, targetRevenue: 380, adSpend: 74, pipelineValue: 1120 },
  { month: 'May', actualRevenue: 440, targetRevenue: 410, adSpend: 78, pipelineValue: 1200 },
  { month: 'Jun', actualRevenue: 480, targetRevenue: 440, adSpend: 82, pipelineValue: 1350 },
  { month: 'Jul', actualRevenue: 520, targetRevenue: 480, adSpend: 88, pipelineValue: 1480 },
  { month: 'Aug', actualRevenue: 580, targetRevenue: 510, adSpend: 94, pipelineValue: 1650 },
];

export const CUSTOMER_GROWTH_DATA: CustomerGrowthData[] = [
  { month: 'Jan', totalCustomers: 9200, newCustomers: 640, churned: 35, organic: 280, paidAds: 360 },
  { month: 'Feb', totalCustomers: 9780, newCustomers: 615, churned: 35, organic: 260, paidAds: 355 },
  { month: 'Mar', totalCustomers: 10320, newCustomers: 580, churned: 40, organic: 240, paidAds: 340 },
  { month: 'Apr', totalCustomers: 10890, newCustomers: 620, churned: 50, organic: 270, paidAds: 350 },
  { month: 'May', totalCustomers: 11450, newCustomers: 610, churned: 50, organic: 250, paidAds: 360 },
  { month: 'Jun', totalCustomers: 11980, newCustomers: 580, churned: 50, organic: 230, paidAds: 350 },
  { month: 'Jul', totalCustomers: 12240, newCustomers: 320, churned: 60, organic: 120, paidAds: 200 },
  { month: 'Aug', totalCustomers: 12480, newCustomers: 300, churned: 60, organic: 110, paidAds: 190 },
];

export const AD_PERFORMANCE_METRICS: AdPerformanceMetric[] = [
  {
    platform: 'Google Ads',
    spend: 142000,
    revenue: 724000,
    roas: 5.1,
    leads: 1540,
    cpl: 92.2,
    growth: 28.4,
    color: '#4285F4'
  },
  {
    platform: 'LinkedIn Ads',
    spend: 118000,
    revenue: 554600,
    roas: 4.7,
    leads: 980,
    cpl: 120.4,
    growth: 34.2,
    color: '#0A66C2'
  },
  {
    platform: 'Meta Ads',
    spend: 64000,
    revenue: 256000,
    roas: 4.0,
    leads: 1020,
    cpl: 62.7,
    growth: 19.5,
    color: '#0668E1'
  },
  {
    platform: 'YouTube Ads',
    spend: 18000,
    revenue: 64800,
    roas: 3.6,
    leads: 302,
    cpl: 59.6,
    growth: 42.1,
    color: '#FF0000'
  }
];

export const NOTIFICATION_ALERTS = [
  {
    id: 'notif-1',
    title: 'Hot Lead Surged in Score (+28 pts)',
    message: 'Sarah Jenkins (ApexCloud) downloaded the Enterprise Scaling Guide and visited billing.',
    time: '12 mins ago',
    type: 'hot_lead',
    read: false
  },
  {
    id: 'notif-2',
    title: 'Customer Health Warning Flagged',
    message: 'Nova BioTech health score dropped to 42 (Red). Tracking discrepancy ticket logged.',
    time: '1 hour ago',
    type: 'health_warning',
    read: false
  },
  {
    id: 'notif-3',
    title: 'Ad Campaign Target Achieved',
    message: 'Google Ads Search Enterprise campaign crossed 5.2x ROAS milestone.',
    time: '3 hours ago',
    type: 'ad_success',
    read: true
  },
  {
    id: 'notif-4',
    title: 'Deal Won: $240,000 ARR',
    message: 'Vanguard Retail signed the Holiday Ad Scaling Accelerator agreement.',
    time: '5 hours ago',
    type: 'deal_won',
    read: true
  }
];
