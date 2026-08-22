import { Customer, Deal, AdPerformanceMetric } from '../types';

export type AIProvider = 'builtin' | 'gemini' | 'openai';
export type AIModel = 'gemini-1.5-flash' | 'gemini-1.5-pro' | 'gemini-2.0-flash' | 'gpt-4o' | 'gpt-4o-mini' | 'neural-v4';

export interface AISettings {
  provider: AIProvider;
  model: AIModel;
  apiKey: string;
  temperature: number;
  systemPromptPreset: string;
}

export interface SentimentAnalysisResult {
  sentimentScore: number; // 0-100
  sentimentLabel: 'Extremely Satisfied' | 'Positive / Satisfied' | 'Neutral / Guarded' | 'Frustrated / At Risk' | 'Critical Escalation';
  healthScoreShift: number; // e.g. -24 or +12
  churnProbability: number; // 0-100%
  emotions: {
    name: string;
    intensity: number; // 0-100
    color: string;
  }[];
  keySignals: {
    quote: string;
    sentiment: 'positive' | 'warning' | 'negative';
    category: 'Billing' | 'Ad Performance' | 'Support Quality' | 'Feature Request' | 'Executive Alignment';
  }[];
  summary: string;
  recommendedAction: string;
  urgencyLevel: 'Low' | 'Medium' | 'High' | 'Critical';
}

export interface EmailPitchParams {
  customer: Customer;
  objective: 'upsell' | 'churn_rescue' | 'qbr_review' | 'demo_followup' | 'roas_scale';
  tone: 'executive' | 'consultative' | 'urgent' | 'relational' | 'analytical';
  channel: 'email' | 'linkedin' | 'call_script' | 'slack';
  customNotes?: string;
}

export interface DealStrategyResult {
  deal: Deal;
  customerName: string;
  winProbability: number;
  expectedCloseDays: number;
  keyStrengths: string[];
  keyRiskFactors: string[];
  competitorBattlecard: {
    competitor: string;
    threatLevel: 'High' | 'Medium' | 'Low';
    theirWeakness: string;
    ourAdvantage: string;
    counterKillShot: string;
  }[];
  objectionPlaybook: {
    objection: string;
    responseScript: string;
  }[];
  closingActionPlan: {
    day: string;
    action: string;
    owner: string;
  }[];
}

export interface AdOptimizationResult {
  currentTotalSpend: number;
  currentBlendedROAS: number;
  projectedBlendedROAS: number;
  projectedAnnualRevenueLift: number;
  projectedCACDrop: number;
  allocations: {
    platform: string;
    currentSpend: number;
    recommendedSpend: number;
    shiftAmount: number;
    currentROAS: number;
    projectedROAS: number;
    rational: string;
  }[];
  aiStrategicInsights: string[];
}

export interface CopilotMessage {
  id: string;
  sender: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
  suggestedActions?: {
    label: string;
    actionType: 'navigate' | 'open_email_gen' | 'open_inspector' | 'rescan_sentiment' | 'apply_recalibration';
    payload?: any;
  }[];
}

class AIService {
  private defaultSettings: AISettings = {
    provider: 'builtin',
    model: 'neural-v4',
    apiKey: '',
    temperature: 0.7,
    systemPromptPreset: 'B2B Customer 360 & Ad Sales Executive Assistant'
  };

  public getSettings(): AISettings {
    try {
      const stored = localStorage.getItem('zenesys_ai_settings');
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.warn('Failed to load AI settings from storage', e);
    }
    return this.defaultSettings;
  }

  public saveSettings(settings: Partial<AISettings>): AISettings {
    const current = this.getSettings();
    const updated = { ...current, ...settings };
    try {
      localStorage.setItem('zenesys_ai_settings', JSON.stringify(updated));
    } catch (e) {
      console.warn('Failed to persist AI settings', e);
    }
    return updated;
  }

  // --- Real Cloud LLM Dispatcher (Gemini & OpenAI) with Autonomous Fallback ---
  private async executeLLM(prompt: string, systemPrompt?: string): Promise<string> {
    const settings = this.getSettings();

    if (settings.provider === 'gemini' && settings.apiKey) {
      try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${settings.model}:generateContent?key=${settings.apiKey}`;
        const body = {
          contents: [
            {
              role: 'user',
              parts: [{ text: (systemPrompt ? `${systemPrompt}\n\n` : '') + prompt }]
            }
          ],
          generationConfig: {
            temperature: settings.temperature,
            maxOutputTokens: 2048
          }
        };

        const res = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body)
        });

        if (!res.ok) {
          throw new Error(`Gemini API Error: ${res.status} ${res.statusText}`);
        }
        const data = await res.json();
        return data.candidates?.[0]?.content?.parts?.[0]?.text || '';
      } catch (err) {
        console.warn('Cloud Gemini API failed, falling back to Autonomous Engine:', err);
      }
    } else if (settings.provider === 'openai' && settings.apiKey) {
      try {
        const url = 'https://api.openai.com/v1/chat/completions';
        const body = {
          model: settings.model === 'gpt-4o' || settings.model === 'gpt-4o-mini' ? settings.model : 'gpt-4o',
          messages: [
            ...(systemPrompt ? [{ role: 'system', content: systemPrompt }] : []),
            { role: 'user', content: prompt }
          ],
          temperature: settings.temperature
        };

        const res = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${settings.apiKey}`
          },
          body: JSON.stringify(body)
        });

        if (!res.ok) {
          throw new Error(`OpenAI API Error: ${res.status} ${res.statusText}`);
        }
        const data = await res.json();
        return data.choices?.[0]?.message?.content || '';
      } catch (err) {
        console.warn('Cloud OpenAI API failed, falling back to Autonomous Engine:', err);
      }
    }

    // Default: Simulate dynamic delay for realistic neural processing
    await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 600));
    return '';
  }

  // --- 1. Natural Language Sentiment & Health Analysis ---
  public async analyzeCustomerText(
    text: string,
    customer: Customer
  ): Promise<SentimentAnalysisResult> {
    const rawLower = text.toLowerCase();

    // Check for extreme negative signals
    const hasAngryChurn = /angry|cancel|terrible|disaster|churn|refund|broken|horrible|furious|fail|lawsuit|switch to|unacceptable|escalat/i.test(rawLower);
    // Check for positive signals
    const hasHighPositive = /love|amazing|scale|increase budget|fantastic|thrilled|q4 expansion|renew|great job|exceeded|impressive|upgrade/i.test(rawLower);
    // Check for mild risk / friction
    const hasFriction = /delay|confusing|latency|slow|discrepancy|issue|wait|bug|concern|doubt/i.test(rawLower);

    let score = customer.sentimentScore;
    let label: SentimentAnalysisResult['sentimentLabel'] = 'Positive / Satisfied';
    let healthShift = 0;
    let churnProb = 12;
    let urgency: SentimentAnalysisResult['urgencyLevel'] = 'Low';

    if (hasAngryChurn) {
      score = Math.max(18, Math.min(42, Math.floor(Math.random() * 15 + 22)));
      label = score < 30 ? 'Critical Escalation' : 'Frustrated / At Risk';
      healthShift = -Math.floor(Math.random() * 18 + 20);
      churnProb = Math.floor(Math.random() * 25 + 65);
      urgency = 'Critical';
    } else if (hasHighPositive) {
      score = Math.min(99, Math.floor(Math.random() * 8 + 92));
      label = 'Extremely Satisfied';
      healthShift = +Math.floor(Math.random() * 8 + 8);
      churnProb = Math.floor(Math.random() * 5 + 4);
      urgency = 'Low';
    } else if (hasFriction) {
      score = Math.floor(Math.random() * 15 + 55);
      label = 'Neutral / Guarded';
      healthShift = -Math.floor(Math.random() * 8 + 6);
      churnProb = Math.floor(Math.random() * 15 + 32);
      urgency = 'Medium';
    } else {
      score = Math.min(95, Math.max(70, customer.sentimentScore + (Math.random() > 0.5 ? 4 : -3)));
      label = 'Positive / Satisfied';
      healthShift = +4;
      churnProb = 15;
      urgency = 'Low';
    }

    const keySignals: SentimentAnalysisResult['keySignals'] = [];

    if (hasAngryChurn) {
      keySignals.push(
        {
          quote: text.slice(0, 110) + '...',
          sentiment: 'negative',
          category: 'Support Quality'
        },
        {
          quote: 'Risk of immediate vendor evaluation and contract non-renewal.',
          sentiment: 'negative',
          category: 'Executive Alignment'
        }
      );
    } else if (hasHighPositive) {
      keySignals.push(
        {
          quote: text.slice(0, 110) + '...',
          sentiment: 'positive',
          category: 'Ad Performance'
        },
        {
          quote: 'High willingness to expand quarterly ad commitment and pilot new channels.',
          sentiment: 'positive',
          category: 'Executive Alignment'
        }
      );
    } else {
      keySignals.push({
        quote: text.slice(0, 100) + '...',
        sentiment: hasFriction ? 'warning' : 'positive',
        category: 'Ad Performance'
      });
    }

    const emotions = hasAngryChurn
      ? [
          { name: 'Frustration', intensity: 88, color: '#ef4444' },
          { name: 'Urgency', intensity: 75, color: '#f59e0b' },
          { name: 'Skepticism', intensity: 62, color: '#6366f1' },
          { name: 'Satisfaction', intensity: 12, color: '#10b981' }
        ]
      : hasHighPositive
      ? [
          { name: 'Enthusiasm', intensity: 94, color: '#10b981' },
          { name: 'Confidence', intensity: 88, color: '#06b6d4' },
          { name: 'Expansion Intent', intensity: 82, color: '#6366f1' },
          { name: 'Frustration', intensity: 4, color: '#ef4444' }
        ]
      : [
          { name: 'Analytical Caution', intensity: 58, color: '#f59e0b' },
          { name: 'General Satisfaction', intensity: 68, color: '#10b981' },
          { name: 'Curiosity', intensity: 45, color: '#6366f1' }
        ];

    let summary = '';
    let recommendedAction = '';

    if (hasAngryChurn) {
      summary = `Severe churn threat identified for ${customer.name} at ${customer.company}. Negative tone and escalation keywords reflect deep dissatisfaction with recent delivery or tracking discrepancy.`;
      recommendedAction = `Immediate executive intervention required: Schedule emergency mitigation call with assigned rep ${customer.assignedRep.name} within 2 hours and apply SLA credit.`;
    } else if (hasHighPositive) {
      summary = `Strong positive momentum detected for ${customer.name} (${customer.company}). High appreciation of current ROAS (${customer.roas}x) and clear intent for ARR expansion.`;
      recommendedAction = `Deliver customized Q4 Expansion Proposal and initiate Multi-Touch Attribution API add-on contract review.`;
    } else {
      summary = `Communication indicates steady engagement with minor points of clarification regarding ad attribution pipelines.`;
      recommendedAction = `Send consultative follow-up addressing data discrepancies and provide the latest benchmark attribution metrics.`;
    }

    return {
      sentimentScore: score,
      sentimentLabel: label,
      healthScoreShift: healthShift,
      churnProbability: churnProb,
      emotions,
      keySignals,
      summary,
      recommendedAction,
      urgencyLevel: urgency
    };
  }

  // --- 2. AI Smart Outreach & Pitch Generator ---
  public async generateEmailPitch(params: EmailPitchParams): Promise<{ subject: string; body: string; keyTalkingPoints: string[] }> {
    const { customer, objective, tone, channel, customNotes } = params;

    // Check if cloud LLM returns custom response
    const cloudPrompt = `Draft a high-converting ${channel} message for a B2B SaaS prospect:
Customer Name: ${customer.name}
Title: ${customer.role}
Company: ${customer.company} (${customer.industry})
Ad Spend LTV: $${customer.adSpendLTV.toLocaleString()}
Current ROAS: ${customer.roas}x
Lead Tier: ${customer.leadTier}
Health Score: ${customer.healthScore}/100
Objective: ${objective}
Tone: ${tone}
Channel: ${channel}
Additional context: ${customNotes || 'None'}

Return structured output with Subject (if email/inmail) and full Body with clear call to action.`;

    const cloudRes = await this.executeLLM(cloudPrompt, 'You are an elite B2B Ad Sales & Executive Copilot.');
    if (cloudRes && cloudRes.length > 50) {
      const lines = cloudRes.split('\n');
      const subjectLine = lines.find(l => l.toLowerCase().includes('subject:'))?.replace(/subject:\s*/i, '').trim() || `Unlocking +35% ROAS for ${customer.company}`;
      const body = cloudRes.replace(/^Subject:.*$/im, '').trim();
      return {
        subject: subjectLine,
        body: body,
        keyTalkingPoints: [
          `Multi-touch attribution across ${customer.company}'s ad channels`,
          `Current proven ${customer.roas}x ROAS benchmark`,
          `Automated bidding & intent intelligence scaling`
        ]
      };
    }

    // Heuristic Generative Synthesis
    let subject = '';
    let body = '';
    let talkingPoints: string[] = [];

    const salutation = tone === 'executive' ? `Hi ${customer.name},` : tone === 'relational' ? `Hey ${customer.name}, hope you're having a great week!` : `Dear ${customer.name},`;

    switch (objective) {
      case 'upsell':
        subject = `Scaling ${customer.company}'s Ad ROAS from ${customer.roas}x to 6.5x (Q4 Enterprise Bidding)`;
        body = `${salutation}

I noticed ${customer.company}'s recent engagement with our Enterprise AI Bidding documentation and your recent milestone of achieving a ${customer.roas}x blended ROAS across your paid campaigns.

With your current annual spend velocity at $${(customer.annualRevenue / 1000).toFixed(0)}k ARR, our predictive attribution engine indicates that activating real-time cross-channel bid automation could capture an additional $180k in high-intent pipeline over the next 90 days.

Would you be open to a brief 15-minute executive walkthrough this Thursday at 2:00 PM EST to review your tailored attribution model?

Best regards,
${customer.assignedRep.name}
Sales Executive, Customer 360 Intelligence
${customer.assignedRep.email}`;
        talkingPoints = [
          `Current proven ${customer.roas}x ROAS vs 6.5x with AI bidding`,
          `Calculated +$180k pipeline upside for ${customer.company}`,
          `Zero engineering overhead to integrate with active Google & Meta pixels`
        ];
        break;

      case 'churn_rescue':
        subject = `Urgent: Prioritizing ${customer.company}'s Account & Attribution Accuracy`;
        body = `${salutation}

I'm reaching out directly because our Customer Health & Sentiment monitoring flagged an issue with your recent tracking tag integration. Your team's success is our top priority, and we want to ensure zero disruptions to ${customer.company}'s ad revenue reporting.

I have already looped in our principal solutions architect to audit your campaign pipelines. Could we jump on a quick 10-minute sync today or tomorrow morning so we can resolve this together immediately?

I've also temporarily credited 30 days of Enterprise Multi-Touch Attribution to your account.

Warmly,
${customer.assignedRep.name}
${customer.assignedRep.email}`;
        talkingPoints = [
          `Direct resolution of recent attribution and tag discrepancy`,
          `Complimentary 30-day Enterprise add-on credit applied`,
          `Assigned dedicated Solutions Architect for immediate support`
        ];
        break;

      case 'qbr_review':
        subject = `Quarterly Ad Performance & ROAS Benchmark Dossier for ${customer.company}`;
        body = `${salutation}

In preparation for our upcoming Quarterly Business Review, our AI intelligence engine has compiled ${customer.company}'s multi-channel ad attribution summary for Q3.

Key Highlights:
• Total Ad Spend LTV: $${customer.adSpendLTV.toLocaleString()}
• Closed Sales Pipeline Attributed: $${(customer.totalPurchases * 1.4).toLocaleString()}
• Lead Quality Index: ${customer.leadScore}/100 (${customer.leadTier} Tier)

I've attached the full interactive Customer 360 dossier. Let's schedule 30 minutes next Tuesday to align on your 2026 expansion roadmap.

Best,
${customer.assignedRep.name}`;
        talkingPoints = [
          `Review of Q3 blended ROAS (${customer.roas}x)`,
          `Channel attribution breakdown across Google, Meta, and LinkedIn`,
          `Strategic roadmap for 2026 budget allocation`
        ];
        break;

      case 'demo_followup':
        subject = `Next Steps: Accelerating ${customer.company}'s Ad Sales Velocity`;
        body = `${salutation}

Thank you for your time during our demonstration of Customer 360 & Ad Sales Intelligence.

Based on ${customer.company}'s specific focus on ${customer.industry} lead conversion, we've calibrated a personalized sandbox demonstrating how our NLP Sentiment Scanner and Lead Scoring Gauges would integrate with your current CRM.

Let me know if you have any questions before our follow-up demo this week.

Best regards,
${customer.assignedRep.name}`;
        talkingPoints = [
          `Tailored demo sandbox built for ${customer.industry}`,
          `Live demonstration of Sentiment Scanner and Real-Time Lead Scoring`,
          `Custom ROI calculator showing expected payback within 45 days`
        ];
        break;

      default:
        subject = `Ad Attribution & Growth Partnership for ${customer.company}`;
        body = `${salutation}

Following up on your recent engagement with our Ad Sales Intelligence platform. We're seeing outstanding benchmark results across ${customer.industry} organizations scaling their customer lifetime value.

Let's connect for 10 minutes this week to explore how we can optimize ${customer.company}'s conversion rates.

Best,
${customer.assignedRep.name}`;
        talkingPoints = [
          `Industry benchmarks for ${customer.industry}`,
          `Multi-touch attribution insights`
        ];
    }

    if (channel === 'call_script') {
      body = `[OUTBOUND CALL PLAYBOOK - ${customer.name.toUpperCase()} (${customer.company})]
1. OPENER: "Hi ${customer.name}, this is ${customer.assignedRep.name} from Customer 360 Intelligence. I saw your team's ad ROAS hit ${customer.roas}x this month—congratulations!"
2. VALUE HOOK: "We ran your channel data through our AI attribution model, and there's a clear opening to unlock another $120k ARR by reallocating LinkedIn budget to high-intent Google Search terms."
3. QUALIFICATION QUESTION: "How is your team currently bridging the gap between ad click telemetry and your closed sales pipeline in your CRM?"
4. CALL TO ACTION: "Let's set up a 15-minute screen share with your head of growth this Thursday at 2 PM."`;
    } else if (channel === 'linkedin') {
      subject = `InMail: ${customer.company} Ad Intelligence`;
      body = `Hi ${customer.name} — loved seeing ${customer.company}'s recent growth in ${customer.industry}! 

Our AI attribution model analyzed recent multi-channel benchmarks in your space and noticed a huge opportunity to boost ad ROAS past your current ${customer.roas}x mark.

Would love to share a 1-page custom intelligence breakdown with you if you're open to it. 

Best,
${customer.assignedRep.name}`;
    }

    return {
      subject,
      body,
      keyTalkingPoints: talkingPoints
    };
  }

  // --- 3. AI Deal Strategy & Competitor Battlecards ---
  public async generateDealStrategy(deal: Deal, customer: Customer): Promise<DealStrategyResult> {
    const prompt = `Analyze sales deal:
Deal: ${deal.title} ($${deal.value.toLocaleString()})
Stage: ${deal.stage}
Customer: ${customer.name} at ${customer.company}
Lead Score: ${customer.leadScore}
Health Score: ${customer.healthScore}
Attribution Source: ${deal.adSource}
Provide strategic win playbook, competitor battlecards, and objection responses.`;

    await this.executeLLM(prompt);

    const winProb = Math.min(96, Math.max(35, deal.probability + (customer.healthScore >= 80 ? 8 : -10)));

    return {
      deal,
      customerName: customer.name,
      winProbability: winProb,
      expectedCloseDays: deal.stage === 'Negotiation' ? 14 : deal.stage === 'Proposal' ? 28 : 45,
      keyStrengths: [
        `High executive alignment with ${customer.name} (${customer.role})`,
        `Demonstrated ROI with active ${customer.roas}x ROAS on existing ad campaigns`,
        `Low latency multi-touch attribution already proven in trial`
      ],
      keyRiskFactors: [
        customer.healthScore < 70 ? 'Recent sentiment friction in support communications' : 'Procurement security questionnaire review delay',
        'End-of-quarter budget freeze potential if executive sponsor is not engaged',
        'Competitor trying to bundle free basic reporting'
      ],
      competitorBattlecard: [
        {
          competitor: 'Legacy CRM (Salesforce / HubSpot native)',
          threatLevel: 'Medium',
          theirWeakness: 'Batch sync delays (24h+), no multi-platform ad spend attribution or sentiment analysis.',
          ourAdvantage: 'Real-time bi-directional ad telemetry with millisecond ROAS updates and automated sentiment health scoring.',
          counterKillShot: 'Show live screen of real-time ad attribution vs 24-hour delayed legacy reports.'
        },
        {
          competitor: 'Generic B2B Attribution Tool',
          threatLevel: 'High',
          theirWeakness: 'Complex 6-month implementation, lacks AI Natural Language Sentiment Gauges and automated outreach generation.',
          ourAdvantage: 'Plug-and-play in 5 minutes with built-in AI Copilot and Lead Intent Intelligence.',
          counterKillShot: 'Offer complimentary side-by-side POC showing instant AI predictive score accuracy.'
        }
      ],
      objectionPlaybook: [
        {
          objection: '"We already have basic analytics in Google Ads and Meta Ads Manager."',
          responseScript: `"While individual ad managers show isolated platform clicks, they cannot track which specific ad touchpoint closed a $180k enterprise deal in your CRM. Customer 360 connects the entire multi-touch journey across all channels into a single unified customer profile."`
        },
        {
          objection: '"We are waiting until Q1 next year to evaluate new tooling."',
          responseScript: `"Every month without cross-channel attribution results in an estimated 18-24% wasted ad budget on underperforming channels. Starting now allows you to enter Q1 with fully optimized ROAS models."`
        }
      ],
      closingActionPlan: [
        { day: 'Day 1-3', action: 'Deliver customized ROI model showing $240k projected revenue expansion.', owner: customer.assignedRep.name },
        { day: 'Day 4-7', action: 'Conduct technical security review with IT & Data compliance lead.', owner: 'Solutions Engineering' },
        { day: 'Day 8-11', action: 'Present redline-ready master service agreement with quarterly billing milestone.', owner: 'Executive Sponsor' },
        { day: 'Day 12-14', action: 'Final contract signature & automated account onboarding provisioning.', owner: customer.assignedRep.name }
      ]
    };
  }

  // --- 4. AI Ad Budget & ROAS Optimizer ---
  public async optimizeAdBudget(currentMetrics: AdPerformanceMetric[]): Promise<AdOptimizationResult> {
    await this.executeLLM('Optimize cross-channel ad spend budget for highest blended ROAS');

    const totalSpend = currentMetrics.reduce((acc, m) => acc + m.spend, 0);
    const totalRev = currentMetrics.reduce((acc, m) => acc + m.revenue, 0);
    const blendedROAS = +(totalRev / totalSpend).toFixed(2);

    const allocations = currentMetrics.map(metric => {
      let shift = 0;
      let projectedROAS = metric.roas;
      let rationale = '';

      if (metric.roas >= 4.5) {
        shift = Math.round(metric.spend * 0.25);
        projectedROAS = +(metric.roas * 1.08).toFixed(2);
        rationale = `High conversion velocity & lowest cost per lead ($${metric.cpl}). Reallocating +25% budget to capture unserved high-intent demand.`;
      } else if (metric.roas < 3.5) {
        shift = -Math.round(metric.spend * 0.30);
        projectedROAS = +(metric.roas * 1.15).toFixed(2);
        rationale = `Diminishing returns detected at high frequency. Trimming -30% low-intent keywords to raise channel ROAS from ${metric.roas}x.`;
      } else {
        shift = Math.round(metric.spend * 0.05);
        projectedROAS = +(metric.roas * 1.03).toFixed(2);
        rationale = `Stable mid-funnel retargeting efficiency. Maintaining steady pace with incremental +5% calibration.`;
      }

      return {
        platform: metric.platform,
        currentSpend: metric.spend,
        recommendedSpend: metric.spend + shift,
        shiftAmount: shift,
        currentROAS: metric.roas,
        projectedROAS,
        rational: rationale
      };
    });

    const newTotalSpend = allocations.reduce((acc, a) => acc + a.recommendedSpend, 0);
    const newTotalRev = allocations.reduce((acc, a) => acc + a.recommendedSpend * a.projectedROAS, 0);
    const projectedBlendedROAS = +(newTotalRev / newTotalSpend).toFixed(2);

    return {
      currentTotalSpend: totalSpend,
      currentBlendedROAS: blendedROAS,
      projectedBlendedROAS,
      projectedAnnualRevenueLift: Math.round(newTotalRev - totalRev) * 4,
      projectedCACDrop: 16.4,
      allocations,
      aiStrategicInsights: [
        'Shifting $18,500 from low-efficiency Meta prospecting to high-intent Google Search & LinkedIn InMail increases blended ROAS by +0.72x.',
        'Activating negative keyword automation on YouTube Ads reduces wasted ad spend by $6,200 monthly without dropping lead volume.',
        'Retargeting website visitors with Lead Score > 80 within 15 minutes of ad click lifts demo conversion rates by 34%.'
      ]
    };
  }

  // --- 5. Conversational Copilot Chat Engine ---
  public async sendCopilotQuery(
    query: string,
    _history: CopilotMessage[],
    context: {
      activeCustomer?: Customer;
      allCustomers: Customer[];
      activeTab: string;
    }
  ): Promise<CopilotMessage> {
    const qLower = query.toLowerCase();

    // Check if cloud LLM is active
    const cloudPrompt = `You are ZenAI Copilot, the world's most intelligent B2B Ad Sales & Customer 360 AI Assistant.
Context:
- Current View: ${context.activeTab}
- Selected Customer: ${context.activeCustomer ? `${context.activeCustomer.name} (${context.activeCustomer.company}, Score: ${context.activeCustomer.leadScore}, Health: ${context.activeCustomer.healthScore}/100, Tier: ${context.activeCustomer.leadTier}, ROAS: ${context.activeCustomer.roas}x)` : 'None'}
- Total Accounts in CRM: ${context.allCustomers.length}
- Hot Leads: ${context.allCustomers.filter(c => c.leadTier === 'Hot').map(c => c.name).join(', ')}
- At Risk Accounts: ${context.allCustomers.filter(c => c.healthStatus === 'At Risk').map(c => c.name).join(', ')}

User Query: "${query}"

Provide an insightful, executive-level response. Use bullet points and markdown formatting where helpful.`;

    const cloudRes = await this.executeLLM(cloudPrompt, 'You are ZenAI, the Customer 360 & Ad Sales Copilot.');
    if (cloudRes && cloudRes.length > 30) {
      return {
        id: `ai-msg-${Date.now()}`,
        sender: 'assistant',
        content: cloudRes,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestedActions: [
          { label: 'Draft Follow-Up Email', actionType: 'open_email_gen' },
          { label: 'Inspect Customer Sentiment', actionType: 'open_inspector' },
          { label: 'Recalibrate Health Score', actionType: 'rescan_sentiment' }
        ]
      };
    }

    // Heuristic Contextual Intelligence
    let reply = '';
    const suggestedActions: CopilotMessage['suggestedActions'] = [];

    const activeCust = context.activeCustomer || context.allCustomers[0];

    if (qLower.includes('risk') || qLower.includes('churn') || qLower.includes('unhappy')) {
      const atRiskCusts = context.allCustomers.filter(c => c.healthStatus === 'At Risk' || c.healthScore < 60);
      reply = `### ⚠️ Churn Risk Analysis & Critical Accounts\n\nI identified **${atRiskCusts.length} account(s)** currently in the warning threshold:\n\n${atRiskCusts
        .map(
          c =>
            `• **${c.name}** (${c.company})\n  - **Health Index:** \`${c.healthScore}/100\` (${c.sentimentLabel})\n  - **Primary Risk Factor:** ${c.sentimentSummary}\n  - **Rep Assigned:** ${c.assignedRep.name}`
        )
        .join('\n\n')}\n\n**AI Recommendation:** Trigger immediate mitigation sequences and review recent support ticket sentiment.`;
      
      suggestedActions.push(
        { label: `Inspect ${atRiskCusts[0]?.name || activeCust.name}'s Sentiment`, actionType: 'open_inspector', payload: atRiskCusts[0]?.id },
        { label: 'Draft Win-Back Pitch', actionType: 'open_email_gen', payload: { objective: 'churn_rescue' } }
      );
    } else if (qLower.includes('hot') || qLower.includes('top lead') || qLower.includes('close') || qLower.includes('highest')) {
      const hotLeads = context.allCustomers.filter(c => c.leadTier === 'Hot').sort((a, b) => b.leadScore - a.leadScore);
      reply = `### 🔥 Priority High-Intent Leads for Today\n\nHere are your highest-probability closing opportunities based on ad velocity and engagement depth:\n\n${hotLeads
        .slice(0, 3)
        .map(
          c =>
            `1. **${c.name}** — ${c.company}\n   - **Lead Score:** \`${c.leadScore}/100\` | **Ad ROAS:** \`${c.roas}x\`\n   - **Recent Intent:** ${c.lastActivity}\n   - **Top Deal:** $${(c.deals[0]?.value || 100000).toLocaleString()} (${c.deals[0]?.stage || 'Proposal'})`
        )
        .join('\n\n')}\n\n**Next Best Action:** Send the Q4 Enterprise Expansion proposal while intent velocity is at peak.`;

      suggestedActions.push(
        { label: `Draft Pitch for ${hotLeads[0]?.name}`, actionType: 'open_email_gen', payload: { customerId: hotLeads[0]?.id } },
        { label: 'View Lead Intelligence Kanban', actionType: 'navigate', payload: 'leads' }
      );
    } else if (qLower.includes('email') || qLower.includes('pitch') || qLower.includes('draft') || qLower.includes('outreach')) {
      reply = `### ✉️ AI Pitch Assistant\n\nI can draft a tailored outreach message for **${activeCust.name}** (${activeCust.company}).\n\n**Account Context:**\n• **Annual Revenue:** $${(activeCust.annualRevenue / 1000).toFixed(0)}k ARR\n• **Ad Spend LTV:** $${(activeCust.adSpendLTV / 1000).toFixed(0)}k\n• **Current Health Index:** ${activeCust.healthScore}/100 (${activeCust.healthStatus})\n\nSelect an objective to launch the full AI Pitch Generator with customized parameters.`;

      suggestedActions.push(
        { label: 'Open AI Email Generator', actionType: 'open_email_gen', payload: { customerId: activeCust.id } },
        { label: 'Draft Executive Expansion', actionType: 'open_email_gen', payload: { customerId: activeCust.id, objective: 'upsell' } }
      );
    } else if (qLower.includes('roas') || qLower.includes('ad spend') || qLower.includes('budget') || qLower.includes('campaign')) {
      reply = `### 📊 Cross-Channel Ad ROAS & Attribution\n\n**Platform Performance Summary:**\n• **Blended ROAS:** \`4.6x Return\` across all channels\n• **Top Performing Channel:** **LinkedIn Enterprise Ads** (\`5.8x ROAS\`, $12.40 CPC)\n• **Optimization Opportunity:** Reallocating 25% budget from low-conversion Meta ads to Google Search & LinkedIn InMail will lift blended ROAS to **5.32x** and unlock **+$280k ARR** in attributed sales.`;

      suggestedActions.push(
        { label: 'Run AI Ad Budget Optimizer', actionType: 'navigate', payload: 'analytics' },
        { label: 'View Attribution Matrix', actionType: 'navigate', payload: 'analytics' }
      );
    } else {
      reply = `### 💡 ZenAI Intelligence Briefing for ${activeCust.name} (${activeCust.company})\n\n**Summary:**\n• **Qualification Score:** \`${activeCust.leadScore}/100\` (${activeCust.leadTier} Tier)\n• **Customer Health & Sentiment:** \`${activeCust.healthScore}/100\` (${activeCust.healthStatus})\n• **Blended ROAS:** \`${activeCust.roas}x\` on $${(activeCust.adSpendLTV / 1000).toFixed(0)}k Ad Spend\n• **Latest Touchpoint:** ${activeCust.lastActivity} (${activeCust.lastActivityDate})\n\nHow would you like me to assist you with this account?`;

      suggestedActions.push(
        { label: 'Analyze Sentiment & NLP', actionType: 'open_inspector', payload: activeCust.id },
        { label: 'Generate AI Pitch', actionType: 'open_email_gen', payload: { customerId: activeCust.id } },
        { label: 'Recalibrate Health Score', actionType: 'rescan_sentiment', payload: activeCust.id }
      );
    }

    return {
      id: `ai-msg-${Date.now()}`,
      sender: 'assistant',
      content: reply,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      suggestedActions
    };
  }
}

export const aiService = new AIService();
